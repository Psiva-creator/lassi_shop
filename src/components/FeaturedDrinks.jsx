import { motion } from 'framer-motion';
import DrinkCard from './DrinkCard';
import { menuService } from '../services/menuService';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FeaturedDrinks = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const loadDrinks = async () => {
      try {
        const data = await menuService.getAllDrinks();
        setDrinks(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load featured drinks", err);
      }
    };
    loadDrinks();
  }, []);

  return (
    <section id="drinks" className="py-20 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--color-mango)] font-semibold tracking-widest uppercase mb-3 text-sm"
          >
            Signature Menu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white font-serif"
          >
            Our Featured <span className="text-[var(--color-mango)] italic font-light">Drinks</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--color-mango)] to-transparent mx-auto mt-8"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {drinks.map((drink, index) => (
            <DrinkCard
              key={index}
              id={drink.id}
              index={index}
              name={drink.name}
              description={drink.description}
              price={`₹${drink.price.toFixed(2)}`}
              image={drink.image}
              hoverFrames={drink.hoverFrames}
              idleFrame={drink.idleFrame}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <Link to="/menu" className="inline-block text-white border-b border-white/30 hover:border-white pb-1 transition-colors uppercase tracking-widest text-sm font-semibold">
            View Full Menu
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDrinks;
