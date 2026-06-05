import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Download } from 'lucide-react';

const OrderSuccessModal = ({ isOpen, order, onClose }) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-[3rem] p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden"
            >
              {/* Confetti effect simulation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-gradient-to-r from-transparent via-[var(--color-mango)] to-transparent opacity-50" />
              
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-[var(--color-mango)]/10 flex items-center justify-center text-[var(--color-mango)] relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <CheckCircle2 size={64} />
                  </motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-4 border-[var(--color-mango)]/20"
                  />
                </div>
              </div>

              <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">
                ORDER <span className="text-[var(--color-mango)]">CONFIRMED!</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Your order <span className="text-white font-bold">#{order.id.slice(-6).toUpperCase()}</span> has been placed successfully.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 text-left space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Estimated Delivery</span>
                  <span className="text-white font-bold">35-40 Mins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Payment Method</span>
                  <span className="text-white font-bold">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-gray-500 font-medium">Total Paid</span>
                  <span className="text-[var(--color-mango)] font-black text-xl">₹{(order.total + order.tax).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={onClose}
                  className="w-full bg-[var(--color-mango)] hover:bg-[#ff9c05] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all text-lg group"
                >
                  TRACK ORDER
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
                >
                  <Download size={20} />
                  DOWNLOAD RECEIPT
                </button>
              </div>

              <p className="mt-8 text-xs text-gray-500">
                A confirmation email with your digital receipt has been sent to your registered email address.
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderSuccessModal;
