import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { isOpen, closeCart, items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const total = getCartTotal();
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      closeCart();
      navigate('/auth');
      return;
    }
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[var(--color-mango)]" />
                <h2 className="text-xl font-bold text-white font-serif">Your Cart</h2>
              </div>
              <button
                onClick={closeCart}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag size={64} className="mb-4 text-gray-500" />
                  <p className="text-xl font-medium text-white mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Discover our premium crafted beverages.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-[#111] p-4 rounded-xl border border-white/5">
                    {/* Item Image */}
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-black shrink-0 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h4 className="text-white font-medium leading-tight mb-1">{item.name}</h4>
                        <div className="text-right">
                          <p className="text-[var(--color-mango)] font-bold">
                            ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-black rounded-lg border border-white/10 overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-white">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-gray-500 hover:text-red-400 underline transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#111]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-4">
                    <span>Tax (8%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-xl mb-6">
                    <span>Total</span>
                    <span className="text-[var(--color-mango)]">₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
