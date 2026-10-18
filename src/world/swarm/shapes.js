import * as THREE from "three";
import { mulberry32, rasterIcon } from "../../components/signal/particleShapes";
import { experience } from "../../data/profile";

/**
 * Formations for the swarm. Every shape is resampled to the same point count
 * so point i simply travels from shape A to shape B. Each point is stored as
 * (x, y, z, group): `group` lets a section light up one part of its shape
 * (a stack layer, a job on the timeline); FLOW marks points that stream
 * upward through the About stack; -1 means "no group".
 *
 * Points are assigned to a shape's parts at random (not in blocks), so the
 * first half of the buffer is a fair half-density version — the low quality
 * tier just draws fewer points.
 */

export const COUNT = 24000;
export const FLOW = 9;
// Helix data-flow points: group = HELIX_FLOW + u (u in 0..1 along the helix); the shader moves them
export const HELIX_FLOW = 10;
export const ROLES = experience.length;
export const STACK = { size: 1.34, gap: 0.86, rotation: new THREE.Euler(0.76, -0.62, 0, "YXZ"), offsetX: 0.5 };
export const STACK_LAYERS = 4;
export const HELIX = { height: 3.2, radius: 1.15, turns: 1.35 };
export const GLOBE_RADIUS = 1.35;
export const SCREEN = { w: 2.6, h: 1.62, y: 0.28 };

// 24-unit SVG paths (lucide-style) for the service and project icons
const SERVICE_ICONS = [
  // AI agent development — bot
  ["M12 8V4H8", "M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z", "M2 14h2", "M20 14h2", "M15 13v2", "M9 13v2"],
  // workflow & business automation
  ["M5 3h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M7 11v4a2 2 0 0 0 2 2h4", "M15 13h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z"],
  // voice AI agents — mic
  ["M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z", "M19 10v2a7 7 0 0 1-14 0v-2", "M12 19v3"],
  // AI chatbots — chat bubble with dots
  ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", "M7.6 10a.4.4 0 1 0 .8 0a.4.4 0 1 0-.8 0", "M11.6 10a.4.4 0 1 0 .8 0a.4.4 0 1 0-.8 0", "M15.6 10a.4.4 0 1 0 .8 0a.4.4 0 1 0-.8 0"],
  // dashboards & predictive analytics — chart
  ["M3 3v18h18", "M7 15l4-4 3 3 5-6", "M19 8V5h-3"],
  // AI integration consulting — lightbulb
  ["M9 18h6", "M10 22h4", "M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"],
];

const PROJECT_ICONS = [
  // ShopMesh — cart
  ["M6 6h15l-1.5 9h-12z", "M6 6L5 3H2", "M9 20a1 1 0 1 0 2 0a1 1 0 1 0-2 0", "M17 20a1 1 0 1 0 2 0a1 1 0 1 0-2 0"],
  // Freight voice agent — truck
  ["M1 4h14v12H1z", "M15 8h4l3 3v5h-7z", "M3 18.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M16 18.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0"],
  // job & lead scraper — search
  ["M11 3a8 8 0 1 0 0 16a8 8 0 1 0 0-16", "M21 21l-4.35-4.35"],
  // business analyzer & content — document
  ["M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z", "M14 2v5h5", "M9 13h6", "M9 17h4"],
  // n8n + Synthflow — node graph
  ["M5 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M15 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M9 12l6-6", "M9 12l6 6"],
];

const GRAD_CAP = [
  "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
  "M22 10v6",
  "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
];
const MARK = ["M4 20V4l8 9 8-9v16"];

