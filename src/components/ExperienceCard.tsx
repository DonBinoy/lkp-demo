import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
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

  return (
    <Link to={`/experience/${id}`} className="block relative" style={{ perspective: "1000px" }}>
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group cursor-pointer text-left"
      >
        <motion.div 
          style={{ translateZ: "20px" }}
          className={`relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 border-b-2 transition-colors duration-500 ${themeColors[type]}`}
        >
          {/* Subtle Hover Bloom behind image */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500 z-10 mix-blend-overlay pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className={`px-3 py-1 rounded-full backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] shadow-lg ${badgeColors[type]}`}>
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />
          
          {/* Quick Info Overlay (Bottom) */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white transition-all duration-500 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 z-20">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-white" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="text-sm font-medium">{duration}</span>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ translateZ: "30px" }}>
          <div className="flex items-center gap-1 text-white/30 mb-2 group-hover:text-white/50 transition-colors">
            <MapPin size={10} />
            <span className="text-[10px] uppercase tracking-widest font-black">{location}</span>
          </div>
          <h3 className={`text-2xl font-display font-medium mb-2 transition-all duration-500 transform group-hover:translate-x-2 ${themeColors[type]}`}>
            {title}
          </h3>
          <p className="text-white/40 font-medium group-hover:text-white/70 transition-colors">
            {price > 0 ? (
              <>From <span className="text-white text-lg">${price.toLocaleString()}</span> <span className="text-xs">/ plan</span></>
            ) : (
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60 underline underline-offset-4 group-hover:text-white transition-colors">Explore Community Plan</span>
            )}
          </p>
        </motion.div>
      </motion.div>
    </Link>
  );
}
