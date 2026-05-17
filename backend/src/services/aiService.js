import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildContext } from './ragService.js'

const SYSTEM_PROMPT = `Kamu adalah Pak Cik Penyengat, asisten wisata AI untuk website Smart Tourism Pulau Penyengat.
Tugasmu membantu wisatawan memahami destinasi, budaya, sejarah, transportasi, dan rute wisata.
Gunakan Bahasa Indonesia yang jelas, ramah, dan ringkas.
Jika ada konteks RAG, jadikan konteks tersebut sebagai rujukan utama.
Jika informasi tidak ada di knowledge base, jawab secara hati-hati dan sarankan konfirmasi ke pengelola wisata setempat.`

function hasApiKey() {
  const key = process.env.GEMINI_API_KEY
  return key && !key.includes('isi_api_key') && key.length > 20
}

function fallbackReply(message, contextItems) {
  if (!contextItems.length) {
    return 'Saya belum menemukan data yang cocok di knowledge base lokal. Coba tanyakan tentang Masjid Raya Sultan Riau, Benteng Bukit Kursi, Makam Raja Ali Haji, transportasi pompong, atau rute wisata Pulau Penyengat.'
  }

  const top = contextItems[0]
  const bullets = contextItems.slice(0, 3).map((item) => `- ${item.title || item.name}: ${item.summary || item.description}`).join('\n')
  return `Berdasarkan knowledge base lokal, informasi yang paling relevan adalah ${top.title || top.name}.\n\n${bullets}\n\nMode ini memakai fallback lokal karena Gemini API belum aktif atau sedang bermasalah.`
}

export const aiService = {
  async chat({ message, history = [], contextItems = [] }) {
    if (!hasApiKey()) {
      return fallbackReply(message, contextItems)
    }

    try {
      const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: modelName })
      const context = buildContext(contextItems)

      const safeHistory = history
        .filter((item) => item?.text && ['user', 'assistant'].includes(item.role))
        .slice(-8)
        .map((item) => ({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.text }]
        }))

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: 'Siap. Saya akan menjawab sebagai Pak Cik Penyengat.' }] },
          ...safeHistory
        ]
      })

      const prompt = `Konteks RAG:\n${context}\n\nPertanyaan pengguna:\n${message}`
      const result = await chat.sendMessage(prompt)
      return result.response.text()
    } catch (error) {
      console.error('❌ Gemini error full:', error)
      return fallbackReply(message, contextItems)
    }
  }
}
