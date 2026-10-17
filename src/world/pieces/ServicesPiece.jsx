import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "../../components/hero3d/materials";
import { world } from "../worldState";

const { damp } = THREE.MathUtils;
const COUNT = 6; // one per service
const RADIUS = 1.9;
const COLORS = ["#5eead4", "#a78bfa", "#ff7a59", "#99f6e4", "#c4b5fd", "#fbbf24"];

/**
 * Station "services": six distinct glass forms on a turntable, one per
 * service. Reading down the list rotates the ring so the matching form
 * comes to the front and lights up.
 */
export default function ServicesPiece() {
  const ring = useRef(null);
  const refs = useRef([]);
  const glows = useRef([]);
  const glow = useMemo(() => getGlowTexture(), []);
  const geometries = useMemo(
    () => [
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.TorusKnotGeometry(0.32, 0.11, 96, 12),
      new THREE.OctahedronGeometry(0.52, 0),
      new THREE.TorusGeometry(0.36, 0.13, 16, 48),
      new THREE.DodecahedronGeometry(0.48, 0),
      new THREE.ConeGeometry(0.42, 0.8, 6),
    ],
    [],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const local = world.local.services ?? 0;
    const active = Math.min(COUNT - 1, Math.floor(local * COUNT));
    if (ring.current) {
      // item i sits at angle i/COUNT; bring the active one to the front (+Z)
      const target = (active / COUNT) * Math.PI * 2;
      ring.current.rotation.y = damp(ring.current.rotation.y, target + world.pointer.x * 0.3, 3, dt);
      ring.current.rotation.x = damp(ring.current.rotation.x, 0.25 - world.pointer.y * 0.15, 3, dt);
    }
    for (let i = 0; i < COUNT; i += 1) {
      const m = refs.current[i];
      if (m) {
        m.rotation.x = t * 0.4 + i;
        m.rotation.y = t * 0.55 + i * 0.6;
        m.scale.setScalar(damp(m.scale.x, i === active ? 1.35 : 0.85, 5, dt));
      }
      const g = glows.current[i];
      if (g) g.material.opacity = damp(g.material.opacity, i === active ? 0.8 : 0.12, 5, dt);
    }
  });

  return (
    <group ref={ring} scale={0.66}>
      {geometries.map((geometry, i) => {
        const a = -(i / COUNT) * Math.PI * 2;
        const pos = [Math.sin(a) * RADIUS, 0, Math.cos(a) * RADIUS];
        return (
          <group key={i} position={pos}>
            <sprite ref={(el) => (glows.current[i] = el)} scale={[1.8, 1.8, 1]}>
              <spriteMaterial map={glow} color={COLORS[i]} transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
            </sprite>
            <mesh ref={(el) => (refs.current[i] = el)} geometry={geometry}>
              <meshPhysicalMaterial
                color={COLORS[i]}
                roughness={0.15}
                metalness={0.25}
                iridescence={0.8}
                clearcoat={1}
                emissive={COLORS[i]}
                emissiveIntensity={0.12}
                envMapIntensity={1.5}
              />
            </mesh>
          </group>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RADIUS, 0.006, 6, 200]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}
