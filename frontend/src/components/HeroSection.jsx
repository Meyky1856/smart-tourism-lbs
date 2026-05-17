import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import { destinations, PENYENGAT_CENTER, PENYENGAT_ZOOM } from '../data/destinations.js'
import { calculateRoute, findNearestNode } from '../utils/astar.js'
import { routeNodes } from '../data/routeGraph.js'
import '../styles/hero.css'

const destIcon = new L.DivIcon({
  className: '',
  html: '<div class="hero__marker"><div class="hero__marker-dot"></div></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14]
})

const activeDestIcon = new L.DivIcon({
  className: '',
  html: '<div class="hero__marker hero__marker--active"><div class="hero__marker-dot"></div></div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
})

const userIcon = new L.DivIcon({
  className: '',
  html: '<div class="hero__user-marker"><div class="hero__user-pulse"></div></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 11]
})

function HeroSection() {
  const mapBoxRef = useRef(null)
  const mapRef = useRef(null)
  const destinationLayerRef = useRef(null)
  const userLayerRef = useRef(null)
  const routeLayerRef = useRef(null)

  const [selectedId, setSelectedId] = useState(destinations[0].id)
  const [query, setQuery] = useState('')
  const [flyTarget, setFlyTarget] = useState([PENYENGAT_CENTER.lat, PENYENGAT_CENTER.lng])
  const [userPos, setUserPos] = useState(null)
  const [locating, setLocating] = useState(false)
  const [locError, setLocError] = useState(false)
  const [route, setRoute] = useState(null)
  const [routeStatus, setRouteStatus] = useState('Pilih tempat rekomendasi, lalu buat rute dari Pelabuhan Penyengat atau posisi Anda.')

  const selectedDestination = useMemo(
    () => destinations.find((item) => item.id === selectedId) || destinations[0],
    [selectedId]
  )

  const filteredDestinations = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return destinations

    return destinations.filter((dest) => {
      const text = `${dest.name} ${dest.category} ${dest.location} ${dest.shortDesc}`.toLowerCase()
      return text.includes(value)
    })
  }, [query])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const selectDestination = useCallback((dest) => {
    setSelectedId(dest.id)
    setFlyTarget([dest.coordinates.lat, dest.coordinates.lng])
    setRoute(null)
    setRouteStatus(`Tujuan dipilih: ${dest.name}. Klik Buat Rute A* untuk melihat jalur.`)
  }, [])

  useEffect(() => {
    const handler = (event) => {
      const destId = event.detail?.destId
      const dest = destinations.find((item) => item.id === destId)
      if (dest) selectDestination(dest)
    }

    window.addEventListener('select-destination', handler)
    return () => window.removeEventListener('select-destination', handler)
  }, [selectDestination])

  useEffect(() => {
    if (!mapBoxRef.current || mapRef.current) return

    const map = L.map(mapBoxRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true
    }).setView([PENYENGAT_CENTER.lat, PENYENGAT_CENTER.lng], PENYENGAT_ZOOM)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
    }).addTo(map)

    destinationLayerRef.current = L.layerGroup().addTo(map)
    userLayerRef.current = L.layerGroup().addTo(map)
    routeLayerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    setTimeout(() => map.invalidateSize(), 250)

    return () => {
      map.remove()
      mapRef.current = null
      destinationLayerRef.current = null
      userLayerRef.current = null
      routeLayerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !destinationLayerRef.current) return

    destinationLayerRef.current.clearLayers()
    destinations.forEach((dest) => {
      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], {
        icon: dest.id === selectedId ? activeDestIcon : destIcon
      })
        .bindPopup(`<strong>${dest.name}</strong><br><span>${dest.shortDesc}</span>`)
        .on('click', () => selectDestination(dest))

      marker.addTo(destinationLayerRef.current)
    })
  }, [selectedId, selectDestination])

  useEffect(() => {
    if (!mapRef.current) return

    if (route?.coordinates?.length) {
      mapRef.current.fitBounds(route.coordinates, { padding: [34, 34] })
      return
    }

    if (flyTarget) {
      mapRef.current.flyTo(flyTarget, 16, { duration: 1.1 })
    }
  }, [flyTarget, route])

  useEffect(() => {
    if (!userLayerRef.current) return

    userLayerRef.current.clearLayers()
    if (!userPos) return

    L.marker([userPos.lat, userPos.lng], { icon: userIcon })
      .bindPopup('Posisi Anda')
      .addTo(userLayerRef.current)

    L.circle([userPos.lat, userPos.lng], {
      radius: 42,
      color: '#2563eb',
      fillColor: '#2563eb',
      fillOpacity: 0.12,
      weight: 1.5
    }).addTo(userLayerRef.current)
  }, [userPos])

  useEffect(() => {
    if (!routeLayerRef.current) return

    routeLayerRef.current.clearLayers()
    if (!route?.coordinates?.length) return

    L.polyline(route.coordinates, {
      color: '#b8782a',
      weight: 5,
      opacity: 0.9
    }).addTo(routeLayerRef.current)
  }, [route])

  const handleLocateSuccess = useCallback((coords) => {
    setLocating(false)
    setUserPos(coords)
    setLocError(false)
    setRoute(null)
    setFlyTarget([coords.lat, coords.lng])
    setRouteStatus('Posisi berhasil ditemukan. Pilih tujuan, lalu klik Buat Rute A*.')
  }, [])

  const handleLocateError = useCallback(() => {
    setLocating(false)
    setLocError(true)
    setRouteStatus('Posisi tidak terbaca. Sistem akan memakai Pelabuhan Penyengat sebagai titik awal demo.')
  }, [])

  const startLocate = () => {
    if (!navigator.geolocation) {
      handleLocateError()
      return
    }

    setLocating(true)
    setLocError(false)
    setRouteStatus('Melacak posisi Anda...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleLocateSuccess({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      handleLocateError,
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const createRoute = () => {
    const start = userPos ? findNearestNode(userPos) : routeNodes.pelabuhan
    const result = calculateRoute(start.id, selectedDestination.routeNodeId)

    if (!result) {
      setRoute(null)
      setRouteStatus('Rute belum tersedia untuk tujuan ini. Perlu penyesuaian graf manual.')
      return
    }

    setRoute(result)
    setRouteStatus(`Rute ${start.name} ke ${selectedDestination.name}: ${result.distance} meter.`)
  }

  return (
    <section id="beranda" className="hero">
      <div className="hero__shade" />

      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span>✦</span>
            Pulau wisata bersejarah
          </div>

          <span className="hero__label">Jelajahi</span>
          <h1 className="hero__title">Pulau<br />Penyengat</h1>

          <p className="hero__desc">
            Temukan destinasi sejarah, budaya Melayu, kuliner lokal, dan rute wisata cerdas
            berbasis Location Based Service di Pulau Penyengat.
          </p>

          <div className="hero__actions">
            <button className="btn-primary" onClick={() => scrollToSection('destinasi')}>Jelajahi Sekarang</button>
            <button className="btn-secondary hero__btn-secondary" onClick={() => scrollToSection('tentang')}>Tentang Project</button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">8<span>+</span></span>
              <span className="hero__stat-label">Destinasi</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">A<span>*</span></span>
              <span className="hero__stat-label">Rute Cerdas</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">AI</span>
              <span className="hero__stat-label">Asisten Wisata</span>
            </div>
          </div>
        </div>

        <div className="hero__map-wrap">
          <div className="hero__map-card">
            <div className="hero__map-header">
              <div>
                <span className="hero__map-kicker">Peta & Rekomendasi</span>
                <h2>Pulau Penyengat</h2>
              </div>
              <span className="hero__live-badge"><span /> Live Map</span>
            </div>

            <div className="hero__search-row">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari masjid, makam, benteng..."
                aria-label="Cari destinasi"
              />
              <button type="button" onClick={startLocate} className={locError ? 'is-error' : ''}>
                {locating ? 'Melacak...' : locError ? 'Coba Lagi' : 'Lacak Posisi'}
              </button>
            </div>

            <div className="hero__map-box" ref={mapBoxRef} aria-label="Peta Pulau Penyengat" />

            <div className="hero__route-panel">
              <div>
                <span>Tujuan aktif</span>
                <strong>{selectedDestination.name}</strong>
              </div>
              <button type="button" onClick={createRoute}>Buat Rute A*</button>
            </div>

            <p className="hero__route-status">{routeStatus}</p>

            {route && (
              <div className="hero__route-list">
                <strong>Urutan jalur:</strong>
                <span>{route.nodeNames.join(' → ')}</span>
              </div>
            )}

            <div className="hero__recommendation-title">Rekomendasi tempat</div>
            <div className="hero__recommendations">
              {filteredDestinations.slice(0, 5).map((dest) => (
                <button
                  type="button"
                  key={dest.id}
                  className={`hero__place ${selectedId === dest.id ? 'active' : ''}`}
                  onClick={() => selectDestination(dest)}
                >
                  <span className="hero__place-icon">{getDestinationIcon(dest.category)}</span>
                  <span>
                    <strong>{dest.name}</strong>
                    <small>{dest.category} · {dest.location}</small>
                  </span>
                </button>
              ))}

              {filteredDestinations.length === 0 && (
                <div className="hero__empty-result">Destinasi tidak ditemukan.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getDestinationIcon(category) {
  if (category === 'Religi') return '🕌'
  if (category === 'Sejarah') return '🏛️'
  if (category === 'Budaya') return '🎭'
  if (category === 'Transportasi') return '⛵'
  if (category === 'Alam') return '🌊'
  return '📍'
}

export default HeroSection
