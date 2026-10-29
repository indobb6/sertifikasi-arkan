# Sistem Sertifikasi Al-Qur'an SDIT Arkan Cendekia

Aplikasi web berbasis Progressive Web App (PWA) untuk mendigitalkan seluruh tahapan ujian sertifikasi hafalan Al-Qur'an di lingkungan SDIT Arkan Cendekia. Sistem ini mengintegrasikan pendaftaran peserta, pengujian hafalan secara langsung dengan mushaf digital, pengolahan nilai otomatis, hingga pencetakan sertifikat dan transparansi hasil untuk wali murid.

---

## Fungsi Utama

### 1. Manajemen Pendaftaran Peserta
- Pendaftaran data santri baru beserta pilihan kelas, juz yang diujikan (Juz 30, 29, 28, 27, 26, atau Juz 1), tahun ajaran, dan semester.
- Tabel daftar peserta terdaftar dengan fitur pencarian cepat dan ekspor data ke format Microsoft Excel (.xlsx).

### 2. Pengujian Hafalan dan Penilaian Digital
- Input nilai per surat secara real-time dengan validasi rentang angka 0 hingga 100.
- Kalkulasi otomatis nilai rata-rata dan penentuan status akhir kelulusan berdasarkan standar penilaian:
  - **Lulus**: Nilai rata-rata minimal 80 dan tidak ada surat bernilai di bawah 78.
  - **Remedial**: Nilai rata-rata mencapai 80 namun terdapat surat bernilai di bawah 78.
  - **Belum Lulus**: Nilai rata-rata di bawah 80.
- Kolom catatan penguji untuk mendokumentasikan letak kesalahan ayat atau tajwid pada masing-masing surat.
- Fitur auto-save draft lokal agar data penilaian tidak hilang jika koneksi terputus atau halaman tidak sengaja tertutup.
- Pembatasan hak akses berbasis akun penguji untuk mencegah perubahan nilai oleh penguji lain.

### 3. Mushaf Al-Qur'an Terintegrasi (Tampilan Per Halaman)
- Tombol **Lihat Surat** pada setiap kartu surat yang langsung membuka pop-up mushaf pada halaman surat bersangkutan.
- Tampilan berbasis halaman utuh standar Mushaf Madinah 15 baris (604 halaman), bukan per ayat, sehingga penguji dapat menyimak hafalan persis seperti memegang mushaf fisik.
- Dukungan navigasi cepat (pindah halaman sebelumnya/selanjutnya, loncat halaman 1-604, dan zoom teks).
- Dukungan fallback otomatis ke REST API Al-Qur'an Cloud jika terjadi kendala akses gambar.

### 4. Pelaporan dan Analisis Data
- Dashboard statistik yang memvisualisasikan proporsi kelulusan, total santri yang diuji, serta ringkasan capaian per juz.
- Tabel laporan lengkap dengan filter tahun ajaran, semester, juz, serta pencarian nama siswa.
- Rekapitulasi khusus untuk peserta Haflah Akhirussanah (wisuda tahfidz).

### 5. Pencetakan Dokumen Resmi
- Cetak sertifikat individual santri lengkap dengan rincian nilai per surat dan keterangan kelulusan.
- Cetak rekapitulasi nilai kolektif per angkatan atau per kelas siap tanda tangan penguji dan pimpinan.

### 6. Portal Wali Murid dan Publik
- Pengecekan mandiri nilai dan status kelulusan oleh orang tua santri tanpa perlu login, cukup dengan memasukkan nama santri.

---

## Manfaat Aplikasi

- **Bagi Penguji:** Mempersingkat waktu pengujian, menghilangkan pencatatan berbasis kertas, meniadakan potensi salah hitung rata-rata, dan mempermudah penyimakan hafalan tanpa perlu membawa mushaf fisik terpisah.
- **Bagi Sekolah dan Koordinator Tahfidz:** Tersedianya database terpusat yang aman di Supabase, rekapitulasi instan tanpa proses input ulang, serta kemudahan dalam menyiapkan dokumen kelulusan dan daftar peserta wisuda.
- **Bagi Orang Tua dan Santri:** Hasil ujian dapat diakses secara transparan, cepat, dan akurat dari perangkat apa pun.

---

## Panduan Penggunaan

### Alur Kerja Penguji
1. Masuk ke aplikasi melalui menu Login menggunakan kredensial akun penguji yang telah terdaftar.
2. Buka menu **Penilaian Hafalan**.
3. Cari nama santri pada kotak pencarian peserta.
4. Pilih Juz yang diujikan. Daftar surat dan input nilai akan muncul secara otomatis.
5. Klik tombol **Lihat Surat** pada surat yang sedang diuji untuk membuka panduan mushaf per halaman jika diperlukan.
6. Masukkan nilai santri untuk tiap surat (0 - 100) serta catatan perbaikan jika ada.
7. Sistem akan menampilkan kalkulasi rata-rata dan status kelulusan secara otomatis.
8. Klik tombol **Simpan Nilai** untuk menyimpan hasil ke database pusat.

