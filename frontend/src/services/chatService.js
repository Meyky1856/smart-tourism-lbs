const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const chatService = {
  async sendMessage(message, history = []) {
    const formattedHistory = history
      .filter((msg) => msg.id !== 'welcome')
      .map((msg) => ({ role: msg.role, text: msg.text }))

    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: formattedHistory })
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.error || 'Gagal menghubungi AI Assistant')
    }

    return data.reply
  }
}
