import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import AdSlot from '../components/AdSlot'

const BROADCASTERS = [
  // AFRICA
  { country:'Kenya', flag:'🇰🇪', region:'africa', broadcasters:[
    {name:'SuperSport', type:'tv', url:'https://supersport.com'},
    {name:'Showmax', type:'stream', url:'https://showmax.com'},
    {name:'KBC TV', type:'free', url:'https://kbc.co.ke'},
  ]},
  { country:'Nigeria', flag:'🇳🇬', region:'africa', broadcasters:[
    {name:'SuperSport', type:'tv', url:'https://supersport.com'},
    {name:'DSTV', type:'tv', url:'https://dstv.com'},
    {name:'NTA', type:'free', url:'https://nta.ng'},
  ]},
  { country:'South Africa', flag:'🇿🇦', region:'africa', broadcasters:[
    {name:'SuperSport', type:'tv', url:'https://supersport.com'},
    {name:'SABC', type:'free', url:'https://sabc.co.za'},
    {name:'Showmax', type:'stream', url:'https://showmax.com'},
  ]},
  { country:'Ghana', flag:'🇬🇭', region:'africa', broadcasters:[
    {name:'SuperSport', type:'tv', url:'https://supersport.com'},
    {name:'GTV Sports+', type:'free', url:'https://ghanatelevision.gov.gh'},
  ]},
  { country:'Egypt', flag:'🇪🇬', region:'africa', broadcasters:[
    {name:'beIN Sports', type:'tv', url:'https://beinsports.com'},
    {name:'Al Ahly TV', type:'stream', url:'https://alahlytv.com'},
  ]},
  { country:'Morocco', flag:'🇲🇦', region:'africa', broadcasters:[
    {name:'beIN Sports', type:'tv', url:'https://beinsports.com'},
    {name:'2M', type:'free', url:'https://2m.ma'},
  ]},
  { country:'Tanzania', flag:'🇹🇿', region:'africa', broadcasters:[
    {name:'SuperSport', type:'tv', url:'https://supersport.com'},
    {name:'Azam TV', type:'tv', url:'https://azamtv.co.tz'},
  ]},
  { country:'Uganda', flag:'🇺🇬', region:'africa', broadcasters:[
    {name:'SuperSport', type:'tv', url:'https://supersport.com'},
    {name:'UBC TV', type:'free', url:'https://ubc.go.ug'},
  ]},
  // EUROPE
  { country:'United Kingdom', flag:'🇬🇧', region:'europe', broadcasters:[
    {name:'BBC', type:'free', url:'https://bbc.co.uk/sport'},
    {name:'ITV', type:'free', url:'https://itv.com/sport'},
    {name:'BBC iPlayer', type:'stream', url:'https://bbc.co.uk/iplayer'},
    {name:'ITVX', type:'stream', url:'https://itvx.com'},
  ]},
  { country:'Germany', flag:'🇩🇪', region:'europe', broadcasters:[
    {name:'ARD', type:'free', url:'https://ard.de'},
    {name:'ZDF', type:'free', url:'https://zdf.de'},
    {name:'MagentaTV', type:'stream', url:'https://telekommagentatv.de'},
  ]},
  { country:'France', flag:'🇫🇷', region:'europe', broadcasters:[
    {name:'TF1', type:'free', url:'https://tf1.fr'},
    {name:'beIN Sports', type:'tv', url:'https://beinsports.com/fr'},
  ]},
  { country:'Spain', flag:'🇪🇸', region:'europe', broadcasters:[
    {name:'RTVE', type:'free', url:'https://rtve.es'},
    {name:'Mediaset', type:'tv', url:'https://mediaset.es'},
  ]},
  { country:'Italy', flag:'🇮🇹', region:'europe', broadcasters:[
    {name:'RAI', type:'free', url:'https://rai.it'},
    {name:'Sky Sport', type:'tv', url:'https://skysport.it'},
  ]},
  { country:'Portugal', flag:'🇵🇹', region:'europe', broadcasters:[
    {name:'RTP', type:'free', url:'https://rtp.pt'},
    {name:'Sport TV', type:'tv', url:'https://sporttv.pt'},
  ]},
  { country:'Netherlands', flag:'🇳🇱', region:'europe', broadcasters:[
    {name:'NOS', type:'free', url:'https://nos.nl'},
    {name:'Ziggo Sport', type:'stream', url:'https://ziggosport.nl'},
  ]},
  // AMERICAS
  { country:'USA', flag:'🇺🇸', region:'americas', broadcasters:[
    {name:'Fox Sports', type:'tv', url:'https://foxsports.com'},
    {name:'Telemundo', type:'tv', url:'https://telemundo.com'},
    {name:'Peacock', type:'stream', url:'https://peacocktv.com'},
  ]},
  { country:'Canada', flag:'🇨🇦', region:'americas', broadcasters:[
    {name:'CTV', type:'free', url:'https://ctv.ca'},
    {name:'TSN', type:'tv', url:'https://tsn.ca'},
  ]},
  { country:'Mexico', flag:'🇲🇽', region:'americas', broadcasters:[
    {name:'Televisa', type:'free', url:'https://televisa.com'},
    {name:'TV Azteca', type:'free', url:'https://tvazteca.com'},
    {name:'TUDN', type:'stream', url:'https://tudn.com'},
  ]},
  { country:'Brazil', flag:'🇧🇷', region:'americas', broadcasters:[
    {name:'Globo', type:'free', url:'https://globo.com'},
    {name:'SporTV', type:'tv', url:'https://sportv.globo.com'},
    {name:'Cazé TV', type:'stream', url:'https://cazetv.com'},
  ]},
  { country:'Argentina', flag:'🇦🇷', region:'americas', broadcasters:[
    {name:'TyC Sports', type:'tv', url:'https://tycsports.com'},
    {name:'TV Pública', type:'free', url:'https://tvpublica.com.ar'},
  ]},
  // ASIA
  { country:'Japan', flag:'🇯🇵', region:'asia', broadcasters:[
    {name:'NHK', type:'free', url:'https://nhk.or.jp'},
    {name:'ABEMA', type:'stream', url:'https://abema.tv'},
  ]},
  { country:'South Korea', flag:'🇰🇷', region:'asia', broadcasters:[
    {name:'KBS', type:'free', url:'https://kbs.co.kr'},
    {name:'MBC', type:'free', url:'https://imbc.com'},
  ]},
  { country:'India', flag:'🇮🇳', region:'asia', broadcasters:[
    {name:'Sports18', type:'tv', url:'https://sports18.com'},
    {name:'JioCinema', type:'stream', url:'https://jiocinema.com'},
  ]},
  { country:'Saudi Arabia', flag:'🇸🇦', region:'asia', broadcasters:[
    {name:'beIN Sports', type:'tv', url:'https://beinsports.com'},
    {name:'SSC', type:'stream', url:'https://ssc.com.sa'},
  ]},
  { country:'China', flag:'🇨🇳', region:'asia', broadcasters:[
    {name:'CCTV', type:'free', url:'https://cctv.com'},
    {name:'iQIYI Sports', type:'stream', url:'https://iqiyi.com'},
  ]},
  // OCEANIA
  { country:'Australia', flag:'🇦🇺', region:'oceania', broadcasters:[
    {name:'SBS', type:'free', url:'https://sbs.com.au/sport'},
    {name:'Optus Sport', type:'stream', url:'https://sport.optus.com.au'},
  ]},
  { country:'New Zealand', flag:'🇳🇿', region:'oceania', broadcasters:[
    {name:'Sky Sport NZ', type:'tv', url:'https://skysport.co.nz'},
    {name:'ThreeNow', type:'stream', url:'https://threenow.co.nz'},
  ]},
]

