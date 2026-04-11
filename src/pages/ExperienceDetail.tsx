import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, ChevronRight, 
  MapPin, Clock, Star, Users, 
  Coffee, Globe, Info, Calendar, Utensils
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { EXPERIENCES, Experience } from '../data';

export default function ExperienceDetail() {
  const { id } = useParams();
  const experience = EXPERIENCES.find(e => e.id === Number(id));
  const [guests, setGuests] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-4xl font-display mb-8">Journey Not Found</h2>
          <Link to="/" className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs">Return to Catalog</Link>
        </div>
      </div>
    );
  }

  const renderLayout = () => {
    switch (experience.type) {
      case 'stay':
        return <StayDetail experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />;
      case 'event':
        return <EventDetail experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />;
      case 'food':
        return <FoodDetail experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />;
      case 'place':
        return <PlaceDetail experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />;
      case 'experience':
      default:
        return <ImmersionDetail experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {!isBooked ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container mx-auto px-6 pt-32 pb-24">
               {/* Back Button */}
               <Link to="/" className="inline-flex items-center gap-3 text-white/30 hover:text-white mb-16 group transition-all">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowLeft size={16} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Map</span>
              </Link>
              {renderLayout()}
            </div>
          </motion.div>
        ) : (
          <BookingSuccess />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-Components for Different Plan Types ---

function BookingSuccess() {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="container mx-auto px-6 h-screen flex items-center justify-center text-center"
    >
      <div className="max-w-2xl">
        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-10 animate-pulse">
           <ShieldCheck size={48} className="text-white" />
        </div>
        <h2 className="text-6xl font-serif italic mb-8">Request Locked.</h2>
        <p className="text-white/40 text-xl font-light leading-relaxed mb-12">
          Your curation project has been submitted. A Lead Specialist will review 
          your profile and secure your slot within 24 hours.
        </p>
        <Link to="/" className="inline-flex px-14 py-6 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
          Back to Hub
        </Link>
      </div>
    </motion.div>
  );
}

function Sidebar({ experience, guests, setGuests, setIsBooked }: { experience: Experience, guests: number, setGuests: any, setIsBooked: any }) {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-32 glass p-10 rounded-[60px] premium-shadow border-white/5 bg-white/[0.01]">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.3em] mb-2">{experience.type === 'place' ? 'Discovery Guide' : 'Exclusive Plan'}</p>
            <p className="text-5xl font-display font-medium leading-none">
              {experience.price > 0 ? `$${experience.price * guests}` : 'Free'}
            </p>
          </div>
          {experience.price > 0 && <span className="text-xs text-white/20 mb-2 font-medium">/ journey</span>}
        </div>

        <div className="space-y-4 mb-10">
           {experience.type !== 'place' && (
             <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Guest Count</span>
                <div className="flex items-center gap-6">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">-</button>
                  <span className="text-lg font-display font-bold">{guests}</span>
                  <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">+</button>
                </div>
             </div>
           )}
           <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Timeline</span>
              <span className="text-xs font-bold text-white/60">Season 2026</span>
           </div>
        </div>

        <button 
          onClick={() => setIsBooked(true)}
          className="w-full py-6 bg-white text-black rounded-full font-display font-black text-xl hover:scale-[1.03] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4"
        >
          {experience.type === 'place' ? 'Download Guide' : 'Secure Plan'}
          <ChevronRight size={24} />
        </button>

        <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-4 text-white/30">
             <ShieldCheck size={16} />
             <p className="text-[10px] uppercase font-bold tracking-widest leading-none">Curation Guarantee</p>
          </div>
          <div className="flex items-center gap-4 text-white/30">
             <Globe size={16} />
             <p className="text-[10px] uppercase font-bold tracking-widest leading-none">Global Coverage</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StayDetail({ experience, guests, setGuests, setIsBooked }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-8">
        <span className="px-4 py-1.5 rounded-full bg-stay/20 text-stay text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Plan: Luxury Stay</span>
        <h1 className="text-5xl md:text-8xl font-serif italic mb-10 leading-[0.9] text-white/90">The <br /> {experience.title}</h1>
        <p className="text-2xl text-white/60 font-light leading-relaxed mb-16">{experience.description}</p>
        
        <div className="grid grid-cols-2 gap-4 h-[500px] mb-20">
           <img src={experience.image} className="w-full h-full object-cover rounded-[50px] shadow-2xl" />
           <div className="grid grid-rows-2 gap-4">
              <img src={experience.detailImage} className="w-full h-full object-cover rounded-[50px]" />
              <img src="/assets/lkp_hero_cinematic.png" className="w-full h-full object-cover rounded-[50px]" />
           </div>
        </div>

        <div className="mb-20">
           <h3 className="text-3xl font-display font-medium mb-12">Retreat Amenities</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {experience.amenities?.map((a: string) => (
                <div key={a} className="p-8 glass rounded-[40px] text-center border-white/5">
                   <p className="text-xs font-bold uppercase tracking-widest text-white/60">{a}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
      <Sidebar experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />
    </div>
  );
}

function FoodDetail({ experience, guests, setGuests, setIsBooked }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-8">
        <span className="px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-200 text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Plan: Culinary Discovery</span>
        <h1 className="text-5xl md:text-8xl font-serif italic mb-10 leading-[0.9] text-white/90">Gastronomy: <br /> {experience.title}</h1>
        <p className="text-2xl text-white/60 font-light leading-relaxed mb-16">{experience.description}</p>
        
        <div className="p-12 glass rounded-[60px] border-white/5 mb-20 bg-orange-500/[0.02]">
           <div className="flex items-center gap-6 mb-12">
              <Utensils size={32} className="text-orange-300" />
              <h3 className="text-3xl font-display font-medium">The Tasing Menu</h3>
           </div>
           <div className="space-y-12">
              {experience.menu?.map((m: any) => (
                <div key={m.name} className="flex justify-between items-start border-b border-white/5 pb-8 group">
                   <div>
                      <h4 className="text-2xl font-display font-medium mb-2 group-hover:text-orange-200 transition-colors">{m.name}</h4>
                      <p className="text-white/40 text-sm">{m.desc}</p>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/20 pt-2">{m.price}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
      <Sidebar experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />
    </div>
  );
}

function EventDetail({ experience, guests, setGuests, setIsBooked }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-8">
        <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Plan: Private Gathering</span>
        <h1 className="text-5xl md:text-8xl font-serif italic mb-10 leading-[0.9] text-white/90">{experience.title}</h1>
        
        <div className="mb-20 rounded-[60px] overflow-hidden aspect-[21/9] shadow-2xl relative">
           <img src={experience.image} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
               <p className="text-2xl font-serif italic">The Sacred Grounds</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
           <div>
              <h3 className="text-2xl font-display font-medium mb-8 flex items-center gap-3"><Calendar size={20} /> Event Schedule</h3>
              <div className="space-y-8">
                 {experience.schedule?.map((s: any) => (
                   <div key={s.time} className="flex gap-8 group">
                      <span className="text-white/20 font-black text-xs pt-1">{s.time}</span>
                      <p className="text-xl font-medium group-hover:text-white transition-colors">{s.activity}</p>
                   </div>
                 ))}
              </div>
           </div>
           <div>
              <h3 className="text-2xl font-display font-medium mb-8 flex items-center gap-3"><Users size={20} /> Membership Circle</h3>
              <p className="text-white/40 leading-relaxed font-light mb-8">This gathering is strictly limited to 12 participants to ensure deep connection and ritual sanctity.</p>
              <div className="p-8 border border-white/5 rounded-[40px] bg-white/[0.02]">
                 <p className="text-xs font-bold text-white/60 mb-2">Access Level</p>
                 <p className="text-lg font-medium">Founding Members Only</p>
              </div>
           </div>
        </div>
      </div>
      <Sidebar experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />
    </div>
  );
}

function PlaceDetail({ experience, guests, setGuests, setIsBooked }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-8">
        <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Plan: Destination Hub</span>
        <h1 className="text-5xl md:text-8xl font-serif italic mb-10 leading-[0.9] text-white/90">Guide: <br /> {experience.title}</h1>
        
        <div className="columns-1 md:columns-2 gap-8 space-y-8 mb-20">
           <img src={experience.image} className="rounded-[40px] w-full" />
           <div className="p-12 glass rounded-[60px] border-white/5 bg-emerald-500/[0.02]">
              <h4 className="text-2xl font-display font-medium mb-6 italic">History & Aura</h4>
              <p className="text-white/40 leading-relaxed font-light">{experience.description}</p>
           </div>
           <div className="p-12 glass rounded-[60px] border-white/5 bg-white/[0.02]">
              <h4 className="text-xl font-display font-medium mb-8 uppercase tracking-widest text-[12px]">Top Landmarks</h4>
              <div className="space-y-4">
                 {experience.attractions?.map((att: string) => (
                   <div key={att} className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group cursor-default">
                      <div className="w-2 h-2 rounded-full border border-emerald-500/60 group-hover:bg-emerald-500 transition-all" />
                      <span className="text-lg font-medium">{att}</span>
                   </div>
                 ))}
              </div>
           </div>
           <img src={experience.detailImage} className="rounded-[40px] w-full" />
        </div>
      </div>
      <Sidebar experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />
    </div>
  );
}

function ImmersionDetail({ experience, guests, setGuests, setIsBooked }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-8 text-left">
        <span className="px-4 py-1.5 rounded-full bg-experience/20 text-experience text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Plan: Immersive Experience</span>
        <h1 className="text-5xl md:text-8xl font-serif italic mb-10 leading-[0.9] text-white/90">{experience.title}</h1>
        <p className="text-2xl text-white/60 font-light leading-relaxed mb-16">{experience.description}</p>
        
        <div className="mb-20">
           <div className="flex items-center gap-12 mb-16">
              <h2 className="text-3xl font-display font-medium whitespace-nowrap">Chronological Journey</h2>
              <div className="flex-1 h-px bg-white/5" />
           </div>
           <div className="space-y-20">
             {experience.itinerary?.map((item: any, idx: number) => (
               <div key={idx} className="flex gap-12 group">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center font-display text-lg group-hover:bg-white group-hover:text-black transition-all">
                      {idx + 1}
                    </div>
                    {idx !== experience.itinerary.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent my-6" />
                    )}
                  </div>
                  <div className="pb-12 border-b border-white/5 w-full">
                    <span className="text-white/20 font-black tracking-widest text-[9px] uppercase mb-4 block">{item.day}</span>
                    <h3 className="text-3xl font-display font-medium mb-6 group-hover:translate-x-3 transition-transform duration-500">{item.title}</h3>
                    <p className="text-lg text-white/40 leading-relaxed max-w-2xl font-light">{item.desc}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
      <Sidebar experience={experience} guests={guests} setGuests={setGuests} setIsBooked={setIsBooked} />
    </div>
  );
}
