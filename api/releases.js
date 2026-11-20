const fallbackReleases = require('../data/releases.json');

const REPOS = {
  browser: 'latajoncy82-svg/peak-browser',
  launcher: 'latajoncy82-svg/peak-launcher'
};

function normalizeAsset(asset) {
  return {
    name: asset.name,
    size: typeof asset.size === 'number' ? asset.size : 0,
    downloadUrl: asset.browser_download_url,
    downloadCount: typeof asset.download_count === 'number' ? asset.download_count : 0
  };
}

function mapGithubRelease(repo, release) {
  const rawAssets = Array.isArray(release.assets) ? release.assets.map(normalizeAsset) : [];
  const exeAssets = rawAssets.filter((a) => /\.exe$/i.test(a.name));
  const installer =
    exeAssets.find((a) => /setup/i.test(a.name)) ||
    exeAssets.find((a) => !/portable/i.test(a.name)) ||
    null;
  const portable = exeAssets.find((a) => /portable/i.test(a.name)) || null;

  return {
    tag: release.tag_name,
    name: release.name || release.tag_name,
    publishedAt: release.published_at || release.created_at || null,
    body: release.body || '',
    htmlUrl:
      release.html_url ||
      `https://github.com/${repo}/releases/tag/${encodeURIComponent(release.tag_name)}`,
    prerelease: Boolean(release.prerelease),
    assets: {
      installer,
      portable,
      all: rawAssets
    }
  };
}

async function fetchRepoReleases(repo) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);

  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'peak-labs-site'
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const url = `https://api.github.com/repos/${repo}/releases?per_page=20`;
    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return null;
    }

    const published = data
      .filter((r) => r && !r.draft)
      .map((r) => mapGithubRelease(repo, r));

    return published.length > 0 ? published : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async function handler(_req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');

  const [browserReleases, launcherReleases] = await Promise.all([
    fetchRepoReleases(REPOS.browser),
    fetchRepoReleases(REPOS.launcher)
  ]);

  const anyLive = Boolean(browserReleases || launcherReleases);

  res.status(200).json({
    source: anyLive ? 'github' : 'fallback',
    updatedAt: new Date().toISOString(),
    products: {
      browser: {
        repo: REPOS.browser,
        source: browserReleases ? 'github' : 'fallback',
        releases: browserReleases || fallbackReleases.browser || []
      },
      launcher: {
        repo: REPOS.launcher,
        source: launcherReleases ? 'github' : 'fallback',
        releases: launcherReleases || fallbackReleases.launcher || []
      }
    }
  });
};
