import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Utensils, Award, GlassWater, Leaf, MapPin } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState } from 'react';
import ImageGallery from '../components/ImageGallery';
import HostCard from '../components/HostCard';

export default function FoodDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const food = EXPERIENCES.find(e => e.id === Number(id));
  const [isBooked, setIsBooked] = useState(false);

  if (!food || food.type !== 'food') {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/20 font-sans uppercase tracking-widest text-xs">Food signal lost</div>;
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 animate-pulse" />
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter">Table Reserved.</h1>
          <p className="text-white/40 mb-12 font-sans uppercase tracking-[0.2em]">Check your inbox for the confirmation details.</p>
          <button onClick={() => navigate('/')} className="px-16 py-6 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Back to Map</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#000] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      
      {/* Background Glows */}
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
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
             <span className="flex items-center gap-2"><Award size={14} /> Michelin Select</span>
             <span className="hidden md:flex items-center gap-2"><Leaf size={14} /> Organic Only</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-32">
           <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
             <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 mb-8 block font-black">Featured Culinary Selection</span>
             <h1 className="text-7xl md:text-[11vw] font-display font-black uppercase leading-[0.8] tracking-tighter mb-12 italic text-transparent [-webkit-text-stroke:1px_white] hover:text-white transition-all duration-1000">
               {food.title}
             </h1>
             <p className="text-2xl md:text-4xl text-white/60 leading-tight font-serif italic max-w-3xl mx-auto">
               "{food.description}"
             </p>
           </motion.div>
        </div>

        {/* Visual Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-40">
           <div className="md:col-span-8 aspect-[16/9] rounded-[80px] overflow-hidden border border-white/5 relative group">
             <img src={food.image} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
           </div>
           <div className="md:col-span-4 flex flex-col justify-center gap-10">
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-6 flex items-center gap-3">
                  <MapPin size={14} /> The Setting
                </h4>
                <p className="text-xl md:text-2xl text-white/80 font-serif italic mb-8 leading-relaxed">
                  Provencial stone cellar repurposed for culinary alchemy.
                </p>
                <div className="w-12 h-px bg-white/20" />
              </div>
              
              <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-relaxed uppercase">
                    {food.longDescription}
                 </p>
              </div>
           </div>
        </div>

        {/* Gallery Section */}
        {food.gallery && (
          <div className="mb-40">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/20 mb-12 text-center">Visual Atmosphere</h3>
            <ImageGallery images={food.gallery} />
          </div>
        )}

        {/* Chef Section */}
        {food.host && (
          <div className="max-w-4xl mx-auto mb-40">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/20 mb-12 text-center">Curated By</h3>
            <HostCard {...food.host} />
          </div>
        )}

        {/* THE MENU */}
        <div className="max-w-4xl mx-auto mb-40">
           <div className="flex flex-col items-center gap-6 mb-32">
              <Utensils size={40} className="text-white/20 animate-pulse" />
              <h2 className="text-5xl md:text-8xl font-display font-black uppercase italic tracking-tighter">The <span className="text-transparent [-webkit-text-stroke:1px_white]">Menu.</span></h2>
           </div>

           <div className="space-y-32">
              {food.menu?.map((m, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row justify-between items-center sm:items-start text-center md:text-left gap-12 pb-24 border-b border-white/5 group"
                >
                   <div className="flex-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-6">Course 0{i+1}</span>
                      <h4 className="text-4xl md:text-6xl font-display font-black uppercase mb-8 group-hover:translate-x-6 transition-transform duration-700 tracking-tight">{m.name}</h4>
                      <p className="text-white/40 text-xl leading-relaxed max-w-xl font-serif italic">{m.desc}</p>
                   </div>
                   <div className="flex flex-col items-center gap-6">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <GlassWater size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Pairing Incl.</span>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Participation CTA */}
        <div className="max-w-xl mx-auto text-center pb-40">
           <div className="p-16 border border-white/10 rounded-[80px] bg-white/[0.01] backdrop-blur-3xl group cursor-pointer hover:border-white/30 transition-all">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 mb-10">Reservation Price</p>
              <h3 className="text-6xl md:text-[8vw] font-display font-black mb-16">${food.price.toLocaleString()}</h3>
              <button 
                onClick={() => setIsBooked(true)}
                className="w-full py-8 bg-white text-black rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:scale-[1.03] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
              >
                Secure Reservation
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
