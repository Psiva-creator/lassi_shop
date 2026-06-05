import { motion } from 'framer-motion';
import { Award, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoyaltyCard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const points = currentUser?.loyalty?.points || 0;
  const tier = currentUser?.loyalty?.tier || 'Bronze';
  
  // Tier thresholds
  const nextTier = tier === 'Bronze' ? 'Silver' : tier === 'Silver' ? 'Gold' : 'Platinum';
  const target = tier === 'Bronze' ? 500 : tier === 'Silver' ? 1500 : 3000;
  
  const progress = Math.min((points / target) * 100, 100);

  return (
    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-mango)] to-orange-600 text-black relative overflow-hidden shadow-[0_20px_40px_rgba(255,155,5,0.2)]">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 opacity-10">
        <Award size={200} className="-mr-12 -mt-12" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-8 bg-black/10 w-fit px-4 py-1 rounded-full text-sm font-bold uppercase">
          <Award size={16} />
          {tier} MEMBER
        </div>

        <div className="mb-8">
          <p className="text-black/70 font-bold text-sm uppercase tracking-wider mb-1">Your Balance</p>
          <h3 className="text-5xl font-black">{points} <span className="text-3xl">PTS</span></h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <p className="text-sm font-bold">
              {points >= target ? `You've reached ${tier}!` : `${target - points} points to ${nextTier}!`}
            </p>
            <p className="text-xs font-bold opacity-70">{progress.toFixed(0)}%</p>
          </div>
          
          <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-black"
            />
          </div>
        </div>

        <button onClick={() => navigate('/menu')} className="mt-8 w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95">
          <Zap size={18} fill="currentColor" />
          REDEEM POINTS
        </button>
      </div>
    </div>
  );
};

export default LoyaltyCard;
