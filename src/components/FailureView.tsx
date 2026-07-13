import React from "react";
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { motion } from "motion/react";

interface FailureViewProps {
  onRetry: () => void;
  onClose?: () => void;
  title?: string;
  message?: string;
}

export default function FailureView({
  onRetry,
  onClose,
  title = "Sistem Mengalami Gangguan",
  message = "Terjadi kegagalan jaringan atau server sedang memproses beban request yang sangat padat. Mohon refresh halaman atau coba sesaat lagi."
}: FailureViewProps) {
  return (
    <div id="failure-view-overlay" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      {/* Container Card */}
      <motion.div
        id="failure-view-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-red-200/50 dark:border-red-950/30 p-8 sm:p-10 text-center flex flex-col items-center"
      >
        {onClose && (
          <button
            id="btn-close-failure-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            aria-label="Close Error Modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Warning Icon Graphic */}
        <div className="relative mb-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: [1, 1.08, 1], rotate: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500"
          >
            <AlertTriangle className="w-10 h-10 stroke-[2]" />
          </motion.div>
          <div className="absolute -inset-1 bg-red-500/10 rounded-full blur-md -z-10 animate-pulse" />
        </div>

        {/* Heading */}
        <div className="space-y-1 mb-4">
          <span className="text-[10px] font-mono font-bold text-red-500 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded uppercase tracking-widest">
            ERROR RESPONSE: STATUS_FAILED
          </span>
          <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white pt-3">
            {title}
          </h3>
        </div>

        {/* Message */}
        <p className="text-slate-500 dark:text-slate-400 font-sans text-sm leading-relaxed mb-8 max-w-xs">
          {message}
        </p>

        {/* Refresh/Retry Button */}
        <button
          id="btn-retry-submission"
          onClick={onRetry}
          className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-red-600/10 hover:shadow-red-600/20 group active:scale-98"
        >
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span>Refresh & Coba Lagi</span>
        </button>
      </motion.div>
    </div>
  );
}
