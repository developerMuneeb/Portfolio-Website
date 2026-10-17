import { useEffect, useRef } from "react";
import { buildShapes } from "./particleShapes";
import { getSignalShape, IDLE_SHAPE, subscribeSignal } from "./signalBus";

/**
 * Igloo Inc-style signal particles: a GPU point cloud that swirls and
 * re-forms into the icon of whichever contact link is hovered.
 *
 * Raw WebGL (one shader program, no three.js) so phones never download or
 * parse a 3D library just for this panel.
 * - Morph runs entirely in the vertex shader (aFrom -> aTo by uProgress with
 *   a per-particle stagger); a curl-ish swirl peaks mid-flight and particles
 *   glow hotter while moving.
 * - The loop only runs while the panel is on screen and the tab is visible;
 *   a settled icon renders nothing, the idle orb drifts at ~30fps.
 * - Particle count is tiered by device and halves itself if frames run slow.
 */

const MORPH_SECONDS = 1.35;
const STAGGER = 0.35;
const FOV = (40 * Math.PI) / 180;
const CAMERA_Z = 3.2;

const VERT = `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec4 aRand; // x: stagger, y: size, z: phase, w: hue mix
  uniform mat4 uModelView;
  uniform mat4 uProjection;
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uDpr;
  uniform vec3 uPointer;
  uniform float uPointerForce;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorHot;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float t = clamp((uProgress - aRand.x * ${STAGGER.toFixed(2)}) / ${(1 - STAGGER).toFixed(2)}, 0.0, 1.0);
    float e = t * t * (3.0 - 2.0 * t);
    vec3 pos = mix(aFrom, aTo, e);

    float flight = sin(3.14159 * t);
    float ph = aRand.z * 6.2831;
    vec3 swirl = vec3(
      sin(pos.y * 3.1 + uTime * 1.3 + ph),
      cos(pos.x * 2.7 - uTime * 1.1 + ph),
      sin((pos.x + pos.y) * 2.3 + uTime * 0.9)
    );
    pos += swirl * 0.32 * flight;
    pos += normalize(pos + 0.0001) * sin(uTime * 1.4 + ph) * 0.012;

    vec3 d = pos - uPointer;
    float falloff = exp(-dot(d.xy, d.xy) * 14.0) * uPointerForce;
    pos.xy += normalize(d.xy + 0.0001) * falloff * 0.22;

    vec4 mv = uModelView * vec4(pos, 1.0);
    gl_Position = uProjection * mv;
    gl_PointSize = uSize * aRand.y * uDpr * (1.0 + flight * 0.9 + falloff * 0.6) * (3.0 / -mv.z);

    vec3 base = mix(uColorA, uColorB, aRand.w);
    vColor = mix(base, uColorHot, clamp(flight * 0.6 + falloff * 0.45, 0.0, 1.0));
    vAlpha = 0.32 + 0.38 * flight + 0.14 * aRand.y;
  }
`;

const FRAG = `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a * vAlpha;
    gl_FragColor = vec4(vColor * a, a);
  }
`;

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

