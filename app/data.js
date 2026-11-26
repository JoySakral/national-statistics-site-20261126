// NusaStat data — figures from official publications, each labelled with its
// source and year on the page that shows it. Values are the published headline
// figures (BPS, Kementerian Keuangan, Bank Indonesia).
export const COUNTRY = {
  name: 'Indonesia',
  fullName: 'Republik Indonesia',
  capital: 'Jakarta (Ibu Kota Nusantara sedang dibangun)',
  areaKm2: 1916907,
  islands: 17504,
  currency: 'Rupiah (IDR)',
  language: 'Bahasa Indonesia',
};

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Pertumbuhan PDB riil, % per tahun (BPS, PDB harga konstan 2010)
export const GDP_GROWTH = [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03];

// Inflasi tahunan (IHK, Desember ke Desember), % (BPS)
export const INFLATION = [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57];

// PDB nominal, triliun rupiah (BPS)
export const GDP_NOMINAL = [11526, 12402, 13590, 14837, 15834, 15443, 16977, 19589, 20951, 22139];

// Ekspor dan impor barang, miliar USD (BPS / Bank Indonesia)
export const EXPORTS = [150.4, 145.2, 168.8, 180.0, 167.7, 163.2, 231.6, 291.9, 258.8, 264.7];
export const IMPORTS = [142.7, 135.7, 156.9, 188.7, 171.3, 141.6, 196.2, 237.4, 221.9, 233.7];

// Tingkat pengangguran terbuka, % (BPS, Agustus tiap tahun)
export const UNEMPLOYMENT = [6.18, 5.61, 5.50, 5.34, 5.23, 7.07, 6.49, 5.86, 5.32, 4.91];

// Tingkat kemiskinan, % (BPS, Maret tiap tahun)
export const POVERTY = [11.22, 10.86, 10.64, 9.82, 9.41, 9.78, 10.14, 9.54, 9.36, 9.03];

// Penduduk menurut kelompok umur 2024, juta jiwa (BPS, proyeksi pertengahan tahun)
export const AGE_GROUPS = [
  { label: '0–14 tahun', value: 67.4 },
  { label: '15–24 tahun', value: 46.9 },
  { label: '25–54 tahun', value: 118.6 },
  { label: '55–64 tahun', value: 26.5 },
  { label: '65+ tahun', value: 22.2 },
];

// PDB menurut lapangan usaha 2024, % terhadap PDB (BPS)
export const GDP_SECTORS = [
  { label: 'Industri pengolahan', value: 18.9 },
  { label: 'Perdagangan', value: 13.0 },
  { label: 'Pertanian, kehutanan, perikanan', value: 12.5 },
  { label: 'Konstruksi', value: 9.9 },
  { label: 'Pertambangan & penggalian', value: 9.4 },
  { label: 'Transportasi & pergudangan', value: 5.5 },
  { label: 'Informasi & komunikasi', value: 4.2 },
  { label: 'Lainnya', value: 26.6 },
];

// Tenaga kerja menurut lapangan usaha 2024, % (BPS, Sakernas Agustus 2024)
export const EMPLOYMENT_SECTORS = [
  { label: 'Pertanian', value: 28.5 },
  { label: 'Perdagangan', value: 19.3 },
  { label: 'Industri pengolahan', value: 13.8 },
  { label: 'Konstruksi', value: 6.3 },
  { label: 'Jasa pendidikan', value: 5.4 },
  { label: 'Transportasi & pergudangan', value: 4.6 },
  { label: 'Akomodasi & makan minum', value: 4.4 },
  { label: 'Lainnya', value: 17.7 },
];

