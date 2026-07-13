import { ServiceItem, TechItem, PortfolioItem, TestimonialItem, FAQItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "web-app",
    title: "Modern Web Application",
    description: "Membangun aplikasi web interaktif berskala tinggi dengan arsitektur modern (React, Next.js, Vite). Mengutamakan performa ekstrim, responsivitas penuh, dan UI/UX intuitif.",
    iconName: "Globe",
    features: [
      "Arsitektur SPA / SSR Berkinerja Tinggi",
      "Sistem Integrasi API Mandiri & Pihak Ketiga",
      "Pemuatan Kilat (Lighthouse Score > 95)",
      "Optimasi SEO & PWA (Progressive Web App)"
    ],
    gradient: "from-blue-600 to-cyan-500",
    targetIndustries: ["Startup", "Digital Agency", "E-Commerce", "SaaS"]
  },
  {
    id: "custom-system",
    title: "Sistem Informasi & Dashboard",
    description: "Mengubah data operasional yang rumit menjadi dashboard analisis yang indah. ERP kustom, CRM, HRIS, serta sistem inventori yang dirancang khusus untuk alur kerja unik Anda.",
    iconName: "LayoutDashboard",
    features: [
      "Visualisasi Data Real-Time (D3.js / Recharts)",
      "Manajemen Hak Akses Pengguna Terenkripsi",
      "Ekspor Laporan (PDF, Excel, CSV) Instan",
      "Automasi Workflow & Notifikasi Terpadu"
    ],
    gradient: "from-indigo-600 to-purple-500",
    targetIndustries: ["Perusahaan", "Pemerintahan", "Properti", "Pabrik"]
  },
  {
    id: "ecommerce-portal",
    title: "Sistem E-Commerce & Retail",
    description: "Toko online berperforma tinggi, sistem keranjang terintegrasi payment gateway nasional, dan manajemen inventori gudang otomatis.",
    iconName: "ShoppingBag",
    features: [
      "Integrasi Payment Gateway Otomatis",
      "Manajemen Stok Real-Time Terpusat",
      "Sistem Kalkulator Ongkir Otomatis",
      "Dashboard Laporan Penjualan Interaktif"
    ],
    gradient: "from-teal-500 to-emerald-400",
    targetIndustries: ["Ritel", "Toko Online", "UMKM", "Distributor"]
  },
  {
    id: "edu-portal",
    title: "Portal Akademik & Ed-Tech",
    description: "Sistem Manajemen Pembelajaran (LMS), portal informasi sekolah, universitas, platform ujian online, serta database alumni terpusat dengan navigasi mulus.",
    iconName: "GraduationCap",
    features: [
      "Learning Management System (LMS)",
      "Portal Nilai & Presensi Siswa",
      "Penerimaan Peserta Didik Baru (PPDB)",
      "Platform Ujian Online Anti-Curang"
    ],
    gradient: "from-amber-500 to-orange-500",
    targetIndustries: ["Sekolah", "Universitas", "Bimbel", "Kursus Online"]
  },
  {
    id: "hospitality-prop",
    title: "Sistem Properti & Perhotelan",
    description: "Platform pemasaran properti interaktif, sistem booking kamar hotel, manajemen reservasi restoran, serta portal transaksi agen real estat.",
    iconName: "Home",
    features: [
      "Tur Virtual & Galeri 3D Terintegrasi",
      "Sistem Manajemen Kamar & Booking Kalender",
      "Sistem Kasir & Invoice Otomatis",
      "Integrasi Payment Gateway Nasional"
    ],
    gradient: "from-rose-500 to-pink-500",
    targetIndustries: ["Properti", "Hotel", "Restoran", "Resort"]
  }
];

