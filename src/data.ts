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
  gallery?: string[];
  category: string;
  type: CategoryType;
  description: string;
  longDescription?: string;
  highlights: string[];
  itinerary?: { day: string; title: string; desc: string } [];
  
  // Category specific optional fields
  amenities?: string[]; // For stays
  menu?: { name: string; desc: string; price: string }[]; // For food
  schedule?: { time: string; activity: string }[]; // For events
  attractions?: string[]; // For places
  curatorNotes?: string;
  
  // New Rich Content fields
  host?: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
  locationDetails?: {
    address: string;
    coordinates?: { lat: number; lng: number };
    nearbyPoints?: string[];
  };
  specs?: { label: string; value: string }[];
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
    gallery: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1470252649358-96f3c8024117?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Astronomy",
    type: 'experience',
    description: "Journey into the heart of the Sahara, where the veil between Earth and the cosmos is at its thinnest.",
    longDescription: "Under the guidance of master astronomers, you will navigate the celestial map of the ancient world. This expedition takes you 400km away from any light pollution, where the Milky Way casts a shadow on the dunes. We provide state-of-the-art observatory equipment and nomadic luxury that respects the silence of the desert.",
    highlights: ["Private astronomer sessions", "Gourmet desert dining", "Nomadic luxury", "Zero light pollution"],
    itinerary: [
      { day: "Day 01", title: "Dune Arrival", desc: "Private transition via 4x4 to the deep camp situated in the Grand Erg Oriental." },
      { day: "Day 02", title: "The Masterclass", desc: "Advanced astronomical guiding and deep-sky observation sessions." },
      { day: "Day 03", title: "Oasis Sunrise", desc: "Final meditation at a hidden prehistoric water source and return to the grid." }
    ],
    host: {
      name: "Dr. Elena Vance",
      role: "Lead Astrophysicist",
      bio: "Former NASA contractor specializing in deep-sky mapping and nomadic navigation.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
    },
    specs: [
      { label: "Altitude", value: "340m" },
      { label: "Equipment", value: "Celestron CPC 1100" },
      { label: "Intensity", value: "Moderate" }
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
    gallery: [
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Enology",
    type: 'experience',
    description: "Descend into ancient Etruscan cellars for a forgotten wine-making ceremony.",
    longDescription: "The 'Ritual of the Earth' is a two-day immersion into the biological secrets of Tuscan viniculture. You will witness the fermentation of ancestral grapes in terracotta amphorae, exactly as it was done 2,000 years ago.",
    highlights: ["Ancient cellar access", "Vertical tasting", "Chef's table", "Harvest participation"],
    itinerary: [
      { day: "Day 01", title: "The Descent", desc: "Exploring the 2000-year-old tunnels and the private library of the estate." },
      { day: "Day 02", title: "The Press", desc: "Participating in traditional harvest methods and hand-bottling." }
    ],
    host: {
      name: "Mateo Ricci",
      role: "Master Vintner",
      bio: "The 14th generation of the Ricci lineage, preserving Etruscan methods.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    }
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
    gallery: [
      "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1516706562779-ad3ff4907a1c?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Survival",
    type: 'experience',
    description: "The ultimate test of presence in the most extreme silence on Earth.",
    longDescription: "Antarctic Silence is not for the tourist, but for the explorer of the self. Located at the geographic zero, we facilitate a week-long sensory deprivation in nature, punctuated only by the crack of shifting glaciers.",
    highlights: ["Zero communication", "Glacial camping", "Scientific briefing", "Meditation on ice"],
    itinerary: [
      { day: "Day 01", title: "The Drop", desc: "Landing on the white desert via Il-76 military transport." },
      { day: "Day 04", title: "Internal Horizon", desc: "Midway point of the silent retreat with mountain guides." }
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
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Resort",
    type: 'stay',
    description: "An architectural masterpiece nestled in the cloud forests of Peru.",
    longDescription: "Suspended above the Andean canopy, the Glass Forest Lodge is where brutalist design meets raw nature. Our structures are built with smart-glass technology that can turn fully opaque for privacy or transparent to merge with the forest.",
    highlights: ["Zero-carbon design", "Thermal springs", "Panoramic views", "Vertical garden"],
    amenities: ["Private Spa", "Helipad Access", "Butler Service", "Gourmet Kitchen", "Library", "Smart Glass Controls"],
    locationDetails: {
      address: "Sacred Valley Overlook, Kilometer 82, Cusco Region",
      coordinates: { lat: -13.25, lng: -72.26 }
    },
    specs: [
      { label: "Structure", value: "Reinforced Composite" },
      { label: "Energy", value: "Solar/Thermal" }
    ]
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
    gallery: [
      "https://images.unsplash.com/photo-1473081556163-2a1713ff977d?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1494281258612-4aa58d36482e?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1516706562779-ad3ff4907a1c?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Eco-Luxe",
    type: 'stay',
    description: "Sleep on the edge of the world in a floating glass sphere.",
    highlights: ["Northern Lights view", "Kayak expeditions", "Sami cuisine", "Zero foot print"],
    amenities: ["360 Degree View", "Thermal Insulation", "Excursion Boat", "Star Maps", "Satellite Link"]
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
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Design",
    type: 'stay',
    description: "Mirrored architecture that disappears into the sandstone canyons.",
    highlights: ["Optical illusion design", "Canyon dining", "Private pool", "Archaeology Tour"],
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
    gallery: [
      "https://images.unsplash.com/photo-1518005020251-58d7c04192b4?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Ritual",
    type: 'event',
    description: "An exclusive gathering celebrating the lunar cycle with traditional meditation.",
    longDescription: "When the sun and moon align at the zenith, we gather at the forgotten Tirta Empul pool. This event is limited to 12 participants and conducted in complete silence until the feast begins.",
    highlights: ["Gamelan performance", "Temple access", "Purification ceremony", "Sunset feast"],
    schedule: [
      { time: "17:00", activity: "Temple Welcome & Vestment Blessing" },
      { time: "18:30", activity: "Equinox Sound Performance" },
      { time: "20:00", activity: "The Earth Feast by candlelight" }
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
    gallery: [
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Social",
    type: 'event',
    description: "A dark, candlelit ball in a private 15th-century Palazzo.",
    highlights: ["Custom Mask fitting", "Gondola arrival", "Orchestra performance"],
    schedule: [
      { time: "20:00", activity: "Secret Gondola Procession" },
      { time: "21:30", activity: "The Midnight Reveal" }
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
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1476502771565-df0e10418a03?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Fine Dining",
    type: 'food',
    description: "A multi-sensory culinary journey led by Michelin-starred chefs.",
    longDescription: "Gastronomy meets molecular science. Chef Marcovici treats the kitchen as a laboratory where local Provençal ingredients are deconstructed and reimagined to tell a story of the soil.",
    highlights: ["12-course menu", "Wine cellar tour", "Chef's immersion", "Sensory pairings"],
    host: {
      name: "Chef Marcovici",
      role: "Executive Alchemist",
      bio: "Triple-starred innovator specializing in forest foraging and molecular restructuring.",
      avatar: "https://images.unsplash.com/photo-1583394838336-acd97773cf3f?auto=format&fit=crop&q=80&w=200"
    },
    menu: [
      { name: "Earth & Ash", desc: "Smoked root vegetables with truffle soil and carbonized leeks", price: "Included" },
      { name: "Mistral Sea", desc: "Wild-caught bass with lavender infusion and saltwater foam", price: "Included" },
      { name: "The Harvest Sun", desc: "Deconstructed apricot with solar-dried honeycomb", price: "Included" }
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
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1545652937-2fb079374092?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Education",
    type: 'food',
    description: "Learn the art of mountain foraging with local monks.",
    highlights: [],
    host: {
      name: "Sensei Hiro",
      role: "Forest Guardian",
      bio: "Resident monk of Toshodai-ji with 40 years of seasonal foraging expertise.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
    },
    menu: [
      { name: "Shojin Ryori", desc: "Traditional Buddhist vegan cuisine sourced entirely from the forest", price: "Included" }
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
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Geography",
    type: 'place',
    description: "A destination guide to one of the most secluded mountain ranges on earth.",
    highlights: ["Spiritual history", "Untouched biodiversity", "Carbon-negative nation"],
    attractions: ["Tiger's Nest Monastery", "Punakha Dzong", "Phobjikha Valley"],
    curatorNotes: "Bhutan demands patience. The altitude requires acclimatization and a shift in tempo."
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
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1528156438644-5cb8847bc09d?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Heritage",
    type: 'place',
    description: "Dive into the hidden, less-trafficked temples of the ancient capital.",
    highlights: ["Hidden Zen Gardens", "Matcha Ceremonies", "Ancient Architecture"],
    attractions: ["Otagi Nenbutsu-ji", "Gio-ji Moss Temple"],
    curatorNotes: "Avoid Arashiyama at midday. Wake up at 5 AM to witness the morning ritual of the moss gardens."
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
    gallery: [
      "https://images.unsplash.com/photo-1520637101442-3554859a73d2?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1476610182048-b716b85180ce?auto=format&fit=crop&q=80&w=2000"
    ],
    category: "Geology",
    type: 'place',
    description: "Journey along the tectonic boundary where the North American and Eurasian plates tear apart.",
    highlights: ["Active Fissures", "Glacial Lagoons", "Black Sand Beaches"],
    attractions: ["Fagradalsfjall Volcano", "Jökulsárlón Lagoon"],
    curatorNotes: "The weather changes every 15 minutes. Layered clothing is non-negotiable. Respect the moss."
  }
];
