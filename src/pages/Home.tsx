import Hero from '../components/Hero'
import FeaturedGrid from '../components/FeaturedGrid'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, Globe, Star, MapPin } from 'lucide-react'
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
      
      {/* Featured Plans / Quick Picks */}
      <section className="py-24 bg-background border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-display font-medium uppercase tracking-widest text-white/80">Active Collections</h2>
            <div className="flex gap-4 items-center text-[10px] font-black uppercase tracking-widest text-white/30">
               <span className="w-2 h-2 rounded-full bg-stay animate-pulse" />
               Live Updates
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'The Glass Lodge', loc: 'Peru', price: '$3,200', img: '/assets/lkp_stay_lodge.png' },
              { title: 'Atacama Sky', loc: 'Chile', price: '$2,100', img: '/assets/lkp_hero_cinematic.png' },
              { title: 'Desert Nocturne', loc: 'Sahara', price: '$1,250', img: '/assets/lkp_desert_details_interior.png' },
              { title: 'Jungle Ascent', loc: 'Bali', price: '$890', img: '/assets/lkp_jungle_experience.png' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-[30px] overflow-hidden mb-4 relative">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                     <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{item.loc}</p>
                     <p className="text-lg font-display font-medium">{item.title}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center px-2">
                   <span className="text-xs font-bold text-white/60">{item.price}</span>
                   <button className="text-[10px] font-black uppercase tracking-widest text-white underline underline-offset-4 decoration-white/20 hover:decoration-white">Detail</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-background relative" id="philosophy">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative z-10 text-left">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-stay/80 uppercase tracking-[0.4em] text-[10px] font-black block mb-8 border border-stay/20 w-fit px-4 py-1 rounded-full"
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
            </div>

            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 gap-6">
                <motion.div style={{ y: y1 }} className="space-y-6 pt-24">
                  <div className="aspect-[3/4] rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/assets/lkp_stay_lodge.png" className="w-full h-full object-cover" alt="Lodge" />
                  </div>
                </motion.div>
                <motion.div style={{ y: y2 }} className="space-y-6">
                  <div className="aspect-[3/4] rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/assets/lkp_desert_experience.png" className="w-full h-full object-cover" alt="Desert" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="py-40 bg-[#080808]" id="stays">
        <div className="container mx-auto px-6">
          <div className="text-left mb-24 grid grid-cols-1 md:grid-cols-2 items-end">
            <div>
              <motion.h2 className="text-5xl md:text-7xl font-display font-medium mb-6">Explore <br /> <span className="italic">Categories.</span></motion.h2>
              <p className="text-white/40 max-w-md">Five distinct ways to discover the planet's secrets. Each category is a unique philosophy of time and place.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { id: 'experiences', title: 'Experiences', icon: Star, color: 'text-experience', bg: 'bg-experience/5' },
              { id: 'events', title: 'Events', icon: ShieldCheck, color: 'text-white', bg: 'bg-white/5' },
              { id: 'food', title: 'Food', icon: Globe, color: 'text-orange-300', bg: 'bg-orange-500/5' },
              { id: 'stays', title: 'Stays', icon: MapPin, color: 'text-stay', bg: 'bg-stay/5' },
              { id: 'places', title: 'Places', icon: Globe, color: 'text-emerald-300', bg: 'bg-emerald-500/5' }
            ].map((cat) => (
              <motion.a
                key={cat.id}
                href={`#${cat.id}`}
                whileHover={{ y: -10 }}
                className={`p-10 rounded-[50px] border border-white/5 ${cat.bg} flex flex-col items-center text-center group cursor-pointer`}
              >
                <cat.icon className={`mb-8 ${cat.color} transition-transform group-hover:scale-125`} size={32} />
                <h3 className="text-xl font-display font-medium mb-1">{cat.title}</h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Explore All</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <div id="experiences">
        <FeaturedGrid />
      </div>

      {/* Rare Collections Section */}
      <section className="py-40 relative bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 text-left">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-6 block">Member Selects</span>
              <h2 className="text-5xl md:text-7xl font-serif italic mb-8 leading-tight">Rare <br /><span className="font-sans not-italic font-medium text-white">Collections.</span></h2>
              <p className="text-xl text-white/40 font-light">A limited series of expeditions available only to founding members.</p>
            </div>
             <button className="px-10 py-5 glass border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">View All Collections</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { title: 'The Silence of Atacama', loc: 'Chilean Highlands', img: '/assets/lkp_hero_cinematic.png', type: 'Experience' },
              { title: 'Nights of the Fjord', loc: 'Tromsø, Norway', img: '/assets/lkp_arctic_experience.png', type: 'Stay' }
            ].map((item, idx) => (
              <div
                key={idx}
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
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Membership / CTA */}
      <section className="py-40 bg-background overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto glass p-20 rounded-[60px] premium-shadow border-white/5 relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black tracking-[0.3em] uppercase mb-8 text-white/50">
                Join the Circle
              </span>
              <h2 className="text-5xl md:text-7xl font-serif italic mb-8 leading-tight">
                Luxury for the <br /> <span className="font-sans not-italic font-medium text-white underline underline-offset-8 decoration-white/10">LKP Member.</span>
              </h2>
              <p className="text-white/40 mb-12 max-w-lg mx-auto text-lg font-light leading-relaxed">
                Membership at Little Known Planet is by application only, ensuring 
                a community of like-minded souls dedicated to ethical exploration.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-12 py-5 bg-white text-black rounded-full font-display font-black hover:scale-105 transition-transform shadow-xl uppercase tracking-widest text-xs">
                  Apply for Membership
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
