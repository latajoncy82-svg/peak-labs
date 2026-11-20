# PEAK LABS

Oficjalna strona studia oprogramowania **PEAK LABS** — niezależnego laboratorium software'owego tworzącego czyste, szybkie i prywatne aplikacje desktopowe na Windows 10/11 w autorskiej estetyce **Alpine Aurora & Summit Glass**.

- **Twórca i założyciel:** Mikołaj Grynienko
- **Adres docelowy:** `https://peaklabstudio.vercel.app`
- **Podgląd GitHub Pages:** `https://latajoncy82-svg.github.io/peak-labs/`

## Nasze flagowe projekty

| Projekt | Kategoria | Opis | Repozytorium | Wydania |
| --- | --- | --- | --- | --- |
| **Peak Browser** | Przeglądarka na Windows | Lekka przeglądarka z motywem Niebieskiej Góry, wbudowaną tarczą **Peak Shield**, paskiem 78 px i kartami drag & drop. | [latajoncy82-svg/peak-browser](https://github.com/latajoncy82-svg/peak-browser) | [Releases](https://github.com/latajoncy82-svg/peak-browser/releases) |
| **Peak Launcher** | Launcher Minecraft | Nowoczesny launcher Minecraft z motywem Góry PEAK (**Alpine Aurora**), ponad 925 wersjami gry, katalogiem Modrinth, Pakietem FPS Boost oraz Auto-Javą i Fabriciem. | [latajoncy82-svg/peak-launcher](https://github.com/latajoncy82-svg/peak-launcher) | [Releases](https://github.com/latajoncy82-svg/peak-launcher/releases) |

## Struktura projektu

- `index.html`, `styles.css`, `fx.js`, `app.js` — responsywna strona statyczna w ciemnym (domyślnym) i jasnym motywie z płótnem Aurora, sceną 3D, galerią projektów i Lightboxem.
- `api/releases.js` — funkcja serverless dla Vercel synchronizująca wydania obu produktów bezpośrednio z GitHub Releases API z cache (`s-maxage=120`) i lokalnym fallbackiem.
- `data/releases.json` — zsynchronizowana baza wydań offline / fallback dla obu aplikacji.
- `assets/` — logo **PEAK LABS** (`peaklabs-logo.svg`), ikony produktów, tapety alpejskie oraz autentyczne zrzuty ekranu.
- `vercel.json` — konfiguracja nagłówków bezpieczeństwa, cache zasobów oraz `cleanUrls`.

## Wdrożenie na Vercel

Projekt jest gotowy do uruchomienia na Vercel bez etapu budowania (statyczny frontend + Serverless Function `/api/releases`):

1. Zaloguj się w [vercel.com/new](https://vercel.com/new) kontem GitHub.
2. Zaimportuj repozytorium `latajoncy82-svg/peak-labs`.
3. Pozostaw `Framework Preset: Other` oraz `Output Directory` puste (katalog główny `.`).
4. Kliknij **Deploy**.
