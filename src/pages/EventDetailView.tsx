import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Ticket, Clock, Share2, Heart, MapPin, ShieldCheck } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState, useRef } from 'react';
import ImageGallery from '../components/ImageGallery';
import HostCard from '../components/HostCard';

export default function EventDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const event = EXPERIENCES.find(e => e.id === Number(id));
  const [isBooked, setIsBooked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  if (!event || event.type !== 'event') {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-10">
        <h1 className="text-4xl font-display mb-8">Event Not Found</h1>
        <button onClick={() => navigate('/')} className="text-xs uppercase tracking-widest border-b border-white pb-1">Return to Map</button>
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6 relative overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] -z-10 animate-pulse" />
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-xl">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <ShieldCheck size={40} className="text-black" />
          </div>
          <h1 className="text-7xl md:text-8xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-none">Access <br/> Granted.</h1>
          <p className="text-white/40 mb-16 font-sans uppercase tracking-[0.3em] text-sm leading-loose">Your entry into the {event.title} has been authenticated. Digital credentials sent to your private channel.</p>
          <button onClick={() => navigate('/')} className="px-16 py-7 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:scale-105 transition-transform active:scale-95 shadow-2xl">Return to Hub</button>
        </motion.div>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-white selection:bg-white selection:text-black">
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img src={event.image} className="w-full h-full object-cover grayscale opacity-40 scale-105" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            
            {/* Title / Meta (Left column) */}
            <div className="lg:col-span-7">
              <motion.div style={{ y: titleY }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/50">{event.category} Selection</span>
                  <span className="w-12 h-px bg-white/30" />
                </div>
                <h1 className="text-[12vw] md:text-[8vw] font-display font-black uppercase leading-[0.8] tracking-tighter">
                  <span className="text-transparent [-webkit-text-stroke:1.5px_white] block opacity-50 mb-2">The</span>
                  <span className="italic block mb-2">{event.title.split(' ').slice(0, 1)}</span>
                  <span className="text-transparent [-webkit-text-stroke:1.5px_white] block">{event.title.split(' ').slice(1).join(' ')}</span>
                </h1>
                
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                  className="mt-16 flex flex-col md:flex-row items-start gap-12"
                >
                  <div className="flex items-center gap-4 text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">
                    <MapPin size={14} className="text-white/60" /> {event.location}
                  </div>
                  <div className="flex items-center gap-4 text-white/40 font-black uppercase tracking-[0.4em] text-[10px]">
                    <Clock size={14} className="text-white/60" /> {event.duration} / {event.schedule?.length || 0} Acts
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Booking Card (Right column) */}
            <div className="lg:col-span-5 relative z-20">
              <motion.div 
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
                className="glass p-10 md:p-12 rounded-[50px] border border-white/10 relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.5)] mt-12 lg:mt-0"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <div className="flex justify-between items-start mb-12">
                   <div>
                     <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/30 block mb-4">Secured Entry</span>
                     <h3 className="text-5xl md:text-6xl font-display font-black">${event.price.toLocaleString()}</h3>
                   </div>
                   <div className="text-right">
                     <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/40">Limited Availability</div>
                   </div>
                </div>

                <div className="space-y-6 mb-12">
                   <div className="flex justify-between items-center py-4 border-b border-white/5 relative group/input">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-3"><Calendar size={14} /> Date</span>
                      <div className="relative flex items-center">
                        <input 
                          type="date"
                          className="bg-transparent text-right text-xs md:text-sm font-display font-bold text-white focus:outline-none cursor-pointer hover:text-white/80 transition-colors [color-scheme:dark]" 
                        />
                      </div>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-white/5 relative group/input">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-3"><Clock size={14} /> Time</span>
                      <div className="relative flex items-center">
                        <input 
                          type="time"
                          className="bg-transparent text-right text-xs md:text-sm font-display font-bold text-white focus:outline-none cursor-pointer hover:text-white/80 transition-colors [color-scheme:dark]" 
                        />
                      </div>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-white/5 relative group/input">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-3"><Users size={14} /> Guests</span>
                      <div className="relative flex items-center">
                        <input 
                          type="number"
                          min="1"
                          max="20"
                          defaultValue="2"
                          className="bg-transparent text-right text-xs md:text-sm font-display font-bold text-white focus:outline-none cursor-pointer w-16 hover:text-white/80 transition-colors" 
                        />
                      </div>
                   </div>
                </div>

                <button 
                  onClick={() => setIsBooked(true)}
                  className="w-full py-7 md:py-8 bg-white text-black rounded-full font-black uppercase tracking-[0.5em] text-[10px] md:text-xs relative overflow-hidden group/btn hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <div className="absolute inset-0 bg-black translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 z-0" />
                  <span className="relative z-10 group-hover/btn:text-white transition-colors duration-500 flex items-center justify-center gap-4">
                    Request Access <Ticket size={18} />
                  </span>
                </button>

                <p className="mt-8 text-center text-[9px] font-black uppercase tracking-[0.3em] text-white/20 pointer-events-none">
                  Terms of entry apply. Discretion is required.
                </p>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-12 flex items-center gap-4 opacity-30 pointer-events-none hidden md:flex"
        >
          <div className="w-12 h-px bg-white" />
          <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scroll to Discover</span>
        </motion.div>

        {/* Top Controls */}
        <div className="absolute top-10 left-0 right-0 z-20 px-6 md:px-12 flex justify-between items-center">
           <button onClick={() => navigate('/')} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group hover:bg-white hover:text-black transition-all backdrop-blur-md">
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
           </button>
           <div className="flex gap-4">
              <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all backdrop-blur-md"><Share2 size={18} /></button>
              <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-red-400 backdrop-blur-md"><Heart size={18} fill="currentColor" /></button>
           </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-8 lg:col-start-3 space-y-40">
            
            {/* The Essence */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-12 flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-white/20" /> 01 / The Essence
              </h2>
              <p className="text-4xl md:text-6xl font-serif italic text-white leading-tight mb-16">{event.description}</p>
              <div className="w-full h-px bg-white/10 mb-16" />
              <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light first-letter:text-7xl first-letter:font-display first-letter:mr-4 first-letter:float-left first-letter:text-white first-letter:italic">
                {event.longDescription}
              </p>
            </motion.div>

            {/* Chronicle / Schedule */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-16 flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-white/20" /> 02 / The Chronicle
              </h2>
              <div className="space-y-0">
                {event.schedule?.map((item, i) => (
                  <div key={i} className="group border-b border-white/5 py-12 flex flex-col md:flex-row md:items-center gap-8 hover:bg-white/5 px-8 -mx-8 transition-all rounded-3xl">
                    <span className="text-white/30 font-display italic text-2xl w-32 shrink-0">{item.time}</span>
                    <h3 className="text-3xl md:text-5xl font-display uppercase tracking-tighter flex-grow group-hover:pl-4 transition-all duration-500">{item.activity}</h3>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                       <Clock size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* The Master / Host */}
            {event.host && (
               <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-16 flex items-center gap-6">
                   <span className="w-2 h-2 rounded-full bg-white/20" /> 03 / The Curator
                 </h2>
                 <HostCard {...event.host} />
               </motion.div>
            )}

            {/* The Atmosphere / Gallery */}
            {event.gallery && (
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-16 flex items-center gap-6">
                  <span className="w-2 h-2 rounded-full bg-white/20" /> 04 / The Atmosphere
                </h2>
                <ImageGallery images={event.gallery} />
              </motion.div>
            )}

            {/* Secondary CTA / Help */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-24">
               <div className="glass p-12 rounded-[40px] border border-white/5 text-center group cursor-pointer hover:bg-white/5 transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-6">Questions?</span>
                  <span className="text-lg font-bold uppercase tracking-widest text-white/60 group-hover:text-white">Contact Concierge</span>
               </div>
               <div className="glass p-12 rounded-[40px] border border-white/5 text-center group cursor-pointer hover:bg-white/5 transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-6">Group?</span>
                  <span className="text-lg font-bold uppercase tracking-widest text-white/60 group-hover:text-white">Private Hire</span>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Philosophy Overlap */}
      <section className="py-60 bg-white text-black">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-[10vw] font-display font-black uppercase leading-none tracking-tighter">Beyond <br/> The Event.</h2>
            <p className="mt-16 max-w-2xl mx-auto text-xl font-serif italic opacity-60">We don't just organize gatherings; we engineer memories that transcend the physical space.</p>
        </div>
      </section>

    </main>
  );
}
