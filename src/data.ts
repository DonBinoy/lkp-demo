export type ExperienceType = 'stay' | 'adventure' | 'experience';

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
  type: ExperienceType;
  description: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string } [];
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
  },
  {
    id: 2,
    title: "The Jungle Temple Ritual",
    location: "Southeast Asia",
    price: 890,
    duration: "Full Day",
    rating: 5.0,
    reviews: 56,
    image: "/assets/lkp_jungle_experience.png",
    detailImage: "/assets/lkp_hero_cinematic.png",
    category: "Culture",
    type: 'adventure',
    description: "Deep in the emerald canopy of Southeast Asia lies a temple forgotten by time. This adventure is a physical and spiritual journey, involving an eco-conscious trek and a private ritual with local elders to understand the ancient harmony of the forest.",
    highlights: [
      "Guided trek through biosphere reserves",
      "Meditation session with local lineage holders",
      "Ethically sourced community-hosted feast",
      "Rare botanical exploration"
    ],
    itinerary: [
      { day: "08:00", title: "Into the Green", desc: "Ascent through the primary rainforest with our expert ethnobotanists." },
      { day: "13:00", title: "The Forgotten Temple", desc: "Arrival at the site, private lunch, and deep-dive into the temple's history." },
      { day: "17:00", title: "Ritual of the Sky", desc: "A traditional closing ceremony as the sun sets through the canopy." }
    ]
  },
  {
    id: 3,
    title: "Glass Forest Eco-Lodge",
    location: "Andes, Peru",
    price: 2100,
    duration: "2 Nights",
    rating: 4.8,
    reviews: 89,
    image: "/assets/lkp_stay_lodge.png",
    detailImage: "/assets/lkp_arctic_experience.png",
    category: "Retreat",
    type: 'stay',
    description: "Nestled precisely where the cloud forest meets the high peaks, the Glass Forest is a sanctuary of minimalist design. Every suite offers a panoramic, floor-to-ceiling view of the ancient living landscape, designed for deep reflection and silence.",
    highlights: [
      "Private thermal spring access",
      "Zero-carbon footprint architectural design",
      "Organic locally-sourced mountain foraging menu",
      "Private meditation terrace"
    ],
    itinerary: [
      { day: "Day 01", title: "Forest Ascent", desc: "A scenic transition into the cloud forest followed by a guided botanical tour." },
      { day: "Day 02", title: "Silence & Stone", desc: "Full day dedicated to forest bathing and optional ancient ruin exploration." }
    ]
  },
  {
    id: 4,
    title: "Arctic Glass Igloo Retreat",
    location: "Tromsø, Norway",
    price: 2800,
    duration: "3 Nights",
    rating: 4.9,
    reviews: 210,
    image: "/assets/lkp_arctic_experience.png",
    detailImage: "/assets/lkp_hero_cinematic.png",
    category: "Polar",
    type: 'experience',
    description: "Witness the dance of the Aurora Borealis from the absolute comfort of an ultra-modern glass igloo. This polar journey combines high-tech luxury with the raw, untamed beauty of the Norwegian fjords.",
    highlights: [
      "Northern Lights wake-up service",
      "Private husky-led fjord exploration",
      "Nordic spa and sauna ritual",
      "Gourmet Arctic fusion dining"
    ],
    itinerary: [
       { day: "Day 01", title: "Fjord Welcome", desc: "Arrival via private boat and sunset snowshoe trek." },
       { day: "Day 02", title: "The Aurora Watch", desc: "Husky sledding expedition and late-night astronomical guiding." }
    ]
  },
  {
    id: 5,
    title: "High-Altitude Summit Lodge",
    location: "Alps, Switzerland",
    price: 3400,
    duration: "2 Nights",
    rating: 5.0,
    reviews: 42,
    image: "/assets/lkp_hero_cinematic.png",
    detailImage: "/assets/lkp_stay_lodge.png",
    category: "Mountain",
    type: 'stay',
    description: "Perched on a literal ridge in the Swiss Alps, this lodge is accessible only by helicopter or a strenuous hike. It is the ultimate expression of solitude, offering views of the Eiger and Jungfrau like no other place on earth.",
    highlights: [
      "Helicopter arrival and departure",
      "Michelin-starred private chef",
      "Personal mountain guide on call",
      "360-degree glass viewing deck"
    ],
    itinerary: [
      { day: "Day 01", title: "The Ascent", desc: "Helicopter transfer from Zurich and sunset lounge introduction." },
      { day: "Day 02", title: "Ridge Line Mastery", desc: "Guided ridge trekking or private spa therapy." }
    ]
  }
];
