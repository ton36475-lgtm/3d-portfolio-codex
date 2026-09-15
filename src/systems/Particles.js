import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles, Float } from '@react-three/drei';

// Sparkle burst when a crystal is collected.
export function CollectSparkle({ position, active, color = '#7df9ff' }) {
  if (!active) return null;
  return (
    <Sparkles
      count={40}
      scale={3}
      size={4}
      speed={0.6}
      color={color}
      position={position}
      noise={0.5}
    />
  );
}

// Ambient floating dust motes for atmosphere.
export function DustMotes({ count = 200, area = 120 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * area;
      arr[i * 3 + 1] = Math.random() * 8 + 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * area;
    }
    return arr;
  }, [count, area]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#9fb4d8"
        transparent
        opacity={0.5}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default { CollectSparkle, DustMotes };
