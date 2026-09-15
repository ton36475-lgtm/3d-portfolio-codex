import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls, Environment, Sky, Text, PerspectiveCamera } from '@react-three/drei'
import projects from './data/projects.json'
import HUD from './components/HUD'
import ProjectModal from './components/ProjectModal'
import Car from './components/Car'
import { AudioManager } from './systems/AudioManager'
import { usePerformanceMonitor } from './systems/Performance'
import { useDayNight } from './systems/DayNight'

function Ground() {
  return (
    <RigidBody type="fixed" friction={1}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#1b1b2a" />
      </mesh>
    </RigidBody>
  )
}

function Zone({ name, x, z, color }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      const d = state.camera.position.distanceTo({ x, y: 0, z });
      if (d < 25) AudioManager.setZone(name.toLowerCase());
    }
  });
  return (
    <group position={[x, 0.1, z]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[30, 0.2, 30]} />
        <meshStandardMaterial color={color} transparent opacity={0.25} />
      </mesh>
      <Text position={[0, 2, 0]} fontSize={1.5} color="white" anchorX="center">
        {name}
      </Text>
    </group>
  )
}

function Crystal({ project, onCollect }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.03;
      ref.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });
  return (
    <RigidBody type="kinematicPosition" position={[project.x, 1.5, project.z]} ref={ref}
      onCollisionEnter={() => { AudioManager.collect(); onCollect(project); }} sensor>
      <mesh>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial color="#7df9ff" emissive="#2ad4ff" emissiveIntensity={1.2} />
      </mesh>
    </RigidBody>
  )
}

function CameraRig({ target }) {
  useFrame((state) => {
    if (target.current) {
      const pos = target.current.translation();
      state.camera.position.lerp({ x: pos.x, y: pos.y + 6, z: pos.z + 10 }, 0.1);
      state.camera.lookAt(pos.x, pos.y, pos.z);
    }
  });
  return null;
}

export default function App() {
  const [collected, setCollected] = useState([])
  const [active, setActive] = useState(null)
  const carRef = useRef()
  const sunRef = useRef()
  const ambientRef = useRef()
  const perf = usePerformanceMonitor()
  useDayNight(sunRef, ambientRef)

  const onCollect = (p) => {
    if (!collected.find(c => c.id === p.id)) {
      setCollected(c => [...c, p])
      setActive(p)
    }
  }

  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 8, 12], fov: 55 }}>
        <PerspectiveCamera makeDefault />
        <Sky sunPosition={[100, 20, 100]} />
        <Environment preset="city" />
        <ambientLight ref={ambientRef} intensity={0.4} />
        <directionalLight ref={sunRef} position={[10, 20, 10]} intensity={1.2} castShadow />
        <Physics gravity={[0, -20, 0]}>
          <Ground />
          <Car ref={carRef} />
          <CameraRig target={carRef} />
          <Zone name="Architecture" x={-40} z={-40} color="#4a90d9" />
          <Zone name="Characters" x={40} z={-40} color="#9b59b6" />
          <Zone name="Vehicles" x={40} z={40} color="#e67e22" />
          <Zone name="Products" x={-40} z={40} color="#27ae60" />
          {projects.map(p => <Crystal key={p.id} project={p} onCollect={onCollect} />)}
        </Physics>
        <OrbitControls enabled={false} />
      </Canvas>
      <HUD collected={collected.length} total={projects.length} fps={perf.current.fps} />
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      <div style={{ position: 'absolute', bottom: 12, left: 12, color: '#fff', fontSize: 11, opacity: 0.6, fontFamily: 'monospace' }}>
        WASD / Arrows · Touch · Gamepad
      </div>
    </>
  )
}
