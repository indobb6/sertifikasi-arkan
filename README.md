# Sertifikasi Al-Qur'an - SDIT Arkan Cendekia

Aplikasi web Progressive Web App (PWA) untuk sistem informasi penilaian dan pelaporan sertifikasi hafalan Al-Qur'an SDIT Arkan Cendekia.

## 📁 Struktur Proyek (Modular Architecture)

Semua kode dan fitur telah dipisahkan secara modular ke dalam folder dan file masing-masing agar mudah dikembangkan dan dirawat:

```
sertifikasi-arkan/
├── index.html                   # Entry point HTML utama
├── manifest.json                # PWA manifest
├── icon.png                     # Logo aplikasi
├── README.md                    # Dokumentasi proyek
├── css/
│   └── style.css                # Styling custom, print layout, dan scrollbar
└── js/
    ├── config.js                # Konfigurasi Supabase, data surah, list kelas, & state
    ├── app.js                   # Router utama, navigator, dan lifecycle app
    ├── services/
    │   └── supabase.js          # Layanan backend & database Supabase (CRUD, auth)
    ├── utils/
    │   └── ui.js                # Utility UI (Toast notification, Confirm dialog, Date helpers)
    ├── components/
    │   └── layout.js            # Komponen layout (Header, Navbar desktop, Mobile bar)
    └── features/
        ├── auth.js              # Fitur login & logout
        ├── dashboard.js         # Fitur dashboard statistik & diagram kelulusan
        ├── pengunjung.js        # Portal wali murid / pengunjung untuk cek hasil
        ├── pendaftaran.js       # Form pendaftaran peserta sertifikasi
        ├── dataPendaftar.js     # Tabel daftar peserta & export excel pendaftar
        ├── penilaian.js         # Form penilaian surat, kalkulasi rata-rata, auto-draft
        ├── laporan.js           # Tabel hasil sertifikasi, pencarian, & filter
        ├── cetak.js             # Cetak sertifikat individu & rekapitulasi nilai
        ├── haflah.js            # Rekapitulasi peserta Haflah Akhirussanah
        └── profil.js            # Pengaturan akun penguji (nama & ganti password)
```

## 🔐 Konfigurasi Environment (.env)

Kredensial Supabase kini dipisahkan dari source code yang dilacak Git agar tidak terekspos di repository publik:

1. Buat/salin file konfigurasi:
   - Salin `.env.example` menjadi `.env`
   - Atau salin `js/env.example.js` menjadi `js/env.js`
2. Isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY` sesuai project Supabase Anda.
3. Jika mengubah nilai di file `.env`, jalankan perintah berikut untuk sinkronisasi ke browser:
   ```bash
   node sync-env.js
   ```
> File `.env` dan `js/env.js` otomatis diabaikan oleh `.gitignore` sehingga aman dari commit/push ke GitHub.

## 🚀 Panduan Pengembangan

Jika Anda ingin mengubah atau menambahkan sesuatu pada aplikasi:
- **Mengubah data surah / kelas / periode:** Buka [`js/config.js`](file:///c:/Users/indob/OneDrive/Documents/Github%20sertifikasi/sertifikasi-arkan/js/config.js).
- **Mengubah tampilan header/navbar:** Buka [`js/components/layout.js`](file:///c:/Users/indob/OneDrive/Documents/Github%20sertifikasi/sertifikasi-arkan/js/components/layout.js).
- **Mengubah form penilaian atau surat:** Buka [`js/features/penilaian.js`](file:///c:/Users/indob/OneDrive/Documents/Github%20sertifikasi/sertifikasi-arkan/js/features/penilaian.js).
- **Mengubah format sertifikat atau cetak:** Buka [`js/features/cetak.js`](file:///c:/Users/indob/OneDrive/Documents/Github%20sertifikasi/sertifikasi-arkan/js/features/cetak.js).
- **Mengubah form pendaftaran siswa:** Buka [`js/features/pendaftaran.js`](file:///c:/Users/indob/OneDrive/Documents/Github%20sertifikasi/sertifikasi-arkan/js/features/pendaftaran.js).
- **Mengubah query / endpoint database:** Buka [`js/services/supabase.js`](file:///c:/Users/indob/OneDrive/Documents/Github%20sertifikasi/sertifikasi-arkan/js/services/supabase.js).

## 🛠️ Teknologi yang Digunakan
- **HTML5 & Vanilla JavaScript (Modular ES)**
- **Tailwind CSS** (via CDN)
- **Supabase JS Client** (Database PostgreSQL & Auth)
- **Chart.js** (Visualisasi statistik kelulusan)
- **SheetJS (xlsx)** (Export laporan ke Microsoft Excel)
