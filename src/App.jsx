import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Scores from './pages/Scores'
import Groups from './pages/Groups'
import Predictor from './pages/Predictor'
import Watch from './pages/Watch'
import News from './pages/News'
import Privacy from './pages/Privacy'
import About from './pages/About'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/predictor" element={<Predictor />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/news" element={<News />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
export default App
