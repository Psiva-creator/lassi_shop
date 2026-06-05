import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, User, ShoppingBag, Bell, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/useCartStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { useWishlistStore } from '../store/useWishlistStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { getItemCount } = useCartStore();
  const { getUnreadCount } = useNotificationStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  
  const cartItemCount = getItemCount();
  const unreadNotifCount = getUnreadCount();
  const wishlistCount = getWishlistCount();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/#about' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
          <span className="text-[var(--color-mango)]">FreshSip</span> Café
        </div>

        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-gray-300 hover:text-[var(--color-mango)] font-medium transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/menu" className="bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black font-semibold px-6 py-2 rounded-full transition-transform duration-300 hover:scale-105 shadow-[0_0_15px_rgba(255,155,5,0.3)]">
            Order Now
          </Link>
          
          <div className="flex items-center gap-6 pl-4 border-l border-white/20">
            {/* Wishlist Icon */}
            {isAuthenticated && (
              <Link to="/wishlist" className="relative text-gray-300 hover:text-white transition-colors">
                <Heart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-mango)] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Notification Icon */}
            {isAuthenticated && (
              <Link to="/notifications" className="relative text-gray-300 hover:text-white transition-colors">
                <Bell size={22} />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-mango)] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadNotifCount}
                  </span>
                )}
              </Link>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors">
              <ShoppingBag size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-mango)] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth State */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile" 
                  className="text-white font-medium hover:text-[var(--color-mango)] transition-colors flex items-center gap-2 group"
                >
                  <div className="flex flex-col items-end mr-1">
                    <span className="text-white group-hover:text-[var(--color-mango)] transition-colors">{currentUser?.name}</span>
                    <span className="text-[10px] text-[var(--color-mango)] font-black uppercase tracking-widest leading-none">
                      {currentUser?.loyalty?.points} PTS
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--color-mango)] flex items-center justify-center text-black text-xs font-bold shadow-[0_0_10px_rgba(255,155,5,0.4)]">
                    {currentUser?.name?.[0].toUpperCase()}
                  </div>
                </Link>
                <div className="flex items-center gap-4 border-l border-white/20 pl-4">
                  <Link 
                    to="/admin"
                    className="text-[var(--color-mango)] hover:text-white font-semibold text-sm transition-colors border-r border-white/20 pr-4"
                  >
                    Admin
                  </Link>
                  <Link 
                    to="/orders"
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    Orders
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-gray-400 hover:text-white text-sm transition-colors border-l border-white/20 pl-4"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/auth"
                className="flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-colors"
              >
                <User size={20} />
                Sign In
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          {/* Mobile Notification Icon */}
          {isAuthenticated && (
            <Link to="/notifications" className="relative text-white hover:text-[var(--color-mango)] transition-colors">
              <Bell size={24} />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-mango)] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadNotifCount}
                </span>
              )}
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="text-white hover:text-[var(--color-mango)] transition-colors relative"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon size={28} />
            {!mobileMenuOpen && cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-mango)] text-black text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80vw] max-w-sm bg-[#111] border-l border-white/10 z-50 overflow-y-auto md:hidden shadow-2xl"
            >
              <div className="flex justify-end p-6 border-b border-white/10">
                <button
                  className="text-white hover:text-[var(--color-mango)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={28} />
                </button>
              </div>
              <div className="p-6 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl text-gray-300 hover:text-[var(--color-mango)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile Cart Option */}
              <Link 
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-xl text-gray-300 hover:text-white transition-colors"
              >
                <div className="relative">
                  <ShoppingBag size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--color-mango)] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                Your Cart
              </Link>

              <Link to="/menu" onClick={() => setMobileMenuOpen(false)} className="bg-[var(--color-mango)] text-black text-center font-semibold px-6 py-3 rounded-full mt-4 w-full text-lg">
                Order Now
              </Link>
              {/* Mobile Auth */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
                  <Link 
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-white group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--color-mango)] flex items-center justify-center text-black font-bold">
                      {currentUser?.name?.[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-medium group-hover:text-[var(--color-mango)] transition-colors">{currentUser?.name}</span>
                      <span className="text-sm text-gray-500">Manage Profile</span>
                    </div>
                  </Link>
                  <Link 
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-[var(--color-mango)] transition-colors text-lg"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[var(--color-mango)] hover:text-white transition-colors text-lg font-semibold"
                  >
                    Admin Portal
                  </Link>
                  <Link 
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white transition-colors text-lg"
                  >
                    Order History
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }} 
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="pt-4 border-t border-white/10 flex items-center gap-3 text-xl text-gray-300 hover:text-white transition-colors"
                >
                  <User size={24} />
                  Sign In / Register
                </Link>
              )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
