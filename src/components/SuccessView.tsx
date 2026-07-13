import React, { useEffect, useState } from "react";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface SuccessViewProps {
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessView({
  onClose,
  title = "Inquiry Berhasil Dikirim!",
  message = "Terima kasih telah mempercayakan proyek Anda pada Clinik Coding. Tim Konsultan Senior kami akan meninjau draf Anda dan menghubungi kembali via surel dalam kurun waktu kurang dari 2 jam."
}: SuccessViewProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; delay: number; duration: number; angle: number }>>([]);

  useEffect(() => {
    // Generate light, performance-friendly simulated confetti particles
    const colors = ["#3B82F6", "#06B6D4", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"];
    const generated = Array.from({ length: 45 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 150;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 20,
        size: 5 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.15,
        duration: 0.8 + Math.random() * 0.8,
        angle: angle
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 text-center flex flex-col items-center"
      >
        {/* Confetti Spawner */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
              animate={{
                x: p.x,
                y: p.y + 120, // simulate gravity fall slightly
                opacity: 0,
                scale: [0.5, 1, 0.4],
                rotate: 360,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeOut",
              }}
              className="absolute left-1/2 top-[35%] rounded-sm"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
            />
          ))}
        </div>

        {/* Checkmark Animation Circle */}
        <div className="relative mb-6">
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500"
          >
            {/* Inner check icon executing bounce-draw effect */}
            <motion.div
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: [1, 1.15, 1], rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-2 rounded-full border border-emerald-500/20 -z-10"
          />
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-2 mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span>TRANSAKSI SUKSES</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white leading-tight">
            {title}
          </h3>
        </motion.div>

        {/* Message Copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-slate-500 dark:text-slate-400 font-sans text-sm leading-relaxed mb-8 max-w-sm"
        >
          {message}
        </motion.p>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          onClick={onClose}
          className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <span>Selesai & Lanjutkan</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
}
