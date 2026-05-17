import React from 'react'
import { destinations } from '../data/destinations.js'

const fallbackImages = {
  'masjid-raya-sultan-riau': '/images/masjid.svg',
  'balai-adat': '/images/balai-adat.svg',
  'makam-raja-ali-haji': '/images/makam.svg',
  'benteng-bukit-kursi': '/images/benteng.svg'
}

function DestinationSection() {
  const showInHeroMap = (destId) => {
    window.dispatchEvent(new CustomEvent('select-destination', { detail: { destId } }))
    const el = document.getElementById('beranda')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="destinasi" className="section destination-section">
      <SectionHeader badge="Destinasi" title="Destinasi Wisata" desc="Jelajahi situs-situs bersejarah yang menyimpan kisah kejayaan Kerajaan Riau-Lingga." />

      <div className="destination-grid">
        {destinations.slice(0, 4).map((dest) => (
          <article key={dest.id} className="destination-card">
            <div className="destination-card__visual image-visual">
              <img
                src={fallbackImages[dest.id] || dest.image}
                alt={dest.name}
                loading="lazy"
                onError={(e) => { e.currentTarget.src = fallbackImages[dest.id] || '/images/gallery-laut.svg' }}
              />
              <span className="destination-card__tag">{dest.category}</span>
            </div>
            <div className="destination-card__body">
              <h3>{dest.name}</h3>
              <p>{dest.shortDesc}</p>
              <button className="btn-outline" onClick={() => showInHeroMap(dest.id)}>Lihat di Peta →</button>
            </div>
          </article>
        ))}
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

export default DestinationSection
