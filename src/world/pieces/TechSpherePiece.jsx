import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skillGroups } from "../../data/skills";
import { world } from "../worldState";
import { iconTexture } from "./iconTexture";

const { damp } = THREE.MathUtils;
const RADIUS = 2.05;
const ICON_FILES = { "c++": "cpp" };

const icons = skillGroups
  .flatMap((group) => group.items)
  .filter((item, i, all) => item.icon && all.findIndex((x) => x.label === item.label) === i);

/**
 * Station "skills": the real tech stack as logos on a Fibonacci sphere over
 * a faint wire globe. Auto-rotates, tilts to the pointer, spins with
 * scroll; logos on the far side dim so the front reads clearly.
 */
export default function TechSpherePiece() {
  const group = useRef(null);
  const spriteRefs = useRef([]);
  const textures = useMemo(() => icons.map((item) => iconTexture(`/tech-icons/${ICON_FILES[item.icon] ?? item.icon}.svg`)), []);
  const positions = useMemo(() => {
    const n = icons.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return icons.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = golden * i;
      return new THREE.Vector3(Math.cos(a) * r * RADIUS, y * RADIUS, Math.sin(a) * r * RADIUS);
    });
  }, []);
  const world3 = useMemo(() => new THREE.Vector3(), []);
  const spin = useRef(0);

  useEffect(() => () => textures.forEach((tex) => tex.dispose()), [textures]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    spin.current += dt * (0.22 + Math.min(Math.abs(world.scrollVelocity) * 0.0004, 1.4));
    const g = group.current;
    if (!g) return;
    g.rotation.y = spin.current + world.pointer.x * 0.5;
    g.rotation.x = damp(g.rotation.x, -world.pointer.y * 0.35 + 0.15, 3, dt);
    positions.forEach((_, i) => {
      const s = spriteRefs.current[i];
      if (!s) return;
      s.getWorldPosition(world3);
      // depth relative to the sphere centre: front = 1, back = 0
      const depth = THREE.MathUtils.clamp(((world3.z - g.parent.position.z) / (RADIUS * g.scale.x * g.parent.scale.x)) * 0.5 + 0.5, 0, 1);
      s.material.opacity = 0.22 + depth * 0.78;
      s.scale.setScalar(0.34 + depth * 0.16);
    });
  });

  return (
    <group ref={group} scale={0.74}>
      <mesh>
        <icosahedronGeometry args={[RADIUS * 0.96, 3]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.12} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.55, 32, 32]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.06} toneMapped={false} />
      </mesh>
      {positions.map((p, i) => (
        <sprite key={icons[i].label} position={p} ref={(el) => (spriteRefs.current[i] = el)}>
          <spriteMaterial map={textures[i]} transparent depthWrite={false} toneMapped={false} />
        </sprite>
      ))}
    </group>
  );
}
