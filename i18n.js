(() => {
  const STORAGE_LANG_KEY = 'peak-labs-site-lang';
  const CACHE_PREFIX = 'peak-labs-i18n-cache-v2:';
  const REL_CACHE_PREFIX = 'peak-labs-i18n-rel-v2:';
  const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur']);

  const PROTECTED_BRAND_TERMS = [
    'Alpine Aurora & Summit Glass',
    'peaklabstudio.vercel.app',
    'peakbrowser.vercel.app',
    'PEAKLABSTUDIO.VERCEL.APP',
    'MIKOŁAJ GRYNIENKO',
    'Mikołaj Grynienko',
    'Eclipse Temurin',
    'GitHub Releases',
    'Peak FPS Boost',
    'Peak Launcher',
    'Peak Browser',
    'Alpine Aurora',
    'Fabric Loader',
    'Summit Glass',
    'Peak Shield',
    'Fabric API',
    'PEAK LABS',
    'Modrinth',
    'GitHub'
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
    'hero.statusPill': [
      { tag: 'span', text: 'PEAK LABS', notranslate: true },
      { tag: 'span', text: 'PEAKLABSTUDIO.VERCEL.APP', notranslate: true },
      { tag: 'span', text: 'MIKOŁAJ GRYNIENKO', notranslate: true }
    ],
    'hero.lead': [
      { tag: 'strong', text: 'Summit Glass', notranslate: true },
      { tag: 'strong', text: 'Peak Browser', notranslate: true },
      { tag: 'span', text: 'Peak Shield', notranslate: true },
      { tag: 'strong', text: 'Peak Launcher', notranslate: true },
      { tag: 'span', text: 'Modrinth', notranslate: true },
      { tag: 'span', text: 'Fabric', notranslate: true }
    ],
    'hero.stat1Sub': [
      { tag: 'span', text: 'Peak Browser', notranslate: true },
      { tag: 'span', text: 'Peak Launcher', notranslate: true }
    ],
    'about.lead': [
      { tag: 'strong', text: 'PEAK LABS', notranslate: true },
      { tag: 'strong', text: 'Mikołaj Grynienko', notranslate: true },
      { tag: 'em', text: 'Alpine Aurora & Summit Glass', notranslate: true }
    ],
    'about.card1Title': [
      { tag: 'span', text: 'Summit Glass & Alpine Aurora', notranslate: true }
    ],
    'about.card1Desc': [
      { tag: 'span', text: 'PEAK LABS', notranslate: true }
    ],
    'about.card2Desc': [
      { tag: 'span', text: 'Peak Shield', notranslate: true }
    ],
    'about.card3Desc': [
      { tag: 'span', text: 'Eclipse Temurin', notranslate: true },
      { tag: 'span', text: 'Fabric Loader', notranslate: true },
      { tag: 'strong', text: 'Peak FPS Boost', notranslate: true },
      { tag: 'span', text: 'GitHub Releases', notranslate: true }
    ],
    'about.card4Desc': [
      { tag: 'span', text: 'PEAK LABS', notranslate: true },
      { tag: 'span', text: 'GitHub', notranslate: true },
      { tag: 'code', text: 'latajoncy82-svg', notranslate: true },
      { tag: 'code', text: '.exe', notranslate: true }
    ],
    'browser.summary': [
      { tag: 'strong', text: 'Peak Shield', notranslate: true }
    ],
    'browser.f5Desc': [
      { tag: 'code', text: 'peak://newtab', notranslate: true }
    ],
    'launcher.summary': [
      { tag: 'strong', text: 'Alpine Aurora', notranslate: true },
      { tag: 'span', text: 'Modrinth', notranslate: true },
      { tag: 'strong', text: 'Peak FPS Boost', notranslate: true },
      { tag: 'span', text: 'Fabric Loader', notranslate: true }
    ],
    'launcher.f3Desc': [
      { tag: 'code', text: '.jar', notranslate: true }
    ],
    'launcher.f6Desc': [
      { tag: 'code', text: 'mods/', notranslate: true },
      { tag: 'code', text: 'config/', notranslate: true }
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
      { tag: 'strong', text: 'Peak Browser', notranslate: true },
      { tag: 'strong', text: 'Peak Shield', notranslate: true },
      { tag: 'em', text: 'Alpine Aurora & Summit Glass', notranslate: true }
    ],
    'footer.copyright': [
      { tag: 'strong', text: 'Mikołaj Grynienko', notranslate: true }
    ]
  };

  const LOCALES = {
    en: {
      'meta.title': 'PEAK LABS — Software Studio | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS is an independent software studio founded by Mikołaj Grynienko. We build clean, fast Windows applications: Peak Browser and Peak Launcher for Minecraft.',
      'meta.ogDescription': 'Independent software studio PEAK LABS (peaklabstudio.vercel.app) — creators of Peak Browser and Peak Launcher. Creator: Mikołaj Grynienko.',
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
      'hero.statusPill': '[0] · [1] · CREATOR: [2]',
      'hero.tagline': 'We build fast, clean Windows apps — at the peak of design and performance.',
      'hero.lead': 'Independent software laboratory crafting the original [0] ecosystem: the minimalist [1] with [2] protection and the advanced Minecraft launcher [3] with [4] catalog, Auto-Java, and [5].',
      'hero.ctaProjects': 'Explore our projects',
      'hero.ctaReleases': 'Download center',
      'hero.stageAria': 'Switch product preview',
      'hero.zoomTitle': 'Enlarge screenshot',
      'hero.stageDownload': 'Download Installer',
      'hero.stageDetails': 'Details ↓',
      'hero.stat1Label': 'Flagship apps',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Minecraft versions',
      'hero.stat2Sub': 'From Alpha & Beta to 26.3',
      'hero.stat3Label': 'Telemetry & ads',
      'hero.stat3Sub': '100% local data & privacy',
      'hero.stat4Label': 'Open Source on GitHub',
      'about.kicker': 'WHO WE ARE · PEAK LABS',
      'about.title': 'Software built without compromises.',
      'about.lead': '[0] is an independent Polish software studio and laboratory founded by [1]. We design lightweight, native Windows 10 and 11 desktop applications in our signature [2] visual language — focused on speed, full user control, automation, and zero system bloat.',
      'about.card1Title': '[0] Design',
      'about.card1Desc': 'Every pixel in [0] projects is built for clarity and consistency: dark alpine surfaces by default, frosted glass with icy borders, smooth 60 FPS animations, and zero distracting banners.',
      'about.card2Title': 'Privacy & zero telemetry',
      'about.card2Desc': 'We do not collect user data, force logins, or inject ads. [0] blocks trackers on the fly, and all configuration stays on your disk.',
      'about.card3Title': 'Full automation',
      'about.card3Desc': 'From automatic downloads of Java 8/17/21/25 ([0]) and [1], through 1-click [2], to synchronized updates from [3].',
      'about.card4Title': 'Open source on GitHub',
      'about.card4Desc': 'All flagship [0] applications are publicly available on [1] under [2]. We deliver clean NSIS installers ([3]) and Portable editions that run immediately without installation.',
      'projects.kicker': 'OUR PROJECTS · FLAGSHIP APPLICATIONS',
      'projects.title': 'Two crafted products for Windows',
      'projects.lead': 'Switch preview tabs, enlarge screenshots in full screen, or download your preferred edition in one click.',
      'browser.num': 'PROJECT 01',
      'browser.cat': 'Web browser',
      'browser.summary': 'A lightweight, architecturally clean browser featuring the Blue Mountain theme, built-in [0] privacy protection, drag & drop tabs, and a calm New Tab workspace.',
      'browser.galleryCaption': 'Peak Browser interface preview',
      'browser.themesAria': 'Peak Browser themes',
      'browser.tabDark': 'Dark (Default)',
      'browser.tabLight': 'Light',
      'browser.zoomAria': 'Enlarge Peak Browser screenshot',
      'browser.f1Title': 'Compact 78 px bar',
      'browser.f1Desc': 'Seamlessly connected active tab and mouse drag & drop tab reordering.',
      'browser.f2Title': 'Built-in Peak Shield',
      'browser.f2Desc': 'Ad and tracker blocking with a per-tab blocked requests counter.',
      'browser.f3Title': 'Smart address bar',
      'browser.f3Desc': 'Highlighted domain, history suggestions, and instant URL copy on hover.',
      'browser.f4Title': 'Flat 324 px sidebar',
      'browser.f4Desc': 'Bookmarks, history, download manager, and settings without covering the page.',
      'browser.f5Title': '3 Blue Mountain themes',
      'browser.f5Desc': 'Dark, Light, and Blue with alpine wallpapers on [0].',
      'browser.f6Title': '100% local privacy',
      'browser.f6Desc': 'No accounts, no telemetry, search engine choice, and 1-click data clearing.',
      'browser.dlBtn': 'Download Peak Browser',
      'browser.dlMoreTitle': 'More Peak Browser download options',
      'browser.siteBtn': 'Project website',
      'launcher.num': 'PROJECT 02',
      'launcher.cat': 'Minecraft launcher',
      'launcher.summary': 'Modern Minecraft launcher with the PEAK Mountain theme and [0] UI. Over 925 game versions, [1] catalog with 1-click [2], plus automatic Java (8/17/21/25) and [3] installation.',
      'launcher.galleryCaption': 'Peak Launcher preview',
      'launcher.viewsAria': 'Peak Launcher views',
      'launcher.tabDark': 'Night Summit',
      'launcher.tabLight': 'Glacial Day',
      'launcher.tabMods': 'Modrinth Mods',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.zoomAria': 'Enlarge Peak Launcher screenshot',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'Aurora sky, topographic contours, 5-stage launch dock, and 3D player avatar.',
      'launcher.f2Title': '925+ Minecraft versions',
      'launcher.f2Desc': 'Official Mojang releases from Alpha and Beta up to 26.3 and latest snapshots.',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': 'Auto dependencies (Fabric API), 1-click FPS pack, and [0] Drag & Drop.',
      'launcher.f4Title': 'Auto-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': 'Automatic detection and download of official Eclipse Temurin runtimes.',
      'launcher.f5Title': '1-click Fabric Loader',
      'launcher.f5Desc': 'Complete mod loader and library installation without external installers.',
      'launcher.f6Title': 'Isolated expedition profiles',
      'launcher.f6Desc': 'Separate [0], [1], worlds, and 4 profile color themes.',
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
      'eco.lead': 'Both applications share the same standard of quality, security, and cohesive Blue Mountain aesthetics.',
      'eco.colParam': 'Ecosystem parameter',
      'eco.row1Key': 'Operating system',
      'eco.row2Key': 'Distribution format',
      'eco.row2Val': 'NSIS Installer + Portable (.exe)',
      'eco.row3Key': 'Visual system',
      'eco.row3Browser': 'Blue Mountain Themes',
      'eco.row4Key': 'Key feature',
      'eco.row4Browser': 'Peak Shield & Drag & Drop tabs',
      'eco.row4Launcher': 'Modrinth, Auto-Java & Auto-Fabric',
      'eco.row5Key': 'Update channel',
      'eco.row6Key': 'Price & telemetry',
      'eco.row6Val': 'Free · 0 telemetry',
      'eco.labBadge': 'PEAK LABS LABORATORY · IN PROGRESS',
      'eco.labTitle': 'Ecosystem roadmap for 2026+',
      'eco.labLead': '[0] continuously improves both flagship products and builds new desktop utilities for Windows gamers and creators.',
      'eco.road1Desc': 'Further RAM optimization, expanded Peak Shield filters, and even snappier tabs.',
      'eco.road2Desc': 'New Modrinth performance packs, modpack management, and launch telemetry.',
      'eco.road3Title': 'Upcoming PEAK LABS tools',
      'eco.road3Desc': 'Lightweight Summit Glass system utilities hosted at [0].',
      'releases.kicker': 'DOWNLOAD CENTER · GITHUB RELEASES',
      'releases.title': 'Releases & changelog',
      'releases.lead': 'Direct [0] installers and Portable editions for both [1] products.',
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
      'creator.kicker': 'FOUNDER & CREATOR OF PEAK LABS',
      'creator.role1': 'Founder · PEAK LABS',
      'creator.role2': 'Desktop & Web Developer',
      'creator.role3': 'UI/UX Designer',
      'creator.bio': 'Designs and builds the entire [0] ecosystem from the ground up — from the Minecraft launcher engine with automatic Java, Fabric, and Modrinth integration, through the [1] architecture and [2] privacy engine, to the cohesive [3] visual language.',
      'creator.githubBtn': 'GitHub Profile (latajoncy82-svg)',
      'creator.repoBtn': 'PEAK LABS Repository',
      'footer.about': 'Independent software studio crafting clean, fast Windows 10/11 apps in the Alpine Aurora & Summit Glass aesthetic.',
      'footer.navTitle': 'Navigation',
      'footer.productsTitle': 'Products',
      'footer.launcherSite': 'Peak Launcher Website ↗',
      'footer.githubProfile': 'latajoncy82-svg Profile ↗',
      'footer.repoLabs': 'PEAK LABS Repo ↗',
      'footer.repoBrowser': 'Peak Browser Repo ↗',
      'footer.repoLauncher': 'Peak Launcher Repo ↗',
      'footer.copyright': '© 2026 PEAK LABS · Creator: [0]',
      'footer.themeCredit': 'Alpine Aurora & Summit Glass Theme',
      'lightbox.defaultCaption': 'Screen preview',
      'lightbox.prevAria': 'Previous screenshot',
      'lightbox.nextAria': 'Next screenshot',
      'lightbox.closeAria': 'Close preview',
      'stage.browserSummary': 'Clean browser with Peak Shield and Blue Mountain theme.',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'Drag & Drop tabs',
      'stage.browserTag3': '0 telemetry',
      'stage.launcherSummary': 'Minecraft launcher with Alpine Aurora, Modrinth, and Auto-Java.',
      'stage.launcherTag1': '925+ MC versions',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java & Fabric',
      'stage.previewAltPrefix': 'Preview of',
      'shot.browserDark': 'Peak Browser — Dark Theme (Default)',
      'shot.browserLight': 'Peak Browser — Light Theme',
      'shot.launcherDark': 'Peak Launcher — Night Summit (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — Glacial Day',
      'shot.launcherMods': 'Peak Launcher — Modrinth Catalog & FPS Boost Pack',
      'shot.launcherJava': 'Peak Launcher — Java & Fabric Center'
    },

    pl: {
      'meta.title': 'PEAK LABS — Studio oprogramowania | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS to niezależne studio oprogramowania założone przez Mikołaja Grynienkę. Tworzymy czyste, szybkie aplikacje na Windows: przeglądarkę Peak Browser i Peak Launcher do Minecrafta.',
      'meta.ogDescription': 'Niezależne studio oprogramowania PEAK LABS (peaklabstudio.vercel.app) — twórcy Peak Browser i Peak Launcher. Twórca: Mikołaj Grynienko.',
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
      'hero.statusPill': '[0] · [1] · TWÓRCA: [2]',
      'hero.tagline': 'Tworzymy szybkie, czyste aplikacje na Windows — na szczycie designu i wydajności.',
      'hero.lead': 'Niezależne laboratorium oprogramowania projektujące autorski ekosystem [0]: minimalistyczną przeglądarkę [1] z ochroną [2] oraz zaawansowany launcher Minecrafta [3] z katalogiem [4], Auto-Javą i [5].',
      'hero.ctaProjects': 'Zobacz nasze projekty',
      'hero.ctaReleases': 'Centrum pobrań',
      'hero.stageAria': 'Przełącz podgląd produktu',
      'hero.zoomTitle': 'Powiększ zrzut ekranu',
      'hero.stageDownload': 'Pobierz Setup',
      'hero.stageDetails': 'Szczegóły ↓',
      'hero.stat1Label': 'Flagowe aplikacje',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Wersji Minecrafta',
      'hero.stat2Sub': 'Od Alpha i Beta po 26.3',
      'hero.stat3Label': 'Telemetrii i reklam',
      'hero.stat3Sub': '100% lokalne dane i prywatność',
      'hero.stat4Label': 'Open Source na GitHubie',
      'about.kicker': 'KIM JESTEŚMY · PEAK LABS',
      'about.title': 'Oprogramowanie tworzone bez kompromisów.',
      'about.lead': '[0] to niezależne polskie studio i laboratorium software’owe założone przez [1]. Projektujemy lekkie, natywne aplikacje desktopowe na Windows 10 i 11 w autorskim języku wizualnym [2] — stawiając na szybkość, pełną kontrolę użytkownika, automatyzację i zero zaśmiecania systemu.',
      'about.card1Title': 'Design [0]',
      'about.card1Desc': 'Każdy piksel w projektach [0] powstaje z myślą o czytelności i spójności: ciemne alpejskie tła domyślnie, półprzezroczyste powierzchnie z lodową krawędzią, płynne animacje w 60 FPS oraz zero ciężkich, rozpraszających banerów.',
      'about.card2Title': 'Prywatność i zero telemetrii',
      'about.card2Desc': 'Nie zbieramy danych użytkowników, nie wymuszamy logowania i nie wstrzykujemy reklam. [0] blokuje trackery w locie, a wszystkie konfiguracje zostają na dysku.',
      'about.card3Title': 'Pełna automatyzacja',
      'about.card3Desc': 'Od automatycznego pobierania Javy 8/17/21/25 ([0]) i [1], przez 1-klikowy [2], aż po zsynchronizowane wydania z [3].',
      'about.card4Title': 'Otwarty kod na GitHubie',
      'about.card4Desc': 'Wszystkie flagowe aplikacje [0] są publicznie dostępne w serwisie [1] pod profilem [2]. Dostarczamy czyste instalatory NSIS ([3]) oraz wersje Portable działające natychmiast bez instalacji.',
      'projects.kicker': 'NASZE PROJEKTY · FLAGOWE APLIKACJE',
      'projects.title': 'Dwa dopracowane produkty na Windows',
      'projects.lead': 'Kliknij zakładki podglądu, powiększ zrzut ekranu w pełnym oknie albo pobierz wybraną wersję jednym kliknięciem.',
      'browser.num': 'PROJEKT 01',
      'browser.cat': 'Przeglądarka internetowa',
      'browser.summary': 'Lekka, architektonicznie czysta przeglądarka z motywem Niebieskiej Góry, wbudowaną tarczą prywatności [0], obsługą kart drag & drop oraz spokojną przestrzenią nowej karty.',
      'browser.galleryCaption': 'Podgląd interfejsu Peak Browser',
      'browser.themesAria': 'Motywy Peak Browser',
      'browser.tabDark': 'Ciemny (Domyślny)',
      'browser.tabLight': 'Jasny',
      'browser.zoomAria': 'Powiększ zrzut Peak Browser',
      'browser.f1Title': 'Zwarty pasek 78 px',
      'browser.f1Desc': 'Połączona aktywna karta i przeciąganie kart myszką (drag & drop).',
      'browser.f2Title': 'Wbudowany Peak Shield',
      'browser.f2Desc': 'Blokowanie reklam i trackerów z licznikiem zablokowanych żądań na karcie.',
      'browser.f3Title': 'Inteligentny pasek adresu',
      'browser.f3Desc': 'Wyróżniona domena, podpowiedzi z historii i szybkie kopiowanie URL.',
      'browser.f4Title': 'Płaski panel boczny 324 px',
      'browser.f4Desc': 'Zakładki, historia, menedżer pobrań i opcje bez zasłaniania strony.',
      'browser.f5Title': '3 motywy Niebieskiej Góry',
      'browser.f5Desc': 'Ciemny, Jasny i Niebieski z tapetami alpejskimi na [0].',
      'browser.f6Title': '100% lokalna prywatność',
      'browser.f6Desc': 'Brak kont, brak telemetrii, wybór wyszukiwarki i czyszczenie danych 1 klikiem.',
      'browser.dlBtn': 'Pobierz Peak Browser',
      'browser.dlMoreTitle': 'Więcej opcji pobierania Peak Browser',
      'browser.siteBtn': 'Strona projektu',
      'launcher.num': 'PROJEKT 02',
      'launcher.cat': 'Launcher Minecraft',
      'launcher.summary': 'Nowoczesny launcher Minecraft z motywem Góry PEAK i interfejsem [0]. Ponad 925 wersji gry, katalog [1] z 1-klikowym [2] oraz automatyczne instalowanie Javy (8/17/21/25) i [3].',
      'launcher.galleryCaption': 'Podgląd Peak Launcher',
      'launcher.viewsAria': 'Widoki Peak Launcher',
      'launcher.tabDark': 'Nocny Szczyt',
      'launcher.tabLight': 'Lodowcowy Dzień',
      'launcher.tabMods': 'Mody Modrinth',
      'launcher.tabJava': 'Java i Fabric',
      'launcher.zoomAria': 'Powiększ zrzut Peak Launcher',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'Zorza, kontury topograficzne, dock startowy 5 etapów i awatar 3D gracza.',
      'launcher.f2Title': '925+ wersji Minecrafta',
      'launcher.f2Desc': 'Oficjalne wydania Mojang od Alpha i Beta aż po 26.3 i snapshoty.',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': 'Auto-zależności (Fabric API), paczka FPS 1 klikiem oraz Drag & Drop [0].',
      'launcher.f4Title': 'Auto-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': 'Automatyczne wykrywanie i pobieranie oficjalnych środowisk Eclipse Temurin.',
      'launcher.f5Title': 'Fabric Loader 1 kliknięciem',
      'launcher.f5Desc': 'Pełna instalacja loadera modów i bibliotek bez zewnętrznych instalatorów.',
      'launcher.f6Title': 'Izolowane profile ekspedycji',
      'launcher.f6Desc': 'Osobne foldery [0], [1], światy i 4 motywy kolorystyczne.',
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
      'eco.lead': 'Obie aplikacje dzielą ten sam standard jakości, bezpieczeństwa oraz spójnej estetyki Niebieskiej Góry.',
      'eco.colParam': 'Parametr ekosystemu',
      'eco.row1Key': 'System operacyjny',
      'eco.row2Key': 'Format dystrybucji',
      'eco.row2Val': 'Instalator NSIS + Portable (.exe)',
      'eco.row3Key': 'System wizualny',
      'eco.row3Browser': 'Motywy Niebieskiej Góry',
      'eco.row4Key': 'Kluczowa funkcja',
      'eco.row4Browser': 'Peak Shield i karty Drag & Drop',
      'eco.row4Launcher': 'Modrinth, Auto-Java i Auto-Fabric',
      'eco.row5Key': 'Kanał aktualizacji',
      'eco.row6Key': 'Cena i telemetria',
      'eco.row6Val': 'Bezpłatne · 0 telemetrii',
      'eco.labBadge': 'LABORATORIUM PEAK LABS · W PRZYGOTOWANIU',
      'eco.labTitle': 'Rozwój ekosystemu na 2026+',
      'eco.labLead': '[0] stale rozwija oba główne produkty oraz testuje nowe narzędzia użytkowe dla graczy i twórców pracujących na Windows.',
      'eco.road1Desc': 'Dalsza optymalizacja zużycia RAM, rozbudowa filtrów Peak Shield i jeszcze szybsze karty.',
      'eco.road2Desc': 'Nowe zestawy wydajnościowe Modrinth, zarządzanie paczkami i telemetria startu.',
      'eco.road3Title': 'Kolejne narzędzia PEAK LABS',
      'eco.road3Desc': 'Lekkie programy systemowe w estetyce Summit Glass pod adresem [0].',
      'releases.kicker': 'CENTRUM POBRAŃ · GITHUB RELEASES',
      'releases.title': 'Wydania i lista zmian',
      'releases.lead': 'Bezpośrednie pliki instalacyjne [0] oraz przenośne wersje Portable obu produktów [1].',
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
      'creator.kicker': 'ZAŁOŻYCIEL & TWÓRCA PEAK LABS',
      'creator.role1': 'Założyciel · PEAK LABS',
      'creator.role2': 'Desktop & Web Developer',
      'creator.role3': 'Projektant UI/UX',
      'creator.bio': 'Projektuje i tworzy od podstaw cały ekosystem [0] — od silnika launchera Minecrafta z automatyczną instalacją Javy, Fabrica i integracją Modrinth, przez architekturę przeglądarki [1] i system prywatności [2], aż po spójny język graficzny [3].',
      'creator.githubBtn': 'Profil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repozytorium PEAK LABS',
      'footer.about': 'Niezależne studio oprogramowania tworzące czyste i szybkie aplikacje na Windows 10/11 w estetyce Alpine Aurora & Summit Glass.',
      'footer.navTitle': 'Nawigacja',
      'footer.productsTitle': 'Produkty',
      'footer.launcherSite': 'Strona Peak Launcher ↗',
      'footer.githubProfile': 'Profil latajoncy82-svg ↗',
      'footer.repoLabs': 'Repozytorium PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Twórca: [0]',
      'footer.themeCredit': 'Motyw Alpine Aurora & Summit Glass',
      'lightbox.defaultCaption': 'Podgląd ekranu',
      'lightbox.prevAria': 'Poprzedni zrzut ekranu',
      'lightbox.nextAria': 'Następny zrzut ekranu',
      'lightbox.closeAria': 'Zamknij podgląd',
      'stage.browserSummary': 'Czysta przeglądarka z Peak Shield i motywem Niebieskiej Góry.',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'Drag & Drop kart',
      'stage.browserTag3': '0 telemetrii',
      'stage.launcherSummary': 'Launcher Minecrafta z Alpine Aurora, Modrinth i Auto-Javą.',
      'stage.launcherTag1': '925+ wersji MC',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java i Fabric',
      'stage.previewAltPrefix': 'Podgląd',
      'shot.browserDark': 'Peak Browser — Motyw Ciemny (Domyślny)',
      'shot.browserLight': 'Peak Browser — Motyw Jasny',
      'shot.launcherDark': 'Peak Launcher — Nocny Szczyt (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — Lodowcowy Dzień',
      'shot.launcherMods': 'Peak Launcher — Katalog Modrinth i Pakiet FPS Boost',
      'shot.launcherJava': 'Peak Launcher — Centrum Java i Fabric'
    },

    de: {
      'meta.title': 'PEAK LABS — Software-Studio | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS ist ein unabhängiges Software-Studio von Mikołaj Grynienko. Wir entwickeln schnelle, saubere Windows-Apps: Peak Browser und Peak Launcher für Minecraft.',
      'meta.ogDescription': 'Unabhängiges Software-Studio PEAK LABS (peaklabstudio.vercel.app) — Entwickler von Peak Browser und Peak Launcher. Gründer: Mikołaj Grynienko.',
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
      'hero.statusPill': '[0] · [1] · GRÜNDER: [2]',
      'hero.tagline': 'Wir bauen schnelle, saubere Windows-Apps — am Gipfel von Design und Leistung.',
      'hero.lead': 'Unabhängiges Software-Labor für das [0]-Ökosystem: den minimalistischen [1] mit [2]-Schutz und den fortschrittlichen Minecraft-Launcher [3] mit [4]-Katalog, Auto-Java und [5].',
      'hero.ctaProjects': 'Projekte entdecken',
      'hero.ctaReleases': 'Download-Center',
      'hero.stageAria': 'Produktvorschau wechseln',
      'hero.zoomTitle': 'Screenshot vergrößern',
      'hero.stageDownload': 'Setup laden',
      'hero.stageDetails': 'Details ↓',
      'hero.stat1Label': 'Flaggschiff-Apps',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Minecraft-Versionen',
      'hero.stat2Sub': 'Von Alpha & Beta bis 26.3',
      'hero.stat3Label': 'Telemetrie & Werbung',
      'hero.stat3Sub': '100 % lokale Daten & Datenschutz',
      'hero.stat4Label': 'Open Source auf GitHub',
      'about.kicker': 'WER WIR SIND · PEAK LABS',
      'about.title': 'Software ohne Kompromisse.',
      'about.lead': '[0] ist ein unabhängiges polnisches Software-Studio von [1]. Wir entwickeln schlanke Desktop-Apps für Windows 10 und 11 in unserer Designsprache [2] — mit Fokus auf Tempo, Kontrolle, Automatisierung und null Systemballast.',
      'about.card1Title': '[0] Design',
      'about.card1Desc': 'Jedes Pixel bei [0] ist auf Klarheit ausgelegt: dunkle alpine Oberflächen als Standard, Milchglas mit Eiskante, flüssige 60-FPS-Animationen und keine ablenkenden Banner.',
      'about.card2Title': 'Datenschutz ohne Telemetrie',
      'about.card2Desc': 'Wir sammeln keine Nutzerdaten, erzwingen keine Logins und zeigen keine Werbung. [0] blockiert Tracker sofort und alle Daten bleiben lokal.',
      'about.card3Title': 'Volle Automatisierung',
      'about.card3Desc': 'Vom automatischen Download von Java 8/17/21/25 ([0]) und [1] über das 1-Klick-[2] bis zu synchronisierten Updates über [3].',
      'about.card4Title': 'Open Source auf GitHub',
      'about.card4Desc': 'Alle Flaggschiff-Apps von [0] sind öffentlich auf [1] unter [2] verfügbar. Wir liefern saubere NSIS-Installer ([3]) sowie Portable-Editionen ohne Installation.',
      'projects.kicker': 'UNSERE PROJEKTE · FLAGGSCHIFF-APPS',
      'projects.title': 'Zwei durchdachte Windows-Produkte',
      'projects.lead': 'Wechseln Sie die Vorschau-Tabs, vergrößern Sie Screenshots im Vollbild oder laden Sie Ihre Version mit einem Klick herunter.',
      'browser.num': 'PROJEKT 01',
      'browser.cat': 'Webbrowser',
      'browser.summary': 'Ein leichter, architektonisch klarer Browser im Blauer-Berg-Design mit integriertem [0]-Schutz, Drag-&-Drop-Tabs und ruhiger Neuer-Tab-Seite.',
      'browser.galleryCaption': 'Vorschau Peak Browser',
      'browser.themesAria': 'Peak Browser Designs',
      'browser.tabDark': 'Dunkel (Standard)',
      'browser.tabLight': 'Hell',
      'browser.zoomAria': 'Peak Browser Screenshot vergrößern',
      'browser.f1Title': 'Kompakte 78-px-Leiste',
      'browser.f1Desc': 'Nahtlos verbundener aktiver Tab und Drag-&-Drop-Sortierung per Maus.',
      'browser.f2Title': 'Integrierter Peak Shield',
      'browser.f2Desc': 'Werbungs- und Tracker-Blocker mit Zähler blockierter Anfragen pro Tab.',
      'browser.f3Title': 'Intelligente Adressleiste',
      'browser.f3Desc': 'Hervorgehobene Domain, Verlaufsvorschläge und sofortiges URL-Kopieren.',
      'browser.f4Title': 'Flache 324-px-Seitenleiste',
      'browser.f4Desc': 'Lesezeichen, Verlauf, Downloads und Einstellungen ohne die Seite zu verdecken.',
      'browser.f5Title': '3 Blauer-Berg-Designs',
      'browser.f5Desc': 'Dunkel, Hell und Blau mit alpinen Hintergrundbildern auf [0].',
      'browser.f6Title': '100 % lokaler Datenschutz',
      'browser.f6Desc': 'Keine Konten, keine Telemetrie, Suchmaschinenwahl und 1-Klick-Datenlöschung.',
      'browser.dlBtn': 'Peak Browser laden',
      'browser.dlMoreTitle': 'Weitere Download-Optionen für Peak Browser',
      'browser.siteBtn': 'Projekt-Website',
      'launcher.num': 'PROJEKT 02',
      'launcher.cat': 'Minecraft-Launcher',
      'launcher.summary': 'Moderner Minecraft-Launcher mit PEAK-Bergthema und [0]-Oberfläche. Über 925 Versionen, [1]-Katalog mit 1-Klick-[2] sowie automatischer Java- (8/17/21/25) und [3]-Installation.',
      'launcher.galleryCaption': 'Vorschau Peak Launcher',
      'launcher.viewsAria': 'Peak Launcher Ansichten',
      'launcher.tabDark': 'Nachtgipfel',
      'launcher.tabLight': 'Gletschertag',
      'launcher.tabMods': 'Modrinth-Mods',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.zoomAria': 'Peak Launcher Screenshot vergrößern',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'Polarlicht, topografische Linien, 5-Stufen-Startdock und 3D-Spieleravatar.',
      'launcher.f2Title': '925+ Minecraft-Versionen',
      'launcher.f2Desc': 'Offizielle Mojang-Releases von Alpha und Beta bis 26.3 und Snapshots.',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': 'Auto-Abhängigkeiten (Fabric API), 1-Klick-FPS-Paket und [0] Drag & Drop.',
      'launcher.f4Title': 'Auto-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': 'Automatische Erkennung und Installation offizieller Eclipse-Temurin-Versionen.',
      'launcher.f5Title': '1-Klick Fabric Loader',
      'launcher.f5Desc': 'Vollständige Installation von Mod-Loader und Bibliotheken ohne Zusatztools.',
      'launcher.f6Title': 'Isolierte Expeditions-Profile',
      'launcher.f6Desc': 'Getrennte Ordner [0], [1], Welten und 4 Profil-Farbthemen.',
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
      'eco.lead': 'Beide Apps teilen denselben Qualitätsstandard, höchste Sicherheit und die einheitliche Blauer-Berg-Ästhetik.',
      'eco.colParam': 'Ökosystem-Parameter',
      'eco.row1Key': 'Betriebssystem',
      'eco.row2Key': 'Verteilungsformat',
      'eco.row2Val': 'NSIS-Installer + Portable (.exe)',
      'eco.row3Key': 'Visuelles System',
      'eco.row3Browser': 'Blauer-Berg-Designs',
      'eco.row4Key': 'Kernfunktion',
      'eco.row4Browser': 'Peak Shield & Drag-&-Drop-Tabs',
      'eco.row4Launcher': 'Modrinth, Auto-Java & Auto-Fabric',
      'eco.row5Key': 'Update-Kanal',
      'eco.row6Key': 'Preis & Telemetrie',
      'eco.row6Val': 'Kostenlos · 0 Telemetrie',
      'eco.labBadge': 'PEAK LABS LABOR · IN ARBEIT',
      'eco.labTitle': 'Ökosystem-Roadmap für 2026+',
      'eco.labLead': '[0] entwickelt beide Hauptprodukte stetig weiter und erprobt neue Windows-Werkzeuge für Gamer und Entwickler.',
      'eco.road1Desc': 'Weitere RAM-Optimierung, erweiterte Peak-Shield-Filter und noch schnellere Tabs.',
      'eco.road2Desc': 'Neue Modrinth-Performance-Pakete, Modpack-Verwaltung und Start-Telemetrie.',
      'eco.road3Title': 'Weitere PEAK LABS Tools',
      'eco.road3Desc': 'Schlanke Summit-Glass-Systemtools unter [0].',
      'releases.kicker': 'DOWNLOAD-CENTER · GITHUB RELEASES',
      'releases.title': 'Releases & Änderungsprotokoll',
      'releases.lead': 'Direkte [0]-Installer und Portable-Editionen für beide [1]-Produkte.',
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
      'creator.kicker': 'GRÜNDER & ENTWICKLER VON PEAK LABS',
      'creator.role1': 'Gründer · PEAK LABS',
      'creator.role2': 'Desktop- & Webentwickler',
      'creator.role3': 'UI/UX-Designer',
      'creator.bio': 'Entwirft und entwickelt das gesamte [0]-Ökosystem von Grund auf — vom Minecraft-Launcher mit automatischer Java-, Fabric- und Modrinth-Integration über die Architektur von [1] und [2] bis zur einheitlichen Designsprache [3].',
      'creator.githubBtn': 'GitHub-Profil (latajoncy82-svg)',
      'creator.repoBtn': 'PEAK LABS Repository',
      'footer.about': 'Unabhängiges Software-Studio für saubere, schnelle Windows-10/11-Apps im Alpine Aurora & Summit Glass Design.',
      'footer.navTitle': 'Navigation',
      'footer.productsTitle': 'Produkte',
      'footer.launcherSite': 'Peak Launcher Website ↗',
      'footer.githubProfile': 'Profil latajoncy82-svg ↗',
      'footer.repoLabs': 'PEAK LABS Repo ↗',
      'footer.repoBrowser': 'Peak Browser Repo ↗',
      'footer.repoLauncher': 'Peak Launcher Repo ↗',
      'footer.copyright': '© 2026 PEAK LABS · Gründer: [0]',
      'footer.themeCredit': 'Design Alpine Aurora & Summit Glass',
      'lightbox.defaultCaption': 'Bildschirmvorschau',
      'lightbox.prevAria': 'Vorheriger Screenshot',
      'lightbox.nextAria': 'Nächster Screenshot',
      'lightbox.closeAria': 'Vorschau schließen',
      'stage.browserSummary': 'Sauberer Browser mit Peak Shield und Blauer-Berg-Design.',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'Drag & Drop Tabs',
      'stage.browserTag3': '0 Telemetrie',
      'stage.launcherSummary': 'Minecraft-Launcher mit Alpine Aurora, Modrinth und Auto-Java.',
      'stage.launcherTag1': '925+ MC-Versionen',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java & Fabric',
      'stage.previewAltPrefix': 'Vorschau von',
      'shot.browserDark': 'Peak Browser — Dunkles Design (Standard)',
      'shot.browserLight': 'Peak Browser — Helles Design',
      'shot.launcherDark': 'Peak Launcher — Nachtgipfel (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — Gletschertag',
      'shot.launcherMods': 'Peak Launcher — Modrinth-Katalog & FPS-Boost-Paket',
      'shot.launcherJava': 'Peak Launcher — Java & Fabric Zentrum'
    },

    es: {
      'meta.title': 'PEAK LABS — Estudio de software | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS es un estudio de software independiente fundado por Mikołaj Grynienko. Creamos aplicaciones rápidas y limpias para Windows: Peak Browser y Peak Launcher para Minecraft.',
      'meta.ogDescription': 'Estudio independiente de software PEAK LABS (peaklabstudio.vercel.app) — creadores de Peak Browser y Peak Launcher. Creador: Mikołaj Grynienko.',
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
      'hero.statusPill': '[0] · [1] · CREADOR: [2]',
      'hero.tagline': 'Creamos apps rápidas y limpias para Windows — en la cima del diseño y el rendimiento.',
      'hero.lead': 'Laboratorio independiente que desarrolla el ecosistema [0]: el navegador minimalista [1] con protección [2] y el launcher avanzado de Minecraft [3] con catálogo de [4], Auto-Java y [5].',
      'hero.ctaProjects': 'Ver proyectos',
      'hero.ctaReleases': 'Centro de descargas',
      'hero.stageAria': 'Cambiar vista previa del producto',
      'hero.zoomTitle': 'Ampliar captura',
      'hero.stageDownload': 'Descargar Setup',
      'hero.stageDetails': 'Detalles ↓',
      'hero.stat1Label': 'Apps insignia',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Versiones de Minecraft',
      'hero.stat2Sub': 'Desde Alpha y Beta hasta 26.3',
      'hero.stat3Label': 'Telemetría y anuncios',
      'hero.stat3Sub': '100 % datos locales y privacidad',
      'hero.stat4Label': 'Código abierto en GitHub',
      'about.kicker': 'QUIÉNES SOMOS · PEAK LABS',
      'about.title': 'Software creado sin concesiones.',
      'about.lead': '[0] es un estudio y laboratorio independiente polaco fundado por [1]. Diseñamos aplicaciones de escritorio nativas y ligeras para Windows 10 y 11 bajo nuestro lenguaje visual [2], centradas en velocidad, control total, automatización y cero bloatware.',
      'about.card1Title': 'Diseño [0]',
      'about.card1Desc': 'Cada píxel en los proyectos de [0] busca claridad y coherencia: fondos alpinos oscuros por defecto, cristal esmerilado, animaciones fluidas a 60 FPS y cero banners molestos.',
      'about.card2Title': 'Privacidad y cero telemetría',
      'about.card2Desc': 'No recopilamos datos, no exigimos cuentas ni inyectamos anuncios. [0] bloquea rastreadores al instante y toda configuración permanece en tu disco.',
      'about.card3Title': 'Automatización total',
      'about.card3Desc': 'Desde descargas automáticas de Java 8/17/21/25 ([0]) y [1], hasta el [2] en 1 clic y lanzamientos sincronizados con [3].',
      'about.card4Title': 'Código abierto en GitHub',
      'about.card4Desc': 'Todas las aplicaciones de [0] están disponibles públicamente en [1] bajo [2]. Ofrecemos instaladores NSIS ([3]) y ediciones portátiles listas para usar.',
      'projects.kicker': 'NUESTROS PROYECTOS · APLICACIONES INSIGNIA',
      'projects.title': 'Dos productos cuidados para Windows',
      'projects.lead': 'Cambia las pestañas de vista previa, amplía las capturas a pantalla completa o descarga la edición que prefieras en un clic.',
      'browser.num': 'PROYECTO 01',
      'browser.cat': 'Navegador web',
      'browser.summary': 'Navegador ligero y limpio con estética de Montaña Azul, protección de privacidad [0] integrada, pestañas drag & drop y una Nueva Pestaña serena.',
      'browser.galleryCaption': 'Vista previa de Peak Browser',
      'browser.themesAria': 'Temas de Peak Browser',
      'browser.tabDark': 'Oscuro (Predeterminado)',
      'browser.tabLight': 'Claro',
      'browser.zoomAria': 'Ampliar captura de Peak Browser',
      'browser.f1Title': 'Barra compacta de 78 px',
      'browser.f1Desc': 'Pestaña activa integrada y reordenación con el ratón (drag & drop).',
      'browser.f2Title': 'Peak Shield integrado',
      'browser.f2Desc': 'Bloqueo de anuncios y rastreadores con contador de solicitudes por pestaña.',
      'browser.f3Title': 'Barra de direcciones inteligente',
      'browser.f3Desc': 'Dominio resaltado, sugerencias del historial y copia rápida de URL.',
      'browser.f4Title': 'Panel lateral plano de 324 px',
      'browser.f4Desc': 'Marcadores, historial, descargas y ajustes sin tapar la web.',
      'browser.f5Title': '3 temas Montaña Azul',
      'browser.f5Desc': 'Oscuro, Claro y Azul con fondos alpinos en [0].',
      'browser.f6Title': '100 % privacidad local',
      'browser.f6Desc': 'Sin cuentas, sin telemetría, buscador a elegir y borrado en 1 clic.',
      'browser.dlBtn': 'Descargar Peak Browser',
      'browser.dlMoreTitle': 'Más opciones de descarga de Peak Browser',
      'browser.siteBtn': 'Web del proyecto',
      'launcher.num': 'PROYECTO 02',
      'launcher.cat': 'Launcher de Minecraft',
      'launcher.summary': 'Launcher moderno de Minecraft con estética PEAK e interfaz [0]. Más de 925 versiones, catálogo [1] con [2] en 1 clic e instalación automática de Java (8/17/21/25) y [3].',
      'launcher.galleryCaption': 'Vista previa de Peak Launcher',
      'launcher.viewsAria': 'Vistas de Peak Launcher',
      'launcher.tabDark': 'Cumbre Nocturna',
      'launcher.tabLight': 'Día Glacial',
      'launcher.tabMods': 'Mods de Modrinth',
      'launcher.tabJava': 'Java y Fabric',
      'launcher.zoomAria': 'Ampliar captura de Peak Launcher',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'Aurora boreal, curvas topográficas, dock de 5 pasos y avatar 3D.',
      'launcher.f2Title': '925+ versiones de Minecraft',
      'launcher.f2Desc': 'Lanzamientos oficiales de Mojang desde Alpha y Beta hasta 26.3 y snapshots.',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': 'Dependencias automáticas (Fabric API), pack FPS en 1 clic y Drag & Drop [0].',
      'launcher.f4Title': 'Auto-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': 'Detección y descarga automática de entornos oficiales Eclipse Temurin.',
      'launcher.f5Title': 'Fabric Loader en 1 clic',
      'launcher.f5Desc': 'Instalación completa del cargador de mods sin instaladores externos.',
      'launcher.f6Title': 'Perfiles de expedición aislados',
      'launcher.f6Desc': 'Carpetas [0], [1] y mundos independientes con 4 temas de color.',
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
      'eco.lead': 'Ambas aplicaciones comparten el mismo nivel de calidad, seguridad y estética uniforme Montaña Azul.',
      'eco.colParam': 'Parámetro del ecosistema',
      'eco.row1Key': 'Sistema operativo',
      'eco.row2Key': 'Formato de distribución',
      'eco.row2Val': 'Instalador NSIS + Portable (.exe)',
      'eco.row3Key': 'Sistema visual',
      'eco.row3Browser': 'Temas Montaña Azul',
      'eco.row4Key': 'Función clave',
      'eco.row4Browser': 'Peak Shield y pestañas Drag & Drop',
      'eco.row4Launcher': 'Modrinth, Auto-Java y Auto-Fabric',
      'eco.row5Key': 'Canal de actualizaciones',
      'eco.row6Key': 'Precio y telemetría',
      'eco.row6Val': 'Gratis · 0 telemetría',
      'eco.labBadge': 'LABORATORIO PEAK LABS · EN DESARROLLO',
      'eco.labTitle': 'Hoja de ruta 2026+',
      'eco.labLead': '[0] sigue mejorando ambos productos principales y desarrollando nuevas utilidades para jugadores y creadores en Windows.',
      'eco.road1Desc': 'Mayor optimización de RAM, filtros ampliados de Peak Shield y pestañas aún más ágiles.',
      'eco.road2Desc': 'Nuevos paquetes de rendimiento en Modrinth, gestión de modpacks y telemetría de inicio.',
      'eco.road3Title': 'Próximas herramientas de PEAK LABS',
      'eco.road3Desc': 'Utilidades ligeras Summit Glass disponibles en [0].',
      'releases.kicker': 'CENTRO DE DESCARGAS · GITHUB RELEASES',
      'releases.title': 'Versiones y cambios',
      'releases.lead': 'Instaladores [0] directos y ediciones portátiles de ambos productos de [1].',
      'releases.filterAria': 'Filtrar versiones por producto',
      'releases.filterAll': 'Todas',
      'releases.loading': 'Cargando versiones…',
      'releases.synced': 'Sincronizado con GitHub Releases',
      'releases.catalog': 'Catálogo actual de versiones de PEAK LABS',
      'releases.empty': 'No hay versiones publicadas para el filtro elegido.',
      'releases.latestBadge': 'Última',
      'releases.dlSetup': 'Descargar Instalador (.exe)',
      'releases.dlPortable': 'Descargar Portable (.exe)',
      'releases.viewGithub': 'Ver en GitHub ↗',
      'creator.kicker': 'FUNDADOR Y CREADOR DE PEAK LABS',
      'creator.role1': 'Fundador · PEAK LABS',
      'creator.role2': 'Desarrollador Desktop y Web',
      'creator.role3': 'Diseñador UI/UX',
      'creator.bio': 'Diseña y construye todo el ecosistema [0] desde cero — desde el motor del launcher de Minecraft con Java, Fabric y Modrinth automáticos, hasta la arquitectura de [1], la privacidad de [2] y el sistema visual [3].',
      'creator.githubBtn': 'Perfil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repositorio PEAK LABS',
      'footer.about': 'Estudio independiente que crea apps rápidas y limpias para Windows 10/11 con estética Alpine Aurora & Summit Glass.',
      'footer.navTitle': 'Navegación',
      'footer.productsTitle': 'Productos',
      'footer.launcherSite': 'Web de Peak Launcher ↗',
      'footer.githubProfile': 'Perfil latajoncy82-svg ↗',
      'footer.repoLabs': 'Repo PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Creador: [0]',
      'footer.themeCredit': 'Tema Alpine Aurora & Summit Glass',
      'lightbox.defaultCaption': 'Vista previa',
      'lightbox.prevAria': 'Captura anterior',
      'lightbox.nextAria': 'Siguiente captura',
      'lightbox.closeAria': 'Cerrar vista previa',
      'stage.browserSummary': 'Navegador limpio con Peak Shield y tema Montaña Azul.',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'Pestañas Drag & Drop',
      'stage.browserTag3': '0 telemetría',
      'stage.launcherSummary': 'Launcher de Minecraft con Alpine Aurora, Modrinth y Auto-Java.',
      'stage.launcherTag1': '925+ versiones MC',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java y Fabric',
      'stage.previewAltPrefix': 'Vista previa de',
      'shot.browserDark': 'Peak Browser — Tema Oscuro (Predeterminado)',
      'shot.browserLight': 'Peak Browser — Tema Claro',
      'shot.launcherDark': 'Peak Launcher — Cumbre Nocturna (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — Día Glacial',
      'shot.launcherMods': 'Peak Launcher — Catálogo Modrinth y Pack FPS Boost',
      'shot.launcherJava': 'Peak Launcher — Centro Java y Fabric'
    },

    fr: {
      'meta.title': 'PEAK LABS — Studio logiciel | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS est un studio logiciel indépendant fondé par Mikołaj Grynienko. Nous créons des applications Windows rapides et épurées : Peak Browser et Peak Launcher pour Minecraft.',
      'meta.ogDescription': 'Studio logiciel indépendant PEAK LABS (peaklabstudio.vercel.app) — créateurs de Peak Browser et Peak Launcher. Créateur : Mikołaj Grynienko.',
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
      'hero.statusPill': '[0] · [1] · CRÉATEUR : [2]',
      'hero.tagline': 'Nous créons des applications Windows rapides et épurées — au sommet du design et des performances.',
      'hero.lead': 'Laboratoire logiciel indépendant concevant l’écosystème [0] : le navigateur minimaliste [1] avec protection [2] et le launcher Minecraft avancé [3] avec catalogue [4], Auto-Java et [5].',
      'hero.ctaProjects': 'Découvrir nos projets',
      'hero.ctaReleases': 'Centre de téléchargement',
      'hero.stageAria': 'Changer l’aperçu du produit',
      'hero.zoomTitle': 'Agrandir la capture',
      'hero.stageDownload': 'Télécharger Setup',
      'hero.stageDetails': 'Détails ↓',
      'hero.stat1Label': 'Applications phares',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Versions de Minecraft',
      'hero.stat2Sub': 'De l’Alpha & Beta à la 26.3',
      'hero.stat3Label': 'Télémétrie et publicités',
      'hero.stat3Sub': '100 % données locales et vie privée',
      'hero.stat4Label': 'Open Source sur GitHub',
      'about.kicker': 'QUI SOMMES-NOUS · PEAK LABS',
      'about.title': 'Des logiciels conçus sans compromis.',
      'about.lead': '[0] est un studio logiciel polonais indépendant fondé par [1]. Nous concevons des applications Windows 10 et 11 légères et natives dans notre langage visuel [2] — axées sur la rapidité, le contrôle total, l’automatisation et zéro superflu.',
      'about.card1Title': 'Design [0]',
      'about.card1Desc': 'Chaque pixel des projets [0] vise la clarté : surfaces alpines sombres par défaut, verre dépoli à bordure glacée, animations fluides à 60 FPS et aucune bannière intrusive.',
      'about.card2Title': 'Vie privée et zéro télémétrie',
      'about.card2Desc': 'Aucune collecte de données, aucune connexion imposée ni publicité. [0] bloque les traqueurs à la volée et tout reste sur votre disque.',
      'about.card3Title': 'Automatisation complète',
      'about.card3Desc': 'Du téléchargement automatique de Java 8/17/21/25 ([0]) et [1], au [2] en 1 clic, jusqu’aux mises à jour synchronisées via [3].',
      'about.card4Title': 'Open source sur GitHub',
      'about.card4Desc': 'Toutes les applications phares de [0] sont disponibles sur [1] sous le profil [2]. Nous fournissons des installateurs NSIS ([3]) et des versions portables immédiates.',
      'projects.kicker': 'NOS PROJETS · APPLICATIONS PHARES',
      'projects.title': 'Deux produits soignés pour Windows',
      'projects.lead': 'Basculez entre les aperçus, agrandissez les captures en plein écran ou téléchargez votre version en un clic.',
      'browser.num': 'PROJET 01',
      'browser.cat': 'Navigateur web',
      'browser.summary': 'Un navigateur léger et épuré au thème Montagne Bleue, doté du bouclier de confidentialité [0], d’onglets glisser-déposer et d’un Nouvel Onglet apaisant.',
      'browser.galleryCaption': 'Aperçu de Peak Browser',
      'browser.themesAria': 'Thèmes de Peak Browser',
      'browser.tabDark': 'Sombre (Défaut)',
      'browser.tabLight': 'Clair',
      'browser.zoomAria': 'Agrandir la capture Peak Browser',
      'browser.f1Title': 'Barre compacte de 78 px',
      'browser.f1Desc': 'Onglet actif intégré et réorganisation fluide par glisser-déposer.',
      'browser.f2Title': 'Peak Shield intégré',
      'browser.f2Desc': 'Blocage des publicités et traqueurs avec compteur par onglet.',
      'browser.f3Title': 'Barre d’adresse intelligente',
      'browser.f3Desc': 'Domaine mis en avant, suggestions d’historique et copie d’URL rapide.',
      'browser.f4Title': 'Panneau latéral plat 324 px',
      'browser.f4Desc': 'Favoris, historique, téléchargements et réglages sans masquer la page.',
      'browser.f5Title': '3 thèmes Montagne Bleue',
      'browser.f5Desc': 'Sombre, Clair et Bleu avec fonds alpins sur [0].',
      'browser.f6Title': 'Confidentialité 100 % locale',
      'browser.f6Desc': 'Sans compte, sans télémétrie, choix du moteur et nettoyage en 1 clic.',
      'browser.dlBtn': 'Télécharger Peak Browser',
      'browser.dlMoreTitle': 'Plus d’options pour Peak Browser',
      'browser.siteBtn': 'Site du projet',
      'launcher.num': 'PROJET 02',
      'launcher.cat': 'Launcher Minecraft',
      'launcher.summary': 'Launcher Minecraft moderne au thème PEAK et interface [0]. Plus de 925 versions, catalogue [1] avec [2] en 1 clic, plus Java (8/17/21/25) et [3] automatiques.',
      'launcher.galleryCaption': 'Aperçu de Peak Launcher',
      'launcher.viewsAria': 'Vues de Peak Launcher',
      'launcher.tabDark': 'Sommet Nocturne',
      'launcher.tabLight': 'Jour Glaciaire',
      'launcher.tabMods': 'Mods Modrinth',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.zoomAria': 'Agrandir la capture Peak Launcher',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'Aurore polaire, courbes topographiques, dock 5 étapes et avatar 3D.',
      'launcher.f2Title': '925+ versions de Minecraft',
      'launcher.f2Desc': 'Versions officielles Mojang d’Alpha et Beta jusqu’à 26.3 et snapshots.',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': 'Dépendances auto (Fabric API), pack FPS en 1 clic et glisser-déposer [0].',
      'launcher.f4Title': 'Auto-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': 'Détection et téléchargement automatiques des runtimes Eclipse Temurin.',
      'launcher.f5Title': 'Fabric Loader en 1 clic',
      'launcher.f5Desc': 'Installation complète du chargeur de mods sans installateurs externes.',
      'launcher.f6Title': 'Profils d’expédition isolés',
      'launcher.f6Desc': 'Dossiers [0], [1] et mondes séparés avec 4 thèmes de couleur.',
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
      'eco.lead': 'Les deux applications partagent le même niveau de qualité, de sécurité et d’esthétique Montagne Bleue.',
      'eco.colParam': 'Paramètre de l’écosystème',
      'eco.row1Key': 'Système d’exploitation',
      'eco.row2Key': 'Format de distribution',
      'eco.row2Val': 'Installateur NSIS + Portable (.exe)',
      'eco.row3Key': 'Système visuel',
      'eco.row3Browser': 'Thèmes Montagne Bleue',
      'eco.row4Key': 'Fonction clé',
      'eco.row4Browser': 'Peak Shield & onglets Drag & Drop',
      'eco.row4Launcher': 'Modrinth, Auto-Java & Auto-Fabric',
      'eco.row5Key': 'Canal de mise à jour',
      'eco.row6Key': 'Prix & télémétrie',
      'eco.row6Val': 'Gratuit · 0 télémétrie',
      'eco.labBadge': 'LABORATOIRE PEAK LABS · EN COURS',
      'eco.labTitle': 'Feuille de route 2026+',
      'eco.labLead': '[0] améliore en continu ses deux produits phares et prépare de nouveaux utilitaires Windows pour joueurs et créateurs.',
      'eco.road1Desc': 'Optimisation accrue de la RAM, filtres Peak Shield étendus et onglets encore plus vifs.',
      'eco.road2Desc': 'Nouveaux packs performance Modrinth, gestion de modpacks et télémétrie de lancement.',
      'eco.road3Title': 'Prochains outils PEAK LABS',
      'eco.road3Desc': 'Utilitaires système légers Summit Glass publiés sur [0].',
      'releases.kicker': 'CENTRE DE TÉLÉCHARGEMENT · GITHUB RELEASES',
      'releases.title': 'Versions et journal des modifications',
      'releases.lead': 'Installateurs [0] directs et éditions portables pour les deux produits [1].',
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
      'creator.kicker': 'FONDATEUR & CRÉATEUR DE PEAK LABS',
      'creator.role1': 'Fondateur · PEAK LABS',
      'creator.role2': 'Développeur Desktop & Web',
      'creator.role3': 'Designer UI/UX',
      'creator.bio': 'Conçoit et développe de A à Z l’écosystème [0] — du moteur du launcher Minecraft avec Java, Fabric et Modrinth automatiques jusqu’à l’architecture de [1], le bouclier [2] et le langage visuel [3].',
      'creator.githubBtn': 'Profil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Dépôt PEAK LABS',
      'footer.about': 'Studio logiciel indépendant créant des applications Windows 10/11 rapides et soignées dans le style Alpine Aurora & Summit Glass.',
      'footer.navTitle': 'Navigation',
      'footer.productsTitle': 'Produits',
      'footer.launcherSite': 'Site Peak Launcher ↗',
      'footer.githubProfile': 'Profil latajoncy82-svg ↗',
      'footer.repoLabs': 'Dépôt PEAK LABS ↗',
      'footer.repoBrowser': 'Dépôt Peak Browser ↗',
      'footer.repoLauncher': 'Dépôt Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Créateur : [0]',
      'footer.themeCredit': 'Thème Alpine Aurora & Summit Glass',
      'lightbox.defaultCaption': 'Aperçu écran',
      'lightbox.prevAria': 'Capture précédente',
      'lightbox.nextAria': 'Capture suivante',
      'lightbox.closeAria': 'Fermer l’aperçu',
      'stage.browserSummary': 'Navigateur épuré avec Peak Shield et thème Montagne Bleue.',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'Onglets Drag & Drop',
      'stage.browserTag3': '0 télémétrie',
      'stage.launcherSummary': 'Launcher Minecraft avec Alpine Aurora, Modrinth et Auto-Java.',
      'stage.launcherTag1': '925+ versions MC',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java & Fabric',
      'stage.previewAltPrefix': 'Aperçu de',
      'shot.browserDark': 'Peak Browser — Thème Sombre (Défaut)',
      'shot.browserLight': 'Peak Browser — Thème Clair',
      'shot.launcherDark': 'Peak Launcher — Sommet Nocturne (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — Jour Glaciaire',
      'shot.launcherMods': 'Peak Launcher — Catalogue Modrinth & Pack FPS Boost',
      'shot.launcherJava': 'Peak Launcher — Centre Java & Fabric'
    },

    uk: {
      'meta.title': 'PEAK LABS — Студія програмного забезпечення | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS — незалежна студія програмного забезпечення, заснована Міколаєм Гриненком. Створюємо швидкі та чисті застосунки для Windows: Peak Browser і Peak Launcher для Minecraft.',
      'meta.ogDescription': 'Незалежна студія PEAK LABS (peaklabstudio.vercel.app) — творці Peak Browser та Peak Launcher. Засновник: Mikołaj Grynienko.',
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
      'hero.statusPill': '[0] · [1] · ТВОРЕЦЬ: [2]',
      'hero.tagline': 'Створюємо швидкі та чисті програми для Windows — на вершині дизайну й продуктивності.',
      'hero.lead': 'Незалежна лабораторія програмного забезпечення, що розвиває екосистему [0]: мінімалістичний браузер [1] із захистом [2] та сучасний лаунчер Minecraft [3] із каталогом [4], Auto-Java і [5].',
      'hero.ctaProjects': 'Переглянути проєкти',
      'hero.ctaReleases': 'Центр завантажень',
      'hero.stageAria': 'Перемкнути попередній перегляд продукту',
      'hero.zoomTitle': 'Збільшити знімок',
      'hero.stageDownload': 'Завантажити Setup',
      'hero.stageDetails': 'Детальніше ↓',
      'hero.stat1Label': 'Флагманські програми',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Версій Minecraft',
      'hero.stat2Sub': 'Від Alpha і Beta до 26.3',
      'hero.stat3Label': 'Телеметрії та реклами',
      'hero.stat3Sub': '100% локальні дані та приватність',
      'hero.stat4Label': 'Open Source на GitHub',
      'about.kicker': 'ХТО МИ · PEAK LABS',
      'about.title': 'Програми без жодних компромісів.',
      'about.lead': '[0] — незалежна польська софт-студія та лабораторія, заснована [1]. Ми створюємо легкі нативні десктопні застосунки для Windows 10 і 11 у власній візуальній системі [2] — зі ставкою на швидкість, контроль, автоматизацію та нуль сміття.',
      'about.card1Title': 'Дизайн [0]',
      'about.card1Desc': 'Кожен піксель у проєктах [0] створений для чіткості: темні альпійські фони за замовчуванням, матове скло з крижаною рамкою, плавні анімації 60 FPS і жодних зайвих банерів.',
      'about.card2Title': 'Приватність і нуль телеметрії',
      'about.card2Desc': 'Ми не збираємо дані користувачів, не вимагаємо акаунтів і не показуємо рекламу. [0] блокує трекери миттєво, а всі налаштування залишаються на диску.',
      'about.card3Title': 'Повна автоматизація',
      'about.card3Desc': 'Від автоматичного завантаження Java 8/17/21/25 ([0]) і [1] через [2] в 1 клік до синхронізованих релізів на [3].',
      'about.card4Title': 'Відкритий код на GitHub',
      'about.card4Desc': 'Усі флагманські програми [0] відкрито опубліковані на [1] у профілі [2]. Надаємо чисті інсталятори NSIS ([3]) і портативні версії Portable без встановлення.',
      'projects.kicker': 'НАШІ ПРОЄКТИ · ФЛАГМАНСЬКІ ПРОГРАМИ',
      'projects.title': 'Два досконалі продукти для Windows',
      'projects.lead': 'Перемикайте вкладки перегляду, збільшуйте скріншоти на весь екран або завантажуйте потрібну версію в один клік.',
      'browser.num': 'ПРОЄКТ 01',
      'browser.cat': 'Веббраузер',
      'browser.summary': 'Легкий та чистий браузер у стилі Синьої Гори з вбудованим щитом приватності [0], вкладками drag & drop та спокійною новою вкладкою.',
      'browser.galleryCaption': 'Огляд інтерфейсу Peak Browser',
      'browser.themesAria': 'Теми Peak Browser',
      'browser.tabDark': 'Темна (Типова)',
      'browser.tabLight': 'Світла',
      'browser.zoomAria': 'Збільшити скріншот Peak Browser',
      'browser.f1Title': 'Компактна панель 78 px',
      'browser.f1Desc': 'Плавно поєднана активна вкладка та перетягування вкладок мишею.',
      'browser.f2Title': 'Вбудований Peak Shield',
      'browser.f2Desc': 'Блокування реклами та трекерів із лічильником для кожної вкладки.',
      'browser.f3Title': 'Розумний адресний рядок',
      'browser.f3Desc': 'Виділений домен, підказки з історії та швидке копіювання URL.',
      'browser.f4Title': 'Плоска бічна панель 324 px',
      'browser.f4Desc': 'Закладки, історія, завантаження та налаштування без перекриття сайту.',
      'browser.f5Title': '3 теми Синьої Гори',
      'browser.f5Desc': 'Темна, Світла і Синя з альпійськими шпалерами на [0].',
      'browser.f6Title': '100% локальна приватність',
      'browser.f6Desc': 'Без акаунтів, без телеметрії, вибір пошуковика та очищення в 1 клік.',
      'browser.dlBtn': 'Завантажити Peak Browser',
      'browser.dlMoreTitle': 'Більше опцій завантаження Peak Browser',
      'browser.siteBtn': 'Сайт проєкту',
      'launcher.num': 'ПРОЄКТ 02',
      'launcher.cat': 'Лаунчер Minecraft',
      'launcher.summary': 'Сучасний лаунчер Minecraft у стилі Гори PEAK з інтерфейсом [0]. Понад 925 версій гри, каталог [1] із [2] в 1 клік та автоматичне встановлення Java (8/17/21/25) і [3].',
      'launcher.galleryCaption': 'Огляд Peak Launcher',
      'launcher.viewsAria': 'Вигляди Peak Launcher',
      'launcher.tabDark': 'Нічна Вершина',
      'launcher.tabLight': 'Льодовиковий День',
      'launcher.tabMods': 'Моди Modrinth',
      'launcher.tabJava': 'Java і Fabric',
      'launcher.zoomAria': 'Збільшити скріншот Peak Launcher',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'Полярне сяйво, топографічні контури, 5-етапний док запуску й 3D-аватар.',
      'launcher.f2Title': '925+ версій Minecraft',
      'launcher.f2Desc': 'Офіційні релізи Mojang від Alpha та Beta до 26.3 і найновіших снепшотів.',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': 'Автозалежності (Fabric API), FPS-пакет в 1 клік та Drag & Drop [0].',
      'launcher.f4Title': 'Авто-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': 'Автоматичне виявлення та завантаження офіційних середовищ Eclipse Temurin.',
      'launcher.f5Title': 'Fabric Loader в 1 клік',
      'launcher.f5Desc': 'Повне встановлення завантажувача модів без сторонніх інсталяторів.',
      'launcher.f6Title': 'Ізольовані профілі експедицій',
      'launcher.f6Desc': 'Окремі теки [0], [1], світи та 4 кольорові теми.',
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
      'eco.lead': 'Обидві програми дотримуються єдиного стандарту якості, безпеки та естетики Синьої Гори.',
      'eco.colParam': 'Параметр екосистеми',
      'eco.row1Key': 'Операційна система',
      'eco.row2Key': 'Формат дистрибуції',
      'eco.row2Val': 'Інсталятор NSIS + Portable (.exe)',
      'eco.row3Key': 'Візуальна система',
      'eco.row3Browser': 'Теми Синьої Гори',
      'eco.row4Key': 'Ключова функція',
      'eco.row4Browser': 'Peak Shield та вкладки Drag & Drop',
      'eco.row4Launcher': 'Modrinth, Auto-Java та Auto-Fabric',
      'eco.row5Key': 'Канал оновлень',
      'eco.row6Key': 'Ціна та телеметрія',
      'eco.row6Val': 'Безкоштовно · 0 телеметрії',
      'eco.labBadge': 'ЛАБОРАТОРІЯ PEAK LABS · У РОЗРОБЦІ',
      'eco.labTitle': 'Розвиток екосистеми на 2026+',
      'eco.labLead': '[0] постійно вдосконалює обидва флагманські продукти та створює нові утиліти для геймерів і творців на Windows.',
      'eco.road1Desc': 'Подальша оптимізація RAM, розширені фільтри Peak Shield і ще швидші вкладки.',
      'eco.road2Desc': 'Нові пакети продуктивності Modrinth, керування збірками й телеметрія запуску.',
      'eco.road3Title': 'Наступні інструменти PEAK LABS',
      'eco.road3Desc': 'Легкі системні утиліти Summit Glass на [0].',
      'releases.kicker': 'ЦЕНТР ЗАВАНТАЖЕНЬ · GITHUB RELEASES',
      'releases.title': 'Релізи та список змін',
      'releases.lead': 'Прямі інсталятори [0] та портативні версії обох продуктів [1].',
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
      'creator.kicker': 'ЗАСНОВНИК І ТВОРЕЦЬ PEAK LABS',
      'creator.role1': 'Засновник · PEAK LABS',
      'creator.role2': 'Desktop & Web Developer',
      'creator.role3': 'UI/UX-дизайнер',
      'creator.bio': 'Проєктує та створює з нуля всю екосистему [0] — від рушія лаунчера Minecraft з автоматичним встановленням Java, Fabric та інтеграцією Modrinth до архітектури [1], захисту [2] та стилю [3].',
      'creator.githubBtn': 'Профіль GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Репозиторій PEAK LABS',
      'footer.about': 'Незалежна студія програмного забезпечення, що створює швидкі та чисті програми для Windows 10/11 у стилі Alpine Aurora & Summit Glass.',
      'footer.navTitle': 'Навігація',
      'footer.productsTitle': 'Продукти',
      'footer.launcherSite': 'Сайт Peak Launcher ↗',
      'footer.githubProfile': 'Профіль latajoncy82-svg ↗',
      'footer.repoLabs': 'Репозиторій PEAK LABS ↗',
      'footer.repoBrowser': 'Репо Peak Browser ↗',
      'footer.repoLauncher': 'Репо Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Творець: [0]',
      'footer.themeCredit': 'Тема Alpine Aurora & Summit Glass',
      'lightbox.defaultCaption': 'Попередній перегляд',
      'lightbox.prevAria': 'Попередній скріншот',
      'lightbox.nextAria': 'Наступний скріншот',
      'lightbox.closeAria': 'Закрити перегляд',
      'stage.browserSummary': 'Чистий браузер із Peak Shield і темою Синьої Гори.',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'Вкладки Drag & Drop',
      'stage.browserTag3': '0 телеметрії',
      'stage.launcherSummary': 'Лаунчер Minecraft з Alpine Aurora, Modrinth та Auto-Java.',
      'stage.launcherTag1': '925+ версій MC',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java і Fabric',
      'stage.previewAltPrefix': 'Перегляд',
      'shot.browserDark': 'Peak Browser — Темна тема (Типова)',
      'shot.browserLight': 'Peak Browser — Світла тема',
      'shot.launcherDark': 'Peak Launcher — Нічна Вершина (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — Льодовиковий День',
      'shot.launcherMods': 'Peak Launcher — Каталог Modrinth і пакет FPS Boost',
      'shot.launcherJava': 'Peak Launcher — Центр Java і Fabric'
    },

    it: {
      'meta.title': 'PEAK LABS — Studio software | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS è uno studio software indipendente fondato da Mikołaj Grynienko. Creiamo app Windows veloci e pulite: Peak Browser e Peak Launcher per Minecraft.',
      'meta.ogDescription': 'Studio software indipendente PEAK LABS (peaklabstudio.vercel.app) — creatori di Peak Browser e Peak Launcher. Fondatore: Mikołaj Grynienko.',
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
      'hero.statusPill': '[0] · [1] · CREATORE: [2]',
      'hero.tagline': 'Creiamo app Windows veloci e pulite — al vertice di design e prestazioni.',
      'hero.lead': 'Laboratorio software indipendente che realizza l’ecosistema [0]: il browser minimalista [1] con protezione [2] e il launcher Minecraft avanzato [3] con catalogo [4], Auto-Java e [5].',
      'hero.ctaProjects': 'Scopri i progetti',
      'hero.ctaReleases': 'Centro download',
      'hero.stageAria': 'Cambia anteprima prodotto',
      'hero.zoomTitle': 'Ingrandisci schermata',
      'hero.stageDownload': 'Scarica Setup',
      'hero.stageDetails': 'Dettagli ↓',
      'hero.stat1Label': 'App di punta',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Versioni di Minecraft',
      'hero.stat2Sub': 'Da Alpha e Beta fino alla 26.3',
      'hero.stat3Label': 'Telemetria e annunci',
      'hero.stat3Sub': '100% dati locali e privacy',
      'hero.stat4Label': 'Open Source su GitHub',
      'about.kicker': 'CHI SIAMO · PEAK LABS',
      'about.title': 'Software creato senza compromessi.',
      'about.lead': '[0] è uno studio e laboratorio software polacco indipendente fondato da [1]. Progettiamo applicazioni desktop native e leggere per Windows 10 e 11 nel nostro stile [2], puntando su velocità, controllo, automazione e zero appesantimenti.',
      'about.card1Title': 'Design [0]',
      'about.card1Desc': 'Ogni pixel nei progetti [0] nasce per chiarezza e coerenza: sfondi alpini scuri predefiniti, vetro satinato, animazioni fluide a 60 FPS e zero banner invasivi.',
      'about.card2Title': 'Privacy e zero telemetria',
      'about.card2Desc': 'Non raccogliamo dati, non imponiamo account né mostriamo pubblicità. [0] blocca i tracker al volo e tutto resta sul tuo disco.',
      'about.card3Title': 'Automazione completa',
      'about.card3Desc': 'Dal download automatico di Java 8/17/21/25 ([0]) e [1], al [2] in 1 clic, fino agli aggiornamenti sincronizzati su [3].',
      'about.card4Title': 'Open source su GitHub',
      'about.card4Desc': 'Tutte le app di [0] sono pubbliche su [1] sotto [2]. Offriamo installer NSIS puliti ([3]) ed edizioni Portable pronte all’uso.',
      'projects.kicker': 'I NOSTRI PROGETTI · APP DI PUNTA',
      'projects.title': 'Due prodotti curati per Windows',
      'projects.lead': 'Cambia le schede di anteprima, ingrandisci gli screenshot o scarica la tua versione con un clic.',
      'browser.num': 'PROGETTO 01',
      'browser.cat': 'Browser web',
      'browser.summary': 'Browser leggero ed essenziale con tema Montagna Blu, protezione [0] integrata, schede drag & drop e una Nuova Scheda rilassante.',
      'browser.galleryCaption': 'Anteprima Peak Browser',
      'browser.themesAria': 'Temi Peak Browser',
      'browser.tabDark': 'Scuro (Predefinito)',
      'browser.tabLight': 'Chiaro',
      'browser.zoomAria': 'Ingrandisci schermata Peak Browser',
      'browser.f1Title': 'Barra compatta da 78 px',
      'browser.f1Desc': 'Scheda attiva integrata e riordino schede tramite drag & drop.',
      'browser.f2Title': 'Peak Shield integrato',
      'browser.f2Desc': 'Blocco annunci e tracker con contatore per ogni scheda.',
      'browser.f3Title': 'Barra degli indirizzi smart',
      'browser.f3Desc': 'Dominio evidenziato, suggerimenti dalla cronologia e copia URL rapida.',
      'browser.f4Title': 'Barra laterale piatta 324 px',
      'browser.f4Desc': 'Preferiti, cronologia, download e opzioni senza coprire la pagina.',
      'browser.f5Title': '3 temi Montagna Blu',
      'browser.f5Desc': 'Scuro, Chiaro e Blu con sfondi alpini su [0].',
      'browser.f6Title': '100% privacy locale',
      'browser.f6Desc': 'Senza account, zero telemetria, scelta motore e pulizia in 1 clic.',
      'browser.dlBtn': 'Scarica Peak Browser',
      'browser.dlMoreTitle': 'Altre opzioni di download Peak Browser',
      'browser.siteBtn': 'Sito del progetto',
      'launcher.num': 'PROGETTO 02',
      'launcher.cat': 'Launcher Minecraft',
      'launcher.summary': 'Launcher Minecraft moderno con tema PEAK e interfaccia [0]. Oltre 925 versioni, catalogo [1] con [2] in 1 clic e installazione automatica di Java (8/17/21/25) e [3].',
      'launcher.galleryCaption': 'Anteprima Peak Launcher',
      'launcher.viewsAria': 'Viste Peak Launcher',
      'launcher.tabDark': 'Vetta Notturna',
      'launcher.tabLight': 'Giorno Glaciale',
      'launcher.tabMods': 'Mod Modrinth',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.zoomAria': 'Ingrandisci schermata Peak Launcher',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'Aurora polare, linee topografiche, dock a 5 fasi e avatar 3D.',
      'launcher.f2Title': '925+ versioni di Minecraft',
      'launcher.f2Desc': 'Uscite ufficiali Mojang da Alpha e Beta fino alla 26.3 e snapshot.',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': 'Dipendenze auto (Fabric API), pacchetto FPS in 1 clic e Drag & Drop [0].',
      'launcher.f4Title': 'Auto-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': 'Rilevamento e download automatico dei runtime ufficiali Eclipse Temurin.',
      'launcher.f5Title': 'Fabric Loader in 1 clic',
      'launcher.f5Desc': 'Installazione completa del mod loader senza installer esterni.',
      'launcher.f6Title': 'Profili spedizione isolati',
      'launcher.f6Desc': 'Cartelle [0], [1] e mondi separati con 4 temi colore.',
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
      'eco.lead': 'Entrambe le applicazioni condividono gli stessi standard di qualità, sicurezza ed estetica Montagna Blu.',
      'eco.colParam': 'Parametro ecosistema',
      'eco.row1Key': 'Sistema operativo',
      'eco.row2Key': 'Formato distribuzione',
      'eco.row2Val': 'Installer NSIS + Portable (.exe)',
      'eco.row3Key': 'Sistema visivo',
      'eco.row3Browser': 'Temi Montagna Blu',
      'eco.row4Key': 'Funzione chiave',
      'eco.row4Browser': 'Peak Shield e schede Drag & Drop',
      'eco.row4Launcher': 'Modrinth, Auto-Java e Auto-Fabric',
      'eco.row5Key': 'Canale aggiornamenti',
      'eco.row6Key': 'Prezzo e telemetria',
      'eco.row6Val': 'Gratuito · 0 telemetria',
      'eco.labBadge': 'LABORATORIO PEAK LABS · IN CORSO',
      'eco.labTitle': 'Roadmap ecosistema 2026+',
      'eco.labLead': '[0] migliora costantemente entrambi i prodotti principali e sviluppa nuove utility Windows per gamer e creator.',
      'eco.road1Desc': 'Ulteriore ottimizzazione della RAM, filtri Peak Shield ampliati e schede ancora più rapide.',
      'eco.road2Desc': 'Nuovi pacchetti prestazioni Modrinth, gestione modpack e telemetria di avvio.',
      'eco.road3Title': 'Prossimi strumenti PEAK LABS',
      'eco.road3Desc': 'Utility di sistema leggere Summit Glass su [0].',
      'releases.kicker': 'CENTRO DOWNLOAD · GITHUB RELEASES',
      'releases.title': 'Versioni e note di rilascio',
      'releases.lead': 'Installer [0] diretti ed edizioni Portable per entrambi i prodotti [1].',
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
      'creator.kicker': 'FONDATORE E CREATORE DI PEAK LABS',
      'creator.role1': 'Fondatore · PEAK LABS',
      'creator.role2': 'Sviluppatore Desktop & Web',
      'creator.role3': 'Designer UI/UX',
      'creator.bio': 'Progetta e realizza da zero l’intero ecosistema [0] — dal launcher Minecraft con Java, Fabric e Modrinth automatici fino all’architettura di [1], allo scudo [2] e al sistema visivo [3].',
      'creator.githubBtn': 'Profilo GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repository PEAK LABS',
      'footer.about': 'Studio software indipendente che crea app Windows 10/11 veloci e pulite nello stile Alpine Aurora & Summit Glass.',
      'footer.navTitle': 'Navigazione',
      'footer.productsTitle': 'Prodotti',
      'footer.launcherSite': 'Sito Peak Launcher ↗',
      'footer.githubProfile': 'Profilo latajoncy82-svg ↗',
      'footer.repoLabs': 'Repo PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Creatore: [0]',
      'footer.themeCredit': 'Tema Alpine Aurora & Summit Glass',
      'lightbox.defaultCaption': 'Anteprima schermo',
      'lightbox.prevAria': 'Schermata precedente',
      'lightbox.nextAria': 'Schermata successiva',
      'lightbox.closeAria': 'Chiudi anteprima',
      'stage.browserSummary': 'Browser pulito con Peak Shield e tema Montagna Blu.',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'Schede Drag & Drop',
      'stage.browserTag3': '0 telemetria',
      'stage.launcherSummary': 'Launcher Minecraft con Alpine Aurora, Modrinth e Auto-Java.',
      'stage.launcherTag1': '925+ versioni MC',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java & Fabric',
      'stage.previewAltPrefix': 'Anteprima di',
      'shot.browserDark': 'Peak Browser — Tema Scuro (Predefinito)',
      'shot.browserLight': 'Peak Browser — Tema Chiaro',
      'shot.launcherDark': 'Peak Launcher — Vetta Notturna (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — Giorno Glaciale',
      'shot.launcherMods': 'Peak Launcher — Catalogo Modrinth & Pacchetto FPS Boost',
      'shot.launcherJava': 'Peak Launcher — Centro Java & Fabric'
    },

    pt: {
      'meta.title': 'PEAK LABS — Estúdio de software | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS é um estúdio independente fundado por Mikołaj Grynienko. Criamos apps rápidos e limpos para Windows: Peak Browser e Peak Launcher para Minecraft.',
      'meta.ogDescription': 'Estúdio independente PEAK LABS (peaklabstudio.vercel.app) — criadores do Peak Browser e Peak Launcher. Criador: Mikołaj Grynienko.',
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
      'hero.statusPill': '[0] · [1] · CRIADOR: [2]',
      'hero.tagline': 'Criamos apps rápidos e limpos para Windows — no topo do design e desempenho.',
      'hero.lead': 'Laboratório independente que desenvolve o ecossistema [0]: o navegador minimalista [1] com proteção [2] e o launcher avançado de Minecraft [3] com catálogo [4], Auto-Java e [5].',
      'hero.ctaProjects': 'Ver projetos',
      'hero.ctaReleases': 'Central de downloads',
      'hero.stageAria': 'Alternar prévia do produto',
      'hero.zoomTitle': 'Ampliar captura',
      'hero.stageDownload': 'Baixar Setup',
      'hero.stageDetails': 'Detalhes ↓',
      'hero.stat1Label': 'Apps principais',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Versões do Minecraft',
      'hero.stat2Sub': 'De Alpha e Beta até 26.3',
      'hero.stat3Label': 'Telemetria e anúncios',
      'hero.stat3Sub': '100% dados locais e privacidade',
      'hero.stat4Label': 'Código aberto no GitHub',
      'about.kicker': 'QUEM SOMOS · PEAK LABS',
      'about.title': 'Software feito sem compromissos.',
      'about.lead': '[0] é um estúdio e laboratório polonês independente fundado por [1]. Projetamos aplicativos desktop nativos e leves para Windows 10 e 11 na linguagem visual [2], com foco em velocidade, controle, automação e zero excesso.',
      'about.card1Title': 'Design [0]',
      'about.card1Desc': 'Cada pixel nos projetos [0] prioriza clareza: fundos alpinos escuros por padrão, vidro fosco, animações fluidas a 60 FPS e zero banners distrativos.',
      'about.card2Title': 'Privacidade e zero telemetria',
      'about.card2Desc': 'Não coletamos dados, não exigimos contas e não inserimos anúncios. [0] bloqueia rastreadores na hora e tudo fica no seu disco.',
      'about.card3Title': 'Automação total',
      'about.card3Desc': 'Do download automático do Java 8/17/21/25 ([0]) e [1], ao [2] em 1 clique, até atualizações sincronizadas via [3].',
      'about.card4Title': 'Código aberto no GitHub',
      'about.card4Desc': 'Todos os apps principais da [0] são públicos no [1] sob [2]. Fornecemos instaladores NSIS limpos ([3]) e edições Portable prontas para rodar.',
      'projects.kicker': 'NOSSOS PROJETOS · APPS PRINCIPAIS',
      'projects.title': 'Dois produtos refinados para Windows',
      'projects.lead': 'Alterne as abas de prévia, amplie as capturas em tela cheia ou baixe sua edição preferida em um clique.',
      'browser.num': 'PROJETO 01',
      'browser.cat': 'Navegador web',
      'browser.summary': 'Navegador leve e limpo com tema Montanha Azul, proteção [0] integrada, abas drag & drop e Nova Aba tranquila.',
      'browser.galleryCaption': 'Prévia do Peak Browser',
      'browser.themesAria': 'Temas do Peak Browser',
      'browser.tabDark': 'Escuro (Padrão)',
      'browser.tabLight': 'Claro',
      'browser.zoomAria': 'Ampliar captura do Peak Browser',
      'browser.f1Title': 'Barra compacta de 78 px',
      'browser.f1Desc': 'Aba ativa conectada e reordenação suave por drag & drop.',
      'browser.f2Title': 'Peak Shield integrado',
      'browser.f2Desc': 'Bloqueio de anúncios e rastreadores com contador por aba.',
      'browser.f3Title': 'Barra de endereços inteligente',
      'browser.f3Desc': 'Domínio em destaque, sugestões do histórico e cópia rápida de URL.',
      'browser.f4Title': 'Painel lateral plano 324 px',
      'browser.f4Desc': 'Favoritos, histórico, downloads e ajustes sem cobrir o site.',
      'browser.f5Title': '3 temas Montanha Azul',
      'browser.f5Desc': 'Escuro, Claro e Azul com papéis de parede alpinos em [0].',
      'browser.f6Title': '100% privacidade local',
      'browser.f6Desc': 'Sem conta, sem telemetria, escolha de buscador e limpeza em 1 clique.',
      'browser.dlBtn': 'Baixar Peak Browser',
      'browser.dlMoreTitle': 'Mais opções de download do Peak Browser',
      'browser.siteBtn': 'Site do projeto',
      'launcher.num': 'PROJETO 02',
      'launcher.cat': 'Launcher Minecraft',
      'launcher.summary': 'Launcher moderno de Minecraft com tema PEAK e interface [0]. Mais de 925 versões, catálogo [1] com [2] em 1 clique, mais Java (8/17/21/25) e [3] automáticos.',
      'launcher.galleryCaption': 'Prévia do Peak Launcher',
      'launcher.viewsAria': 'Visões do Peak Launcher',
      'launcher.tabDark': 'Cume Noturno',
      'launcher.tabLight': 'Dia Glacial',
      'launcher.tabMods': 'Mods Modrinth',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.zoomAria': 'Ampliar captura do Peak Launcher',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'Aurora polar, linhas topográficas, dock em 5 etapas e avatar 3D.',
      'launcher.f2Title': '925+ versões de Minecraft',
      'launcher.f2Desc': 'Lançamentos oficiais da Mojang de Alpha e Beta até 26.3 e snapshots.',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': 'Dependências automáticas (Fabric API), pacote FPS em 1 clique e Drag & Drop [0].',
      'launcher.f4Title': 'Auto-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': 'Detecção e download automático dos runtimes oficiais Eclipse Temurin.',
      'launcher.f5Title': 'Fabric Loader em 1 clique',
      'launcher.f5Desc': 'Instalação completa do loader de mods sem instaladores externos.',
      'launcher.f6Title': 'Perfis de expedição isolados',
      'launcher.f6Desc': 'Pastas [0], [1] e mundos separados com 4 temas de cor.',
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
      'eco.lead': 'Ambos os aplicativos compartilham o mesmo padrão de qualidade, segurança e estética Montanha Azul.',
      'eco.colParam': 'Parâmetro do ecossistema',
      'eco.row1Key': 'Sistema operacional',
      'eco.row2Key': 'Formato de distribuição',
      'eco.row2Val': 'Instalador NSIS + Portable (.exe)',
      'eco.row3Key': 'Sistema visual',
      'eco.row3Browser': 'Temas Montanha Azul',
      'eco.row4Key': 'Recurso principal',
      'eco.row4Browser': 'Peak Shield e abas Drag & Drop',
      'eco.row4Launcher': 'Modrinth, Auto-Java e Auto-Fabric',
      'eco.row5Key': 'Canal de atualizações',
      'eco.row6Key': 'Preço e telemetria',
      'eco.row6Val': 'Grátis · 0 telemetria',
      'eco.labBadge': 'LABORATÓRIO PEAK LABS · EM ANDAMENTO',
      'eco.labTitle': 'Roteiro do ecossistema 2026+',
      'eco.labLead': '[0] aprimora continuamente ambos os produtos principais e desenvolve novos utilitários Windows para jogadores e criadores.',
      'eco.road1Desc': 'Mais otimização de RAM, filtros ampliados do Peak Shield e abas ainda mais ágeis.',
      'eco.road2Desc': 'Novos pacotes de desempenho Modrinth, gestão de modpacks e telemetria de início.',
      'eco.road3Title': 'Próximas ferramentas PEAK LABS',
      'eco.road3Desc': 'Utilitários leves Summit Glass disponíveis em [0].',
      'releases.kicker': 'CENTRAL DE DOWNLOADS · GITHUB RELEASES',
      'releases.title': 'Versões e novidades',
      'releases.lead': 'Instaladores [0] diretos e edições Portable de ambos os produtos [1].',
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
      'creator.kicker': 'FUNDADOR E CRIADOR DA PEAK LABS',
      'creator.role1': 'Fundador · PEAK LABS',
      'creator.role2': 'Desenvolvedor Desktop & Web',
      'creator.role3': 'Designer UI/UX',
      'creator.bio': 'Projeta e constrói todo o ecossistema [0] do zero — do motor do launcher Minecraft com Java, Fabric e Modrinth automáticos à arquitetura do [1], escudo [2] e linguagem visual [3].',
      'creator.githubBtn': 'Perfil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repositório PEAK LABS',
      'footer.about': 'Estúdio independente que cria aplicativos Windows 10/11 rápidos e limpos no visual Alpine Aurora & Summit Glass.',
      'footer.navTitle': 'Navegação',
      'footer.productsTitle': 'Produtos',
      'footer.launcherSite': 'Site Peak Launcher ↗',
      'footer.githubProfile': 'Perfil latajoncy82-svg ↗',
      'footer.repoLabs': 'Repo PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Criador: [0]',
      'footer.themeCredit': 'Tema Alpine Aurora & Summit Glass',
      'lightbox.defaultCaption': 'Prévia de tela',
      'lightbox.prevAria': 'Captura anterior',
      'lightbox.nextAria': 'Próxima captura',
      'lightbox.closeAria': 'Fechar prévia',
      'stage.browserSummary': 'Navegador limpo com Peak Shield e tema Montanha Azul.',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'Abas Drag & Drop',
      'stage.browserTag3': '0 telemetria',
      'stage.launcherSummary': 'Launcher Minecraft com Alpine Aurora, Modrinth e Auto-Java.',
      'stage.launcherTag1': '925+ versões MC',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java & Fabric',
      'stage.previewAltPrefix': 'Prévia de',
      'shot.browserDark': 'Peak Browser — Tema Escuro (Padrão)',
      'shot.browserLight': 'Peak Browser — Tema Claro',
      'shot.launcherDark': 'Peak Launcher — Cume Noturno (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — Dia Glacial',
      'shot.launcherMods': 'Peak Launcher — Catálogo Modrinth & Pacote FPS Boost',
      'shot.launcherJava': 'Peak Launcher — Central Java & Fabric'
    },

    cs: {
      'meta.title': 'PEAK LABS — Softwarové studio | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABS je nezávislé softwarové studio založené Mikołajem Grynienkem. Tvoříme rychlé a čisté aplikace pro Windows: Peak Browser a Peak Launcher pro Minecraft.',
      'meta.ogDescription': 'Nezávislé softwarové studio PEAK LABS (peaklabstudio.vercel.app) — tvůrci Peak Browser a Peak Launcher. Autor: Mikołaj Grynienko.',
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
      'hero.statusPill': '[0] · [1] · TVŮRCE: [2]',
      'hero.tagline': 'Tvoříme rychlé a čisté aplikace pro Windows — na vrcholu designu a výkonu.',
      'hero.lead': 'Nezávislá softwarová laboratoř vytvářející ekosystém [0]: minimalistický prohlížeč [1] s ochranou [2] a pokročilý launcher Minecraftu [3] s katalogem [4], Auto-Javou a [5].',
      'hero.ctaProjects': 'Prohlédnout projekty',
      'hero.ctaReleases': 'Centrum stahování',
      'hero.stageAria': 'Přepnout náhled produktu',
      'hero.zoomTitle': 'Zvětšit snímek',
      'hero.stageDownload': 'Stáhnout Setup',
      'hero.stageDetails': 'Podrobnosti ↓',
      'hero.stat1Label': 'Vlajkové aplikace',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Verzí Minecraftu',
      'hero.stat2Sub': 'Od Alpha a Beta po 26.3',
      'hero.stat3Label': 'Telemetrie a reklamy',
      'hero.stat3Sub': '100% lokální data a soukromí',
      'hero.stat4Label': 'Open Source na GitHubu',
      'about.kicker': 'KDO JSME · PEAK LABS',
      'about.title': 'Software tvořený bez kompromisů.',
      'about.lead': '[0] je nezávislé polské softwarové studio a laboratoř založená [1]. Navrhujeme lehké nativní desktopové aplikace pro Windows 10 a 11 v našem vizuálním jazyce [2] s důrazem na rychlost, kontrolu, automatizaci a nulový balast.',
      'about.card1Title': 'Design [0]',
      'about.card1Desc': 'Každý pixel v projektech [0] sází na přehlednost: výchozí tmavé alpské motivy, matné sklo s ledovou hranou, plynulé 60 FPS animace a žádné rušivé bannery.',
      'about.card2Title': 'Soukromí a nula telemetrie',
      'about.card2Desc': 'Nesbíráme žádná data, nevyžadujeme účty a nevkládáme reklamy. [0] okamžitě blokuje sledování a vše zůstává na vašem disku.',
      'about.card3Title': 'Plná automatizace',
      'about.card3Desc': 'Od automatického stažení Javy 8/17/21/25 ([0]) a [1], přes 1-klikový [2], až po synchronizované vydání přes [3].',
      'about.card4Title': 'Open source na GitHubu',
      'about.card4Desc': 'Všechny vlajkové aplikace [0] jsou veřejně dostupné na [1] pod profilem [2]. Nabízíme čisté instalátory NSIS ([3]) i přenosné edice Portable.',
      'projects.kicker': 'NAŠE PROJEKTY · VLAJKOVÉ APLIKACE',
      'projects.title': 'Dva vyladěné produkty pro Windows',
      'projects.lead': 'Přepínejte záložky náhledu, zvětšete snímky na celou obrazovku nebo stáhněte zvolenou verzi jedním kliknutím.',
      'browser.num': 'PROJEKT 01',
      'browser.cat': 'Webový prohlížeč',
      'browser.summary': 'Lehký, architektonicky čistý prohlížeč s motivem Modré Hory, integrovanou ochranou [0], kartami drag & drop a klidnou Novou kartou.',
      'browser.galleryCaption': 'Náhled Peak Browser',
      'browser.themesAria': 'Motivy Peak Browser',
      'browser.tabDark': 'Tmavý (Výchozí)',
      'browser.tabLight': 'Světlý',
      'browser.zoomAria': 'Zvětšit snímek Peak Browser',
      'browser.f1Title': 'Kompaktní lišta 78 px',
      'browser.f1Desc': 'Plynule napojená aktivní karta a přesouvání karet myší (drag & drop).',
      'browser.f2Title': 'Vestavěný Peak Shield',
      'browser.f2Desc': 'Blokování reklam a trackerů s počítadlem pro každou kartu.',
      'browser.f3Title': 'Chytrý adresní řádek',
      'browser.f3Desc': 'Zvýrazněná doména, návrhy z historie a rychlé kopírování URL.',
      'browser.f4Title': 'Plochý boční panel 324 px',
      'browser.f4Desc': 'Záložky, historie, stahování i nastavení bez zakrytí stránky.',
      'browser.f5Title': '3 motivy Modré Hory',
      'browser.f5Desc': 'Tmavý, Světlý a Modrý s alpskými tapetami na [0].',
      'browser.f6Title': '100% lokální soukromí',
      'browser.f6Desc': 'Bez účtů, bez telemetrie, volba vyhledávače a vymazání dat 1 kliknutím.',
      'browser.dlBtn': 'Stáhnout Peak Browser',
      'browser.dlMoreTitle': 'Další možnosti stažení Peak Browser',
      'browser.siteBtn': 'Web projektu',
      'launcher.num': 'PROJEKT 02',
      'launcher.cat': 'Minecraft launcher',
      'launcher.summary': 'Moderní launcher Minecraftu s motivem Hory PEAK a rozhraním [0]. Přes 925 verzí hry, katalog [1] s 1-klikovým [2] a automatickou instalací Javy (8/17/21/25) i [3].',
      'launcher.galleryCaption': 'Náhled Peak Launcher',
      'launcher.viewsAria': 'Pohledy Peak Launcher',
      'launcher.tabDark': 'Noční Vrchol',
      'launcher.tabLight': 'Ledovcový Den',
      'launcher.tabMods': 'Módy Modrinth',
      'launcher.tabJava': 'Java a Fabric',
      'launcher.zoomAria': 'Zvětšit snímek Peak Launcher',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'Polární záře, topografické linie, 5-krokový spouštěcí dock a 3D avatar.',
      'launcher.f2Title': '925+ verzí Minecraftu',
      'launcher.f2Desc': 'Oficiální verze Mojang od Alpha a Beta až po 26.3 a snapshoty.',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': 'Automatické závislosti (Fabric API), FPS balíček 1 klikem a Drag & Drop [0].',
      'launcher.f4Title': 'Auto-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': 'Automatická detekce a stažení oficiálních prostředí Eclipse Temurin.',
      'launcher.f5Title': 'Fabric Loader na 1 kliknutí',
      'launcher.f5Desc': 'Kompletní instalace zavaděče módů bez externích instalátorů.',
      'launcher.f6Title': 'Izolované expediční profily',
      'launcher.f6Desc': 'Oddělené složky [0], [1], světy a 4 barevné motivy.',
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
      'eco.lead': 'Obě aplikace sdílejí stejný standard kvality, zabezpečení i ucelenou estetiku Modré Hory.',
      'eco.colParam': 'Parametr ekosystému',
      'eco.row1Key': 'Operační systém',
      'eco.row2Key': 'Formát distribuce',
      'eco.row2Val': 'Instalátor NSIS + Portable (.exe)',
      'eco.row3Key': 'Vizuální systém',
      'eco.row3Browser': 'Motivy Modré Hory',
      'eco.row4Key': 'Klíčová funkce',
      'eco.row4Browser': 'Peak Shield a karty Drag & Drop',
      'eco.row4Launcher': 'Modrinth, Auto-Java a Auto-Fabric',
      'eco.row5Key': 'Kanál aktualizací',
      'eco.row6Key': 'Cena a telemetrie',
      'eco.row6Val': 'Zdarma · 0 telemetrie',
      'eco.labBadge': 'LABORATOŘ PEAK LABS · V PŘÍPRAVĚ',
      'eco.labTitle': 'Plán ekosystému pro 2026+',
      'eco.labLead': '[0] neustále rozvíjí oba hlavní produkty a testuje nové desktopové nástroje pro hráče a tvůrce na Windows.',
      'eco.road1Desc': 'Další optimalizace paměti RAM, rozšířené filtry Peak Shield a ještě svižnější karty.',
      'eco.road2Desc': 'Nové výkonnostní balíčky Modrinth, správa modpacků a telemetrie spuštění.',
      'eco.road3Title': 'Další nástroje PEAK LABS',
      'eco.road3Desc': 'Lehké systémové utility Summit Glass na adrese [0].',
      'releases.kicker': 'CENTRUM STAHOVÁNÍ · GITHUB RELEASES',
      'releases.title': 'Verze a seznam změn',
      'releases.lead': 'Přímé instalátory [0] a přenosné edice Portable obou produktů [1].',
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
      'creator.kicker': 'ZAKLADATEL A TVŮRCE PEAK LABS',
      'creator.role1': 'Zakladatel · PEAK LABS',
      'creator.role2': 'Desktop & Web Developer',
      'creator.role3': 'UI/UX Designer',
      'creator.bio': 'Navrhuje a vytváří od základů celý ekosystém [0] — od jádra launcheru Minecraftu s automatickou instalací Javy, Fabricu a integrací Modrinth přes architekturu [1], štít [2] až po jednotný styl [3].',
      'creator.githubBtn': 'Profil GitHub (latajoncy82-svg)',
      'creator.repoBtn': 'Repozitář PEAK LABS',
      'footer.about': 'Nezávislé softwarové studio tvořící čisté a rychlé aplikace pro Windows 10/11 v estetice Alpine Aurora & Summit Glass.',
      'footer.navTitle': 'Navigace',
      'footer.productsTitle': 'Produkty',
      'footer.launcherSite': 'Web Peak Launcher ↗',
      'footer.githubProfile': 'Profil latajoncy82-svg ↗',
      'footer.repoLabs': 'Repo PEAK LABS ↗',
      'footer.repoBrowser': 'Repo Peak Browser ↗',
      'footer.repoLauncher': 'Repo Peak Launcher ↗',
      'footer.copyright': '© 2026 PEAK LABS · Tvůrce: [0]',
      'footer.themeCredit': 'Motiv Alpine Aurora & Summit Glass',
      'lightbox.defaultCaption': 'Náhled obrazovky',
      'lightbox.prevAria': 'Předchozí snímek',
      'lightbox.nextAria': 'Další snímek',
      'lightbox.closeAria': 'Zavřít náhled',
      'stage.browserSummary': 'Čistý prohlížeč s Peak Shield a motivem Modré Hory.',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'Karty Drag & Drop',
      'stage.browserTag3': '0 telemetrie',
      'stage.launcherSummary': 'Minecraft launcher s Alpine Aurora, Modrinth a Auto-Javou.',
      'stage.launcherTag1': '925+ verzí MC',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java a Fabric',
      'stage.previewAltPrefix': 'Náhled',
      'shot.browserDark': 'Peak Browser — Tmavý motiv (Výchozí)',
      'shot.browserLight': 'Peak Browser — Světlý motiv',
      'shot.launcherDark': 'Peak Launcher — Noční Vrchol (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — Ledovcový Den',
      'shot.launcherMods': 'Peak Launcher — Katalog Modrinth a balíček FPS Boost',
      'shot.launcherJava': 'Peak Launcher — Centrum Java a Fabric'
    },

    ja: {
      'meta.title': 'PEAK LABS — ソフトウェアスタジオ | Peak Browser & Peak Launcher',
      'meta.description': 'PEAK LABSはMikołaj Grynienkoが設立した独立系ソフトウェアスタジオです。Windows向けの軽量で高速なアプリ「Peak Browser」と「Peak Launcher」を開発しています。',
      'meta.ogDescription': '独立系ソフトウェアスタジオ PEAK LABS (peaklabstudio.vercel.app) — Peak BrowserとPeak Launcherの開発元。制作者: Mikołaj Grynienko。',
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
      'hero.statusPill': '[0] · [1] · 制作者: [2]',
      'hero.tagline': 'デザインとパフォーマンスの頂点を極めた、高速でクリーンなWindowsアプリを。',
      'hero.lead': '独自の[0]エコシステムを開発する独立系ソフトウェアラボ。[2]保護機能を備えたミニマルな[1]、[4]カタログ・Auto-Java・[5]搭載のMinecraftランチャー[3]を提供しています。',
      'hero.ctaProjects': 'プロジェクトを見る',
      'hero.ctaReleases': 'ダウンロードセンター',
      'hero.stageAria': '製品プレビューを切り替え',
      'hero.zoomTitle': 'スクリーンショットを拡大',
      'hero.stageDownload': 'Setupをダウンロード',
      'hero.stageDetails': '詳細 ↓',
      'hero.stat1Label': '主力アプリ',
      'hero.stat1Sub': '[0] & [1]',
      'hero.stat2Label': 'Minecraftバージョン',
      'hero.stat2Sub': 'Alpha & Betaから26.3まで',
      'hero.stat3Label': 'テレメトリ・広告',
      'hero.stat3Sub': '100%ローカル保存・完全プライバシー',
      'hero.stat4Label': 'GitHubオープンソース',
      'about.kicker': '私たちについて · PEAK LABS',
      'about.title': '妥協のないソフトウェア開発。',
      'about.lead': '[0]は[1]が設立したポーランドの独立系ソフトウェアスタジオ兼ラボです。独自の[2]ビジュアル設計のもと、高速性・完全なユーザー制御・自動化・不要機能ゼロを追求したWindows 10/11向けネイティブアプリを開発しています。',
      'about.card1Title': '[0] デザイン',
      'about.card1Desc': '[0]のプロジェクトは視認性と一貫性を重視。標準のダークアルパイン配色、氷の縁取りのフロストガラス、60 FPSの滑らかなアニメーションを実現しています。',
      'about.card2Title': 'プライバシー＆テレメトリゼロ',
      'about.card2Desc': 'データ収集やアカウント強制、広告挿入は一切ありません。[0]がトラッカーを即座に遮断し、設定はすべてローカルに保存されます。',
      'about.card3Title': '完全な自動化',
      'about.card3Desc': 'Java 8/17/21/25（[0]）や[1]の自動導入から、ワンクリックの[2]、[3]連携アップデートまで自動化。',
      'about.card4Title': 'GitHubでオープンソース公開',
      'about.card4Desc': '[0]の主力アプリはすべて[1]（[2]）で公開。クリーンなNSISインストーラー（[3]）とインストール不要のPortable版を提供します。',
      'projects.kicker': 'プロジェクト · 主力アプリケーション',
      'projects.title': 'Windows向けの2つの洗練された製品',
      'projects.lead': 'プレビュータブの切り替え、フルスクリーン拡大、ワンクリックでのダウンロードが可能です。',
      'browser.num': 'PROJECT 01',
      'browser.cat': 'Webブラウザ',
      'browser.summary': 'Blue Mountainテーマを採用した軽量・高機能なブラウザ。[0]による広告・トラッカー遮断、ドラッグ＆ドロップ対応タブ、落ち着いた新規タブ画面を搭載。',
      'browser.galleryCaption': 'Peak Browser プレビュー',
      'browser.themesAria': 'Peak Browser テーマ',
      'browser.tabDark': 'ダーク（標準）',
      'browser.tabLight': 'ライト',
      'browser.zoomAria': 'Peak Browser スクリーンショットを拡大',
      'browser.f1Title': 'コンパクトな78 pxバー',
      'browser.f1Desc': 'ツールバーと一体化したアクティブタブとマウスでの並び替えに対応。',
      'browser.f2Title': 'Peak Shield内蔵',
      'browser.f2Desc': 'タブごとのブロック数カウンター付き広告・トラッカー防止機能。',
      'browser.f3Title': 'スマートアドレスバー',
      'browser.f3Desc': 'ドメイン強調表示、履歴候補、ホバーでのURLワンクリックコピー。',
      'browser.f4Title': 'フラットな324 pxサイドバー',
      'browser.f4Desc': 'ページを隠さずにブックマーク・履歴・ダウンロード・設定を操作。',
      'browser.f5Title': '3種類のBlue Mountainテーマ',
      'browser.f5Desc': 'ダーク・ライト・ブルーと[0]のアルパイン壁紙。',
      'browser.f6Title': '100%ローカルプライバシー',
      'browser.f6Desc': 'アカウント不要、テレメトリなし、検索エンジン選択と1クリック削除。',
      'browser.dlBtn': 'Peak Browserをダウンロード',
      'browser.dlMoreTitle': 'Peak Browserのその他のダウンロード',
      'browser.siteBtn': '製品サイト',
      'launcher.num': 'PROJECT 02',
      'launcher.cat': 'Minecraftランチャー',
      'launcher.summary': 'PEAK山脈テーマと[0] UIを備えた最新Minecraftランチャー。925以上のバージョン、[2]をワンクリック導入できる[1]カタログ、Java (8/17/21/25) と[3]の自動導入に対応。',
      'launcher.galleryCaption': 'Peak Launcher プレビュー',
      'launcher.viewsAria': 'Peak Launcher 表示切り替え',
      'launcher.tabDark': 'ナイトサミット',
      'launcher.tabLight': 'グレイシャルデイ',
      'launcher.tabMods': 'Modrinth Mod',
      'launcher.tabJava': 'Java & Fabric',
      'launcher.zoomAria': 'Peak Launcher スクリーンショットを拡大',
      'launcher.f1Title': 'Alpine Aurora & Summit Glass',
      'launcher.f1Desc': 'オーロラ背景、等高線、5段階起動ドック、3Dプレイヤーアバター。',
      'launcher.f2Title': '925+ Minecraftバージョン',
      'launcher.f2Desc': 'Alpha・Betaから26.3、最新スナップショットまで公式Mojang版を網羅。',
      'launcher.f3Title': 'Modrinth + Peak FPS Boost',
      'launcher.f3Desc': '依存関係自動取得（Fabric API）、1クリックFPSパック、[0]ドラッグ＆ドロップ。',
      'launcher.f4Title': 'Auto-Java 8 / 17 / 21 / 25',
      'launcher.f4Desc': '公式Eclipse Temurinランタイムを自動検出してダウンロード。',
      'launcher.f5Title': 'ワンクリックFabric Loader',
      'launcher.f5Desc': '外部インストーラー不要でModローダーとライブラリを導入。',
      'launcher.f6Title': '独立したプロファイル管理',
      'launcher.f6Desc': 'プロファイル別の[0]、[1]、ワールド保存と4つのカラーテーマ。',
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
      'eco.lead': '両アプリは同じ品質・セキュリティ基準と一貫したBlue Mountainデザインを共有しています。',
      'eco.colParam': 'エコシステム項目',
      'eco.row1Key': '対応OS',
      'eco.row2Key': '配布形式',
      'eco.row2Val': 'NSIS インストーラー + Portable (.exe)',
      'eco.row3Key': 'ビジュアルシステム',
      'eco.row3Browser': 'Blue Mountain テーマ',
      'eco.row4Key': '主な機能',
      'eco.row4Browser': 'Peak Shield & ドラッグ＆ドロップタブ',
      'eco.row4Launcher': 'Modrinth、Auto-Java & Auto-Fabric',
      'eco.row5Key': 'アップデート経路',
      'eco.row6Key': '価格・テレメトリ',
      'eco.row6Val': '無料 · テレメトリ 0',
      'eco.labBadge': 'PEAK LABS ラボ · 開発進行中',
      'eco.labTitle': '2026年以降のロードマップ',
      'eco.labLead': '[0]は主力2製品の継続的な進化とともに、Windowsユーザー向けの新しい軽量ユーティリティを開発しています。',
      'eco.road1Desc': 'さらなるRAM最適化、Peak Shieldフィルター拡充、より高速なタブ操作。',
      'eco.road2Desc': '新しいModrinth軽量化パック、Modpack管理、起動テレメトリ。',
      'eco.road3Title': '今後のPEAK LABSツール',
      'eco.road3Desc': '[0]で公開される軽量なSummit Glassシステムユーティリティ。',
      'releases.kicker': 'ダウンロードセンター · GITHUB RELEASES',
      'releases.title': 'リリース＆変更履歴',
      'releases.lead': '[1]の両製品の直接[0]インストーラーとポータブル版をダウンロードできます。',
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
      'creator.kicker': 'PEAK LABS 創設者・制作者',
      'creator.role1': '創設者 · PEAK LABS',
      'creator.role2': 'デスクトップ＆Web開発者',
      'creator.role3': 'UI/UXデザイナー',
      'creator.bio': 'Java・Fabric・Modrinth自動連携を備えたMinecraftランチャーのエンジンから、[1]の設計、[2]プライバシー保護、[3]ビジュアルシステムまで、[0]エコシステム全体をゼロから設計・開発しています。',
      'creator.githubBtn': 'GitHubプロフィール (latajoncy82-svg)',
      'creator.repoBtn': 'PEAK LABS リポジトリ',
      'footer.about': 'Alpine Aurora & Summit Glassの美学で、高速かつクリーンなWindows 10/11アプリを開発する独立系ソフトウェアスタジオ。',
      'footer.navTitle': 'ナビゲーション',
      'footer.productsTitle': '製品',
      'footer.launcherSite': 'Peak Launcher 公式サイト ↗',
      'footer.githubProfile': 'latajoncy82-svg プロフィール ↗',
      'footer.repoLabs': 'PEAK LABS リポジトリ ↗',
      'footer.repoBrowser': 'Peak Browser リポジトリ ↗',
      'footer.repoLauncher': 'Peak Launcher リポジトリ ↗',
      'footer.copyright': '© 2026 PEAK LABS · 制作者: [0]',
      'footer.themeCredit': 'Alpine Aurora & Summit Glass テーマ',
      'lightbox.defaultCaption': '画面プレビュー',
      'lightbox.prevAria': '前のスクリーンショット',
      'lightbox.nextAria': '次のスクリーンショット',
      'lightbox.closeAria': 'プレビューを閉じる',
      'stage.browserSummary': 'Peak ShieldとBlue Mountainテーマを備えたクリーンなブラウザ。',
      'stage.browserTag1': 'Peak Shield',
      'stage.browserTag2': 'ドラッグ＆ドロップタブ',
      'stage.browserTag3': 'テレメトリ 0',
      'stage.launcherSummary': 'Alpine Aurora、Modrinth、Auto-Java搭載のMinecraftランチャー。',
      'stage.launcherTag1': '925+ MCバージョン',
      'stage.launcherTag2': 'Modrinth + FPS Boost',
      'stage.launcherTag3': 'Auto-Java & Fabric',
      'stage.previewAltPrefix': 'プレビュー:',
      'shot.browserDark': 'Peak Browser — ダークテーマ（標準）',
      'shot.browserLight': 'Peak Browser — ライトテーマ',
      'shot.launcherDark': 'Peak Launcher — ナイトサミット (Alpine Aurora)',
      'shot.launcherLight': 'Peak Launcher — グレイシャルデイ',
      'shot.launcherMods': 'Peak Launcher — Modrinthカタログ & FPS Boostパック',
      'shot.launcherJava': 'Peak Launcher — Java & Fabricセンター'
    }
  };

  const RELEASE_I18N = {
    en: {
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
        body: '### What\'s new\n- **Initial Peak Browser release** for Windows 10 and Windows 11 (64-bit) with a dedicated installer and portable edition.\n- **Architectural UI**: compact `80 px` top bar, seamlessly connected active tab without heavy shadows, and clean address bar.\n- **Three Blue Mountain themes**: **Light**, **Blue**, and **Dark**, paired with minimalist alpine wallpapers on the New Tab page (`peak://newtab`).\n- **Peak Shield**: built-in ad and tracker blocking with a per-tab blocked request counter.\n- **Flat sidebar (`320 px`)**: bookmarks, browsing history, download manager, search engine selector (Google, DuckDuckGo, Bing, Brave Search), and one-click data clearing.\n- **Full keyboard shortcut support**: `Ctrl+T`, `Ctrl+W`, `Ctrl+Shift+T`, `Ctrl+L`, `Ctrl+F`, `Ctrl+D`, `Ctrl+H`, `Ctrl+J`, `Ctrl+Shift+B`, `F11`, `F12`.'
      },
      'launcher:v1.1.0': {
        name: 'Peak Launcher 1.1.0 — Alpine Aurora & Summit Glass GUI',
        body: '### Highlights in v1.1.0\n- **Live PEAK Mountain Atmosphere (Alpine Aurora)**: flowing northern lights, starfield, and snowfall on a lightweight parallax canvas with cursor spotlight card glow (`spotlight`).\n- **New Summit Cockpit & Floating Dock**: topographic contour lines, mountain peak panorama window, mod preview bar with **FPS Boost (1 click)**, 5-stage launch indicator, and player head avatar.\n- **Expedition Profile Customization**: 4 profile color themes (*Summit*, *Glacier*, *Ridge*, *Aurora*) plus a quick `▶ Play` button directly on profile cards.\n- **Enhanced Mods, Versions & Console**: Modrinth category tags, version type pills, and clear RAM & Java telemetry in the sidebar.'
      },
      'launcher:v1.0.0': {
        name: 'Peak Launcher 1.0.0 — First Mountain Summit Release',
        body: '### Key Features in v1.0.0\n- **PEAK Mountain Theme (Night Summit & Glacial Day)**: cohesive alpine interface with mountain panoramas and layered ridge silhouettes.\n- **All Minecraft Versions**: complete Mojang catalog (`925+` releases from Alpha and Beta to `26.3` and the latest snapshots) with isolated profiles.\n- **Easy Mod Management**: built-in Modrinth catalog with automatic dependency resolution (`Fabric API`), one-click **Peak FPS Boost Pack**, and convenient `.jar` **Drag & Drop**.\n- **Automatic Java (8 / 17 / 21 / 25) & Fabric Loader Installer**: automatically detects the required Java runtime for your Minecraft version and downloads official Eclipse Temurin and Fabric packages.'
      }
    },
    pl: {
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
        body: '### Co się zmieniło\n- **Pierwsze wydanie Peak Browser** na Windows 10 i Windows 11 (64-bit) z dedykowanym instalatorem oraz wersją portable.\n- **Architektoniczny interfejs**: zwarty górny pasek `80 px`, połączona aktywna karta bez ciężkich cieni oraz czytelny pasek adresu.\n- **Trzy motywy Niebieskiej Góry**: **Jasny**, **Niebieski** oraz **Ciemny** wraz z minimalistycznymi tapetami alpejskimi na stronie nowej karty (`peak://newtab`).\n- **Peak Shield**: wbudowane blokowanie reklam i popularnych trackerów z licznikiem zablokowanych żądań dla każdej karty.\n- **Płaski panel boczny (`320 px`)**: zakładki, historia przeglądania, menedżer pobrań, wybór wyszukiwarki (Google, DuckDuckGo, Bing, Brave Search) oraz czyszczenie danych jednym kliknięciem.\n- **Pełna obsługa skrótów klawiszowych**: `Ctrl+T`, `Ctrl+W`, `Ctrl+Shift+T`, `Ctrl+L`, `Ctrl+F`, `Ctrl+D`, `Ctrl+H`, `Ctrl+J`, `Ctrl+Shift+B`, `F11`, `F12`.'
      },
      'launcher:v1.1.0': {
        name: 'Peak Launcher 1.1.0 — Alpine Aurora & Summit Glass GUI',
        body: '### Najważniejsze nowości w wersji 1.1.0\n- **Żywa atmosfera Góry PEAK (Alpine Aurora)**: płynąca zorza polarna, gwiazdozbiór i śnieg na lekkim płótnie z paralaksą oraz podświetlenie kart pod kursorem (`spotlight`).\n- **Nowy kokpit Szczytu i pływający dock**: kontury topograficzne, okno panoramy szczytu, pasek podglądu modów z przyciskiem **Boost FPS (1 klik)**, 5-etapowy wskaźnik startu oraz awatar głowy gracza.\n- **Personalizacja profili ekspedycji**: 4 motywy kolorystyczne profili (*Szczyt*, *Lodowiec*, *Grań*, *Zorza*) oraz szybki przycisk `▶ Graj` bezpośrednio na kartach.\n- **Ulepszone Mody, Wersje i Konsola**: tagi kategorii modów Modrinth, pigułki typów wersji oraz czytelna telemetria RAM i Javy w panelu bocznym.'
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

  function maskBrandTerms(text) {
    let out = String(text || '');
    for (let i = 0; i < PROTECTED_BRAND_TERMS.length; i++) {
      const term = PROTECTED_BRAND_TERMS[i];
      if (out.includes(term)) {
        out = out.split(term).join(`[80${String(i).padStart(2, '0')}]`);
      }
    }
    return out;
  }

  function unmaskBrandTerms(text) {
    return String(text || '').replace(/[\[【]\s*80(\d{2})\s*[\]】]/g, (full, idxStr) => {
      const idx = Number(idxStr);
      return idx >= 0 && idx < PROTECTED_BRAND_TERMS.length ? PROTECTED_BRAND_TERMS[idx] : full;
    });
  }

  async function requestTranslations(texts, source, target) {
    if (!Array.isArray(texts) || texts.length === 0) return [];
    if (source !== 'auto' && source.toLowerCase() === target.toLowerCase()) {
      return texts.slice();
    }

    const maskedTexts = texts.map(maskBrandTerms);

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
            return json.translations.map(unmaskBrandTerms);
          }
        }
      } catch {
        // Fall back to direct browser translation below
      } finally {
        clearTimeout(timer);
      }
    }

    const fallbackResults = await translateInBrowserFallback(maskedTexts, source, target);
    return fallbackResults.map(unmaskBrandTerms);
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

    // Apply English layout immediately while translating in background
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
