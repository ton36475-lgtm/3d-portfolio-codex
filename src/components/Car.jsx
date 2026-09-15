import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useCarInput } from '../systems/InputManager';
import { AudioManager } from '../systems/AudioManager';

const Car = forwardRef(function Car(_, ref) {
  const body = useRef();
  const keys = useCarInput();
  const speed = useRef(0);
  const started = useRef(false);

  useFrame(() => {
    if (!body.current) return;
    if (!started.current) {
      AudioManager.start();
      started.current = true;
    }
    const { forward, backward, left, right } = keys.current;
    const accel = 0.6;
    if (forward) speed.current += accel;
    if (backward) speed.current -= accel * 0.6;
    speed.current *= 0.96;
    speed.current = Math.max(-8, Math.min(14, speed.current));
    const rot = (left ? 0.04 : 0) - (right ? 0.04 : 0);
    body.current.setLinvel(
      {
        x: Math.sin(body.current.rotation().y) * speed.current,
        y: body.current.linvel().y,
        z: Math.cos(body.current.rotation().y) * speed.current,
      },
      true
    );
    body.current.setAngvel({ x: 0, y: rot * speed.current * 0.05, z: 0 }, true);
    AudioManager.engine.volume = Math.min(0.5, 0.1 + Math.abs(speed.current) * 0.03);
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
      <mesh position={[0.5, 0.4, 1.2]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </RigidBody>
  );
});

export default Car;
