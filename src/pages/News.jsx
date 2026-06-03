import { useState } from 'react'
import AdSlot from '../components/AdSlot'

const NEWS = [
  { id:1, cat:'preview', emoji:'⚽', title:'Brazil vs Germany: The Blockbuster Group L Clash', excerpt:'The two football giants meet again in what promises to be the most watched group stage match of the 2026 World Cup. Can Germany end Brazil\'s dominance?', date:'June 13, 2026', read:'4 min read', tags:['Brazil','Germany','Group L'], featured:true },
  { id:2, cat:'analysis', emoji:'🧠', title:'Why Argentina Are Favourites to Defend Their Title', excerpt:'Defending champions Argentina head into 2026 with a squad that has only grown stronger since Qatar 2022. Here\'s why they are many experts\' pick.', date:'June 11, 2026', read:'5 min read', tags:['Argentina','Analysis'], featured:false },
  { id:3, cat:'injury', emoji:'🏥', title:'Injury Update: Key Players Racing to Be Fit', excerpt:'Several star players are racing against time to be fit for their nation\'s opening matches. Here\'s the full injury round-up before the tournament.', date:'June 10, 2026', read:'3 min read', tags:['Injuries','Squad News'], featured:false },
  { id:4, cat:'preview', emoji:'🇺🇸', title:'Host Nation USA: Can They Go All the Way?', excerpt:'Playing on home soil gives the USA a massive advantage. With a young talented squad, could this be America\'s tournament to win?', date:'June 9, 2026', read:'4 min read', tags:['USA','Host Nation'], featured:false },
  { id:5, cat:'squads', emoji:'📋', title:'All 48 Nations Final Squad Lists Revealed', excerpt:'Every team has confirmed their 26-man squad for the World Cup. We break down the biggest inclusions and surprise omissions from each nation.', date:'June 8, 2026', read:'6 min read', tags:['Squads','Team News'], featured:false },
  { id:6, cat:'analysis', emoji:'🏆', title:'Dark Horses: 5 Teams That Could Surprise Everyone', excerpt:'Morocco shocked the world in Qatar. Who will be the surprise package of 2026? We look at five nations ready to cause major upsets.', date:'June 7, 2026', read:'4 min read', tags:['Dark Horses','Predictions'], featured:false },
  { id:7, cat:'preview', emoji:'🇫🇷', title:'France\'s Path to Glory: Can Les Bleus Win Again?', excerpt:'France boast one of the most talented squads in the tournament. With Mbappé leading the line they are many experts\' pick to lift the trophy.', date:'June 6, 2026', read:'4 min read', tags:['France','Preview'], featured:false },
  { id:8, cat:'squads', emoji:'🌍', title:'African Teams at 2026: Record Representation', excerpt:'With 9 African nations qualifying this World Cup is set to showcase the continent\'s best talent on the biggest stage in football history.', date:'June 5, 2026', read:'3 min read', tags:['Africa','CAF'], featured:false },
  { id:9, cat:'analysis', emoji:'📊', title:'The Stats That Will Decide the 2026 World Cup', excerpt:'From set-piece efficiency to pressing intensity we look at the key metrics that historically separate World Cup winners from the rest.', date:'June 4, 2026', read:'5 min read', tags:['Stats','Analysis'], featured:false },
]

const CATS = [
  { key:'all',      label:'All' },
  { key:'preview',  label:'Match Previews' },
  { key:'injury',   label:'Injuries' },
  { key:'analysis', label:'Analysis' },
  { key:'squads',   label:'Teams & Squads' },
]

const CAT_STYLE = {
  preview:  { bg:'bg-blue-50',   text:'text-blue-700',   label:'Match Preview' },
  injury:   { bg:'bg-red-50',    text:'text-red-600',    label:'🏥 Injury' },
  analysis: { bg:'bg-yellow-50', text:'text-yellow-700', label:'📊 Analysis' },
  squads:   { bg:'bg-green-50',  text:'text-green-700',  label:'📋 Squads' },
}

const THUMB_COLORS = {
  preview:  'from-blue-900 to-blue-700',
  injury:   'from-red-700 to-red-500',
  analysis: 'from-yellow-600 to-yellow-400',
  squads:   'from-green-700 to-green-500',
}

function NewsCard({ article, featured }) {
  const s = CAT_STYLE[article.cat] || { bg:'bg-gray-100', text:'text-gray-600', label:'News' }
  const tc = THUMB_COLORS[article.cat] || 'from-gray-700 to-gray-500'

  if (featured) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer mb-4 flex flex-col sm:flex-row">
        <div className={`bg-gradient-to-br ${tc} flex items-center justify-center text-6xl sm:w-64 h-40 sm:h-auto flex-shrink-0`}>
          {article.emoji}
        </div>
        <div className="p-5 flex flex-col justify-center">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-2 w-fit ${s.bg} ${s.text}`}>{s.label}</span>
          <h2 className="text-xl font-black text-gray-900 mb-2 leading-tight">{article.title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-3">{article.excerpt}</p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>📅 {article.date}</span>
              <span>⏱ {article.read}</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {article.tags.map(t => (
                <span key={t} className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer">
      <div className={`bg-gradient-to-br ${tc} flex items-center justify-center text-5xl h-36`}>
        {article.emoji}
      </div>
      <div className="p-4">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-2 ${s.bg} ${s.text}`}>{s.label}</span>
        <h3 className="font-black text-gray-900 text-sm mb-2 leading-tight">{article.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>📅 {article.date}</span>
          <span>⏱ {article.read}</span>
        </div>
        <div className="flex gap-1 flex-wrap mt-2">
          {article.tags.map(t => (
            <span key={t} className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
        {/* AD 3 — Bottom */}
        <AdSlot type="leaderboard" />

      </div>
    </div>
  )
}

export default function News() {
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')

  let filtered = cat === 'all' ? NEWS : NEWS.filter(n => n.cat === cat)
  if (search) filtered = filtered.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  const featured = filtered.find(n => n.featured && cat === 'all' && !search)
  const rest = featured ? filtered.filter(n => n.id !== featured.id) : filtered

  return (
    <div>
      {/* HERO */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-red-800 text-white text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/35 text-yellow-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
          📰 Latest Updates
        </div>
        <h1 className="text-4xl font-black mb-2">World Cup <span className="text-yellow-400">News</span></h1>
        <p className="text-white/80 max-w-md mx-auto">Breaking news, match previews, player updates and expert analysis.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* AD 1 — Top */}
        <AdSlot type="leaderboard" />

        {/* SEARCH */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input type="text" placeholder="Search news, teams or topics..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-full text-sm outline-none focus:border-blue-900 transition-colors"/>
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-lg">✕</button>
          )}
        </div>

        {/* CATEGORY TABS */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATS.map(c => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                cat === c.key ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-900 hover:text-blue-900'
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* FEATURED */}
        {featured && <NewsCard article={featured} featured={true}/>}

        {/* AD 2 — After featured */}
        {featured && <AdSlot type="rectangle" />}

        {/* GRID */}
        {rest.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-400">
            <div className="text-4xl mb-3">📰</div>
            <p>No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map(n => <NewsCard key={n.id} article={n}/>)}
          </div>
        )}

      </div>
    </div>
  )
}