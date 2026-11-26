// views.js — renders each section of NusaStat into #app from data.js.
// Every figure is shown with its source and year.
import {
  YEARS, GDP_GROWTH, INFLATION, GDP_NOMINAL, EXPORTS, IMPORTS, UNEMPLOYMENT,
  POVERTY, AGE_GROUPS, GDP_SECTORS, EMPLOYMENT_SECTORS, CPI_COMPONENTS,
  TOP_EXPORTS, TRADE_PARTNERS, PROVINCES, RELEASES, fmt,
} from './data.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function kpi(label, value, sub, delta = '') {
  return `<div class="kpi"><div class="k-label">${label}</div><div class="k-value">${value}</div><div class="k-sub">${sub}</div>${delta ? `<div class="k-delta">${delta}</div>` : ''}</div>`;
}

function chartCanvas(kind, labels, values, opts = {}, extra = '') {
  return `<canvas class="chart${opts.tall ? ' tall' : ''}" data-chart="${kind}" data-labels='${JSON.stringify(labels)}' data-values='${JSON.stringify(values)}' data-opts='${JSON.stringify(opts)}' ${extra}></canvas>`;
}

function sourceLine(text) {
  return `<p class="source-note">Sumber: ${text}</p>`;
}

function releaseList() {
  return RELEASES.map((r) => `
    <article class="release">
      <div class="r-date">${esc(r.date)}</div>
      <div><h4><a href="${r.route}">${esc(r.title)}</a></h4><p>${esc(r.text)}</p></div>
    </article>`).join('');
}

export function viewOverview() {
  const totalPop = PROVINCES.reduce((s, p) => s + p.pop, 0);
  return `
  <div class="page-head">
    <h1>Indonesia dalam angka</h1>
    <p>Statistik resmi Indonesia: penduduk, ekonomi, perdagangan, wilayah, tenaga kerja, dan harga — dengan sumber dan tahun untuk setiap angka.</p>
  </div>
  <section class="kpis" aria-label="Indikator utama">
    ${kpi('Penduduk', '281,60 jt', 'Pertengahan 2024 · BPS', '<span class="up">▲ 0,90% / tahun</span>')}
    ${kpi('PDB', 'Rp22.139 T', 'Nominal 2024 · BPS', '<span class="up">▲ 5,03% riil</span>')}
    ${kpi('Inflasi', '1,57%', 'Des 2024 y-on-y · BPS', '<span class="down">▼ dari 2,61% (2023)</span>')}
    ${kpi('Pengangguran', '4,91%', 'Agustus 2024 · BPS', '<span class="down">▼ dari 5,32% (2023)</span>')}
  </section>
  <div class="grid2">
    <section class="card">
      <h3>Pertumbuhan ekonomi, 2015–2024</h3>
      <p class="card-sub">PDB harga konstan, % per tahun</p>
      ${chartCanvas('line', YEARS, GDP_GROWTH, { decimals: 2 })}
      ${sourceLine('Badan Pusat Statistik (BPS), Berita Resmi Statistik, Februari 2025.')}
    </section>
    <section class="card">
      <h3>Penduduk menurut kelompok umur, 2024</h3>
      <p class="card-sub">Juta jiwa · total ${fmt(totalPop, 1)} juta</p>
      ${chartCanvas('hbar', AGE_GROUPS.map((a) => a.label), AGE_GROUPS.map((a) => a.value), { decimals: 1 })}
      ${sourceLine('BPS, Proyeksi Penduduk Indonesia 2020–2050.')}
    </section>
  </div>
  <div class="grid2">
    <section class="card">
      <h3>Rilis terbaru</h3>
      ${releaseList()}
    </section>
    <section class="card">
      <h3>Fakta singkat</h3>
      <ul class="fact-list">
        <li><span>Ibu kota</span><b>Jakarta</b></li>
        <li><span>Luas daratan</span><b>1.916.907 km²</b></li>
        <li><span>Jumlah pulau</span><b>17.504</b></li>
        <li><span>Provinsi</span><b>38</b></li>
        <li><span>Kabupaten / kota</span><b>514</b></li>
        <li><span>PDB per kapita 2024</span><b>Rp78,6 juta</b></li>
        <li><span>Ekspor 2024</span><b>US$264,7 miliar</b></li>
        <li><span>Surplus perdagangan 2024</span><b>US$31,0 miliar</b></li>
        <li><span>Angkatan kerja</span><b>153,1 juta orang</b></li>
        <li><span>Tingkat kemiskinan</span><b>9,03% (Mar 2024)</b></li>
      </ul>
      ${sourceLine('BPS, Statistik Indonesia 2025; Kementerian Dalam Negeri.')}
    </section>
  </div>`;
}

