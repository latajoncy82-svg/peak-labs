(() => {
  const STORAGE_LANG_KEY = 'peak-labs-site-lang';
  const CACHE_PREFIX = 'peak-labs-i18n-cache-v5:';
  const REL_CACHE_PREFIX = 'peak-labs-i18n-rel-v5:';
  const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur']);

  const PROTECTED_BRAND_TERMS = [
    'Alpine Aurora & Summit Glass',
    'Peak Cinema & Summit Glass',
    'peaklabstudio.vercel.app',
    'PEAKLABSTUDIO.VERCEL.APP',
    'peakbrowser.vercel.app',
    'Peak Launcher · Cinema',
    'MIKOŁAJ GRYNIENKO',
    'Mikołaj Grynienko',
    'Mojang/Modrinth',
    '3D Skin Studio',
    'Peak FPS Boost',
    '<address>.peak',
    'Peak Launcher',
    'Peak Browser',
    'Alpine Aurora',
    'Summit Glass',
    'Fabric Loader',
    'Hosting .peak',
    'Server .peak',
    'Night Summit',
    'Glacial Day',
    'Peak Cinema',
    'Peak Shield',
    'Peak Mode',
    'HTTPS-First',
    '<name>.peak',
    'Fabric API',
    'PEAK LABS',
    'Vanilla',
    'Fabric',
    '.peak'
  ];

  const INSTANT_LANGUAGES = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'pl', label: 'Polski', short: 'PL' },
    { code: 'de', label: 'Deutsch', short: 'DE' },
    { code: 'es', label: 'Español', short: 'ES' },
    { code: 'fr', label: 'Français', short: 'FR' },
    { code: 'uk', label: 'Українська', short: 'UK' },
    { code: 'it', label: 'Italiano', short: 'IT' },
    { code: 'pt', label: 'Português', short: 'PT' },
    { code: 'cs', label: 'Čeština', short: 'CS' },
    { code: 'ja', label: '日本語', short: 'JA' }
  ];

  const AUTO_LANGUAGES = [
    { code: 'nl', label: 'Nederlands', short: 'NL' },
    { code: 'sv', label: 'Svenska', short: 'SV' },
    { code: 'tr', label: 'Türkçe', short: 'TR' },
    { code: 'ko', label: '한국어', short: 'KO' },
    { code: 'zh-CN', label: '中文', short: 'ZH' },
    { code: 'ar', label: 'العربية', short: 'AR' },
    { code: 'hu', label: 'Magyar', short: 'HU' },
    { code: 'ro', label: 'Română', short: 'RO' },
    { code: 'sk', label: 'Slovenčina', short: 'SK' },
    { code: 'fi', label: 'Suomi', short: 'FI' },
    { code: 'no', label: 'Norsk', short: 'NO' },
    { code: 'da', label: 'Dansk', short: 'DA' },
    { code: 'vi', label: 'Tiếng Việt', short: 'VI' },
    { code: 'hi', label: 'हिन्दी', short: 'HI' },
    { code: 'el', label: 'Ελληνικά', short: 'EL' }
  ];

  const TOKEN_DEFS = {
    'hero.lead': [
      { tag: 'strong', text: 'Mikołaj Grynienko', notranslate: true },
      { tag: 'strong', text: 'Peak Cinema', notranslate: true },
      { tag: 'strong', text: 'Summit Glass', notranslate: true },
      { tag: 'strong', text: 'Peak Browser', notranslate: true },
      { tag: 'span', text: '148,604', notranslate: true },
      { tag: 'strong', text: 'Peak Launcher', notranslate: true },
      { tag: 'span', text: '.peak', notranslate: true }
    ],
    'about.lead': [
      { tag: 'strong', text: 'PEAK LABS', notranslate: true },
      { tag: 'strong', text: 'Mikołaj Grynienko', notranslate: true },
      { tag: 'em', text: 'Peak Cinema', notranslate: true }
    ],
    'about.card2Desc': [
      { tag: 'span', text: '148,604', notranslate: true },
      { tag: 'span', text: 'HTTPS-First', notranslate: true }
    ],
    'about.card3Desc': [
      { tag: 'code', text: '*.peak', notranslate: true }
    ],
    'about.card4Desc': [
      { tag: 'span', text: 'Peak Browser', notranslate: true },
      { tag: 'span', text: 'Peak Launcher', notranslate: true },
      { tag: 'span', text: 'GitHub', notranslate: true },
      { tag: 'code', text: '.exe', notranslate: true }
    ],
    'browser.summary': [
      { tag: 'strong', text: '148,604', notranslate: true },
      { tag: 'strong', text: 'Peak Shield', notranslate: true },
      { tag: 'strong', text: 'HTTPS-First', notranslate: true }
    ],
    'browser.f5Desc': [
      { tag: 'code', text: 'peak://newtab', notranslate: true },
      { tag: 'span', text: 'PEAK LABS', notranslate: true }
    ],
    'launcher.summary': [
      { tag: 'strong', text: 'Peak Cinema', notranslate: true },
      { tag: 'strong', text: '.peak', notranslate: true },
      { tag: 'strong', text: '3D Skin Studio', notranslate: true },
      { tag: 'span', text: 'Modrinth', notranslate: true }
    ],
    'launcher.f1Desc': [
      { tag: 'code', text: '*.peak', notranslate: true }
    ],
    'launcher.f6Desc': [
      { tag: 'code', text: 'mods/', notranslate: true },
      { tag: 'code', text: 'config/', notranslate: true },
      { tag: 'code', text: '.peak', notranslate: true }
    ],
    'eco.labLead': [
      { tag: 'span', text: 'PEAK LABS', notranslate: true }
    ],
    'eco.road3Desc': [
      { tag: 'code', text: 'peaklabstudio.vercel.app', notranslate: true }
    ],
    'releases.lead': [
      { tag: 'code', text: '.exe', notranslate: true },
      { tag: 'span', text: 'PEAK LABS', notranslate: true }
    ],
    'creator.bio': [
      { tag: 'strong', text: 'PEAK LABS', notranslate: true },
      { tag: 'strong', text: 'Peak Launcher', notranslate: true },
      { tag: 'span', text: '.peak', notranslate: true },
      { tag: 'strong', text: 'Peak Browser', notranslate: true },
      { tag: 'span', text: 'Peak Shield', notranslate: true },
      { tag: 'em', text: 'Peak Cinema', notranslate: true }
    ],
    'footer.copyright': [
      { tag: 'strong', text: 'Mikołaj Grynienko', notranslate: true }
    ]
  };

  const LOCALES = {
    en: {
      'meta.title': 'PEAK LABS — Software Studio | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS is an independent software studio founded by Mikołaj Grynienko. Creators of Peak Browser (v1.2.1 with 148,604 adblock rules) and Peak Launcher (v1.5.1 with .peak hosting and 3D skins).',
      'meta.ogDescription': 'Independent software studio PEAK LABS (peaklabstudio.vercel.app) — creators of Peak Browser v1.2.1 and Peak Launcher v1.5.1. Founder: Mikołaj Grynienko.',
      'brand.ariaLabel': 'PEAK LABS — home page',
      'nav.ariaLabel': 'Main navigation',
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.ecosystem': 'Ecosystem',
      'nav.releases': 'Releases',
      'nav.creator': 'Creator',
      'header.themeTitle': 'Switch site theme (Dark / Light)',
      'header.themeAria': 'Switch site theme',
      'header.menuOpenAria': 'Open menu',
      'header.menuCloseAria': 'Close menu',
      'mobile.navAria': 'Mobile menu',
      'mobile.creatorLabel': 'Creator: Mikołaj Grynienko',
      'lang.aria': 'Language selector',
      'lang.auto': 'Auto (Browser)',
      'lang.instantGroup': 'Instant languages',
      'lang.autoGroup': 'Auto-translate',
      'lang.translating': 'Translating…',
      'hero.releasePillAria': 'Jump to latest releases',
      'hero.tagline': 'Independent software at the summit of design, speed, and privacy.',
      'hero.lead': 'Founded by [0], we craft native Windows applications in the [1] & [2] aesthetic — [3] with [4] adblock rules and [5] with [6] server hosting and 3D skins.',
      'hero.ctaProjects': 'Explore our projects',
      'hero.ctaReleases': 'Download center',
      'hero.stageAria': 'Switch product preview',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Hosting .peak',
      'hero.stageSkins': '3D Skin Studio',
      'hero.stageBrowserDark': 'Peak Browser · Dark',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'Enlarge screenshot',
      'hero.stageDownload': 'Download Installer',
      'hero.stageDetails': 'Details ↓',
      'hero.stat1Label': 'Ad & tracker filter rules',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Minecraft versions & .peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · Alpha to 26.3',
      'hero.stat3Label': 'Published GitHub releases',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'Telemetry, accounts, or ads',
      'hero.stat4Sub': '100% local & open source',
      'about.kicker': 'PEAK LABS · INDEPENDENT SOFTWARE STUDIO',
      'about.title': 'Software crafted at the summit.',
      'about.lead': '[0] is an independent Polish software studio and laboratory founded by [1]. Every tool in our ecosystem is engineered for calm clarity, zero tracking, and effortless performance on Windows 10 and 11 — combining the distraction-free [2] interface with deep technical automation.',
      'about.jumpBrowser': 'v1.2.1 · 148K Adblock & HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · .peak Hosting & 3D Skins',
      'about.jumpReleases': '15 direct .exe installers & changelogs',
      'about.card1Title': 'Peak Cinema & Summit Glass Design',
      'about.card1Desc': 'Full-bleed alpine vistas, dark obsidian surfaces, hairline borders, and frosted glass panels replace noisy boxes — putting your web page or game launch front and center.',
      'about.card2Title': 'Peak Shield 148K & HTTPS-First',
      'about.card2Desc': 'Real network and cosmetic adblocking powered by [0] filter rules, YouTube ad removal, encrypted [1] upgrades, and tracking parameter stripping.',
      'about.card3Title': 'Hosting .peak & 3D WebGL Skins',
      'about.card3Desc': 'Host local Fabric or Vanilla Minecraft servers with live [0] domains over the internet, customize characters in a 3D skin studio, and auto-install Java and mods.',
      'about.card4Title': '100% Open Source & Zero Telemetry',
      'about.card4Desc': 'No accounts, no telemetry, and no locked ecosystems. Every release of [0] and [1] is published openly on [2] with NSIS ([3]) and Portable builds.',
      'projects.kicker': 'OUR PROJECTS · FLAGSHIP APPLICATIONS',
      'projects.title': 'Two flagship applications for Windows',
      'projects.lead': 'Switch live product views, enlarge any screenshot in the fullscreen Lightbox, or download the latest release directly.',
      'browser.num': 'PROJECT 01',
      'browser.cat': 'Web browser',
      'browser.summary': 'A clean, fast Windows browser with the Blue Mountain aesthetic, a full [0]-rule [1] adblocker, [2] security, and redesigned full-screen settings.',
      'browser.galleryCaption': 'Peak Browser interface preview',
      'browser.themesAria': 'Peak Browser themes',
      'browser.tabDark': 'Dark (Default)',
      'browser.tabSettings': 'Settings & Shield',
      'browser.tabLight': 'Light',
      'browser.zoomAria': 'Enlarge Peak Browser screenshot',
      'browser.f1Title': 'Peak Shield · 148,604 rules',
      'browser.f1Desc': '@ghostery/adblocker with EasyList, EasyPrivacy, uBlock & YouTube ad stripping.',
      'browser.f2Title': 'HTTPS-First & Privacy',
      'browser.f2Desc': 'Enforces HTTPS upgrades, strips URL trackers (utm, fbclid), sends Sec-GPC & DNT.',
      'browser.f3Title': 'Redesigned peak://settings',
      'browser.f3Desc': 'Two-column settings workspace with search, allowlist & Shield domain inspector.',
      'browser.f4Title': 'Compact 78 px Bar & Tabs',
      'browser.f4Desc': 'Sculpted active tab, drag & drop tab reordering, smart URL bar & quick copy.',
      'browser.f5Title': '3 Blue Mountain Themes',
      'browser.f5Desc': 'Dark, Blue & Light across window UI, [0], and opens [1] on startup.',
      'browser.f6Title': 'Zero Accounts · 100% Local',
      'browser.f6Desc': 'No telemetry, search engine choice, and granular history/cookie/cache clearing.',
      'browser.dlBtn': 'Download Peak Browser',
      'browser.dlMoreTitle': 'More Peak Browser download options',
      'browser.siteBtn': 'Project website',
      'launcher.num': 'PROJECT 02',
      'launcher.cat': 'Minecraft launcher',
      'launcher.summary': 'Cinematic Minecraft launcher featuring the [0] interface, self-hosted [1] servers over the internet, a [2], [3] mods & shaders, and automatic Java and Fabric setup.',
      'launcher.galleryCaption': 'Peak Launcher preview',
      'launcher.viewsAria': 'Peak Launcher views',
      'launcher.tabDark': 'Night Summit',
      'launcher.tabHosting': 'Hosting .peak',
      'launcher.tabSkins': '3D Skins',
      'launcher.tabMods': 'Mods & Shaders',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.tabLight': 'Glacial Day',
      'launcher.zoomAria': 'Enlarge Peak Launcher screenshot',
      'launcher.f1Title': 'Hosting .peak & Global Tunnel',
      'launcher.f1Desc': 'Run local Fabric/Vanilla servers with [0], Java DNS SPI & public tunnel.',
      'launcher.f2Title': '3D Skin Studio (WebGL)',
      'launcher.f2Desc': 'Interactive 3D preview, .png upload, username lookup & live Yggdrasil in-game skins.',
      'launcher.f3Title': 'Peak Cinema & Multi-Account',
      'launcher.f3Desc': 'Full-bleed mountain GUI, top-bar account switcher, 6 languages & Pro Options.',
      'launcher.f4Title': 'Modrinth Pro: Mods & Shaders',
      'launcher.f4Desc': 'Mods, Shaders & Resource Packs, 1-click updates & 3 starter packs.',
      'launcher.f5Title': '925+ Versions · Auto-Java/Fabric',
      'launcher.f5Desc': 'Mojang catalog from Alpha to 26.3, Eclipse Temurin Java 8/17/21/25 & Fabric.',
      'launcher.f6Title': 'Isolated Profiles & .peak Invites',
      'launcher.f6Desc': 'Separate [0], [1], worlds & shareable [2] invite files with mods.',
      'launcher.dlBtn': 'Download Peak Launcher',
      'launcher.dlMoreTitle': 'More Peak Launcher download options',
      'common.enlarge': 'Enlarge',
      'common.enlargeTitle': 'Enlarge in Lightbox',
      'dl.setupTitle': 'Windows Installer (.exe)',
      'dl.setupSubBrowser': 'Recommended · creates shortcuts and full installation',
      'dl.setupSubLauncher': 'Recommended · creates desktop & Start menu shortcuts',
      'dl.portableTitle': 'Portable Edition (.exe)',
      'dl.portableSub': 'No installation · runs immediately on launch',
      'dl.allReleases': 'All releases on GitHub',
      'eco.kicker': 'ARCHITECTURE & STANDARDS · PEAK LABS ECOSYSTEM',
      'eco.title': 'Shared technological foundation',
      'eco.lead': 'Both applications share the same engineering standard, zero-telemetry architecture, and alpine Peak Cinema aesthetics.',
      'eco.colParam': 'Ecosystem parameter',
      'eco.row1Key': 'Operating system',
      'eco.row2Key': 'Distribution format',
      'eco.row2Val': 'NSIS Installer + Portable (.exe)',
      'eco.row3Key': 'Visual & UI system',
      'eco.row3Browser': 'Blue Mountain · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6 languages',
      'eco.row4Key': 'Flagship capabilities',
      'eco.row4Browser': 'Peak Shield 148K & HTTPS-First',
      'eco.row4Launcher': 'Hosting .peak, 3D Skins & Modrinth Pro',
      'eco.row5Key': 'Update channel',
      'eco.row6Key': 'Price & telemetry',
      'eco.row6Val': 'Free · 0 telemetry',
      'eco.labBadge': 'PEAK LABS LABORATORY · ROADMAP',
      'eco.labTitle': 'Continuous evolution in 2026+',
      'eco.labLead': '[0] rapidly ships weekly upgrades to both flagship apps while researching new lightweight Windows utilities.',
      'eco.road1Desc': 'Even faster filter updates, deeper Peak Shield insights, and tab workspace refinements.',
      'eco.road2Desc': 'Enhanced .peak global server discovery, multiplayer diagnostics, and WebGL skin tools.',
      'eco.road3Title': 'Upcoming PEAK LABS tools',
      'eco.road3Desc': 'Lightweight Peak Cinema desktop utilities published at [0].',
      'releases.kicker': 'DOWNLOAD CENTER · GITHUB RELEASES',
      'releases.title': 'Releases & changelog',
      'releases.lead': 'Direct [0] installers and Portable builds across all [1] versions.',
      'releases.filterAria': 'Filter releases by product',
      'releases.filterAll': 'All',
      'releases.loading': 'Loading releases…',
      'releases.synced': 'Synced with GitHub Releases',
      'releases.catalog': 'Current PEAK LABS release catalog',
      'releases.empty': 'No published releases match the selected filter.',
      'releases.latestBadge': 'Latest',
      'releases.dlSetup': 'Download Installer (.exe)',
      'releases.dlPortable': 'Download Portable (.exe)',
      'releases.viewGithub': 'View on GitHub ↗',
      'releases.showAll': 'Show all {n} releases',
      'releases.showFewer': 'Show latest 4 releases',
      'creator.kicker': 'FOUNDER & CREATOR OF PEAK LABS',
      'creator.role1': 'Founder · PEAK LABS',
      'creator.role2': 'Desktop & Web Developer',
      'creator.role3': 'UI/UX Designer',
      'creator.bio': 'Architects and builds the entire [0] ecosystem from scratch — from the [1] engine with self-hosted [2] servers, Java DNS SPI routing, and a 3D WebGL Skin Studio, to [3] with [4] (148,604 adblock rules) and the cohesive [5] visual system.',
      'creator.githubBtn': 'GitHub Profile (latajoncy82-svg)',
      'creator.repoBtn': 'PEAK LABS Repository',
      'footer.about': 'Independent software studio crafting clean, fast Windows 10/11 apps in the Peak Cinema & Summit Glass aesthetic.',
      'footer.navTitle': 'Navigation',
      'footer.productsTitle': 'Products',
      'footer.launcherSite': 'Peak Launcher Website ↗',
      'footer.githubProfile': 'latajoncy82-svg Profile ↗',
      'footer.repoLabs': 'PEAK LABS Repo ↗',
      'footer.repoBrowser': 'Peak Browser Repo ↗',
      'footer.repoLauncher': 'Peak Launcher Repo ↗',
      'footer.copyright': '© 2026 PEAK LABS · Creator: [0]',
      'footer.themeCredit': 'Peak Cinema & Summit Glass Aesthetic',
      'lightbox.defaultCaption': 'Screen preview',
      'lightbox.prevAria': 'Previous screenshot',
      'lightbox.nextAria': 'Next screenshot',
      'lightbox.closeAria': 'Close preview',
      'stage.launcherCinemaSummary': 'Cinematic Minecraft launcher with .peak hosting and 3D Skin Studio.',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+ versions',
      'stage.launcherCinemaTag3': 'Auto-Java & Fabric',
      'stage.hostingSummary': 'Self-host Fabric & Vanilla servers with live <address>.peak domains.',
      'stage.hostingTag1': 'Hosting .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': 'Public Tunnel',
      'stage.skinsSummary': 'Interactive 3D WebGL skin editor with in-game Yggdrasil rendering.',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4 Peak Presets',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': 'Clean Windows browser opening PEAK LABS on startup with Blue Mountain themes.',
      'stage.browserDarkTag1': '78 px Bar',
      'stage.browserDarkTag2': 'Drag & Drop Tabs',
      'stage.browserDarkTag3': 'Zero Telemetry',
      'stage.browserSettingsSummary': 'Full 148,604-rule Peak Shield adblocker, HTTPS-First & two-column settings.',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'YouTube Adblock',
      'stage.previewAltPrefix': 'Preview of',
      'shot.browserDark': 'Peak Browser — Dark Theme (Default)',
      'shot.browserSettings': 'Peak Browser — Settings & Peak Shield (148,604 rules)',
      'shot.browserLight': 'Peak Browser — Light Theme',
      'shot.launcherDark': 'Peak Launcher — Night Summit (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Hosting .peak Servers',
      'shot.launcherSkins': 'Peak Launcher — 3D Skin Studio (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro: Mods & Shaders',
      'shot.launcherJava': 'Peak Launcher — Java & Fabric Center',
      'shot.launcherLight': 'Peak Launcher — Glacial Day (Peak Cinema)'
    },

    pl: {
      'meta.title': 'PEAK LABS — Studio oprogramowania | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS to niezależne studio oprogramowania założone przez Mikołaja Grynienkę. Twórcy Peak Browser (v1.2.1 ze 148 604 regułami adblocka) i Peak Launcher (v1.5.1 z hostingiem .peak i skinami 3D).',
      'meta.ogDescription': 'Niezależne studio oprogramowania PEAK LABS (peaklabstudio.vercel.app) — twórcy Peak Browser v1.2.1 i Peak Launcher v1.5.1. Założyciel: Mikołaj Grynienko.',
      'brand.ariaLabel': 'PEAK LABS — strona główna',
      'nav.ariaLabel': 'Nawigacja główna',
      'nav.about': 'O firmie',
      'nav.projects': 'Projekty',
      'nav.ecosystem': 'Ekosystem',
      'nav.releases': 'Wydania',
      'nav.creator': 'Twórca',
      'header.themeTitle': 'Przełącz motyw strony (Ciemny / Jasny)',
      'header.themeAria': 'Przełącz motyw strony',
      'header.menuOpenAria': 'Otwórz menu',
      'header.menuCloseAria': 'Zamknij menu',
      'mobile.navAria': 'Menu mobilne',
      'mobile.creatorLabel': 'Twórca: Mikołaj Grynienko',
      'lang.aria': 'Wybór języka',
      'lang.auto': 'Auto (Przeglądarka)',
      'lang.instantGroup': 'Języki wbudowane',
      'lang.autoGroup': 'Auto-tłumaczenie',
      'lang.translating': 'Tłumaczenie…',
      'hero.releasePillAria': 'Przejdź do najnowszych wydań',
      'hero.tagline': 'Niezależne oprogramowanie na szczycie designu, szybkości i prywatności.',
      'hero.lead': 'Założone przez [0] studio tworzące aplikacje na Windows w estetyce [1] & [2] — [3] z [4] regułami adblocka oraz [5] z własnym hostingiem [6] i skinami 3D.',
      'hero.ctaProjects': 'Poznaj nasze projekty',
      'hero.ctaReleases': 'Centrum pobrań',
      'hero.stageAria': 'Przełącz podgląd produktu',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Hosting .peak',
      'hero.stageSkins': 'Studio Skinów 3D',
      'hero.stageBrowserDark': 'Peak Browser · Ciemny',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'Powiększ zrzut ekranu',
      'hero.stageDownload': 'Pobierz Instalator',
      'hero.stageDetails': 'Szczegóły ↓',
      'hero.stat1Label': 'Reguł blokowania reklam',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Wersji Minecrafta i .peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · od Alpha po 26.3',
      'hero.stat3Label': 'Opublikowanych wydań',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'Telemetrii, kont i reklam',
      'hero.stat4Sub': '100% lokalnie i open source',
      'about.kicker': 'PEAK LABS · NIEZALEŻNE STUDIO OPROGRAMOWANIA',
      'about.title': 'Oprogramowanie tworzone na szczycie.',
      'about.lead': '[0] to niezależne polskie studio i laboratorium software’owe założone przez [1]. Każde narzędzie w naszym ekosystemie projektujemy z myślą o przejrzystości, braku śledzenia i błyskawicznym działaniu na Windows 10 i 11 — łącząc kinowy interfejs [2] z głęboką automatyzacją.',
      'about.jumpBrowser': 'v1.2.1 · Adblock 148K i HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · Hosting .peak i Skiny 3D',
      'about.jumpReleases': '15 instalatorów .exe i listy zmian',
      'about.card1Title': 'Design Peak Cinema & Summit Glass',
      'about.card1Desc': 'Pełnoekranowe panoramy górskie, głębokie ciemne powierzchnie, cienkie linie 1 px i matowe szkło zastępują zbędne ramki — oddając przestrzeń stronie lub grze.',
      'about.card2Title': 'Peak Shield 148K & HTTPS-First',
      'about.card2Desc': 'Prawdziwe sieciowe i kosmetyczne blokowanie reklam oparte na [0] regułach, usuwanie reklam YouTube, wymuszanie szyfrowania [1] i wycinanie trackerów URL.',
      'about.card3Title': 'Hosting .peak i Skiny 3D WebGL',
      'about.card3Desc': 'Uruchamiaj własne serwery Fabric lub Vanilla z działającymi przez Internet domenami [0], twórz skiny w studiu 3D i automatyzuj Javę oraz mody.',
      'about.card4Title': '100% Open Source & Zero Telemetrii',
      'about.card4Desc': 'Bez wymuszonych kont, telemetrii i zamkniętych ekosystemów. Każde wydanie [0] i [1] publikujemy jawnie na [2] jako instalator NSIS ([3]) i Portable.',
      'projects.kicker': 'NASZE PROJEKTY · FLAGOWE APLIKACJE',
      'projects.title': 'Dwie flagowe aplikacje na Windows',
      'projects.lead': 'Przełączaj widoki na żywo, powiększaj zrzuty w pełnym oknie Lightbox lub pobierz najnowszą wersję jednym kliknięciem.',
      'browser.num': 'PROJEKT 01',
      'browser.cat': 'Przeglądarka internetowa',
      'browser.summary': 'Szybka i czysta przeglądarka z motywem Niebieskiej Góry, pełnym adblockiem [1] ([0] reguł), ochroną [2] oraz przeprojektowanymi pełnoekranowymi ustawieniami.',
      'browser.galleryCaption': 'Podgląd interfejsu Peak Browser',
      'browser.themesAria': 'Motywy Peak Browser',
      'browser.tabDark': 'Ciemny (Domyślny)',
      'browser.tabSettings': 'Ustawienia & Ochrona',
      'browser.tabLight': 'Jasny',
      'browser.zoomAria': 'Powiększ zrzut Peak Browser',
      'browser.f1Title': 'Peak Shield · 148 604 reguły',
      'browser.f1Desc': 'Silnik @ghostery/adblocker z listami EasyList, EasyPrivacy, MajkiIT i ochroną YouTube.',
      'browser.f2Title': 'HTTPS-First i prywatność',
      'browser.f2Desc': 'Wymuszanie HTTPS, czyszczenie parametrów URL (utm, fbclid), nagłówki Sec-GPC i DNT.',
      'browser.f3Title': 'Nowe ustawienia peak://settings',
      'browser.f3Desc': 'Dwukolumnowy układ z wyszukiwarką, listą wyjątków i inspektorem zablokowanych domen.',
      'browser.f4Title': 'Zwarty pasek 78 px i karty',
      'browser.f4Desc': 'Wyprofilowana aktywna karta, przeciąganie kart drag & drop i szybkie kopiowanie URL.',
      'browser.f5Title': '3 motywy Niebieskiej Góry',
      'browser.f5Desc': 'Ciemny, Niebieski i Jasny w całym oknie, na [0] i ze startem na stronie [1].',
      'browser.f6Title': 'Zero kont · 100% lokalnie',
      'browser.f6Desc': 'Bez telemetrii, wybór wyszukiwarki oraz precyzyjne czyszczenie historii i cookies.',
      'browser.dlBtn': 'Pobierz Peak Browser',
      'browser.dlMoreTitle': 'Więcej opcji pobierania Peak Browser',
      'browser.siteBtn': 'Strona projektu',
      'launcher.num': 'PROJEKT 02',
      'launcher.cat': 'Launcher Minecraft',
      'launcher.summary': 'Kinowy launcher Minecrafta z interfejsem [0], własnymi serwerami [1] dostępnymi przez Internet, [2], modami i shaderami [3] oraz automatyczną Javą i Fabriciem.',
      'launcher.galleryCaption': 'Podgląd Peak Launcher',
      'launcher.viewsAria': 'Widoki Peak Launcher',
      'launcher.tabDark': 'Nocny Szczyt',
      'launcher.tabHosting': 'Hosting .peak',
      'launcher.tabSkins': 'Skiny 3D',
      'launcher.tabMods': 'Mody i Shadery',
      'launcher.tabJava': 'Java i Fabric',
      'launcher.tabLight': 'Lodowcowy Dzień',
      'launcher.zoomAria': 'Powiększ zrzut Peak Launcher',
      'launcher.f1Title': 'Hosting .peak i Tunel Publiczny',
      'launcher.f1Desc': 'Serwery Fabric/Vanilla pod adresem [0], Java DNS SPI oraz tunel bez port-forwardingu.',
      'launcher.f2Title': 'Studio Skinów 3D (WebGL)',
      'launcher.f2Desc': 'Podgląd 3D postaci, wgrywanie .png, pobieranie po nicku i skiny w grze przez Yggdrasil.',
      'launcher.f3Title': 'Peak Cinema i Wiele Kont',
      'launcher.f3Desc': 'Kinowa panorama górska, przełącznik kont na pasku, 6 języków oraz menu Opcji Pro.',
      'launcher.f4Title': 'Baza Modrinth Pro',
      'launcher.f4Desc': 'Mody, Shadery i Paczki zasobów, aktualizacje 1 kliknięciem i 3 gotowe pakiety startowe.',
      'launcher.f5Title': '925+ wersji · Auto-Java/Fabric',
      'launcher.f5Desc': 'Katalog Mojang od Alphy po 26.3, oficjalna Java 8/17/21/25 Temurin i Fabric Loader.',
      'launcher.f6Title': 'Izolowane profile i pliki .peak',
      'launcher.f6Desc': 'Osobne foldery [0], [1], światy oraz zaproszenia [2] instalujące mody znajomym.',
      'launcher.dlBtn': 'Pobierz Peak Launcher',
      'launcher.dlMoreTitle': 'Więcej opcji pobierania Peak Launcher',
      'common.enlarge': 'Powiększ',
      'common.enlargeTitle': 'Powiększ w Lightboxie',
      'dl.setupTitle': 'Instalator Windows (.exe)',
      'dl.setupSubBrowser': 'Zalecany · tworzy skróty i pełną instalację',
      'dl.setupSubLauncher': 'Zalecany · tworzy skróty na pulpicie i w menu Start',
      'dl.portableTitle': 'Wersja Portable (.exe)',
      'dl.portableSub': 'Bez instalacji · działa od razu po uruchomieniu',
      'dl.allReleases': 'Wszystkie wydania na GitHubie',
      'eco.kicker': 'ARCHITEKTURA I STANDARDY · EKOSYSTEM PEAK LABS',
      'eco.title': 'Wspólny fundament technologiczny',
      'eco.lead': 'Obie aplikacje dzielą ten sam standard inżynieryjny, architekturę bez telemetrii oraz alpejską estetykę Peak Cinema.',
      'eco.colParam': 'Parametr ekosystemu',
      'eco.row1Key': 'System operacyjny',
      'eco.row2Key': 'Format dystrybucji',
      'eco.row2Val': 'Instalator NSIS + Portable (.exe)',
      'eco.row3Key': 'System wizualny i UI',
      'eco.row3Browser': 'Niebieska Góra · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6 języków',
      'eco.row4Key': 'Główne możliwości',
      'eco.row4Browser': 'Peak Shield 148K i HTTPS-First',
      'eco.row4Launcher': 'Hosting .peak, Skiny 3D i Modrinth Pro',
      'eco.row5Key': 'Kanał aktualizacji',
      'eco.row6Key': 'Cena i telemetria',
      'eco.row6Val': 'Bezpłatne · 0 telemetrii',
      'eco.labBadge': 'LABORATORIUM PEAK LABS · ROZWÓJ',
      'eco.labTitle': 'Ciągły rozwój w 2026+',
      'eco.labLead': '[0] regularnie dostarcza nowe wydania obu flagowych produktów oraz tworzy kolejne lekkie narzędzia na Windows.',
      'eco.road1Desc': 'Jeszcze szybsze aktualizacje filtrów, rozbudowana analiza Peak Shield i usprawnienia kart.',
      'eco.road2Desc': 'Rozwój globalnych adresów .peak, diagnostyki serwerów oraz narzędzi skinów WebGL.',
      'eco.road3Title': 'Kolejne narzędzia PEAK LABS',
      'eco.road3Desc': 'Lekkie aplikacje desktopowe Peak Cinema publikowane pod adresem [0].',
      'releases.kicker': 'CENTRUM POBRAŃ · GITHUB RELEASES',
      'releases.title': 'Wydania i lista zmian',
      'releases.lead': 'Bezpośrednie instalatory [0] oraz wersje Portable ze wszystkich wydań [1].',
      'releases.filterAria': 'Filtruj wydania po produkcie',
      'releases.filterAll': 'Wszystkie',
      'releases.loading': 'Ładowanie wydań…',
      'releases.synced': 'Zsynchronizowano z GitHub Releases',
      'releases.catalog': 'Aktualny katalog wydań PEAK LABS',
      'releases.empty': 'Brak opublikowanych wydań dla wybranego filtra.',
      'releases.latestBadge': 'Najnowsza',
      'releases.dlSetup': 'Pobierz Instalator (.exe)',
      'releases.dlPortable': 'Pobierz Portable (.exe)',
      'releases.viewGithub': 'Zobacz na GitHubie ↗',
      'releases.showAll': 'Pokaż wszystkie wydania ({n})',
      'releases.showFewer': 'Pokaż 4 najnowsze wydania',
      'creator.kicker': 'ZAŁOŻYCIEL & TWÓRCA PEAK LABS',
      'creator.role1': 'Założyciel · PEAK LABS',
      'creator.role2': 'Desktop & Web Developer',
      'creator.role3': 'Projektant UI/UX',
      'creator.bio': 'Projektuje i buduje od podstaw cały ekosystem [0] — od silnika [1] z własnym hostingiem serwerów [2], routingiem Java DNS SPI i Studiem Skinów 3D WebGL, po przeglądarkę [3] z silnikiem [4] (148 604 reguły) oraz spójny system wizualny [5].',
      'creator.githubBtn': 'Profil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repozytorium PEAK LABS',
      'footer.about': 'Niezależne studio oprogramowania tworzące czyste i szybkie aplikacje na Windows 10/11 w estetyce Peak Cinema & Summit Glass.',
      'footer.navTitle': 'Nawigacja',
      'footer.productsTitle': 'Produkty',
      'footer.launcherSite': 'Strona Peak Launcher ↗',
      'footer.githubProfile': 'Profil latajoncy82-svg ↗',
      'footer.repoLabs': 'Repozytorium PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Twórca: [0]',
      'footer.themeCredit': 'Estetyka Peak Cinema & Summit Glass',
      'lightbox.defaultCaption': 'Podgląd ekranu',
      'lightbox.prevAria': 'Poprzedni zrzut ekranu',
      'lightbox.nextAria': 'Następny zrzut ekranu',
      'lightbox.closeAria': 'Zamknij podgląd',
      'stage.launcherCinemaSummary': 'Kinowy launcher Minecrafta z hostingiem .peak i Studiem Skinów 3D.',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+ wersji',
      'stage.launcherCinemaTag3': 'Auto-Java i Fabric',
      'stage.hostingSummary': 'Własne serwery Fabric i Vanilla z domeną <adres>.peak w Internecie.',
      'stage.hostingTag1': 'Hosting .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': 'Tunel publiczny',
      'stage.skinsSummary': 'Interaktywne Studio Skinów 3D WebGL ze skinami widocznymi w grze.',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4 presety Peak',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': 'Czysta przeglądarka otwierająca PEAK LABS na start z motywami Niebieskiej Góry.',
      'stage.browserDarkTag1': 'Pasek 78 px',
      'stage.browserDarkTag2': 'Karty Drag & Drop',
      'stage.browserDarkTag3': 'Zero telemetrii',
      'stage.browserSettingsSummary': 'Pełny adblock Peak Shield (148 604 reguły), HTTPS-First i nowe ustawienia.',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'Adblock YouTube',
      'stage.previewAltPrefix': 'Podgląd',
      'shot.browserDark': 'Peak Browser — Motyw Ciemny (Domyślny)',
      'shot.browserSettings': 'Peak Browser — Ustawienia i Peak Shield (148 604 reguły)',
      'shot.browserLight': 'Peak Browser — Motyw Jasny',
      'shot.launcherDark': 'Peak Launcher — Nocny Szczyt (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Hosting serwerów .peak',
      'shot.launcherSkins': 'Peak Launcher — Studio Skinów 3D (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro: Mody i Shadery',
      'shot.launcherJava': 'Peak Launcher — Centrum Java i Fabric',
      'shot.launcherLight': 'Peak Launcher — Lodowcowy Dzień (Peak Cinema)'
    },

    de: {
      'meta.title': 'PEAK LABS — Software-Studio | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS ist ein unabhängiges Software-Studio von Mikołaj Grynienko. Entwickler von Peak Browser (v1.2.1 mit 148.604 Adblock-Regeln) und Peak Launcher (v1.5.1 mit .peak-Hosting und 3D-Skins).',
      'meta.ogDescription': 'Unabhängiges Software-Studio PEAK LABS (peaklabstudio.vercel.app) — Entwickler von Peak Browser v1.2.1 und Peak Launcher v1.5.1. Gründer: Mikołaj Grynienko.',
      'brand.ariaLabel': 'PEAK LABS — Startseite',
      'nav.ariaLabel': 'Hauptnavigation',
      'nav.about': 'Über uns',
      'nav.projects': 'Projekte',
      'nav.ecosystem': 'Ökosystem',
      'nav.releases': 'Releases',
      'nav.creator': 'Gründer',
      'header.themeTitle': 'Design umschalten (Dunkel / Hell)',
      'header.themeAria': 'Design umschalten',
      'header.menuOpenAria': 'Menü öffnen',
      'header.menuCloseAria': 'Menü schließen',
      'mobile.navAria': 'Mobiles Menü',
      'mobile.creatorLabel': 'Gründer: Mikołaj Grynienko',
      'lang.aria': 'Sprache wählen',
      'lang.auto': 'Auto (Browser)',
      'lang.instantGroup': 'Integrierte Sprachen',
      'lang.autoGroup': 'Auto-Übersetzung',
      'lang.translating': 'Übersetzen…',
      'hero.releasePillAria': 'Zu den neuesten Releases springen',
      'hero.tagline': 'Unabhängige Software am Gipfel von Design, Tempo und Privatsphäre.',
      'hero.lead': 'Gegründet von [0] entwickeln wir native Windows-Apps im Stil von [1] & [2] — [3] mit [4] Adblock-Regeln und [5] mit [6]-Serverhosting und 3D-Skins.',
      'hero.ctaProjects': 'Projekte entdecken',
      'hero.ctaReleases': 'Download-Center',
      'hero.stageAria': 'Produktvorschau wechseln',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Hosting .peak',
      'hero.stageSkins': '3D Skin Studio',
      'hero.stageBrowserDark': 'Peak Browser · Dunkel',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'Screenshot vergrößern',
      'hero.stageDownload': 'Installer laden',
      'hero.stageDetails': 'Details ↓',
      'hero.stat1Label': 'Werbe- & Tracker-Regeln',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Minecraft-Versionen & .peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · Alpha bis 26.3',
      'hero.stat3Label': 'GitHub-Releases',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'Telemetrie, Konten & Werbung',
      'hero.stat4Sub': '100 % lokal & Open Source',
      'about.kicker': 'PEAK LABS · UNABHÄNGIGES SOFTWARE-STUDIO',
      'about.title': 'Software, gefertigt am Gipfel.',
      'about.lead': '[0] ist ein unabhängiges polnisches Software-Studio von [1]. Jedes Werkzeug unseres Ökosystems ist auf Ruhe, volle Privatsphäre und Tempo unter Windows 10/11 ausgelegt — und verbindet das klare [2]-Interface mit tiefer Automatisierung.',
      'about.jumpBrowser': 'v1.2.1 · 148K Adblock & HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · .peak-Hosting & 3D-Skins',
      'about.jumpReleases': '15 direkte .exe-Installer & Changelogs',
      'about.card1Title': 'Peak Cinema & Summit Glass Design',
      'about.card1Desc': 'Vollbild-Alpenpanoramen, dunkle Obsidian-Flächen, feine 1-px-Linien und Milchglas ersetzen unruhige Rahmen.',
      'about.card2Title': 'Peak Shield 148K & HTTPS-First',
      'about.card2Desc': 'Echtes Netzwerk- & Kosmetik-Adblocking mit [0] Filterregeln, YouTube-Werbefilter, [1]-Upgrades und Tracking-Bereinigung.',
      'about.card3Title': 'Hosting .peak & 3D-WebGL-Skins',
      'about.card3Desc': 'Hoste eigene Fabric- oder Vanilla-Server mit echten [0]-Domains übers Internet, gestalte 3D-Skins und automatisiere Java & Mods.',
      'about.card4Title': '100 % Open Source & Null Telemetrie',
      'about.card4Desc': 'Keine Konten, keine Telemetrie, kein Lock-in. Jedes Release von [0] und [1] erscheint offen auf [2] als NSIS-Installer ([3]) und Portable.',
      'projects.kicker': 'UNSERE PROJEKTE · FLAGGSCHIFF-APPS',
      'projects.title': 'Zwei Flaggschiff-Apps für Windows',
      'projects.lead': 'Wechseln Sie zwischen Live-Ansichten, öffnen Sie Screenshots im Lightbox-Vollbild oder laden Sie direkt herunter.',
      'browser.num': 'PROJEKT 01',
      'browser.cat': 'Webbrowser',
      'browser.summary': 'Ein schlanker Windows-Browser im Blauer-Berg-Design mit vollständigem [0]-Regeln-[1]-Adblocker, [2]-Schutz und neu gestalteten Vollbild-Einstellungen.',
      'browser.galleryCaption': 'Vorschau Peak Browser',
      'browser.themesAria': 'Peak Browser Designs',
      'browser.tabDark': 'Dunkel (Standard)',
      'browser.tabSettings': 'Einstellungen & Schutz',
      'browser.tabLight': 'Hell',
      'browser.zoomAria': 'Peak Browser Screenshot vergrößern',
      'browser.f1Title': 'Peak Shield · 148.604 Regeln',
      'browser.f1Desc': '@ghostery/adblocker mit EasyList, EasyPrivacy, uBlock & YouTube-Werbefilter.',
      'browser.f2Title': 'HTTPS-First & Datenschutz',
      'browser.f2Desc': 'Erzwingt HTTPS, entfernt Tracking-Parameter (utm, fbclid), sendet Sec-GPC & DNT.',
      'browser.f3Title': 'Neue peak://settings',
      'browser.f3Desc': 'Zweispaltiger Einstellungsbereich mit Suche, Ausnahmeliste & Domain-Inspektor.',
      'browser.f4Title': 'Kompakte 78-px-Leiste & Tabs',
      'browser.f4Desc': 'Verbundener aktiver Tab, Drag-&-Drop-Sortierung, smarte Adressleiste & Kopierbutton.',
      'browser.f5Title': '3 Blauer-Berg-Designs',
      'browser.f5Desc': 'Dunkel, Blau & Hell im gesamten Fenster, auf [0] und Start auf [1].',
      'browser.f6Title': 'Keine Konten · 100 % Lokal',
      'browser.f6Desc': 'Keine Telemetrie, freie Suchmaschinenwahl und präzises Löschen von Verlauf & Cookies.',
      'browser.dlBtn': 'Peak Browser laden',
      'browser.dlMoreTitle': 'Weitere Download-Optionen für Peak Browser',
      'browser.siteBtn': 'Projekt-Website',
      'launcher.num': 'PROJEKT 02',
      'launcher.cat': 'Minecraft-Launcher',
      'launcher.summary': 'Kinoreifer Minecraft-Launcher mit [0]-Oberfläche, eigenem [1]-Serverhosting über das Internet, [2], [3]-Mods & Shadern sowie automatischem Java und Fabric.',
      'launcher.galleryCaption': 'Vorschau Peak Launcher',
      'launcher.viewsAria': 'Peak Launcher Ansichten',
      'launcher.tabDark': 'Nachtgipfel',
      'launcher.tabHosting': 'Hosting .peak',
      'launcher.tabSkins': '3D-Skins',
      'launcher.tabMods': 'Mods & Shader',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.tabLight': 'Gletschertag',
      'launcher.zoomAria': 'Peak Launcher Screenshot vergrößern',
      'launcher.f1Title': 'Hosting .peak & Global-Tunnel',
      'launcher.f1Desc': 'Eigene Fabric/Vanilla-Server mit [0], Java-DNS-SPI & öffentlichem Tunnel.',
      'launcher.f2Title': '3D Skin Studio (WebGL)',
      'launcher.f2Desc': 'Interaktive 3D-Vorschau, .png-Upload, Nickname-Abruf & In-Game-Skins via Yggdrasil.',
      'launcher.f3Title': 'Peak Cinema & Multi-Konto',
      'launcher.f3Desc': 'Vollbild-Bergpanorama, Konto-Wechsler, 6 Sprachen & zweispaltige Pro-Optionen.',
      'launcher.f4Title': 'Modrinth Pro: Mods & Shader',
      'launcher.f4Desc': 'Mods, Shader & Resource Packs, 1-Klick-Updates & 3 Starter-Pakete.',
      'launcher.f5Title': '925+ Versionen · Auto-Java/Fabric',
      'launcher.f5Desc': 'Mojang-Katalog von Alpha bis 26.3, Eclipse Temurin Java 8/17/21/25 & Fabric.',
      'launcher.f6Title': 'Isolierte Profile & .peak-Einladungen',
      'launcher.f6Desc': 'Getrennte [0], [1], Welten & teilbare [2]-Einladungen inklusive Mods.',
      'launcher.dlBtn': 'Peak Launcher laden',
      'launcher.dlMoreTitle': 'Weitere Download-Optionen für Peak Launcher',
      'common.enlarge': 'Vergrößern',
      'common.enlargeTitle': 'Im Lightbox vergrößern',
      'dl.setupTitle': 'Windows-Installer (.exe)',
      'dl.setupSubBrowser': 'Empfohlen · erstellt Verknüpfungen und Vollinstallation',
      'dl.setupSubLauncher': 'Empfohlen · erstellt Desktop- & Startmenü-Verknüpfungen',
      'dl.portableTitle': 'Portable-Version (.exe)',
      'dl.portableSub': 'Ohne Installation · sofort startklar',
      'dl.allReleases': 'Alle Releases auf GitHub',
      'eco.kicker': 'ARCHITEKTUR & STANDARDS · PEAK LABS ÖKOSYSTEM',
      'eco.title': 'Gemeinsames technisches Fundament',
      'eco.lead': 'Beide Apps teilen denselben Qualitätsanspruch, Null-Telemetrie-Architektur und alpine Peak Cinema Ästhetik.',
      'eco.colParam': 'Ökosystem-Parameter',
      'eco.row1Key': 'Betriebssystem',
      'eco.row2Key': 'Verteilungsformat',
      'eco.row2Val': 'NSIS-Installer + Portable (.exe)',
      'eco.row3Key': 'Visuelles System & UI',
      'eco.row3Browser': 'Blauer Berg · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6 Sprachen',
      'eco.row4Key': 'Kernfunktionen',
      'eco.row4Browser': 'Peak Shield 148K & HTTPS-First',
      'eco.row4Launcher': 'Hosting .peak, 3D-Skins & Modrinth Pro',
      'eco.row5Key': 'Update-Kanal',
      'eco.row6Key': 'Preis & Telemetrie',
      'eco.row6Val': 'Kostenlos · 0 Telemetrie',
      'eco.labBadge': 'PEAK LABS LABOR · ROADMAP',
      'eco.labTitle': 'Stetige Weiterentwicklung 2026+',
      'eco.labLead': '[0] liefert laufend neue Upgrades für beide Haupt-Apps und erforscht weitere schlanke Windows-Tools.',
      'eco.road1Desc': 'Noch schnellere Filter-Updates, tiefere Peak-Shield-Analysen und Tab-Verbesserungen.',
      'eco.road2Desc': 'Ausbau der globalen .peak-Servererkennung, Multiplayer-Diagnose & WebGL-Skin-Tools.',
      'eco.road3Title': 'Kommende PEAK LABS Tools',
      'eco.road3Desc': 'Leichte Peak-Cinema-Dienstprogramme unter [0].',
      'releases.kicker': 'DOWNLOAD-CENTER · GITHUB RELEASES',
      'releases.title': 'Releases & Änderungsprotokoll',
      'releases.lead': 'Direkte [0]-Installer und Portable-Builds aller [1]-Versionen.',
      'releases.filterAria': 'Releases nach Produkt filtern',
      'releases.filterAll': 'Alle',
      'releases.loading': 'Releases werden geladen…',
      'releases.synced': 'Synchronisiert mit GitHub Releases',
      'releases.catalog': 'Aktueller PEAK LABS Release-Katalog',
      'releases.empty': 'Keine veröffentlichten Releases für diesen Filter.',
      'releases.latestBadge': 'Neueste',
      'releases.dlSetup': 'Installer laden (.exe)',
      'releases.dlPortable': 'Portable laden (.exe)',
      'releases.viewGithub': 'Auf GitHub ansehen ↗',
      'releases.showAll': 'Alle {n} Releases anzeigen',
      'releases.showFewer': 'Nur die neuesten 4 anzeigen',
      'creator.kicker': 'GRÜNDER & ENTWICKLER VON PEAK LABS',
      'creator.role1': 'Gründer · PEAK LABS',
      'creator.role2': 'Desktop- & Webentwickler',
      'creator.role3': 'UI/UX-Designer',
      'creator.bio': 'Entwickelt das gesamte [0]-Ökosystem von Grund auf — vom [1] mit eigenem [2]-Serverhosting, Java-DNS-SPI-Routing und 3D-WebGL-Skin-Studio bis zum [3] mit [4] (148.604 Regeln) und der einheitlichen [5]-Designsprache.',
      'creator.githubBtn': 'GitHub-Profil (latajoncy82-svg)',
      'creator.repoBtn': 'PEAK LABS Repository',
      'footer.about': 'Unabhängiges Software-Studio für saubere, schnelle Windows-10/11-Apps im Peak Cinema & Summit Glass Design.',
      'footer.navTitle': 'Navigation',
      'footer.productsTitle': 'Produkte',
      'footer.launcherSite': 'Peak Launcher Website ↗',
      'footer.githubProfile': 'Profil latajoncy82-svg ↗',
      'footer.repoLabs': 'PEAK LABS Repo ↗',
      'footer.repoBrowser': 'Peak Browser Repo ↗',
      'footer.repoLauncher': 'Peak Launcher Repo ↗',
      'footer.copyright': '© 2026 PEAK LABS · Gründer: [0]',
      'footer.themeCredit': 'Peak Cinema & Summit Glass Ästhetik',
      'lightbox.defaultCaption': 'Bildschirmvorschau',
      'lightbox.prevAria': 'Vorheriger Screenshot',
      'lightbox.nextAria': 'Nächster Screenshot',
      'lightbox.closeAria': 'Vorschau schließen',
      'stage.launcherCinemaSummary': 'Kinoreifer Minecraft-Launcher mit .peak-Hosting und 3D Skin Studio.',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+ Versionen',
      'stage.launcherCinemaTag3': 'Auto-Java & Fabric',
      'stage.hostingSummary': 'Eigene Fabric- & Vanilla-Server mit echten <adresse>.peak-Domains.',
      'stage.hostingTag1': 'Hosting .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': 'Public Tunnel',
      'stage.skinsSummary': 'Interaktiver 3D-WebGL-Skin-Editor mit In-Game-Yggdrasil-Rendering.',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4 Peak Presets',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': 'Sauberer Browser, der PEAK LABS beim Start öffnet — im Blauer-Berg-Design.',
      'stage.browserDarkTag1': '78 px Leiste',
      'stage.browserDarkTag2': 'Drag & Drop Tabs',
      'stage.browserDarkTag3': 'Null Telemetrie',
      'stage.browserSettingsSummary': 'Vollständiger Peak Shield (148.604 Regeln), HTTPS-First & neue Einstellungen.',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'YouTube-Adblock',
      'stage.previewAltPrefix': 'Vorschau von',
      'shot.browserDark': 'Peak Browser — Dunkles Design (Standard)',
      'shot.browserSettings': 'Peak Browser — Einstellungen & Peak Shield (148.604 Regeln)',
      'shot.browserLight': 'Peak Browser — Helles Design',
      'shot.launcherDark': 'Peak Launcher — Nachtgipfel (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Hosting .peak Server',
      'shot.launcherSkins': 'Peak Launcher — 3D Skin Studio (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro: Mods & Shader',
      'shot.launcherJava': 'Peak Launcher — Java & Fabric Zentrum',
      'shot.launcherLight': 'Peak Launcher — Gletschertag (Peak Cinema)'
    },

    es: {
      'meta.title': 'PEAK LABS — Estudio de software | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS es un estudio independiente fundado por Mikołaj Grynienko. Creadores de Peak Browser (v1.2.1 con 148.604 reglas adblock) y Peak Launcher (v1.5.1 con hosting .peak y skins 3D).',
      'meta.ogDescription': 'Estudio independiente PEAK LABS (peaklabstudio.vercel.app) — creadores de Peak Browser v1.2.1 y Peak Launcher v1.5.1. Creador: Mikołaj Grynienko.',
      'brand.ariaLabel': 'PEAK LABS — página principal',
      'nav.ariaLabel': 'Navegación principal',
      'nav.about': 'Empresa',
      'nav.projects': 'Proyectos',
      'nav.ecosystem': 'Ecosistema',
      'nav.releases': 'Versiones',
      'nav.creator': 'Creador',
      'header.themeTitle': 'Cambiar tema del sitio (Oscuro / Claro)',
      'header.themeAria': 'Cambiar tema del sitio',
      'header.menuOpenAria': 'Abrir menú',
      'header.menuCloseAria': 'Cerrar menú',
      'mobile.navAria': 'Menú móvil',
      'mobile.creatorLabel': 'Creador: Mikołaj Grynienko',
      'lang.aria': 'Seleccionar idioma',
      'lang.auto': 'Auto (Navegador)',
      'lang.instantGroup': 'Idiomas integrados',
      'lang.autoGroup': 'Traducción automática',
      'lang.translating': 'Traduciendo…',
      'hero.releasePillAria': 'Ir a las últimas versiones',
      'hero.tagline': 'Software independiente en la cima del diseño, velocidad y privacidad.',
      'hero.lead': 'Fundado por [0], creamos aplicaciones nativas para Windows con estética [1] y [2]: [3] con [4] reglas bloqueadoras y [5] con hosting [6] y skins 3D.',
      'hero.ctaProjects': 'Explorar proyectos',
      'hero.ctaReleases': 'Centro de descargas',
      'hero.stageAria': 'Cambiar vista previa del producto',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Hosting .peak',
      'hero.stageSkins': '3D Skin Studio',
      'hero.stageBrowserDark': 'Peak Browser · Oscuro',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'Ampliar captura',
      'hero.stageDownload': 'Descargar Instalador',
      'hero.stageDetails': 'Detalles ↓',
      'hero.stat1Label': 'Reglas contra anuncios',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Versiones de Minecraft y .peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · Alpha a 26.3',
      'hero.stat3Label': 'Lanzamientos en GitHub',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'Telemetría, cuentas o anuncios',
      'hero.stat4Sub': '100 % local y código abierto',
      'about.kicker': 'PEAK LABS · ESTUDIO DE SOFTWARE INDEPENDIENTE',
      'about.title': 'Software diseñado en la cima.',
      'about.lead': '[0] es un estudio y laboratorio independiente polaco fundado por [1]. Cada aplicación está pensada para ofrecer claridad, privacidad total y máximo rendimiento en Windows 10 y 11, uniendo la interfaz [2] con automatización avanzada.',
      'about.jumpBrowser': 'v1.2.1 · Adblock 148K y HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · Hosting .peak y Skins 3D',
      'about.jumpReleases': '15 instaladores .exe y cambios',
      'about.card1Title': 'Diseño Peak Cinema & Summit Glass',
      'about.card1Desc': 'Panoramas alpinos completos, superficies oscuras obsidiana, bordes finos de 1 px y cristal esmerilado sin distracciones.',
      'about.card2Title': 'Peak Shield 148K y HTTPS-First',
      'about.card2Desc': 'Bloqueo real de red y cosmético con [0] reglas, limpieza de anuncios en YouTube, mejoras [1] y eliminación de rastreadores.',
      'about.card3Title': 'Hosting .peak y Skins 3D WebGL',
      'about.card3Desc': 'Aloja servidores Fabric o Vanilla con dominios [0] por Internet, edita skins en 3D y automatiza Java y mods.',
      'about.card4Title': '100 % Open Source y Cero Telemetría',
      'about.card4Desc': 'Sin cuentas obligatorias ni rastreo. Cada versión de [0] y [1] se publica abiertamente en [2] con instaladores NSIS ([3]) y Portable.',
      'projects.kicker': 'NUESTROS PROYECTOS · APLICACIONES INSIGNIA',
      'projects.title': 'Dos aplicaciones insignia para Windows',
      'projects.lead': 'Cambia entre vistas reales, amplía cualquier captura en el Lightbox o descarga la última versión directamente.',
      'browser.num': 'PROYECTO 01',
      'browser.cat': 'Navegador web',
      'browser.summary': 'Navegador limpio y veloz con temática Montaña Azul, bloqueador completo [1] de [0] reglas, seguridad [2] y ajustes a pantalla completa.',
      'browser.galleryCaption': 'Vista previa de Peak Browser',
      'browser.themesAria': 'Temas de Peak Browser',
      'browser.tabDark': 'Oscuro (Predet.)',
      'browser.tabSettings': 'Ajustes y Protección',
      'browser.tabLight': 'Claro',
      'browser.zoomAria': 'Ampliar captura de Peak Browser',
      'browser.f1Title': 'Peak Shield · 148.604 reglas',
      'browser.f1Desc': '@ghostery/adblocker con EasyList, EasyPrivacy, uBlock y bloqueo en YouTube.',
      'browser.f2Title': 'HTTPS-First y Privacidad',
      'browser.f2Desc': 'Conexiones HTTPS cifradas, limpieza de URL (utm, fbclid), cabeceras Sec-GPC y DNT.',
      'browser.f3Title': 'Nuevo peak://settings',
      'browser.f3Desc': 'Panel a dos columnas con buscador, lista de excepciones e inspector de dominios.',
      'browser.f4Title': 'Barra compacta 78 px y pestañas',
      'browser.f4Desc': 'Pestaña activa integrada, drag & drop y copia rápida de URL al pasar el ratón.',
      'browser.f5Title': '3 temas Montaña Azul',
      'browser.f5Desc': 'Oscuro, Azul y Claro en toda la ventana, en [0] y abre [1] al iniciar.',
      'browser.f6Title': 'Cero cuentas · 100 % Local',
      'browser.f6Desc': 'Sin telemetría, elección de buscador y borrado selectivo de historial y caché.',
      'browser.dlBtn': 'Descargar Peak Browser',
      'browser.dlMoreTitle': 'Más opciones de descarga de Peak Browser',
      'browser.siteBtn': 'Web del proyecto',
      'launcher.num': 'PROYECTO 02',
      'launcher.cat': 'Launcher de Minecraft',
      'launcher.summary': 'Launcher cinematográfico de Minecraft con interfaz [0], servidores propios [1] por Internet, [2], mods y shaders de [3] y Java y Fabric automáticos.',
      'launcher.galleryCaption': 'Vista previa de Peak Launcher',
      'launcher.viewsAria': 'Vistas de Peak Launcher',
      'launcher.tabDark': 'Cumbre Nocturna',
      'launcher.tabHosting': 'Hosting .peak',
      'launcher.tabSkins': 'Skins 3D',
      'launcher.tabMods': 'Mods y Shaders',
      'launcher.tabJava': 'Java y Fabric',
      'launcher.tabLight': 'Día Glacial',
      'launcher.zoomAria': 'Ampliar captura de Peak Launcher',
      'launcher.f1Title': 'Hosting .peak y Túnel Global',
      'launcher.f1Desc': 'Servidores locales Fabric/Vanilla con [0], Java DNS SPI y túnel público.',
      'launcher.f2Title': '3D Skin Studio (WebGL)',
      'launcher.f2Desc': 'Vista 3D interactiva, subida .png, búsqueda por nick y skins en juego via Yggdrasil.',
      'launcher.f3Title': 'Peak Cinema y Multicuentas',
      'launcher.f3Desc': 'GUI panorámica, selector rápido de cuentas, 6 idiomas y Opciones Pro.',
      'launcher.f4Title': 'Modrinth Pro: Mods y Shaders',
      'launcher.f4Desc': 'Mods, Shaders y Resource Packs, actualizaciones en 1 clic y 3 packs iniciales.',
      'launcher.f5Title': '925+ Versiones · Auto-Java/Fabric',
      'launcher.f5Desc': 'Catálogo Mojang desde Alpha hasta 26.3, Eclipse Temurin Java 8/17/21/25 y Fabric.',
      'launcher.f6Title': 'Perfiles aislados e invitaciones .peak',
      'launcher.f6Desc': 'Carpetas [0], [1] y mundos separados más archivos [2] compartibles.',
      'launcher.dlBtn': 'Descargar Peak Launcher',
      'launcher.dlMoreTitle': 'Más opciones de descarga de Peak Launcher',
      'common.enlarge': 'Ampliar',
      'common.enlargeTitle': 'Ampliar en Lightbox',
      'dl.setupTitle': 'Instalador de Windows (.exe)',
      'dl.setupSubBrowser': 'Recomendado · crea accesos directos e instalación completa',
      'dl.setupSubLauncher': 'Recomendado · crea accesos directos en escritorio e Inicio',
      'dl.portableTitle': 'Edición Portable (.exe)',
      'dl.portableSub': 'Sin instalación · listo al instante tras abrir',
      'dl.allReleases': 'Todas las versiones en GitHub',
      'eco.kicker': 'ARQUITECTURA Y ESTÁNDARES · ECOSISTEMA PEAK LABS',
      'eco.title': 'Base tecnológica compartida',
      'eco.lead': 'Ambas aplicaciones comparten el mismo estándar de ingeniería, cero telemetría y estética alpina Peak Cinema.',
      'eco.colParam': 'Parámetro del ecosistema',
      'eco.row1Key': 'Sistema operativo',
      'eco.row2Key': 'Formato de distribución',
      'eco.row2Val': 'Instalador NSIS + Portable (.exe)',
      'eco.row3Key': 'Sistema visual y UI',
      'eco.row3Browser': 'Montaña Azul · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6 idiomas',
      'eco.row4Key': 'Funciones clave',
      'eco.row4Browser': 'Peak Shield 148K y HTTPS-First',
      'eco.row4Launcher': 'Hosting .peak, Skins 3D y Modrinth Pro',
      'eco.row5Key': 'Canal de actualizaciones',
      'eco.row6Key': 'Precio y telemetría',
      'eco.row6Val': 'Gratis · 0 telemetría',
      'eco.labBadge': 'LABORATORIO PEAK LABS · HOJA DE RUTA',
      'eco.labTitle': 'Evolución continua en 2026+',
      'eco.labLead': '[0] publica mejoras continuas para ambos productos principales mientras desarrolla nuevas utilidades para Windows.',
      'eco.road1Desc': 'Actualizaciones de filtros aún más rápidas, métricas detalladas y mejoras en pestañas.',
      'eco.road2Desc': 'Descubrimiento global .peak ampliado, diagnóstico multijugador y mejoras WebGL.',
      'eco.road3Title': 'Próximas herramientas de PEAK LABS',
      'eco.road3Desc': 'Utilidades ligeras de escritorio Peak Cinema publicadas en [0].',
      'releases.kicker': 'CENTRO DE DESCARGAS · GITHUB RELEASES',
      'releases.title': 'Versiones y cambios',
      'releases.lead': 'Instaladores [0] directos y ediciones Portable de todas las versiones de [1].',
      'releases.filterAria': 'Filtrar versiones por producto',
      'releases.filterAll': 'Todas',
      'releases.loading': 'Cargando versiones…',
      'releases.synced': 'Sincronizado con GitHub Releases',
      'releases.catalog': 'Catálogo actual de versiones PEAK LABS',
      'releases.empty': 'No hay versiones publicadas para el filtro elegido.',
      'releases.latestBadge': 'Última',
      'releases.dlSetup': 'Descargar Instalador (.exe)',
      'releases.dlPortable': 'Descargar Portable (.exe)',
      'releases.viewGithub': 'Ver en GitHub ↗',
      'releases.showAll': 'Mostrar todas las {n} versiones',
      'releases.showFewer': 'Mostrar solo las 4 más recientes',
      'creator.kicker': 'FUNDADOR Y CREADOR DE PEAK LABS',
      'creator.role1': 'Fundador · PEAK LABS',
      'creator.role2': 'Desarrollador Desktop y Web',
      'creator.role3': 'Diseñador UI/UX',
      'creator.bio': 'Diseña y construye todo el ecosistema [0] desde cero — desde el motor de [1] con servidores propios [2], routing Java DNS SPI y 3D Skin Studio WebGL, hasta [3] con [4] (148.604 reglas) y el sistema visual [5].',
      'creator.githubBtn': 'Perfil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repositorio PEAK LABS',
      'footer.about': 'Estudio independiente que crea apps rápidas y limpias para Windows 10/11 en estética Peak Cinema & Summit Glass.',
      'footer.navTitle': 'Navegación',
      'footer.productsTitle': 'Productos',
      'footer.launcherSite': 'Web de Peak Launcher ↗',
      'footer.githubProfile': 'Perfil latajoncy82-svg ↗',
      'footer.repoLabs': 'Repo PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Creador: [0]',
      'footer.themeCredit': 'Estética Peak Cinema & Summit Glass',
      'lightbox.defaultCaption': 'Vista previa',
      'lightbox.prevAria': 'Captura anterior',
      'lightbox.nextAria': 'Siguiente captura',
      'lightbox.closeAria': 'Cerrar vista previa',
      'stage.launcherCinemaSummary': 'Launcher de Minecraft cinematográfico con hosting .peak y 3D Skin Studio.',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+ versiones',
      'stage.launcherCinemaTag3': 'Auto-Java y Fabric',
      'stage.hostingSummary': 'Aloja servidores Fabric y Vanilla con dominios <dirección>.peak en Internet.',
      'stage.hostingTag1': 'Hosting .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': 'Túnel público',
      'stage.skinsSummary': 'Editor interactivo de skins 3D WebGL con renderizado en el juego via Yggdrasil.',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4 presets Peak',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': 'Navegador limpio que abre PEAK LABS al iniciar con temas Montaña Azul.',
      'stage.browserDarkTag1': 'Barra 78 px',
      'stage.browserDarkTag2': 'Pestañas Drag & Drop',
      'stage.browserDarkTag3': 'Cero telemetría',
      'stage.browserSettingsSummary': 'Bloqueador Peak Shield de 148.604 reglas, HTTPS-First y nuevos ajustes.',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'Adblock YouTube',
      'stage.previewAltPrefix': 'Vista previa de',
      'shot.browserDark': 'Peak Browser — Tema Oscuro (Predeterminado)',
      'shot.browserSettings': 'Peak Browser — Ajustes y Peak Shield (148.604 reglas)',
      'shot.browserLight': 'Peak Browser — Tema Claro',
      'shot.launcherDark': 'Peak Launcher — Cumbre Nocturna (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Servidores Hosting .peak',
      'shot.launcherSkins': 'Peak Launcher — 3D Skin Studio (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro: Mods y Shaders',
      'shot.launcherJava': 'Peak Launcher — Centro Java y Fabric',
      'shot.launcherLight': 'Peak Launcher — Día Glacial (Peak Cinema)'
    },

    fr: {
      'meta.title': 'PEAK LABS — Studio logiciel | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS est un studio logiciel indépendant fondé par Mikołaj Grynienko. Créateurs de Peak Browser (v1.2.1 avec 148 604 règles adblock) et Peak Launcher (v1.5.1 avec hébergement .peak et skins 3D).',
      'meta.ogDescription': 'Studio logiciel indépendant PEAK LABS (peaklabstudio.vercel.app) — créateurs de Peak Browser v1.2.1 et Peak Launcher v1.5.1. Fondateur : Mikołaj Grynienko.',
      'brand.ariaLabel': 'PEAK LABS — page d’accueil',
      'nav.ariaLabel': 'Navigation principale',
      'nav.about': 'À propos',
      'nav.projects': 'Projets',
      'nav.ecosystem': 'Écosystème',
      'nav.releases': 'Versions',
      'nav.creator': 'Créateur',
      'header.themeTitle': 'Changer le thème du site (Sombre / Clair)',
      'header.themeAria': 'Changer le thème',
      'header.menuOpenAria': 'Ouvrir le menu',
      'header.menuCloseAria': 'Fermer le menu',
      'mobile.navAria': 'Menu mobile',
      'mobile.creatorLabel': 'Créateur : Mikołaj Grynienko',
      'lang.aria': 'Choisir la langue',
      'lang.auto': 'Auto (Navigateur)',
      'lang.instantGroup': 'Langues intégrées',
      'lang.autoGroup': 'Traduction auto',
      'lang.translating': 'Traduction…',
      'hero.releasePillAria': 'Aller aux dernières versions',
      'hero.tagline': 'Des logiciels indépendants au sommet du design, de la vitesse et de la vie privée.',
      'hero.lead': 'Fondé par [0], nous concevons des applications Windows natives dans l’esthétique [1] & [2] — [3] avec [4] règles anti-pub et [5] avec hébergement [6] et skins 3D.',
      'hero.ctaProjects': 'Découvrir nos projets',
      'hero.ctaReleases': 'Centre de téléchargement',
      'hero.stageAria': 'Changer l’aperçu du produit',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Hébergement .peak',
      'hero.stageSkins': 'Studio Skins 3D',
      'hero.stageBrowserDark': 'Peak Browser · Sombre',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'Agrandir la capture',
      'hero.stageDownload': 'Télécharger Installateur',
      'hero.stageDetails': 'Détails ↓',
      'hero.stat1Label': 'Règles de filtrage anti-pub',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Versions Minecraft & .peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · Alpha à 26.3',
      'hero.stat3Label': 'Versions publiées sur GitHub',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'Télémétrie, comptes et pubs',
      'hero.stat4Sub': '100 % local & open source',
      'about.kicker': 'PEAK LABS · STUDIO LOGICIEL INDÉPENDANT',
      'about.title': 'Des logiciels façonnés au sommet.',
      'about.lead': '[0] est un studio logiciel polonais indépendant fondé par [1]. Chaque outil est conçu pour la clarté, zéro suivi et une fluidité exemplaire sur Windows 10 et 11 — alliant l’interface épurée [2] à une automatisation poussée.',
      'about.jumpBrowser': 'v1.2.1 · Adblock 148K & HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · Hébergement .peak & Skins 3D',
      'about.jumpReleases': '15 installateurs .exe & notes de version',
      'about.card1Title': 'Design Peak Cinema & Summit Glass',
      'about.card1Desc': 'Panoramas alpins immersifs, surfaces obsidienne sombres, bordures fines de 1 px et verre dépoli sans cadres superflus.',
      'about.card2Title': 'Peak Shield 148K & HTTPS-First',
      'about.card2Desc': 'Blocage réseau et cosmétique avec [0] règles, suppression des pubs YouTube, mises à niveau [1] et nettoyage d’URL.',
      'about.card3Title': 'Hébergement .peak & Skins 3D WebGL',
      'about.card3Desc': 'Hébergez vos serveurs Fabric ou Vanilla avec domaines [0] sur Internet, personnalisez vos skins en 3D et automatisez Java et mods.',
      'about.card4Title': '100 % Open Source & Zéro Télémétrie',
      'about.card4Desc': 'Aucun compte imposé ni collecte. Chaque version de [0] et [1] est publiée ouvertement sur [2] en NSIS ([3]) et Portable.',
      'projects.kicker': 'NOS PROJETS · APPLICATIONS PHARES',
      'projects.title': 'Deux applications phares pour Windows',
      'projects.lead': 'Alternez les aperçus en direct, agrandissez les captures en plein écran ou téléchargez la dernière version.',
      'browser.num': 'PROJET 01',
      'browser.cat': 'Navigateur web',
      'browser.summary': 'Navigateur Windows épuré et rapide au thème Montagne Bleue, bloqueur complet [1] à [0] règles, sécurité [2] et paramètres plein écran repensés.',
      'browser.galleryCaption': 'Aperçu de Peak Browser',
      'browser.themesAria': 'Thèmes de Peak Browser',
      'browser.tabDark': 'Sombre (Défaut)',
      'browser.tabSettings': 'Paramètres & Protection',
      'browser.tabLight': 'Clair',
      'browser.zoomAria': 'Agrandir la capture Peak Browser',
      'browser.f1Title': 'Peak Shield · 148 604 règles',
      'browser.f1Desc': '@ghostery/adblocker avec EasyList, EasyPrivacy, uBlock et blocage YouTube.',
      'browser.f2Title': 'HTTPS-First & Confidentialité',
      'browser.f2Desc': 'Force le chiffrement HTTPS, supprime les traceurs URL (utm, fbclid), Sec-GPC & DNT.',
      'browser.f3Title': 'Nouveau peak://settings',
      'browser.f3Desc': 'Paramètres à deux colonnes avec recherche, liste blanche et inspecteur de domaines.',
      'browser.f4Title': 'Barre 78 px & Onglets',
      'browser.f4Desc': 'Onglet actif intégré, réorganisation drag & drop et copie rapide d’URL.',
      'browser.f5Title': '3 thèmes Montagne Bleue',
      'browser.f5Desc': 'Sombre, Bleu et Clair sur toute la fenêtre, [0] et accueil [1].',
      'browser.f6Title': 'Zéro compte · 100 % Local',
      'browser.f6Desc': 'Sans télémétrie, choix du moteur et effacement sélectif de l’historique et du cache.',
      'browser.dlBtn': 'Télécharger Peak Browser',
      'browser.dlMoreTitle': 'Plus d’options pour Peak Browser',
      'browser.siteBtn': 'Site du projet',
      'launcher.num': 'PROJET 02',
      'launcher.cat': 'Launcher Minecraft',
      'launcher.summary': 'Launcher Minecraft cinématographique doté de l’interface [0], de serveurs auto-hébergés [1] sur Internet, d’un [2], de mods & shaders [3], et de Java/Fabric auto.',
      'launcher.galleryCaption': 'Aperçu de Peak Launcher',
      'launcher.viewsAria': 'Vues de Peak Launcher',
      'launcher.tabDark': 'Sommet Nocturne',
      'launcher.tabHosting': 'Hébergement .peak',
      'launcher.tabSkins': 'Skins 3D',
      'launcher.tabMods': 'Mods & Shaders',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.tabLight': 'Jour Glaciaire',
      'launcher.zoomAria': 'Agrandir la capture Peak Launcher',
      'launcher.f1Title': 'Hébergement .peak & Tunnel',
      'launcher.f1Desc': 'Serveurs locaux Fabric/Vanilla avec [0], Java DNS SPI & tunnel public.',
      'launcher.f2Title': '3D Skin Studio (WebGL)',
      'launcher.f2Desc': 'Aperçu 3D interactif, envoi .png, recherche par pseudo et skins en jeu via Yggdrasil.',
      'launcher.f3Title': 'Peak Cinema & Multi-comptes',
      'launcher.f3Desc': 'Interface panoramique, sélecteur de comptes, 6 langues et Options Pro.',
      'launcher.f4Title': 'Modrinth Pro : Mods & Shaders',
      'launcher.f4Desc': 'Mods, Shaders & Resource Packs, mises à jour 1 clic et 3 packs de départ.',
      'launcher.f5Title': '925+ Versions · Auto-Java/Fabric',
      'launcher.f5Desc': 'Catalogue Mojang d’Alpha à 26.3, Eclipse Temurin Java 8/17/21/25 et Fabric.',
      'launcher.f6Title': 'Profils isolés & Invitations .peak',
      'launcher.f6Desc': 'Dossiers [0], [1], mondes séparés et fichiers d’invitation [2] partageables.',
      'launcher.dlBtn': 'Télécharger Peak Launcher',
      'launcher.dlMoreTitle': 'Plus d’options pour Peak Launcher',
      'common.enlarge': 'Agrandir',
      'common.enlargeTitle': 'Agrandir dans Lightbox',
      'dl.setupTitle': 'Installateur Windows (.exe)',
      'dl.setupSubBrowser': 'Recommandé · crée les raccourcis et l’installation complète',
      'dl.setupSubLauncher': 'Recommandé · crée les raccourcis Bureau et Démarrer',
      'dl.portableTitle': 'Édition Portable (.exe)',
      'dl.portableSub': 'Sans installation · prêt immédiatement au lancement',
      'dl.allReleases': 'Toutes les versions sur GitHub',
      'eco.kicker': 'ARCHITECTURE & STANDARDS · ÉCOSYSTÈME PEAK LABS',
      'eco.title': 'Socle technologique commun',
      'eco.lead': 'Les deux applications partagent la même exigence technique, zéro télémétrie et l’esthétique alpine Peak Cinema.',
      'eco.colParam': 'Paramètre de l’écosystème',
      'eco.row1Key': 'Système d’exploitation',
      'eco.row2Key': 'Format de distribution',
      'eco.row2Val': 'Installateur NSIS + Portable (.exe)',
      'eco.row3Key': 'Système visuel & UI',
      'eco.row3Browser': 'Montagne Bleue · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6 langues',
      'eco.row4Key': 'Fonctions clés',
      'eco.row4Browser': 'Peak Shield 148K & HTTPS-First',
      'eco.row4Launcher': 'Hébergement .peak, Skins 3D & Modrinth Pro',
      'eco.row5Key': 'Canal de mise à jour',
      'eco.row6Key': 'Prix & télémétrie',
      'eco.row6Val': 'Gratuit · 0 télémétrie',
      'eco.labBadge': 'LABORATOIRE PEAK LABS · FEUILLE DE ROUTE',
      'eco.labTitle': 'Évolution continue en 2026+',
      'eco.labLead': '[0] publie régulièrement de nouvelles améliorations pour ses deux produits phares et prépare de nouveaux utilitaires Windows.',
      'eco.road1Desc': 'Mises à jour de filtres plus rapides, statistiques Peak Shield et onglets peaufinés.',
      'eco.road2Desc': 'Découverte globale .peak enrichie, diagnostics multijoueur et outils WebGL.',
      'eco.road3Title': 'Prochains outils PEAK LABS',
      'eco.road3Desc': 'Utilitaires légers Peak Cinema publiés sur [0].',
      'releases.kicker': 'CENTRE DE TÉLÉCHARGEMENT · GITHUB RELEASES',
      'releases.title': 'Versions et journal des modifications',
      'releases.lead': 'Installateurs [0] directs et éditions portables pour toutes les versions de [1].',
      'releases.filterAria': 'Filtrer les versions par produit',
      'releases.filterAll': 'Toutes',
      'releases.loading': 'Chargement des versions…',
      'releases.synced': 'Synchronisé avec GitHub Releases',
      'releases.catalog': 'Catalogue actuel des versions PEAK LABS',
      'releases.empty': 'Aucune version publiée pour ce filtre.',
      'releases.latestBadge': 'Dernière',
      'releases.dlSetup': 'Télécharger Installateur (.exe)',
      'releases.dlPortable': 'Télécharger Portable (.exe)',
      'releases.viewGithub': 'Voir sur GitHub ↗',
      'releases.showAll': 'Afficher les {n} versions',
      'releases.showFewer': 'Afficher les 4 plus récentes',
      'creator.kicker': 'FONDATEUR & CRÉATEUR DE PEAK LABS',
      'creator.role1': 'Fondateur · PEAK LABS',
      'creator.role2': 'Développeur Desktop & Web',
      'creator.role3': 'Designer UI/UX',
      'creator.bio': 'Conçoit et développe de A à Z tout l’écosystème [0] — du moteur [1] avec serveurs auto-hébergés [2], routage Java DNS SPI et Studio Skins 3D WebGL jusqu’à [3] avec [4] (148 604 règles) et le système visuel [5].',
      'creator.githubBtn': 'Profil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Dépôt PEAK LABS',
      'footer.about': 'Studio logiciel indépendant créant des applications Windows 10/11 rapides et soignées dans l’esthétique Peak Cinema & Summit Glass.',
      'footer.navTitle': 'Navigation',
      'footer.productsTitle': 'Produits',
      'footer.launcherSite': 'Site Peak Launcher ↗',
      'footer.githubProfile': 'Profil latajoncy82-svg ↗',
      'footer.repoLabs': 'Dépôt PEAK LABS ↗',
      'footer.repoBrowser': 'Dépôt Peak Browser ↗',
      'footer.repoLauncher': 'Dépôt Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Créateur : [0]',
      'footer.themeCredit': 'Esthétique Peak Cinema & Summit Glass',
      'lightbox.defaultCaption': 'Aperçu écran',
      'lightbox.prevAria': 'Capture précédente',
      'lightbox.nextAria': 'Capture suivante',
      'lightbox.closeAria': 'Fermer l’aperçu',
      'stage.launcherCinemaSummary': 'Launcher Minecraft cinématographique avec hébergement .peak et 3D Skin Studio.',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+ versions',
      'stage.launcherCinemaTag3': 'Auto-Java & Fabric',
      'stage.hostingSummary': 'Hébergez des serveurs Fabric & Vanilla avec domaines <adresse>.peak en ligne.',
      'stage.hostingTag1': 'Hosting .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': 'Tunnel public',
      'stage.skinsSummary': 'Éditeur de skins 3D WebGL interactif avec rendu Yggdrasil en jeu.',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4 presets Peak',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': 'Navigateur épuré ouvrant PEAK LABS au démarrage avec thèmes Montagne Bleue.',
      'stage.browserDarkTag1': 'Barre 78 px',
      'stage.browserDarkTag2': 'Onglets Drag & Drop',
      'stage.browserDarkTag3': 'Zéro télémétrie',
      'stage.browserSettingsSummary': 'Bloqueur Peak Shield à 148 604 règles, HTTPS-First & nouveaux paramètres.',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'Adblock YouTube',
      'stage.previewAltPrefix': 'Aperçu de',
      'shot.browserDark': 'Peak Browser — Thème Sombre (Défaut)',
      'shot.browserSettings': 'Peak Browser — Paramètres & Peak Shield (148 604 règles)',
      'shot.browserLight': 'Peak Browser — Thème Clair',
      'shot.launcherDark': 'Peak Launcher — Sommet Nocturne (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Serveurs Hébergement .peak',
      'shot.launcherSkins': 'Peak Launcher — Studio Skins 3D (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro : Mods & Shaders',
      'shot.launcherJava': 'Peak Launcher — Centre Java & Fabric',
      'shot.launcherLight': 'Peak Launcher — Jour Glaciaire (Peak Cinema)'
    },

    uk: {
      'meta.title': 'PEAK LABS — Студія ПЗ | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS — незалежна студія програмного забезпечення, заснована Міколаєм Гриненком. Творці Peak Browser (v1.2.1 зі 148 604 правилами adblock) та Peak Launcher (v1.5.1 з хостингом .peak та 3D-скінами).',
      'meta.ogDescription': 'Незалежна студія PEAK LABS (peaklabstudio.vercel.app) — творці Peak Browser v1.2.1 та Peak Launcher v1.5.1. Засновник: Mikołaj Grynienko.',
      'brand.ariaLabel': 'PEAK LABS — головна сторінка',
      'nav.ariaLabel': 'Головна навігація',
      'nav.about': 'Про компанію',
      'nav.projects': 'Проєкти',
      'nav.ecosystem': 'Екосистема',
      'nav.releases': 'Релізи',
      'nav.creator': 'Творець',
      'header.themeTitle': 'Змінити тему сайту (Темна / Світла)',
      'header.themeAria': 'Змінити тему сайту',
      'header.menuOpenAria': 'Відкрити меню',
      'header.menuCloseAria': 'Закрити меню',
      'mobile.navAria': 'Мобільне меню',
      'mobile.creatorLabel': 'Творець: Mikołaj Grynienko',
      'lang.aria': 'Вибір мови',
      'lang.auto': 'Авто (Браузер)',
      'lang.instantGroup': 'Вбудовані мови',
      'lang.autoGroup': 'Автопереклад',
      'lang.translating': 'Переклад…',
      'hero.releasePillAria': 'Перейти до останніх релізів',
      'hero.tagline': 'Незалежне програмне забезпечення на вершині дизайну, швидкості й приватності.',
      'hero.lead': 'Заснована [0] студія, що створює нативні програми Windows в естетиці [1] & [2] — [3] зі [4] правилами адблоку та [5] із хостингом [6] і 3D-скінами.',
      'hero.ctaProjects': 'Переглянути проєкти',
      'hero.ctaReleases': 'Центр завантажень',
      'hero.stageAria': 'Перемкнути перегляд продукту',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Хостинг .peak',
      'hero.stageSkins': '3D Студія Скінів',
      'hero.stageBrowserDark': 'Peak Browser · Темна',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'Збільшити знімок',
      'hero.stageDownload': 'Завантажити Інсталятор',
      'hero.stageDetails': 'Детальніше ↓',
      'hero.stat1Label': 'Правил блокування реклами',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Версій Minecraft та .peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · від Alpha до 26.3',
      'hero.stat3Label': 'Опублікованих релізів',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'Телеметрії, акаунтів і реклами',
      'hero.stat4Sub': '100% локально та open source',
      'about.kicker': 'PEAK LABS · НЕЗАЛЕЖНА СТУДІЯ ПЗ',
      'about.title': 'Програми, створені на вершині.',
      'about.lead': '[0] — незалежна польська софт-студія та лабораторія, заснована [1]. Кожен інструмент створено для чистоти, приватності й миттєвої швидкодії на Windows 10 і 11 — поєднуючи кінематографічний інтерфейс [2] із глибокою автоматизацією.',
      'about.jumpBrowser': 'v1.2.1 · Адблок 148K і HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · Хостинг .peak і 3D-скіни',
      'about.jumpReleases': '15 інсталяторів .exe та списки змін',
      'about.card1Title': 'Дизайн Peak Cinema & Summit Glass',
      'about.card1Desc': 'Повноекранні альпійські панорами, темні обсидіанові поверхні, тонкі лінії 1 px і матове скло без зайвих рамок.',
      'about.card2Title': 'Peak Shield 148K & HTTPS-First',
      'about.card2Desc': 'Справжній мережевий і косметичний адблок на [0] правил, очищення YouTube від реклами, [1] та видалення трекерів.',
      'about.card3Title': 'Хостинг .peak і 3D-скіни WebGL',
      'about.card3Desc': 'Запускайте власні сервери Fabric або Vanilla з доменами [0] через Інтернет, налаштовуйте 3D-скіни та автоматизуйте Java і моди.',
      'about.card4Title': '100% Open Source і Нуль Телеметрії',
      'about.card4Desc': 'Без акаунтів, стеження й закритих платформ. Кожен реліз [0] і [1] відкритий на [2] у форматах NSIS ([3]) та Portable.',
      'projects.kicker': 'НАШІ ПРОЄКТИ · ФЛАГМАНСЬКІ ПРОГРАМИ',
      'projects.title': 'Два флагманські продукти для Windows',
      'projects.lead': 'Перемикайте живі екрани, відкривайте знімки на весь екран у Lightbox або завантажуйте найновіший реліз напряму.',
      'browser.num': 'ПРОЄКТ 01',
      'browser.cat': 'Веббраузер',
      'browser.summary': 'Швидкий і чистий браузер у стилі Синьої Гори з повним адблоком [1] ([0] правил), захистом [2] та оновленими повноекранними налаштуваннями.',
      'browser.galleryCaption': 'Огляд інтерфейсу Peak Browser',
      'browser.themesAria': 'Теми Peak Browser',
      'browser.tabDark': 'Темна (Типова)',
      'browser.tabSettings': 'Налаштування й Захист',
      'browser.tabLight': 'Світла',
      'browser.zoomAria': 'Збільшити скріншот Peak Browser',
      'browser.f1Title': 'Peak Shield · 148 604 правила',
      'browser.f1Desc': '@ghostery/adblocker зі списками EasyList, EasyPrivacy, uBlock та блокуванням YouTube.',
      'browser.f2Title': 'HTTPS-First і приватність',
      'browser.f2Desc': 'Примусовий HTTPS, очищення URL-трекерів (utm, fbclid), заголовки Sec-GPC і DNT.',
      'browser.f3Title': 'Нові peak://settings',
      'browser.f3Desc': 'Двоколонковий інтерфейс із пошуком, винятками та інспектором заблокованих доменів.',
      'browser.f4Title': 'Компактна панель 78 px',
      'browser.f4Desc': 'Поєднана активна вкладка, drag & drop вкладок, розумний URL-рядок і швидке копіювання.',
      'browser.f5Title': '3 теми Синьої Гори',
      'browser.f5Desc': 'Темна, Синя й Світла у всьому вікні, на [0] та зі стартом на [1].',
      'browser.f6Title': 'Без акаунтів · 100% Локально',
      'browser.f6Desc': 'Нуль телеметрії, вибір пошуковика та вибіркове очищення історії, cookies і кешу.',
      'browser.dlBtn': 'Завантажити Peak Browser',
      'browser.dlMoreTitle': 'Більше опцій завантаження Peak Browser',
      'browser.siteBtn': 'Сайт проєкту',
      'launcher.num': 'ПРОЄКТ 02',
      'launcher.cat': 'Лаунчер Minecraft',
      'launcher.summary': 'Кінематографічний лаунчер Minecraft з інтерфейсом [0], власними серверами [1] через Інтернет, [2], модами й шейдерами [3] та автоматичною Java і Fabric.',
      'launcher.galleryCaption': 'Огляд Peak Launcher',
      'launcher.viewsAria': 'Вигляди Peak Launcher',
      'launcher.tabDark': 'Нічна Вершина',
      'launcher.tabHosting': 'Хостинг .peak',
      'launcher.tabSkins': 'Скіни 3D',
      'launcher.tabMods': 'Моди й Шейдери',
      'launcher.tabJava': 'Java і Fabric',
      'launcher.tabLight': 'Льодовиковий День',
      'launcher.zoomAria': 'Збільшити скріншот Peak Launcher',
      'launcher.f1Title': 'Хостинг .peak і Публічний Тунель',
      'launcher.f1Desc': 'Локальні сервери Fabric/Vanilla з [0], Java DNS SPI та публічним тунелем.',
      'launcher.f2Title': '3D Студія Скінів (WebGL)',
      'launcher.f2Desc': 'Інтерактивний 3D-огляд, .png завантаження, пошук за ніком та скіни в грі через Yggdrasil.',
      'launcher.f3Title': 'Peak Cinema й Багато Акаунтів',
      'launcher.f3Desc': 'Повноекранна гірська панорама, перемикач акаунтів, 6 мов та Опції Pro.',
      'launcher.f4Title': 'Modrinth Pro: Моди й Шейдери',
      'launcher.f4Desc': 'Моди, шейдери й ресурс-паки, оновлення в 1 клік та 3 стартові набори.',
      'launcher.f5Title': '925+ версій · Авто-Java/Fabric',
      'launcher.f5Desc': 'Каталог Mojang від Alpha до 26.3, Eclipse Temurin Java 8/17/21/25 та Fabric.',
      'launcher.f6Title': 'Ізольовані профілі та .peak-запрошення',
      'launcher.f6Desc': 'Окремі теки [0], [1], світи та файли запрошень [2] із модами.',
      'launcher.dlBtn': 'Завантажити Peak Launcher',
      'launcher.dlMoreTitle': 'Більше опцій завантаження Peak Launcher',
      'common.enlarge': 'Збільшити',
      'common.enlargeTitle': 'Збільшити у Lightbox',
      'dl.setupTitle': 'Інсталятор Windows (.exe)',
      'dl.setupSubBrowser': 'Рекомендовано · створює ярлики та повне встановлення',
      'dl.setupSubLauncher': 'Рекомендовано · створює ярлики на робочому столі та в Пуск',
      'dl.portableTitle': 'Версія Portable (.exe)',
      'dl.portableSub': 'Без встановлення · працює одразу після запуску',
      'dl.allReleases': 'Усі релізи на GitHub',
      'eco.kicker': 'АРХІТЕКТУРА ТА СТАНДАРТИ · ЕКОСИСТЕМА PEAK LABS',
      'eco.title': 'Спільний технологічний фундамент',
      'eco.lead': 'Обидві програми поєднують єдиний інженерний стандарт, нульову телеметрію та альпійську естетику Peak Cinema.',
      'eco.colParam': 'Параметр екосистеми',
      'eco.row1Key': 'Операційна система',
      'eco.row2Key': 'Формат дистрибуції',
      'eco.row2Val': 'Інсталятор NSIS + Portable (.exe)',
      'eco.row3Key': 'Візуальна система та UI',
      'eco.row3Browser': 'Синя Гора · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6 мов',
      'eco.row4Key': 'Ключові можливості',
      'eco.row4Browser': 'Peak Shield 148K і HTTPS-First',
      'eco.row4Launcher': 'Хостинг .peak, 3D-скіни і Modrinth Pro',
      'eco.row5Key': 'Канал оновлень',
      'eco.row6Key': 'Ціна та телеметрія',
      'eco.row6Val': 'Безкоштовно · 0 телеметрії',
      'eco.labBadge': 'ЛАБОРАТОРІЯ PEAK LABS · ДОРОЖНЯ КАРТА',
      'eco.labTitle': 'Безперервний розвиток у 2026+',
      'eco.labLead': '[0] регулярно випускає оновлення для обох флагманських програм і створює нові легкі утиліти для Windows.',
      'eco.road1Desc': 'Ще швидше оновлення фільтрів, детальніша аналітика Peak Shield та покращені вкладки.',
      'eco.road2Desc': 'Розвиток глобальної мережі .peak, діагностики мультиплеєра та інструментів WebGL.',
      'eco.road3Title': 'Наступні інструменти PEAK LABS',
      'eco.road3Desc': 'Легкі десктопні утиліти Peak Cinema на [0].',
      'releases.kicker': 'ЦЕНТР ЗАВАНТАЖЕНЬ · GITHUB RELEASES',
      'releases.title': 'Релізи та список змін',
      'releases.lead': 'Прямі інсталятори [0] та портативні версії для всіх релізів [1].',
      'releases.filterAria': 'Фільтрувати релізи за продуктом',
      'releases.filterAll': 'Усі',
      'releases.loading': 'Завантаження релізів…',
      'releases.synced': 'Синхронізовано з GitHub Releases',
      'releases.catalog': 'Актуальний каталог релізів PEAK LABS',
      'releases.empty': 'Немає опублікованих релізів для вибраного фільтра.',
      'releases.latestBadge': 'Найновіша',
      'releases.dlSetup': 'Завантажити Інсталятор (.exe)',
      'releases.dlPortable': 'Завантажити Portable (.exe)',
      'releases.viewGithub': 'Переглянути на GitHub ↗',
      'releases.showAll': 'Показати всі {n} релізів',
      'releases.showFewer': 'Показати лише 4 останні',
      'creator.kicker': 'ЗАСНОВНИК І ТВОРЕЦЬ PEAK LABS',
      'creator.role1': 'Засновник · PEAK LABS',
      'creator.role2': 'Desktop & Web Developer',
      'creator.role3': 'UI/UX-дизайнер',
      'creator.bio': 'Проєктує та створює з нуля всю екосистему [0] — від рушія [1] із власним хостингом [2], маршрутизацією Java DNS SPI та 3D-студією скінів WebGL до браузера [3] із [4] (148 604 правила) і цілісної системи [5].',
      'creator.githubBtn': 'Профіль GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Репозиторій PEAK LABS',
      'footer.about': 'Незалежна студія ПЗ, що створює швидкі й чисті програми для Windows 10/11 в естетиці Peak Cinema & Summit Glass.',
      'footer.navTitle': 'Навігація',
      'footer.productsTitle': 'Продукти',
      'footer.launcherSite': 'Сайт Peak Launcher ↗',
      'footer.githubProfile': 'Профіль latajoncy82-svg ↗',
      'footer.repoLabs': 'Репозиторій PEAK LABS ↗',
      'footer.repoBrowser': 'Репо Peak Browser ↗',
      'footer.repoLauncher': 'Репо Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Творець: [0]',
      'footer.themeCredit': 'Естетика Peak Cinema & Summit Glass',
      'lightbox.defaultCaption': 'Попередній перегляд',
      'lightbox.prevAria': 'Попередній скріншот',
      'lightbox.nextAria': 'Наступний скріншот',
      'lightbox.closeAria': 'Закрити перегляд',
      'stage.launcherCinemaSummary': 'Кінематографічний лаунчер Minecraft із хостингом .peak та 3D-студією скінів.',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+ версій',
      'stage.launcherCinemaTag3': 'Auto-Java і Fabric',
      'stage.hostingSummary': 'Власні сервери Fabric і Vanilla з доменами <адреса>.peak в Інтернеті.',
      'stage.hostingTag1': 'Хостинг .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': 'Публічний тунель',
      'stage.skinsSummary': 'Інтерактивний 3D WebGL-редактор скінів із рендерингом Yggdrasil у грі.',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4 пресети Peak',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': 'Чистий браузер, що відкриває PEAK LABS при запуску, з темами Синьої Гори.',
      'stage.browserDarkTag1': 'Панель 78 px',
      'stage.browserDarkTag2': 'Вкладки Drag & Drop',
      'stage.browserDarkTag3': 'Нуль телеметрії',
      'stage.browserSettingsSummary': 'Повний адблок Peak Shield (148 604 правила), HTTPS-First і нові налаштування.',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'Адблок YouTube',
      'stage.previewAltPrefix': 'Перегляд',
      'shot.browserDark': 'Peak Browser — Темна тема (Типова)',
      'shot.browserSettings': 'Peak Browser — Налаштування та Peak Shield (148 604 правила)',
      'shot.browserLight': 'Peak Browser — Світла тема',
      'shot.launcherDark': 'Peak Launcher — Нічна Вершина (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Хостинг серверів .peak',
      'shot.launcherSkins': 'Peak Launcher — 3D Студія Скінів (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro: Моди й Шейдери',
      'shot.launcherJava': 'Peak Launcher — Центр Java і Fabric',
      'shot.launcherLight': 'Peak Launcher — Льодовиковий День (Peak Cinema)'
    },

    it: {
      'meta.title': 'PEAK LABS — Studio software | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS è uno studio software indipendente fondato da Mikołaj Grynienko. Creatori di Peak Browser (v1.2.1 con 148.604 regole adblock) e Peak Launcher (v1.5.1 con hosting .peak e skin 3D).',
      'meta.ogDescription': 'Studio software indipendente PEAK LABS (peaklabstudio.vercel.app) — creatori di Peak Browser v1.2.1 e Peak Launcher v1.5.1. Fondatore: Mikołaj Grynienko.',
      'brand.ariaLabel': 'PEAK LABS — pagina principale',
      'nav.ariaLabel': 'Navigazione principale',
      'nav.about': 'Chi siamo',
      'nav.projects': 'Progetti',
      'nav.ecosystem': 'Ecosistema',
      'nav.releases': 'Versioni',
      'nav.creator': 'Creatore',
      'header.themeTitle': 'Cambia tema del sito (Scuro / Chiaro)',
      'header.themeAria': 'Cambia tema',
      'header.menuOpenAria': 'Apri menu',
      'header.menuCloseAria': 'Chiudi menu',
      'mobile.navAria': 'Menu mobile',
      'mobile.creatorLabel': 'Creatore: Mikołaj Grynienko',
      'lang.aria': 'Seleziona lingua',
      'lang.auto': 'Auto (Browser)',
      'lang.instantGroup': 'Lingue integrate',
      'lang.autoGroup': 'Traduzione automatica',
      'lang.translating': 'Traduzione…',
      'hero.releasePillAria': 'Vai alle ultime versioni',
      'hero.tagline': 'Software indipendente al vertice di design, velocità e privacy.',
      'hero.lead': 'Fondato da [0], creiamo app Windows native nello stile [1] & [2] — [3] con [4] regole adblock e [5] con hosting [6] e skin 3D.',
      'hero.ctaProjects': 'Esplora i progetti',
      'hero.ctaReleases': 'Centro download',
      'hero.stageAria': 'Cambia anteprima prodotto',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Hosting .peak',
      'hero.stageSkins': '3D Skin Studio',
      'hero.stageBrowserDark': 'Peak Browser · Scuro',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'Ingrandisci schermata',
      'hero.stageDownload': 'Scarica Installer',
      'hero.stageDetails': 'Dettagli ↓',
      'hero.stat1Label': 'Regole anti-pub e tracker',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Versioni Minecraft e .peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · Alpha a 26.3',
      'hero.stat3Label': 'Versioni pubblicate su GitHub',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'Telemetria, account o annunci',
      'hero.stat4Sub': '100% locale e open source',
      'about.kicker': 'PEAK LABS · STUDIO SOFTWARE INDIPENDENTE',
      'about.title': 'Software realizzato al vertice.',
      'about.lead': '[0] è uno studio software polacco indipendente fondato da [1]. Ogni strumento è progettato per chiarezza, zero tracciamento e prestazioni fluide su Windows 10 e 11 — unendo l’interfaccia essenziale [2] a un’automazione profonda.',
      'about.jumpBrowser': 'v1.2.1 · Adblock 148K & HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · Hosting .peak & Skin 3D',
      'about.jumpReleases': '15 installer .exe & note di rilascio',
      'about.card1Title': 'Design Peak Cinema & Summit Glass',
      'about.card1Desc': 'Panorami alpini a tutto schermo, superfici ossidiana scure, bordi da 1 px e vetro satinato senza riquadri superflui.',
      'about.card2Title': 'Peak Shield 148K & HTTPS-First',
      'about.card2Desc': 'Blocco annunci di rete e cosmetico con [0] regole, rimozione pubblicità YouTube, upgrade [1] e pulizia URL.',
      'about.card3Title': 'Hosting .peak & Skin 3D WebGL',
      'about.card3Desc': 'Ospita server Fabric o Vanilla con domini [0] via Internet, personalizza skin in 3D e automatizza Java e mod.',
      'about.card4Title': '100% Open Source & Zero Telemetria',
      'about.card4Desc': 'Nessun account né telemetria. Ogni versione di [0] e [1] è pubblica su [2] come installer NSIS ([3]) e Portable.',
      'projects.kicker': 'I NOSTRI PROGETTI · APP DI PUNTA',
      'projects.title': 'Due app di punta per Windows',
      'projects.lead': 'Alterna le viste dal vivo, ingrandisci ogni schermata in Lightbox o scarica subito l’ultima versione.',
      'browser.num': 'PROGETTO 01',
      'browser.cat': 'Browser web',
      'browser.summary': 'Browser Windows pulito e veloce con tema Montagna Blu, adblocker completo [1] da [0] regole, sicurezza [2] e impostazioni a schermo intero.',
      'browser.galleryCaption': 'Anteprima Peak Browser',
      'browser.themesAria': 'Temi Peak Browser',
      'browser.tabDark': 'Scuro (Default)',
      'browser.tabSettings': 'Impostazioni & Scudo',
      'browser.tabLight': 'Chiaro',
      'browser.zoomAria': 'Ingrandisci schermata Peak Browser',
      'browser.f1Title': 'Peak Shield · 148.604 regole',
      'browser.f1Desc': '@ghostery/adblocker con EasyList, EasyPrivacy, uBlock e blocco annunci YouTube.',
      'browser.f2Title': 'HTTPS-First & Privacy',
      'browser.f2Desc': 'Impone HTTPS, rimuove parametri traccianti URL (utm, fbclid), Sec-GPC e DNT.',
      'browser.f3Title': 'Nuovo peak://settings',
      'browser.f3Desc': 'Impostazioni a due colonne con ricerca, lista eccezioni e ispettore domini bloccati.',
      'browser.f4Title': 'Barra 78 px & Schede',
      'browser.f4Desc': 'Scheda attiva scolpita, riordino drag & drop, barra smart e copia URL istantanea.',
      'browser.f5Title': '3 temi Montagna Blu',
      'browser.f5Desc': 'Scuro, Blu e Chiaro in tutta la finestra, su [0] e apre [1] all’avvio.',
      'browser.f6Title': 'Zero account · 100% Locale',
      'browser.f6Desc': 'Senza telemetria, scelta motore e pulizia mirata di cronologia, cookie e cache.',
      'browser.dlBtn': 'Scarica Peak Browser',
      'browser.dlMoreTitle': 'Altre opzioni di download Peak Browser',
      'browser.siteBtn': 'Sito del progetto',
      'launcher.num': 'PROGETTO 02',
      'launcher.cat': 'Launcher Minecraft',
      'launcher.summary': 'Launcher Minecraft cinematografico con interfaccia [0], server self-hosted [1] su Internet, [2], mod & shader [3] e Java e Fabric automatici.',
      'launcher.galleryCaption': 'Anteprima Peak Launcher',
      'launcher.viewsAria': 'Viste Peak Launcher',
      'launcher.tabDark': 'Vetta Notturna',
      'launcher.tabHosting': 'Hosting .peak',
      'launcher.tabSkins': 'Skin 3D',
      'launcher.tabMods': 'Mod & Shader',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.tabLight': 'Giorno Glaciale',
      'launcher.zoomAria': 'Ingrandisci schermata Peak Launcher',
      'launcher.f1Title': 'Hosting .peak & Tunnel Globale',
      'launcher.f1Desc': 'Avvia server Fabric/Vanilla locali con [0], Java DNS SPI e tunnel pubblico.',
      'launcher.f2Title': '3D Skin Studio (WebGL)',
      'launcher.f2Desc': 'Anteprima 3D interattiva, caricamento .png, ricerca nick e skin in gioco Yggdrasil.',
      'launcher.f3Title': 'Peak Cinema & Multi-Account',
      'launcher.f3Desc': 'GUI panoramica, cambio account in alto, 6 lingue e Opzioni Pro a 2 colonne.',
      'launcher.f4Title': 'Modrinth Pro: Mod & Shader',
      'launcher.f4Desc': 'Mod, Shader e Resource Pack, aggiornamenti in 1 clic e 3 pacchetti iniziali.',
      'launcher.f5Title': '925+ Versioni · Auto-Java/Fabric',
      'launcher.f5Desc': 'Catalogo Mojang da Alpha a 26.3, Eclipse Temurin Java 8/17/21/25 e Fabric.',
      'launcher.f6Title': 'Profili isolati & Inviti .peak',
      'launcher.f6Desc': 'Cartelle [0], [1] e mondi separati con file invito [2] condivisibili.',
      'launcher.dlBtn': 'Scarica Peak Launcher',
      'launcher.dlMoreTitle': 'Altre opzioni di download Peak Launcher',
      'common.enlarge': 'Ingrandisci',
      'common.enlargeTitle': 'Ingrandisci nel Lightbox',
      'dl.setupTitle': 'Installer Windows (.exe)',
      'dl.setupSubBrowser': 'Consigliato · crea scorciatoie e installazione completa',
      'dl.setupSubLauncher': 'Consigliato · crea scorciatoie su Desktop e menu Start',
      'dl.portableTitle': 'Edizione Portable (.exe)',
      'dl.portableSub': 'Senza installazione · pronto subito all’avvio',
      'dl.allReleases': 'Tutte le versioni su GitHub',
      'eco.kicker': 'ARCHITETTURA E STANDARD · ECOSISTEMA PEAK LABS',
      'eco.title': 'Base tecnologica condivisa',
      'eco.lead': 'Entrambe le app condividono lo stesso standard ingegneristico, zero telemetria ed estetica alpina Peak Cinema.',
      'eco.colParam': 'Parametro ecosistema',
      'eco.row1Key': 'Sistema operativo',
      'eco.row2Key': 'Formato distribuzione',
      'eco.row2Val': 'Installer NSIS + Portable (.exe)',
      'eco.row3Key': 'Sistema visivo & UI',
      'eco.row3Browser': 'Montagna Blu · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6 lingue',
      'eco.row4Key': 'Funzioni chiave',
      'eco.row4Browser': 'Peak Shield 148K & HTTPS-First',
      'eco.row4Launcher': 'Hosting .peak, Skin 3D & Modrinth Pro',
      'eco.row5Key': 'Canale aggiornamenti',
      'eco.row6Key': 'Prezzo e telemetria',
      'eco.row6Val': 'Gratuito · 0 telemetria',
      'eco.labBadge': 'LABORATORIO PEAK LABS · ROADMAP',
      'eco.labTitle': 'Evoluzione continua nel 2026+',
      'eco.labLead': '[0] rilascia aggiornamenti frequenti per entrambe le app principali sviluppando nuove utility per Windows.',
      'eco.road1Desc': 'Aggiornamenti filtri più rapidi, analisi Peak Shield e perfezionamenti delle schede.',
      'eco.road2Desc': 'Rilevamento globale .peak potenziato, diagnostica multiplayer e strumenti WebGL.',
      'eco.road3Title': 'Prossimi strumenti PEAK LABS',
      'eco.road3Desc': 'Utility desktop leggere Peak Cinema pubblicate su [0].',
      'releases.kicker': 'CENTRO DOWNLOAD · GITHUB RELEASES',
      'releases.title': 'Versioni e note di rilascio',
      'releases.lead': 'Installer [0] diretti ed edizioni Portable per tutte le versioni di [1].',
      'releases.filterAria': 'Filtra versioni per prodotto',
      'releases.filterAll': 'Tutte',
      'releases.loading': 'Caricamento versioni…',
      'releases.synced': 'Sincronizzato con GitHub Releases',
      'releases.catalog': 'Catalogo attuale delle versioni PEAK LABS',
      'releases.empty': 'Nessuna versione pubblicata per il filtro selezionato.',
      'releases.latestBadge': 'Ultima',
      'releases.dlSetup': 'Scarica Installer (.exe)',
      'releases.dlPortable': 'Scarica Portable (.exe)',
      'releases.viewGithub': 'Vedi su GitHub ↗',
      'releases.showAll': 'Mostra tutte le {n} versioni',
      'releases.showFewer': 'Mostra solo le 4 più recenti',
      'creator.kicker': 'FONDATORE E CREATORE DI PEAK LABS',
      'creator.role1': 'Fondatore · PEAK LABS',
      'creator.role2': 'Sviluppatore Desktop & Web',
      'creator.role3': 'Designer UI/UX',
      'creator.bio': 'Progetta e realizza da zero l’intero ecosistema [0] — dal motore [1] con server [2], routing Java DNS SPI e 3D Skin Studio WebGL fino a [3] con [4] (148.604 regole) e al sistema visivo [5].',
      'creator.githubBtn': 'Profilo GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repository PEAK LABS',
      'footer.about': 'Studio software indipendente che crea app Windows 10/11 veloci e pulite nello stile Peak Cinema & Summit Glass.',
      'footer.navTitle': 'Navigazione',
      'footer.productsTitle': 'Prodotti',
      'footer.launcherSite': 'Sito Peak Launcher ↗',
      'footer.githubProfile': 'Profilo latajoncy82-svg ↗',
      'footer.repoLabs': 'Repo PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Creatore: [0]',
      'footer.themeCredit': 'Estetica Peak Cinema & Summit Glass',
      'lightbox.defaultCaption': 'Anteprima schermo',
      'lightbox.prevAria': 'Schermata precedente',
      'lightbox.nextAria': 'Schermata successiva',
      'lightbox.closeAria': 'Chiudi anteprima',
      'stage.launcherCinemaSummary': 'Launcher Minecraft cinematografico con hosting .peak e 3D Skin Studio.',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+ versioni',
      'stage.launcherCinemaTag3': 'Auto-Java & Fabric',
      'stage.hostingSummary': 'Ospita server Fabric e Vanilla con domini <indirizzo>.peak via Internet.',
      'stage.hostingTag1': 'Hosting .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': 'Tunnel pubblico',
      'stage.skinsSummary': 'Editor skin 3D WebGL interattivo con rendering Yggdrasil in gioco.',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4 preset Peak',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': 'Browser pulito che apre PEAK LABS all’avvio con temi Montagna Blu.',
      'stage.browserDarkTag1': 'Barra 78 px',
      'stage.browserDarkTag2': 'Schede Drag & Drop',
      'stage.browserDarkTag3': 'Zero telemetria',
      'stage.browserSettingsSummary': 'Adblocker Peak Shield da 148.604 regole, HTTPS-First e nuove impostazioni.',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'Adblock YouTube',
      'stage.previewAltPrefix': 'Anteprima di',
      'shot.browserDark': 'Peak Browser — Tema Scuro (Predefinito)',
      'shot.browserSettings': 'Peak Browser — Impostazioni & Peak Shield (148.604 regole)',
      'shot.browserLight': 'Peak Browser — Tema Chiaro',
      'shot.launcherDark': 'Peak Launcher — Vetta Notturna (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Server Hosting .peak',
      'shot.launcherSkins': 'Peak Launcher — 3D Skin Studio (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro: Mod & Shader',
      'shot.launcherJava': 'Peak Launcher — Centro Java & Fabric',
      'shot.launcherLight': 'Peak Launcher — Giorno Glaciale (Peak Cinema)'
    },

    pt: {
      'meta.title': 'PEAK LABS — Estúdio de software | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS é um estúdio independente fundado por Mikołaj Grynienko. Criadores do Peak Browser (v1.2.1 com 148.604 regras adblock) e Peak Launcher (v1.5.1 com hospedagem .peak e skins 3D).',
      'meta.ogDescription': 'Estúdio independente PEAK LABS (peaklabstudio.vercel.app) — criadores do Peak Browser v1.2.1 e Peak Launcher v1.5.1. Criador: Mikołaj Grynienko.',
      'brand.ariaLabel': 'PEAK LABS — página inicial',
      'nav.ariaLabel': 'Navegação principal',
      'nav.about': 'Sobre',
      'nav.projects': 'Projetos',
      'nav.ecosystem': 'Ecossistema',
      'nav.releases': 'Versões',
      'nav.creator': 'Criador',
      'header.themeTitle': 'Alternar tema do site (Escuro / Claro)',
      'header.themeAria': 'Alternar tema',
      'header.menuOpenAria': 'Abrir menu',
      'header.menuCloseAria': 'Fechar menu',
      'mobile.navAria': 'Menu móvel',
      'mobile.creatorLabel': 'Criador: Mikołaj Grynienko',
      'lang.aria': 'Selecionar idioma',
      'lang.auto': 'Auto (Navegador)',
      'lang.instantGroup': 'Idiomas integrados',
      'lang.autoGroup': 'Tradução automática',
      'lang.translating': 'Traduzindo…',
      'hero.releasePillAria': 'Ir para as últimas versões',
      'hero.tagline': 'Software independente no topo do design, velocidade e privacidade.',
      'hero.lead': 'Fundado por [0], criamos apps nativos para Windows no estilo [1] & [2] — [3] com [4] regras adblock e [5] com servidores [6] e skins 3D.',
      'hero.ctaProjects': 'Explorar projetos',
      'hero.ctaReleases': 'Central de downloads',
      'hero.stageAria': 'Alternar prévia do produto',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Hosting .peak',
      'hero.stageSkins': '3D Skin Studio',
      'hero.stageBrowserDark': 'Peak Browser · Escuro',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'Ampliar captura',
      'hero.stageDownload': 'Baixar Instalador',
      'hero.stageDetails': 'Detalhes ↓',
      'hero.stat1Label': 'Regras contra anúncios',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Versões Minecraft e .peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · Alpha até 26.3',
      'hero.stat3Label': 'Versões no GitHub',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'Telemetria, contas ou anúncios',
      'hero.stat4Sub': '100% local e open source',
      'about.kicker': 'PEAK LABS · ESTÚDIO DE SOFTWARE INDEPENDENTE',
      'about.title': 'Software criado no cume.',
      'about.lead': '[0] é um estúdio e laboratório polonês independente fundado por [1]. Cada ferramenta é projetada para clareza, zero rastreamento e agilidade no Windows 10 e 11 — unindo a interface [2] à automação completa.',
      'about.jumpBrowser': 'v1.2.1 · Adblock 148K e HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · Hosting .peak e Skins 3D',
      'about.jumpReleases': '15 instaladores .exe e novidades',
      'about.card1Title': 'Design Peak Cinema & Summit Glass',
      'about.card1Desc': 'Panoramas alpinos em tela cheia, superfícies obsidiana escuras, bordas de 1 px e vidro fosco sem caixas ruidosas.',
      'about.card2Title': 'Peak Shield 148K e HTTPS-First',
      'about.card2Desc': 'Bloqueio real de rede e cosmético com [0] regras, limpeza de anúncios no YouTube, [1] e remoção de rastreadores.',
      'about.card3Title': 'Hosting .peak e Skins 3D WebGL',
      'about.card3Desc': 'Hospede servidores Fabric ou Vanilla com domínios [0] pela internet, crie skins em 3D e automatize Java e mods.',
      'about.card4Title': '100% Open Source e Zero Telemetria',
      'about.card4Desc': 'Sem contas nem telemetria. Todo lançamento de [0] e [1] é aberto no [2] com instaladores NSIS ([3]) e Portable.',
      'projects.kicker': 'NOSSOS PROJETOS · APPS PRINCIPAIS',
      'projects.title': 'Dois aplicativos principais para Windows',
      'projects.lead': 'Alterne as visualizações ao vivo, amplie qualquer captura no Lightbox ou baixe a versão mais recente diretamente.',
      'browser.num': 'PROJETO 01',
      'browser.cat': 'Navegador web',
      'browser.summary': 'Navegador Windows rápido e limpo com estética Montanha Azul, adblocker [1] de [0] regras, segurança [2] e configurações redesenhadas.',
      'browser.galleryCaption': 'Prévia do Peak Browser',
      'browser.themesAria': 'Temas do Peak Browser',
      'browser.tabDark': 'Escuro (Padrão)',
      'browser.tabSettings': 'Ajustes e Escudo',
      'browser.tabLight': 'Claro',
      'browser.zoomAria': 'Ampliar captura do Peak Browser',
      'browser.f1Title': 'Peak Shield · 148.604 regras',
      'browser.f1Desc': '@ghostery/adblocker com EasyList, EasyPrivacy, uBlock e remoção de anúncios no YouTube.',
      'browser.f2Title': 'HTTPS-First e Privacidade',
      'browser.f2Desc': 'Impõe HTTPS, limpa parâmetros URL (utm, fbclid), envia cabeçalhos Sec-GPC e DNT.',
      'browser.f3Title': 'Novo peak://settings',
      'browser.f3Desc': 'Configurações em duas colunas com busca, exceções e inspetor de domínios bloqueados.',
      'browser.f4Title': 'Barra 78 px e Abas',
      'browser.f4Desc': 'Aba ativa integrada, reordenação drag & drop, barra inteligente e cópia de URL.',
      'browser.f5Title': '3 temas Montanha Azul',
      'browser.f5Desc': 'Escuro, Azul e Claro em toda a janela, em [0] e abre [1] ao iniciar.',
      'browser.f6Title': 'Zero contas · 100% Local',
      'browser.f6Desc': 'Sem telemetria, escolha de buscador e limpeza seletiva de histórico, cookies e cache.',
      'browser.dlBtn': 'Baixar Peak Browser',
      'browser.dlMoreTitle': 'Mais opções de download do Peak Browser',
      'browser.siteBtn': 'Site do projeto',
      'launcher.num': 'PROJETO 02',
      'launcher.cat': 'Launcher Minecraft',
      'launcher.summary': 'Launcher cinematográfico de Minecraft com interface [0], servidores próprios [1] pela internet, [2], mods & shaders do [3] e Java e Fabric automáticos.',
      'launcher.galleryCaption': 'Prévia do Peak Launcher',
      'launcher.viewsAria': 'Visões do Peak Launcher',
      'launcher.tabDark': 'Cume Noturno',
      'launcher.tabHosting': 'Hosting .peak',
      'launcher.tabSkins': 'Skins 3D',
      'launcher.tabMods': 'Mods e Shaders',
      'launcher.tabJava': 'Java e Fabric',
      'launcher.tabLight': 'Dia Glacial',
      'launcher.zoomAria': 'Ampliar captura do Peak Launcher',
      'launcher.f1Title': 'Hosting .peak e Túnel Global',
      'launcher.f1Desc': 'Servidores locais Fabric/Vanilla com [0], Java DNS SPI e túnel público.',
      'launcher.f2Title': '3D Skin Studio (WebGL)',
      'launcher.f2Desc': 'Prévia 3D interativa, envio .png, busca por nick e skins no jogo via Yggdrasil.',
      'launcher.f3Title': 'Peak Cinema e Multicontas',
      'launcher.f3Desc': 'GUI panorâmica, seletor de contas no topo, 6 idiomas e Opções Pro.',
      'launcher.f4Title': 'Modrinth Pro: Mods e Shaders',
      'launcher.f4Desc': 'Mods, Shaders e Resource Packs, atualizações em 1 clique e 3 pacotes iniciais.',
      'launcher.f5Title': '925+ Versões · Auto-Java/Fabric',
      'launcher.f5Desc': 'Catálogo Mojang de Alpha até 26.3, Eclipse Temurin Java 8/17/21/25 e Fabric.',
      'launcher.f6Title': 'Perfis isolados e convites .peak',
      'launcher.f6Desc': 'Pastas [0], [1] e mundos separados com arquivos de convite [2] compartilháveis.',
      'launcher.dlBtn': 'Baixar Peak Launcher',
      'launcher.dlMoreTitle': 'Mais opções de download do Peak Launcher',
      'common.enlarge': 'Ampliar',
      'common.enlargeTitle': 'Ampliar no Lightbox',
      'dl.setupTitle': 'Instalador Windows (.exe)',
      'dl.setupSubBrowser': 'Recomendado · cria atalhos e instalação completa',
      'dl.setupSubLauncher': 'Recomendado · cria atalhos na Área de Trabalho e Menu Iniciar',
      'dl.portableTitle': 'Edição Portable (.exe)',
      'dl.portableSub': 'Sem instalação · roda na hora ao abrir',
      'dl.allReleases': 'Todas as versões no GitHub',
      'eco.kicker': 'ARQUITETURA E PADRÕES · ECOSSISTEMA PEAK LABS',
      'eco.title': 'Base tecnológica compartilhada',
      'eco.lead': 'Ambos os aplicativos compartilham o mesmo padrão técnico, zero telemetria e estética alpina Peak Cinema.',
      'eco.colParam': 'Parâmetro do ecossistema',
      'eco.row1Key': 'Sistema operacional',
      'eco.row2Key': 'Formato de distribuição',
      'eco.row2Val': 'Instalador NSIS + Portable (.exe)',
      'eco.row3Key': 'Sistema visual e UI',
      'eco.row3Browser': 'Montanha Azul · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6 idiomas',
      'eco.row4Key': 'Recursos principais',
      'eco.row4Browser': 'Peak Shield 148K e HTTPS-First',
      'eco.row4Launcher': 'Hosting .peak, Skins 3D e Modrinth Pro',
      'eco.row5Key': 'Canal de atualizações',
      'eco.row6Key': 'Preço e telemetria',
      'eco.row6Val': 'Grátis · 0 telemetria',
      'eco.labBadge': 'LABORATÓRIO PEAK LABS · ROTEIRO',
      'eco.labTitle': 'Evolução contínua em 2026+',
      'eco.labLead': '[0] lança melhorias contínuas para ambos os apps principais enquanto desenvolve novos utilitários para Windows.',
      'eco.road1Desc': 'Atualizações de filtros mais rápidas, métricas do Peak Shield e refinamentos de abas.',
      'eco.road2Desc': 'Descoberta global .peak aprimorada, diagnósticos multiplayer e melhorias WebGL.',
      'eco.road3Title': 'Próximas ferramentas PEAK LABS',
      'eco.road3Desc': 'Utilitários leves Peak Cinema publicados em [0].',
      'releases.kicker': 'CENTRAL DE DOWNLOADS · GITHUB RELEASES',
      'releases.title': 'Versões e novidades',
      'releases.lead': 'Instaladores [0] diretos e edições Portable de todas as versões da [1].',
      'releases.filterAria': 'Filtrar versões por produto',
      'releases.filterAll': 'Todas',
      'releases.loading': 'Carregando versões…',
      'releases.synced': 'Sincronizado com GitHub Releases',
      'releases.catalog': 'Catálogo atual de versões PEAK LABS',
      'releases.empty': 'Nenhuma versão publicada para o filtro escolhido.',
      'releases.latestBadge': 'Mais recente',
      'releases.dlSetup': 'Baixar Instalador (.exe)',
      'releases.dlPortable': 'Baixar Portable (.exe)',
      'releases.viewGithub': 'Ver no GitHub ↗',
      'releases.showAll': 'Mostrar todas as {n} versões',
      'releases.showFewer': 'Mostrar apenas as 4 mais recentes',
      'creator.kicker': 'FUNDADOR E CRIADOR DA PEAK LABS',
      'creator.role1': 'Fundador · PEAK LABS',
      'creator.role2': 'Desenvolvedor Desktop & Web',
      'creator.role3': 'Designer UI/UX',
      'creator.bio': 'Projeta e constrói todo o ecossistema [0] do zero — do motor [1] com servidores próprios [2], roteamento Java DNS SPI e 3D Skin Studio WebGL até o [3] com [4] (148.604 regras) e o sistema visual [5].',
      'creator.githubBtn': 'Perfil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repositório PEAK LABS',
      'footer.about': 'Estúdio independente que cria aplicativos Windows 10/11 rápidos e limpos no visual Peak Cinema & Summit Glass.',
      'footer.navTitle': 'Navegação',
      'footer.productsTitle': 'Produtos',
      'footer.launcherSite': 'Site Peak Launcher ↗',
      'footer.githubProfile': 'Perfil latajoncy82-svg ↗',
      'footer.repoLabs': 'Repo PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Criador: [0]',
      'footer.themeCredit': 'Estética Peak Cinema & Summit Glass',
      'lightbox.defaultCaption': 'Prévia de tela',
      'lightbox.prevAria': 'Captura anterior',
      'lightbox.nextAria': 'Próxima captura',
      'lightbox.closeAria': 'Fechar prévia',
      'stage.launcherCinemaSummary': 'Launcher Minecraft cinematográfico com hospedagem .peak e 3D Skin Studio.',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+ versões',
      'stage.launcherCinemaTag3': 'Auto-Java e Fabric',
      'stage.hostingSummary': 'Hospede servidores Fabric e Vanilla com domínios <endereço>.peak na internet.',
      'stage.hostingTag1': 'Hosting .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': 'Túnel público',
      'stage.skinsSummary': 'Editor interativo de skins 3D WebGL com renderização Yggdrasil no jogo.',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4 presets Peak',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': 'Navegador limpo que abre PEAK LABS ao iniciar com temas Montanha Azul.',
      'stage.browserDarkTag1': 'Barra 78 px',
      'stage.browserDarkTag2': 'Abas Drag & Drop',
      'stage.browserDarkTag3': 'Zero telemetria',
      'stage.browserSettingsSummary': 'Adblocker Peak Shield de 148.604 regras, HTTPS-First e novos ajustes.',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'Adblock YouTube',
      'stage.previewAltPrefix': 'Prévia de',
      'shot.browserDark': 'Peak Browser — Tema Escuro (Padrão)',
      'shot.browserSettings': 'Peak Browser — Ajustes e Peak Shield (148.604 regras)',
      'shot.browserLight': 'Peak Browser — Tema Claro',
      'shot.launcherDark': 'Peak Launcher — Cume Noturno (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Servidores Hosting .peak',
      'shot.launcherSkins': 'Peak Launcher — 3D Skin Studio (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro: Mods e Shaders',
      'shot.launcherJava': 'Peak Launcher — Central Java e Fabric',
      'shot.launcherLight': 'Peak Launcher — Dia Glacial (Peak Cinema)'
    },

    cs: {
      'meta.title': 'PEAK LABS — Softwarové studio | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS je nezávislé softwarové studio založené Mikołajem Grynienkem. Tvůrci Peak Browser (v1.2.1 se 148 604 pravidly adblocku) a Peak Launcher (v1.5.1 s hostingem .peak a 3D skiny).',
      'meta.ogDescription': 'Nezávislé softwarové studio PEAK LABS (peaklabstudio.vercel.app) — tvůrci Peak Browser v1.2.1 a Peak Launcher v1.5.1. Autor: Mikołaj Grynienko.',
      'brand.ariaLabel': 'PEAK LABS — domovská stránka',
      'nav.ariaLabel': 'Hlavní navigace',
      'nav.about': 'O studiu',
      'nav.projects': 'Projekty',
      'nav.ecosystem': 'Ekosystém',
      'nav.releases': 'Verze',
      'nav.creator': 'Tvůrce',
      'header.themeTitle': 'Přepnout motiv stránky (Tmavý / Světlý)',
      'header.themeAria': 'Přepnout motiv',
      'header.menuOpenAria': 'Otevřít menu',
      'header.menuCloseAria': 'Zavřít menu',
      'mobile.navAria': 'Mobilní menu',
      'mobile.creatorLabel': 'Tvůrce: Mikołaj Grynienko',
      'lang.aria': 'Výběr jazyka',
      'lang.auto': 'Auto (Prohlížeč)',
      'lang.instantGroup': 'Vestavěné jazyky',
      'lang.autoGroup': 'Automatický překlad',
      'lang.translating': 'Překládám…',
      'hero.releasePillAria': 'Přejít na nejnovější verze',
      'hero.tagline': 'Nezávislý software na vrcholu designu, rychlosti a soukromí.',
      'hero.lead': 'Založeno [0] — tvoříme nativní aplikace pro Windows v estetice [1] & [2]: [3] se [4] pravidly adblocku a [5] s hostingem [6] a 3D skiny.',
      'hero.ctaProjects': 'Prohlédnout projekty',
      'hero.ctaReleases': 'Centrum stahování',
      'hero.stageAria': 'Přepnout náhled produktu',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Hosting .peak',
      'hero.stageSkins': '3D Studio Skinů',
      'hero.stageBrowserDark': 'Peak Browser · Tmavý',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'Zvětšit snímek',
      'hero.stageDownload': 'Stáhnout Instalátor',
      'hero.stageDetails': 'Podrobnosti ↓',
      'hero.stat1Label': 'Pravidel proti reklamám',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Verzí Minecraftu a .peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · od Alpha po 26.3',
      'hero.stat3Label': 'Vydaných verzí na GitHubu',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'Telemetrie, účtů a reklam',
      'hero.stat4Sub': '100% lokální a open source',
      'about.kicker': 'PEAK LABS · NEZÁVISLÉ SOFTWAROVÉ STUDIO',
      'about.title': 'Software tvořený na vrcholu.',
      'about.lead': '[0] je nezávislé polské softwarové studio a laboratoř založená [1]. Každý nástroj je navržen pro přehlednost, nulové sledování a bleskový chod na Windows 10 a 11 — spojuje filmové rozhraní [2] s hlubokou automatizací.',
      'about.jumpBrowser': 'v1.2.1 · Adblock 148K a HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · Hosting .peak a 3D Skiny',
      'about.jumpReleases': '15 instalátorů .exe a seznamy změn',
      'about.card1Title': 'Design Peak Cinema & Summit Glass',
      'about.card1Desc': 'Celoobrazovkové horské panoramata, tmavé obsidiánové plochy, tenké linky 1 px a matné sklo bez zbytečných rámečků.',
      'about.card2Title': 'Peak Shield 148K & HTTPS-First',
      'about.card2Desc': 'Skutečné síťové i kosmetické blokování reklam se [0] pravidly, odstranění reklam na YouTube, [1] a čištění URL.',
      'about.card3Title': 'Hosting .peak a 3D Skiny WebGL',
      'about.card3Desc': 'Hostujte vlastní Fabric nebo Vanilla servery s doménami [0] přes internet, upravujte 3D skiny a automatizujte Javu a módy.',
      'about.card4Title': '100% Open Source & Nula Telemetrie',
      'about.card4Desc': 'Žádné účty ani telemetrie. Každé vydání [0] a [1] je otevřeně na [2] jako instalátor NSIS ([3]) i Portable.',
      'projects.kicker': 'NAŠE PROJEKTY · VLAJKOVÉ APLIKACE',
      'projects.title': 'Dvě vlajkové aplikace pro Windows',
      'projects.lead': 'Přepínejte živé náhledy, zvětšete jakýkoli snímek v Lightboxu nebo stáhněte nejnovější vydání jedním kliknutím.',
      'browser.num': 'PROJEKT 01',
      'browser.cat': 'Webový prohlížeč',
      'browser.summary': 'Rychlý a čistý prohlížeč s motivem Modré Hory, plným adblockem [1] ([0] pravidel), ochranou [2] a přepracovaným nastavením na celou obrazovku.',
      'browser.galleryCaption': 'Náhled Peak Browser',
      'browser.themesAria': 'Motivy Peak Browser',
      'browser.tabDark': 'Tmavý (Výchozí)',
      'browser.tabSettings': 'Nastavení & Štít',
      'browser.tabLight': 'Světlý',
      'browser.zoomAria': 'Zvětšit snímek Peak Browser',
      'browser.f1Title': 'Peak Shield · 148 604 pravidel',
      'browser.f1Desc': '@ghostery/adblocker se seznamy EasyList, EasyPrivacy, uBlock a blokováním YouTube.',
      'browser.f2Title': 'HTTPS-First a soukromí',
      'browser.f2Desc': 'Vynucuje HTTPS, čistí sledovací parametry URL (utm, fbclid), hlavičky Sec-GPC a DNT.',
      'browser.f3Title': 'Nové peak://settings',
      'browser.f3Desc': 'Dvousloupcové nastavení s vyhledáváním, výjimkami a inspektorem blokovaných domén.',
      'browser.f4Title': 'Kompaktní lišta 78 px a karty',
      'browser.f4Desc': 'Napojená aktivní karta, drag & drop přesouvání, chytrý adresní řádek a kopírování URL.',
      'browser.f5Title': '3 motivy Modré Hory',
      'browser.f5Desc': 'Tmavý, Modrý a Světlý v celém okně, na [0] a startem na [1].',
      'browser.f6Title': 'Bez účtů · 100% Lokálně',
      'browser.f6Desc': 'Bez telemetrie, volba vyhledávače a cílené mazání historie, cookies a mezipaměti.',
      'browser.dlBtn': 'Stáhnout Peak Browser',
      'browser.dlMoreTitle': 'Další možnosti stažení Peak Browser',
      'browser.siteBtn': 'Web projektu',
      'launcher.num': 'PROJEKT 02',
      'launcher.cat': 'Minecraft launcher',
      'launcher.summary': 'Filmový launcher Minecraftu s rozhraním [0], vlastními servery [1] přes internet, [2], módy a shadery [3] i automatickou Javou a Fabricem.',
      'launcher.galleryCaption': 'Náhled Peak Launcher',
      'launcher.viewsAria': 'Pohledy Peak Launcher',
      'launcher.tabDark': 'Noční Vrchol',
      'launcher.tabHosting': 'Hosting .peak',
      'launcher.tabSkins': '3D Skiny',
      'launcher.tabMods': 'Módy & Shadery',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.tabLight': 'Ledovcový Den',
      'launcher.zoomAria': 'Zvětšit snímek Peak Launcher',
      'launcher.f1Title': 'Hosting .peak a Veřejný Tunel',
      'launcher.f1Desc': 'Lokální servery Fabric/Vanilla s [0], Java DNS SPI a veřejným tunelem.',
      'launcher.f2Title': '3D Studio Skinů (WebGL)',
      'launcher.f2Desc': 'Interaktivní 3D náhled, nahrání .png, stažení podle nicku a skiny ve hře přes Yggdrasil.',
      'launcher.f3Title': 'Peak Cinema a Více účtů',
      'launcher.f3Desc': 'Celooknové panorama, přepínač účtů v liště, 6 jazyků a Možnosti Pro.',
      'launcher.f4Title': 'Modrinth Pro: Módy a Shadery',
      'launcher.f4Desc': 'Módy, shadery a resource packy, aktualizace 1 kliknutím a 3 startovní balíčky.',
      'launcher.f5Title': '925+ verzí · Auto-Java/Fabric',
      'launcher.f5Desc': 'Katalog Mojang od Alpha po 26.3, Eclipse Temurin Java 8/17/21/25 a Fabric.',
      'launcher.f6Title': 'Izolované profily a pozvánky .peak',
      'launcher.f6Desc': 'Oddělené složky [0], [1], světy a sdílitelné pozvánky [2] včetně módů.',
      'launcher.dlBtn': 'Stáhnout Peak Launcher',
      'launcher.dlMoreTitle': 'Další možnosti stažení Peak Launcher',
      'common.enlarge': 'Zvětšit',
      'common.enlargeTitle': 'Zvětšit v Lightboxu',
      'dl.setupTitle': 'Instalátor Windows (.exe)',
      'dl.setupSubBrowser': 'Doporučeno · vytvoří zástupce a úplnou instalaci',
      'dl.setupSubLauncher': 'Doporučeno · vytvoří zástupce na ploše a v nabídce Start',
      'dl.portableTitle': 'Edice Portable (.exe)',
      'dl.portableSub': 'Bez instalace · připraveno ihned po spuštění',
      'dl.allReleases': 'Všechny verze na GitHubu',
      'eco.kicker': 'ARCHITEKTURA A STANDARDY · EKOSYSTÉM PEAK LABS',
      'eco.title': 'Společný technologický základ',
      'eco.lead': 'Obě aplikace sdílejí stejný inženýrský standard, nulovou telemetrii a alpskou estetiku Peak Cinema.',
      'eco.colParam': 'Parametr ekosystému',
      'eco.row1Key': 'Operační systém',
      'eco.row2Key': 'Formát distribuce',
      'eco.row2Val': 'Instalátor NSIS + Portable (.exe)',
      'eco.row3Key': 'Vizuální systém a UI',
      'eco.row3Browser': 'Modrá Hora · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6 jazyků',
      'eco.row4Key': 'Hlavní funkce',
      'eco.row4Browser': 'Peak Shield 148K a HTTPS-First',
      'eco.row4Launcher': 'Hosting .peak, 3D Skiny a Modrinth Pro',
      'eco.row5Key': 'Kanál aktualizací',
      'eco.row6Key': 'Cena a telemetrie',
      'eco.row6Val': 'Zdarma · 0 telemetrie',
      'eco.labBadge': 'LABORATOŘ PEAK LABS · PLÁN',
      'eco.labTitle': 'Neustálý vývoj v roce 2026+',
      'eco.labLead': '[0] pravidelně vydává vylepšení obou hlavních aplikací a připravuje další lehké nástroje pro Windows.',
      'eco.road1Desc': 'Ještě rychlejší aktualizace filtrů, podrobnější přehledy Peak Shield a vylepšení karet.',
      'eco.road2Desc': 'Rozšířené globální objevování .peak, diagnostika multiplayeru a nástroje WebGL.',
      'eco.road3Title': 'Další nástroje PEAK LABS',
      'eco.road3Desc': 'Lehké desktopové utility Peak Cinema zveřejňované na [0].',
      'releases.kicker': 'CENTRUM STAHOVÁNÍ · GITHUB RELEASES',
      'releases.title': 'Verze a seznam změn',
      'releases.lead': 'Přímé instalátory [0] a přenosné edice Portable všech vydání [1].',
      'releases.filterAria': 'Filtrovat verze podle produktu',
      'releases.filterAll': 'Vše',
      'releases.loading': 'Načítání verzí…',
      'releases.synced': 'Synchronizováno s GitHub Releases',
      'releases.catalog': 'Aktuální katalog verzí PEAK LABS',
      'releases.empty': 'Pro zvolený filtr nejsou k dispozici žádné verze.',
      'releases.latestBadge': 'Nejnovější',
      'releases.dlSetup': 'Stáhnout Instalátor (.exe)',
      'releases.dlPortable': 'Stáhnout Portable (.exe)',
      'releases.viewGithub': 'Zobrazit na GitHubu ↗',
      'releases.showAll': 'Zobrazit všech {n} verzí',
      'releases.showFewer': 'Zobrazit jen 4 nejnovější',
      'creator.kicker': 'ZAKLADATEL A TVŮRCE PEAK LABS',
      'creator.role1': 'Zakladatel · PEAK LABS',
      'creator.role2': 'Desktop & Web Developer',
      'creator.role3': 'UI/UX Designer',
      'creator.bio': 'Navrhuje a buduje od základů celý ekosystém [0] — od jádra [1] s vlastním hostingem serverů [2], směrováním Java DNS SPI a 3D Studiem Skinů WebGL až po [3] se štítem [4] (148 604 pravidel) a vizuální systém [5].',
      'creator.githubBtn': 'Profil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repozitář PEAK LABS',
      'footer.about': 'Nezávislé softwarové studio tvořící čisté a rychlé aplikace pro Windows 10/11 v estetice Peak Cinema & Summit Glass.',
      'footer.navTitle': 'Navigace',
      'footer.productsTitle': 'Produkty',
      'footer.launcherSite': 'Web Peak Launcher ↗',
      'footer.githubProfile': 'Profil latajoncy82-svg ↗',
      'footer.repoLabs': 'Repo PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Tvůrce: [0]',
      'footer.themeCredit': 'Estetika Peak Cinema & Summit Glass',
      'lightbox.defaultCaption': 'Náhled obrazovky',
      'lightbox.prevAria': 'Předchozí snímek',
      'lightbox.nextAria': 'Další snímek',
      'lightbox.closeAria': 'Zavřít náhled',
      'stage.launcherCinemaSummary': 'Filmový Minecraft launcher s hostingem .peak a 3D Studiem Skinů.',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+ verzí',
      'stage.launcherCinemaTag3': 'Auto-Java a Fabric',
      'stage.hostingSummary': 'Vlastní servery Fabric a Vanilla s doménami <adresa>.peak přes internet.',
      'stage.hostingTag1': 'Hosting .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': 'Veřejný tunel',
      'stage.skinsSummary': 'Interaktivní 3D WebGL editor skinů se zobrazením ve hře přes Yggdrasil.',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4 presety Peak',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': 'Čistý prohlížeč otevírající při startu PEAK LABS s motivy Modré Hory.',
      'stage.browserDarkTag1': 'Lišta 78 px',
      'stage.browserDarkTag2': 'Karty Drag & Drop',
      'stage.browserDarkTag3': 'Nula telemetrie',
      'stage.browserSettingsSummary': 'Plný adblock Peak Shield se 148 604 pravidly, HTTPS-First a novým nastavením.',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'Adblock YouTube',
      'stage.previewAltPrefix': 'Náhled',
      'shot.browserDark': 'Peak Browser — Tmavý motiv (Výchozí)',
      'shot.browserSettings': 'Peak Browser — Nastavení a Peak Shield (148 604 pravidel)',
      'shot.browserLight': 'Peak Browser — Světlý motiv',
      'shot.launcherDark': 'Peak Launcher — Noční Vrchol (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Servery Hosting .peak',
      'shot.launcherSkins': 'Peak Launcher — 3D Studio Skinů (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro: Módy a Shadery',
      'shot.launcherJava': 'Peak Launcher — Centrum Java a Fabric',
      'shot.launcherLight': 'Peak Launcher — Ledovcový Den (Peak Cinema)'
    },

    ja: {
      'meta.title': 'PEAK LABS — ソフトウェアスタジオ | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABSはMikołaj Grynienkoが設立した独立系ソフトウェアスタジオです。148,604ルールの広告ブロック搭載Peak Browser v1.2.1と、.peakサーバーホスティング＆3Dスキン対応Peak Launcher v1.5.1を開発。',
      'meta.ogDescription': '独立系ソフトウェアスタジオ PEAK LABS (peaklabstudio.vercel.app) — Peak Browser v1.2.1 と Peak Launcher v1.5.1 の開発元。制作者: Mikołaj Grynienko。',
      'brand.ariaLabel': 'PEAK LABS — ホームページ',
      'nav.ariaLabel': 'メインナビゲーション',
      'nav.about': 'スタジオ紹介',
      'nav.projects': 'プロジェクト',
      'nav.ecosystem': 'エコシステム',
      'nav.releases': 'リリース',
      'nav.creator': '制作者',
      'header.themeTitle': 'テーマを切り替え（ダーク / ライト）',
      'header.themeAria': 'サイトテーマを切り替え',
      'header.menuOpenAria': 'メニューを開く',
      'header.menuCloseAria': 'メニューを閉じる',
      'mobile.navAria': 'モバイルメニュー',
      'mobile.creatorLabel': '制作者: Mikołaj Grynienko',
      'lang.aria': '言語を選択',
      'lang.auto': '自動（ブラウザ）',
      'lang.instantGroup': '内蔵言語',
      'lang.autoGroup': '自動翻訳',
      'lang.translating': '翻訳中…',
      'hero.releasePillAria': '最新リリースへ移動',
      'hero.tagline': 'デザイン・速度・プライバシーの頂点を極めた独立系ソフトウェア。',
      'hero.lead': '[0]が設立し、[1]＆[2]美学のネイティブWindowsアプリを開発。[4]ルールの広告ブロックを備えた[3]、および[6]サーバーホスティングと3Dスキン搭載の[5]を提供します。',
      'hero.ctaProjects': 'プロジェクトを見る',
      'hero.ctaReleases': 'ダウンロードセンター',
      'hero.stageAria': '製品プレビューを切り替え',
      'hero.stageLauncherCinema': 'Peak Launcher · Cinema',
      'hero.stageHosting': 'Hosting .peak',
      'hero.stageSkins': '3Dスキンスタジオ',
      'hero.stageBrowserDark': 'Peak Browser · ダーク',
      'hero.stageBrowserSettings': 'Peak Shield · 148K',
      'hero.zoomTitle': 'スクリーンショットを拡大',
      'hero.stageDownload': 'インストーラー取得',
      'hero.stageDetails': '詳細 ↓',
      'hero.stat1Label': '広告・トラッカー遮断ルール',
      'hero.stat1Sub': 'Peak Shield · Peak Browser v1.2.1',
      'hero.stat2Label': 'Minecraftバージョン＆.peak',
      'hero.stat2Sub': 'Peak Launcher v1.5.1 · Alpha〜26.3',
      'hero.stat3Label': 'GitHub公開リリース数',
      'hero.stat3Sub': 'Peak Browser & Peak Launcher',
      'hero.stat4Label': 'テレメトリ・アカウント・広告',
      'hero.stat4Sub': '100%ローカル＆オープンソース',
      'about.kicker': 'PEAK LABS · 独立系ソフトウェアスタジオ',
      'about.title': '頂点を目指したソフトウェア開発。',
      'about.lead': '[0]は[1]が設立したポーランドの独立系ソフトウェアスタジオ兼ラボです。すべてのツールはWindows 10/11上での明快さ、完全なプライバシー、軽快な動作を追求し、[2]のUIと高度な自動化を融合しています。',
      'about.jumpBrowser': 'v1.2.1 · 148K広告ブロック＆HTTPS-First',
      'about.jumpLauncher': 'v1.5.1 · .peakホスティング＆3Dスキン',
      'about.jumpReleases': '15個の.exeインストーラー＆更新履歴',
      'about.card1Title': 'Peak Cinema & Summit Glass デザイン',
      'about.card1Desc': '全画面の山岳パノラマ、深い黒のオブシディアン、1pxの細い境界線、すりガラスUIが雑多な枠を排除します。',
      'about.card2Title': 'Peak Shield 148K & HTTPS-First',
      'about.card2Desc': '[0]個のルールによるネットワーク＆装飾広告ブロック、YouTube広告除去、[1]強制、追跡パラメータ削除を搭載。',
      'about.card3Title': 'Hosting .peak & 3D WebGLスキン',
      'about.card3Desc': 'ネット経由で使える[0]ドメイン付きのローカルFabric/Vanillaサーバー、3Dスキンスタジオ、JavaとModの自動導入に対応。',
      'about.card4Title': '100%オープンソース＆テレメトリゼロ',
      'about.card4Desc': 'アカウント強制や情報収集は一切なし。[0]と[1]の全リリースは[2]で公開され、NSIS（[3]）とPortable版を提供します。',
      'projects.kicker': 'プロジェクト · 主力アプリケーション',
      'projects.title': 'Windows向けの2つの主力アプリ',
      'projects.lead': 'ライブプレビューの切り替え、Lightboxでの全画面拡大、最新リリースの直接ダウンロードが可能です。',
      'browser.num': 'PROJECT 01',
      'browser.cat': 'Webブラウザ',
      'browser.summary': 'Blue Mountainテーマを採用した高速でクリーンなWindowsブラウザ。[0]ルールの本格的[1]広告ブロッカー、[2]保護、刷新された全画面設定を備えています。',
      'browser.galleryCaption': 'Peak Browser プレビュー',
      'browser.themesAria': 'Peak Browser テーマ',
      'browser.tabDark': 'ダーク（標準）',
      'browser.tabSettings': '設定＆保護',
      'browser.tabLight': 'ライト',
      'browser.zoomAria': 'Peak Browser スクリーンショットを拡大',
      'browser.f1Title': 'Peak Shield · 148,604ルール',
      'browser.f1Desc': '@ghostery/adblocker（EasyList/EasyPrivacy/uBlock対応）とYouTube広告除去。',
      'browser.f2Title': 'HTTPS-First＆プライバシー',
      'browser.f2Desc': 'HTTPS自動アップグレード、URL追跡除去（utm/fbclid）、Sec-GPC・DNT送信。',
      'browser.f3Title': '刷新された peak://settings',
      'browser.f3Desc': '検索機能付き2カラム設定、例外リスト、ブロック済みドメイン詳細パネル。',
      'browser.f4Title': 'コンパクトな78pxバー＆タブ',
      'browser.f4Desc': '一体型アクティブタブ、ドラッグ＆ドロップ並び替え、URLワンクリックコピー。',
      'browser.f5Title': '3種類のBlue Mountainテーマ',
      'browser.f5Desc': 'ダーク・ブルー・ライトを全画面と[0]に適用、起動時に[1]を開きます。',
      'browser.f6Title': 'アカウント不要 · 100%ローカル',
      'browser.f6Desc': 'テレメトリなし、検索エンジン選択、履歴・Cookie・キャッシュの個別消去。',
      'browser.dlBtn': 'Peak Browserをダウンロード',
      'browser.dlMoreTitle': 'Peak Browserのその他のダウンロード',
      'browser.siteBtn': '製品サイト',
      'launcher.num': 'PROJECT 02',
      'launcher.cat': 'Minecraftランチャー',
      'launcher.summary': '[0] UIを採用したシネマティックMinecraftランチャー。ネット越しの[1]サーバーホスティング、[2]、[3] Mod＆シェーダー、Java/Fabric自動導入を搭載。',
      'launcher.galleryCaption': 'Peak Launcher プレビュー',
      'launcher.viewsAria': 'Peak Launcher 表示切り替え',
      'launcher.tabDark': 'ナイトサミット',
      'launcher.tabHosting': 'Hosting .peak',
      'launcher.tabSkins': '3Dスキン',
      'launcher.tabMods': 'Mod＆シェーダー',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.tabLight': 'グレイシャルデイ',
      'launcher.zoomAria': 'Peak Launcher スクリーンショットを拡大',
      'launcher.f1Title': 'Hosting .peak＆公開トンネル',
      'launcher.f1Desc': '[0]ドメイン付きローカルFabric/Vanillaサーバー、Java DNS SPI＆公開トンネル。',
      'launcher.f2Title': '3Dスキンスタジオ (WebGL)',
      'launcher.f2Desc': '対話型3D表示、.png追加、ID検索、Yggdrasil経由のゲーム内スキン反映に対応。',
      'launcher.f3Title': 'Peak Cinema＆マルチアカウント',
      'launcher.f3Desc': '全画面山岳GUI、上部アカウント切替、6言語対応＆2カラムPro設定。',
      'launcher.f4Title': 'Modrinth Pro: Mod＆シェーダー',
      'launcher.f4Desc': 'Mod・シェーダー・リソースパック、1クリック更新＆3種のスターターパック。',
      'launcher.f5Title': '925+バージョン · Auto-Java/Fabric',
      'launcher.f5Desc': 'Alpha〜26.3の公式Mojang版、Eclipse Temurin Java 8/17/21/25＆Fabric対応。',
      'launcher.f6Title': '独立プロファイル＆.peak招待',
      'launcher.f6Desc': '個別の[0]、[1]、ワールド保存とMod同梱の共有可能[2]招待ファイル。',
      'launcher.dlBtn': 'Peak Launcherをダウンロード',
      'launcher.dlMoreTitle': 'Peak Launcherのその他のダウンロード',
      'common.enlarge': '拡大',
      'common.enlargeTitle': 'Lightboxで拡大',
      'dl.setupTitle': 'Windows インストーラー (.exe)',
      'dl.setupSubBrowser': '推奨 · ショートカット作成と完全インストール',
      'dl.setupSubLauncher': '推奨 · デスクトップとスタートメニューにショートカット作成',
      'dl.portableTitle': 'ポータブル版 (.exe)',
      'dl.portableSub': 'インストール不要 · 起動してすぐ使えます',
      'dl.allReleases': 'GitHubの全リリース',
      'eco.kicker': 'アーキテクチャと基準 · PEAK LABS エコシステム',
      'eco.title': '共通の技術基盤',
      'eco.lead': '両アプリは同じエンジニアリング基準、ゼロテレメトリ設計、Peak Cinemaの美学を共有しています。',
      'eco.colParam': 'エコシステム項目',
      'eco.row1Key': '対応OS',
      'eco.row2Key': '配布形式',
      'eco.row2Val': 'NSIS インストーラー + Portable (.exe)',
      'eco.row3Key': 'ビジュアル＆UI',
      'eco.row3Browser': 'Blue Mountain · peak://settings',
      'eco.row3Launcher': 'Peak Cinema · 6言語対応',
      'eco.row4Key': '主要機能',
      'eco.row4Browser': 'Peak Shield 148K & HTTPS-First',
      'eco.row4Launcher': 'Hosting .peak、3Dスキン & Modrinth Pro',
      'eco.row5Key': 'アップデート経路',
      'eco.row6Key': '価格・テレメトリ',
      'eco.row6Val': '無料 · テレメトリ 0',
      'eco.labBadge': 'PEAK LABS ラボ · ロードマップ',
      'eco.labTitle': '2026年以降の継続的な進化',
      'eco.labLead': '[0]は主力2製品の毎週のアップグレードとともに、新しい軽量Windowsユーティリティを開発しています。',
      'eco.road1Desc': 'より高速なフィルター更新、詳細なPeak Shield分析、タブ操作の洗練。',
      'eco.road2Desc': 'グローバルな.peakサーバー探索、マルチプレイ診断、WebGLスキン機能強化。',
      'eco.road3Title': '今後のPEAK LABSツール',
      'eco.road3Desc': '[0]で公開される軽量なPeak Cinemaデスクトップユーティリティ。',
      'releases.kicker': 'ダウンロードセンター · GITHUB RELEASES',
      'releases.title': 'リリース＆変更履歴',
      'releases.lead': '[1]全バージョンの直接[0]インストーラーとポータブル版をダウンロードできます。',
      'releases.filterAria': '製品別にリリースを絞り込む',
      'releases.filterAll': 'すべて',
      'releases.loading': 'リリースを読み込み中…',
      'releases.synced': 'GitHub Releasesと同期済み',
      'releases.catalog': '現在のPEAK LABS リリースカタログ',
      'releases.empty': '選択したフィルターに一致するリリースはありません。',
      'releases.latestBadge': '最新',
      'releases.dlSetup': 'インストーラー (.exe)',
      'releases.dlPortable': 'Portable版 (.exe)',
      'releases.viewGithub': 'GitHubで見る ↗',
      'releases.showAll': '全 {n} 件のリリースを表示',
      'releases.showFewer': '最新4件のみ表示',
      'creator.kicker': 'PEAK LABS 創設者・制作者',
      'creator.role1': '創設者 · PEAK LABS',
      'creator.role2': 'デスクトップ＆Web開発者',
      'creator.role3': 'UI/UXデザイナー',
      'creator.bio': '自己ホスト型[2]サーバー・Java DNS SPIルーティング・3D WebGLスキンスタジオを備えた[1]エンジンから、148,604ルールの[4]を搭載した[3]、そして統一された[5]ビジュアルシステムまで、[0]エコシステム全体をゼロから設計・開発しています。',
      'creator.githubBtn': 'GitHubプロフィール (latajoncy82-svg)',
      'creator.repoBtn': 'PEAK LABS リポジトリ',
      'footer.about': 'Peak Cinema & Summit Glassの美学で、高速かつクリーンなWindows 10/11アプリを開発する独立系ソフトウェアスタジオ。',
      'footer.navTitle': 'ナビゲーション',
      'footer.productsTitle': '製品',
      'footer.launcherSite': 'Peak Launcher 公式サイト ↗',
      'footer.githubProfile': 'latajoncy82-svg プロフィール ↗',
      'footer.repoLabs': 'PEAK LABS リポジトリ ↗',
      'footer.repoBrowser': 'Peak Browser リポジトリ ↗',
      'footer.repoLauncher': 'Peak Launcher リポジトリ ↗',
      'footer.copyright': '© 2026 PEAK LABS · 制作者: [0]',
      'footer.themeCredit': 'Peak Cinema & Summit Glass 美学',
      'lightbox.defaultCaption': '画面プレビュー',
      'lightbox.prevAria': '前のスクリーンショット',
      'lightbox.nextAria': '次のスクリーンショット',
      'lightbox.closeAria': 'プレビューを閉じる',
      'stage.launcherCinemaSummary': '.peakサーバーホスティング＆3Dスキンスタジオ搭載のシネマティックMinecraftランチャー。',
      'stage.launcherCinemaTag1': 'Peak Cinema',
      'stage.launcherCinemaTag2': '925+バージョン',
      'stage.launcherCinemaTag3': 'Auto-Java & Fabric',
      'stage.hostingSummary': 'ネット経由で使える<address>.peakドメイン付きFabric＆Vanillaサーバーを簡単起動。',
      'stage.hostingTag1': 'Hosting .peak',
      'stage.hostingTag2': 'Java DNS SPI',
      'stage.hostingTag3': '公開トンネル',
      'stage.skinsSummary': 'ゲーム内Yggdrasil反映に対応した対話型3D WebGLスキンエディタ。',
      'stage.skinsTag1': '3D WebGL',
      'stage.skinsTag2': '4種のPeakプリセット',
      'stage.skinsTag3': 'authlib-injector',
      'stage.browserDarkSummary': '起動時にPEAK LABSを開く、Blue MountainテーマのクリーンなWindowsブラウザ。',
      'stage.browserDarkTag1': '78pxバー',
      'stage.browserDarkTag2': 'ドラッグ＆ドロップタブ',
      'stage.browserDarkTag3': 'テレメトリゼロ',
      'stage.browserSettingsSummary': '148,604ルールのPeak Shield広告ブロック、HTTPS-First＆2カラム設定。',
      'stage.browserSettingsTag1': 'Peak Shield 148K',
      'stage.browserSettingsTag2': 'HTTPS-First',
      'stage.browserSettingsTag3': 'YouTube広告除去',
      'stage.previewAltPrefix': 'プレビュー:',
      'shot.browserDark': 'Peak Browser — ダークテーマ（標準）',
      'shot.browserSettings': 'Peak Browser — 設定＆Peak Shield（148,604ルール）',
      'shot.browserLight': 'Peak Browser — ライトテーマ',
      'shot.launcherDark': 'Peak Launcher — ナイトサミット (Peak Cinema)',
      'shot.launcherHosting': 'Peak Launcher — Hosting .peak サーバー',
      'shot.launcherSkins': 'Peak Launcher — 3Dスキンスタジオ (WebGL)',
      'shot.launcherMods': 'Peak Launcher — Modrinth Pro: Mod＆シェーダー',
      'shot.launcherJava': 'Peak Launcher — Java＆Fabricセンター',
      'shot.launcherLight': 'Peak Launcher — グレイシャルデイ (Peak Cinema)'
    }
  };

  const RELEASE_I18N = {
    en: {
      'browser:v1.2.1': {
        name: 'Peak Browser 1.2.1 — Studio Homepage on Launch',
        body: '### What\'s new in v1.2.1\n- **Company homepage as initial startup tab**: launching the browser now opens `https://peaklabstudio.vercel.app/#o-firmie` in the first tab.\n- **New tabs unchanged**: pressing `Ctrl+T` or clicking `+` continues to open the clean alpine New Tab page (`peak://newtab`).'
      },
      'browser:v1.2.0': {
        name: 'Peak Browser 1.2.0 — Full Adblocker, HTTPS-First & Redesigned Settings',
        body: '### What\'s new in v1.2.0\n- **Full Peak Shield Adblock Engine (`148,604` rules)**: built-in `@ghostery/adblocker` powered by EasyList, EasyPrivacy, Peter Lowe, uBlock Origin Filters & Privacy, and Polish Ad Filters (`MajkiIT`) with 1-click filter list updates.\n- **Cosmetic filtering & YouTube protection**: automatically hides empty ad containers, blocks trackers and cryptominers in Aggressive mode, and strips ad banners and overlays on YouTube.\n- **Hardened privacy**: enforces `HTTPS-First` encrypted connections with safe fallback on certificate errors, strips tracking URL parameters (`utm_*`, `fbclid`, `gclid`, `msclkid`), sends `Sec-GPC` and `DNT` headers, removes `X-Client-Data`, trims cross-site `Referer`, and blocks intrusive push, USB, MIDI, and HID prompts.\n- **Redesigned full-page Settings (`peak://settings`) & Shield panel**: two-column workspace with search, live theme previews, site allowlist, blocked domain inspector, and granular clearing of history, cookies, and cache.'
      },
      'browser:v1.1.0': {
        name: 'Peak Browser 1.1.0 — Default Dark Interface & Redesigned Tab Bar',
        body: '### What\'s new in v1.1.0\n- **Default Blue Mountain Dark Theme (`Dark`)**: deep alpine navy across the entire window interface, the New Tab page (`peak://newtab`), suggestions popup, and error screen.\n- **Refined connected tabs & reordering**: seamless sculpted connection between the active tab and toolbar, compact top bar (`78 px`), and smooth mouse drag & drop tab reordering.\n- **Cleaner address bar**: highlighted domain name with muted protocol and path, plus a quick copy URL button on hover.\n- **Refreshed New Tab & sidebar**: single-row balanced shortcut grid, frosted glass cards over the night alpine backdrop, slim scrollbars, and quick opening of bookmarks and history in a new tab.'
      },
      'browser:v1.0.1': {
        name: 'Peak Browser 1.0.1 — Windows Taskbar Pinning Fix',
        body: '### What\'s new in v1.0.1\n- **Windows taskbar pinning fix**: added explicit application metadata (`setAppDetails` / `AppUserModelID`, `relaunchCommand`, `appIconPath`, `relaunchDisplayName`), ensuring pinning **Peak Browser** to the taskbar preserves the Blue Mountain logo and app name instead of reverting to the default Electron icon.\n- **Direct launch**: the launcher shortcut and `start-peak.bat` now run the compiled `Peak Browser.exe` binary directly.'
      },
      'browser:v1.0.0': {
        name: 'Peak Browser 1.0.0 — Initial Release',
        body: '### What\'s new in v1.0.0\n- **Initial Peak Browser release** for Windows 10 and Windows 11 (x64) with dedicated installer, icon, and Blue Mountain theme.\n- **Architectural UI**: compact tab bar (`38 px`) joined with the active tab and toolbar (`42 px`) with clean address bar.\n- **Three color themes**: **Light**, **Blue**, and **Dark** paired with minimalist alpine wallpapers on the New Tab page (`peak://newtab`).\n- **Peak Shield**: built-in ad and tracker blocking with a toolbar blocked request counter.\n- **Flat sidebar (`320 px`)**: bookmarks, browsing history, download manager, search engine settings (Google, DuckDuckGo, Bing, Brave Search), and browsing data cleaner.\n- **Full keyboard shortcut support**: `Ctrl+T`, `Ctrl+W`, `Ctrl+Shift+T`, `Ctrl+L`, `Ctrl+F`, `Ctrl+D`, `Ctrl+H`, `Ctrl+J`, `Ctrl+Shift+B`, `F11`, `F12`.'
      },
      'launcher:v1.5.1': {
        name: 'Peak Launcher 1.5.1 — True <address>.peak Domain Locally & Over the Internet',
        body: '### Highlights in v1.5.1\n- **Global Public Tunnel with `<address>.peak`**: enabling the tunnel in `Server .peak` registers your branded domain (e.g. `szczyt.peak`) in the global `.peak` directory, allowing friends in Peak Launcher to join using clean `<address>.peak` addresses (with an optional Pinggy TCP address for vanilla clients).\n- **Live `<address>.peak` domains directly inside Minecraft**: built-in Java DNS SPI resolver (`peak-dns.jar` for Java 18+, MC 1.18–26.x) resolves `*.peak` in Multiplayer, Direct Connection, and `--quickPlayMultiplayer` while keeping full compatibility with Yggdrasil skins (`authlib-injector`) and Mojang/Modrinth queries.\n- **Built-in `.peak` Handshake Router (`0.0.0.0:25565`) & Domain Registry**: TCP router forwards Minecraft Handshake packets to local servers, friends\' global tunnels, and custom `.peak` entries — showing a clean offline status on the server list when stopped.'
      },
      'launcher:v1.5.0': {
        name: 'Peak Launcher 1.5.0 — Self-Hosted .peak Servers & Server Mods',
        body: '### Highlights in v1.5.0\n- **Self-Hosted `.peak` Server (`Server .peak`)**: run local **Fabric** and **Vanilla** Minecraft servers on your PC with a branded `<name>.peak` domain, automatic server JAR downloads, live console, `server.properties` editor, and EULA acceptance.\n- **1-Click Server Mods & Profile Sync**: Modrinth catalog filtered to server-compatible mods (`server_side: required/optional`), preset server packs (`Lithium`, `FerriteCore`, `Krypton`, `spark`, `Chunky`, `Simple Voice Chat`), `.jar` Drag & Drop, and mod syncing between profile and server.\n- **Public Tunnel & `.peak` Invites**: optional free TCP tunnel without router port forwarding, one-click saving to `servers.dat`, **Join Game** button, and `.peak` invite file export/import.'
      },
      'launcher:v1.4.1': {
        name: 'Peak Launcher 1.4.1 — Refined Top Bar & 3D Skin Studio',
        body: '### Highlights in v1.4.1\n- **Fixed theme toggle & upgraded top bar**: fixed CSS styling on the dark/light toggle button, added a custom **6-language** selector dropdown with globe icon, and unified toolbar geometry with crisp pixel-art skin avatar.\n- **Custom vector dropdowns**: replaced native OS select arrows with cohesive vector chevrons for dark and light themes.\n- **Includes all v1.4.0 features**: interactive **3D Skin Studio (WebGL)**, `.png` uploads, lookup by nickname, **4 Peak presets**, and in-game skin rendering via `authlib-injector v1.2.8`.'
      },
      'launcher:v1.4.0': {
        name: 'Peak Launcher 1.4.0 — 3D Skin Studio & In-Game Skins',
        body: '### Highlights in v1.4.0\n- **3D Skin Studio (WebGL)**: interactive 3D character viewer with orbit controls, walk animation, second-layer toggle, `.png` Drag & Drop upload, Minecraft username fetch, **4 Peak Presets (Offline)**, and personal skin library.\n- **Classic / Slim model & avatars**: choose `4px / 3px` arms and automatically display your custom skin head in account avatars.\n- **Visible in-game (`authlib-injector 1.2.8` + local Yggdrasil)**: your selected skin renders directly inside both Vanilla and Fabric Minecraft.'
      },
      'launcher:v1.3.2': {
        name: 'Peak Launcher 1.3.2 — Pro Options & Console Workspace',
        body: '### Highlights in v1.3.2\n- **New 2-column Options & Console workspace**: category sidebar (`Appearance & Language`, `Performance & Game`, `Automation & Data`, `Player Accounts`, `Game Console`), theme preview cards, and **6-language** selector tiles.\n- **Toggle switches, RAM / resolution / JVM presets & auto-save**: smooth controls, quick presets (`2–16 GB`, `720p–1440p`, `G1GC`, `Aikar\'s Flags`, `ZGC`), diagnostics panel, and filterable log console.'
      },
      'launcher:v1.3.1': {
        name: 'Peak Launcher 1.3.1 — Multi-Account Support',
        body: '### Highlights in v1.3.1\n- **Quick multi-account switcher in the top bar**: clean account dropdown with skin avatars and 1-click switching without leaving the main screen.\n- **Account Manager (`Add`, `Edit`, `Use`, `Delete`)**: new modal with live skin preview, duplicate protection, and full support for **6 languages**.'
      },
      'launcher:v1.3.0': {
        name: 'Peak Launcher 1.3.0 — Taskbar Icon, Modrinth Pro & 6 Languages',
        body: '### Highlights in v1.3.0\n- **Fixed Windows taskbar application icon**: corrected window and taskbar icon binding (`asarUnpack` + `appIconIndex: 0`) and desktop shortcut.\n- **Expanded Modrinth Mod & Addon Database**: **Mods**, **Shaders**, **Resource Packs**, and **Installed** tabs, sorting & pagination, version picker modal, **1-click mod updates**, **3 curated packs** (`Peak FPS Boost`, `Peak Shaders`, `Peak Survival+ QoL`), and atomic duplicate-free metadata.\n- **6-language UI**: `Polski`, `English`, `Deutsch`, `Español`, `Français`, and `Українська` across both the launcher and download site.'
      },
      'launcher:v1.2.0': {
        name: 'Peak Launcher 1.2.0 — Peak Cinema GUI',
        body: '### Highlights in v1.2.0\n- **Cinematic, cleaner interface (`Peak Cinema`)**: removed cluttered sidebars and boxes on the home screen — the PEAK Mountain panorama fills the entire window while views open as frosted depth-of-field overlays.\n- **Minimalist top bar**: fast switching between `Play`, `Mods`, `Versions`, `Java & Fabric`, and `Options`, alongside player avatar and theme toggle.\n- **Full automation preserved**: all 925+ Minecraft versions, Modrinth + `.jar` Drag & Drop, automatic Java `8 / 17 / 21 / 25`, and 1-click Fabric Loader.'
      },
      'launcher:v1.1.0': {
        name: 'Peak Launcher 1.1.0 — Alpine Aurora & Summit Glass GUI',
        body: '### Highlights in v1.1.0\n- **Live PEAK Mountain Atmosphere (Alpine Aurora)**: flowing northern lights, starfield, and snowfall on a lightweight parallax canvas with cursor spotlight card glow (`spotlight`).\n- **New Summit Cockpit & Floating Dock**: topographic contour lines, mountain peak panorama window, mod preview bar with **FPS Boost (1 click)**, 5-stage launch indicator, and player head avatar.'
      },
      'launcher:v1.0.0': {
        name: 'Peak Launcher 1.0.0 — First Mountain Summit Release',
        body: '### Key Features in v1.0.0\n- **PEAK Mountain Theme (Night Summit & Glacial Day)**: cohesive alpine interface with mountain panoramas and layered ridge silhouettes.\n- **All Minecraft Versions**: complete Mojang catalog (`925+` releases from Alpha and Beta to `26.3` and the latest snapshots) with isolated profiles.\n- **Easy Mod Management**: built-in Modrinth catalog with automatic dependency resolution (`Fabric API`), one-click **Peak FPS Boost Pack**, and convenient `.jar` **Drag & Drop**.\n- **Automatic Java (8 / 17 / 21 / 25) & Fabric Loader Installer**: automatically detects the required Java runtime for your Minecraft version and downloads official Eclipse Temurin and Fabric packages.'
      }
    },
    pl: {
      'browser:v1.2.1': {
        name: 'Peak Browser 1.2.1 — Strona firmowa na start',
        body: '### Co się zmieniło w wersji 1.2.1\n\n- **Strona firmowa jako pierwsza karta startowa**: po uruchomieniu przeglądarki pierwsza karta automatycznie otwiera stronę firmową `https://peaklabstudio.vercel.app/#o-firmie`.\n- **Nowe karty bez zmian**: skrót `Ctrl+T` oraz przycisk `+` nadal otwierają czystą alpejską stronę nowej karty (`peak://newtab`).'
      },
      'browser:v1.2.0': {
        name: 'Peak Browser 1.2.0 — Pełny Adblock, HTTPS-First i nowe Ustawienia',
        body: '### Co się zmieniło w wersji 1.2.0\n\n- **Pełny silnik blokowania reklam Peak Shield (`148 604` reguły)**: wbudowany silnik `@ghostery/adblocker` oparty na listach EasyList, EasyPrivacy, Peter Lowe, uBlock Origin Filters & Privacy oraz Polskich filtrach reklamowych (`MajkiIT`) wraz z możliwością aktualizacji list jednym kliknięciem.\n- **Filtrowanie kosmetyczne i ochrona YouTube**: automatyczne ukrywanie pustych ramek po reklamach, blokowanie trackerów i skryptów koparek w trybie agresywnym oraz usuwanie banerów i nakładek reklamowych na YouTube.\n- **Wzmocniona ochrona prywatności**: wymuszanie szyfrowanych połączeń `HTTPS-First` z bezpiecznym powrotem przy błędzie certyfikatu, czyszczenie parametrów śledzących URL (`utm_*`, `fbclid`, `gclid`, `msclkid`), wysyłanie nagłówków `Sec-GPC` i `DNT`, usuwanie `X-Client-Data`, skracanie `Referer` między witrynami oraz automatyczne blokowanie natrętnych powiadomień push, USB, MIDI i HID.\n- **Przeprojektowane pełnoekranowe Ustawienia (`peak://settings`) i panel Ochrony**: dwukolumnowy układ z wyszukiwarką opcji, podglądem motywów na żywo, listą wyjątków dla witryn, podglądem zablokowanych domen w panelu `Ochrona` oraz granulowanym czyszczeniem historii, cookies i pamięci podręcznej.'
      },
      'browser:v1.1.0': {
        name: 'Peak Browser 1.1.0 — Domyślny ciemny interfejs i nowy pasek kart',
        body: '### Co się zmieniło w wersji 1.1.0\n- **Domyślny ciemny motyw Niebieskiej Góry (`Ciemny`)**: głęboki alpejski granat w całym interfejsie okna, na stronie nowej karty (`peak://newtab`), w oknie podpowiedzi oraz na ekranie błędu.\n- **Dopracowane połączone karty i zmiana kolejności**: płynne wyprofilowane łączenie aktywnej karty z paskiem narzędzi, zwarty górny pasek (`78 px`) oraz przeciąganie kart myszką (`drag & drop`).\n- **Czytelniejszy pasek adresu**: wyróżniona nazwa domeny przy wyciszonym protokole i ścieżce oraz szybki przycisk kopiowania adresu URL po najechaniu myszką.\n- **Odświeżona Nowa Karta i panel boczny**: równomierny rząd skrótów w jednym wierszu, satynowe oszklone karty na nocnej panoramie, smukłe paski przewijania oraz szybkie otwieranie zakładek i historii w nowej karcie.'
      },
      'browser:v1.0.1': {
        name: 'Peak Browser 1.0.1 — Poprawka paska zadań',
        body: '### Co się zmieniło w wersji 1.0.1\n- **Poprawka przypinania do paska zadań Windows**: dodano jawne metadane aplikacji (`setAppDetails` / `AppUserModelID`, `relaunchCommand`, `appIconPath`, `relaunchDisplayName`), dzięki czemu przypięcie **Peak Browser** do paska zadań zachowuje logo Niebieskiej Góry oraz nazwę aplikacji zamiast przełączać się na domyślną ikonę Electrona.\n- **Bezpośrednie uruchamianie**: skrót uruchamiający oraz `start-peak.bat` uruchamiają bezpośrednio skompilowany plik `Peak Browser.exe`.'
      },
      'browser:v1.0.0': {
        name: 'Peak Browser 1.0.0 — Pierwsze wydanie',
        body: '### Co się zmieniło w wersji 1.0.0\n\n- **Pierwsze wydanie Peak Browser** na Windows 10 i Windows 11 (x64) z dedykowaną ikoną i motywem Niebieskiej Góry.\n- **Architektoniczny interfejs**: zwarty pasek kart (`38 px`) połączony z aktywną kartą oraz pasek narzędzi (`42 px`) z czytelnym paskiem adresu.\n- **Trzy motywy kolorystyczne**: **Jasny**, **Niebieski** oraz **Ciemny** wraz z minimalistycznymi tapetami alpejskimi na stronie nowej karty (`peak://newtab`).\n- **Peak Shield**: wbudowane blokowanie popularnych domen reklamowych i trackerów z licznikiem zablokowanych żądań na pasku.\n- **Panel boczny (`320 px`)**: zakładki, historia przeglądania, menedżer pobrań oraz ustawienia wyszukiwarki (Google, DuckDuckGo, Bing, Brave Search) i czyszczenie danych przeglądania.\n- **Pełna obsługa skrótów klawiszowych**: `Ctrl+T`, `Ctrl+W`, `Ctrl+Shift+T`, `Ctrl+L`, `Ctrl+F`, `Ctrl+D`, `Ctrl+H`, `Ctrl+J`, `Ctrl+Shift+B`, `F11`, `F12`.'
      },
      'launcher:v1.5.1': {
        name: 'Peak Launcher 1.5.1 — Prawdziwa Domena <adres>.peak Lokalnie i Przez Internet',
        body: '### Najważniejsze nowości w wersji 1.5.1\n- **Globalny Tunel Publiczny `.peak`**: karta **Tunel publiczny (Internet)** pokazuje i kopiuje Twoją domenę `<adres>.peak` zamiast surowego hosta Pinggy, publikując trasę dla znajomych korzystających z Peak Launchera (oraz udostępniając zapasowy adres TCP dla zwykłych klientów).\n- **Prawdziwa domena `<adres>.peak` bezpośrednio w grze**: wbudowany provider Java DNS SPI (`peak-dns.jar` dla Java 18+) rozwiązuje `szczyt.peak` i wszystkie domeny `*.peak` w trybie Multiplayer i Quick Play, zachowując pełną kompatybilność ze skinami Yggdrasil i zapytaniami Mojang/Modrinth.\n- **Wbudowany Router Handshake `.peak` (`0.0.0.0:25565`) i Rejestr domen**: router TCP kieruje ruch z pakietu Handshake Minecrafta do lokalnych serwerów, aktywnych globalnych domen znajomych oraz własnych wpisów w `Udostępnianie .peak`.'
      },
      'launcher:v1.5.0': {
        name: 'Peak Launcher 1.5.0 — Własny Hosting .peak i Mody Serwerowe',
        body: '### Najważniejsze nowości w wersji 1.5.0\n- **Własny Hosting `.peak` na komputerze (`Serwer .peak`)**: uruchamiaj lokalne serwery Minecraft **Fabric** i **Vanilla** z markowym adresem `<nazwa>.peak`, automatycznym pobieraniem JAR serwera, konsolą na żywo, edytorem `server.properties` i akceptacją EULA.\n- **Mody serwerowe 1 kliknięciem & synchronizacja**: katalog Modrinth odfiltrowany do modów serwerowych (`server_side: required/optional`), paczki serwerowe (`Lithium`, `FerriteCore`, `Krypton`, `spark`, `Chunky`, `Simple Voice Chat`), Drag & Drop `.jar` oraz kopiowanie modów między profilem a serwerem.\n- **Tunel publiczny i zaproszenia `.peak`**: opcjonalny darmowy tunel TCP bez przekierowania portów routera, zapis do `servers.dat`, przycisk **Dołącz do gry** i eksport/import plików `.peak`.'
      },
      'launcher:v1.4.1': {
        name: 'Peak Launcher 1.4.1 — Dopracowany Pasek Górny i Studio Skinów 3D',
        body: '### Najważniejsze nowości w wersji 1.4.1\n- **Naprawiony przycisk motywu i nowy pasek górny**: usunięto błąd składni CSS na przycisku trybu nocnego/dziennego, dodano niestandardowe menu wyboru **6 języków** z ikoną globusa oraz spójny układ paska narzędziowego z ostrym pikselowym awatarem skina.\n- **Wektorowe selektory w całej aplikacji**: usunięto surowe systemowe strzałki z list rozwijanych na rzecz czystych chevronów dla trybu ciemnego i jasnego.\n- **Zawiera wszystkie nowości 1.4.0**: interaktywne **Studio Skinów 3D (WebGL)**, wgrywanie `.png`, pobieranie po nicku, **4 presety Peak** oraz wyświetlanie skina w grze przez `authlib-injector v1.2.8`.'
      },
      'launcher:v1.4.0': {
        name: 'Peak Launcher 1.4.0 — Studio Skinów 3D i Skiny w Grze',
        body: '### Najważniejsze nowości w wersji 1.4.0\n- **Studio Skinów 3D (WebGL)**: interaktywny podgląd postaci w 3D z obrotem, animacją chodu i przełącznikiem 2. warstwy oraz wgrywaniem `.png` (Drag & Drop), pobieraniem po nicku Minecraft, **4 presetami Peak (Offline)** i biblioteką skinów.\n- **Model Classic / Slim i awatary**: wybór sylwetki `4px / 3px` i automatyczne wyświetlanie głowy własnego skina w awatarach kont.\n- **Widoczne w grze (`authlib-injector 1.2.8` + lokalny Yggdrasil)**: wybrany skin działa bezpośrednio w Minecraft Vanilla i Fabric.'
      },
      'launcher:v1.3.2': {
        name: 'Peak Launcher 1.3.2 — Profesjonalne Menu Opcji i Konsoli',
        body: '### Najważniejsze nowości w wersji 1.3.2\n- **Nowy 2-kolumnowy workspace Opcji i Konsoli**: boczna nawigacja kategorii (`Wygląd i Język`, `Wydajność i Gra`, `Automatyzacja i Dane`, `Konta graczy`, `Konsola gry`), karty podglądu motywów oraz kafelki **6 języków**.\n- **Przełączniki toggle, presety RAM / rozdzielczości / JVM i autowzapis**: płynne suwaki i przełączniki, szybkie presety (`2–16 GB`, `720p–1440p`, `G1GC`, `Aikar\'s Flags`, `ZGC`), panel diagnostyki oraz filtrowana konsola logów.'
      },
      'launcher:v1.3.1': {
        name: 'Peak Launcher 1.3.1 — Obsługa wielu kont',
        body: '### Najważniejsze nowości w wersji 1.3.1\n- **Szybki przełącznik wielu kont na górnym pasku**: wygodne menu z listą kont, avatarami skina i przełączaniem 1 kliknięciem bez wychodzenia do opcji.\n- **Menedżer kont (`Dodaj`, `Edytuj`, `Użyj`, `Usuń`)**: nowe okno zarządzania kontami z podglądem skina na żywo, ochroną przed duplikatami i pełną obsługą **6 języków**.'
      },
      'launcher:v1.3.0': {
        name: 'Peak Launcher 1.3.0 — Ikona, Baza Modów Pro & 6 Języków',
        body: '### Najważniejsze nowości w wersji 1.3.0\n- **Naprawiona ikona aplikacji na pasku zadań Windows**: poprawione powiązanie ikony okna i paska zadań (`asarUnpack` + `appIconIndex: 0`) oraz zaktualizowany skrót na pulpicie.\n- **Rozbudowana baza modów i dodatków Modrinth**: zakładki **Mody**, **Shadery**, **Paczki zasobów** i **Zainstalowane**, sortowanie i stronicowanie wyników, okno szczegółów z wyborem wersji, **1-klik aktualizacja modów**, **3 gotowe pakiety** (`Peak FPS Boost`, `Peak Shadery`, `Peak Survival+ QoL`) oraz atomowe metadane bez duplikatów.\n- **Obsługa 6 języków**: `Polski`, `English`, `Deutsch`, `Español`, `Français` oraz `Українська` w launcherze i na stronie pobierania.'
      },
      'launcher:v1.2.0': {
        name: 'Peak Launcher 1.2.0 — Peak Cinema GUI',
        body: '### Najważniejsze nowości w wersji 1.2.0\n- **Kinowy, prostszy interfejs (`Peak Cinema`)**: usunięto boczną belkę i zbędne ramki na ekranie głównym — panorama Góry PEAK zajmuje cały ekran, a pozostałe widoki otwierają się jako przejrzyste szklane nakładki z efektem głębi ostrości.\n- **Minimalistyczny górny pasek**: szybkie przełączanie widoków `Graj`, `Mody`, `Wersje`, `Java i Fabric` i `Opcje`, z avatarem gracza i przełącznikiem motywu.\n- **Pełna automatyzacja bez zmian**: wszystkie 925+ wersji Minecrafta, Modrinth + Drag & Drop `.jar`, automatyczna Java `8 / 17 / 21 / 25` oraz Fabric Loader jednym kliknięciem.'
      },
      'launcher:v1.1.0': {
        name: 'Peak Launcher 1.1.0 — Alpine Aurora & Summit Glass GUI',
        body: '### Najważniejsze nowości w wersji 1.1.0\n- **Żywa atmosfera Góry PEAK (Alpine Aurora)**: płynąca zorza polarna, gwiazdozbiór i śnieg na lekkim płótnie z paralaksą oraz podświetlenie kart pod kursorem (`spotlight`).\n- **Nowy kokpit Szczytu i pływający dock**: kontury topograficzne, okno panoramy szczytu, pasek podglądu modów z przyciskiem **Boost FPS (1 klik)**, 5-etapowy wskaźnik startu oraz awatar głowy gracza.'
      },
      'launcher:v1.0.0': {
        name: 'Peak Launcher 1.0.0 — Pierwsze wydanie Szczytu Gór',
        body: '### Najważniejsze funkcje wydania 1.0.0\n- **Motyw Góry PEAK (Nocny Szczyt i Lodowcowy Dzień)**: spójny alpejski interfejs z panoramami szczytów i warstwami górskich grani.\n- **Wszystkie wersje Minecraft**: pełny katalog Mojang (`925+` wydań od Alphy i Bety po `26.3` oraz najnowsze snapshoty) wraz z izolowanymi profilami.\n- **Łatwe dodawanie modów**: wbudowany katalog Modrinth z automatycznym instalowaniem wymaganych zależności (`Fabric API`), **Pakiet Peak FPS Boost** jednym kliknięciem oraz wygodny **Drag & Drop** plików `.jar`.\n- **Automatyczna instalacja Javy (8 / 17 / 21 / 25) i Fabric Loadera**: launcher sam wykrywa brakującą wersję Javy dla wybranego Minecrafta i pobiera oficjalne pakiety Eclipse Temurin oraz Fabric.'
      }
    }
  };

  const ATTR_SPECS = [
    { selector: 'title', attr: null, key: 'meta.title' },
    { selector: 'meta[name="description"]', attr: 'content', key: 'meta.description' },
    { selector: 'meta[property="og:title"]', attr: 'content', key: 'meta.title' },
    { selector: 'meta[property="og:description"]', attr: 'content', key: 'meta.ogDescription' }
  ];

  const state = {
    preference: 'auto',
    detectedLang: 'en',
    activeLang: 'en',
    isAutoTranslated: false,
    isTranslating: false,
    autoDicts: new Map(),
    relCache: new Map(),
    onChangeCallback: null
  };

  function isLocalFileProtocol() {
    return window.location.protocol === 'file:';
  }

  function isStaticGithubPages() {
    return window.location.hostname.endsWith('.github.io');
  }

  function normalizeLangCode(raw) {
    if (!raw || typeof raw !== 'string') return 'en';
    const cleaned = raw.trim().replace(/_/g, '-');
    if (!cleaned || cleaned.toLowerCase() === 'auto') return 'auto';

    const lower = cleaned.toLowerCase();
    if (lower.startsWith('en')) return 'en';
    if (lower === 'zh-tw' || lower === 'zh-hk' || lower === 'zh-hant') return 'zh-TW';
    if (lower.startsWith('zh')) return 'zh-CN';
    if (lower === 'nb' || lower === 'nn') return 'no';
    if (lower === 'iw') return 'he';
    if (lower === 'in') return 'id';
    if (lower === 'ji') return 'yi';

    const base = lower.split('-')[0];
    return /^[a-z]{2,3}$/.test(base) ? base : 'en';
  }

  function detectBrowserLanguage() {
    const candidates = Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language || 'en'];
    for (const c of candidates) {
      const norm = normalizeLangCode(c);
      if (norm && norm !== 'auto') return norm;
    }
    return 'en';
  }

  function getQueryLang() {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('lang');
      if (!q) return null;
      return normalizeLangCode(q);
    } catch {
      return null;
    }
  }

  function loadStoredPreference() {
    try {
      const val = localStorage.getItem(STORAGE_LANG_KEY);
      if (!val || val === 'auto') return 'auto';
      return normalizeLangCode(val);
    } catch {
      return 'auto';
    }
  }

  function saveStoredPreference(pref) {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, pref);
    } catch {
      // Ignore storage errors
    }
  }

  function readCacheMap(prefix, lang) {
    try {
      const raw = localStorage.getItem(`${prefix}${lang}`);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  }

  function writeCacheMap(prefix, lang, obj) {
    try {
      localStorage.setItem(`${prefix}${lang}`, JSON.stringify(obj));
    } catch {
      // Ignore quota errors
    }
  }

  function getActiveLocaleDict() {
    if (LOCALES[state.activeLang]) {
      return LOCALES[state.activeLang];
    }
    const auto = state.autoDicts.get(state.activeLang);
    if (auto) return auto;
    const cached = readCacheMap(CACHE_PREFIX, state.activeLang);
    if (cached) {
      state.autoDicts.set(state.activeLang, cached);
      return cached;
    }
    return LOCALES.en;
  }

  function t(key) {
    const dict = getActiveLocaleDict();
    if (dict && typeof dict[key] === 'string') {
      return dict[key];
    }
    return LOCALES.en[key] || key;
  }

  function renderTokenizedElement(el, template, tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
      el.textContent = template;
      return;
    }

    const frag = document.createDocumentFragment();
    const regex = /\[(\d+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(template)) !== null) {
      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(template.slice(lastIndex, match.index)));
      }
      const idx = Number(match[1]);
      const def = tokens[idx];
      if (def) {
        const node = document.createElement(def.tag || 'span');
        if (def.notranslate) {
          node.className = 'notranslate';
          node.setAttribute('translate', 'no');
        }
        node.textContent = def.text;
        frag.appendChild(node);
      } else {
        frag.appendChild(document.createTextNode(match[0]));
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < template.length) {
      frag.appendChild(document.createTextNode(template.slice(lastIndex)));
    }

    el.replaceChildren(frag);
  }

  function applyDomTranslations() {
    const baseCode = state.activeLang.split('-')[0].toLowerCase();
    document.documentElement.lang = state.activeLang;
    document.documentElement.dir = RTL_LANGS.has(baseCode) ? 'rtl' : 'ltr';

    for (const spec of ATTR_SPECS) {
      const node = document.querySelector(spec.selector);
      if (!node) continue;
      const val = t(spec.key);
      if (spec.attr) {
        node.setAttribute(spec.attr, val);
      } else {
        document.title = val;
      }
    }

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (!key) return;
      const text = t(key);
      const tokens = TOKEN_DEFS[key];
      if (tokens) {
        renderTokenizedElement(el, text, tokens);
      } else {
        el.textContent = text;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.dataset.i18nAria;
      if (key) el.setAttribute('aria-label', t(key));
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.dataset.i18nTitle;
      if (key) el.setAttribute('title', t(key));
    });

    updateLanguageMenuUI();
  }

  function getLanguageShortLabel(code) {
    const all = [...INSTANT_LANGUAGES, ...AUTO_LANGUAGES];
    const hit = all.find((x) => x.code.toLowerCase() === code.toLowerCase());
    if (hit) return hit.short;
    return code.split('-')[0].toUpperCase().slice(0, 3);
  }

  function getLanguageDisplayName(code) {
    const all = [...INSTANT_LANGUAGES, ...AUTO_LANGUAGES];
    const hit = all.find((x) => x.code.toLowerCase() === code.toLowerCase());
    if (hit) return hit.label;
    try {
      if (typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function') {
        const dn = new Intl.DisplayNames([code, 'en'], { type: 'language' });
        return dn.of(code) || code.toUpperCase();
      }
    } catch {
      // Fallback
    }
    return code.toUpperCase();
  }

  function updateLanguageMenuUI() {
    const codeSpan = document.getElementById('lang-active-code');
    const toggleBtn = document.getElementById('lang-toggle-btn');
    const autoSub = document.getElementById('lang-auto-detected');
    const mobileSelect = document.getElementById('mobile-lang-select');

    if (codeSpan) {
      codeSpan.textContent = getLanguageShortLabel(state.activeLang);
    }
    if (toggleBtn) {
      toggleBtn.classList.toggle('is-translating', state.isTranslating);
      toggleBtn.title = state.isTranslating
        ? t('lang.translating')
        : `${t('lang.aria')}: ${getLanguageDisplayName(state.activeLang)}`;
    }
    if (autoSub) {
      autoSub.textContent = getLanguageShortLabel(state.detectedLang);
    }

    document.querySelectorAll('.lang-option').forEach((btn) => {
      const optLang = btn.dataset.lang;
      const isSelected = optLang === state.preference;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-checked', String(isSelected));
    });

    if (mobileSelect) {
      ensureMobileSelectOption(mobileSelect, state.preference);
      mobileSelect.value = state.preference;
    }
  }

  function ensureMobileSelectOption(selectEl, code) {
    if (!code) return;
    const exists = Array.from(selectEl.options).some((opt) => opt.value === code);
    if (!exists) {
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = `${getLanguageDisplayName(code)} (${getLanguageShortLabel(code)})`;
      selectEl.appendChild(opt);
    }
  }

  function buildLanguageMenu() {
    const dropdown = document.getElementById('lang-dropdown');
    const mobileSelect = document.getElementById('mobile-lang-select');

    if (dropdown) {
      const frag = document.createDocumentFragment();

      const autoBtn = document.createElement('button');
      autoBtn.type = 'button';
      autoBtn.className = 'lang-option';
      autoBtn.dataset.lang = 'auto';
      autoBtn.setAttribute('role', 'menuitemradio');
      const autoLabel = document.createElement('span');
      autoLabel.dataset.i18n = 'lang.auto';
      autoLabel.textContent = t('lang.auto');
      const autoBadge = document.createElement('span');
      autoBadge.id = 'lang-auto-detected';
      autoBadge.className = 'lang-code-badge';
      autoBadge.textContent = getLanguageShortLabel(state.detectedLang);
      autoBtn.append(autoLabel, autoBadge);
      frag.appendChild(autoBtn);

      const addSection = (headerKey, list) => {
        const div = document.createElement('div');
        div.className = 'dropdown-divider';
        frag.appendChild(div);

        const heading = document.createElement('div');
        heading.className = 'lang-group-label';
        heading.dataset.i18n = headerKey;
        heading.textContent = t(headerKey);
        frag.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'lang-options-grid';

        for (const item of list) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'lang-option';
          btn.dataset.lang = item.code;
          btn.setAttribute('role', 'menuitemradio');

          const nameSpan = document.createElement('span');
          nameSpan.textContent = item.label;
          const shortSpan = document.createElement('span');
          shortSpan.className = 'lang-code-badge';
          shortSpan.textContent = item.short;

          btn.append(nameSpan, shortSpan);
          grid.appendChild(btn);
        }

        frag.appendChild(grid);
      };

      addSection('lang.instantGroup', INSTANT_LANGUAGES);
      addSection('lang.autoGroup', AUTO_LANGUAGES);

      dropdown.replaceChildren(frag);
    }

    if (mobileSelect) {
      const frag = document.createDocumentFragment();

      const autoOpt = document.createElement('option');
      autoOpt.value = 'auto';
      autoOpt.textContent = `${t('lang.auto')} (${getLanguageShortLabel(state.detectedLang)})`;
      frag.appendChild(autoOpt);

      const grp1 = document.createElement('optgroup');
      grp1.label = t('lang.instantGroup');
      for (const item of INSTANT_LANGUAGES) {
        const opt = document.createElement('option');
        opt.value = item.code;
        opt.textContent = `${item.label} (${item.short})`;
        grp1.appendChild(opt);
      }
      frag.appendChild(grp1);

      const grp2 = document.createElement('optgroup');
      grp2.label = t('lang.autoGroup');
      for (const item of AUTO_LANGUAGES) {
        const opt = document.createElement('option');
        opt.value = item.code;
        opt.textContent = `${item.label} (${item.short})`;
        grp2.appendChild(opt);
      }
      frag.appendChild(grp2);

      mobileSelect.replaceChildren(frag);
    }
  }

  async function translateBatchDirectGtx(texts, source, target) {
    const joined = texts.map((text, idx) => `[90${String(idx).padStart(2, '0')}] ${text}`).join('\n');
    const url =
      `https://translate.googleapis.com/translate_a/single?client=gtx` +
      `&sl=${encodeURIComponent(source)}&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(joined)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const output = Array.isArray(data?.[0]) ? data[0].map((s) => (Array.isArray(s) ? s[0] || '' : '')).join('') : '';
      const regex = /[\[【]\s*90(\d{2,})\s*[\]】]\s*/g;
      const matches = [];
      let m;
      while ((m = regex.exec(output)) !== null) {
        const idx = Number(m[1]);
        if (idx >= 0 && idx < texts.length) {
          matches.push({ idx, start: m.index, end: regex.lastIndex });
        }
      }
      if (matches.length !== texts.length) {
        throw new Error('Marker mismatch');
      }
      const out = new Array(texts.length);
      for (let i = 0; i < matches.length; i++) {
        const cur = matches[i];
        const nextStart = i + 1 < matches.length ? matches[i + 1].start : output.length;
        out[cur.idx] = output.slice(cur.end, nextStart).trim();
      }
      return out;
    } finally {
      clearTimeout(timer);
    }
  }

  async function translateSingleMyMemory(text, source, target) {
    const src = source === 'auto' ? 'en' : source;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(`${src}|${target}`)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const out = data?.responseData?.translatedText;
      return typeof out === 'string' && out.trim() ? out : text;
    } catch {
      return text;
    } finally {
      clearTimeout(timer);
    }
  }

  async function translateInBrowserFallback(texts, source, target) {
    const results = new Array(texts.length);
    const chunkSize = 15;
    for (let start = 0; start < texts.length; start += chunkSize) {
      const slice = texts.slice(start, start + chunkSize);
      try {
        const batchOut = await translateBatchDirectGtx(slice, source, target);
        for (let i = 0; i < slice.length; i++) {
          results[start + i] = batchOut[i] || slice[i];
        }
      } catch {
        for (let i = 0; i < slice.length; i++) {
          results[start + i] = await translateSingleMyMemory(slice[i], source, target);
        }
      }
    }
    return results;
  }

  function maskProtectedSegments(text) {
    const slots = [];
    let out = String(text || '').replace(/`[^`]+`/g, (match) => {
      const idx = slots.push(match) - 1;
      return `{${idx}}`;
    });
    for (const term of PROTECTED_BRAND_TERMS) {
      if (out.includes(term)) {
        const idx = slots.push(term) - 1;
        out = out.split(term).join(`{${idx}}`);
      }
    }
    return { masked: out, slots };
  }

  function unmaskProtectedSegments(text, slots) {
    return String(text || '').replace(/\{\s*(\d+)\s*\}/g, (full, idxStr) => {
      const idx = Number(idxStr);
      return idx >= 0 && idx < slots.length ? slots[idx] : full;
    });
  }

  async function requestTranslations(texts, source, target) {
    if (!Array.isArray(texts) || texts.length === 0) return [];
    if (source !== 'auto' && source.toLowerCase() === target.toLowerCase()) {
      return texts.slice();
    }

    const maskedEntries = texts.map(maskProtectedSegments);
    const maskedTexts = maskedEntries.map((entry) => entry.masked);

    if (!isLocalFileProtocol() && !isStaticGithubPages()) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source, target, texts: maskedTexts }),
          signal: controller.signal
        });
        if (res.ok && (res.headers.get('content-type') || '').includes('application/json')) {
          const json = await res.json();
          if (Array.isArray(json?.translations) && json.translations.length === maskedTexts.length) {
            return json.translations.map((t, i) => unmaskProtectedSegments(t, maskedEntries[i].slots));
          }
        }
      } catch {
        // Fall back to direct browser translation below
      } finally {
        clearTimeout(timer);
      }
    }

    const fallbackResults = await translateInBrowserFallback(maskedTexts, source, target);
    return fallbackResults.map((t, i) => unmaskProtectedSegments(t, maskedEntries[i].slots));
  }

  async function ensureUiLanguageLoaded(lang) {
    if (LOCALES[lang]) {
      state.isAutoTranslated = false;
      state.isTranslating = false;
      return;
    }

    const cached = state.autoDicts.get(lang) || readCacheMap(CACHE_PREFIX, lang);
    if (cached && cached['meta.title']) {
      state.autoDicts.set(lang, cached);
      state.isAutoTranslated = true;
      state.isTranslating = false;
      return;
    }

    state.isTranslating = true;
    updateLanguageMenuUI();

    const keys = Object.keys(LOCALES.en);
    const sourceTexts = keys.map((k) => LOCALES.en[k]);
    const translatedList = await requestTranslations(sourceTexts, 'en', lang);

    const dict = {};
    for (let i = 0; i < keys.length; i++) {
      dict[keys[i]] = translatedList[i] || LOCALES.en[keys[i]];
    }

    state.autoDicts.set(lang, dict);
    writeCacheMap(CACHE_PREFIX, lang, dict);
    state.isTranslating = false;
    state.isAutoTranslated = true;

    if (state.activeLang === lang) {
      applyDomTranslations();
      if (typeof state.onChangeCallback === 'function') {
        state.onChangeCallback(getState());
      }
    }
  }

  function resolveActiveLang(pref) {
    if (!pref || pref === 'auto') {
      return state.detectedLang || 'en';
    }
    return pref;
  }

  function setPreference(nextPref) {
    const normalized = !nextPref || nextPref === 'auto' ? 'auto' : normalizeLangCode(nextPref);
    state.preference = normalized;
    saveStoredPreference(normalized);

    const nextActive = resolveActiveLang(normalized);
    state.activeLang = nextActive;

    if (LOCALES[nextActive]) {
      state.isAutoTranslated = false;
      state.isTranslating = false;
      applyDomTranslations();
      if (typeof state.onChangeCallback === 'function') {
        state.onChangeCallback(getState());
      }
      return;
    }

    const cached = state.autoDicts.get(nextActive) || readCacheMap(CACHE_PREFIX, nextActive);
    if (cached) {
      state.autoDicts.set(nextActive, cached);
      state.isAutoTranslated = true;
      state.isTranslating = false;
      applyDomTranslations();
      if (typeof state.onChangeCallback === 'function') {
        state.onChangeCallback(getState());
      }
      return;
    }

    applyDomTranslations();
    if (typeof state.onChangeCallback === 'function') {
      state.onChangeCallback(getState());
    }
    ensureUiLanguageLoaded(nextActive);
  }

  async function translateDynamicTexts(texts, sourceLang = 'en') {
    const lang = state.activeLang;
    if (!Array.isArray(texts) || texts.length === 0) return [];
    if (sourceLang !== 'auto' && lang.toLowerCase() === sourceLang.toLowerCase()) {
      return texts.slice();
    }

    let cacheObj = state.relCache.get(lang) || readCacheMap(REL_CACHE_PREFIX, lang) || {};
    state.relCache.set(lang, cacheObj);

    const out = new Array(texts.length);
    const missing = [];

    for (let i = 0; i < texts.length; i++) {
      const raw = texts[i];
      const key = `${sourceLang}:${raw}`;
      if (typeof cacheObj[key] === 'string') {
        out[i] = cacheObj[key];
      } else {
        missing.push({ idx: i, raw, key });
      }
    }

    if (missing.length === 0) {
      return out;
    }

    const translated = await requestTranslations(
      missing.map((m) => m.raw),
      sourceLang,
      lang
    );

    for (let i = 0; i < missing.length; i++) {
      const item = missing[i];
      const val = translated[i] || item.raw;
      out[item.idx] = val;
      cacheObj[item.key] = val;
    }

    writeCacheMap(REL_CACHE_PREFIX, lang, cacheObj);
    return out;
  }

  function getKnownReleaseTranslation(productKey, tag, lang) {
    const key = `${productKey}:${tag}`;
    const byLang = RELEASE_I18N[lang];
    return byLang && byLang[key] ? byLang[key] : null;
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    try {
      return d.toLocaleDateString(state.activeLang || 'en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return d.toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  }

  function getState() {
    return {
      preference: state.preference,
      activeLang: state.activeLang,
      detectedLang: state.detectedLang,
      isAutoTranslated: state.isAutoTranslated,
      isTranslating: state.isTranslating
    };
  }

  function bindLanguageMenuEvents() {
    const wrap = document.getElementById('lang-menu-wrap');
    const toggleBtn = document.getElementById('lang-toggle-btn');
    const dropdown = document.getElementById('lang-dropdown');
    const mobileSelect = document.getElementById('mobile-lang-select');

    const closeMenu = () => {
      if (dropdown && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
        toggleBtn?.setAttribute('aria-expanded', 'false');
      }
    };

    toggleBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = dropdown?.classList.contains('hidden');
      dropdown?.classList.toggle('hidden', !willOpen);
      toggleBtn.setAttribute('aria-expanded', String(Boolean(willOpen)));
    });

    dropdown?.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest ? e.target.closest('.lang-option') : null;
      if (!btn || !btn.dataset.lang) return;
      closeMenu();
      setPreference(btn.dataset.lang);
    });

    mobileSelect?.addEventListener('change', () => {
      setPreference(mobileSelect.value);
    });

    document.addEventListener('click', (e) => {
      if (wrap && !wrap.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
  }

  function init(onChangeCallback) {
    state.onChangeCallback = onChangeCallback || null;
    state.detectedLang = detectBrowserLanguage();

    const queryLang = getQueryLang();
    if (queryLang) {
      state.preference = queryLang;
    } else {
      state.preference = loadStoredPreference();
    }

    state.activeLang = resolveActiveLang(state.preference);

    buildLanguageMenu();
    bindLanguageMenuEvents();

    if (LOCALES[state.activeLang]) {
      state.isAutoTranslated = false;
      applyDomTranslations();
    } else {
      const cached = readCacheMap(CACHE_PREFIX, state.activeLang);
      if (cached) {
        state.autoDicts.set(state.activeLang, cached);
        state.isAutoTranslated = true;
        applyDomTranslations();
      } else {
        applyDomTranslations();
        ensureUiLanguageLoaded(state.activeLang);
      }
    }
  }

  window.PeakLabsI18n = {
    init,
    setPreference,
    getState,
    t,
    translateDynamicTexts,
    getKnownReleaseTranslation,
    formatDate
  };
})();
