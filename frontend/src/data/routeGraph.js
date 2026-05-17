// Graf manual contoh awal. Sesuaikan koordinat node dan edge dengan hasil observasi lapangan.
export const routeNodes = {
  pelabuhan: { id: 'pelabuhan', name: 'Pelabuhan Penyengat', lat: 0.9259, lng: 104.4206 },
  simpang_dermaga: { id: 'simpang_dermaga', name: 'Simpang Dermaga', lat: 0.9264, lng: 104.4209 },
  tepi_laut: { id: 'tepi_laut', name: 'Tepi Laut Penyengat', lat: 0.9267, lng: 104.4196 },
  masjid: { id: 'masjid', name: 'Masjid Raya Sultan Riau', lat: 0.9277, lng: 104.4209 },
  engku_putri: { id: 'engku_putri', name: 'Makam Engku Putri', lat: 0.9286, lng: 104.4215 },
  makam_rah: { id: 'makam_rah', name: 'Makam Raja Ali Haji', lat: 0.9292, lng: 104.4228 },
  balai_adat: { id: 'balai_adat', name: 'Balai Adat Melayu', lat: 0.9272, lng: 104.4222 },
  istana: { id: 'istana', name: 'Istana Kantor', lat: 0.9263, lng: 104.4233 },
  simpang_bukit: { id: 'simpang_bukit', name: 'Simpang Bukit Kursi', lat: 0.9295, lng: 104.4213 },
  benteng: { id: 'benteng', name: 'Benteng Bukit Kursi', lat: 0.9302, lng: 104.4205 }
}

export const routeEdges = [
  ['pelabuhan', 'simpang_dermaga'],
  ['simpang_dermaga', 'tepi_laut'],
  ['simpang_dermaga', 'masjid'],
  ['masjid', 'engku_putri'],
  ['engku_putri', 'makam_rah'],
  ['masjid', 'balai_adat'],
  ['balai_adat', 'istana'],
  ['engku_putri', 'simpang_bukit'],
  ['simpang_bukit', 'benteng'],
  ['makam_rah', 'balai_adat']
]
