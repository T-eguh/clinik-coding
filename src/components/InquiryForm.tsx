import React, { useState } from "react";
import { Sparkles, Send, CheckCircle2, AlertTriangle, Mail, User, Building, MessageSquare, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { InquiryFormInput } from "../types";
import SuccessView from "./SuccessView";
import FailureView from "./FailureView";

export default function InquiryForm() {
  const [formData, setFormData] = useState<InquiryFormInput>({
    name: "",
    email: "",
    company: "",
    industry: "Startup / SaaS",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const industryOptions = [
    "Startup / SaaS",
    "Manufaktur & Logistik",
    "Sekolah & Universitas",
    "Properti & Real Estat",
    "UMKM / Bisnis Lokal",
    "Perusahaan / Korporat",
    "Digital Agency",
    "Pemerintahan / BUMN",
    "Hotel & Restoran",
    "Lainnya"
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setIsError(false);

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Mohon lengkapi kolom nama, email, dan pesan Anda.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim data penyelidikan ke server.");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        industry: "Startup / SaaS",
        message: ""
      });
    } catch (err: any) {
      console.error(err);
      setIsError(true);
      setErrorMessage("Terjadi gangguan jaringan atau server sedang sibuk. Silakan coba kembali.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors border-t border-slate-200/60 dark:border-slate-800/80 relative scroll-mt-16 text-left">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Branding Copy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-150/50 dark:bg-slate-800 text-brand-primary dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>KONSULTASI GRATIS PERTAMA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark dark:text-white leading-tight">
            Let's Relaunch Your Business Model Together
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            Punya gagasan sistem informasi kustom, portal institusi sekolah/bisnis, atau website korporat premium? Jangan sungkan mendiskusikannya dengan kami. Konsultasi pertama 100% gratis dan bersifat konfidensial (NDA terjamin).
          </p>

          <div className="border-t border-slate-200/80 dark:border-slate-800 pt-6 space-y-4 font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-dark dark:text-white block font-semibold">Tanggapan Cepat &lt; 2 Jam</strong>
                Tim konsultan prospek kami akan mengontak Anda kembali melalui surel atau WA dalam kurun waktu 2 jam kerja.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-dark dark:text-white block font-semibold">Analisis Kebutuhan Gratis</strong>
                Dilengkapi dengan draf arsitektur teknis dan simulasi biaya tanpa biaya komitmen sepeser pun.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0 mt-0.5" />
              <div>
                <strong className="text-brand-dark dark:text-white block font-semibold">Bebas Biaya Pemeliharaan 3 Bulan</strong>
                Garansi penanganan bug dan crash gratis terhitung sejak tanggal serah-terima repositori produk selesai.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Nama Lengkap <span className="text-brand-danger">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Dr. Hendra Setiawan"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-brand-primary dark:focus:border-cyan-400 outline-none text-sm transition-all focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Alamat Email Aktif <span className="text-brand-danger">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. hendra@medikacare.co.id"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-brand-primary dark:focus:border-cyan-400 outline-none text-sm transition-all focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Company Name Input */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Nama Perusahaan / Instansi (Opsional)
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. MedikaCare Group"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-brand-primary dark:focus:border-cyan-400 outline-none text-sm transition-all focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40"
                  />
                </div>
              </div>

              {/* Industry Select */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Kategori Bidang Industri
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-brand-primary dark:focus:border-cyan-400 outline-none text-sm transition-all appearance-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40"
                  >
                    {industryOptions.map((ind, idx) => (
                      <option key={idx} value={ind} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">{ind}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Deskripsi Ringkas Kebutuhan Proyek <span className="text-brand-danger">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Jelaskan secara ringkas website atau sistem informasi kustom yang ingin dibangun. Beritahu kami jika Anda memiliki estimasi target penyelesaian."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-brand-primary dark:focus:border-cyan-400 outline-none text-sm transition-all resize-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40"
                />
              </div>
            </div>

            {/* Submit Feedback */}
            <div className="space-y-4">
              {errorMessage && !isError && (
                <p className="p-3 text-xs text-brand-danger bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>{errorMessage}</span>
                </p>
              )}

              <button
                id="contact-submit"
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-brand-primary hover:bg-blue-600 disabled:bg-slate-400 text-white font-bold text-base transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-brand-primary/10 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 text-brand-accent" />
                    <span>Kirim Formulir Konsultasi</span>
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-slate-400">
                Dengan mengeklik tombol di atas, Anda menyetujui pemrosesan data secara rahasia dan aman.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Global Success View overlay modal */}
      <AnimatePresence>
        {isSuccess && (
          <SuccessView
            onClose={() => setIsSuccess(false)}
            title="Inquiry Berhasil Dikirim!"
          />
        )}
      </AnimatePresence>

      {/* Global Error View overlay modal */}
      <AnimatePresence>
        {isError && (
          <FailureView
            onRetry={() => handleSubmit()}
            onClose={() => setIsError(false)}
            title="Sistem Mengalami Gangguan"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
