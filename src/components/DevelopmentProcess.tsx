import React from "react";
import { MessageSquare, ClipboardList, PenTool, Code, CheckSquare, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  gradient: string;
}

export default function DevelopmentProcess() {
  const steps: Step[] = [
    {
      num: "01",
      title: "Konsultasi",
      desc: "Diskusi awal gratis untuk memahami ide bisnis, visi digital, sasaran audiens, serta cakupan proyek Anda.",
      icon: MessageSquare,
      gradient: "from-blue-600 to-indigo-500"
    },
    {
      num: "02",
      title: "Analisis Kebutuhan",
      desc: "Penyusunan dokumen SRS (Software Requirements Specification) formal, estimasi biaya transparan, & timeline rilis.",
      icon: ClipboardList,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      num: "03",
      title: "UI/UX Design",
      desc: "Pembuatan wireframe & desain visual high-fidelity interaktif via Figma untuk disetujui sebelum coding.",
      icon: PenTool,
      gradient: "from-purple-600 to-indigo-500"
    },
    {
      num: "04",
      title: "Development",
      desc: "Penulisan kode tipe-aman oleh engineer React & Node senior menggunakan standar penulisan kode terstruktur.",
      icon: Code,
      gradient: "from-violet-500 to-purple-600"
    },
    {
      num: "05",
      title: "Testing",
      desc: "Pengujian kualitas (QA) mencakup uji beban performa, kesesuaian responsif layar, & audit keamanan OWASP.",
      icon: CheckSquare,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      num: "06",
      title: "Deployment",
      desc: "Migrasi aset rilis ke server produksi Cloud tangguh (AWS/Vercel/Cloud Run) di balik proteksi Cloudflare.",
      icon: Rocket,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      num: "07",
      title: "Maintenance",
      desc: "Pemantauan server berkala, perbaikan bug darurat gratis selama garansi, serta bantuan optimasi performa harian.",
      icon: ShieldCheck,
      gradient: "from-slate-600 to-slate-800"
    }
  ];

  return (
    <section id="process" className="py-24 bg-white relative scroll-mt-16 text-left overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>METODOLOGI AGIL YANG JELAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark mb-4">
            Sistematis & Terarah (Development Process)
          </h2>
          <p className="text-slate-600 font-sans text-base leading-relaxed">
            Dari sekadar ide abstrak di atas kertas hingga rilis produksi siap pakai. Kami memandu setiap tahapan rekayasa perangkat lunak dengan transparansi penuh.
          </p>
        </div>

        {/* Timeline Layout */}
        {/* Mobile & Tablet: Vertical Stack */}
        <div className="block lg:hidden space-y-12 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="flex gap-6 items-start relative pl-12">
                
                {/* Number Circle & Icon as Badge */}
                <div className={`absolute left-0 w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.gradient} flex items-center justify-center text-white shadow-md z-10 shrink-0`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex-1 text-left shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-slate-400">LANGKAH {step.num}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-brand-dark mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Desktop: Alternating Left-Right or Horizontal Scroll/Cards Timeline */}
        <div className="hidden lg:grid grid-cols-7 gap-4 relative">
          
          {/* Horizontal Line Connector */}
          <div className="absolute top-[40px] left-12 right-12 h-0.5 bg-slate-200/80 z-0" />

          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center relative z-10">
                
                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.gradient} flex items-center justify-center text-white shadow-lg mb-6 hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Card representation underneath */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex-1 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">
                      STEP {step.num}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-brand-dark mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
