const ISO_RE = /^(auto|[a-z]{2,3}(-[A-Za-z]{2,4})?)$/;
const TARGET_RE = /^[a-z]{2,3}(-[A-Za-z]{2,4})?$/;
const MAX_TEXTS = 250;
const MAX_TOTAL_CHARS = 50000;
const BATCH_CHAR_LIMIT = 1400;
const BATCH_ITEM_LIMIT = 20;
const CACHE_LIMIT = 500;
const REQUEST_TIMEOUT_MS = 5000;

const translationCache = new Map();

function getCached(key) {
  return translationCache.get(key);
}

function setCached(key, value) {
  if (translationCache.has(key)) {
    translationCache.delete(key);
  }
  translationCache.set(key, value);
  if (translationCache.size > CACHE_LIMIT) {
    const oldestKey = translationCache.keys().next().value;
    if (oldestKey !== undefined) {
      translationCache.delete(oldestKey);
    }
  }
}

async function readJsonBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      return JSON.parse(req.body);
    }
    if (typeof req.body === 'object') {
      return req.body;
    }
  }

  return new Promise((resolve, reject) => {
    let raw = '';
    let size = 0;
    const limit = 100 * 1024;
    if (typeof req.on !== 'function') {
      resolve({});
      return;
    }
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('Payload too large'));
        return;
      }
      raw += chunk.toString('utf8');
    });
    req.on('end', () => {
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

async function fetchWithTimeout(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      headers: {
        'User-Agent': 'peak-labs-translator/1.0'
      },
      signal: controller.signal
    });
  } finally {
    clearTimeout(timer);
  }
}

async function translateViaGtx(text, source, target) {
  const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx` +
    `&sl=${encodeURIComponent(source)}&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) {
    throw new Error(`GTX HTTP ${res.status}`);
  }
  const data = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error('Unexpected GTX payload');
  }
  return data[0].map((seg) => (Array.isArray(seg) ? seg[0] || '' : '')).join('');
}

async function translateViaMyMemory(text, source, target) {
  const srcLang = source === 'auto' ? 'en' : source;
  const url =
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}` +
    `&langpair=${encodeURIComponent(`${srcLang}|${target}`)}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) {
    throw new Error(`MyMemory HTTP ${res.status}`);
  }
  const data = await res.json();
  const translated = data?.responseData?.translatedText;
  if (typeof translated !== 'string' || !translated.trim()) {
    throw new Error('Unexpected MyMemory payload');
  }
  return translated;
}

function parseBatchMarkers(output, count) {
  const regex = /[\[【]\s*90(\d{2,})\s*[\]】]\s*/g;
  const matches = [];
  let m;
  while ((m = regex.exec(output)) !== null) {
    const idx = Number(m[1]);
    if (idx >= 0 && idx < count) {
      matches.push({ idx, start: m.index, end: regex.lastIndex });
    }
  }

  if (matches.length === 0) {
    return new Map();
  }

  const parsed = new Map();
  for (let i = 0; i < matches.length; i++) {
    const cur = matches[i];
    const nextStart = i + 1 < matches.length ? matches[i + 1].start : output.length;
    const chunk = output.slice(cur.end, nextStart).trim();
    if (!parsed.has(cur.idx)) {
      parsed.set(cur.idx, chunk);
    }
  }
  return parsed;
}

function formatBatchMarker(idx) {
  const padded = String(idx).padStart(2, '0');
  return `[90${padded}]`;
}

async function translateSingleFallback(text, source, target) {
  if (!text.trim()) {
    return { text, provider: 'gtx', fallback: false };
  }
  try {
    const gtxOut = await translateViaGtx(text, source, target);
    if (gtxOut) {
      return { text: gtxOut, provider: 'gtx', fallback: false };
    }
  } catch {
    // Fall through to MyMemory
  }

  try {
    const mmOut = await translateViaMyMemory(text, source, target);
    if (mmOut) {
      return { text: mmOut, provider: 'mymemory', fallback: false };
    }
  } catch {
    // Fall through to original text
  }

  return { text, provider: 'fallback', fallback: true };
}

