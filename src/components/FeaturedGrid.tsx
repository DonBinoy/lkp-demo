import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';

const EXPERIENCES = [
  {
    id: 1,
    title: "Starlit Sanctuary Expedition",
    location: "Sahara Desert",
    price: "$1,250",
    duration: "3 Nights",
    rating: 4.9,
    image: "/assets/lkp_desert_experience.png",
    category: "Astronomy"
  },
  {
    id: 2,
    title: "The Jungle Temple Ritual",
    location: "Southeast Asia",
    price: "$890",
    duration: "Full Day",
    rating: 5.0,
    image: "/assets/lkp_jungle_experience.png",
    category: "Culture"
  },
  {
    id: 3,
    title: "Arctic Glass Igloo Retreat",
    location: "Tromsø, Norway",
    price: "$2,100",
    duration: "2 Nights",
    rating: 4.8,
    image: "/assets/lkp_arctic_experience.png",
    category: "Luxury"
  }
];

export default function FeaturedGrid() {
  return (
    <section className="py-24 bg-background overflow-hidden" id="experiences">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
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
              Experiences That <span className="italic">Defy </span> Ordinary
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex gap-4"
          >
            {['All', 'Nature', 'Culture', 'Luxury'].map((cat) => (
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

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <button className="group relative px-10 py-4 font-display font-medium overflow-hidden rounded-full border border-white/10">
            <span className="relative z-10">Discover More Experiences</span>
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