export const TECH_STACKS: TechItem[] = [
  // Frontend
  { name: "React.js / Vite", category: "frontend", iconName: "React", description: "Standard modern untuk SPA super responsif." },
  { name: "Next.js", category: "frontend", iconName: "Next", description: "Pengoptimalan SEO dan Server-Side Rendering." },
  { name: "TypeScript", category: "frontend", iconName: "TypeScript", description: "Menghindari bug runtime dengan static typing." },
  { name: "Tailwind CSS v4", category: "frontend", iconName: "Tailwind", description: "Sistem styling kelas dunia yang ultra-ringan." },
  { name: "Framer Motion", category: "frontend", iconName: "Motion", description: "Animasi mikro-interaksi yang mewah & elegan." },

  // Backend
  { name: "Express / Node.js", category: "backend", iconName: "Node", description: "Runtime Javascript cepat untuk backend skalabel." },
  { name: "Go (Golang)", category: "backend", iconName: "Go", description: "Performa konkurensi ekstrim untuk mikroservis." },
  { name: "Python FastAPI", category: "backend", iconName: "Python", description: "Backend optimal untuk machine learning & AI." },

  // Database
  { name: "PostgreSQL", category: "database", iconName: "Postgres", description: "Database relasional tangguh dengan integritas data tinggi." },
  { name: "MongoDB", category: "database", iconName: "Mongo", description: "Penyimpanan dokumen NoSQL yang dinamis & fleksibel." },
  { name: "Google Cloud Firestore", category: "database", iconName: "Firebase", description: "Database NoSQL real-time dari Google Cloud." },
  { name: "Redis", category: "database", iconName: "Redis", description: "Caching super cepat untuk performa database." },

  // Cloud & Infra
  { name: "Google Cloud Platform", category: "cloud", iconName: "GCP", description: "Infrastruktur cloud andal berstandar Fortune 500." },
  { name: "Docker", category: "cloud", iconName: "Docker", description: "Standard kontainerisasi untuk konsistensi deployment." },
  { name: "AWS", category: "cloud", iconName: "AWS", description: "Ekosistem cloud terlengkap untuk kebutuhan global." },
  { name: "Vercel / Cloud Run", category: "cloud", iconName: "Vercel", description: "Hosting modern dengan integrasi CI/CD otomatis." }
];

