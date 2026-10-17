/**
 * Particle target shapes, generated at runtime (no assets): icon paths are
 * stroked onto an offscreen canvas and the lit pixels are sampled into
 * point positions. The idle shape is a 3D Fibonacci "neural orb".
 * Paths mirror the inline SVG icons used in ContactSection / SiteFooter.
 */

const ICONS = {
  linkedin: [
    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z",
    "M2 9h4v12H2z",
    "M2 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
  ],
  github: [
    "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  ],
  email: ["M4 6h16v12H4z", "M4 7l8 6 8-6"],
  phone: [
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  ],
  resume: ["M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z", "M14 2v5h5", "M9 13h6", "M9 17h4"],
};

export const SHAPE_LABELS = {
  orb: "Idle · listening",
  linkedin: "LinkedIn",
  github: "GitHub",
  email: "Email",
  phone: "Call",
  resume: "Resume",
};

const RES = 160; // sampling canvas size (24-unit icon space × ~6.7)

/**
 * Stroke 24-unit SVG icon paths onto an offscreen canvas and return the lit
 * pixels as a flat [x0, y0, x1, y1, ...] list in canvas pixel coordinates.
 */
export function rasterIcon(paths, res = RES, lineWidth = 1.9) {
  const canvas = document.createElement("canvas");
  canvas.width = res;
  canvas.height = res;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const scale = res / 24;
  ctx.setTransform(scale * 0.86, 0, 0, scale * 0.86, res * 0.07, res * 0.07);
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#fff";
  paths.forEach((d) => ctx.stroke(new Path2D(d)));

  const { data } = ctx.getImageData(0, 0, res, res);
  const lit = [];
  for (let y = 0; y < res; y += 1) {
    for (let x = 0; x < res; x += 1) {
      if (data[(y * res + x) * 4 + 3] > 140) lit.push(x, y);
    }
  }
  return lit;
}

function sampleIcon(paths, count, rand) {
  const lit = rasterIcon(paths);

  const out = new Float32Array(count * 3);
  const pixels = lit.length / 2;
  for (let i = 0; i < count; i += 1) {
    const p = Math.floor(rand() * pixels) * 2;
    // pixel -> [-1, 1] with sub-pixel jitter; y flipped; shallow depth
    out[i * 3] = ((lit[p] + rand()) / RES) * 2 - 1;
    out[i * 3 + 1] = -(((lit[p + 1] + rand()) / RES) * 2 - 1);
    out[i * 3 + 2] = (rand() - 0.5) * 0.16;
  }
  return out;
}

function sampleOrb(count, rand) {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    // most points on the shell, some inside for a "core"
    const shell = rand() < 0.82 ? 0.78 + rand() * 0.06 : rand() * 0.55;
    out[i * 3] = Math.cos(theta) * r * shell;
    out[i * 3 + 1] = y * shell;
    out[i * 3 + 2] = Math.sin(theta) * r * shell;
  }
  return out;
}

/** Deterministic PRNG so shapes are stable between sessions. */
export function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildShapes(count) {
  const shapes = { orb: sampleOrb(count, mulberry32(7)) };
  Object.entries(ICONS).forEach(([name, paths], index) => {
    shapes[name] = sampleIcon(paths, count, mulberry32(11 + index));
  });
  return shapes;
}