function perspective(aspect) {
  const f = 1 / Math.tan(FOV / 2);
  const near = 0.1;
  const far = 20;
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

/** View translate(0,0,-z) · rotX · rotY · scale, column-major. */
function modelView(rx, ry, s, out) {
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  out[0] = cy * s; out[1] = sx * sy * s; out[2] = -cx * sy * s; out[3] = 0;
  out[4] = 0; out[5] = cx * s; out[6] = sx * s; out[7] = 0;
  out[8] = sy * s; out[9] = -sx * cy * s; out[10] = cx * cy * s; out[11] = 0;
  out[12] = 0; out[13] = 0; out[14] = -CAMERA_Z; out[15] = 1;
  return out;
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

function particleBudget() {
  const cores = navigator.hardwareConcurrency || 4;
  const w = window.innerWidth;
  if (w >= 1280 && cores >= 8) return 7000;
  if (w >= 981) return 4500;
  return 2500;
}

export default function SignalParticles({ onShape }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" });
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
    host.appendChild(canvas);

    const count = particleBudget();
    const shapes = buildShapes(count);
    const from = new Float32Array(shapes[IDLE_SHAPE]);
    const to = new Float32Array(shapes[IDLE_SHAPE]);
    const rand = new Float32Array(count * 4);
    for (let i = 0; i < count; i += 1) {
      rand[i * 4] = Math.random();
      rand[i * 4 + 1] = 0.55 + Math.random() * 0.9;
      rand[i * 4 + 2] = Math.random();
      rand[i * 4 + 3] = Math.random();
    }

    const buffers = [];
    const attribute = (name, data, size) => {
      const buffer = gl.createBuffer();
      buffers.push(buffer);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
      const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      return buffer;
    };
    const fromBuffer = attribute("aFrom", from, 3);
    const toBuffer = attribute("aTo", to, 3);
    attribute("aRand", rand, 4);

    const u = {};
    ["uModelView", "uProjection", "uProgress", "uTime", "uSize", "uDpr", "uPointer", "uPointerForce", "uColorA", "uColorB", "uColorHot"].forEach(
      (name) => {
        u[name] = gl.getUniformLocation(program, name);
      },
    );
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    gl.uniform1f(u.uSize, 3.1);
    gl.uniform1f(u.uDpr, dpr);
    gl.uniform3fv(u.uColorA, rgb("#22d3ee"));
    gl.uniform3fv(u.uColorB, rgb("#818cf8"));
    gl.uniform3fv(u.uColorHot, rgb("#e0fbff"));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE); // additive glow
    gl.clearColor(0, 0, 0, 0);

    let aspect = 1;
    let scale = 0.92;
    let drawCount = count;
    const mv = new Float32Array(16);

    // ----- morph control -----
    let shape = IDLE_SHAPE;
    let progress = 1;
    const smooth = (x) => x * x * (3 - 2 * x);
    const retarget = (next) => {
      if (next === shape || !shapes[next]) return;
      // Freeze current (un-swirled) positions as the new start
      for (let i = 0; i < count; i += 1) {
        const e = smooth(Math.min(1, Math.max(0, (progress - rand[i * 4] * STAGGER) / (1 - STAGGER))));
        const k = i * 3;
        from[k] += (to[k] - from[k]) * e;
        from[k + 1] += (to[k + 1] - from[k + 1]) * e;
        from[k + 2] += (to[k + 2] - from[k + 2]) * e;
      }
      to.set(shapes[next]);
      gl.bindBuffer(gl.ARRAY_BUFFER, fromBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, from);
      gl.bindBuffer(gl.ARRAY_BUFFER, toBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, to);
      shape = next;
      progress = reduce ? 1 : 0;
      onShape?.(next);
      wake();
    };

    // ----- pointer -----
    const pointer = { x: 9, y: 9, force: 0, target: 0 };
    const onMove = (event) => {
      const rect = host.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      const inside = Math.abs(nx) <= 1 && Math.abs(ny) <= 1;
      pointer.target = inside ? 1 : 0;
      const half = Math.tan(FOV / 2) * CAMERA_Z;
      pointer.x = nx * half * aspect;
      pointer.y = ny * half;
      if (inside) wake();
    };

    // ----- render -----
    let rotY = 0;
    let rotX = 0.25;
    const render = (now) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniformMatrix4fv(u.uModelView, false, modelView(rotX, rotY, scale, mv));
      gl.uniform1f(u.uTime, now / 1000);
      gl.uniform1f(u.uProgress, progress);
      gl.uniform3f(u.uPointer, pointer.x / scale, pointer.y / scale, 0);
      gl.uniform1f(u.uPointerForce, pointer.force);
      gl.drawArrays(gl.POINTS, 0, drawCount);
    };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      aspect = width / height;
      gl.uniformMatrix4fv(u.uProjection, false, perspective(aspect));
      scale = 0.92 * Math.min(1, aspect); // keep icons inside narrow panels
      render(performance.now());
    };

    // ----- loop -----
    let raf = 0;
    let last = performance.now();
    let lastRender = 0;
    let visible = false;
    let idleUntil = 0;
    let frames = 0;
    let slowFrames = 0;
    let degraded = false;

    const tick = (now) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (progress < 1) progress = Math.min(1, progress + dt / MORPH_SECONDS);
      pointer.force += (pointer.target - pointer.force) * Math.min(1, dt * 6);

      // Orb rotates; icons swing back to face the viewer with a pointer tilt
      const ease = Math.min(1, dt * 4);
      if (shape === IDLE_SHAPE) rotY += dt * 0.35;
      else rotY += (Math.round(rotY / (Math.PI * 2)) * Math.PI * 2 + pointer.x * 0.25 * pointer.force - rotY) * ease;
      rotX += ((shape === IDLE_SHAPE ? 0.25 : -pointer.y * 0.25 * pointer.force) - rotX) * ease;

      const busy = progress < 1 || pointer.force > 0.01 || now < idleUntil;
      if (busy || now - lastRender > 32) {
        render(now);
        lastRender = now;
      }

      frames += 1;
      if (dt > 0.024) slowFrames += 1;
      if (!degraded && frames > 90) {
        if (slowFrames / frames > 0.5) {
          drawCount = Math.floor(count / 2);
          degraded = true;
        }
        frames = 0;
        slowFrames = 0;
      }

      if (visible && !document.hidden && (busy || shape === IDLE_SHAPE)) raf = requestAnimationFrame(tick);
    };

    function wake() {
      idleUntil = performance.now() + 1500;
      if (reduce) {
        render(performance.now());
        return;
      }
      if (!raf && visible && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    observer.observe(host);
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const onVisibility = () => {
      if (!document.hidden) wake();
    };

    resize();
    const unsubscribe = subscribeSignal(retarget);
    retarget(getSignalShape());
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      buffers.forEach((buffer) => gl.deleteBuffer(buffer));
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [onShape]);

  return <div ref={hostRef} className="signal-canvas" aria-hidden="true" />;
}
