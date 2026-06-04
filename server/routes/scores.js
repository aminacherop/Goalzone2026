import express from 'express'

const router = express.Router()
const WC_ID  = 2000

// ── IN-MEMORY CACHE ───────────────────────────────────────
let cache = { data: null, timestamp: 0 }
const TTL = 60000 // 60 seconds

router.get('/', async (req, res) => {
  // Return cached data if still fresh
  if (cache.data && Date.now() - cache.timestamp < TTL) {
    return res.json({ ...cache.data, cached: true })
  }

  // Fetch from today up to end of World Cup (July 19 2026)
  const today  = new Date().toISOString().split('T')[0]
  const endWC  = '2026-07-19'

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${WC_ID}/matches?dateFrom=${today}&dateTo=${endWC}&status=SCHEDULED,LIVE,IN_PLAY,PAUSED,FINISHED`,
      { headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY } }
    )

    if (response.status === 429) {
      // Rate limited — return cached if available
      if (cache.data) return res.json({ ...cache.data, cached: true })
      return res.status(429).json({ error: 'Rate limit reached. Try again soon.' })
    }

    if (!response.ok) {
      const errBody = await response.text()
      console.error('Football API response:', errBody)
      throw new Error(`Football API error: ${response.status} — ${errBody}`)
    }

    const data = await response.json()
    console.log(`✅ Fetched ${data.matches?.length || 0} matches from football-data.org`)
    console.log(`📅 Date range: ${today} → ${endWC}`)

    // Update cache
    cache = { data, timestamp: Date.now() }

    return res.json(data)

  } catch (err) {
    console.error('Scores error:', err.message)
    // Return stale cache if available
    if (cache.data) return res.json({ ...cache.data, cached: true })
    return res.status(500).json({ error: err.message })
  }
})

export default router