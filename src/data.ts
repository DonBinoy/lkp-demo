export type CategoryType = 'experience' | 'event' | 'food' | 'stay' | 'place';

export interface Experience {
  id: number;
  title: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  detailImage: string;
  category: string;
  type: CategoryType;
  description: string;
  highlights: string[];
  itinerary?: { day: string; title: string; desc: string } [];
  
  // Category specific optional fields
  amenities?: string[]; // For stays
  menu?: { name: string; desc: string; price: string }[]; // For food
  schedule?: { time: string; activity: string }[]; // For events
  attractions?: string[]; // For places
  curatorNotes?: string;
}

export const EXPERIENCES: Experience[] = [
  // --- EXPERIENCES ---
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
    type: 'experience',
    description: "Journey into the heart of the Sahara, where the veil between Earth and the cosmos is at its thinnest.",
    highlights: ["Private astronomer sessions", "Gourmet desert dining", "Nomadic luxury"],
    itinerary: [
      { day: "Day 01", title: "Dune Arrival", desc: "Private transition via 4x4 to the deep camp." },
      { day: "Day 02", title: "The Masterclass", desc: "Astronomical guiding under zero light pollution." },
      { day: "Day 03", title: "Oasis Sunrise", desc: "Final meditation and return to the grid." }
    ]
  },
  {
    id: 8,
    title: "Subterranean Wine Ritual",
    location: "Tuscany, Italy",
    price: 850,
    duration: "2 Days",
    rating: 5.0,
    reviews: 45,
    image: "/assets/lkp_desert_details_interior.png",
    detailImage: "/assets/lkp_stay_lodge.png",
    category: "Enology",
    type: 'experience',
    description: "Descend into ancient Etruscan cellars for a forgotten wine-making ceremony.",
    highlights: ["Ancient cellar access", "Vertical tasting", "Chef's table"],
    itinerary: [
      { day: "Day 01", title: "The Descent", desc: "Exploring the 2000-year-old tunnels." },
      { day: "Day 02", title: "The Press", desc: "Participating in traditional harvest methods." }
    ]
  },
  {
    id: 13,
    title: "Antarctic Silence",
    location: "Ross Ice Shelf",
    price: 12000,
    duration: "7 Days",
    rating: 4.8,
    reviews: 12,
    image: "/assets/lkp_arctic_experience.png",
    detailImage: "/assets/lkp_snow_experience.png",
    category: "Survival",
    type: 'experience',
    description: "The ultimate test of presence in the most extreme silence on Earth.",
    highlights: ["Zero communication", "Glacial camping", "Scientific briefing"],
    itinerary: [
      { day: "Day 01", title: "The Drop", desc: "Landing on the white desert." }
    ]
  },

  // --- STAYS ---
  {
    id: 2,
    title: "The Glass Forest Lodge",
    location: "Andes, Peru",
    price: 3200,
    duration: "2 Nights",
    rating: 4.9,
    reviews: 210,
    image: "/assets/lkp_stay_lodge.png",
    detailImage: "/assets/lkp_arctic_experience.png",
    category: "Resort",
    type: 'stay',
    description: "An architectural masterpiece nestled in the cloud forests of Peru.",
    highlights: ["Zero-carbon design", "Thermal springs", "Panoramic views"],
    amenities: ["Private Spa", "Helipad Access", "Butler Service", "Gourmet Kitchen"]
  },
  {
    id: 9,
    title: "Floating Arctic Capsule",
    location: "Svalbard, Norway",
    price: 4500,
    duration: "3 Nights",
    rating: 5.0,
    reviews: 32,
    image: "/assets/lkp_snow_experience.png",
    detailImage: "/assets/lkp_arctic_experience.png",
    category: "Eco-Luxe",
    type: 'stay',
    description: "Sleep on the edge of the world in a floating glass sphere.",
    highlights: ["Northern Lights view", "Kayak expeditions", "Sami cuisine"],
    amenities: ["360 Degree View", "Thermal Insulation", "Excursion Boat", "Star Maps"]
  },
  {
    id: 14,
    title: "The Desert Monolith",
    location: "AlUla, Saudi Arabia",
    price: 5200,
    duration: "2 Nights",
    rating: 4.9,
    reviews: 67,
    image: "/assets/lkp_hero_cinematic.png",
    detailImage: "/assets/lkp_desert_details_interior.png",
    category: "Design",
    type: 'stay',
    description: "Mirrored architecture that disappears into the sandstone canyons.",
    highlights: ["Optical illusion design", "Canyon dining", "Private pool"],
    amenities: ["Mirror Facade", "Outdoor Cinema", "Archaeology Tour", "Private Stargazing"]
  },

  // --- EVENTS ---
  {
    id: 3,
    title: "Lunar Equinox Ritual",
    location: "Bali, Indonesia",
    price: 450,
    duration: "6 Hours",
    rating: 5.0,
    reviews: 88,
    image: "/assets/lkp_jungle_experience.png",
    detailImage: "/assets/lkp_hero_cinematic.png",
    category: "Ritual",
    type: 'event',
    description: "An exclusive gathering celebrating the lunar cycle with traditional meditation.",
    highlights: ["Gamelan performance", "Temple access", "Purification ceremony"],
    schedule: [
      { time: "17:00", activity: "Temple Welcome" },
      { time: "18:30", activity: "Equinox Performance" },
      { time: "20:00", activity: "Earth Feast" }
    ]
  },
  {
    id: 10,
    title: "Venetian Masquerade Noir",
    location: "Venice, Italy",
    price: 2800,
    duration: "1 Night",
    rating: 4.9,
    reviews: 142,
    image: "/assets/lkp_hero_cinematic.png",
    detailImage: "/assets/lkp_stay_lodge.png",
    category: "Social",
    type: 'event',
    description: "A dark, candlelit ball in a private 15th-century Palazzo.",
    highlights: ["Custom Mask fitting", "Gondola arrival", "Orchestra performance"],
    schedule: [
      { time: "20:00", activity: "Gondola Procession" },
      { time: "21:30", activity: "The Grand Reveal" }
    ]
  },

  // --- FOOD ---
  {
    id: 4,
    title: "The Alchemist's Table",
    location: "Provence, France",
    price: 380,
    duration: "3 Hours",
    rating: 4.9,
    reviews: 156,
    image: "/assets/lkp_desert_details_interior.png",
    detailImage: "/assets/lkp_stay_lodge.png",
    category: "Fine Dining",
    type: 'food',
    description: "A multi-sensory culinary journey led by Michelin-starred chefs.",
    highlights: ["12-course menu", "Wine cellar tour", "Chef's immersion"],
    menu: [
      { name: "Earth & Ash", desc: "Smoked root vegetables with truffle soil", price: "Included" },
      { name: "Mistral Sea", desc: "Wild-caught bass with lavender infusion", price: "Included" }
    ]
  },
  {
    id: 11,
    title: "Zen Foraging Masterclass",
    location: "Nara, Japan",
    price: 220,
    duration: "5 Hours",
    rating: 4.8,
    reviews: 94,
    image: "/assets/lkp_snow_experience.png",
    detailImage: "/assets/lkp_jungle_experience.png",
    category: "Education",
    type: 'food',
    description: "Learn the art of mountain foraging with local monks.",
    highlights: ["Mountain hike", "Seasonal cooking", "Temple lunch"],
    menu: [
      { name: "Shojin Ryori", desc: "Traditional Buddhist vegan cuisine", price: "Included" }
    ]
  },

  // --- PLACES ---
  {
    id: 5,
    title: "The Whispering Peaks",
    location: "Bhutan",
    price: 0,
    duration: "Exploring",
    rating: 4.8,
    reviews: 320,
    image: "/assets/lkp_arctic_experience.png",
    detailImage: "/assets/lkp_jungle_experience.png",
    category: "Geography",
    type: 'place',
    description: "A destination guide to one of the most secluded mountain ranges on earth.",
    highlights: ["Spiritual history", "Untouched biodiversity", "Carbon-negative nation"],
    attractions: ["Tiger's Nest Monastery", "Punakha Dzong", "Phobjikha Valley"],
    curatorNotes: "Bhutan demands patience. The altitude requires acclimatization."
  },
  {
    id: 6,
    title: "Kyoto Autumn Archive",
    location: "Kyoto, Japan",
    price: 0,
    duration: "Exploring",
    rating: 4.9,
    reviews: 540,
    image: "/assets/lkp_snow_experience.png",
    detailImage: "/assets/lkp_arctic_experience.png",
    category: "Heritage",
    type: 'place',
    description: "Dive into the hidden, less-trafficked temples of the ancient capital.",
    highlights: ["Hidden Zen Gardens", "Matcha Ceremonies", "Ancient Architecture"],
    attractions: ["Otagi Nenbutsu-ji", "Gio-ji Moss Temple"],
    curatorNotes: "Avoid Arashiyama at midday. Wake up at 5 AM."
  },
  {
    id: 7,
    title: "The Volcanic Rift",
    location: "Reykjavík, Iceland",
    price: 0,
    duration: "Exploring",
    rating: 5.0,
    reviews: 890,
    image: "/assets/lkp_arctic_experience.png",
    detailImage: "/assets/lkp_hero_cinematic.png",
    category: "Geology",
    type: 'place',
    description: "Journey along the tectonic boundary where the North American and Eurasian plates tear apart.",
    highlights: ["Active Fissures", "Glacial Lagoons", "Black Sand Beaches"],
    attractions: ["Fagradalsfjall Volcano", "Jökulsárlón Lagoon"],
    curatorNotes: "The weather changes every 15 minutes. Layered clothing is non-negotiable."
  }
];
