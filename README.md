# PEAK LABS

Official website of **PEAK LABS** — an independent software studio and laboratory founded by **Mikołaj Grynienko**, designing minimalist, high-performance Windows 10/11 desktop applications in the **Peak Cinema Luxury** aesthetic.

- **Founder & Creator:** Mikołaj Grynienko
- **Live Website (Vercel):** [`https://peaklabstudio.vercel.app`](https://peaklabstudio.vercel.app)
- **GitHub Pages Mirror:** [`https://latajoncy82-svg.github.io/peak-labs/`](https://latajoncy82-svg.github.io/peak-labs/)

## Flagship Projects

| Project | Latest | Category | Highlights | Repository |
| --- | --- | --- | --- | --- |
| **Peak Browser** | `v1.2.1` | Windows Web Browser | Full `@ghostery/adblocker` **Peak Shield (`148,604` rules)** + YouTube ad stripping, `HTTPS-First` & URL tracker stripping, two-column `peak://settings`, Blue Mountain themes, and direct `PEAK LABS` launch tab (`#o-firmie`). | [latajoncy82-svg/peak-browser](https://github.com/latajoncy82-svg/peak-browser) |
| **Peak Launcher** | `v1.5.1` | Minecraft Launcher | **Peak Cinema** GUI, self-hosted **`.peak` servers** locally & via public tunnel (`<address>.peak` + Java DNS SPI), **3D Skin Studio (WebGL)** with in-game Yggdrasil (`authlib-injector v1.2.8`), **Modrinth Pro**, 925+ versions, and automatic Java (8/17/21/25) & Fabric setup. | [latajoncy82-svg/peak-launcher](https://github.com/latajoncy82-svg/peak-launcher) |

## Multi-Language Support & Auto-Translation

English (`en`) is the base language of the site. Automatic browser language detection and a built-in language switcher support visitors worldwide:

- **10 Instant Built-in Languages:** English (`en`), Polish (`pl`), German (`de`), Spanish (`es`), French (`fr`), Ukrainian (`uk`), Italian (`it`), Portuguese (`pt`), Czech (`cs`), and Japanese (`ja`).
- **Automatic Translation (`/api/translate`):** Serverless translation endpoint on Vercel (with `localStorage` caching `-v3:` and client-side fallback) translates the entire UI and GitHub release notes into any other detected or selected language (including RTL support for Arabic, Hebrew, Persian, and Urdu) while protecting brand names (`PEAK LABS`, `Peak Browser`, `Peak Launcher`, `Peak Shield`, `Mikołaj Grynienko`, `peaklabstudio.vercel.app`, `.peak`).

## Project Structure

- `index.html`, `styles.css`, `fx.js`, `i18n.js`, `app.js` — **Peak Cinema Luxury** responsive interface with Obsidian dark (default) and Glacial light themes, silk Aurora canvas, 5-tab interactive Hero showcase stage, 9-slide screenshot galleries & Lightbox, collapsible 15-release Download Center, and multi-language engine.
- `api/releases.js` — Vercel Serverless Function fetching synchronized releases from both GitHub repositories (`per_page=30`) with `s-maxage=120` caching and local fallback.
- `api/translate.js` — Vercel Serverless Function performing batched automatic translation with numeric marker protection, process cache, and provider fallback.
- `data/releases.json` — localized English/Polish catalog fallback covering all 15 releases (`5` Peak Browser + `10` Peak Launcher).
- `assets/` — **PEAK LABS** vector logo (`peaklabs-logo.svg`), app icons, alpine wallpapers, and updated `Peak Browser` (`webp`) & `Peak Launcher` (`png`) screenshots.
- `vercel.json` — security headers, asset caching, and `cleanUrls`.
