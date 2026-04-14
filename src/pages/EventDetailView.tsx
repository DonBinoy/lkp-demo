import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Ticket, Activity } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState } from 'react';

export default function EventDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EXPERIENCES.find(e => e.id === Number(id));
  const [isBooked, setIsBooked] = useState(false);

  if (!event || event.type !== 'event') {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-mono uppercase tracking-widest text-xs">Event signal lost</div>;
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 animate-pulse" />
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter">Access Granted.</h1>
          <p className="text-white/40 mb-12 font-mono uppercase tracking-[0.2em]">Check your secure inbox for the encrypted ticket.</p>
          <button onClick={() => navigate('/')} className="px-16 py-6 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Back to Map</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#000] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[150px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-24">
          <button onClick={() => navigate('/')} className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft size={20} />
            </div>
          </button>
          <div className="flex gap-4 items-center">
             <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Exclusive Access / Event-0{event.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Headline Section */}
          <div className="lg:col-span-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[10vw] md:text-[14vw] font-display font-black uppercase leading-[0.75] tracking-tighter text-transparent [-webkit-text-stroke:2px_white] hover:text-white transition-all duration-1000 mb-12">
                {event.title}
              </h1>
            </motion.div>
          </div>

          {/* Left: Atmospheric Visuals & Description */}
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="relative rounded-[60px] overflow-hidden aspect-video mb-12 border border-white/5 group">
                <img src={event.image} className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <span className="px-6 py-2 rounded-full border border-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest">{event.location}</span>
                </div>
              </div>

              <div className="max-w-2xl">
                 <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white/30 mb-8 flex items-center gap-4">
                   <Activity size={16} /> Manifesto
                 </h2>
                 <p className="text-3xl md:text-5xl font-serif italic text-white/80 leading-tight mb-20">{event.description}</p>
                 
                 {/* Experience Tags */}
                 <div className="flex flex-wrap gap-4 mb-32">
                   {event.highlights.map(h => (
                     <div key={h} className="px-10 py-5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all cursor-crosshair">
                       {h}
                     </div>
                   ))}
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Schedule & Membership */}
          <div className="lg:col-span-5">
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="space-y-12">
              
              {/* Schedule Timeline */}
              <div className="p-10 border border-white/10 rounded-[60px] bg-white/[0.01] backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Calendar size={100} /></div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-12">Temporal Sequence</h3>
                <div className="space-y-12 relative z-10">
                  {event.schedule?.map((item, i) => (
                    <div key={i} className="flex gap-10 items-start group/item">
                       <span className="font-mono text-[10px] pt-1 text-white/30 font-bold">{item.time}</span>
                       <div>
                         <h4 className="text-2xl font-display font-medium uppercase mb-2 group-hover/item:translate-x-3 transition-transform">{item.activity}</h4>
                         <div className="w-8 h-px bg-white/10 group-hover/item:w-full transition-all duration-700" />
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Membership Block */}
              <div className="p-10 border border-white/10 rounded-[60px] flex flex-col items-center text-center gap-8 group cursor-pointer hover:border-white/30 transition-all">
                 <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:animate-spin-slow">
                   <Users size={24} />
                 </div>
                 <div>
                   <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-3">Participation</h4>
                   <p className="text-2xl font-serif italic mb-10">Initiates Only. <br/> <span className="text-white/60">Strict 12px cap.</span></p>
                   
                   <button 
                     onClick={() => setIsBooked(true)}
                     className="px-16 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 hover:scale-105 active:scale-95 transition-all"
                   >
                     Claim Ticket <Ticket size={16} />
                   </button>
                 </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
