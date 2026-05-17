import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const KB_DIR = join(__dirname, '../data/knowledge-base')

function loadJson(filename) {
  try {
    const raw = readFileSync(join(KB_DIR, filename), 'utf-8')
    return JSON.parse(raw)
  } catch (error) {
    console.warn(`Knowledge file ${filename} tidak terbaca:`, error.message)
    return []
  }
}

const items = [
  ...loadJson('destinations.json'),
  ...loadJson('culture.json'),
  ...loadJson('faq.json')
]

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gi, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2)
}

function itemText(item) {
  return [
    item.title,
    item.name,
    item.type,
    item.category,
    item.location,
    item.summary,
    item.description,
    ...(item.keywords || [])
  ].join(' ')
}

export function searchKnowledgeBase(query, limit = 5) {
  const queryTokens = tokenize(query)
  if (!queryTokens.length) return []

  return items
    .map((item) => {
      const text = itemText(item).toLowerCase()
      const score = queryTokens.reduce((total, token) => {
        if (text.includes(token)) return total + (token.length > 4 ? 2 : 1)
        return total
      }, 0)
      return { ...item, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function buildContext(contextItems) {
  if (!contextItems.length) return 'Tidak ada konteks spesifik dari knowledge base.'

  return contextItems.map((item, index) => {
    return [
      `Sumber ${index + 1}: ${item.title || item.name}`,
      `Jenis: ${item.type || '-'}`,
      `Kategori: ${item.category || '-'}`,
      `Lokasi: ${item.location || '-'}`,
      `Ringkasan: ${item.summary || item.description || '-'}`
    ].join('\n')
  }).join('\n\n---\n\n')
}

export function getAllKnowledgeItems() {
  return items
}

export function getKnowledgeBaseStats() {
  const byType = items.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1
    return acc
  }, {})
  return { total: items.length, byType }
}
