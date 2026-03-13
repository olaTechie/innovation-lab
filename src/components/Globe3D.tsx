import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, QuadraticBezierLine } from '@react-three/drei'
import * as THREE from 'three'

// Convert lat/lon to 3D coordinates on a sphere
function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function GlobeMesh() {
  const globeRef = useRef<THREE.Group>(null!)
  const markerRef = useRef<THREE.Mesh>(null!)

  // Slow auto-rotation
  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05
    }
  })

  // Asante marker pulse
  useFrame(({ clock }) => {
    if (markerRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.3
      markerRef.current.scale.setScalar(scale)
    }
  })

  // Asante coordinates: approximately 5 deg S, 30 deg E
  const asantePos = useMemo(() => latLonToVec3(-5, 30, 1.52), [])

  // Connection destinations
  const genevaPos = useMemo(() => latLonToVec3(46.2, 6.1, 1.52), [])   // Geneva (WHO HQ)
  const delhiPos = useMemo(() => latLonToVec3(28.6, 77.2, 1.52), [])    // Delhi (tech hub)
  const londonPos = useMemo(() => latLonToVec3(51.5, -0.1, 1.52), [])   // London (Warwick proximity)

  // Midpoint lifted above sphere surface for arc curvature
  const arcMid = (a: THREE.Vector3, b: THREE.Vector3): THREE.Vector3 => {
    const mid = a.clone().add(b).multiplyScalar(0.5)
    mid.normalize().multiplyScalar(2.2)
    return mid
  }

  return (
    <group ref={globeRef}>
      {/* Main globe sphere */}
      <Sphere args={[1.5, 64, 64]}>
        <meshStandardMaterial
          color="#1a0a2e"
          emissive="#7B2D8E"
          emissiveIntensity={0.05}
          roughness={0.85}
          metalness={0.1}
        />
      </Sphere>

      {/* Atmospheric glow shell */}
      <Sphere args={[1.58, 64, 64]}>
        <meshBasicMaterial
          color="#7B2D8E"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Wireframe grid overlay */}
      <Sphere args={[1.505, 24, 24]}>
        <meshBasicMaterial
          color="#7B2D8E"
          wireframe
          transparent
          opacity={0.06}
        />
      </Sphere>

      {/* Asante marker: pulsing dot */}
      <mesh ref={markerRef} position={asantePos}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial
          color="#7B2D8E"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Asante marker: outer glow ring */}
      <mesh position={asantePos}>
        <ringGeometry args={[0.05, 0.08, 32]} />
        <meshBasicMaterial
          color="#7B2D8E"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Connection arcs */}
      <QuadraticBezierLine
        start={asantePos}
        mid={arcMid(asantePos, genevaPos)}
        end={genevaPos}
        color="#7B2D8E"
        opacity={0.25}
        transparent
        lineWidth={1.5}
        dashed
        dashScale={8}
        dashSize={0.4}
        dashOffset={0}
      />
      <QuadraticBezierLine
        start={asantePos}
        mid={arcMid(asantePos, delhiPos)}
        end={delhiPos}
        color="#4472C4"
        opacity={0.2}
        transparent
        lineWidth={1.2}
        dashed
        dashScale={10}
        dashSize={0.3}
        dashOffset={0}
      />
      <QuadraticBezierLine
        start={asantePos}
        mid={arcMid(asantePos, londonPos)}
        end={londonPos}
        color="#7B2D8E"
        opacity={0.2}
        transparent
        lineWidth={1.2}
        dashed
        dashScale={10}
        dashSize={0.3}
        dashOffset={0}
      />

      {/* Small destination dots */}
      {[genevaPos, delhiPos, londonPos].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshBasicMaterial color="#9B4DBA" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export default function Globe3D() {
  return (
    <Canvas
      style={{
        width: '100%',
        height: 400,
        maxWidth: 500,
        margin: '0 auto',
      }}
      dpr={[1, 1.5]}
      camera={{
        position: [0, 0, 4.5],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      frameloop="always"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      }}
    >
      <color attach="background" args={['#0a0a12']} />

      {/* Lighting */}
      <ambientLight intensity={0.3} color="#ede8f5" />
      <directionalLight
        position={[5, 3, 5]}
        intensity={0.6}
        color="#ede8f5"
      />
      <directionalLight
        position={[-3, -2, -3]}
        intensity={0.15}
        color="#7B2D8E"
      />
      {/* Rim light for edge definition */}
      <pointLight
        position={[-4, 2, -3]}
        intensity={0.4}
        color="#4472C4"
        distance={12}
      />

      <GlobeMesh />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  )
}
