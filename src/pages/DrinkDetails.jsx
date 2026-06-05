import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ShoppingBag, Plus, Minus, Star, Info, Droplet, Flame, Wheat } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import { CanvasFramePlayer } from '../components/CanvasFramePlayer';
import { menuData } from '../data/menu';
import { useCartStore } from '../store/useCartStore';

const DrinkDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('ingredients');

  const drink = useMemo(() => menuData.find(d => d.id === id), [id]);
  
  const relatedDrinks = useMemo(() => {
    if (!drink) return [];
    return menuData
      .filter(d => d.category === drink.category && d.id !== drink.id)
      .slice(0, 3);
  }, [drink]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!drink) {
      // Small delay to allow potential data loading if this were real
      const timer = setTimeout(() => {
        if (!drink) navigate('/menu');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [drink, navigate]);

  if (!drink) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: drink.id,
        name: drink.name,
        price: drink.price,
        image: drink.image
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[var(--color-mango)] selection:text-black">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Breadcrumbs & Back Button */}
        <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
          <Link 
            to="/menu" 
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-[var(--color-mango)] group-hover:text-black transition-all">
              <ChevronLeft size={20} />
            </div>
            <span className="font-medium">Back to Menu</span>
          </Link>
          <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold hidden md:block">
            Premium Selection / {drink.category}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden bg-black aspect-[4/5] lg:aspect-auto lg:h-[700px] border border-white/10 group"
          >
            {drink.hoverFrames ? (
              <div className="w-full h-full">
                <CanvasFramePlayer 
                  frameIndex={drink.idleFrame || 1} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-1000" 
                />
              </div>
            ) : (
              <img 
                src={drink.image} 
                alt={drink.name} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
              />
            )}
            
            {/* Visual Accents */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
            <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-[var(--color-mango)]">
              <Star size={24} fill="currentColor" />
            </div>
          </motion.div>

          {/* Right Side: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col h-full py-4"
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1 rounded-full bg-[var(--color-mango)]/10 text-[var(--color-mango)] text-xs font-black uppercase tracking-widest border border-[var(--color-mango)]/20">
                  {drink.category}
                </span>
                <div className="flex gap-1 text-[var(--color-mango)]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none">
                {drink.name}
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                {drink.description}
              </p>
            </div>

            {/* Price & Quantity */}
            <div className="flex flex-wrap items-center gap-8 mb-12 py-8 border-y border-white/10">
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">Price</p>
                <div className="text-4xl font-serif text-[var(--color-mango)]">
                  ${drink.price.toFixed(2)}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">Quantity</p>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center text-xl font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs: Ingredients / Nutrition */}
            <div className="mb-12">
              <div className="flex gap-8 border-b border-white/5 mb-6">
                <button 
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'ingredients' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Ingredients
                  {activeTab === 'ingredients' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-mango)]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('nutrition')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'nutrition' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Nutrition
                  {activeTab === 'nutrition' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-mango)]" />}
                </button>
              </div>

              <div className="min-h-[120px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'ingredients' ? (
                    <motion.div 
                      key="ingredients"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-wrap gap-3"
                    >
                      {drink.ingredients?.map((ing, i) => (
                        <span key={i} className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300 text-sm hover:border-[var(--color-mango)]/30 transition-colors">
                          {ing}
                        </span>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="nutrition"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
                        <Flame size={18} className="text-orange-500" />
                        <span className="text-xl font-bold">{drink.nutrition?.calories}</span>
                        <span className="text-[10px] uppercase text-gray-500 font-black">Calories</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
                        <Wheat size={18} className="text-yellow-500" />
                        <span className="text-xl font-bold">{drink.nutrition?.protein}</span>
                        <span className="text-[10px] uppercase text-gray-500 font-black">Protein</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
                        <Droplet size={18} className="text-blue-500" />
                        <span className="text-xl font-bold">{drink.nutrition?.carbs}</span>
                        <span className="text-[10px] uppercase text-gray-500 font-black">Carbs</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-1">
                        <Info size={18} className="text-green-500" />
                        <span className="text-xl font-bold">{drink.nutrition?.fat}</span>
                        <span className="text-[10px] uppercase text-gray-500 font-black">Fat</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-8 flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(255,155,5,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Drinks Section */}
        {relatedDrinks.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mt-32">
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-3xl font-serif text-white">Related <span className="text-[var(--color-mango)] italic font-light">Drinks</span></h2>
              <div className="h-px bg-white/10 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {relatedDrinks.map((d, i) => (
                <DrinkCard 
                  key={d.id}
                  id={d.id}
                  name={d.name}
                  description={d.description}
                  price={`$${d.price.toFixed(2)}`}
                  image={d.image}
                  hoverFrames={d.hoverFrames}
                  idleFrame={d.idleFrame}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DrinkDetails;