// One topic glyph per credentials card, in the order of the Credentials list
// (education, then the featured certificates). Topics, not issuer logos.
const CRED_ICONS = [
  GRAD_CAP,
  // Building Agentic AI Systems — a hub agent with four sub-agents
  [
    "M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    "M2 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M18 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M2 20a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M18 20a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M5.5 5.5l4.4 4.4",
    "M18.5 5.5l-4.4 4.4",
    "M5.5 18.5l4.4-4.4",
    "M18.5 18.5l-4.4-4.4",
  ],
  // Azure AI Fundamentals — a cloud with a spark
  ["M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z", "M12 11.5v4", "M10 13.5h4"],
  // Google Data Analytics — rising bars
  ["M3 3v18h18", "M8 17v-4", "M13 17V9", "M18 17V5"],
  // Python for Machine Learning — code braces around a model node
  [
    "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1",
    "M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
    "M10 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
  ],
  // AI Agents for Beginners — an agent
  SERVICE_ICONS[0],
];

// ---------------------------------------------------------------- helpers

/** Pick a part by weight for every point; each part writes (x, y, z, group). */
function compose(seed, parts) {
  const rand = mulberry32(seed);
  const out = new Float32Array(COUNT * 4);
  const total = parts.reduce((sum, p) => sum + p.weight, 0);
  const v = [0, 0, 0, -1];
  for (let i = 0; i < COUNT; i += 1) {
    let pick = rand() * total;
    let part = parts[0];
    for (const p of parts) {
      pick -= p.weight;
      if (pick <= 0) {
        part = p;
        break;
      }
    }
    v[3] = -1;
    part.point(rand, v);
    out.set(v, i * 4);
  }
  return out;
}

function onSphere(rand, r, v) {
  const u = rand() * 2 - 1;
  const a = rand() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  v[0] = Math.cos(a) * s * r;
  v[1] = u * r;
  v[2] = Math.sin(a) * s * r;
  return v;
}

/** Point on the perimeter of a w×h rectangle centred at (cx, cy). */
function onRect(rand, w, h, cx, cy, jitter, v) {
  const p = rand() * 2 * (w + h);
  if (p < w) [v[0], v[1]] = [p - w / 2, -h / 2];
  else if (p < w + h) [v[0], v[1]] = [w / 2, p - w - h / 2];
  else if (p < 2 * w + h) [v[0], v[1]] = [w / 2 - (p - w - h), h / 2];
  else [v[0], v[1]] = [-w / 2, h / 2 - (p - 2 * w - h)];
  v[0] += cx + (rand() - 0.5) * jitter;
  v[1] += cy + (rand() - 0.5) * jitter;
  return v;
}

/** Icon paths -> sampler of points spanning `size` world units, extruded in z. */
function iconSampler(paths, size, { res = 140, line = 1.9, depth = 0.09, cx = 0, cy = 0, z = 0 } = {}) {
  const lit = rasterIcon(paths, res, line);
  const n = lit.length / 2;
  return (rand, v) => {
    const p = Math.floor(rand() * n) * 2;
    v[0] = cx + (((lit[p] + rand()) / res) - 0.5) * size;
    v[1] = cy - (((lit[p + 1] + rand()) / res) - 0.5) * size;
    // two shells front/back so flat icons read as extruded solids
    v[2] = z + (rand() < 0.5 ? -depth : depth) + (rand() - 0.5) * 0.03;
    return v;
  };
}

