import { motion } from 'framer-motion';

const EventGallery = () => {
  const images = [
    { src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800', title: 'Corporate Summit', category: 'Corporate' },
    { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800', title: 'Summer Wedding', category: 'Wedding' },
    { src: 'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?q=80&w=800', title: 'Tech Expo 2024', category: 'Exhibition' },
    { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800', title: 'Beach Party', category: 'Private' },
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800', title: 'Foodies Fest', category: 'Festival' },
    { src: 'https://images.unsplash.com/photo-1523580494863-6f30312248f5?q=80&w=800', title: 'College Culturals', category: 'University' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10"
        >
          <img 
            src={img.src} 
            alt={img.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-[var(--color-mango)] text-[10px] font-black uppercase tracking-widest mb-1">{img.category}</p>
            <h4 className="text-xl font-bold text-white">{img.title}</h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EventGallery;
