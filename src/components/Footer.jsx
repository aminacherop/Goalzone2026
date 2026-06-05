import { Link } from 'react-router-dom'

const links = [
  { path: '/',          label: 'Home' },
  { path: '/scores',    label: 'Live Scores' },
  { path: '/groups',    label: 'Groups' },
  { path: '/predictor', label: 'AI Predictor' },
  { path: '/watch',     label: 'Watch' },
  { path: '/chat',      label: 'Fan Chat' },
  { path: '/news',      label: 'News' },
]

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white/60 text-center py-8 px-4 text-sm flex flex-col gap-2">
      <p><strong className="text-white">GoalZone 2026</strong> — Your Ultimate World Cup Hub</p>
      <p>Not affiliated with FIFA. For entertainment and information purposes only.</p>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 my-1">
        {links.map(l => (
          <Link key={l.path} to={l.path}
            className="text-white/60 hover:text-white no-underline transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
      <p className="text-xs mt-1">© 2026 GoalZone 2026. All rights reserved.</p>
    </footer>
  )
}