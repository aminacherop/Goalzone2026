import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'

// ── FLAG MAP ──────────────────────────────────────────────
const FLAGS = {
  'Argentina':'🇦🇷','Australia':'🇦🇺','Austria':'🇦🇹','Belgium':'🇧🇪',
  'Bosnia and Herzegovina':'🇧🇦','Brazil':'🇧🇷','Cameroon':'🇨🇲',
  'Canada':'🇨🇦','Chile':'🇨🇱','China PR':'🇨🇳','Colombia':'🇨🇴',
  'Czechia':'🇨🇿','Ecuador':'🇪🇨','Egypt':'🇪🇬','El Salvador':'🇸🇻',
  'England':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','France':'🇫🇷','Germany':'🇩🇪','Hungary':'🇭🇺',
  'Indonesia':'🇮🇩','Iran':'🇮🇷','Iraq':'🇮🇶','Japan':'🇯🇵',
  'Jordan':'🇯🇴','Mexico':'🇲🇽','Morocco':'🇲🇦','Netherlands':'🇳🇱',
  'New Zealand':'🇳🇿','Nigeria':'🇳🇬','Norway':'🇳🇴','Panama':'🇵🇦',
  'Paraguay':'🇵🇾','Peru':'🇵🇪','Portugal':'🇵🇹','Qatar':'🇶🇦',
  'Saudi Arabia':'🇸🇦','Scotland':'🏴󠁧󠁢󠁳󠁣󠁴󠁿','Senegal':'🇸🇳',
  'South Africa':'🇿🇦','Korea Republic':'🇰🇷','Spain':'🇪🇸',
  'Switzerland':'🇨🇭','Tunisia':'🇹🇳','Türkiye':'🇹🇷',
  'Ukraine':'🇺🇦','Uruguay':'🇺🇾','USA':'🇺🇸',
}
const getFlag = (name) => FLAGS[name] || '🏳️'

// ── SMART CACHE ───────────────────────────────────────────
// Stores data in memory — 1 fetch per minute max
// All users share the same cached data
const cache = {
  data: null,
  timestamp: 0,
  TTL: 60000, // 60 seconds
  isValid() { return this.data && (Date.now() - this.timestamp) < this.TTL },
  set(data) { this.data = data; this.timestamp = Date.now() },
  get() { return this.isValid() ? this.data : null }
}

// ── STATUS HELPERS ────────────────────────────────────────
const mapStatus = (status) => {
  const live = ['IN_PLAY','PAUSED','HALF_TIME']
  const done = ['FINISHED']
  if (live.includes(status)) return 'live'
  if (done.includes(status)) return 'finished'
  return 'upcoming'
}

const STATUS_STYLE = {
  live:     'bg-red-50 text-red-600 animate-pulse',
  finished: 'bg-green-50 text-green-700',
  upcoming: 'bg-gray-100 text-gray-500',
}

const STATUS_LABEL = {
  live:     (min) => `🔴 ${min || 'LIVE'}'`,
  finished: () => '✅ FT',
  upcoming: () => '🕐 Soon',
}

const BORDER_STYLE = {
  live:     'border-l-4 border-l-red-500 bg-red-50/20',
  finished: 'border-l-4 border-l-green-500',
  upcoming: 'border-l-4 border-l-gray-300',
}

