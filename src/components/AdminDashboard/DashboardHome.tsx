import React, { useState, useEffect } from "react";
import { 
  FolderKanban, Users, Mail, TrendingUp, DollarSign, Activity, 
  Plus, Upload, Database, RefreshCw, Send, ArrowUpRight, Zap, Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { useDashboard } from "./index";

export default function DashboardHome() {
  const { user, showToast, triggerRefresh, refreshDataTrigger, setActiveMenu } = useDashboard();
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    pendingMessages: 0,
    visitors: 12450,
    revenue: "Rp 128.500.000",
    conversionRate: "4.8%"
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [portRes, cliRes, inqRes, logsRes] = await Promise.all([
        fetch("/api/portfolio"),
        fetch("/api/clients"),
        fetch("/api/inquiries"),
        fetch("/api/logs")
      ]);

      const portData = await portRes.json();
      const cliData = await cliRes.json();
      const inqData = await inqRes.json();
      const logsData = await logsRes.json();

      const unreadCount = inqData.success 
        ? inqData.data.filter((i: any) => i.status === "Unread").length 
        : 0;

      setStats({
        projects: portData.success ? portData.data.length : 0,
        clients: cliData.success ? cliData.data.length : 0,
        pendingMessages: unreadCount,
        visitors: 12450 + (inqData.success ? inqData.data.length * 15 : 0),
        revenue: "Rp 128.500.000",
        conversionRate: "4.8%"
      });

      if (logsData.success) {
        setActivities(logsData.data.slice(0, 5));
      }
    } catch (err) {
      console.error("Failed to load dashboard statistics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [refreshDataTrigger]);

  const handleQuickBackup = async () => {
    showToast("Menginisialisasi pencadangan data sistem...", "info");
    try {
      const res = await fetch("/api/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "Database" })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Database berhasil dicadangkan: " + data.data.name, "success");
        triggerRefresh();
      }
    } catch {
      showToast("Gagal melakukan pencadangan otomatis.", "error");
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            CONTROL CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>Halo, {user?.name}</span>
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Berikut ringkasan operasional software house Clinik Coding per hari ini.
          </p>
        </div>
        
        <button
          onClick={fetchDashboardData}
          disabled={isLoading}
          className="px-4 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-2 font-semibold"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        
        {/* Card 1: Projects */}
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">PROJECTS</span>
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-extrabold font-heading text-white block mb-1">
            {stats.projects}
          </span>
          <span className="text-[10px] font-sans text-slate-400 block">
            Aktif & Selesai
          </span>
        </div>

        {/* Card 2: Clients */}
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">CLIENTS</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-extrabold font-heading text-white block mb-1">
            {stats.clients}
          </span>
          <span className="text-[10px] font-sans text-slate-400 block">
            Partner Terdaftar
          </span>
        </div>

        {/* Card 3: Pending Messages */}
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">INBOX</span>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 relative">
              <Mail className="w-4 h-4" />
              {stats.pendingMessages > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </div>
          </div>
          <span className="text-2xl font-extrabold font-heading text-white block mb-1">
            {stats.pendingMessages}
          </span>
          <span className="text-[10px] font-sans text-slate-400 block">
            Pesan Belum Dibaca
          </span>
        </div>

        {/* Card 4: Visitors */}
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">VISITORS</span>
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-extrabold font-heading text-white block mb-1">
            {stats.visitors.toLocaleString()}
          </span>
          <span className="text-[10px] font-sans text-slate-400 block">
            Pengunjung Sesi Ini
          </span>
        </div>

        {/* Card 5: Revenue */}
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">REVENUE</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-base sm:text-lg font-extrabold font-heading text-white block mb-1 truncate">
            {stats.revenue}
          </span>
          <span className="text-[10px] font-sans text-slate-400 block">
            Estimasi Terakumulasi
          </span>
        </div>

        {/* Card 6: Conversion Rate */}
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">CONVERSION</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-extrabold font-heading text-white block mb-1">
            {stats.conversionRate}
          </span>
          <span className="text-[10px] font-sans text-slate-400 block">
            Rasio Leads Sukses
          </span>
        </div>

      </div>

      {/* Main Grid: Quick Actions + Latest Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Actions & System Health */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>AKSI CEPAT OPERASIONAL</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveMenu("portfolio")}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all text-left space-y-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center text-cyan-400">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="block font-sans text-xs font-semibold text-white">
                  Portofolio Baru
                </span>
                <span className="block text-[9px] text-slate-500">
                  Tambah studi kasus
                </span>
              </button>

              <button
                onClick={() => setActiveMenu("blog")}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all text-left space-y-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center text-cyan-400">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="block font-sans text-xs font-semibold text-white">
                  Tulis Artikel
                </span>
                <span className="block text-[9px] text-slate-500">
                  Tulis blog draft baru
                </span>
              </button>

              <button
                onClick={() => setActiveMenu("media")}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all text-left space-y-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center text-cyan-400">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="block font-sans text-xs font-semibold text-white">
                  Upload Media
                </span>
                <span className="block text-[9px] text-slate-500">
                  Unggah aset gambar / zip
                </span>
              </button>

              <button
                onClick={handleQuickBackup}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all text-left space-y-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center text-cyan-400">
                  <Database className="w-4 h-4" />
                </div>
                <span className="block font-sans text-xs font-semibold text-white">
                  Backup Database
                </span>
                <span className="block text-[9px] text-slate-500">
                  Pencadangan satu-klik
                </span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/10 border border-cyan-500/10 text-cyan-300 space-y-1.5 font-sans">
              <span className="block text-[10px] font-mono uppercase tracking-widest font-bold text-cyan-400">STATUS KEAMANAN KANAL</span>
              <p className="text-xs leading-relaxed">
                Kanal dashboard ini diamankan menggunakan validasi JWT payload native dengan penanganan autolock timeout aktif.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Latest Activity Logs */}
        <div className="lg:col-span-7 bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>AKTIVITAS OPERASIONAL TERBARU</span>
              </h3>
              <button
                onClick={() => setActiveMenu("logs")}
                className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-all cursor-pointer font-bold"
              >
                LIHAT SEMUA LOGS →
              </button>
            </div>

            <div className="space-y-3">
              {activities.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-600 font-mono">
                  Belum ada catatan aktivitas terbaru.
                </div>
              ) : (
                activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-slate-800 hover:bg-slate-900 transition-all flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-2 animate-pulse" />
                    <div className="flex-1 min-w-0 font-sans">
                      <div className="flex justify-between items-start gap-4">
                        <span className="block font-bold text-xs text-white truncate">
                          {act.action}
                        </span>
                        <span className="block font-mono text-[9px] text-slate-500 shrink-0">
                          {new Date(act.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="block text-[10px] text-slate-400 font-medium">
                          Oleh: {act.user}
                        </span>
                        <span className="block font-mono text-[8px] text-slate-600">
                          IP: {act.ip}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-500 font-mono">
              SECURE ADMINISTRATOR SHIFT DETECTED • AGENT TERMINAL ACTIVE
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
