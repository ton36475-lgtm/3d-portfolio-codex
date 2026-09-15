import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { OrbitControls, Environment, Sky, ContactShadows } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import Car from './components/Car.jsx';
import World from './components/World.jsx';
import HUD from './components/HUD.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import { projects } from './data/projects.js';

export default function App() {
  const carRef = useRef();
  const [active, setActive] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 6, 12], fov: 55 }}>
        <Suspense fallback={null}>
          <Sky sunPosition={[100, 40, 100]} />
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[20, 30, 10]} intensity={1.2} castShadow />
          <Physics gravity={[0, -20, 0]}>
            <RigidBody type="fixed">
              <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[400, 400]} />
                <meshStandardMaterial color="#1b2230" />
              </mesh>
            </RigidBody>
            <World onCollect={setActive} />
            <Car ref={carRef} />
          </Physics>
          <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={200} blur={2} />
          <OrbitControls enabled={false} />
        </Suspense>
      </Canvas>
      <HUD />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
