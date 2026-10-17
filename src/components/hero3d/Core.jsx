import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { getGlowTexture, makeFresnelMaterial } from "./materials";

const { damp } = THREE.MathUtils;

// 1x1 stand-in for the transmission buffer while the core is off stage:
// drei only re-renders the whole scene into its refraction buffer when the
// material points at its own target, so parking it here skips that pass.
const PARKED = new THREE.DataTexture(new Uint8Array([11, 11, 21, 255]), 1, 1);
PARKED.needsUpdate = true;

const GLYPH = [
  [-0.2, -0.17, 0],
  [-0.2, 0.17, 0],
  [0, -0.03, 0],
  [0.2, 0.17, 0],
  [0.2, -0.17, 0],
];

/** The "M" mark as a thin glowing tube — real geometry, so it refracts through the glass. */
function makeGlyphGeometry() {
  const path = new THREE.CurvePath();
  for (let i = 0; i < GLYPH.length - 1; i += 1) {
    path.add(new THREE.LineCurve3(new THREE.Vector3(...GLYPH[i]), new THREE.Vector3(...GLYPH[i + 1])));
  }
  return new THREE.TubeGeometry(path, 96, 0.017, 8, false);
}

/**
 * The orchestrator: a refractive glass shell around a glowing lattice and
 * the "M" mark. The glass breathes, and its distortion swells as the
 * cursor approaches — the core "notices" you.
 */
export default function Core({ input, quality }) {
  const shell = useRef(null);
  const glass = useRef(null);
  const lattice = useRef(null);
  const glyph = useRef(null);
  const halo = useRef(null);
  const liveBuffer = useRef(null);

  const rim = useMemo(() => makeFresnelMaterial("#38bdf8", { power: 2.6, intensity: 0.85 }), []);
  const glow = useMemo(() => getGlowTexture(), []);
  const glyphGeometry = useMemo(makeGlyphGeometry, []);

  useEffect(
    () => () => {
      rim.dispose();
      glyphGeometry.dispose();
    },
    [rim, glyphGeometry],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const inp = input.current;

    const near = Math.max(0, 1 - Math.hypot(inp.x, inp.y) / 0.85);
    inp.prox = damp(inp.prox, inp.inside ? near : 0, 3.2, dt);

    if (shell.current) {
      shell.current.rotation.x = t * 0.09;
      shell.current.rotation.y = t * 0.14;
      shell.current.scale.setScalar(1 + Math.sin(t * 1.15) * 0.012 + inp.prox * 0.06);
    }
    // Skip the transmission render pass entirely while the hero is off stage
    if (glass.current && "buffer" in glass.current) {
      const active = inp.active !== false;
      if (!active && glass.current.buffer !== PARKED) {
        liveBuffer.current = glass.current.buffer;
        glass.current.buffer = PARKED;
      } else if (active && glass.current.buffer === PARKED && liveBuffer.current) {
        glass.current.buffer = liveBuffer.current;
      }
    }
    if (glass.current && "distortion" in glass.current) {
      glass.current.distortion = 0.3 + inp.prox * 0.85;
      glass.current.temporalDistortion = 0.14 + inp.prox * 0.25;
    }
    if (lattice.current) {
      lattice.current.rotation.x = -t * 0.32;
      lattice.current.rotation.z = t * 0.2;
    }
    if (glyph.current) {
      glyph.current.rotation.y = Math.sin(t * 0.55) * 0.55;
      glyph.current.position.y = Math.sin(t * 1.3) * 0.02;
    }
    if (halo.current) {
      halo.current.material.opacity = 0.42 + inp.prox * 0.3 + Math.sin(t * 1.6) * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.02, 18]} />
        {quality === "high" ? (
          <MeshTransmissionMaterial
            ref={glass}
            samples={4}
            resolution={384}
            thickness={0.5}
            roughness={0.05}
            ior={1.22}
            chromaticAberration={0.42}
            anisotropicBlur={0.12}
            distortion={0.3}
            distortionScale={0.45}
            temporalDistortion={0.14}
            iridescence={1}
            iridescenceIOR={1.25}
            iridescenceThicknessRange={[120, 900]}
            clearcoat={1}
            clearcoatRoughness={0.08}
            attenuationDistance={2.6}
            attenuationColor="#a5ecff"
            color="#eaf9ff"
          />
        ) : (
          // Low tier: no transmission pass at all — a tinted, iridescent
          // clear shell lit by the studio environment. Far cheaper, and it
          // keeps the lattice and "M" visible instead of going milky.
          <meshPhysicalMaterial
            color="#7dd3fc"
            transparent
            opacity={0.3}
            roughness={0.04}
            metalness={0.15}
            iridescence={1}
            iridescenceIOR={1.3}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={1.8}
            depthWrite={false}
          />
        )}
      </mesh>

      <mesh scale={1.1} material={rim}>
        <sphereGeometry args={[1.02, 48, 48]} />
      </mesh>

      <group ref={lattice}>
        <mesh>
          <icosahedronGeometry args={[0.56, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh rotation={[0.6, 0.3, 0]}>
          <octahedronGeometry args={[0.38, 0]} />
          <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.55} toneMapped={false} />
        </mesh>
      </group>

      <sprite ref={halo} scale={[1.7, 1.7, 1]}>
        <spriteMaterial
          map={glow}
          color="#22d3ee"
          transparent
          opacity={0.45}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </sprite>

      <group ref={glyph}>
        <mesh geometry={glyphGeometry}>
          <meshBasicMaterial color="#e6fbff" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
