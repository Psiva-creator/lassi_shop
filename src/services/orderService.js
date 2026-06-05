const STATUS_FLOW = ["Pending", "Confirmed", "Preparing", "Ready", "Delivered"];
import { useNotificationStore } from '../store/useNotificationStore';

const getOrders = () => {
  try {
    const str = localStorage.getItem('freshsip_orders');
    return str ? JSON.parse(str) : [];
  } catch {
    return [];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem('freshsip_orders', JSON.stringify(orders));
};

// Simulate time passing and status updating
const advanceOrderStatus = (orderId) => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(o => o.id === orderId);
  if (orderIndex === -1) return;

  const order = orders[orderIndex];
  const currentStatusIndex = STATUS_FLOW.indexOf(order.status);
  
  if (currentStatusIndex < STATUS_FLOW.length - 1) {
    order.status = STATUS_FLOW[currentStatusIndex + 1];
    order.timeline.push({
      status: order.status,
      timestamp: new Date().toISOString()
    });
    saveOrders(orders);

    // Dispatch notification
    useNotificationStore.getState().addNotification({
      type: 'ORDER',
      title: `Order ${order.status}`,
      message: `Your order #${order.id.toUpperCase()} is now ${order.status.toLowerCase()}.`
    });

    // Schedule next update randomly between 5-10 seconds for quick UI simulation
    if (order.status !== "Delivered") {
      const delay = Math.floor(Math.random() * 5000) + 5000;
      setTimeout(() => advanceOrderStatus(orderId), delay);
    }
  }
};

// Auto-resume simulations for any incomplete orders on load
const resumeSimulations = () => {
  const orders = getOrders();
  orders.forEach(order => {
    if (order.status !== "Delivered") {
      // Pick up where it left off, but wait a few seconds first
      setTimeout(() => advanceOrderStatus(order.id), 5000);
    }
  });
};

// Run this once when the service is imported
resumeSimulations();

export const orderService = {
  createOrder: async (userId, items, total, tax, paymentMethod = 'COD') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newOrder = {
      id: "ord_" + Math.random().toString(36).substr(2, 9),
      userId: userId || 'guest',
      items,
      total,
      tax,
      status: "Pending",
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      paymentMethod,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: "Pending",
          timestamp: new Date().toISOString()
        }
      ]
    };

    const orders = getOrders();
    orders.push(newOrder);
    saveOrders(orders);

    // Start simulation loop (advance first step after 5 seconds)
    setTimeout(() => advanceOrderStatus(newOrder.id), 5000);

    return newOrder;
  },

  getOrdersByUser: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const allOrders = getOrders();
    return allOrders.filter(o => o.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getAllOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const allOrders = getOrders();
    return allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getOrderById: async (orderId) => {
    // Polled by the UI to get latest state
    return getOrders().find(o => o.id === orderId) || null;
  }
};
