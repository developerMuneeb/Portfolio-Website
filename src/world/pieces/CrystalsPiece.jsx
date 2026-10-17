import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { credentials } from "../../data/profile";
import { world } from "../worldState";

const COUNT = Math.min(6, credentials.featured.length + 1);

/**
 * Station "credentials": a floating cluster of iridescent crystals — one
 * per featured certification — slowly tumbling, with lit edges.
 */
export default function CrystalsPiece() {
  const group = useRef(null);
  const refs = useRef([]);
  const layout = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const a = (i / COUNT) * Math.PI * 2;
        return {
          pos: [Math.cos(a) * 1.55, Math.sin(a * 1.7) * 0.9, Math.sin(a) * 1.2],
          scale: 0.42 + (i % 3) * 0.12,
          spin: 0.2 + (i % 4) * 0.08,
          phase: i * 1.3,
        };
      }),
    [],
  );
  const geometry = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const local = world.local.credentials ?? 0;
    if (group.current) {
      group.current.rotation.y = t * 0.12 + local * 1.5 + world.pointer.x * 0.3;
      group.current.rotation.x = world.pointer.y * -0.2;
    }
    layout.forEach((item, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.rotation.x = t * item.spin + item.phase;
      m.rotation.y = t * item.spin * 0.7;
      m.position.y = item.pos[1] + Math.sin(t * 0.9 + item.phase) * 0.12;
    });
  });

  return (
    <group ref={group} scale={0.82}>
      {layout.map((item, i) => (
        <group key={i} ref={(el) => (refs.current[i] = el)} position={item.pos} scale={item.scale}>
          <mesh geometry={geometry}>
            <meshPhysicalMaterial
              color={i % 2 ? "#c4b5fd" : "#99f6e4"}
              roughness={0.12}
              metalness={0.2}
              iridescence={1}
              iridescenceIOR={1.4}
              clearcoat={1}
              transparent
              opacity={0.82}
              envMapIntensity={1.6}
            />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial color="#eeedf7" transparent opacity={0.45} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}
