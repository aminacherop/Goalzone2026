import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white/60 text-center py-8 px-4 text-sm flex flex-col gap-2">
      <p><strong className="text-white">GoalZone 2026</strong> — Your Ultimate World Cup Hub</p>
      <p>Not affiliated with FIFA. For entertainment purposes only.</p>
      <div className="flex flex-wrap justify-center gap-4 my-1">
        {[['/', 'Home'],['/scores','Scores'],['/groups','Groups'],['/predictor','Predictor'],['/watch','Watch'],['/chat','Chat'],['/news','News']].map(([path, label]) => (
          <Link key={path} to={path} className="text-white/60 hover:text-white no-underline">{label}</Link>
        ))}
      </div>
      <p className="text-xs">© 2026 GoalZone 2026. All rights reserved.</p>
    </footer>
  )
}
