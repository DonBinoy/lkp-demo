import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Utensils, Award, GlassWater, Leaf } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState } from 'react';

export default function FoodDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const food = EXPERIENCES.find(e => e.id === Number(id));
  const [isBooked, setIsBooked] = useState(false);

  if (!food || food.type !== 'food') {
    return <div className="min-h-screen bg-[#fffdfa] flex items-center justify-center text-stone-400 font-serif italic">Culinary archives missing</div>;
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#fffdfa] flex items-center justify-center text-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-6xl font-serif italic text-stone-800 mb-8 border-b border-stone-200 pb-8">The Table Awaits.</h1>
          <p className="text-stone-500 mb-12 font-serif italic">Reservation confirmed. Prepare your senses.</p>
          <button onClick={() => navigate('/')} className="px-12 py-5 bg-stone-900 text-white rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl">Return to Catalog</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#fffdfa] min-h-screen text-stone-900 overflow-hidden selection:bg-stone-900 selection:text-white font-serif">
      
      {/* Editorial Navigation */}
      <div className="container mx-auto px-6 pt-32 pb-12 relative z-10">
        <div className="flex justify-between items-center mb-16 border-b border-stone-200 pb-10">
          <button onClick={() => navigate('/')} className="group flex items-center gap-4">
             <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all">
               <ArrowLeft size={16} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest font-sans">The Gastronomy Archive</span>
          </button>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest font-sans text-stone-400">
             <span className="flex items-center gap-2"><Award size={14} /> Michelin Select</span>
             <span className="hidden md:flex items-center gap-2"><Leaf size={14} /> Organic Only</span>
          </div>
        </div>

        {/* Hero Section: Centered Editorial Headline */}
        <div className="max-w-4xl mx-auto text-center mb-32">
           <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
             <span className="text-xs uppercase tracking-[0.5em] text-stone-400 mb-8 block font-sans">A Sensory Masterclass</span>
             <h1 className="text-7xl md:text-[8vw] leading-[0.9] text-stone-900 italic mb-12">
               {food.title}
             </h1>
             <p className="text-xl md:text-2xl text-stone-500 leading-relaxed font-light italic max-w-2xl mx-auto">
               "{food.description}"
             </p>
           </motion.div>
        </div>

        {/* Visual Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-40">
           <div className="md:col-span-8 aspect-[16/9] rounded-[80px] overflow-hidden shadow-2xl skew-y-1">
             <img src={food.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
           </div>
           <div className="md:col-span-4 flex flex-col justify-center gap-8 px-6">
              <div className="w-12 h-px bg-stone-300 mb-4" />
              <h4 className="text-2xl italic text-stone-800">The Setting</h4>
              <p className="text-stone-500 leading-relaxed font-sans text-sm font-light uppercase tracking-widest">Provence, France. A minimalist stone cellar repurposed for culinary alchemy.</p>
              <div className="aspect-square rounded-full border border-stone-200 p-8 flex items-center justify-center text-center">
                 <p className="text-xs uppercase tracking-widest font-sans font-black text-stone-300">Curated by <br/>Chef Marcovici</p>
              </div>
           </div>
        </div>

        {/* THE MENU: The Centerpiece */}
        <div className="max-w-4xl mx-auto mb-40">
           <div className="flex flex-col items-center gap-6 mb-24">
              <Utensils size={40} className="text-stone-300" />
              <h2 className="text-4xl md:text-6xl font-serif italic text-stone-900">Le Menu Céleste</h2>
           </div>

           <div className="space-y-24">
              {food.menu?.map((m, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row justify-between items-center sm:items-start text-center md:text-left gap-8 pb-12 border-b border-stone-100 group"
                >
                   <div className="flex-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 font-sans block mb-4">Course {i+1}</span>
                      <h4 className="text-4xl md:text-5xl italic text-stone-800 mb-6 group-hover:translate-x-4 transition-transform duration-700">{m.name}</h4>
                      <p className="text-stone-400 text-lg leading-relaxed max-w-lg">{m.desc}</p>
                   </div>
                   <div className="flex flex-col items-center gap-4">
                      <GlassWater size={24} className="text-stone-200" />
                      <span className="text-[10px] font-black uppercase tracking-widest font-sans text-stone-300">Wine Pairing Incl.</span>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Organic CTA */}
        <div className="max-w-xl mx-auto text-center pb-40">
           <div className="p-16 bg-stone-900 rounded-[80px] text-white shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-10">Limited Engagement</p>
              <h3 className="text-4xl md:text-6xl font-serif italic mb-12">${food.price.toLocaleString()}</h3>
              <button 
                onClick={() => setIsBooked(true)}
                className="w-full py-6 bg-white text-stone-900 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-[1.03] transition-transform shadow-2xl"
              >
                Secure Guest Invite
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
