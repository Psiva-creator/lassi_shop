import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';

const RecentOrders = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser?.id) {
        try {
          const data = await orderService.getOrdersByUser(currentUser.id);
          setOrders(data.slice(0, 3)); // Only show last 3
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-[var(--color-mango)] animate-spin" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-12 rounded-3xl bg-white/5 border border-white/10 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">No orders found yet.</p>
        <button 
          onClick={() => navigate('/menu')}
          className="mt-4 text-[var(--color-mango)] font-bold hover:underline"
        >
          Start ordering
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => navigate(`/orders/${order.id}`)}
          className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--color-mango)]/30 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-mango)]/10 flex items-center justify-center text-[var(--color-mango)] group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-white">#{order.id.slice(-6).toUpperCase()}</h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase text-white ${
                  order.status === 'Delivered' ? 'bg-green-500' : 'bg-[var(--color-mango)]'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex-1 md:mx-12 mb-4 md:mb-0">
            <p className="text-sm text-gray-300 line-clamp-1">
              {order.items.map(item => item.name).join(', ')}
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-8">
            <span className="text-lg font-black text-[var(--color-mango)]">
              ₹{(order.total + (order.tax || 0)).toFixed(2)}
            </span>
            <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecentOrders;
