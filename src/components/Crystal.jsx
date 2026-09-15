import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Sparkles, Float } from '@react-three/drei';
import { AudioManager } from '../systems/AudioManager';

export default function Crystal({ project, onCollect }) {
  const ref = useRef();
  const [collected, setCollected] = useState(false);

  useFrame((state) => {
    if (ref.current && !collected) {
      ref.current.rotation.y += 0.025;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  if (collected) return null;

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6} floatingRange={[0.2, 0.6]}>
      <RigidBody
        type="kinematicPosition"
        position={[project.x, 1.6, project.z]}
        ref={ref}
        onCollisionEnter={() => {
          setCollected(true);
          AudioManager.collect();
          onCollect(project);
        }}
        sensor
        colliders="ball"
      >
        <mesh castShadow>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color={project.color || '#7df9ff'}
            emissive={project.color || '#2ad4ff'}
            emissiveIntensity={1.4}
            metalness={0.6}
            roughness={0.15}
            transparent
            opacity={0.92}
          />
        </mesh>
        <Sparkles
          count={18}
          scale={2.2}
          size={3}
          speed={0.4}
          color={project.color || '#7df9ff'}
          noise={0.3}
        />
      </RigidBody>
    </Float>
  );
}
