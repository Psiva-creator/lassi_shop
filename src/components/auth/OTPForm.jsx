import { useState, useRef } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { authService } from '../../services/authService';

const OTPForm = ({ onNavigate }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.verifyOTP(code);
      // For demo, just go to login after verification
      onNavigate('login');
    } catch (err) {
      setError(err.message || 'Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={() => onNavigate('login')}
        className="text-gray-400 hover:text-white transition-colors mb-6 flex items-center text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>

      <h3 className="text-3xl font-bold text-white mb-2 font-serif">Verification</h3>
      <p className="text-gray-400 mb-8 leading-relaxed">
        We've sent a 6-digit verification code to your device. Please enter it below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-[#111] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[var(--color-mango)] focus:ring-1 focus:ring-[var(--color-mango)] transition-colors"
              maxLength={1}
            />
          ))}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black font-semibold py-3 rounded-lg transition-all flex justify-center items-center h-[52px]"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Verify Account'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Didn't receive the code?{' '}
          <button 
            type="button"
            className="text-white font-medium hover:text-[var(--color-mango)] transition-colors border-b border-white/30 hover:border-[var(--color-mango)] pb-0.5"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPForm;
