import React from "react";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface PricingPlan {
  name: string;
  price: string;
  desc: string;
  features: string[];
  isPopular: boolean;
  gradient: string;
}

export default function PricingPreview() {
  const plans: PricingPlan[] = [
    {
      name: "Starter",
      price: "Rp 1.5 Juta",
      desc: "Solusi hemat biaya terbaik untuk UMKM, portofolio pribadi, landing page promosi produk tunggal, atau rilis MVP.",
      features: [
        "1 Halaman Eksklusif (Landing Page)",
        "Desain UI/UX Khusus (Non-Template)",
        "Integrasi Tombol WhatsApp Direct",
        "Domain .com & Hosting Gratis 1 Tahun",
        "Optimasi SEO Teknis Dasar",
        "Garansi Bebas Bug 1 Bulan"
      ],
      isPopular: false,
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      name: "Professional",
      price: "Rp 4.5 Juta",
      desc: "Sangat direkomendasikan untuk Company Profile korporasi, portal sekolah, toko online retail, katalog properti, & e-commerce standar.",
      features: [
        "Hingga 7 Halaman Terstruktur",
        "Sistem Konten Mandiri (CMS Kustom)",
        "Integrasi Peta Lokasi & Formulir Leads",
        "Desain Figma Kustom High-Fidelity",
        "Lighthouse Performance Target > 90",
        "Garansi Bebas Bug 3 Bulan",
        "Panduan Cara Penggunaan Video"
      ],
      isPopular: true,
      gradient: "from-blue-600 via-indigo-600 to-purple-600"
    },
    {
      name: "Enterprise",
      price: "Custom Price",
      desc: "Sistem aplikasi kustom skala besar, portal kampus, sistem ERP logistik, dashboard operasional, atau aplikasi SaaS interaktif.",
      features: [
        "Halaman Tanpa Batas (Dynamic SPA)",
        "Sistem Autentikasi Pengguna & Multi-Role",
        "Database Enkripsi PostgreSQL / MongoDB",
        "Sistem Pembayaran (Payment Gateway)",
        "Dashboard Analitik & Ekspor Laporan",
        "Arsitektur Kontainerisasi Docker Ready",
        "Perjanjian SLA Teknis 12 Bulan"
      ],
      isPopular: false,
      gradient: "from-purple-600 to-pink-500"
    }
  ];

  const handleScrollToContact = () => {
    window.location.hash = "#contact";
  };

  return (
    <section id="pricing" className="py-24 bg-slate-50 relative scroll-mt-16 text-left">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>TRANSPARANSI BIAYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark mb-4">
            Pricing Preview Paket Layanan
          </h2>
          <p className="text-slate-600 font-sans text-base leading-relaxed">
            Tidak ada kejutan harga di tengah jalan. Kami menjamin transparansi penuh, rincian biaya yang adil, serta kualitas pengerjaan kode terbaik tanpa biaya siluman.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                plan.isPopular
                  ? "bg-slate-900 text-white border-blue-500/60 shadow-2xl scale-[1.03] lg:scale-[1.05] z-10"
                  : "bg-white text-slate-800 border-slate-200/80 shadow-sm hover:shadow-lg hover:border-slate-300"
              }`}
            >
              {/* Popular Badge Decoration */}
              {plan.isPopular && (
                <span className="absolute top-4 right-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500 text-white px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}

              {/* Package Header */}
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${
                  plan.isPopular ? "text-cyan-400" : "text-brand-primary"
                }`}>
                  {plan.name} Package
                </span>

                <div className="flex items-baseline gap-1 mt-4 mb-3">
                  <span className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom Price" && (
                    <span className="text-xs text-slate-400 font-sans">/proyek</span>
                  )}
                </div>

                <p className={`text-xs sm:text-sm font-sans mb-8 leading-relaxed font-light ${
                  plan.isPopular ? "text-slate-300" : "text-slate-500"
                }`}>
                  {plan.desc}
                </p>

                {/* Features list */}
                <div className="space-y-4 border-t pt-8 border-slate-100/10 mb-8 text-left">
                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase block mb-2 ${
                    plan.isPopular ? "text-slate-400" : "text-slate-400"
                  }`}>
                    FITUR UTAMA TERMASUK:
                  </span>

                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.isPopular
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                          : "bg-emerald-50 text-emerald-500 border border-emerald-100"
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className={`text-xs font-sans font-medium ${
                        plan.isPopular ? "text-slate-200" : "text-slate-700"
                      }`}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Button */}
              <button
                onClick={handleScrollToContact}
                className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  plan.isPopular
                    ? "bg-brand-primary hover:bg-blue-600 text-white shadow-lg shadow-brand-primary/25"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                }`}
              >
                <span>Lihat Detail Paket</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
