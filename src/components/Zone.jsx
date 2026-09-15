import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { AudioManager } from '../systems/AudioManager';

const ZONE_META = {
  Architecture: { color: '#4a90d9', fog: '#2a3a5a', weather: 'none' },
  Characters: { color: '#9b59b6', fog: '#3a2a4a', weather: 'none' },
  Vehicles: { color: '#e67e22', fog: '#4a3a2a', weather: 'rain' },
  Products: { color: '#27ae60', fog: '#2a4a3a', weather: 'snow' },
};

export default function Zone({ name, x, z, onEnter }) {
  const meshRef = useRef();
  const meta = ZONE_META[name] || ZONE_META.Architecture;

  useFrame((state) => {
    if (meshRef.current) {
      const d = state.camera.position.distanceTo({ x, y: 0, z });
      if (d < 22) {
        AudioManager.setZone(name.toLowerCase());
        onEnter && onEnter(name, meta);
      }
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* glowing ground pad */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[14, 48]} />
        <meshStandardMaterial
          color={meta.color}
          emissive={meta.color}
          emissiveIntensity={0.35}
          transparent
          opacity={0.35}
          roughness={0.4}
        />
      </mesh>
      {/* ring accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[13.5, 14.2, 64]} />
        <meshBasicMaterial color={meta.color} transparent opacity={0.6} />
      </mesh>
      <Float speed={1.5} floatIntensity={0.3}>
        <Text
          position={[0, 3.2, 0]}
          fontSize={1.6}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </Float>
      {/* subtle pillars for architecture feel */}
      {name === 'Architecture' &&
        [-1, 1].map((s) => (
          <mesh key={s} position={[s * 6, 2, 0]} castShadow>
            <boxGeometry args={[0.6, 4, 0.6]} />
            <meshStandardMaterial color="#cfd8e3" roughness={0.3} metalness={0.4} />
          </mesh>
        ))}
    </group>
  );
}
