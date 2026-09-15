import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function useDayNight(sunRef, ambientRef) {
  const time = useRef(0);
  useFrame((_, delta) => {
    time.current += delta * 0.04;
    const angle = time.current % (Math.PI * 2);
    if (sunRef.current) {
      sunRef.current.position.set(
        Math.cos(angle) * 120,
        Math.max(2, Math.sin(angle) * 120),
        60
      );
      const day = Math.max(0, Math.sin(angle));
      sunRef.current.intensity = 0.3 + day * 1.4;
      sunRef.current.color.setHex(day > 0.3 ? 0xfff2d0 : 0x8899cc);
    }
    if (ambientRef.current) {
      const day = Math.max(0, Math.sin(angle));
      ambientRef.current.intensity = 0.15 + day * 0.35;
      ambientRef.current.color.setHex(day > 0.3 ? 0xb0c4de : 0x223044);
    }
  });
}
