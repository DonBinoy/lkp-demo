import { motion } from 'framer-motion';

interface HostCardProps {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export default function HostCard({ name, role, bio, avatar }: HostCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-10 rounded-[60px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl flex flex-col md:flex-row items-center gap-10 group hover:border-white/20 transition-all"
    >
      <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:scale-105 transition-transform duration-700">
        <img src={avatar} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
      </div>
      <div className="text-center md:text-left">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2 block">{role}</span>
        <h3 className="text-3xl font-display font-black uppercase mb-4">{name}</h3>
        <p className="text-lg text-white/60 font-serif italic leading-relaxed max-w-lg">
          "{bio}"
        </p>
      </div>
    </motion.div>
  );
}
