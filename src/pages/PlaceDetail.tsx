import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, ShieldCheck, Accessibility, Briefcase, AlertCircle, 
  Minus, ChevronRight, Play, ChevronLeft, Compass, MapPin, Activity, Globe, Map
} from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState, useEffect } from 'react';

export default function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = EXPERIENCES.find(e => e.id === Number(id));
  const [visitorToggle, setVisitorToggle] = useState(false);
  const [connectivityToggle, setConnectivityToggle] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const gallery = [
    place?.gallery?.[0] || place?.image || '',
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
  ];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % gallery.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (!place || place.type !== 'place') {
    return (
      <div className="min-h-screen bg-[#000] flex items-center justify-center text-white/20 font-sans uppercase tracking-[0.3em] text-[10px]">
        Signal Lost: Location Archive 404
      </div>
    );
  }

  const extendedData = {
    identity: { managedBy: "Alpine Serenity Reserves Community", category: "FOREST" },
    location: { lat: "22.33825", lng: "29.60326" },
    connectivity: { railway: ["South Glacier Station"], airports: ["Astra Heliport"] },
    availability: { opening: "05:00 AM", closing: "08:00 PM", seasonal: "Closed Jan-Feb" },
    safety: { 
      suitable: ["Family", "Solo", "Group"], 
      rules: ["No open fires", "Drones by permit only", "Take only memories"],
      carry: ["Thermal layers", "Emergency Beacon"],
      avoid: ["Solo night treks", "Fauna interaction"]
    }
  };

  return (
    <div className="bg-[#000] min-h-screen text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden cursor-none">
      
      {/* CUSTOM CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[300] hidden lg:flex items-center justify-center mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 35, stiffness: 450, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </motion.div>

      {/* BACKGROUND AMBIANCE */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-full h-full bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-20" />
      </div>

      {/* ── FULL SCREEN HERO SECTION ── */}
      <div className="relative h-[90vh] w-full overflow-hidden group">
         <AnimatePresence initial={false}>
            <motion.div 
              key={currentHeroIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
               <img src={gallery[currentHeroIndex]} className="w-full h-full object-cover" alt="Hero" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
               <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#000] to-transparent opacity-90" />
            </motion.div>
         </AnimatePresence>

         <div className="absolute bottom-0 inset-x-0 p-8 lg:p-20 z-20 flex flex-col justify-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
               <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 mb-3 ml-1">Location Archive // 0{currentHeroIndex + 1}</h2>
               <h1 className="text-5xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-none">{place.title}</h1>
               
               <div className="flex items-center gap-8 mt-10">
                  <div className="flex gap-3">
                     {gallery.map((_, i) => (
                       <button key={i} onClick={() => setCurrentHeroIndex(i)} className={`h-1 transition-all duration-500 ${currentHeroIndex === i ? 'w-10 bg-white' : 'w-4 bg-white/20'}`} />
                     ))}
                  </div>
               </div>
            </motion.div>
         </div>

         <button onClick={() => setCurrentHeroIndex((prev) => (prev - 1 + gallery.length) % gallery.length)} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black z-30 backdrop-blur-md"><ChevronLeft size={20} /></button>
         <button onClick={() => setCurrentHeroIndex((prev) => (prev + 1) % gallery.length)} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black z-30 backdrop-blur-md"><ChevronRight size={20} /></button>
      </div>

      {/* ── CORE CONTENT ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 py-24 space-y-32">
        
        {/* SYNOPSIS MODULE */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">
           <div className="xl:col-span-8 space-y-16">
              <div className="relative">
                 <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8 font-sans flex items-center gap-4"><div className="w-10 h-px bg-white/10" />Analysis</h2>
                 <p className="text-3xl lg:text-5xl text-white leading-tight font-serif italic tracking-tight relative z-10">{place.longDescription || place.description}</p>
                 <div className="absolute -top-6 -left-6 text-[12vw] font-black text-white/[0.01] select-none z-0 pointer-events-none italic opacity-50">ARCHIVE</div>
              </div>

              <div className="flex flex-col md:flex-row gap-12 pt-12 border-t border-white/5 opacity-60">
                 <div className="flex-1 space-y-4">
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-white/40">Custodian</h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/50">{extendedData.identity.managedBy}</p>
                 </div>
                 <div className="flex-1 space-y-4">
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-white/40">Classification</h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/50">Primary {extendedData.identity.category} Habitat</p>
                 </div>
              </div>

              {/* INTEGRATED DIRECTIONS BUTTON WITH MAP IMAGE BACKGROUND */}
              <button className="relative w-full lg:w-[440px] h-28 rounded-[35px] overflow-hidden group hover:scale-[1.02] transition-all shadow-3xl border border-white/10 mt-8 active:scale-95">
                 <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-[1.5s]" alt="Map" />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                 <div className="relative z-10 flex items-center justify-between px-10 h-full">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"><Map size={22} /></div>
                       <div className="flex flex-col items-start leading-none">
                          <span className="text-[12px] font-black uppercase tracking-[0.4em] mb-1.5">Get Directions</span>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Surface Mapping Node PR-01</span>
                       </div>
                    </div>
                    <ChevronRight size={22} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                 </div>
              </button>
           </div>

           <div className="xl:col-span-4 space-y-8">
              {/* COORDINATES CARD */}
              <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[40px] border border-white/10 p-10 space-y-10 shadow-3xl overflow-hidden relative group">
                 <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity"><Globe size={160} strokeWidth={0.5} /></div>
                 
                 <div className="space-y-8 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6"><h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Coordinates</h3><Compass size={18} className="text-white/20" /></div>
                    <div className="space-y-8">
                       <div><p className="text-[9px] font-black uppercase text-white/20 mb-2">Latitude</p><p className="text-4xl font-mono text-white/80">{extendedData.location.lat}</p></div>
                       <div><p className="text-[9px] font-black uppercase text-white/20 mb-2">Longitude</p><p className="text-4xl font-mono text-white/80">{extendedData.location.lng}</p></div>
                    </div>
                 </div>

                  <div className="pt-8 space-y-4">
                    <button 
                      onClick={() => setVisitorToggle(true)} 
                      className="w-full h-20 bg-white text-black rounded-[30px] border border-white hover:bg-[#efefef] transition-all flex items-center justify-between px-10 text-[12px] font-black uppercase tracking-[0.4em] group shadow-[0_20px_50px_rgba(255,255,255,0.12)] hover:scale-[1.02] active:scale-95"
                    >
                       <span>View Details</span>
                       <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                          <Info size={18} />
                       </div>
                    </button>
                 </div>
              </div>


           </div>
        </div>

        {/* GALLERY SURVEY */}
        <div className="pt-20 border-t border-white/5">
           <div className="flex justify-between items-baseline mb-16">
              <h2 className="text-4xl lg:text-7xl font-serif italic text-white uppercase tracking-tighter leading-none">Visual Survey</h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{gallery.length} Plates</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 h-auto lg:h-[900px]">
              <motion.div whileHover={{ scale: 1.01 }} onClick={() => setSelectedImageIndex(0)} className="md:col-span-2 lg:col-span-3 lg:row-span-2 rounded-[50px] overflow-hidden border border-white/10 relative group bg-white/5 cursor-pointer">
                 <img src={gallery[0]} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt="Primary" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-10">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20"><Play size={24} fill="currentColor" /></div>
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Motion Archive 01</p>
                    </div>
                 </div>
              </motion.div>

              {gallery.slice(1).map((img, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }} onClick={() => setSelectedImageIndex(i + 1)} className={`rounded-[35px] overflow-hidden border border-white/10 bg-white/5 cursor-pointer ${i === 0 || i === 3 ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
                   <img src={img} className="w-full h-full object-cover hover:scale-105 transition-all duration-[2s]" alt={`Plate ${i}`} />
                </motion.div>
              ))}

              <div className="lg:col-span-3 bg-white/[0.02] backdrop-blur-3xl rounded-[40px] border border-white/10 p-12 flex flex-col justify-between">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Archive Notes</h4>
                 <p className="text-2xl lg:text-3xl font-serif italic text-white/30 leading-tight">"Observe with silence and respect. High-altitude flora documented in Sector 01."</p>
                 <div className="flex gap-4 pt-10">
                    {[1, 2, 3].map(j => <div key={j} className="w-16 h-16 rounded-[25px] border border-white/5 bg-white/5 overflow-hidden"><img src="https://images.unsplash.com/photo-1472393365320-dc77242e4ee6?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-all" alt="scan" /></div>)}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* REGISTRY DRAWER - MAXIMUM CONTRAST RENDERING */}
      <motion.div 
        initial={{ y: '100%' }} 
        animate={{ y: visitorToggle ? '0%' : '100%' }} 
        transition={{ type: 'spring', damping: 30, stiffness: 200 }} 
        className="fixed bottom-0 inset-x-0 z-[100] p-6 lg:p-14 bg-[#0a0a0a] border-t border-white/20 rounded-t-[70px] shadow-[0_-50px_150px_rgba(0,0,0,1)]"
      >
        <div className="max-w-[1280px] mx-auto space-y-16">
          <div className="flex items-center justify-between border-b border-white/10 pb-10">
             <div className="flex items-center gap-8 text-4xl lg:text-5xl font-serif italic text-white uppercase tracking-[0.1em] leading-none">
                <Info size={40} className="text-white" />
                <span>Registry Field Archives</span>
             </div>
             <button onClick={() => setVisitorToggle(false)} className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white text-black hover:bg-white/80 transition-all shadow-2xl group">
                <Minus size={24} className="font-bold" />
             </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 text-white">
             <div className="space-y-10">
                <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/50 border-b border-white/10 pb-4">Temporal Cycle</h4>
                <div className="space-y-8 bg-white/5 p-8 rounded-[40px] border border-white/5">
                   <div className="flex justify-between text-[13px] font-black uppercase tracking-widest"><span className="text-white/40 italic">Opens</span><span className="text-white">05:00 AM</span></div>
                   <div className="flex justify-between text-[13px] font-black uppercase tracking-widest"><span className="text-white/40 italic">Closes</span><span className="text-white">08:00 PM</span></div>
                   <div className="p-4 bg-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-center border border-white/20 text-white/60">Seasonal: {extendedData.availability.seasonal}</div>
                </div>
             </div>
             <div className="lg:col-span-2 grid grid-cols-2 gap-16">
                <div className="space-y-10">
                   <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/50 border-b border-white/10 pb-4">Protocols</h4>
                   <ul className="space-y-6">
                      {extendedData.safety.rules.map(r => <li key={r} className="text-[13px] font-black uppercase tracking-widest flex items-center gap-5 text-white"><ShieldCheck size={20} className="text-green-500" /> {r}</li>)}
                   </ul>
                </div>
                <div className="space-y-10">
                   <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/50 border-b border-white/10 pb-4">Target Loadout</h4>
                   <ul className="space-y-6">
                      {extendedData.safety.carry.map(c => <li key={c} className="text-[13px] font-black uppercase tracking-widest flex items-center gap-5 text-white"><Briefcase size={20} className="text-white/40" /> {c}</li>)}
                   </ul>
                </div>
             </div>
             <div className="space-y-10">
                <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/50 border-b border-white/10 pb-4">Connectivity</h4>
                <div className="space-y-10">
                   <div className="p-8 bg-white/5 rounded-[40px] border border-white/5 group">
                      <span className="text-[10px] font-black text-white/30 uppercase block mb-2 tracking-widest">Global Terminal</span>
                      <span className="text-base font-black uppercase tracking-widest text-white">{extendedData.connectivity.airports[0]}</span>
                   </div>
                   <div className="p-10 bg-red-600 border border-red-400 rounded-[40px] shadow-[0_20px_60px_rgba(220,38,38,0.3)]">
                      <h4 className="text-[11px] font-black uppercase text-white flex items-center gap-3 tracking-[0.3em] mb-4"><AlertCircle size={18} fill="white" className="text-red-600" /> HIGH PRIORITY</h4>
                      <p className="text-[12px] text-white uppercase tracking-[0.2em] leading-relaxed font-black">SOLO NIGHT TREKS PROHIBITED IN SECTOR 01 REGION.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedImageIndex(null)} 
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 lg:p-20 shadow-2xl overflow-hidden"
          >
             <button onClick={handlePrev} className="absolute left-6 lg:left-12 z-[210] w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all bg-black/40 backdrop-blur-md cursor-none"><ChevronLeft size={24} /></button>
             <button onClick={handleNext} className="absolute right-6 lg:right-12 z-[210] w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all bg-black/40 backdrop-blur-md cursor-none"><ChevronRight size={24} /></button>
             
             <motion.div 
              key={selectedImageIndex} 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="relative max-w-full max-h-full rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-black" 
              onClick={(e) => e.stopPropagation()}
             >
                <img src={gallery[selectedImageIndex]} className="max-w-full max-h-[80vh] object-contain block" alt="Archive Plate" />
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent flex justify-between items-center">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">Archive Archive</span>
                      <span className="text-xl font-serif italic text-white/90">Plate Archive 0{selectedImageIndex + 1}</span>
                   </div>
                   <button onClick={() => setSelectedImageIndex(null)} className="px-8 py-3 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Close</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
