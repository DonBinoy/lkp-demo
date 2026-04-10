import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { EXPERIENCES } from '../data';

export default function FeaturedGrid() {
  return (
    <section className="py-32 bg-background overflow-hidden" id="experiences">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-left">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold block mb-4"
            >
              Curated Selection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-medium"
            >
              Wait-listed <span className="italic">Destinations.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex gap-4"
          >
            {['All', 'Stay', 'Adventure', 'Experience'].map((cat) => (
              <button 
                key={cat}
                className="px-6 py-2 rounded-full border border-white/10 hover:border-white/40 transition-colors text-sm font-medium"
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <ExperienceCard {...exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
