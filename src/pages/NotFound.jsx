import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  useEffect(() => {
    console.warn(`[Navigation Audit] Invalid route accessed: ${window.location.pathname}`);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center pt-32">
        <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-8">
          <AlertCircle size={48} />
        </div>
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-4">
          404 <span className="text-[var(--color-mango)]">LOST?</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
          The page you're looking for has vanished into thin air. Perhaps it was too refreshing to last.
        </p>
        <Link 
          to="/"
          className="flex items-center gap-2 bg-[var(--color-mango)] text-black px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
