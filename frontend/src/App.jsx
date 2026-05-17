import React from 'react'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import CultureSection from './components/CultureSection.jsx'
import DestinationSection from './components/DestinationSection.jsx'
import CulinarySection from './components/CulinarySection.jsx'
import GallerySection from './components/GallerySection.jsx'
import ContactSection from './components/ContactSection.jsx'
import ChatWidget from './components/ChatWidget.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <CultureSection />
        <DestinationSection />
        <CulinarySection />
        <GallerySection />
        <ContactSection />
      </main>
      <ChatWidget />
    </>
  )
}

export default App
