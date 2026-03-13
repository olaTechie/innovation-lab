# Frontend Design Specification -- Innovation Lab v2

**Agent:** Senior Frontend Designer & 3D Graphics Expert
**Date:** 2026-03-13
**Scope:** Complete visual rebrand from generic dark-blue to University of Warwick aubergine identity, CSS 3D effects system, Three.js globe specification, animation keyframes, component-level UX improvements, and typography/spacing refinements.

---

## 1. CSS Custom Property Rebrand

### 1.1 Custom Property Mapping Table

| Property | Old Value | New Value | Notes |
|----------|-----------|-----------|-------|
| `--color-accent` | `#3b82f6` | `#7B2D8E` | Warwick aubergine primary |
| `--color-accent-hover` | `#60a5fa` | `#9B4DBA` | Lighter aubergine for hover states |
| `--color-accent-muted` | `rgba(59, 130, 246, 0.15)` | `rgba(123, 45, 142, 0.15)` | Aubergine tinted muted backgrounds |
| `--color-bg` | `#0a0e17` | `#0a0a12` | Slightly warmer dark, hint of purple undertone |
| `--color-bg-elevated` | `#111827` | `#12101f` | Purple-tinted elevated surface |
| `--color-bg-card` | `#1a2235` | `#1a1530` | Purple-tinted card background |
| `--color-bg-card-hover` | `#1f2a40` | `#221c3d` | Purple-tinted card hover |
| `--color-bg-input` | `#0f1623` | `#0e0c18` | Purple-tinted input background |
| `--color-border` | `#2a3548` | `#2a2245` | Purple-tinted border |
| `--color-border-light` | `#374357` | `#3d3160` | Purple-tinted lighter border |
| `--shadow-glow` | `0 0 20px rgba(59, 130, 246, 0.15)` | `0 0 20px rgba(123, 45, 142, 0.15)` | Aubergine glow |
| `--color-success` | `#10b981` | `#10b981` | No change |
| `--color-success-muted` | `rgba(16, 185, 129, 0.15)` | `rgba(16, 185, 129, 0.15)` | No change |
| `--color-warning` | `#f59e0b` | `#f59e0b` | No change |
| `--color-warning-muted` | `rgba(245, 158, 11, 0.15)` | `rgba(245, 158, 11, 0.15)` | No change |
| `--color-danger` | `#ef4444` | `#ef4444` | No change |
| `--color-danger-muted` | `rgba(239, 68, 68, 0.15)` | `rgba(239, 68, 68, 0.15)` | No change |
| `--color-text` | `#e8ecf4` | `#ede8f5` | Very subtle lavender tint on white text |
| `--color-text-secondary` | `#8b99b0` | `#9b8fb5` | Purple-tinted secondary text |
| `--color-text-muted` | `#5a6a82` | `#6a5d80` | Purple-tinted muted text |
| `--color-role-minister` | `#2563eb` | `#2563eb` | No change (role colors are identity) |
| `--color-role-tech` | `#9333ea` | `#9333ea` | No change |

**New custom properties to add:**

| Property | Value | Purpose |
|----------|-------|---------|
| `--color-secondary` | `#4472C4` | Warwick blue, for accents and secondary elements |
| `--color-secondary-hover` | `#5A8AD8` | Lighter Warwick blue hover state |
| `--color-secondary-muted` | `rgba(68, 114, 196, 0.15)` | Warwick blue muted background |
| `--color-accent-glow` | `rgba(123, 45, 142, 0.25)` | Stronger aubergine glow for focus states |
| `--color-accent-subtle` | `rgba(123, 45, 142, 0.08)` | Very faint aubergine background tint |
| `--color-glass-bg` | `rgba(18, 16, 31, 0.7)` | Glassmorphism background |
| `--color-glass-border` | `rgba(123, 45, 142, 0.15)` | Glassmorphism border |
| `--shadow-glow-strong` | `0 0 40px rgba(123, 45, 142, 0.25)` | Stronger glow for active/selected |
| `--shadow-glow-secondary` | `0 0 20px rgba(68, 114, 196, 0.15)` | Secondary blue glow |

### 1.2 Hardcoded Color Values Requiring Update

These are inline color values in component files and CSS that reference the old blue palette and must be changed:

#### `src/styles/index.css`

