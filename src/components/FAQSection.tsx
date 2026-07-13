import React, { useState } from "react";
import { Sparkles, ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItemLocal {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FAQItemLocal[] = [
    {
      id: "faq-1",
      question: "Berapa lama estimasi pengerjaan sebuah proyek website atau aplikasi?",
      answer: "Lama pengerjaan bervariasi tergantung kerumitan sistem. Untuk Landing Page premium atau Company Profile pengerjaan rata-rata memakan waktu 2-3 minggu. Sedangkan untuk aplikasi web kustom (SaaS), dashboard admin, atau portal sistem informasi kompleks biasanya memerlukan waktu 5-8 minggu."
    },
    {
      id: "faq-2",
      question: "Apakah klien bisa mengajukan revisi selama pengerjaan?",
      answer: "Tentu saja. Kami menerapkan proses revisi terarah demi menjaga kepuasan Anda. Pada tahap perancangan desain visual UI/UX (Figma), Anda mendapatkan slot revisi mayor sebanyak 3 kali dan revisi minor tanpa batas. Setelah desain disepakati dan masuk tahap pengodean (coding), perubahan struktur visual akan disesuaikan sebagai addendum kontrak baru."
    },
    {
      id: "faq-3",
      question: "Apakah saya sebagai klien mendapatkan hak akses penuh terhadap Source Code?",
      answer: "Ya, 100%. Transparansi adalah nilai inti kami. Seluruh kode sumber (Source Code) akan kami serahkan seutuhnya dalam repositori GitHub privat milik Anda. Hak kekayaan intelektual (HKI) sepenuhnya menjadi milik Anda setelah pelunasan proyek diselesaikan."
    },
    {
      id: "faq-4",
      question: "Apakah biaya pembuatan sudah termasuk domain dan cloud hosting?",
      answer: "Benar. Seluruh paket standard pembuatan website di Clinik Coding sudah mencakup pendaftaran domain premium (.com / .net / .id) gratis untuk 1 tahun pertama beserta sewa cloud hosting berkecepatan tinggi dengan uptime 99.9%. Di tahun berikutnya, Anda hanya membayar biaya perpanjangan domain & hosting secara transparan sesuai tarif resmi provider tanpa markup."
    },
    {
      id: "faq-5",
      question: "Bagaimana proses pembayaran untuk pengerjaan proyek?",
      answer: "Proses pembayaran kami buat sangat fleksibel dan aman menggunakan sistem termin yang disepakati bersama. Umumnya pembayaran dibagi menjadi 2 termin: Uang Muka (DP) sebesar 50% saat penandatanganan kontrak pengerjaan, dan Pelunasan sebesar 50% setelah website selesai diuji coba bersama (UAT) dan siap dirilis ke server produksi."
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-900 transition-colors relative scroll-mt-16 text-left">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-brand-primary dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>PERTANYAAN UMUM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark dark:text-white mb-4">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-sans text-base leading-relaxed">
            Menemukan jawaban instan seputar alur kerja sama, batasan revisi, jaminan garansi bug, hosting, serta dukungan optimasi SEO teknis Clinik Coding.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-slate-50 dark:bg-slate-950 border-blue-500/30 dark:border-blue-500/40 shadow-md"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${
                      isOpen ? "text-brand-primary dark:text-cyan-400" : "text-slate-400 dark:text-slate-500"
                    }`} />
                    <span className="font-heading font-bold text-sm sm:text-base text-brand-dark dark:text-white text-left">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Chevron Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Accordion Panel Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