### Alur Kerja Administrator / Koordinator
1. **Pendaftaran:** Masukkan data peserta baru melalui menu **Pendaftaran Peserta**.
2. **Monitoring:** Pantau progres pengujian dan distribusi kelulusan pada menu **Dashboard**.
3. **Laporan & Arsip:** Buka menu **Laporan Nilai** untuk menyaring, mengecek catatan kesalahan santri, atau mengunduh rekapan Excel.
4. **Cetak Sertifikat:** Buka menu **Cetak Nilai** untuk mencetak sertifikat santri yang dinyatakan Lulus.
5. **Daftar Haflah:** Akses menu **Haflah** untuk melihat dan mencetak daftar final santri yang berhak diwisuda.

### Alur Kerja Wali Murid (Publik)
1. Buka tautan website pada peramban web HP atau komputer.
2. Pada halaman utama (Mode Pengunjung), ketikkan nama santri pada kolom pencarian.
3. Klik tombol **Cari Hasil**. Detail kelulusan dan rincian nilai surat akan ditampilkan.

---

## Struktur Berkas Proyek

```
sertifikasi-arkan/
|-- index.html                   # Halaman utama aplikasi (Single Page Application)
|-- manifest.json                # Konfigurasi instalasi PWA
|-- icon.png                     # Ikon aplikasi
|-- README.md                    # Dokumentasi proyek
|-- sync-env.js                  # Skrip sinkronisasi variabel lingkungan .env ke browser
|-- css/
|   `-- style.css                # Gaya kustom, tata letak cetak, dan font Al-Qur'an
`-- js/
    |-- app.js                   # Inisialisasi router, navigasi, dan daur hidup aplikasi
    |-- config.js                # Konfigurasi rujukan data surat, kelas, dan state aplikasi
    |-- env.js                   # Variabel lingkungan lokal (diabaikan oleh git)
    |-- components/
    |   `-- layout.js            # Kerangka antarmuka (header, navigasi desktop & mobile)
    |-- features/
    |   |-- auth.js              # Otentikasi dan sesi login/logout
    |   |-- cetak.js             # Tata letak pencetakan sertifikat dan rekapitulasi nilai
    |   |-- dashboard.js         # Statistik agregat dan diagram grafik kelulusan
    |   |-- dataPendaftar.js     # Tabel peserta pendaftaran dan ekspor Excel
    |   |-- haflah.js            # Modul rekapitulasi peserta wisuda Haflah Akhirussanah
    |   |-- laporan.js           # Tabel hasil sertifikasi, pencarian, dan penyaringan
    |   |-- pendaftaran.js       # Formulir input pendaftar santri baru
    |   |-- penilaian.js         # Formulir penilaian hafalan surat dan catatan penguji
    |   |-- pengunjung.js        # Portal publik pengecekan nilai mandiri oleh wali murid
    |   |-- profil.js            # Pengaturan akun dan pergantian kata sandi penguji
    |   `-- quranViewer.js       # Modul penampil Mushaf Madinah 604 halaman terintegrasi
    |-- services/
    |   `-- supabase.js          # Integrasi database cloud Supabase
    `-- utils/
        `-- ui.js                # Komponen utilitas antarmuka (notifikasi toast, dialog konfirmasi)
```

---

## Konfigurasi Kredensial Database (.env)

Kredensial database Supabase dipisahkan dari source code utama agar aman dan tidak terekspos di repository publik:

1. Buat berkas `.env` dengan menyalin format dari `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Isi nilai `SUPABASE_URL` dan `SUPABASE_ANON_KEY` sesuai konfigurasi proyek Supabase Anda.
3. Jalankan skrip sinkronisasi untuk memperbarui konfigurasi peramban:
   ```bash
   node sync-env.js
   ```

*Catatan: Berkas `.env` dan `js/env.js` telah terdaftar di `.gitignore` sehingga tidak akan terunggah ke repositori Git.*

---

## Teknologi yang Digunakan

- **HTML5 & Vanilla JavaScript (Modular Architecture)**
- **Tailwind CSS** untuk tata letak responsif dan desain antarmuka
- **Supabase JS Client** untuk otentikasi dan basis data PostgreSQL
- **Chart.js** untuk diagram visualisasi data pada dashboard
- **SheetJS (xlsx)** untuk pembuatan dokumen unduhan Microsoft Excel
- **Al-Quran Cloud REST API & Quran Vector CDN** untuk penyediaan halaman mushaf digital
