import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Dynamic fog that thickens at night and clears at dawn.
export function useDynamicFog(sceneRef) {
  const t = useRef(0);
  useFrame((state) => {
    t.current = state.clock.elapsedTime;
    const scene = sceneRef.current;
    if (!scene) return;
    const day = (Math.sin(t.current * 0.05) + 1) / 2; // 0 night .. 1 day
    scene.fog = scene.fog || new THREE.FogExp2('#1a1a2e', 0.012);
    scene.fog.color.setHex(day > 0.5 ? 0x88aacc : 0x0a0a18);
    scene.fog.density = 0.004 + (1 - day) * 0.012;
  });
}

export default useDynamicFog;
