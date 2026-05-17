# Smart Tourism LBS Pulau Penyengat

Project React + Express untuk website wisata Pulau Penyengat berbasis Location Based Service, peta OpenStreetMap, rekomendasi rute A*, dan AI Assistant Gemini + RAG manual.

## Perubahan Tampilan

- Hero section diperbarui dengan gaya landing page modern.
- Peta dibuat mengambang di hero section dan tetap menggunakan Leaflet + OpenStreetMap.
- Pencarian destinasi, rekomendasi tempat, lacak posisi, dan rute A* dipindahkan ke bagian atas.
- Section `Peta & Rute` lama dihilangkan dari tampilan utama.
- Tombol AI diganti menjadi gambar bot.

## Menjalankan Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend berjalan di:

```bash
http://localhost:5000
```

## Menjalankan Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend berjalan di:

```bash
http://localhost:3000
```

## Konfigurasi API

Isi file `backend/.env` dengan API key Gemini baru.

```env
PORT=5000
GEMINI_API_KEY=isi_api_key_baru_di_sini
GEMINI_MODEL=gemini-1.5-flash
FRONTEND_URL=http://localhost:3000
```

Jangan menyimpan API key asli ke GitHub atau membagikannya di chat.
