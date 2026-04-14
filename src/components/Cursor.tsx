import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if we are hovering over an element that requires a custom cursor state
      const isDragZone = target.closest('[data-cursor="drag"]');
      const isDiscoverZone = target.closest('[data-cursor="discover"]');
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea');

      if (isDragZone) {
        setIsHovered(true);
        setCursorText('DRAG');
      } else if (isDiscoverZone) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (isInteractive) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide cursor by default on body
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (cursorText ? 80 : 40) : 12,
          height: isHovered ? (cursorText ? 80 : 40) : 12,
          backgroundColor: isHovered && !cursorText ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 1)',
          backdropFilter: isHovered && !cursorText ? 'blur(4px)' : 'none',
          border: isHovered && !cursorText ? '1px solid rgba(255,255,255,0.5)' : 'none'
        }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center mix-blend-difference overflow-hidden text-black font-display font-black text-[10px] tracking-widest whitespace-nowrap"
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Tiny dot that strictly follows the mouse without spring delay */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[101] mix-blend-difference transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
    </>
  );
}


