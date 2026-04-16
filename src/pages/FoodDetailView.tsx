import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Utensils, Award, GlassWater, Leaf, MapPin, ChevronDown, Users, Calendar } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { useState } from 'react';
import ImageGallery from '../components/ImageGallery';
import HostCard from '../components/HostCard';

export default function FoodDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const food = EXPERIENCES.find(e => e.id === Number(id));
  const [isBooked, setIsBooked] = useState(false);

  // Reservation form state
  const today = new Date();
  const [guests, setGuests] = useState(2);
  const [children, setChildren] = useState(0);
  const [reservationDate, setReservationDate] = useState<string>(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
  const [selectedSlot, setSelectedSlot] = useState('Evening (7:00 PM - 10:00 PM)');
  const [selectedTable, setSelectedTable] = useState('Window Seat');
  const [isSlotOpen, setIsSlotOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);

  const timeSlots = ['Lunch (12:00 PM - 3:00 PM)', 'Afternoon (3:00 PM - 6:00 PM)', 'Evening (7:00 PM - 10:00 PM)'];
  const tableTypes = ['Window Seat', 'Chef\'s Table', 'Private Booth', 'Garden Terrace', 'Bar Counter'];

  const signatureDishes = [
    { img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=600", title: "Truffle Pasta", desc: "Hand-rolled pasta with shaved Périgord truffle and aged parmesan." },
    { img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=600", title: "Berry Smoothie", desc: "Wild-picked berries blended with organic coconut milk and gold leaf." },
    { img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600", title: "Avocado Toast", desc: "Stone-baked sourdough with heirloom avocado and poached egg." }
  ];
  const [selectedDish, setSelectedDish] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const menuDetails = {
    mains: [
      { name: "Périgord Truffle Pasta", price: "$45", desc: "Hand-rolled tagliatelle, aged butter." },
      { name: "Miso Glazed Black Cod", price: "$52", desc: "Baby bok choy, ginger dashi." }
    ],
    desserts: [
      { name: "Dark Chocolate Fondant", price: "$18", desc: "Salted caramel, hazelnut gelato." }
    ]
  };

  if (!food || food.type !== 'food') {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/20 font-sans uppercase tracking-widest text-xs">Food signal lost</div>;
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-center p-6 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 animate-pulse" />
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-16 rounded-[40px] shadow-2xl">
          <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-10">
            <Utensils size={40} />
          </div>
          <h1 className="text-6xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">Reservation<br />Confirmed.</h1>
          <div className="space-y-4 mb-12">
            <p className="text-white/40 font-sans uppercase tracking-[0.2em] text-xs">Table for {guests} {guests > 1 ? 'Guests' : 'Guest'} at {food.title}</p>
            <p className="text-white/40 font-sans uppercase tracking-[0.2em] text-xs pb-4 border-b border-white/5">{reservationDate} • {selectedSlot}</p>
            <p className="text-white/80 font-sans text-sm">A confirmation has been sent to your registered email. We look forward to hosting you for an unforgettable culinary journey.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/')} className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">Back to Home</button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Download Invite</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#000] min-h-screen text-white selection:bg-white selection:text-black font-sans pb-20 relative">

      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[150px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[200px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 w-full lg:w-[95%]">

        {/* Top Nav */}
        <div className="pt-32 pb-8">
          <div className="flex justify-between items-center">
            <button onClick={() => navigate('/')} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft size={20} />
              </div>
            </button>
            <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.4em] text-white/40">
              <span className="flex items-center gap-2"><Award size={14} /> Michelin Select</span>
              <span className="hidden md:flex items-center gap-2"><Leaf size={14} /> Organic Only</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative aspect-[21/9] md:aspect-[3/1] w-full rounded-3xl overflow-hidden glass border border-white/10 group">
            <img src={food.detailImage || food.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/60 mb-4">{food.title} & Dining</span>
              <h1 className="text-4xl md:text-7xl font-serif text-white">{food.title}</h1>
            </div>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column */}
          <div className="lg:col-span-8 space-y-16">

            {/* About & Signature Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              <div className="md:col-span-12 xl:col-span-5 flex flex-col">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">About The Culinary Arts</h3>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 border border-white/10 bg-white/[0.02]">
                  <img src={food.host?.avatar || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" alt="Chef/About" />
                </div>
                <p className="text-xs md:text-sm text-white/70 leading-loose text-justify uppercase tracking-wide font-medium">
                  {food.longDescription || food.description} Immersive workshops, redefining the tasting menu and breaking boundaries in molecular dining. Guests are invited to participate in the storytelling.
                </p>
              </div>

              <div className="md:col-span-12 xl:col-span-7 flex flex-col">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">Signature Dishes</h3>
                  <button onClick={() => setShowMenu(true)} className="text-[10px] uppercase tracking-widest text-black bg-white/90 hover:bg-white px-6 py-3 rounded-full hover:scale-105 transition-all font-black">
                    View Menu
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {signatureDishes.map((dish, i) => (
                    <div key={i} onClick={() => setSelectedDish(i)} className={`flex flex-col group cursor-pointer justify-between transition-all duration-300 ${selectedDish === i ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}>
                      <div className={`aspect-[4/5] rounded-3xl overflow-hidden mb-4 border bg-white/[0.02] p-4 flex items-center justify-center relative transition-all duration-300 ${selectedDish === i ? 'border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-white/5'}`}>
                        <img src={dish.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-full border-2 border-black/50 shadow-2xl" />
                        {selectedDish === i && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          </div>
                        )}
                      </div>
                      <h4 className={`text-xs uppercase font-black text-center transition-colors ${selectedDish === i ? 'text-white' : 'text-white/50'}`}>{dish.title}</h4>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {signatureDishes.map((dish, i) => (
                    <button key={i} onClick={() => setSelectedDish(i)} className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${selectedDish === i ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent text-white/50 border-white/20 hover:border-white/40 hover:text-white'}`}>
                      {dish.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="border-t border-white/10 pt-10 mt-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">Location & Access</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="sm:col-span-1 aspect-video rounded-2xl overflow-hidden glass border border-white/10 hover:border-white/20 transition-all flex items-center justify-center bg-white/[0.02] cursor-pointer group relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
                  <MapPin size={24} className="text-white/50 relative z-10 group-hover:text-white group-hover:scale-110 transition-all duration-300 animate-bounce" />
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <p className="text-[11px] font-black text-white/40 uppercase tracking-widest">Address</p>
                  <p className="text-base font-black text-white">{food.location}</p>
                  <p className="text-xs text-white/50 leading-relaxed">123 Culinary St. Floor 12, Scenic Views</p>
                  <p className="text-[11px] text-white/70 font-black mt-1">Parking Available: Yes</p>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <div>
                    <p className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-2">Opening Hours</p>
                    <p className="text-base font-black text-white">Mon–Sun</p>
                    <p className="text-xs text-white/60">9:00 AM – 10:00 PM</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-2">Service</p>
                    <p className="text-xs text-white/80">Dine-in · Takeaway</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dietary & Contact */}
            <div className="border-t border-white/10 pt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">Dietary & Info</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-6">
                    {[
                      { icon: <Leaf size={16} />, label: 'Vegan' },
                      { icon: <span className="text-sm font-black">GF</span>, label: 'Gluten-Free' },
                      { icon: <span className="text-sm font-black">O</span>, label: 'Organic' },
                      { icon: <span className="text-sm font-black">NS</span>, label: 'Non-Spicy' },
                      { icon: <Users size={14} />, label: 'Family' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-3">
                        <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer">
                          {item.icon}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-black text-white/50">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:pl-12 md:border-l md:border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">Contact</h3>
                  <div className="space-y-6">
                    {[
                      { icon: '✆', val: '+1 234 567 8900' },
                      { icon: '✉', val: 'dining@lkp.com' },
                      { icon: '@', val: '@lkp_dining' },
                    ].map((c, i) => (
                      <p key={i} className="flex items-center gap-4 text-sm text-white/80 hover:text-white transition-colors cursor-pointer">
                        <span className="text-white/30 w-5 text-center text-lg">{c.icon}</span>
                        {c.val}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 space-y-10 lg:pl-12 lg:border-l lg:border-white/10 mt-16 lg:mt-0">

            {/* Selected Dish Card */}
            <div className="border-b border-white/10 pb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Selected Dish</h3>
              <AnimatePresence mode="wait">
                <motion.div key={selectedDish} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="flex gap-4 items-start">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                    <img src={signatureDishes[selectedDish].img} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase tracking-wide mb-2">{signatureDishes[selectedDish].title}</p>
                    <p className="text-xs text-white/60 leading-relaxed">{signatureDishes[selectedDish].desc}</p>
                    <div className="flex gap-2 mt-4">
                      {signatureDishes.map((_, i) => (
                        <button key={i} onClick={() => setSelectedDish(i)} className={`w-2 h-2 rounded-full transition-all ${selectedDish === i ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/60'}`} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-10">
              {/* Menu Overview */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8">Menu Overview</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-black text-white mb-1">Signature</p>
                    <p className="text-xs text-white/60 leading-relaxed">Handcrafted main courses.</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-white mb-1">Previous</p>
                    <p className="text-xs text-white/60 leading-relaxed">Seasonal favorites, archives.</p>
                  </div>
                  <button className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white underline mt-2 bg-transparent text-left block">View More</button>
                </div>
              </div>
            </div>

            {/* Reservation Form */}
            <div id="reservation-form">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-8">Reserve a Table</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block flex items-center gap-1"><Users size={10} className="mr-1" />Guests</label>
                    <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-3">
                      <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-6 h-6 rounded-full border border-white/20 text-white/60 hover:bg-white/10 hover:text-white flex items-center justify-center text-sm transition-all">−</button>
                      <span className="flex-1 text-center text-sm font-black text-white">{guests}</span>
                      <button onClick={() => setGuests(g => g + 1)} className="w-6 h-6 rounded-full border border-white/20 text-white/60 hover:bg-white/10 hover:text-white flex items-center justify-center text-sm transition-all">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Children</label>
                    <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-3">
                      <button onClick={() => setChildren(c => Math.max(0, c - 1))} className="w-6 h-6 rounded-full border border-white/20 text-white/60 hover:bg-white/10 hover:text-white flex items-center justify-center text-sm transition-all">−</button>
                      <span className="flex-1 text-center text-sm font-black text-white">{children}</span>
                      <button onClick={() => setChildren(c => c + 1)} className="w-6 h-6 rounded-full border border-white/20 text-white/60 hover:bg-white/10 hover:text-white flex items-center justify-center text-sm transition-all">+</button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block flex items-center gap-1"><Calendar size={10} className="mr-1" />Date</label>
                  <input type="date" value={reservationDate} onChange={e => setReservationDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none [color-scheme:dark] font-black" />
                </div>

                <div className="relative z-30">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Time Slot</label>
                  <div onClick={() => { setIsSlotOpen(!isSlotOpen); setIsTableOpen(false); }} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white cursor-pointer flex justify-between items-center hover:border-white/20">
                    <span className="truncate pr-3 text-sm font-black">{selectedSlot}</span>
                    <ChevronDown size={14} className={`text-white/40 transition-transform ${isSlotOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {isSlotOpen && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                        {timeSlots.map(slot => (
                          <div key={slot} onClick={() => { setSelectedSlot(slot); setIsSlotOpen(false); }} className={`px-4 py-3 text-xs cursor-pointer transition-colors ${selectedSlot === slot ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>{slot}</div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative z-20">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Table Preference</label>
                  <div onClick={() => { setIsTableOpen(!isTableOpen); setIsSlotOpen(false); }} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white cursor-pointer flex justify-between items-center hover:border-white/20">
                    <span className="truncate pr-3 text-sm font-black">{selectedTable}</span>
                    <ChevronDown size={14} className={`text-white/40 transition-transform ${isTableOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {isTableOpen && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                          <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center relative group">
                            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000" alt="Floor Plan" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                            <span className="relative z-10 text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Floor Plan Preview</span>
                          </div>
                        </div>
                        {tableTypes.map(t => (
                          <div key={t} onClick={() => { setSelectedTable(t); setIsTableOpen(false); }} className={`px-4 py-3 text-xs cursor-pointer transition-colors ${selectedTable === t ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>{t}</div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button onClick={() => setIsBooked(true)} className="w-full py-5 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-all">
                  Confirm Reservation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {food.gallery && food.gallery.length > 0 && (
          <div className="mt-20 pt-16 border-t border-white/10">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-serif text-white uppercase tracking-widest">Visual Atmosphere</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{food.gallery.length} Photos</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {food.gallery.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="aspect-square rounded-2xl overflow-hidden border border-white/10 group cursor-pointer bg-white/[0.02]">
                  <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={`Gallery ${i}`} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Menu Modal */}
      <AnimatePresence>
        {showMenu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            <div className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-3xl flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-12 border-b border-white/5">
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-2">The Alchemist\'s Table & Dining</p>
                  <h2 className="text-4xl font-serif text-white uppercase tracking-widest">{food.title} Menu</h2>
                </div>
                <button onClick={() => setShowMenu(false)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-12">
                    <section>
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8 pb-2 border-b border-white/5">Mains</h4>
                      <div className="space-y-8">
                        {menuDetails.mains.map((item, i) => (
                          <div key={i} className="group">
                            <div className="flex justify-between items-baseline mb-2">
                              <h5 className="text-base font-black text-white uppercase tracking-wider">{item.name}</h5>
                              <span className="text-sm font-medium text-white/30">{item.price}</span>
                            </div>
                            <p className="text-xs text-white/60 italic font-serif leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                  <div className="space-y-12">
                    <section>
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8 pb-2 border-b border-white/5">Desserts</h4>
                      <div className="space-y-8">
                        {menuDetails.desserts.map((item, i) => (
                          <div key={i} className="group">
                            <div className="flex justify-between items-baseline mb-2">
                              <h5 className="text-base font-black text-white uppercase tracking-wider">{item.name}</h5>
                              <span className="text-sm font-medium text-white/30">{item.price}</span>
                            </div>
                            <p className="text-xs text-white/60 italic font-serif leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5">
                      <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-4 font-black">Note on Sourcing</p>
                      <p className="text-sm text-white/70 leading-loose italic font-serif">"Our ingredients are sourced daily from local organic farms. Each component is selected for its peak seasonality."</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-12 border-t border-white/5 bg-white/[0.02] flex justify-center">
                <button onClick={() => setShowMenu(false)} className="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-105 transition-all">Book Your Table</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
