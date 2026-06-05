import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

const LoyaltyHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="p-12 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
        <Clock size={48} className="mx-auto mb-4 text-gray-700" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No points history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Points <span className="text-[var(--color-mango)]">Log</span></h3>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Last 10 transactions</span>
      </div>

      <div className="space-y-3">
        {history.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                item.type === 'earn' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {item.type === 'earn' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
              </div>
              <div>
                <p className="text-white font-bold group-hover:text-[var(--color-mango)] transition-colors">{item.description}</p>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{item.date}</p>
              </div>
            </div>
            <div className={`text-lg font-black font-serif ${
              item.type === 'earn' ? 'text-green-500' : 'text-red-500'
            }`}>
              {item.type === 'earn' ? '+' : '-'}{item.points}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoyaltyHistory;
