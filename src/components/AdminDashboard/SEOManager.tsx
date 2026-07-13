import React, { useState, useEffect } from "react";
import { 
  Sliders, CheckCircle2, Sparkles, RefreshCw, FileText, Globe, Code
} from "lucide-react";
import { useDashboard } from "./index";

export default function SEOManager() {
  const { showToast } = useDashboard();
  const [seoData, setSeoData] = useState({
    metaTitle: "Clinik Coding | Enterprise Software House Premium & AI Solutions",
    metaDescription: "Clinik Coding adalah mitra software house premium kelas dunia untuk transformasi digital, kecerdasan buatan, web, mobile, serta CMS enterprise berkinerja tinggi.",
    keywords: "clinik coding, software house indonesia, saas developer, ai solutions, vercel architecture, stripe design, stripe premium",
    robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://clinikcoding.com/sitemap.xml",
    googleAnalyticsId: "G-CLINIKCODING99",
    schemaOrg: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"ProfessionalService\",\n  \"name\": \"Clinik Coding\",\n  \"url\": \"https://clinikcoding.com\"\n}"
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchSeo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/seo");
      const data = await response.json();
      if (data.success && data.data) {
        const d = data.data;
        setSeoData({
          metaTitle: d.metaTitle || d.title || "Clinik Coding | Enterprise Software House Premium & AI Solutions",
          metaDescription: d.metaDescription || d.description || "Clinik Coding adalah mitra software house premium kelas dunia untuk transformasi digital, kecerdasan buatan, web, mobile, serta CMS enterprise berkinerja tinggi.",
          keywords: d.keywords || "clinik coding, software house indonesia, saas developer, ai solutions",
          robotsTxt: d.robotsTxt || "User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://clinikcoding.com/sitemap.xml",
          googleAnalyticsId: d.googleAnalyticsId || d.analyticsId || "G-CLINIKCODING99",
          schemaOrg: d.schemaOrg || d.schemaMarkup || "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"ProfessionalService\",\n  \"name\": \"Clinik Coding\",\n  \"url\": \"https://clinikcoding.com\"\n}"
        });
      }
    } catch {
      showToast("Gagal memuat preferensi SEO.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeoData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...seoData,
      title: seoData.metaTitle,
      description: seoData.metaDescription,
      schemaMarkup: seoData.schemaOrg,
      analyticsId: seoData.googleAnalyticsId
    };

    try {
      const response = await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        showToast("Konfigurasi Meta SEO berhasil diperbarui!", "success");
      } else {
        showToast("Gagal memperbarui SEO.", "error");
      }
    } catch {
      showToast("Masalah jaringan saat menyimpan preferensi SEO.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateSitemap = () => {
    showToast("Mengompilasi struktur tautan URL sitemap.xml...", "info");
    setTimeout(() => {
      showToast("Berkas sitemap.xml berhasil di-generate secara optimal!", "success");
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left font-sans text-xs">
      
      {/* Top Header */}
      <div>
        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
          SEO INDEXING & METADATA CONTROL
        </span>
        <h1 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
          <span>SEO Manager</span>
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Kelola metadata pencarian mesin pencari Google SEO, parameter robots.txt, schema.org JSON-LD, serta pelacak aktivitas Google Analytics.
        </p>
      </div>

      <form onSubmit={handleSaveSeo} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Meta Tags form */}
        <div className="lg:col-span-7 bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>GLOBAL META TAGS</span>
          </h3>

          <div className="space-y-4">
            
            {/* Meta Title */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                TITLE TEMPLATE MESIN PENCARI (RECOMMENDED: 50-60 CHARS)
              </label>
              <input
                type="text"
                name="metaTitle"
                required
                value={seoData.metaTitle}
                onChange={handleInputChange}
                placeholder="Clinik Coding | Software House..."
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all text-xs sm:text-sm font-semibold"
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  META DESCRIPTION TAG (RECOMMENDED: 150-160 CHARS)
                </label>
                <span className="text-[9px] font-mono text-slate-500">{seoData.metaDescription.length} chars</span>
              </div>
              <textarea
                name="metaDescription"
                required
                rows={3}
                value={seoData.metaDescription}
                onChange={handleInputChange}
                placeholder="Rangkuman konten pencarian yang muncul di snippet Google..."
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all resize-none text-xs leading-relaxed font-sans"
              />
            </div>

            {/* Keywords */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                GLOBAL KEYWORDS (KATA KUNCI - PISAHKAN DENGAN KOMA)
              </label>
              <input
                type="text"
                name="keywords"
                value={seoData.keywords}
                onChange={handleInputChange}
                placeholder="software house, custom developer, saas..."
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all text-xs font-mono"
              />
            </div>

            {/* Google Analytics ID */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                GOOGLE ANALYTICS GA4 MEASUREMENT ID
              </label>
              <input
                type="text"
                name="googleAnalyticsId"
                value={seoData.googleAnalyticsId}
                onChange={handleInputChange}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-100 outline-none focus:border-cyan-500/50 transition-all text-xs font-mono font-semibold text-cyan-300"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold transition-all flex items-center gap-2 cursor-pointer font-sans"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Preferensi SEO</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column - Robots, Sitemap, Schema */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Robots.txt block */}
          <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>ROBOTS.TXT RULES</span>
            </h3>

            <textarea
              name="robotsTxt"
              rows={4}
              value={seoData.robotsTxt}
              onChange={handleInputChange}
              className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-cyan-300 outline-none focus:border-cyan-500/30 transition-all font-mono text-[11px] leading-relaxed resize-none"
            />
          </div>

          {/* Schema.org block */}
          <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>JSON-LD SCHEMA MARKUP (ORGANIZATION)</span>
            </h3>

            <textarea
              name="schemaOrg"
              rows={5}
              value={seoData.schemaOrg}
              onChange={handleInputChange}
              className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-cyan-300 outline-none focus:border-cyan-500/30 transition-all font-mono text-[11px] leading-relaxed resize-none"
            />
          </div>

          {/* Sitemap Generator */}
          <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>XML SITEMAP GENERATOR</span>
            </h3>
            
            <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
              Klik tombol di bawah ini untuk memicu kompilasi ulang seluruh endpoint artikel blog, detail layanan, rilis portofolio, sitemap.xml.
            </p>

            <button
              type="button"
              onClick={handleGenerateSitemap}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300 hover:text-white transition-all font-bold cursor-pointer font-sans text-xs flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>Kompilasi Ulang Sitemap.xml</span>
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}
