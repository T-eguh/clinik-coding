# Clinik Coding - Enterprise Production-Ready Backend System
### Arsitektur Backend, Skema MySQL 8, Integrasi Prisma, & Panduan Deployment (PM2 & Nginx)

Dokumen ini adalah spesifikasi arsitektur resmi untuk sistem backend **Clinik Coding**. Backend ini dirancang menggunakan standar performa tinggi, keamanan militer, skalabilitas terjamin, serta pengelolaan dinamis melalui Admin Panel.

---

## 1. STACK TEKNOLOGI ENTERPRISE

Backend Clinik Coding berjalan di atas infrastruktur modular berikut:
*   **Runtime:** Node.js v20+ dengan TypeScript v5.
*   **Framework:** Express.js dengan middleware performa (Compression, Custom Rate Limiter, Helmet Security Headers).
*   **Database ORM:** Prisma ORM v5 terhubung ke **MySQL 8** (dengan pengindeksan penuh, relasi foreign key, dan skema ternormalisasi).
*   **Caching Layer:** Redis (untuk caching data portfolio, blog, dan rate limit).
*   **Keamanan:** JWT (Json Web Token) HS256, Bcrypt Password Hashing, Sanitizer input anti-XSS & anti-SQLi.
*   **Penyimpanan Media:** Cloudinary Cloud Storage SDK dengan auto-resize & kompresi WebP otomatis.
*   **Email Gateway:** SMTP Nodemailer terenkripsi SSL/TLS untuk Contact Leads, Reset Password, & Newsletter.

---

## 2. SKEMA DATABASE (MySQL 8)

Database telah ternormalisasi hingga bentuk normal ketiga (3NF) untuk menjamin integritas data, performa join cepat, dan bebas anomali.

### Diagram Relasi & Tabel Inti:
1.  **Users (`users`):** Menyimpan kredensial admin dan mitra.
2.  **Roles (`roles`):** Tingkatan akses (`Super Admin`, `Admin`, `Editor`, `Marketing`, `Content Writer`, `Developer`, `Client`).
3.  **Permissions (`permissions`):** Hak izin aksi sistem (`all_access`, `read`, `write`, `delete`, `publish`, `admin_settings`).
4.  **RolePermission (`role_permissions`):** Pivot M-to-M pemetaan hak akses untuk setiap Role.
5.  **UserRole (`user_roles`):** Pivot M-to-M pemetaan role ke setiap akun User.
6.  **Projects (`projects`):** Detail portofolio dengan alur *Challenge -> Research -> Solution -> Technology -> Result*.
7.  **Blogs (`blogs`):** Sistem manajemen artikel dilengkapi metadata SEO, Authoring, dan *Reading Time*.
8.  **Consultations (`consultations`):** Data ringkasan konsultasi kalkulator biaya (Briefs) terintegrasi Gemini AI.
9.  **Messages (`messages`):** Pengelolaan leads formulir kontak masuk.
10. **ActivityLogs & LoginLogs:** Pencatatan audit trail menyeluruh untuk keamanan.

> **Catatan Teknis:** Seluruh berkas DDL SQL murni telah disediakan lengkap di `/prisma/schema.sql` dan konfigurasi Prisma di `/prisma/schema.prisma`.

---

## 3. FORMAT RESPON REST API UNIFIKASI

Seluruh API mengembalikan format JSON terpadu untuk memudahkan konsumsi data oleh aplikasi frontend (React/Native):

### Sukses (200 / 201)
```json
{
  "success": true,
  "message": "Data berhasil dimuat.",
  "data": {
    "id": "port_1",
    "title": "MedikaCare EMR Platform"
  },
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 12
  },
  "errors": null
}
```

### Gagal / Validasi Gagal (400 / 401 / 403 / 429 / 500)
```json
{
  "success": false,
  "message": "Validasi kredensial login gagal.",
  "data": null,
  "pagination": null,
  "errors": {
    "email": "Format email tidak valid.",
    "password": "Kata sandi minimal terdiri dari 6 karakter."
  }
}
```

---

## 4. DOKUMENTASI ENDPOINT API (OPENAPI STYLE)

### A. AUTHENTICATION SERVICE
*   **`POST /api/auth/login`**
    *   *Deskripsi:* Otentikasi admin & staff dengan rate limiter ketat (maks 10 kali/5 menit).
    *   *Request Body (Zod Validated):*
        ```json
        { "email": "admin@clinikcoding.com", "password": "admin123" }
        ```
    *   *Response:* JWT token & payload otorisasi role-permissions.

*   **`POST /api/auth/refresh`**
    *   *Deskripsi:* Refresh token JWT yang kedaluwarsa secara aman.

