import React, { useState, useEffect } from "react";
import { 
  Plus, Edit, Trash, CheckCircle2, X, Sparkles, Award, Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboard } from "./index";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  featured: boolean;
}

export default function TestimonialsCMS() {
  const { showToast } = useDashboard();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    avatar: "",
    featured: true
  });

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/testimonials");
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch {
      showToast("Gagal memuat testimoni klien.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setFormData({
      name: "",
      role: "Product Owner",
      company: "Startup Co",
      content: "",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop",
      featured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Testimonial) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      role: item.role,
      company: item.company,
      content: item.content,
      rating: item.rating,
      avatar: item.avatar,
      featured: item.featured
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      showToast("Nama klien dan isi testimoni wajib diisi.", "warning");
      return;
    }

    const payload = {
      name: formData.name,
      role: formData.role,
      company: formData.company,
      content: formData.content,
      rating: Number(formData.rating),
      avatar: formData.avatar,
      featured: formData.featured
    };

    try {
      const url = editId ? `/api/testimonials/${editId}` : "/api/testimonials";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        showToast(
          editId ? "Testimoni klien diperbarui!" : "Testimoni baru berhasil disimpan!",
          "success"
        );
        setIsModalOpen(false);
        fetchTestimonials();
      } else {
        showToast(data.error || "Gagal menyimpan testimoni.", "error");
      }
    } catch {
      showToast("Gangguan jaringan saat memproses database testimoni.", "error");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        showToast("Testimoni klien terhapus.", "success");
        fetchTestimonials();
      } else {
        showToast(data.error || "Gagal menghapus testimoni.", "error");
      }
    } catch {
      showToast("Gagal berkomunikasi dengan server database.", "error");
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            CLIENT TRUST & TESTIMONIAL CMS
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>Testimonials CMS</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Kelola tanggapan kepuasan klien, rating bintang, avatar, serta status featured pada halaman testimonial.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all cursor-pointer flex items-center gap-2 font-bold font-sans text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      {/* Testimonials Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {isLoading ? (
          <div className="col-span-full py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Memasang relasi kepuasan klien...</span>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full py-24 text-center text-xs text-slate-500 font-mono border border-slate-800 rounded-2xl bg-[#0F1626]/20">
            Belum ada catatan testimoni.
          </div>
        ) : (
          testimonials.map((item) => (
            <div 
              key={item.id}
              className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/20 transition-all text-xs"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  {item.featured && (
                    <span className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/30 text-[9px] font-mono font-bold text-cyan-400">
                      ★ FEATURED
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{item.content}"
                </p>
              </div>

              {/* Client Avatar & details and actions */}
              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    className="w-8 h-8 rounded-full object-cover bg-slate-900 border border-slate-800"
                  />
                  <div>
                    <span className="block font-bold text-white text-xs">{item.name}</span>
                    <span className="block text-[9px] text-slate-500">{item.role} • {item.company}</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 rounded-lg hover:bg-slate-850 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-850 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                    title="Hapus"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Testimonials editor modal */}
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
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    {editId ? "Ubah Testimoni Klien" : "Tambah Testimoni Baru"}
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      NAMA LENGKAP KLIEN <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      RATING BINTANG KLIEN
                    </label>
                    <select
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                      <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Role */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      JABATAN / ROLE
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="e.g. Product Director"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      NAMA PERUSAHAAN / STARTUP
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Cyberdyne Inc."
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    ISI TESTIMONI KEPUASAN <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={4}
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Tulis testimoni lengkap yang diberikan oleh klien mengenai kepuasan hasil kodingan atau sistem dari Clinik Coding..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all resize-none focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm leading-relaxed"
                  />
                </div>

                {/* Avatar */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    AVATAR GAMBAR PROFILE KLIEN URL
                  </label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all text-xs sm:text-sm font-mono"
                    />
                    {formData.avatar && (
                      <img 
                        src={formData.avatar} 
                        alt="Preview Avatar" 
                        className="w-12 h-12 rounded-full object-cover bg-slate-800 shrink-0 border border-slate-800"
                        onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"; }}
                      />
                    )}
                  </div>
                </div>

                {/* Featured select */}
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    PARAMETER PENAMPILAN
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                    <span>Tampilkan sebagai Review Unggulan (Featured)</span>
                  </label>
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
                    <span>Simpan Testimoni</span>
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
