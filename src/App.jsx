import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Websites from './pages/Websites.jsx'
import Videos from './pages/Videos.jsx'
import Cards from './pages/Cards.jsx'
import Portfolio from './pages/Portfolio.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<Home />} />
        <Route path="/websites"  element={<Websites />} />
        <Route path="/videos"    element={<Videos />} />
        <Route path="/cards"     element={<Cards />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}