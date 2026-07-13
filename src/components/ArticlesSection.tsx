import React, { useState } from "react";
import { Sparkles, Calendar, Clock, ArrowRight, X, ArrowLeft, Bookmark, Share2, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ArticleDetail {
  id: string;
  category: "Web Development" | "UI/UX" | "SEO" | "Tips Bisnis" | "Teknologi" | "Digital Marketing";
  title: string;
  desc: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export default function ArticlesSection() {
  const [activeArticle, setActiveArticle] = useState<ArticleDetail | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const articles: ArticleDetail[] = [
    {
      id: "art-1",
      category: "Web Development",
      title: "Mengapa TypeScript Wajib Digunakan untuk Aplikasi Skala Enterprise",
      desc: "Menghindari bug runtime, mendokumentasikan kode secara otomatis, serta meningkatkan produktivitas tim pengembang skala besar dengan keandalan static typing.",
      date: "08 Juli 2026",
      readTime: "5 Menit Baca",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop",
      author: {
        name: "Yusuf Anggara",
        role: "Tech Lead Engineer",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
      },
      content: [
        "Dalam ekosistem pengembangan perangkat lunak modern, kompleksitas basis kode (codebase) dapat bertambah dengan sangat cepat seiring pertumbuhan fitur bisnis. Menulis kode dalam JavaScript murni untuk proyek skala enterprise sering kali mendatangkan tantangan besar berupa bug runtime yang sulit dilacak, inkonsistensi tipe data, serta hambatan saat melakukan refactoring kode.",
        "Disinilah TypeScript hadir sebagai penyelamat. TypeScript adalah superset dari JavaScript yang menambahkan fitur static typing (pengetikan statis). Dengan TypeScript, setiap variabel, parameter fungsi, dan objek dideklarasikan tipenya secara eksplisit. Compiler TypeScript akan mendeteksi kesalahan tipe data seketika sebelum kode sempat dijalankan di lingkungan produksi.",
        "Berikut adalah alasan utama mengapa TypeScript menjadi standar mutlak di Clinik Coding untuk proyek enterprise:",
        "1. Menghilangkan Bug Runtime yang Umum: Lebih dari 15% bug JavaScript biasa disebabkan oleh kesalahan tipe data sederhana (seperti memanggil method yang tidak ada pada objek 'undefined'). TypeScript menangkap kesalahan ini saat kompilasi.",
        "2. Refactoring Aman Tanpa Khawatir Sistem Rusak: Saat merestrukturisasi sistem atau mengubah nama properti database di server, TypeScript secara otomatis memvalidasi seluruh referensi di seluruh folder proyek dan memberi tahu file mana saja yang perlu diperbarui.",
        "3. Autocomplete yang Cerdas di Code Editor: Dengan mendefinisikan Interface dan Type secara terperinci, pengembang mendapatkan bantuan dokumentasi otomatis dan penyelesaian kode (autocomplete) yang presisi, mempercepat waktu penulisan kode hingga 40%.",
        "Kesimpulannya, investasi waktu di awal untuk mendefinisikan tipe data dengan TypeScript akan menghemat ratusan jam kerja pemeliharaan (maintenance) di masa depan, memastikan aplikasi perusahaan Anda berjalan kokoh, stabil, dan siap diskalakan tanpa hambatan."
      ]
    },
    {
      id: "art-2",
      category: "UI/UX",
      title: "Seni Whitespace: Rahasia Desain Website Mewah Kelas Dunia",
      desc: "Bagaimana mengatur margin dan ruang kosong (negative space) secara cerdas dapat meningkatkan keterbacaan artikel serta membangun citra eksklusif brand Anda.",
      date: "06 Juli 2026",
      readTime: "4 Menit Baca",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
      author: {
        name: "Amara Lubis",
        role: "Senior UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
      },
      content: [
        "Sering kali kita melihat situs web yang menumpuk informasi di setiap sudut layar dengan teks padat, banner berkedip, dan elemen dekoratif berlebihan. Di sisi lain, coba Anda perhatikan situs web resmi Apple, Stripe, atau Notion. Mereka memancarkan aura yang tenang, sangat profesional, mahal, dan eksklusif. Apa rahasianya? Seni pengelolaan Whitespace.",
        "Whitespace, atau yang biasa disebut negative space, bukanlah ruang kosong tak terpakai yang sia-sia. Whitespace adalah elemen desain aktif yang berfungsi memberikan ruang bernapas bagi mata pengunjung, mengontrol fokus perhatian, serta menyusun ritme visual yang seimbang.",
        "Berikut adalah cara Whitespace bekerja membangun persepsi kemewahan pada website Anda:",
        "1. Meningkatkan Keterbacaan (Readability) Hingga 20%: Memberikan jarak yang cukup antara baris teks (leading), paragraf, dan kolom memudahkan otak pengunjung memproses informasi tanpa merasa lelah.",
        "2. Membimbing Alur Fokus Mata Pengunjung: Elemen penting seperti tombol CTA (Call-to-Action) atau tajuk utama (Headline) yang dikelilingi oleh ruang kosong akan langsung menarik perhatian mata dalam sepersekian detik pertama.",
        "3. Menetapkan Citra Premium & Mahal: Dalam teori psikologi desain, kepadatan tinggi sering diidentikkan dengan produk murah/diskon massal, sementara ruang lapang (generous layout) menyiratkan eksklusivitas, ketelitian, dan standar kualitas tinggi.",
        "Di Clinik Coding, kami memperlakukan setiap piksel ruang kosong dengan sangat hati-hati. Whitespace adalah komitmen kami untuk menghargai waktu dan perhatian pengunjung website Anda, menghadirkan estetika visual premium yang membuat bisnis Anda terlihat berkelas."
      ]
    },
    {
      id: "art-3",
      category: "SEO",
      title: "Panduan Optimasi Google Core Web Vitals untuk Peringkat Teratas",
      desc: "Membahas teknik kompresi gambar, penundaan pemuatan skrip JS tak berguna, serta pemanfaatan serverless hosting untuk meloloskan skor performa Lighthouse di atas 95.",
      date: "02 Juli 2026",
      readTime: "6 Menit Baca",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop",
      author: {
        name: "Rian Hidayat",
        role: "SEO & Growth Strategist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
      },
      content: [
        "Memiliki website yang indah saja tidak cukup jika tidak ada calon pelanggan yang bisa menemukannya di Google. Mulai tahun 2021, Google meresmikan Core Web Vitals sebagai salah satu faktor penentu peringkat (ranking factor) algoritma pencarian organik mereka. Google ingin memastikan bahwa situs yang direkomendasikan tidak hanya relevan kontennya, tapi juga memiliki performa yang sangat cepat dan ramah pengguna.",
        "Core Web Vitals berfokus pada tiga metrik utama pengalaman pengguna:",
        "1. Largest Contentful Paint (LCP): Mengukur kecepatan memuat konten visual utama di layar. Skor LCP terbaik adalah di bawah 2.5 detik sejak halaman mulai dimuat.",
        "2. Interaction to Next Paint (INP) / First Input Delay (FID): Mengukur responsivitas interaksi website saat tombol diklik. Skor ideal adalah kurang dari 100ms.",
        "3. Cumulative Layout Shift (CLS): Mengukur stabilitas tata letak elemen halaman agar tidak ada gambar yang tiba-tiba bergeser turun saat dimuat dan mengganggu klik pengguna.",
        "Bagaimana Clinik Coding mengoptimalkan ketiga metrik ini untuk klien kami?",
        "Langkah pertama adalah kompresi aset gambar secara ekstrem dengan mengonversi seluruh format ke generasi terbaru (.webp atau .avif) serta menerapkan teknik lazy loading bawaan. Langkah kedua adalah menyingkirkan kode Javascript yang menghalangi rendering (render-blocking scripts) dan memisahkan bundel kode (code-splitting). Langkah terakhir adalah menyajikan file melalui CDN (Content Delivery Network) global agar diakses sub-detik dari lokasi mana pun.",
        "Dengan memenuhi skor performa Lighthouse di atas 95, situs web Anda mendapatkan 'lampu hijau' dari bot crawler Google, mendongkrak peringkat pencarian kata kunci bisnis Anda, serta memberikan pengalaman navigasi mulus yang disukai pelanggan."
      ]
    }
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAlreadyLiked = liked[id];
    setLiked({ ...liked, [id]: !isAlreadyLiked });
    setLikes({
      ...likes,
      [id]: (likes[id] || 0) + (isAlreadyLiked ? -1 : 1)
    });
  };

  return (
    <section id="articles" className="py-24 bg-slate-50 relative scroll-mt-16 text-left">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>WAWASAN TEKNOLOGI & BISNIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-brand-dark mb-4">
            Edukasi & Wawasan Industri
          </h2>
          <p className="text-slate-650 font-sans text-base leading-relaxed">
            Ikuti ulasan edukasi mendalam seputar strategi pengembangan web modern, rahasia di balik seni UI/UX kelas atas, taktik optimasi SEO lokal, dan wawasan pertumbuhan bisnis startup digital.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image Panel */}
              <div className="aspect-[16/10] overflow-hidden bg-slate-200 relative">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/90 text-white px-2.5 py-1 rounded-lg border border-slate-800">
                  {art.category}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date & Read time */}
                  <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-dark mb-2.5 leading-snug group-hover:text-brand-primary transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed mb-6 line-clamp-3">
                    {art.desc}
                  </p>
                </div>

                {/* Footer read button */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2" onClick={(e) => handleLike(art.id, e)}>
                    <button className={`p-1.5 rounded-full transition-colors ${liked[art.id] ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-400 hover:text-slate-600"}`}>
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono text-slate-500">{likes[art.id] || 0} Likes</span>
                  </div>
                  
                  <div className="text-xs font-bold text-brand-primary group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Full-Screen Article Reader Modal Overlay (Medium Style) */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveArticle(null)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              {/* Reader Card Container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: "spring", duration: 0.55 }}
                className="relative bg-white w-full max-w-3xl sm:rounded-3xl shadow-2xl border border-slate-100 z-10 flex flex-col h-full sm:h-auto sm:max-h-[85vh] overflow-hidden"
              >
                {/* Fixed Reader Toolbar */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-650 transition-colors text-xs font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-500" />
                    <span>Kembali</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-slate-50 text-slate-450 hover:text-slate-700" title="Bookmark">
                      <Bookmark className="w-4.5 h-4.5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-slate-50 text-slate-450 hover:text-slate-700" title="Bagikan">
                      <Share2 className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      aria-label="Tutup Artikel"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Article Content */}
                <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-left">
                  
                  {/* Article Meta Header */}
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold tracking-wider uppercase">
                      {activeArticle.category}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-brand-dark tracking-tight leading-tight">
                      {activeArticle.title}
                    </h1>
                    
                    {/* Author Meta Row */}
                    <div className="flex items-center gap-3.5 pt-3 border-t border-b border-slate-100 py-4">
                      <img
                        src={activeArticle.author.avatar}
                        alt={activeArticle.author.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0 bg-slate-150"
                      />
                      <div className="text-left">
                        <span className="font-heading font-bold text-xs sm:text-sm text-brand-dark block">{activeArticle.author.name}</span>
                        <span className="text-[10px] sm:text-xs text-slate-400 font-mono block">{activeArticle.author.role}</span>
                      </div>
                      <div className="ml-auto text-right text-[10px] sm:text-xs text-slate-400 font-mono space-y-0.5">
                        <span className="block">{activeArticle.date}</span>
                        <span className="block">{activeArticle.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Hero Banner */}
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                    <img
                      src={activeArticle.image}
                      alt={activeArticle.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Editorial Paragraphs */}
                  <div className="space-y-6 text-slate-700 text-sm sm:text-base font-sans leading-relaxed font-light">
                    {activeArticle.content.map((paragraph, index) => {
                      if (paragraph.startsWith("1.") || paragraph.startsWith("2.") || paragraph.startsWith("3.")) {
                        return (
                          <div key={index} className="pl-4 border-l-2 border-brand-primary py-1 my-3 bg-blue-500/5 p-4 rounded-r-xl">
                            <p className="font-sans font-medium text-brand-dark text-xs sm:text-sm">{paragraph}</p>
                          </div>
                        );
                      }
                      return (
                        <p key={index}>
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Article Footer Quote CTA */}
                  <div className="pt-8 border-t border-slate-100 text-center">
                    <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">INGIN MENERAPKAN SOLUSI INI DI WEBSITE ANDA?</p>
                    <h4 className="font-heading font-extrabold text-sm sm:text-base text-brand-dark max-w-md mx-auto mb-5 leading-snug">
                      Mari diskusikan kebutuhan teknologi bisnis Anda bersama tim ahli Clinik Coding.
                    </h4>
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        window.location.hash = "#contact";
                      }}
                      className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Mulai Konsultasi Gratis Sekarang
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
