import React, { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls, Environment, Sky, Text } from '@react-three/drei'
import projects from './data/projects.json'
import HUD from './components/HUD'
import ProjectModal from './components/ProjectModal'

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
  return (
    <group position={[x, 0.1, z]}>
      <mesh>
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
  return (
    <RigidBody type="kinematicPosition" position={[project.x, 1.5, project.z]} ref={ref}
      onCollisionEnter={() => onCollect(project)}>
      <mesh>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial color="#7df9ff" emissive="#2ad4ff" emissiveIntensity={1.2} />
      </mesh>
    </RigidBody>
  )
}

function Car() {
  const ref = useRef()
  return (
    <RigidBody ref={ref} type="dynamic" colliders="cuboid" mass={1} position={[0, 1, 0]}
      linearDamping={0.5} angularDamping={0.8}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.6, 2.4]} />
        <meshStandardMaterial color="#ff5a5f" />
      </mesh>
    </RigidBody>
  )
}

export default function App() {
  const [collected, setCollected] = useState([])
  const [active, setActive] = useState(null)

  const onCollect = (p) => {
    if (!collected.find(c => c.id === p.id)) {
      setCollected(c => [...c, p])
      setActive(p)
    }
  }

  return (
    <>
      <Canvas shadows camera={{ position: [0, 8, 12], fov: 55 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <Environment preset="city" />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        <Physics gravity={[0, -20, 0]}>
          <Ground />
          <Car />
          <Zone name="Architecture" x={-40} z={-40} color="#4a90d9" />
          <Zone name="Characters" x={40} z={-40} color="#9b59b6" />
          <Zone name="Vehicles" x={40} z={40} color="#e67e22" />
          <Zone name="Products" x={-40} z={40} color="#27ae60" />
          {projects.map(p => <Crystal key={p.id} project={p} onCollect={onCollect} />)}
        </Physics>
        <OrbitControls />
      </Canvas>
      <HUD collected={collected.length} total={projects.length} />
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </>
  )
}