const TYPE_STYLE = {
  tv:     { bg:'bg-blue-50', text:'text-blue-700', label:'📺 TV' },
  stream: { bg:'bg-green-50', text:'text-green-700', label:'💻 Stream' },
  free:   { bg:'bg-red-50', text:'text-red-600', label:'🆓 Free' },
  radio:  { bg:'bg-yellow-50', text:'text-yellow-700', label:'📻 Radio' },
}

const REGIONS = [
  { key:'all', label:'🌍 All' },
  { key:'africa', label:'🌍 Africa' },
  { key:'europe', label:'🇪🇺 Europe' },
  { key:'americas', label:'🌎 Americas' },
  { key:'asia', label:'🌏 Asia' },
  { key:'oceania', label:'🌊 Oceania' },
]

const REGION_LABELS = {
  africa:'🌍 Africa', europe:'🇪🇺 Europe',
  americas:'🌎 Americas', asia:'🌏 Asia', oceania:'🌊 Oceania'
}

function BroadcasterCard({ data }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{data.flag}</span>
        <span className="font-black text-gray-900">{data.country}</span>
      </div>
      <div className="flex flex-col gap-2">
        {data.broadcasters.map((b,i) => {
          const s = TYPE_STYLE[b.type] || TYPE_STYLE.tv
          return (
            <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                <span className="text-sm font-semibold text-gray-900">{b.name}</span>
              </div>
              <a href={b.url} target="_blank" rel="noopener noreferrer"
                className="bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-full no-underline hover:bg-blue-800 transition-colors">
                ▶ Watch
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Watch() {
  const [region, setRegion] = useState('all')
  const [search, setSearch] = useState('')

  let filtered = BROADCASTERS
  if (region !== 'all') filtered = filtered.filter(b => b.region === region)
  if (search) filtered = filtered.filter(b => b.country.toLowerCase().includes(search.toLowerCase()))

  // Group by region for "all" view
  const grouped = region === 'all' && !search
    ? ['africa','europe','americas','asia','oceania'].reduce((acc, r) => {
        const items = filtered.filter(b => b.region === r)
        if (items.length) acc[r] = items
        return acc
      }, {})
    : null

  return (
    <div>
      <Helmet>
        <title>Where to Watch - FIFA World Cup 2026 | GoalZone</title>
        <meta name="description" content="Find where to watch FIFA World Cup 2026 in your country. Official TV broadcasters and streaming services worldwide."/>
      </Helmet>

      {/* HERO */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-red-800 text-white text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/35 text-yellow-400 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
          📺 Official Broadcasters
        </div>
        <h1 className="text-4xl font-black mb-2">Where to <span className="text-yellow-400">Watch</span></h1>
        <p className="text-white/80 max-w-md mx-auto">Find your official World Cup 2026 broadcaster by country.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* AD 1 — Top */}
        <AdSlot type="leaderboard" />

        {/* SEARCH */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input type="text" placeholder="Search your country e.g. Kenya, USA, UK..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-full text-sm outline-none focus:border-blue-900 transition-colors"/>
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-lg">✕</button>
          )}
        </div>

        {/* REGION TABS */}
        <div className="flex gap-2 flex-wrap mb-6">
          {REGIONS.map(r => (
            <button key={r.key} onClick={() => setRegion(r.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                region === r.key ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-900 hover:text-blue-900'
              }`}>
              {r.label}
            </button>
          ))}
        </div>

        {/* RESULTS */}
        {filtered.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p>No broadcaster found for "<strong>{search}</strong>"</p>
          </div>
        ) : grouped ? (
          Object.entries(grouped).map(([r, items]) => (
            <div key={r} className="mb-8">
              <h2 className="text-base font-black text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">{REGION_LABELS[r]}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(b => <BroadcasterCard key={b.country} data={b}/>)}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(b => <BroadcasterCard key={b.country} data={b}/>)}
          </div>
        )}

        {/* AD 2 — Bottom */}
        <AdSlot type="leaderboard" />

        {/* DISCLAIMER */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6 text-sm text-yellow-800">
          <strong>⚠️ Disclaimer:</strong> GoalZone 2026 does not stream any content. All links direct to official licensed broadcasters only. Broadcasting rights may vary by region.
        </div>

      </div>
    </div>
  )
}