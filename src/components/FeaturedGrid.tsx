import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { EXPERIENCES } from '../data';

export default function FeaturedGrid() {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' 
    ? EXPERIENCES 
    : EXPERIENCES.filter(item => item.type === filter);

  const categories = [
    { id: 'all', label: 'All Selects' },
    { id: 'experience', label: 'Experiences' },
    { id: 'stay', label: 'Stays' },
    { id: 'food', label: 'Food' },
    { id: 'event', label: 'Events' },
    { id: 'place', label: 'Places' }
  ];

  return (
    <section className="py-32 bg-background overflow-hidden" id="experiences">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl text-left">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-black block mb-4"
            >
              Curated Portfolio
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="text-5xl md:text-7xl font-serif italic mb-6 leading-none"
            >
              The <span className="font-sans not-italic font-medium text-white">Top Picks.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 font-light"
            >
              Hand-picked by our lead curators for this lunar cycle.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`relative px-6 py-2 rounded-full border transition-colors text-[10px] uppercase font-bold tracking-widest ${
                  filter === cat.id 
                  ? 'border-transparent text-black' 
                  : 'border-white/5 text-white/40 hover:text-white'
                }`}
              >
                {filter === cat.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[500px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((exp, idx) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50, filter: "blur(10px)" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: idx * 0.05 
                }}
              >
                <ExperienceCard {...exp} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="py-20 text-center"
           >
             <p className="text-white/20 font-display italic text-2xl">No items found in this category yet.</p>
           </motion.div>
        )}
      </div>
    </section>
  );
}