/** Rasterise a canvas drawing (white on transparent) into a weighted sampler. */
function canvasSampler(draw, res = 128) {
  const canvas = document.createElement("canvas");
  canvas.width = res;
  canvas.height = res;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  draw(ctx, res);
  const { data } = ctx.getImageData(0, 0, res, res);
  const lit = [];
  for (let y = 0; y < res; y += 1) {
    for (let x = 0; x < res; x += 1) {
      const a = data[(y * res + x) * 4 + 3];
      if (a > 20) lit.push(x, y, a / 255);
    }
  }
  const n = lit.length / 3;
  // returns normalised (u, v) in -0.5..0.5; brighter pixels are picked more
  return (rand, out) => {
    for (let tries = 0; tries < 6; tries += 1) {
      const p = Math.floor(rand() * n) * 3;
      if (rand() <= lit[p + 2] || tries === 5) {
        out[0] = (lit[p] + rand()) / res - 0.5;
        out[1] = (lit[p + 1] + rand()) / res - 0.5;
        return out;
      }
    }
    return out;
  };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// About stack motifs, drawn in a 128² canvas (plate seen from above). Drawn
// as clean strokes, not fills: thousands of glowing points on a filled shape
// read as a blob, on an outline they read as a drawing.
const MOTIFS = [
  // 01 workflow: a flowchart, boxes joined by arrows
  (ctx) => {
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    const box = (x, y) => {
      roundRect(ctx, x - 15, y - 9, 30, 18, 4);
      ctx.stroke();
    };
    const arrow = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      const a = Math.atan2(y2 - y1, x2 - x1);
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - 6 * Math.cos(a - 0.5), y2 - 6 * Math.sin(a - 0.5));
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - 6 * Math.cos(a + 0.5), y2 - 6 * Math.sin(a + 0.5));
      ctx.stroke();
    };
    box(26, 34); box(64, 34); box(102, 34); box(45, 94); box(90, 94);
    arrow(41, 34, 48, 34); arrow(79, 34, 86, 34);
    arrow(64, 43, 49, 84); arrow(102, 43, 92, 84); arrow(60, 94, 74, 94);
  },
  // 02 data: a grid of cells, some filled like records
  (ctx) => {
    ctx.lineWidth = 2.5;
    for (let row = 0; row < 5; row += 1) {
      for (let col = 0; col < 5; col += 1) {
        const x = 20 + col * 18, y = 20 + row * 18;
        roundRect(ctx, x, y, 14, 14, 2);
        if ((row * 5 + col) % 3 === 0) ctx.fill();
        else ctx.stroke();
      }
    }
  },
  // 03 AI systems: a neural network, rings joined by lines
  (ctx) => {
    const cols = [[3, 22], [4, 64], [2, 106]];
    const pts = cols.map(([n, x]) => Array.from({ length: n }, (_, i) => [x, 64 + (i - (n - 1) / 2) * 26]));
    ctx.lineWidth = 1.6;
    ctx.globalAlpha = 0.75;
    for (let k = 0; k < pts.length - 1; k += 1) {
      pts[k].forEach(([x1, y1]) =>
        pts[k + 1].forEach(([x2, y2]) => {
          ctx.beginPath();
          ctx.moveTo(x1 + 7, y1);
          ctx.lineTo(x2 - 7, y2);
          ctx.stroke();
        }),
      );
    }
    ctx.globalAlpha = 1;
    ctx.lineWidth = 3;
    pts.flat().forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.stroke();
    });
  },
  // 04 outcomes: rising bars with a trend line and its arrowhead
  (ctx) => {
    const bars = [0.28, 0.4, 0.36, 0.55, 0.7, 0.88];
    ctx.lineWidth = 2.5;
    bars.forEach((h, i) => {
      roundRect(ctx, 18 + i * 16, 112 - h * 80, 11, h * 80, 2);
      ctx.stroke();
    });
    ctx.lineWidth = 3.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    bars.forEach((h, i) => {
      const x = 23.5 + i * 16, y = 104 - h * 80 - 10;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(112, 10);
    ctx.moveTo(112, 10);
    ctx.lineTo(103, 12);
    ctx.moveTo(112, 10);
    ctx.lineTo(110, 19);
    ctx.stroke();
  },
];

// ---------------------------------------------------------------- shapes

function coreShape() {
  return compose(101, [
    { weight: 0.74, point: (rand, v) => onSphere(rand, 0.76 + rand() * 0.06, v) },
    { weight: 0.26, point: (rand, v) => onSphere(rand, Math.cbrt(rand()) * 0.5, v) },
  ]);
}

/** Plate-space (x, z) for layer i before the stack's tilt is applied. */
export function stackLayerY(i) {
  return (i - (STACK_LAYERS - 1) / 2) * STACK.gap;
}

function stackShape() {
  const { size } = STACK;
  const motifs = MOTIFS.map((draw) => canvasSampler(draw));
  const uv = [0, 0];
  const m = new THREE.Matrix4().makeRotationFromEuler(STACK.rotation);
  const p = new THREE.Vector3();
  const finish = (v) => {
    p.set(v[0], v[1], v[2]).applyMatrix4(m);
    v[0] = p.x + STACK.offsetX;
    v[1] = p.y;
    v[2] = p.z;
    return v;
  };
  const top = stackLayerY(STACK_LAYERS - 1) + 0.3;
  return compose(202, [
    {
      // a faint, sparse fill: the plate reads as a sheet of glass, not a frame
      weight: 0.045,
      point: (rand, v) => {
        const layer = Math.floor(rand() * STACK_LAYERS);
        v[0] = (rand() - 0.5) * size;
        v[2] = (rand() - 0.5) * size;
        v[1] = stackLayerY(layer);
        v[3] = layer;
        return finish(v);
      },
    },
    {
      // plate outlines
      weight: 0.24,
      point: (rand, v) => {
        const layer = Math.floor(rand() * STACK_LAYERS);
        onRect(rand, size, size, 0, 0, 0.025, v);
        v[2] = v[1];
        v[1] = stackLayerY(layer);
        v[3] = layer;
        return finish(v);
      },
    },
    {
      // the motif printed on each plate
      weight: 0.575,
      point: (rand, v) => {
        const layer = Math.floor(rand() * STACK_LAYERS);
        motifs[layer](rand, uv);
        v[0] = uv[0] * size * 0.92;
        v[2] = uv[1] * size * 0.92;
        v[1] = stackLayerY(layer) + (rand() - 0.5) * 0.02;
        v[3] = layer;
        return finish(v);
      },
    },
    {
      // data streaming up through the layers (animated in the shader)
      weight: 0.14,
      point: (rand, v) => {
        v[0] = (rand() - 0.5) * size * 0.7;
        v[2] = (rand() - 0.5) * size * 0.7;
        v[1] = -top + rand() * top * 2;
        finish(v);
        v[3] = FLOW;
        return v;
      },
    },
  ]);
}

/** Helix point for u in 0..1 (top -> bottom). */
export function helixPoint(u, out = new THREE.Vector3()) {
  const { height, radius, turns } = HELIX;
  const a = u * Math.PI * 2 * turns;
  return out.set(Math.cos(a) * radius, height / 2 - u * height, Math.sin(a) * radius);
}

function helixShape() {
  const p = new THREE.Vector3();
  const node = (k) => helixPoint(k / Math.max(1, ROLES - 1), new THREE.Vector3());
  const nodes = Array.from({ length: ROLES }, (_, k) => node(k));
  return compose(303, [
    {
      // the ribbon: a flat band following the helix
      weight: 0.58,
      point: (rand, v) => {
        helixPoint(rand(), p);
        v[0] = p.x + (rand() - 0.5) * 0.04;
        v[1] = p.y + (rand() - 0.5) * 0.12;
        v[2] = p.z + (rand() - 0.5) * 0.04;
        return v;
      },
    },
    {
      // one bright cluster per job
      weight: 0.24,
      point: (rand, v) => {
        const k = Math.floor(rand() * ROLES);
        onSphere(rand, Math.cbrt(rand()) * 0.13, v);
        v[0] += nodes[k].x;
        v[1] += nodes[k].y;
        v[2] += nodes[k].z;
        v[3] = k;
        return v;
      },
    },
    {
      // data flowing along the ribbon, first job up to now (animated in the shader)
      weight: 0.1,
      point: (rand, v) => {
        const u = rand() * 0.999;
        helixPoint(u, p);
        v[0] = p.x;
        v[1] = p.y;
        v[2] = p.z;
        v[3] = HELIX_FLOW + u;
        return v;
      },
    },
    {
      // loose sparks around the ribbon
      weight: 0.08,
      point: (rand, v) => {
        helixPoint(rand(), p);
        onSphere(rand, 0.15 + rand() * 0.3, v);
        v[0] += p.x;
        v[1] += p.y;
        v[2] += p.z;
        return v;
      },
    },
  ]);
}

/** Credentials carousel: one card per row (education + certifications). */
export const CREDS = { count: 6, radius: 1.62, w: 1.3, h: 0.9 };

/** Point on card i's face at card-space (u, v): cards sit on a ring, facing out. */
function cardPoint(i, u, v, out) {
  const a = (i / CREDS.count) * Math.PI * 2;
  const s = Math.sin(a), c = Math.cos(a);
  out[0] = s * CREDS.radius + c * u;
  out[1] = v;
  out[2] = c * CREDS.radius - s * u;
  return out;
}

function credsShape() {
  const { w, h, count } = CREDS;
  // each card carries its own topic glyph, so the six read apart at a glance
  const glyphs = CRED_ICONS.slice(0, count).map((paths) => iconSampler(paths, 0.5, { depth: 0.012 }));
  const card = (rand) => Math.floor(rand() * count);
  const put = (rand, v, i, u, y) => {
    cardPoint(i, u, y, v);
    v[3] = i;
    return v;
  };
  return compose(404, [
    {
      // the card's edge
      weight: 0.28,
      point: (rand, v) => {
        const i = card(rand);
        onRect(rand, w, h, 0, 0, 0.02, v);
        return put(rand, v, i, v[0], v[1]);
      },
    },
    {
      // an inner border, like a printed certificate
      weight: 0.1,
      point: (rand, v) => {
        const i = card(rand);
        onRect(rand, w - 0.12, h - 0.12, 0, 0, 0.012, v);
        return put(rand, v, i, v[0], v[1]);
      },
    },
    {
      // the card's topic glyph on the left, a title and a line of text beside it
      weight: 0.3,
      point: (rand, v) => {
        const i = card(rand);
        if (rand() < 0.74) {
          glyphs[i](rand, v);
          return put(rand, v, i, v[0] - 0.29, v[1] + 0.04);
        }
        const title = rand() < 0.6;
        const u = 0.02 + rand() * (title ? 0.5 : 0.36);
        return put(rand, v, i, u, (title ? 0.22 : 0.1) + (rand() - 0.5) * (title ? 0.035 : 0.018));
      },
    },
    {
      // the seal: a ring with two ribbon tails, bottom right
      weight: 0.2,
      point: (rand, v) => {
        const i = card(rand);
        const sx = w / 2 - 0.2, sy = -h / 2 + 0.2;
        const r = rand();
        if (r < 0.62) {
          const a = rand() * Math.PI * 2, rr = 0.1 + (rand() < 0.5 ? 0 : 0.035);
          return put(rand, v, i, sx + Math.cos(a) * rr, sy + Math.sin(a) * rr);
        }
        const side = r < 0.81 ? -1 : 1, t = rand();
        return put(rand, v, i, sx + side * (0.04 + t * 0.06) + (rand() - 0.5) * 0.03, sy - 0.12 - t * 0.16);
      },
    },
    {
      // a faint ring the carousel turns on
      weight: 0.12,
      point: (rand, v) => {
        const a = rand() * Math.PI * 2, r = CREDS.radius * (1.12 + (rand() - 0.5) * 0.04);
        v[0] = Math.sin(a) * r;
        v[1] = -h / 2 - 0.28 + (rand() - 0.5) * 0.02;
        v[2] = Math.cos(a) * r;
        return v;
      },
    },
  ]);
}

function globeShape() {
  const R = GLOBE_RADIUS;
  return compose(505, [
    {
      // latitude rings
      weight: 0.24,
      point: (rand, v) => {
        const ring = Math.floor(rand() * 7);
        const lat = ((ring + 1) / 8 - 0.5) * Math.PI;
        const a = rand() * Math.PI * 2;
        v[0] = Math.cos(a) * Math.cos(lat) * R;
        v[1] = Math.sin(lat) * R;
        v[2] = Math.sin(a) * Math.cos(lat) * R;
        return v;
      },
    },
    {
      // meridians
      weight: 0.22,
      point: (rand, v) => {
        const m = Math.floor(rand() * 10);
        const lon = (m / 10) * Math.PI;
        const a = rand() * Math.PI * 2;
        v[0] = Math.cos(a) * Math.cos(lon) * R;
        v[1] = Math.sin(a) * R;
        v[2] = Math.cos(a) * Math.sin(lon) * R;
        return v;
      },
    },
    { weight: 0.44, point: (rand, v) => onSphere(rand, R * (0.98 + rand() * 0.04), v) },
    { weight: 0.1, point: (rand, v) => onSphere(rand, Math.cbrt(rand()) * 0.35, v) },
  ]);
}

function iconShape(paths, seed) {
  const icon = iconSampler(paths, 2.6);
  return compose(seed, [
    { weight: 0.86, point: icon },
    {
      // a thin halo so every icon shares the same silhouette
      weight: 0.14,
      point: (rand, v) => {
        const a = rand() * Math.PI * 2;
        const r = 1.72 + (rand() - 0.5) * 0.04;
        v[0] = Math.cos(a) * r;
        v[1] = Math.sin(a) * r;
        v[2] = (rand() - 0.5) * 0.06;
        return v;
      },
    },
  ]);
}

function projectShape(paths, seed) {
  const { w, h, y } = SCREEN;
  const icon = iconSampler(paths, 1.1, { depth: 0.05, cy: y, z: 0.08 });
  return compose(seed, [
    { weight: 0.3, point: (rand, v) => { onRect(rand, w, h, 0, y, 0.03, v); v[2] = (rand() - 0.5) * 0.04; return v; } },
    {
      // keyboard base, a shallow trapezoid in front of the screen
      weight: 0.16,
      point: (rand, v) => {
        const t = rand();
        const edge = rand();
        const bottom = y - h / 2;
        if (edge < 0.4) {
          v[0] = (t - 0.5) * (w + 0.5);
          v[1] = bottom - 0.32;
          v[2] = 0.42;
        } else if (edge < 0.7) {
          v[0] = (t - 0.5) * w;
          v[1] = bottom - 0.04;
          v[2] = 0.04;
        } else {
          const side = edge < 0.85 ? -1 : 1;
          v[0] = side * (w / 2 + t * 0.25);
          v[1] = bottom - 0.04 - t * 0.28;
          v[2] = 0.04 + t * 0.38;
        }
        return v;
      },
    },
    { weight: 0.54, point: icon },
  ]);
}

function markShape() {
  return compose(808, [{ weight: 1, point: iconSampler(MARK, 1.3, { depth: 0.05 }) }]);
}

const BUILDERS = {
  core: coreShape,
  stack: stackShape,
  helix: helixShape,
  creds: credsShape,
  globe: globeShape,
  mark: markShape,
};
SERVICE_ICONS.forEach((paths, i) => {
  BUILDERS[`svc${i}`] = () => iconShape(paths, 600 + i);
});
PROJECT_ICONS.forEach((paths, i) => {
  BUILDERS[`prj${i}`] = () => projectShape(paths, 700 + i);
});

export const SERVICE_COUNT = SERVICE_ICONS.length;
export const PROJECT_COUNT = PROJECT_ICONS.length;

const cache = new Map();

/** A formation by key (built on first use, then cached). */
export function getShape(key) {
  if (!cache.has(key)) cache.set(key, (BUILDERS[key] ?? BUILDERS.core)());
  return cache.get(key);
}

/** Build the remaining formations during idle time so no scroll ever waits on one. */
export function prewarmShapes() {
  const keys = Object.keys(BUILDERS).filter((key) => !cache.has(key));
  const idle = window.requestIdleCallback ?? ((fn) => window.setTimeout(() => fn({ timeRemaining: () => 8 }), 60));
  let cancelled = false;
  const step = (deadline) => {
    while (!cancelled && keys.length && deadline.timeRemaining() > 4) getShape(keys.shift());
    if (!cancelled && keys.length) idle(step);
  };
  idle(step);
  return () => {
    cancelled = true;
  };
}