| Line | Old Value | New Value | Context |
|------|-----------|-----------|---------|
| 211 | `box-shadow: 0 0 20px rgba(59, 130, 246, 0.3)` | `box-shadow: 0 0 20px rgba(123, 45, 142, 0.3)` | `.btn-primary:hover` |
| 260 | `background: linear-gradient(90deg, var(--color-accent), #818cf8)` | `background: linear-gradient(90deg, var(--color-accent), #4472C4)` | `.progress-bar-fill` (aubergine to Warwick blue gradient) |
| 424 | `box-shadow: 0 0 5px rgba(59, 130, 246, 0.2)` | `box-shadow: 0 0 5px rgba(123, 45, 142, 0.2)` | `@keyframes glow 0%,100%` |
| 425 | `box-shadow: 0 0 20px rgba(59, 130, 246, 0.4)` | `box-shadow: 0 0 20px rgba(123, 45, 142, 0.4)` | `@keyframes glow 50%` |
| 495 | `filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.2))` | `filter: drop-shadow(0 0 30px rgba(123, 45, 142, 0.2))` | `.globe-svg` |

#### `src/components/Landing.tsx`

| Line | Old Value | New Value | Context |
|------|-----------|-----------|---------|
| 9 | `stopColor="#1e3a5f"` | `stopColor="#2a1540"` | `#globe-grad` radial gradient start |
| 10 | `stopColor="#0a1628"` | `stopColor="#0a0a12"` | `#globe-grad` radial gradient end |
| 14 | `stopColor="rgba(59,130,246,0.08)"` | `stopColor="rgba(123,45,142,0.08)"` | `#globe-glow` outer edge |
| 21 | `stroke="rgba(59,130,246,0.12)"` | `stroke="rgba(123,45,142,0.12)"` | Glow ring outer circle |
| 22 | `stroke="rgba(59,130,246,0.25)"` | `stroke="rgba(123,45,142,0.25)"` | Globe sphere stroke |
| 28 | `stroke="rgba(59,130,246,0.08)"` | `stroke="rgba(123,45,142,0.08)"` | Latitude grid lines |
| 31 | `stroke="rgba(59,130,246,0.08)"` | `stroke="rgba(123,45,142,0.08)"` | Longitude grid lines |
| 43 | `fill="#3b82f6"` | `fill="#7B2D8E"` | Asante pulsing marker |
| 47 | `fill="#60a5fa"` | `fill="#9B4DBA"` | Asante center dot |
| 49 | `stroke="rgba(59,130,246,0.3)"` | `stroke="rgba(123,45,142,0.3)"` | Arc path 1 |
| 52 | `stroke="rgba(59,130,246,0.3)"` | `stroke="rgba(123,45,142,0.3)"` | Arc path 2 |
| 92 | `rgba(59,130,246,0.08)` | `rgba(123,45,142,0.08)` | Background radial gradient |
| 120 | `linear-gradient(135deg, #e8ecf4 0%, #3b82f6 50%, #818cf8 100%)` | `linear-gradient(135deg, #ede8f5 0%, #7B2D8E 50%, #4472C4 100%)` | Title text gradient (white to aubergine to Warwick blue) |

#### `src/components/Dashboard.tsx`

| Line | Old Value | New Value | Context |
|------|-----------|-----------|---------|
| 119 | `fill="rgba(59,130,246,0.15)"` | `fill="rgba(123,45,142,0.15)"` | Radar chart polygon fill |

#### `src/utils/scoring.ts`

| Line | Old Value | New Value | Context |
|------|-----------|-----------|---------|
| 159 | `coverage: '#3b82f6'` | `coverage: '#4472C4'` | Score color for coverage metric (use Warwick blue since aubergine is accent) |

---

## 2. CSS 3D Effects

### 2.1 `.card-glass` -- Glassmorphism Card

