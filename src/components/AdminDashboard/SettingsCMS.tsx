import React, { useState, useEffect } from "react";
import { 
  Settings, CheckCircle2, Sparkles, Sliders, Database, Server, Mail
} from "lucide-react";
import { useDashboard } from "./index";

export default function SettingsCMS() {
  const { showToast } = useDashboard();
  const [settings, setSettings] = useState({
    siteName: "Clinik Coding",
    contactEmail: "halo@clinikcoding.com",
    contactPhone: "+62 812-3456-7890",
    maintenanceMode: false,
    autoBackupEnabled: true,
    apiKeySimulation: true,
    serverLogsRetentionDays: 30
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();
      if (data.success && data.data) {
        const d = data.data;
        setSettings({
          siteName: d.websiteName || d.siteName || "Clinik Coding",
          contactEmail: d.contactEmail || "halo@clinikcoding.com",
          contactPhone: d.contactPhone || "+62 812-3456-7890",
          maintenanceMode: d.maintenanceMode !== undefined ? d.maintenanceMode : false,
          autoBackupEnabled: d.autoBackupEnabled !== undefined ? d.autoBackupEnabled : true,
          apiKeySimulation: d.apiKeySimulation !== undefined ? d.apiKeySimulation : true,
          serverLogsRetentionDays: d.serverLogsRetentionDays !== undefined ? Number(d.serverLogsRetentionDays) : 30
        });
      }
    } catch {
      showToast("Gagal memuat konfigurasi sistem.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string) => {
    setSettings(prev => ({ ...prev, [name]: !(prev as any)[name] }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...settings,
      websiteName: settings.siteName
    };

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        showToast("Konfigurasi sistem berhasil diperbarui!", "success");
      } else {
        showToast("Gagal memperbarui konfigurasi.", "error");
      }
    } catch {
      showToast("Kesalahan sinkronisasi transmisi.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left font-sans text-xs">
      
      {/* Top Header */}
      <div>
        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
          SYSTEM PREFERENCES & SETTINGS CMS
        </span>
        <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
          <span>Website Settings</span>
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Ubah konfigurasi operasional website, alamat email korespondensi form kontak, penangguhan mode pemeliharaan (offline), serta retensi pencatatan log aktivitas server.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - General & contact properties */}
        <div className="lg:col-span-7 bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>KONFIGURASI UMUM & HUBUNGI KAMI</span>
          </h3>

          <div className="space-y-4">
            {/* Site Name */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                NAMA BRANDE PERUSAHAAN (SITE NAME)
              </label>
              <input
                type="text"
                name="siteName"
                required
                value={settings.siteName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all text-xs sm:text-sm font-semibold"
              />
            </div>

            {/* Contact Email */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                ALAMAT SUREL ALERTI NOTIFIKASI FORM (EMAIL KOORDINATOR)
              </label>
              <input
                type="email"
                name="contactEmail"
                required
                value={settings.contactEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all text-xs sm:text-sm font-mono"
              />
            </div>

            {/* Contact Phone */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                NOMOR KONTAK HANDPHONE SUPPORT (TELEPON DISPLAY)
              </label>
              <input
                type="text"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all text-xs sm:text-sm font-mono"
              />
            </div>

            {/* Server retention log days */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                BATAS RETENSI PENYIMPANAN LOG AKTIVITAS (HARI)
              </label>
              <select
                name="serverLogsRetentionDays"
                value={settings.serverLogsRetentionDays}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all text-xs sm:text-sm"
              >
                <option value={7} className="bg-slate-950">7 Hari (Minimalis)</option>
                <option value={30} className="bg-slate-950">30 Hari (Standar)</option>
                <option value={90} className="bg-slate-950">90 Hari (Enterprise)</option>
              </select>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold transition-all flex items-center gap-2 cursor-pointer font-sans"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Konfigurasi</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column - Statuses and Maintenance options */}
        <div className="lg:col-span-5 space-y-6 font-sans">
          
          {/* Server status & resources */}
          <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>STATUS KESEHATAN CONTAINER</span>
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Engine Node.js</span>
                <span className="text-white font-mono font-semibold">Active (Port 3000)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Database Engine</span>
                <span className="text-cyan-400 font-mono font-bold">In-Memory Active</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Memory Allocation</span>
                <span className="text-white font-mono">128 MB / 512 MB</span>
              </div>
            </div>
          </div>

          {/* Operational Switches */}
          <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>SAKLAR OPERASIONAL</span>
            </h3>

            <div className="space-y-5">
              
              {/* Maintenance Mode */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block font-bold text-white text-xs">Mode Pemeliharaan (Offline)</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed max-w-[200px]">
                    Kunci rute publik utama dan tampilkan halaman statis maintenance mode.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleToggleChange("maintenanceMode")}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 cursor-pointer ${settings.maintenanceMode ? "bg-cyan-500" : "bg-slate-800"}`}
                >
                  <div className={`w-4.5 h-4.5 rounded-full bg-slate-950 transition-transform duration-200 ${settings.maintenanceMode ? "translate-x-5.5" : ""}`} />
                </button>
              </div>

              {/* Auto backup */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block font-bold text-white text-xs">Auto Backup Database</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed max-w-[200px]">
                    Cadangkan database secara otomatis setiap 24 jam sekali.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleToggleChange("autoBackupEnabled")}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 cursor-pointer ${settings.autoBackupEnabled ? "bg-cyan-500" : "bg-slate-800"}`}
                >
                  <div className={`w-4.5 h-4.5 rounded-full bg-slate-950 transition-transform duration-200 ${settings.autoBackupEnabled ? "translate-x-5.5" : ""}`} />
                </button>
              </div>

              {/* Gemini Simulation fallback */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block font-bold text-white text-xs">Kunci Gemini API Fallback</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed max-w-[200px]">
                    Gunakan draf draf AI simulasi jika kunci API eksternal belum siap dikonfigurasi.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleToggleChange("apiKeySimulation")}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 cursor-pointer ${settings.apiKeySimulation ? "bg-cyan-500" : "bg-slate-800"}`}
                >
                  <div className={`w-4.5 h-4.5 rounded-full bg-slate-950 transition-transform duration-200 ${settings.apiKeySimulation ? "translate-x-5.5" : ""}`} />
                </button>
              </div>

            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
