import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
const KICKOFF = new Date('2026-06-11T20:00:00Z')
export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [countdown, setCountdown] = useState('')
  useEffect(() => {
    const tick = () => {
      const diff = KICKOFF - new Date()
      if (diff <= 0) { setCountdown('🔴 LIVE NOW'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const links = [['/', 'Home'],['/scores','Scores'],['/predictor','Predictor'],['/watch','Watch'],['/groups','Groups'],['/news','News']]
  return (
    <nav className="bg-blue-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-xl">⚽</div>
          <span className="text-white font-black text-xl">GoalZone <span className="text-yellow-400">2026</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map(([path, label]) => (
            <Link key={path} to={path} className={`text-sm font-medium no-underline transition-colors ${location.pathname === path ? 'text-white font-bold border-b-2 border-yellow-400' : 'text-white/75 hover:text-white'}`}>{label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
          <span className="text-white text-xs font-semibold">{countdown}</span>
        </div>
        <button className="md:hidden text-white text-2xl bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '✕' : '☰'}</button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-blue-950 px-4 py-3 flex flex-col gap-1">
          {links.map(([path, label]) => (
            <Link key={path} to={path} className="text-white/75 px-3 py-2 no-underline hover:text-white" onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