// Komponen IHK 2024, bobot % dan inflasi % (BPS)
export const CPI_COMPONENTS = [
  { label: 'Makanan, minuman & tembakau', weight: 25.0, inflation: 1.6 },
  { label: 'Perumahan, air, listrik & bahan bakar', weight: 20.4, inflation: 0.9 },
  { label: 'Transportasi', weight: 12.6, inflation: 1.2 },
  { label: 'Pendidikan', weight: 5.8, inflation: 1.9 },
  { label: 'Kesehatan', weight: 4.6, inflation: 1.9 },
  { label: 'Pakaian & alas kaki', weight: 5.5, inflation: 1.0 },
  { label: 'Rekreasi, olahraga & budaya', weight: 2.2, inflation: 1.1 },
  { label: 'Lainnya', weight: 23.9, inflation: 2.3 },
];

// Komoditas ekspor utama 2024, miliar USD (BPS)
export const TOP_EXPORTS = [
  { label: 'Batu bara', value: 35.0 },
  { label: 'Minyak sawit (CPO & turunannya)', value: 27.4 },
  { label: 'Besi & baja', value: 27.0 },
  { label: 'Nikel & barang daripadanya', value: 6.8 },
  { label: 'Karet & barang dari karet', value: 6.3 },
  { label: 'Tembaga', value: 5.4 },
  { label: 'Pakaian jadi', value: 4.7 },
  { label: 'Alas kaki', value: 4.3 },
  { label: 'Mesin & peralatan listrik', value: 12.6 },
  { label: 'Lainnya', value: 135.2 },
];

// Mitra dagang utama 2024, total perdagangan miliar USD (BPS)
export const TRADE_PARTNERS = [
  { label: 'Tiongkok', exports: 62.4, imports: 66.8 },
  { label: 'Amerika Serikat', exports: 26.3, imports: 10.4 },
  { label: 'Jepang', exports: 20.8, imports: 13.6 },
  { label: 'India', exports: 19.4, imports: 11.7 },
  { label: 'Singapura', exports: 12.8, imports: 20.9 },
  { label: 'Malaysia', exports: 10.6, imports: 11.0 },
  { label: 'Korea Selatan', exports: 9.2, imports: 9.0 },
  { label: 'Australia', exports: 5.9, imports: 8.1 },
];

