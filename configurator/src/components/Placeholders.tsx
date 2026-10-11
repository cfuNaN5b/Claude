// Simple shapes drawn when a part has no GLB yet, so the configurator works
// end to end before the real models exist. Units are metres.

const BASE_HEIGHT = 0.03

function Paint({ color }: { color: string }) {
  return <meshStandardMaterial color={color} roughness={0.55} />
}

export function PlaceholderStand({ height, color }: { height: number; color: string }) {
  return (
    <group>
      <mesh position={[0, BASE_HEIGHT / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.32, BASE_HEIGHT, 64]} />
        <Paint color={color} />
      </mesh>
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[0.09, height, 0.05]} />
        <Paint color={color} />
      </mesh>
      {/* 55" screen for scale */}
      <mesh position={[0, height + 0.25, 0.06]} castShadow>
        <boxGeometry args={[1.23, 0.71, 0.03]} />
        <meshStandardMaterial color="#111" roughness={0.25} metalness={0.4} />
      </mesh>
    </group>
  )
}

export function PlaceholderShelf({ height, color }: { height: number; color: string }) {
  return (
    <mesh position={[0, height * 0.45, 0.12]} castShadow receiveShadow>
      <boxGeometry args={[0.5, 0.02, 0.28]} />
      <Paint color={color} />
    </mesh>
  )
}

export function PlaceholderWheels() {
  return (
    <group>
      {[0, 1, 2, 3].map(i => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4
        return (
          <mesh key={i} position={[Math.cos(a) * 0.24, -0.015, Math.sin(a) * 0.24]} castShadow>
            <sphereGeometry args={[0.025, 24, 16]} />
            <meshStandardMaterial color="#222" roughness={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}
