import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import OTPForm from '../components/auth/OTPForm';

const Auth = ({ initialView = 'login' }) => {
  const [view, setView] = useState(initialView); // login, register, forgot, otp
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginForm onNavigate={setView} />;
      case 'register':
        return <RegisterForm onNavigate={setView} />;
      case 'forgot':
        return <ForgotPasswordForm onNavigate={setView} />;
      case 'otp':
        return <OTPForm onNavigate={setView} />;
      default:
        return <LoginForm onNavigate={setView} />;
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex w-full">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-mango)_0%,_transparent_60%)] opacity-10 z-0"></div>
        <img 
          src="/frames/ezgif-frame-090.jpg" 
          alt="Premium Beverage" 
          className="w-full h-full object-cover opacity-50 z-10 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#0a0a0a] z-20 pointer-events-none"></div>
        
        <div className="absolute z-30 p-16 text-left self-end bottom-0 left-0">
          <Link to="/" className="text-3xl font-bold text-white tracking-wider flex items-center gap-2 mb-10 hover:opacity-80 transition-opacity">
            <span className="text-[var(--color-mango)]">FreshSip</span> Café
          </Link>
          <h2 className="text-4xl xl:text-6xl font-bold text-white mb-6 font-serif leading-tight">
            Elevate your <br/> <span className="text-[var(--color-mango)] italic font-light">senses.</span>
          </h2>
          <p className="text-xl text-gray-300 font-light max-w-md">
            Join our exclusive community to experience premium crafted beverages delivered to your door.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 relative overflow-y-auto">
        <Link to="/" className="lg:hidden absolute top-8 left-8 text-2xl font-bold text-white tracking-wider flex items-center gap-2">
          <span className="text-[var(--color-mango)]">FreshSip</span>
        </Link>
        
        <div className="w-full max-w-md relative z-10 pt-16 lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Auth;
