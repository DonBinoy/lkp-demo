import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const x = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* SVG Noise Filter */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Abstract Background Elements instead of single image */}
      <motion.div 
        style={{ x, y }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-70"
      >
        <div className="absolute w-[800px] h-[800px] bg-stay/20 blur-[150px] rounded-full mix-blend-screen translate-x-1/2 -translate-y-1/4" />
        <div className="absolute w-[600px] h-[600px] bg-experience/20 blur-[150px] rounded-full mix-blend-screen -translate-x-1/4 translate-y-1/3" />
      </motion.div>

      {/* Main Buttermax Structure */}
      <div className="container mx-auto px-6 relative z-10 pt-32 h-full flex flex-col justify-between">
        
        {/* Top Info Bar */}
        <div className="flex justify-between items-start mb-20">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-1/3 text-xs uppercase tracking-[0.3em] font-black leading-relaxed text-white/40 border-l border-white/20 pl-6">
            A New Era Of <br/> Intentional Travel <br/> [Est. 2026]
          </motion.p>
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="w-16 h-16 rounded-full border border-white/20 flex flex-col items-center justify-center relative spin-slow"
          >
             <span className="text-[8px] absolute top-2 uppercase tracking-widest font-black">Scroll</span>
             <div className="w-px h-6 bg-white/50" />
          </motion.div>
        </div>

        {/* Extreme Typography */}
        <div className="relative z-10 -ml-4 md:-ml-12 mb-20" data-cursor="discover">
          <h1 className="text-[12vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap overflow-visible flex flex-col">
            
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 1, type: "spring" }} className="flex items-center gap-4">
              <span className="font-serif italic font-light hover:text-stay transition-colors duration-700">Curate</span>
              <span className="font-display font-black text-white mix-blend-overlay">The</span>
            </motion.div>
            
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 1, type: "spring" }} className="flex items-center gap-6 ml-[10vw]">
              <span className="font-display font-black">Unseen</span>
              
              {/* Inline Pill Image */}
              <motion.div 
                whileHover={{ width: "30vw" }}
                className="w-[15vw] h-[8vw] rounded-full overflow-hidden relative box-border transform -rotate-6 shadow-2xl transition-all duration-700 pointer-events-auto"
              >
                <img src="/assets/lkp_desert_experience.png" className="w-[150%] h-[150%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              <span className="font-serif italic font-light text-white/50">&amp;</span>
            </motion.div>

            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 1, type: "spring" }} className="flex items-center gap-6">
              {/* Inline Pill Image 2 */}
              <div className="w-[10vw] h-[10vw] rounded-full overflow-hidden relative border border-white/20 ml-[5vw]">
                 <img src="/assets/lkp_stay_lodge.png" className="w-[150%] h-[150%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <span className="font-display font-black text-transparent [-webkit-text-stroke:2px_white] hover:[-webkit-text-stroke:4px_white] transition-all duration-500">
                Experience
              </span>
            </motion.div>
            
          </h1>
        </div>

        {/* Bottom Search / Interaction bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-10"
        >
          <p className="text-xl font-serif italic text-white/60 mb-8 md:mb-0 max-w-sm">
            Leave behind the standard itineraries. Request access to our private global catalog.
          </p>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-64 glass rounded-full px-6 py-4 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
               <span className="text-xs font-black uppercase tracking-widest">Search Catalog</span>
               <Search size={16} className="group-hover:scale-125 transition-transform" />
            </div>
            <button className="px-8 py-4 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-stay hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
               Apply <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