```css
.card-glass {
  background: rgba(18, 16, 31, 0.7);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(123, 45, 142, 0.15);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: all var(--transition-base);
}
.card-glass:hover {
  border-color: rgba(123, 45, 142, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(123, 45, 142, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

### 2.2 `.depth-card` -- Perspective Transform on Hover

```css
.depth-card {
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
  will-change: transform;
  transform-style: preserve-3d;
}
.depth-card:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(-1deg) translateY(-4px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(123, 45, 142, 0.08);
}
/* Inner highlight layer -- apply to a ::before pseudo-element inside the card */
.depth-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(123, 45, 142, 0.06) 0%,
    transparent 50%,
    rgba(68, 114, 196, 0.04) 100%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.depth-card:hover::before {
  opacity: 1;
}
```

### 2.3 `.parallax-bg` -- Background Parallax Layers for Landing Page

```css
.parallax-bg {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

/* Layer 1: Deep-field stars (subtle dots) */
.parallax-bg__stars {
  position: absolute;
  inset: -20%;
  background-image:
    radial-gradient(1px 1px at 10% 20%, rgba(237, 232, 245, 0.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 30% 60%, rgba(237, 232, 245, 0.2) 0%, transparent 100%),
    radial-gradient(1px 1px at 50% 10%, rgba(237, 232, 245, 0.25) 0%, transparent 100%),
    radial-gradient(1px 1px at 70% 80%, rgba(237, 232, 245, 0.15) 0%, transparent 100%),
    radial-gradient(1px 1px at 90% 40%, rgba(237, 232, 245, 0.2) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 15% 75%, rgba(123, 45, 142, 0.3) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 85% 25%, rgba(68, 114, 196, 0.25) 0%, transparent 100%);
  background-size: 400px 400px;
  animation: parallaxDrift 120s linear infinite;
}

/* Layer 2: Aubergine nebula glow (upper) */
.parallax-bg__nebula-top {
  position: absolute;
  top: -30%;
  left: -20%;
  width: 80%;
  height: 70%;
  background: radial-gradient(
    ellipse at 40% 40%,
    rgba(123, 45, 142, 0.07) 0%,
    rgba(123, 45, 142, 0.03) 40%,
    transparent 70%
  );
  filter: blur(60px);
  animation: parallaxFloat 80s ease-in-out infinite alternate;
}

/* Layer 3: Blue nebula glow (lower-right) */
.parallax-bg__nebula-bottom {
  position: absolute;
  bottom: -20%;
  right: -15%;
  width: 60%;
  height: 60%;
  background: radial-gradient(
    ellipse at 60% 60%,
    rgba(68, 114, 196, 0.06) 0%,
    rgba(68, 114, 196, 0.02) 40%,
    transparent 70%
  );
  filter: blur(50px);
  animation: parallaxFloat 100s ease-in-out infinite alternate-reverse;
}

/* Layer 4: Vignette (darkens edges) */
.parallax-bg__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    transparent 30%,
    rgba(10, 10, 18, 0.6) 100%
  );
}

@keyframes parallaxDrift {
  from { transform: translate(0, 0); }
  to { transform: translate(-400px, -400px); }
}

