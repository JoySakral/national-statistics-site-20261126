// main.js — router and page wiring for NusaStat. Hash routes, no framework:
// #/ overview, #/population, #/economy, #/trade, #/regions, #/labour, #/prices.
import { drawAllCharts } from './charts.js';
import {
  viewOverview, viewPopulation, viewEconomy, viewTrade,
  viewRegions, viewLabour, viewPrices,
} from './views.js';
import { PROVINCES, INDICATORS, GDP_GROWTH, GDP_NOMINAL, fmt } from './data.js';

const app = document.getElementById('app');
const nav = document.getElementById('main-nav');

const ROUTES = {
  overview: { title: 'Indonesia dalam angka', render: viewOverview },
  population: { title: 'Penduduk', render: viewPopulation },
  economy: { title: 'Ekonomi', render: viewEconomy },
  trade: { title: 'Perdagangan luar negeri', render: viewTrade },
  regions: { title: 'Wilayah — 38 provinsi', render: viewRegions },
  labour: { title: 'Tenaga kerja', render: viewLabour },
  prices: { title: 'Harga dan inflasi', render: viewPrices },
};

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, '').split('/')[0];
  return ROUTES[hash] ? hash : 'overview';
}

function render() {
  const key = currentRoute();
  const route = ROUTES[key];
  app.innerHTML = route.render();
  document.title = `${route.title} — NusaStat`;
  nav.querySelectorAll('a').forEach((a) => a.classList.toggle('active', a.dataset.route === key));
  drawAllCharts();
  if (key === 'economy') wireYearTabs();
  if (key === 'regions') wireProvinceTable();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
window.addEventListener('resize', () => drawAllCharts());
render();

// --- Economy: year tabs swap the KPI cards for 2022 / 2023 / 2024 ---
const YEAR_DATA = {
  2022: { gdp: 'Rp19.589 T', growth: '5,31%', gdpPc: 'Rp71,0 jt', infl: '5,51%', unemp: '5,86%', note: 'Pemulihan pasca-pandemi; harga komoditas tinggi.' },
  2023: { gdp: 'Rp20.951 T', growth: '5,05%', gdpPc: 'Rp75,5 jt', infl: '2,61%', unemp: '5,32%', note: 'Konsumsi rumah tangga kuat; ekspor melambat.' },
  2024: { gdp: 'Rp22.139 T', growth: '5,03%', gdpPc: 'Rp78,6 jt', infl: '1,57%', unemp: '4,91%', note: 'Stabil: konsumsi, investasi, dan hilirisasi.' },
};

function wireYearTabs() {
  const kpis = document.getElementById('year-kpis');
  const paint = (year) => {
    const d = YEAR_DATA[year];
    kpis.innerHTML = `
      <div class="kpi"><div class="k-label">PDB nominal ${year}</div><div class="k-value">${d.gdp}</div><div class="k-sub">Harga berlaku · BPS</div></div>
      <div class="kpi"><div class="k-label">Pertumbuhan ${year}</div><div class="k-value">${d.growth}</div><div class="k-sub">PDB riil y-on-y · BPS</div></div>
      <div class="kpi"><div class="k-label">PDB per kapita ${year}</div><div class="k-value">${d.gdpPc}</div><div class="k-sub">BPS</div></div>
      <div class="kpi"><div class="k-label">Inflasi ${year}</div><div class="k-value">${d.infl}</div><div class="k-sub">Des y-on-y · BPS</div></div>`;
    document.querySelectorAll('.tab[data-year]').forEach((t) => {
      const on = Number(t.dataset.year) === year;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', String(on));
    });
    const note = document.getElementById('year-note');
    if (note) note.textContent = d.note;
  };
  document.querySelectorAll('.tab[data-year]').forEach((t) =>
    t.addEventListener('click', () => paint(Number(t.dataset.year))));
  const card = kpis.closest('main').querySelector('.page-head p');
  if (card && !document.getElementById('year-note')) {
    const p = document.createElement('p');
    p.id = 'year-note';
    p.className = 'source-note';
    card.after(p);
  }
  paint(2024);
}

// --- Regions: searchable, sortable, filterable province table ---
function wireProvinceTable() {
  const body = document.getElementById('prov-body');
  const count = document.getElementById('prov-count');
  const search = document.getElementById('prov-search');
  let sortKey = 'pop';
  let sortDir = -1;
  let island = 'Semua';
  let query = '';

  const rows = () => {
    let list = PROVINCES.map((p) => ({ ...p, density: Math.round((p.pop * 1e6) / p.area) }));
    if (island !== 'Semua') list = list.filter((p) => p.island === island);
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query));
    list.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      return (typeof va === 'string' ? va.localeCompare(vb, 'id') : va - vb) * sortDir;
    });
    return list;
  };

  const paint = () => {
    const list = rows();
    body.innerHTML = list.map((p) => `<tr>
      <td>${p.name}</td><td>${p.island}</td>
      <td class="num">${fmt(p.pop, 2)}</td>
      <td class="num">${p.area.toLocaleString('id-ID')}</td>
      <td class="num">${p.density.toLocaleString('id-ID')}</td>
      <td class="num">${fmt(p.gdpPc, 1)}</td>
      <td class="num">${fmt(p.unemp, 1)}</td>
    </tr>`).join('') || '<tr><td colspan="7">Tidak ada provinsi yang cocok.</td></tr>';
    count.textContent = `Menampilkan ${list.length} dari 38 provinsi · klik judul kolom untuk mengurutkan.`;
  };

  document.querySelectorAll('#prov-table th button').forEach((btn) =>
    btn.addEventListener('click', () => {
      const k = btn.dataset.sort;
      if (sortKey === k) sortDir *= -1;
      else { sortKey = k; sortDir = k === 'name' || k === 'island' ? 1 : -1; }
      paint();
    }));
  document.querySelectorAll('#island-chips .chip').forEach((chip) =>
    chip.addEventListener('click', () => {
      island = chip.dataset.island;
      document.querySelectorAll('#island-chips .chip').forEach((c) => c.classList.toggle('on', c === chip));
      paint();
    }));
  search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); paint(); });
  paint();
}

// --- Header search: matches indicator names, shows a result list above the page ---
const searchInput = document.getElementById('global-search');
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  document.querySelector('.search-results')?.remove();
  if (q.length < 2) return;
  const hits = INDICATORS.filter((i) => i.term.toLowerCase().includes(q)).slice(0, 6);
  const box = document.createElement('div');
  box.className = 'search-results';
  box.innerHTML = hits.length
    ? `<ul class="fact-list">${hits.map((h) => `<li><a href="${h.route}">${h.term}</a><b>${h.value}</b></li>`).join('')}</ul>`
    : '<p>Tidak ada indikator yang cocok. Coba “inflasi”, “ekspor”, atau “Jawa Barat”.</p>';
  app.prepend(box);
});
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const first = document.querySelector('.search-results a');
    if (first) location.hash = first.getAttribute('href');
  }
});
