import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User, Globe } from 'lucide-react';

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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'shadow-2xl bg-black/40' : 'bg-white/5'
        }`}>
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white to-white/40 flex items-center justify-center">
              <span className="text-black font-display font-bold text-xs">LKP</span>
            </div>
            <span className="font-display font-medium text-lg tracking-tight hidden sm:block">
              Little Known Planet
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Experiences', 'Adventures', 'Stays', 'About'].map((item, idx) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="hidden sm:flex items-center gap-2 p-2 px-4 hover:bg-white/10 rounded-full transition-colors border border-white/10">
              <Globe size={18} />
              <span className="text-sm font-medium">EN</span>
            </button>
            <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />
            <button className="flex items-center gap-2 p-1 pr-3 glass rounded-full hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center italic font-display">
                <User size={18} />
              </div>
              <Menu size={20} className="md:hidden" onClick={() => setIsMobileMenuOpen(true)} />
              <span className="hidden md:block text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-black p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12">
              {['Experiences', 'Adventures', 'Stays', 'About'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-4xl font-display font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
