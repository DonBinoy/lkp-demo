import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, ChevronRight, Activity, ShieldCheck } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState } from 'react';
import ImageGallery from '../components/ImageGallery';
import HostCard from '../components/HostCard';

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = EXPERIENCES.find(e => e.id === Number(id));
  const [guests, setGuests] = useState(1);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId] = useState(() => `LKP-${(Math.random() * 10000).toFixed(0)}`);

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
        <div className="absolute w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px] animate-pulse" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 text-white">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-6xl font-display font-black text-white mb-6 uppercase tracking-tighter">Booking Confirmed.</h1>
          <p className="text-white/40 mb-12 max-w-md mx-auto">Your journey has been reserved. Check your email for full details and confirmation.</p>
          <button onClick={() => navigate('/')} className="px-12 py-5 bg-white text-black rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-all">Back to Explore</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#000] min-h-screen text-white selection:bg-white selection:text-black font-sans pb-32">
      
      {/* Subtle background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      <div className="container mx-auto px-6 pt-24 relative z-10">
        
        {/* Simple Navigation */}
        <div className="flex justify-between items-center mb-20">
          <button onClick={() => navigate('/')} className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-white">Back to List</span>
          </button>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Open for Booking</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              
              <div className="mb-16">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-4 block">Destination: {experience.location}</span>
                <h1 className="text-6xl md:text-8xl font-display font-black uppercase leading-none tracking-tighter mb-10">
                  {experience.title}
                </h1>
                <div className="w-16 h-1 bg-white" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                 <div className="space-y-8">
                   <p className="text-2xl md:text-4xl font-serif italic text-white/80 leading-snug">"{experience.description}"</p>
                   <div className="flex flex-wrap gap-2">
                      {experience.highlights.map(h => (
                        <span key={h} className="px-4 py-1.5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40">{h}</span>
                      ))}
                   </div>
                 </div>
                 
                 <div className="p-10 border border-white/5 rounded-[40px] bg-white/[0.02] backdrop-blur-3xl">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8 pb-4 border-b border-white/5">Experience Details</h4>
                    <div className="space-y-6">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Duration</span>
                          <span className="text-base font-display font-black uppercase">{experience.duration}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Activity Level</span>
                          <span className="text-base font-display font-black uppercase flex items-center gap-2">
                             <Activity size={14} /> High
                          </span>
                       </div>
                       {experience.specs?.map((spec, i) => (
                         <div key={i} className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{spec.label}</span>
                            <span className="text-base font-display font-black uppercase">{spec.value}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="mb-24 pb-24 border-b border-white/5">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-6 font-sans">Overview</h3>
                 <p className="text-lg text-white/50 leading-relaxed font-light font-sans max-w-3xl">
                   {experience.longDescription}
                 </p>
              </div>

              {experience.gallery && (
                <div className="mb-24">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8">Image Gallery</h3>
                  <ImageGallery images={experience.gallery} />
                </div>
              )}

              {experience.host && (
                <div className="mb-24">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-10">Your Guide</h3>
                  <HostCard {...experience.host} />
                </div>
              )}

              <div className="pt-24 border-t border-white/10">
                 <h2 className="text-5xl md:text-6xl font-display font-black uppercase mb-16 tracking-tighter">The Journey <br/> <span className="text-transparent [-webkit-text-stroke:1px_white]">Itinerary.</span></h2>
                 
                 <div className="space-y-20">
                   {experience.itinerary?.map((step, i) => (
                     <div key={i} className="flex gap-10 group">
                        <div className="flex flex-col items-center">
                           <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center font-display font-black text-xl group-hover:bg-white group-hover:text-black transition-all">
                             {i+1}
                           </div>
                           {i !== experience.itinerary!.length - 1 && (
                             <div className="w-px h-32 bg-white/5 mt-4" />
                           )}
                        </div>
                        <div className="pt-2">
                           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 block">{step.day}</span>
                           <h3 className="text-2xl md:text-3xl font-display font-black uppercase mb-4 tracking-tight">{step.title}</h3>
                           <p className="text-lg text-white/30 leading-relaxed font-serif italic max-w-xl">{step.desc}</p>
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
             <div className="sticky top-24">
                <div className="p-12 border border-white/10 rounded-[60px] bg-white/[0.01] backdrop-blur-3xl overflow-hidden group">
                   <div className="relative z-10">
                      <div className="pb-8 border-b border-white/5 mb-10">
                         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-3">Total Price</p>
                         <div className="flex items-end gap-2">
                            <span className="text-6xl font-display font-black tracking-tighter">${(experience.price * guests).toLocaleString()}</span>
                            <span className="text-xs text-white/30 mb-2 uppercase tracking-widest font-bold">Inc. Tax</span>
                         </div>
                      </div>

                      <div className="space-y-8 mb-10">
                         <div className="flex items-center justify-between p-6 border border-white/5 rounded-[30px] bg-white/[0.02]">
                            <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Travelers</span>
                            <div className="flex items-center gap-6">
                               <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Minus size={14} /></button>
                               <span className="text-xl font-display font-black">{guests}</span>
                               <button onClick={() => setGuests(guests + 1)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Plus size={14} /></button>
                            </div>
                         </div>
                         <div className="flex flex-col gap-4 px-4">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                               <span>Booking ID</span>
                               <span>{bookingId}</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                               <span>Policy</span>
                               <span>Free cancellation</span>
                            </div>
                         </div>
                      </div>

                      <button 
                         onClick={() => setIsBooked(true)}
                         className="w-full py-7 bg-white text-black rounded-full font-display font-black uppercase text-xs tracking-[0.4em] flex items-center justify-center gap-4 hover:scale-[1.03] active:scale-95 transition-all shadow-xl"
                      >
                         Confirm Booking <ChevronRight size={20} />
                      </button>
                      
                      <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.5em] text-white/10">Secure Checkout</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
