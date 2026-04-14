import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import type { CategoryType } from '../data';

interface ExperienceCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  category: string;
  type: CategoryType;
}

export default function ExperienceCard({ 
  id,
  title, 
  location, 
  price, 
  duration, 
  rating, 
  image,
  category,
  type
}: ExperienceCardProps) {
  
  const themeColors: Record<CategoryType, string> = {
    stay: 'group-hover:text-stay border-stay/20',
    experience: 'group-hover:text-experience border-experience/20',
    event: 'group-hover:text-white border-white/20', // Generic white for events
    food: 'group-hover:text-orange-300 border-orange-300/20', // Warm for food
    place: 'group-hover:text-emerald-300 border-emerald-300/20', // Natural for places
  };

  const badgeColors: Record<CategoryType, string> = {
    stay: 'bg-stay/20 text-stay',
    experience: 'bg-experience/20 text-experience',
    event: 'bg-white/10 text-white',
    food: 'bg-orange-500/20 text-orange-200',
    place: 'bg-emerald-500/20 text-emerald-200',
  };

  return (
    <Link to={`/experience/${id}`}>
      <motion.div 
        whileHover={{ y: -10 }}
        className="group cursor-pointer text-left"
      >
        <div className={`relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 border-b-2 transition-colors ${themeColors[type]}`}>
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1 rounded-full backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] ${badgeColors[type]}`}>
              {category}
            </span>
          </div>
          
          {/* Main Image */}
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Quick Info Overlay (Bottom) */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white transition-all duration-500 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-white" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="text-sm font-medium">{duration}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-white/20 mb-2">
            <MapPin size={10} />
            <span className="text-[10px] uppercase tracking-widest font-black">{location}</span>
          </div>
          <h3 className={`text-2xl font-display font-medium mb-2 transition-colors ${themeColors[type]}`}>
            {title}
          </h3>
          <p className="text-white/40 font-medium">
            {price > 0 ? (
              <>From <span className="text-white text-lg">${price.toLocaleString()}</span> <span className="text-xs">/ plan</span></>
            ) : (
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60 underline underline-offset-4">Explore Community Plan</span>
            )}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
