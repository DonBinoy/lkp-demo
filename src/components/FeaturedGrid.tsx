import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ExperienceCard from './ExperienceCard';
import { EXPERIENCES, EVENTS } from '../data';
import { MapPin, Calendar, Users, ArrowRight, Zap } from 'lucide-react';

// ─── Event Card for the Grid ──────────────────────────────────────────────────
function EventGridCard({ event, index }: { event: (typeof EVENTS)[0]; index: number }) {
  return (
    <Link to={`/event/${event.id}`} className="block relative" style={{ perspective: '1000px' }}>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group cursor-pointer text-left"
      >
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 border-b-2 border-violet-500/20 group-hover:border-violet-400/60 transition-colors duration-500">

          {/* Mood badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] shadow-lg bg-violet-500/20 text-violet-300">
              {event.mood}
            </span>
          </div>

          {/* Urgency badge */}
          {event.spotsLeft <= 3 && (
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/30 text-red-200 text-[8px] font-black uppercase tracking-widest backdrop-blur-md">
              <Zap size={9} fill="currentColor" />
              {event.spotsLeft} left
            </div>
          )}

          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500 z-10" />

          {/* Hover overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white transition-all duration-500 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 z-20">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-violet-300" />
              <span className="text-xs font-medium text-white/80">{event.date.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={13} className="text-violet-300" />
              <span className="text-xs font-medium">{event.capacity} max</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-white/30 mb-2 group-hover:text-violet-300/60 transition-colors">
            <MapPin size={10} />
            <span className="text-[10px] uppercase tracking-widest font-black">{event.location}</span>
          </div>
          <h3 className="text-2xl font-display font-medium mb-2 transition-all duration-500 transform group-hover:translate-x-2 group-hover:text-violet-300">
            {event.title}
          </h3>
          <p className="text-white/40 font-medium group-hover:text-white/70 transition-colors">
            From <span className="text-white text-lg">${event.price.toLocaleString()}</span>{' '}
            <span className="text-xs">/ person</span>
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Main Featured Grid ───────────────────────────────────────────────────────
export default function FeaturedGrid() {
  const [filter, setFilter] = useState('all');

  const isEventTab = filter === 'event';

  // For non-event tabs: filter EXPERIENCES; for event tab show EVENTS
  const filteredExperiences = filter === 'all'
    ? EXPERIENCES
    : isEventTab
      ? []
      : EXPERIENCES.filter(item => item.type === filter);

  const categories = [
    { id: 'all',        label: 'All Selects' },
    { id: 'experience', label: 'Experiences' },
    { id: 'stay',       label: 'Stays' },
    { id: 'food',       label: 'Food' },
    { id: 'event',      label: 'Events' },
    { id: 'place',      label: 'Places' },
  ];

  const isEmpty = filteredExperiences.length === 0 && !isEventTab;

  return (
    <section className="py-32 bg-background overflow-hidden" id="experiences">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl text-left">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-black block mb-4"
            >
              Curated Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
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

          {/* Filter tabs */}
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
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* ── Experience / Stay / Food / Place Grid ── */}
        {filteredExperiences.length > 0 && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[500px]">
            <AnimatePresence mode="popLayout">
              {filteredExperiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50, filter: 'blur(10px)' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: idx * 0.05 }}
                >
                  <ExperienceCard {...exp} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Events Tab: Full Events Grid ── */}
        {isEventTab && (
          <div id="events">
            {/* Events section label */}
            <div className="flex items-center gap-6 mb-12">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                Private Gatherings · {EVENTS.length} Curated Events
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {EVENTS.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: idx * 0.06 }}
                  >
                    <EventGridCard event={event} index={idx} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Link
                to="/event/101"
                className="inline-flex items-center gap-3 px-10 py-5 glass border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all group"
              >
                Browse All Events
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* ── "All" mode: teaser row of events below experiences ── */}
        {filter === 'all' && EVENTS.length > 0 && (
          <div className="mt-24 pt-24 border-t border-white/5" id="events">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <h3 className="text-2xl font-display font-medium">Upcoming Events</h3>
              </div>
              <button
                onClick={() => setFilter('event')}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors group"
              >
                View All {EVENTS.length}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Show first 3 events as a teaser */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {EVENTS.slice(0, 3).map((event, idx) => (
                <EventGridCard key={event.id} event={event} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {isEmpty && (
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
