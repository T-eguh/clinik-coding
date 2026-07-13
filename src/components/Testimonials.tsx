import { useState, useEffect, useRef } from "react";
import { Sparkles, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const TICK_INTERVAL = 50; // increment progress every 50ms

  useEffect(() => {
    if (isPaused) return;

    const steps = SLIDE_DURATION / TICK_INTERVAL;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeReview = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 transition-colors relative scroll-mt-16">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-brand-primary dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>KATA MEREKA YANG PERCAYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark dark:text-white mb-4">
            Testimoni & Kemitraan Sukses
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-sans text-base leading-relaxed">
            Kepercayaan diraih melalui konsistensi mutu produk dan transparansi pengerjaan. Simak ulasan langsung dari mitra eksekutif kami di berbagai lini industri strategis.
          </p>
        </div>

        {/* Carousel Block with Pause-on-Hover trigger */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Decorative quote icon */}
          <div className="absolute -top-6 -left-6 text-slate-200 dark:text-slate-900 pointer-events-none opacity-40 dark:opacity-20">
            <Quote className="w-48 h-48 rotate-180" />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-left flex flex-col md:flex-row gap-8 items-start md:items-center"
              >
                {/* Avatar with rating */}
                <div className="shrink-0 flex flex-col items-center sm:items-start gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-md border border-white/10 shrink-0">
                    {activeReview.name.split(" ").filter(Boolean).map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                  </div>
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 text-brand-warning">
                    {Array.from({ length: activeReview.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-brand-warning stroke-none" />
                    ))}
                  </div>
                </div>

                {/* Content Copy */}
                <div className="flex-1">
                  <span className="text-[10px] font-mono font-bold text-brand-primary dark:text-cyan-400 bg-blue-50 dark:bg-slate-900 px-2.5 py-1 rounded mb-3 inline-block uppercase">
                    Industri: {activeReview.industry}
                  </span>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 italic leading-relaxed mb-6 font-sans">
                    "{activeReview.content}"
                  </p>
                  <div>
                    <h4 className="font-heading font-bold text-base text-brand-dark dark:text-white leading-tight">
                      {activeReview.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
                      {activeReview.role} • <span className="font-semibold text-slate-700 dark:text-slate-300">{activeReview.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-3 mt-8 border-t border-slate-200/60 dark:border-slate-800 pt-6">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thin Glowing Slide Progress Timer Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
