import { useRef, useEffect } from 'react';
import { useFrameSequence } from '../hooks/useFrameSequence';

export function CanvasFramePlayer({ frameIndex, className = '' }) {
  const canvasRef = useRef(null);
  const { getFrame, isPerformanceMode } = useFrameSequence(frameIndex);

  useEffect(() => {
    if (isPerformanceMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const image = getFrame(frameIndex);

    let animationFrameId;

    const render = () => {
      if (image && image.complete && image.width > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = image.width / image.height;
        
        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      }
      // Re-render next frame to ensure the image gets drawn once it loads
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [frameIndex, getFrame, isPerformanceMode]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    
    // Initial size setup
    setTimeout(handleResize, 0); // Need to wait for DOM insertion

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isPerformanceMode) {
    const pad = String(frameIndex).padStart(3, '0');
    return (
      <img 
        src={`/frames/ezgif-frame-${pad}.jpg`} 
        alt="Frame preview" 
        className={`object-cover w-full h-full ${className}`}
      />
    );
  }

  return (
    <canvas 
      ref={canvasRef} 
      className={`block w-full h-full ${className}`}
      style={{ WebkitTransform: 'translateZ(0)' }} // Force GPU acceleration
    />
  );
}
