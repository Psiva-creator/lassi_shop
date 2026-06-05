import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Luxury Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f00] via-black to-[#1a1200] z-0"></div>
      
      {/* Abstract light flares */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-mango)]/20 rounded-full blur-[100px] z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-3xl shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">
            Ready for a <br className="hidden md:block" />
            <span className="text-[var(--color-mango)] italic font-light">Refreshing</span> Experience?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Skip the line and pre-order your favorite premium beverages online. Pick up in-store or get it delivered fresh to your door.
          </p>
          
          <button onClick={() => navigate('/menu')} className="px-10 py-5 bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,155,5,0.3)]">
            Order Your Favorite Drink
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
