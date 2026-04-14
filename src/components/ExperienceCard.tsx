import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import type { CategoryType } from '../data';
import React from 'react';

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
  const navigate = useNavigate();

  const themeColors: Record<CategoryType, string> = {
    stay: 'group-hover:text-stay border-stay/20',
    experience: 'group-hover:text-experience border-experience/20',
    event: 'group-hover:text-white border-white/20', 
    food: 'group-hover:text-orange-300 border-orange-300/20', 
    place: 'group-hover:text-emerald-300 border-emerald-300/20', 
  };

  const badgeColors: Record<CategoryType, string> = {
    stay: 'bg-stay/20 text-stay',
    experience: 'bg-experience/20 text-experience',
    event: 'bg-white/10 text-white',
    food: 'bg-orange-500/20 text-orange-200',
    place: 'bg-emerald-500/20 text-emerald-200',
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const navigateToDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (type === 'place') {
      navigate(`/place/${id}`);
    } else if (type === 'stay') {
      navigate(`/stay/${id}`);
    } else if (type === 'event') {
      navigate(`/event/${id}`);
    } else if (type === 'food') {
      navigate(`/food/${id}`);
    } else {
      navigate(`/experience/${id}`);
    }
  };

  return (
    <div className="block relative" style={{ perspective: "1000px" }}>
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group cursor-pointer text-left h-full flex flex-col"
        onClick={navigateToDetails}
      >
        <motion.div 
          style={{ translateZ: "20px" }}
          className={`relative aspect-[3/4] rounded-[30px] overflow-hidden mb-6 border border-transparent transition-all duration-500 hover:border-white/20`}
        >
          {/* Subtle Hover Bloom behind image */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500 z-10 mix-blend-overlay pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20 flex justify-between w-[calc(100%-2rem)] items-center">
            <span className={`px-3 py-1 rounded-full backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] shadow-lg ${badgeColors[type]}`}>
              {category}
            </span>
            <div className="flex gap-1 items-center bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
              <Star size={10} className="fill-white" />
              <span className="text-[10px] font-bold text-white">{rating}</span>
            </div>
          </div>
          
          {/* Main Image */}
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 z-10" />
          
          {/* High-Converting E-Commerce Overlay (Bottom) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col text-white transition-all duration-500 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 z-20">
            <div className="flex items-center gap-2 mb-4 text-white/80">
              <Clock size={12} />
              <span className="text-xs font-bold uppercase tracking-widest">{duration}</span>
            </div>
            
            <button 
              onClick={navigateToDetails}
              className="w-full py-3 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-xl"
            >
              Book Plan <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        <motion.div style={{ translateZ: "30px" }} className="px-2 flex-grow flex flex-col">
          <div className="flex items-center gap-1 text-white/30 mb-2 group-hover:text-white/50 transition-colors">
            <MapPin size={10} />
            <span className="text-[10px] uppercase tracking-widest font-black">{location}</span>
          </div>
          
          <h3 className={`text-2xl font-display font-medium mb-auto transition-all duration-500 transform group-hover:translate-x-2 ${themeColors[type]}`}>
            {title}
          </h3>
          
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center w-full">
            <p className="text-white font-medium group-hover:text-glow transition-all">
              {price > 0 ? (
                <>From <span className="text-xl font-display">${price.toLocaleString()}</span></>
              ) : (
                <span className="text-sm font-bold uppercase tracking-widest">Community</span>
              )}
            </p>
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 group-hover:text-white/80 transition-colors">
               Details
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
