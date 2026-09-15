import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';

const Car = forwardRef(function Car(_, ref) {
  const body = useRef();
  const [, get] = useKeyboardControls();
  const speed = useRef(0);

  useFrame(() => {
    if (!body.current) return;
    const { forward, backward, left, right } = get();
    const accel = 0.6;
    if (forward) speed.current += accel;
    if (backward) speed.current -= accel * 0.6;
    speed.current *= 0.96;
    speed.current = Math.max(-8, Math.min(14, speed.current));
    const rot = (left ? 0.04 : 0) - (right ? 0.04 : 0);
    body.current.setLinvel({ x: Math.sin(body.current.rotation().y) * speed.current, y: body.current.linvel().y, z: Math.cos(body.current.rotation().y) * speed.current }, true);
    body.current.setAngvel({ x: 0, y: rot * speed.current * 0.05, z: 0 }, true);
  });

  return (
    <RigidBody ref={body} colliders="cuboid" mass={1} position={[0, 1, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.6, 3]} />
        <meshStandardMaterial color="#ff5a5f" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.4, 0.7, 1.6]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </RigidBody>
  );
});

export default Car;