// Provinsi 2024: penduduk pertengahan tahun (juta jiwa), luas (km²), PDRB
// per kapita (juta Rp), pengangguran % (Agustus 2024). Sumber: BPS 2024.
// Pulau: Sumatera, Jawa, Bali-Nusa Tenggara, Kalimantan, Sulawesi, Maluku-Papua.
export const PROVINCES = [
  { name: 'Aceh', island: 'Sumatera', pop: 5.42, area: 57887, gdpPc: 48.2, unemp: 5.6 },
  { name: 'Sumatera Utara', island: 'Sumatera', pop: 15.59, area: 72981, gdpPc: 61.4, unemp: 5.2 },
  { name: 'Sumatera Barat', island: 'Sumatera', pop: 5.96, area: 42013, gdpPc: 56.8, unemp: 5.1 },
  { name: 'Riau', island: 'Sumatera', pop: 6.70, area: 87024, gdpPc: 128.5, unemp: 4.0 },
  { name: 'Jambi', island: 'Sumatera', pop: 3.68, area: 50059, gdpPc: 67.2, unemp: 4.5 },
  { name: 'Sumatera Selatan', island: 'Sumatera', pop: 9.02, area: 91592, gdpPc: 62.3, unemp: 4.5 },
  { name: 'Bengkulu', island: 'Sumatera', pop: 2.13, area: 19917, gdpPc: 47.9, unemp: 3.9 },
  { name: 'Lampung', island: 'Sumatera', pop: 9.05, area: 34624, gdpPc: 51.6, unemp: 4.3 },
  { name: 'Kep. Bangka Belitung', island: 'Sumatera', pop: 1.52, area: 16424, gdpPc: 66.1, unemp: 4.6 },
  { name: 'Kepulauan Riau', island: 'Sumatera', pop: 2.19, area: 8202, gdpPc: 139.8, unemp: 6.9 },
  { name: 'DKI Jakarta', island: 'Jawa', pop: 10.56, area: 664, gdpPc: 322.5, unemp: 6.2 },
  { name: 'Jawa Barat', island: 'Jawa', pop: 49.94, area: 35378, gdpPc: 61.0, unemp: 7.3 },
  { name: 'Jawa Tengah', island: 'Jawa', pop: 37.89, area: 32801, gdpPc: 52.4, unemp: 5.1 },
  { name: 'DI Yogyakarta', island: 'Jawa', pop: 3.90, area: 3134, gdpPc: 56.9, unemp: 3.5 },
  { name: 'Jawa Timur', island: 'Jawa', pop: 41.81, area: 47922, gdpPc: 71.6, unemp: 4.2 },
  { name: 'Banten', island: 'Jawa', pop: 12.03, area: 9663, gdpPc: 70.5, unemp: 7.0 },
  { name: 'Bali', island: 'Bali-Nusa Tenggara', pop: 4.46, area: 5780, gdpPc: 68.4, unemp: 2.4 },
  { name: 'Nusa Tenggara Barat', island: 'Bali-Nusa Tenggara', pop: 5.60, area: 18572, gdpPc: 35.9, unemp: 3.0 },
  { name: 'Nusa Tenggara Timur', island: 'Bali-Nusa Tenggara', pop: 5.68, area: 48718, gdpPc: 28.5, unemp: 3.4 },
  { name: 'Kalimantan Barat', island: 'Kalimantan', pop: 5.84, area: 147307, gdpPc: 50.2, unemp: 4.4 },
  { name: 'Kalimantan Tengah', island: 'Kalimantan', pop: 2.84, area: 153565, gdpPc: 64.6, unemp: 4.2 },
  { name: 'Kalimantan Selatan', island: 'Kalimantan', pop: 4.26, area: 38744, gdpPc: 64.9, unemp: 4.6 },
  { name: 'Kalimantan Timur', island: 'Kalimantan', pop: 3.99, area: 127347, gdpPc: 211.4, unemp: 5.5 },
  { name: 'Kalimantan Utara', island: 'Kalimantan', pop: 0.75, area: 72164, gdpPc: 145.3, unemp: 4.8 },
  { name: 'Sulawesi Utara', island: 'Sulawesi', pop: 2.75, area: 13852, gdpPc: 68.9, unemp: 6.4 },
  { name: 'Sulawesi Tengah', island: 'Sulawesi', pop: 3.15, area: 61841, gdpPc: 76.3, unemp: 3.2 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9.28, area: 46717, gdpPc: 70.2, unemp: 4.7 },
  { name: 'Sulawesi Tenggara', island: 'Sulawesi', pop: 2.82, area: 38068, gdpPc: 64.3, unemp: 3.5 },
  { name: 'Gorontalo', island: 'Sulawesi', pop: 1.25, area: 11257, gdpPc: 39.8, unemp: 4.1 },
  { name: 'Sulawesi Barat', island: 'Sulawesi', pop: 1.59, area: 16787, gdpPc: 41.5, unemp: 2.6 },
  { name: 'Maluku', island: 'Maluku-Papua', pop: 2.02, area: 46914, gdpPc: 34.1, unemp: 6.1 },
  { name: 'Maluku Utara', island: 'Maluku-Papua', pop: 1.45, area: 31983, gdpPc: 57.0, unemp: 4.2 },
  { name: 'Papua', island: 'Maluku-Papua', pop: 1.11, area: 81418, gdpPc: 72.8, unemp: 4.0 },
  { name: 'Papua Barat', island: 'Maluku-Papua', pop: 1.32, area: 60509, gdpPc: 81.5, unemp: 5.3 },
  { name: 'Papua Selatan', island: 'Maluku-Papua', pop: 0.53, area: 131049, gdpPc: 44.6, unemp: 3.8 },
  { name: 'Papua Tengah', island: 'Maluku-Papua', pop: 1.41, area: 61072, gdpPc: 96.1, unemp: 4.9 },
  { name: 'Papua Pegunungan', island: 'Maluku-Papua', pop: 1.53, area: 51634, gdpPc: 21.4, unemp: 3.1 },
  { name: 'Papua Barat Daya', island: 'Maluku-Papua', pop: 0.62, area: 39067, gdpPc: 58.7, unemp: 6.0 },
];

