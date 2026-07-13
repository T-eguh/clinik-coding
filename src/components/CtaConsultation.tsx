import React from "react";
import { Sparkles, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface CtaConsultationProps {
  onCtaClick: (sectionId: string) => void;
}

export default function CtaConsultation({ onCtaClick }: CtaConsultationProps) {
  const whatsappUrl = "https://wa.me/6285803547563?text=Halo%20Clinik%20Coding%2C%20saya%20tertarik%20untuk%20berkonsultasi%20mengenai%20proyek%20website%20saya.";

  const badges = [
    "Respon Cepat < 15 Menit",
    "Analisis Kebutuhan Gratis",
    "Estimasi Biaya Transparan",
    "100% Bebas Komitmen"
  ];

  return (
    <section id="cta-consultation" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white relative overflow-hidden text-left">
      
      {/* 1. Aurora Gradient Background & Moving Light circles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100/30 dark:from-blue-900/40 via-white dark:via-[#0c1222] to-slate-50 dark:to-[#040815] z-0 pointer-events-none" />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-brand-primary dark:text-brand-accent text-xs font-mono font-bold uppercase tracking-wider mb-8">
          <Sparkles className="w-3.5 h-3.5 text-brand-primary dark:text-cyan-400 animate-bounce" />
          <span>MULAI PROYEK ANDA SEKARANG</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.25] max-w-4xl mx-auto">
          Siap Membawa Bisnis Anda ke{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-blue-400 via-cyan-600 dark:via-cyan-300 to-emerald-600 dark:to-emerald-400">
            Level Berikutnya?
          </span>
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-sans font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Jangan biarkan kompetitor merebut pasar digital Anda dengan sistem lambat dan usang. Hubungi tim ahli senior Clinik Coding sekarang dan diskusikan ide hebat Anda gratis!
        </p>

        {/* Two Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => onCtaClick("contact")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-primary hover:bg-blue-600 text-white font-bold text-base transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-brand-primary/25 cursor-pointer"
          >
            <span>Konsultasi Gratis</span>
            <ArrowRight className="w-5 h-5 text-brand-accent" />
          </button>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/25 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>Hubungi via WhatsApp</span>
          </a>
        </div>

        {/* Trust Badges under CTA */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-6 border-t border-slate-200 dark:border-slate-800/80 max-w-3xl mx-auto">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-brand-success shrink-0" />
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-medium">
                {badge}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
