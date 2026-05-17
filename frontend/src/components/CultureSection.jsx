import React from 'react'
const budayaItems = [
  { title: 'Pakaian Adat', desc: 'Pakaian tradisional Melayu yang dikenakan dalam berbagai upacara adat hingga saat ini.', image: '/images/budaya-pakaian.svg' },
  { title: 'Tarian Tradisional', desc: 'Tarian Melayu yang anggun dan penuh makna budaya yang terus dilestarikan.', image: '/images/budaya-tarian.svg' },
  { title: 'Gurindam Dua Belas', desc: 'Karya sastra Melayu karya Raja Ali Haji yang terkenal hingga mancanegara.', image: '/images/budaya-gurindam.svg' },
  { title: 'Musik Tradisional', desc: 'Alat musik tradisional Melayu seperti gambus, kompang, dan gendang masih dimainkan.', image: '/images/budaya-musik.svg' }
]

function CultureSection() {
  return (
    <section id="budaya" className="section budaya-section">
      <SectionHeader badge="Tradisi" title="Budaya Melayu" desc="Warisan budaya yang terus hidup dan dijaga oleh masyarakat Pulau Penyengat." />

      <div className="budaya-grid">
        {budayaItems.map((item) => (
          <article className="budaya-card" key={item.title}>
            <div className="budaya-card__visual image-visual">
              <img src={item.image} alt={item.title} loading="lazy" />
              <small>{item.title}</small>
            </div>
            <div className="budaya-card__body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
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

export default CultureSection
