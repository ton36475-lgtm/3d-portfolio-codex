import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useCarInput } from '../systems/InputManager';
import { AudioManager } from '../systems/AudioManager';
import * as THREE from 'three';

const WHEEL_POS = [
  [-0.7, -0.3, 1.0],
  [0.7, -0.3, 1.0],
  [-0.7, -0.3, -1.0],
  [0.7, -0.3, -1.0],
];

const Car = forwardRef(function Car(_, ref) {
  const body = useRef();
  const wheels = useRef([]);
  const keys = useCarInput();
  const speed = useRef(0);
  const started = useRef(false);
  const { rapier, world } = useRapier();

  useFrame(() => {
    if (!body.current) return;
    if (!started.current) {
      AudioManager.start();
      started.current = true;
    }
    const { forward, backward, left, right } = keys.current;
    const accel = 0.5;
    if (forward) speed.current += accel;
    if (backward) speed.current -= accel * 0.5;
    speed.current *= 0.965;
    speed.current = Math.max(-7, Math.min(13, speed.current));

    const rot = (left ? 0.035 : 0) - (right ? 0.035 : 0);
    const heading = body.current.rotation().y;
    body.current.setLinvel(
      {
        x: Math.sin(heading) * speed.current,
        y: body.current.linvel().y,
        z: Math.cos(heading) * speed.current,
      },
      true
    );
    body.current.setAngvel({ x: 0, y: rot * Math.max(0.3, Math.abs(speed.current)) * 0.04, z: 0 }, true);

    // wheel spin visual
    wheels.current.forEach((w, i) => {
      if (w) w.rotation.x += speed.current * 0.08 * (i < 2 ? 1 : -1);
    });

    AudioManager.engine.volume = Math.min(0.5, 0.08 + Math.abs(speed.current) * 0.035);
    if (Math.abs(speed.current) > 0.5) AudioManager.wind.volume = Math.min(0.25, Math.abs(speed.current) * 0.02);
    else AudioManager.wind.volume = 0.05;
  });

  return (
    <RigidBody
      ref={body}
      colliders="cuboid"
      mass={1.2}
      position={[0, 1.2, 0]}
      linearDamping={0.4}
      angularDamping={0.8}
      friction={1.2}
    >
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[1.7, 0.55, 3.1]} />
        <meshStandardMaterial color="#e23b3b" metalness={0.55} roughness={0.28} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.55, -0.2]} castShadow>
        <boxGeometry args={[1.45, 0.65, 1.5]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.3} roughness={0.2} transparent opacity={0.85} />
      </mesh>
      {/* Windshield tint */}
      <mesh position={[0, 0.55, 0.45]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1.3, 0.5, 0.05]} />
        <meshStandardMaterial color="#0a1a2a" metalness={0.8} roughness={0.1} transparent opacity={0.6} />
      </mesh>
      {/* Headlights */}
      <mesh position={[-0.45, 0.2, 1.55]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#fff7c2" emissive="#ffd24a" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.45, 0.2, 1.55]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#fff7c2" emissive="#ffd24a" emissiveIntensity={1.5} />
      </mesh>
      {/* Wheels */}
      {WHEEL_POS.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => (wheels.current[i] = el)}
          position={p}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.38, 0.38, 0.28, 16]} />
          <meshStandardMaterial color="#111" roughness={0.7} metalness={0.2} />
        </mesh>
      ))}
      {/* Undercarriage shadow catcher */}
      <mesh position={[0, -0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 2.8]} />
        <meshBasicMaterial color="#000" transparent opacity={0.25} />
      </mesh>
    </RigidBody>
  );
});

export default Car;