### B. LEADS & BRIEF SERVICE
*   **`POST /api/inquiry`**
    *   *Deskripsi:* Submit leads dari formulir kontak di landing page utama.
    *   *Request Body (Zod Validated):*
        ```json
        { "name": "Ahmad", "email": "ahmad@corp.com", "message": "Butuh sistem ERP kustom." }
        ```

*   **`POST /api/consult`**
    *   *Deskripsi:* Cost Calculator Pintar terintegrasi Gemini AI atau simulasi fallback.
    *   *Request Body (Zod Validated):*
        ```json
        {
          "clientName": "Budi Santoso",
          "companyType": "Sektor Kesehatan",
          "projectType": "Custom Systems & Dashboard",
          "designStyle": "Apple-like Clean Minimalist",
          "features": ["EMR", "Billing", "Realtime Queue"],
          "urgency": "Express"
        }
        ```

### C. CMS SERVICES (Secured with `authMiddleware`)
*   **`GET /api/portfolio`** / **`POST /api/portfolio`** / **`DELETE /api/portfolio/:id`**
*   **`GET /api/blogs`** / **`POST /api/blogs`** / **`PUT /api/blogs/:id`**
*   **`GET /api/services`** / **`GET /api/pricing`** / **`GET /api/testimonials`**
*   **`GET /api/faqs`** / **`GET /api/logs`** / **`GET /api/settings`**

---

## 5. PANDUAN DEPLOYMENT (PRODUCTION ENVIRONMENT)

Ikuti langkah-langkah di bawah ini untuk merilis backend Clinik Coding ke VPS Ubuntu Production:

### Langkah 1: Kloning & Persiapan Lingkungan (Ubuntu Server)
```bash
# Update sistem Ubuntu
sudo apt update && sudo apt upgrade -y

# Pasang Node.js LTS (v20) & MySQL 8 & Redis Server
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs mysql-server redis-server git build-essential

# Mulai dan aktifkan Redis & MySQL daemon
sudo systemctl enable --now redis-server
sudo systemctl enable --now mysql
```

### Langkah 2: Konfigurasi Database & Seed Awal
1. Masuk ke MySQL CLI dan jalankan query:
   ```sql
   CREATE DATABASE clinik_coding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Impor skema dasar dan seed data awal:
   ```bash
   mysql -u root -p clinik_coding_db < /var/www/clinik-coding/prisma/schema.sql
   ```

### Langkah 3: Konfigurasi File Lingkungan (`.env`)
Buat berkas `.env` pada root folder aplikasi:
```env
PORT=3000
NODE_ENV=production
DATABASE_URL="mysql://username:secure_password@localhost:3306/clinik_coding_db"
JWT_SECRET="ganti-dengan-kunci-enkripsi-rahasia-perusahaan-anda-32char"
GEMINI_API_KEY="AIzaSy..."
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
SMTP_USER="notifikasi@clinikcoding.com"
SMTP_PASS="password_aplikasi_anda"
```

### Langkah 4: Build Aplikasi & Manajemen Proses via PM2
```bash
# Pasang PM2 secara global
sudo npm install -g pm2

# Install dependensi proyek & compile backend-frontend
npm install
npm run build

# Daftarkan server.cjs ke dalam process manager PM2
pm2 start dist/server.cjs --name "clinik-coding-backend"

# Set PM2 agar berjalan otomatis saat VPS melakukan booting
pm2 save
pm2 startup
```

### Langkah 5: Konfigurasi Reverse Proxy Nginx
Buat konfigurasi virtual host di `/etc/nginx/sites-available/clinikcoding.com`:
```nginx
server {
    listen 80;
    server_name clinikcoding.com www.clinikcoding.com;

    # Alihkan HTTP ke HTTPS otomatis
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name clinikcoding.com www.clinikcoding.com;

    ssl_certificate /etc/letsencrypt/live/clinikcoding.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/clinikcoding.com/privkey.pem;

    # Security Headers Guna Melengkapi Helmet
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "upgrade-insecure-requests";

    # Gzip Compression untuk Performa Maksimal
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Aktifkan konfigurasi Nginx dan muat ulang layanan:
```bash
sudo ln -s /etc/nginx/sites-available/clinikcoding.com /etc/etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 6. SISTEM PENGAWASAN (MONITORING) & BACKUP MANDIRI

*   **Health Check Endpoint:** Tim devops dapat mengintegrasikan API `/api/health` ke sistem alert eksternal seperti Datadog, UptimeRobot, atau Prometheus untuk memantau konsumsi RAM, konektivitas database, serta utilisasi CPU secara real-time.
*   **Backup Script:** Di dalam admin panel disediakan fitur backup database instan. Backend melakukan dump SQL data tables yang langsung dikompresi menjadi WebP/ZIP dan disimpan pada backup vault Cloudinary / lokal server secara terjadwal.
