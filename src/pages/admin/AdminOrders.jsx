import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { orderService } from '../../services/orderService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let pollInterval;

    const fetchOrders = async () => {
      try {
        const data = await orderService.getAllOrders();
        if (isMounted) setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchOrders();

    // Poll for live order updates since our mock service runs in background
    pollInterval = setInterval(fetchOrders, 3000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  if (isLoading) {
    return <div className="text-gray-400">Loading orders...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-white">Manage Orders</h1>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        {/* Mobile View: Cards */}
        <div className="md:hidden">
          {orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No orders found.</div>
          ) : (
            <div className="divide-y divide-white/10">
              {orders.map((order) => (
                <div key={order.id} className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-gray-300">#{order.id.toUpperCase()}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                      order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-[var(--color-mango)]/10 text-[var(--color-mango)]'
                    }`}>
                      {order.status !== 'Delivered' && <Loader2 size={10} className="mr-1 animate-spin" />}
                      {order.status}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {new Date(order.createdAt).toLocaleString(undefined, { 
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                    })}
                  </div>
                  <div className="text-white text-sm">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                  <div className="text-[var(--color-mango)] font-bold">
                    ₹{(order.total + order.tax).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/50">
                <th className="p-4 text-gray-400 font-medium">Order ID</th>
                <th className="p-4 text-gray-400 font-medium">Date</th>
                <th className="p-4 text-gray-400 font-medium">Items</th>
                <th className="p-4 text-gray-400 font-medium">Total</th>
                <th className="p-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-sm text-gray-300">#{order.id.toUpperCase()}</td>
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(order.createdAt).toLocaleString(undefined, { 
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </td>
                    <td className="p-4 text-white text-sm">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </td>
                    <td className="p-4 text-white font-medium">
                      ₹{(order.total + order.tax).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-[var(--color-mango)]/10 text-[var(--color-mango)]'
                      }`}>
                        {order.status !== 'Delivered' && <Loader2 size={10} className="mr-1 animate-spin" />}
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
