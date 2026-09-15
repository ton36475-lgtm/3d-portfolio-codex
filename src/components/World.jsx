import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { projects } from '../data/projects.js';

function Crystal({ project, onCollect }) {
  const ref = useRef();
  const [collected, setCollected] = useState(false);
  useFrame((state) => {
    if (ref.current && !collected) {
      ref.current.rotation.y += 0.02;
      ref.current.position.y = project.pos[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });
  if (collected) return null;
  return (
    <RigidBody
      type="kinematicPosition"
      position={project.pos}
      onCollisionEnter={() => { setCollected(true); onCollect(project); }}
      sensor
    >
      <mesh ref={ref} castShadow>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={0.6} />
      </mesh>
    </RigidBody>
  );
}

export default function World({ onCollect }) {
  return (
    <group>
      {projects.map((p) => (
        <Crystal key={p.id} project={p} onCollect={onCollect} />
      ))}
      <RigidBody type="fixed">
        <mesh position={[0, 5, -40]}>
          <boxGeometry args={[20, 10, 1]} />
          <meshStandardMaterial color="#334" />
        </mesh>
      </RigidBody>
    </group>
  );
}
