import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, ChevronRight, Activity, ShieldHalf, Globe } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState } from 'react';

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = EXPERIENCES.find(e => e.id === Number(id));
  const [guests, setGuests] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  if (!experience || experience.type !== 'experience') {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/20 font-black uppercase tracking-[0.4em]">Experience Link Severed</div>;
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-white/10">
            <ShieldHalf size={32} className="text-white" />
          </div>
          <h1 className="text-6xl font-display font-black text-white mb-6 uppercase tracking-tighter">Mission Locked.</h1>
          <p className="text-white/40 mb-12 font-medium">Your orbital trajectory has been calculated. Stand by for comms.</p>
          <button onClick={() => navigate('/')} className="px-12 py-5 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest">Return to Base</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black">
      
      {/* Brutalist Grid Background overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-16 px-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Return to Grid</span>
          </button>
          <div className="flex gap-8 items-center text-[10px] font-black uppercase tracking-widest text-white/20">
             <span className="flex items-center gap-2"><Globe size={14} /> Orbital Level: 0{experience.id}</span>
             <span className="hidden md:block">Priority Class: A</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content: The Mission */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="w-12 h-1 bg-white mb-10" />
              <h1 className="text-7xl md:text-[11vw] font-display font-black uppercase leading-[0.8] tracking-tighter mb-16">
                {experience.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                 <div className="space-y-8">
                   <p className="text-2xl font-serif italic text-white/60 leading-tight">"{experience.description}"</p>
                   <div className="flex gap-3">
                      {experience.highlights.map(h => (
                        <span key={h} className="px-3 py-1 border border-white/10 rounded text-[9px] font-black uppercase tracking-widest text-white/40">{h}</span>
                      ))}
                   </div>
                 </div>
                 <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.01]">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6">Technical Specs</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white/40 uppercase">Duration</span>
                          <span className="text-sm font-black">{experience.duration}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white/40 uppercase">Intensity</span>
                          <span className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                             <Activity size={12} className="text-white" /> High
                          </span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Itinerary: The Progression */}
              <div className="relative pt-24 border-t border-white/10">
                 <h2 className="text-4xl font-display font-black uppercase italic mb-20">Chronological <br/> <span className="text-transparent [-webkit-text-stroke:1px_white]">Sequence.</span></h2>
                 
                 <div className="space-y-16">
                   {experience.itinerary?.map((step, i) => (
                     <div key={i} className="flex gap-12 relative group">
                        <div className="flex flex-col items-center">
                           <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center font-display font-bold text-xl group-hover:bg-white group-hover:text-black transition-all duration-500">
                             0{i+1}
                           </div>
                           {i !== experience.itinerary!.length - 1 && (
                             <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent mt-6" />
                           )}
                        </div>
                        <div className="pt-2">
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 block">{step.day}</span>
                           <h3 className="text-3xl font-display font-medium uppercase mb-4 transition-all group-hover:translate-x-4">{step.title}</h3>
                           <p className="text-lg text-white/40 leading-relaxed font-light max-w-xl">{step.desc}</p>
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Checkout: Sticky Command Center */}
          <div className="lg:col-span-4">
             <div className="sticky top-32">
                <div className="p-12 border border-white/10 rounded-[60px] bg-white/[0.02] backdrop-blur-3xl overflow-hidden relative group">
                   <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000"><ShieldHalf size={200} /></div>
                   
                   <div className="relative z-10">
                      <div className="flex justify-between items-end mb-16">
                         <div>
                           <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Resource Allocation</p>
                           <p className="text-6xl font-display font-medium">${(experience.price * guests).toLocaleString()}</p>
                         </div>
                      </div>

                      <div className="space-y-8 mb-16">
                         <div className="flex items-center justify-between p-6 border border-white/5 rounded-3xl bg-white/[0.01]">
                            <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Operatives</span>
                            <div className="flex items-center gap-6">
                               <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Minus size={14} /></button>
                               <span className="text-xl font-display font-black">{guests}</span>
                               <button onClick={() => setGuests(guests + 1)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Plus size={14} /></button>
                            </div>
                         </div>
                         <div className="flex items-center justify-between px-6">
                            <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Authorization</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Verified Class-A</span>
                         </div>
                      </div>

                      <button 
                         onClick={() => setIsBooked(true)}
                         className="w-full py-7 bg-white text-black rounded-full font-display font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
                      >
                         Lock Mission <ChevronRight size={20} />
                      </button>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
