import { motion } from 'framer-motion';
import { Search, Calendar, Users, ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [activeCategory, setActiveCategory] = useState('Experiences');

  const categories = ['Experiences', 'Events', 'Food', 'Stays', 'Places'];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/lkp_hero_cinematic.png" 
          alt="LKP Hero" 
          className="w-full h-full object-cover brightness-[0.4] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-[100px] font-serif italic leading-[0.85] text-white/90 mb-8">
              Discover <br />
              <span className="font-sans not-italic font-medium text-white tracking-tighter">Your Next Plan.</span>
            </h1>
            <p className="text-xl text-white/40 font-light max-w-xl mx-auto">
              The world's most curated catalog of unique experiences, stays, and hidden gatherings.
            </p>
          </motion.div>

          {/* Functional Discovery Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="glass rounded-[40px] p-2 md:p-4 mb-8 premium-shadow border-white/5 max-w-5xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-2">
              {/* Category Picker */}
              <div className="flex-1 w-full relative">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 px-4 whitespace-nowrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                        activeCategory === cat 
                        ? 'bg-white text-black' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-white/10" />

          
              <div className="flex-[2] w-full flex flex-col md:flex-row">
                <div className="flex-1 px-6 py-4 flex items-center gap-4 text-left border-b md:border-b-0 md:border-r border-white/5">
                  <Calendar size={18} className="text-white/30" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">When</p>
                    <p className="text-sm font-medium">Select Dates</p>
                  </div>
                </div>
                <div className="flex-1 px-6 py-4 flex items-center gap-4 text-left">
                  <Users size={18} className="text-white/30" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Who</p>
                    <p className="text-sm font-medium">Add Guests</p>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full md:w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shrink-0">
                <Search size={24} />
              </button>
            </div>
          </motion.div>

    
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Trending Now:</span>
            {['Lunar Ritual', 'Sahara Stays', 'Alpine Food'].map((term) => (
              <button key={term} className="text-xs font-medium text-white/40 hover:text-white transition-colors flex items-center gap-1 group">
                {term} <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
            <div className="h-4 w-px bg-white/10" />
            <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
              <Play size={14} fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-widest">View Reel</span>
            </button>
          </motion.div>
        </div>
      </div>

    
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] vertical-text">Explore Selects</span>
      </div>
    </section>
  );
}