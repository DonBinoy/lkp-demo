import { motion, useScroll, useTransform, useVelocity, useSpring, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef, useState } from 'react';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface MarqueeItemProps {
  children: string;
  baseVelocity: number;
}

function MarqueeItem({ children, baseVelocity = 100 }: MarqueeItemProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 400,
    damping: 50
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const [isHovered, setIsHovered] = useState(false);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (isHovered) {
      moveBy *= 0.1; // Slow down on hover
    }

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div 
      className="flex whitespace-nowrap flex-nowrap overflow-hidden py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex font-display font-black uppercase text-7xl md:text-[10vw] tracking-tighter leading-none" style={{ x }}>
        {[...Array(8)].map((_, i) => (
          <span key={i} className={`pr-12 ${baseVelocity < 0 ? 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] hover:[-webkit-text-stroke:1px_#fff] transition-all' : 'text-white/80'}`}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  const marqueeText = "STAYS • EVENTS • FOODS • EXPERIENCES • PLACES • ";

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-20 md:py-32 cursor-crosshair group">
      
      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background Label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-[0.02] scale-150">
        <h3 className="text-[20vw] font-display font-black uppercase">Collection</h3>
      </div>

      <div className="flex flex-col gap-0">
        <MarqueeItem baseVelocity={-2}>{marqueeText}</MarqueeItem>
        <MarqueeItem baseVelocity={2}>{marqueeText}</MarqueeItem>
      </div>

      {/* Overlay Instructions for "Amaaaazing" Feel */}
      <div className="absolute top-6 right-12 z-20">
         <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 animate-pulse">Interactive Grid / Velocity Active</span>
      </div>
    </div>
  );
}
