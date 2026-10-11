import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { data } from '../data'
import { useConfig } from '../store'
import { Model } from './Model'
import { PlaceholderShelf, PlaceholderStand, PlaceholderWheels } from './Placeholders'

function Configuration() {
  const { stand: standId, color: colorName, accessories } = useConfig()
  const stand = data.stands.find(s => s.id === standId)
  const color = data.colors.find(c => c.name === colorName)?.swatch ?? '#ccc'
  if (!stand) return null

  const height = stand.height / 100
  const hasWheels = accessories.some(id => data.accessories.find(a => a.id === id)?.kind === 'wheels')

  return (
    // Wheels lift the whole stand.
    <group position={[0, hasWheels ? 0.04 : 0, 0]}>
      {stand.model ? <Model url={stand.model} color={color} /> : <PlaceholderStand height={height} color={color} />}
      {data.accessories
        .filter(a => accessories.includes(a.id))
        .map(a =>
          a.model ? (
            <Model key={a.id} url={a.model} color={color} />
          ) : a.kind === 'wheels' ? (
            <PlaceholderWheels key={a.id} />
          ) : (
            <PlaceholderShelf key={a.id} height={height} color={color} />
          ),
        )}
    </group>
  )
}

export function Scene() {
  return (
    <Canvas shadows="percentage" dpr={[1, 2]} camera={{ position: [3, 1.6, 3.6], fov: 35 }}>
      <color attach="background" args={['#f2f0ec']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      {/* Studio lighting built from light panels, so no HDR file has to be downloaded. */}
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 4, 0]} rotation-x={Math.PI / 2} scale={[6, 6, 1]} />
        <Lightformer intensity={1} position={[-4, 1, 2]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
        <Lightformer intensity={1} position={[4, 1, 2]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Configuration />
      </Suspense>
      <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={4} blur={2.4} far={2} />
      <OrbitControls
        target={[0, 0.9, 0]}
        enablePan={false}
        minDistance={1.8}
        maxDistance={7}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
    </Canvas>
  )
}
