import { aiService } from '../services/aiService.js'
import { searchKnowledgeBase } from '../services/ragService.js'

export async function sendMessage(req, res) {
  try {
    const { message, history = [] } = req.body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong' })
    }

    console.log(`💬 Pesan masuk: "${message.slice(0, 80)}..."`)
    const contextItems = searchKnowledgeBase(message)
    console.log(`📚 RAG: ${contextItems.length} dokumen ditemukan`)

    const reply = await aiService.chat({ message, history, contextItems })

    res.json({
      reply,
      sources: contextItems.map((item) => ({ id: item.id, title: item.title || item.name, type: item.type }))
    })
  } catch (error) {
    console.error('❌ Chat error:', error)
    res.status(500).json({
      error: 'Gagal memproses pesan',
      reply: 'Maaf, saya sedang mengalami gangguan. Pastikan backend berjalan dan API key Gemini benar.'
    })
  }
}
