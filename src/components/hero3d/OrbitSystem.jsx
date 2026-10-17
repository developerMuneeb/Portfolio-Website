import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { getGlowTexture, makePointsMaterial } from "./materials";

const { damp } = THREE.MathUtils;

// Same four systems as the DOM card (ContainedAgentVisual) — now orbiting.
// `inbound` signals flow into the core; outbound ones carry actions out.
const NODES = [
  { id: "intent", label: "User intent", meta: "Natural language", color: "#22d3ee", ring: 0, phase: 2.4, inbound: true },
  { id: "knowledge", label: "RAG context", meta: "Verified knowledge", color: "#2dd4bf", ring: 1, phase: 0.6, inbound: true },
  { id: "commerce", label: "Live commerce", meta: "Catalog + cart", color: "#f59e7a", ring: 0, phase: 5.6, inbound: false },
  { id: "automation", label: "Automation", meta: "n8n + CRM", color: "#fbbf24", ring: 1, phase: 3.9, inbound: false },
];

const RINGS = [
  { radius: 1.85, rotation: new THREE.Euler(1.2, 0.08, 0.34), speed: 0.085, color: "#38bdf8" },
  { radius: 2.25, rotation: new THREE.Euler(1.36, -0.22, -0.52), speed: -0.065, color: "#2dd4bf" },
];

const PARTICLES_PER_ROUTE = 3;
const TRAIL = 7;
const ROUTE_SEGMENTS = 28;
const POINT_COUNT = NODES.length * PARTICLES_PER_ROUTE * TRAIL;

const tmp = new THREE.Vector3();
const projected = new THREE.Vector3();
const viewPos = new THREE.Vector3();
const coreWorld = new THREE.Vector3();
const coreNdc = new THREE.Vector3();

function bezier(out, a, c, b, t) {
  const u = 1 - t;
  out.set(
    u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    u * u * a.y + 2 * u * t * c.y + t * t * b.y,
    u * u * a.z + 2 * u * t * c.z + t * t * b.z,
  );
  return out;
}

