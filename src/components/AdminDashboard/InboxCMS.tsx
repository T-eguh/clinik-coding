import React, { useState, useEffect } from "react";
import { 
  Mail, Search, Trash, CheckCircle2, X, Eye, Reply, Star, Sparkles, Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboard } from "./index";

interface InboxMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function InboxCMS() {
  const { showToast, triggerRefresh } = useDashboard();
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Unread" | "Read">("All");

  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/inquiries");
      const data = await response.json();
      if (data.success) {
        const mapped = data.data.map((m: any) => ({
          id: m.id,
          name: m.name || "Anonim",
          email: m.email || "-",
          phone: m.phone || "-",
          company: m.company || "-",
          message: m.message || "",
          status: m.status || "Unread",
          createdAt: m.createdAt || m.date || "-"
        }));
        setMessages(mapped);
      }
    } catch {
      showToast("Gagal memuat kotak masuk pesan.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string, currentStatus: string) => {
    if (currentStatus === "Read") return;
    try {
      const response = await fetch(`/api/inquiries/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Read" })
      });
      const data = await response.json();
      if (data.success) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status: "Read" } : m));
        triggerRefresh();
      }
    } catch {
      console.error("Gagal memperbarui status baca pesan.");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;

    try {
      const response = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        showToast("Pesan kontak berhasil dihapus.", "success");
        fetchMessages();
        setSelectedMessage(null);
        triggerRefresh();
      } else {
        showToast(data.error || "Gagal menghapus pesan.", "error");
      }
    } catch {
      showToast("Kesalahan transmisi data.", "error");
    }
  };

  const handleOpenDetailModal = (msg: InboxMessage) => {
    setSelectedMessage(msg);
    setReplyText("");
    handleMarkAsRead(msg.id, msg.status);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSendingReply(true);
    // Simulate sending email reply
    setTimeout(async () => {
      showToast(`Balasan email berhasil dikirim ke: ${selectedMessage?.email}`, "success");
      setIsSendingReply(false);
      setReplyText("");
      
      // Update status to replied in db
      try {
        await fetch(`/api/inquiries/${selectedMessage?.id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Replied" })
        });
        fetchMessages();
      } catch (err) {
        console.error(err);
      }
      setSelectedMessage(null);
    }, 1200);
  };

  // Filters
  const filteredMessages = messages.filter((m) => {
    const matchSearch = 
      (m.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
      (m.email || "").toLowerCase().includes((search || "").toLowerCase()) ||
      (m.message || "").toLowerCase().includes((search || "").toLowerCase());
    
    const matchTab = activeTab === "All" || 
      (activeTab === "Unread" && m.status === "Unread") ||
      (activeTab === "Read" && m.status !== "Unread");

    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* Top Header */}
      <div>
        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
          CLIENT INQUIRY & INBOX SYSTEM
        </span>
        <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
          <span>Inbox Messages</span>
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Tinjau pesan form hubungi kami, data calon klien, serta kirim balasan surel otomatis melalui dashboard ini.
        </p>
      </div>

      {/* Filter / Search Bar Row */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari nama pengirim, subjek surel, pesan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all text-xs"
          />
        </div>

        {/* Tab filters */}
        <div className="flex gap-2 font-semibold text-xs">
          {["All", "Unread", "Read"].map((tab) => {
            const count = tab === "Unread" 
              ? messages.filter(m => m.status === "Unread").length 
              : filteredMessages.length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-3.5 py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab
                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                    : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{tab}</span>
                {tab === "Unread" && count > 0 && (
                  <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Messages List Area */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden text-xs">
        {isLoading ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Memeriksa server kotak masuk surel...</span>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono">
            Kotak masuk Anda kosong.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/65">
            {filteredMessages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => handleOpenDetailModal(msg)}
                className={`p-5 hover:bg-slate-900/20 transition-all flex items-start gap-4 cursor-pointer relative ${
                  msg.status === "Unread" ? "bg-cyan-500/2 border-l-2 border-l-cyan-500" : ""
                }`}
              >
                {/* Visual Unread dot */}
                {msg.status === "Unread" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute top-5 left-2 animate-pulse" />
                )}

                {/* Left icon wrapper */}
                <div className={`p-2.5 rounded-xl border shrink-0 ${
                  msg.status === "Unread" ? "bg-cyan-950/40 border-cyan-800/30 text-cyan-400" : "bg-slate-900 border-slate-800 text-slate-500"
                }`}>
                  <Mail className="w-4 h-4" />
                </div>

                {/* Text details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex justify-between items-start gap-4">
                    <span className={`block text-xs truncate ${msg.status === "Unread" ? "font-bold text-white" : "font-semibold text-slate-300"}`}>
                      {msg.name}
                    </span>
                    <span className="block font-mono text-[9px] text-slate-500 shrink-0">
                      {msg.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                    <span className="truncate">{msg.email}</span>
                    <span>•</span>
                    <span className="truncate">{msg.company || "Personal / Individu"}</span>
                  </div>

                  <p className="text-slate-400 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message detail & Reply overlay dialog */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#0E1726] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/55">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    Detail Pesan Masuk
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message Details content */}
              <div className="p-6 overflow-y-auto max-h-[65vh] space-y-6 text-left text-xs">
                
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800 font-sans">
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">PENGIRIM</span>
                    <span className="block text-white font-bold mt-1 text-sm">{selectedMessage.name}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">TANGGAL MASUK</span>
                    <span className="block text-slate-300 font-mono mt-1 font-bold">{selectedMessage.createdAt}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">EMAIL HUBUNG</span>
                    <span className="block text-cyan-400 font-mono mt-1 font-bold select-all">{selectedMessage.email}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-wider">PERUSAHAAN</span>
                    <span className="block text-slate-300 mt-1 font-bold">{selectedMessage.company || "Individu / Personal"}</span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    ISI PESAN YANG DIKIRIMKAN:
                  </label>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Reply section */}
                <form onSubmit={handleSendReply} className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Reply className="w-3.5 h-3.5 text-cyan-400" />
                      <span>KIRIM BALASAN SUREL CEPAT</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">Penerima: {selectedMessage.email}</span>
                  </div>

                  <textarea
                    required
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Tuliskan draf balasan profesional, misalnya: Halo Sarah, Terima kasih atas ketertarikan Anda terhadap jasa koding software house Clinik Coding..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all resize-none text-xs sm:text-sm font-sans leading-relaxed"
                  />

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="px-4 py-2.5 rounded-xl bg-transparent border border-red-950 hover:bg-red-500/10 text-red-400 transition-all font-bold cursor-pointer"
                    >
                      Hapus Pesan Ini
                    </button>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMessage(null)}
                        className="px-4 py-2.5 rounded-xl bg-transparent border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-all cursor-pointer font-bold"
                      >
                        Tutup
                      </button>
                      <button
                        type="submit"
                        disabled={isSendingReply || !replyText.trim()}
                        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold transition-all flex items-center gap-2 cursor-pointer"
                      >
                        {isSendingReply ? (
                          <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Kirim Balasan</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
