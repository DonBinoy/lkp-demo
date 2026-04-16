import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Search, Menu, X, User, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVars: Variants = {
    initial: { clipPath: "circle(0% at 100% 0)" },
    animate: { 
      clipPath: "circle(150% at 100% 0)", 
      transition: { 
        type: "spring", 
        stiffness: 20, 
        restDelta: 2,
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      } 
    },
    exit: { 
      clipPath: "circle(0% at 100% 0)",
      transition: { delay: 0.2, type: "spring", stiffness: 400, damping: 40 }
    }
  };

  const linkVars: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
          className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'shadow-2xl bg-black/60 border-white/20 backdrop-blur-xl' : 'bg-white/5'
          }`}
        >
          {/* Logo */}
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white to-white/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] text-black">
                <span className="font-display font-bold text-xs">LKP</span>
              </div>
              <span className="font-display font-medium text-lg tracking-tight hidden sm:block">
                Little Known Planet
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Experiences', path: '/#experiences' },
              { label: 'Events', path: '/#events' },
              { label: 'Food', path: '/#food' },
              { label: 'Stays', path: '/#stays' },
              { label: 'Places', path: '/#places' }
            ].map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-white transition-all relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-white transition-all duration-500 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-4"
          >
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 hover:bg-white/10 rounded-full transition-colors relative group">
              <Search size={20} className="group-hover:text-white transition-colors" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:flex items-center gap-2 p-2 px-4 hover:bg-white/10 rounded-full transition-colors border border-white/10 group">
              <Globe size={18} className="group-hover:-rotate-12 transition-transform duration-500" />
              <span className="text-sm font-medium">EN</span>
            </motion.button>
            <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 p-1 pr-3 glass rounded-full hover:bg-white/10 transition-colors group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center italic font-display group-hover:bg-white group-hover:text-black transition-colors">
                <User size={18} />
              </div>
              <Menu size={20} className="md:hidden ml-1" onClick={() => setIsMobileMenuOpen(true)} />
              <span className="hidden md:block text-sm font-medium pr-1">Profile</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <motion.button 
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white"
              >
                <X size={24} />
              </motion.button>
            </div>
            <div className="flex flex-col gap-10 mt-20 px-4">
              {['Experiences', 'Adventures', 'Stays', 'About'].map((item) => (
                <div key={item} className="overflow-hidden">
                  <motion.a 
                    variants={linkVars}
                    href="#" 
                    className="text-6xl font-display font-medium block hover:translate-x-4 transition-transform duration-300 hover:text-white/80"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
