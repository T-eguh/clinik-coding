import React, { useState } from "react";
import { 
  Database, RefreshCw, Download, Upload, Trash, CheckCircle2, AlertTriangle, Clock, Sparkles
} from "lucide-react";
import { useDashboard } from "./index";

interface BackupSnapshot {
  id: string;
  filename: string;
  size: string;
  createdAt: string;
  status: string;
}

export default function BackupRestore() {
  const { showToast } = useDashboard();
  const [backups, setBackups] = useState<BackupSnapshot[]>([
    { id: "1", filename: "backup_db_snapshot_2026-07-01_v1.json", size: "2.4 MB", createdAt: "2026-07-01 12:00:15", status: "Ready" },
    { id: "2", filename: "backup_db_snapshot_2026-07-05_v2.json", size: "2.8 MB", createdAt: "2026-07-05 02:40:00", status: "Ready" }
  ]);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateBackup = () => {
    setIsCreating(true);
    showToast("Menginisialisasi pencatatan data database in-memory...", "info");

    setTimeout(() => {
      const newBackup: BackupSnapshot = {
        id: (backups.length + 1).toString(),
        filename: `backup_db_snapshot_${new Date().toISOString().slice(0, 10)}_${Math.random().toString(36).substr(2, 5)}.json`,
        size: "3.1 MB",
        createdAt: new Date().toISOString().replace("T", " ").substring(0, 19),
        status: "Ready"
      };
      setBackups(prev => [newBackup, ...prev]);
      setIsCreating(false);
      showToast("Pencatatan backup berhasil disimpan dalam berkas lokal!", "success");
    }, 2000);
  };

  const handleDeleteBackup = (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus backup snapshot ini?")) return;
    setBackups(prev => prev.filter(b => b.id !== id));
    showToast("Berkas snapshot berhasil didelete permanen.", "success");
  };

  const handleDownloadBackup = (filename: string) => {
    showToast(`Mulai mengunduh berkas: ${filename}`, "success");
  };

  const handleSimulateRestore = (filename: string) => {
    if (!confirm(`Apakah Anda yakin ingin melakukan restorasi penuh dari berkas ini: ${filename}? Seluruh data saat ini akan digantikan.`)) return;

    showToast("Mengekstrak struktur database snapshot...", "info");
    setTimeout(() => {
      showToast("Restorasi data database berhasil diselaraskan kembali!", "success");
    }, 2500);
  };

  return (
    <div className="space-y-6 text-left font-sans text-xs">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            DATABASE SECURITY & BACKUP MANAGEMENT
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>Backup & Restore</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Ambil snapshot penuh struktur basis data in-memory, unduh salinan skema JSON, atau restore data dari berkas snapshot cadangan.
          </p>
        </div>

        <button
          onClick={handleCreateBackup}
          disabled={isCreating}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 transition-all cursor-pointer flex items-center gap-2 font-bold font-sans text-xs"
        >
          {isCreating ? (
            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Database className="w-4 h-4" />
          )}
          <span>Buat Backup Snapshot</span>
        </button>
      </div>

      {/* Warning Alert Banner */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 flex gap-3 text-amber-300">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-xs">Instruksi Keamanan Kredensial:</strong>
          <p className="text-[11px] leading-relaxed text-slate-300">
            Proses restorasi bersifat destruktif dan akan menulis ulang seluruh entri di database in-memory saat ini. Pastikan Anda telah mengunduh cadangan snapshot yang aktif sebelum memulai pemulihan sistem.
          </p>
        </div>
      </div>

      {/* Backup list Table */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-[#070C15]/40 text-slate-400 font-mono text-[9px] uppercase tracking-wider flex justify-between items-center">
          <span>DAFTAR BERKAS SNAPSHOT CADANGAN</span>
          <span className="font-bold text-cyan-400">{backups.length} Snapshots</span>
        </div>

        {backups.length === 0 ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono">
            Tidak ada snapshot backup yang tersedia.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60 font-sans text-xs">
            {backups.map((item) => (
              <div 
                key={item.id}
                className="p-5 hover:bg-slate-900/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                
                {/* Details layout */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white font-mono text-xs select-all">{item.filename}</span>
                    <div className="flex gap-3 items-center text-[10px] text-slate-500 font-mono mt-1">
                      <span>UKURAN: {item.size}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-600" />
                        <span>{item.createdAt}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions button block */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadBackup(item.filename)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                    title="Download JSON Snapshot"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">Unduh</span>
                  </button>

                  <button
                    onClick={() => handleSimulateRestore(item.filename)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                    title="Restore Database Full"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Restore</span>
                  </button>

                  <button
                    onClick={() => handleDeleteBackup(item.id)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                    title="Hapus Permanen"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
