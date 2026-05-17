import React from 'react'
const culinaryItems = [
  { title: 'Gonggong', desc: 'Siput laut khas yang diolah dengan bumbu pedas gurih, ikon kuliner Kepulauan Riau.', image: '/images/gonggong.svg' },
  { title: 'Lakse', desc: 'Mie khas Melayu dengan kuah santan yang gurih dan kaya rempah pilihan.', image: '/images/lakse.svg' },
  { title: 'Otak-otak', desc: 'Ikan tenggiri segar dibungkus daun pisang lalu dibakar hingga harum sempurna.', image: '/images/otak-otak.svg' },
  { title: 'Nasi Dagang', desc: 'Nasi khas Melayu yang disajikan dengan lauk ikan dan kuah gulai yang sedap.', image: '/images/nasi-dagang.svg' }
]

function CulinarySection() {
  return (
    <section id="kuliner" className="section culinary-section">
      <SectionHeader badge="Kuliner" title="Kuliner Khas Penyengat" desc="Cita rasa autentik Melayu yang menggugah selera dan wajib dicoba." />

      <div className="culinary-grid">
        {culinaryItems.map((item) => (
          <article className="culinary-card" key={item.title}>
            <div className="culinary-card__visual image-visual">
              <img src={item.image} alt={item.title} loading="lazy" />
              <small>{item.title}</small>
            </div>
            <div className="culinary-card__body">
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

export default CulinarySection
