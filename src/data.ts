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

// ─── Dedicated Event Model ────────────────────────────────────────────────────

export type EventMood = 'ritual' | 'summit' | 'ceremony' | 'gathering' | 'festival' | 'expedition';

export interface EventAct {
  time: string;
  title: string;
  desc: string;
  type: 'performance' | 'ceremony' | 'social' | 'wellness';
}

export interface EventSpeaker {
  name: string;
  role: string;
  origin: string;
}

export interface LKPEvent {
  id: number;
  title: string;
  tagline: string;
  location: string;
  venue: string;
  date: string;
  time: string;
  capacity: number;
  spotsLeft: number;
  price: number;
  mood: EventMood;
  image: string;
  heroImage: string;
  accentColor: string;
  accentBg: string;
  description: string;
  highlights: string[];
  schedule: EventAct[];
  speakers: EventSpeaker[];
  dressCode: string;
  includes: string[];
  curatorNote: string;
}

export const EVENTS: LKPEvent[] = [
  // ── 101: Bali ────────────────────────────────────────────────────────────
  {
    id: 101,
    title: 'Lunar Equinox Ritual',
    tagline: 'A sacred convergence under the full moon.',
    location: 'Bali, Indonesia',
    venue: 'Pura Luhur Batukaru Temple — Private Grounds',
    date: 'September 19, 2026',
    time: '17:00 – 23:30',
    capacity: 12,
    spotsLeft: 3,
    price: 450,
    mood: 'ritual',
    image: '/assets/lkp_jungle_experience.png',
    heroImage: '/assets/lkp_hero_cinematic.png',
    accentColor: 'text-violet-300',
    accentBg: 'bg-violet-500/10',
    description:
      "An exclusive gathering at one of Bali's most spiritually charged mountain temples — accessible only to private groups. The evening begins with a guided purification ceremony led by the temple's head priest, followed by traditional Kecak performance, and concludes with a communal silent meditation as the full moon rises above the volcanic peaks.",
    highlights: [
      'Private temple after-hours access',
      'Guided purification by head priest',
      'Traditional Gamelan & Kecak performance',
      'Silent moonrise meditation',
      'Earth feast with local offerings',
    ],
    schedule: [
      { time: '17:00', title: 'Arrival & Temple Walk', desc: 'Private entry through the sacred forest path, guided orientation of the temple grounds.', type: 'social' },
      { time: '18:00', title: 'Melukat Purification', desc: 'A ceremonial water cleansing ritual performed at the temple spring by the head priest.', type: 'ceremony' },
      { time: '19:30', title: 'Kecak Fire Dance', desc: 'Authentic Balinese Kecak performance choreographed for the equinox, performed by the temple troupe.', type: 'performance' },
      { time: '21:00', title: 'Communal Earth Feast', desc: "A shared table of local Balinese offerings — hand-prepared over three days by the temple's culinary keepers.", type: 'social' },
      { time: '22:30', title: 'Moonrise Silence', desc: 'A 30-minute guided group meditation under the full equinox moon. No phones, no words.', type: 'wellness' },
    ],
    speakers: [
      { name: 'Ida Bagus Ngurah', role: 'Head Priest & Ceremonial Guide', origin: 'Tabanan, Bali' },
      { name: 'Ketut Liyer II', role: 'Traditional Music Director', origin: 'Ubud, Bali' },
    ],
    dressCode: 'Traditional Balinese sarong (provided) — no black clothing',
    includes: ['Return private transfer from Ubud', 'Ceremonial attire', 'Earth feast & offerings', 'Meditation guide materials'],
    curatorNote: 'This event is intentionally absent from all digital booking platforms. It exists only by word of mouth — and by a very particular invitation.',
  },

  // ── 102: Kyoto ───────────────────────────────────────────────────────────
  {
    id: 102,
    title: 'The Silence Summit',
    tagline: "Three days of radical stillness in Kyoto's hills.",
    location: 'Kyoto, Japan',
    venue: 'Tofuku-ji Private Annex — The Roji Garden',
    date: 'November 03–05, 2026',
    time: '3-Day Immersion',
    capacity: 8,
    spotsLeft: 2,
    price: 2400,
    mood: 'summit',
    image: '/assets/lkp_desert_experience.png',
    heroImage: '/assets/lkp_stay_lodge.png',
    accentColor: 'text-amber-300',
    accentBg: 'bg-amber-500/10',
    description:
      "Held in the private annex of Tofuku-ji, one of Kyoto's most revered Zen temples, The Silence Summit is a three-day immersive retreat for 8 people who wish to strip away everything non-essential. Days are structured around Zazen meditation at dawn, guided philosophical discourse with a resident Zen monk, private garden walks, and a daily Japanese tea ceremony of rare cultivars.",
    highlights: [
      'Hosted by resident Zen monk Seido Roshi',
      'Daily Zazen at dawn in the primary hall',
      'Private access to the Roji garden',
      'Rare ceremonial tea from Uji masters',
      'Shojin Ryori — traditional monastic cuisine',
    ],
    schedule: [
      { time: 'Day 1 — 05:30', title: 'First Zazen Sitting', desc: 'The retreat opens in silence. No introductions. Simply seat yourself in the primary hall and begin.', type: 'wellness' },
      { time: 'Day 1 — 10:00', title: 'Discourse: The Art of Not-Knowing', desc: "Seido Roshi leads an intimate 2-hour dialogue on the Zen concept of Shoshin — Beginner's Mind.", type: 'ceremony' },
      { time: 'Day 1 — 15:00', title: 'Roji Garden Walk', desc: 'A solo, guided walk through the moss garden. Each path represents a teaching.', type: 'wellness' },
      { time: 'Day 2 — 09:00', title: 'Tea Ceremony — Chaji', desc: 'A full four-hour formal tea ceremony with teas sourced from 200-year-old Uji cultivars.', type: 'ceremony' },
      { time: 'Day 3 — 06:00', title: 'Final Zazen & Release', desc: 'The closing sitting. Followed by a shared meal of silence. Then the world is returned to you.', type: 'performance' },
    ],
    speakers: [
      { name: 'Seido Yamamoto', role: 'Resident Zen Monk & Philosopher', origin: 'Kyoto, Japan' },
      { name: 'Aiko Furuya', role: 'Tea Master — Urasenke School', origin: 'Uji, Japan' },
    ],
    dressCode: 'Simple, monochrome clothing — no logos, no prints',
    includes: ['3-night private tatami accommodation', 'All Shojin Ryori meals', 'Tea ceremony materials', 'Personal zazen cushion to take home'],
    curatorNote: 'Devices are surrendered at the gate. A dedicated concierge holds them safely. You will thank yourself.',
  },

  // ── 103: Patagonia ───────────────────────────────────────────────────────
  {
    id: 103,
    title: 'Edge of the World',
    tagline: 'A private summit beneath the glaciers of Patagonia.',
    location: 'Torres del Paine, Patagonia',
    venue: 'EcoCamp Patagonia — Dome Constellation',
    date: 'March 22, 2027',
    time: '07:00 – 22:00',
    capacity: 16,
    spotsLeft: 6,
    price: 1800,
    mood: 'gathering',
    image: '/assets/lkp_arctic_experience.png',
    heroImage: '/assets/lkp_desert_details_interior.png',
    accentColor: 'text-sky-300',
    accentBg: 'bg-sky-500/10',
    description:
      "One full day at the literal edge of the inhabited world. The program brings together 16 explorers — wildlife photographers, polar guides, conservationists, and the simply curious — for a single day of shared immersion in one of earth's last great wildernesses.",
    highlights: [
      'Guided glacier hike at first light',
      'Transparent dome documentary screening',
      'Conservation roundtable with field experts',
      'Wildlife photography workshop',
      'Asado dinner under the Southern sky',
    ],
    schedule: [
      { time: '07:00', title: 'Pre-Dawn Transfer', desc: 'From EcoCamp to the Grey Glacier trailhead, in expedition vehicles under the Milky Way.', type: 'social' },
      { time: '08:30', title: 'Glacier Dawn Hike', desc: "A guided 4-hour traverse across Grey Glacier's moraine fields with expedition lead Tomas Reyes.", type: 'wellness' },
      { time: '13:00', title: 'Photography Workshop', desc: 'Wildlife and landscape photography masterclass led by National Geographic-featured photographer Sofia Vargas.', type: 'performance' },
      { time: '17:30', title: 'Dome Screening & Discussion', desc: 'Private screening of "Last Wild" — a documentary on Patagonian conservation — followed by a roundtable.', type: 'ceremony' },
      { time: '20:00', title: 'Asado Under the Southern Stars', desc: 'A wood-fired Patagonian asado served al fresco on the dome terrace as the stars emerge.', type: 'social' },
    ],
    speakers: [
      { name: 'Tomas Reyes', role: 'Expedition Leader & Glaciologist', origin: 'Puerto Natales, Chile' },
      { name: 'Sofia Vargas', role: 'Nat Geo Wildlife Photographer', origin: 'Santiago, Chile' },
      { name: 'Dr. Petra Wolff', role: 'Patagonian Conservation Biologist', origin: 'Berlin, Germany' },
    ],
    dressCode: 'Technical expedition wear — thermal layers, waterproofs',
    includes: ['Round-trip domestic flight from Santiago', 'All meals & EcoCamp accommodation', 'Expedition gear hire', 'Photography workshop materials & prints'],
    curatorNote: 'No two days in Patagonia are alike. Weather is the co-curator here. Surrender to it.',
  },

  // ── 104: Morocco ─────────────────────────────────────────────────────────
  {
    id: 104,
    title: 'Sands of the Sufi',
    tagline: 'An evening of trance, fire, and ancient devotion.',
    location: 'Marrakech, Morocco',
    venue: 'El Badi Palace — Eastern Courtyard',
    date: 'October 11, 2026',
    time: '19:00 – 01:00',
    capacity: 20,
    spotsLeft: 7,
    price: 620,
    mood: 'ceremony',
    image: '/assets/lkp_desert_details_interior.png',
    heroImage: '/assets/lkp_desert_experience.png',
    accentColor: 'text-orange-300',
    accentBg: 'bg-orange-500/10',
    description:
      "Within the ruins of the 16th-century El Badi Palace, a gathering unlike any other unfolds. The Gnawa masters — spiritual descendants of Sub-Saharan Africa — perform the Lila, an all-night healing ceremony of trance rhythms, song, and sacred color. Guests are welcomed as witnesses and participants in one of the most powerful musical traditions on earth.",
    highlights: [
      'Private access to El Badi Palace after dark',
      'Full Gnawa Lila healing ceremony',
      'Sufi whirling dervish performance',
      'Traditional Moroccan banquet — 7 courses',
      'Private riad accommodation included',
    ],
    schedule: [
      { time: '19:00', title: 'Palace Arrival', desc: 'Enter through the original Almohad gate as lanterns are lit across the ruins — the palace comes alive.', type: 'social' },
      { time: '20:00', title: 'Moroccan Banquet', desc: 'Seven-course feast of traditional Moroccan cuisine — bastilla, tagine, couscous, and oud-scented tea.', type: 'social' },
      { time: '21:30', title: 'Sufi Sema', desc: 'Whirling dervishes of the Mevlevi order perform the ancient Sema ceremony — a meditation in motion.', type: 'performance' },
      { time: '22:45', title: 'Gnawa Lila Begins', desc: 'The Maalem (master musician) opens the Lila. This is not a performance — it is a conversation with the spirits.', type: 'ceremony' },
      { time: '00:30', title: 'The Closing Circle', desc: 'The ceremony closes with the burning of benzoin incense. Guests are invited to carry an ember home.', type: 'wellness' },
    ],
    speakers: [
      { name: 'Maalem Hassan Boussou', role: 'Gnawa Grand Master — 4th Generation', origin: 'Essaouira, Morocco' },
      { name: 'Sheikh Rachid Benali', role: 'Sufi Order Leader — Mevlevi Tradition', origin: 'Fez, Morocco' },
    ],
    dressCode: 'Flowing, lightweight garments — djellaba provided for the ceremony',
    includes: ['Palace exclusive access', 'Moroccan banquet', 'Djellaba attire', 'Private riad room', 'Airport transfers'],
    curatorNote: 'The Lila does not end when you leave. It continues in you. Arrive open.',
  },

  // ── 105: Iceland ─────────────────────────────────────────────────────────
  {
    id: 105,
    title: 'Aurora Solstice',
    tagline: 'A private vigil for the longest night of the year.',
    location: 'Thingvellir, Iceland',
    venue: 'Thingvellir National Park — Rift Valley Floor',
    date: 'December 21, 2026',
    time: '15:00 – 09:00 (overnight)',
    capacity: 10,
    spotsLeft: 4,
    price: 1950,
    mood: 'expedition',
    image: '/assets/lkp_arctic_experience.png',
    heroImage: '/assets/lkp_stay_lodge.png',
    accentColor: 'text-teal-300',
    accentBg: 'bg-teal-500/10',
    description:
      "On the winter solstice — the longest, darkest night of the year in Iceland — a group of ten gathers at the tectonic rift that divides the North American and Eurasian plates in Thingvellir National Park. The vigil begins before sunset and ends after the following dawn: 18 hours of darkness, northern lights, geothermal bathing, and ancient Norse storytelling.",
    highlights: [
      'Private Thingvellir access for the full night',
      'Northern lights vigil with astrophysicist guide',
      'Geothermal hot spring bathing at 2am',
      'Norse mythology & sagas by open fire',
      'Solstice dawn breakfast on the rift',
    ],
    schedule: [
      { time: '15:00', title: 'Arrival at the Rift', desc: 'Enter the valley as the sun sets for 18 hours. First light will not return until the expedition ends.', type: 'social' },
      { time: '17:30', title: 'Fire Circle & Norse Sagas', desc: "Storyteller Sigrid narrates Iceland's founding myths by firelight, in the very valley where the original parliament met.", type: 'performance' },
      { time: '22:00', title: 'Aurora Vigil Begins', desc: 'Astrophysicist Gunnar Bjornsson guides the group through the science and mythology of the northern lights.', type: 'ceremony' },
      { time: '02:00', title: 'Midnight Hot Spring', desc: 'Private geothermal pool reserved exclusively — immerse under the aurora at the lowest point of the night.', type: 'wellness' },
      { time: '07:30', title: 'Solstice Dawn', desc: 'The sun returns. Breakfast of skyr, smoked lamb, and hand-brewed Icelandic coffee is served on the rift wall.', type: 'social' },
    ],
    speakers: [
      { name: 'Sigrid Halldorsdottir', role: 'Norse Sagas Storyteller & Historian', origin: 'Reykjavik, Iceland' },
      { name: 'Dr. Gunnar Bjornsson', role: 'Astrophysicist — Aurora Research Institute', origin: 'Akureyri, Iceland' },
    ],
    dressCode: 'Arctic expedition gear — full kit provided on arrival',
    includes: ['Full overnight wilderness camp setup', 'All meals & hot beverages', 'Expedition gear kit', 'Private geothermal pool access', 'Return transfer from Reykjavik'],
    curatorNote: 'There is no night quite like an Icelandic solstice. By 3am, your sense of time will dissolve entirely. That is the point.',
  },

  // ── 106: Sri Lanka ───────────────────────────────────────────────────────
  {
    id: 106,
    title: 'The Rainforest Conclave',
    tagline: 'Five writers. One jungle. No agenda.',
    location: 'Sinharaja, Sri Lanka',
    venue: 'Rainforest Eco Lodge — The Canopy Terrace',
    date: 'August 07–10, 2026',
    time: '4-Day Residency',
    capacity: 6,
    spotsLeft: 1,
    price: 1600,
    mood: 'summit',
    image: '/assets/lkp_jungle_experience.png',
    heroImage: '/assets/lkp_arctic_experience.png',
    accentColor: 'text-emerald-300',
    accentBg: 'bg-emerald-500/10',
    description:
      "Deep inside Sri Lanka's last primary rainforest — a UNESCO World Heritage site — six writers, artists, and independent thinkers convene for four days with no program, no keynotes, and no deliverables. Just the forest, two meals a day, and each other's company. Guided walks with a forest ecologist. Evening conversations under monsoon canopy. An informal residency that changes the shape of your thinking.",
    highlights: [
      'Private lodge inside UNESCO Sinharaja Forest',
      'Daily guided forest walks with ecologist',
      'Unstructured writing & deep work time',
      'Evening round-tables — informal, uncurated',
      'Traditional Sri Lankan cuisine throughout',
    ],
    schedule: [
      { time: 'Day 1 — Morning', title: 'Arrival & Orientation', desc: 'Transfer into the forest. The lodge has no Wi-Fi. Breakfast is served on the canopy terrace.', type: 'social' },
      { time: 'Day 1 — Afternoon', title: 'Forest Walk with Dr. Perera', desc: 'A 3-hour introduction to Sinharaja — the biodiversity, the sounds, and the logic of the ecosystem.', type: 'wellness' },
      { time: 'Day 2 — Full Day', title: 'Open Residency', desc: 'No activities scheduled. Write, read, walk, sleep. The forest does the rest.', type: 'wellness' },
      { time: 'Day 3 — Evening', title: 'Round-Table: The Things We Cannot Say', desc: 'An informal, uncurated conversation about the questions that don\'t fit normal professional discourse.', type: 'performance' },
      { time: 'Day 4 — Dawn', title: 'Farewell Bird Walk', desc: 'Sinharaja at dawn is a different world entirely. This walk is conducted in complete silence.', type: 'ceremony' },
    ],
    speakers: [
      { name: 'Dr. Rajiv Perera', role: 'Forest Ecologist — University of Colombo', origin: 'Colombo, Sri Lanka' },
    ],
    dressCode: 'Lightweight natural fibres only — no synthetic materials in the forest',
    includes: ['4-night eco lodge accommodation', 'All meals — traditional Sri Lankan cuisine', 'Forest permits & guide fees', 'Return transfer from Colombo'],
    curatorNote: 'This is deliberately the hardest event to explain. The people who belong here will recognise it immediately.',
  },

  // ── 107: New Orleans ─────────────────────────────────────────────────────
  {
    id: 107,
    title: 'Midnight in the Marigny',
    tagline: 'A private jazz immersion in the birthplace of American music.',
    location: 'New Orleans, Louisiana',
    venue: 'Frenchmen Street — Private Club Backstage',
    date: 'February 14, 2027',
    time: '20:00 – 04:00',
    capacity: 24,
    spotsLeft: 9,
    price: 380,
    mood: 'festival',
    image: '/assets/lkp_hero_cinematic.png',
    heroImage: '/assets/lkp_jungle_experience.png',
    accentColor: 'text-rose-300',
    accentBg: 'bg-rose-500/10',
    description:
      "New Orleans is the only city on earth where music is not entertainment — it is infrastructure. On Valentine's night, a curated group of 24 gathers for a private backstage immersion across three legendary Frenchmen Street clubs. From second-line brass parades at midnight to a secret 2am jazz session with a Grammy-winning quartet, this is the city at its most alive.",
    highlights: [
      'Private backstage access across 3 legendary clubs',
      'Grammy-winning quartet — exclusive late session',
      'Midnight second-line brass parade',
      'Creole banquet with James Beard-nominated chef',
      'Jazz history tour of the Treme at dusk',
    ],
    schedule: [
      { time: '20:00', title: 'Treme at Dusk', desc: 'Walking tour of the world\'s oldest African-American neighborhood, narrated by jazz historian Dr. Michael White.', type: 'wellness' },
      { time: '21:30', title: 'Creole Banquet', desc: 'Private dinner at a closed restaurant — gumbo, crawfish etouffee, and beignets from James Beard-nominated chef Leah Chase Jr.', type: 'social' },
      { time: '23:00', title: 'Second Line Parade', desc: 'A private brass band leads the group through the Marigny in a classic New Orleans second-line parade.', type: 'performance' },
      { time: '00:30', title: 'Club Hopping — Backstage Pass', desc: 'Move through three iconic Frenchmen Street clubs with full backstage access and introductions to the artists.', type: 'social' },
      { time: '02:00', title: 'The Late Session', desc: 'A private, unannounced set from Grammy-winning jazz quartet Marcus Roberts Trio. No phones permitted.', type: 'performance' },
    ],
    speakers: [
      { name: 'Dr. Michael White', role: 'Jazz Historian & Clarinetist', origin: 'New Orleans, Louisiana' },
      { name: 'Marcus Roberts', role: 'Grammy-Winning Jazz Pianist', origin: 'Jacksonville, Florida' },
    ],
    dressCode: 'Dressed for a night out — sharp but not formal. No trainers.',
    includes: ['Creole banquet', 'All club entry & backstage access', 'Private brass band for the parade', 'Late-night bar tab', 'Hotel transfer'],
    curatorNote: "There is no city like New Orleans after midnight. By 3am, you will understand why Louis Armstrong never really left.",
  },
];
