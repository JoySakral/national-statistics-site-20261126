# national-statistics-site-20261126

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/JoySakral/national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/JoySakral/national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat — a working national statistics site for Indonesia: population, economy, trade, regions, labour and prices, with real figures, sources and years, charts drawn in plain canvas, and sortable, searchable tables. Static files only; works offline in a desktop browser and on a phone.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. No build step, no network requests: every file the site loads lives under `app/`.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library.

## What is inside

- `app/index.html` — the page shell: header, search, section navigation, footer.
- `app/style.css` — the original NusaStat design (deep teal, amber, paper white) with a phone layout.
- `app/data.js` — the figures: headline indicators, 2015–2024 series, all 38 provinces, trade partners, releases.
- `app/charts.js` — small canvas chart helpers (line, bar, horizontal bar, grouped bar), written for this site.
- `app/views.js` — one render function per section (Overview, Population, Economy, Trade, Regions, Labour, Prices).
- `app/main.js` — hash router, header search, economy year tabs, and the sortable/filterable province table.
- `screenshots/` — real renders of the site in Chromium (desktop and phone sizes). The cover is the overview at desktop size; the fourth shot is the same page at phone size (390 × 844).

## Notes for readers

- The province table sorts by clicking any column heading, filters by island chip, and searches by name.
- The economy page has tabs for 2022, 2023 and 2024 that swap the headline KPI cards.
- The header search matches indicator names (try "inflasi", "ekspor" or "Jawa Barat") and jumps to the matching section.

## Sources

Every figure on the site names its source and year: Badan Pusat Statistik (BPS), Kementerian Keuangan, and Bank Indonesia. The design, text and charts are original NusaStat work.

---

<sub>Entered on [make.fun](https://make.fun/?ref=tvfbjxfd&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
