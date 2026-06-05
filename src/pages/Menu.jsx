import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import { menuService } from '../services/menuService';
import { Loader2 } from 'lucide-react';

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuDataState, setMenuDataState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await menuService.getAllDrinks();
        setMenuDataState(data);
      } catch (err) {
        console.error("Failed to load menu", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadMenu();
  }, []);

  const allCategories = useMemo(() => {
    const cats = ['All', ...new Set(menuDataState.map(d => d.category))];
    return cats;
  }, [menuDataState]);

  const filteredDrinks = useMemo(() => {
    return menuDataState.filter(drink => {
      const matchesSearch = drink.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           drink.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || drink.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, menuDataState]);

  // Group filtered drinks by category
  const categories = useMemo(() => {
    const grouped = filteredDrinks.reduce((acc, drink) => {
      if (!acc[drink.category]) {
        acc[drink.category] = [];
      }
      acc[drink.category].push(drink);
      return acc;
    }, {});
    return Object.entries(grouped);
  }, [filteredDrinks]);

  return (
    <main className="min-h-screen bg-[#050505] w-full overflow-x-hidden text-white pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter"
          >
            THE <span className="text-[var(--color-mango)]">MENU</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 mt-4 text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest"
          >
            Artisanal Beverages & Crafted Blends
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-12 h-12 text-[var(--color-mango)] animate-spin" />
          </div>
        ) : (
          <>
            {/* Search and Filters Bar */}
        <div className="mb-16 space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-[400px] group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--color-mango)] transition-colors" size={20} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your favorite drink..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-white focus:outline-none focus:border-[var(--color-mango)] focus:ring-4 focus:ring-[var(--color-mango)]/10 transition-all placeholder:text-gray-600"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Category Filter Desktop */}
            <div className="hidden lg:flex items-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    selectedCategory === cat 
                      ? 'bg-[var(--color-mango)] text-black shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Category Select Mobile */}
            <div className="lg:hidden w-full relative group">
              <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--color-mango)]" size={18} />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white appearance-none focus:outline-none focus:border-[var(--color-mango)] transition-all uppercase text-xs font-black tracking-widest"
              >
                {allCategories.map(cat => (
                  <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredDrinks.length === 0 ? (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No drinks found</h3>
              <p className="text-gray-500">We couldn't find any results for "{searchQuery}". Try a different term.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="mt-8 text-[var(--color-mango)] font-bold uppercase tracking-widest text-sm hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {categories.map(([categoryName, drinks]) => (
                <div key={categoryName} className="mb-24">
                  <div className="flex items-center gap-6 mb-12">
                    <h2 className="text-3xl font-serif text-white">{categoryName}</h2>
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <span className="text-xs font-black text-gray-600 uppercase tracking-[0.3em]">{drinks.length} Items</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {drinks.map((drink, index) => (
                      <DrinkCard
                        key={drink.id}
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
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
          </>
        )}
      </div>
      
      <Footer />
    </main>
  );
};

export default Menu;
