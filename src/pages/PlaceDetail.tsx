import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, MapPin, Compass } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useRef } from 'react';
import ImageGallery from '../components/ImageGallery';

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
    <div ref={containerRef} className="bg-[#050505] min-h-screen selection:bg-white selection:text-black">
      
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
            className="w-16 h-16 rounded-full backdrop-blur-md bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.div style={{ y: textY }} className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8 text-white/50"
            >
               <MapPin size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.5em]">{place.location}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="text-8xl md:text-[12vw] font-serif italic text-white leading-[0.75] mb-12 tracking-tighter"
            >
              {place.title.split(' ')[0]} <br/>
              <span className="font-display font-black not-italic text-transparent [-webkit-text-stroke:2px_white] hover:text-white transition-all duration-1000">{place.title.split(' ').slice(1).join(' ')}</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Editorial Content Flow */}
      <section className="py-32 relative z-20 bg-[#050505]" id="editorial">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-24 items-start">
            
            {/* Left Column Description */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5 md:sticky top-32"
            >
              <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 mb-10">Historical Context</h2>
              <p className="text-3xl md:text-5xl font-serif italic text-white/80 leading-tight mb-16">
                {place.description}
              </p>
              
              {/* Highlight Pillars */}
              <div className="space-y-12 border-l border-white/5 pl-10">
                {place.highlights.map((hlt, i) => (
                  <div key={i} className="group">
                    <span className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em] block mb-3">Segment 0{i+1}</span>
                    <h4 className="text-2xl font-display font-medium text-white group-hover:translate-x-4 transition-all duration-500">{hlt}</h4>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column Attractions & Curator Notes */}
            <div className="md:col-span-7 space-y-40 mt-20 md:mt-0">
              
              {/* Visual Gallery Instead of Massive Offset Image */}
              {place.gallery && (
                <div className="md:w-[120%] md:-ml-[10%]">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-10 px-[10%]">Atmospheric Survey</h3>
                   <ImageGallery images={place.gallery} />
                </div>
              )}

              {/* Curator Notes */}
              {place.curatorNotes && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/[0.01] p-16 md:p-24 rounded-[80px] border border-white/5 relative group hover:border-white/20 transition-all backdrop-blur-3xl"
                >
                  <Compass className="absolute top-12 left-12 text-white/10 group-hover:rotate-45 transition-transform duration-1000" size={60} />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-12 text-center">Curator's Manifesto</h3>
                  <p className="text-4xl md:text-6xl font-serif italic leading-tight text-white/90 text-center">
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
                  <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 mb-12 border-b border-white/5 pb-6">Key Immersions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {place.attractions.map((attr, i) => (
                      <div key={i} className="p-12 border border-white/5 rounded-[40px] group hover:bg-white/[0.03] transition-all cursor-crosshair">
                        <span className="text-[10px] text-white/10 font-black uppercase tracking-widest mb-6 block">POI-0{i+1}</span>
                        <h4 className="text-3xl font-display font-black uppercase group-hover:translate-x-4 transition-all duration-700 leading-tight">{attr}</h4>
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
      <section className="py-60 bg-[#000] border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <h2 className="text-[30vw] font-display font-black leading-none whitespace-nowrap text-white italic">DISCOVER</h2>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-6xl md:text-[10vw] font-serif italic text-white mb-16 tracking-tighter leading-none">Experience <br/> <span className="font-display font-black not-italic text-transparent [-webkit-text-stroke:2px_white] hover:text-white transition-all duration-1000">The Planet.</span></h2>
          <button onClick={() => navigate('/')} className="px-24 py-10 bg-white text-black rounded-full font-display font-black transition-all uppercase tracking-[0.5em] text-[10px] hover:scale-105 shadow-[0_40px_100px_rgba(255,255,255,0.1)]">
            Back to Registry
          </button>
        </div>
      </section>
    </div>
  );
}
