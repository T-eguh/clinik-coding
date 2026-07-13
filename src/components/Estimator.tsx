import { useState } from "react";
import { Sparkles, Calendar, DollarSign, Clock, CheckCircle, ChevronRight, RefreshCw, Send, HelpCircle, Activity, Laptop, GraduationCap, Home, Briefcase, Building } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ConsultationRequest, ConsultationResponse } from "../types";

export default function Estimator() {
  const [clientName, setClientName] = useState("");
  const [companyType, setCompanyType] = useState("Startup");
  const [projectType, setProjectType] = useState("Modern Web Application");
  const [designStyle, setDesignStyle] = useState("Apple-like & Minimalist");
  const [urgency, setUrgency] = useState<"Normal" | "Express">("Normal");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["Autentikasi (Login/Sign-up)"]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<ConsultationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadingMessages = [
    "Menganalisis kebutuhan operasional sektor bisnis Anda...",
    "Memilih tumpukan teknologi (tech stack) berkinerja tinggi...",
    "Menyusun draf estimasi linimasa pengerjaan...",
    "Menghitung kisaran anggaran realistis (transparan & jujur)...",
    "Membuat ringkasan saran arsitektur ahli dari Clinik Coding..."
  ];

  const companyTypes = [
    { label: "Startup / SaaS", value: "Startup", icon: Laptop },
    { label: "Manufaktur & Logistik", value: "Manufaktur / Logistik", icon: Building },
    { label: "Sekolah & Universitas", value: "Sekolah / Akademik", icon: GraduationCap },
    { label: "Properti & Real Estat", value: "Properti / Perhotelan", icon: Home },
    { label: "UMKM / Bisnis Lokal", value: "UMKM / Ritel", icon: Briefcase },
    { label: "Perusahaan / Corporate", value: "Korporat", icon: Building }
  ];

  const projectTypes = [
    "Modern Web Application",
    "Sistem Informasi & Dashboard",
    "Landing Page Premium",
    "E-Commerce & Payment Portal",
    "Custom Software / API-First System"
  ];

  const designStyles = [
    "Apple-like & Minimalist (Mewah & Bersih)",
    "Stripe-style (Slick Grid, Typo Kuat, Gradasi)",
    "Vercel-style (High Contrast, Gelap/Terang Berani)",
    "Safe & Corporate (Kredibel, Terstruktur, Profesional)"
  ];

  const featureOptions = [
    "Autentikasi (Login/Sign-up)",
    "Integrasi Payment Gateway (Xendit/Stripe)",
    "Dashboard Analitik & Grafik Real-time",
    "Sistem Chat / Konsultasi Langsung",
    "Content Management System (CMS Admin)",
    "Dukungan Banyak Bahasa (Multi-Language)",
    "Sistem Ekspor Dokumen (PDF/Excel)",
    "Sistem Peta / Geolocation (Google Maps)"
  ];

  const handleFeatureToggle = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleGenerateProposal = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setLoadingStep(0);

    // Cycle through loading steps visually
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          companyType,
          projectType,
          designStyle,
          features: selectedFeatures,
          urgency
        })
      });

      if (!response.ok) {
        throw new Error("Gagal menghubungi server kustom.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("Terjadi masalah koneksi atau AI sibuk. Silakan coba beberapa saat lagi.");
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setClientName("");
    setCompanyType("Startup");
    setProjectType("Modern Web Application");
    setDesignStyle("Apple-like & Minimalist");
    setUrgency("Normal");
    setSelectedFeatures(["Autentikasi (Login/Sign-up)"]);
  };

  return (
    <section id="estimator" className="py-24 bg-slate-50 border-y border-slate-200/60 relative scroll-mt-16">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>KONSULTASI AI INSTAN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark mb-4">
            AI-Powered Cost & Tech Estimator
          </h2>
          <p className="text-slate-600 font-sans text-base leading-relaxed">
            Butuh estimasi awal penawaran proyek secara instan? Pilih opsi di bawah dan biarkan AI Consultant kami merumuskan anggaran, linimasa kerja, dan arsitektur optimal secara real-time.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {/* 1. INPUT FORM STATE */}
            {!isLoading && !result && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10"
              >
                {/* Options Column */}
                <div className="lg:col-span-7 space-y-8 text-left">
                  {/* Client Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Nama Anda / Instansi (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Hendra / RS Sehat"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Urgensi Pengerjaan
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setUrgency("Normal")}
                          className={`py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                            urgency === "Normal"
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          Normal (Standar)
                        </button>
                        <button
                          type="button"
                          onClick={() => setUrgency("Express")}
                          className={`py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            urgency === "Express"
                              ? "bg-brand-primary border-brand-primary text-white"
                              : "border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <Sparkles className="w-4 h-4 text-brand-accent" />
                          <span>Express (-25% waktu)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sektor Bisnis */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Sektor Industri / Kategori Bisnis Anda
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {companyTypes.map((type) => {
                        const IconComponent = type.icon;
                        const isSelected = companyType === type.value;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setCompanyType(type.value)}
                            className={`p-3.5 rounded-xl border text-left flex flex-col items-start gap-2.5 transition-all cursor-pointer ${
                              isSelected
                                ? "border-brand-primary bg-blue-50/50 text-brand-primary shadow-sm"
                                : "border-slate-200 hover:border-slate-300 text-slate-700"
                            }`}
                          >
                            <IconComponent className={`w-5 h-5 ${isSelected ? "text-brand-primary" : "text-slate-400"}`} />
                            <span className="font-sans font-semibold text-xs leading-none">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tipe Proyek & Desain */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Tipe Pengembangan Proyek
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      >
                        {projectTypes.map((t, idx) => (
                          <option key={idx} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Vibe / Estetika Desain Utama
                      </label>
                      <select
                        value={designStyle}
                        onChange={(e) => setDesignStyle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      >
                        {designStyles.map((d, idx) => (
                          <option key={idx} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Fitur yang dibutuhkan */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Fitur Spesifik yang Dibutuhkan (Bisa pilih lebih dari satu)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {featureOptions.map((feat, idx) => {
                        const isChecked = selectedFeatures.includes(feat);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleFeatureToggle(feat)}
                            className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center gap-3 transition-all cursor-pointer ${
                              isChecked
                                ? "border-brand-primary bg-blue-50/20 text-brand-primary"
                                : "border-slate-100 hover:border-slate-200 text-slate-600"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="w-4 h-4 text-brand-primary border-slate-300 rounded focus:ring-brand-primary cursor-pointer pointer-events-none"
                            />
                            <span>{feat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Submit Panel Column */}
                <div className="lg:col-span-5 bg-slate-50/60 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-brand-dark mb-3">
                      Mengapa Estimator Kami Berbeda?
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      Sistem ini tidak menghasilkan kalkulasi statis generik. AI kami merancang rekomendasi berdasarkan data ratusan arsitektur website unicorn untuk menyajikan estimasi nyata:
                    </p>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block font-semibold">100% Kustomisasi Arsitektur</strong>
                          Mencocokkan tech stack termodern dengan regulasi sektor bisnis Anda (e.g. keamanan medis EMR).
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block font-semibold">Transparansi Anggaran</strong>
                          Menyediakan rentang biaya realistis, menghapus biaya-biaya siluman tersembunyi.
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block font-semibold">Saran Ahli Langsung</strong>
                          Mendapatkan nasihat strategis dari para praktisi senior sebelum memulai kontrak kerja.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    {error && (
                      <p className="text-xs text-brand-danger bg-red-50 p-3 rounded-xl border border-red-100">
                        {error}
                      </p>
                    )}
                    <button
                      id="estimator-submit"
                      onClick={handleGenerateProposal}
                      className="w-full py-4 rounded-xl bg-brand-primary hover:bg-blue-600 text-white font-bold text-base transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-brand-primary/10 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-brand-accent" />
                      <span>Rancang Proposal AI Sekarang</span>
                    </button>
                    <p className="text-center text-[11px] text-slate-400 font-sans">
                      Gratis • Tanpa Komitmen Kontrak • Hasil Rilis Instan
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. LOADING STATE */}
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 sm:p-20 flex flex-col items-center justify-center min-h-[500px]"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-brand-primary animate-spin" />
                  <Sparkles className="w-8 h-8 text-brand-accent absolute top-6 left-6 animate-pulse" />
                </div>
                
                <h3 className="font-heading font-bold text-xl text-brand-dark mb-2">
                  Merancang Proposal Kustom Anda...
                </h3>
                
                <motion.p
                  key={loadingStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-slate-500 font-mono tracking-tight max-w-md text-center h-10"
                >
                  {loadingMessages[loadingStep]}
                </motion.p>
              </motion.div>
            )}

            {/* 3. PROPOSAL RESULT STATE */}
            {!isLoading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-10 lg:p-12 text-left"
              >
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-8 mb-8 gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest block mb-2">
                      HASIL ANALISIS TEKNIS & BIAYA
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-dark">
                      Spesifikasi & Proposal Proyek
                    </h3>
                    <p className="text-sm text-slate-500 font-sans mt-1">
                      Klien: <span className="font-semibold text-slate-800">{clientName || "Calon Mitra Clinik Coding"}</span> • Sektor: {companyType}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-semibold text-xs text-slate-600 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ulangi Simulasi</span>
                  </button>
                </div>

                {/* Cost and Duration Estimates Block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {/* Cost Box */}
                  <div className="bg-brand-dark text-white rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-slate-900/15">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-brand-accent">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block leading-none">
                          ESTIMASI ANGGARAN (TRANSPARAN)
                        </span>
                        <span className="font-heading font-bold text-sm text-white">Investasi Nilai Premium</span>
                      </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-white mb-2">
                      {result.estimatedCostRange}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      *Estimasi mencakup garansi pasca-rilis 3 bulan, optimasi performa 100%, serah terima source code privat di GitHub, dan transfer IP 100%.
                    </p>
                  </div>

                  {/* Duration Box */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-primary">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block leading-none">
                          DURASI PENGERJAAN
                        </span>
                        <span className="font-heading font-semibold text-sm text-slate-800">Linimasa Efektif</span>
                      </div>
                    </div>
                    <p className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-primary mb-2">
                      {result.estimatedDuration}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      *Pengerjaan dilakukan dengan metode Agile Scrum berkecepatan tinggi. Laporan progres dilakukan secara transparan setiap 1 minggu sekali.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left Specs Panel */}
                  <div className="lg:col-span-7 space-y-8">
                    {/* Recommended Tech Stack */}
                    <div>
                      <h4 className="font-heading font-bold text-lg text-brand-dark mb-4 border-l-4 border-brand-primary pl-3">
                        Rekomendasi Arsitektur Teknologi (Robust & Scalable)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {result.recommendedStack.map((tech, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                            <h5 className="font-heading font-bold text-sm text-brand-dark flex items-center gap-2 mb-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                              {tech.name}
                            </h5>
                            <p className="text-xs text-slate-600 font-sans leading-relaxed">
                              {tech.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Stages */}
                    <div>
                      <h4 className="font-heading font-bold text-lg text-brand-dark mb-4 border-l-4 border-brand-primary pl-3">
                        Rencana Kerja Tahap demi Tahap (Timeline)
                      </h4>
                      <div className="border-l border-slate-200 pl-4 space-y-6 ml-2">
                        {result.timelineBreakdown.map((stage, idx) => (
                          <div key={idx} className="relative">
                            {/* Dot */}
                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-primary border border-white" />
                            
                            <div className="flex justify-between items-baseline mb-1">
                              <h5 className="font-heading font-bold text-sm text-brand-dark">
                                {stage.stage}
                              </h5>
                              <span className="text-[10px] font-mono uppercase font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded">
                                {stage.duration}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 font-sans leading-relaxed">
                              {stage.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Expert Advice Panel */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Expert Advice Block */}
                    <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/10 rounded-2xl p-6 relative">
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-white border border-blue-500/10 text-[10px] font-mono uppercase font-bold text-brand-primary rounded-full">
                        SARAN UTAMA KONSULTAN SENIOR
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed mt-2 italic">
                        "{result.expertAdvice}"
                      </p>
                    </div>

                    {/* Proposal Summary Pitch */}
                    <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6">
                      <h4 className="font-heading font-bold text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                        Komitmen Integritas Clinik Coding
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                        {result.proposalSummary}
                      </p>
                      
                      <div className="flex flex-col gap-2">
                        <a
                          href="#contact"
                          className="w-full py-3 rounded-xl bg-brand-primary hover:bg-blue-600 text-white font-bold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-sm"
                        >
                          <span>Klaim Penawaran & Mulai Diskusi</span>
                          <ChevronRight className="w-4 h-4 text-brand-accent" />
                        </a>
                        <p className="text-center text-[10px] text-slate-400">
                          Linimasa & proposal ini akan otomatis disimpan sementara di sesi Anda.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
