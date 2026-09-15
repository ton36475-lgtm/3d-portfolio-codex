import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function usePerformanceMonitor() {
  const { gl } = useThree();
  const stats = useRef({ fps: 60, frames: 0, last: performance.now() });

  useFrame(() => {
    stats.current.frames++;
    const now = performance.now();
    if (now - stats.current.last >= 1000) {
      stats.current.fps = stats.current.frames;
      stats.current.frames = 0;
      stats.current.last = now;
      if (stats.current.fps < 30) {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      } else {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    }
  });

  return stats;
}

export const LOD_DISTANCES = [20, 50, 100];
