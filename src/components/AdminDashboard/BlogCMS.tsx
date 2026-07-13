import React, { useState, useEffect } from "react";
import { 
  Plus, Edit, Trash, Search, Download, Trash2, CheckCircle2, X, Filter,
  ArrowUpDown, Eye, ExternalLink, Sparkles, BookOpen, Key, Calendar, User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboard } from "./index";

interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  status: string;
  date: string;
  tags: string[];
}

export default function BlogCMS() {
  const { showToast } = useDashboard();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal editor states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "CEO, Clinik Coding",
    category: "Technology",
    excerpt: "",
    content: "",
    image: "",
    status: "Published",
    date: new Date().toISOString().split("T")[0],
    tagsInput: ""
  });

  const [activeTab, setActiveTab] = useState<"write" | "preview" | "seo">("write");

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/articles");
      const data = await response.json();
      if (data.success) {
        const mapped = data.data.map((b: any) => ({
          id: b.id,
          title: b.title || "",
          slug: b.slug || "",
          author: b.author || "Teguh Ardiansyah",
          category: b.category || "Technology",
          excerpt: b.summary || b.excerpt || "",
          content: b.content || "",
          image: b.thumbnail || b.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
          readTime: b.readTime || "5 Min Read",
          status: b.status || "Published",
          date: b.publishDate || b.date || new Date().toISOString().split("T")[0],
          tags: b.tags || []
        }));
        setArticles(mapped);
      }
    } catch {
      showToast("Gagal menyinkronkan database artikel blog.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
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
      author: "CEO, Clinik Coding",
      category: "Technology",
      excerpt: "Penjelasan ringkas mengenai artikel...",
      content: "# Judul Utama\n\nTulis isi konten artikel di sini menggunakan Markdown...\n\n- Poin pertama\n- Poin kedua\n\n```js\nconsole.log('Clinik Coding Enterprise');\n```",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
      status: "Published",
      date: new Date().toISOString().split("T")[0],
      tagsInput: "Web Development, React"
    });
    setActiveTab("write");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Article) => {
    setEditId(item.id);
    setFormData({
      title: item.title,
      author: item.author,
      category: item.category,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      status: item.status,
      date: item.date,
      tagsInput: item.tags.join(", ")
    });
    setActiveTab("write");
    setIsModalOpen(true);
  };

  // Compute stats on fly
  const computeWordCount = (str: string) => str.trim().split(/\s+/).filter(Boolean).length;
  const computedReadingTime = (str: string) => {
    const words = computeWordCount(str);
    return `${Math.max(1, Math.round(words / 200))} min read`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.excerpt) {
      showToast("Harap isi semua kolom wajib (Judul, Excerpt, Konten).", "warning");
      return;
    }

    const readTime = computedReadingTime(formData.content);
    const slug = formData.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const payload = {
      title: formData.title,
      slug,
      author: formData.author,
      category: formData.category,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image,
      readTime,
      status: formData.status,
      date: formData.date,
      tags: formData.tagsInput.split(",").map(t => t.trim()).filter(Boolean)
    };

    try {
      const url = editId ? `/api/articles/${editId}` : "/api/articles";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const resData = await response.json();

      if (resData.success) {
        showToast(
          editId ? "Artikel berhasil diperbarui!" : "Artikel blog baru berhasil diterbitkan!",
          "success"
        );
        setIsModalOpen(false);
        fetchArticles();
      } else {
        showToast(resData.error || "Gagal menyimpan artikel.", "error");
      }
    } catch {
      showToast("Gagal berkomunikasi dengan server blog.", "error");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel blog ini?")) return;

    try {
      const response = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        showToast("Artikel berhasil terhapus.", "success");
        fetchArticles();
      } else {
        showToast(data.error || "Gagal menghapus artikel.", "error");
      }
    } catch {
      showToast("Terjadi gangguan jaringan saat menghapus artikel.", "error");
    }
  };

  const handleExportCSV = () => {
    if (articles.length === 0) {
      showToast("Tidak ada data artikel untuk diekspor.", "warning");
      return;
    }
    const headers = "ID,Title,Slug,Author,Category,Date,Status,ReadTime\n";
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers 
      + articles.map(item => 
          `"${item.id}","${item.title.replace(/"/g, '""')}","${item.slug}","${item.author}","${item.category}","${item.date}","${item.status}","${item.readTime}"`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clinik_coding_blog_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Berhasil mengekspor CSV data blog.", "success");
  };

  // Basic keyword analyzer for SEO suggestions
  const analyzeKeywords = () => {
    const text = (formData.title + " " + formData.excerpt + " " + formData.content).toLowerCase();
    const suggestions = [];

    // Check header keywords
    if (!formData.title.toLowerCase().includes("coding") && !formData.title.toLowerCase().includes("software")) {
      suggestions.push("Tambahkan kata kunci utama 'Coding' atau 'Software' pada judul.");
    }
    if (formData.excerpt.length < 50) {
      suggestions.push("Excerpt terlalu pendek. Tulis minimal 50-160 karakter untuk meta description ideal.");
    }
    if (formData.content.length < 500) {
      suggestions.push("Konten artikel relatif pendek. Tambahkan detail isi agar minimal mencapai 300 kata.");
    }
    
    const h1Count = (formData.content.match(/^# /gm) || []).length;
    if (h1Count > 1) {
      suggestions.push("Ditemukan lebih dari satu tag H1 (#). Gunakan H1 hanya untuk judul utama.");
    }

    return suggestions.length > 0 ? suggestions : ["SEO artikel Anda sudah optimal! Semua parameter utama terpenuhi."];
  };

  // Filter & Sort Logic
  const filteredArticles = articles
    .filter((item) => {
      const matchSearch = 
        (item.title || "").toLowerCase().includes((search || "").toLowerCase()) ||
        (item.author || "").toLowerCase().includes((search || "").toLowerCase()) ||
        (item.excerpt || "").toLowerCase().includes((search || "").toLowerCase());
      
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

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 text-left">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            BLOG & KONTEN MARKETING CMS
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>Blog Articles CMS</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Tulis, tinjau, optimalkan SEO, serta jadwalkan penerbitan artikel berkualitas software house.
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
            <span>Tulis Artikel Baru</span>
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
            placeholder="Cari artikel, penulis, kutipan..."
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
            <option value="Technology" className="bg-slate-950">Technology</option>
            <option value="Design" className="bg-slate-950">Design</option>
            <option value="Business" className="bg-slate-950">Business</option>
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

      {/* Articles Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {isLoading ? (
          <div className="col-span-full py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Memasang relasi database artikel blog...</span>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="col-span-full py-24 text-center text-xs text-slate-500 font-mono">
            Belum ada artikel blog terdaftar.
          </div>
        ) : (
          paginatedArticles.map((article) => (
            <div 
              key={article.id}
              className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-all flex flex-col h-full group"
            >
              {/* Cover Image */}
              <div className="h-44 overflow-hidden bg-slate-900 relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category badge & Status */}
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="px-2 py-1 rounded bg-slate-950/80 backdrop-blur-md text-[9px] font-mono font-bold text-cyan-400 border border-cyan-500/10 uppercase">
                    {article.category}
                  </span>
                  <span className={`px-2 py-1 rounded backdrop-blur-md text-[9px] font-mono font-bold border uppercase ${
                    article.status === "Published" 
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/10" 
                      : "bg-slate-950/85 text-slate-400 border-slate-800"
                  }`}>
                    {article.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h3 className="font-heading font-extrabold text-white text-sm sm:text-base tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-[10px] text-cyan-400">
                      {article.author.charAt(0)}
                    </div>
                    <span className="text-[10px] font-medium text-slate-300 truncate">
                      {article.author}
                    </span>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleOpenEditModal(article)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteItem(article.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/20 hover:bg-red-500/5 text-red-400 hover:text-red-300 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Trash className="w-3 h-3" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="p-4 border border-slate-800/80 rounded-2xl bg-[#070C15]/20 flex items-center justify-between font-sans text-xs">
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

      {/* Articles Rich Editor Modal Overlay */}
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
              className="relative w-full max-w-4xl bg-[#0E1726] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/55">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    {editId ? "Ubah Konten Artikel" : "Tulis Artikel Blog Baru"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub navbar editor tab */}
              <div className="border-b border-slate-850 bg-slate-950/30 px-6 flex justify-between items-center text-xs">
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer ${
                      activeTab === "write" ? "border-cyan-400 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Tulis Editor (Markdown)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer ${
                      activeTab === "preview" ? "border-cyan-400 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Pratinjau Artikel (Rich Preview)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("seo")}
                    className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer ${
                      activeTab === "seo" ? "border-cyan-400 text-white" : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    SEO Analyzer & Keywords
                  </button>
                </div>

                <div className="hidden sm:flex gap-4 font-mono text-[10px] text-slate-500">
                  <span>KATA: {computeWordCount(formData.content)}</span>
                  <span>ESTIMASI: {computedReadingTime(formData.content)}</span>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto max-h-[65vh] space-y-5 text-left text-xs">
                
                {activeTab === "write" && (
                  <div className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Title */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          JUDUL ARTIKEL <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          required
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="e.g. Tren Teknologi React 19 dalam Pembuatan Enterprise SaaS"
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                        />
                      </div>

                      {/* Author */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          PENULIS / AUTHOR <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="author"
                          required
                          value={formData.author}
                          onChange={handleInputChange}
                          placeholder="e.g. Creative Director Clinik Coding"
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Category select */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          KATEGORI ARTIKEL
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                        >
                          <option value="Technology" className="bg-slate-950">Technology</option>
                          <option value="Design" className="bg-slate-950">Design</option>
                          <option value="Business" className="bg-slate-950">Business</option>
                        </select>
                      </div>

                      {/* Date picker */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          TANGGAL PENERBITAN
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

                    {/* Excerpt */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        EXCERPT / RINGKASAN ARTIKEL (META DESCRIPTION) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="excerpt"
                        required
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        placeholder="e.g. Temukan mengapa React 19 menawarkan kapabilitas revolusioner..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                      />
                    </div>

                    {/* Content Markdown Area */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        ISI KONTEN ARTIKEL (MENDUKUNG FORMAT MARKDOWN) <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="content"
                        required
                        rows={10}
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Gunakan tanda # untuk Heading, - untuk List, dan format Markdown standar lainnya..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all resize-none focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm font-mono leading-relaxed"
                      />
                    </div>

                    {/* Cover image url */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        URL GAMBAR ARTIKEL
                      </label>
                      <div className="flex gap-4 items-center">
                        <input
                          type="text"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all text-xs sm:text-sm font-mono"
                        />
                        {formData.image && (
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-800"
                            onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&auto=format&fit=crop"; }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Tags input & Status selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                      
                      {/* Tags */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          TAGS ARTIKEL (PISAHKAN DENGAN KOMA)
                        </label>
                        <input
                          type="text"
                          name="tagsInput"
                          value={formData.tagsInput}
                          onChange={handleInputChange}
                          placeholder="React 19, Technology, SaaS"
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm font-mono"
                        />
                      </div>

                      {/* Status */}
                      <div className="space-y-1.5 self-center">
                        <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
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

                    </div>

                  </div>
                )}

                {/* Rich Preview Tab */}
                {activeTab === "preview" && (
                  <div className="space-y-6">
                    {/* Fake blog view box */}
                    <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-850 space-y-6 max-w-2xl mx-auto">
                      <div className="space-y-2">
                        <span className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-800/30 text-[10px] font-mono font-bold text-cyan-400 uppercase">
                          {formData.category}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight leading-tight">
                          {formData.title || "Judul Artikel Blog Anda"}
                        </h1>
                        <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500">
                          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {formData.author}</span>
                          <span>•</span>
                          <span>{formData.date}</span>
                          <span>•</span>
                          <span>{computedReadingTime(formData.content)}</span>
                        </div>
                      </div>

                      {formData.image && (
                        <div className="h-64 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                          <img 
                            src={formData.image} 
                            alt="Cover Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="prose prose-invert prose-xs text-slate-300 leading-relaxed font-sans space-y-4 max-w-none pt-4 border-t border-slate-900">
                        <p className="italic text-slate-400 text-xs border-l-2 border-cyan-400 pl-3 mb-6 bg-slate-900/30 py-2 rounded-r-lg">
                          {formData.excerpt || "Kutipan / Excerpt deskripsi meta..."}
                        </p>
                        
                        {/* Render simple simulation of Markdown content */}
                        <div className="space-y-4 whitespace-pre-wrap text-slate-300">
                          {formData.content.split("\n\n").map((block, idx) => {
                            if (block.startsWith("# ")) {
                              return <h2 key={idx} className="text-lg font-heading font-extrabold text-white mt-6 mb-2">{block.replace("# ", "")}</h2>;
                            }
                            if (block.startsWith("## ")) {
                              return <h3 key={idx} className="text-base font-heading font-extrabold text-white mt-4 mb-2">{block.replace("## ", "")}</h3>;
                            }
                            if (block.startsWith("- ")) {
                              return (
                                <ul key={idx} className="list-disc pl-5 space-y-1">
                                  {block.split("\n").map((line, lidx) => (
                                    <li key={lidx}>{line.replace("- ", "")}</li>
                                  ))}
                                </ul>
                              );
                            }
                            if (block.startsWith("```")) {
                              const codeLines = block.split("\n").filter(l => !l.startsWith("```"));
                              return (
                                <pre key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                                  <code>{codeLines.join("\n")}</code>
                                </pre>
                              );
                            }
                            return <p key={idx} className="leading-relaxed">{block}</p>;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SEO Analyzer Tab */}
                {activeTab === "seo" && (
                  <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-850 space-y-4">
                      <h3 className="text-sm font-heading font-extrabold text-white flex items-center gap-2">
                        <Key className="w-4 h-4 text-cyan-400" />
                        <span>Keterbacaan & Keyword SEO Optimization</span>
                      </h3>
                      
                      <div className="space-y-3">
                        {analyzeKeywords().map((suggestion, idx) => (
                          <div 
                            key={idx}
                            className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                              suggestion.includes("optimal")
                                ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                                : "bg-amber-950/20 border-amber-500/20 text-amber-300"
                            }`}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 animate-ping" />
                            <p className="leading-relaxed font-sans text-xs">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-400 bg-slate-900/30 p-4 rounded-xl border border-slate-850">
                      <div>
                        <span className="block text-slate-500 uppercase font-bold">Panjang Judul</span>
                        <span className="block text-xs font-bold text-white mt-1">{formData.title.length} karakter</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 uppercase font-bold">Panjang Excerpt</span>
                        <span className="block text-xs font-bold text-white mt-1">{formData.excerpt.length} karakter</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 font-sans text-xs bg-[#0E1726]">
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
                    <span>Terbitkan Artikel</span>
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
