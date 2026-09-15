import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Light rain or snow particles that drift with wind.
export function Weather({ type = 'rain', intensity = 400 }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(intensity * 3);
    for (let i = 0; i < intensity; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 160;
      pos[i * 3 + 1] = Math.random() * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 160;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, [intensity]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
    const wind = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    for (let i = 0; i < intensity; i++) {
      pos[i * 3] += wind * delta * 2;
      pos[i * 3 + 1] -= (type === 'snow' ? 1.5 : 12) * delta;
      if (pos[i * 3 + 1] < 0) {
        pos[i * 3 + 1] = 40;
        pos[i * 3] = (Math.random() - 0.5) * 160;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 160;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo} frustumCulled={false}>
      <pointsMaterial
        size={type === 'snow' ? 0.25 : 0.06}
        color={type === 'snow' ? '#eaf2ff' : '#88aacc'}
        transparent
        opacity={type === 'snow' ? 0.8 : 0.45}
        depthWrite={false}
      />
    </points>
  );
}

export default Weather;
