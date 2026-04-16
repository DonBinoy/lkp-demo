import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, Plus, Minus, ChevronRight, Activity, ShieldCheck, Star, MapPin, Clock, Users, Globe, Info, Heart, Share2, Calendar, Map as MapIcon, ChevronDown, Camera, Backpack, Utensils, Tent, Video, MousePointer2 } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState, useEffect, useRef, useMemo } from 'react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Camera: Camera,
  Backpack: Backpack,
  Utensils: Utensils,
  Tent: Tent,
  Video: Video,
  Plus: Plus
};

// --- Custom Components for High-Fidelity ---

const Spotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(1200px circle at ${x}px ${y}px, rgba(255,255,255,0.015), transparent 80%)`
  );

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[11]"
      style={{
        background: spotlightBg,
      }}
    />
  );
};

const MagneticButton = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  const shimmerX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shimmerY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const shimmerBg = useTransform(
    [shimmerX, shimmerY],
    ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.1), transparent 70%)`
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1200, transformStyle: "preserve-3d" }}
      className={`relative group/tilt ${className}`}
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover/tilt:opacity-40 transition-opacity rounded-[inherit]"
        style={{
          background: shimmerBg,
        }}
      />
      {children}
    </motion.div>
  );
};

const CharacterReveal = ({ text, className }: { text: string; className: string }) => {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] whitespace-nowrap">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

