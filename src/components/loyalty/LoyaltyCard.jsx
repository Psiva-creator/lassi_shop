import { motion } from 'framer-motion';
import { Award, TrendingUp, ShieldCheck } from 'lucide-react';

const LoyaltyCard = ({ loyalty }) => {
  const { points, tier } = loyalty;
  
  const tiers = [
    { name: 'Bronze', min: 0, max: 500, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
    { name: 'Silver', min: 501, max: 1500, color: 'text-gray-300', bg: 'bg-gray-300/10', border: 'border-gray-300/20' },
    { name: 'Gold', min: 1501, max: 3000, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
    { name: 'Platinum', min: 3001, max: 10000, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  ];

  const currentTierData = tiers.find(t => t.name === tier) || tiers[0];
  const nextTierData = tiers[tiers.indexOf(currentTierData) + 1];
  
  const progress = nextTierData 
    ? ((points - currentTierData.min) / (nextTierData.min - currentTierData.min)) * 100 
    : 100;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 relative overflow-hidden shadow-2xl"
    >
      {/* Decorative Glow */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 ${currentTierData.bg}`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${currentTierData.bg} ${currentTierData.color} ${currentTierData.border} text-xs font-black uppercase tracking-widest mb-4`}>
              <Award size={14} />
              {tier} Member
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter">
              {points.toLocaleString()} <span className="text-[var(--color-mango)]">PTS</span>
            </h2>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-mango)] shadow-inner">
            <TrendingUp size={32} />
          </div>
        </div>

        {nextTierData && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
              <span className="text-gray-500">Progress to {nextTierData.name}</span>
              <span className="text-white">{Math.floor(nextTierData.min - points)} pts left</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-[var(--color-mango)] to-orange-500 rounded-full"
              />
            </div>
          </div>
        )}

        {!nextTierData && (
          <div className="flex items-center gap-3 text-green-400 bg-green-400/5 p-4 rounded-2xl border border-green-400/10">
            <ShieldCheck size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">You have reached the highest tier!</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-12">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Benefits</p>
            <p className="text-sm text-white font-bold">1.5x Points Multiplier</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Status</p>
            <p className="text-sm text-white font-bold">Active Premium</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoyaltyCard;
