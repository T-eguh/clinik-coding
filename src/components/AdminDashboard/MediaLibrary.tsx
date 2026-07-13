import React, { useState, useEffect } from "react";
import { 
  Plus, Trash, Search, Download, Trash2, X, Upload, Copy, Check, Grid, List, 
  File, FileImage, FileText, FileCode, Archive, Sparkles, FolderOpen, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboard } from "./index";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export default function MediaLibrary() {
  const { showToast } = useDashboard();
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterType, setFilterType] = useState("All");

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    name: "",
    url: "",
    type: "image/jpeg"
  });

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/media");
      const data = await response.json();
      if (data.success) {
        setMedia(data.data);
      }
    } catch {
      showToast("Gagal memuat Media Library dari server.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast("Tautan media berhasil disalin ke clipboard!", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus aset media ini?")) return;

    try {
      const response = await fetch(`/api/media/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        showToast("Aset media berhasil dihapus permanen.", "success");
        fetchMedia();
      } else {
        showToast(data.error || "Gagal menghapus media.", "error");
      }
    } catch {
      showToast("Kesalahan jaringan saat menghapus media.", "error");
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.name || !uploadData.url) {
      showToast("Nama aset dan URL file wajib diisi.", "warning");
      return;
    }

    const payload = {
      name: uploadData.name,
      url: uploadData.url,
      size: `${(Math.random() * 2 + 0.1).toFixed(1)} MB`,
      type: uploadData.type
    };

    try {
      const response = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        showToast("Aset media baru berhasil diunggah!", "success");
        setIsUploadOpen(false);
        fetchMedia();
      } else {
        showToast(data.error || "Gagal mengunggah media.", "error");
      }
    } catch {
      showToast("Gangguan jaringan saat memproses unggah.", "error");
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <FileImage className="w-5 h-5 text-cyan-400" />;
    if (type.startsWith("text/") || type.includes("pdf")) return <FileText className="w-5 h-5 text-blue-400" />;
    if (type.includes("javascript") || type.includes("typescript") || type.includes("css") || type.includes("json")) return <FileCode className="w-5 h-5 text-indigo-400" />;
    if (type.includes("zip") || type.includes("tar") || type.includes("rar")) return <Archive className="w-5 h-5 text-amber-400" />;
    return <File className="w-5 h-5 text-slate-400" />;
  };

  // Filter & Search Logic
  const filteredMedia = media.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || 
      (filterType === "Images" && item.type.startsWith("image/")) ||
      (filterType === "Archives" && (item.type.includes("zip") || item.type.includes("tar"))) ||
      (filterType === "Other" && !item.type.startsWith("image/") && !item.type.includes("zip") && !item.type.includes("tar"));

    return matchSearch && matchType;
  });

  // Calculate stats
  const totalStorageUsed = (filteredMedia.reduce((acc, m) => acc + parseFloat(m.size), 0)).toFixed(1);

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            ASSET & CONTENT MANAGEMENT
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>Media Library</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Gudang unggahan logo klien, gambar portofolio, ilustrasi artikel, sitemap, srt, dan berkas arsip .zip proyek.
          </p>
        </div>

        <div className="flex gap-2 font-sans text-xs font-semibold">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all cursor-pointer flex items-center gap-2 font-bold"
          >
            <Upload className="w-4 h-4" />
            <span>Unggah Aset Berkas</span>
          </button>
        </div>
      </div>

      {/* Storage & View Layout bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-5 font-sans text-xs">
        
        {/* Search */}
        <div className="relative md:col-span-4 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari nama aset media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all text-xs"
          />
        </div>

        {/* Filters */}
        <div className="md:col-span-5 flex flex-wrap gap-2.5">
          {["All", "Images", "Archives", "Other"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-semibold ${
                filterType === t 
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300" 
                  : "border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* View Mode & Storage Stats */}
        <div className="md:col-span-3 flex justify-between md:justify-end items-center gap-6 w-full">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${viewMode === "grid" ? "bg-slate-800 border-slate-700 text-cyan-400" : "border-transparent text-slate-500 hover:text-white"}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${viewMode === "list" ? "bg-slate-800 border-slate-700 text-cyan-400" : "border-transparent text-slate-500 hover:text-white"}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right font-mono text-[10px]">
            <span className="block text-slate-500 uppercase font-bold">Storage Terpakai</span>
            <span className="block font-bold text-white mt-0.5">{totalStorageUsed} MB / 50.0 MB</span>
          </div>

        </div>

      </div>

      {/* Grid view of Media Library */}
      {isLoading ? (
        <div className="py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
          <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span>Memasang relasi penyimpanan aset media...</span>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="py-24 text-center text-xs text-slate-500 font-mono border border-slate-800/80 rounded-2xl bg-[#0F1626]/20">
          Belum ada berkas aset dalam library ini.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 font-sans">
          {filteredMedia.map((file) => {
            const isImage = file.type.startsWith("image/");
            return (
              <div 
                key={file.id}
                className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden group flex flex-col hover:border-cyan-500/20 transition-all text-xs"
              >
                {/* Media stage */}
                <div className="h-32 bg-slate-900/60 flex items-center justify-center overflow-hidden relative">
                  {isImage ? (
                    <img 
                      src={file.url} 
                      alt={file.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="p-4 rounded-full bg-slate-950 border border-slate-850">
                      {getFileIcon(file.type)}
                    </div>
                  )}

                  {/* Copy link overlay button */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopyLink(file.url, file.id)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                      title="Salin Tautan"
                    >
                      {copiedId === file.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(file.id)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-red-500/10 hover:text-red-300 text-red-400 transition-colors cursor-pointer"
                      title="Hapus Aset"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Media label */}
                <div className="p-3.5 space-y-1">
                  <span className="block font-bold text-white truncate text-[11px]" title={file.name}>
                    {file.name}
                  </span>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>{file.size}</span>
                    <span>{file.uploadedAt}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List view table of Media */
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden font-sans text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-[#070C15]/40 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                  <th className="py-4 pl-6">Jenis</th>
                  <th className="py-4">Nama File</th>
                  <th className="py-4">URL Tautan Aset</th>
                  <th className="py-4">Ukuran</th>
                  <th className="py-4">Tanggal Diunggah</th>
                  <th className="py-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredMedia.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-900/25">
                    <td className="py-3 pl-6">{getFileIcon(file.type)}</td>
                    <td className="py-3 font-bold text-white">{file.name}</td>
                    <td className="py-3 font-mono text-cyan-300 select-all max-w-[200px] truncate">{file.url}</td>
                    <td className="py-3 text-slate-400 font-mono">{file.size}</td>
                    <td className="py-3 text-slate-500 font-mono">{file.uploadedAt}</td>
                    <td className="py-3 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleCopyLink(file.url, file.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-850 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                          title="Salin Link"
                        >
                          {copiedId === file.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleDeleteItem(file.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-850 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload ModalOverlay */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#0E1726] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/55">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    Unggah Media Baru
                  </h3>
                </div>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="p-6 space-y-5 text-left text-xs">
                
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    NAMA ASET BERKAS <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadData.name}
                    onChange={(e) => setUploadData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Logo Clinik Coding HD"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    TIPE BERKAS
                  </label>
                  <select
                    value={uploadData.type}
                    onChange={(e) => setUploadData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm"
                  >
                    <option value="image/jpeg" className="bg-slate-950">JPEG Image (.jpg)</option>
                    <option value="image/png" className="bg-slate-950">PNG Image (.png)</option>
                    <option value="application/zip" className="bg-slate-950">ZIP Archive (.zip)</option>
                    <option value="application/pdf" className="bg-slate-950">PDF Document (.pdf)</option>
                    <option value="application/json" className="bg-slate-950">JSON Document (.json)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    URL FILE SASARAN <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadData.url}
                    onChange={(e) => setUploadData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all focus:ring-1 focus:ring-cyan-500/10 text-xs sm:text-sm font-mono"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 font-sans text-xs">
                  <button
                    type="button"
                    onClick={() => setIsUploadOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-transparent border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-all cursor-pointer font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all font-bold cursor-pointer flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Konfirmasi Unggah</span>
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
