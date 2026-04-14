import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from 'framer-motion';
import {
  ArrowLeft, MapPin, Calendar, Clock, Users, Ticket,
  ChevronRight, ShieldCheck, Mic, Music, Flame, Coffee,
  Sparkles, ChevronDown, ArrowUpRight, Zap
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { EVENTS, type LKPEvent, type EventAct } from '../data';

// ─── Act type config ─────────────────────────────────────────────────────────
const actCfg: Record<EventAct['type'], { icon: any; label: string; dot: string }> = {
  performance: { icon: Music,    label: 'Performance', dot: 'bg-rose-400' },
  ceremony:    { icon: Flame,    label: 'Ceremony',    dot: 'bg-amber-400' },
  social:      { icon: Coffee,   label: 'Social',      dot: 'bg-sky-400' },
  wellness:    { icon: Sparkles, label: 'Wellness',    dot: 'bg-emerald-400' },
};

// ─── Booking Success ──────────────────────────────────────────────────────────
function BookingSuccess({ event }: { event: LKPEvent }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center text-center px-6"
    >
      <div className="max-w-lg">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-10"
        >
          <Ticket size={40} className="text-white/70" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25 mb-5"
        >
          Reservation Confirmed
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl md:text-8xl font-serif italic mb-5 leading-[0.9]"
        >
          Your seat<br />
          <span className="font-sans not-italic font-medium text-white">is held.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-white/35 font-light mb-2 text-lg"
        >
          {event.title} · {event.date}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-white/25 text-sm font-light mb-12 max-w-sm mx-auto leading-relaxed"
        >
          A full briefing arrives within 24 hours. Dress accordingly.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black rounded-full font-display font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
          >
            Back to Catalog <ChevronRight size={14} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Accordion Programme ──────────────────────────────────────────────────────
function Programme({ schedule }: { schedule: EventAct[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-0">
      {schedule.map((act, i) => {
        const cfg = actCfg[act.type];
        const Icon = cfg.icon;
        const isOpen = open === i;

        return (
          <div key={i} className="border-b border-white/5 last:border-b-0">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center gap-6 py-7 text-left group"
            >
              {/* Number */}
              <span className="text-[10px] font-black text-white/20 w-6 shrink-0 font-display">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Dot indicator */}
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot} ${!isOpen ? 'opacity-40' : ''}`} />

              {/* Time + title */}
              <div className="flex-1 flex items-baseline gap-5">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25 shrink-0">{act.time}</span>
                <span className={`text-xl font-display font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                  {act.title}
                </span>
              </div>

              {/* Type badge — only show when closed */}
              {!isOpen && (
                <span className="hidden md:block text-[8px] font-black uppercase tracking-widest text-white/20 shrink-0">
                  {cfg.label}
                </span>
              )}

              {/* Arrow */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 text-white/20 group-hover:text-white/50 transition-colors"
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-[3.25rem] flex items-start gap-5">
                    <div className={`p-3 rounded-2xl shrink-0 ${
                      act.type === 'performance' ? 'bg-rose-500/10' :
                      act.type === 'ceremony'    ? 'bg-amber-500/10' :
                      act.type === 'social'      ? 'bg-sky-500/10' :
                                                   'bg-emerald-500/10'
                    }`}>
                      <Icon size={18} className={
                        act.type === 'performance' ? 'text-rose-300' :
                        act.type === 'ceremony'    ? 'text-amber-300' :
                        act.type === 'social'      ? 'text-sky-300' :
                                                     'text-emerald-300'
                      } />
                    </div>
                    <div>
                      <span className={`text-[9px] font-black uppercase tracking-widest mb-2 block ${
                        act.type === 'performance' ? 'text-rose-400' :
                        act.type === 'ceremony'    ? 'text-amber-400' :
                        act.type === 'social'      ? 'text-sky-400' :
                                                     'text-emerald-400'
                      }`}>{cfg.label}</span>
                      <p className="text-white/50 leading-relaxed text-[15px] font-light max-w-xl">{act.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Centered Bottom Bar ────────────────────────────────────────────────────
function BottomBar({ event, guests, setGuests, onBook, visible }: {
  event: LKPEvent;
  guests: number;
  setGuests: (n: number) => void;
  onBook: () => void;
  visible: boolean;
}) {
  const isUrgent = event.spotsLeft <= 3;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="bottom-bar"
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 140, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 z-40"
        >
          {/* Soft gradient wall so bar floats above content */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

          <div className="relative flex flex-col items-center pb-5 px-4">
            {/* Urgency badge */}
            {isUrgent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 30 }}
                className="mb-2.5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[8px] font-black uppercase tracking-widest backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Only {event.spotsLeft} {event.spotsLeft === 1 ? 'spot' : 'spots'} remaining
              </motion.div>
            )}

            {/* Main pill bar — shared layoutId for FLIP morph with right card */}
            <motion.div
              layoutId="reserve-widget"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ layout: { type: 'spring', stiffness: 280, damping: 28 }, scale: { type: 'spring', stiffness: 320, damping: 30, delay: 0.05 } }}
              className="
                w-full max-w-2xl
                bg-black/90 backdrop-blur-2xl
                border border-white/12
                rounded-[32px]
                pl-7 pr-4 py-3.5
                flex items-center gap-5
                shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_-8px_40px_rgba(0,0,0,0.6)]
              "
            >
              {/* Event identity */}
              <div className="hidden md:block min-w-0 flex-1">
                <p className="text-[7px] font-black uppercase tracking-[0.4em] text-white/20 mb-0.5">{event.location}</p>
                <p className="text-sm font-display font-medium text-white/70 truncate leading-none">{event.title}</p>
              </div>

              <div className="hidden md:block h-8 w-px bg-white/8 shrink-0" />

              {/* Guests */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[7px] font-black uppercase tracking-[0.35em] text-white/20 hidden sm:block">Guests</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all text-sm font-bold select-none"
                  >−</button>
                  <span className="text-lg font-display font-bold w-5 text-center tabular-nums">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(event.spotsLeft, guests + 1))}
                    className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all text-sm font-bold select-none"
                  >+</button>
                </div>
              </div>

              <div className="h-8 w-px bg-white/8 shrink-0" />

              {/* Price */}
              <div className="shrink-0 text-center">
                <p className="text-[7px] font-black uppercase tracking-widest text-white/20">Total</p>
                <p className="text-xl font-display font-bold leading-none">${(event.price * guests).toLocaleString()}</p>
              </div>

              <div className="h-8 w-px bg-white/8 shrink-0" />

              {/* CTA */}
              <motion.button
                onClick={onBook}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="
                  ml-auto shrink-0 flex items-center gap-2.5
                  px-9 py-4 rounded-[22px]
                  bg-white text-black
                  font-display font-black text-[11px] uppercase tracking-widest
                  shadow-[0_0_36px_rgba(255,255,255,0.28)]
                  hover:shadow-[0_0_55px_rgba(255,255,255,0.45)]
                  transition-shadow duration-300
                "
              >
                <Ticket size={15} />
                Reserve Now
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EventDetail() {
  const { id } = useParams();
  const event = EVENTS.find(e => e.id === Number(id));
  const [guests, setGuests] = useState(1);
  const [isBooked, setIsBooked] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgScroll } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(imgScroll, [0, 1], ['-10%', '10%']);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  // Detect when hero section is scrolled past
  useEffect(() => {
    const onScroll = () => setIsPastHero(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-display mb-8">Event Not Found</h2>
          <Link to="/" className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs">
            Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>{isBooked && <BookingSuccess event={event} />}</AnimatePresence>

      <motion.div
        ref={pageRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background pb-28"
      >

        {/* ── 01. SPLIT HEADER ─────────────────────────────────────────────── */}
        <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">

          {/* Left — Typography */}
          <div className="flex flex-col justify-end pb-16 pt-40 px-8 md:px-16 lg:pr-12 relative z-10">

            {/* Back */}
            <Link to="/" className="absolute top-28 left-8 md:left-16 inline-flex items-center gap-3 text-white/30 hover:text-white group transition-all">
              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft size={15} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">All Events</span>
            </Link>

            {/* Mood + LKP badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="px-4 py-1.5 rounded-full border border-white/10 text-[8px] font-black uppercase tracking-[0.35em] text-white/40">
                LKP Curated
              </span>
              <span className="text-white/20">·</span>
              <span className="text-[8px] font-black uppercase tracking-[0.35em] text-white/40 capitalize">
                {event.mood}
              </span>
              {event.spotsLeft <= 3 && (
                <>
                  <span className="text-white/20">·</span>
                  <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-red-400">
                    <Zap size={9} fill="currentColor" />
                    {event.spotsLeft} spots left
                  </span>
                </>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 80, damping: 20 }}
              className="text-6xl md:text-8xl xl:text-[100px] font-serif italic leading-[0.85] text-white/95 mb-8"
            >
              {event.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-xl text-white/45 font-light max-w-lg mb-12 leading-relaxed"
            >
              {event.tagline}
            </motion.p>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6 text-white/40 text-xs"
            >
              {[
                { Icon: MapPin,   val: event.location },
                { Icon: Calendar, val: event.date },
                { Icon: Clock,    val: event.time },
              ].map(({ Icon, val }) => (
                <div key={val} className="flex items-center gap-2">
                  <Icon size={12} className="shrink-0" />
                  <span className="font-medium">{val}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — image */}
          <div ref={imageRef} className="relative overflow-hidden min-h-[60vw] lg:min-h-0">
            <motion.img
              style={{ y: imgY }}
              src={event.heroImage}
              alt={event.title}
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover brightness-60"
            />
            {/* Inner gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Floating venue label */}
            <div className="absolute bottom-10 right-10 text-right">
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/25 mb-1">Venue</p>
              <p className="text-sm font-display font-medium text-white/60 max-w-[220px] leading-tight">{event.venue}</p>
            </div>

            {/* Floating Reserve card — horizontal, right side of hero image */}
            <AnimatePresence mode="popLayout">
              {!isPastHero && (
                <motion.div
                  key="hero-card"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 70 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    x: { type: 'spring', stiffness: 260, damping: 26, delay: 0.8 },
                  }}
                  className="absolute right-0 top-1/2 z-20 hidden lg:block"
                  style={{ y: '-50%' }}
                >
                  {/* Horizontal card — shared layoutId for FLIP morph with bottom bar */}
                  <motion.button
                    layoutId="reserve-widget"
                    onClick={() => setIsBooked(true)}
                    whileHover={{ x: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ layout: { type: 'spring', stiffness: 280, damping: 28 } }}
                    className="
                      flex items-center gap-5
                      pl-7 pr-6 py-5
                      bg-white/20 backdrop-blur-2xl
                      border-l-2 border-t-2 border-b-2 border-white/40
                      rounded-l-[28px]
                      hover:bg-white hover:text-black hover:border-white
                      text-white transition-colors duration-300
                      shadow-[-30px_0_80px_rgba(255,255,255,0.15),0_8px_40px_rgba(0,0,0,0.6)]
                      hover:shadow-[-30px_0_100px_rgba(255,255,255,0.3)]
                      group
                    "
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center group-hover:bg-black/10 group-hover:border-black/20 transition-all shrink-0">
                      <Ticket size={20} className="group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Text block */}
                    <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/50 group-hover:text-black/50 mb-1">Reserve Now</p>
                      <p className="text-2xl font-display font-bold leading-none">${event.price.toLocaleString()}</p>
                      <p className="text-[8px] font-medium text-white/40 group-hover:text-black/40 mt-1">per person</p>
                    </div>

                    {/* Urgency dot */}
                    {event.spotsLeft <= 5 && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        <span className="text-[7px] font-black uppercase text-red-400 leading-none">{event.spotsLeft}</span>
                        <span className="text-[6px] text-red-400/60 uppercase leading-none">left</span>
                      </div>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── 02. STATS BAND ───────────────────────────────────────────────── */}
        <section className="border-y border-white/5 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {[
                { label: 'Date', value: event.date.includes('–') ? event.date : event.date.split(',')[0], sub: event.date.includes(',') ? event.date.split(',')[1]?.trim() : '' },
                { label: 'Duration', value: event.time.split('–')[0]?.trim() || event.time, sub: event.time.includes('–') ? `Until ${event.time.split('–')[1]?.trim()}` : '' },
                { label: 'Capacity', value: `${event.capacity}`, sub: `${event.spotsLeft} spots remaining` },
                { label: 'Investment', value: `$${event.price.toLocaleString()}`, sub: 'per person' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="py-10 px-8 md:px-12"
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/25 mb-3">{stat.label}</p>
                  <p className="text-3xl md:text-5xl font-display font-medium leading-none mb-2">{stat.value}</p>
                  {stat.sub && <p className="text-[11px] text-white/30 font-light">{stat.sub}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03. DESCRIPTION ──────────────────────────────────────────────── */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 mb-12"
              >
                About This Event
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl text-white/55 font-light leading-relaxed font-serif italic"
              >
                {event.description}
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── 04. HIGHLIGHTS ───────────────────────────────────────────────── */}
        <section className="py-24 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-20">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-4">What's Included</p>
                <h2 className="text-5xl md:text-7xl font-serif italic leading-none">
                  What <span className="font-sans not-italic font-medium text-white">Awaits.</span>
                </h2>
              </div>
              <Users size={40} className="text-white/10 hidden md:block" />
            </div>

            <div className="space-y-0">
              {event.highlights.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 120, damping: 20 }}
                  className="flex items-center gap-8 py-7 border-b border-white/5 last:border-b-0 group hover:bg-white/[0.015] -mx-6 px-6 transition-colors rounded-2xl"
                >
                  <span className="text-[10px] font-black text-white/15 font-display w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-px bg-white/5 group-hover:bg-white/10 transition-colors" />
                  <p className="text-xl md:text-2xl font-display font-medium text-white/65 group-hover:text-white transition-colors duration-300 text-right">
                    {h}
                  </p>
                  <ArrowUpRight size={16} className="text-white/15 group-hover:text-white/60 transition-colors shrink-0" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05. PROGRAMME ────────────────────────────────────────────────── */}
        <section className="py-24 border-t border-white/5 bg-[#080808]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-6">The Programme</p>
                  <h2 className="text-5xl md:text-6xl font-serif italic leading-tight mb-8">
                    How the<br />
                    <span className="font-sans not-italic font-medium text-white">night unfolds.</span>
                  </h2>
                  <p className="text-white/35 font-light text-sm leading-relaxed">
                    {event.schedule.length} moments. Each deliberately sequenced.
                    Click any to read more.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-8">
                <Programme schedule={event.schedule} />
              </div>
            </div>
          </div>
        </section>

        {/* ── 06. EDITORIAL IMAGE BREAK ────────────────────────────────────── */}
        <div className="relative h-[80vh] overflow-hidden group">
          <img
            src={event.image}
            alt={event.location}
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[1500ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
          <div className="absolute bottom-16 left-0 right-0">
            <div className="container mx-auto px-6 flex items-end justify-between">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/25 mb-3">Location</p>
                <p className="text-5xl md:text-8xl font-serif italic text-white/85 leading-none">{event.location}</p>
              </div>
              <p className="text-sm text-white/35 font-light max-w-xs text-right hidden md:block leading-relaxed">
                {event.venue}
              </p>
            </div>
          </div>
        </div>

        {/* ── 07. SPEAKERS ─────────────────────────────────────────────────── */}
        {event.speakers.length > 0 && (
          <section className="py-24 border-t border-white/5">
            <div className="container mx-auto px-6">
              <div className="flex items-center gap-8 mb-16">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">Curators & Guides</p>
                  <h2 className="text-5xl font-serif italic leading-none">
                    The <span className="font-sans not-italic font-medium text-white">Voices.</span>
                  </h2>
                </div>
                <div className="flex-1 h-px bg-white/5" />
                <Mic size={32} className="text-white/10 shrink-0" />
              </div>

              {/* Horizontal scroll on mobile, grid on desktop */}
              <div className={`grid gap-6 ${
                event.speakers.length === 1 ? 'grid-cols-1 max-w-md' :
                event.speakers.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl' :
                'grid-cols-1 md:grid-cols-3'
              }`}>
                {event.speakers.map((spk, i) => (
                  <motion.div
                    key={spk.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, type: 'spring', stiffness: 100 }}
                    className="relative p-8 border border-white/5 rounded-[40px] bg-white/[0.015] group hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 overflow-hidden"
                  >
                    {/* Index watermark */}
                    <span className="absolute top-6 right-8 text-[60px] font-display font-black text-white/[0.025] leading-none select-none pointer-events-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="w-14 h-14 rounded-full border border-white/8 bg-white/[0.03] flex items-center justify-center mb-8 group-hover:border-white/20 group-hover:bg-white/[0.06] transition-all">
                      <Mic size={18} className="text-white/30" />
                    </div>
                    <h4 className="text-2xl font-display font-medium mb-2">{spk.name}</h4>
                    <p className="text-sm text-white/45 font-light mb-6 leading-relaxed">{spk.role}</p>
                    <div className="flex items-center gap-2 text-white/20">
                      <MapPin size={11} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{spk.origin}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 08. BENTO DETAILS GRID ───────────────────────────────────────── */}
        <section className="py-24 border-t border-white/5 bg-[#060606]">
          <div className="container mx-auto px-6">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/15 mb-16">Event Details</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Dress Code */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 border border-white/5 rounded-[40px] bg-white/[0.015] flex flex-col"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">Dress Code</p>
                <p className="text-2xl font-display font-medium leading-snug flex-1">{event.dressCode}</p>
              </motion.div>

              {/* Curator's Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-10 border border-white/5 rounded-[40px] bg-white/[0.015] relative overflow-hidden md:col-span-1"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">Curator's Note</p>
                <p className="text-lg font-serif italic text-white/50 leading-relaxed relative z-10">
                  "{event.curatorNote}"
                </p>
                <div className="absolute bottom-4 right-6 text-[100px] font-serif italics text-white/[0.025] leading-none select-none pointer-events-none">
                  "
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-10 border border-white/5 rounded-[40px] bg-white/[0.015]"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-8">What's Included</p>
                <div className="space-y-4">
                  {event.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <ShieldCheck size={14} className="text-white/25 shrink-0 mt-0.5 group-hover:text-white/50 transition-colors" />
                      <p className="text-sm text-white/45 font-light leading-relaxed group-hover:text-white/65 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </motion.div>

      {/* LayoutGroup scopes the layoutId="reserve-widget" FLIP between hero card and bottom bar */}
      <LayoutGroup>
        <BottomBar
          event={event}
          guests={guests}
          setGuests={setGuests}
          onBook={() => setIsBooked(true)}
          visible={isPastHero}
        />
      </LayoutGroup>
    </>
  );
}
