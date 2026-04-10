import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/assets/lkp_hero_cinematic.png" 
          alt="LKP Hero" 
          className="w-full h-full object-cover brightness-[0.5] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8 px-4 py-2 rounded-full glass border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-stay animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">
                Pioneering the Unseen since 2012
              </span>
            </motion.div>

            <div className="relative mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[140px] font-serif italic leading-[0.85] text-white/90"
              >
                Reconnect <br />
                <span className="font-sans not-italic font-medium text-white tracking-tighter">with Silence.</span>
              </motion.h1>
              
              {/* Decorative Floating Element */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 hidden md:block"
              >
                <div className="w-32 h-32 rounded-full glass border-white/5 flex items-center justify-center p-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-center leading-tight text-white/40">
                    Est. <br /> Collective
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/40 max-w-2xl font-light leading-relaxed mb-16"
            >
              A global collective of curators dedicated to mapping the world's most 
              isolated, profound, and transformative encounters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-8"
            >
              <button className="group relative px-12 py-5 bg-white text-black rounded-full font-display font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 leading-none">
                <span className="relative z-10 flex items-center gap-3">
                  Begin Journey <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white to-gray-200" />
              </button>
              
              <button className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
                  <Play size={18} fill="currentColor" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Watch Editorial</p>
                  <p className="font-medium">The 2026 Collection</p>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Meta Info */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-12 hidden lg:flex items-center gap-6"
      >
        <div className="flex -space-x-3">
          {[1,2,3].map(i => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
               <div className="w-full h-full bg-white/10" />
            </div>
          ))}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
          9.4k Explorers <br /> Active Currently
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="w-10 h-16 rounded-full border border-white/10 flex justify-center p-2">
          <motion.div 
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-white/40" 
          />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 vertical-text">Scroll</span>
      </motion.div>
    </section>
  );
}
