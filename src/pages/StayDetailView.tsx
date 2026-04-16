import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, MapPin, Wind, Waves, Coffee, Zap, Info } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState } from 'react';
import ImageGallery from '../components/ImageGallery';

export default function StayDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const stay = EXPERIENCES.find(e => e.id === Number(id));
  const [isBooked, setIsBooked] = useState(false);

  if (!stay || stay.type !== 'stay') {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/20 font-sans uppercase tracking-widest text-xs">Stay Unavailable</div>;
  }

  const amenityIcons: Record<string, React.ReactNode> = {
    "Private Spa": <Wind size={20} />,
    "Butler Service": <ShieldCheck size={20} />,
    "Gourmet Kitchen": <Coffee size={20} />,
    "Helipad Access": <Zap size={20} />,
    "Private Pool": <Waves size={20} />,
    "360 Degree View": <MapPin size={20} />,
    "Smart Glass Controls": <Zap size={20} />,
    "Library": <Info size={20} />,
    "Satellite Link": <Zap size={20} />
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 animate-pulse" />
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter">Stay Reserved.</h1>
          <p className="text-white/40 mb-12 font-sans uppercase tracking-[0.2em]">Check your email for the confirmation receipt.</p>
          <button onClick={() => navigate('/')} className="px-16 py-6 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Back to Map</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#000] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      
      {/* Background Glows */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[200px]" />
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
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Premium Hideaway</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-7xl md:text-[12vw] font-display font-black uppercase leading-[0.75] tracking-tighter mb-16 text-transparent [-webkit-text-stroke:2px_white] hover:text-white transition-all duration-1000">
                {stay.title.split(' ')[0]} <br/>
                <span className="md:ml-24">{stay.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-20">
                {stay.highlights.map(h => (
                   <span key={h} className="px-6 py-2 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-white hover:text-black transition-all">
                     {h}
                   </span>
                ))}
              </div>

              <div className="max-w-3xl mb-32">
                 <p className="text-3xl md:text-5xl font-serif italic text-white/80 leading-tight mb-12">
                   "{stay.description}"
                 </p>
                 <p className="text-lg text-white/40 leading-relaxed font-light uppercase tracking-widest">
                   {stay.longDescription}
                 </p>
              </div>

              {/* Gallery Section */}
              {stay.gallery && (
                <div className="mb-32">
                  <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/20 mb-8">Property Gallery</h3>
                  <ImageGallery images={stay.gallery} />
                </div>
              )}

              {/* Tech Specs Bento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                {stay.specs?.map((spec, i) => (
                  <div key={i} className="p-8 border border-white/5 rounded-3xl bg-white/[0.02]">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3 block">{spec.label}</span>
                    <span className="text-2xl font-display font-medium uppercase tracking-tight">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Amenities Grid */}
              <div className="py-24 border-t border-white/10">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-12">Reserved Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stay.amenities?.map(am => (
                    <div key={am} className="p-10 border border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center hover:bg-white hover:text-black transition-all group">
                      <div className="mb-4 text-white/40 group-hover:text-inherit">{amenityIcons[am] || <Wind size={20} />}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="p-12 border border-white/10 rounded-[60px] bg-white/[0.01] backdrop-blur-3xl flex flex-col gap-10 items-center text-center group">
                 <div className="w-full pb-10 border-b border-white/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Base Rate p/n</p>
                   <p className="text-7xl font-display font-medium tracking-tighter">${stay.price.toLocaleString()}</p>
                 </div>
                 
                 <div className="w-full space-y-6">
                    <div className="flex justify-between items-center px-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Status</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Available
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Location</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/60">{stay.location}</span>
                    </div>
                 </div>

                 <button 
                  onClick={() => setIsBooked(true)}
                  className="w-full py-8 bg-white text-black rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_30px_60px_rgba(255,255,255,0.1)]"
                 >
                   Confirm Reservation
                 </button>
                 
                 <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10">Instant Confirmation</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
