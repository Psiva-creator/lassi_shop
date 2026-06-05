import React from 'react';
import { Package, Tag, Star, Bell, X } from 'lucide-react';
import { useNotificationStore } from '../../store/useNotificationStore';

const ICONS = {
  ORDER: Package,
  PROMO: Tag,
  REWARD: Star,
  SYSTEM: Bell,
};

const NotificationCard = ({ notification }) => {
  const { markAsRead, deleteNotification } = useNotificationStore();
  const Icon = ICONS[notification.type] || Bell;
  
  return (
    <div 
      className={`relative p-4 rounded-xl border transition-all cursor-pointer hover:border-white/20 ${
        notification.isRead 
          ? 'bg-[#111] border-white/5 opacity-70 hover:opacity-100' 
          : 'bg-[#1a1a1a] border-[var(--color-mango)]/30 shadow-[0_0_15px_rgba(255,165,0,0.05)]'
      }`}
      onClick={() => !notification.isRead && markAsRead(notification.id)}
    >
      {!notification.isRead && (
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--color-mango)] animate-pulse"></div>
      )}
      
      <div className="flex gap-4">
        <div className={`mt-1 shrink-0 ${notification.isRead ? 'text-gray-500' : 'text-[var(--color-mango)]'}`}>
          <Icon size={20} />
        </div>
        
        <div className="flex-1 pr-6">
          <h4 className={`font-semibold text-sm mb-1 ${notification.isRead ? 'text-gray-300' : 'text-white'}`}>
            {notification.title}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            {notification.message}
          </p>
          <span className="text-xs text-gray-500 font-medium">
            {new Date(notification.createdAt).toLocaleString(undefined, { 
              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
            })}
          </span>
        </div>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          deleteNotification(notification.id);
        }}
        className="absolute bottom-4 right-4 text-gray-500 hover:text-red-400 transition-colors p-1"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default NotificationCard;
