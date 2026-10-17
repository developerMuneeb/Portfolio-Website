import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "../../data/projects";
import { world } from "../worldState";

const { damp } = THREE.MathUtils;
const RADIUS = 3;
const W = 2.7;
const H = 1.68;
const ACCENTS = ["#5eead4", "#a78bfa", "#ff7a59", "#99f6e4", "#c4b5fd"];

/** Project "screen" drawn to a canvas texture — number, title, category. */
function drawPanel(canvas, project, index) {
  const ctx = canvas.getContext("2d");
  const { width: w, height: h } = canvas;
  const accent = ACCENTS[index % ACCENTS.length];
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#17162c");
  bg.addColorStop(1, "#0b0b15");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  const glow = ctx.createRadialGradient(w * 0.8, h * 0.18, 10, w * 0.8, h * 0.18, w * 0.5);
  glow.addColorStop(0, `${accent}55`);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  ctx.fillStyle = accent;
  ctx.font = "600 30px 'JetBrains Mono', monospace";
  ctx.fillText(`P/${String(index + 1).padStart(2, "0")}  ·  ${project.category.toUpperCase()}`, 64, 96);
  ctx.fillStyle = "#eeedf7";
  ctx.font = "700 76px Syne, 'Space Grotesk', sans-serif";
  let line = "";
  let y = 300;
  project.title.split(" ").forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > w - 140 && line) {
      ctx.fillText(line, 64, y);
      line = word;
      y += 86;
    } else line = test;
  });
  ctx.fillText(line, 64, y);
  ctx.fillStyle = "rgba(238,237,247,0.6)";
  ctx.font = "500 28px Inter, sans-serif";
  ctx.fillText(project.badge, 64, h - 64);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, w - 4, h - 4);
}

function panelTexture(project, index) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 636;
  drawPanel(canvas, project, index);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Station "work": the case studies as glowing screens on a vertical wheel
 * inside the stage column. Scrolling the gallery intro turns the wheel so
 * the next project rises from below to the front; neighbours fade out so
 * nothing ever drifts into the text column.
 */
export default function GalleryPiece() {
  const ring = useRef(null);
  const panels = useRef([]);
  const textures = useMemo(() => projects.map((p, i) => panelTexture(p, i)), []);
  const count = projects.length;

  useEffect(() => {
    // Webfonts may arrive after first paint — redraw panels once ready
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (cancelled) return;
      projects.forEach((p, i) => {
        drawPanel(textures[i].image, p, i);
        textures[i].needsUpdate = true;
      });
    });
    return () => {
      cancelled = true;
      textures.forEach((tex) => tex.dispose());
    };
  }, [textures]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const pos = (world.local.work ?? 0) * (count - 1); // continuous project index
    if (ring.current) {
      // panel i sits at angle -i·step around X; it faces the camera at rotation -i·step
      const step = (Math.PI * 2) / count;
      ring.current.rotation.x = damp(ring.current.rotation.x, -pos * step, 4, dt);
      ring.current.rotation.y = damp(ring.current.rotation.y, world.pointer.x * 0.18, 3, dt);
      ring.current.position.z = -RADIUS + 1.4;
    }
    for (let i = 0; i < count; i += 1) {
      const m = panels.current[i];
      if (!m) continue;
      const d = Math.abs(i - pos);
      m.material.opacity = damp(m.material.opacity, Math.max(0, 1 - d * 1.15), 6, dt);
      m.visible = m.material.opacity > 0.01;
    }
  });

  return (
    <group ref={ring}>
      {textures.map((tex, i) => {
        const a = -(i / count) * Math.PI * 2;
        return (
          <mesh
            key={i}
            ref={(el) => (panels.current[i] = el)}
            position={[0, Math.sin(a) * RADIUS, Math.cos(a) * RADIUS]}
            rotation={[-a, 0, 0]}
          >
            <planeGeometry args={[W, H]} />
            {/* front side only: panels turned away vanish instead of showing mirrored text */}
            <meshBasicMaterial map={tex} transparent opacity={i === 0 ? 1 : 0} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}
