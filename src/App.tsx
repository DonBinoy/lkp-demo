import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ExperienceDetail from './pages/ExperienceDetail'
import PlaceDetail from './pages/PlaceDetail'
import StayDetailView from './pages/StayDetailView'
import FoodDetailView from './pages/FoodDetailView'
import EventDetailView from './pages/EventDetailView'
import Cursor from './components/Cursor'
import { useEffect } from 'react'

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Cursor />
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
          <Route path="/stay/:id" element={<StayDetailView />} />
          <Route path="/food/:id" element={<FoodDetailView />} />
          <Route path="/event/:id" element={<EventDetailView />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default App
