import { Terminal, Github, Linkedin, Mail, ShieldAlert, FileText, Globe } from "lucide-react";
import { Logo } from "./Logo";

interface FooterProps {
  onDevPortalClick: () => void;
}

export default function Footer({ onDevPortalClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1220] text-slate-400 border-t border-slate-800/60 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800 text-left">
          {/* Brand Col with Local SEO Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center">
              <Logo variant="horizontal" size={36} animated={false} />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-sans font-light leading-relaxed max-w-sm">
              Clinik Coding adalah software house profesional berstandar internasional yang berdedikasi menciptakan website, dashboard kustom, portal institusi, dan solusi digital premium demi kesuksesan komersial mitra kami.
            </p>

            {/* Local Business Info & WhatsApp */}
            <div className="space-y-3.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80 max-w-sm">
              <div>
                <span className="font-mono text-[10px] font-bold text-slate-500 block uppercase">Alamat Kantor Pusat:</span>
                <p className="font-sans font-light leading-normal mt-1">
                  Jl. Pandanaran No.10, Pekunden, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50134
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-500 block uppercase">Nomor WhatsApp:</span>
                  <a
                    href="https://wa.me/6285803547563?text=Halo%20Clinik%20Coding%2C%20saya%20tertarik%20untuk%20berkonsultasi%20mengenai%20proyek%20pembuatan%20website%2Fsistem%20informasi."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-350 hover:underline font-bold transition-all block mt-1"
                  >
                    +62 858-0354-7563
                  </a>
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-500 block uppercase">Jam Operasional:</span>
                  <span className="block font-sans font-light mt-1">
                    Senin - Jumat: 09:00 - 18:00 WIB
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-1">
              <a
                href="https://github.com/clinikcoding"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/clinikcoding"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:teguhardiansyah475@gmail.com"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Email Us"
                title="teguhardiansyah475@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Interactive Google Maps Embedding Column (Local SEO Booster) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
              Lokasi Google Maps
            </h4>
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 aspect-[4/3] w-full shadow-lg relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.58585987346!2d110.34702415177243!3d-7.015738199347895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4d3f0d024d%3A0x3027d756b3b7230!2sSemarang%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1719813593000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location of Clinik Coding"
                className="absolute inset-0 grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
              Solusi Industri
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans font-light">
              <li><span className="hover:text-white transition-colors block cursor-default">Manufaktur & Logistik (WMS)</span></li>
              <li><span className="hover:text-white transition-colors block cursor-default">Sekolah & Universitas (LMS)</span></li>
              <li><span className="hover:text-white transition-colors block cursor-default">Properti & Real Estat (3D Tur)</span></li>
              <li><span className="hover:text-white transition-colors block cursor-default">Startup & SaaS (Stripe Flow)</span></li>
              <li><span className="hover:text-white transition-colors block cursor-default">Korporat & Pemerintahan</span></li>
            </ul>
          </div>

          {/* Technology Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
              Teknologi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans font-light">
              <li><span className="hover:text-white transition-colors block cursor-default">React.js / Vite / TypeScript</span></li>
              <li><span className="hover:text-white transition-colors block cursor-default">Next.js Framework (SSR)</span></li>
              <li><span className="hover:text-white transition-colors block cursor-default">Tailwind CSS v4 Styling</span></li>
              <li><span className="hover:text-white transition-colors block cursor-default">Node.js Express / Python</span></li>
              <li><span className="hover:text-white transition-colors block cursor-default">PostgreSQL & Cloud Firestore</span></li>
            </ul>
          </div>

          {/* Location & Legal */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
              Legalitas
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans font-light">
              <li className="flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5" /> <span className="hover:text-white transition-colors cursor-default">Kepatuhan NDA</span></li>
              <li className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> <span className="hover:text-white transition-colors cursor-default">Perjanjian Kerja SLA</span></li>
              <li className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> <span className="hover:text-white transition-colors cursor-default">Lisensi Kepemilikan IP</span></li>
            </ul>
          </div>
        </div>

        {/* Lower row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="font-sans text-slate-500 text-center sm:text-left">
            © {currentYear} Clinik Coding Software House. Seluruh hak cipta dilindungi undang-undang.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-slate-500 font-sans cursor-default">
              Dibuat di Indonesia dengan Presisi Tinggi
            </span>
            {/* Developer Tunnel Gate - Easter Egg */}
            <button
              onClick={onDevPortalClick}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-brand-accent hover:border-brand-accent/40 hover:bg-slate-900/60 transition-all cursor-pointer flex items-center gap-1.5"
              aria-label="Akses Developer Tunnel"
              title="Open Developer Status Tunnel"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono leading-none">DEV TUNNEL</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
