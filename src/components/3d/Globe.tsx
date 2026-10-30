import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  MathUtils,
  SRGBColorSpace,
  type BufferGeometry,
  type Group,
  type Mesh,
  type Points,
} from "three";
import type { Theme } from "../../hooks/useTheme";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { createSeededRandom } from "../../lib/random";

/*
 * Wireframe globe with two orbital rings and a "breathing" particle core.
 * Ported from the Google Stitch hero design (plain three.js r125) to R3F.
 * Every animation is driven by elapsed seconds, never by frame count, so it
 * runs at the same speed on 60 Hz, 120 Hz, and 144 Hz displays.
 */

interface GlobePalette {
  wire: string;
  wireOpacity: number;
  ring: string;
  ringOpacity: number;
  particleDeep: string;
  particleBright: string;
  particleOpacity: number;
  ambientIntensity: number;
  keyLight: string;
  fillLight: string;
  lightIntensity: number;
}

// WebGL materials cannot read CSS custom properties, so the scene keeps its own
// palette. Values come from the Stitch design (see the globe reference screenshots).
const PALETTES: Record<Theme, GlobePalette> = {
  dark: {
    wire: "#3b82f6",
    wireOpacity: 0.35,
    ring: "#60a5fa",
    ringOpacity: 0.8, // Stitch code had 0.4; raised to match the dark reference screenshot.
    particleDeep: "#3b82f6",
    particleBright: "#ffffff",
    particleOpacity: 0.98,
    ambientIntensity: 0.6,
    keyLight: "#3b82f6",
    fillLight: "#60a5fa",
    lightIntensity: 2.5,
  },
  light: {
    wire: "#2563eb",
    wireOpacity: 0.45,
    ring: "#1d4ed8",
    ringOpacity: 0.35,
    particleDeep: "#1e3a8a",
    particleBright: "#60a5fa",
    particleOpacity: 0.85,
    ambientIntensity: 0.9,
    keyLight: "#3b82f6",
    fillLight: "#60a5fa",
    lightIntensity: 3.2,
  },
};

// The design was tuned with three.js r125 "legacy" lights, which implicitly
// multiplied intensities by PI and did not use inverse-square decay.
const LEGACY_LIGHT_SCALE = Math.PI;

const GLOBE_RADIUS = 3.6;
const RING_RADIUS = 4.3;

const PARTICLE_COUNT = 1800;
const PARTICLE_CORE_RADIUS = 1.45;
const PARTICLE_SEED = 20251030;

// Centre of the hero's radial glow (see the `hero-glow` utility in index.css).
const GLOW_CENTER_X = 0.66;
const GLOW_CENTER_Y = 0.42;
const WIDE_LAYOUT_MIN_WIDTH = 1024;

// Below the wide breakpoint the canvas is the area the page reserves above the
// hero text, and the whole sculpture is scaled to fit inside it, rings included.
// The rings reach 4.3 units; perspective makes their near side project up to
// about 4.7, so that is the radius to fit.
const SCULPTURE_EXTENT_RADIUS = 4.7;
const NARROW_FIT_RATIO = 0.92;

// Matches the original per-frame lerp of 0.04 at 60 fps: -ln(1 - 0.04) * 60.
const POINTER_DAMPING = 2.45;
// Caps the step after a hidden tab or a long frame so motion never jumps.
const MAX_FRAME_DELTA = 0.1;

interface ParticleField {
  positions: Float32Array;
  baseRadius: Float32Array;
  theta: Float32Array;
  phi: Float32Array;
  speed: Float32Array;
  /** 0 = deep colour, 1 = bright colour; resolved against the active palette. */
  brightness: Float32Array;
}

function createParticleField(): ParticleField {
  const random = createSeededRandom(PARTICLE_SEED);
  const field: ParticleField = {
    positions: new Float32Array(PARTICLE_COUNT * 3),
    baseRadius: new Float32Array(PARTICLE_COUNT),
    theta: new Float32Array(PARTICLE_COUNT),
    phi: new Float32Array(PARTICLE_COUNT),
    speed: new Float32Array(PARTICLE_COUNT),
    brightness: new Float32Array(PARTICLE_COUNT),
  };

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = Math.pow(random(), 1.35) * PARTICLE_CORE_RADIUS;
    const th = random() * Math.PI * 2;
    const ph = Math.acos(2 * random() - 1);

    field.baseRadius[i] = r;
    field.theta[i] = th;
    field.phi[i] = ph;
    field.speed[i] = 0.5 + random() * 0.9;
    field.brightness[i] = r < PARTICLE_CORE_RADIUS * 0.45 ? 1 : random() * 0.7;

    field.positions[i * 3] = r * Math.sin(ph) * Math.cos(th);
    field.positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    field.positions[i * 3 + 2] = r * Math.cos(ph);
  }

  return field;
}

function createParticleColors(
  field: ParticleField,
  palette: GlobePalette,
): Float32Array {
  const deep = new Color(palette.particleDeep);
  const bright = new Color(palette.particleBright);
  const mixed = new Color();
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    mixed.lerpColors(deep, bright, field.brightness[i]);
    mixed.toArray(colors, i * 3);
  }

  return colors;
}

