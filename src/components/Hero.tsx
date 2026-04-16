import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';

const SLIDES = [
  {
    image: "/assets/lkp_hero_cinematic.png",
    title: "Curated Escapes.",
    subtitle: "Explore the Unseen",
    location: "Global Collection",
    particles: "dust"
  },
  {
    image: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?auto=format&fit=crop&q=80&w=2000",
    title: "Arctic Silence.",
    subtitle: "Pristine Wilderness",
    location: "Svalbard, Norway",
    particles: "snow"
  },
  {
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000",
    title: "Jungle Rituals.",
    subtitle: "Ancient Canopy",
    location: "Amazon Basin",
    particles: "fireflies"
  },
  {
    image: "https://images.unsplash.com/photo-1518005020251-58d7c04192b4?auto=format&fit=crop&q=80&w=2000",
    title: "Sacred Bali.",
    subtitle: "Isle of Gods",
    location: "Ubud, Indonesia",
    particles: "glow"
  }
];

const Particles = ({ type }: { type: string }) => {
  const count = 30;
  const particles = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 2,
      opacity: Math.random() * 0.5,
      duration: 10 + Math.random() * 20,
      width: Math.random() * 4,
      height: Math.random() * 4,
      animXStart: Math.random() * 100,
      animXEnd: (Math.random() * 100 + 5)
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p: any) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full blur-[1px] ${
            type === 'snow' ? 'bg-white/40' : 
            type === 'fireflies' ? 'bg-green-300/30' : 
            'bg-white/10'
          }`}
          initial={{ 
            x: p.x + "%", 
            y: p.y + "%", 
            scale: p.scale,
            opacity: p.opacity 
          }}
          animate={{ 
            y: ["0%", "100%"],
            x: [p.animXStart + "%", p.animXEnd + "%"],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ 
            width: p.width + "px", 
            height: p.height + "px" 
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const moveX = useTransform(springX, [0, 1], [15, -15]);
  const moveY = useTransform(springY, [0, 1], [15, -15]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      className="relative min-h-[90vh] bg-[#050505] p-4 md:p-8 flex flex-col justify-between overflow-hidden cursor-none"
    >
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <motion.div className="absolute inset-4 md:inset-8 border border-white/10 rounded-[40px] overflow-hidden z-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <motion.div style={{ x: moveX, y: moveY, scale: 1.15 }} className="absolute inset-0">
              <motion.img 
                initial={{ scale: 1.1, filter: "grayscale(100%)" }}
                animate={{ scale: 1.05, filter: "grayscale(20%)" }}
                transition={{ duration: 12, ease: "easeOut" }}
                src={slide.image} 
                className="w-full h-full object-cover" 
              />
            </motion.div>
            <Particles type={slide.particles} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/10 z-10" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 w-full h-1 z-20 overflow-hidden">
           <motion.div 
            key={currentSlide}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 10, ease: "linear" }}
            className="w-full h-full bg-white/40"
           />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col h-full flex-grow pt-24 pb-12 pointer-events-none">
        
        <div className="flex justify-between items-start mb-8">
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 items-center">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Marketplace / Live</span>
           </motion.div>
           <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">LKP / 2026</span>
           </div>
        </div>

        <div className="flex-grow flex flex-col justify-center">
            <div className="max-w-6xl pointer-events-auto">
               <AnimatePresence mode="wait">
                 <motion.div key={`text-${currentSlide}`} className="overflow-hidden">
                   <motion.span 
                    initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-[10px] font-black uppercase tracking-[0.6em] text-white/50 mb-8 ml-2"
                   >
                     {slide.subtitle}
                   </motion.span>
                   <h1 className="text-7xl md:text-[11vw] leading-[0.8] tracking-tighter text-white font-display font-black uppercase overflow-hidden">
                      {slide.title.split('').map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ y: "100%" }} animate={{ y: 0 }}
                          transition={{ delay: i * 0.01, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className="inline-block"
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                   </h1>
                 </motion.div>
               </AnimatePresence>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12 pointer-events-auto">
           <div className="w-full md:w-auto">
              <p className="text-xl md:text-3xl font-serif italic text-white/40 flex flex-wrap items-center gap-y-4 gap-x-4 leading-normal">
                <span>Discover the</span>
                <span className="border-b border-white/20 pb-1 text-white font-display not-italic font-black uppercase text-xl md:text-2xl hover:border-white transition-colors cursor-pointer tracking-widest">Unseen</span>
                <span>in</span>
                <span className="border-b border-white/20 pb-1 text-white font-display not-italic font-black uppercase text-xl md:text-2xl hover:border-white transition-colors cursor-pointer tracking-widest">{slide.location}</span>
              </p>
           </div>

           <div className="flex items-center gap-8">
              <div className="hidden lg:flex gap-2">
                 {SLIDES.map((_, i) => (
                   <button key={i} onClick={() => setCurrentSlide(i)} className="w-8 h-8 flex items-center justify-center group">
                     <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${i === currentSlide ? 'bg-white scale-150' : 'bg-white/20 group-hover:bg-white/40'}`} />
                   </button>
                 ))}
              </div>
              <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-700 bg-black/40 backdrop-blur-xl group">
                <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-700" />
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}
