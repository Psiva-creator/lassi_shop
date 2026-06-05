import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, MapPin, Edit3, ChevronRight, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileOverview from '../components/profile/ProfileOverview';
import EditProfileForm from '../components/profile/EditProfileForm';
import AddressManager from '../components/profile/AddressManager';
import AccountSettings from '../components/profile/AccountSettings';
import LoyaltyCard from '../components/loyalty/LoyaltyCard';
import RedeemSection from '../components/loyalty/RedeemSection';
import LoyaltyHistory from '../components/loyalty/LoyaltyHistory';

const Profile = () => {
  const { currentUser, isAuthenticated, updateProfile, addAddress, removeAddress, updateSettings, updateLoyaltyPoints } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!currentUser) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'loyalty', label: 'Loyalty', icon: Award },
    { id: 'edit', label: 'Edit Profile', icon: Edit3 },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProfileOverview user={currentUser} />;
      case 'loyalty':
        return (
          <div className="space-y-12">
            <LoyaltyCard loyalty={currentUser.loyalty} />
            <RedeemSection points={currentUser.loyalty.points} onRedeem={updateLoyaltyPoints} />
            <LoyaltyHistory history={currentUser.loyalty.history} />
          </div>
        );
      case 'edit':
        return <EditProfileForm user={currentUser} onUpdate={updateProfile} />;
      case 'addresses':
        return <AddressManager user={currentUser} onAdd={addAddress} onRemove={removeAddress} />;
      case 'settings':
        return <AccountSettings user={currentUser} onUpdateSettings={updateSettings} />;
      default:
        return <ProfileOverview user={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--color-mango)] selection:text-black">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-32 space-y-2">
              <h1 className="text-4xl font-black mb-8 tracking-tighter">
                MY <span className="text-[var(--color-mango)]">ACCOUNT</span>
              </h1>
              
              <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 text-left min-w-max lg:min-w-0 ${
                      activeTab === tab.id
                        ? 'bg-[var(--color-mango)] text-black font-bold shadow-[0_0_20px_rgba(255,155,5,0.2)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="hidden md:block lg:block">{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight size={18} className="ml-auto hidden lg:block" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="lg:w-3/4 min-h-[600px]">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-mango)]/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
