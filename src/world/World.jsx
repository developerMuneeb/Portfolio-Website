import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import StudioEnvironment from "../components/hero3d/StudioEnvironment";
import { makePointsMaterial } from "../components/hero3d/materials";
import { CAMERA_DISTANCE, FOV, STATION_STEP, fitScale, measureStations, solveStations, world } from "./worldState";
import HeroPiece from "./pieces/HeroPiece";
import Swarm from "./swarm/Swarm";
import { useTheme } from "../theme";

const { damp } = THREE.MathUtils;
const halfHeight = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_DISTANCE;

/**
 * Positions a set piece at its station: vertically on the camera path,
 * horizontally under the section's empty stage column (measured from the
 * DOM), so 3D never sits behind text. Hidden entirely when off stage.
 */
function Station({ id, children }) {
  const ref = useRef(null);
  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const presence = world.presence[id] ?? 0;
    const index = world.indexOf?.[id];
    group.visible = presence > 0.002 && index !== undefined;
    if (!group.visible) return;
    const aspect = state.size.width / state.size.height;
    group.position.set((world.ndcX[id] ?? 0) * halfHeight * aspect, -index * STATION_STEP, 0);
    const s = (0.82 + 0.18 * presence) * fitScale(aspect);
    group.scale.setScalar(s);
  });
  return (
    <group ref={ref} userData={{ station: true }}>
      {children}
    </group>
  );
}

/**
 * Compile every station's shaders and upload its textures shortly after
 * load, so the first scroll into each section doesn't hitch while the GPU
 * compiles. three only compiles visible objects, so stations are made
 * visible just for the (synchronous) traversal; their own useFrame hides
 * them again before the next render.
 */
function Precompile() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    const id = window.setTimeout(() => {
      const textures = new Set();
      scene.traverse((object) => {
        if (object.userData.station) object.visible = true;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material?.map && textures.add(material.map));
      });
      textures.forEach((texture) => gl.initTexture(texture));
      const pending = gl.compileAsync ? gl.compileAsync(scene, camera) : Promise.resolve(gl.compile(scene, camera));
      pending.catch(() => {});
    }, 900);
    return () => window.clearTimeout(id);
  }, [gl, scene, camera]);
  return null;
}

/** Camera: holds on the current station, swoops (dolly + roll) between stations. */
function CameraRig() {
  const last = useRef({ y: window.scrollY, time: performance.now() });
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const sy = window.scrollY;
    const now = performance.now();
    const elapsed = Math.max(1, now - last.current.time);
    world.scrollVelocity = damp(world.scrollVelocity, ((sy - last.current.y) / elapsed) * 1000, 6, dt);
    last.current = { y: sy, time: now };

    solveStations(sy);
    const { current, next, t } = world;
    const y = -(current + (next - current) * t) * STATION_STEP;
    const swoop = Math.sin(Math.PI * t);
    const dir = current % 2 === 0 ? 1 : -1;

    const cam = state.camera;
    // Damp on real elapsed time (not the per-frame clamp) so a slow device
    // still converges in the same wall-clock time instead of lagging behind
    // the page; teleport on long jumps (nav links) rather than flying.
    const camDt = Math.min(delta, 0.25);
    const targetY = y + world.pointer.y * 0.22;
    if (Math.abs(cam.position.y - targetY) > STATION_STEP * 1.5) cam.position.y = targetY;
    else cam.position.y = damp(cam.position.y, targetY, 9, camDt);
    cam.position.x = damp(cam.position.x, world.pointer.x * 0.35 + swoop * 1.2 * dir, 5, camDt);
    cam.position.z = damp(cam.position.z, CAMERA_DISTANCE + swoop * 4.5, 6, camDt);
    cam.lookAt(0, cam.position.y - world.pointer.y * 0.22, 0);
    cam.rotation.z += swoop * 0.1 * dir;
  });
  return null;
}

/**
 * Render driver (frameloop="demand"): full frame rate while the visitor is
 * scrolling or moving the pointer, ~30fps when idle — the idle motion is
 * slow, so halving its frames is invisible but halves GPU work.
 */
