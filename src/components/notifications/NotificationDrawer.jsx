import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle2 } from 'lucide-react';
import { useNotificationStore } from '../../store/useNotificationStore';
import NotificationCard from './NotificationCard';

const NotificationDrawer = () => {
  const { isOpen, closeDrawer, notifications, markAllAsRead, getUnreadCount } = useNotificationStore();
  const unreadCount = getUnreadCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Bell className="text-[var(--color-mango)]" />
                <h2 className="text-xl font-bold text-white font-serif">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="bg-[var(--color-mango)]/20 text-[var(--color-mango)] text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Actions */}
            {notifications.length > 0 && (
              <div className="px-6 py-3 border-b border-white/5 flex justify-end bg-[#111]">
                <button 
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="text-sm font-medium text-gray-400 hover:text-[var(--color-mango)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Mark all as read
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {notifications.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center opacity-50 pt-20"
                  >
                    <Bell size={64} className="mb-4 text-gray-500" />
                    <p className="text-xl font-medium text-white mb-2">All caught up!</p>
                    <p className="text-sm text-gray-400">You have no new notifications.</p>
                  </motion.div>
                ) : (
                  notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    >
                      <NotificationCard notification={notif} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationDrawer;
