import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'

const KICKOFF = new Date('2026-06-11T20:00:00Z')

// ── COUNTDOWN TIMER ──────────────────────────────────────
function CountdownTimer() {
  const [time, setTime] = useState({d:0,h:0,m:0,s:0})
  useEffect(() => {
    const tick = () => {
      const diff = KICKOFF - new Date()
      if (diff <= 0) return
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const Box = ({val, label}) => (
    <div className="text-center min-w-16">
      <div className="bg-blue-900 text-white text-3xl font-black rounded-lg px-4 py-2 tabular-nums">
        {String(val).padStart(2,'0')}
      </div>
      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6">
        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">⏱ Kickoff In</span>
        <div className="flex gap-3">
          <Box val={time.d} label="Days"/>
          <Box val={time.h} label="Hours"/>
          <Box val={time.m} label="Mins"/>
          <Box val={time.s} label="Secs"/>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="text-xl">🇲🇽</span>
          <span><strong>Mexico vs South Africa</strong> · June 11 · Mexico City</span>
        </div>
      </div>
    </div>
  )
}

// ── STATS BAR ─────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { num:'48',  label:'Teams' },
    { num:'104', label:'Matches' },
    { num:'16',  label:'Host Cities' },
    { num:'39',  label:'Days' },
    { num:'3',   label:'Host Nations' },
  ]
  return (
    <div className="bg-red-600 py-4">
      <div className="max-w-4xl mx-auto px-4 flex justify-around flex-wrap gap-4">
        {stats.map(s => (
          <div key={s.label} className="text-center text-white">
            <div className="text-2xl font-black">{s.num}</div>
            <div className="text-xs uppercase tracking-wider opacity-80">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── FEATURE CARDS ─────────────────────────────────────────
function FeatureCards() {
  const cards = [
    { icon:'📊', title:'Live Scores',     desc:'Real-time scores and minute-by-minute updates for every match.', badge:'🔴 Live',      badgeColor:'bg-red-50 text-red-600',    border:'border-t-red-500',    link:'/scores' },
    { icon:'🔮', title:'AI Predictor',    desc:'Pick two teams and our AI predicts the winner with analysis.',  badge:'✨ AI Powered', badgeColor:'bg-blue-50 text-blue-700',   border:'border-t-blue-600',   link:'/predictor' },
    { icon:'🏆', title:'Group Standings', desc:'Track all 12 groups and see who advances to the Round of 32.', badge:'🔥 Hot',        badgeColor:'bg-yellow-50 text-yellow-700',border:'border-t-yellow-500', link:'/groups' },
    { icon:'📰', title:'News & Analysis', desc:'Latest World Cup news, injuries and expert match analysis.',    badge:'✅ Daily',      badgeColor:'bg-green-50 text-green-700',  border:'border-t-green-600',  link:'/news' },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map(c => (
        <Link key={c.title} to={c.link}
          className={`bg-white border border-gray-200 border-t-4 ${c.border} rounded-xl p-5 no-underline hover:-translate-y-1 hover:shadow-lg transition-all`}>
          <div className="text-3xl mb-3">{c.icon}</div>
          <div className="font-bold text-gray-900 mb-1">{c.title}</div>
          <div className="text-sm text-gray-500 mb-3">{c.desc}</div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.badgeColor}`}>{c.badge}</span>
        </Link>
      ))}
    </div>
  )
}

// ── SCORES PREVIEW ────────────────────────────────────────
function ScoresPreview() {
  const matches = [
    { home:{name:'Mexico',      flag:'🇲🇽'}, away:{name:'South Africa', flag:'🇿🇦'}, score:'-', status:'upcoming', time:'Jun 11 · 3:00 PM ET' },
    { home:{name:'Canada',      flag:'🇨🇦'}, away:{name:'Bosnia',       flag:'🇧🇦'}, score:'-', status:'upcoming', time:'Jun 12 · 6:00 PM ET' },
    { home:{name:'USA',         flag:'🇺🇸'}, away:{name:'Paraguay',     flag:'🇵🇾'}, score:'-', status:'upcoming', time:'Jun 12 · 9:00 PM ET' },
    { home:{name:'Brazil',      flag:'🇧🇷'}, away:{name:'Germany',      flag:'🇩🇪'}, score:'-', status:'upcoming', time:'Jun 13 · 3:00 PM ET' },
    { home:{name:'Spain',       flag:'🇪🇸'}, away:{name:'Scotland',     flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'}, score:'-', status:'upcoming', time:'Jun 14 · 12:00 PM ET' },
  ]
  const statusStyle = { live:'bg-red-50 text-red-600', finished:'bg-green-50 text-green-700', upcoming:'bg-gray-100 text-gray-500' }
  const statusLabel = { live:'🔴 LIVE', finished:'✅ FT', upcoming:'🕐 Soon' }
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-gray-900">📊 Today's Matches</h2>
        <Link to="/scores" className="text-sm font-bold text-blue-700 border border-blue-700 rounded-full px-4 py-1 no-underline hover:bg-blue-700 hover:text-white transition-colors">
          View All Scores →
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {matches.map((m, i) => (
          <Link key={i} to="/scores"
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 no-underline transition-colors">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xl">{m.home.flag}</span>
                <span className="text-sm font-bold text-gray-900">{m.home.name}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg font-black text-gray-800">{m.score}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusStyle[m.status]}`}>
                  {statusLabel[m.status]}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <span className="text-sm font-bold text-gray-900">{m.away.name}</span>
                <span className="text-xl">{m.away.flag}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 ml-4 hidden sm:block">{m.time}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── OPENING MATCHES ───────────────────────────────────────
function OpeningMatches() {
  const matches = [
    { home:{name:'Mexico', flag:'🇲🇽'}, away:{name:'South Africa', flag:'🇿🇦'}, date:'Jun 11 · 3:00 PM ET', venue:'Azteca, Mexico City' },
    { home:{name:'USA',    flag:'🇺🇸'}, away:{name:'Paraguay',     flag:'🇵🇾'}, date:'Jun 12 · 9:00 PM ET', venue:'LA Stadium' },
    { home:{name:'Canada', flag:'🇨🇦'}, away:{name:'Bosnia',       flag:'🇧🇦'}, date:'Jun 12 · 6:00 PM ET', venue:'BMO Field, Toronto' },
    { home:{name:'Brazil', flag:'🇧🇷'}, away:{name:'Germany',      flag:'🇩🇪'}, date:'Jun 13 · 3:00 PM ET', venue:'MetLife, New York' },
  ]
  return (
    <div className="mb-8">
      <h2 className="text-lg font-black text-gray-900 mb-4">📅 Opening Matches</h2>
      <div className="flex flex-col gap-3">
        {matches.map((m,i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4 flex-1 min-w-48">
              <div className="text-center min-w-20">
                <div className="text-2xl">{m.home.flag}</div>
                <div className="text-sm font-bold mt-1">{m.home.name}</div>
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm font-black text-gray-500">VS</div>
              <div className="text-center min-w-20">
                <div className="text-2xl">{m.away.flag}</div>
                <div className="text-sm font-bold mt-1">{m.away.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">📅 {m.date}</div>
              <div className="text-xs text-gray-400">📍 {m.venue}</div>
            </div>
            <Link to="/predictor"
              className="bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-full no-underline hover:bg-blue-800 transition-colors">
              🔮 Predict
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── GROUPS PREVIEW ────────────────────────────────────────
function GroupsPreview() {
  const groups = [
    { name:'Group A', teams:['🇲🇽 Mexico','🇿🇦 South Africa','🇰🇷 South Korea','🇨🇿 Czechia'] },
    { name:'Group B', teams:['🇨🇦 Canada','🇧🇦 Bosnia','🇶🇦 Qatar','🇨🇭 Switzerland'] },
    { name:'Group C', teams:['🇦🇷 Argentina','🇳🇴 Norway','🇸🇳 Senegal','🇳🇿 New Zealand'] },
    { name:'Group D', teams:['🇺🇸 USA','🇵🇾 Paraguay','🇦🇺 Australia','🇹🇷 Türkiye'] },
    { name:'Group E', teams:['🇪🇸 Spain','🇨🇳 China','🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland','🇸🇻 El Salvador'] },
    { name:'Group F', teams:['🇵🇹 Portugal','🇺🇾 Uruguay','🇮🇶 Iraq','🇹🇳 Tunisia'] },
  ]
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-gray-900">🗂️ Group Stage</h2>
        <Link to="/groups" className="text-sm font-bold text-blue-700 border border-blue-700 rounded-full px-4 py-1 no-underline hover:bg-blue-700 hover:text-white transition-colors">
          All Groups →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {groups.map(g => (
          <div key={g.name} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-black text-blue-900 uppercase tracking-wider mb-2">{g.name}</div>
            {g.teams.map(t => (
              <div key={t} className="text-xs text-gray-700 py-0.5">{t}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// // ── NEWSLETTER ────────────────────────────────────────────
// function Newsletter() {
//   const [email, setEmail] = useState('')
//   const [team, setTeam]   = useState('')
//   const [done, setDone]   = useState(false)
//   const teams = ['🇦🇷 Argentina','🇧🇷 Brazil','🇫🇷 France','🇩🇪 Germany','🏴󠁧󠁢󠁥󠁮󠁧󠁿 England','🇪🇸 Spain','🇵🇹 Portugal','🇦🇺 Australia','🇧🇪 Belgium','🇨🇦 Canada','🇨🇱 Chile','🇨🇴 Colombia','🇳🇱 Netherlands','🇲🇽 Mexico','🇳🇬 Nigeria','🇳🇴 Norway','🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland','🇸🇳 Senegal','🇿🇦 South Africa','🇰🇷 South Korea','🇨🇭 Switzerland','🇺🇾 Uruguay','🇺🇸 USA','🇰🇪 Kenya (Fan)']

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!email) return
//     setDone(true)
//   }

//   return (
//     <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-6 mb-8 text-white text-center">
//       <h2 className="text-xl font-black mb-1">🔔 Get Match Alerts</h2>
//       <p className="text-white/80 text-sm mb-4">Pre-match reminders, goal alerts and AI predictions. Free forever.</p>
//       {done ? (
//         <div className="text-lg font-bold">🎉 You're subscribed! Check your inbox.</div>
//       ) : (
//         <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
//           <input type="email" placeholder="Your email address..." value={email}
//             onChange={e => setEmail(e.target.value)}
//             className="flex-1 min-w-48 px-4 py-2 rounded-full text-gray-900 text-sm outline-none border-none" required/>
//           <select value={team} onChange={e => setTeam(e.target.value)}
//             className="flex-1 min-w-40 px-4 py-2 rounded-full text-gray-900 text-sm outline-none border-none cursor-pointer">
//             <option value="">⚽ Favourite team...</option>
//             {teams.map(t => <option key={t} value={t}>{t}</option>)}
//           </select>
//           <button type="submit"
//             className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-full text-sm transition-colors border-none cursor-pointer whitespace-nowrap">
//             🔔 Subscribe Free
//           </button>
//         </form>
//       )}
//     </div>
//   )


// ── MAIN HOME PAGE ────────────────────────────────────────
export default function Home() {
  return (
    <div>
      {/* HERO */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-red-800 text-white text-center py-16 px-4">
        <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/35 text-yellow-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
          🏆 FIFA World Cup 2026 — Official Fan Hub
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-3">
          The World's Biggest<br/>Stage is <span className="text-yellow-400">Here.</span>
        </h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto mb-6">
          Live scores, AI predictions, group standings and everything you need for World Cup 2026.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/scores" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full no-underline transition-colors">
            ⚽ Live Scores
          </Link>
          <Link to="/predictor" className="bg-white/15 hover:bg-white/25 border-2 border-white/30 text-white font-bold px-6 py-3 rounded-full no-underline transition-colors">
            🔮 AI Predictor
          </Link>
        </div>
      </div>

      <CountdownTimer />
      <StatsBar />

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* AD 1 — Top of page (highest CTR) */}
        <AdSlot type="leaderboard" />

        <FeatureCards />

        {/* AD 2 — After feature cards */}
        <AdSlot type="rectangle" />

        <ScoresPreview />

        {/* AD 3 — After scores preview */}
        <AdSlot type="leaderboard" />

        <OpeningMatches />
        <GroupsPreview />

        {/* AD 4 — Before newsletter */}
        <AdSlot type="rectangle" />


        {/* AD 5 — Bottom of page */}
        <AdSlot type="leaderboard" />

      </div>
    </div>
  )
}