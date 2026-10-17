import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makePointsMaterial } from "../../components/hero3d/materials";
import { useTheme } from "../../theme";
import { world } from "../worldState";

const { damp, clamp } = THREE.MathUtils;
const SIZE = 2.3; // plate width/depth
const TEX = 512;
const PARTICLES = 220;

// Bottom -> top: how the About copy describes the work.
const LAYERS = [
  { label: "WORKFLOW", sub: "map the real process", color: "#5eead4", ink: "#0f766e", draw: drawFlow },
  { label: "DATA", sub: "clean, connected inputs", color: "#a78bfa", ink: "#6d28d9", draw: drawData },
  { label: "AI SYSTEMS", sub: "agents + models", color: "#ff7a59", ink: "#c2410c", draw: drawNet },
  { label: "OUTCOMES", sub: "measurable value", color: "#99f6e4", ink: "#0f766e", draw: drawChart },
];

const THEMES = {
  dark: { fill: "rgba(23, 22, 44, 0.62)", grid: "rgba(255,255,255,0.06)", text: "#eeedf7", sub: "rgba(238,237,247,0.55)", blending: THREE.AdditiveBlending },
  light: { fill: "rgba(255, 255, 255, 0.72)", grid: "rgba(20,19,31,0.07)", text: "#14131f", sub: "rgba(20,19,31,0.55)", blending: THREE.NormalBlending },
};

function roundedPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ---- plate motifs (drawn in a 512² canvas, plate seen from above) ----
function drawFlow(ctx, c) {
  const nodes = [
    [120, 150], [256, 150], [392, 150],
    [188, 300], [324, 300],
    [256, 410],
  ];
  const links = [[0, 1], [1, 2], [0, 3], [2, 4], [3, 5], [4, 5], [1, 3]];
  ctx.strokeStyle = c;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 4;
  links.forEach(([a, b]) => {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, (y1 + y2) / 2);
    ctx.lineTo(x2, (y1 + y2) / 2);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
  nodes.forEach(([x, y], i) => {
    ctx.fillStyle = c;
    roundedPath(ctx, x - 34, y - 20, 68, 40, 10);
    ctx.globalAlpha = i === 5 ? 1 : 0.85;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function drawData(ctx, c) {
  ctx.fillStyle = c;
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const v = (Math.sin(row * 1.7 + col * 0.9) + Math.cos(col * 1.3 - row * 0.4)) * 0.25 + 0.5;
      ctx.globalAlpha = 0.18 + v * 0.75;
      roundedPath(ctx, 86 + col * 44, 86 + row * 44, 32, 32, 6);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function drawNet(ctx, c) {
  const cols = [[3, 120], [4, 256], [2, 392]];
  const pts = cols.map(([n, x]) => Array.from({ length: n }, (_, i) => [x, 256 + (i - (n - 1) / 2) * 92]));
  ctx.strokeStyle = c;
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.4;
  for (let k = 0; k < pts.length - 1; k += 1) {
    pts[k].forEach(([x1, y1]) =>
      pts[k + 1].forEach(([x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }),
    );
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = c;
  pts.flat().forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawChart(ctx, c) {
  const bars = [0.28, 0.4, 0.36, 0.55, 0.68, 0.84];
  ctx.fillStyle = c;
  bars.forEach((h, i) => {
    ctx.globalAlpha = 0.35 + i * 0.1;
    roundedPath(ctx, 96 + i * 56, 420 - h * 300, 38, h * 300, 6);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  ctx.strokeStyle = c;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  bars.forEach((h, i) => {
    const x = 115 + i * 56;
    const y = 400 - h * 300 - 26;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function drawPlate(canvas, layer, theme, light) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, TEX, TEX);
  roundedPath(ctx, 6, 6, TEX - 12, TEX - 12, 36);
  ctx.fillStyle = theme.fill;
  ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = theme.grid;
  ctx.lineWidth = 2;
  for (let p = 32; p < TEX; p += 32) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, TEX);
    ctx.moveTo(0, p);
    ctx.lineTo(TEX, p);
    ctx.stroke();
  }
  ctx.restore();
  layer.draw(ctx, light ? layer.ink : layer.color);
}

function drawLabel(canvas, layer, index, theme, light) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "right";
  ctx.fillStyle = light ? layer.ink : layer.color;
  ctx.font = "600 34px 'JetBrains Mono', monospace";
  ctx.fillText(`${String(index + 1).padStart(2, "0")} — ${layer.label}`, canvas.width - 8, 52);
  ctx.fillStyle = theme.sub;
  ctx.font = "italic 400 34px 'Instrument Serif', Georgia, serif";
  ctx.fillText(layer.sub, canvas.width - 8, 100);
}

function canvasTexture(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Station "about": the way the work is built, as an exploded stack of glass
 * layers — workflow at the base, then data, AI systems and outcomes on top.
 * Data particles rise through the stack; the layers spread apart as the
 * camera arrives, and the layer matching the reading position lights up.
 */
export default function SystemStackPiece() {
  const themeName = useTheme() === "light" ? "light" : "dark";
  const theme = THEMES[themeName];
  const root = useRef(null);
  const plateRefs = useRef([]);
  const edgeRefs = useRef([]);
  const labelRefs = useRef([]);
  const gap = useRef(0.35);

  const plates = useMemo(() => LAYERS.map(() => canvasTexture(TEX, TEX)), []);
  const labels = useMemo(() => LAYERS.map(() => canvasTexture(512, 128)), []);
  const edge = useMemo(() => {
    const h = SIZE / 2;
    const r = 0.16;
    const shape = new THREE.Shape();
    shape.moveTo(-h + r, -h);
    shape.lineTo(h - r, -h);
    shape.quadraticCurveTo(h, -h, h, -h + r);
    shape.lineTo(h, h - r);
    shape.quadraticCurveTo(h, h, h - r, h);
    shape.lineTo(-h + r, h);
    shape.quadraticCurveTo(-h, h, -h, h - r);
    shape.lineTo(-h, -h + r);
    shape.quadraticCurveTo(-h, -h, -h + r, -h);
    return new THREE.BufferGeometry().setFromPoints(shape.getPoints(8));
  }, []);

  const particles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(PARTICLES * 3);
    const col = new Float32Array(PARTICLES * 3);
    const size = new Float32Array(PARTICLES);
    const alpha = new Float32Array(PARTICLES);
    const seeds = [];
    const palette = LAYERS.map((l) => new THREE.Color(l.color));
    for (let i = 0; i < PARTICLES; i += 1) {
      seeds.push({ x: (Math.random() - 0.5) * SIZE * 0.8, z: (Math.random() - 0.5) * SIZE * 0.8, t: Math.random(), speed: 0.05 + Math.random() * 0.08 });
      const c = palette[i % palette.length];
      col.set([c.r, c.g, c.b], i * 3);
      size[i] = 0.04 + Math.random() * 0.05;
      alpha[i] = 0.5 + Math.random() * 0.5;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
    const points = new THREE.Points(geometry, makePointsMaterial());
    points.frustumCulled = false;
    points.userData.seeds = seeds;
    return points;
  }, []);

  useEffect(() => {
    // Webfonts may arrive after first paint — redraw once they're ready
    let cancelled = false;
    const paint = () => {
      if (cancelled) return;
      LAYERS.forEach((layer, i) => {
        drawPlate(plates[i].image, layer, theme, themeName === "light");
        drawLabel(labels[i].image, layer, i, theme, themeName === "light");
        plates[i].needsUpdate = true;
        labels[i].needsUpdate = true;
      });
    };
    paint();
    document.fonts?.ready.then(paint);
    particles.material.blending = theme.blending;
    particles.material.needsUpdate = true;
    return () => {
      cancelled = true;
    };
  }, [plates, labels, particles, theme, themeName]);

  useEffect(
    () => () => {
      plates.forEach((tex) => tex.dispose());
      labels.forEach((tex) => tex.dispose());
      edge.dispose();
      particles.geometry.dispose();
      particles.material.dispose();
    },
    [plates, labels, edge, particles],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const presence = world.presence.about ?? 0;
    const local = world.local.about ?? 0;
    const g = root.current;
    if (!g) return;

    // exploded view: layers spread apart as the camera settles on the station
    gap.current = damp(gap.current, 0.3 + presence * 0.55, 3, dt);
    const spread = gap.current;
    const active = clamp(Math.floor(local * LAYERS.length), 0, LAYERS.length - 1);

    g.rotation.y = damp(g.rotation.y, -0.62 + world.pointer.x * 0.22 + Math.sin(t * 0.25) * 0.05, 3, dt);
    g.rotation.x = damp(g.rotation.x, 0.5 - world.pointer.y * 0.08, 3, dt);
    g.position.y = Math.sin(t * 0.6) * 0.05;

    LAYERS.forEach((_, i) => {
      const y = (i - (LAYERS.length - 1) / 2) * spread + (i === active ? 0.08 : 0);
      const on = i === active ? 1 : 0;
      const plate = plateRefs.current[i];
      if (plate) {
        plate.position.y = damp(plate.position.y, y, 6, dt);
        plate.material.opacity = damp(plate.material.opacity, 0.55 + on * 0.45, 5, dt);
      }
      const line = edgeRefs.current[i];
      if (line) {
        line.position.y = plate ? plate.position.y + 0.002 : y;
        line.material.opacity = damp(line.material.opacity, 0.25 + on * 0.75, 5, dt);
      }
      const label = labelRefs.current[i];
      if (label) {
        label.position.y = (plate ? plate.position.y : y) + 0.05;
        label.material.opacity = damp(label.material.opacity, 0.4 + on * 0.6, 5, dt);
      }
    });

    // particles rise through the stack and wrap from the bottom plate
    const height = spread * (LAYERS.length - 1) + 0.4;
    const pos = particles.geometry.attributes.position;
    particles.userData.seeds.forEach((s, i) => {
      s.t = (s.t + s.speed * dt) % 1;
      pos.setXYZ(i, s.x + Math.sin(t + i) * 0.03, -height / 2 + s.t * height, s.z);
    });
    pos.needsUpdate = true;
    particles.material.uniforms.uDpr.value = state.viewport.dpr;
  });

  const lightTheme = themeName === "light";
  return (
    // nudged right so the labels on the left stay inside the stage column
    <group scale={0.72} position={[0.42, 0, 0]}>
      <group ref={root} rotation={[0.5, -0.62, 0]}>
        {LAYERS.map((layer, i) => (
          <group key={layer.label}>
            <mesh ref={(el) => (plateRefs.current[i] = el)} rotation={[-Math.PI / 2, 0, 0]} renderOrder={i}>
              <planeGeometry args={[SIZE, SIZE]} />
              <meshBasicMaterial map={plates[i]} transparent opacity={0.6} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
            </mesh>
            <lineLoop ref={(el) => (edgeRefs.current[i] = el)} geometry={edge} rotation={[-Math.PI / 2, 0, 0]}>
              <lineBasicMaterial color={lightTheme ? layer.ink : layer.color} transparent opacity={0.3} toneMapped={false} />
            </lineLoop>
            <sprite
              ref={(el) => (labelRefs.current[i] = el)}
              position={[-SIZE / 2 - 0.05, 0, SIZE / 2]}
              center={[1, 0.5]}
              scale={[1.6, 0.4, 1]}
            >
              <spriteMaterial map={labels[i]} transparent opacity={0.5} depthWrite={false} depthTest={false} toneMapped={false} />
            </sprite>
          </group>
        ))}
        <primitive object={particles} />
      </group>
    </group>
  );
}
