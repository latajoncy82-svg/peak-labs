(() => {
  const REPOS = {
    browser: 'latajoncy82-svg/peak-browser',
    launcher: 'latajoncy82-svg/peak-launcher'
  };

  const GALLERY_SHOTS = [
    {
      id: 'browser-dark',
      project: 'browser',
      mode: 'dark',
      src: './assets/browser-dark.webp',
      caption: 'Peak Browser — Motyw Ciemny (Domyślny)'
    },
    {
      id: 'browser-light',
      project: 'browser',
      mode: 'light',
      src: './assets/browser-light.webp',
      caption: 'Peak Browser — Motyw Jasny'
    },
    {
      id: 'launcher-dark',
      project: 'launcher',
      mode: 'dark',
      src: './assets/launcher-dark.png',
      caption: 'Peak Launcher — Nocny Szczyt (Alpine Aurora)'
    },
    {
      id: 'launcher-light',
      project: 'launcher',
      mode: 'light',
      src: './assets/launcher-light.png',
      caption: 'Peak Launcher — Lodowcowy Dzień'
    },
    {
      id: 'launcher-mods',
      project: 'launcher',
      mode: 'mods',
      src: './assets/launcher-mods.png',
      caption: 'Peak Launcher — Katalog Modrinth i Pakiet FPS Boost'
    },
    {
      id: 'launcher-java',
      project: 'launcher',
      mode: 'java',
      src: './assets/launcher-java.png',
      caption: 'Peak Launcher — Centrum Java i Fabric'
    }
  ];

  const STAGE_META = {
    browser: {
      name: 'Peak Browser',
      icon: './assets/browser-icon-64.png',
      summary: 'Czysta przeglądarka z Peak Shield i motywem Niebieskiej Góry.',
      tags: ['Peak Shield', 'Drag & Drop kart', '0 telemetrii'],
      detailsHref: '#projekt-browser',
      previewSrc: './assets/browser-dark.webp',
      shotId: 'browser-dark'
    },
    launcher: {
      name: 'Peak Launcher',
      icon: './assets/launcher-icon-64.png',
      summary: 'Launcher Minecrafta z Alpine Aurora, Modrinth i Auto-Javą.',
      tags: ['925+ wersji MC', 'Modrinth + FPS Boost', 'Auto-Java & Fabric'],
      detailsHref: '#projekt-launcher',
      previewSrc: './assets/launcher-dark.png',
      shotId: 'launcher-dark'
    }
  };

  const state = {
    activeStage: 'browser',
    activeFilter: 'all',
    browserMode: 'dark',
    launcherMode: 'dark',
    lightboxIndex: 0,
    products: {
      browser: [],
      launcher: []
    },
    source: 'fallback'
  };

  const el = {
    themeToggle: document.getElementById('site-theme-toggle'),
    sunIcon: document.getElementById('theme-icon-sun'),
    moonIcon: document.getElementById('theme-icon-moon'),

    mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    mobileDrawerClose: document.getElementById('mobile-drawer-close'),
    mobileNavLinks: Array.from(document.querySelectorAll('.mobile-nav-link')),

    stageTabs: Array.from(document.querySelectorAll('.stage-tab')),
    stagePreviewImg: document.getElementById('stage-preview-img'),
    stageZoomBtn: document.getElementById('stage-zoom-btn'),
    stageProductIcon: document.getElementById('stage-product-icon'),
    stageProductName: document.getElementById('stage-product-name'),
    stageProductVersion: document.getElementById('stage-product-version'),
    stageProductSummary: document.getElementById('stage-product-summary'),
    stageTags: document.getElementById('stage-tags'),
    stageDownloadBtn: document.getElementById('stage-download-btn'),
    stageDownloadSize: document.getElementById('stage-download-size'),
    stageDetailsLink: document.getElementById('stage-details-link'),

    heroQuickBrowser: document.getElementById('hero-quick-browser'),
    heroQuickBrowserVer: document.getElementById('hero-quick-browser-ver'),
    heroQuickLauncher: document.getElementById('hero-quick-launcher'),
    heroQuickLauncherVer: document.getElementById('hero-quick-launcher-ver'),

    projectPreviewTabs: Array.from(document.querySelectorAll('.project-preview-tab')),
    browserPreviewImg: document.getElementById('browser-preview-img'),
    launcherPreviewImg: document.getElementById('launcher-preview-img'),
    browserZoomBtn: document.getElementById('browser-zoom-btn'),
    launcherZoomBtn: document.getElementById('launcher-zoom-btn'),

    browserVersionBadge: document.getElementById('browser-version-badge'),
    browserDlWrap: document.getElementById('browser-dl-wrap'),
    browserPrimaryDl: document.getElementById('browser-primary-dl'),
    browserPrimaryMeta: document.getElementById('browser-primary-meta'),
    browserDlToggle: document.getElementById('browser-dl-toggle'),
    browserDlDropdown: document.getElementById('browser-dl-dropdown'),
    browserSetupLink: document.getElementById('browser-setup-link'),
    browserSetupSize: document.getElementById('browser-setup-size'),
    browserPortableLink: document.getElementById('browser-portable-link'),
    browserPortableSize: document.getElementById('browser-portable-size'),

    launcherVersionBadge: document.getElementById('launcher-version-badge'),
    launcherDlWrap: document.getElementById('launcher-dl-wrap'),
    launcherPrimaryDl: document.getElementById('launcher-primary-dl'),
    launcherPrimaryMeta: document.getElementById('launcher-primary-meta'),
    launcherDlToggle: document.getElementById('launcher-dl-toggle'),
    launcherDlDropdown: document.getElementById('launcher-dl-dropdown'),
    launcherSetupLink: document.getElementById('launcher-setup-link'),
    launcherSetupSize: document.getElementById('launcher-setup-size'),
    launcherPortableLink: document.getElementById('launcher-portable-link'),
    launcherPortableSize: document.getElementById('launcher-portable-size'),

    releaseFilterBtns: Array.from(document.querySelectorAll('.release-filter-btn')),
    releasesSourceNote: document.getElementById('releases-source-note'),
    releasesList: document.getElementById('releases-list'),

    lightboxModal: document.getElementById('lightbox-modal'),
    lightboxBackdrop: document.getElementById('lightbox-backdrop'),
    lightboxClose: document.getElementById('lightbox-close'),
    lightboxPrev: document.getElementById('lightbox-prev'),
    lightboxNext: document.getElementById('lightbox-next'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxCaption: document.getElementById('lightbox-caption'),
    lightboxCounter: document.getElementById('lightbox-counter')
  };

  function isLocalhostOrFile() {
    return (
      window.location.protocol === 'file:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
  }

  function isStaticGithubPages() {
    return window.location.hostname.endsWith('.github.io');
  }

  function formatSize(bytes) {
    if (!bytes || bytes <= 0) return 'Windows x64';
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  function setSiteTheme(theme) {
    document.documentElement.dataset.theme = theme;
    el.sunIcon.classList.toggle('hidden', theme !== 'dark');
    el.moonIcon.classList.toggle('hidden', theme === 'dark');
    if (window.PeakLabsFX) {
      window.PeakLabsFX.setTheme(theme);
    }
    try {
      localStorage.setItem('peak-labs-site-theme', theme);
    } catch {
      // Ignore storage failures
    }
  }

  function setMobileDrawerOpen(open) {
    if (!el.mobileDrawer) return;
    el.mobileDrawer.classList.toggle('hidden', !open);
    el.mobileDrawer.setAttribute('aria-hidden', String(!open));
    if (el.mobileMenuToggle) {
      el.mobileMenuToggle.setAttribute('aria-expanded', String(open));
    }
  }

  function closeAllDropdowns() {
    if (el.browserDlDropdown) {
      el.browserDlDropdown.classList.add('hidden');
      el.browserDlToggle?.setAttribute('aria-expanded', 'false');
    }
    if (el.launcherDlDropdown) {
      el.launcherDlDropdown.classList.add('hidden');
      el.launcherDlToggle?.setAttribute('aria-expanded', 'false');
    }
  }

  function switchHeroStage(productKey) {
    if (!STAGE_META[productKey]) return;
    state.activeStage = productKey;
    const meta = STAGE_META[productKey];
    const latest = state.products[productKey]?.[0] || null;
    const tag = latest?.tag || 'v1.1.0';
    const installer = latest?.assets?.installer;

    el.stageTabs.forEach((btn) => {
      const active = btn.dataset.stage === productKey;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    el.stagePreviewImg.src = meta.previewSrc;
    el.stagePreviewImg.alt = `Podgląd ${meta.name}`;
    el.stageProductIcon.src = meta.icon;
    el.stageProductIcon.alt = meta.name;
    el.stageProductName.textContent = meta.name;
    el.stageProductVersion.textContent = tag;
    el.stageProductSummary.textContent = meta.summary;
    el.stageDetailsLink.href = meta.detailsHref;

    el.stageTags.replaceChildren(
      ...meta.tags.map((text) => {
        const span = document.createElement('span');
        span.textContent = text;
        return span;
      })
    );

    if (installer?.downloadUrl) {
      el.stageDownloadBtn.href = installer.downloadUrl;
      if (installer.name) el.stageDownloadBtn.setAttribute('download', installer.name);
      el.stageDownloadSize.textContent = formatSize(installer.size);
    } else {
      el.stageDownloadBtn.href = `https://github.com/${REPOS[productKey]}/releases`;
      el.stageDownloadBtn.removeAttribute('download');
      el.stageDownloadSize.textContent = tag;
    }
  }

  function switchProjectPreview(projectKey, mode) {
    const shot = GALLERY_SHOTS.find((s) => s.project === projectKey && s.mode === mode);
    if (!shot) return;

    if (projectKey === 'browser') {
      state.browserMode = mode;
      el.browserPreviewImg.src = shot.src;
      el.browserPreviewImg.alt = shot.caption;
    } else if (projectKey === 'launcher') {
      state.launcherMode = mode;
      el.launcherPreviewImg.src = shot.src;
      el.launcherPreviewImg.alt = shot.caption;
    }

    el.projectPreviewTabs
      .filter((tab) => tab.dataset.project === projectKey)
      .forEach((tab) => tab.classList.toggle('active', tab.dataset.preview === mode));
  }

  function openLightboxByShotId(shotId) {
    const idx = GALLERY_SHOTS.findIndex((s) => s.id === shotId);
    state.lightboxIndex = idx >= 0 ? idx : 0;
    renderLightboxSlide();
    el.lightboxModal.classList.remove('hidden');
  }

  function closeLightbox() {
    el.lightboxModal.classList.add('hidden');
  }

  function renderLightboxSlide() {
    const shot = GALLERY_SHOTS[state.lightboxIndex];
    if (!shot) return;
    el.lightboxImg.src = shot.src;
    el.lightboxImg.alt = shot.caption;
    el.lightboxCaption.textContent = shot.caption;
    el.lightboxCounter.textContent = `${state.lightboxIndex + 1} / ${GALLERY_SHOTS.length}`;
  }

  function stepLightbox(delta) {
    const total = GALLERY_SHOTS.length;
    state.lightboxIndex = (state.lightboxIndex + delta + total) % total;
    renderLightboxSlide();
  }

  function appendInlineCode(parent, text) {
    const codeRegex = /(`[^`]+`)/g;
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      const code = document.createElement('code');
      code.textContent = match[0].slice(1, -1);
      parent.appendChild(code);
      lastIndex = codeRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
  }

  function appendFormattedInline(parent, text) {
    const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        const strong = document.createElement('strong');
        appendInlineCode(strong, token.slice(2, -2));
        parent.appendChild(strong);
      } else if (token.startsWith('*') && token.endsWith('*')) {
        const em = document.createElement('em');
        em.textContent = token.slice(1, -1);
        parent.appendChild(em);
      } else if (token.startsWith('`') && token.endsWith('`')) {
        const code = document.createElement('code');
        code.textContent = token.slice(1, -1);
        parent.appendChild(code);
      }
      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
  }

  function renderMarkdownNotes(container, markdown) {
    const lines = String(markdown || '').split(/\r?\n/);
    let currentList = null;

    const flushList = () => {
      if (currentList) {
        container.appendChild(currentList);
        currentList = null;
      }
    };

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        flushList();
        continue;
      }
      if (/^#{1,4}\s+/.test(line)) {
        flushList();
        const heading = document.createElement('h4');
        heading.textContent = line.replace(/^#{1,4}\s+/, '');
        container.appendChild(heading);
        continue;
      }
      if (/^[-*•]\s+/.test(line)) {
        if (!currentList) currentList = document.createElement('ul');
        const li = document.createElement('li');
        appendFormattedInline(li, line.replace(/^[-*•]\s+/, ''));
        currentList.appendChild(li);
        continue;
      }
      flushList();
      const p = document.createElement('p');
      appendFormattedInline(p, line);
      container.appendChild(p);
    }
    flushList();
  }

  function applyProductDownloadData(productKey) {
    const latest = state.products[productKey]?.[0];
    if (!latest) return;

    const tag = latest.tag || 'v1.1.0';
    const installer = latest.assets?.installer;
    const portable = latest.assets?.portable;
    const fallbackUrl = latest.htmlUrl || `https://github.com/${REPOS[productKey]}/releases`;

    const installerUrl = installer?.downloadUrl || fallbackUrl;
    const portableUrl = portable?.downloadUrl || fallbackUrl;

    if (productKey === 'browser') {
      el.heroQuickBrowser.href = installerUrl;
      if (installer?.name) el.heroQuickBrowser.setAttribute('download', installer.name);
      el.heroQuickBrowserVer.textContent = tag;

      el.browserVersionBadge.textContent = tag;
      el.browserPrimaryDl.href = installerUrl;
      if (installer?.name) el.browserPrimaryDl.setAttribute('download', installer.name);
      el.browserPrimaryMeta.textContent = installer?.size ? `${tag} · ${formatSize(installer.size)}` : tag;

      el.browserSetupLink.href = installerUrl;
      if (installer?.name) el.browserSetupLink.setAttribute('download', installer.name);
      el.browserSetupSize.textContent = formatSize(installer?.size);

      el.browserPortableLink.href = portableUrl;
      if (portable?.name) el.browserPortableLink.setAttribute('download', portable.name);
      el.browserPortableSize.textContent = formatSize(portable?.size);
    } else if (productKey === 'launcher') {
      el.heroQuickLauncher.href = installerUrl;
      if (installer?.name) el.heroQuickLauncher.setAttribute('download', installer.name);
      el.heroQuickLauncherVer.textContent = tag;

      el.launcherVersionBadge.textContent = tag;
      el.launcherPrimaryDl.href = installerUrl;
      if (installer?.name) el.launcherPrimaryDl.setAttribute('download', installer.name);
      el.launcherPrimaryMeta.textContent = installer?.size ? `${tag} · ${formatSize(installer.size)}` : tag;

      el.launcherSetupLink.href = installerUrl;
      if (installer?.name) el.launcherSetupLink.setAttribute('download', installer.name);
      el.launcherSetupSize.textContent = formatSize(installer?.size);

      el.launcherPortableLink.href = portableUrl;
      if (portable?.name) el.launcherPortableLink.setAttribute('download', portable.name);
      el.launcherPortableSize.textContent = formatSize(portable?.size);
    }
  }

  function renderReleasesList() {
    const combined = [];
    const latestBrowserTag = state.products.browser[0]?.tag;
    const latestLauncherTag = state.products.launcher[0]?.tag;

    if (state.activeFilter === 'all' || state.activeFilter === 'browser') {
      state.products.browser.forEach((rel) => {
        combined.push({
          ...rel,
          productKey: 'browser',
          productLabel: 'Peak Browser',
          isLatestForProduct: rel.tag === latestBrowserTag
        });
      });
    }

    if (state.activeFilter === 'all' || state.activeFilter === 'launcher') {
      state.products.launcher.forEach((rel) => {
        combined.push({
          ...rel,
          productKey: 'launcher',
          productLabel: 'Peak Launcher',
          isLatestForProduct: rel.tag === latestLauncherTag
        });
      });
    }

    combined.sort((a, b) => {
      const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return tb - ta;
    });

    el.releasesSourceNote.textContent =
      state.source === 'github'
        ? 'Zsynchronizowano z GitHub Releases'
        : 'Aktualny katalog wydań PEAK LABS';

    if (combined.length === 0) {
      const emptyCard = document.createElement('div');
      emptyCard.className = 'release-card';
      const p = document.createElement('p');
      p.textContent = 'Brak opublikowanych wydań dla wybranego filtra.';
      emptyCard.appendChild(p);
      el.releasesList.replaceChildren(emptyCard);
      return;
    }

    const frag = document.createDocumentFragment();

    combined.forEach((rel) => {
      const card = document.createElement('article');
      card.className = 'release-card spotlight-card';

      const header = document.createElement('div');
      header.className = 'release-header';

      const titleGroup = document.createElement('div');
      titleGroup.className = 'release-title-group';

      const productPill = document.createElement('span');
      productPill.className = `release-product-pill ${rel.productKey}`;
      productPill.textContent = rel.productLabel;
      titleGroup.appendChild(productPill);

      const tagSpan = document.createElement('span');
      tagSpan.className = 'release-tag';
      tagSpan.textContent = rel.tag || 'v1.0.0';
      titleGroup.appendChild(tagSpan);

      const nameSpan = document.createElement('span');
      nameSpan.className = 'release-name';
      nameSpan.textContent = rel.name || rel.tag;
      titleGroup.appendChild(nameSpan);

      if (rel.isLatestForProduct) {
        const badge = document.createElement('span');
        badge.className = 'release-badge';
        badge.textContent = 'Najnowsza';
        titleGroup.appendChild(badge);
      }

      const dateSpan = document.createElement('span');
      dateSpan.className = 'release-date';
      dateSpan.textContent = formatDate(rel.publishedAt);

      header.append(titleGroup, dateSpan);
      card.appendChild(header);

      const notesDiv = document.createElement('div');
      notesDiv.className = 'release-notes';
      renderMarkdownNotes(notesDiv, rel.body || '');
      card.appendChild(notesDiv);

      const downloadsRow = document.createElement('div');
      downloadsRow.className = 'release-downloads';

      const installer = rel.assets?.installer;
      const portable = rel.assets?.portable;

      if (installer?.downloadUrl) {
        const link = document.createElement('a');
        link.className = 'dl-chip primary';
        link.href = installer.downloadUrl;
        if (installer.name) link.setAttribute('download', installer.name);
        const label = document.createElement('span');
        label.textContent = 'Pobierz Instalator (.exe)';
        const size = document.createElement('span');
        size.className = 'dl-chip-size';
        size.textContent = formatSize(installer.size);
        link.append(label, size);
        downloadsRow.appendChild(link);
      }

      if (portable?.downloadUrl) {
        const link = document.createElement('a');
        link.className = 'dl-chip';
        link.href = portable.downloadUrl;
        if (portable.name) link.setAttribute('download', portable.name);
        const label = document.createElement('span');
        label.textContent = 'Pobierz Portable (.exe)';
        const size = document.createElement('span');
        size.className = 'dl-chip-size';
        size.textContent = formatSize(portable.size);
        link.append(label, size);
        downloadsRow.appendChild(link);
      }

      const ghLink = document.createElement('a');
      ghLink.className = 'dl-chip';
      ghLink.href = rel.htmlUrl || `https://github.com/${REPOS[rel.productKey]}/releases`;
      ghLink.target = '_blank';
      ghLink.rel = 'noopener noreferrer';
      ghLink.textContent = 'Zobacz na GitHubie ↗';
      downloadsRow.appendChild(ghLink);

      card.appendChild(downloadsRow);
      frag.appendChild(card);
    });

    el.releasesList.replaceChildren(frag);
  }

  function mapGithubRelease(repo, release) {
    const rawAssets = Array.isArray(release.assets)
      ? release.assets.map((asset) => ({
          name: asset.name,
          size: typeof asset.size === 'number' ? asset.size : 0,
          downloadUrl: asset.browser_download_url,
          downloadCount: typeof asset.download_count === 'number' ? asset.download_count : 0
        }))
      : [];
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

  async function fetchGithubDirect(repo) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=20`, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal
      });
      if (!res.ok) return null;
      const list = await res.json();
      if (!Array.isArray(list)) return null;
      const published = list.filter((r) => r && !r.draft).map((r) => mapGithubRelease(repo, r));
      return published.length > 0 ? published : null;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  async function loadReleases() {
    let loaded = false;

    if (!isLocalhostOrFile() && !isStaticGithubPages()) {
      try {
        const res = await fetch('/api/releases');
        if (res.ok && (res.headers.get('content-type') || '').includes('application/json')) {
          const json = await res.json();
          if (json?.products) {
            state.products.browser = json.products.browser?.releases || [];
            state.products.launcher = json.products.launcher?.releases || [];
            state.source = json.source || 'github';
            loaded = state.products.browser.length > 0 || state.products.launcher.length > 0;
          }
        }
      } catch {
        // Fallback below
      }
    }

    if (!loaded && window.location.protocol !== 'file:') {
      try {
        const localRes = await fetch('./data/releases.json');
        if (localRes.ok) {
          const json = await localRes.json();
          state.products.browser = Array.isArray(json.browser) ? json.browser : [];
          state.products.launcher = Array.isArray(json.launcher) ? json.launcher : [];
          state.source = 'fallback';
          loaded = true;
        }
      } catch {
        // Ignore
      }
    }

    // Refresh from GitHub API in non-local environments when not already hydrated from /api/releases
    if (!isLocalhostOrFile() && state.source !== 'github') {
      const [ghBrowser, ghLauncher] = await Promise.all([
        fetchGithubDirect(REPOS.browser),
        fetchGithubDirect(REPOS.launcher)
      ]);
      if (ghBrowser || ghLauncher) {
        if (ghBrowser) state.products.browser = ghBrowser;
        if (ghLauncher) state.products.launcher = ghLauncher;
        state.source = 'github';
      }
    }

    applyProductDownloadData('browser');
    applyProductDownloadData('launcher');
    switchHeroStage(state.activeStage);
    renderReleasesList();
  }

  function bindEvents() {
    el.themeToggle.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      setSiteTheme(next);
    });

    el.mobileMenuToggle?.addEventListener('click', () => setMobileDrawerOpen(true));
    el.mobileDrawerClose?.addEventListener('click', () => setMobileDrawerOpen(false));
    el.mobileDrawer?.addEventListener('click', (e) => {
      if (e.target === el.mobileDrawer) setMobileDrawerOpen(false);
    });
    el.mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => setMobileDrawerOpen(false));
    });

    el.stageTabs.forEach((tab) => {
      tab.addEventListener('click', () => switchHeroStage(tab.dataset.stage));
    });

    el.stageZoomBtn?.addEventListener('click', () => {
      const shotId = STAGE_META[state.activeStage]?.shotId || 'browser-dark';
      openLightboxByShotId(shotId);
    });

    el.projectPreviewTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        switchProjectPreview(tab.dataset.project, tab.dataset.preview);
      });
    });

    el.browserZoomBtn?.addEventListener('click', () => {
      openLightboxByShotId(`browser-${state.browserMode}`);
    });

    el.launcherZoomBtn?.addEventListener('click', () => {
      openLightboxByShotId(`launcher-${state.launcherMode}`);
    });

    el.browserDlToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = el.browserDlDropdown.classList.contains('hidden');
      closeAllDropdowns();
      el.browserDlDropdown.classList.toggle('hidden', !willOpen);
      el.browserDlToggle.setAttribute('aria-expanded', String(willOpen));
    });

    el.launcherDlToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = el.launcherDlDropdown.classList.contains('hidden');
      closeAllDropdowns();
      el.launcherDlDropdown.classList.toggle('hidden', !willOpen);
      el.launcherDlToggle.setAttribute('aria-expanded', String(willOpen));
    });

    el.releaseFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeFilter = btn.dataset.filter || 'all';
        el.releaseFilterBtns.forEach((b) => b.classList.toggle('active', b === btn));
        renderReleasesList();
      });
    });

    el.lightboxBackdrop?.addEventListener('click', closeLightbox);
    el.lightboxClose?.addEventListener('click', closeLightbox);
    el.lightboxPrev?.addEventListener('click', () => stepLightbox(-1));
    el.lightboxNext?.addEventListener('click', () => stepLightbox(1));

    document.addEventListener('click', (e) => {
      const insideBrowser = el.browserDlWrap?.contains(e.target);
      const insideLauncher = el.launcherDlWrap?.contains(e.target);
      if (!insideBrowser && !insideLauncher) {
        closeAllDropdowns();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
        setMobileDrawerOpen(false);
        closeLightbox();
      } else if (!el.lightboxModal.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') stepLightbox(-1);
        if (e.key === 'ArrowRight') stepLightbox(1);
      }
    });
  }

  function init() {
    try {
      const saved = localStorage.getItem('peak-labs-site-theme');
      if (saved === 'dark' || saved === 'light') {
        setSiteTheme(saved);
      }
    } catch {
      // Ignore storage errors
    }

    if (window.PeakLabsFX) {
      window.PeakLabsFX.init('aurora-fx');
    }

    bindEvents();
    loadReleases();
  }

  init();
})();
