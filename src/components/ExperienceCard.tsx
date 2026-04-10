import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';

interface ExperienceCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  category: string;
  type: 'stay' | 'adventure' | 'experience';
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
  
  const themeColors = {
    stay: 'group-hover:text-stay border-stay/20',
    adventure: 'group-hover:text-adventure border-adventure/20',
    experience: 'group-hover:text-experience border-experience/20',
  };

  const badgeColors = {
    stay: 'bg-stay/20 text-stay',
    adventure: 'bg-adventure/20 text-adventure',
    experience: 'bg-experience/20 text-experience',
  };

  return (
    <Link to={`/experience/${id}`}>
      <motion.div 
        whileHover={{ y: -10 }}
        className="group cursor-pointer"
      >
        <div className={`relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 border-b-2 transition-colors ${themeColors[type]}`}>
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-widest ${badgeColors[type]}`}>
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
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white transition-all duration-500 translate-y-4 group-hover:translate-y-0">
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
          <div className="flex items-center gap-1 text-white/40 mb-2">
            <MapPin size={12} />
            <span className="text-xs uppercase tracking-wider font-medium">{location}</span>
          </div>
          <h3 className={`text-2xl font-display font-medium mb-2 transition-colors ${themeColors[type]}`}>
            {title}
          </h3>
          <p className="text-white/60 font-medium">
            From <span className="text-white text-lg">${price.toLocaleString()}</span> <span className="text-xs">/ person</span>
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
