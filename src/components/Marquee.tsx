import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Marquee({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-white text-black py-4 border-y border-white/20 select-none flex">
      <motion.div 
        style={{ x }}
        className="flex whitespace-nowrap"
      >
        <span className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter px-4">
          {text} {text} {text} {text} {text} {text} {text} {text} {text} {text}
        </span>
      </motion.div>
    </div>
  );
}
