import { motion } from 'framer-motion';
import { CreditCard, Wallet, Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';

const PaymentSelection = ({ selected, onSelect }) => {
  const methods = [
    {
      id: 'upi',
      name: 'UPI Transfer',
      description: 'Google Pay, PhonePe, Paytm',
      icon: Wallet,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      id: 'razorpay',
      name: 'Cards / NetBanking',
      description: 'Powered by Razorpay',
      icon: CreditCard,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 'cod',
      name: 'Cash On Delivery',
      description: 'Pay when you receive',
      icon: Banknote,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    }
  ];

  return (
    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
        <CreditCard className="text-[var(--color-mango)]" />
        Payment Method
      </h3>

      <div className="space-y-4">
        {methods.map((method) => (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(method.id)}
            className={`w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all duration-300 ${
              selected === method.id 
                ? 'border-[var(--color-mango)] bg-[var(--color-mango)]/5 shadow-[0_0_20px_rgba(255,155,5,0.1)]' 
                : 'border-white/5 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4 text-left">
              <div className={`p-3 rounded-2xl ${method.bgColor} ${method.color}`}>
                <method.icon size={24} />
              </div>
              <div>
                <p className="font-bold text-white text-lg">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
            
            {selected === method.id ? (
              <CheckCircle2 className="text-[var(--color-mango)]" size={24} />
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-white/10" />
            )}
          </motion.button>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
        <ShieldCheck className="text-gray-500 mt-1 shrink-0" size={20} />
        <p className="text-xs text-gray-500 leading-relaxed">
          Your payment is securely processed. We do not store your card or UPI details on our servers. 
          By proceeding, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default PaymentSelection;
