import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Portfolio from "./components/Portfolio";
import CaseStudiesSection from "./components/CaseStudiesSection";
import TechStack from "./components/TechStack";
import DevelopmentProcess from "./components/DevelopmentProcess";
import PricingPreview from "./components/PricingPreview";
import Estimator from "./components/Estimator";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/FAQSection";
import ArticlesSection from "./components/ArticlesSection";
import CtaConsultation from "./components/CtaConsultation";
import InquiryForm from "./components/InquiryForm";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import AdminDashboard from "./components/AdminDashboard";

// Motion System Additions
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import BackToTop from "./components/BackToTop";
import Page404 from "./components/Page404";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [currentVirtualRoute, setCurrentVirtualRoute] = useState("home");

  // Global Theme State (Dark Mode)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Scroll Progress calculations (Framer motion native spring)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track virtual hash for testing 404 screen and virtual routes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#404") {
        setCurrentVirtualRoute("404");
      } else if (hash === "#admin") {
        setCurrentVirtualRoute("admin");
      } else if ([
        "#services",
        "#why-choose-us",
        "#portfolio",
        "#tech",
        "#process",
        "#estimator",
        "#testimonials",
        "#faq",
        "#contact"
      ].includes(hash)) {
        const route = hash.substring(1);
        setCurrentVirtualRoute(route);
        setActiveSection(route);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCurrentVirtualRoute("home");
        setActiveSection("hero");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Sync Dark Theme class to HTML Root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Smooth scroll or virtual route navigation handler
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === "hero" || sectionId === "home") {
      window.location.hash = "#home";
    } else {
      window.location.hash = "#" + sectionId;
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Section observer to update navigation indicators dynamically during scrolling (only on home)
  useEffect(() => {
    if (isAppLoading || currentVirtualRoute !== "home") return;

    const sections = [
      "hero",
      "about",
      "services",
      "why-choose-us",
      "portfolio",
      "case-studies",
      "tech",
      "process",
      "pricing",
      "estimator",
      "testimonials",
      "faq",
      "articles",
      "cta-consultation",
      "contact"
    ];

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px", // Sweet spot targeting
      threshold: 0
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [isAppLoading, currentVirtualRoute]);

  // Handle exiting 404 virtual screen
  const handleExit404 = () => {
    window.location.hash = "#hero";
    setCurrentVirtualRoute("home");
  };

  // Render standalone subpage layout
  const renderVirtualPage = () => {
    const routeTitles: Record<string, string> = {
      "services": "Layanan Koding",
      "why-choose-us": "Keunggulan Kami",
      "portfolio": "Portofolio Proyek",
      "tech": "Teknologi & Fitur",
      "process": "Proses & Alur Kerja",
      "estimator": "AI Cost & Estimator",
      "testimonials": "Ulasan & Testimoni Klien",
      "faq": "Tanya Jawab (FAQ)",
      "contact": "Hubungi Clinik Coding"
    };

    const currentTitle = routeTitles[currentVirtualRoute] || "Halaman Fitur";

    return (
      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen text-left">
        {/* Breadcrumbs & Title Bar */}
        <div className="max-w-7xl mx-auto px-6 mb-12 border-b border-slate-200/50 dark:border-slate-800/50 pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                <span className="cursor-pointer hover:text-brand-primary transition-colors" onClick={() => handleScrollToSection("hero")}>Beranda</span>
                <span>/</span>
                <span className="text-brand-primary dark:text-cyan-400 font-bold capitalize">{currentVirtualRoute.replace(/-/g, " ")}</span>
              </div>
              <h1 className="text-3xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
                {currentTitle}
              </h1>
            </div>
            <button 
              onClick={() => handleScrollToSection("hero")}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-primary dark:hover:text-cyan-400 transition-all cursor-pointer shadow-sm hover:shadow flex items-center gap-2 text-slate-700 dark:text-slate-300"
            >
              ← Kembali ke Beranda
            </button>
          </div>
        </div>

        {/* Dynamic page component selection */}
        <div>
          {currentVirtualRoute === "services" && <Services />}
          {currentVirtualRoute === "why-choose-us" && <WhyChooseUs />}
          {currentVirtualRoute === "portfolio" && (
            <>
              <Portfolio />
              <CaseStudiesSection />
            </>
          )}
          {currentVirtualRoute === "tech" && <TechStack />}
          {currentVirtualRoute === "process" && <DevelopmentProcess />}
          {currentVirtualRoute === "estimator" && (
            <>
              <Estimator />
              <div className="mt-8 border-t border-slate-200/40 dark:border-slate-800/40 pt-8">
                <PricingPreview />
              </div>
            </>
          )}
          {currentVirtualRoute === "testimonials" && <Testimonials />}
          {currentVirtualRoute === "faq" && <FAQSection />}
          {currentVirtualRoute === "contact" && <InquiryForm />}
        </div>
      </div>
    );
  };

  // Render simulated virtual routing paths
  if (currentVirtualRoute === "404") {
    return (
      <div className={theme === "dark" ? "dark" : ""}>
        <CustomCursor />
        <Page404 onBackToHome={handleExit404} />
      </div>
    );
  }

  if (currentVirtualRoute === "admin") {
    return (
      <div className={theme === "dark" ? "dark" : ""}>
        <CustomCursor />
        <AdminDashboard onBackToHome={handleExit404} />
      </div>
    );
  }

  return (
    <>
      {/* 1. Introductory Loading Screen */}
      <LoadingScreen onComplete={() => setIsAppLoading(false)} />

      {!isAppLoading && (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-brand-primary/10 selection:text-brand-primary">
          {/* Scroll Progress Bar */}
          <motion.div
            id="scroll-progress-bar"
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 origin-left z-100"
            style={{ scaleX }}
          />

          {/* Premium Hardware-Accelerated Custom Cursor */}
          <CustomCursor />

          {/* 2. Header Navigation */}
          <Navbar
            onNavClick={handleScrollToSection}
            activeSection={activeSection}
            theme={theme}
            onThemeToggle={toggleTheme}
          />

          {/* 3. Main Sections or Page Routing */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVirtualRoute}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {currentVirtualRoute === "home" ? (
                <main>
                  {/* Section 1: Hero Section */}
                  <Hero onCtaClick={handleScrollToSection} />

                  {/* Section 2: Trusted By (Logo Marquee) */}
                  <TrustedBy />

                  {/* Section 3: About Clinik Coding */}
                  <About />

                  {/* Section 4: Services (Bento Grid) */}
                  <Services />

                  {/* Section 5: Why Choose Us (Zig-zag alternation) */}
                  <WhyChooseUs />

                  {/* Section 6: Featured Portfolio */}
                  <Portfolio />

                  {/* Section 7: Case Study */}
                  <CaseStudiesSection />

                  {/* Section 8: Technology Stack (Logo grid + tooltips) */}
                  <TechStack />

                  {/* Section 9: Development Process (Timeline) */}
                  <DevelopmentProcess />

                  {/* Section 10: Pricing Preview */}
                  <PricingPreview />

                  {/* Section 10b: AI Cost & Brief Estimator Section */}
                  <Estimator />

                  {/* Section 11: Testimonials (Review slider) */}
                  <Testimonials />

                  {/* Section 12: FAQ (Accordions) */}
                  <FAQSection />

                  {/* Section 13: Latest Articles (Preview 3 articles) */}
                  <ArticlesSection />

                  {/* Section 14: CTA Consultation */}
                  <CtaConsultation onCtaClick={handleScrollToSection} />

                  {/* Section 14b: Instant Lead Capture Inquiry Form */}
                  <InquiryForm />
                </main>
              ) : (
                <main>
                  {renderVirtualPage()}
                </main>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Section 15: Footer */}
          <Footer onDevPortalClick={() => setIsAdminOpen(true)} />

          {/* Developer Tunnel Gate - Easter Egg Portal */}
          <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

          {/* Back to top scroll widget */}
          <BackToTop />
        </div>
      )}
    </>
  );
}
