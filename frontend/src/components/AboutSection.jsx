import React from 'react'
function AboutSection() {
  const items = [
    { title: 'Sejarah', desc: 'Warisan Kerajaan Riau-Lingga', icon: '🏛️' },
    { title: 'Budaya', desc: 'Pusat kebudayaan Melayu', icon: '🎭' },
    { title: 'Wisata', desc: 'Destinasi menarik beragam', icon: '🗺️' },
    { title: 'Kuliner', desc: 'Aneka makanan khas Melayu', icon: '🍽️' }
  ]

  return (
    <section id="tentang" className="section about-section">
      <div className="about-layout">
        <div className="about-visual-card">
          <div className="about-visual-card__image">
            <img src="/images/penyengat-about.svg" alt="Ilustrasi Pulau Penyengat" />
            <span>Pulau Penyengat dari udara</span>
          </div>
          <div className="about-badge">
            <span>🏅</span>
            <div>
              <strong>UNESCO</strong>
              <small>Warisan Budaya</small>
            </div>
          </div>
        </div>

        <div className="about-content">
          <SectionLabel text="Tentang" />
          <h2 className="section-title section-title--left">Tentang Pulau Penyengat</h2>
          <GoldDivider align="left" />

          <p>Pulau Penyengat merupakan pulau kecil yang berada di Kota Tanjungpinang, Kepulauan Riau. Pulau ini merupakan pusat kebudayaan Melayu dan memiliki nilai sejarah yang tinggi bagi Kerajaan Riau-Lingga.</p>
          <p>Di pulau ini terdapat banyak peninggalan sejarah seperti Masjid Raya Sultan Riau, Makam Raja Ali Haji, Benteng Bukit Kursi, dan berbagai situs bersejarah lainnya.</p>
          <p>Pulau Penyengat menjadi destinasi wisata yang menarik bagi wisatawan yang ingin mengenal lebih dekat sejarah dan budaya Melayu.</p>

          <div className="about-mini-grid">
            {items.map((item) => (
              <article className="about-mini-card" key={item.title}>
                <span>{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.desc}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionLabel({ text }) {
  return <span className="section-badge"><span /> {text}</span>
}

function GoldDivider({ align = 'center' }) {
  return <div className={`gold-divider ${align === 'left' ? 'gold-divider--left' : ''}`}><span>✦</span></div>
}

export default AboutSection
