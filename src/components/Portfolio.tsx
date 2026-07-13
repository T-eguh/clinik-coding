import React, { useState } from "react";
import { Sparkles, Eye, X, CheckCircle2, Code, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioItemLocal {
  id: string;
  title: string;
  client: string;
  category: "Education" | "Logistics" | "Corporate" | "Property" | "Startup" | "Government";
  description: string;
  image: string;
  results: string[];
  techUsed: string[];
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Sektor");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeItem, setActiveItem] = useState<PortfolioItemLocal | null>(null);

  const categories = [
    "All Sektor",
    "Education",
    "Logistics",
    "Corporate",
    "Property",
    "Startup",
    "Government"
  ];

  const portfolios: PortfolioItemLocal[] = [
    {
      id: "port-1",
      title: "Sistem Logistik & Inventori Nusantara",
      client: "PT Nusantara Cargo",
      category: "Logistics",
      description: "Pengembangan sistem manajemen gudang (WMS) kustom terintegrasi dengan pelacak armada logistik berbasis peta interaktif secara real-time. Mempercepat akurasi stok barang hingga 99.8%.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      results: ["Akurasi audit stok naik menjadi 99.8%", "Otomasi rute logistik menghemat bahan bakar 15%", "99.9% Uptime Server Operasional"],
      techUsed: ["React.js", "TypeScript", "Node.js Express", "PostgreSQL", "Tailwind CSS"]
    },
    {
      id: "port-2",
      title: "Vexa Land Real Estate Explorer",
      client: "Vexa Land Indonesia",
      category: "Property",
      description: "Situs web pemasaran unit properti eksklusif yang memukau, dilengkapi visualisasi peta 3D interaktif, kalkulator simulasi kredit KPR, dan sistem auto-routing leads ke tim sales WA.",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop",
      results: ["Pertumbuhan leads harian +140%", "Rasio konversi iklan naik 3x lipat", "User interaction time naik 4 menit"],
      techUsed: ["React Vite", "Framer Motion", "Three.js", "Tailwind CSS v4"]
    },
    {
      id: "port-3",
      title: "EduLearn LMS & Portal Mahasiswa",
      client: "Universitas Indonesia Jaya",
      category: "Education",
      description: "Platform Learning Management System (LMS) tangguh berskala luas untuk melayani lebih dari 15.000 mahasiswa aktif harian. Dilengkapi platform kuis anti-curang, geolokasi absensi, dan laporan nilai otomatis.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      results: ["Menampung 15.000+ siswa aktif lancar", "Kecepatan muat halaman < 200ms", "Lighthouse score 98/100"],
      techUsed: ["Next.js", "Node.js Express", "MongoDB NoSQL", "Redis Cache", "Tailwind CSS"]
    },
    {
      id: "port-4",
      title: "Lumina Client Billing Portal",
      client: "Lumina Digital Agency",
      category: "Startup",
      description: "Sistem Invoicing otomatis terintegrasi Payment Gateway internasional, visual dashboard pendapatan instan, and modul penandatanganan kontrak digital dengan UX sekelas Stripe.",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
      results: ["Penghematan waktu admin 18 jam/minggu", "Pembayaran faktur klien 5x lebih cepat", "Keamanan tingkat PCI-DSS"],
      techUsed: ["React.js", "Stripe API", "Google Cloud Storage", "Recharts", "Express"]
    },
    {
      id: "port-5",
      title: "Nusa Raya Public Information Service",
      client: "Kementerian Nusa Raya",
      category: "Government",
      description: "Portal penyebaran informasi publik terpadu yang ramah disabilitas (kompatibel screen reader), aman dari serangan DDOS, serta terintegrasi repositori dokumen legal terenkripsi.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
      results: ["Uji beban sukses 50.000 request/detik", "Aksesibilitas bersertifikat WCAG AA", "100% Bebas Serangan Malware"],
      techUsed: ["Next.js SPA", "PostgreSQL", "Cloudflare Security", "Tailwind CSS"]
    },
    {
      id: "port-6",
      title: "Kalla Corp Enterprise ERP Portal",
      client: "Kalla Corp Group",
      category: "Corporate",
      description: "Sistem ERP kustom terpusat untuk memantau inventori gudang secara real-time di 12 cabang nasional, pelacakan armada logistik, serta otomasi absensi karyawan via sistem geofencing.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
      results: ["Akurasi audit stok gudang naik 99.8%", "Menghemat operasional logistik 12%", "Sistem absensi geofence anti-titip"],
      techUsed: ["React.js", "PostgreSQL", "Google Maps Platform", "Node.js", "Tailwind CSS"]
    }
  ];

  // Perform category filter & search matches
  const filteredPortfolios = portfolios.filter((p) => {
    const matchesCategory = selectedCategory === "All Sektor" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techUsed.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 12 }
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-slate-900 transition-colors relative scroll-mt-16 text-left">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-850 text-brand-primary dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>PORTFOLIO MAHA KARYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark dark:text-white mb-4">
            Featured Portfolio
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-sans text-base leading-relaxed">
            Eksplorasi portofolio rekayasa digital premium kami yang tersebar di berbagai sektor industri strategis nasional.
          </p>
        </div>

        {/* Filter Controls & Search Input Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-slate-150 dark:border-slate-800">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold font-sans transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 dark:bg-blue-600 text-white shadow-md scale-[1.02]"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
                aria-label={`Filter portfolios by ${cat}`}
              >
                {cat === "All Sektor" ? "Semua Sektor" : cat}
              </button>
            ))}
          </div>

          {/* Premium Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari studi kasus / teknologi..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:border-brand-primary dark:focus:border-cyan-400 outline-none text-xs transition-all"
            />
          </div>
        </div>

        {/* Portfolio Cards Grid or Empty State */}
        <AnimatePresence mode="wait">
          {filteredPortfolios.length > 0 ? (
            <motion.div
              key="grid"
              id="portfolio-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {filteredPortfolios.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={cardVariants}
                  onClick={() => setActiveItem(item)}
                  className="group rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col cursor-pointer relative"
                >
                  {/* Image Panel with requested detailed motion layout */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-slate-200 dark:bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay with Gradient, Blur, Title, Category, and Button from Below */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 backdrop-blur-[2px]">
                      {/* Category */}
                      <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest translate-y-3 group-hover:translate-y-0 transition-transform duration-300 mb-1.5 block">
                        {item.category}
                      </span>
                      {/* Title */}
                      <h4 className="text-sm font-heading font-extrabold text-white leading-tight translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-[50ms] mb-4">
                        {item.title}
                      </h4>
                      {/* Button slides up from bottom */}
                      <div className="translate-y-12 group-hover:translate-y-0 transition-all duration-300 delay-[100ms] flex">
                        <span className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-sans font-bold text-[10px] flex items-center gap-1.5 shadow-lg">
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          <span>View Project</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info Panel */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-white dark:bg-slate-950">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-mono uppercase font-bold text-brand-primary dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-brand-dark dark:text-white mb-2 leading-tight group-hover:text-brand-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-6 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Tech stack short view */}
                    <div className="border-t border-slate-100 dark:border-slate-850 pt-4 flex flex-wrap gap-1.5">
                      {item.techUsed.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[9px]"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.techUsed.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[9px]">
                          +{item.techUsed.length - 3} Tech
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Premium Illustrated Empty State Container */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="py-16 px-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center max-w-lg mx-auto flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                <Code className="w-8 h-8 text-slate-500 dark:text-cyan-400 animate-pulse" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-brand-dark dark:text-white">
                Studi Kasus Tidak Ditemukan
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-sans max-w-sm">
                Project terbaik Anda berikutnya bisa dimulai di sini.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Sektor");
                }}
                className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Reset Filter Pencarian
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Case Study Details Dialog Modal */}
        <AnimatePresence>
          {activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveItem(null)}
                className="absolute inset-0 bg-brand-dark"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col text-left"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-brand-dark/10 hover:bg-brand-dark/20 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 hover:text-brand-dark dark:hover:text-white focus:outline-none transition-colors cursor-pointer"
                  aria-label="Close Case Study Modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Scrollable Content Container */}
                <div className="overflow-y-auto flex-1">
                  {/* Hero Image Section */}
                  <div className="aspect-[21/9] w-full bg-slate-100 relative">
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 sm:p-8">
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-cyan-300 bg-cyan-900/40 border border-cyan-800/50 px-2.5 py-1 rounded mb-2 inline-block">
                          {activeItem.category}
                        </span>
                        <h4 className="text-xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
                          {activeItem.title}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 font-sans">
                          Mitra Kerja: <span className="text-white font-semibold">{activeItem.client}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Column (Details) */}
                    <div className="md:col-span-7 space-y-6">
                      <div>
                        <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Latar Belakang & Deskripsi Proyek
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                          {activeItem.description}
                        </p>
                      </div>

                      {/* Accomplished Metrics / Results */}
                      <div>
                        <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Hasil Dampak Kerja (Metrics)
                        </h5>
                        <div className="space-y-3">
                          {activeItem.results.map((res, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/50 p-3 rounded-xl">
                              <CheckCircle2 className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans font-medium">{res}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column (Tech & Specs) */}
                    <div className="md:col-span-5 space-y-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div>
                        <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Tumpukan Teknologi (Stack)
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {activeItem.techUsed.map((tech, tIdx) => (
                            <div
                              key={tIdx}
                              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium flex items-center gap-1.5"
                            >
                              <Code className="w-3.5 h-3.5 text-brand-primary dark:text-cyan-400" />
                              <span>{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-200/60 dark:border-slate-800 pt-4">
                        <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Status Sertifikasi
                        </h5>
                        <div className="flex items-center gap-2 text-xs font-semibold text-brand-success">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Code Audit & Security Approved</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 font-sans">
                          Aplikasi telah melalui pengujian keamanan otomatis OWASP dan audit kode statis bebas kerentanan sebelum serah terima.
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveItem(null)}
                        className="w-full py-3 rounded-xl bg-brand-primary dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer text-center"
                      >
                        Tutup Studi Kasus
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
