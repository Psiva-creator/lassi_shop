import { ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';

const CheckoutSummary = ({ items, subtotal, tax, total, isProcessing, onPlaceOrder, paymentMethod }) => {
  return (
    <div className="p-8 rounded-[2.5rem] bg-[#111] border border-white/10 shadow-2xl overflow-hidden relative group">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-mango)]/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

      <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
        <ShoppingBag className="text-[var(--color-mango)]" />
        Order Summary
      </h3>

      {/* Items Preview */}
      <div className="space-y-4 mb-8 relative z-10 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-2">
            <div className="w-12 h-12 rounded-lg bg-black overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
              <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
            </div>
            <span className="text-white font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Calculations */}
        <div className="space-y-3 pt-6 border-t border-white/10">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Tax (8%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-end pt-4">
            <div>
              <p className="text-white font-bold">Total</p>
              <p className="text-xs text-gray-500">Including all taxes</p>
            </div>
            <span className="text-[var(--color-mango)] font-black text-2xl">₹{total.toFixed(2)}</span>
          </div>
        </div>

      <button
        onClick={onPlaceOrder}
        disabled={isProcessing}
        className="w-full bg-[var(--color-mango)] hover:bg-[#ff9c05] disabled:bg-[var(--color-mango)]/50 disabled:cursor-not-allowed text-black font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg group shadow-[0_10px_30px_rgba(255,155,5,0.2)] mt-8"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            {paymentMethod === 'cod' ? 'PLACING ORDER...' : 'PROCESSING PAYMENT...'}
          </>
        ) : (
          <>
            {paymentMethod === 'cod' ? 'CONFIRM ORDER' : 'PAY NOW'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="mt-6 text-center text-xs text-gray-500 px-4">
        Items will be delivered within 30-45 minutes to your selected address.
      </p>
    </div>
  );
};

export default CheckoutSummary;
