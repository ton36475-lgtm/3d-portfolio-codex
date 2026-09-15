import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function useDayNight(sunRef, ambientRef) {
  const time = useRef(0);
  useFrame((_, delta) => {
    time.current += delta * 0.05;
    const angle = time.current % (Math.PI * 2);
    if (sunRef.current) {
      sunRef.current.position.set(
        Math.cos(angle) * 100,
        Math.sin(angle) * 100,
        50
      );
      const intensity = Math.max(0.1, Math.sin(angle));
      sunRef.current.intensity = intensity * 1.5;
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = 0.2 + Math.max(0, Math.sin(angle)) * 0.3;
    }
  });
}
