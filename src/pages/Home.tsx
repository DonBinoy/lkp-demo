import Hero from '../components/Hero'
import FeaturedGrid from '../components/FeaturedGrid'
import Marquee from '../components/Marquee'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { useRef } from 'react'
import { EXPERIENCES } from '../data'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const containerRef = useRef(null);
  const rareRef = useRef(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: rareScroll } = useScroll({
    target: rareRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  
  const xRare = useTransform(rareScroll, [0, 1], ["0%", "-50%"]);

  // Top tier e-commerce items for the bento grid
  const highlightItems = [EXPERIENCES[1], EXPERIENCES[0], EXPERIENCES[3]];

  return (
    <main ref={containerRef} className="overflow-hidden bg-[#050505]">
      {/* Global Grain Filter */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      <Hero />
      
      {/* E-Commerce Priority: Featured Grid right after Hero */}
      <div id="experiences" className="bg-[#050505]">
        <FeaturedGrid />
      </div>

      <Marquee text="★ THE ART OF CURATION ★ BEYOND ORDINARY ★" />
      
      {/* Shoppable Bento Box */}
      <section className="py-40 relative border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-8">
            <h2 className="text-6xl md:text-8xl font-serif italic font-light leading-[0.9]">
              Active <br/> 
              <span className="font-display font-black not-italic text-transparent [-webkit-text-stroke:2px_white]">Collections.</span>
            </h2>
            <div className="flex gap-4 items-center text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/10 rounded-full px-6 py-3">
               <span className="w-2 h-2 rounded-full bg-stay animate-pulse" />
               Live Shop Drops
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
            
            {/* Massive Lead Item - E-Commerce Focus */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-8 group cursor-pointer relative aspect-square md:aspect-[16/9] rounded-[40px] overflow-hidden"
              onClick={() => navigate(`/experience/${highlightItems[0].id}`)}
            >
              <img src={highlightItems[0].image} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-10 left-10 z-20">
                <span className="px-4 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  Top Seller
                </span>
              </div>

              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-4 block mix-blend-difference">{highlightItems[0].location} • {highlightItems[0].duration}</p>
                   <h3 className="text-5xl md:text-7xl font-serif italic text-white mb-6 group-hover:text-glow transition-all">{highlightItems[0].title}</h3>
                 </div>
                 <div className="text-right flex flex-col items-end">
                    <p className="text-3xl font-display text-white mb-4">${highlightItems[0].price.toLocaleString()}</p>
                    <button className="px-8 py-4 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-xl">
                      Book Now <ArrowRight size={14} />
                    </button>
                 </div>
              </div>
            </motion.div>

            {/* Vertical Split E-Commerce Items */}
            <div className="md:col-span-4 grid grid-rows-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="group cursor-pointer rounded-[40px] bg-white/[0.02] border border-white/5 p-10 flex flex-col justify-between hover:bg-white/10 transition-colors relative overflow-hidden"
                onClick={() => navigate(`/experience/${highlightItems[1].id}`)}
              >
                <div className="flex justify-between items-start z-10 relative">
                  <h4 className="text-3xl font-display font-medium w-1/2 text-white">{highlightItems[1].title}</h4>
                  <span className="text-xl font-serif italic text-white">${highlightItems[1].price.toLocaleString()}</span>
                </div>
                <div className="z-10 relative flex justify-between items-end">
                  <p className="text-xs uppercase tracking-widest font-bold text-white/50">{highlightItems[1].location}</p>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-black">
                     <ShoppingBag size={14} />
                  </div>
                </div>
                <img src={highlightItems[1].detailImage} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-0 mix-blend-overlay" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="group cursor-pointer rounded-[40px] overflow-hidden relative"
                onClick={() => navigate(`/experience/${highlightItems[2].id}`)}
              >
                <img src={highlightItems[2].image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 m-auto w-fit h-fit text-center z-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <h4 className="text-4xl font-serif italic text-white mb-2">{highlightItems[2].title}</h4>
                  <span className="text-sm font-display font-bold text-white/80 border border-white/20 px-4 py-1 rounded-full">${highlightItems[2].price.toLocaleString()}</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Extreme Typography Philosophy */}
      <section className="py-[300px] relative bg-[#0a0a0a]" id="philosophy">
        <div className="container mx-auto px-6 relative z-10">
          
          <motion.div 
            className="flex flex-col items-center justify-center text-center max-w-[1200px] mx-auto relative"
          >
            {/* Absolute floating images for controlled chaos */}
            <motion.img 
              style={{ y: y1 }}
              src="/assets/lkp_snow_experience.png" 
              className="absolute -left-20 top-0 w-64 h-[400px] object-cover rounded-full grayscale opacity-50 z-0 hidden md:block" 
            />
            <motion.img 
              style={{ y: y2 }}
              src="/assets/lkp_arctic_experience.png" 
              className="absolute -right-20 bottom-0 w-64 h-[400px] object-cover rounded-full grayscale opacity-50 z-0 hidden md:block" 
            />

            <h2 className="text-[8vw] leading-[0.8] tracking-tighter uppercase whitespace-nowrap z-10 relative">
              <span className="font-display font-black text-transparent [-webkit-text-stroke:2px_white] block mb-4">Reject</span>
              <span className="font-serif italic text-white flex items-center justify-center gap-6">
                The <div className="w-32 h-2 bg-stay rounded-full inline-block" /> Ordinary
              </span>
            </h2>
            
            <p className="mt-20 text-2xl md:text-4xl font-serif italic text-white/40 max-w-2xl leading-relaxed z-10 relative mix-blend-difference">
              We curate moments that alter your perspective. From the silent dunes of the Sahara to the fog-drenched peaks of the Andes. Everything else is just noise.
            </p>
          </motion.div>

        </div>
      </section>

      <Marquee text="• FIND YOUR CENTER • BREAK THE MAP •" />

      {/* Sticky Horizontal Scroll / Rare Collections */}
      <section ref={rareRef} className="h-[300vh] relative bg-stay-dark">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          
          <div className="absolute top-20 left-10 md:left-20 z-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-6 block">Archive Access</span>
            <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">
              Rare <br/> <span className="font-display font-black not-italic text-transparent [-webkit-text-stroke:1px_white]">Collections.</span>
            </h2>
          </div>

          <motion.div 
            style={{ x: xRare }}
            className="flex gap-20 px-[20vw] md:px-[40vw] items-center h-full pt-32"
            data-cursor="drag"
          >
            {/* Slide 1 */}
            <div className="group relative w-[80vw] md:w-[50vw] h-[60vh] shrink-0 rounded-[40px] overflow-hidden cursor-pointer shadow-2xl">
              <img src="/assets/lkp_hero_cinematic.png" className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-10 left-10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-white mb-2 block">01 / The Silence of Atacama</span>
                 <h3 className="text-4xl md:text-6xl font-serif italic">Chilean <br/> Highlands</h3>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="group relative w-[80vw] md:w-[50vw] h-[60vh] shrink-0 rounded-[40px] overflow-hidden cursor-pointer shadow-2xl">
              <img src="/assets/lkp_arctic_experience.png" className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-10 left-10">
                 <span className="text-[10px] font-black uppercase tracking-widest text-white mb-2 block">02 / Nights of the Fjord</span>
                 <h3 className="text-4xl md:text-6xl font-serif italic">Tromso, <br/> Norway</h3>
              </div>
            </div>

            {/* Slide 3 End */}
            <div className="w-[80vw] md:w-[30vw] h-[60vh] shrink-0 flex items-center justify-center">
              <div className="text-center group cursor-pointer" data-cursor="discover">
                <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-8 text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                   <ArrowRight size={40} />
                </div>
                <h3 className="text-3xl font-display font-medium">View Full Vault</h3>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
      
      {/* Brutalist Membership / CTA */}
      <section className="min-h-screen bg-[#000] flex items-center justify-center py-40 border-t border-white/10 relative overflow-hidden">
        {/* Massive background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
           <h2 className="text-[30vw] font-display font-black leading-none whitespace-nowrap text-white">JOIN US</h2>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-4 h-4 bg-white mx-auto mb-16 rounded-full" />
            <h2 className="text-5xl md:text-8xl font-serif italic mb-12 leading-none text-white/90">
              Only The <br /> 
              <span className="font-display font-black not-italic uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_white] hover:[-webkit-text-stroke:4px_white] transition-all duration-500">Initiated.</span>
            </h2>
            <p className="text-white/40 mb-16 max-w-lg mx-auto text-xl font-light leading-relaxed">
              Membership at Little Known Planet is by application only. 
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                data-cursor="discover"
                className="group relative px-12 py-6 bg-transparent text-white border border-white/20 rounded-full font-display font-black transition-all uppercase tracking-widest text-xs overflow-hidden"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">Draft Application</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
