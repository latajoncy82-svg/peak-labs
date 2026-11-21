# PEAK LABS

Official website of **PEAK LABS** — an independent software studio and laboratory building clean, fast, privacy-first Windows 10/11 desktop applications in the **Alpine Aurora & Summit Glass** aesthetic.

- **Founder & Creator:** Mikołaj Grynienko
- **Live Website (Vercel):** [`https://peaklabstudio.vercel.app`](https://peaklabstudio.vercel.app)
- **GitHub Pages Mirror:** [`https://latajoncy82-svg.github.io/peak-labs/`](https://latajoncy82-svg.github.io/peak-labs/)

## Flagship Projects

| Project | Category | Description | Repository | Releases |
| --- | --- | --- | --- | --- |
| **Peak Browser** | Windows Web Browser | Lightweight browser featuring the Blue Mountain theme, built-in **Peak Shield** ad/tracker blocking, 78 px top bar, and drag & drop tabs. | [latajoncy82-svg/peak-browser](https://github.com/latajoncy82-svg/peak-browser) | [Releases](https://github.com/latajoncy82-svg/peak-browser/releases) |
| **Peak Launcher** | Minecraft Launcher | Modern Minecraft launcher with **Alpine Aurora** GUI, 925+ game versions, Modrinth catalog, 1-click Peak FPS Boost, and automatic Java (8/17/21/25) & Fabric installation. | [latajoncy82-svg/peak-launcher](https://github.com/latajoncy82-svg/peak-launcher) | [Releases](https://github.com/latajoncy82-svg/peak-launcher/releases) |

## Multi-Language Support & Auto-Translation

English (`en`) is the base language of the site. Automatic browser language detection and a built-in language switcher support all visitors:

- **10 Instant Built-in Languages:** English (`en`), Polish (`pl`), German (`de`), Spanish (`es`), French (`fr`), Ukrainian (`uk`), Italian (`it`), Portuguese (`pt`), Czech (`cs`), and Japanese (`ja`).
- **Automatic Translation (`/api/translate`):** Serverless translation endpoint on Vercel (with `localStorage` caching and browser fallback) automatically translates the entire UI and GitHub release notes into any other detected or selected language (e.g. Swedish, Dutch, Turkish, Korean, Chinese, Arabic with RTL layout, etc.) while protecting brand names (`PEAK LABS`, `Peak Browser`, `Peak Launcher`, `Mikołaj Grynienko`, `peaklabstudio.vercel.app`).

## Project Structure

- `index.html`, `styles.css`, `fx.js`, `i18n.js`, `app.js` — responsive static site with dark (default) and light themes, Aurora canvas, interactive 3D Hero stage, project galleries, Lightbox, and multi-language engine.
- `api/releases.js` — Vercel Serverless Function fetching synchronized releases from both GitHub repositories with `s-maxage=120` caching and offline fallback.
- `api/translate.js` — Vercel Serverless Function performing batched automatic translation with numeric marker safety, process cache, and provider fallback.
- `data/releases.json` — localized English/Polish release catalog fallback.
- `assets/` — **PEAK LABS** vector logo (`peaklabs-logo.svg`), app icons, alpine wallpapers, and screenshots.
- `vercel.json` — security headers, asset caching, and `cleanUrls`.
