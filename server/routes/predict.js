import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
  const { team1, team2, stage } = req.body

  if (!team1 || !team2) {
    return res.status(400).json({ error: 'Missing team1 or team2' })
  }

  const prompt = `You are an expert football analyst for the 2026 FIFA World Cup.
Predict: ${team1.name} vs ${team2.name} (${stage || 'Group Stage'})
Respond ONLY in this exact JSON format (no markdown, no extra text):
{
  "score_home": 2,
  "score_away": 1,
  "winner": "${team1.name}",
  "prob_home": 54,
  "prob_draw": 22,
  "prob_away": 24,
  "over25": "✅ Yes",
  "btts": "✅ Yes",
  "total_goals": 3,
  "analysis": "3-5 sentence expert analysis covering form, tactics, key matchups and why this result is likely.",
  "form": {
    "home": ["W","W","D","L","W"],
    "away": ["W","L","W","W","D"]
  },
  "h2h": { "home_wins": 5, "draws": 3, "away_wins": 4 },
  "key_players": ["Player 1 (${team1.name})", "Player 2 (${team2.name})", "Player 3"],
  "scorers": ["Player A 34'", "Player B 67'", "Player C 55'"]
}`

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'Groq API error' })
    }

    const raw    = data.choices?.[0]?.message?.content || ''
    const clean  = raw.replace(/```json|```/g, '').trim()
    const result = JSON.parse(clean)

    return res.status(200).json(result)

  } catch (err) {
    console.error('Predict error:', err.message)
    return res.status(500).json({ error: err.message })
  }
})

export default router