function FrameDriver() {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    let raf = 0;
    let lastActive = performance.now();
    let lastFrame = 0;
    let lastY = window.scrollY;
    const markActive = () => {
      lastActive = performance.now();
    };
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (window.scrollY !== lastY) {
        lastY = window.scrollY;
        lastActive = now;
      }
      const active = now - lastActive < 600;
      if (active || now - lastFrame > 32) {
        lastFrame = now;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", markActive, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", markActive);
    };
  }, [invalidate]);
  return null;
}

/** Faint dust filling the whole camera path — parallax depth during swoops. */
function Dust({ stations }) {
  const theme = useTheme();
  const points = useMemo(() => {
    const count = 2200;
    const span = Math.max(1, stations) * STATION_STEP + 20;
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const alpha = new Float32Array(count);
    const palette = ["#5eead4", "#a78bfa", "#ff7a59", "#c4b5fd"].map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i += 1) {
      pos.set([(Math.random() - 0.5) * 30, 8 - Math.random() * span, -14 + Math.random() * 16], i * 3);
      const c = palette[i % palette.length];
      col.set([c.r, c.g, c.b], i * 3);
      size[i] = 0.03 + Math.random() * 0.07;
      alpha[i] = 0.2 + Math.random() * 0.5;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
    const material = makePointsMaterial();
    const p = new THREE.Points(geometry, material);
    p.frustumCulled = false;
    return p;
  }, [stations]);

  useEffect(() => {
    // Additive glow reads on ink; on paper, normal blending keeps dust visible
    points.material.blending = theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
    points.material.needsUpdate = true;
  }, [points, theme]);

  useEffect(
    () => () => {
      points.geometry.dispose();
      points.material.dispose();
    },
    [points],
  );

  useFrame((state) => {
    points.material.uniforms.uDpr.value = state.viewport.dpr;
    points.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.04;
  });
  return <primitive object={points} />;
}

/**
 * Starting quality, guessed before the first frame so weaker machines never
 * sit through the lag that PerformanceMonitor would otherwise need to see
 * before stepping down. Few cores / little memory, or an integrated or
 * software GPU, start on "low" (no glass refraction pass, half the swarm,
 * DPR 1). The monitor can still step a "high" start down later.
 */
function initialQuality() {
  try {
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8;
    if (cores <= 4 || memory <= 4) return "low";
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return "low";
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    if (/Intel|UHD|Iris|HD Graphics|Mali|Adreno|PowerVR|SwiftShader|llvmpipe|Basic Render/i.test(renderer)) return "low";
  } catch {
    return "low";
  }
  return "high";
}

/**
 * The persistent 3D world behind the whole page (desktop, motion OK,
 * WebGL). One transparent canvas over the aurora backdrop; pointer events
 * come from the page itself (eventSource) so the DOM stays fully usable.
 */
export default function World() {
  const [quality, setQuality] = useState(initialQuality);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf = 0;
    const remeasure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        measureStations();
        world.indexOf = Object.fromEntries(world.stations.map((s, i) => [s.id, i]));
        setCount(world.stations.length);
      });
    };
    remeasure();
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    window.addEventListener("resize", remeasure);
    const onPointer = (event) => {
      world.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      world.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div className="world-canvas" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={quality === "low" ? 1 : [1, 1.25]}
        camera={{ position: [0, 0, CAMERA_DISTANCE], fov: FOV, near: 0.1, far: 80 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <PerformanceMonitor bounds={() => [36, 1000]} flipflops={1} onDecline={() => setQuality("low")} onFallback={() => setQuality("low")} />
        <AdaptiveDpr pixelated={false} />
        <FrameDriver />
        <Precompile />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 6]} intensity={1.2} color="#f1f0ff" />
        <pointLight position={[-4, -2, 3]} intensity={5} distance={14} color="#a78bfa" />
        <StudioEnvironment />
        <CameraRig />
        <Dust stations={count} />

        <Station id="top">
          <HeroPiece quality={quality} />
        </Station>
        {/* one protagonist for every other section: re-forms per station */}
        <Swarm quality={quality} />
      </Canvas>
    </div>
  );
}
