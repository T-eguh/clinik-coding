import React, { useState, useEffect } from "react";
import { 
  Users, Plus, Edit, Trash, CheckCircle2, X, Sparkles, Shield, UserX, UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboard } from "./index";

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  permissions: string[];
}

export default function UserManagement() {
  const { showToast, user } = useDashboard();
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin",
    status: "Active"
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      if (data.success) {
        setStaff(data.data);
      }
    } catch {
      showToast("Gagal memuat daftar administrator.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAddModal = () => {
    if (user?.role !== "Super Admin") {
      showToast("Hanya tingkatan Super Admin yang memiliki hak mengelola kredensial.", "warning");
      return;
    }
    setEditId(null);
    setFormData({
      name: "",
      email: "",
      role: "Editor",
      status: "Active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: StaffUser) => {
    if (user?.role !== "Super Admin") {
      showToast("Hanya tingkatan Super Admin yang memiliki hak mengelola kredensial.", "warning");
      return;
    }
    setEditId(item.id);
    setFormData({
      name: item.name,
      email: item.email,
      role: item.role,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast("Nama lengkap dan email administrator wajib diisi.", "warning");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      permissions: formData.role === "Super Admin" 
        ? ["all_access"] 
        : formData.role === "Editor" 
        ? ["write_blog", "edit_blog", "view_portfolio"] 
        : ["view_analytics", "view_newsletter"]
    };

    try {
      const url = editId ? `/api/users/${editId}` : "/api/users";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        showToast(
          editId ? "Kredensial staf berhasil diperbarui!" : "Staf administrator baru berhasil ditambahkan!",
          "success"
        );
        setIsModalOpen(false);
        fetchUsers();
      } else {
        showToast(data.error || "Gagal menyimpan administrator.", "error");
      }
    } catch {
      showToast("Gagal berkomunikasi dengan server keamanan.", "error");
    }
  };

  const handleToggleStatus = async (item: StaffUser) => {
    if (user?.role !== "Super Admin") {
      showToast("Hanya tingkatan Super Admin yang memiliki hak mengelola kredensial.", "warning");
      return;
    }
    if (item.role === "Super Admin") {
      showToast("Status Super Admin utama tidak dapat dinonaktifkan.", "error");
      return;
    }

    const newStatus = item.status === "Active" ? "Suspended" : "Active";
    try {
      const response = await fetch(`/api/users/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        showToast(`Status user berhasil diubah menjadi: ${newStatus}`, "success");
        fetchUsers();
      }
    } catch {
      showToast("Gagal mengubah status status staf.", "error");
    }
  };

  return (
    <div className="space-y-6 text-left font-sans text-xs">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            STAFF SECURITY & USER CREDENTIALS CMS
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
            <span>User Management</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Kelola izin login staf software house Clinik Coding, set tingkat hak akses (Super Admin, Editor, Marketing), serta blokir akun mencurigakan.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all cursor-pointer flex items-center gap-2 font-bold font-sans text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Admin Baru</span>
        </button>
      </div>

      {/* Warning banner if not Super Admin */}
      {user?.role !== "Super Admin" && (
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/25 text-amber-300 font-sans">
          <strong>Perhatian:</strong> Peran Anda adalah <strong>{user?.role}</strong>. Anda hanya diizinkan untuk melihat konfigurasi staf. Modifikasi data, pembuatan administrator baru, serta penangguhan status akun hanya dapat divalidasi oleh <strong>Super Admin</strong>.
        </div>
      )}

      {/* Staff list view */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl overflow-hidden font-sans">
        {isLoading ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span>Memasang modul otentikasi...</span>
          </div>
        ) : staff.length === 0 ? (
          <div className="py-24 text-center text-xs text-slate-500 font-mono">
            Tidak ditemukan admin terdaftar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-[#070C15]/40 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                  <th className="py-4 pl-6">Nama Administrator</th>
                  <th className="py-4">Alamat Surel (Email)</th>
                  <th className="py-4">Hak Akses (Role)</th>
                  <th className="py-4">Hak Izin Otoritas</th>
                  <th className="py-4">Status Akun</th>
                  <th className="py-4 pr-6 text-right">Kelola</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {staff.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/25">
                    
                    <td className="py-4 pl-6 font-bold text-white flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-cyan-400 font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <span>{item.name}</span>
                    </td>

                    <td className="py-4 font-mono text-cyan-300">{item.email}</td>

                    <td className="py-4 font-semibold text-slate-300 flex items-center gap-1.5 mt-4">
                      <Shield className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.role}</span>
                    </td>

                    <td className="py-4 max-w-[200px]">
                      <div className="flex flex-wrap gap-1">
                        {item.permissions.map((p, idx) => (
                          <span 
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-850 text-[9px] font-mono text-slate-500"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border uppercase ${
                        item.status === "Active" 
                          ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/10" 
                          : "bg-red-950/40 text-red-300 border-red-500/10"
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 pr-6 text-right">
                      {user?.role === "Super Admin" && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(item)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              item.status === "Active" 
                                ? "bg-red-500/5 border-red-500/10 text-red-400 hover:bg-red-500/10" 
                                : "bg-emerald-500/5 border-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10"
                            }`}
                            title={item.status === "Active" ? "Suspended Akun" : "Aktifkan Akun"}
                          >
                            {item.status === "Active" ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                    <Shield className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    {editId ? "Ubah Hak Akses Admin" : "Tambah Admin Baru"}
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
                    NAMA LENGKAP ADMINISTRATOR <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Tony Stark"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    ALAMAT SUREL LOGIN <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tony@clinikcoding.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 outline-none transition-all text-xs sm:text-sm font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Role select */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      TINGKATAN PERAN (ROLE)
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all text-xs sm:text-sm font-sans"
                    >
                      <option value="Super Admin" className="bg-slate-950">Super Admin</option>
                      <option value="Editor" className="bg-slate-950">Editor</option>
                      <option value="Marketing" className="bg-slate-950">Marketing</option>
                    </select>
                  </div>

                  {/* Status select */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      STATUS VALIDASI LOGIN
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all text-xs sm:text-sm font-sans"
                    >
                      <option value="Active" className="bg-slate-950">Active / Diizinkan</option>
                      <option value="Suspended" className="bg-slate-950">Suspended / Diblokir</option>
                    </select>
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
                    <span>Simpan Kredensial</span>
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
