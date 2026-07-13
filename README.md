# ⚡ Clinik Coding Solutions - Enterprise Software House Platform

Clinik Coding adalah sebuah platform web software house elit yang spesialis dalam menyajikan layanan pengembangan perangkat lunak kustom berstandar dunia. Aplikasi ini dirancang dengan arsitektur modern full-stack berbasis React 19, Express.js, TypeScript, dan Tailwind CSS, serta dilengkapi dengan sistem CMS administrasi enterprise yang sangat komprehensif.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client-side)
*   **Framework**: React 19 (Vite)
*   **Type Safety**: TypeScript Strict Mode
*   **Styling**: Tailwind CSS & @tailwindcss/vite
*   **Animation**: Motion (Framer Motion)
*   **State Management**: TanStack Query & Context API
*   **Form Validation**: React Hook Form + Zod
*   **Iconography**: Lucide React

### Backend & Database (Server-side)
*   **Server Engine**: Node.js & Express.js (dengan TSX & TypeScript compiler)
*   **Security & Optimization**: Custom JWT Token Generator, Node Crypto (SHA-256 password hashing), Helmet, CORS, Compression
*   **AI Engine**: `@google/genai` (Google Gemini 3.5 Flash) untuk estimasi proposal biaya & durasi proyek secara cerdas, otomatis, dan kontekstual.
*   **Data Storage**: In-Memory data replication (siap migrasi ke MySQL / Prisma ORM secara modular).

---

## 📂 Folder Structure

```text
Clinik Coding/
├── .env.example              # Contoh variabel lingkungan (production ready)
├── package.json              # Definisi dependensi & script build
├── server.ts                 # Entrypoint server Express & Middleware Vite
├── tsconfig.json             # Konfigurasi TypeScript tingkat lanjut
├── vite.config.ts            # Konfigurasi bundler Vite
│
├── src/                      # Source Code Aplikasi Frontend
│   ├── main.tsx              # Entrypoint utama aplikasi web
│   ├── App.tsx               # Komponen root aplikasi & router virtual
│   ├── index.css             # Import Tailwind CSS & Google Fonts
│   ├── types.ts              # Global TypeScript interfaces & types
│   ├── data.ts               # Data statis & default untuk landing page
│   │
│   ├── components/           # Reusable UI & Page Sections
│   │   ├── Navbar.tsx        # Navigasi premium dengan Glassmorphism
│   │   ├── Hero.tsx          # Section utama dengan background aurora berpola
│   │   ├── TrustedBy.tsx     # Logo marquee klien & partner industri
│   │   ├── About.tsx         # Deskripsi visi, misi, dan nilai Clinik Coding
│   │   ├── Services.tsx      # Grid bento interaktif presentasi layanan kustom
│   │   ├── Portfolio.tsx     # Filter galeri portofolio proyek modern
│   │   ├── Estimator.tsx     # Form Konsultasi AI Estimator (Gemini Powered)
│   │   ├── Testimonials.tsx  # Slider umpan balik klien bintang 5
│   │   ├── InquiryForm.tsx   # Form lead capture instan
│   │   ├── Footer.tsx        # Footer dengan tautan Admin Portal
│   │   │
│   │   └── AdminDashboard/   # Panel CMS Terpadu (Super-Admin Area)
│   │       ├── index.tsx     # Core Router, State, & Context Admin
│   │       ├── Login.tsx     # Form otentikasi JWT modern
│   │       ├── Analytics.tsx # Dashboard visualisasi metrik data dan grafik
│   │       ├── BlogCMS.tsx   # Pengelolaan artikel & publikasi
│   │       ├── MediaLibrary.tsx # Media organizer dengan folder kustom
│   │       ├── BackupRestore.tsx # Pengarsipan data sistem dan restore logs
│   │       └── ...
```

---

## ⚙️ Prinsip Kualitas Kode (Clean Architecture)

