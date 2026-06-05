import { useState } from 'react';
import { Bell, Lock, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AccountSettings = ({ user, onUpdateSettings }) => {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(user?.settings?.notifications ?? true);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleNotifications = async () => {
    setIsUpdating(true);
    try {
      await onUpdateSettings({ notifications: !notifications });
      setNotifications(!notifications);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl space-y-8"
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">Account Settings</h3>
        <p className="text-gray-400">Manage your account preferences and security.</p>
      </div>

      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Bell size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">Push Notifications</h4>
              <p className="text-sm text-gray-400">Receive alerts for orders and offers.</p>
            </div>
          </div>
          <button 
            onClick={handleToggleNotifications}
            disabled={isUpdating}
            className={`w-14 h-8 rounded-full transition-colors relative ${notifications ? 'bg-[var(--color-mango)]' : 'bg-gray-700'}`}
          >
            <motion.div 
              animate={{ x: notifications ? 28 : 4 }}
              className="w-6 h-6 bg-white rounded-full absolute top-1"
            />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Lock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">Password & Security</h4>
              <p className="text-sm text-gray-400">Change your password and secure your account.</p>
            </div>
          </div>
          <button className="text-[var(--color-mango)] hover:underline font-medium text-sm">
            Change
          </button>
        </div>

        <div className="pt-8 border-t border-white/10">
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold transition-colors"
          >
            <LogOut size={20} />
            Sign Out from all devices
          </button>
        </div>
      </div>
      
      <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
        <h4 className="font-bold text-red-500 mb-2">Danger Zone</h4>
        <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-2 rounded-xl border border-red-500/30 transition-all font-bold">
          Delete Account
        </button>
      </div>
    </motion.div>
  );
};

export default AccountSettings;
