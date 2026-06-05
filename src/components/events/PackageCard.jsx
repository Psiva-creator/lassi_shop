import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PackageCard = ({ name, price, features, color, recommended }) => {
  const navigate = useNavigate();
  const colorMap = {
    gray: 'border-white/10 hover:border-white/30',
    mango: 'border-[var(--color-mango)] shadow-[0_0_40px_rgba(255,155,5,0.1)]',
    gold: 'border-[#D4AF37]/50 hover:border-[#D4AF37]'
  };

  const textColorMap = {
    gray: 'text-white',
    mango: 'text-[var(--color-mango)]',
    gold: 'text-[#D4AF37]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-[3rem] bg-white/5 border-2 transition-all ${colorMap[color]} flex flex-col`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-mango)] text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
          Recommended
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-2xl font-black uppercase tracking-tighter mb-1 ${textColorMap[color]}`}>{name}</h3>
        <p className="text-3xl font-bold text-white tracking-tight">{price}</p>
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
            <Check className={`shrink-0 mt-0.5 ${textColorMap[color]}`} size={16} />
            {feature}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/stall-booking')} className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
        color === 'mango' 
          ? 'bg-[var(--color-mango)] text-black hover:scale-[1.02]' 
          : 'bg-white/10 text-white hover:bg-white/20'
      }`}>
        Choose {name}
      </button>
    </motion.div>
  );
};

export default PackageCard;