// ── DEMO MATCHES ──────────────────────────────────────────
const DEMO_MATCHES = [
  { id:1, home:{name:'Mexico',flag:'🇲🇽'}, away:{name:'South Africa',flag:'🇿🇦'}, homeScore:'-', awayScore:'-', status:'upcoming', minute:null, date:'2026-06-11', time:'3:00 PM ET', venue:'Azteca, Mexico City', group:'Group Stage - Group A' },
  { id:2, home:{name:'Canada',flag:'🇨🇦'}, away:{name:'Bosnia and Herzegovina',flag:'🇧🇦'}, homeScore:'-', awayScore:'-', status:'upcoming', minute:null, date:'2026-06-12', time:'6:00 PM ET', venue:'BMO Field, Toronto', group:'Group Stage - Group B' },
  { id:3, home:{name:'USA',flag:'🇺🇸'}, away:{name:'Paraguay',flag:'🇵🇾'}, homeScore:'-', awayScore:'-', status:'upcoming', minute:null, date:'2026-06-12', time:'9:00 PM ET', venue:'LA Stadium', group:'Group Stage - Group D' },
  { id:4, home:{name:'Brazil',flag:'🇧🇷'}, away:{name:'Germany',flag:'🇩🇪'}, homeScore:'-', awayScore:'-', status:'upcoming', minute:null, date:'2026-06-13', time:'3:00 PM ET', venue:'MetLife, New York', group:'Group Stage - Group L' },
  { id:5, home:{name:'Spain',flag:'🇪🇸'}, away:{name:'Scotland',flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'}, homeScore:'-', awayScore:'-', status:'upcoming', minute:null, date:'2026-06-14', time:'12:00 PM ET', venue:'AT&T Stadium, Dallas', group:'Group Stage - Group E' },
  { id:6, home:{name:'Argentina',flag:'🇦🇷'}, away:{name:'Norway',flag:'🇳🇴'}, homeScore:'-', awayScore:'-', status:'upcoming', minute:null, date:'2026-06-14', time:'3:00 PM ET', venue:'Rose Bowl, LA', group:'Group Stage - Group C' },
  { id:7, home:{name:'France',flag:'🇫🇷'}, away:{name:'Cameroon',flag:'🇨🇲'}, homeScore:'-', awayScore:'-', status:'upcoming', minute:null, date:'2026-06-15', time:'9:00 PM ET', venue:'Hard Rock, Miami', group:'Group Stage - Group I' },
  { id:8, home:{name:'Portugal',flag:'🇵🇹'}, away:{name:'Uruguay',flag:'🇺🇾'}, homeScore:'-', awayScore:'-', status:'upcoming', minute:null, date:'2026-06-15', time:'3:00 PM ET', venue:'SoFi Stadium, LA', group:'Group Stage - Group F' },
]

export default function Scores() {
  const [filter, setFilter]           = useState('all')
  const [matches, setMatches]         = useState([])
  const [loading, setLoading]         = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')
  const [isLive, setIsLive]           = useState(false)
  const [error, setError]             = useState('')
  const [cacheHit, setCacheHit]       = useState(false)
  const intervalRef                   = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY

  // ── FETCH MATCHES ───────────────────────────────────────
  const fetchMatches = async (force = false) => {
    // Check cache first
    if (!force && cache.isValid()) {
      setMatches(cache.get())
      setCacheHit(true)
      setLoading(false)
      return
    }

    setCacheHit(false)

    

    try {
      const today  = new Date().toISOString().split('T')[0]
      const endWC  = '2026-07-19'

      const res = await fetch(
        `${API_URL}/api/scores?dateFrom=${today}&dateTo=${endWC}`
      )

      if (res.status === 429) {
        const cached = cache.get()
        if (cached) { setMatches(cached); setCacheHit(true) }
        else setMatches(DEMO_MATCHES)
        setError('Rate limit reached — showing cached data')
        setLoading(false)
        return
      }

      if (!res.ok) throw new Error(`API error: ${res.status}`)

      const data = await res.json()

      if (!data.matches?.length) {
        setMatches(DEMO_MATCHES)
        setLastUpdated('No matches found — showing demo data')
        setLoading(false)
        return
      }

      const mapped = data.matches.map(m => ({
        id:        m.id,
        date:      m.utcDate.split('T')[0],
        time:      new Date(m.utcDate).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' }),
        status:    mapStatus(m.status),
        minute:    m.minute || null,
        home:      { name: m.homeTeam.name, flag: getFlag(m.homeTeam.name) },
        away:      { name: m.awayTeam.name, flag: getFlag(m.awayTeam.name) },
        homeScore: m.score.fullTime.home ?? (m.score.halfTime.home ?? '-'),
        awayScore: m.score.fullTime.away ?? (m.score.halfTime.away ?? '-'),
        venue:     m.venue || 'TBC',
        group:     m.group || m.stage || 'Group Stage',
        winner:    m.score.winner === 'HOME_TEAM' ? 'home' : m.score.winner === 'AWAY_TEAM' ? 'away' : null
      }))

      cache.set(mapped)
      setMatches(mapped)
      setIsLive(mapped.some(m => m.status === 'live'))
      setLastUpdated(`Last updated: ${new Date().toLocaleTimeString()}`)
      setError('')

    } catch (err) {
      console.error(err)
      setError(`Could not load scores: ${err.message}`)
      const cached = cache.get()
      setMatches(cached || DEMO_MATCHES)
    }

    setLoading(false)
  }

  // ── AUTO REFRESH ────────────────────────────────────────
  useEffect(() => {
    fetchMatches()

    // Refresh every 60s when live matches are on
    intervalRef.current = setInterval(() => {
      if (isLive) fetchMatches(true)
    }, 60000)

    return () => clearInterval(intervalRef.current)
  }, [isLive])

  // ── FILTER + GROUP ───────────────────────────────────────
  const filtered = filter === 'all' ? matches : matches.filter(m => m.status === filter)

  const grouped = filtered.reduce((acc, m) => {
    if (!acc[m.date]) acc[m.date] = []
    acc[m.date].push(m)
    return acc
  }, {})

  const formatDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    weekday:'long', month:'long', day:'numeric', year:'numeric'
  })

  const liveCount = matches.filter(m => m.status === 'live').length

  return (
    <div>
      {/* HERO */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-red-800 text-white text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/35 text-yellow-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
          {liveCount > 0 ? `🔴 ${liveCount} Match${liveCount>1?'es':''} Live Now` : '📊 Updated Every Minute'}
        </div>
        <h1 className="text-4xl font-black mb-2">Live <span className="text-yellow-400">Scores</span></h1>
        <p className="text-white/80 max-w-md mx-auto">Real-time World Cup 2026 scores, results and upcoming fixtures.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">

        <AdSlot type="leaderboard" />

        {/* FILTER TABS */}
        <div className="flex gap-2 flex-wrap mb-4">
          {[
            ['all',     'All Matches'],
            ['live',    `🔴 Live${liveCount > 0 ? ` (${liveCount})` : ''}`],
            ['finished','Finished'],
            ['upcoming','Upcoming'],
          ].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                filter === val
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-blue-900 hover:text-blue-900'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* STATUS BAR */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            {cacheHit && <span className="text-xs bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full">⚡ Cached</span>}
            {lastUpdated}
          </span>
          <button onClick={() => fetchMatches(true)} disabled={loading}
            className="border border-gray-200 rounded-full px-4 py-1.5 text-sm font-semibold hover:border-blue-900 hover:text-blue-900 transition-colors cursor-pointer bg-white disabled:opacity-50">
            {loading ? '⏳ Loading...' : '↻ Refresh'}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-yellow-800 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* MATCHES */}
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading scores...</p>
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-400">
            No {filter === 'all' ? '' : filter} matches found.
          </div>
        ) : (
          Object.entries(grouped).map(([date, dayMatches]) => (
            <div key={date} className="mb-6">
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 pb-2 mb-3">
                📅 {formatDate(date)}
              </div>
              <div className="flex flex-col gap-2">
                {dayMatches.map(m => (
                  <div key={m.id}
                    className={`bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3 ${BORDER_STYLE[m.status]}`}>
                    <div className="flex items-center gap-3 flex-1 min-w-56">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-2xl">{m.home.flag}</span>
                        <span className="font-bold text-gray-900 text-sm">{m.home.name}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 min-w-16">
                        <div className="text-xl font-black text-gray-900">
                          {m.homeScore} – {m.awayScore}
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[m.status]}`}>
                          {STATUS_LABEL[m.status](m.minute)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <span className="font-bold text-gray-900 text-sm">{m.away.name}</span>
                        <span className="text-2xl">{m.away.flag}</span>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-bold text-blue-900">{m.group}</div>
                      <div className="text-xs text-gray-400">📍 {m.venue}</div>
                      <div className="text-xs text-gray-500 font-semibold">🕐 {m.time}</div>
                    </div>
                    <Link to="/predictor"
                      className="bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-full no-underline hover:bg-blue-800 transition-colors">
                      🔮 Predict
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <AdSlot type="leaderboard" />

        
      </div>
    </div>
  )
}