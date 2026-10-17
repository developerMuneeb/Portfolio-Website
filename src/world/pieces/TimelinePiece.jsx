import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getGlowTexture } from "../../components/hero3d/materials";
import { experience } from "../../data/profile";
import { world } from "../worldState";

const { damp } = THREE.MathUtils;
const ROLES = experience.length;
const TURNS = 1.35;
const HEIGHT = 6.4;
const RADIUS = 1.5;

const RIBBON_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const RIBBON_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform vec3 uA;
  uniform vec3 uB;
  varying vec2 vUv;
  void main() {
    float along = vUv.x;
    vec3 col = mix(uA, uB, along);
    // energy pulses flowing down the ribbon
    float pulse = pow(0.5 + 0.5 * sin(along * 60.0 - uTime * 3.0), 6.0);
    float revealed = smoothstep(uReveal + 0.02, uReveal - 0.02, along);
    float a = mix(0.18, 0.9, revealed) + pulse * 0.6 * revealed;
    gl_FragColor = vec4(col * (0.7 + pulse), a);
    #include <colorspace_fragment>
  }
`;

/** Helix point for u in 0..1 (top -> bottom). */
function helix(u, out = new THREE.Vector3()) {
  const a = u * Math.PI * 2 * TURNS;
  return out.set(Math.cos(a) * RADIUS, HEIGHT / 2 - u * HEIGHT, Math.sin(a) * RADIUS);
}

/**
 * Station "experience": a glowing helix ribbon with one node per role.
 * As the visitor reads down the timeline, the ribbon "fills" and rotates so
 * the active role's node swings to the front.
 */
export default function TimelinePiece() {
  const group = useRef(null);
  const nodeRefs = useRef([]);
  const haloRefs = useRef([]);
  const glow = useMemo(() => getGlowTexture(), []);

  const { geometry, material } = useMemo(() => {
    const points = Array.from({ length: 120 }, (_, i) => helix(i / 119));
    const curve = new THREE.CatmullRomCurve3(points);
    const geo = new THREE.TubeGeometry(curve, 400, 0.035, 8, false);
    const mat = new THREE.ShaderMaterial({
      vertexShader: RIBBON_VERT,
      fragmentShader: RIBBON_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0 },
        uA: { value: new THREE.Color("#5eead4") },
        uB: { value: new THREE.Color("#a78bfa") },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry: geo, material: mat };
  }, []);

  const nodes = useMemo(() => Array.from({ length: ROLES }, (_, i) => helix(i / Math.max(1, ROLES - 1))), []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const local = world.local.experience ?? 0;
    const active = Math.min(ROLES - 1, Math.floor(local * ROLES));
    const activeU = active / Math.max(1, ROLES - 1);
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uReveal.value = damp(material.uniforms.uReveal.value, Math.min(1, local * 1.08 + 0.04), 4, dt);

    if (group.current) {
      // rotate so the active node faces the camera, and centre it vertically
      // rotation.y = θ maps a node at angle a to angle a − θ; the camera
      // looks down −Z, so the front is a − θ = π/2
      const angle = activeU * Math.PI * 2 * TURNS;
      const targetRot = angle - Math.PI / 2;
      group.current.rotation.y = damp(group.current.rotation.y, targetRot + world.pointer.x * 0.25, 3, dt);
      const nodeY = (HEIGHT / 2 - activeU * HEIGHT) * group.current.scale.y;
      group.current.position.y = damp(group.current.position.y, -nodeY, 3, dt);
    }
    nodes.forEach((_, i) => {
      const isActive = i === active;
      const node = nodeRefs.current[i];
      const halo = haloRefs.current[i];
      if (node) node.scale.setScalar(damp(node.scale.x, isActive ? 1.9 : i < active ? 1 : 0.8, 6, dt));
      if (halo) halo.material.opacity = damp(halo.material.opacity, isActive ? 0.9 : i < active ? 0.25 : 0.08, 6, dt);
    });
  });

  return (
    <group ref={group} scale={0.86}>
      <mesh geometry={geometry} material={material} />
      {nodes.map((p, i) => (
        <group key={i} position={p}>
          <mesh ref={(el) => (nodeRefs.current[i] = el)}>
            <sphereGeometry args={[0.09, 20, 20]} />
            <meshBasicMaterial color={i === 0 ? "#fbbf24" : "#eeedf7"} toneMapped={false} />
          </mesh>
          <sprite ref={(el) => (haloRefs.current[i] = el)} scale={[0.9, 0.9, 1]}>
            <spriteMaterial map={glow} color="#5eead4" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
          </sprite>
        </group>
      ))}
    </group>
  );
}
