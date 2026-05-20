# 📋 Panduan Penggunaan Undangan Digital Rinta & Ifan

## 🌐 Link Undangan
- **Website**: (sesuaikan setelah deploy, misal: https://rinta-ifan.vercel.app)
- **Cara kirim ke tamu**: Tambahkan `?to=Nama+Tamu` di akhir URL
  - Contoh: `https://rinta-ifan.vercel.app/?to=Budi+Santoso`
  - Nama tamu akan otomatis muncul di cover undangan

---

## 📊 Google Sheet (Database Ucapan)

### Struktur Kolom:
| Kolom A | Kolom B | Kolom C | Kolom D |
|---------|---------|---------|---------|
| Nama | Kehadiran | Pesan | Tanggal |

### Penjelasan:
- **Nama**: Nama tamu yang mengirim ucapan
- **Kehadiran**: Status konfirmasi (hadir / tidak / ragu / kosong jika tidak memilih)
- **Pesan**: Ucapan & doa dari tamu
- **Tanggal**: Otomatis terisi waktu pengiriman

### ⚠️ PENTING - Jangan Diubah:
1. **JANGAN hapus baris 1 (header)** — kolom Nama, Kehadiran, Pesan, Tanggal harus tetap ada
2. **JANGAN ubah nama sheet** — biarkan tetap "Sheet1"
3. **JANGAN ubah/hapus Apps Script** — ini yang menghubungkan website ke sheet

### ✅ Yang Boleh Dilakukan:
- Melihat data ucapan yang masuk
- Menghapus ucapan spam (hapus baris data, bukan header)
- Menambah baris data manual jika perlu
- Download/export data ke format lain
- Mengurutkan/filter data

---

## 🎵 Musik
- File musik: `media/Christina Perri - A Thousand Years.m4a`
- Musik otomatis play saat tamu membuka undangan
- Tamu bisa mute/unmute dari tombol speaker di kanan bawah

---

## ✏️ Cara Edit Konten (jika perlu ubah):

### Ubah di file `index.html`:
- Nama mempelai, nama orang tua
- Tanggal & waktu acara
- Alamat lokasi
- Link Google Maps
- No. rekening & alamat hadiah
- Love story text

### Ubah di file `js/script.js`:
- Tanggal countdown (cari `2026-06-03T10:00:00`)
- URL Google Apps Script (cari `SHEET_API`)
- URL Google Calendar (cari `generateGoogleCalendarUrl`)

### Ubah di file `css/style.css`:
- Warna tema (cari `:root`)
- Ukuran font
- Animasi

---

## 🚀 Deploy ke Vercel (Gratis):
1. Push ke GitHub (sudah dilakukan)
2. Buka https://vercel.com
3. Login dengan akun GitHub
4. Klik "New Project" → Import repo `rinta-ifan`
5. Klik "Deploy"
6. Selesai! URL otomatis tersedia

---

## 📱 Cara Membagikan ke Tamu:
Format link: `https://[domain-kamu]/?to=Nama+Tamu`

Contoh:
- `?to=Keluarga+Besar+Pak+Ahmad`
- `?to=Budi+dan+Keluarga`
- `?to=Teman+Kantor`

Spasi diganti dengan `+` atau `%20`
