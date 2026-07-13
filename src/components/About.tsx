import React from "react";
import { motion } from "motion/react";
import { Shield, Sparkles, Compass, Clock, Award, CheckCircle } from "lucide-react";

export default function About() {
  const highlights = [
    {
      title: "Profesional",
      desc: "Komitmen penuh pada standar rekayasa perangkat lunak internasional (OWASP & Clean Code).",
      icon: Shield,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Transparan",
      desc: "Pantau pengerjaan secara berkala via repositori GitHub privat 24/7 tanpa ada biaya tersembunyi.",
      icon: Compass,
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20"
    },
    {
      title: "Tepat Waktu",
      desc: "Menjamin seluruh penyerahan modul sesuai dengan timeline proyek yang disepakati bersama.",
      icon: Clock,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "Fokus pada Solusi",
      desc: "Kami tidak sekadar menulis kode, kami merancang sistem kustom untuk memecahkan problem bisnis nyata.",
      icon: Award,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20"
    }
  ];

  const handleScrollToContact = () => {
    window.location.hash = "#contact";
  };

  return (
    <section id="about" className="py-24 bg-white relative scroll-mt-16 overflow-hidden text-left">
      {/* Decorative Blurs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Kolom Kiri: Foto Tim / Ilustrasi */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-10 pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 aspect-[4/5] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop"
                alt="Clinik Coding Professional Engineer Coding"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Overlay info box */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md text-white">
                <p className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest mb-1">
                  CORE STANDARD
                </p>
                <p className="text-sm font-sans font-bold">
                  "Menghubungkan arsitektur server tangguh dengan seni interaksi pengguna."
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Teks & Nilai */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
                <span>ABOUT CLINIK CODING</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark mb-4">
                Partner Teknologi Terpercaya untuk Pertumbuhan Eksponensial Bisnis Anda
              </h2>
              <p className="text-slate-600 font-sans text-base leading-relaxed mb-6">
                Clinik Coding hadir bukan hanya sebagai pengembang kode, melainkan sebagai partner teknologi strategis yang berkomitmen melahirkan solusi digital berkinerja tinggi. Kami menjembatani ide visioner Anda dengan produk perangkat lunak tangguh yang dirancang khusus untuk memacu efisiensi operasional dan meningkatkan konversi.
              </p>
              <p className="text-slate-600 font-sans text-sm leading-relaxed font-light">
                Dari UMKM yang ingin naik kelas, industri manufaktur & logistik, institusi pendidikan, hingga startup berskala internasional—kami fokus menghadirkan arsitektur website yang cepat, aman, dan mudah dikelola demi memberikan rasa aman dan membangun kepercayaan penuh bagi setiap pelanggan Anda.
              </p>
            </div>

            {/* Grid Highlight Nilai */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-xl border shrink-0 flex items-center justify-center ${item.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-brand-dark mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Button */}
            <div className="pt-4">
              <button
                onClick={handleScrollToContact}
                className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
