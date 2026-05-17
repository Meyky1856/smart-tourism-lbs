import React from 'react'
const galleryItems = [
  { title: 'Masjid Sultan Riau', image: '/images/gallery-masjid.svg', className: 'tall' },
  { title: 'Dermaga Pompong', image: '/images/gallery-dermaga.svg' },
  { title: 'Tepi Laut Penyengat', image: '/images/gallery-laut.svg', className: 'wide' },
  { title: 'Benteng Bukit Kursi', image: '/images/gallery-benteng.svg' },
  { title: 'Senja Penyengat', image: '/images/gallery-sunset.svg' },
  { title: 'Kuliner Melayu', image: '/images/gallery-kuliner.svg' },
  { title: 'Budaya Melayu', image: '/images/gallery-budaya.svg', className: 'wide' },
  { title: 'Makam Bersejarah', image: '/images/gallery-makam.svg' },
  { title: 'Rumah Adat', image: '/images/gallery-adat.svg' }
]

function GallerySection() {
  return (
    <section id="galeri" className="section gallery-section">
      <SectionHeader badge="Galeri" title="Galeri Foto" desc="Keindahan Pulau Penyengat dari berbagai sudut pandang." />

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <article key={`${item.title}-${index}`} className={`gallery-card ${item.className || ''}`}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="gallery-card__overlay">
              <strong>{item.title}</strong>
            </div>
          </article>
        ))}
      </div>

      <div className="gallery-action">
        <button className="btn-outline">🖼️ Lihat Semua Foto</button>
      </div>
    </section>
  )
}

function SectionHeader({ badge, title, desc }) {
  return (
    <div className="section-heading">
      <span className="section-badge"><span /> {badge}</span>
      <h2 className="section-title">{title}</h2>
      <div className="gold-divider"><span>✦</span></div>
      {desc && <p>{desc}</p>}
    </div>
  )
}

export default GallerySection
