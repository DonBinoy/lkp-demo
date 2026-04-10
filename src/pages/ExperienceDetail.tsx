import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Star, Clock, MapPin, 
  Users, ShieldCheck, Coffee, 
  Calendar, ChevronRight, Info
} from 'lucide-react';
import { useState } from 'react';

const EXPERIENCES = [
  {
    id: 1,
    title: "Starlit Sanctuary Expedition",
    location: "Sahara Desert",
    price: 1250,
    duration: "3 Nights",
    rating: 4.9,
    reviews: 124,
    image: "/assets/lkp_desert_experience.png",
    detailImage: "/assets/lkp_desert_details_interior.png",
    category: "Astronomy",
    description: "Journey into the heart of the Sahara, where the veil between Earth and the cosmos is at its thinnest. Our private expedition offers an unparalleled stargazing experience, led by world-class astronomers in a setting of absolute nomadic luxury.",
    highlights: [
      "Private astronomer-led star sessions",
      "Gourmet dining under the Milky Way",
      "Traditional Berbere hospitality with modern comforts",
      "Camel trekking at sunset through golden dunes"
    ],
    itinerary: [
      { day: "Day 01", title: "Arrival at the Oasis", desc: "Arrive at our secluded luxury camp at dusk. Traditional welcome ceremony followed by a private dinner." },
      { day: "Day 02", title: "Exploring the Golden Dunes", desc: "Morning desert exploration, sunset camel trek, and our first deep-space observation session." },
      { day: "Day 03", title: "The Celestial Masterclass", desc: "In-depth astronomical workshop followed by a signature 'Silent Night' meditation." }
    ]
  }
];

export default function ExperienceDetail() {
  const { id } = useParams();
  const experience = EXPERIENCES.find(e => e.id === Number(id)) || EXPERIENCES[0];
  const [guests, setGuests] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  return (
    <div className="pt-24 pb-32">
      <AnimatePresence mode="wait">
        {!isBooked ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-6"
          >
            {/* Breadcrumbs / Back */}
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Back to Experiences</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left Column: Content */}
              <div className="lg:col-span-8">
                {/* Hero Image */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="relative aspect-[21/9] rounded-[40px] overflow-hidden mb-12"
                >
                  <img src={experience.image} alt={experience.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <span className="px-4 py-1.5 glass rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                      {experience.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-medium">{experience.title}</h1>
                  </div>
                </motion.div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-8 items-center mb-16 p-8 border-y border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Star size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-wider">Rating</p>
                      <p className="font-display font-medium">{experience.rating} ({experience.reviews} reviews)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Clock size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-wider">Duration</p>
                      <p className="font-display font-medium">{experience.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-wider">Location</p>
                      <p className="font-display font-medium">{experience.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <section className="mb-20">
                  <h2 className="text-3xl font-display font-medium mb-8 italic">The Story</h2>
                  <p className="text-xl text-white/60 leading-relaxed mb-10">
                    {experience.description}
                  </p>
                  <img 
                    src={experience.detailImage} 
                    alt="Detail view" 
                    className="w-full rounded-[40px] h-[400px] object-cover"
                  />
                </section>

                {/* Itinerary */}
                <section className="mb-20">
                  <h2 className="text-3xl font-display font-medium mb-12">The Itinerary</h2>
                  <div className="space-y-12">
                    {experience.itinerary.map((item, idx) => (
                      <div key={idx} className="flex gap-8 group">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-display text-sm group-hover:bg-white group-hover:text-black transition-colors">
                            {idx + 1}
                          </div>
                          {idx !== experience.itinerary.length - 1 && (
                            <div className="w-px flex-1 bg-white/10 my-4" />
                          )}
                        </div>
                        <div className="pb-12 border-b border-white/5 w-full">
                          <span className="text-white/40 font-bold tracking-widest text-[10px] uppercase mb-2 block">{item.day}</span>
                          <h3 className="text-2xl font-display font-medium mb-4">{item.title}</h3>
                          <p className="text-white/60 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Booking Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 glass p-8 rounded-[40px] premium-shadow border-white/10">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Total Experience</p>
                      <p className="text-4xl font-display font-medium">${experience.price * guests}</p>
                    </div>
                    <span className="text-sm text-white/40 mb-1">/ {guests} Guest{guests > 1 ? 's' : ''}</span>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="p-4 rounded-3xl border border-white/5 bg-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/40">Guests</label>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5"
                          >
                            -
                          </button>
                          <span className="font-display font-medium">{guests}</span>
                          <button 
                            onClick={() => setGuests(guests + 1)}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-3xl border border-white/5 bg-white/5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/40">Date</label>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Calendar size={16} className="text-white/40" />
                          Sep 14 — Sep 17
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsBooked(true)}
                    className="w-full py-5 bg-white text-black rounded-full font-display font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                  >
                    Reserve Now
                    <ChevronRight size={20} />
                  </button>

                  <p className="text-center text-white/40 text-xs mt-6 flex items-center justify-center gap-2">
                    <Info size={14} />
                    You won't be charged yet
                  </p>

                  <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <ShieldCheck size={18} className="text-white/40" />
                      Free cancellation before Sep 01
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <Users size={18} className="text-white/40" />
                      Limited to 6 guests per journey
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <Coffee size={18} className="text-white/40" />
                      All-inclusive signature dining
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-xl mx-auto text-center py-20 px-6"
          >
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-10">
              <ShieldCheck size={48} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">Reservation Pending</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              An application for your membership was sent. Our curators will review your 
              request and reach out within 24 hours to finalize your journey to the Sahara.
            </p>
            <Link to="/" className="inline-flex px-10 py-4 bg-white text-black rounded-full font-medium">
              Back to Exploration
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
