import React, { useState, useEffect } from "react";
import { 
  Plus, Edit, Trash, Search, CheckCircle2, X, Sparkles, Cpu, Layers, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboard } from "./index";

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  features: string[];
  bentoStyle: string;
  status: string;
}

export default function ServicesCMS() {
  const { showToast } = useDashboard();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    icon: "Cpu",
    description: "",
    featuresInput: "",
    bentoStyle: "Standard",
    status: "Active"
  });

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      if (data.success) {
        const mapped = data.data.map((s: any) => ({
          id: s.id,
          title: s.title || "",
          icon: s.icon || "Cpu",
          description: s.description || "",
          longDescription: s.longDescription || "",
          features: Array.isArray(s.features) ? s.features : [],
          priceRange: s.priceRange || "Kontak Kami",
          deliveryTime: s.deliveryTime || "Tergantung Kompleksitas",
          status: s.status || "Active",
          order: s.order !== undefined ? s.order : 0
        }));
        setServices(mapped);
      }
    } catch {
      showToast("Gagal memuat daftar layanan dari server.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setFormData({
      title: "",
      icon: "Cpu",
      description: "",
      featuresInput: "Sistem Integrasi, Skalabilitas Tinggi, Arsitektur Cloud",
      bentoStyle: "Standard",
      status: "Active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: ServiceItem) => {
    setEditId(item.id);
    setFormData({
      title: item.title,
      icon: item.icon,
      description: item.description,
      featuresInput: item.features.join(", "),
      bentoStyle: item.bentoStyle,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showToast("Judul layanan dan penjelasan deskripsi wajib diisi.", "warning");
      return;
    }

    const slug = formData.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const payload = {
      title: formData.title,
      slug,
      icon: formData.icon,
      description: formData.description,
      features: formData.featuresInput.split(",").map(f => f.trim()).filter(Boolean),
      bentoStyle: formData.bentoStyle,
      status: formData.status
    };

    try {
      const url = editId ? `/api/services/${editId}` : "/api/services";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        showToast(
          editId ? "Layanan berhasil diperbarui!" : "Layanan baru berhasil ditambahkan!",
          "success"
        );
        setIsModalOpen(false);
        fetchServices();
      } else {
        showToast(data.error || "Gagal menyimpan layanan.", "error");
      }
    } catch {
      showToast("Gangguan jaringan saat menyimpan layanan.", "error");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;

    try {
      const response = await fetch(`/api/services/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        showToast("Layanan berhasil dihapus.", "success");
        fetchServices();
      } else {
        showToast(data.error || "Gagal menghapus layanan.", "error");
      }
    } catch {
      showToast("Gangguan jaringan saat menghapus layanan.", "error");
    }
  };

  const filteredServices = services.filter((item) => 
    (item.title || "").toLowerCase().includes((search || "").toLowerCase()) ||
    (item.description || "").toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            SERVICES CATALOG CMS
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>Services CMS</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Kelola, modifikasi fitur bento grid, serta perbarui daftar kapabilitas layanan software house Clinik Coding.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all cursor-pointer flex items-center gap-2 font-bold font-sans text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan</span>
        </button>
      </div>

      {/* Filter / Search Bar Row */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari katalog layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all text-xs sm:text-sm font-sans"
          />
        </div>
      </div>

      {/* Grid view of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {isLoading ? (
          <div className="col-span-full py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Memulihkan relasi fungsional layanan...</span>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full py-24 text-center text-xs text-slate-500 font-mono border border-slate-800 rounded-2xl bg-[#0F1626]/20">
            Belum ada layanan terdaftar.
          </div>
        ) : (
          filteredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/20 transition-all text-xs group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/30 text-cyan-400">
                    <Cpu className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[9px]">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      STYLE: {(service.bentoStyle || "Standard").toUpperCase()}
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${
                      service.status === "Active" 
                        ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/10" 
                        : "bg-slate-950/80 text-slate-500 border-slate-800"
                    }`}>
                      {(service.status || "Active").toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Features bullet points */}
                <ul className="space-y-1.5 pt-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300 font-medium text-[11px]">
                      <div className="w-1 h-1 rounded-full bg-cyan-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions row */}
              <div className="flex justify-end gap-2 pt-5 mt-5 border-t border-slate-800/85">
                <button
                  onClick={() => handleOpenEditModal(service)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Ubah</span>
                </button>
                <button
                  onClick={() => handleDeleteItem(service.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/20 hover:bg-red-500/5 text-red-400 hover:text-red-300 font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Trash className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Services Modal Editor */}
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
              className="relative w-full max-w-lg bg-[#0E1726] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/55">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    {editId ? "Ubah Detail Layanan" : "Tambah Layanan Baru"}
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
                
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    NAMA LAYANAN / SERVICE TITLE <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Integrasi Sistem IoT & Cloud Computing"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Icon select */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      IKON DISPLAY (LUCIDE)
                    </label>
                    <select
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                    >
                      <option value="Cpu" className="bg-slate-950">Cpu / Microcontroller</option>
                      <option value="Globe" className="bg-slate-950">Globe / Network</option>
                      <option value="Database" className="bg-slate-950">Database / Storage</option>
                      <option value="Layout" className="bg-slate-950">Layout / Frontend</option>
                    </select>
                  </div>

                  {/* Bento style */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      BENTO SECTION DISPLAY STYLE
                    </label>
                    <select
                      name="bentoStyle"
                      value={formData.bentoStyle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                    >
                      <option value="Standard" className="bg-slate-950">Standard Card (1x1)</option>
                      <option value="Wide" className="bg-slate-950">Wide Card Grid (2x1)</option>
                      <option value="Featured" className="bg-slate-950">Featured Center Card (1x2)</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    DESKRIPSI KEMAMPUAN <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tuliskan latar belakang teknis mengenai apa saja kapabilitas solusi layanan digital ini..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all resize-none focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm leading-relaxed"
                  />
                </div>

                {/* Features input */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    DAFTAR FITUR KELUARAN (PISAHKAN DENGAN KOMA)
                  </label>
                  <input
                    type="text"
                    name="featuresInput"
                    value={formData.featuresInput}
                    onChange={handleInputChange}
                    placeholder="Sistem Integrasi IoT, Skalabilitas Tinggi, Arsitektur Cloud AWS"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                  />
                </div>

                {/* Status Selection */}
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    STATUS OPERASIONAL KATALOG
                  </span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === "Active"}
                        onChange={handleInputChange}
                        className="text-cyan-500 border-slate-800 bg-slate-900 cursor-pointer"
                      />
                      <span>ACTIVE / TAMPILKAN</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={formData.status === "Inactive"}
                        onChange={handleInputChange}
                        className="text-cyan-500 border-slate-800 bg-slate-900 cursor-pointer"
                      />
                      <span>INACTIVE / ARSIP</span>
                    </label>
                  </div>
                </div>

                {/* Submit buttons */}
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
                    <span>Simpan Layanan</span>
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
