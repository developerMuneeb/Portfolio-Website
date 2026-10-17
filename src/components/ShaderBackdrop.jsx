import { useEffect, useRef } from "react";

/**
 * Full-page WebGL aurora — the site's living color layer.
 *
 * Raw WebGL (no three.js) so it ships in a few KB and also runs on phones.
 * Readability first: it renders at a fraction of screen resolution
 * (CSS-upscaled — soft by design), is capped dim, and is vignetted toward
 * the content column so copy always sits on near-black. The palette eases
 * to a per-section mood using the scroll-spy's html[data-section] (and
 * html[data-project] inside the Work deck). Throttled to ~30fps, paused when
 * the tab is hidden, and drawn once under prefers-reduced-motion. If WebGL
 * is unavailable the CSS backdrop layers simply stay in charge.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uScroll;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform float uLight;
uniform float uPulse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  p.y += uScroll * 1.6;

  float t = uTime * 0.03;
  vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)), fbm(p * 1.3 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 1.1 + 2.0 * q + vec2(1.7, 9.2) + t * 0.7),
                fbm(p * 1.1 + 2.0 * q + vec2(8.3, 2.8) - t * 0.5));
  float f = fbm(p * 1.05 + 2.2 * r);

  vec3 col = mix(uA, uB, clamp(f * f * 2.4, 0.0, 1.0));
  col = mix(col, uC, clamp(length(q) * 0.7 - 0.25, 0.0, 1.0));

  // Ribbon-like aurora bands rather than an even wash
  float band = smoothstep(0.42, 0.95, f);
  band += 0.35 * smoothstep(0.6, 1.0, r.x) * smoothstep(0.3, 0.8, f);
  // Igloo Inc-style section change: the bands split into R/G/B for a beat
  float split = 0.08 * uPulse;
  vec3 bands = vec3(smoothstep(0.42, 0.95, f + split), band, smoothstep(0.42, 0.95, f - split));
  vec3 c = col * bands;

  // Soft light that follows the cursor
  vec2 pp = (uPointer - 0.5) * vec2(aspect, 1.0);
  pp.y += uScroll * 1.6;
  float d = length(p - pp);
  c += uB * 0.22 * exp(-d * d * 5.0);

  // Readability: quiet behind the content column, livelier at the margins
  float side = smoothstep(0.08, 0.5, abs(uv.x - 0.5));
  float vig = mix(0.42, 1.0, side);
  vig *= smoothstep(1.35, 0.25, length((uv - 0.5) * vec2(1.1, 1.0)));

  // Dark: light added onto deep navy (matches --bg). Light: soft pastel
  // washes of the same palette blended into paper (matches light --bg).
  // ...and a frosty, grainy light band sweeps down the screen
  float sweep = exp(-pow((uv.y - uPulse) * 6.0, 2.0)) * uPulse;
  float frost = sweep * (0.45 + 0.55 * hash(floor(gl_FragCoord.xy) + uTime));

  vec3 night = vec3(0.047, 0.063, 0.102) + c * vig * 0.4 + uB * frost * 0.16;
  vec3 paper = vec3(0.957, 0.965, 0.98);
  float wash = clamp((band * 0.85 + 0.2 * exp(-d * d * 5.0)) * vig * 0.34, 0.0, 1.0);
  vec3 day = mix(paper, col, clamp(wash + frost * 0.14, 0.0, 1.0));
  gl_FragColor = vec4(mix(night, day, uLight), 1.0);
}
`;

const hex = (h) => {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// Three-stop moods built from the design tokens
const PALETTES = {
  top: ["#38bdf8", "#22d3ee", "#2dd4bf"],
  about: ["#818cf8", "#38bdf8", "#22d3ee"],
  experience: ["#2dd4bf", "#22d3ee", "#3b82f6"],
  credentials: ["#818cf8", "#3b82f6", "#22d3ee"],
  skills: ["#2dd4bf", "#38bdf8", "#818cf8"],
  services: ["#3b82f6", "#818cf8", "#22d3ee"],
  work: ["#3b82f6", "#22d3ee", "#818cf8"],
  contact: ["#22d3ee", "#2dd4bf", "#f59e7a"],
  // Per-project moods inside the stacked Work deck
  "shopmesh-ai": ["#22d3ee", "#818cf8", "#f59e7a"],
  "freight-voice": ["#38bdf8", "#2dd4bf", "#fbbf24"],
  "lead-scraper": ["#2dd4bf", "#22d3ee", "#3b82f6"],
  "business-analyzer": ["#818cf8", "#38bdf8", "#f59e7a"],
  "voice-suite": ["#3b82f6", "#2dd4bf", "#818cf8"],
};

const paletteFor = () => {
  const { section, project } = document.documentElement.dataset;
  const key = section === "work" && project && PALETTES[project] ? project : section;
  return (PALETTES[key] ?? PALETTES.top).map(hex);
};

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let gl = null;
    try {
      gl = canvas.getContext("webgl", { antialias: false, depth: false, alpha: false, powerPreference: "low-power" });
    } catch {
      gl = null;
    }
    if (!gl) return undefined;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return undefined;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;
    gl.useProgram(program);

    // One oversized triangle covers the viewport
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {};
    ["uRes", "uTime", "uPointer", "uScroll", "uA", "uB", "uC", "uLight", "uPulse"].forEach((name) => {
      u[name] = gl.getUniformLocation(program, name);
    });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 720px)").matches;
    const scale = small ? 0.32 : 0.45;

    const palette = paletteFor();
    let target = palette.map((c) => c.slice());
    const isLight = () => (document.documentElement.dataset.theme === "light" ? 1 : 0);
    // Theme flips instantly (it sits under a view-transition reveal)
    let light = isLight();
    // Section-change pulse (Igloo Inc): 1 -> 0 over PULSE_MS
    const PULSE_MS = 750;
    let pulseStart = -1e9;
    let section = document.documentElement.dataset.section;
    // Cached so the loop never forces a layout read
    let maxScroll = 1;
    const measureScroll = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    measureScroll();
    const pointer = [0.72, 0.62];
    const pointerTarget = [0.72, 0.62];
    let scroll = 0;
    let raf = 0;
    let last = 0;
    let running = true;
    const start = performance.now();

    const resize = () => {
      const w = Math.max(1, Math.round(window.innerWidth * scale));
      const h = Math.max(1, Math.round(window.innerHeight * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    const scrollFraction = () => Math.min(1, window.scrollY / maxScroll);

    const draw = (now) => {
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, reduce ? 12 : (now - start) / 1000);
      gl.uniform2f(u.uPointer, pointer[0], pointer[1]);
      gl.uniform1f(u.uScroll, scroll);
      gl.uniform3fv(u.uA, palette[0]);
      gl.uniform3fv(u.uB, palette[1]);
      gl.uniform3fv(u.uC, palette[2]);
      gl.uniform1f(u.uLight, light);
      gl.uniform1f(u.uPulse, reduce ? 0 : Math.max(0, 1 - (now - pulseStart) / PULSE_MS));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 33) return; // ~30fps is plenty for a slow aurora
      last = now;
      pointer[0] += (pointerTarget[0] - pointer[0]) * 0.06;
      pointer[1] += (pointerTarget[1] - pointer[1]) * 0.06;
      scroll += (scrollFraction() - scroll) * 0.08;
      for (let i = 0; i < 3; i += 1) {
        for (let k = 0; k < 3; k += 1) palette[i][k] += (target[i][k] - palette[i][k]) * 0.04;
      }
      draw(now);
    };

    const startLoop = () => {
      if (reduce || raf || !running) return;
      raf = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (event) => {
      pointerTarget[0] = event.clientX / window.innerWidth;
      pointerTarget[1] = 1 - event.clientY / window.innerHeight;
    };
    const onResize = () => {
      resize();
      if (reduce) draw(performance.now());
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running) startLoop();
      else stopLoop();
    };
    const observer = new MutationObserver(() => {
      target = paletteFor();
      const nextSection = document.documentElement.dataset.section;
      if (nextSection !== section) {
        section = nextSection;
        pulseStart = performance.now();
      }
      const nextLight = isLight();
      if (nextLight !== light) {
        light = nextLight;
        draw(performance.now());
      }
      if (reduce) {
        target.forEach((c, i) => { palette[i] = c.slice(); });
        draw(performance.now());
      }
    });
    const onContextLost = (event) => {
      event.preventDefault();
      stopLoop();
      running = false;
      document.documentElement.classList.remove("has-shader");
    };

    resize();
    scroll = scrollFraction();
    draw(performance.now());
    document.documentElement.classList.add("has-shader");
    startLoop();

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-section", "data-project", "data-theme"] });
    window.addEventListener("resize", onResize);
    const bodyObserver = new ResizeObserver(measureScroll);
    bodyObserver.observe(document.body);
    if (!reduce) window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      bodyObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      document.documentElement.classList.remove("has-shader");
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} className="shader-backdrop" aria-hidden="true" />;
}
