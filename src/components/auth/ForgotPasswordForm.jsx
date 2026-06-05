import { useState } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { authService } from '../../services/authService';

const ForgotPasswordForm = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.sendPasswordReset(email);
      setIsSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-[var(--color-mango)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[var(--color-mango)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4 font-serif">Check Your Email</h3>
        <p className="text-gray-400 mb-8 leading-relaxed">
          We've sent a password reset link to <br/>
          <span className="text-white font-medium">{email}</span>
        </p>
        <button 
          onClick={() => onNavigate('login')}
          className="w-full bg-[#111] hover:bg-[#222] text-white border border-white/10 font-semibold py-3 rounded-lg transition-all"
        >
          Return to Sign In
        </button>
      </div>
    );
  }

  return (
    <div>
      <button 
        onClick={() => onNavigate('login')}
        className="text-gray-400 hover:text-white transition-colors mb-6 flex items-center text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to sign in
      </button>

      <h3 className="text-3xl font-bold text-white mb-2 font-serif">Reset Password</h3>
      <p className="text-gray-400 mb-8 leading-relaxed">
        Enter the email associated with your account and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-mango)] focus:ring-1 focus:ring-[var(--color-mango)] transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black font-semibold py-3 rounded-lg transition-all flex justify-center items-center h-[52px]"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
