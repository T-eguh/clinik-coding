import { Sparkles, Compass, ShieldCheck, Heart, Award, ArrowUpRight, Users, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

export default function VisiMisi() {
  const coreValues = [
    { title: "Professional", desc: "Berkomunikasi transparan, menepati linimasa, dan bekerja dengan etika profesi tinggi.", icon: ShieldCheck, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    { title: "Innovation", desc: "Terus mengeksplorasi teknologi baru (AI, Serverless) demi arsitektur termodern.", icon: Sparkles, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
    { title: "Transparency", desc: "Klien memegang kendali penuh. Pemantauan progress repositori GitHub privat 24/7.", icon: Compass, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" },
    { title: "Quality & Integrity", desc: "Menolak penulisan kode instan asal jadi. Mengikuti standar linting & testing ketat.", icon: Award, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    { title: "Continuous Learning", desc: "Sebab dunia teknologi berkembang secepat kilat, tim kami terus melakukan riset harian.", icon: GraduationCap, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    { title: "Customer Success", desc: "Keberhasilan komersial aplikasi klien adalah satu-satunya tolok ukur kesuksesan kami.", icon: Users, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" }
  ];

  const missions = [
    { num: "01", title: "Membangun Website Berkualitas Tinggi", desc: "Menjamin setiap baris kode ditulis bersih, bebas kerentanan, dan berjalan secepat kilat di seluruh jenis perangkat." },
    { num: "02", title: "Memberikan Pengalaman Pengguna Terbaik", desc: "Mengutamakan kenyamanan interaksi pengguna (UX) dengan desain transisi premium yang memanjakan mata." },
    { num: "03", title: "Menggunakan Teknologi Terkini", desc: "Menerapkan kerangka kerja termodern standar startup global guna kemudahan skalabilitas jangka panjang." },
    { num: "04", title: "Layanan Konsultasi yang Transparan", desc: "Tanpa biaya siluman. Rincian anggaran dipecah secara jujur, komunikatif, dan terdokumentasi rapi." },
    { num: "05", title: "Dukungan Berkelanjutan Pasca Rilis", desc: "Menyediakan pendampingan penuh, garansi bug, dan pemeliharaan server berkala setelah peluncuran." }
  ];

  return (
    <section id="vision" className="py-24 bg-slate-50 relative scroll-mt-16">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Core Vision Banner */}
        <div className="bg-brand-dark rounded-3xl overflow-hidden relative border border-slate-800 shadow-xl p-8 sm:p-12 lg:p-16 mb-20 text-left">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest block mb-3">
                VISI UTAMA PERUSAHAAN
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white leading-tight mb-4">
                Menjadi software house terpercaya di Indonesia yang menghadirkan solusi digital modern dengan kualitas internasional.
              </h3>
              <p className="text-slate-400 font-sans text-sm sm:text-base font-light max-w-2xl leading-relaxed">
                Kami percaya, kekuatan perangkat lunak premium terletak pada integrasi antara arsitektur kode yang tangguh, visual estetis, dan tujuan bisnis yang jelas. Kami ada untuk memanifestasikan standar tersebut.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-xs text-left">
                <span className="text-3xl font-bold font-heading text-brand-accent block mb-2">CC⁺</span>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Clinik Coding diatur oleh kepemimpinan senior berpengalaman dalam membangun produk berlisensi internasional.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Mission */}
          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-wider block mb-3">
              MISI STRATEGIS KAMI
            </span>
            <h3 className="text-3xl font-heading font-extrabold text-brand-dark mb-8 tracking-tight">
              Langkah Nyata Mewujudkan Visi
            </h3>

            <div className="space-y-6">
              {missions.map((mis) => (
                <div key={mis.num} className="flex gap-4 border-b border-slate-200 pb-5 last:border-0">
                  <span className="font-heading font-extrabold text-2xl text-brand-primary/30 shrink-0">
                    {mis.num}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-base text-brand-dark mb-1.5">
                      {mis.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                      {mis.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Values */}
          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-wider block mb-3">
              PRINSIP OPERASIONAL (CORE VALUES)
            </span>
            <h3 className="text-3xl font-heading font-extrabold text-brand-dark mb-8 tracking-tight">
              Our Non-Negotiable Core Values
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreValues.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-4 ${val.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-brand-dark mb-1.5">
                        {val.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-sans leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
