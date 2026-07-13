import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight, LayoutGrid, Monitor, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CaseStudyLocal {
  id: string;
  name: string;
  challenge: string;
  solution: string;
  tech: string[];
  results: string[];
  beforeSystem: {
    speed: string;
    security: string;
    ui: string;
  };
  afterSystem: {
    speed: string;
    security: string;
    ui: string;
  };
}

export default function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cases: CaseStudyLocal[] = [
    {
      id: "cs-1",
      name: "MedikaCare Clinic Network System",
      challenge: "Legacy clinic system built on PHP 5.4 was extremely slow. Patients queued over 2 hours for physical registration, medical reports were saved on physical folders, and databases were prone to local backup loss.",
      solution: "Migrated the entire clinic network to a secure Node.js & React-based web application. Implemented a smart real-time patient queue scheduler and highly secure encrypted medical records database.",
      tech: ["Vite React", "TypeScript", "Node.js Express", "PostgreSQL Enkripsi", "Tailwind CSS"],
      results: [
        "Patient physical queue time slashed by 70%",
        "Lighthouse performance rating boosted to 98",
        "Encrypted database fully HIPAA-compliant"
      ],
      beforeSystem: {
        speed: "8.4 seconds load time",
        security: "Unencrypted SQL DB",
        ui: "Chaotic Win98 Style"
      },
      afterSystem: {
        speed: "180ms load speed",
        security: "OWASP & AES-256 Enkripsi",
        ui: "Clean, Bespoke UI"
      }
    },
    {
      id: "cs-2",
      name: "Vexa Land Premium Property Catalog",
      challenge: "Calon pembeli properti mewah kesulitan membayangkan unit tanpa berkunjung secara langsung. Media pemasaran lama berupa pamflet kertas gagal menarik perhatian pasar pembeli kelas atas.",
      solution: "Membangun portal penjelajah properti imersif menggunakan visualisasi peta 3D interaktif yang fluid, simulator kredit otomatis, serta formulir pengumpulan leads instan yang terintegrasi WhatsApp CRM.",
      tech: ["Three.js 3D Rendering", "Framer Motion", "Tailwind CSS v4", "Express API"],
      results: [
        "Pertumbuhan prospek harian naik +140%",
        "Konversi dari kampanye digital meroket 3x lipat",
        "Pembeli dapat meninjau unit 3D dari HP"
      ],
      beforeSystem: {
        speed: "Slow static images",
        security: "No lead encryption",
        ui: "Static PDF catalog"
      },
      afterSystem: {
        speed: "Sub-second lazy rendering",
        security: "Secure CRM routing",
        ui: "Immersive 3D View"
      }
    },
    {
      id: "cs-3",
      name: "EduLearn Scale University LMS",
      challenge: "Sistem LMS universitas lama seringkali crash & down ketika diakses serentak oleh ribuan mahasiswa saat jam ujian semester. Absensi mahasiswa masih menggunakan tanda tangan manual.",
      solution: "Merancang arsitektur LMS modern berbasis Next.js dengan caching Redis berlapis dan perutean penyeimbang beban, dilengkapi fitur kuis anti-curang dan absensi geolokasi GPS presisi tinggi.",
      tech: ["Next.js (React)", "MongoDB", "Redis In-Memory Caching", "Express.js"],
      results: [
        "Sanggup menampung 15.000+ mahasiswa aktif lancar",
        "Koneksi database real-time < 100ms",
        "Akurasi geofencing absensi mencapai 99.8%"
      ],
      beforeSystem: {
        speed: "Crash on 500 parallel users",
        security: "Easy to cheat online",
        ui: "Outdated Moodle layout"
      },
      afterSystem: {
        speed: "Smooth on 15,000 parallel users",
        security: "Tab-lock & anti-cheat check",
        ui: "Modern intuitive interface"
      }
    }
  ];

  const currentStudy = cases[activeIndex];

  return (
    <section id="case-studies" className="py-24 bg-slate-50 relative scroll-mt-16 text-left">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>STUDI KASUS ELITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark mb-4">
            3 Studi Kasus Terbaik Kami
          </h2>
          <p className="text-slate-600 font-sans text-base leading-relaxed">
            Menganalisis tantangan nyata, implementasi solusi rekayasa, serta hasil dampak bisnis konkret yang sukses kami hadirkan bagi mitra strategis.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {cases.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-5 py-3 rounded-xl font-sans font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeIndex === idx
                  ? "bg-brand-primary text-white shadow-lg"
                  : "bg-white border border-slate-200 text-slate-500 hover:text-slate-800"
              }`}
            >
              {cs.name}
            </button>
          ))}
        </div>

        {/* Selected Case Study Detail Display with Animating Transitions */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStudy.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Left Column: Challenge & Solution */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-primary bg-blue-50 px-2.5 py-1 rounded mb-3 inline-block uppercase">
                    STUDI KASUS: {currentStudy.name}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-brand-dark mb-3">
                    Tantangan & Solusi Rekayasa
                  </h3>
                </div>

                <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100/50">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 mb-2">
                    Tantangan Utama (The Challenge)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {currentStudy.challenge}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary mb-2">
                    Solusi yang Diberikan (The Solution)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {currentStudy.solution}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Tumpukan Teknologi yang Digunakan (Stack)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentStudy.tech.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Side-by-side Before vs After visual representation */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                
                {/* Visual side-by-side card */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Visual Perbandingan Sistem
                  </h4>

                  {/* BEFORE card */}
                  <div className="p-4 rounded-2xl border border-red-100 bg-red-50/40 relative">
                    <span className="absolute top-3 right-3 text-[9px] font-mono font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                      BEFORE SYSTEM
                    </span>
                    <div className="space-y-1.5 text-left text-xs text-slate-500 font-sans">
                      <div>Kecepatan: <span className="font-bold text-slate-700">{currentStudy.beforeSystem.speed}</span></div>
                      <div>Keamanan: <span className="font-bold text-slate-700">{currentStudy.beforeSystem.security}</span></div>
                      <div>Tampilan UI: <span className="font-bold text-slate-700">{currentStudy.beforeSystem.ui}</span></div>
                    </div>
                  </div>

                  {/* AFTER card */}
                  <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 relative">
                    <span className="absolute top-3 right-3 text-[9px] font-mono font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                      AFTER SYSTEM
                    </span>
                    <div className="space-y-1.5 text-left text-xs text-slate-700 font-sans">
                      <div className="flex items-center gap-1">
                        <span>Kecepatan:</span> 
                        <span className="font-bold text-emerald-600 flex items-center gap-0.5"><Zap className="w-3 h-3 text-brand-warning" /> {currentStudy.afterSystem.speed}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Keamanan:</span> 
                        <span className="font-bold text-emerald-600 flex items-center gap-0.5"><ShieldCheck className="w-3 h-3" /> {currentStudy.afterSystem.security}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Tampilan UI:</span> 
                        <span className="font-bold text-emerald-600 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> {currentStudy.afterSystem.ui}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results List */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Hasil yang Dicapai (Results)
                  </h4>
                  <div className="space-y-2">
                    {currentStudy.results.map((res, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                        <span className="font-sans font-light leading-relaxed text-slate-200">
                          {res}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
