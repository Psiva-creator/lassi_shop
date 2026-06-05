import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, TrendingUp, Clock, ChevronRight, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/dashboard/StatCard';
import LoyaltyCard from '../components/dashboard/LoyaltyCard';
import RecentOrders from '../components/dashboard/RecentOrders';
import FavoriteDrinks from '../components/dashboard/FavoriteDrinks';
import QuickReorder from '../components/dashboard/QuickReorder';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orderStats, setOrderStats] = useState({ total: 0, frequency: '0/wk' });

  useEffect(() => {
    const fetchStats = async () => {
      if (currentUser?.id) {
        const orders = await orderService.getOrdersByUser(currentUser.id);
        setOrderStats({
          total: orders.length,
          frequency: orders.length > 0 ? `${(orders.length / 4).toFixed(1)}/wk` : '0/wk'
        });
      }
    };
    fetchStats();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--color-mango)] selection:text-black">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black tracking-tighter mb-2"
          >
            WELCOME BACK, <span className="text-[var(--color-mango)]">{currentUser?.name?.toUpperCase() || 'GUEST'}</span>
          </motion.h1>
          <p className="text-gray-400 text-lg">Here's what's happening with your account today.</p>
        </header>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Orders" 
            value={orderStats.total.toString()} 
            icon={ShoppingBag} 
            trend="All time"
            color="mango"
          />
          <StatCard 
            title="Reward Points" 
            value={currentUser?.loyalty?.points?.toString() || '0'} 
            icon={Star} 
            trend={`Tier: ${currentUser?.loyalty?.tier || 'Bronze'}`}
            color="orange"
          />
          <StatCard 
            title="Favorite Category" 
            value="Lassis" 
            icon={TrendingUp} 
            trend="Based on orders"
            color="yellow"
          />
          <StatCard 
            title="Avg. Frequency" 
            value={orderStats.frequency} 
            icon={Clock} 
            trend="Orders per week"
            color="mango"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Clock className="text-[var(--color-mango)]" />
                  Recent Orders
                </h2>
                <button 
                  onClick={() => navigate('/orders')}
                  className="text-sm text-gray-400 hover:text-[var(--color-mango)] flex items-center gap-1 transition-colors"
                >
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <RecentOrders />
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Star className="text-[var(--color-mango)]" />
                  Favorite Drinks
                </h2>
                <button 
                  onClick={() => navigate('/menu')}
                  className="text-sm text-gray-400 hover:text-[var(--color-mango)] flex items-center gap-1 transition-colors"
                >
                  Explore Menu <ChevronRight size={16} />
                </button>
              </div>
              <FavoriteDrinks />
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Star className="text-[var(--color-mango)]" />
                Loyalty Status
              </h2>
              <LoyaltyCard />
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="text-[var(--color-mango)]" />
                Quick Reorder
              </h2>
              <QuickReorder />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
