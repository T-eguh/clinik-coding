import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Sparkles, Check, Star, Monitor, Tablet, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import AnimatedCounter from "./AnimatedCounter";

interface HeroProps {
  onCtaClick: (sectionId: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  // 1. Scroll Parallax calculations
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Magnetic Button Hook implementation
  const magneticRef = useRef<HTMLButtonElement | null>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magneticRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = magneticRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      // Pull toward mouse
      setMagneticOffset({ x: dx * 0.3, y: dy * 0.3 });
    } else {
      setMagneticOffset({ x: 0, y: 0 });
    }
  };

  const resetMagnetic = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const floatingFeatures = [
    { text: "Responsive & Fluid" },
    { text: "SEO Tech Configured" },
    { text: "Waktu Respon Sub-200ms" },
    { text: "Clean Code Architecture" },
    { text: "Aesthetic Premium UI" }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-white pt-28 pb-20 scroll-mt-24"
    >
      
      {/* 1. Immersive Full-Screen Coding Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop"
          alt="Coding Workspace Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-1000"
          style={{ transform: `scale(${1 + scrollY * 0.0003})` }}
        />
        {/* Multilayer premium dark mask overlays to guarantee top-tier text readability and rich contrast */}
        <div className="absolute inset-0 bg-slate-950/85 md:bg-slate-950/80 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-[#0a0f1d] opacity-95" />
      </div>
      
      {/* Soft Glow Effects (ambient background decoration) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
        animate={{
          x: [0, -20, 20, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Noise Texture & Elegant grid overlay for dev/code vibes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] z-0 opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.015] z-0 pointer-events-none" />

      {/* Premium Centered Content Container */}
      <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          id="hero-content"
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Glowing Tech Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-8 shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>TRUSTED SOFTWARE HOUSE</span>
          </motion.div>
 
          {/* Bold Display Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white mb-6 leading-[1.12] max-w-4xl"
          >
            Bukan Sekadar Website.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
              Kami Membangun Pengalaman Digital yang Membantu Bisnis Anda Bertumbuh.
            </span>
          </motion.h1>

          {/* Immersive Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-slate-300 font-sans font-light leading-relaxed mb-10 max-w-2xl"
          >
            Clinik Coding menghadirkan solusi website modern, cepat, aman, dan SEO-friendly untuk membantu bisnis tampil profesional dan menjangkau lebih banyak pelanggan.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16 justify-center items-center"
          >
            <motion.button
              id="hero-cta-consult"
              ref={magneticRef}
              onMouseMove={handleMagneticMove}
              onMouseLeave={resetMagnetic}
              animate={{ x: magneticOffset.x, y: magneticOffset.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              onClick={() => onCtaClick("contact")}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 30px -10px rgba(37, 99, 235, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl bg-brand-primary text-white font-bold text-base transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/25 cursor-pointer relative overflow-hidden"
              aria-label="Konsultasi Gratis Sekarang"
            >
              <span>Konsultasi Gratis</span>
              <ArrowRight className="w-5 h-5 text-brand-accent" />
            </motion.button>

            <motion.button
              id="hero-cta-portfolio"
              onClick={() => onCtaClick("portfolio")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm backdrop-blur-sm"
              aria-label="Lihat Portofolio Kami"
            >
              <span>Lihat Portofolio</span>
            </motion.button>
          </motion.div>

          {/* Advanced Frosted Glass Counters Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 sm:gap-12 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl"
          >
            <div className="text-center">
              <p className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-none mb-2">
                <AnimatedCounter target={120} suffix="+" />
              </p>
              <p className="text-[10px] sm:text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
                Klien Puas
              </p>
            </div>
            
            <div className="text-center border-x border-white/[0.08] px-4">
              <p className="text-2xl sm:text-4xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 leading-none mb-2">
                <AnimatedCounter target={80} suffix="+" />
              </p>
              <p className="text-[10px] sm:text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
                Proyek Selesai
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl sm:text-4xl font-heading font-extrabold text-emerald-400 leading-none mb-2">
                <AnimatedCounter target={99} suffix="%" />
              </p>
              <p className="text-[10px] sm:text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
                Uptime Sukses
              </p>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
