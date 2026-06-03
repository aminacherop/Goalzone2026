import { useState } from 'react'
import AdSlot from '../components/AdSlot'

const TEAMS = [
  {name:'Argentina',flag:'🇦🇷'},{name:'Australia',flag:'🇦🇺'},
  {name:'Austria',flag:'🇦🇹'},{name:'Belgium',flag:'🇧🇪'},
  {name:'Bosnia',flag:'🇧🇦'},{name:'Brazil',flag:'🇧🇷'},
  {name:'Cameroon',flag:'🇨🇲'},{name:'Canada',flag:'🇨🇦'},
  {name:'Chile',flag:'🇨🇱'},{name:'China',flag:'🇨🇳'},
  {name:'Colombia',flag:'🇨🇴'},{name:'Czechia',flag:'🇨🇿'},
  {name:'Ecuador',flag:'🇪🇨'},{name:'Egypt',flag:'🇪🇬'},
  {name:'El Salvador',flag:'🇸🇻'},{name:'England',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿'},
  {name:'France',flag:'🇫🇷'},{name:'Germany',flag:'🇩🇪'},
  {name:'Hungary',flag:'🇭🇺'},{name:'Indonesia',flag:'🇮🇩'},
  {name:'Iran',flag:'🇮🇷'},{name:'Iraq',flag:'🇮🇶'},
  {name:'Japan',flag:'🇯🇵'},{name:'Jordan',flag:'🇯🇴'},
  {name:'Mexico',flag:'🇲🇽'},{name:'Morocco',flag:'🇲🇦'},
  {name:'Netherlands',flag:'🇳🇱'},{name:'New Zealand',flag:'🇳🇿'},
  {name:'Nigeria',flag:'🇳🇬'},{name:'Norway',flag:'🇳🇴'},
  {name:'Panama',flag:'🇵🇦'},{name:'Paraguay',flag:'🇵🇾'},
  {name:'Peru',flag:'🇵🇪'},{name:'Portugal',flag:'🇵🇹'},
  {name:'Qatar',flag:'🇶🇦'},{name:'Saudi Arabia',flag:'🇸🇦'},
  {name:'Scotland',flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'},{name:'Senegal',flag:'🇸🇳'},
  {name:'South Africa',flag:'🇿🇦'},{name:'South Korea',flag:'🇰🇷'},
  {name:'Spain',flag:'🇪🇸'},{name:'Switzerland',flag:'🇨🇭'},
  {name:'Tunisia',flag:'🇹🇳'},{name:'Türkiye',flag:'🇹🇷'},
  {name:'Ukraine',flag:'🇺🇦'},{name:'Uruguay',flag:'🇺🇾'},
  {name:'USA',flag:'🇺🇸'},
]

const STAGES = ['Group Stage','Round of 32','Round of 16','Quarter Final','Semi Final','Final']

const HOT_PREDICTIONS = [
  { home:{name:'Brazil',flag:'🇧🇷'}, away:{name:'Germany',flag:'🇩🇪'}, score:'2-1', prob:58, hot:true },
  { home:{name:'Argentina',flag:'🇦🇷'}, away:{name:'Norway',flag:'🇳🇴'}, score:'3-0', prob:72, hot:false },
  { home:{name:'Spain',flag:'🇪🇸'}, away:{name:'Scotland',flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'}, score:'2-0', prob:68, hot:false },
  { home:{name:'France',flag:'🇫🇷'}, away:{name:'Cameroon',flag:'🇨🇲'}, score:'3-1', prob:75, hot:false },
]

function Bar({ pct, color }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div className={`${color} h-2.5 rounded-full transition-all duration-700`} style={{width:`${pct}%`}}></div>
    </div>
  )
}

function StatPill({ label, value, color }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl p-3 ${color}`}>
      <div className="text-lg font-black">{value}</div>
      <div className="text-xs font-semibold opacity-75 text-center">{label}</div>
    </div>
  )
}

// ── HOT PREDICTIONS — NO result/loading here ──────────────
function HotPredictions({ onSelect }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🔥</span>
        <h2 className="font-black text-gray-900">Today's Hot Predictions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HOT_PREDICTIONS.map((p,i) => (
          <button key={i} onClick={() => onSelect(p.home, p.away)}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 hover:border-blue-900 hover:bg-blue-50 transition-all cursor-pointer text-left w-full">
            <div className="flex items-center gap-2">
              <span className="text-xl">{p.home.flag}</span>
              <span className="text-sm font-bold text-gray-900">{p.home.name}</span>
              <span className="text-xs text-gray-400 font-bold">vs</span>
              <span className="text-sm font-bold text-gray-900">{p.away.name}</span>
              <span className="text-xl">{p.away.flag}</span>
            </div>
            <div className="flex items-center gap-2">
              {p.hot && <span className="text-xs bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-full">🔥 Hot</span>}
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">{p.prob}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ResultCard({ result, team1, team2 }) {
  const share = () => {
    const text = `⚽ AI Prediction: ${team1.flag} ${team1.name} ${result.score_home}-${result.score_away} ${team2.name} ${team2.flag}\n🏆 Winner: ${result.winner}\n📊 Confidence: ${result.prob_home}%\n\nGoalZone 2026 🔮`
    navigator.share ? navigator.share({text}) : navigator.clipboard.writeText(text).then(() => alert('✅ Copied!'))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-5 py-3 flex items-center justify-between">
        <span className="text-white font-bold text-sm">🔮 AI Prediction Result</span>
        <span className="text-white/60 text-xs">Powered by Groq AI</span>
      </div>

      {/* SCORELINE */}
      <div className="flex items-center justify-center gap-6 py-6 px-4 border-b border-gray-100">
        <div className="text-center flex-1">
          <div className="text-5xl mb-2">{team1.flag}</div>
          <div className="font-black text-gray-900 text-sm">{team1.name}</div>
          {result.winner === team1.name && (
            <span className="text-xs font-black bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full mt-1 inline-block">🏆 Winner</span>
          )}
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-gray-900">{result.score_home} – {result.score_away}</div>
          <div className="text-xs text-gray-400 mt-1">Predicted Score</div>
        </div>
        <div className="text-center flex-1">
          <div className="text-5xl mb-2">{team2.flag}</div>
          <div className="font-black text-gray-900 text-sm">{team2.name}</div>
          {result.winner === team2.name && (
            <span className="text-xs font-black bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full mt-1 inline-block">🏆 Winner</span>
          )}
        </div>
      </div>

      {/* WIN PROBABILITY */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">📊 Win Probability</div>
        <div className="flex rounded-full overflow-hidden h-8 text-xs font-bold mb-2">
          <div className="bg-blue-900 text-white flex items-center justify-center" style={{width:`${result.prob_home}%`}}>{result.prob_home}%</div>
          <div className="bg-gray-400 text-white flex items-center justify-center" style={{width:`${result.prob_draw}%`}}>{result.prob_draw}%</div>
          <div className="bg-red-600 text-white flex items-center justify-center" style={{width:`${result.prob_away}%`}}>{result.prob_away}%</div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{team1.flag} {team1.name}</span>
          <span>Draw</span>
          <span>{team2.name} {team2.flag}</span>
        </div>
      </div>

      {/* MATCH INSIGHTS */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎯 Match Insights</div>
        <div className="grid grid-cols-2 gap-3">
          <StatPill label="Over 2.5 Goals"   value={result.over25 || '✅ Yes'} color="bg-green-50 text-green-700"/>
          <StatPill label="Both Teams Score"  value={result.btts   || '✅ Yes'} color="bg-blue-50 text-blue-700"/>
          <StatPill label="Total Goals"       value={result.total_goals || result.score_home + result.score_away} color="bg-purple-50 text-purple-700"/>
          <StatPill label="Confidence"        value={`${result.prob_home}%`} color="bg-yellow-50 text-yellow-700"/>
        </div>
      </div>

      {/* FORM ANALYSIS */}
      {result.form && (
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">📈 Form Analysis</div>
          <div className="grid grid-cols-2 gap-4">
            {[{team: team1, form: result.form.home}, {team: team2, form: result.form.away}].map(({team, form}, i) => (
              <div key={i}>
                <div className="text-xs font-bold text-gray-600 mb-2">{team.flag} {team.name}</div>
                <div className="flex gap-1">
                  {(form || ['?','?','?','?','?']).map((f,j) => (
                    <span key={j} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white ${f==='W'?'bg-green-500':f==='D'?'bg-gray-400':'bg-red-500'}`}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HEAD TO HEAD */}
      {result.h2h && (
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">⚔️ Head-to-Head</div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-center flex-1">
              <div className="text-2xl font-black text-blue-900">{result.h2h.home_wins}</div>
              <div className="text-xs text-gray-400">{team1.name} Wins</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-black text-gray-400">{result.h2h.draws}</div>
              <div className="text-xs text-gray-400">Draws</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-black text-red-600">{result.h2h.away_wins}</div>
              <div className="text-xs text-gray-400">{team2.name} Wins</div>
            </div>
          </div>
          <div className="flex rounded-full overflow-hidden h-3">
            <div className="bg-blue-900" style={{width:`${(result.h2h.home_wins/(result.h2h.home_wins+result.h2h.draws+result.h2h.away_wins))*100}%`}}></div>
            <div className="bg-gray-300" style={{width:`${(result.h2h.draws/(result.h2h.home_wins+result.h2h.draws+result.h2h.away_wins))*100}%`}}></div>
            <div className="bg-red-600" style={{width:`${(result.h2h.away_wins/(result.h2h.home_wins+result.h2h.draws+result.h2h.away_wins))*100}%`}}></div>
          </div>
        </div>
      )}

      {/* AI ANALYSIS */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">🧠 AI Analysis</div>
        <p className="text-sm text-gray-600 leading-relaxed">{result.analysis}</p>
      </div>

      {/* KEY PLAYERS */}
      {result.key_players?.length > 0 && (
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">⭐ Key Players</div>
          <div className="flex flex-wrap gap-2">
            {result.key_players.map((p,i) => (
              <span key={i} className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">⭐ {p}</span>
            ))}
          </div>
        </div>
      )}

      {/* PREDICTED SCORERS */}
      {result.scorers?.length > 0 && (
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">⚽ Predicted Scorers</div>
          <div className="flex flex-wrap gap-2">
            {result.scorers.map((s,i) => (
              <span key={i} className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">⚽ {s}</span>
            ))}
          </div>
        </div>
      )}

      {/* COMMUNITY PREDICTIONS */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">👥 Community Predictions</div>
        <div className="flex gap-3">
          {[
            {label:`${team1.flag} ${team1.name} Win`, pct:result.prob_home, color:'bg-blue-900'},
            {label:'Draw', pct:result.prob_draw, color:'bg-gray-400'},
            {label:`${team2.flag} ${team2.name} Win`, pct:result.prob_away, color:'bg-red-600'},
          ].map((v,i) => (
            <button key={i} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-center hover:border-blue-900 cursor-pointer transition-colors">
              <div className="text-sm font-black text-gray-900">{v.pct}%</div>
              <div className="text-xs text-gray-500 mt-0.5">{v.label}</div>
              <Bar pct={v.pct} color={v.color}/>
            </button>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="px-5 py-4 flex gap-3 flex-wrap">
        <button onClick={share}
          className="bg-blue-900 text-white text-sm font-bold px-5 py-2 rounded-full cursor-pointer hover:bg-blue-800 transition-colors border-none">
          📤 Share Prediction
        </button>
        <button onClick={() => window.location.reload()}
          className="border border-gray-200 text-gray-600 text-sm font-bold px-5 py-2 rounded-full cursor-pointer hover:border-blue-900 hover:text-blue-900 transition-colors bg-white">
          🔄 New Prediction
        </button>
      </div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────
export default function Predictor() {
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [stage, setStage] = useState('Group Stage')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const handleTeam = (num, name) => {
    const t = TEAMS.find(t => t.name === name) || null
    num === 1 ? setTeam1(t) : setTeam2(t)
    setResult(null)
  }

  const swap = () => { setTeam1(team2); setTeam2(team1); setResult(null) }

  const handleHotSelect = (home, away) => {
    setTeam1(home); setTeam2(away); setResult(null)
    window.scrollTo({top: 300, behavior:'smooth'})
  }

  const predict = async () => {
    if (!team1 || !team2) { setError('Please select both teams!'); return }
    if (team1.name === team2.name) { setError('Please select two different teams!'); return }
    setError(''); setLoading(true); setResult(null)

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
      const res = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team1, team2, stage })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')
      setResult(data)
    } catch(e) {
      setError('Prediction failed: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <div>
      {/* HERO */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-red-800 text-white text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/35 text-yellow-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
          ✨ Powered by Groq AI
        </div>
        <h1 className="text-4xl font-black mb-2">AI Match <span className="text-yellow-400">Predictor</span></h1>
        <p className="text-white/80 max-w-md mx-auto">Professional predictions with win probability, form analysis, head-to-head and more.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* AD 1 — Top */}
        <AdSlot type="leaderboard" />

        {/* HOT PREDICTIONS */}
        <HotPredictions onSelect={handleHotSelect}/>

        {/* PREDICTOR CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xl">🔮</span> AI Prediction
          </h2>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center mb-5">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-center hover:border-blue-900 transition-colors">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Home</div>
              <div className="text-5xl mb-2">{team1?.flag || '🏳️'}</div>
              <div className="font-bold text-gray-900 text-sm mb-3 min-h-5">{team1?.name || 'Select Team'}</div>
              <select value={team1?.name||''} onChange={e=>handleTeam(1,e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-900 cursor-pointer">
                <option value="">-- Choose --</option>
                {TEAMS.map(t=><option key={t.name} value={t.name}>{t.flag} {t.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-red-600 flex items-center justify-center text-white font-black text-sm shadow-lg">VS</div>
              <button onClick={swap} className="text-xs text-gray-400 hover:text-blue-900 border border-gray-200 rounded-full px-3 py-1 bg-white cursor-pointer transition-colors">⇄</button>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-center hover:border-blue-900 transition-colors">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Away</div>
              <div className="text-5xl mb-2">{team2?.flag || '🏳️'}</div>
              <div className="font-bold text-gray-900 text-sm mb-3 min-h-5">{team2?.name || 'Select Team'}</div>
              <select value={team2?.name||''} onChange={e=>handleTeam(2,e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-blue-900 cursor-pointer">
                <option value="">-- Choose --</option>
                {TEAMS.map(t=><option key={t.name} value={t.name}>{t.flag} {t.name}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Match Stage</label>
            <select value={stage} onChange={e=>setStage(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-900 cursor-pointer">
              {STAGES.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-700 text-sm mb-4">{error}</div>}

          <button onClick={predict} disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-900 to-red-600 text-white font-black text-base rounded-lg cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity border-none">
            {loading ? '⏳ Analyzing...' : '🔮 Generate Prediction'}
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 font-semibold">Analyzing {team1?.name} vs {team2?.name}...</p>
            <p className="text-gray-400 text-sm mt-1">Checking form, head-to-head and tactics</p>
          </div>
        )}

        {/* RESULT */}
        {result && !loading && <ResultCard result={result} team1={team1} team2={team2}/>}

        {/* AD 2 — After result */}
        {result && !loading && <AdSlot type="rectangle" />}

        {/* PLACEHOLDER */}
        {!result && !loading && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-5 py-3">
              <span className="text-white font-bold text-sm">🔮 Prediction Preview</span>
            </div>
            <div className="flex items-center justify-center gap-6 py-6 px-4 border-b border-gray-100">
              <div className="text-center flex-1">
                <div className="text-5xl mb-2">{team1?.flag || '🏳️'}</div>
                <div className="font-black text-gray-900 text-sm">{team1?.name || 'Home Team'}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-gray-300">? – ?</div>
                <div className="text-xs text-gray-400 mt-1">Predicted Score</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-5xl mb-2">{team2?.flag || '🏳️'}</div>
                <div className="font-black text-gray-900 text-sm">{team2?.name || 'Away Team'}</div>
              </div>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">📊 Win Probability</div>
              <div className="flex rounded-full overflow-hidden h-8 bg-gray-100">
                <div className="bg-gray-200 flex-1 flex items-center justify-center text-xs text-gray-400 font-bold">?%</div>
              </div>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🎯 Match Insights</div>
              <div className="grid grid-cols-2 gap-3">
                {['Over 2.5 Goals','Both Teams Score','Total Goals','Confidence'].map(l => (
                  <div key={l} className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg font-black text-gray-300">--</div>
                    <div className="text-xs text-gray-400">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">📈 Form Analysis</div>
              <div className="grid grid-cols-2 gap-4">
                {[team1, team2].map((t,i) => (
                  <div key={i}>
                    <div className="text-xs font-bold text-gray-500 mb-2">{t?.flag || '🏳️'} {t?.name || (i===0?'Home':'Away')}</div>
                    <div className="flex gap-1">
                      {[0,1,2,3,4].map(j => (
                        <span key={j} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-400">?</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">⚔️ Head-to-Head</div>
              <div className="flex items-center gap-3">
                {['Wins','Draws','Wins'].map((l,i) => (
                  <div key={i} className="text-center flex-1">
                    <div className="text-2xl font-black text-gray-200">?</div>
                    <div className="text-xs text-gray-400">{l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-3 rounded-full bg-gray-100"></div>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">⭐ Key Players</div>
              <div className="flex flex-wrap gap-2">
                {['Player 1','Player 2','Player 3'].map((p,i) => (
                  <span key={i} className="bg-gray-100 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full">⭐ {p}</span>
                ))}
              </div>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">⚽ Predicted Scorers</div>
              <div className="flex flex-wrap gap-2">
                {['Scorer 1','Scorer 2','Scorer 3'].map((s,i) => (
                  <span key={i} className="bg-gray-100 text-gray-400 text-xs font-semibold px-3 py-1 rounded-full">⚽ {s}</span>
                ))}
              </div>
            </div>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">👥 Community Predictions</div>
              <div className="flex gap-3">
                {['Home Win','Draw','Away Win'].map((l,i) => (
                  <div key={i} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                    <div className="text-sm font-black text-gray-300">?%</div>
                    <div className="text-xs text-gray-400 mt-0.5">{l}</div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 mt-2"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 py-4 text-center text-gray-400 text-sm">
              Select two teams above and click <strong className="text-blue-900">🔮 Generate Prediction</strong> to unlock all insights
            </div>
          </div>
        )}

      </div>
    </div>
  )
}