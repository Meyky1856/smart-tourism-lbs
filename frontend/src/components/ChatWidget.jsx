import React, { useEffect, useRef, useState } from 'react'
import { chatService } from '../services/chatService.js'

const botImage = '/bot-assistant.svg'

const welcomeMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Halo! Saya Pak Cik Penyengat. Tanya saya tentang destinasi, budaya, sejarah, transportasi, atau rute wisata di Pulau Penyengat.'
}

const suggestions = [
  'Apa saja destinasi wajib di Pulau Penyengat?',
  'Bagaimana cara ke Pulau Penyengat?',
  'Ceritakan sejarah Masjid Sultan Riau',
  'Buatkan rute wisata singkat untuk pemula',
  'Kuliner apa yang wajib dicoba?',
  'Apa budaya Melayu yang terkenal?',
  'Bagaimana rute dari pelabuhan ke masjid?'
]

function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([welcomeMessage])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-chat', handler)
    return () => window.removeEventListener('open-chat', handler)
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const sendText = async (text) => {
    const value = text.trim()
    if (!value || loading) return

    const userMsg = { id: createId(), role: 'user', text: value }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const reply = await chatService.sendMessage(value, nextMessages)
      setMessages((current) => [...current, { id: createId(), role: 'assistant', text: reply }])
    } catch (error) {
      setMessages((current) => [...current, {
        id: createId(),
        role: 'assistant',
        text: 'Maaf, AI sedang mengalami gangguan. Pastikan backend berjalan dan GEMINI_API_KEY sudah benar.'
      }])
    } finally {
      setLoading(false)
    }
  }

  const send = async (event) => {
    event.preventDefault()
    sendText(input)
  }

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`}>
      {open && (
        <section className="chat-panel" aria-label="AI Assistant">
          <header>
            <div className="chat-panel__identity">
              <img className="chat-panel__avatar" src={botImage} alt="Bot AI" />
              <div>
                <strong>Pak Cik Penyengat</strong>
                <span>AI Wisata + RAG</span>
              </div>
            </div>
            <button className="chat-panel__close" type="button" onClick={() => setOpen(false)} aria-label="Tutup AI Assistant">×</button>
          </header>

          <div className="chat-list" ref={listRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-message assistant">Sedang menyiapkan jawaban...</div>}
          </div>

          <div className="chat-suggestions" aria-label="Rekomendasi pertanyaan">
            {suggestions.map((question) => (
              <button key={question} type="button" onClick={() => sendText(question)} disabled={loading}>
                {question}
              </button>
            ))}
          </div>

          <form onSubmit={send} className="chat-form">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang Penyengat..."
            />
            <button type="submit" disabled={loading}>Kirim</button>
          </form>
        </section>
      )}

      {!open && (
        <button className="chat-toggle" onClick={() => setOpen(true)} aria-label="Buka AI Assistant">
          <img className="chat-toggle__bot" src={botImage} alt="Bot AI" />
        </button>
      )}
    </div>
  )
}

export default ChatWidget
