import React from 'react'
function ContactSection() {
  return (
    <>
      <section id="kontak" className="section contact-page-section">
        <div className="section-heading">
          <span className="section-badge"><span /> Kontak</span>
          <h2 className="section-title">Kontak & Kritik Saran</h2>
          <div className="gold-divider"><span>✦</span></div>
          <p>Ada pertanyaan atau masukan? Kami senang mendengar dari Anda.</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <h3>Hubungi Kami</h3>
            <div className="gold-divider gold-divider--left"><span>✦</span></div>
            <ContactItem icon="📍" text="Pulau Penyengat, Tanjungpinang, Kepulauan Riau" />
            <ContactItem icon="📞" text="+62 812-3456-7890" />
            <ContactItem icon="✉️" text="info@explorepenyengat.id" />
            <ContactItem icon="📷" text="@explorepenyengat" />
            <ContactItem icon="🌐" text="explorepenyengat" />
            <div className="contact-socials">
              <span>f</span><span>ig</span><span>tt</span><span>yt</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              <span>Nama Lengkap</span>
              <input placeholder="Masukkan nama Anda" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" placeholder="email@contoh.com" />
            </label>
            <label>
              <span>Pesan / Kritik & Saran</span>
              <textarea placeholder="Tuliskan pesan atau saran Anda..." rows="5" />
            </label>
            <button className="btn-primary" type="submit">Kirim Pesan</button>
          </form>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span>🕌</span>
              <div>
                <small>Explore</small>
                <strong>Penyengat</strong>
              </div>
            </div>
            <p>Jelajahi keindahan wisata sejarah dan budaya Melayu di Pulau Penyengat, permata Kepulauan Riau.</p>
            <div className="footer-socials"><span>f</span><span>ig</span><span>tt</span><span>yt</span></div>
          </div>

          <div>
            <h4>Menu</h4>
            <a href="#beranda">Beranda</a>
            <a href="#tentang">Tentang</a>
            <a href="#budaya">Budaya</a>
            <a href="#destinasi">Wisata</a>
            <a href="#kuliner">Kuliner</a>
            <a href="#galeri">Galeri</a>
            <a href="#kontak">Kontak</a>
          </div>

          <div>
            <h4>Destinasi</h4>
            <a href="#beranda">Masjid Raya Sultan Riau</a>
            <a href="#beranda">Benteng Bukit Kursi</a>
            <a href="#beranda">Makam Raja Ali Haji</a>
            <a href="#beranda">Balai Adat</a>
            <a href="#beranda">Istana Kantor</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Explore Penyengat. All Rights Reserved.</span>
          <span>Made with love in Tanjungpinang</span>
        </div>
      </footer>
    </>
  )
}

function ContactItem({ icon, text }) {
  return (
    <div className="contact-item">
      <span>{icon}</span>
      <p>{text}</p>
    </div>
  )
}

export default ContactSection
