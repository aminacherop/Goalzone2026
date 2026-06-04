import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import scoresRouter from './routes/scores.js'
import predictRouter from './routes/predict.js'

dotenv.config({ path: '../.env' })

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/scores',  scoresRouter)
app.use('/api/predict', predictRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`✅ GoalZone API running on http://localhost:${PORT}`)
})
