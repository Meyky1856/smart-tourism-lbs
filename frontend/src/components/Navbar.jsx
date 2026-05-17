import React from 'react'
function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const menus = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'budaya', label: 'Budaya' },
    { id: 'destinasi', label: 'Wisata' },
    { id: 'kuliner', label: 'Kuliner' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'kontak', label: 'Kontak' }
  ]

  return (
    <header className="navbar">
      <button className="navbar__brand" onClick={() => scrollTo('beranda')}>
        <span className="navbar__logo">🕌</span>
        <span className="navbar__brand-text">
          <small>Explore</small>
          <strong>Penyengat</strong>
        </span>
      </button>

      <nav className="navbar__links" aria-label="Menu utama">
        {menus.map((item) => (
          <button key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</button>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
