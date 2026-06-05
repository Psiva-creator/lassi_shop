import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PlaceholderPage = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center pt-32">
        <div className="w-24 h-24 rounded-full bg-[var(--color-mango)]/10 flex items-center justify-center text-[var(--color-mango)] mb-8 animate-pulse">
          <Construction size={48} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
          {title} <span className="text-[var(--color-mango)]">COMING SOON</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
          We're currently crafting this experience to meet our premium standards. Check back shortly!
        </p>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
