import { motion } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full overflow-hidden py-12">
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] aspect-[16/10] rounded-[40px] overflow-hidden snap-center border border-white/10"
          >
            <img 
              src={img} 
              alt={`Gallery image ${i + 1}`} 
              className="w-full h-full object-cover transition-all duration-1000 grayscale hover:grayscale-0 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
        ))}
      </div>
    </div>
  );
}