export function viewPopulation() {
  const total = PROVINCES.reduce((s, p) => s + p.pop, 0);
  const java = PROVINCES.filter((p) => p.island === 'Jawa').reduce((s, p) => s + p.pop, 0);
  const rows = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `
  <div class="page-head">
    <h1>Penduduk</h1>
    <p>Jumlah, sebaran, dan struktur umur penduduk Indonesia. ${fmt(total, 1)} juta jiwa pada pertengahan 2024; ${(100 * java / total).toFixed(1)}% tinggal di Pulau Jawa.</p>
  </div>
  <section class="kpis">
    ${kpi('Penduduk 2024', fmt(total, 1) + ' jt', 'Pertengahan 2024 · BPS')}
    ${kpi('Laju tumbuh', '0,90%', 'Per tahun 2020–2024 · BPS')}
    ${kpi('Kepadatan', '147 /km²', 'Penduduk per km² daratan')}
    ${kpi('Usia median', '31,1 th', 'BPS, Sensus Penduduk 2020')}
  </section>
  <div class="grid2">
    <section class="card">
      <h3>Struktur umur, 2024</h3>
      <p class="card-sub">Juta jiwa per kelompok umur</p>
      ${chartCanvas('hbar', AGE_GROUPS.map((a) => a.label), AGE_GROUPS.map((a) => a.value), { decimals: 1 })}
      ${sourceLine('BPS, Proyeksi Penduduk 2020–2050.')}
    </section>
    <section class="card">
      <h3>10 provinsi terpadat, 2024</h3>
      <p class="card-sub">Juta jiwa</p>
      ${chartCanvas('hbar', rows.map((p) => p.name), rows.map((p) => p.pop), { decimals: 1 })}
      ${sourceLine('BPS, Estimasi Penduduk Pertengahan Tahun 2024.')}
    </section>
  </div>
  <section class="card">
    <h3>Bonus demografi</h3>
    <p>Sebanyak 68,8% penduduk Indonesia berada pada usia produktif (15–64 tahun) pada 2024. Rasio ketergantungan turun menjadi 45,3 — setiap 100 orang usia produktif menanggung 45 orang usia non-produktif, terendah dalam sejarah Indonesia. Jendela bonus demografi ini diperkirakan berlangsung hingga sekitar 2035.</p>
    ${sourceLine('BPS, Proyeksi Penduduk Indonesia 2020–2050.')}
  </section>`;
}

