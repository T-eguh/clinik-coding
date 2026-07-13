import React, { useState, useEffect } from "react";
import { 
  Plus, Trash, CheckCircle2, X, Sparkles, FolderKanban, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboard } from "./index";

interface ClientCompany {
  id: string;
  name: string;
  logo: string;
  website: string;
  order: number;
}

export default function ClientsCMS() {
  const { showToast } = useDashboard();
  const [clients, setClients] = useState<ClientCompany[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "https://",
    order: 1
  });

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/clients");
      const data = await response.json();
      if (data.success) {
        setClients(data.data.sort((a: any, b: any) => a.order - b.order));
      }
    } catch {
      showToast("Gagal memuat daftar partner logo klien.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setFormData({
      name: "",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop",
      website: "https://client-corp.com",
      order: clients.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: ClientCompany) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      logo: item.logo,
      website: item.website,
      order: item.order
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.logo) {
      showToast("Nama partner klien dan URL logo wajib diisi.", "warning");
      return;
    }

    const payload = {
      name: formData.name,
      logo: formData.logo,
      website: formData.website,
      order: Number(formData.order)
    };

    try {
      const url = editId ? `/api/clients/${editId}` : "/api/clients";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        showToast(
          editId ? "Partner klien diperbarui!" : "Partner baru berhasil ditambahkan!",
          "success"
        );
        setIsModalOpen(false);
        fetchClients();
      } else {
        showToast(data.error || "Gagal menyimpan partner klien.", "error");
      }
    } catch {
      showToast("Gagal menyambung ke server partner.", "error");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus partner logo ini?")) return;

    try {
      const response = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        showToast("Partner logo klien berhasil dihapus.", "success");
        fetchClients();
      } else {
        showToast(data.error || "Gagal menghapus partner.", "error");
      }
    } catch {
      showToast("Kesalahan transmisi jaringan.", "error");
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            CLIENT LOGOS MARQUEE CMS
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>Clients & Marquee CMS</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Kelola logo partner startup, perusahaan, dan instansi terpilih yang muncul pada running text (trusted marquee).
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all cursor-pointer flex items-center gap-2 font-bold text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Partner Logo</span>
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {isLoading ? (
          <div className="col-span-full py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Memasang relasi partner...</span>
          </div>
        ) : clients.length === 0 ? (
          <div className="col-span-full py-24 text-center text-xs text-slate-500 font-mono">
            Belum ada partner logo klien terdaftar.
          </div>
        ) : (
          clients.map((company) => (
            <div 
              key={company.id}
              className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between items-center hover:border-cyan-500/20 transition-all text-center relative group"
            >
              <div className="w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity absolute top-3.5 px-3">
                <button
                  onClick={() => handleOpenEditModal(company)}
                  className="p-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  title="Edit"
                >
                  <EditIcon className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDeleteItem(company.id)}
                  className="p-1 rounded bg-slate-900 border border-slate-800 text-red-400 hover:text-red-300 cursor-pointer"
                  title="Hapus"
                >
                  <Trash className="w-3 h-3" />
                </button>
              </div>

              {/* Logo body */}
              <div className="h-16 flex items-center justify-center py-2">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="max-h-full max-w-full object-contain filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all"
                />
              </div>

              <div className="pt-3 border-t border-slate-850 w-full mt-3">
                <span className="block font-bold text-white text-[10px] truncate">{company.name}</span>
                <span className="block text-[8px] font-mono text-slate-500 truncate mt-0.5">{company.website}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#0E1726] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/55">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <FolderKanban className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    {editId ? "Ubah Logo Partner" : "Tambah Partner Logo"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 space-y-5 text-left text-xs">
                
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    NAMA KLIEN / INSTANSI <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Stripe Inc."
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    URL LOGO KLIEN <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      required
                      name="logo"
                      value={formData.logo}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all text-xs sm:text-sm font-mono"
                    />
                    {formData.logo && (
                      <img 
                        src={formData.logo} 
                        alt="Preview Partner" 
                        className="w-12 h-12 rounded-lg object-contain bg-slate-800 shrink-0 border border-slate-800 p-2"
                        onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop"; }}
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Website */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      WEBSITE KLIEN
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm font-mono"
                    />
                  </div>

                  {/* Order */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      URUTAN DISPLAY (ORDER)
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 font-sans text-xs">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-transparent border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-all cursor-pointer font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all font-bold cursor-pointer flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simpan Partner</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Small helper inside module to avoid duplication
function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}