const GhostGoat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: '20%', right: '-50px' });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) { // Increased probability
        const tops = ['20%', '45%', '70%'];
        setPosition({ top: tops[Math.floor(Math.random() * tops.length)], right: '2%' }); // More visible right position
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 4000);
      }
    }, 8000); // More frequent check
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          className="fixed z-50 pointer-events-none"
          style={{ top: position.top, right: position.right }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20 glow-white">
            <path d="M16 18l2 2 2-2" /><path d="M8 18l-2 2-2-2" /><path d="M12 12l2 2 2-2" /><path d="M12 12l-2 2-2-2" />
            <circle cx="12" cy="7" r="3" /><path d="M9 10.5V14a3 3 0 003 3h0a3 3 0 003-3v-3.5" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Fireflies = () => {
  const flies = useMemo(() => [...Array(15)].map(() => ({
    xStart: Math.random() * 100 + "%",
    yStart: Math.random() * 100 + "%",
    xEnd: Math.random() * 100 + "%",
    yEnd: Math.random() * 100 + "%",
    duration: Math.random() * 10 + 10
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {flies.map((fly, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: fly.xStart, 
            y: fly.yStart, 
            opacity: 0,
            scale: 0 
          }}
          animate={{
            x: [null, fly.xEnd],
            y: [null, fly.yEnd],
            opacity: [0, 0.4, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: fly.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'blur(1px) drop-shadow(0 0 5px rgba(255,255,255,0.8))' }}
        />
      ))}
    </div>
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .group/tilt, .cursor-pointer');
      setIsHovered(!!isInteractive);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-[999] pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full z-[998] pointer-events-none mix-blend-difference"
        animate={{ 
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)'
        }}
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};

const Topography = ({ progress }: { progress: import("framer-motion").MotionValue<number> }) => {
  const opacity = useTransform(progress, [0, 1], [0.03, 0.1]);
  const pathLength = useTransform(progress, [0, 1], [0.3, 1]);
  
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none mix-blend-overlay"
      style={{ opacity }}
    >
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M0 100 Q250 50 500 100 T1000 100 M0 300 Q250 250 500 300 T1000 300 M0 500 Q250 450 500 500 T1000 500 M0 700 Q250 650 500 700 T1000 700 M0 900 Q250 850 500 900 T1000 900" 
          stroke="white" 
          strokeWidth="0.5"
          style={{ pathLength }}
        />
      </svg>
    </motion.div>
  );
};

const BirdSilhouette = () => {
  return (
    <motion.div
      initial={{ x: '-10%', y: '20%', opacity: 0 }}
      animate={{ 
        x: ['110%', '-10%'], 
        y: ['20%', '25%', '18%', '22%'],
        opacity: [0, 0.1, 0.1, 0] 
      }}
      transition={{ 
        duration: 25, 
        repeat: Infinity, 
        delay: 5,
        ease: "linear"
      }}
      className="fixed pointer-events-none z-10"
    >
      <svg width="60" height="20" viewBox="0 0 1000 400" fill="none" stroke="white" strokeWidth="2" className="opacity-40">
        <motion.path 
          d="M0 200 Q250 0 500 200 Q750 400 1000 200" 
          animate={{ d: ["M0 200 Q250 0 500 200 Q750 400 1000 200", "M0 200 Q250 400 500 200 Q750 0 1000 200"] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
};

const ScrollProgress = ({ scrollYProgress }: { scrollYProgress: import("framer-motion").MotionValue<number> }) => {
  const pathLength = scrollYProgress;
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const percentage = useTransform(scrollYProgress, (v: number) => `${Math.round(v * 100)}%`);

  return (
    <div className="fixed bottom-12 right-12 z-[150] w-16 h-16 flex items-center justify-center pointer-events-none">
       <svg className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="transparent" />
          <motion.circle 
             cx="32" cy="32" r="30" 
             stroke="white" 
             strokeWidth="1" 
             fill="transparent"
             style={{ pathLength, filter: 'drop-shadow(0 0 8px white)' }}
          />
       </svg>
       <motion.span 
         className="absolute text-[8px] font-black font-sans uppercase tracking-tighter"
         style={{ opacity }}
       >
         {percentage}
       </motion.span>
    </div>
  );
};

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = EXPERIENCES.find(e => e.id === Number(id));
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [guests, setGuests] = useState(1);
  const [isBooked, setIsBooked] = useState(false);
  const selectedDate = 'Select date';
  const selectedTime = 'Select time';
  const [scrolled, setScrolled] = useState(false);

  // --- Hooks must be called before any early returns ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const heroRadiusValue = useTransform(scrollYProgress, [0, 0.2], [48, 32]);
  const heroRadius = useTransform(heroRadiusValue, (v: number) => `${v}px`);
  const summitBg = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const ghostTextY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const sidebarShadow = useTransform(scrollYProgress, [0.4, 0.5], ["0 0 0 rgba(255,255,255,0)", "0 20px 50px -20px rgba(255,255,255,0.05)"]);

  const [selectedAddonIds, setSelectedAddonIds] = useState<number[]>([]);

  const toggleAddon = (id: number) => {
    setSelectedAddonIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedAddonsFull = experience?.addons?.filter(a => selectedAddonIds.includes(a.id)) || [];
  const addonsTotal = selectedAddonsFull.reduce((sum, a) => sum + a.price, 0);
  const finalTotal = (experience?.price || 0) * guests + addonsTotal;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!experience || experience.type !== 'experience') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/20 font-sans uppercase tracking-[0.4em]">
        Experience Unavailable
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6 relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[150px]" 
        />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-white/10 text-white shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            <ShieldCheck size={40} />
          </div>
          <CharacterReveal text="Booking Confirmed." className="text-4xl md:text-6xl font-display font-black text-white mb-6 uppercase tracking-tighter" />
          <p className="text-white/40 mb-10 max-w-sm mx-auto leading-relaxed">Your journey has been reserved. Prepare for the extraordinary.</p>
          <MagneticButton onClick={() => navigate('/')} className="px-10 py-4 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.2)]">Back to Explore</MagneticButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#000] min-h-screen text-white selection:bg-white selection:text-black font-sans pb-32 relative cursor-none" ref={containerRef}>
      
      <CustomCursor />

      {/* Mysterious Nature & Masterpiece Layers */}
      <Spotlight />
      <GhostGoat />
      <Topography progress={scrollYProgress} />
      
      {/* Background Summit Transition */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent"
        style={{ opacity: summitBg }}
      />
      <BirdSilhouette />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Fireflies />
        <motion.div 
          animate={{ x: [0, 150, -150, 0], y: [0, -200, 200, 0], scale: [1, 1.4, 1] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[1500px] h-[1500px] bg-white/[0.03] rounded-full blur-[250px]" 
        />
        <motion.div 
          animate={{ x: [0, -200, 200, 0], y: [0, 250, -250, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -left-1/4 w-[1800px] h-[1800px] bg-white/[0.02] rounded-full blur-[300px]" 
        />
        <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black" />
      </div>

      {/* Ghost Parallax Background Text */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden mix-blend-overlay">
        <motion.h2 
          style={{ y: ghostTextY }}
          className="text-[25vw] font-display font-black uppercase text-white/[0.02] tracking-tighter leading-none whitespace-nowrap"
        >
          {experience.title}
        </motion.h2>
      </div>

      <ScrollProgress scrollYProgress={scrollYProgress} />
      
      {/* Sticky Header with Dynamic Backdrop */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 h-24 bg-black/40 backdrop-blur-3xl z-[100] border-b border-white/5 flex items-center justify-between px-6 lg:px-24"
          >
            <div className="flex items-center gap-5">
              <motion.div layoutId="mini-hero" className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <img src={experience.image} className="w-full h-full object-cover" alt="" />
              </motion.div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">{experience.title}</h4>
                <div className="flex items-center gap-2 text-[9px] text-white/30 uppercase font-bold tracking-widest italic">
                  <Star size={10} className="fill-white text-white" /> {experience.rating} <span className="text-white/20 px-2">•</span> Elite Experience
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
               <div className="hidden md:block text-right">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] block mb-1">Starting from</span>
                  <span className="text-sm font-black tracking-tighter">INR {experience.price}</span>
               </div>
               <MagneticButton 
                 onClick={() => window.scrollTo({ top: document.getElementById('booking-box')?.offsetTop || 0, behavior: 'smooth'})}
                 className="px-10 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
               >
                 Reserve
               </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 pt-24 lg:pt-32 relative z-10">
        
        {/* Cinematic Navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center mb-16">
          <MagneticButton onClick={() => navigate('/')} className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group px-6 py-3 rounded-full border border-white/5 hover:bg-white/5">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to catalog</span>
          </MagneticButton>
          <div className="flex items-center gap-3">
             <MagneticButton className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"><Share2 size={16} /></MagneticButton>
             <MagneticButton className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"><Heart size={16} /></MagneticButton>
          </div>
        </motion.div>

        {/* Hero Title with Character Reveal */}
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="mb-16 space-y-4">
          <CharacterReveal 
            text={experience.title} 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-[0.9] text-glow" 
          />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
             <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.03] rounded-full border border-white/10 group cursor-default">
                <Star size={14} className="fill-white text-white group-hover:scale-110 transition-transform" />
                <span className="text-white">{experience.rating} (Top Rated)</span>
             </div>
             <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                <MapPin size={14} className="group-hover:bounce" />
                <span className="underline decoration-white/20 underline-offset-8 decoration-2">{experience.location}</span>
             </div>
          </motion.div>
        </motion.div>

        {/* 3D Tilt Image Grid with Scale-down effect */}
        <TiltCard className="mb-24 relative">
          <motion.div 
            style={{ scale: heroScale, borderRadius: heroRadius }}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 aspect-[16/10] md:aspect-[21/9] overflow-hidden border border-white/10 shadow-3xl transform-style-3d bg-black"
          >
            <motion.div className="md:col-span-2 md:row-span-2 relative cursor-none overflow-hidden group">
               <img src={experience.gallery?.[0] || experience.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                     <MousePointer2 size={32} />
                  </div>
               </div>
            </motion.div>
            {[1,2,3,4].map((idx) => (
              <div key={idx} className="relative cursor-pointer overflow-hidden border-l border-white/5">
                 <img src={experience.gallery?.[idx] || experience.image} className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700 hover:scale-110" alt="" />
                 <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors" />
              </div>
            ))}
          </motion.div>
          {/* Depth Badge */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </TiltCard>

        {/* Balanced Content Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-8">
            
            {/* High-Concept Specs */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
               {[
                 { icon: <Clock size={24} />, label: "Timing", val: experience.duration },
                 { icon: <Activity size={24} />, label: "Level", val: experience.difficulty || 'Pro' },
                 { icon: <Users size={24} />, label: "Capacity", val: `Max ${experience.groupSize}` },
                 { icon: <Globe size={24} />, label: "Lingua", val: experience.languages?.[0] || 'Select' }
               ].map((spec, i) => (
                 <motion.div 
                   key={i} 
                   whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.03)' }}
                   className="p-10 border border-white/5 rounded-[40px] bg-white/[0.01] transition-all group relative overflow-hidden"
                 >
                    <div className="absolute -right-4 -bottom-4 text-white/[0.02] scale-[3] group-hover:text-white/[0.05] transition-colors">{spec.icon}</div>
                    <div className="mb-6 text-white/30 group-hover:text-white transition-colors transform-gpu group-hover:scale-110 origin-left">{spec.icon}</div>
                    <span className="text-[10px] font-black uppercase text-white/10 block mb-2 tracking-[0.3em]">{spec.label}</span>
                    <span className="text-sm font-black uppercase tracking-widest">{spec.val}</span>
                 </motion.div>
               ))}
            </motion.div>

            {/* Narrative Section */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-12 mb-32 border-l-[3px] border-white/20 pl-16 py-4">
               <h3 className="text-[11px] font-black uppercase tracking-[0.8em] text-white/10 italic">The Experience Vision</h3>
               <p className="text-3xl lg:text-5xl font-display font-black uppercase leading-[0.9] tracking-tighter text-white/80">
                 "{experience.longDescription || experience.description}"
               </p>
               <motion.button whileHover={{ gap: "2rem" }} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-white transition-all">
                  Access Complete Dossier <div className="w-12 h-px bg-white/20 group-hover:w-24 transition-all" />
               </motion.button>
            </motion.div>

            {/* Add-ons: "Gear Up" Station */}
            {experience.addons && (
               <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="mb-32">
                  <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
                     <div>
                        <h3 className="text-5xl lg:text-6xl font-display font-black uppercase tracking-tighter mb-4 italic">The Armory.</h3>
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20">Upgrade your journey with professional gear</p>
                     </div>
                     <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-white/30">Select during reservation</span>
                  </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {experience.addons.map((addon) => {
                       const IconComp = iconMap[addon.icon || 'Plus'];
                       const isSelected = selectedAddonIds.includes(addon.id);
                       return (
                         <motion.div 
                           key={addon.id} 
                           onClick={() => toggleAddon(addon.id)}
                           whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.04)' }}
                           className={`flex items-center justify-between p-8 border ${isSelected ? 'border-white/40 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'border-white/5 bg-white/[0.01]'} rounded-[32px] transition-all group cursor-pointer relative overflow-hidden`}
                         >
                            {isSelected && (
                              <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center text-black shadow-lg z-20"
                              >
                                <ShieldCheck size={14} />
                              </motion.div>
                            )}
                            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl group-hover:bg-white/[0.03] transition-colors" />
                            <div className="flex items-center gap-8 relative z-10">
                               <div className={`w-16 h-16 rounded-[20px] ${isSelected ? 'bg-white text-black' : 'bg-white/5 text-white/20'} flex items-center justify-center group-hover:scale-110 transition-all`}>
                                  <IconComp size={28} />
                               </div>
                               <div>
                                  <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-2">{addon.title}</h4>
                                  <span className={`text-[10px] font-bold ${isSelected ? 'text-white' : 'text-white/20'} uppercase tracking-[0.3em] block`}>
                                    {isSelected ? '✓ Selected' : 'Select Upgrade'}
                                  </span>
                               </div>
                            </div>
                            <div className="text-right relative z-10">
                               <span className="text-xl font-display font-black tracking-tight block">+ {addon.price}</span>
                               <span className="text-[9px] font-black uppercase tracking-tighter text-white/10 italic">Per Session</span>
                            </div>
                         </motion.div>
                       );
                     })}
                  </div>
               </motion.div>
            )}

            {/* Terrain & Infrastructure */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-32">
               <div className="flex items-center gap-6 mb-12">
                  <div className="w-2 h-12 bg-white rounded-full glow-white" />
                  <h3 className="text-4xl font-display font-black uppercase tracking-tight italic">Terrain Grid.</h3>
               </div>
               <div className="group relative">
                 <TiltCard className="w-full aspect-[21/9] rounded-[40px] overflow-hidden bg-white/[0.02] border border-white/10 relative shadow-2xl scale-[1.01]">
                    <div className="absolute inset-0 bg-white/[0.01] flex items-center justify-center">
                       <MapIcon size={120} className="text-white/[0.02] group-hover:text-white/[0.05] transition-all duration-1000" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                    <div className="absolute bottom-12 left-12 p-10 backdrop-blur-3xl bg-black/40 border border-white/10 rounded-[40px] max-w-sm transition-all group-hover:translate-y-[-10px] group-hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)]">
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 block mb-4">Base Coordinates</span>
                       <p className="text-xl font-display font-black uppercase tracking-tighter mb-8 leading-tight">{experience.meetingPoint}</p>
                       <MagneticButton className="px-8 py-4 bg-white text-black rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all">Launch Satellite Map</MagneticButton>
                    </div>
                 </TiltCard>
               </div>
            </motion.section>

            {/* Protocols Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
               <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/10 mb-10 pb-6 border-b border-white/5">Required Kit</h3>
                  <div className="grid grid-cols-2 gap-4">
                      {(experience.whatToBring || []).map((item, i) => (
                        <div key={i} className="px-6 py-5 border border-white/5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.04] transition-all relative group overflow-hidden">
                           <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full" />
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 relative z-10">{item}</span>
                        </div>
                      ))}
                  </div>
               </motion.div>
               <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/10 mb-10 pb-6 border-b border-white/5">Strict Protocols</h3>
                  <div className="space-y-8">
                     <div className="flex gap-6 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white transition-colors"><Info size={20} /></div>
                        <div>
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Participant Req</h4>
                           <p className="text-[10px] font-bold text-white/20 uppercase leading-loose tracking-[0.1em]">{experience.guestRequirements}</p>
                        </div>
                     </div>
                     <div className="flex gap-6 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white transition-colors"><Calendar size={20} /></div>
                        <div>
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Refund Policy</h4>
                           <p className="text-[10px] font-bold text-white/20 uppercase leading-loose tracking-[0.1em]">{experience.cancellationPolicy}</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>

          </div>

          <div className="lg:col-span-4 relative z-20">
             <motion.div 
               className="sticky top-24" 
               style={{ 
                 boxShadow: sidebarShadow
               }}
               initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, type: "spring" }}
             >
                <TiltCard className="p-8 border border-white/10 rounded-[32px] bg-white/[0.01] backdrop-blur-[100px] shadow-[0_100px_200px_-50px_rgba(255,255,255,0.05)] relative overflow-hidden group border-glow">
                   <Fireflies />
                   
                   {/* Prismatic Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.03] opacity-20 group-hover:opacity-60 transition-opacity pointer-events-none" />
                   
                   <div className="relative z-10">
                      <div className="flex justify-between items-baseline mb-12 pb-10 border-b border-white/5">
                         <div>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 block mb-2">Exp Investment</span>
                            <span className="text-4xl font-display font-black tracking-tighter text-glow">INR {experience.price}</span>
                         </div>
                         <div className="text-right">
                            <Star size={16} className="fill-white inline mb-2" />
                            <span className="text-lg font-black ml-2">5.0</span>
                         </div>
                      </div>

                      <div className="space-y-6 mb-12">
                         <div className="grid grid-cols-2 rounded-[30px] overflow-hidden border border-white/5 bg-white/[0.02]">
                            <button className="p-6 border-r border-white/5 hover:bg-white/10 transition-all text-left group/btn relative">
                               <span className="text-[9px] font-black uppercase text-white/20 block mb-3 tracking-[0.3em]">Select Date</span>
                               <div className="flex justify-between items-center text-[12px] font-black uppercase tracking-widest text-white/60 group-hover/btn:text-white transition-colors">
                                  {selectedDate} <ChevronDown size={14} />
                               </div>
                            </button>
                            <button className="p-6 hover:bg-white/10 transition-all text-left group/btn relative">
                               <span className="text-[9px] font-black uppercase text-white/20 block mb-3 tracking-[0.3em]">Arrival Time</span>
                               <div className="flex justify-between items-center text-[12px] font-black uppercase tracking-widest text-white/60 group-hover/btn:text-white transition-colors">
                                  {selectedTime} <ChevronDown size={14} />
                               </div>
                            </button>
                         </div>

                         <div className="p-8 border border-white/5 rounded-[30px] bg-white/[0.01]">
                            <div className="flex justify-between items-center text-[12px] font-black uppercase tracking-widest mb-6">
                               <span className="text-white/40">Travelers</span>
                               <div className="flex items-center gap-8">
                                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-lg"><Minus size={14} /></motion.button>
                                  <span className="text-sm font-black w-4 text-center">{guests}</span>
                                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setGuests(guests + 1)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-lg"><Plus size={14} /></motion.button>
                               </div>
                            </div>
                            <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.3em] block text-center">Exclusive Group: Limited to 12</span>
                         </div>
                      </div>

                      <MagneticButton 
                         onClick={() => setIsBooked(true)}
                         className="w-full py-10 bg-white text-black rounded-full font-display font-black uppercase text-[12px] tracking-[0.6em] flex items-center justify-center gap-6 shadow-[0_30px_60px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-transform"
                      >
                         Initiate Reservation <ChevronRight size={22} />
                      </MagneticButton>
                      
                      <div className="mt-12 space-y-4 pt-10 border-t border-white/5">
                         <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.4em] text-white/20 italic">
                            <span>Base Rate x {guests}</span>
                            <span>INR {(experience.price * guests).toLocaleString()}</span>
                         </div>
                         {selectedAddonsFull.map(addon => (
                            <div key={addon.id} className="flex justify-between text-[11px] font-black uppercase tracking-[0.4em] text-white/40 italic">
                               <span>+ {addon.title}</span>
                               <span>INR {addon.price.toLocaleString()}</span>
                            </div>
                         ))}
                         <div className="flex justify-between text-2xl font-display font-black tracking-tight pt-6 border-t border-white/[0.02]">
                            <span className="uppercase italic tracking-tighter text-white/40">Total Val.</span>
                            <span className="text-white text-glow">INR {finalTotal.toLocaleString()}</span>
                         </div>
                      </div>
                   </div>
                </TiltCard>

                <div className="mt-10 flex items-center justify-center gap-5 text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
                   <ShieldCheck size={20} className="glow-white opacity-20" /> Biometric-verified Checkout
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
