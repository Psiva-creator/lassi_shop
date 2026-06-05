import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Receipt, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderTimeline from '../components/orders/OrderTimeline';
import { orderService } from '../services/orderService';
import { useAuth } from '../context/AuthContext';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useAuth();
  
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    let isMounted = true;
    let pollInterval;

    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrderById(id);
        if (!data) {
          if (isMounted) setError('Order not found.');
        } else {
          if (isMounted) setOrder(data);
          
          // Poll every 2 seconds to get status updates from the mock service
          if (data.status !== "Delivered" && !pollInterval) {
            pollInterval = setInterval(async () => {
              const freshData = await orderService.getOrderById(id);
              if (isMounted && freshData) setOrder({ ...freshData });
              if (freshData && freshData.status === "Delivered") {
                clearInterval(pollInterval);
              }
            }, 2000);
          }
        }
      } catch {
        if (isMounted) setError('Failed to load order tracking details.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchOrder();

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [id, isAuthenticated, navigate]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] w-full text-white pt-24 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <Link 
          to="/orders"
          className="text-gray-400 hover:text-[var(--color-mango)] transition-colors mb-8 flex items-center text-sm font-medium w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
        </Link>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-10 h-10 text-[var(--color-mango)] animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-6 rounded-2xl text-center">
            <p className="text-lg font-semibold">{error}</p>
          </div>
        ) : order && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-tight text-white mb-2">
                Order <span className="text-[var(--color-mango)] italic font-light">#{order.id.toUpperCase()}</span>
              </h1>
              <p className="text-gray-400">
                Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Live Tracking Timeline */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-mango)]/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="text-xl font-semibold text-white mb-2 relative z-10">Live Tracking</h3>
              <p className="text-gray-400 text-sm mb-8 relative z-10">Your order status updates automatically in real-time.</p>
              
              <OrderTimeline currentStatus={order.status} timelineData={order.timeline} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <Receipt className="text-[var(--color-mango)]" />
                  <h3 className="text-xl font-semibold text-white">Order Summary</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg pt-2 mt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>${(order.total + order.tax).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <MapPin className="text-[var(--color-mango)]" />
                  <h3 className="text-xl font-semibold text-white">Pickup / Delivery</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">Customer</h4>
                    <p className="text-white font-medium text-lg">{currentUser?.name}</p>
                    <p className="text-gray-400">{currentUser?.email}</p>
                    <p className="text-gray-400">{currentUser?.phone || 'No phone provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">Status</h4>
                    <p className="text-[var(--color-mango)] font-medium text-lg">{order.status}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">Payment Method</h4>
                    <p className="text-white font-medium">{order.paymentMethod || 'Not specified'}</p>
                    <p className="text-xs text-gray-500 mt-1">Status: <span className={order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-yellow-500'}>{order.paymentStatus || 'Pending'}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default OrderTracking;
