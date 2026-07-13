import React, { useState, useEffect } from "react";
import { 
  Briefcase, Search, CheckCircle2, X, Eye, DollarSign, Calendar, Sparkles, BrainCircuit
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboard } from "./index";

interface ConsultationBrief {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function ConsultationsCMS() {
  const { showToast, triggerRefresh } = useDashboard();
  const [briefs, setBriefs] = useState<ConsultationBrief[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [selectedBrief, setSelectedBrief] = useState<ConsultationBrief | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const fetchBriefs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/briefs");
      const data = await response.json();
      if (data.success) {
        const mapped = data.data.map((b: any) => ({
          id: b.id,
          name: b.clientName || "Calon Mitra",
          email: b.email || "-",
          company: b.companyType || "-",
          projectType: b.projectType || "-",
          budget: b.result?.estimatedCostRange || "-",
          timeline: b.result?.estimatedDuration || "-",
          description: `Kategori Bisnis: ${b.companyType}. Tipe Proyek: ${b.projectType}. Gaya Desain: ${b.designStyle || 'Standar'}. Urgensi: ${b.urgency || 'Normal'}. Fitur Utama yang Dipilih: ${Array.isArray(b.features) && b.features.length > 0 ? b.features.join(', ') : 'Standar'}.`,
          status: b.status || "Pending",
          createdAt: b.date ? new Date(b.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"
        }));
        setBriefs(mapped);
      }
    } catch {
      showToast("Gagal memuat daftar pengajuan briefing klien.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBriefs();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/briefs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (data.success) {
        showToast(`Status pengajuan berhasil diubah menjadi: ${status}`, "success");
        setBriefs(prev => prev.map(b => b.id === id ? { ...b, status } : b));
        fetchBriefs();
        triggerRefresh();
        if (selectedBrief?.id === id) {
          setSelectedBrief(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch {
      showToast("Gagal memperbarui status pengajuan.", "error");
    }
  };

  // Trigger Gemini API consultant recommendations simulation
  const handleAskAIConsultant = async () => {
    if (!selectedBrief) return;
    setAiLoading(true);
    setAiResult(null);

    try {
      const response = await fetch("/api/ai-consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ briefId: selectedBrief.id })
      });
      const data = await response.json();
      if (data.success) {
        setAiResult(data.recommendation);
      } else {
        setAiResult("Gagal mendapatkan rekomendasi AI. Harap lengkapi kunci rahasia API Gemini.");
      }
    } catch {
      setAiResult("Masalah komunikasi dengan agen kecerdasan buatan Gemini.");
    } finally {
      setAiLoading(false);
    }
  };

  const filteredBriefs = briefs.filter((b) => 
    (b.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
    (b.projectType || "").toLowerCase().includes((search || "").toLowerCase()) ||
    (b.description || "").toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div className="space-y-6 text-left font-sans text-xs">
      
      {/* Top Header */}
      <div>
        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
          CONSULTATION BRIEF CMS WITH GEMINI CO-PILOT
        </span>
        <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
          <span>Briefing & Consultations</span>
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
        </h1>
        <p className="text-xs text-slate-400">
          Proses konsultasi proposal, analisis anggaran anggaran, serta mintalah rancangan struktur sistem otomatis ke AI Gemini Co-pilot.
        </p>
      </div>

      {/* Filter / Search Bar Row */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari pengajuan briefing proyek..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all text-xs"
          />
        </div>
      </div>

      {/* Table view */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden font-sans">
        {isLoading ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Memeriksa server brief proyek...</span>
          </div>
        ) : filteredBriefs.length === 0 ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono">
            Belum ada pengajuan brief konsultasi proyek.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-[#070C15]/40 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                  <th className="py-4 pl-6">Calon Klien</th>
                  <th className="py-4">Kebutuhan Proyek</th>
                  <th className="py-4">Anggaran (Budget)</th>
                  <th className="py-4">Timeline Proyek</th>
                  <th className="py-4">Status Pengajuan</th>
                  <th className="py-4 pr-6 text-right">Tinjauan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBriefs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/25">
                    
                    <td className="py-4 pl-6">
                      <div className="min-w-0">
                        <span className="block font-bold text-white text-xs">{b.name}</span>
                        <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{b.company}</span>
                      </div>
                    </td>

                    <td className="py-4 font-semibold text-slate-300">{b.projectType}</td>

                    <td className="py-4 text-emerald-400 font-bold font-mono">
                      {b.budget}
                    </td>

                    <td className="py-4 text-slate-400 font-mono">{b.timeline}</td>

                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border uppercase ${
                        b.status === "Pending" ? "bg-amber-950/40 text-amber-300 border-amber-500/10" :
                        b.status === "Reviewed" ? "bg-blue-950/40 text-blue-300 border-blue-500/10" :
                        "bg-emerald-950/40 text-emerald-300 border-emerald-500/10"
                      }`}>
                        {b.status}
                      </span>
                    </td>

                    <td className="py-4 pr-6 text-right">
                      <button
                        onClick={() => { setSelectedBrief(b); setAiResult(null); }}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 font-bold transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detail & AI</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Brief Detail & Gemini AI Consultation dialog overlay */}
      <AnimatePresence>
        {selectedBrief && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBrief(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#0E1726] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/55">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 animate-pulse">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    Analisis Kebutuhan Sistem & Proposal AI
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBrief(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto max-h-[65vh] space-y-6 text-left">
                
                {/* Meta properties */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-850">
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">Klien</span>
                    <span className="block text-white font-bold mt-1 text-xs">{selectedBrief.name} ({selectedBrief.company})</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">Jenis Proyek</span>
                    <span className="block text-white font-bold mt-1 text-xs">{selectedBrief.projectType}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">Anggaran Anggaran</span>
                    <span className="block text-emerald-400 font-mono mt-1 font-bold">{selectedBrief.budget}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">Seksi Hubungi</span>
                    <span className="block text-slate-300 font-mono mt-1 text-[11px] truncate select-all">{selectedBrief.email}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">Target Timeline</span>
                    <span className="block text-slate-300 mt-1 font-semibold">{selectedBrief.timeline}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">Tanggal Masuk</span>
                    <span className="block text-slate-400 font-mono mt-1">{selectedBrief.createdAt}</span>
                  </div>
                </div>

                {/* Scope statement */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    DESKRIPSI RUANG LINGKUP & SPESIFIKASI PROYEK:
                  </label>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selectedBrief.description}
                  </div>
                </div>

                {/* Gemini AI Action Center */}
                <div className="p-5 rounded-2xl bg-[#090F1D] border border-cyan-500/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Rekomendasi Arsitektur Sistem & Anggaran Gemini AI</span>
                    </span>
                    
                    <button
                      type="button"
                      onClick={handleAskAIConsultant}
                      disabled={aiLoading}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {aiLoading ? (
                        <div className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Simulasikan Analisis AI</span>
                      )}
                    </button>
                  </div>

                  {aiResult ? (
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed font-sans text-xs whitespace-pre-wrap">
                      {aiResult}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      AI Gemini akan menyimulasikan perancangan spesifikasi modul fungsional, rekomendasi tech stack yang cocok untuk dipasangkan, estimasi jam kerja pengembang, serta strategi alokasi budget agar seimbang.
                    </p>
                  )}
                </div>

                {/* Status action row */}
                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleUpdateStatus(selectedBrief.id, "Reviewed")}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-850 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      Tandai Direview
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedBrief.id, "Approved")}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-850 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      Tandai Disetujui
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedBrief(null)}
                    className="px-4 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
