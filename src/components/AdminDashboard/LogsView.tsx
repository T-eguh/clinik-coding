import React, { useState, useEffect } from "react";
import { 
  Activity, Trash, Search, Sparkles, AlertCircle
} from "lucide-react";
import { useDashboard } from "./index";

interface SystemLog {
  id: string;
  adminName: string;
  action: string;
  ipAddress: string;
  createdAt: string;
}

export default function LogsView() {
  const { showToast, user } = useDashboard();
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/logs");
      const data = await response.json();
      if (data.success) {
        const mapped = (data.data || []).map((log: any) => ({
          id: log.id,
          adminName: log.user || log.adminName || "System",
          action: log.action || "-",
          ipAddress: log.ip || log.ipAddress || "-",
          createdAt: log.timestamp || log.createdAt || "-"
        }));
        setLogs(mapped);
      }
    } catch {
      showToast("Gagal memuat log audit aktivitas.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleClearLogs = async () => {
    if (user?.role !== "Super Admin") {
      showToast("Hanya tingkatan Super Admin yang diizinkan mengosongkan riwayat log audit.", "warning");
      return;
    }

    if (!confirm("Apakah Anda yakin ingin menghapus semua catatan riwayat log audit aktivitas secara permanen?")) return;

    try {
      const response = await fetch("/api/logs", { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        showToast("Log audit aktivitas berhasil dibersihkan dari server database.", "success");
        fetchLogs();
      } else {
        showToast(data.error || "Gagal mengosongkan log.", "error");
      }
    } catch {
      showToast("Kesalahan transmisi data.", "error");
    }
  };

  const filteredLogs = logs.filter((log) => 
    (log.adminName || "").toLowerCase().includes((search || "").toLowerCase()) ||
    (log.action || "").toLowerCase().includes((search || "").toLowerCase()) ||
    (log.ipAddress || "").toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div className="space-y-6 text-left font-sans text-xs">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            ENTERPRISE SYSTEM SECURITY AUDIT
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>Activity Logs</span>
            <Activity className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Audit aktivitas administrator, log otentikasi login, perubahan database CMS, alamat IP pengakses, serta waktu eksekusi presisi.
          </p>
        </div>

        {user?.role === "Super Admin" && (
          <button
            onClick={handleClearLogs}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/20 hover:bg-red-500/5 text-red-400 hover:text-red-300 transition-all cursor-pointer flex items-center gap-2 font-bold font-sans text-xs"
          >
            <Trash className="w-4 h-4" />
            <span>Kosongkan Riwayat Log</span>
          </button>
        )}
      </div>

      {/* Filter / Search Bar Row */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 flex items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari admin, aksi, alamat IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all text-xs"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden font-sans text-xs">
        {isLoading ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Memulihkan jejak audit log...</span>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono">
            Tidak ditemukan catatan log audit yang cocok.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-[#070C15]/40 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                  <th className="py-4 pl-6">Alamat IP</th>
                  <th className="py-4">Administrator</th>
                  <th className="py-4">Aktivitas Modifikasi (Aksi)</th>
                  <th className="py-4 pr-6 text-right">Waktu Eksekusi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/25">
                    
                    <td className="py-4 pl-6 text-cyan-400 font-semibold select-all">
                      {log.ipAddress}
                    </td>

                    <td className="py-4 font-sans font-bold text-white">
                      {log.adminName}
                    </td>

                    <td className="py-4 text-slate-300 max-w-xs truncate">
                      {log.action}
                    </td>

                    <td className="py-4 pr-6 text-right text-slate-500">
                      {log.createdAt}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
