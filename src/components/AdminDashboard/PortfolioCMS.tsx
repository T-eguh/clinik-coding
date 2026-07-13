import React, { useState, useEffect } from "react";
import { 
  Plus, Edit, Trash, Search, Download, Trash2, CheckCircle2, X, Filter,
  ArrowUpDown, Eye, ExternalLink, Sparkles, Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboard } from "./index";

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  technology: string[];
  thumbnail: string;
  images: string[];
  url: string;
  status: string;
  featured: boolean;
  date: string;
  tags: string[];
}

export default function PortfolioCMS() {
  const { showToast, user } = useDashboard();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    category: "Web Application",
    description: "",
    technologyInput: "",
    thumbnail: "",
    url: "",
    status: "Published",
    featured: false,
    date: new Date().toISOString().split("T")[0],
    tagsInput: ""
  });

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      if (data.success) {
        const mapped = data.data.map((p: any) => ({
          id: p.id,
          title: p.title || "",
          client: p.client || "-",
          category: p.category || "Web Application",
          description: p.description || "",
          technology: Array.isArray(p.technology) ? p.technology : [],
          thumbnail: p.thumbnail || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60",
          images: Array.isArray(p.images) ? p.images : [],
          url: p.url || "",
          status: p.status || "Published",
          featured: !!p.featured,
          date: p.date || new Date().toISOString().split("T")[0],
          tags: Array.isArray(p.tags) ? p.tags : []
        }));
        setItems(mapped);
      }
    } catch {
      showToast("Gagal memuat data portofolio dari server.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
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
      title: "",
      client: "",
      category: "Web Application",
      description: "",
      technologyInput: "React, TypeScript, Tailwind CSS",
      thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60",
      url: "https://example.com",
      status: "Published",
      featured: false,
      date: new Date().toISOString().split("T")[0],
      tagsInput: "Enterprise, Dashboard"
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: PortfolioItem) => {
    setEditId(item.id);
    setFormData({
      title: item.title,
      client: item.client,
      category: item.category,
      description: item.description,
      technologyInput: item.technology.join(", "),
      thumbnail: item.thumbnail,
      url: item.url,
      status: item.status,
      featured: item.featured,
      date: item.date,
      tagsInput: item.tags.join(", ")
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.client || !formData.description) {
      showToast("Harap lengkapi semua bidang isian wajib.", "warning");
      return;
    }

    const payload = {
      title: formData.title,
      client: formData.client,
      category: formData.category,
      description: formData.description,
      technology: formData.technologyInput.split(",").map(t => t.trim()).filter(Boolean),
      thumbnail: formData.thumbnail,
      url: formData.url,
      status: formData.status,
      featured: formData.featured,
      date: formData.date,
      tags: formData.tagsInput.split(",").map(t => t.trim()).filter(Boolean),
      images: [formData.thumbnail]
    };

    try {
      const url = editId ? `/api/portfolio/${editId}` : "/api/portfolio";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const resData = await response.json();

      if (resData.success) {
        showToast(
          editId ? "Portofolio berhasil diperbarui!" : "Portofolio baru berhasil ditambahkan!",
          "success"
        );
        setIsModalOpen(false);
        fetchPortfolio();
      } else {
        showToast(resData.error || "Gagal menyimpan portofolio.", "error");
      }
    } catch {
      showToast("Gangguan jaringan saat menyimpan data.", "error");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus portofolio ini?")) return;

    try {
      const response = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        showToast("Portofolio berhasil dihapus.", "success");
        fetchPortfolio();
        setSelectedIds((prev) => prev.filter(item => item !== id));
      } else {
        showToast(data.error || "Gagal menghapus portofolio.", "error");
      }
    } catch {
      showToast("Kesalahan jaringan saat menghapus portofolio.", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} portofolio terpilih secara massal?`)) return;

    try {
      const response = await fetch("/api/portfolio/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds })
      });
      const data = await response.json();
      if (data.success) {
        showToast("Semua portofolio terpilih berhasil dihapus massal.", "success");
        setSelectedIds([]);
        fetchPortfolio();
      } else {
        showToast(data.error || "Gagal menghapus massal.", "error");
      }
    } catch {
      showToast("Gagal melakukan aksi hapus massal.", "error");
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedItems.map((item) => item.id));
    }
  };

  const handleExportCSV = () => {
    if (items.length === 0) {
      showToast("Tidak ada data untuk diekspor.", "warning");
      return;
    }
    const headers = "ID,Project Name,Client,Category,Date,Status,Featured,URL\n";
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers 
      + items.map(item => 
          `"${item.id}","${item.title.replace(/"/g, '""')}","${item.client.replace(/"/g, '""')}","${item.category}","${item.date}","${item.status}","${item.featured}","${item.url}"`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clinik_coding_portfolio_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Berhasil mengekspor CSV data portofolio.", "success");
  };

  // Filter & Sort Logic
  const filteredItems = items
    .filter((item) => {
      const matchSearch = 
        (item.title || "").toLowerCase().includes((search || "").toLowerCase()) ||
        (item.client || "").toLowerCase().includes((search || "").toLowerCase()) ||
        (item.description || "").toLowerCase().includes((search || "").toLowerCase());
      
      const matchStatus = statusFilter === "All" || item.status === statusFilter;
      const matchCategory = categoryFilter === "All" || item.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Pagination bounds
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 text-left">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            CONTENT MANAGEMENT SYSTEM
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>Portfolio CMS</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Kelola, edit, tampilkan, dan rancang katalog studi kasus produk Clinik Coding.
          </p>
        </div>

        <div className="flex gap-2 font-sans text-xs font-semibold">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all cursor-pointer flex items-center gap-2 font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Portofolio</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar Row */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center">
        
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari portofolio, klien, tech..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all text-xs sm:text-sm font-sans"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto font-sans text-xs">
          
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-300 outline-none focus:border-cyan-500/30 transition-all cursor-pointer"
            >
              <option value="All" className="bg-slate-950">Semua Status</option>
              <option value="Published" className="bg-slate-950">Published</option>
              <option value="Draft" className="bg-slate-950">Draft</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-300 outline-none focus:border-cyan-500/30 transition-all cursor-pointer"
          >
            <option value="All" className="bg-slate-950">Semua Kategori</option>
            <option value="Web Application" className="bg-slate-950">Web Application</option>
            <option value="Landing Page" className="bg-slate-950">Landing Page</option>
            <option value="System CMS" className="bg-slate-950">System CMS</option>
          </select>

          {/* Sorting */}
          <button
            onClick={() => {
              if (sortBy === "date") {
                setSortOrder(prev => prev === "asc" ? "desc" : "asc");
              } else {
                setSortBy("date");
                setSortOrder("desc");
              }
            }}
            className="px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tanggal ({sortOrder === "asc" ? "Asc" : "Desc"})</span>
          </button>
        </div>
      </div>

      {/* Selected Batch Action Banner */}
      {selectedIds.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-red-300 flex items-center justify-between font-sans text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2">
            <Trash2 className="w-4.5 h-4.5 text-red-400" />
            <span>Terpilih <strong>{selectedIds.length}</strong> portofolio untuk aksi massal.</span>
          </div>
          <button
            onClick={handleBulkDelete}
            className="px-3.5 py-1.5 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Hapus Massal</span>
          </button>
        </motion.div>
      )}

      {/* Portfolio Table Grid layout */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden font-sans">
        {isLoading ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Sinkronisasi database portofolio...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono">
            Tidak ditemukan portofolio yang cocok dengan kriteria filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-[#070C15]/40 text-slate-400 font-mono text-[9px] uppercase tracking-wider select-none">
                  <th className="py-4 pl-6 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === paginatedItems.length && paginatedItems.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-4">Proyek & Klien</th>
                  <th className="py-4">Kategori</th>
                  <th className="py-4">Teknologi</th>
                  <th className="py-4">Tanggal Rilis</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Featured</th>
                  <th className="py-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedItems.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-slate-900/25 transition-colors ${isSelected ? "bg-cyan-500/5" : ""}`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 pl-6 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(item.id)}
                          className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Name & Client */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.thumbnail} 
                            alt={item.title} 
                            className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-800"
                          />
                          <div className="min-w-0">
                            <span className="block font-bold text-white text-xs sm:text-sm truncate">
                              {item.title}
                            </span>
                            <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                              Klien: {item.client}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 text-slate-300 font-semibold">{item.category}</td>

                      {/* Tech */}
                      <td className="py-4 max-w-[180px]">
                        <div className="flex flex-wrap gap-1">
                          {item.technology.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800/80 text-[9px] font-mono text-slate-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 text-slate-400 font-mono">{item.date}</td>

                      {/* Status */}
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                          item.status === "Published" 
                            ? "bg-emerald-950/40 text-emerald-300 border border-emerald-800/30" 
                            : "bg-slate-900 text-slate-400 border border-slate-800"
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </td>

                      {/* Featured */}
                      <td className="py-4">
                        {item.featured ? (
                          <span className="text-cyan-400 font-bold text-[10px] font-mono bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-800/30">
                            ★ YES
                          </span>
                        ) : (
                          <span className="text-slate-600 font-mono text-[10px]">NO</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-1.5 rounded-lg hover:bg-slate-850 text-slate-400 hover:text-white transition-colors"
                            title="Buka Website"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          
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
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Table footer Pagination controls */}
        {!isLoading && totalPages > 1 && (
          <div className="p-4 border-t border-slate-800/60 bg-[#070C15]/20 flex items-center justify-between font-sans text-xs">
            <span className="text-slate-500">
              Menampilkan halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
            </span>

            <div className="flex gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 disabled:opacity-40 disabled:hover:text-slate-400 transition-colors cursor-pointer font-bold"
              >
                Sebelumnya
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 disabled:opacity-40 disabled:hover:text-slate-400 transition-colors cursor-pointer font-bold"
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Portfolio Add / Edit Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#0E1726] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/55">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    {editId ? "Ubah Portofolio" : "Tambah Portofolio Baru"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto max-h-[70vh] space-y-5 text-left text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      NAMA PROYEK <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. MedikaCare EMR Platform"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                    />
                  </div>

                  {/* Client */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      NAMA KLIEN / INSTANSI <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="client"
                      required
                      value={formData.client}
                      onChange={handleInputChange}
                      placeholder="e.g. MedikaCare Group"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Category select */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      KATEGORI PROYEK
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                    >
                      <option value="Web Application" className="bg-slate-950">Web Application</option>
                      <option value="Landing Page" className="bg-slate-950">Landing Page</option>
                      <option value="System CMS" className="bg-slate-950">System CMS</option>
                    </select>
                  </div>

                  {/* Date Picker */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      TANGGAL PENYELESAIAN
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Description with Character Counter */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      DESKRIPSI PROYEK <span className="text-red-400">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">
                      {formData.description.length} / 500 karakter
                    </span>
                  </div>
                  <textarea
                    name="description"
                    required
                    maxLength={500}
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tuliskan penjelasan detail mengenai latar belakang, sasaran, dan alur integrasi fungsional dari sistem ini..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all resize-none focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                  />
                </div>

                {/* Tech input */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    TEKNOLOGI YANG DIGUNAKAN (PISAHKAN DENGAN KOMA)
                  </label>
                  <input
                    type="text"
                    name="technologyInput"
                    value={formData.technologyInput}
                    onChange={handleInputChange}
                    placeholder="React, TypeScript, Tailwind CSS, PostgreSQL"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm font-mono"
                  />
                </div>

                {/* Thumbnail image and preview */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    URL THUMBNAIL GAMBAR
                  </label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all text-xs sm:text-sm font-mono"
                    />
                    {formData.thumbnail && (
                      <img 
                        src={formData.thumbnail} 
                        alt="Preview" 
                        className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-800"
                        onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&auto=format&fit=crop"; }}
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Website URL */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      URL WEBSITE / LIVE DEMO
                    </label>
                    <input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="https://client-demo.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm font-mono"
                    />
                  </div>

                  {/* Tags Input */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      TAGS KATALOG (PISAHKAN DENGAN KOMA)
                    </label>
                    <input
                      type="text"
                      name="tagsInput"
                      value={formData.tagsInput}
                      onChange={handleInputChange}
                      placeholder="Healthcare, Enterprise, Dashboard"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Status and Featured selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  {/* Status selection */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      STATUS PENERBITAN
                    </span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                        <input
                          type="radio"
                          name="status"
                          value="Published"
                          checked={formData.status === "Published"}
                          onChange={handleInputChange}
                          className="text-cyan-500 border-slate-800 bg-slate-900 cursor-pointer"
                        />
                        <span>PUBLISHED</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                        <input
                          type="radio"
                          name="status"
                          value="Draft"
                          checked={formData.status === "Draft"}
                          onChange={handleInputChange}
                          className="text-cyan-500 border-slate-800 bg-slate-900 cursor-pointer"
                        />
                        <span>DRAFT</span>
                      </label>
                    </div>
                  </div>

                  {/* Featured selection */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      TAMPILKAN DI FEATURED SECTION
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0 cursor-pointer"
                      />
                      <span>Tampilkan di halaman utama</span>
                    </label>
                  </div>
                </div>

                {/* Submit button */}
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
                    <span>Simpan Portofolio</span>
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