export function viewEconomy() {
  return `
  <div class="page-head">
    <h1>Ekonomi</h1>
    <p>Produk domestik bruto, pertumbuhan, dan struktur ekonomi Indonesia 2015–2024.</p>
  </div>
  <div class="tabs" role="tablist" aria-label="Pilih tahun">
    ${[2022, 2023, 2024].map((y) => `<button class="tab${y === 2024 ? ' on' : ''}" data-year="${y}" role="tab" aria-selected="${y === 2024}">${y}</button>`).join('')}
  </div>
  <section class="kpis" id="year-kpis"></section>
  <div class="grid2">
    <section class="card">
      <h3>Pertumbuhan PDB riil, 2015–2024</h3>
      <p class="card-sub">% per tahun, harga konstan 2010</p>
      ${chartCanvas('line', YEARS, GDP_GROWTH, { decimals: 2 })}
      ${sourceLine('BPS, PDB Indonesia Triwulanan dan Tahunan.')}
    </section>
    <section class="card">
      <h3>PDB nominal, 2015–2024</h3>
      <p class="card-sub">Triliun rupiah, harga berlaku</p>
      ${chartCanvas('bar', YEARS, GDP_NOMINAL, { decimals: 0 })}
      ${sourceLine('BPS, PDB Indonesia Tahunan.')}
    </section>
  </div>
  <section class="card">
    <h3>Struktur PDB menurut lapangan usaha, 2024</h3>
    <p class="card-sub">% terhadap PDB</p>
    ${chartCanvas('hbar', GDP_SECTORS.map((s) => s.label), GDP_SECTORS.map((s) => s.value), { decimals: 1, tall: true })}
    <div class="callout"><strong>Industri pengolahan</strong> tetap menjadi penyumbang terbesar PDB (18,9%), diikuti perdagangan (13,0%) dan pertanian (12,5%).</div>
    ${sourceLine('BPS, PDB menurut Lapangan Usaha 2024.')}
  </section>`;
}

export function viewTrade() {
  const surplus = EXPORTS.map((e, i) => +(e - IMPORTS[i]).toFixed(1));
  return `
  <div class="page-head">
    <h1>Perdagangan luar negeri</h1>
    <p>Ekspor, impor, dan neraca perdagangan barang Indonesia. Surplus beruntun sejak 2020.</p>
  </div>
  <section class="kpis">
    ${kpi('Ekspor 2024', 'US$264,7 M', 'BPS, Statistik Ekspor 2024', '<span class="up">▲ 2,3% dari 2023</span>')}
    ${kpi('Impor 2024', 'US$233,7 M', 'BPS, Statistik Impor 2024', '<span class="up">▲ 5,3% dari 2023</span>')}
    ${kpi('Surplus 2024', 'US$31,0 M', 'Neraca perdagangan barang')}
    ${kpi('Ekspor nonmigas', '93,5%', 'Pangsa ekspor nonmigas 2024')}
  </section>
  <section class="card">
    <h3>Ekspor vs impor, 2015–2024</h3>
    <p class="card-sub">Miliar USD · hijau = ekspor, kuning = impor</p>
    ${chartCanvas('grouped', YEARS, EXPORTS, IMPORTS, { decimals: 0 }, `data-values-b='${JSON.stringify(IMPORTS)}'`)}
    <div class="legend"><span><i style="background:#0e7c7b"></i>Ekspor</span><span><i style="background:#e8a317"></i>Impor</span></div>
    ${sourceLine('BPS / Bank Indonesia, Neraca Pembayaran Indonesia.')}
  </section>
  <div class="grid2">
    <section class="card">
      <h3>Komoditas ekspor utama, 2024</h3>
      <p class="card-sub">Miliar USD</p>
      ${chartCanvas('hbar', TOP_EXPORTS.slice(0, 8).map((c) => c.label), TOP_EXPORTS.slice(0, 8).map((c) => c.value), { decimals: 1, tall: true })}
      ${sourceLine('BPS, Statistik Ekspor 2024 (HS 2 digit, agregat).')}
    </section>
    <section class="card">
      <h3>Mitra dagang utama, 2024</h3>
      <p class="card-sub">Total perdagangan (ekspor + impor), miliar USD</p>
      <div class="table-scroll"><table class="data">
        <thead><tr><th>Negara</th><th>Ekspor</th><th>Impor</th><th>Total</th></tr></thead>
        <tbody>
          ${TRADE_PARTNERS.map((t) => `<tr><td>${esc(t.label)}</td><td class="num">${fmt(t.exports, 1)}</td><td class="num">${fmt(t.imports, 1)}</td><td class="num"><strong>${fmt(t.exports + t.imports, 1)}</strong></td></tr>`).join('')}
        </tbody>
      </table></div>
      <p class="table-foot">Tiongkok adalah mitra dagang terbesar Indonesia, dengan total perdagangan US$129,2 miliar pada 2024.</p>
      ${sourceLine('BPS, Statistik Perdagangan Luar Negeri 2024.')}
    </section>
  </div>`;
}

