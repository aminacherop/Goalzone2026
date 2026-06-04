import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import scoresRouter from './routes/scores.js'
import predictRouter from './routes/predict.js'

dotenv.config({ path: '../.env' })

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://goalzone2026-1s4hyij2g-amina-s-projects11.vercel.app',
    'https://goalzone2026.vercel.app'
  ]
}))
app.use(express.json())

// ── ROUTES ────────────────────────────────────────────────
app.use('/api/scores',  scoresRouter)
app.use('/api/predict', predictRouter)

// ── HEALTH CHECK ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`✅ GoalZone API running on http://localhost:${PORT}`)
})