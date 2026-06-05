import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ChefHat, PackageCheck, Truck } from 'lucide-react';

const STATUS_FLOW = [
  { id: "Pending", icon: Clock, label: "Order Placed" },
  { id: "Confirmed", icon: CheckCircle2, label: "Confirmed" },
  { id: "Preparing", icon: ChefHat, label: "Preparing" },
  { id: "Ready", icon: PackageCheck, label: "Ready" },
  { id: "Delivered", icon: Truck, label: "Delivered" }
];

const OrderTimeline = ({ currentStatus, timelineData = [] }) => {
  const currentIndex = STATUS_FLOW.findIndex(s => s.id === currentStatus);

  return (
    <div className="w-full py-8 md:py-16 overflow-hidden">
      <div className="relative flex justify-between items-center max-w-4xl mx-auto px-4 sm:px-10">
        {/* Background Track */}
        <div className="absolute top-1/2 left-4 right-4 sm:left-10 sm:right-10 h-1 bg-white/10 -translate-y-1/2 z-0 rounded-full"></div>
        
        {/* Progress Track */}
        <motion.div 
          className="absolute top-1/2 left-4 sm:left-10 h-1 bg-[var(--color-mango)] -translate-y-1/2 z-0 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `calc(${(Math.max(0, currentIndex) / (STATUS_FLOW.length - 1)) * 100}% - 20px)` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        ></motion.div>

        {/* Steps */}
        {STATUS_FLOW.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          // Find if we have a timestamp for this step
          const timelineEntry = timelineData.find(t => t.status === step.id);
          const timeString = timelineEntry ? new Date(timelineEntry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${
                  isCurrent ? 'bg-[#0a0a0a] border-[var(--color-mango)] text-[var(--color-mango)] shadow-[0_0_20px_rgba(255,165,0,0.4)]' :
                  isCompleted ? 'bg-[var(--color-mango)] border-[var(--color-mango)] text-black' :
                  'bg-[#111] border-white/20 text-gray-500'
                }`}
              >
                <Icon size={isCurrent || isCompleted ? 20 : 16} className={isCurrent ? "animate-pulse" : ""} />
              </motion.div>
              
              <div className="mt-4 text-center absolute top-full w-24 sm:w-32 -ml-12 sm:-ml-16 left-1/2">
                <p className={`text-xs sm:text-sm font-semibold ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                  {step.label}
                </p>
                {timeString && (
                  <p className="text-[10px] sm:text-xs text-[var(--color-mango)] mt-1">{timeString}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
