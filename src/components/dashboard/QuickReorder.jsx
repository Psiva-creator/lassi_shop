import { useState, useEffect } from 'react';
import { RotateCcw, Plus, Loader2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { useCartStore } from '../../store/useCartStore';
import { useNavigate } from 'react-router-dom';

const QuickReorder = () => {
  const { currentUser } = useAuth();
  const { addItem } = useCartStore();
  const navigate = useNavigate();
  const [lastOrder, setLastOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLastOrder = async () => {
      if (currentUser?.id) {
        try {
          const orders = await orderService.getOrdersByUser(currentUser.id);
          if (orders.length > 0) {
            setLastOrder(orders[0]);
          }
        } catch (error) {
          console.error("Failed to fetch last order:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchLastOrder();
  }, [currentUser]);

  const handleReorder = () => {
    if (lastOrder) {
      lastOrder.items.forEach(item => addItem(item));
      // Optionally open cart or show success notification
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 flex justify-center">
        <Loader2 className="w-8 h-8 text-[var(--color-mango)] animate-spin" />
      </div>
    );
  }

  if (!lastOrder) {
    return (
      <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-center">
        <ShoppingBag className="w-10 h-10 text-gray-600 mx-auto mb-4" />
        <p className="text-sm text-gray-400">No previous orders found to reorder.</p>
      </div>
    );
  }

  const primaryItem = lastOrder.items[0];

  return (
    <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10">
          <img src={primaryItem.image} alt={primaryItem.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Last Ordered</p>
          <h4 className="font-bold text-white line-clamp-1">{primaryItem.name}</h4>
          {lastOrder.items.length > 1 && (
            <p className="text-xs text-gray-400">+{lastOrder.items.length - 1} more items</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={handleReorder}
          className="w-full py-4 bg-[var(--color-mango)] text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#ff9c05] transition-colors group"
        >
          <RotateCcw size={18} className="group-hover:rotate-[-45deg] transition-transform" />
          REORDER NOW
        </button>
        
        <button 
          onClick={() => navigate('/menu')}
          className="w-full py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
        >
          <Plus size={18} />
          CUSTOMIZE ORDER
        </button>
      </div>
    </div>
  );
};

export default QuickReorder;
