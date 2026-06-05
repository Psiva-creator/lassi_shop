import { useState, useEffect } from 'react';
import { frameCacheManager } from '../utils/FrameCacheManager';

export function useFrameSequence(currentIndex = 1) {
  const [state, setState] = useState(frameCacheManager.getState());
  const [isPerformanceMode, setIsPerformanceMode] = useState(false);

  useEffect(() => {
    const checkPerformanceMode = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      if (isMobile || lowMemory) {
        setIsPerformanceMode(true);
      }
    };
    checkPerformanceMode();

    if (!isPerformanceMode) {
      frameCacheManager.preloadCriticalFrames();
    }
  }, [isPerformanceMode]);

  useEffect(() => {
    const unsubscribe = frameCacheManager.subscribe(setState);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isPerformanceMode) {
      frameCacheManager.preloadWindow(currentIndex);
    }
  }, [currentIndex, isPerformanceMode]);

  return {
    ...state,
    isPerformanceMode,
    getFrame: (index) => frameCacheManager.getFrame(index),
  };
}
