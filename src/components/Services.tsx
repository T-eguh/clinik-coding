import React, { useState } from "react";
import {
  Briefcase,
  Layout,
  LayoutDashboard,
  Database,
  GraduationCap,
  BookOpen,
  Activity,
  Home,
  ShoppingBag,
  Globe,
  Search,
  Settings,
  Sparkles,
  ArrowUpRight,
  X,
  CheckCircle,
  AlertCircle,
  Cpu,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceDetail {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  gradient: string;
  problem: string;
  solution: string;
  benefits: string[];
  techStack: string[];
  ctaText: string;
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const listServices: ServiceDetail[] = [
    {
      id: "company-profile",
      title: "Company Profile",
      desc: "Website presentasi bisnis premium yang elegan, memancarkan kredibilitas, & bercerita secara visual.",
      icon: Briefcase,
      gradient: "from-blue-600 to-indigo-500",
      problem: "Desain website terlihat kaku, lambat dibuka, dan tidak responsif sehingga merusak kredibilitas bisnis Anda di mata klien korporasi potensial.",
      solution: "Kami merancang website profil perusahaan berstandar premium dunia dengan arsitektur modern, tipografi kokoh, animasi mikro-interaksi yang kaya, dan kecepatan pemuatan kilat.",
      benefits: [
        "Membangun kredibilitas instan di mata calon investor & klien besar",
        "Kecepatan pemuatan sub-detik untuk memastikan pengunjung tidak pergi",
        "Optimalisasi SEO penuh untuk mengalahkan kompetitor Anda di Google Search",
        "Layout responsif sempurna di perangkat mobile, tablet, dan monitor ultra-lebar"
      ],
      techStack: ["React 19", "Tailwind CSS", "Vite", "Motion (Framer)", "GSAP"],
      ctaText: "Mulai Rancang Company Profile Elit"
    },
    {
      id: "landing-page",
      title: "Landing Page",
      desc: "Halaman penawaran konversi tinggi dengan pesan terfokus, kecepatan kilat, & optimalisasi SEO.",
      icon: Layout,
      gradient: "from-cyan-500 to-blue-600",
      problem: "Rasio konversi kampanye iklan digital Anda rendah karena landing page lambat dimuat, pesan penawaran membingungkan, dan tombol CTA tidak persuasif.",
      solution: "Landing page berkinerja tinggi yang menggabungkan copywriting persuasif ala UX Writer Stripe, arsitektur tanpa hambatan, dan pengujian kegunaan mendalam untuk mendorong tindakan instan.",
      benefits: [
        "Memaksimalkan pengembalian anggaran iklan digital Anda (ROAS tinggi)",
        "Struktur satu halaman terfokus tanpa distraksi visual eksternal",
        "Rasio pentalan (bounce rate) di bawah 25% dengan optimasi aset pintar",
        "Integrasi pelacakan konversi (Meta Pixel, Google Analytics) bawaan"
      ],
      techStack: ["React 19", "Tailwind CSS", "Zod Validation", "React Hook Form"],
      ctaText: "Bangun Landing Page Konversi Tinggi"
    },
    {
      id: "dashboard-admin",
      title: "Dashboard Admin",
      desc: "Antarmuka pemantauan data & kontrol operasional yang kaya fitur, visual, & terstruktur rapi.",
      icon: LayoutDashboard,
      gradient: "from-purple-600 to-indigo-500",
      problem: "Pengelolaan data internal perusahaan masih manual lewat spreadsheet yang lambat, berantakan, serta tidak memiliki visualisasi tren bisnis yang jelas.",
      solution: "Aplikasi panel kontrol (dashboard admin) kustom yang mengubah kumpulan data rumit menjadi visualisasi interaktif yang elegan dan intuitif untuk mempercepat pengambilan keputusan.",
      benefits: [
        "Visualisasi data real-time menggunakan grafik canggih & responsif",
        "Sistem kontrol hak akses peran (RBAC) yang aman untuk integritas data",
        "Fitur ekspor laporan instan dalam format PDF, Excel, dan CSV",
        "Sistem notifikasi internal terintegrasi untuk tim operasional"
      ],
      techStack: ["React", "TanStack Query", "Recharts", "D3.js", "Express.js"],
      ctaText: "Klaim Dashboard Admin Bisnis Anda"
    },
    {
      id: "sistem-informasi",
      title: "Sistem Informasi",
      desc: "Arsitektur sistem manajemen terpusat (ERP/CRM/HRIS) yang disesuaikan dengan alur kerja internal Anda.",
      icon: Database,
      gradient: "from-indigo-600 to-purple-500",
      problem: "Sistem kerja operasional tidak terintegrasi, komunikasi antar divisi lambat, dan pengelolaan database rawan kebocoran atau kehilangan.",
      solution: "Pengembangan sistem informasi internal kustom (ERP/CRM/HRIS) tangguh berskala enterprise yang mengotomatisasi alur kerja manual Anda tanpa celah.",
      benefits: [
        "Mengurangi human-error dan menghemat ratusan jam kerja bulanan",
        "Penyimpanan database terpusat dengan enkripsi end-to-end",
        "Integrasi alur kerja (workflow) otomatis antar departemen perusahaan",
        "Audit log aktivitas lengkap untuk keamanan kepatuhan internal"
      ],
      techStack: ["Node.js", "Express", "TypeScript", "MySQL / PostgreSQL", "Prisma"],
      ctaText: "Konsultasikan Arsitektur Sistem Kustom"
    },
    {
      id: "website-sekolah",
      title: "Website Sekolah",
      desc: "Portal edukasi yang menghubungkan guru, murid, & orang tua, lengkap dengan modul pengumuman.",
      icon: GraduationCap,
      gradient: "from-amber-500 to-orange-500",
      problem: "Proses pendaftaran siswa baru masih manual, penyampaian informasi ke orang tua lambat, dan sekolah kekurangan citra digital yang prestisius.",
      solution: "Portal edukasi sekolah interaktif terpadu dengan modul PPDB (Penerimaan Peserta Didik Baru) online, papan informasi dinamis, dan sistem publikasi prestasi sekolah.",
      benefits: [
        "PPDB Online otomatis menghemat waktu panitia pendaftaran",
        "Portal komunikasi instan yang mendekatkan relasi sekolah & orang tua",
        "Mendongkrak reputasi dan daya saing sekolah di era digital",
        "Kemudahan pengelolaan konten oleh staf tanpa keahlian pemrograman"
      ],
      techStack: ["React", "Express.js", "MySQL", "Tailwind CSS"],
      ctaText: "Modernisasi Website Sekolah Anda"
    },
    {
      id: "website-kampus",
      title: "Website Kampus",
      desc: "Sistem portal akademik skala besar dengan ketahanan beban tinggi, ramah pengguna, & modern.",
      icon: BookOpen,
      gradient: "from-orange-500 to-red-500",
      problem: "Situs web universitas sering kali crash saat pengisian KRS serentak, navigasi kurikulum berantakan, dan sistem database mahasiswa tidak terpusat.",
      solution: "Sistem portal akademik universitas tangguh, menggunakan caching cerdas dan penanganan konkurensi server tingkat tinggi untuk menjamin uptime mutlak.",
      benefits: [
        "Jaminan stabilitas server 99.9% meskipun diakses puluhan ribu mahasiswa sekaligus",
        "Sistem integrasi KRS, IPK, dan data alumni yang mulus",
        "Keamanan tinggi setara institusi perbankan untuk proteksi rekam nilai",
        "Pencarian publikasi jurnal ilmiah yang terstruktur rapi"
      ],
      techStack: ["Next.js", "Redis Caching", "Node.js Express", "PostgreSQL", "AWS"],
      ctaText: "Bangun Portal Akademik Skalabel"
    },
    {
      id: "website-ecommerce",
      title: "E-Commerce & Toko Online",
      desc: "Sistem toko online modern dengan katalog interaktif, integrasi payment gateway, & manajemen stok.",
      icon: ShoppingBag,
      gradient: "from-teal-500 to-emerald-400",
      problem: "Sistem manajemen stok manual yang rawan selisih, proses pembayaran manual lambat, dan tidak adanya pelacakan otomatis pesanan pelanggan.",
      solution: "Platform e-commerce performa tinggi terintegrasi payment gateway (Midtrans/Stripe) dan kurir pengiriman, lengkap dengan sinkronisasi inventori otomatis.",
      benefits: [
        "Transaksi pembayaran otomatis terverifikasi instan tanpa cek mutasi manual",
        "Manajemen inventori dinamis yang mencegah penjualan barang habis",
        "Sistem pelacakan resi pengiriman real-time bagi pelanggan",
        "Dashboard analitik laporan penjualan dan tren produk terpopuler"
      ],
      techStack: ["React 19", "Node.js Express", "TypeScript", "PostgreSQL", "Midtrans / Stripe API"],
      ctaText: "Bangun Toko Online Skalabel"
    },
    {
      id: "website-properti",
      title: "Website Properti",
      desc: "Katalog properti modern dengan tur virtual, simulator kredit KPR otomatis, & pengumpul leads.",
      icon: Home,
      gradient: "from-rose-500 to-pink-500",
      problem: "Calon pembeli kesulitan melihat detail proyek hunian secara interaktif, simulator kredit yang membingungkan, dan leads pembeli premium terbuang sia-sia.",
      solution: "Situs showcase properti imersif mewah dengan peta interaktif, visualisasi galeri berkualitas tinggi, kalkulator cicilan KPR instan, dan integrasi WhatsApp CRM otomatis.",
      benefits: [
        "Meningkatkan interaksi pengunjung hingga 3x lipat dibanding brosur fisik",
        "Mengumpulkan leads calon pembeli properti berkualitas secara otomatis",
        "Memberikan pengalaman eksklusif yang memikat segmen pembeli premium",
        "Manajemen unit properti (terjual/tersedia) secara real-time"
      ],
      techStack: ["React", "Framer Motion", "Tailwind v4", "Google Maps Platform"],
      ctaText: "Mulai Project Website Properti"
    },
    {
      id: "e-commerce",
      title: "E-Commerce",
      desc: "Toko online premium dengan alur checkout mulus, kalkulator ongkir otomatis, & payment gateway.",
      icon: ShoppingBag,
      gradient: "from-pink-500 to-red-500",
      problem: "Tingkat keranjang belanja terbengkalai (abandoned cart) tinggi akibat alur checkout panjang, kalkulasi ongkos kirim manual, dan pembayaran yang rumit.",
      solution: "Toko online modern dengan optimasi satu halaman checkout, kalkulasi tarif pengiriman real-time seluruh ekspedisi, serta payment gateway otomatis.",
      benefits: [
        "Menekan angka cart abandonment rate hingga di bawah 15%",
        "Proses checkout super cepat kurang dari 1 menit",
        "Menerima pembayaran otomatis lewat Transfer Bank, e-Wallet, & Qris 24/7",
        "Dashboard inventori barang, data pelanggan, dan analisis penjualan komprehensif"
      ],
      techStack: ["React", "Express.js", "Midtrans / Stripe Integration", "Redis"],
      ctaText: "Mulai Jualan dengan Toko Online Premium"
    },
    {
      id: "web-application",
      title: "Web Application (SaaS)",
      desc: "Aplikasi web interaktif (SaaS) berbasis React & Node dengan performa real-time & skalabilitas tinggi.",
      icon: Globe,
      gradient: "from-violet-500 to-purple-600",
      problem: "Ingin membangun model bisnis Software-as-a-Service (SaaS) namun kesulitan mencari partner engineering handal untuk merancang pondasi produk yang skalabel.",
      solution: "Pengembangan platform aplikasi web modern yang didesain secara modular, terproteksi, menggunakan database handal, siap mendukung puluhan ribu pengguna aktif harian.",
      benefits: [
        "Meluncurkan produk versi MVP (Minimum Viable Product) 2x lebih cepat ke pasar",
        "Penerapan arsitektur cloud otomatis yang efisien untuk menekan biaya server",
        "Sistem integrasi sistem penagihan (billing) & modul langganan bawaan",
        "Antarmuka pengguna (UI/UX) sekelas produk teknologi global terkemuka"
      ],
      techStack: ["React Vite", "TypeScript", "Node.js Express", "Cloud Run", "Docker"],
      ctaText: "Wujudkan Produk SaaS Anda"
    },
    {
      id: "seo",
      title: "SEO Specialist",
      desc: "Optimasi teknis komprehensif, riset kata kunci strategis, demi peringkat puncak Google Search.",
      icon: Search,
      gradient: "from-emerald-500 to-teal-500",
      problem: "Kompetitor Anda menguasai halaman pertama hasil pencarian Google, sementara bisnis Anda tidak terlihat, memaksa Anda terus membakar anggaran iklan.",
      solution: "Audit teknis SEO menyeluruh, optimalisasi kecepatan loading web, injeksi struktur skema data JSON-LD lokal, serta strategi riset kata kunci komersial bertarget tinggi.",
      benefits: [
        "Aliran trafik pembeli potensial secara organik dan gratis setiap hari dari Google",
        "Membangun otoritas merk yang kuat di industri Anda secara berkelanjutan",
        "Mengurangi ketergantungan dan biaya anggaran iklan digital (CAC rendah)",
        "Struktur website yang ramah bagi robot crawler Google & mesin pencari lain"
      ],
      techStack: ["Google Search Console", "Google Analytics", "JSON-LD Schema", "Lighthouse"],
      ctaText: "Kuasai Halaman Pertama Google"
    },
    {
      id: "maintenance",
      title: "Pemeliharaan & Support",
      desc: "Layanan pemeliharaan server, audit bug berkala, pembaruan keamanan, & bantuan darurat teknis.",
      icon: Settings,
      gradient: "from-slate-600 to-slate-800",
      problem: "Takut website bisnis diretas, database hilang tiba-tiba, atau website mendadak lambat tanpa ada tim IT internal yang siaga membantu memulihkannya.",
      solution: "Dukungan tim DevOps & Engineer Clinik Coding yang siaga mengawasi uptime server, merilis pembaruan keamanan berkala, dan melakukan pencadangan otomatis harian.",
      benefits: [
        "Ketenangan pikiran total (peace of mind) tanpa pusing memikirkan teknis",
        "Pencadangan (backup) otomatis data sistem & media ke cloud eksternal secara berkala",
        "Pemantauan status uptime 24/7 dengan respons tanggap darurat instan",
        "Pembaruan berkala library kode guna mencegah kerentanan keamanan baru"
      ],
      techStack: ["PM2", "Nginx Config", "Automated Bash Scripts", "Cron Jobs", "Winston"],
      ctaText: "Dapatkan Proteksi Website Premium"
    }
  ];

  const handleScrollToContact = () => {
    setSelectedService(null);
    window.location.hash = "#contact";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 85, damping: 13 }
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 relative scroll-mt-16 text-left">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>SOLUSI SPESIALIS DIGITAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark mb-4">
            Layanan Rekayasa Perangkat Lunak Elit
          </h2>
          <p className="text-slate-650 font-sans text-base leading-relaxed">
            Kami tidak hanya membangun baris kode. Kami mendiagnosis hambatan bisnis Anda, merancang arsitektur sistem informasi modern, dan meluncurkan produk digital yang mengutamakan konversi, kecepatan, serta keamanan mutlak.
          </p>
        </div>

        {/* 3-Column Bento-style Grid */}
        <motion.div
          id="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {listServices.map((srv, idx) => {
            const IconComponent = srv.icon;
            return (
              <motion.div
                key={srv.id}
                variants={cardVariants}
                onClick={() => setSelectedService(srv)}
                className="bg-white hover:bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.03] group cursor-pointer hover:border-slate-300 relative overflow-hidden"
              >
                <div>
                  {/* Icon Block with dynamic gradient */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${srv.gradient} flex items-center justify-center text-white shadow-md mb-6 group-hover:rotate-6 transition-transform duration-300 shrink-0`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-brand-dark mb-2.5 group-hover:text-brand-primary transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans mb-6">
                    {srv.desc}
                  </p>
                </div>

                {/* Footer/Action indicator */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                    ANALISIS & DETAIL SOLUSI
                  </span>
                  <div className="text-xs font-semibold text-brand-primary group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                    <span>Lihat Solusi</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dynamic Service Overlay Detail Modal (Stripe Style) */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Dark backdrop blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10 flex flex-col max-h-[90vh]"
              >
                {/* Header panel with gradient banner */}
                <div className={`p-6 sm:p-8 bg-gradient-to-r ${selectedService.gradient} text-white relative`}>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label="Tutup Detail"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center border border-white/10 shrink-0">
                      {React.createElement(selectedService.icon, { className: "w-6 h-6 text-white" })}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">PREMIUM SERVICE ANALYSIS</span>
                      <h3 className="text-xl sm:text-2xl font-heading font-extrabold leading-tight">
                        {selectedService.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
                  {/* Problem Block */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Masalah yang Sering Dihadapi Klien</span>
                    </div>
                    <p className="text-slate-600 text-sm font-sans leading-relaxed bg-rose-500/5 border border-rose-100/50 p-4 rounded-xl">
                      {selectedService.problem}
                    </p>
                  </div>

                  {/* Solution Block */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-brand-primary font-mono text-xs font-bold uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>Solusi yang Clinik Coding Berikan</span>
                    </div>
                    <p className="text-slate-750 text-sm font-sans leading-relaxed bg-blue-500/5 border border-blue-100/50 p-4 rounded-xl">
                      {selectedService.solution}
                    </p>
                  </div>

                  {/* Business Benefits */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-bold uppercase tracking-wider">
                      <TrendingUp className="w-4 h-4 shrink-0" />
                      <span>Manfaat Nyata bagi Bisnis Anda</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.benefits.map((benefit, i) => (
                        <li key={i} className="flex gap-2.5 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="w-4.5 h-4.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold">✓</span>
                          </div>
                          <span className="text-xs text-slate-650 leading-normal font-sans">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-xs font-bold uppercase tracking-wider">
                      <Cpu className="w-4 h-4 shrink-0" />
                      <span>Teknologi Standar Industri yang Digunakan</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedService.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200/50 text-slate-700 text-[11px] font-mono font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and Call to Action */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">KONSULTASI GRATIS 1-ON-1</span>
                    <span className="text-xs text-slate-500 font-sans">Diskusikan kebutuhan proyek spesifik Anda hari ini</span>
                  </div>
                  <button
                    onClick={handleScrollToContact}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r ${selectedService.gradient} text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer`}
                  >
                    <span>{selectedService.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
