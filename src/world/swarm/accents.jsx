import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "../../data/projects";
import { skillGroups } from "../../data/skills";
import { iconTexture } from "../pieces/iconTexture";
import { GLOBE_RADIUS, SCREEN, STACK, STACK_LAYERS, stackLayerY } from "./shapes";

/*
 * Crisp accents layered on the swarm where particles can't carry the detail
 * (readable labels, real logos). Each fades in only once its formation has
 * settled, and reads the swarm's shared state instead of the scroll itself.
 */

const { damp } = THREE.MathUtils;

function canvasTexture(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Redraw canvas textures now and again once webfonts are ready. */
function usePaint(paint, deps) {
  useEffect(() => {
    let cancelled = false;
    const run = () => !cancelled && paint();
    run();
    document.fonts?.ready.then(run);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ---------------------------------------------------------------- About

const LAYERS = [
  { label: "WORKFLOW", sub: "map the real process", color: "#5eead4", ink: "#0f766e" },
  { label: "DATA", sub: "clean, connected inputs", color: "#a78bfa", ink: "#6d28d9" },
  { label: "AI SYSTEMS", sub: "agents + models", color: "#ff7a59", ink: "#c2410c" },
  { label: "OUTCOMES", sub: "measurable value", color: "#fbbf24", ink: "#a16207" },
];

function drawLayerLabel(canvas, layer, index, light) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "right";
  ctx.fillStyle = light ? layer.ink : layer.color;
  ctx.font = "600 34px 'JetBrains Mono', monospace";
  ctx.fillText(`${String(index + 1).padStart(2, "0")} — ${layer.label}`, canvas.width - 8, 52);
  ctx.fillStyle = light ? "rgba(20,19,31,0.6)" : "rgba(238,237,247,0.6)";
  ctx.font = "italic 400 34px 'Instrument Serif', Georgia, serif";
  ctx.fillText(layer.sub, canvas.width - 8, 100);
}

/** The four stack layer names, pinned to each plate's outer corner. */
export function StackLabels({ shared, theme }) {
  const refs = useRef([]);
  const textures = useMemo(() => LAYERS.map(() => canvasTexture(512, 128)), []);
  const positions = useMemo(() => {
    const m = new THREE.Matrix4().makeRotationFromEuler(STACK.rotation);
    return LAYERS.map((_, i) => {
      const p = new THREE.Vector3(-STACK.size / 2 - 0.06, stackLayerY(i), STACK.size / 2).applyMatrix4(m);
      p.x += STACK.offsetX;
      return p;
    });
  }, []);

  usePaint(() => {
    LAYERS.forEach((layer, i) => {
      drawLayerLabel(textures[i].image, layer, i, theme === "light");
      textures[i].needsUpdate = true;
    });
  }, [textures, theme]);
  useEffect(() => () => textures.forEach((tex) => tex.dispose()), [textures]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.25);
    const { settled, active, alpha } = shared.current;
    const on = settled === "stack" ? Math.min(1, alpha) : 0;
    // labels not being read rest dimmer; on paper they need more to stay legible
    const rest = theme === "light" ? 0.72 : 0.45;
    for (let i = 0; i < STACK_LAYERS; i += 1) {
      const s = refs.current[i];
      if (!s) continue;
      s.material.opacity = Math.min(on, damp(s.material.opacity, on * (active === i ? 1 : rest), 5, dt));
      s.visible = s.material.opacity > 0.01;
    }
  });

  return LAYERS.map((layer, i) => (
    <sprite key={layer.label} ref={(el) => (refs.current[i] = el)} position={positions[i]} center={[1, 0.5]} scale={[1.3, 0.325, 1]}>
      <spriteMaterial map={textures[i]} transparent opacity={0} depthWrite={false} depthTest={false} toneMapped={false} />
    </sprite>
  ));
}

// ---------------------------------------------------------------- Skills

const ICON_FILES = { "c++": "cpp" };
const LOGOS = skillGroups
  .flatMap((group) => group.items)
  .filter((item, i, all) => item.icon && all.findIndex((x) => x.label === item.label) === i);

/** Real tech logos riding on the particle globe; the far side dims. */
export function LogoOrbit({ shared }) {
  const refs = useRef([]);
  const textures = useMemo(() => LOGOS.map((item) => iconTexture(`/tech-icons/${ICON_FILES[item.icon] ?? item.icon}.svg`)), []);
  const positions = useMemo(() => {
    const n = LOGOS.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const r = GLOBE_RADIUS + 0.14;
    return LOGOS.map((_, i) => {
      const y = 1 - (i / Math.max(1, n - 1)) * 2;
      const ring = Math.sqrt(1 - y * y);
      return new THREE.Vector3(Math.cos(golden * i) * ring * r, y * r, Math.sin(golden * i) * ring * r);
    });
  }, []);
  const fade = useRef(0);
  const tmp = useMemo(() => ({ p: new THREE.Vector3(), c: new THREE.Vector3() }), []);

  useEffect(() => () => textures.forEach((tex) => tex.dispose()), [textures]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.25);
    const { settled, alpha } = shared.current;
    fade.current = Math.min(alpha, damp(fade.current, settled === "globe" ? Math.min(1, alpha) : 0, 4, dt));
    const parent = refs.current[0]?.parent;
    if (!parent) return;
    parent.getWorldPosition(tmp.c);
    refs.current.forEach((s) => {
      if (!s) return;
      s.visible = fade.current > 0.01;
      if (!s.visible) return;
      s.getWorldPosition(tmp.p);
      const depth = THREE.MathUtils.clamp((tmp.p.z - tmp.c.z) / (GLOBE_RADIUS * 2) + 0.5, 0, 1);
      s.material.opacity = fade.current * (0.2 + depth * 0.8);
      s.scale.setScalar(0.24 + depth * 0.14);
    });
  });

  return LOGOS.map((item, i) => (
    <sprite key={item.label} ref={(el) => (refs.current[i] = el)} position={positions[i]} scale={[0.3, 0.3, 1]}>
      <spriteMaterial map={textures[i]} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </sprite>
  ));
}

