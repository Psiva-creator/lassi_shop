import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import PaymentSelection from '../components/checkout/PaymentSelection';
import OrderSuccessModal from '../components/checkout/OrderSuccessModal';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { currentUser, isAuthenticated, updateLoyaltyPoints } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
    if (items.length === 0 && !showSuccess) {
      navigate('/menu');
    }
  }, [isAuthenticated, items, navigate, showSuccess]);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing for Razorpay/UPI
      if (paymentMethod !== 'COD') {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      const order = await orderService.createOrder(
        currentUser.id, 
        items, 
        subtotal, 
        tax, 
        paymentMethod.toUpperCase()
      );

      // Earn points
      const pointsEarned = Math.floor(subtotal * 10);
      await updateLoyaltyPoints(pointsEarned, 'earn', `Order #${order.id.toUpperCase()}`);

      setCreatedOrder(order);
      setShowSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--color-mango)] selection:text-black">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h1 className="text-4xl font-black tracking-tighter mb-8">
                SECURE <span className="text-[var(--color-mango)]">CHECKOUT</span>
              </h1>
              
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <ShieldCheck className="text-[var(--color-mango)]" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Full Name</p>
                      <p className="text-lg font-medium">{currentUser.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Email Address</p>
                      <p className="text-lg font-medium">{currentUser.email}</p>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Truck className="text-[var(--color-mango)]" />
                    Delivery Address
                  </h3>
                  {currentUser.addresses?.length > 0 ? (
                    <div className="p-4 rounded-2xl bg-white/5 border border-[var(--color-mango)]/30">
                      <p className="font-bold text-white mb-1">{currentUser.addresses[0].type.toUpperCase()}</p>
                      <p className="text-gray-400">{currentUser.addresses[0].street}, {currentUser.addresses[0].city}</p>
                    </div>
                  ) : (
                    <button 
                      onClick={() => navigate('/profile')}
                      className="w-full p-6 border-2 border-dashed border-white/10 rounded-3xl text-gray-400 hover:text-white hover:border-[var(--color-mango)]/50 transition-all"
                    >
                      + Add Delivery Address
                    </button>
                  )}
                </div>

                {/* Payment Selection */}
                <PaymentSelection 
                  selected={paymentMethod} 
                  onSelect={setPaymentMethod} 
                />
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:sticky lg:top-32 h-fit">
            <CheckoutSummary 
              items={items}
              subtotal={subtotal}
              tax={tax}
              total={total}
              isProcessing={isProcessing}
              onPlaceOrder={handlePlaceOrder}
              paymentMethod={paymentMethod}
            />
            
            <div className="mt-6 flex items-center gap-3 justify-center text-gray-500 text-sm">
              <ShieldCheck size={16} />
              Secure 256-bit SSL Encrypted Payment
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <OrderSuccessModal 
        isOpen={showSuccess} 
        order={createdOrder}
        onClose={() => navigate(`/orders/${createdOrder?.id}`)} 
      />
    </div>
  );
};

export default Checkout;