export function viewRegions() {
  return `
  <div class="page-head">
    <h1>Wilayah — 38 provinsi</h1>
    <p>Perbandingan provinsi: penduduk, luas, PDRB per kapita, dan pengangguran. Klik judul kolom untuk mengurutkan, ketik untuk mencari, atau saring menurut pulau.</p>
  </div>
  <section class="card">
    <div class="table-tools">
      <input type="search" id="prov-search" placeholder="Cari provinsi…" aria-label="Cari provinsi">
      <div class="chip-row" id="island-chips" role="group" aria-label="Saring menurut pulau">
        ${['Semua', 'Sumatera', 'Jawa', 'Bali-Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku-Papua'].map((g) => `<button class="chip${g === 'Semua' ? ' on' : ''}" data-island="${g}">${g}</button>`).join('')}
      </div>
    </div>
    <div class="table-scroll"><table class="data" id="prov-table">
      <thead><tr>
        <th><button data-sort="name">Provinsi ↕</button></th>
        <th><button data-sort="island">Pulau ↕</button></th>
        <th><button data-sort="pop">Penduduk (jt) ↕</button></th>
        <th><button data-sort="area">Luas (km²) ↕</button></th>
        <th><button data-sort="density">Kepadatan ↕</button></th>
        <th><button data-sort="gdpPc">PDRB/kapita (Rp jt) ↕</button></th>
        <th><button data-sort="unemp">Pengangguran % ↕</button></th>
      </tr></thead>
      <tbody id="prov-body"></tbody>
    </table></div>
    <p class="table-foot" id="prov-count"></p>
    ${sourceLine('BPS, Estimasi Penduduk Pertengahan Tahun 2024; PDRB per Kapita 2024; Sakernas Agustus 2024.')}
  </section>
  <section class="card">
    <h3>Yang perlu diketahui</h3>
    <p>Jawa menampung 55% penduduk di atas 7% luas daratan — kepadatan DKI Jakarta mencapai 15.904 jiwa/km², tertinggi di Indonesia. Sebaliknya, Papua Selatan hanya 4 jiwa/km². PDRB per kapita tertinggi ada di DKI Jakarta (Rp322,5 juta) dan Kalimantan Timur (Rp211,4 juta, ditopang batu bara dan migas), terendah di Papua Pegunungan (Rp21,4 juta).</p>
  </section>`;
}

