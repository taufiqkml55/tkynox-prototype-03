
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const PRODUCT_DATA_ID = {
    // --- MINING ---
    'mining-tier-1': { 
        name: "Nano-Ledger USB", 
        tagline: "Hashing level pemula.", 
        description: "Miner USB stick ringkas. Lambat tapi efisien.", 
        longDescription: "Menggunakan chip ASIC 7nm tegangan rendah, Nano-Ledger adalah titik masuk diam-diam ke jaringan TKYNOX. Beroperasi tanpa suara pada port USB 3.0 standar, menyedot daya minimal sambil berkontribusi pada ledger terdistribusi.",
        features: ['2 TH/s Hashrate', 'Antarmuka USB 3.0', 'Disipasi Termal Pasif', 'Faktor Bentuk Siluman']
    },
    'mining-tier-2': { 
        name: "Unit Komputasi GX-5000", 
        tagline: "Pemrosesan terdedikasi.", 
        description: "GPU kelas menengah yang dialihfungsikan untuk kalkulasi blockchain.", 
        longDescription: "Unit pemrosesan grafis yang dimodifikasi dengan logika video dihapus. GX-5000 mendedikasikan 100% inti CUDA untuk memecahkan algoritma blockchain. Fitur pendingin vapor-chamber khusus.",
        features: ['8 TH/s Hashrate', 'Pendingin Vapor-Chamber', 'PCIe Headless', 'Siap Overclock']
    },
    'mining-rig-01': { 
        name: "Penambang Quant-X", 
        tagline: "Pembangkit Pendapatan Pasif.", 
        description: "Rig mining otomatis. Hasilkan pendapatan saat tidur.", 
        longDescription: "Quant-X adalah standar mining semi-profesional. Ditempatkan dalam sasis peredam suara, menggunakan 4 papan ASIC paralel. Membuka akses ke dasbor Komando Mining.",
        features: ['20 TH/s Hashrate', 'Buka Dasbor Mining', 'Kredit Pasif', 'Loop Pendingin Cair']
    },
    'mining-tier-4': { 
        name: "Server Rak Isotop", 
        tagline: "Skala industri.", 
        description: "Server blade kepadatan tinggi bertenaga baterai nuklir.", 
        longDescription: "Server blade industri menggunakan sel daya tritium beta-voltaic. Energi mandiri ini memungkinkan uptime 99,999% terlepas dari jaringan listrik lokal.",
        features: ['60 TH/s Hashrate', 'Bertenaga Sendiri (Tritium)', 'Sasis Terlindung EM', 'Keandalan Kelas Server']
    },
    'mining-tier-5': { 
        name: "Inti Singularitas", 
        tagline: "Cakrawala peristiwa.", 
        description: "Inti kuantum eksperimental. Memecahkan enkripsi instan.", 
        longDescription: "Mesin komputasi teoretis dalam medan magnet. Menggunakan kurva waktu tertutup untuk menghitung hash mikrodetik sebelum blok disiarkan.",
        features: ['200 TH/s Hashrate', 'Pembengkok Realitas', 'Latensi Nol', 'Penahanan Magnetik']
    },
    'mining-tier-6': {
        name: 'Tautan Dyson',
        tagline: 'Panen surya.',
        description: 'Saham fraksional dari node kawanan dyson yang mengorbit matahari.',
        longDescription: 'Manfaatkan kekuatan bintang. Tautan Dyson menyediakan kepemilikan sebagian dari satelit pengumpul energi jarak jauh.',
        features: ['500 TH/s Hashrate', 'Tenaga Surya', 'Uplink Orbital', 'Perawatan Nol']
    },
    'mining-tier-7': {
        name: 'Node Geotermal',
        tagline: 'Tenaga bumi.',
        description: 'Generator termal kerak dalam untuk hashing berkelanjutan.',
        longDescription: 'Manfaatkan planet ini. Unit penambangan mandiri ini membor 2km ke dalam kerak bumi untuk menggunakan gradien panas bumi.',
        features: ['85 TH/s Hashrate', 'Tenaga Geotermal', 'Pendingin Cair', 'Bawah Tanah']
    },
    'mining-tier-8': {
        name: 'Klaster Hash Neural',
        tagline: 'Komputasi biologis.',
        description: 'Rig mining antarmuka otak-komputer. Gunakan siklus saraf tak terpakai.',
        longDescription: 'Uangkan alam bawah sadar Anda. Menghubungkan ke implan BCI untuk menggunakan jalur saraf tak terpakai saat tidur untuk validasi blockchain.',
        features: ['40 TH/s Hashrate', 'Kompatibel BCI', 'Mining Tidur', 'Operasi Senyap']
    },
    'mining-tier-9': {
        name: 'Relai Orbital',
        tagline: 'Node berbasis angkasa.',
        description: 'Satelit orbit rendah untuk validasi tahan sensor.',
        longDescription: 'Mining di luar jangkauan pemerintah. Saham fraksional dari penambang CubeSat ini memastikan uptime 100% dan tahan sensor.',
        features: ['120 TH/s Hashrate', 'Tahan Sensor', 'Tenaga Surya', 'Cakupan Global']
    },
    'mining-tier-10': {
        name: 'Filamen Kuantum',
        tagline: 'Stabilitas.',
        description: 'Perangkat keras stabilisasi untuk rig kuantum.',
        longDescription: 'Penting untuk menjaga koherensi dalam penambang kuantum Tier-5. Filamen ini mengurangi tingkat kesalahan sebesar 99%.',
        features: ['Koreksi Kesalahan', 'Superkonduktor', 'Resistensi Nol', 'Sinkronisasi Kuantum']
    },
    'mining-tier-11': {
        name: 'Cache Bulan',
        tagline: 'Luar dunia.',
        description: 'Gudang data cold storage di orbit bulan.',
        longDescription: 'Cadangan utama. Kunci pribadi Anda diukir pada kaca silika dan disimpan dalam brankas robotik di permukaan bulan.',
        features: ['Luar Dunia', 'Tahan Radiasi', 'Akses Robotik', 'Tautan Telemetri']
    },

    // --- PHYSICAL ---
    'phys-01': { 
        name: "Cyberdeck: ONYX MK.IV", 
        tagline: "Komputasi lapangan.", 
        description: "Keyboard mekanis 40% dengan modul Raspberry Pi 5 terintegrasi.", 
        longDescription: "ONYX MK.IV adalah cyberdeck siap lapangan untuk intrusi fisik. Sasis aluminium unibody menampung modul komputasi Raspberry Pi 5 dan penerima SDR.",
        features: ['Modul Raspberry Pi 5', 'Tata Letak Ortholinear 40%', 'Penerima SDR', 'Aluminium Rugged']
    },
    'phys-02': { 
        name: "Headset Neural: VISR", 
        tagline: "Perbesar visi.", 
        description: "Kacamata AR ringan dengan notifikasi head-up dan navigasi.", 
        longDescription: "Kacamata AR untuk operatif aktif. VISR menggunakan proyeksi retina untuk melapisi skema wireframe dan pesan terenkripsi langsung ke pandangan Anda.",
        features: ['Proyeksi Retina', 'Pemetaan Lidar', 'Antarmuka Gestur', 'Lapisan Siluman']
    },
    'phys-03': { 
        name: "Sarung Tangan Haptic: GRIP", 
        tagline: "Rasakan grid.", 
        description: "Sarung tangan umpan balik untuk VR dan piloting drone.", 
        longDescription: "Sarung tangan antarmuka telepresence canggih. Menggunakan polimer elektro-aktif untuk mensimulasikan tekstur dan berat, memungkinkan kontrol presisi.",
        features: ['Haptik Elektro-Aktif', 'Pelacakan Jari', 'Diperkuat Tempur', 'Tautan Latensi Nol']
    },
    'phys-04': {
        name: 'Exo-Arm: STRIKE',
        tagline: 'Kekuatan tambahan.',
        description: 'Penjepit lengan hidrolik untuk augmentasi industri atau taktis.',
        longDescription: 'Eksoskeleton hidrolik ringan. Meningkatkan kapasitas angkat sebesar 40kg dan menstabilkan bidikan.',
        features: ['Bantuan Hidrolik', 'Angkat +40kg', 'Stabilisasi Bidikan', 'Rilis Cepat']
    },
    'phys-05': {
        name: 'Lensa: OCULUS',
        tagline: 'Overlay HUD.',
        description: 'Lensa kontak pintar dengan pemantauan biometrik.',
        longDescription: 'Antarmuka rahasia utama. Lensa kontak pintar ini memproyeksikan HUD minimal langsung ke retina Anda.',
        features: ['Tampilan Retina', 'Biometrik', 'Daya Nirkabel', 'Tidak Terlihat']
    },
    'phys-06': {
        name: 'Drone: SPARROW',
        tagline: 'Intai pribadi.',
        description: 'Drone mikro pasang di pergelangan tangan untuk pengintaian cepat.',
        longDescription: 'Sebarkan mata di langit secara instan. SPARROW adalah drone mikro lipat yang disimpan dalam sarung tangan.',
        features: ['Peluncuran Pergelangan', 'Penerbangan Senyap', 'Tautan Video 4K', 'Kembali Otomatis']
    },
    'phys-07': {
        name: 'Topeng: ONI',
        tagline: 'Samurai jalanan.',
        description: 'Topeng wajah balistik dengan kaca AR dan filtrasi udara.',
        longDescription: 'Intimidasi bertemu perlindungan. Topeng ONI menawarkan perlindungan balistik Level IIIA.',
        features: ['Perlindungan Balistik', 'Visor AR', 'Filter HEPA', 'Penguat Suara']
    },
    'phys-08': {
        name: 'Tautan Neural: REFLEX',
        tagline: 'Lebih cepat.',
        description: 'Implan tulang belakang yang meningkatkan waktu reaksi sebesar 20ms.',
        longDescription: 'Pangkas milidetik dari waktu reaksi Anda. Implan ini mencegat sinyal saraf dan mempercepat transmisi.',
        features: ['Peningkatan 20ms', 'Pemasangan Tulang Belakang', 'Regulasi Adrenalin', 'Aman Bio']
    },
    'phys-09': {
        name: 'Drone Mikro: WASP',
        tagline: 'Kawanan serang.',
        description: 'Drone penyerang kinetik sekali pakai.',
        longDescription: 'Drone mikro bersenjata. WASP dirancang untuk berakselerasi hingga 100mph dan menumbuk target dengan gaya kinetik.',
        features: ['Serangan Kinetik', 'Kecepatan Tinggi', 'Panduan Terminal', 'Sekali Pakai']
    },

    // --- SUSTENANCE ---
    'food-01': { 
        name: "Paket Ramen Neon", 
        tagline: "Bahan bakar malam.", 
        description: "Ramen miso pedas dehidrasi dengan hiasan bio-luminescent.", 
        longDescription: "Makanan sintetis kalori tinggi. Konsentrat miso pedas diperkaya nootropik. Termasuk alga bio-luminescent yang aktif saat terkena air panas.",
        features: ['Edibles Bioluminescent', '20g Protein Sintetis', 'Miso Pedas', 'Infus Nootropik']
    },
    'food-02': { 
        name: "Energi Syntax: Paket 12", 
        tagline: "Kompilasi cepat.", 
        description: "Minuman energi nootropik karbonasi. Bebas gula, bebas crash.", 
        longDescription: "Minuman hiper-oksigenasi untuk mempercepat laju saraf. Memberikan tumpukan Kafein, L-Theanine, dan Alpha-GPC yang presisi.",
        features: ['Tumpukan Alpha-GPC', 'Nol Gula', '200mg Kafein', 'Hiper-Oksigenasi']
    },
    'food-03': { 
        name: "Burger Void: Kering Beku", 
        tagline: "Kalori taktis.", 
        description: "Patty burger nabati, tahan 25 tahun.", 
        longDescription: "Ransum darurat. Menggunakan protein nabati bertekstur dan mioglobin laboratorium. Dikemas vakum dalam mylar tingkat militer.",
        features: ['Umur Simpan 25 Tahun', 'Protein Lab', 'Segel Mylar', 'Persiapan Air Dingin']
    },
    'food-04': {
        name: 'Semprotan: WAKE',
        tagline: 'Sadar instan.',
        description: 'Semprotan kafein sublingual untuk penyerapan segera.',
        longDescription: 'Tidak ada waktu menyeduh kopi. WAKE memberikan 50mg kafein per semprotan langsung di bawah lidah.',
        features: ['Serap Instan', '50mg/Semprot', 'Ukuran Saku', 'Nol Kalori']
    },
    'food-05': {
        name: 'Pasta: RATION',
        tagline: 'Bahan bakar survival.',
        description: 'Tabung pasta nutrisi all-in-one. 2000 kalori.',
        longDescription: 'Nutrisi lengkap dalam tabung. Pasta RATION mengandung 100% vitamin harian Anda. Rasa: Abu-abu Netral.',
        features: ['2000 Kalori', 'Nutrisi Lengkap', 'Ringkas', 'Stabil di Rak']
    },
    'food-06': {
        name: 'Permen Karet: FOCUS',
        tagline: 'Kunyah untuk fokus.',
        description: 'Permen karet nootropik dengan kafein pelepasan berkelanjutan.',
        longDescription: 'Peningkatan kognitif dalam format kunyah. Setiap potong melepaskan 40mg kafein dan 60mg L-Theanine.',
        features: ['Aksi Cepat', 'L-Theanine', 'Bebas Gula', 'Paket Saku']
    },
    'food-07': {
        name: 'Hydra-Flask',
        tagline: 'Hidrasi pintar.',
        description: 'Botol air swa-bersih dengan pelacakan asupan dan purifikasi UV.',
        longDescription: 'Minum lebih aman. Hydra-Flask menggunakan cahaya UV-C di tutupnya untuk menetralkan 99,9% bakteri.',
        features: ['Purifikasi UV-C', 'Pelacakan Asupan', 'Kontrol Suhu', 'Swa-Bersih']
    },

    // --- APPAREL ---
    'app-01': { 
        name: "Hoodie Siluman: VANTABLACK", 
        tagline: "Hindari deteksi.", 
        description: "Bahan anti-flash fotografi dengan saku pemblokir sinyal.", 
        longDescription: "Dibuat dari meta-material penyerap cahaya, hoodie VANTABLACK membuat pemakainya menjadi siluet dalam cahaya rendah. Saku Faraday melindungi perangkat dari pelacakan.",
        features: ['Saku Terlindung RF', 'Kain Anti-Flash', 'Regulasi Termal', 'Hoodie Besar']
    },
    'app-02': { 
        name: "Celana Kargo: OPERATIVE", 
        tagline: "Bawa segalanya.", 
        description: "Celana taktis dengan penutup magnetik dan bantalan lutut.", 
        longDescription: "Pakaian taktis untuk grey man modern. Dipotong dari kain ripstop benang Dyneema, menawarkan perlindungan sayatan dan tahan air.",
        features: ['12 Saku Diskrit', 'Ripstop Dyneema', 'Magnet Fidlock', 'Lutut Artikulasi']
    },
    'app-03': {
        name: 'Sepatu Bot: KINETIC',
        tagline: 'Jalan untuk cas.',
        description: 'Sepatu tempur urban dengan sol pengisi daya piezoelektrik.',
        longDescription: 'Jangan pernah kehabisan daya. Sepatu bot taktis ini memanen energi kinetik dari langkah kaki Anda.',
        features: ['Gen Piezoelektrik', 'Tahan Air', 'Ujung Baja', 'Power Bank']
    },
    'app-04': {
        name: 'Syal: GLITCH',
        tagline: 'Obfuscasi wajah.',
        description: 'Rajutan pola dazzle untuk membingungkan algoritma pengenalan wajah.',
        longDescription: 'Invisibilitas teknologi rendah. Pola geometris kontras tinggi dirancang untuk membingungkan algoritma CV.',
        features: ['Pola Anti-CV', 'Tenunan Termal', 'Fit Modular', 'Reflektif']
    },
    'app-05': {
        name: 'Jaket: FARADAY',
        tagline: 'Tahan sinyal.',
        description: 'Jaket bomber dilapisi jaring pelindung EMI seluruh tubuh.',
        longDescription: 'Menjadi hantu. Jaket FARADAY dilapisi dengan jaring perak-nikel, menciptakan sangkar Faraday yang dapat dipakai.',
        features: ['Perisai EMI Penuh', 'Tahan Air', 'Saku Tersembunyi', 'Lapisan Termal']
    },
    'app-06': {
        name: 'Sepatu: GRAV',
        tagline: 'Jalan di udara.',
        description: 'Sepatu high-top dengan sol tolakan magnetik.',
        longDescription: 'Lawan gravitasi. Sepatu ini menggunakan medan magnet berlawanan di sol untuk menciptakan efek bantalan.',
        features: ['Sol Mag-Lev', 'Reduksi Dampak', 'Dukungan Pergelangan', 'Tali Reaktif']
    },
    'app-07': {
        name: 'Rompi: KEVLAR_WEAVE',
        tagline: 'Armor jalanan.',
        description: 'Rompi balistik ringan yang disamarkan sebagai pakaian jalanan.',
        longDescription: 'Perlindungan tanpa beban. Rompi tenunan Kevlar ini pas di bawah kaos dan dinilai untuk senjata api kecil.',
        features: ['Level IIIA', 'Dapat Disembunyikan', 'Bernapas', 'Tahan Pisau']
    },
    'app-08': {
        name: 'Ponco Techwear',
        tagline: 'Siap hujan asam.',
        description: 'Ponco tahan air tugas berat dengan kamuflase reaktif.',
        longDescription: 'Tetap kering di musim hujan. Ponco ini memiliki lapisan hidrofobik dan LED tertanam yang dapat bergeser warna.',
        features: ['Hidrofobik', 'Camo LED', 'Dapat Dikemas', 'Fit Besar']
    },

    // --- EDUCATION ---
    'edu-01': { 
        name: "Kursus: Netrunner 101", 
        tagline: "Pertahanan diri digital.", 
        description: "Seri video tentang dasar keamanan siber, enkripsi, dan penghapusan jejak.", 
        longDescription: "Kurikulum komprehensif tentang kebersihan digital dan keamanan ofensif. Mencakup enkripsi canggih dan penyamaran lalu lintas.",
        features: ['10 Jam Konten', 'Lab Pentest Virtual', 'Sertifikasi', 'Keamanan Dark Web']
    },
    'edu-02': { 
        name: "Kursus: Rekayasa Prompt AI", 
        tagline: "Bicara pada mesin.", 
        description: "Teknik lanjutan untuk mengendalikan LLM dan generator.", 
        longDescription: "Kuasai bahasa mesin. Kursus ini mendekonstruksi arsitektur Model Bahasa Besar.",
        features: ['Pustaka Pola Prompt', 'Arsitektur LLM', 'Logika Lanjutan', 'Komunitas Discord']
    },
    'edu-03': {
        name: 'Kursus: Rekayasa Sosial',
        tagline: 'Peretasan manusia.',
        description: 'Taktik manipulasi psikologis untuk penguji penetrasi fisik.',
        longDescription: 'Titik terlemah selalu manusia. Pelajari seni pretexting, tailgating, dan elisitasi.',
        features: ['Psikologi', 'Pretexting', 'Bahasa Tubuh', 'Latihan Langsung']
    },
    'edu-04': {
        name: 'Kursus: Kripto-Kuantum',
        tagline: 'Pasca-kuantum.',
        description: 'Mempersiapkan standar enkripsi Anda untuk era kuantum.',
        longDescription: 'RSA sudah mati. Pelajari implementasi standar CRYSTALS-Kyber dan Dilithium.',
        features: ['Kripto Lattice', 'Persiapan Q-Day', 'Tukar Algoritma', 'Tahan Masa Depan']
    },
    'edu-05': {
        name: 'Kursus: Bio-Hacking',
        tagline: 'Tingkatkan perangkat keras Anda.',
        description: 'Pengantar biologi DIY, dasar-dasar CRISPR, dan keamanan implan.',
        longDescription: 'Kendalikan evolusi Anda sendiri. Kursus ini mencakup dasar-dasar eksperimen mandiri yang aman.',
        features: ['Dasar CRISPR', 'Keamanan Implan', 'Nutrigenomik', 'Pengaturan Lab']
    },
    'edu-06': {
        name: 'Kursus: Off-Grid',
        tagline: 'Menghilang sepenuhnya.',
        description: 'Taktik penghindaran digital dan fisik untuk era modern.',
        longDescription: 'Cara menghilang di negara pengawas. Pelajari cara membersihkan jejak digital Anda dan membuat alias.',
        features: ['Pembersihan Digital', 'Pembuatan Alias', 'Taktik Penghindaran', 'Keahlian Bertahan Hidup']
    },
    'edtech-01': {
        name: 'Node Holo-Tutor',
        tagline: 'Kelas ada di mana-mana.',
        description: 'Proyektor holografik portabel dengan modul kurikulum AI bawaan.',
        longDescription: 'Proyektor holografik ringkas lumen tinggi yang mampu merender pelajaran interaktif 3D di lingkungan apa pun.',
        features: ['Proyeksi Holografik', 'Kurikulum AI', 'Kontrol Gestur', 'Sinkronisasi Awan']
    },
    'edtech-02': {
        name: 'Implan Memori: BASICS',
        tagline: 'Belajar instan.',
        description: 'Chip saraf untuk penyerapan pengetahuan pasif selama siklus REM.',
        longDescription: 'Lewati kurva pembelajaran. Implan jaring saraf ini secara pasif merangsang hippocampus saat tidur.',
        features: ['Muat Keahlian Instan', 'Antarmuka Saraf', 'Paket Bahasa', 'DB Sejarah']
    },
    'edtech-03': {
        name: 'Skillshard: CQC',
        tagline: 'Kecakapan fisik.',
        description: 'Unduhan saraf untuk memori otot Pertempuran Jarak Dekat.',
        longDescription: 'Mengapa berlatih jika Anda bisa mengunduh? Shard ini mengunggah 10 tahun data refleks Krav Maga.',
        features: ['Penguasaan Krav Maga', 'Refleks Jiu-Jitsu', 'Integrasi Instan', 'Sinkronisasi Korteks Motorik']
    },
    'edtech-04': {
        name: 'Lab VR: CHEM-SIM',
        tagline: 'Eksperimen aman.',
        description: 'Laboratorium kimia virtual bebas bahaya dengan fisika realistis.',
        longDescription: 'Lakukan eksperimen volatil tanpa risiko ledakan. Lingkungan VR CHEM-SIM memodelkan interaksi molekuler secara akurat.',
        features: ['Fisika Molekuler', 'Reagen Tak Terbatas', 'Bebas Bahaya', 'Ekspor Data']
    },
    'edtech-05': {
        name: "Paket Bahasa Neural",
        tagline: "Menara Babel terpecahkan.",
        description: "Kefasihan instan dalam 50 bahasa utama melalui implan koklea.",
        longDescription: "Pembaruan firmware untuk implan koklea standar ini menerjemahkan audio masuk secara real-time.",
        features: ['50 Bahasa', 'Terjemahan Real-time', 'Modulasi Vokal', 'Mode Offline']
    },
    'edtech-06': {
        name: "Meja Kerja AR",
        tagline: "Merekayasa realitas.",
        description: "Proyeksikan cetak biru ke objek fisik untuk fabrikasi presisi.",
        longDescription: "Augmented Reality untuk bengkel. Sistem proyektor ini melapisi file CAD langsung ke meja kerja Anda.",
        features: ['Overlay CAD', 'Presisi Milimeter', 'Kontrol Gestur', 'Pustaka Awan']
    },
    'edtech-07': {
        name: 'Sim: SEJARAH',
        tagline: 'Hidupkan kembali masa lalu.',
        description: 'Pelajaran sejarah VR sensorik penuh. Saksikan peristiwa saat terjadi.',
        longDescription: 'Sejarah bukan lagi sekadar teks. Masuk ke sepatu tokoh sejarah dengan simulasi VR fidelitas tinggi.',
        features: ['Imersi Sensorik', 'Rekonstruksi Akurat', 'NPC Interaktif', 'Mode Edukasi']
    },
    'edtech-08': {
        name: 'Tautan: MATH',
        tagline: 'Hitung instan.',
        description: 'Koprosesor saraf untuk aritmatika dan kalkulus kompleks.',
        longDescription: 'Ubah otak Anda menjadi superkomputer. Applet tautan saraf ini memindahkan pemrosesan matematika ke chip sub-kranial.',
        features: ['Kalkulus Instan', 'Analisis Statistik', 'Pemecahan Enkripsi', 'Overlay HUD']
    },
    'edtech-09': {
        name: 'Tutor AI: SOCRATES',
        tagline: 'Debat filosofis.',
        description: 'Mitra debat AI yang dilatih tentang filsafat klasik dan logika.',
        longDescription: 'Pertajam pikiran Anda melawan orang dahulu. SOCRATES adalah LLM khusus yang dilatih pada metode Socrates.',
        features: ['Metode Socratic', 'Pelatihan Logika', 'Mode Debat', 'Antarmuka Suara']
    },
    'edtech-10': {
        name: 'Karyawisata VR: MARS',
        tagline: 'Jalan di planet merah.',
        description: 'Tur VR fotorealistik koloni dan lanskap Mars.',
        longDescription: 'Kunjungi perbatasan tanpa meninggalkan pod Anda. Pengalaman VR ini menggunakan data rover untuk merekonstruksi permukaan Mars.',
        features: ['Fotorealisme', 'Data Rover', 'Tur Terpandu', 'Simulasi Fisika']
    },

    // --- DECKS / DIGITAL ---
    'deck-01': { 
        name: "Pitch Deck: OMEGA", 
        tagline: "Untuk startup unicorn.", 
        description: "Deck investor kontras tinggi, padat data. 50+ slide master.", 
        longDescription: "Pitch deck yang dirancang untuk startup berkecepatan tinggi. OMEGA menampilkan estetika kontras tinggi yang mencolok.",
        features: ['50+ Slide Master', 'Tata Letak Mode Gelap', 'Tautan Data Excel', 'Aset Vektor']
    },
    'deck-02': { 
        name: "Laporan Kuartalan: NEO", 
        tagline: "Viz data untuk ruang rapat.", 
        description: "Templat Keynote bersih dan steril untuk metrik kompleks.", 
        longDescription: "Suite pelaporan minimalis untuk tinjauan kuartalan. NEO berfokus pada kejelasan dan sterilitas.",
        features: ['Rasio Sinematik 16:9', 'Siap Magic Move', 'Fokus KPI', 'Keynote Asli']
    },
    'deck-04': { 
        name: "Protokol Modal Ventura", 
        tagline: "Suite pendanaan lengkap.", 
        description: "Paket: Pitch Deck, One-Pager, dan Model Keuangan.", 
        longDescription: "Toolkit penggalangan dana all-in-one. Termasuk Pitch Deck yang dioptimalkan untuk persuasi.",
        features: ['Deck + One-Pager', 'Model Keuangan XLS', 'Skrip Email Investor', 'Paket Ikon']
    },
    'deck-12': { 
        name: "Paket Turnamen Esports", 
        tagline: "Mulai permainan.", 
        description: "Overlay energi tinggi, deck sponsor, dan braket.", 
        longDescription: "Paket grafis siap siar untuk acara game kompetitif.",
        features: ['Overlay Stream', 'Logika Braket', 'Dioptimalkan OBS', 'Ekspor Multi-Format']
    },
    'deck-15': { 
        name: "Arsitektural: PLANS", 
        tagline: "Bangun visi Anda.", 
        description: "Estetika cetak biru untuk arsitek dan insinyur.", 
        longDescription: "Kerangka presentasi yang terinspirasi oleh cetak biru teknis.",
        features: ['Estetika Grid CAD', 'Elemen Skala', 'Bagan Garis Waktu', 'PowerPoint Asli']
    },
    'deck-06': {
        name: 'Aset: Influencer',
        tagline: 'Pertumbuhan sosial.',
        description: 'Templat media kit dan lembar tarif sponsor.',
        longDescription: 'Uangkan pengikut Anda. Paket ini mencakup media kit profesional.',
        features: ['Media Kit', 'Kartu Tarif', 'Skrip Email', 'Siap Canva']
    },
    'deck-07': {
        name: 'Deck: Krisis',
        tagline: 'Bencana PR.',
        description: 'Templat komunikasi tanggap darurat.',
        longDescription: 'Ketika terjadi kesalahan, kendalikan narasi. Deck manajemen krisis ini menyediakan rilis pers pra-tulis.',
        features: ['Rilis Pers', 'Memo Internal', 'Kerangka Permintaan Maaf', 'Bagan Garis Waktu']
    },
    'deck-08': {
        name: 'Paket Ikon: NEON',
        tagline: 'Bersinar.',
        description: '5000+ ikon gaya holografik untuk proyek UI/UX.',
        longDescription: 'Tambahkan cahaya futuristik ke antarmuka Anda. Paket ini berisi lebih dari 5000 ikon vektor.',
        features: ['5000+ Vektor', 'Komponen Figma', 'Stroke Dapat Diedit', 'SVG/PNG']
    },
    'deck-09': {
        name: 'Paket Shader: CYBER',
        tagline: 'Material realistis.',
        description: 'Shader prosedural untuk Blender dan Unity. Karbon, Neon, Logam.',
        longDescription: 'Tekstur dunia Anda. Pustaka 100+ shader prosedural yang dirancang untuk lingkungan cyberpunk.',
        features: ['100+ Material', 'Prosedural', 'Peta 4K', 'Blender/Unity']
    },

    // --- FINTECH ---
    'fintech-01': {
        name: 'Algo-Bot: ARBITRAGE',
        tagline: 'Efisiensi pasar otomatis.',
        description: 'Algoritma perdagangan frekuensi tinggi untuk arbitrase lintas bursa.',
        longDescription: 'Dominasi spread. Bot ARBITRAGE memantau perbedaan harga di 50+ bursa terdesentralisasi.',
        features: ['Trading Frekuensi Tinggi', 'Multi-Bursa', 'Latensi Nol', 'AI Manajemen Risiko']
    },
    'fintech-02': {
        name: 'DeFi Dashboard PRO',
        tagline: 'Kekayaan Anda, divisualisasikan.',
        description: 'Pelacak portofolio komprehensif untuk semua rantai EVM.',
        longDescription: 'Berhenti melacak kekayaan bersih Anda di spreadsheet. Dasbor SaaS ini mengumpulkan data dompet dari Ethereum, Solana, dan L2.',
        features: ['Pelacakan Lintas-Rantai', 'Optimasi Gas', 'Yield Farming', 'Ekspor Pajak']
    },
    'fintech-03': {
        name: 'Pelat Ledger: TITANIUM',
        tagline: 'Benih tak hancur.',
        description: 'Pelat titanium tahan api dan asam untuk frase benih cold storage.',
        longDescription: 'Kertas terbakar. Elektronik gagal. Titanium bertahan. Pelat pemulihan terukir laser ini memungkinkan Anda memukul frase benih 24 kata Anda.',
        features: ['Tahan Api 3000°F', 'Tahan Asam', 'Bukti Tamper', 'Terukir Laser']
    },
    'fintech-04': {
        name: 'Dompet Hantu',
        tagline: 'Aset tak terlihat.',
        description: 'Dompet perangkat keras dengan penyangkalan yang masuk akal dan perutean tersembunyi.',
        longDescription: 'Dompet perangkat keras yang terlihat seperti kalkulator kartu kredit standar. Fitur partisi tersembunyi.',
        features: ['Partisi Umpan', 'Air-Gapped', 'Kamuflase Kalkulator', 'Penghancuran Diri']
    },
    'fintech-05': {
        name: "AI Kepatuhan",
        tagline: "Bukti audit.",
        description: "Kepatuhan pajak dan regulasi real-time untuk struktur DAO.",
        longDescription: "Navigasi ladang ranjau regulasi. Agen AI ini memantau transaksi perbendaharaan DAO secara real-time.",
        features: ['Audit DAO', 'Pembuatan Pajak', 'Perisai Regulasi', 'Peta Yurisdiksi']
    },
    'fintech-06': {
        name: "Node Maritim",
        tagline: "Hosting berdaulat.",
        description: "1/1000 saham rak server yang terletak di perairan internasional.",
        longDescription: "Desentralisasi sejati membutuhkan kedaulatan fisik. Sewa kepemilikan fraksional dari node server di tongkang otonom.",
        features: ['Perairan Internasional', 'Uplink Satelit', 'Kedaulatan Fisik', 'Hosting Imun']
    },
    'fintech-07': {
        name: 'DAO: OFFSHORE',
        tagline: 'Lompatan yurisdiksi.',
        description: 'Pengaturan entitas hukum otomatis di zona ramah kripto.',
        longDescription: 'Putar pembungkus hukum untuk DAO Anda dalam hitungan menit.',
        features: ['LLC Instan', 'Rekening Bank', 'Pembungkus Hukum', 'Perisai Privasi']
    },
    'fintech-08': {
        name: 'Layanan: WIPE',
        tagline: 'Awal baru.',
        description: 'Pengaburan riwayat kredit dan reset identitas digital.',
        longDescription: 'Hapus masa lalu. Layanan ini menggunakan celah hukum dan teknik peracunan data.',
        features: ['Perbaikan Kredit', 'Penghapusan Data', 'Reset Identitas', 'Celah Hukum']
    },
    'fintech-09': {
        name: 'AI Surga Pajak',
        tagline: 'Optimalkan kewajiban.',
        description: 'Agen AI yang merutekan keuntungan melalui perjanjian internasional.',
        longDescription: 'Simpan apa yang Anda hasilkan. AI ini menganalisis perjanjian pajak internasional secara real-time.',
        features: ['Analisis Perjanjian', 'Perutean Laba', 'Kepatuhan Otomatis', 'Multi-Yurisdiksi']
    },
    'fintech-10': {
        name: 'Bot Pinjaman Kilat',
        tagline: 'Eksekusi arbitrase.',
        description: 'Skrip pra-konfigurasi untuk mengeksekusi jutaan dalam pinjaman kilat.',
        longDescription: 'Bermain dengan paus. Skrip bot ini memungkinkan Anda meminjam jutaan aset kripto.',
        features: ['Tanpa Jaminan', 'Siap Aave/dYdX', 'Pustaka Strategi', 'Optimasi Gas']
    },

    // --- WELLNESS ---
    'well-01': {
        name: 'Pod Tidur: STASIS',
        tagline: 'Istirahat sempurna.',
        description: 'Kamar tidur pendingin cryo dengan isolasi sensorik.',
        longDescription: 'Pulih seperti atlet profesional. Pod STASIS menggunakan krioterapi ringan dan deprivasi sensorik total.',
        features: ['Pendinginan Cryo', 'Isolasi Suara', 'Bio-Monitoring', 'Optimasi REM']
    },
    'well-02': {
        name: 'Cincin Bio-Feedback',
        tagline: 'Kenali tubuhmu.',
        description: 'Cincin titanium untuk melacak HRV, stres, dan tidur.',
        longDescription: 'Pelacak kesehatan minimalis yang terbungkus titanium tingkat kedirgantaraan.',
        features: ['Pelacakan HRV', 'Analisis Stres', 'Data Tahap Tidur', 'Tahan Air']
    },
    'well-03': {
        name: 'Lampu Sirkadian: HELIOS',
        tagline: 'Cahaya matahari buatan.',
        description: 'Lampu pintar spektrum penuh yang sinkron dengan siklus surya alami.',
        longDescription: 'Lawan kesuraman kota bawah. Lampu HELIOS mereplikasi komposisi spektral sinar matahari alami.',
        features: ['Output 10k Lux', 'Sinkronisasi Surya', 'Bebas UV', 'Regulasi Suasana Hati']
    },
    'well-04': {
        name: 'Stim-Patch: FOCUS',
        tagline: 'Pengiriman dermal.',
        description: 'Patch transdermal yang mengirimkan kafein dan B12 pelepasan berkala.',
        longDescription: 'Lewati sistem pencernaan. Patch FOCUS memberikan aliran Kafein, Vitamin B12, dan L-Tyrosine yang stabil.',
        features: ['Pelepasan 8 Jam', 'Transdermal', 'Nol Kalori', 'Tanpa Gugup']
    },
    'well-05': {
        name: "Scrubber Alga",
        tagline: "Napas dalam.",
        description: 'Reaktor alga bio-luminescent yang menggosok CO2 dan melepaskan O2 murni.',
        longDescription: "Pemurnian udara industri untuk rumah. Reaktor ini menggunakan alga bio-luminescent yang dimodifikasi secara genetik.",
        features: ['Reduksi CO2', 'Generasi O2', 'Bioluminescent', 'Mandiri']
    },
    'well-06': {
        name: "Perisai Dermal",
        tagline: "Kulit 2.0.",
        description: "Lapisan polimer semprot. Pemblokir UV, tahan polusi, hidrofobik.",
        longDescription: "Baju besi untuk epidermis Anda. Semprotan polimer nanoteknologi ini menciptakan kulit kedua yang tidak terlihat.",
        features: ['Blok UV', 'Perisai Polusi', 'Hidrofobik', 'Tidak Terlihat']
    },
    'well-07': {
        name: 'Bot: IMMUNE',
        tagline: 'Pertahanan internal.',
        description: 'Nanobot aliran darah yang memburu patogen dan memperbaiki jaringan.',
        longDescription: 'Vaksin pamungkas. Koloni 10.000 nanobot yang dapat diprogram disuntikkan ke dalam aliran darah.',
        features: ['Pertahanan Viral', 'Perbaikan Jaringan', 'Agen Pembekuan', 'Replikasi Diri']
    },
    'well-08': {
        name: 'Selimut: GRAVITY',
        tagline: 'Tekanan dalam.',
        description: 'Selimut berat variabel dengan penenang haptic.',
        longDescription: 'Tidur lebih nyenyak. Selimut GRAVITY menggunakan ruang berisi cairan untuk menyesuaikan distribusi beratnya.',
        features: ['Berat Dapat Disesuaikan', 'Pijat Haptik', 'Kontrol Suhu', 'Reduksi Kecemasan']
    },
    'well-09': {
        name: 'Sepatu Gravitasi',
        tagline: 'Dekompresi.',
        description: 'Sepatu terapi inversi untuk kesehatan tulang belakang.',
        longDescription: 'Lawan kompresi gravitasi. Sepatu inversi ini memungkinkan Anda menggantung dengan aman secara terbalik.',
        features: ['Dekompresi Tulang Belakang', 'Kunci Aman', 'Kenyamanan Tinggi', 'Peningkatan Sirkulasi']
    },
    'well-10': {
        name: 'Bantal Pintar',
        tagline: 'Pendinginan aktif.',
        description: 'Bantal pengatur suhu dengan pelacakan siklus tidur.',
        longDescription: 'Sisi bantal yang dingin, selalu. Bantal pintar busa memori ini menggunakan lapisan pendingin cair.',
        features: ['Pendinginan Aktif', 'Pelacakan Tidur', 'Alarm Pintar', 'Busa Memori']
    },

    // --- AUTOMATION ---
    'auto-01': {
        name: 'Drone Pintar: OBSERVER',
        tagline: 'Mata di langit.',
        description: 'Drone keamanan otonom dengan pengenalan wajah dan jalur patroli.',
        longDescription: 'Amankan perimeter Anda. Drone OBSERVER berpatroli secara otonom di titik jalan yang ditentukan.',
        features: ['Patroli Otonom', 'Visi Malam 4K', 'Pengenalan Wajah', 'Pengisian Surya']
    },
    'auto-02': {
        name: 'Paket Skrip: OMNI',
        tagline: 'Kendalikan kastilmu.',
        description: 'Skrip otomatisasi universal untuk HomeOS dan perangkat IoT.',
        longDescription: 'Satu bahasa untuk menguasai semuanya. Paket skrip OMNI menyatukan ekosistem rumah pintar yang terfragmentasi.',
        features: ['Integrasi HomeOS', 'Kontrol Suara', 'Manajemen Energi', 'Protokol Keamanan']
    },
    'auto-03': {
        name: 'Pengontrol Hidro: VERDANT',
        tagline: 'Botani otomatis.',
        description: 'Manajemen nutrisi dan air berbasis AI untuk pengaturan hidroponik.',
        longDescription: 'Tumbuhkan makanan dalam kehampaan. Pengontrol VERDANT mengelola pH, EC, dan level air.',
        features: ['Penyeimbangan pH/EC', 'AI Pertumbuhan', 'Deteksi Kebocoran', 'Pemantauan Jarak Jauh']
    },
    'auto-04': {
        name: 'Lengan Servo: ASSIST',
        tagline: 'Tangan ketiga.',
        description: 'Lengan robot desktop untuk menyolder, memegang, dan tugas presisi.',
        longDescription: 'Pendamping meja kerja utama. Lengan robot 6-sumbu ini memiliki presisi sub-milimeter.',
        features: ['Gerakan 6-Sumbu', 'Kontrol Suara', 'Genggaman Presisi', 'API Sumber Terbuka']
    },
    'auto-05': {
        name: "Unit: KAI",
        tagline: "Asisten domestik.",
        description: "Platform robotika bipedal untuk pekerjaan rumah tangga. Baterai 4 jam.",
        longDescription: "Masa depan perbudakan domestik. KAI adalah robot bipedal setinggi 4 kaki yang mampu melakukan tugas rumah tangga yang kompleks.",
        features: ['Gerakan Bipedal', 'Pembelajaran Tugas', 'Baterai 4 Jam', 'Docking Otomatis']
    },
    'auto-06': {
        name: "Printer Nutri",
        tagline: "Masak dari kode.",
        description: "Printer makanan 3D menggunakan pasta kartrid. Cetak makanan dalam 5 menit.",
        longDescription: "Microwave abad ke-22. Unit manufaktur aditif ini mencetak makanan yang dapat dimakan dari kartrid pasta nutrisi.",
        features: ['Memasak Aditif', 'Resep Awan', 'Kartrid Pasta', 'Hitungan Kalori Tepat']
    },
    'auto-07': {
        name: 'Kawanan: CLEAN',
        tagline: 'Penghancur debu.',
        description: '100 drone mini untuk membersihkan area yang sulit dijangkau.',
        longDescription: 'Lepaskan kawanan. Sarang 100 drone seukuran kenari yang memetakan rumah Anda dan menggosok setiap permukaan.',
        features: ['AI Kawanan', 'Jaringan Mesh', 'Filtrasi HEPA', 'Operasi Senyap']
    },
    'auto-08': {
        name: 'Turret: SENTRY',
        tagline: 'Penyangkalan aktif.',
        description: 'Turret pelacak paintball/semprotan merica otomatis.',
        longDescription: 'Pertahanan rumah otomatis. Turret pelacak ini menggunakan sensor gerak dan pencitraan termal.',
        features: ['Pelacakan Gerak', 'Pencitraan Termal', 'Tembakan Jarak Jauh', 'Mode Pencegah']
    },
    'auto-09': {
        name: 'Bot Tukang Kebun',
        tagline: 'Jempol hijau.',
        description: 'Rover kecil untuk perawatan dan pemantauan tanaman dalam ruangan.',
        longDescription: 'Jaga hutan Anda tetap hidup. Rover kecil ini menavigasi rumah Anda, memeriksa kelembaban tanah.',
        features: ['Penginderaan Tanah', 'Penyiraman Otomatis', 'Database Tanaman', 'Penghindaran Rintangan']
    },
    'auto-10': {
        name: 'Kunci Pintar: RETINA',
        tagline: 'Kontrol akses.',
        description: 'Kunci pintu biometrik dengan pemindaian iris.',
        longDescription: 'Kunci sudah usang. Kunci pintar retrofit ini memindai iris Anda untuk membuka kunci pintu.',
        features: ['Pemindaian Iris', 'Log Masuk', 'Kunci Jarak Jauh', 'Bertenaga Baterai']
    },

    // --- TEMPLATES ---
    'temp-01': {
        name: 'Notion: LIFE_OS',
        tagline: 'Atur kekacauan.',
        description: 'Sistem operasi lengkap untuk produktivitas pribadi di Notion.',
        longDescription: 'Rapikan hidup Anda. LIFE_OS adalah ruang kerja Notion yang komprehensif.',
        features: ['Manajemen Proyek', 'Pelacakan Kebiasaan', 'Pelacak Keuangan', 'Mode Gelap']
    },
    'temp-02': {
        name: 'Kit UI: NEON_GRID',
        tagline: 'Desain masa depan.',
        description: 'Pustaka komponen UI Cyberpunk untuk Figma dan React.',
        longDescription: 'Bangun antarmuka yang terlihat seperti milik tahun 2077. Kit UI NEON_GRID menyediakan ratusan komponen pra-bangun.',
        features: ['Komponen Figma', 'Kode React', 'Gaya Cyberpunk', 'Set Ikon']
    },
    'temp-03': {
        name: 'Kitbash 3D: SLUMS',
        tagline: 'Bangun dunia bawah.',
        description: 'Paket aset 3D fidelitas tinggi untuk Blender dan Unreal Engine.',
        longDescription: 'Buat lingkungan distopia dalam hitungan menit. Set kitbash ini mencakup lebih dari 200 aset modular.',
        features: ['200+ Model', 'Tekstur 4K', 'Blender/UE5', 'Desain Modular']
    },
    'temp-04': {
        name: 'Paket Font: GLYPHS',
        tagline: 'Bahasa mesin.',
        description: 'Set 5 font tampilan futuristik dengan glyph alternatif.',
        longDescription: 'Tipografi untuk era pasca-manusia. Termasuk 5 keluarga font yang berbeda.',
        features: ['5 Keluarga Font', 'OTF/TTF/WOFF', 'Glyph UI', 'Lisensi Komersial']
    },
    'temp-05': {
        name: "OS Hukum",
        tagline: "Penasihat otomatis.",
        description: 'Templat kontrak dan sistem manajemen kasus untuk hukum siber.',
        longDescription: "Infrastruktur hukum siap pakai untuk era digital. Termasuk templat audit kontrak pintar.",
        features: ['Audit Kontrak Pintar', 'Generator NDA', 'Penugasan IP', 'Manajemen Kasus']
    },
    'temp-06': {
        name: "Paket Stream: VOID",
        tagline: "Siarkan diri Anda.",
        description: 'Overlay OBS minimalis dan berkinerja tinggi untuk streamer coding.',
        longDescription: "Paket streaming yang dirancang untuk pengembang. Overlay overhead CPU rendah.",
        features: ['Siap OBS', 'Integrasi IDE', 'Penggunaan CPU Rendah', 'Desain Minimalis']
    },
    'temp-07': {
        name: 'Dok: MANIFESTO',
        tagline: 'Mulai aliran sesat.',
        description: 'Struktur penulisan persuasif untuk manifesto dan kertas putih.',
        longDescription: 'Kata-kata menggerakkan dunia. Paket templat ini menyediakan kerangka struktural untuk manifesto berdampak tinggi.',
        features: ['Struktur Retoris', 'AI Persuasi', 'Panduan Tipografi', 'Ekspor PDF']
    },
    'temp-08': {
        name: 'Gen: WHITEPAPER',
        tagline: 'Kredibilitas instan.',
        description: 'Generator dokumen teknis untuk proyek kripto.',
        longDescription: 'Tampil meyakinkan. Generator ini membuat kertas putih tingkat profesional dengan format akademik.',
        features: ['Dukungan LaTeX', 'Format Akademik', 'Integrasi Bagan', 'Manajer Kutipan']
    },
    'temp-09': {
        name: 'Dasbor: ADMIN',
        tagline: 'Panel kontrol.',
        description: 'Templat dasbor admin React/Tailwind.',
        longDescription: 'Templat dasbor admin komprehensif yang dibangun dengan React dan Tailwind CSS.',
        features: ['React + Tailwind', 'Responsif', 'Bagan', 'Mode Gelap']
    },
    'temp-10': {
        name: 'App: FINTECH',
        tagline: 'Perbankan seluler.',
        description: 'Kit UI/UX untuk aplikasi keuangan seluler.',
        longDescription: 'Luncurkan aplikasi fintech Anda lebih cepat. Kit UI ini berisi lebih dari 100 layar.',
        features: ['100+ Layar', 'File Figma', 'iOS/Android', 'Prototipe']
    },

    // --- SECURITY ---
    'sec-01': {
        name: 'Jammer RF: SILENCE',
        tagline: 'Menjadi gelap.',
        description: 'Pemblokir sinyal portabel untuk frekuensi RF, WiFi, dan Seluler lokal.',
        longDescription: 'Buat zona mati digital. Unit SILENCE menciptakan gelembung 20 meter di mana tidak ada sinyal nirkabel.',
        features: ['Pemblokiran Wideband', 'Baterai Portabel', 'Antena Terarah', 'Mode Siluman']
    },
    'sec-02': {
        name: 'Pemindai Retina',
        tagline: 'Benteng biometrik.',
        description: 'Kunci pengenalan iris tingkat militer untuk kontrol akses fisik.',
        longDescription: 'Kunci bisa dicuri; mata Anda tidak. Pemindai retina flush-mount ini menggunakan pemetaan inframerah.',
        features: ['Pengenalan Iris', 'Deteksi Spoof', 'Log Berjaringan', 'Fail-Secure']
    },
    'sec-03': {
        name: 'Peredam Akustik',
        tagline: 'Diamkan ruangan.',
        description: 'Pemancar pembatalan kebisingan aktif untuk percakapan aman.',
        longDescription: 'Cegah mikrofon laser dan penyadapan. Perangkat meja ini memancarkan white noise ultrasonik.',
        features: ['Perisai Ultrasonik', 'Transduser Getaran', 'Portabel', 'Anti-Mikrofon Laser']
    },
    'sec-04': {
        name: 'Penghancur Data: THERMITE',
        tagline: 'Penghapusan fisik.',
        description: 'Muatan termit kompak untuk penghancuran hard drive instan.',
        longDescription: 'Ketika menghapus drive tidak cukup. Kantong THERMITE dipasang langsung ke HDD atau SSD standar.',
        features: ['Pembakaran 4000°F', 'Pemicu Jarak Jauh', 'Slag Instan', 'Bukti Forensik']
    },
    'sec-05': {
        name: "Pena EMP",
        tagline: "Tombol matikan.",
        description: 'Generator pulsa elektromagnetik terarah sekali pakai.',
        longDescription: "Pena taktis diskrit yang mampu memancarkan pulsa elektromagnetik terfokus.",
        features: ['EMP Terarah', 'Jangkauan Efektif 1m', 'Sekali Pakai', 'Faktor Bentuk Diskrit']
    },
    'sec-06': {
        name: "Tenda Faraday",
        tagline: "Sinyal nol.",
        description: 'Selubung tidur portabel yang memblokir semua sinyal RF, GPS, dan Seluler.',
        longDescription: "Benar-benar off-grid saat Anda tidur. Tenda pop-up ini dilapisi dengan kain tembaga-nikel.",
        features: ['Atenuasi 100dB', 'Pengaturan Pop-Up', 'Lapisan Termal', 'Portabel']
    },
    'sec-07': {
        name: 'Topeng: VOX',
        tagline: 'Ubah suara.',
        description: 'Topeng pengubah suara penggeser forman real-time.',
        longDescription: 'Anonimkan tanda tangan audio Anda. Topeng VOX memproses suara Anda secara real-time.',
        features: ['Penggeseran Forman', 'Latensi Nol', 'Gaya Respirator', 'Bertenaga Baterai']
    },
    'sec-08': {
        name: 'Kunci: QUANTUM',
        tagline: 'Tak terpecahkan.',
        description: 'Fob kunci pasangan terjerat kuantum untuk entri aman absolut.',
        longDescription: 'Kunci anti-lockpick pamungkas. Fob ini berisi partikel yang terjerat dengan kunci yang cocok.',
        features: ['Pasangan Terjerat', 'Bukti Tamper', 'Peringatan Instan', 'Berbasis Fisika']
    },
    'sec-09': {
        name: 'Jammer Drone',
        tagline: 'Zona larangan terbang.',
        description: 'Perangkat genggam untuk mendaratkan drone tidak sah dengan aman.',
        longDescription: 'Kendalikan wilayah udara Anda. Perangkat genggam ini mengganggu frekuensi kontrol drone komersial.',
        features: ['Jangkauan 1km', 'Pendaratan Aman', 'Genggam', 'Dapat Diisi Ulang']
    },
    'sec-10': {
        name: 'Bio-Safe',
        tagline: 'Penyimpanan aman.',
        description: 'Brankas portabel dengan verifikasi sidik jari dan DNA.',
        longDescription: 'Untuk barang-barang paling sensitif Anda. Brankas portabel ini menggunakan kunci biometrik lapisan ganda.',
        features: ['Verifikasi DNA', 'Pemindaian Sidik Jari', 'Serat Karbon', 'Pelacakan GPS']
    }
};
