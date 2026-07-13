import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  theme: string;
  onThemeToggle: () => void;
}

export default function Navbar({ onNavClick, activeSection, theme, onThemeToggle }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Layanan", id: "services" },
    { label: "Keunggulan", id: "why-choose-us" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Tech Stack", id: "tech" },
    { label: "Proses Kerja", id: "process" },
    { label: "AI Estimator", id: "estimator" },
    { label: "Ulasan", id: "testimonials" },
    { label: "FAQ", id: "faq" }
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          theme === "dark"
            ? "dark-glass-effect border-b border-white/5"
            : "glass-effect border-b border-slate-200/50"
        } ${isScrolled ? "shadow-md py-3" : "py-4"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo with 3-degree rotate micro-interaction */}
          <button
            id="nav-logo"
            onClick={() => handleLinkClick("hero")}
            className="cursor-pointer group flex items-center"
            aria-label="Clinik Coding Home"
          >
            <Logo variant="horizontal" size={38} animated={true} />
          </button>

          {/* Desktop Links with active slide animation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  activeSection === link.id
                    ? "text-brand-primary dark:text-cyan-400 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
                aria-label={`Go to ${link.label}`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary dark:bg-cyan-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Right CTA + Theme Toggle Button */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Visual Tactile Theme Switcher */}
            <motion.button
              onClick={onThemeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-yellow-400 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shadow-sm"
              aria-label="Toggle Theme Dark/Light"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
            </motion.button>

            {/* Glowing CTA Button */}
            <motion.button
              id="cta-consult-nav"
              onClick={() => handleLinkClick("contact")}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px 3px rgba(37, 99, 235, 0.4)"
              }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-xl bg-brand-primary text-white font-medium text-sm hover:bg-blue-700 active:scale-98 transition-all flex items-center gap-2 shadow-md shadow-brand-primary/10 cursor-pointer"
              aria-label="Konsultasi Gratis Sekarang"
            >
              <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
              <span>Konsultasi Gratis</span>
            </motion.button>
          </div>

          {/* Mobile Menu Trigger & Toggler Row */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-yellow-400 border border-slate-200 dark:border-slate-800 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-lg py-6 px-6 flex flex-col gap-4 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left py-3 px-4 rounded-xl text-base font-semibold transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? "bg-blue-50 dark:bg-slate-900 text-brand-primary dark:text-cyan-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
            
            <button
              onClick={() => handleLinkClick("contact")}
              className="w-full py-3.5 rounded-xl bg-brand-primary text-white font-bold text-center hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-brand-primary/10"
            >
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span>Konsultasi Gratis</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
