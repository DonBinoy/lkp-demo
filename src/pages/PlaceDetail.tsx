import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, MapPin, Compass } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useRef } from 'react';

export default function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = EXPERIENCES.find(e => e.id === Number(id));

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  if (!place || place.type !== 'place') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <h1 className="text-4xl font-display font-black text-white mb-4">Location Archive Not Found</h1>
          <button onClick={() => navigate('/')} className="text-xs font-black uppercase tracking-widest border-b border-white pb-1">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen">
      
      {/* Global Grain Filter */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      {/* Immersive Parallax Header */}
      <section className="relative h-screen overflow-hidden">
        <motion.div style={{ y: headerY }} className="absolute inset-0 z-0">
          <img src={place.image} className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity" />
        </motion.div>
        
        {/* Gradients to blend imagery with background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505] z-10" />

        <div className="relative z-20 h-full flex flex-col justify-between p-6 md:p-12">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            <ArrowLeft size={20} />
          </motion.button>
          
          <motion.div style={{ y: textY }} className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6 text-white/50"
            >
               <MapPin size={14} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">{place.location}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="text-7xl md:text-[10vw] font-serif italic text-white leading-[0.8] mb-8"
            >
              {place.title.split(' ')[0]} <br/>
              <span className="font-display font-black not-italic text-transparent [-webkit-text-stroke:2px_white]">{place.title.split(' ').slice(1).join(' ')}</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Editorial Content Flow */}
      <section className="py-32 relative z-20 bg-[#050505]" id="editorial">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            
            {/* Left Column Description */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5 md:sticky top-32"
            >
              <h2 className="text-sm font-black uppercase tracking-widest text-stay mb-8">The Landscape</h2>
              <p className="text-3xl font-serif italic text-white/80 leading-relaxed mb-12">
                {place.description}
              </p>
              
              {/* Highlight Pillars */}
              <div className="space-y-6 border-l border-white/10 pl-6">
                {place.highlights.map((hlt, i) => (
                  <div key={i} className="group">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-widest block mb-1">0{i+1}</span>
                    <h4 className="text-xl font-display font-medium text-white group-hover:text-stay transition-colors">{hlt}</h4>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column Attractions & Curator Notes */}
            <div className="md:col-span-7 space-y-32 mt-20 md:mt-0">
              
              {/* Massive Offset Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/3] md:w-[120%] md:-ml-[10%] rounded-[40px] overflow-hidden"
              >
                <img src={place.detailImage} alt="Locale Detail" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </motion.div>

              {/* Curator Notes - Huge Typography Block */}
              {place.curatorNotes && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/[0.02] p-12 md:p-20 rounded-[60px] border border-white/5 relative"
                >
                  <Compass className="absolute top-12 left-12 text-white/20" size={48} />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10 text-center">Curator's Manifesto</h3>
                  <p className="text-4xl md:text-5xl font-serif italic leading-tight text-white/90 text-center">
                    "{place.curatorNotes}"
                  </p>
                </motion.div>
              )}

              {/* Attractions Bento List */}
              {place.attractions && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-sm font-black uppercase tracking-widest text-stay mb-12 border-b border-white/10 pb-4">Key Immersions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {place.attractions.map((attr, i) => (
                      <div key={i} className="p-8 border border-white/10 rounded-3xl group hover:bg-white/5 transition-all cursor-crosshair">
                        <span className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-4 block">Point of Interest</span>
                        <h4 className="text-2xl font-display font-medium text-white group-hover:text-glow transition-all">{attr}</h4>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Footer */}
      <section className="py-40 bg-[#000] border-t border-white/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <h2 className="text-[20vw] font-display font-black leading-none whitespace-nowrap text-white">DISCOVER</h2>
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-10">See It For <span className="font-display font-black not-italic text-transparent [-webkit-text-stroke:2px_white]">Yourself.</span></h2>
          <button className="px-12 py-5 bg-white text-black rounded-full font-display font-black transition-all uppercase tracking-widest text-xs hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Explore Area Plans
          </button>
        </div>
      </section>
    </div>
  );
}
