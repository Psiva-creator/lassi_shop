import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import { menuData } from '../../data/menu';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { useNavigate } from 'react-router-dom';

const FavoriteDrinks = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  const favoriteItems = menuData.filter(item => wishlist.includes(item.id));

  if (favoriteItems.length === 0) {
    return (
      <div className="p-12 rounded-3xl bg-white/5 border border-white/10 text-center">
        <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">Your wishlist is empty.</p>
        <button 
          onClick={() => navigate('/menu')}
          className="mt-4 text-[var(--color-mango)] font-bold hover:underline"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {favoriteItems.map((drink, index) => (
        <motion.div
          key={drink.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative group rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 h-48"
        >
          {/* Image Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src={drink.image} 
              alt={drink.name}
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 p-6 h-full flex flex-col justify-end">
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => removeFromWishlist(drink.id)}
                className="p-2 rounded-full bg-black/40 backdrop-blur-md text-[var(--color-mango)] border border-white/10 hover:bg-[var(--color-mango)] hover:text-black transition-colors"
              >
                <Heart size={18} fill="currentColor" />
              </button>
            </div>

            <div>
              <h4 className="text-xl font-black text-white mb-1">{drink.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-mango)] font-bold">₹{drink.price.toFixed(2)}</span>
                <button 
                  onClick={() => addItem(drink)}
                  className="flex items-center gap-2 bg-[var(--color-mango)] text-black px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-transform"
                >
                  <Plus size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FavoriteDrinks;
