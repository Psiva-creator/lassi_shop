import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CanvasFramePlayer } from './CanvasFramePlayer';

const ShowcaseSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "0px" });

  const [frameIndex, setFrameIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const totalFrames = 270;
  const animationRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let currentFrame = frameIndex;
    let lastTime = 0;

    const animate = (time) => {
      if (!isInView) return;

      // Throttle to approximately 30 fps
      if (time - lastTime > 1000 / 30) {
        currentFrame = currentFrame >= totalFrames ? 1 : currentFrame + 1;
        setFrameIndex(currentFrame);
        lastTime = time;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isInView) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isInView, frameIndex]);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] bg-[#0a0a0a] flex items-center justify-center overflow-hidden py-32">
      
      {/* Background Frame Sequence with Fallback */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/frames/ezgif-frame-270.jpg')" }}
      >
        {!isMobile && (
          <CanvasFramePlayer 
            frameIndex={frameIndex} 
            className="w-full h-full object-cover opacity-60" 
          />
        )}
        {/* Gradients to seamlessly blend this section into the page flow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>
      
      {/* Content overlaying the showcase */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            The Cinematic <span className="text-[var(--color-mango)] italic font-light">Experience</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed drop-shadow-lg mb-10">
            Every drop is a masterpiece. We meticulously craft our beverages to ensure an unforgettable sensory journey.
          </p>
          <button onClick={() => navigate('/menu')} className="pointer-events-auto px-8 py-3 border border-white/50 hover:border-white text-white uppercase tracking-widest text-sm font-semibold rounded-full transition-all hover:bg-white/10 backdrop-blur-sm">
            Discover Our Process
          </button>
        </motion.div>
      </div>

    </section>
  );
};

export default ShowcaseSection;
