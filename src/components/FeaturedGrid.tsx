import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { EXPERIENCES } from '../data';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export default function FeaturedGrid() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState<SortOption>('featured');

  const filteredAndSortedItems = useMemo(() => {
    let items = filter === 'all' 
      ? [...EXPERIENCES] 
      : EXPERIENCES.filter(item => item.type === filter);

    switch(sort) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'rating':
        return items.sort((a, b) => b.rating - a.rating);
      default:
        return items.sort((a, b) => a.id - b.id); // Featured/Original order
    }
  }, [filter, sort]);

  const categories = [
    { id: 'all', label: 'All Selects' },
    { id: 'experience', label: 'Experiences' },
    { id: 'stay', label: 'Stays' },
    { id: 'event', label: 'Events' },
    { id: 'food', label: 'Food' },
    { id: 'place', label: 'Places' }
  ];

  const sortOptions: {id: SortOption, label: string}[] = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'rating', label: 'Highest Rated' },
  ];

  return (
    <section className="py-20 bg-[#050505] overflow-hidden" id="catalog">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-16 gap-8 relative z-10 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8">
            <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-none">
              The <br/><span className="font-display font-black not-italic text-transparent [-webkit-text-stroke:2px_white]">Catalog.</span>
            </h2>
            <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-stay animate-pulse mr-2" />
              {filteredAndSortedItems.length} Plans Available
            </div>
          </div>

          {/* E-commerce Filter Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-6 bg-white/[0.02] p-4 rounded-3xl border border-white/5 mt-8">
            
            <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <SlidersHorizontal size={14} className="text-white/40 shrink-0" />
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`relative px-6 py-2 rounded-full border transition-colors text-[10px] uppercase font-bold tracking-widest shrink-0 ${
                      filter === cat.id 
                      ? 'border-transparent text-black' 
                      : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {filter === cat.id && (
                      <motion.div
                        layoutId="activeCatalogFilter"
                        className="absolute inset-0 bg-white rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <ArrowDownUp size={14} className="text-white/40 shrink-0" />
              <div className="flex gap-2">
                {sortOptions.map((option) => (
                  <button 
                    key={option.id}
                    onClick={() => setSort(option.id)}
                    className={`px-4 py-2 rounded-full border text-[10px] uppercase font-bold tracking-widest shrink-0 transition-all ${
                      sort === option.id 
                      ? 'border-white/40 text-white bg-white/10' 
                      : 'border-transparent text-white/30 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[500px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedItems.map((exp, idx) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -50, filter: "blur(10px)" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: idx * 0.05 
                }}
                className="h-[500px]"
              >
                <ExperienceCard {...exp} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredAndSortedItems.length === 0 && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="py-32 text-center flex flex-col items-center"
           >
             <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 text-white/20">
                <SlidersHorizontal />
             </div>
             <p className="text-white/40 font-display italic text-2xl">No plans match your current criteria.</p>
             <button onClick={() => {setFilter('all'); setSort('featured')}} className="mt-8 text-xs font-black uppercase tracking-widest text-white border-b border-white pb-1">Reset Filters</button>
           </motion.div>
        )}
      </div>
    </section>
  );
}