@keyframes parallaxFloat {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(30px, -20px) scale(1.05); }
}
```

### 2.4 Enhanced `.btn-primary` Hover with 3D Lift

Replace the existing `.btn-primary` and `.btn-primary:hover` rules:

```css
.btn-primary {
  background: linear-gradient(135deg, #7B2D8E 0%, #6a2280 100%);
  color: white;
  position: relative;
  overflow: hidden;
  transform: translateY(0) translateZ(0);
  transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
}
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #9B4DBA 0%, #7B2D8E 100%);
  transform: translateY(-2px) translateZ(0);
  box-shadow:
    0 4px 12px rgba(123, 45, 142, 0.3),
    0 8px 24px rgba(123, 45, 142, 0.15);
}
.btn-primary:hover:not(:disabled)::before {
  opacity: 1;
}
.btn-primary:active:not(:disabled) {
  transform: translateY(0) translateZ(0);
  box-shadow: 0 2px 8px rgba(123, 45, 142, 0.2);
}
```

### 2.5 Updated `.choice-card` with Subtle Depth

Replace the existing `.choice-card` rules:

```css
.choice-card {
  background: var(--color-bg-card);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  transform: perspective(800px) rotateX(0deg);
}
.choice-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(123, 45, 142, 0.04) 0%,
    transparent 40%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.choice-card:hover {
  border-color: var(--color-accent);
  background: var(--color-bg-card-hover);
  transform: perspective(800px) rotateX(1deg) translateY(-3px);
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.25),
    0 0 20px rgba(123, 45, 142, 0.1);
}
.choice-card:hover::after {
  opacity: 1;
}
.choice-card.selected {
  border-color: var(--color-accent);
  background: rgba(123, 45, 142, 0.08);
  box-shadow:
    0 0 0 1px var(--color-accent),
    0 0 30px rgba(123, 45, 142, 0.15);
}
```

---

## 3. Three.js Globe Specification

### 3.1 File: `src/components/Globe3D.tsx`

Full React Three Fiber code specification:

```tsx
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
  const glowRef = useRef<THREE.Mesh>(null!)

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
    mid.normalize().multiplyScalar(2.2) // lift arc above surface
    return mid
  }

  return (
    <group ref={globeRef}>
      {/* Main globe sphere */}
      <Sphere args={[1.5, 64, 64]}>
        <meshStandardMaterial
          color="#1a0a2e"
          emissive="#7B2D8E"
          emissiveIntensity={0.04}
          roughness={0.85}
          metalness={0.1}
        />
      </Sphere>

      {/* Atmospheric glow shell */}
      <Sphere ref={glowRef} args={[1.58, 64, 64]}>
        <meshBasicMaterial
          color="#7B2D8E"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Wireframe grid overlay for geographic feel */}
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
          color="#9B4DBA"
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
```

### 3.2 Performance Notes

- **maxDpr:** Set to `[1, 1.5]` to cap pixel ratio on high-DPI displays. This prevents 3x rendering on Retina screens while still looking sharp at 1.5x.
- **frameloop:** Use `"always"` since we have auto-rotation and pulse animation. If frame budget is a concern, switch to `"demand"` and trigger invalidation manually on each `useFrame`.
- **`powerPreference: 'low-power'`:** Tells the browser to use integrated GPU on laptops, preserving battery for student devices.
- **Dynamic import:** In `Landing.tsx`, use:
  ```tsx
  const Globe3D = React.lazy(() => import('./Globe3D'))
  ```
  Wrap in `<Suspense fallback={<GlobeVisualization />}>` where `GlobeVisualization` is the existing SVG globe.
- **WebGL detection:** Before rendering, check:
  ```ts
  const hasWebGL = (() => {
    try {
      const c = document.createElement('canvas')
      return !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch { return false }
  })()
  ```
  If `hasWebGL` is false, render SVG fallback instead.

---

## 4. Animation Keyframes

### 4.1 `@keyframes cinematicFadeIn`

For stat number reveals in the CinematicIntro component. Each stat fades in from invisible with a slight scale.

```css
@keyframes cinematicFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.85);
    filter: blur(8px);
  }
  60% {
    opacity: 1;
    transform: scale(1.02);
    filter: blur(0px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
  }
}
/* Usage: animation: cinematicFadeIn 1.2s cubic-bezier(0.23, 1, 0.32, 1) both; */
```

### 4.2 `@keyframes cinematicSlideUp`

For text blocks that slide up beneath stat numbers.

```css
@keyframes cinematicSlideUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}
/* Usage: animation: cinematicSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.4s both; */
/* The 0.4s delay allows the stat number to appear first */
```

### 4.3 `@keyframes pulseGlow`

Aubergine glow pulse for active elements, selected states, and the "YOU ARE HERE" indicator.

```css
@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 8px rgba(123, 45, 142, 0.2), 0 0 16px rgba(123, 45, 142, 0.05);
  }
  50% {
    box-shadow: 0 0 16px rgba(123, 45, 142, 0.4), 0 0 40px rgba(123, 45, 142, 0.12);
  }
  100% {
    box-shadow: 0 0 8px rgba(123, 45, 142, 0.2), 0 0 16px rgba(123, 45, 142, 0.05);
  }
}
/* Usage: animation: pulseGlow 2.5s ease-in-out infinite; */
```

### 4.4 `@keyframes numberCount`

Counter animation for stat numbers. The text itself is updated by JS; this keyframe handles the visual entrance per digit tick.

```css
@keyframes numberCount {
  0% {
    opacity: 0.6;
    transform: translateY(4px);
  }
  50% {
    opacity: 1;
    transform: translateY(-1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Usage: animation: numberCount 0.15s ease-out; */
/* Apply to the number element on each value change via a CSS class toggle */
```

### 4.5 Enhanced `@keyframes fadeInUp`

Replace the existing `fadeInUp` with a smoother easing curve and longer travel distance:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Update the animation utility class: */
.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
}
```

### 4.6 Additional Keyframes

```css
/* For outcome card dramatic entrance */
@keyframes revealScale {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* For grade reveal in debrief */
@keyframes gradeReveal {
  0% {
    opacity: 0;
    transform: scale(2) translateY(-10px);
    filter: blur(12px);
  }
  60% {
    opacity: 1;
    transform: scale(1.1) translateY(0);
    filter: blur(0px);
  }
  80% {
    transform: scale(0.97);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
  }
}
/* Usage: animation: gradeReveal 1s cubic-bezier(0.23, 1, 0.32, 1) both; */

/* For stagger children -- updated with smoother curve */
.stagger-children > * {
  animation: fadeInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
}
```

---

## 5. Component-Level UX Improvements

### 5.1 RoleSelection

**Card Layout:**
- Switch from `auto-fit, minmax(300px, 1fr)` to a fixed 3-column grid for desktop. On tablet (< 1024px), drop to 2 columns. On mobile (< 640px), single column.
- Add `.card-glass` class to each role card for glassmorphism.
- Apply `.depth-card` class for 3D hover.

```css
/* Role grid override */
.role-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}
@media (max-width: 1024px) {
  .role-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .role-grid { grid-template-columns: 1fr; }
}
```

**Selection Animation:**
- When a card is selected, add `pulseGlow` animation on the border.
- Replace the current `boxShadow: selectedId === role.id ? '0 0 20px ${role.color}22' : undefined` with:
  ```tsx
  style={{
    borderColor: selectedId === role.id ? role.color : undefined,
    animation: selectedId === role.id ? 'pulseGlow 2.5s ease-in-out infinite' : undefined,
  }}
  ```
- The `pulseGlow` keyframe should be overridden inline to use the role's color instead of aubergine. In the style attribute:
  ```tsx
  boxShadow: selectedId === role.id
    ? `0 0 16px ${role.color}33, 0 0 40px ${role.color}15`
    : undefined,
  ```

**Color Treatment:**
- The role icon background should use `backdrop-filter: blur(8px)` and increase opacity: `background: ${role.color}22` (from `18`).
- Badge chips for metrics: use `background: ${role.color}12` with `border: 1px solid ${role.color}22`.

**Detail Panel:**
- Apply `.card-glass` to the detail panel (currently uses `background: var(--color-bg-elevated)`).
- Add `animation: revealScale 0.4s cubic-bezier(0.23, 1, 0.32, 1) both` instead of `animate-fade-in-up`.
- The "Accept Mission" button should use the role's color as background with a subtle gradient:
  ```tsx
  style={{
    background: `linear-gradient(135deg, ${selected.color}, ${selected.color}cc)`,
  }}
  ```

### 5.2 CountryBriefing

**Map Visualization:**
- Wrap the SVG `RegionMap` in a `.card-glass` instead of plain `.card`.
- Add a subtle CSS `filter: drop-shadow(0 0 20px rgba(123, 45, 142, 0.1))` on the SVG container.
- Increase the animated dot for Lumasa Metro capital to add a faint glow ring:
  ```xml
  <circle cx="230" cy="120" r="8" fill="none" stroke="currentColor" opacity="0.2">
    <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2s" repeatCount="indefinite" />
  </circle>
  ```

**Stat Card Depth:**
- Apply `.depth-card` class to each stat card in the grid.
- Add a subtle left border using aubergine:
  ```tsx
  style={{ borderLeft: '2px solid rgba(123, 45, 142, 0.3)' }}
  ```
- Animate stat values on mount with `cinematicFadeIn`:
  ```tsx
  <div className="stat-card-value text-accent" style={{
    fontSize: '1.1rem',
    animation: `cinematicFadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 80}ms both`,
  }}>
  ```

**Layout Improvements:**
- The `COUNTRY BRIEFING` badge should use `background: rgba(123, 45, 142, 0.12)` and `color: #9B4DBA` instead of `--color-accent-muted`/`--color-accent` (these will auto-update with the custom property rebrand, but verify consistency).
- The region cards (`borderLeft: 3px solid ${region.color}`) are fine as-is. Add a subtle `backdrop-filter: blur(4px)` to each:
  ```css
  .region-card {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
  ```

**Geography/Health System Cards:**
- Change the h4 color from `var(--color-accent)` to `var(--color-secondary)` for these two informational cards, creating visual hierarchy (aubergine = interactive, blue = informational).

### 5.3 ScenarioEngine

**Narrative Text Treatment:**
- Add a left-side decorative border to the narrative area:
  ```css
  .narrative-container {
    position: relative;
    padding-left: var(--space-lg);
  }
  .narrative-container::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      180deg,
      rgba(123, 45, 142, 0.4) 0%,
      rgba(123, 45, 142, 0.1) 50%,
      transparent 100%
    );
  }
  ```
- The `narrative-text` class should have a slightly increased `font-size: 1.08rem` and `line-height: 1.85`.

**Choice Card Depth:**
- Apply the updated `.choice-card` from Section 2.5 above.
- Add sequential stagger delays to choice cards:
  ```tsx
  style={{ animationDelay: `${index * 100}ms` }}
  ```

**Outcome Reveal:**
- Replace the current `.outcome-overlay` background with a stronger aubergine tint:
  ```css
  .outcome-overlay {
    background: rgba(10, 10, 18, 0.9);
    backdrop-filter: blur(12px);
  }
  ```
- Replace the `.outcome-card` animation from `fadeInScale 0.4s` to `revealScale 0.5s cubic-bezier(0.23, 1, 0.32, 1)`.
- Add a top-border glow on the outcome card:
  ```css
  .outcome-card {
    border-top: 2px solid rgba(123, 45, 142, 0.4);
    box-shadow:
      0 -8px 30px rgba(123, 45, 142, 0.1),
      0 20px 60px rgba(0, 0, 0, 0.5);
  }
  ```

**Briefing Screen:**
- The SCENARIO badge (currently `color-danger-muted / color-danger`) should remain red to convey urgency -- no change needed.
- Add `cinematicSlideUp` animation to the scenario title h1:
  ```tsx
  style={{
    animation: 'cinematicSlideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both',
  }}
  ```

**Context Card (left sidebar):**
- Change the context card `borderLeft` from `var(--color-accent)` to `var(--color-secondary)` (`#4472C4`) for the "Situation" card. This differentiates informational context (blue) from interactive elements (aubergine).

### 5.4 InnovationAssembly

**Drag/Drop Visual Feedback:**
- When dragging, apply a stronger shadow and aubergine border glow:
  ```css
  .innovation-card.dragging {
    opacity: 0.7;
    transform: scale(1.03) rotate(1deg);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.4),
      0 0 24px rgba(123, 45, 142, 0.2);
    border-color: rgba(123, 45, 142, 0.4);
  }
  ```
- The drop zone active state should pulse:
  ```css
  .drop-zone.drag-over {
    border-color: var(--color-accent);
    background: rgba(123, 45, 142, 0.06);
    animation: pulseGlow 1.5s ease-in-out infinite;
  }
  ```
- On successful deploy, flash the deployed item briefly:
  ```css
  .deploy-flash {
    animation: deployFlash 0.6s ease both;
  }
  @keyframes deployFlash {
    0% { background: rgba(123, 45, 142, 0.3); }
    100% { background: transparent; }
  }
  ```

**Budget Visualization:**
- Replace the thin progress bar with a more prominent budget gauge. Add a CSS class:
  ```css
  .budget-gauge {
    height: 10px;
    border-radius: var(--radius-full);
    background: var(--color-bg-input);
    overflow: hidden;
    position: relative;
  }
  .budget-gauge-fill {
    height: 100%;
    border-radius: var(--radius-full);
    background: linear-gradient(90deg, #10b981, var(--color-warning));
    transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .budget-gauge-fill.critical {
    background: linear-gradient(90deg, var(--color-warning), var(--color-danger));
  }
  ```

**Innovation Card Hover:**
- Add `.depth-card` behavior to innovation cards. Since they have a left border color, the hover state should intensify it:
  ```tsx
  style={{
    borderLeft: `3px solid ${getCategoryColor(inn.category)}`,
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
  }}
  ```
- On hover, increase left border width to 4px and add the category color glow:
  ```css
  .innovation-card:hover {
    border-left-width: 4px;
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.3),
      -4px 0 16px rgba(var(--card-accent-rgb), 0.1);
  }
  ```

### 5.5 Debrief

**Radar Chart Styling:**
- In `Dashboard.tsx` line 119, the polygon fill changes from `rgba(59,130,246,0.15)` to `rgba(123,45,142,0.15)`.
- The polygon stroke (`var(--color-accent)`) will auto-update with the custom property change.
- Add a subtle drop shadow to the radar SVG:
  ```tsx
  <svg viewBox={...} style={{
    width: size,
    height: size,
    filter: 'drop-shadow(0 0 12px rgba(123, 45, 142, 0.1))',
  }}>
  ```

**Grade Reveal Animation:**
- Apply `gradeReveal` animation to the overall score number:
  ```tsx
  <div style={{
    fontSize: '3rem',
    fontWeight: 900,
    fontFamily: 'var(--font-mono)',
    color: overallGrade.color,
    lineHeight: 1,
    animation: 'gradeReveal 1s cubic-bezier(0.23, 1, 0.32, 1) both',
  }}>
    {overallScore}
  </div>
  ```
- Apply with a slight delay to the role-weighted score:
  ```tsx
  style={{ animation: 'gradeReveal 1s cubic-bezier(0.23, 1, 0.32, 1) 0.3s both' }}
  ```

**Score Card Styling:**
- Apply `.card-glass` to the two top-level score cards (Overall Performance and Role-Weighted Score).
- Add a subtle top border in the grade color:
  ```tsx
  style={{ borderTop: `2px solid ${overallGrade.color}` }}
  ```

**Tab Bar:**
- Replace the ghost/primary button toggle with a more polished tab bar:
  ```css
  .tab-bar {
    display: flex;
    gap: 2px;
    background: var(--color-bg-input);
    border-radius: var(--radius-md);
    padding: 3px;
    margin-bottom: var(--space-xl);
  }
  .tab-bar-item {
    padding: 8px 16px;
    border-radius: calc(var(--radius-md) - 2px);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  .tab-bar-item:hover {
    color: var(--color-text);
    background: rgba(123, 45, 142, 0.08);
  }
  .tab-bar-item.active {
    color: white;
    background: var(--color-accent);
    box-shadow: 0 2px 8px rgba(123, 45, 142, 0.25);
  }
  ```

**Reflection Prompts:**
- Add numbered step indicators with aubergine circles:
  ```css
  .reflection-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(123, 45, 142, 0.15);
    color: #9B4DBA;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  ```

### 5.6 Dashboard (Metric Bars)

**Metric Bar Treatment:**
- Add a subtle glass effect to the track background:
  ```css
  .metric-bar-track {
    height: 8px;
    background: rgba(14, 12, 24, 0.6);
    border: 1px solid rgba(123, 45, 142, 0.06);
    border-radius: var(--radius-full);
    overflow: hidden;
    position: relative;
    backdrop-filter: blur(4px);
  }
  ```

**Delta Indicators:**
- Add directional arrow icons to delta values. Positive deltas get an upward arrow, negative get downward:
  ```css
  .score-delta.positive::before {
    content: '\25B2 '; /* up triangle */
    font-size: 0.6rem;
  }
  .score-delta.negative::before {
    content: '\25BC '; /* down triangle */
    font-size: 0.6rem;
  }
  ```
- Add a subtle background pill behind delta values:
  ```css
  .score-delta {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: var(--radius-full);
  }
  .score-delta.positive {
    color: var(--color-success);
    background: rgba(16, 185, 129, 0.1);
  }
  .score-delta.negative {
    color: var(--color-danger);
    background: rgba(239, 68, 68, 0.1);
  }
  ```

### 5.7 Sandbox

- Apply `.card-glass` to the "Live Score" card on the right panel.
- The slider thumb should use aubergine color (this will auto-update with the `--color-accent` rebrand).
- Add a visual comparison indicator between sandbox and original scores on the "Detailed Metrics" section: the ghost bar should use a dashed style with `border-right: 2px dashed rgba(123, 45, 142, 0.4)` (updating from the current `rgba(255, 255, 255, 0.3)`).

### 5.8 Header Bar (Global)

- Add a very subtle aubergine gradient along the bottom border:
  ```css
  .header-bar {
    background: rgba(18, 16, 31, 0.85);
    border-bottom: none;
    box-shadow: 0 1px 0 rgba(123, 45, 142, 0.15);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .header-bar::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(123, 45, 142, 0.3) 50%,
      transparent 100%
    );
  }
  ```

---

## 6. Typography & Spacing

### 6.1 Font Weight Adjustments

| Element | Current Weight | New Weight | Rationale |
|---------|---------------|------------|-----------|
| `h1` | `700` (via heading rule) | `800` | Increased prominence for page titles |
| `h2` | `700` | `700` | No change |
| `h3` | `700` | `600` | Reduce weight -- h3 is used for section subheads, not page titles |
| `h4` | `700` | `600` | Same rationale; h4 is card titles |
| `.btn` | `600` | `600` | No change |
| `.btn-lg` | `600` | `700` | Large buttons should feel bolder |
| `.badge` | `600` | `700` | Badges need to pop at small sizes |
| `.stat-card-value` | `700` | `800` | Stat numbers are hero elements |
| `.narrative-text` | `400` (implicit) | `400` | No change; body text stays normal weight |

Updated CSS:
```css
h1, h2, h3, h4 {
  line-height: 1.2;
  letter-spacing: -0.02em;
}
h1 { font-size: 2.5rem; font-weight: 800; }
h2 { font-size: 1.75rem; font-weight: 700; }
h3 { font-size: 1.25rem; font-weight: 600; }
h4 { font-size: 1.05rem; font-weight: 600; }
```

### 6.2 Line-Height Refinements

| Element | Current | New | Rationale |
|---------|---------|-----|-----------|
| `body` | `1.6` | `1.65` | Slightly more generous default |
| `h1` | `1.2` | `1.1` | Tighter for display headlines |
| `h2` | `1.2` | `1.2` | No change |
| `.narrative-text` | `1.8` | `1.85` | Slightly more open for immersive reading |
| `.text-sm` | Inherited | `1.5` | Explicit line-height for small text |
| `.stat-card-value` | `1` | `1` | No change; numbers are single-line |

Updated CSS:
```css
body {
  line-height: 1.65;
}
h1 { line-height: 1.1; }
.narrative-text {
  font-size: 1.08rem;
  line-height: 1.85;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.5;
}
```

### 6.3 Spacing Rhythm Changes

The current spacing scale is fine but add two additional values for cinematic layouts:

| Property | Value | Purpose |
|----------|-------|---------|
| `--space-4xl` | `6rem` | Vertical spacing in CinematicIntro between slides |
| `--space-5xl` | `8rem` | Top/bottom padding on full-viewport landing phases |

Updated CSS (add to `:root`):
```css
--space-4xl: 6rem;
--space-5xl: 8rem;
```

**Phase transition padding:** Currently `var(--space-xl)` (2rem) is used for most phase containers. The landing phases and cinematic intro should use:
- Hero section vertical padding: `var(--space-5xl) var(--space-xl)` (8rem top/bottom, 2rem sides)
- Between-section gaps in debrief: increase from `var(--space-xl)` to `var(--space-2xl)` for the top-level score cards

### 6.4 Google Fonts

The current stack uses Inter (sans) and JetBrains Mono. No changes to the font families are needed -- Inter is an excellent UI font, and JetBrains Mono is ideal for data values. However, ensure the Inter import includes weight 800:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
```

The current `index.html` should already import these, but verify that weights 800 and 900 are included (weight 900 is used in the landing title).

---

## Appendix A: Warwick Crest Placeholder

For the header bar and landing page, use a simple placeholder for the Warwick crest:

```css
.warwick-crest {
  width: 32px;
  height: 32px;
  background: #7B2D8E;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 18px;
  font-family: var(--font-sans);
  letter-spacing: -0.02em;
  flex-shrink: 0;
}
```

Render as:
```tsx
<div className="warwick-crest">W</div>
```

## Appendix B: Full Updated `:root` Block

For reference, here is the complete `:root` block after all changes:

```css
:root {
  /* Color Palette - University of Warwick Identity */
  --color-bg: #0a0a12;
  --color-bg-elevated: #12101f;
  --color-bg-card: #1a1530;
  --color-bg-card-hover: #221c3d;
  --color-bg-input: #0e0c18;
  --color-border: #2a2245;
  --color-border-light: #3d3160;
  --color-text: #ede8f5;
  --color-text-secondary: #9b8fb5;
  --color-text-muted: #6a5d80;
  --color-accent: #7B2D8E;
  --color-accent-hover: #9B4DBA;
  --color-accent-muted: rgba(123, 45, 142, 0.15);
  --color-accent-glow: rgba(123, 45, 142, 0.25);
  --color-accent-subtle: rgba(123, 45, 142, 0.08);
  --color-secondary: #4472C4;
  --color-secondary-hover: #5A8AD8;
  --color-secondary-muted: rgba(68, 114, 196, 0.15);
  --color-success: #10b981;
  --color-success-muted: rgba(16, 185, 129, 0.15);
  --color-warning: #f59e0b;
  --color-warning-muted: rgba(245, 158, 11, 0.15);
  --color-danger: #ef4444;
  --color-danger-muted: rgba(239, 68, 68, 0.15);
  --color-glass-bg: rgba(18, 16, 31, 0.7);
  --color-glass-border: rgba(123, 45, 142, 0.15);

  /* Role Colors (unchanged) */
  --color-role-minister: #2563eb;
  --color-role-ngo: #16a34a;
  --color-role-chw: #ea580c;
  --color-role-tech: #9333ea;
  --color-role-who: #0891b2;
  --color-role-advocate: #dc2626;

  /* Innovation Category Colors (unchanged) */
  --color-cat-frugal: #16a34a;
  --color-cat-social: #0891b2;
  --color-cat-digital: #7c3aed;
  --color-cat-genai: #db2777;
  --color-cat-patient: #ea580c;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --space-5xl: 8rem;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(123, 45, 142, 0.15);
  --shadow-glow-strong: 0 0 40px rgba(123, 45, 142, 0.25);
  --shadow-glow-secondary: 0 0 20px rgba(68, 114, 196, 0.15);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```