function buildBatches(missingItems) {
  const batches = [];
  let current = [];
  let currentLen = 0;

  for (const item of missingItems) {
    const markerLen = formatBatchMarker(current.length).length + 2;
    const estLen = item.text.length + markerLen;
    if (
      current.length > 0 &&
      (currentLen + estLen > BATCH_CHAR_LIMIT || current.length >= BATCH_ITEM_LIMIT)
    ) {
      batches.push(current);
      current = [];
      currentLen = 0;
    }
    current.push(item);
    currentLen += estLen;
  }

  if (current.length > 0) {
    batches.push(current);
  }
  return batches;
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    res.status(400).json({ error: 'Invalid JSON request body' });
    return;
  }

  const target = typeof body?.target === 'string' ? body.target.trim() : '';
  const source = typeof body?.source === 'string' && body.source.trim() ? body.source.trim() : 'en';
  const texts = body?.texts;

  if (!TARGET_RE.test(target) || !ISO_RE.test(source)) {
    res.status(400).json({ error: 'Invalid source or target language code' });
    return;
  }

  if (!Array.isArray(texts) || texts.length === 0 || texts.length > MAX_TEXTS) {
    res.status(400).json({ error: `texts must be a non-empty array of at most ${MAX_TEXTS} strings` });
    return;
  }

  let totalChars = 0;
  for (const entry of texts) {
    if (typeof entry !== 'string') {
      res.status(400).json({ error: 'All items in texts must be strings' });
      return;
    }
    totalChars += entry.length;
    if (totalChars > MAX_TOTAL_CHARS) {
      res.status(400).json({ error: `Total text length exceeds ${MAX_TOTAL_CHARS} characters` });
      return;
    }
  }

  if (source !== 'auto' && source.toLowerCase() === target.toLowerCase()) {
    res.status(200).json({
      source,
      target,
      provider: 'cache',
      translations: texts.slice()
    });
    return;
  }

  const translations = new Array(texts.length);
  const missing = [];

  for (let i = 0; i < texts.length; i++) {
    const raw = texts[i];
    if (!raw.trim()) {
      translations[i] = raw;
      continue;
    }
    const cacheKey = `${source}|${target}|${raw}`;
    const hit = getCached(cacheKey);
    if (hit !== undefined) {
      translations[i] = hit;
    } else {
      missing.push({ origIndex: i, text: raw, cacheKey });
    }
  }

  if (missing.length === 0) {
    res.status(200).json({
      source,
      target,
      provider: 'cache',
      translations
    });
    return;
  }

  let usedGtx = false;
  let usedMyMemory = false;
  let anyFallback = false;

  const batches = buildBatches(missing);

  await Promise.all(
    batches.map(async (batch) => {
      const joined = batch
        .map((item, idx) => `${formatBatchMarker(idx)} ${item.text}`)
        .join('\n');

      let parsedMap = new Map();
      try {
        const output = await translateViaGtx(joined, source, target);
        parsedMap = parseBatchMarkers(output, batch.length);
        if (parsedMap.size > 0) {
          usedGtx = true;
        }
      } catch {
        parsedMap = new Map();
      }

      await Promise.all(
        batch.map(async (item, idx) => {
          const batchTranslation = parsedMap.get(idx);
          if (typeof batchTranslation === 'string' && batchTranslation.length > 0) {
            translations[item.origIndex] = batchTranslation;
            setCached(item.cacheKey, batchTranslation);
            return;
          }

          const single = await translateSingleFallback(item.text, source, target);
          translations[item.origIndex] = single.text;
          if (single.provider === 'gtx') usedGtx = true;
          if (single.provider === 'mymemory') usedMyMemory = true;
          if (single.fallback) {
            anyFallback = true;
          } else {
            setCached(item.cacheKey, single.text);
          }
        })
      );
    })
  );

  const provider = anyFallback && !usedGtx && !usedMyMemory
    ? 'fallback'
    : usedMyMemory && !usedGtx
      ? 'mymemory'
      : 'gtx';

  res.status(200).json({
    source,
    target,
    provider,
    ...(anyFallback ? { fallback: true } : {}),
    translations
  });
};
