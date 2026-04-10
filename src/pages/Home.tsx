import Hero from '../components/Hero'
import FeaturedGrid from '../components/FeaturedGrid'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, Globe, Star } from 'lucide-react'
import { useRef } from 'react'

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main ref={containerRef} className="overflow-hidden">
      <Hero />
      
      {/* Signature Aesthetic Section */}
      <section className="py-40 bg-background relative" id="philosophy">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative z-10">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-stay/80 uppercase tracking-[0.4em] text-[10px] font-bold block mb-8"
              >
                The Art of Curation
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-serif italic font-light mb-12 leading-[0.9] text-white/90"
              >
                Beyond the <br /> 
                <span className="font-sans not-italic font-medium text-white">Ordinary.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/50 text-xl leading-relaxed mb-12 max-w-md font-light"
              >
                We don't just book trips. We curate moments that alter your perspective. 
                From the silent dunes of the Sahara to the fog-drenched peaks of the Andes.
              </motion.p>
              
              <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                <div>
                  <h4 className="font-display font-medium text-4xl mb-2">94+</h4>
                  <p className="text-white/30 text-xs uppercase tracking-widest font-bold">Uncharted Dest.</p>
                </div>
                <div>
                  <h4 className="font-display font-medium text-4xl mb-2">12k</h4>
                  <p className="text-white/30 text-xs uppercase tracking-widest font-bold">Journeys Taken</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 gap-6">
                <motion.div style={{ y: y1 }} className="space-y-6 pt-24">
                  <div className="aspect-[3/4] rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/assets/lkp_stay_lodge.png" className="w-full h-full object-cover" alt="Lodge" />
                  </div>
                  <div className="aspect-square rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/assets/lkp_arctic_experience.png" className="w-full h-full object-cover" alt="Arctic" />
                  </div>
                </motion.div>
                <motion.div style={{ y: y2 }} className="space-y-6">
                  <div className="aspect-square rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/assets/lkp_jungle_experience.png" className="w-full h-full object-cover" alt="Jungle" />
                  </div>
                  <div className="aspect-[3/4] rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/assets/lkp_desert_experience.png" className="w-full h-full object-cover" alt="Desert" />
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/2 blur-[150px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Discovery Section */}
      <section className="py-40 bg-[#080808]" id="categories">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-medium mb-6"
            >
              Choose Your <span className="italic">Perspective</span>
            </motion.h2>
            <p className="text-white/40 max-w-xl mx-auto">Different ways to reconnect. Each category offers a unique aesthetic and philosophy of travel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Stays', desc: 'Minimalist sanctuaries designed for deep rest.', color: 'text-stay', bg: 'bg-stay/5', border: 'border-stay/20', icon: ShieldCheck, img: '/assets/lkp_stay_lodge.png' },
              { title: 'Experiences', desc: 'Rare encounters with nature and culture.', color: 'text-experience', bg: 'bg-experience/5', border: 'border-experience/20', icon: Star, img: '/assets/lkp_desert_experience.png' },
              { title: 'Adventures', desc: 'The frontier of your physical potential.', color: 'text-adventure', bg: 'bg-adventure/5', border: 'border-adventure/20', icon: Globe, img: '/assets/lkp_jungle_experience.png' }
            ].map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative p-8 rounded-[40px] border ${cat.border} ${cat.bg} hover:border-white/40 transition-all duration-500 overflow-hidden cursor-pointer`}
              >
                <div className="relative z-10">
                  <cat.icon className={`mb-6 ${cat.color}`} size={32} />
                  <h3 className="text-3xl font-display font-medium mb-4">{cat.title}</h3>
                  <p className="text-white/40 text-sm mb-8 leading-relaxed">{cat.desc}</p>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                    Explore {cat.title} <ArrowRight size={14} />
                  </button>
                </div>
                {/* Subtle Image Background Fade */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <img src={cat.img} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rare Collections Section (Premium Slider) */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <motion.span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-6 block px-4 py-1 border border-white/5 rounded-full w-fit">2026 Season Curations</motion.span>
              <h2 className="text-4xl md:text-7xl font-serif italic mb-8 leading-tight">Rare <br /><span className="font-sans not-italic font-medium">Collections.</span></h2>
              <p className="text-xl text-white/40 font-light">A limited series of expeditions available only to founding members.</p>
            </div>
            <div className="flex gap-4">
               <button className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <ArrowRight className="rotate-180 text-white/20" size={24} />
               </button>
               <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group">
                   <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { title: 'The Silence of Atacama', loc: 'Chilean Highlands', img: '/assets/lkp_hero_cinematic.png', type: 'Experience' },
              { title: 'Nights of the Fjord', loc: 'Tromsø, Norway', img: '/assets/lkp_arctic_experience.png', type: 'Stay' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative h-[600px] rounded-[60px] overflow-hidden cursor-pointer"
              >
                <img src={item.img} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                  <div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 block">{item.type} • {item.loc}</span>
                     <h3 className="text-4xl font-display font-medium">{item.title}</h3>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                     <ArrowRight size={24} className="-rotate-45" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedGrid />
      
      {/* Brand Values / Membership */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto glass p-20 rounded-[60px] premium-shadow border-white/5 relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 text-white/50">
                Join the Circle
              </span>
              <h2 className="text-5xl md:text-7xl font-serif italic mb-8 leading-tight">
                Quiet Luxury for <br /> the <span className="font-sans not-italic font-medium">LKP Member.</span>
              </h2>
              <p className="text-white/40 mb-12 max-w-lg mx-auto text-lg font-light leading-relaxed">
                Membership at Little Known Planet is by application only, ensuring 
                a community of like-minded souls dedicated to ethical exploration.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-12 py-5 bg-white text-black rounded-full font-display font-bold hover:scale-105 transition-transform shadow-xl">
                  Apply for Membership
                </button>
                <button className="px-12 py-5 glass border border-white/10 text-white rounded-full font-display font-bold hover:bg-white/5 transition-all">
                  Inquire
                </button>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
