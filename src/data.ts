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
    description: "Journey into the heart of the Sahara, where the veil between Earth and the cosmos is at its thinnest. Our private expedition offers an unparalleled stargazing experience, led by world-class astronomers in a setting of absolute nomadic luxury.",
    highlights: ["Private astronomer-led star sessions", "Gourmet dining under the stars", "Traditional Berbere hospitality"],
    itinerary: [
      { day: "Day 01", title: "Arrival", desc: "Private transition to the desert camp." },
      { day: "Day 02", title: "The Masterclass", desc: "In-depth astronomical guiding." }
    ]
  },
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
    description: "A architectural masterpiece nestled in the cloud forests of Peru, providing absolute immersion into nature with the comforts of a five-star retreat.",
    highlights: ["Zero-carbon design", "Private thermal springs", "Panoramic mountain views"],
    amenities: ["Private Spa", "Helipad Access", "Butler Service", "Gourmet Kitchen"]
  },
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
    description: "An exclusive gathering celebrating the lunar cycle with traditional Balinese dance, meditation, and a cleansing ritual at a hidden mountain temple.",
    highlights: ["Traditional Gamelan performance", "Private temple access", "Purification ceremony"],
    schedule: [
      { time: "17:00", activity: "Temple Welcome" },
      { time: "18:30", activity: "Equinox Performance" },
      { time: "20:00", activity: "Communal Earth Feast" }
    ]
  },
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
    description: "A multi-sensory culinary journey led by Michelin-starred chefs, focusing on the preservation of ancient Provencal flavors through modern techniques.",
    highlights: ["12-course tasting menu", "Private wine cellar tour", "Chef's table immersion"],
    menu: [
      { name: "Earth & Ash", desc: "Smoked root vegetables with truffle soil", price: "Included" },
      { name: "Mistral Sea", desc: "Wild-caught bass with lavender infusion", price: "Included" }
    ]
  },
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
    description: "A destination guide to one of the most secluded and spiritual mountain ranges on earth. Discover the silence of Bhutan's high-altitude valleys.",
    highlights: ["Spiritual history", "Untouched biodiversity", "Carbon-negative nation"],
    attractions: ["Tiger's Nest Monastery", "Punakha Dzong", "Phobjikha Valley"]
  }
];
