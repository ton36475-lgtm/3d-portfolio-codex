import React, { useState, useRef, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls, Environment, Sky, PerspectiveCamera, ContactShadows, Cloud } from '@react-three/drei'
import * as THREE from 'three'
import projects from './data/projects.json'
import HUD from './components/HUD'
import ProjectModal from './components/ProjectModal'
import Car from './components/Car'
import Crystal from './components/Crystal'
import Zone from './components/Zone'
import Terrain from './systems/Terrain'
import { DustMotes, CollectSparkle } from './systems/Particles'
import Weather from './systems/Weather'
import { AudioManager } from './systems/AudioManager'
import { usePerformanceMonitor } from './systems/Performance'
import { useDayNight } from './systems/DayNight'
import { useDynamicFog } from './systems/Fog'

const ZONES = [
  { name: 'Architecture', x: -45, z: -45 },
  { name: 'Characters', x: 45, z: -45 },
  { name: 'Vehicles', x: 45, z: 45 },
  { name: 'Products', x: -45, z: 45 },
];

function Ground() {
  return (
    <RigidBody type="fixed" friction={1.4} restitution={0.05} colliders="cuboid">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color="#15151f" roughness={1} />
      </mesh>
    </RigidBody>
  );
}

function CameraRig({ target }) {
  const offset = useRef(new THREE.Vector3(0, 5.5, 9));
  useFrame((state) => {
    if (target.current) {
      const pos = target.current.translation();
      const desired = new THREE.Vector3(pos.x, pos.y, pos.z).add(offset.current);
      state.camera.position.lerp(desired, 0.08);
      state.camera.lookAt(pos.x, pos.y + 0.5, pos.z);
    }
  });
  return null;
}

export default function App() {
  const [collected, setCollected] = useState([])
  const [active, setActive] = useState(null)
  const [sparkle, setSparkle] = useState(null)
  const [weather, setWeather] = useState({ type: 'none', zone: null })
  const carRef = useRef()
  const sunRef = useRef()
  const ambientRef = useRef()
  const sceneRef = useRef()
  const perf = usePerformanceMonitor()
  useDayNight(sunRef, ambientRef)
  useDynamicFog(sceneRef)

  const onCollect = useCallback((p) => {
    if (!collected.find((c) => c.id === p.id)) {
      setCollected((c) => [...c, p])
      setActive(p)
      setSparkle({ pos: [p.x, 1.6, p.z], color: p.color, t: Date.now() })
      setTimeout(() => setSparkle(null), 1800)
    }
  }, [collected])

  const onZoneEnter = useCallback((name, meta) => {
    if (weather.zone !== name) setWeather({ type: meta.weather, zone: name })
  }, [weather.zone])

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 8, 12], fov: 55 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ scene }) => (sceneRef.current = scene)}
      >
        <PerspectiveCamera makeDefault />
        <Sky sunPosition={[100, 30, 80]} turbidity={6} rayleigh={1.2} mieCoefficient={0.005} mieDirectionalG={0.8} />
        <Environment preset="city" background={false} />
        <Cloud position={[40, 18, -30]} speed={0.2} opacity={0.5} />
        <Cloud position={[-50, 22, 20]} speed={0.15} opacity={0.4} />
        <ambientLight ref={ambientRef} intensity={0.35} />
        <directionalLight
          ref={sunRef}
          position={[12, 22, 10]}
          intensity={1.3}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-60}
          shadow-camera-right={60}
          shadow-camera-top={60}
          shadow-camera-bottom={-60}
          shadow-bias={-0.0005}
        />
        <hemisphereLight args={['#88aacc', '#1a1a22', 0.4]} />
        <Physics gravity={[0, -22, 0]}>
          <Ground />
          <Terrain />
          <Car ref={carRef} />
          <CameraRig target={carRef} />
          {ZONES.map((z) => (
            <Zone key={z.name} name={z.name} x={z.x} z={z.z} onEnter={onZoneEnter} />
          ))}
          {projects.map((p) => (
            <Crystal key={p.id} project={p} onCollect={onCollect} />
          ))}
          <ContactShadows position={[0, 0.01, 0]} opacity={0.4} scale={80} blur={2.5} frames={1} />
        </Physics>
        <DustMotes />
        {weather.type !== 'none' && <Weather type={weather.type} />}
        {sparkle && <CollectSparkle position={sparkle.pos} active color={sparkle.color} />}
        <OrbitControls enabled={false} />
      </Canvas>
      <HUD collected={collected.length} total={projects.length} fps={perf.current.fps} />
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      <div style={{ position: 'absolute', bottom: 12, left: 12, color: '#fff', fontSize: 11, opacity: 0.55, fontFamily: 'monospace', pointerEvents: 'none' }}>
        WASD / Arrows · Touch · Gamepad
      </div>
    </>
  )
}
