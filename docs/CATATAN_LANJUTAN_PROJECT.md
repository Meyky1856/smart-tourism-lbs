# Catatan Lanjutan Project

Perubahan versi ini:

1. Hero section dibuat lebih mirip gaya landing page `index.html`, tetapi tetap memakai konsep project React sebelumnya.
2. Peta pada hero section dibuat sebagai kartu mengambang di tengah area konten, bukan terlalu menempel ke kanan.
3. Peta tetap menggunakan Leaflet dan OpenStreetMap, bukan iframe Google Maps.
4. Fitur rekomendasi tempat dipindahkan ke hero section.
5. Fitur pencarian destinasi ditambahkan di hero section.
6. Fitur rute A* dipindahkan ke hero section melalui tombol `Buat Rute A*`.
7. Section lama `Peta & Rute` tidak lagi ditampilkan di `App.jsx` agar tampilan lebih ringkas.
8. Tombol AI diganti dari teks `AI` menjadi gambar bot SVG yang lebih rapi.
9. Navbar disederhanakan agar sesuai dengan tampilan landing page.

Catatan teknis:

- Graf rute masih memakai data manual di `frontend/src/data/routeGraph.js`.
- Untuk hasil rute yang akurat, node dan edge perlu disesuaikan lagi dengan observasi jalan asli di Pulau Penyengat.
- API key Gemini tetap tidak dimasukkan ke project. Masukkan key baru ke file `backend/.env`.
