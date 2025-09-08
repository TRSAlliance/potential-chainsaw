import React, { useEffect, useRef, useState } from 'react';

// Three.js Performance Optimizer
export const useThreeJSOptimizer = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationId = useRef(null);

  useEffect(() => {
    // Detect device performance
    const detectPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsLowPerformance(true);
        return;
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      
      // Check for low-end devices
      const lowEndKeywords = ['intel', 'integrated', 'mobile', 'adreno 3', 'mali-4'];
      const isLowEnd = lowEndKeywords.some(keyword => 
        renderer.toLowerCase().includes(keyword)
      );

      // Memory check
      const memoryMB = navigator.deviceMemory || 4;
      const isLowMemory = memoryMB < 4;

      // CPU cores check
      const cpuCores = navigator.hardwareConcurrency || 4;
      const isLowCore = cpuCores < 4;

      setIsLowPerformance(isLowEnd || isLowMemory || isLowCore);
    };

    detectPerformance();
  }, []);

  const optimizeFrame = (callback) => {
    if (isLowPerformance) {
      // Reduce frame rate for low-performance devices
      const now = performance.now();
      if (now - lastTime.current < 33) { // ~30fps instead of 60fps
        animationId.current = requestAnimationFrame(() => optimizeFrame(callback));
        return;
      }
      lastTime.current = now;
    }

    callback();
    frameCount.current++;

    // Dynamic quality adjustment
    if (frameCount.current % 60 === 0) {
      const fps = 60000 / (performance.now() - lastTime.current);
      if (fps < 30 && !isLowPerformance) {
        setIsLowPerformance(true);
      }
    }

    animationId.current = requestAnimationFrame(() => optimizeFrame(callback));
  };

  const startAnimation = (callback) => {
    optimizeFrame(callback);
  };

  const stopAnimation = () => {
    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
    }
  };

  return {
    isLowPerformance,
    startAnimation,
    stopAnimation
  };
};

// Resource Monitor Hook
export const useResourceMonitor = () => {
  const [metrics, setMetrics] = useState({
    memory: 0,
    fps: 60,
    loadTime: 0
  });

  useEffect(() => {
    const startTime = performance.now();
    
    const updateMetrics = () => {
      // Memory usage (if available) - Fixed TypeScript syntax
      const memory = performance.memory;
      if (memory) {
        setMetrics(prev => ({
          ...prev,
          memory: Math.round(memory.usedJSHeapSize / 1024 / 1024)
        }));
      }

      // Load time
      const loadTime = performance.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        loadTime: Math.round(loadTime)
      }));
    };

    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, []);

  return metrics;
};

// Performance Dashboard Component
export const PerformanceDashboard = ({ enabled = false }) => {
  const metrics = useResourceMonitor();
  const { isLowPerformance } = useThreeJSOptimizer();

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 text-xs font-mono text-slate-300 z-50">
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span>Memory:</span>
          <span className={metrics.memory > 100 ? 'text-red-400' : 'text-green-400'}>
            {metrics.memory}MB
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Performance:</span>
          <span className={isLowPerformance ? 'text-yellow-400' : 'text-green-400'}>
            {isLowPerformance ? 'Optimized' : 'Full'}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Load Time:</span>
          <span>{metrics.loadTime}ms</span>
        </div>
      </div>
    </div>
  );
};