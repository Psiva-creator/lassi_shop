import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const LoginForm = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      // AuthContext handles redirect to home
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-bold text-white mb-2 font-serif">Welcome Back</h3>
      <p className="text-gray-400 mb-8">Sign in to access your premium account.</p>

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

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <button 
              type="button" 
              onClick={() => onNavigate('forgot')}
              className="text-sm text-[var(--color-mango)] hover:text-[var(--color-mango-dark)] transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-mango)] focus:ring-1 focus:ring-[var(--color-mango)] transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black font-semibold py-3 rounded-lg transition-all flex justify-center items-center h-[52px]"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <button 
            onClick={() => onNavigate('register')}
            className="text-white font-medium hover:text-[var(--color-mango)] transition-colors border-b border-white/30 hover:border-[var(--color-mango)] pb-0.5"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
