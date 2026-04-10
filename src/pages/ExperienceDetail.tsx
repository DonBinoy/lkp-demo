import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, 
  ChevronRight, Compass, Map, Layers
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { EXPERIENCES } from '../data';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-display mb-8">Journey not found</h2>
          <Link to="/" className="px-8 py-4 bg-white text-black rounded-full font-bold">Return to Map</Link>
        </div>
      </div>
    );
  }

  const themeColors = {
    stay: 'text-stay border-stay/20 bg-stay/10',
    adventure: 'text-adventure border-adventure/20 bg-adventure/10',
    experience: 'text-experience border-experience/20 bg-experience/10',
  };

  const gradientThemes = {
    stay: 'from-stay/20 via-background to-background',
    adventure: 'from-adventure/20 via-background to-background',
    experience: 'from-experience/20 via-background to-background',
  };

  const accentText = {
    stay: 'text-stay',
    adventure: 'text-adventure',
    experience: 'text-experience',
  };

  return (
    <div className={`min-h-screen pt-24 pb-32 transition-colors duration-1000 bg-gradient-to-b ${gradientThemes[experience.type]}`}>
      <AnimatePresence mode="wait">
        {!isBooked ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="container mx-auto px-6"
          >
            {/* Breadcrumbs / Back */}
            <Link to="/" className="inline-flex items-center gap-3 text-white/30 hover:text-white mb-12 group transition-all">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft size={16} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Back to catalog</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Left Column: Content */}
              <div className="lg:col-span-8">
                {/* Immersive Header */}
                <div className="mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] ${themeColors[experience.type]}`}>
                      {experience.category}
                    </span>
                    <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">• {experience.location}</span>
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-8xl font-serif italic mb-10 leading-[0.9] text-white"
                  >
                    {experience.title}
                  </motion.h1>
                  
                  <div className="flex flex-wrap gap-12 pt-10 border-t border-white/5">
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Pace</p>
                      <p className="font-display font-medium text-lg">Mindful & Secluded</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Group Size</p>
                      <p className="font-display font-medium text-lg">Max 4 Persons</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Inclusion</p>
                      <p className="font-display font-medium text-lg">All-inclusive Private</p>
                    </div>
                  </div>
                </div>

                {/* Main Visual */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="relative aspect-[21/9] rounded-[60px] overflow-hidden mb-20 shadow-2xl group"
                >
                  <img src={experience.image} alt={experience.title} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>

                {/* Narrative Sections */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
                  <div className="md:col-span-4">
                    <h3 className={`text-4xl font-serif italic mb-6 ${accentText[experience.type]}`}>The Ethos.</h3>
                    <div className="space-y-6">
                      {experience.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-4 text-white/40 group cursor-default">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${accentText[experience.type]} group-hover:scale-150 transition-transform`} />
                          <p className="text-sm font-medium leading-relaxed group-hover:text-white/60 transition-colors">{h}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-2xl text-white/60 leading-relaxed font-light mb-12 first-letter:text-7xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-white">
                      {experience.description}
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="aspect-square rounded-[40px] overflow-hidden relative group">
                        <img src={experience.detailImage} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Inner 1" />
                        <div className="absolute bottom-4 left-4 p-4 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[10px] font-bold uppercase tracking-widest">Detail A</p>
                        </div>
                      </div>
                      <div className="aspect-square rounded-[40px] overflow-hidden relative group">
                        <img src={experience.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Inner 2" />
                         <div className="absolute bottom-4 left-4 p-4 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[10px] font-bold uppercase tracking-widest">Detail B</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itinerary with Luxury Polish */}
                <section className="mb-32">
                   <div className="flex items-center gap-12 mb-20">
                      <h2 className="text-4xl font-display font-medium">The Itinerary</h2>
                      <div className="flex-1 h-px bg-white/5" />
                   </div>
                  
                  <div className="space-y-24">
                    {experience.itinerary.map((item, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-12 group">
                        <div className="md:w-32">
                          <span className={`text-4xl font-serif italic mb-2 block ${accentText[experience.type]}`}>{item.day}</span>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Progression</p>
                        </div>
                        <div className="flex-1 relative pl-12 border-l border-white/5">
                          <div className={`absolute top-0 -left-[5px] w-2.5 h-2.5 rounded-full border-2 border-background ${accentText[experience.type]}`} />
                          <h3 className="text-3xl font-display font-medium mb-6 group-hover:translate-x-2 transition-transform duration-500">{item.title}</h3>
                          <p className="text-lg text-white/40 leading-relaxed max-w-2xl font-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Sticky Booking / Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="glass p-12 rounded-[60px] premium-shadow border-white/5 bg-white/[0.02] backdrop-blur-2xl relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="flex items-end justify-between mb-12">
                        <div>
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mb-3">Est. Investment</p>
                          <p className="text-6xl font-display font-medium leading-none">${experience.price * guests}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-white/60 mb-1">{guests} Guest{guests > 1 ? 's' : ''}</p>
                          <span className={`text-[10px] font-bold uppercase ${accentText[experience.type]}`}>Premium Select</span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-12">
                        <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Guest Count</span>
                          <div className="flex items-center gap-6">
                            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">-</button>
                            <span className="text-lg font-bold w-4 text-center">{guests}</span>
                            <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">+</button>
                          </div>
                        </div>
                        <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center justify-between group cursor-pointer">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Target Cycle</span>
                           <span className="text-sm font-medium">Sep 2026 Season</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setIsBooked(true)}
                        className="w-full py-6 bg-white text-black rounded-full font-display font-black text-xl hover:scale-[1.05] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4"
                      >
                        Petition Access
                        <ChevronRight size={24} />
                      </button>

                      <div className="mt-12 space-y-6 pt-12 border-t border-white/5">
                        <div className="flex items-center gap-4 text-white/30 group">
                          <Compass size={18} className="group-hover:rotate-45 transition-transform" />
                          <p className="text-xs font-medium">Expert curation in-bound</p>
                        </div>
                        <div className="flex items-center gap-4 text-white/30 group">
                          <Map size={18} />
                          <p className="text-xs font-medium">Uncharted territory coverage</p>
                        </div>
                        <div className="flex items-center gap-4 text-white/30 group">
                          <Layers size={18} />
                          <p className="text-xs font-medium">Tier-1 Insurance included</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Background accent */}
                    <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 ${accentText[experience.type].replace('text', 'bg')}`} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto text-center py-40 px-6"
          >
            <div className="w-32 h-32 rounded-full glass border-white/10 flex items-center justify-center mx-auto mb-12 animate-pulse">
               <ShieldCheck size={64} className="text-white" />
            </div>
            <h2 className="text-6xl md:text-8xl font-serif italic mb-10 text-white">Application Received.</h2>
            <p className="text-white/40 text-2xl font-light leading-relaxed mb-16">
              The planet's secrets are revealed to the patient. A Lead Curator will evaluate 
              your expedition profile and contact you within one solar cycle.
            </p>
            <Link to="/" className="inline-flex px-14 py-6 bg-white text-black rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">
              Explore More Journeys
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