// Rilis terbaru — jadwal publikasi BPS 2024–2025
export const RELEASES = [
  { date: '05 Nov 2026', title: 'Pertumbuhan Ekonomi Indonesia Triwulan III-2026', text: 'Ekonomi tumbuh 5,12% (y-on-y); konsumsi rumah tangga dan investasi menjadi penopang utama.', route: '#/economy' },
  { date: '03 Nov 2026', title: 'Inflasi Oktober 2026 sebesar 0,19% (m-to-m)', text: 'Inflasi tahunan 2,41%; kelompok makanan dan transportasi menjadi penyumbang terbesar.', route: '#/prices' },
  { date: '15 Okt 2026', title: 'Ekspor September 2026 mencapai US$24,8 miliar', text: 'Neraca perdagangan surplus US$4,1 miliar; ekspor nonmigas naik 8,3% dibanding September 2025.', route: '#/trade' },
  { date: '05 Sep 2026', title: 'Tingkat Pengangguran Terbuka Februari 2026: 4,76%', text: 'TPT turun 0,15 poin dari Februari 2025; lapangan kerja formal bertambah 2,1 juta orang.', route: '#/labour' },
  { date: '15 Jul 2026', title: 'Jumlah Penduduk Pertengahan 2026: 284,44 juta jiwa', text: 'Laju pertumbuhan penduduk 0,90% per tahun; 55% penduduk tinggal di Pulau Jawa.', route: '#/population' },
  { date: '02 Jun 2026', title: 'Profil Kemiskinan Maret 2026: 8,57%', text: 'Penduduk miskin 24,06 juta orang, turun 0,46 poin dari Maret 2025.', route: '#/economy' },
];

// Indeks indikator untuk kotak pencarian di header
export const INDICATORS = [
  { term: 'jumlah penduduk', value: '281,60 juta jiwa (2024)', route: '#/population' },
  { term: 'pertumbuhan penduduk', value: '0,90% per tahun (2024)', route: '#/population' },
  { term: 'PDB produk domestik bruto', value: 'Rp22.139 triliun (2024)', route: '#/economy' },
  { term: 'pertumbuhan ekonomi', value: '5,03% (2024)', route: '#/economy' },
  { term: 'PDB per kapita', value: 'Rp78,6 juta / US$4.960 (2024)', route: '#/economy' },
  { term: 'inflasi', value: '1,57% y-on-y (Des 2024)', route: '#/prices' },
  { term: 'IHK indeks harga konsumen', value: '106,5 (2024, 2022=100)', route: '#/prices' },
  { term: 'pengangguran', value: '4,91% (Agu 2024)', route: '#/labour' },
  { term: 'kemiskinan', value: '9,03% (Mar 2024)', route: '#/economy' },
  { term: 'ekspor', value: 'US$264,7 miliar (2024)', route: '#/trade' },
  { term: 'impor', value: 'US$233,7 miliar (2024)', route: '#/trade' },
  { term: 'neraca perdagangan surplus', value: 'US$31,0 miliar (2024)', route: '#/trade' },
  { term: 'Jawa Barat penduduk terbanyak', value: '49,94 juta jiwa (2024)', route: '#/regions' },
  { term: 'DKI Jakarta PDRB per kapita', value: 'Rp322,5 juta (2024)', route: '#/regions' },
  { term: 'angkatan kerja', value: '153,1 juta orang (Agu 2024)', route: '#/labour' },
  { term: 'upah minimum UMR', value: 'Rp5.396.761 (DKI Jakarta, 2025)', route: '#/labour' },
];

export const fmt = (n, digits = 2) =>
  n.toLocaleString('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits });
