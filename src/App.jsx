import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import DrinkDetails from './pages/DrinkDetails';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import EventServices from './pages/EventServices';
import { Login, Register, CartPage, NotificationsPage, StallBooking, Locations, Careers, Privacy, Terms } from './pages/Placeholders';
import Orders from './pages/Orders';
import OrderTracking from './pages/OrderTracking';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import CartDrawer from './components/cart/CartDrawer';
import NotificationDrawer from './components/notifications/NotificationDrawer';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDrinks from './pages/admin/AdminDrinks';
import AdminOrders from './pages/admin/AdminOrders';
import AdminEvents from './pages/admin/AdminEvents';
import AdminUsers from './pages/admin/AdminUsers';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<DrinkDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/events" element={<EventServices />} />
        <Route path="/stall-booking" element={<StallBooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderTracking />} />
        <Route path="/wishlist" element={<Wishlist />} />
        
        {/* Company Routes */}
        <Route path="/locations" element={<Locations />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="drinks" element={<AdminDrinks />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartDrawer />
      <NotificationDrawer />
    </Router>
    </AuthProvider>
  );
}

export default App;
