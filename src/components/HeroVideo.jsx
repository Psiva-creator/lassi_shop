import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import videoSrc from '../assets/videos/mango-lassi.mp4';

const HeroVideo = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none transform -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-[var(--color-luxury-black)] via-black/40 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            Crafted <span className="text-[var(--color-mango)] italic">Fresh.</span><br />
            Served Premium.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Experience authentic handcrafted beverages made with fresh ingredients and premium quality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button onClick={() => navigate('/menu')} className="w-full sm:w-auto px-8 py-4 bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black text-lg font-semibold rounded-full transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,155,5,0.4)]">
            Order Now
          </button>
          <button onClick={() => navigate('/menu')} className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white text-lg font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-105 backdrop-blur-sm">
            Explore Menu
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1"
        >
          <div className="w-1.5 h-3 bg-[var(--color-mango)] rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroVideo;
