import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Fill the progress bar in 1.4 seconds
    const duration = 1400;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    // Let it stay at 100% for a brief moment then transition out
    const finishTimeout = setTimeout(() => {
      setShouldRender(false);
      // Wait for exit transition to finish before notifying parent
      setTimeout(onComplete, 400);
    }, 1800);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 bg-slate-950 z-100 flex flex-col items-center justify-center select-none"
        >
          {/* Subtle ambient light behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-sm w-full px-8 text-center space-y-6">
            
            {/* Unified Logo Component */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative py-4"
            >
              <Logo variant="full" size={72} animated={true} />
              {/* Subtle backglow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
            </motion.div>

            {/* Progress Area */}
            <div className="w-full space-y-3 pt-4">
              {/* Thin Progress Track */}
              <div className="w-full h-[3px] bg-slate-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Subtext */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between text-[10px] font-mono text-slate-400"
              >
                <span>CRAFTING DIGITAL EXPERIENCES...</span>
                <span className="font-bold text-slate-300">{Math.round(progress)}%</span>
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
