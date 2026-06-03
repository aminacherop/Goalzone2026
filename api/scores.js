// ── VERCEL SERVERLESS FUNCTION ────────────────────────────
// Proxies football-data.org API to avoid CORS issues

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  const { dateFrom, dateTo } = req.query
  const WC_ID = 2000

  const today    = dateFrom || new Date().toISOString().split('T')[0]
  const nextWeek = dateTo   || new Date(Date.now() + 7*86400000).toISOString().split('T')[0]

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${WC_ID}/matches?dateFrom=${today}&dateTo=${nextWeek}`,
      {
        headers: {
          'X-Auth-Token': process.env.FOOTBALL_API_KEY
        }
      }
    )

    if (response.status === 429) {
      return res.status(429).json({ error: 'Rate limit reached. Try again in a minute.' })
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: `API error: ${response.status}` })
    }

    const data = await response.json()
    return res.status(200).json(data)

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}