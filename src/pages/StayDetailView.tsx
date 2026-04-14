import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, MapPin, Wind, Waves, Coffee, Zap } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState } from 'react';

export default function StayDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const stay = EXPERIENCES.find(e => e.id === Number(id));
  const [isBooked, setIsBooked] = useState(false);

  if (!stay || stay.type !== 'stay') {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Hideaway Not Found</div>;
  }

  const amenityIcons: any = {
    "Private Spa": <Wind size={20} />,
    "Butler Service": <ShieldCheck size={20} />,
    "Gourmet Kitchen": <Coffee size={20} />,
    "Helipad Access": <Zap size={20} />,
    "Private Pool": <Waves size={20} />,
    "360 Degree View": <MapPin size={20} />
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <h1 className="text-6xl font-serif italic text-white mb-8">Reservation Requested.</h1>
          <p className="text-white/40 mb-12">Our concierge will contact you within 60 minutes.</p>
          <button onClick={() => navigate('/')} className="px-12 py-5 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest">Return to Hub</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-black overflow-hidden selection:bg-black selection:text-white">
      {/* Immersive Scroll Section */}
      <div className="container mx-auto px-6 pt-32 pb-24">
        
        {/* Minimalist Top Nav */}
        <div className="flex justify-between items-center mb-16">
          <button onClick={() => navigate('/')} className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Back to catalog</span>
          </button>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Hideaway Selects / 2026</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left Column: Visual Story */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-9xl font-serif italic leading-[0.85] mb-12">
                {stay.title.split(' ')[0]} <br/>
                <span className="font-display font-medium uppercase ml-12 md:ml-32 tracking-tighter">{stay.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <div className="flex gap-4 mb-20">
                {stay.highlights.map(h => (
                   <span key={h} className="px-4 py-2 border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest text-black/40">
                     {h}
                   </span>
                ))}
              </div>

              {/* Massive Image Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
                  <img src={stay.image} className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="flex flex-col gap-8">
                   <div className="aspect-square rounded-[40px] bg-black/5 p-12 flex flex-col justify-between">
                     <p className="text-xl leading-relaxed font-light italic">"{stay.description}"</p>
                     <div className="flex items-center gap-2 text-black/40">
                        <MapPin size={14} />
                        <span className="text-xs font-black uppercase tracking-widest">{stay.location}</span>
                     </div>
                   </div>
                   <div className="aspect-square rounded-[40px] overflow-hidden">
                     <img src={stay.detailImage} className="w-full h-full object-cover" />
                   </div>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="py-24 border-t border-black/10">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-black/20 mb-12">Reserved Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stay.amenities?.map(am => (
                    <div key={am} className="p-10 border border-black/5 rounded-[40px] flex flex-col items-center justify-center text-center hover:bg-black/5 transition-all">
                      <div className="mb-4 text-black/60">{amenityIcons[am] || <Wind size={20} />}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Pricing & Booking */}
          <div className="lg:col-span-4 lg:pl-10">
            <div className="sticky top-32">
              <div className="p-12 bg-white rounded-[60px] shadow-2xl border border-black/5 flex flex-col gap-8 items-center text-center">
                 <div className="w-full pb-8 border-b border-black/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-2">Base Rate</p>
                   <p className="text-6xl font-display font-medium">${stay.price.toLocaleString()}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-black/20 mt-2">inclusive of tax</p>
                 </div>
                 
                 <div className="w-full space-y-4">
                    <div className="flex justify-between items-center px-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/30">Dates</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Available / Open</span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/30">Occupancy</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Private Suite</span>
                    </div>
                 </div>

                 <button 
                  onClick={() => setIsBooked(true)}
                  className="w-full py-6 bg-black text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                 >
                   Request Reservation
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
