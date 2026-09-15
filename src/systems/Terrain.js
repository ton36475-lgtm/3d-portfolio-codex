import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural rolling terrain with gentle hills for realism.
export function Terrain({ size = 200, segments = 128 }) {
  const meshRef = useRef();
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y =
        Math.sin(x * 0.04) * 1.2 +
        Math.cos(z * 0.035) * 1.0 +
        Math.sin((x + z) * 0.02) * 0.6;
      pos.setY(i, y);
    }
    geo.computeVertexNormals();
    return geo;
  }, [size, segments]);

  useFrame((state) => {
    if (meshRef.current) {
      // subtle shimmer on wet patches
      meshRef.current.material.emissiveIntensity =
        0.02 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow>
      <meshStandardMaterial
        color="#2a2a38"
        roughness={0.85}
        metalness={0.05}
        emissive="#0a0a12"
        emissiveIntensity={0.02}
      />
    </mesh>
  );
}

export default Terrain;
