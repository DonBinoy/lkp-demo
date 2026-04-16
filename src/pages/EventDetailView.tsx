import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Ticket } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState, useEffect } from 'react';

export default function EventDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EXPERIENCES.find(e => e.id === Number(id));
  const [isBooked, setIsBooked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("Morning Slot (09:00 AM - 12:00 PM)");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Dynamic Date State
  const today = new Date();
  const currentMonthNum = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInCurrentMonth = new Date(currentYear, currentMonthNum + 1, 0).getDate();
  const startDayOffset = new Date(currentYear, currentMonthNum, 1).getDay();
  const daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  const monthName = today.toLocaleString('default', { month: 'long' });
  const shortMonthName = today.toLocaleString('default', { month: 'short' });

  // Custom Calendar State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<number | null>(today.getDate());
  const [endDate, setEndDate] = useState<number | null>(today.getDate() + 4 > daysInCurrentMonth ? null : today.getDate() + 4);

  const handleDateSelect = (day: number) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (day < startDate) {
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
    // Auto close after 2nd date selected
    if (startDate && !endDate && day >= startDate) {
      setTimeout(() => setIsCalendarOpen(false), 300);
    }
  };

  const slots = [
    "Morning Slot (09:00 AM - 12:00 PM)",
    "Afternoon Slot (01:00 PM - 04:00 PM)",
    "Evening Gala (06:00 PM - 10:00 PM)"
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event || event.type !== 'event') {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-sans uppercase tracking-widest text-xs">Event Unavailable</div>;
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 animate-pulse" />
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-8xl font-serif font-bold text-white mb-6 tracking-tight">Booking Confirmed.</h1>
          <p className="text-white/40 mb-12 font-sans uppercase tracking-[0.2em]">Check your inbox for the ticket confirmation details.</p>
          <button onClick={() => navigate('/')} className="px-16 py-6 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Back to Map</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden selection:bg-white selection:text-black font-sans pb-20">

      {/* Lightbox / Popup */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 md:p-24 cursor-pointer backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white uppercase tracking-widest text-xs font-bold"
              onClick={() => setSelectedPhoto(null)}
            >
              Close ×
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={selectedPhoto}
              alt="Expanded view"
              className="w-full h-full object-contain rounded-xl cursor-default shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative w-full min-h-[100vh] bg-[#0a0a0a] flex items-end">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-40 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Back Button (Fixed or absolute top) */}
        <button onClick={() => navigate('/')} className="absolute top-32 left-6 z-20 flex items-center gap-4 group hidden lg:flex">
          <div className="w-12 h-12 rounded-full border border-white/10 glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowLeft size={20} />
          </div>
        </button>

        <div className="relative z-10 w-full container mx-auto px-6 pt-48 pb-16 flex flex-col lg:flex-row items-end justify-between gap-12">

          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-[55%]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 block">Elevate Global Summit 2024</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
              {event.title}
            </h1>
            <p className="text-sm font-medium tracking-widest uppercase text-white/70 mb-8">An exclusive gathering for industry leaders & visionaries</p>
            <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm font-medium tracking-wide">
              <span>Oct 14-18, 2024</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span>{event.location}</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span>Invitations Only</span>
            </div>
          </motion.div>

          {/* Right Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[420px] lg:mr-12 xl:mr-24 glass p-8 rounded-2xl border border-white/10 backdrop-blur-2xl bg-black/40 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Event Dates</p>
                  <p className="font-medium text-white text-sm">Oct 14-18, 2024</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Location</p>
                  <p className="font-medium text-white text-sm">{event.location}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Registration Closes</p>
                <p className="font-medium text-white text-sm">Sept 1, 2024</p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Reservation Details</p>

                <div className="space-y-4">
                  {/* Guests & Children Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Guests (Adult)</label>
                      <input type="number" min="1" defaultValue="1" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-all placeholder:text-white/20" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Children</label>
                      <input type="number" min="0" defaultValue="0" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-all placeholder:text-white/20" />
                    </div>
                  </div>

                  {/* Date Period Row (Custom Calendar) */}
                  <div className="relative z-40">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Select Date Period</label>
                    <div
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 focus:border-white/40 focus:outline-none transition-all cursor-pointer flex justify-between items-center hover:border-white/20"
                    >
                      <span className="truncate pr-4 text-white">
                        {startDate ? `${shortMonthName} ${startDate}, ${currentYear}` : "Start Date"}
                        {(startDate || endDate) && <span className="text-white/30 mx-2">→</span>}
                        {endDate ? `${shortMonthName} ${endDate}, ${currentYear}` : !startDate ? "" : "End Date"}
                      </span>
                      <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>

                    <AnimatePresence>
                      {isCalendarOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-[#121212] backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-4 z-50"
                        >
                          <div className="flex justify-between items-center mb-4 px-2">
                            <button className="text-white/40 hover:text-white transition-colors">&lt;</button>
                            <span className="text-xs font-bold text-white uppercase tracking-widest">{monthName} {currentYear}</span>
                            <button className="text-white/40 hover:text-white transition-colors">&gt;</button>
                          </div>
                          <div className="grid grid-cols-7 gap-1 mb-2 text-center border-b border-white/10 pb-2">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                              <div key={d} className="text-[10px] font-bold text-white/30 uppercase">{d}</div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {Array.from({ length: startDayOffset }).map((_, i) => (
                              <div key={`empty-${i}`} className="p-2" />
                            ))}
                            {daysInMonth.map(day => {
                              const isStart = day === startDate;
                              const isEnd = day === endDate;
                              const inRange = startDate && endDate && day > startDate && day < endDate;

                              return (
                                <div
                                  key={day}
                                  onClick={() => handleDateSelect(day)}
                                  className={`py-1.5 text-xs rounded-lg cursor-pointer transition-colors flex items-center justify-center ${isStart || isEnd
                                      ? 'bg-white text-black font-bold'
                                      : inRange
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                  {day}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Custom Time Slot Dropdown */}
                  <div className="relative">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Select Time Slot</label>
                    <div className="relative z-30">
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none transition-all cursor-pointer flex justify-between items-center hover:border-white/20"
                      >
                        <span className="truncate pr-4">{selectedSlot}</span>
                        <svg className={`w-4 h-4 fill-current text-white/40 transition-transform duration-300 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-[#121212] backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                          >
                            {slots.map(slot => (
                              <div
                                key={slot}
                                onClick={() => { setSelectedSlot(slot); setIsDropdownOpen(false); }}
                                className="px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                              >
                                {slot}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsBooked(true)}
                className="w-full py-4 mt-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-black/10 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-2">Book Now <Ticket size={16} /></span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About & Speakers */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

          {/* About */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full lg:w-3/5">
            <h2 className="text-2xl font-serif text-white mb-8 uppercase tracking-widest">About the Summit</h2>
            <p className="text-white/60 leading-relaxed font-light text-sm mb-12">
              {event.longDescription || "Join leading speakers for immersive workshops, inspiring presentations, and networking opportunities that shape the future of innovation. Images of past speakers, exciting networked attendees, form more engagement and a connected global community."}
            </p>

            {/* Collage Rectangle */}
            <div className="w-full aspect-[16/10] grid grid-cols-2 grid-rows-2 gap-4">
              <div
                className="col-span-2 row-span-1 rounded-2xl overflow-hidden glass border-white/5 cursor-pointer relative group"
                onClick={() => setSelectedPhoto(event.detailImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200")}
              >
                <img src={event.detailImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="Event detail" />
              </div>
              <div
                className="col-span-1 row-span-1 rounded-2xl overflow-hidden glass border-white/5 cursor-pointer relative group"
                onClick={() => setSelectedPhoto(event.gallery?.[0] || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800")}
              >
                <img src={event.gallery?.[0] || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="Event preview" />
              </div>
              <div
                className="col-span-1 row-span-1 rounded-2xl overflow-hidden glass border-white/5 cursor-pointer relative group"
                onClick={() => setSelectedPhoto(event.gallery?.[1] || "https://images.unsplash.com/photo-1523580494112-071dcb92a110?auto=format&fit=crop&q=80&w=800")}
              >
                <img src={event.gallery?.[1] || "https://images.unsplash.com/photo-1523580494112-071dcb92a110?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="Networking" />
              </div>
            </div>
          </motion.div>          {/* Agenda (Swapped into side column) */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-full lg:w-2/5 lg:pl-8 flex flex-col pt-12 lg:pt-0">
            <h2 className="text-2xl font-serif text-white mb-8 uppercase tracking-widest">Event Agenda</h2>
            <div className="space-y-3 w-full">
              <div className="grid grid-cols-12 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] pb-4 border-b border-white/5 px-2">
                <div className="col-span-12 sm:col-span-5 hidden sm:block">Time</div>
                <div className="col-span-12 sm:col-span-7">Topics</div>
              </div>

              {[
                { time: "12:00 - 2:00 PM", topic: "Opening Ceremonies", active: false },
                { time: "13:00 - 3:30 PM", topic: "Innovation Keynote", active: true },
                { time: "17:00 - 7:10 PM", topic: "Global Travel Panel", active: false },
                { time: "17:50 - 8:50 PM", topic: "Networking Mixer", active: false },
                { time: "20:00 - 10:00 PM", topic: "VIP Gala Dinner", active: false }
              ].map((item, i) => (
                <div key={i} className={`grid grid-cols-1 sm:grid-cols-12 items-start sm:items-center p-5 rounded-xl cursor-pointer transition-all duration-300 gap-2 sm:gap-0 ${item.active ? 'bg-white/15 border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.08)] scale-[1.02]' : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.08]'}`}>
                  <div className={`col-span-12 sm:col-span-5 font-mono text-[11px] uppercase tracking-widest ${item.active ? 'text-white font-bold' : 'text-white/60'}`}>{item.time}</div>
                  <div className={`col-span-12 sm:col-span-7 text-sm ${item.active ? 'text-white font-bold' : 'text-white/80 font-medium'}`}>{item.topic}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hosted By (Single Speaker Swapped into full bottom strip) */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="container mx-auto px-6 py-16">
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-2xl font-serif text-white mb-10 uppercase tracking-widest text-center">Hosted By</h2>
          <div className="flex justify-center">
            <div className="group cursor-pointer max-w-sm w-full text-center">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 border border-white/5 bg-white/5 relative">
                <img src={event.host?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"} alt={event.host?.name || "Dr. Anya Sharma"} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-white/80 transition-colors uppercase tracking-wide">{event.host?.name || "Dr. Anya Sharma"}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-3 font-bold">{event.host?.role || "Global Director"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Venue & Experience */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-serif text-white mb-10 uppercase tracking-widest">Venue & Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden glass border-white/10 group cursor-pointer">
            <img src={"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" alt="Venue 1" />
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden glass border-white/10 group cursor-pointer">
            <img src={"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" alt="Venue 2" />
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden glass border-white/10 group cursor-pointer">
            <img src={"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 relative" alt="Venue 3" />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white">›</div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
