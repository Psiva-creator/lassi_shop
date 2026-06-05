class FrameCacheManager {
  constructor() {
    if (FrameCacheManager.instance) {
      return FrameCacheManager.instance;
    }
    this.cache = new Map();
    this.loading = new Set();
    this.totalFrames = 270;
    this.criticalFramesCount = 15;
    this.basePath = '/frames/ezgif-frame-';
    this.extension = '.jpg';
    this.isCriticalLoaded = false;
    this.callbacks = new Set();
    
    FrameCacheManager.instance = this;
  }

  getFramePath(index) {
    const paddedIndex = String(index).padStart(3, '0');
    return `${this.basePath}${paddedIndex}${this.extension}`;
  }

  async loadFrame(index) {
    if (this.cache.has(index) || this.loading.has(index)) return;
    
    this.loading.add(index);
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = this.getFramePath(index);
      img.onload = () => {
        this.cache.set(index, img);
        this.loading.delete(index);
        this.notify();
        resolve(img);
      };
      img.onerror = () => {
        this.loading.delete(index);
        reject(new Error(`Failed to load frame ${index}`));
      };
    });
  }

  async preloadCriticalFrames() {
    const promises = [];
    for (let i = 1; i <= this.criticalFramesCount; i++) {
      promises.push(this.loadFrame(i));
    }
    await Promise.allSettled(promises);
    this.isCriticalLoaded = true;
    this.notify();
  }

  preloadWindow(currentIndex, windowSize = 30) {
    const start = Math.max(1, currentIndex - windowSize);
    const end = Math.min(this.totalFrames, currentIndex + windowSize);
    
    // Load frames in window
    for (let i = start; i <= end; i++) {
      this.loadFrame(i);
    }

    // Cleanup frames outside window + padding
    const padding = 20;
    const keepStart = Math.max(1, start - padding);
    const keepEnd = Math.min(this.totalFrames, end + padding);

    for (const key of this.cache.keys()) {
      if (key < keepStart || key > keepEnd) {
        this.cache.delete(key);
      }
    }
  }

  getFrame(index) {
    return this.cache.get(index) || null;
  }

  subscribe(callback) {
    this.callbacks.add(callback);
    // Send initial state immediately
    callback(this.getState());
    return () => this.callbacks.delete(callback);
  }

  getState() {
    return {
      isCriticalLoaded: this.isCriticalLoaded,
      loadedCount: this.cache.size,
      totalFrames: this.totalFrames,
      progress: this.cache.size / this.totalFrames
    };
  }

  notify() {
    const state = this.getState();
    this.callbacks.forEach(cb => cb(state));
  }
}

export const frameCacheManager = new FrameCacheManager();
