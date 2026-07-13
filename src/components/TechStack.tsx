import React, { useState } from "react";
import { Sparkles, HelpCircle, Code, Server, Database, Cloud, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TechDetails {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps & Cloud";
  reason: string;
  gradient: string;
}

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const techs: TechDetails[] = [
    {
      name: "React",
      category: "Frontend",
      reason: "Framework UI modular terpopuler di dunia. Menjamin interaksi halaman ultra-responsif, render secepat kilat, dan komponen reusable yang kokoh.",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      name: "TypeScript",
      category: "Frontend",
      reason: "Bahasa pemrograman tipe-aman (strict typing). Mencegah 95% bug runtime sebelum aplikasi dirilis ke publik, membuat kode stabil & terkelola.",
      gradient: "from-blue-600 to-indigo-500"
    },
    {
      name: "Node.js",
      category: "Backend",
      reason: "Runtime JavaScript berbasis engine V8 Chrome. Menangani ribuan request paralel tanpa hambatan (non-blocking I/O) dengan efisiensi tinggi.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      name: "Express",
      category: "Backend",
      reason: "Minimalis web framework untuk Node.js. Mempercepat pembuatan API RESTful dan sistem middleware yang ringan namun sangat bertenaga.",
      gradient: "from-slate-700 to-slate-900"
    },
    {
      name: "Laravel",
      category: "Backend",
      reason: "Framework PHP modern and tangguh. Sangat andal untuk mengintegrasikan logika bisnis kompleks dan fitur bawaan yang mapan secara cepat.",
      gradient: "from-red-500 to-rose-600"
    },
    {
      name: "MySQL",
      category: "Database",
      reason: "Database relasional open-source terpopuler. Sangat stabil untuk memproses kueri data transaksional dan diandalkan jutaan sistem global.",
      gradient: "from-blue-500 to-orange-500"
    },
    {
      name: "PostgreSQL",
      category: "Database",
      reason: "Database relasional tercanggih di dunia. Mendukung fitur JSONB, kueri kompleks berkinerja tinggi, dan keamanan enkripsi tingkat enterprise.",
      gradient: "from-blue-700 to-indigo-700"
    },
    {
      name: "MongoDB",
      category: "Database",
      reason: "Database NoSQL berbasis dokumen (BSON). Fleksibilitas skema tanpa batas, sangat cocok untuk aplikasi kolaborasi dan penyimpanan JSON terdistribusi.",
      gradient: "from-emerald-600 to-green-500"
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      reason: "Utility-first CSS framework. Mengakselerasi penyusunan gaya UI modern, memangkas ukuran berkas CSS rilis, dan responsif luar biasa.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      name: "Docker",
      category: "DevOps & Cloud",
      reason: "Teknologi kontainerisasi. Menjamin konsistensi eksekusi aplikasi dari komputer lokal developer hingga server produksi tanpa perbedaan environment.",
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      name: "GitHub",
      category: "DevOps & Cloud",
      reason: "Platform kolaborasi kode & CI/CD andalan. Memastikan setiap perubahan terdokumentasi, diuji otomatis, dan diamankan dengan aman.",
      gradient: "from-slate-800 to-black"
    },
    {
      name: "Vercel",
      category: "DevOps & Cloud",
      reason: "Platform hosting serverless terbaik untuk frontend modern. Mendistribusikan aset statis secara instan ke ratusan lokasi CDN global.",
      gradient: "from-slate-900 to-slate-950"
    },
    {
      name: "Cloudflare",
      category: "DevOps & Cloud",
      reason: "Sistem CDN, firewall, & proteksi DDoS tingkat lanjut. Menjamin kecepatan transfer data maksimal sekaligus menangkal ancaman siber jahat.",
      gradient: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <section id="tech" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white relative overflow-hidden scroll-mt-16 text-left">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-brand-primary dark:text-brand-accent text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary dark:text-cyan-400" />
            <span>KUALITAS TEKNOLOGI MODERN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            World-Class Tech Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-sans text-sm sm:text-base leading-relaxed font-light">
            Kami hanya menggunakan teknologi modern andalan unicorn global untuk memastikan website Anda cepat, aman, tangguh, dan mudah dikembangkan di masa depan.
          </p>
        </div>

        {/* Tech Logo/Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="relative group"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              {/* Card Container */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between items-center text-center h-32 cursor-help relative overflow-hidden shadow-sm">
                
                {/* Visual Glow Indicator */}
                <div className={`absolute -inset-10 bg-gradient-to-tr ${tech.gradient} opacity-[0.02] group-hover:opacity-[0.08] blur-xl transition-opacity duration-300 pointer-events-none`} />

                <div className="flex flex-col items-center justify-center my-auto">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${tech.gradient} flex items-center justify-center font-heading font-extrabold text-sm text-white mb-2 shadow-md`}>
                    {tech.name.slice(0, 2)}
                  </div>
                  
                  <span className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200">
                    {tech.name}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full border-t border-slate-100 dark:border-slate-800/60 pt-2 text-[8px] font-mono text-slate-500">
                  <span className="uppercase">{tech.category}</span>
                  <HelpCircle className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>

              {/* Enhanced Interactive Floating Tooltip */}
              <AnimatePresence>
                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-slate-900/95 border border-slate-700 text-white p-4 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none text-left"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/50 border border-cyan-800/30 px-2 py-0.5 rounded uppercase">
                        {tech.category}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 font-bold">WHY WE USE IT</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans font-light">
                      {tech.reason}
                    </p>
                    {/* Tooltip arrow triangle */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rotate-45 bg-slate-900 border-r border-b border-slate-700" />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
