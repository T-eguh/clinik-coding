import React from "react";
import { ArrowLeft, Home, Sparkles, Terminal } from "lucide-react";
import { motion } from "motion/react";

interface Page404Props {
  onBackToHome: () => void;
}

export default function Page404({ onBackToHome }: Page404Props) {
  return (
    <div className="fixed inset-0 z-100 bg-slate-950 text-white flex flex-col justify-between overflow-hidden">
      {/* Aurora Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#060b19] to-[#02050d] z-0 pointer-events-none" />
      
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 opacity-40 pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 w-full flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Terminal className="w-4.5 h-4.5" />
          </div>
          <span className="font-heading font-extrabold text-sm tracking-tight text-white">CLINIK CODING</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">SYSTEM RESPONSE: 404</span>
      </header>

      {/* Center 404 Message */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-6 py-12">
        {/* Animated 404 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ALAMAT TIDAK DITEMUKAN</span>
        </motion.div>

        {/* Big 404 Text */}
        <div className="relative mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-8xl sm:text-[12rem] font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-800 leading-none select-none"
          >
            404
          </motion.h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 blur-[80px] opacity-10 -z-10 pointer-events-none" />
        </div>

        {/* Copy */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl font-heading font-extrabold mb-4"
        >
          Sepertinya Anda Tersesat...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 font-sans text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed font-light"
        >
          Halaman yang Anda tuju mungkin telah dipindahkan, diganti namanya, atau tidak pernah ada dalam katalog repositori kami.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onBackToHome}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/25"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-6 w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 text-[10px] font-mono text-slate-500">
        <span>&copy; 2026 CLINIK CODING. ALL RIGHTS RESERVED.</span>
        <span>LATENCY: 14ms | DEPLOYED STABLE</span>
      </footer>
    </div>
  );
}