export function viewLabour() {
  return `
  <div class="page-head">
    <h1>Tenaga kerja</h1>
    <p>Angkatan kerja, pengangguran, dan lapangan pekerjaan Indonesia.</p>
  </div>
  <section class="kpis">
    ${kpi('Angkatan kerja', '153,1 jt', 'Agustus 2024 · BPS')}
    ${kpi('Bekerja', '145,6 jt', 'Agustus 2024 · BPS')}
    ${kpi('Pengangguran', '4,91%', 'TPT Agustus 2024 · BPS', '<span class="down">▼ 0,41 poin dari 2023</span>')}
    ${kpi('Pekerja informal', '59,2%', 'Pangsa pekerja informal 2024')}
  </section>
  <div class="grid2">
    <section class="card">
      <h3>Pengangguran terbuka, 2015–2024</h3>
      <p class="card-sub">% angkatan kerja, Agustus tiap tahun</p>
      ${chartCanvas('line', YEARS, UNEMPLOYMENT, { decimals: 2 })}
      ${sourceLine('BPS, Survei Angkatan Kerja Nasional (Sakernas).')}
    </section>
    <section class="card">
      <h3>Pekerja menurut lapangan usaha, 2024</h3>
      <p class="card-sub">% dari pekerja</p>
      ${chartCanvas('hbar', EMPLOYMENT_SECTORS.map((s) => s.label), EMPLOYMENT_SECTORS.map((s) => s.value), { decimals: 1, tall: true })}
      ${sourceLine('BPS, Sakernas Agustus 2024.')}
    </section>
  </div>
  <section class="card">
    <h3>Upah minimum provinsi, 2025</h3>
    <p class="card-sub">Lima tertinggi — upah minimum ditetapkan tiap provinsi per 1 Januari</p>
    <div class="table-scroll"><table class="data">
      <thead><tr><th>Provinsi</th><th>UMP 2025 (Rp/bulan)</th><th>Naik dari 2024</th></tr></thead>
      <tbody>
        <tr><td>DKI Jakarta</td><td class="num">5.396.761</td><td class="num">+6,5%</td></tr>
        <tr><td>Papua Selatan</td><td class="num">4.525.079</td><td class="num">+6,5%</td></tr>
        <tr><td>Papua Tengah</td><td class="num">4.285.000</td><td class="num">+6,5%</td></tr>
        <tr><td>Kepulauan Riau</td><td class="num">4.101.930</td><td class="num">+6,5%</td></tr>
        <tr><td>Kalimantan Timur</td><td class="num">3.934.560</td><td class="num">+6,5%</td></tr>
      </tbody>
    </table></div>
    ${sourceLine('Keputusan Gubernur masing-masing provinsi, 2024–2025.')}
  </section>`;
}

export function viewPrices() {
  return `
  <div class="page-head">
    <h1>Harga dan inflasi</h1>
    <p>Indeks Harga Konsumen dan inflasi Indonesia. Bank Indonesia menargetkan inflasi 2,5% ± 1% pada 2024–2026.</p>
  </div>
  <section class="kpis">
    ${kpi('Inflasi 2024', '1,57%', 'Des 2024 y-on-y · BPS', '<span class="down">▼ dari 2,61% (2023)</span>')}
    ${kpi('Inflasi inti', '2,26%', 'Des 2024 y-on-y · BPS')}
    ${kpi('Harga diatur pem.', '1,56%', 'Administered prices, Des 2024')}
    ${kpi('Bergejolak', '0,22%', 'Volatile food, Des 2024')}
  </section>
  <div class="grid2">
    <section class="card">
      <h3>Inflasi tahunan, 2015–2024</h3>
      <p class="card-sub">% Desember ke Desember</p>
      ${chartCanvas('line', YEARS, INFLATION, { decimals: 2 })}
      ${sourceLine('BPS, Indeks Harga Konsumen.')}
    </section>
    <section class="card">
      <h3>Kemiskinan, 2015–2024</h3>
      <p class="card-sub">% penduduk, Maret tiap tahun</p>
      ${chartCanvas('line', YEARS, POVERTY, { decimals: 2, color: '#b3372f' })}
      ${sourceLine('BPS, Profil Kemiskinan.')}
    </section>
  </div>
  <section class="card">
    <h3>Komponen IHK, 2024</h3>
    <p class="card-sub">Bobot dalam keranjang IHK dan inflasi per kelompok</p>
    <div class="table-scroll"><table class="data">
      <thead><tr><th>Kelompok</th><th>Bobot (%)</th><th>Inflasi 2024 (%)</th></tr></thead>
      <tbody>
        ${CPI_COMPONENTS.map((c) => `<tr><td>${esc(c.label)}</td><td class="num">${fmt(c.weight, 1)}</td><td class="num">${fmt(c.inflation, 1)}</td></tr>`).join('')}
      </tbody>
    </table></div>
    <div class="callout"><strong>Makanan</strong> memiliki bobot terbesar (25,0%) dalam keranjang IHK — karena itu harga beras, cabai, dan bawang merah paling memengaruhi inflasi yang dirasakan rumah tangga.</div>
    ${sourceLine('BPS, Indeks Harga Konsumen 2024 (tahun dasar 2022=100).')}
  </section>`;
}
