import { motion } from 'framer-motion';
import { Gift, Coffee, Percent, Tag, Loader2 } from 'lucide-react';
import { useState } from 'react';

const RedeemSection = ({ points, onRedeem }) => {
  const [redeemingId, setRedeemingId] = useState(null);

  const rewards = [
    { id: 1, name: 'Free Mango Lassi', points: 1000, icon: Coffee, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 2, name: '50% Discount Voucher', points: 2500, icon: Percent, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 3, name: 'Premium Cup Holder', points: 500, icon: Tag, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 4, name: 'Mystery Gift Box', points: 5000, icon: Gift, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  ];

  const handleRedeem = async (reward) => {
    if (points < reward.points) return;
    setRedeemingId(reward.id);
    try {
      await onRedeem(reward.points, 'redeem', `Redeemed ${reward.name}`);
    } catch (error) {
      console.error(error);
    } finally {
      setRedeemingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Exclusive <span className="text-[var(--color-mango)] italic font-light">Rewards</span></h3>
        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Spend your points</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((reward) => (
          <motion.div 
            key={reward.id}
            whileHover={{ y: -5 }}
            className={`p-6 rounded-3xl border border-white/5 transition-all bg-white/5 flex items-center justify-between ${points < reward.points ? 'opacity-50' : 'hover:border-white/20 hover:bg-white/10'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${reward.bg} ${reward.color} flex items-center justify-center`}>
                <reward.icon size={28} />
              </div>
              <div>
                <h4 className="font-bold text-white">{reward.name}</h4>
                <p className={`text-sm font-black ${reward.color}`}>{reward.points} PTS</p>
              </div>
            </div>
            
            <button 
              onClick={() => handleRedeem(reward)}
              disabled={points < reward.points || redeemingId !== null}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                points < reward.points 
                  ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-[var(--color-mango)] active:scale-95'
              }`}
            >
              {redeemingId === reward.id ? <Loader2 className="animate-spin" size={16} /> : 'Redeem'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RedeemSection;
