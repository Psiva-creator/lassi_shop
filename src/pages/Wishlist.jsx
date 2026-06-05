import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import { useWishlistStore } from '../store/useWishlistStore';
import { useAuth } from '../context/AuthContext';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const { items } = useWishlistStore();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen bg-[#0a0a0a] w-full text-white pt-24 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-6 md:px-12 py-12 w-full">
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-white mb-4"
          >
            Your <span className="text-[var(--color-mango)] italic font-light">Wishlist</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg font-light"
          >
            A curated collection of your favorite crafted beverages.
          </motion.p>
        </div>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-[#111] border border-white/5 rounded-2xl p-12 text-center"
          >
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">No saved drinks yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't saved any drinks to your wishlist. Explore our menu to find your new favorite.
            </p>
            <Link to="/menu" className="inline-block bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black font-semibold px-8 py-3 rounded-full transition-transform hover:scale-105">
              Explore Menu
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((drink, index) => (
              <DrinkCard
                key={drink.id}
                id={drink.id}
                index={index}
                name={drink.name}
                description={drink.description}
                price={`$${drink.price.toFixed(2)}`}
                image={drink.image}
                // Don't pass hover frames to keep wishlist simple, or we can use static image
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Wishlist;
