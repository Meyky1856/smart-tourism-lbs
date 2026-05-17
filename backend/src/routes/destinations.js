import express from 'express'
import { getAllKnowledgeItems } from '../services/ragService.js'

const router = express.Router()

router.get('/', (req, res) => {
  const items = getAllKnowledgeItems().filter((item) => item.type === 'destination')
  res.json({ data: items })
})

export default router