Aplikasi ini dibangun dengan mematuhi prinsip **SOLID**, **DRY** (*Don't Repeat Yourself*), dan **KISS** (*Keep It Simple, Stupid*):
1.  **Single Responsibility Principle (SRP)**: Setiap view CMS dan form input dipisahkan ke dalam komponen modular (contoh: `BlogCMS`, `MediaLibrary`, `UserManagement`).
2.  **Open/Closed Principle (OCP)**: Menu dashboard didefinisikan sebagai objek konfigurasi array dinamis yang dapat diperluas tanpa memodifikasi logika router inti.
3.  **Liskov Substitution Principle (LSP) & Interface Segregation**: Semua interface tipe data dideklarasikan secara eksplisit di `/src/components/AdminDashboard/types.ts` dan `/src/types.ts`.
4.  **Dependency Inversion**: Interaksi server-side diabstraksi melalui endpoint RESTful API terintegrasi, yang memudahkan penggantian repositori in-memory ke database MySQL produksi di kemudian hari.

---

## 🚀 Panduan Instalasi Lokal

### Prasyarat
*   Node.js (versi 18 atau lebih baru)
*   npm atau yarn

### Langkah Pemasangan
1.  **Klon Proyek**:
    ```bash
    git clone https://github.com/yourusername/clinik-coding.git
    cd clinik-coding
    ```
2.  **Instal Dependensi**:
    ```bash
    npm install
    ```
3.  **Konfigurasi Environment**:
    Kloning file `.env.example` menjadi `.env` dan masukkan API Key Anda:
    ```bash
    cp .env.example .env
    ```
4.  **Jalankan Mode Pengembangan**:
    ```bash
    npm run dev
    ```
    Buka `http://localhost:3000` di peramban Anda.

---

## 🌐 Panduan Deploy ke Lingkungan Produksi

### 1. Frontend ke Vercel (Single Page App)
Vercel secara otomatis mendeteksi konfigurasi Vite:
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Environment Variables**: Tambahkan `GEMINI_API_KEY` dan `APP_URL` pada panel pengaturan dashboard Vercel Anda.

### 2. Backend ke VPS Ubuntu (dengan Nginx & PM2)

Untuk men-deploy backend Express di server Ubuntu pribadi Anda:

#### Langkah A: Persiapan Environment VPS
```bash
sudo apt update && sudo apt upgrade -y
# Install Node.js & Git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git build-essential

# Install PM2 secara global untuk manajemen proses Node.js
sudo npm install pm2 -g
```

#### Langkah B: Deploy Kode & Jalankan Server
1.  Unduh kode sumber Anda ke folder `/var/www/clinik-coding` di VPS.
2.  Buat file `.env` produksi di folder root tersebut dengan variabel yang aman.
3.  Lakukan proses build aplikasi:
    ```bash
    npm install
    npm run build
    ```
4.  Jalankan server menggunakan PM2:
    ```bash
    pm2 start dist/server.cjs --name "clinik-coding-api"
    # Mengatur PM2 agar otomatis berjalan kembali jika server restart (reboot)
    pm2 startup
    pm2 save
    ```

#### Langkah C: Konfigurasi Reverse Proxy Nginx
1.  Pasang Nginx:
    ```bash
    sudo apt install nginx -y
    ```
2.  Buat konfigurasi server block baru di `/etc/nginx/sites-available/clinikcoding`:
    ```nginx
    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
    ```
3.  Aktifkan konfigurasi dan muat ulang Nginx:
    ```bash
    sudo ln -s /etc/nginx/sites-available/clinikcoding /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

#### Langkah D: Amankan dengan SSL Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
Ikuti instruksi di layar untuk menyelesaikan pendaftaran sertifikat SSL gratis yang diperbarui otomatis secara berkala.

---

## 🔒 Fitur Keamanan Terintegrasi (Enterprise Ready)
*   **JWT Custom Encryption**: Token ditandatangani menggunakan algoritma HMAC-SHA256 untuk memastikan integritas sesi pengguna tanpa membebankan performa database.
*   **Idle Sessional Timeout**: Admin yang tidak melakukan aktivitas selama 10 menit secara otomatis dide-otentikasi dan sesi akan ditutup secara aman demi mencegah kebocoran data panel.
*   **Password Hashing**: Penyimpanan kata sandi admin dienkripsi menggunakan hashing kriptografi satu arah yang kokoh.
*   **Helmet & CORS Configured**: Mematikan kebocoran informasi melalui HTTP headers serta menyaring rujukan domain asing yang mencurigakan.

---

## 📜 Lisensi & Kepemilikan
Hak Cipta © 2026 **Clinik Coding Solutions**. Seluruh baris kode dilindungi undang-undang untuk penggunaan komersial berlisensi penuh.
