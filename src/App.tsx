import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedGrid from './components/FeaturedGrid'
import Footer from './components/Footer'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Story Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <img 
                  src="/assets/lkp_jungle_experience.png" 
                  alt="Story" 
                  className="rounded-[40px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 aspect-video object-cover"
                />
              </motion.div>
              
              <div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold block mb-6"
                >
                  Our Philosophy
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-display font-medium mb-8 leading-tight"
                >
                  Travel as an <span className="italic font-light">Evolving</span> Art Form
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-white/60 text-lg leading-relaxed mb-10"
                >
                  We believe the world still has secrets. Our mission is to connect 
                  the curious with the unseen, the quiet, and the profound. Every 
                  itinerary is a blank canvas, every experience a masterpiece.
                </motion.p>
                <motion.button 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-white font-medium group"
                >
                  Learn about our curation process
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowDown size={20} className="-rotate-[135deg]" />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        </section>

        <FeaturedGrid />
        
        {/* Community / CTA Section */}
        <section className="py-32 bg-[#0f0f0f]">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto glass p-16 rounded-[40px] premium-shadow"
            >
              <h2 className="text-4xl md:text-5xl font-display font-medium mb-8">
                Ready to find your <br /> <span className="italic">Little Known Planet</span>?
              </h2>
              <p className="text-white/40 mb-12 max-w-lg mx-auto">
                Join our exclusive circle of explorers and receive priority access to seasonal expeditions and hidden stays.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform">
                  Apply for Membership
                </button>
                <button className="px-10 py-4 border border-white/10 text-white rounded-full font-medium hover:bg-white/5 transition-colors">
                  Speak with a Curator
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
