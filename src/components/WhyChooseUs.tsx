import React from "react";
import { Sparkles, Palette, Zap, ShieldAlert, Search, Monitor, Code, Headset, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface PoinKeunggulan {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  details: string[];
  illustrationText: string;
  gradient: string;
}

export default function WhyChooseUs() {
  const keunggulan: PoinKeunggulan[] = [
    {
      title: "UI/UX Modern & Responsive",
      desc: "Setiap antarmuka kami dirancang khusus secara orisinal dengan riset mendalam. Tidak menggunakan template pasaran, menjamin estetika premium, & responsif sempurna di perangkat seluler maupun desktop.",
      icon: Palette,
      details: ["Framer Motion Fluid Transitions", "Desktop-First & Mobile-First Harmony", "Standard Whitespace & Tipografi Dunia"],
      illustrationText: "DESIGN ARCHITECTURE",
      gradient: "from-blue-600 to-indigo-500"
    },
    {
      title: "Performa Tinggi & SEO Friendly",
      desc: "Situs lambat mematikan bisnis Anda. Kami mengoptimalkan setiap aset gambar, meminimalkan kode JS tak terpakai, serta merancang struktur HTML semantik agar dimengerti sempurna oleh algoritma Google Search.",
      icon: Zap,
      details: ["95+ Lighthouse Performance Score", "Server Side Rendering (SSR) Ready", "Google Core Web Vitals Approved"],
      illustrationText: "PERFORMANCE HUB",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "Keamanan Data & Clean Code",
      desc: "Keamanan data pengguna adalah harga mati. Kami menerapkan enkripsi ganda, validasi input berlapis untuk menangkal SQL Injection & XSS, serta menulis kode tipe-aman (TypeScript) yang mudah dipelihara.",
      icon: Code,
      details: ["OWASP Top 10 Security Checklist", "Modular & Reusable Components", "Strict TypeScript Type-Safety"],
      illustrationText: "SECURITY CORE",
      gradient: "from-purple-600 to-indigo-500"
    },
    {
      title: "After Sales Support & Garansi Perbaikan",
      desc: "Kerja kami tidak selesai setelah deployment rilis. Kami memberikan pendampingan teknis penuh, pemantauan status kesehatan server, serta garansi 3 bulan penanganan bug secara gratis tanpa biaya komitmen.",
      icon: Headset,
      details: ["3 Months Zero-Bug Guarantee", "24/7 Server Uptime Monitor", "SLA-Backed Technical Support"],
      illustrationText: "CUSTOMER SUPPORT",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white relative scroll-mt-16 text-left overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>KREABILITAS DAN MUTU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark mb-4">
            Mengapa Memilih Clinik Coding?
          </h2>
          <p className="text-slate-600 font-sans text-base leading-relaxed">
            Menolak kualitas kompromistis. Kami mengawinkan standar industri teknologi tinggi dengan komitmen pengerjaan tepat waktu demi kesuksesan komersial Anda.
          </p>
        </div>

        {/* Alternating Zig-Zag Layout */}
        <div className="space-y-24">
          {keunggulan.map((item, idx) => {
            const IconComponent = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content block */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? "" : "lg:order-2"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white shadow-md`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      ADVANTAGE POIN 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-dark tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-light">
                    {item.desc}
                  </p>

                  <div className="grid gap-3 pt-2">
                    {item.details.map((det, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 font-sans font-medium">
                          {det}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graphic Illustration block */}
                <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                  <div className="relative rounded-3xl p-8 sm:p-12 bg-slate-50 border border-slate-200/80 overflow-hidden flex flex-col justify-between aspect-video shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* Visual decor */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/20 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-200/50 px-2.5 py-1 rounded">
                        {item.illustrationText}
                      </span>
                      <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
                    </div>

                    <div className="space-y-3 my-6 text-left">
                      <div className="h-4 bg-slate-200 rounded w-2/3" />
                      <div className="h-3 bg-slate-200/60 rounded w-1/2" />
                      <div className="h-3 bg-slate-200/40 rounded w-3/4" />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-200/60 pt-4">
                      <span>AUDIT STANDARD PASSED</span>
                      <span className="text-brand-success font-bold">100% QUALITY APPROVED</span>
                    </div>

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