// ---------------------------------------------------------------- Work

const CAPTION_W = 1024;
const CAPTION_H = 168;

function drawCaption(canvas, index, light) {
  const project = projects[index];
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, CAPTION_W, CAPTION_H);
  ctx.textAlign = "center";
  ctx.fillStyle = light ? "#0f766e" : "#5eead4";
  ctx.font = "600 30px 'JetBrains Mono', monospace";
  ctx.fillText(`P/${String(index + 1).padStart(2, "0")}  ·  ${project.category.toUpperCase()}`, CAPTION_W / 2, 44);
  ctx.fillStyle = light ? "#14131f" : "#eeedf7";
  ctx.font = "700 58px Syne, 'Space Grotesk', sans-serif";
  ctx.fillText(project.title, CAPTION_W / 2, 122, CAPTION_W - 40);
}

/** The project's name under the particle laptop. */
export function ProjectCaption({ shared, theme }) {
  const ref = useRef(null);
  const texture = useMemo(() => canvasTexture(CAPTION_W, CAPTION_H), []);
  const shown = useRef(-1);
  const light = theme === "light";

  usePaint(() => {
    if (shown.current < 0) return;
    drawCaption(texture.image, shown.current, light);
    texture.needsUpdate = true;
  }, [texture, light]);
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.25);
    const m = ref.current;
    if (!m) return;
    const { settled, alpha } = shared.current;
    const index = settled?.startsWith("prj") ? Number(settled.slice(3)) : -1;
    if (index >= 0 && index !== shown.current) {
      shown.current = index;
      drawCaption(texture.image, index, light);
      texture.needsUpdate = true;
    }
    m.material.opacity = Math.min(alpha, damp(m.material.opacity, index >= 0 ? Math.min(1, alpha) : 0, 5, dt));
    m.visible = m.material.opacity > 0.01;
  });

  const width = 2.9;
  return (
    <mesh ref={ref} position={[0, SCREEN.y - SCREEN.h / 2 - 0.72, 0.42]}>
      <planeGeometry args={[width, (width * CAPTION_H) / CAPTION_W]} />
      <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}
