import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  
  // Animation Variants for structural staggered drops
  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 }
    }
  };

  const item: any = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen bg-[#050505] p-4 md:p-8 flex flex-col justify-between overflow-hidden">
      
      {/* High-End Gallery Frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-4 md:inset-8 border border-white/10 rounded-[40px] overflow-hidden z-0"
      >
        <motion.img 
          initial={{ scale: 1.1, filter: "grayscale(100%)" }}
          animate={{ scale: 1, filter: "grayscale(30%)" }}
          transition={{ duration: 15, ease: "easeOut" }}
          src="/assets/lkp_hero_cinematic.png" 
          className="w-full h-full object-cover" 
        />
        {/* Subtle, elegant gradient overlay instead of heavy black */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 z-10" />
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col h-full flex-grow justify-between pt-32 pb-12 pointer-events-none"
      >
        
        {/* Top Minimalist Info Bar */}
        <motion.div variants={item} className="flex justify-between items-start">
          <div className="flex gap-16">
            <div>
              <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">Chapter</span>
              <span className="text-sm font-serif italic text-white/80">01 / Volume II</span>
            </div>
          </div>
          <div className="text-right">
             <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">Location</span>
             <span className="text-sm font-serif italic text-white/80">Global Archive</span>
          </div>
        </motion.div>

        {/* Ultra-Premium Typography Lockup */}
        <div className="flex-grow flex flex-col justify-center">
          <motion.div variants={item} className="max-w-5xl">
            <span className="block text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-8 ml-2">Access The Unseen</span>
            <h1 className="text-7xl md:text-[11vw] leading-[0.85] tracking-tighter text-white">
              <span className="font-serif italic font-light block hover:text-stay transition-colors duration-1000 pointer-events-auto">Curated</span>
              <span className="font-display font-black uppercase ml-12 md:ml-[10vw]">Escapes.</span>
            </h1>
          </motion.div>
        </div>

        {/* Hyper-Minimalist Search/Booking Interface */}
        <motion.div 
          variants={item}
          className="flex flex-col md:flex-row justify-between items-end gap-12 pointer-events-auto"
        >
          {/* Natural Language Form */}
          <div className="w-full md:w-auto">
             <p className="text-2xl md:text-3xl font-serif italic text-white/50 flex flex-wrap items-center gap-y-4 gap-x-3 leading-loose">
               <span>I wish to travel to</span>
               <span className="relative inline-block px-2 group cursor-text">
                 <input type="text" placeholder="anywhere" className="bg-transparent border-b border-white/20 outline-none text-white font-display not-italic font-medium w-32 md:w-48 placeholder-white/20 focus:border-white transition-colors text-center pb-1" />
               </span>
               <span>during</span>
               <span className="relative inline-block px-2 group cursor-pointer">
                 <span className="border-b border-white/20 pb-1 text-white font-display not-italic font-medium hover:border-white transition-colors">Autumn</span>
               </span>
               <span>for</span>
               <span className="relative inline-block px-2 group cursor-pointer">
                 <span className="border-b border-white/20 pb-1 text-white font-display not-italic font-medium hover:border-white transition-colors">Serenity</span>.
               </span>
             </p>
          </div>

          {/* Minimalist CTA */}
          <button 
             data-cursor="discover"
             className="shrink-0 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-700 bg-black/20 backdrop-blur-md"
          >
             <ArrowRight size={24} className="-rotate-45 hover:rotate-0 transition-transform duration-500" />
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}