export default function OrbitSystem({ progress }) {
  const spread = useRef(null);
  const ringRefs = useRef([]);
  const satRefs = useRef([]);
  const labelRefs = useRef([]);
  const labelState = useRef(NODES.map(() => ({ side: "", back: false, away: false })));
  const activeRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const glow = useMemo(() => getGlowTexture(), []);
  // Labels mount beside the canvas (drei defaults to the event source, i.e.
  // #root), so the canvas wrapper's overflow clips any that swing off-screen
  // instead of widening the page.
  const gl = useThree((state) => state.gl);
  const portal = useMemo(() => ({ current: gl.domElement.parentNode }), [gl]);

  // Per-route working vectors (satellite, control point, core-surface end)
  const routes = useMemo(
    () => NODES.map(() => ({ sat: new THREE.Vector3(), ctrl: new THREE.Vector3(), end: new THREE.Vector3() })),
    [],
  );

  const routeLines = useMemo(
    () =>
      NODES.map((node) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array((ROUTE_SEGMENTS + 1) * 3), 3));
        const material = new THREE.LineBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.16,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
        });
        return new THREE.Line(geometry, material);
      }),
    [],
  );

  const signals = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const colors = new Float32Array(POINT_COUNT * 3);
    const sizes = new Float32Array(POINT_COUNT);
    const color = new THREE.Color();
    NODES.forEach((node, n) => {
      color.set(node.color);
      for (let p = 0; p < PARTICLES_PER_ROUTE; p += 1) {
        for (let k = 0; k < TRAIL; k += 1) {
          const i = (n * PARTICLES_PER_ROUTE + p) * TRAIL + k;
          colors.set([color.r, color.g, color.b], i * 3);
          sizes[i] = 0.16 * (1 - k / TRAIL) + 0.03;
        }
      }
    });
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(POINT_COUNT * 3), 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(new Float32Array(POINT_COUNT), 1));
    const points = new THREE.Points(geometry, makePointsMaterial());
    points.frustumCulled = false;
    return points;
  }, []);

  useEffect(
    () => () => {
      routeLines.forEach((line) => {
        line.geometry.dispose();
        line.material.dispose();
      });
      signals.geometry.dispose();
      signals.material.dispose();
    },
    [routeLines, signals],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const p = progress ? progress.get() : 0;
    const activeId = activeRef.current;

    if (spread.current) {
      const s = damp(spread.current.scale.x, 1 + p * 0.4, 5, dt);
      spread.current.scale.setScalar(s);
    }

    RINGS.forEach((ring, r) => {
      const mesh = ringRefs.current[r];
      if (!mesh) return;
      const highlighted = activeId && NODES.some((node) => node.id === activeId && node.ring === r);
      mesh.material.opacity = damp(mesh.material.opacity, highlighted ? 0.55 : 0.2, 6, dt);
    });

    // Core centre on screen/in view space — labels flip away from it
    let coreDepth = 0;
    if (spread.current) {
      spread.current.getWorldPosition(coreWorld);
      coreDepth = viewPos.copy(coreWorld).applyMatrix4(state.camera.matrixWorldInverse).z;
      coreNdc.copy(coreWorld).project(state.camera);
    }

    const posAttr = signals.geometry.attributes.position;
    const alphaAttr = signals.geometry.attributes.aAlpha;
    signals.material.uniforms.uDpr.value = state.viewport.dpr;

    NODES.forEach((node, n) => {
      const ring = RINGS[node.ring];
      const angle = node.phase + t * ring.speed;
      const route = routes[n];
      route.sat.set(Math.cos(angle) * ring.radius, Math.sin(angle) * ring.radius, 0).applyEuler(ring.rotation);

      const sat = satRefs.current[n];
      if (sat) {
        sat.position.copy(route.sat);
        const target = activeId === node.id ? 1.7 : 1;
        sat.scale.setScalar(damp(sat.scale.x, target, 8, dt));
      }

      // Curved path from the satellite to the glass surface, bowed outward
      route.end.copy(route.sat).normalize().multiplyScalar(1.04);
      route.ctrl.copy(route.sat).add(route.end).multiplyScalar(0.5);
      tmp.set(0, 0, 1).cross(route.sat).normalize().multiplyScalar(0.45);
      route.ctrl.add(tmp).add(tmp.set(0, 0.25, 0.2));

      const linePos = routeLines[n].geometry.attributes.position;
      for (let s = 0; s <= ROUTE_SEGMENTS; s += 1) {
        bezier(tmp, route.sat, route.ctrl, route.end, s / ROUTE_SEGMENTS);
        linePos.setXYZ(s, tmp.x, tmp.y, tmp.z);
      }
      linePos.needsUpdate = true;
      routeLines[n].material.opacity = damp(routeLines[n].material.opacity, activeId === node.id ? 0.6 : 0.16, 6, dt);

      const speed = activeId === node.id ? 0.62 : 0.32;
      for (let q = 0; q < PARTICLES_PER_ROUTE; q += 1) {
        const head = (t * speed + q / PARTICLES_PER_ROUTE + n * 0.17) % 1;
        for (let k = 0; k < TRAIL; k += 1) {
          const i = (n * PARTICLES_PER_ROUTE + q) * TRAIL + k;
          const tt = Math.max(0, head - k * 0.018);
          const along = node.inbound ? tt : 1 - tt;
          bezier(tmp, route.sat, route.ctrl, route.end, along);
          posAttr.setXYZ(i, tmp.x, tmp.y, tmp.z);
          alphaAttr.setX(i, Math.sin(Math.PI * tt) * (1 - k / TRAIL) * (activeId === node.id ? 1 : 0.75));
        }
      }

      // Keep labels readable: point away from the core, dim when behind it
      const el = labelRefs.current[n];
      if (el && sat) {
        sat.getWorldPosition(projected);
        const depth = viewPos.copy(projected).applyMatrix4(state.camera.matrixWorldInverse).z;
        projected.project(state.camera);
        // outward from the core, but never off the right edge of the screen
        const side = projected.x > 0.62 || projected.x < coreNdc.x ? "left" : "right";
        const back = depth < coreDepth - 0.35 && Math.hypot(projected.x - coreNdc.x, projected.y - coreNdc.y) < 0.45;
        const current = labelState.current[n];
        if (current.side !== side) {
          el.dataset.side = side;
          current.side = side;
        }
        // Labels are DOM: hide them once the core has left the stage
        const away = p > 0.98;
        if (current.away !== away) {
          el.style.visibility = away ? "hidden" : "";
          current.away = away;
        }
        if (current.back !== back) {
          el.classList.toggle("is-back", back);
          current.back = back;
        }
      }
    });
    posAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;
  });

  return (
    <group ref={spread}>
      {RINGS.map((ring, r) => (
        <mesh key={r} rotation={ring.rotation} ref={(el) => (ringRefs.current[r] = el)}>
          <torusGeometry args={[ring.radius, 0.0045, 6, 220]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.2} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}

      {routeLines.map((line, n) => (
        <primitive key={NODES[n].id} object={line} />
      ))}
      <primitive object={signals} />

      {NODES.map((node, n) => (
        <group key={node.id} ref={(el) => (satRefs.current[n] = el)}>
          <mesh>
            <sphereGeometry args={[0.065, 20, 20]} />
            <meshBasicMaterial color={node.color} toneMapped={false} />
          </mesh>
          <sprite scale={[0.6, 0.6, 1]}>
            <spriteMaterial
              map={glow}
              color={node.color}
              transparent
              opacity={0.75}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </sprite>
          {/* Generous invisible hit area so hovering a satellite is easy */}
          <mesh
            visible={false}
            onPointerOver={() => setActive(node.id)}
            onPointerOut={() => setActive((current) => (current === node.id ? null : current))}
          >
            <sphereGeometry args={[0.28, 8, 8]} />
          </mesh>
          <Html portal={portal} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
            <div
              ref={(el) => (labelRefs.current[n] = el)}
              className={`h3d-label${active === node.id ? " is-active" : ""}`}
              style={{ "--node-color": node.color }}
              data-side="right"
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive((current) => (current === node.id ? null : current))}
            >
              <i aria-hidden="true" />
              <strong>{node.label}</strong>
              <small>{node.meta}</small>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
