import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { Clock, ArrowRight, Loader2 } from 'lucide-react';

const Orders = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrdersByUser(currentUser.id);
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, isAuthenticated, navigate]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] w-full text-white pt-24 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-white mb-4"
          >
            Order <span className="text-[var(--color-mango)] italic font-light">History</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg font-light"
          >
            Track and review your premium beverage experiences.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-[var(--color-mango)] animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#111] border border-white/5 rounded-2xl p-12 text-center">
            <Clock className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">No orders yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't placed any orders. Discover our crafted beverages and elevate your senses today.
            </p>
            <Link to="/menu" className="inline-block bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black font-semibold px-8 py-3 rounded-full transition-transform hover:scale-105">
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={order.id}
                className="bg-[#111] hover:bg-[#151515] border border-white/5 hover:border-white/10 rounded-2xl p-6 md:p-8 transition-colors group flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm text-gray-500 font-mono">#{order.id.toUpperCase()}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                      order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-[var(--color-mango)]/10 text-[var(--color-mango)]'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-300 font-medium mb-1">
                    {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-8">
                  <p className="text-2xl font-bold text-white font-serif">
                    ${(order.total + order.tax).toFixed(2)}
                  </p>
                  <Link 
                    to={`/orders/${order.id}`}
                    className="flex items-center gap-2 text-sm text-[var(--color-mango)] hover:text-white transition-colors"
                  >
                    Track Order <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Orders;