export const PORTFOLIOS: PortfolioItem[] = [
  {
    id: "port-1",
    title: "MedikaCare EMR & Antrean Online",
    client: "MedikaCare Group",
    industry: "Klinik & Rumah Sakit",
    description: "Transformasi digital sistem rekam medis elektronik (EMR) kustom terenkripsi, dilengkapi portal registrasi mandiri pasien berbasis website yang mengurangi waktu tunggu antrean fisik hingga 70%.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    tags: ["Med-Tech", "Dashboard kustom", "Database Enkripsi"],
    results: ["Reduksi antrean fisik 70%", "99.9% uptime sistem medis", "Integrasi BPJS sukses 100%"],
    techUsed: ["React.js", "TypeScript", "Node.js Express", "PostgreSQL", "Tailwind CSS"]
  },
  {
    id: "port-2",
    title: "Vexa Residence Property Explorer",
    client: "Vexa Land Indonesia",
    industry: "Properti & Real Estat",
    description: "Situs web pemasaran properti imersif kelas atas dengan visualisasi unit 3D interaktif, peta lokasi dinamis, simulator KPR otomatis, dan integrasi WhatsApp CRM tim penjualan.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    tags: ["Property", "3D Interactive Map", "CRM Integration"],
    results: ["Kenaikan prospek (leads) harian 140%", "Waktu interaksi pengunjung naik 3x lipat", "Desain eksklusif bersertifikat"],
    techUsed: ["Vite React", "Three.js", "Framer Motion", "Tailwind CSS", "Express"]
  },
  {
    id: "port-3",
    title: "EduLearn LMS & Portal Mahasiswa",
    client: "Universitas Indonesia Jaya",
    industry: "Sekolah & Universitas",
    description: "Sistem Manajemen Pembelajaran (LMS) modern yang kuat untuk menampung lebih dari 15.000 pengguna aktif harian, dilengkapi fitur kuis online anti-curang, ruang diskusi interaktif, dan absensi geolokasi.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    tags: ["Ed-Tech", "LMS", "Sistem Skala Besar"],
    results: ["15,000+ pengguna aktif lancar", "Koneksi database optimal < 100ms", "User satisfaction score 4.8/5.0"],
    techUsed: ["Next.js (React)", "Express", "MongoDB", "Redis Caching", "Tailwind CSS"]
  },
  {
    id: "port-4",
    title: "Stripe-like Billing & Client Dashboard",
    client: "Lumina Digital Agency",
    industry: "Digital Agency & Startup",
    description: "Dashboard pengelolaan klien, tagihan otomatis terintegrasi Payment Gateway, pelacakan progress proyek interaktif, serta repositori dokumen hukum terpusat dengan UX sekelas Stripe.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    tags: ["SaaS", "Payment Gateway", "Client Portal"],
    results: ["Proses invoicing hemat waktu 18 jam/minggu", "Pembayaran klien 5x lebih cepat", "UI modern pemenang penghargaan"],
    techUsed: ["React Vite", "TypeScript", "Stripe API Integration", "Google Cloud Storage", "Recharts"]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Budi Santoso",
    role: "Pemilik Usaha",
    company: "Nusantara Cargo",
    industry: "Logistik & Transportasi",
    avatar: "",
    rating: 5,
    content: "Membangun sistem inventori gudang dengan Clinik Coding adalah keputusan terbaik kami. Komunikasi mereka sangat transparan, kode rapi, dan sistem pencatatan stok kami berjalan sangat mulus dan aman tanpa kendala."
  },
  {
    id: "test-2",
    name: "Siti Rahma",
    role: "Marketing Manager",
    company: "Sinar Jaya Properti",
    industry: "Properti",
    avatar: "",
    rating: 5,
    content: "Website profil properti kami terlihat sangat bersih dan modern! Whitespace yang berani dan animasi transisi yang sangat halus berhasil mendongkrak minat calon pembeli. Kenaikan leads harian kami terasa nyata sejak peluncuran."
  },
  {
    id: "test-3",
    name: "Agus Prasetyo",
    role: "Kepala IT",
    company: "Yayasan Bina Bangsa",
    industry: "Sekolah & Pendidikan",
    avatar: "",
    rating: 5,
    content: "Sistem ujian online kustom buatan Clinik Coding mampu menahan beban ribuan siswa kami saat ujian serentak tanpa kendala lambat sedikit pun. Dukungan teknis mereka sangat responsif dan dapat diandalkan."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Berapa lama estimasi pengerjaan sebuah proyek website/sistem?",
    answer: "Durasi pengerjaan sangat bervariasi bergantung pada kompleksitas fitur. Untuk landing page premium umumnya memakan waktu 2-3 minggu. Sedangkan untuk aplikasi web kustom kustom, dashboard admin, atau portal sistem informasi biasanya memerlukan waktu 5-8 minggu."
  },
  {
    id: "faq-2",
    question: "Apakah klien mendapatkan akses penuh terhadap kode sumber (Source Code)?",
    answer: "Ya, 100%! Transparansi adalah nilai inti kami. Seluruh source code akan kami serahkan dalam repositori GitHub privat milik klien. Hak kepemilikan intelektual sepenuhnya menjadi milik Anda setelah proyek selesai dilunasi."
  },
  {
    id: "faq-3",
    question: "Teknologi apa saja yang biasanya digunakan oleh Clinik Coding?",
    answer: "Kami menggunakan teknologi modern standar industri startup unicorn seperti React, Vite, Next.js, dan TypeScript untuk frontend demi kecepatan rendering maksimal. Untuk backend, kami mengandalkan Node.js Express, Go, atau Python FastAPI, didukung database PostgreSQL, MongoDB, atau Google Cloud Firestore."
  },
  {
    id: "faq-4",
    question: "Bagaimana dengan layanan pemeliharaan (maintenance) setelah website dirilis?",
    answer: "Setiap proyek baru mendapatkan garansi pemeliharaan gratis selama 3 bulan pertama. Ini mencakup perbaikan bug, pemantauan performa server, dan pembaruan sistem keamanan minor. Setelah itu, kami menyediakan paket dukungan bulanan yang fleksibel sesuai kebutuhan operasional Anda."
  },
  {
    id: "faq-5",
    question: "Apakah Clinik Coding melayani integrasi API pihak ketiga (misalnya Payment Gateway)?",
    answer: "Tentu saja. Kami berpengalaman mengintegrasikan berbagai jenis API pihak ketiga: payment gateway nasional (Midtrans, Xendit, Stripe), pengiriman (RajaOngkir), SMS/WhatsApp gateway (Twilio, Fonete), peta lokasi (Google Maps API), hingga sistem autentikasi single-sign-on (SSO) Google dan Firebase."
  }
];
