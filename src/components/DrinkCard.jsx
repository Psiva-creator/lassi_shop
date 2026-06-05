import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CanvasFramePlayer } from './CanvasFramePlayer';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const DrinkCard = ({ id, image, name, description, price, index, hoverFrames, idleFrame = 1 }) => {
  const [frameIndex, setFrameIndex] = useState(idleFrame);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef(null);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isSaved = isInWishlist(id);

  const handleHeartClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    toggleItem({ id, name, price, image, description });
  };

  useEffect(() => {
    if (!hoverFrames) return;

    const [, endFrame] = hoverFrames;
    let current = frameIndex;

    const animate = () => {
      if (isHovered && current < endFrame) {
        current += 1;
        setFrameIndex(current);
      } else if (!isHovered && current > idleFrame) {
        current -= 1;
        setFrameIndex(current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, hoverFrames, idleFrame, frameIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] sm:hover:-translate-y-3 sm:hover:shadow-[0_30px_60px_-15px_rgba(255,165,0,0.15)] sm:hover:border-[var(--color-mango)]/20 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Background Glow that appears on hover (desktop only) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-mango)_0%,_transparent_70%)] opacity-0 sm:group-hover:opacity-5 transition-opacity duration-700 pointer-events-none z-0" />

      {/* Image / Canvas Container */}
      <Link to={`/menu/${id}`} className="relative h-96 w-full overflow-hidden bg-black z-10 block">
        {hoverFrames ? (
          <div className="w-full h-full opacity-100 sm:opacity-80 sm:group-hover:opacity-100 transition-all duration-700 transform sm:group-hover:scale-[1.03] pointer-events-none">
            <CanvasFramePlayer frameIndex={frameIndex} className="w-[120%] h-[120%] object-cover object-center translate-y-4" />
          </div>
        ) : (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover opacity-100 sm:opacity-80 sm:group-hover:opacity-100 transition-all duration-700 transform sm:group-hover:scale-[1.03]"
          />
        )}
        
        {/* Heart Icon Button */}
        <button 
          onClick={handleHeartClick}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors group/heart"
        >
          <Heart 
            size={20} 
            className={`transition-all duration-300 ${
              isSaved 
                ? 'fill-[var(--color-mango)] text-[var(--color-mango)] scale-110' 
                : 'text-white sm:group-hover/heart:text-[var(--color-mango)] sm:group-hover/heart:scale-110'
            }`} 
          />
        </button>

        {/* Soft gradient blending the image into the card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent opacity-90 pointer-events-none" />
      </Link>
      
      {/* Content Container */}
      <div className="relative flex flex-col px-8 pb-8 pt-0 -mt-20 z-20 h-full justify-end">
        <div>
          <div className="inline-block px-4 py-1 rounded-full bg-black/60 backdrop-blur-md text-[var(--color-mango)] text-sm font-semibold mb-4 border border-[var(--color-mango)]/20 shadow-lg transition-transform duration-500 sm:group-hover:-translate-y-1">
            {price}
          </div>
          <Link to={`/menu/${id}`} className="block">
            <h3 className="text-3xl font-bold text-white mb-3 font-serif tracking-tight transition-transform duration-500 sm:group-hover:-translate-y-1 hover:text-[var(--color-mango)] transition-colors">{name}</h3>
          </Link>
        </div>

        <div className="relative overflow-hidden h-32 sm:h-24">
          {/* Description container translates up on hover on desktop, fixed on mobile */}
          <div className="absolute top-0 left-0 w-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] sm:group-hover:-translate-y-8">
            <p className="text-gray-400 font-light leading-relaxed mb-6 line-clamp-2 sm:line-clamp-none">
              {description}
            </p>
          </div>

          {/* CTA fades in and translates up from below on desktop, fixed on mobile */}
          <div className="absolute bottom-0 left-0 w-full opacity-100 sm:opacity-0 sm:translate-y-8 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] delay-100">
            <button 
              onClick={(e) => {
                e.preventDefault();
                addItem({ id, name, price: parseFloat(price.replace('₹', '')), image });
              }}
              className="flex items-center text-sm font-semibold text-white hover:text-[var(--color-mango)] transition-colors py-2"
            >
              <span className="mr-2 border-b border-white/30 hover:border-[var(--color-mango)] transition-colors pb-1 uppercase tracking-widest">
                Order for pickup
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DrinkCard;
