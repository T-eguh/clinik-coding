import React, { useState, useEffect } from "react";
import { 
  Mail, Search, Trash, Download, Sparkles, CheckCircle2
} from "lucide-react";
import { useDashboard } from "./index";

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: string;
}

export default function NewsletterCMS() {
  const { showToast } = useDashboard();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/newsletter");
      const data = await response.json();
      if (data.success) {
        const mapped = data.data.map((s: any) => ({
          id: s.id,
          email: s.email,
          subscribedAt: s.subscribedAt || s.date || "-",
          status: s.status || "Active"
        }));
        setSubscribers(mapped);
      }
    } catch {
      showToast("Gagal memuat log surel newsletter.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleUnsubscribe = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus / menghentikan langganan surel ini?")) return;

    try {
      const response = await fetch(`/api/newsletter/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        showToast("Langganan surel berhasil dinonaktifkan.", "success");
        fetchSubscribers();
      } else {
        showToast(data.error || "Gagal menghentikan langganan.", "error");
      }
    } catch {
      showToast("Masalah sinkronisasi transmisi.", "error");
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      showToast("Tidak ada data newsletter untuk diekspor.", "warning");
      return;
    }
    const headers = "ID,Email,SubscribedAt,Status\n";
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers 
      + subscribers.map(item => 
          `"${item.id}","${item.email}","${item.subscribedAt}","${item.status}"`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clinik_coding_newsletter_subscribers_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Berhasil mengekspor CSV data pelanggan newsletter.", "success");
  };

  const filteredSubscribers = subscribers.filter((s) => 
    (s.email || "").toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div className="space-y-6 text-left font-sans text-xs">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            NEWSLETTER AUDIENCE CMS
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>Newsletter Subscriptions</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Daftar pengikut loyal pembaruan artikel marketing blog, strategi koding, serta rilis penawaran diskon Clinik Coding.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition-all cursor-pointer flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export CSV List</span>
        </button>
      </div>

      {/* Filter / Search Bar Row */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 flex items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari email subscriber..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all text-xs"
          />
        </div>
      </div>

      {/* Subscribers Table Layout */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden font-sans text-xs">
        {isLoading ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Memasang relasi audiens newsletter...</span>
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono">
            Tidak ada pengikut newsletter yang terdaftar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-[#070C15]/40 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                  <th className="py-4 pl-6">ID Pelanggan</th>
                  <th className="py-4">Alamat Surel (Subscriber Email)</th>
                  <th className="py-4">Tanggal Berlangganan</th>
                  <th className="py-4">Status Saluran</th>
                  <th className="py-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredSubscribers.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/25">
                    <td className="py-4 pl-6 font-mono text-slate-500">{item.id}</td>
                    
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-bold text-white select-all font-mono">{item.email}</span>
                      </div>
                    </td>

                    <td className="py-4 text-slate-400 font-mono">{item.subscribedAt}</td>

                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border uppercase ${
                        item.status === "Active" 
                          ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/10" 
                          : "bg-slate-950 text-slate-500 border-slate-850"
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-4 pr-6 text-right">
                      <button
                        onClick={() => handleUnsubscribe(item.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-850 text-red-400 hover:text-red-300 transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                        title="Unsubscribe / Hapus"
                      >
                        <Trash className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
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