function createDotTexture(): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(224,242,254,0.92)");
    gradient.addColorStop(0.7, "rgba(59,130,246,0.4)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

interface PointerTarget {
  x: number;
  y: number;
}

/** Tracks the pointer across the whole window, normalised to -1..1 (the canvas itself ignores pointer events). */
function useWindowPointer() {
  const target = useRef<PointerTarget>({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return target;
}

interface GlobeSceneProps {
  palette: GlobePalette;
  animate: boolean;
}

function GlobeScene({ palette, animate }: GlobeSceneProps) {
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);
  const isWide = size.width >= WIDE_LAYOUT_MIN_WIDTH;

  const sculptureRef = useRef<Group>(null);
  const outerRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const particlesRef = useRef<Points>(null);
  const particleGeometryRef = useRef<BufferGeometry>(null);

  const elapsed = useRef(0);
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 });
  const pointerTarget = useWindowPointer();

  const field = useMemo(() => createParticleField(), []);
  // Recomputed on every theme switch so the particles follow the active palette.
  const particleColors = useMemo(
    () => createParticleColors(field, palette),
    [field, palette],
  );
  const dotTexture = useMemo(() => createDotTexture(), []);
  useEffect(() => () => dotTexture.dispose(), [dotTexture]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, MAX_FRAME_DELTA);
    if (animate) elapsed.current += dt;
    const t = elapsed.current;

    const p = pointer.current;
    p.x = MathUtils.damp(p.x, pointerTarget.current.x, POINTER_DAMPING, dt);
    p.y = MathUtils.damp(p.y, pointerTarget.current.y, POINTER_DAMPING, dt);

    const sculpture = sculptureRef.current;
    if (sculpture) {
      sculpture.rotation.y = t * 0.12 + p.x * 0.45;
      sculpture.rotation.x = Math.sin(t * 0.08) * 0.15 + p.y * 0.35;
    }
    if (outerRef.current) outerRef.current.rotation.z = -t * 0.04;
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.12;

    const particles = particlesRef.current;
    if (particles) {
      particles.rotation.y = t * 0.06;
      particles.rotation.z = Math.sin(t * 0.04) * 0.05;
    }

    const position = particleGeometryRef.current?.attributes.position;
    if (position) {
      const array = position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const currentTheta = field.theta[i] + t * 0.18 * field.speed[i];
        const currentPhi = field.phi[i] + Math.sin(t * 0.8 + i) * 0.02;
        const r =
          field.baseRadius[i] * (1 + Math.sin(t * 1.8 + i * 0.1) * 0.08);

        array[i * 3] = r * Math.sin(currentPhi) * Math.cos(currentTheta);
        array[i * 3 + 1] = r * Math.sin(currentPhi) * Math.sin(currentTheta);
        array[i * 3 + 2] = r * Math.cos(currentPhi);
      }
      position.needsUpdate = true;
    }
  });

  // viewport.factor = screen pixels per world unit at the globe's depth (z = 0).
  const narrowFitPx = Math.min(size.width, size.height) * NARROW_FIT_RATIO;
  const position: [number, number, number] = isWide
    ? [
        (GLOW_CENTER_X - 0.5) * viewport.width,
        (0.5 - GLOW_CENTER_Y) * viewport.height,
        0,
      ]
    : [0, 0, 0];
  const scale = isWide
    ? 1
    : narrowFitPx / viewport.factor / (SCULPTURE_EXTENT_RADIUS * 2);

  return (
    <>
      <ambientLight intensity={palette.ambientIntensity * LEGACY_LIGHT_SCALE} />
      <pointLight
        position={[5, 5, 6]}
        color={palette.keyLight}
        intensity={palette.lightIntensity * LEGACY_LIGHT_SCALE}
        distance={25}
        decay={0}
      />
      <pointLight
        position={[-6, -4, 4]}
        color={palette.fillLight}
        intensity={palette.lightIntensity * 0.7 * LEGACY_LIGHT_SCALE}
        distance={20}
        decay={0}
      />

      <group ref={sculptureRef} position={position} scale={scale}>
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[GLOBE_RADIUS, 3]} />
          <meshStandardMaterial
            color={palette.wire}
            opacity={palette.wireOpacity}
            wireframe
            transparent
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[RING_RADIUS, 0.018, 16, 100]} />
          <meshBasicMaterial
            color={palette.ring}
            opacity={palette.ringOpacity}
            transparent
          />
        </mesh>
        <mesh ref={ring2Ref} rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
          <torusGeometry args={[RING_RADIUS, 0.018, 16, 100]} />
          <meshBasicMaterial
            color={palette.ring}
            opacity={palette.ringOpacity}
            transparent
          />
        </mesh>

        <points ref={particlesRef}>
          <bufferGeometry ref={particleGeometryRef}>
            <bufferAttribute
              attach="attributes-position"
              args={[field.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.18}
            map={dotTexture}
            opacity={palette.particleOpacity}
            vertexColors
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>
      </group>
    </>
  );
}

interface GlobeProps {
  theme: Theme;
  className?: string;
}

function Globe({ theme, className }: GlobeProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Canvas
      className={className}
      camera={{ fov: 40, near: 0.1, far: 100, position: [0, 0, 11] }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <GlobeScene palette={PALETTES[theme]} animate={!reducedMotion} />
    </Canvas>
  );
}

export default Globe;
