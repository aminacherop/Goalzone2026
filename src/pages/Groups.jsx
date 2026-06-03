import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot'

const GROUPS = [
  { name:'Group A', teams:[
    {name:'Mexico',flag:'🇲🇽',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'South Africa',flag:'🇿🇦',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'South Korea',flag:'🇰🇷',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Czechia',flag:'🇨🇿',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group B', teams:[
    {name:'Canada',flag:'🇨🇦',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Bosnia',flag:'🇧🇦',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Qatar',flag:'🇶🇦',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Switzerland',flag:'🇨🇭',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group C', teams:[
    {name:'Argentina',flag:'🇦🇷',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Norway',flag:'🇳🇴',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Senegal',flag:'🇸🇳',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'New Zealand',flag:'🇳🇿',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group D', teams:[
    {name:'USA',flag:'🇺🇸',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Paraguay',flag:'🇵🇾',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Australia',flag:'🇦🇺',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Türkiye',flag:'🇹🇷',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group E', teams:[
    {name:'Spain',flag:'🇪🇸',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'China',flag:'🇨🇳',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Scotland',flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'El Salvador',flag:'🇸🇻',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group F', teams:[
    {name:'Portugal',flag:'🇵🇹',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Uruguay',flag:'🇺🇾',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Iraq',flag:'🇮🇶',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Tunisia',flag:'🇹🇳',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group G', teams:[
    {name:'Belgium',flag:'🇧🇪',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'England',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Netherlands',flag:'🇳🇱',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Ukraine',flag:'🇺🇦',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group H', teams:[
    {name:'Austria',flag:'🇦🇹',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Egypt',flag:'🇪🇬',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Morocco',flag:'🇲🇦',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Hungary',flag:'🇭🇺',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group I', teams:[
    {name:'France',flag:'🇫🇷',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Cameroon',flag:'🇨🇲',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Saudi Arabia',flag:'🇸🇦',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Japan',flag:'🇯🇵',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group J', teams:[
    {name:'Colombia',flag:'🇨🇴',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Peru',flag:'🇵🇪',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Jordan',flag:'🇯🇴',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Hungary',flag:'🇭🇺',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group K', teams:[
    {name:'Chile',flag:'🇨🇱',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Ecuador',flag:'🇪🇨',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Iran',flag:'🇮🇷',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Indonesia',flag:'🇮🇩',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  { name:'Group L', teams:[
    {name:'Brazil',flag:'🇧🇷',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Germany',flag:'🇩🇪',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Iran',flag:'🇮🇷',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:'Nigeria',flag:'🇳🇬',p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
]

function GroupCard({ group }) {
  const sorted = [...group.teams].sort((a,b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    return (b.gf - b.ga) - (a.gf - a.ga)
  })
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-blue-900 text-white px-4 py-2.5 flex items-center justify-between">
        <span className="font-black text-sm">{group.name}</span>
        <span className="text-white/60 text-xs">4 Teams · 6 Matches</span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Team</th>
            <th className="text-center px-2 py-2 text-xs font-bold text-gray-400">P</th>
            <th className="text-center px-2 py-2 text-xs font-bold text-gray-400">W</th>
            <th className="text-center px-2 py-2 text-xs font-bold text-gray-400">D</th>
            <th className="text-center px-2 py-2 text-xs font-bold text-gray-400">L</th>
            <th className="text-center px-2 py-2 text-xs font-bold text-gray-400">GD</th>
            <th className="text-center px-2 py-2 text-xs font-bold text-gray-400">PTS</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((t,i) => (
            <tr key={t.name}
              className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${i < 2 ? 'border-l-2 border-l-green-500' : ''}`}>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{t.flag}</span>
                  <span className="text-sm font-semibold text-gray-900">{t.name}</span>
                </div>
              </td>
              <td className="text-center px-2 py-2.5 text-sm text-gray-600">{t.p}</td>
              <td className="text-center px-2 py-2.5 text-sm text-gray-600">{t.w}</td>
              <td className="text-center px-2 py-2.5 text-sm text-gray-600">{t.d}</td>
              <td className="text-center px-2 py-2.5 text-sm text-gray-600">{t.l}</td>
              <td className="text-center px-2 py-2.5 text-sm text-gray-600">{t.gf - t.ga > 0 ? `+${t.gf-t.ga}` : t.gf-t.ga}</td>
              <td className="text-center px-2 py-2.5 text-sm font-black text-blue-900">{t.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-2 flex items-center gap-2 border-t border-gray-100">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-xs text-gray-400">Top 2 advance to Round of 32</span>
        {/* AD 2 — Bottom */}
        <AdSlot type="leaderboard" />

      </div>
    </div>
  )
}

export default function Groups() {
  const [search, setSearch] = useState('')

  const filtered = search
    ? GROUPS.filter(g =>
        g.teams.some(t => t.name.toLowerCase().includes(search.toLowerCase())) ||
        g.name.toLowerCase().includes(search.toLowerCase())
      )
    : GROUPS

  return (
    <div>
      {/* HERO */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-red-800 text-white text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/35 text-yellow-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
          🗂️ All 12 Groups
        </div>
        <h1 className="text-4xl font-black mb-2">Group <span className="text-yellow-400">Stage</span></h1>
        <p className="text-white/80 max-w-md mx-auto">All 48 teams across 12 groups. Track standings as the tournament progresses.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* AD 1 — Top */}
        <AdSlot type="leaderboard" />

        {/* HOST NATIONS */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center justify-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">🇺🇸 <strong>USA</strong> <span className="text-gray-400">11 Host Cities</span></div>
          <div className="text-gray-200">·</div>
          <div className="flex items-center gap-2">🇲🇽 <strong>Mexico</strong> <span className="text-gray-400">3 Host Cities</span></div>
          <div className="text-gray-200">·</div>
          <div className="flex items-center gap-2">🇨🇦 <strong>Canada</strong> <span className="text-gray-400">2 Host Cities</span></div>
        </div>

        {/* SEARCH */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search team or group e.g. Brazil, Group A..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-full text-sm outline-none focus:border-blue-900 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-lg">
              ✕
            </button>
          )}
        </div>

        {/* GROUPS GRID */}
        {filtered.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-400">
            No groups found for "{search}"
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(g => <GroupCard key={g.name} group={g} />)}
          </div>
        )}

      </div>
    </div>
  )
}