import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, ShieldCheck, LogOut, Search, Menu, ChevronLeft, ChevronRight, 
  Layout, FolderKanban, Cpu, Award, Users, BookOpen, Image, Mail, HelpCircle, 
  TrendingUp, Settings, Database, ListCollapse, Sliders, Bell, Sparkles, AlertTriangle, Clock
} from "lucide-react";
import { Logo } from "../Logo";
import { AdminUser, ActiveMenu } from "./types";
import Login from "./Login";
import DashboardHome from "./DashboardHome";
import Analytics from "./Analytics";
import PortfolioCMS from "./PortfolioCMS";
import BlogCMS from "./BlogCMS";
import MediaLibrary from "./MediaLibrary";
import ServicesCMS from "./ServicesCMS";
import TestimonialsCMS from "./TestimonialsCMS";
import ClientsCMS from "./ClientsCMS";
import InboxCMS from "./InboxCMS";
import ConsultationsCMS from "./ConsultationsCMS";
import NewsletterCMS from "./NewsletterCMS";
import UserManagement from "./UserManagement";
import SEOManager from "./SEOManager";
import SettingsCMS from "./SettingsCMS";
import BackupRestore from "./BackupRestore";
import LogsView from "./LogsView";

// Global Toast Context for Notifications
export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface DashboardContextType {
  user: AdminUser | null;
  token: string | null;
  logout: () => void;
  showToast: (message: string, type?: "success" | "error" | "warning" | "info") => void;
  refreshDataTrigger: number;
  triggerRefresh: () => void;
  activeMenu: ActiveMenu;
  setActiveMenu: (menu: ActiveMenu) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
}

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export default function AdminDashboard({ onBackToHome }: AdminDashboardProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(0);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Show Toast
  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const triggerRefresh = () => setRefreshDataTrigger(prev => prev + 1);

  // Parse JWT token from storage on mount or token changes
  useEffect(() => {
    if (token) {
      try {
        const payloadBase64 = token.split(".")[1];
        const payload = JSON.parse(atob(payloadBase64));
        // Check token expiry
        if (payload.exp < Math.floor(Date.now() / 1000)) {
          showToast("Sesi login Anda telah berakhir.", "warning");
          logout();
        } else {
          setUser({
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            permissions: payload.permissions || []
          });
          localStorage.setItem("admin_token", token);
        }
      } catch (err) {
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  // Session Timeout Handler (10 Minutes idle auto logout)
  useEffect(() => {
    if (!token) return;

    const handleUserActivity = () => setLastActivity(Date.now());
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActivity;
      if (idleTime > 10 * 60 * 1000) { // 10 minutes
        showToast("Sesi keluar otomatis karena tidak ada aktivitas.", "warning");
        logout();
      }
    }, 30000); // Check every 30s

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      clearInterval(interval);
    };
  }, [token, lastActivity]);

  // Token Auto-Refresh every 15 minutes
  useEffect(() => {
    if (!token) return;

    const refreshInterval = setInterval(async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        });
        const data = await response.json();
        if (data.success && data.token) {
          setToken(data.token);
          console.log("Session token auto-refreshed successfully.");
        }
      } catch (err) {
        console.error("Auto refresh token failed:", err);
      }
    }, 15 * 60 * 1000); // 15 mins

    return () => clearInterval(refreshInterval);
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("admin_token");
    showToast("Anda telah keluar dari dashboard.", "info");
  };

  // Nav Menu definition with translations and roles constraints
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Layout, category: "Core" },
    { id: "analytics", label: "Web Analytics", icon: TrendingUp, category: "Core" },
    { id: "portfolio", label: "Portfolio CMS", icon: FolderKanban, category: "Content CMS" },
    { id: "blog", label: "Blog CMS", icon: BookOpen, category: "Content CMS" },
    { id: "services", label: "Services CMS", icon: Cpu, category: "Content CMS" },
    { id: "testimonials", label: "Testimonials", icon: Award, category: "Content CMS" },
    { id: "clients", label: "Client Logos", icon: FolderKanban, category: "Content CMS" },
    { id: "media", label: "Media Library", icon: Image, category: "Content CMS" },
    { id: "contact-messages", label: "Inbox Messages", icon: Mail, category: "Interactions" },
    { id: "consultations", label: "Consultation Request", icon: Clock, category: "Interactions" },
    { id: "newsletter", label: "Newsletter List", icon: ListCollapse, category: "Interactions" },
    { id: "users", label: "User Management", icon: Users, category: "Security & Ops" },
    { id: "seo", label: "SEO Manager", icon: Sliders, category: "Security & Ops" },
    { id: "settings", label: "Website Settings", icon: Settings, category: "Security & Ops" },
    { id: "backup", label: "System Backup", icon: Database, category: "Security & Ops" },
    { id: "logs", label: "Activity Logs", icon: Terminal, category: "Security & Ops" },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(menuSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  // View Router
  const renderActiveView = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardHome />;
      case "analytics":
        return <Analytics />;
      case "portfolio":
        return <PortfolioCMS />;
      case "blog":
        return <BlogCMS />;
      case "services":
        return <ServicesCMS />;
      case "testimonials":
        return <TestimonialsCMS />;
      case "clients":
        return <ClientsCMS />;
      case "media":
        return <MediaLibrary />;
      case "contact-messages":
        return <InboxCMS />;
      case "consultations":
        return <ConsultationsCMS />;
      case "newsletter":
        return <NewsletterCMS />;
      case "users":
        return <UserManagement />;
      case "seo":
        return <SEOManager />;
      case "settings":
        return <SettingsCMS />;
      case "backup":
        return <BackupRestore />;
      case "logs":
        return <LogsView />;
      default:
        return <DashboardHome />;
    }
  };

  if (!token || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative p-4 text-left">
        <Login onLoginSuccess={(tok) => setToken(tok)} onCancel={onBackToHome} />
        
        {/* Simple Toast Container for Login Screen */}
        <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-2.5 max-w-sm pointer-events-none">
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-4 rounded-xl border shadow-xl flex items-start gap-3 pointer-events-auto bg-slate-900 ${
                toast.type === "success" ? "border-emerald-500/30 text-emerald-300" :
                toast.type === "error" ? "border-red-500/30 text-red-300" :
                toast.type === "warning" ? "border-amber-500/30 text-amber-300" :
                "border-sky-500/30 text-sky-300"
              }`}
            >
              <div className="mt-0.5">
                {toast.type === "success" && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                {toast.type === "error" && <AlertTriangle className="w-4 h-4 text-red-400" />}
                {toast.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                {toast.type === "info" && <Sparkles className="w-4 h-4 text-sky-400" />}
              </div>
              <p className="text-xs font-medium leading-relaxed">{toast.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <DashboardContext.Provider value={{ user, token, logout, showToast, refreshDataTrigger, triggerRefresh, activeMenu, setActiveMenu }}>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased text-left selection:bg-cyan-500/15 selection:text-cyan-400">
        
        {/* SIDEBAR NAVIGATION */}
        <aside 
          className={`shrink-0 border-r border-slate-800 bg-[#070C15] flex flex-col transition-all duration-300 relative z-30 ${
            sidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          {/* Sidebar Top Logo */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              {sidebarCollapsed ? (
                <Logo variant="icon" size={36} animated={false} />
              ) : (
                <div className="flex items-center gap-2.5">
                  <Logo variant="icon" size={34} animated={false} />
                  <div className="transition-opacity duration-200">
                    <span className="font-heading font-extrabold text-sm tracking-tight text-white block leading-none">
                      CLINIK <span className="text-cyan-400">CODING</span>
                    </span>
                    <span className="text-[8px] text-cyan-400 font-mono tracking-wider font-semibold">
                      ENTERPRISE CMS
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Collapse toggle */}
            {!sidebarCollapsed && (
              <button 
                onClick={() => setSidebarCollapsed(true)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sidebar Search Menu */}
          {!sidebarCollapsed && (
            <div className="px-4 py-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cari Menu..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-all font-sans"
                />
              </div>
            </div>
          )}

          {/* Sidebar Menu Scroll Area */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
            {categories.map((cat) => {
              const itemsInCat = filteredMenuItems.filter(item => item.category === cat);
              if (itemsInCat.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  {!sidebarCollapsed && (
                    <h5 className="px-3 text-[9px] font-mono font-bold uppercase tracking-widest text-slate-600 mb-1.5">
                      {cat}
                    </h5>
                  )}
                  
                  {itemsInCat.map((item) => {
                    const isActive = activeMenu === item.id;
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveMenu(item.id as ActiveMenu)}
                        title={sidebarCollapsed ? item.label : undefined}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer group ${
                          isActive 
                            ? "bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-cyan-500/30 text-white" 
                            : "border border-transparent text-slate-400 hover:text-white hover:bg-slate-900"
                        }`}
                      >
                        <IconComp className={`w-4 h-4 transition-colors shrink-0 ${
                          isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                        }`} />
                        {!sidebarCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Sidebar Bottom User Profile & Logout */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/60">
            {sidebarCollapsed ? (
              <div className="flex flex-col items-center gap-4">
                <button 
                  onClick={() => setSidebarCollapsed(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs text-cyan-400">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block font-bold text-xs text-white truncate leading-none mb-1">
                      {user.name}
                    </span>
                    <span className="block font-mono text-[9px] text-slate-400 truncate">
                      {user.role}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={onBackToHome}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-[10px] font-semibold transition-all cursor-pointer text-center"
                  >
                    Portal Utama
                  </button>
                  <button
                    onClick={logout}
                    className="px-2.5 py-1.5 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all cursor-pointer flex items-center justify-center"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN BODY WRAPPER */}
        <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-[#0A0F1D]">
          
          {/* Main Top Header Navbar */}
          <header className="h-16 border-b border-slate-800 bg-[#070C15]/75 backdrop-blur-md px-6 flex items-center justify-between shrink-0 relative z-20">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <span className="text-slate-500">Workspace</span>
                <span className="text-slate-700">/</span>
                <span className="text-white capitalize">{activeMenu.replace("-", " ")}</span>
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* User role badge status */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/30 text-cyan-300 font-mono text-[10px] font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ROLE: {(user.role || "").toUpperCase()}</span>
              </div>
              
              {/* Portal Info Notification Indicator */}
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative cursor-default">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>
          </header>

          {/* MAIN CMS APP VIEW STAGE */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {renderActiveView()}
            </motion.div>
          </main>

        </div>

        {/* Global Toast Container inside dashboard */}
        <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-2.5 max-w-sm pointer-events-none">
          <AnimatePresence>
            {toasts.map(toast => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-xl border shadow-xl flex items-start gap-3 pointer-events-auto bg-[#0E1726] ${
                  toast.type === "success" ? "border-emerald-500/30 text-emerald-300" :
                  toast.type === "error" ? "border-red-500/30 text-red-300" :
                  toast.type === "warning" ? "border-amber-500/30 text-amber-300" :
                  "border-sky-500/30 text-sky-300"
                }`}
              >
                <div className="mt-0.5">
                  {toast.type === "success" && <ShieldCheck className="w-4 h-4 text-emerald-400 animate-bounce" />}
                  {toast.type === "error" && <AlertTriangle className="w-4 h-4 text-red-400" />}
                  {toast.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  {toast.type === "info" && <Sparkles className="w-4 h-4 text-sky-400" />}
                </div>
                <p className="text-xs font-medium leading-relaxed">{toast.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </DashboardContext.Provider>
  );
}
