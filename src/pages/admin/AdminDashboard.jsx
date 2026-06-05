import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Users, Activity } from 'lucide-react';
import { orderService } from '../../services/orderService';
import { authService } from '../../services/authService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    activeOrders: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [orders, users] = await Promise.all([
          orderService.getAllOrders(),
          authService.getAllUsers()
        ]);

        const revenue = orders.reduce((sum, order) => sum + order.total + order.tax, 0);
        const activeOrders = orders.filter(o => o.status !== 'Delivered').length;

        setStats({
          revenue,
          orders: orders.length,
          users: users.length,
          activeOrders
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `₹${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Total Orders', value: stats.orders, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Active Orders', value: stats.activeOrders, icon: Activity, color: 'text-[var(--color-mango)]', bg: 'bg-[var(--color-mango)]/10' },
    { title: 'Total Users', value: stats.users, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  if (isLoading) {
    return <div className="text-gray-400">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-serif mb-8 text-white">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div 
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-white">{card.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="text-center text-gray-500 py-12">
          <Activity size={48} className="mx-auto mb-4 opacity-50" />
          <p>More detailed analytics and charts coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
