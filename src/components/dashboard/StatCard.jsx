import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, color }) => {
  const colorClasses = {
    mango: 'text-[var(--color-mango)] bg-[var(--color-mango)]/10',
    orange: 'text-orange-500 bg-orange-500/10',
    yellow: 'text-yellow-400 bg-yellow-400/10',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-mango)]/5 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-[var(--color-mango)]/10 transition-colors" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-2xl ${colorClasses[color] || colorClasses.mango}`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-gray-400 font-medium mb-1">{title}</h3>
        <p className="text-3xl font-black tracking-tight mb-2">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{trend}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
