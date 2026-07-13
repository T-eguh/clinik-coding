import React, { useState } from "react";
import { Lock, Mail, ChevronRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "../Logo";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
  onCancel: () => void;
}

export default function Login({ onLoginSuccess, onCancel }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gagal masuk ke sistem.");
      }

      if (data.token) {
        onLoginSuccess(data.token);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Email atau password yang dimasukkan salah.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (type: "super" | "editor" | "marketing") => {
    if (type === "super") {
      setEmail("admin@clinikcoding.com");
      setPassword("admin123");
    } else if (type === "editor") {
      setEmail("editor@clinikcoding.com");
      setPassword("editor123");
    } else {
      setEmail("marketing@clinikcoding.com");
      setPassword("marketing123");
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0F1626]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden text-left z-10">
      
      {/* Background radial highlight */}
      <div className="absolute -top-12 -left-12 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Logo */}
      <div className="text-center space-y-4 mb-8">
        <div className="flex justify-center">
          <Logo variant="full" size={56} animated={true} />
        </div>
        <h3 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight text-white pt-2">
          Selamat Datang Kembali
        </h3>
        <p className="text-xs text-slate-400 font-sans">
          Masuk untuk mengelola web, portofolio, database, & analitik.
        </p>
      </div>

      {errorMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 mb-6 text-xs text-red-300 bg-red-950/25 border border-red-900/40 rounded-xl"
        >
          {errorMsg}
        </motion.div>
      )}

      {/* Input Form */}
      <form onSubmit={handleLoginSubmit} className="space-y-5 font-sans">
        
        {/* Email */}
        <div>
          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            ALAMAT SUREL
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@perusahaan.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-100 placeholder-slate-600 focus:border-cyan-500/60 outline-none text-xs sm:text-sm transition-all focus:ring-1 focus:ring-cyan-500/10"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              KATA SANDI
            </label>
            <button 
              type="button"
              onClick={() => alert("Layanan reset kata sandi mandiri dinonaktifkan demi alasan keamanan. Harap hubungi Super Admin jaringan untuk memulihkan sandi.")}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Lupa Sandi?
            </button>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-100 placeholder-slate-600 focus:border-cyan-500/60 outline-none text-xs sm:text-sm transition-all focus:ring-1 focus:ring-cyan-500/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 text-xs text-slate-400 select-none cursor-pointer">
            Ingat login saya di browser ini
          </label>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Masuk Dashboard</span>
                <ChevronRight className="w-4 h-4 text-cyan-300" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3.5 rounded-xl bg-transparent border border-slate-800 hover:bg-slate-900/40 text-slate-400 hover:text-slate-200 font-bold text-xs sm:text-sm transition-all cursor-pointer text-center"
          >
            Kembali ke Portal Publik
          </button>
        </div>

      </form>

      {/* Quick Demo Accounts */}
      <div className="border-t border-slate-800/80 mt-8 pt-6 space-y-3">
        <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest text-center">
          AKUN DEMO CEPAT (ADMINISTRATOR)
        </span>
        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
          <button
            onClick={() => handleDemoLogin("super",)}
            className="p-2 text-center rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-bold"
          >
            Super Admin
          </button>
          <button
            onClick={() => handleDemoLogin("editor")}
            className="p-2 text-center rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-bold"
          >
            Editor
          </button>
          <button
            onClick={() => handleDemoLogin("marketing")}
            className="p-2 text-center rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-bold"
          >
            Marketing
          </button>
        </div>
      </div>

    </div>
  );
}
