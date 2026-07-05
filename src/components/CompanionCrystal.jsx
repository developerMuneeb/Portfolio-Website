import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Points,
  PointsMaterial,
  Quaternion,
  Scene,
  TorusKnotGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * The transforming 3D companion.
 *
 * A lit crystal floats over the page. As you scroll it DISSOLVES into
 * thousands of glowing particles that morph through shapes that tell
 * the portfolio's story — a neural network sphere, the letters "AI",
 * an endless workflow loop — then condense back into the crystal for
 * the contact finale. Particles scatter away from the cursor while in
 * flight, and scroll velocity still feeds the tumble.
 *
 * Morph timeline (page scroll fraction p):
 *   0.00–0.14  solid crystal
 *   0.14–0.30  dissolve → neural network sphere
 *   0.30–0.40  hold neural sphere
 *   0.40–0.56  morph → "AI" glyph (faces the viewer)
 *   0.56–0.64  hold glyph
 *   0.64–0.80  morph → torus knot (workflow loop)
 *   0.80–0.96  reassemble → crystal
 *   0.96–1.00  solid crystal
 */

// Scroll path waypoints: [pageProgress, xNDC(-1..1), yOffset, scale]
const PATH = [
  [0.0, 0.52, 0.05, 1.05],
  [0.16, -0.55, -0.05, 0.85],
  [0.36, 0.58, 0.06, 0.8],
  [0.56, -0.5, -0.02, 0.9],
  [0.76, 0.55, 0.05, 0.72],
  [1.0, 0.0, 0.12, 0.95],
];

const SEGMENTS = [
  // [pStart, pEnd, fromShape, toShape]
  [0.14, 0.3, 0, 1],
  [0.3, 0.4, 1, 1],
  [0.4, 0.56, 1, 2],
  [0.56, 0.64, 2, 2],
  [0.64, 0.78, 2, 3],
  [0.78, 0.85, 3, 3],
  [0.85, 0.96, 3, 0],
];

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function bump(x, y, z) {
  return 0.88 + Math.abs(Math.sin(x * 3.37 + y * 5.11 + z * 4.73)) * 0.26;
}

function samplePath(p) {
  let i = 0;
  while (i < PATH.length - 2 && p > PATH[i + 1][0]) i++;
  const A = PATH[i];
  const B = PATH[i + 1];
  const t = smoothstep(A[0], B[0], p);
  return {
    x: A[1] + (B[1] - A[1]) * t,
    y: A[2] + (B[2] - A[2]) * t,
    s: A[3] + (B[3] - A[3]) * t,
  };
}

/* ---------- Morph target generators (N points each) ---------- */

function crystalTargets(geo, N) {
  // Random points on the crystal's faces (area-agnostic is fine here)
  const pos = geo.attributes.position;
  const faceCount = pos.count / 3;
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const f = (Math.random() * faceCount) | 0;
    let u = Math.random();
    let v = Math.random();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }
    const w = 1 - u - v;
    for (let k = 0; k < 3; k++) {
      out[i * 3 + k] =
        pos.getComponent(f * 3, k) * u +
        pos.getComponent(f * 3 + 1, k) * v +
        pos.getComponent(f * 3 + 2, k) * w;
    }
  }
  return out;
}

function neuralTargets(N) {
  // Outer fibonacci shell + inner core cluster: a neural "brain"
  const out = new Float32Array(N * 3);
  const GA = Math.PI * (3 - Math.sqrt(5));
  const shell = Math.floor(N * 0.86);
  for (let i = 0; i < shell; i++) {
    const y = 1 - (i / (shell - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = GA * i;
    const R = 1.5 + (Math.random() - 0.5) * 0.14;
    out[i * 3] = Math.cos(th) * r * R;
    out[i * 3 + 1] = y * R;
    out[i * 3 + 2] = Math.sin(th) * r * R;
  }
  for (let i = shell; i < N; i++) {
    const v = new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize();
    const R = Math.random() * 0.75;
    out[i * 3] = v.x * R;
    out[i * 3 + 1] = v.y * R;
    out[i * 3 + 2] = v.z * R;
  }
  return out;
}

function glyphTargets(N) {
  // Sample the letters "AI" from an offscreen canvas
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d");
  g.fillStyle = "#fff";
  g.font = "900 230px 'Space Grotesk', Arial, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("AI", 256, 138);
  const img = g.getImageData(0, 0, 512, 256).data;
  const candidates = [];
  for (let y = 0; y < 256; y += 2) {
    for (let x = 0; x < 512; x += 2) {
      if (img[(y * 512 + x) * 4 + 3] > 128) candidates.push([x, y]);
    }
  }
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const [x, y] = candidates[(Math.random() * candidates.length) | 0] ?? [256, 128];
    out[i * 3] = ((x - 256) / 256) * 2.4 + (Math.random() - 0.5) * 0.03;
    out[i * 3 + 1] = (-(y - 138) / 256) * 2.4 + (Math.random() - 0.5) * 0.03;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
  }
  return out;
}

function knotTargets(N) {
  const geo = new TorusKnotGeometry(1.05, 0.3, 200, 24);
  const pos = geo.attributes.position;
  const out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const v = (Math.random() * pos.count) | 0;
    out[i * 3] = pos.getX(v);
    out[i * 3 + 1] = pos.getY(v);
    out[i * 3 + 2] = pos.getZ(v);
  }
  geo.dispose();
  return out;
}

function makeSprite() {
  // Soft round glow sprite for particles
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,.55)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

export default function CompanionCrystal() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 720;
    const N = isSmall ? 2400 : 4600;

    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 30);
    camera.position.set(0, 0, 6);

    const pmrem = new PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;

    const group = new Group();
    scene.add(group);

    // --- Solid crystal ---
    const geo = new IcosahedronGeometry(1.15, 1);
    const gpos = geo.attributes.position;
    for (let i = 0; i < gpos.count; i++) {
      const x = gpos.getX(i);
      const y = gpos.getY(i);
      const z = gpos.getZ(i);
      const n = bump(x, y, z);
      gpos.setXYZ(i, x * n, y * n, z * n);
    }
    geo.computeVertexNormals();

    const mat = new MeshStandardMaterial({
      color: new Color("#0e1626"),
      metalness: 0.55,
      roughness: 0.16,
      flatShading: true,
      emissive: new Color("#0891b2"),
      emissiveIntensity: 0.06,
      envMapIntensity: 1.15,
      transparent: true,
    });
    const crystal = new Mesh(geo, mat);
    group.add(crystal);

    const edgeMat = new LineBasicMaterial({
      color: new Color("#22d3ee"),
      transparent: true,
      opacity: 0.28,
    });
    const edges = new LineSegments(new EdgesGeometry(geo, 12), edgeMat);
    crystal.add(edges);

    // --- Morphing particles ---
    const targets = [crystalTargets(geo, N), neuralTargets(N), glyphTargets(N), knotTargets(N)];
    const positions = new Float32Array(targets[0]);
    const stagger = new Float32Array(N);
    const swirlDir = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      stagger[i] = Math.random();
      const v = new Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
      swirlDir[i * 3] = v.x;
      swirlDir[i * 3 + 1] = v.y;
      swirlDir[i * 3 + 2] = v.z;
    }
    const pgeo = new BufferGeometry();
    pgeo.setAttribute("position", new BufferAttribute(positions, 3));
    const sprite = makeSprite();
    const pmat = new PointsMaterial({
      size: 0.045,
      map: sprite,
      color: new Color("#67e8f9"),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new Points(pgeo, pmat);
    particles.visible = false;
    group.add(particles);

    // Lights
    const key = new DirectionalLight(new Color("#7dd3fc"), 2.4);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new PointLight(new Color("#3b82f6"), 14, 20);
    rim.position.set(4, -2, -3);
    scene.add(rim);
    scene.add(new AmbientLight(new Color("#0b1526"), 2.2));

    // --- Motion state ---
    let raf = 0;
    let running = false;
    let t = 0;
    const cur = { x: 0, y: 0, s: 0.9 };
    let spin = 0;
    let baseRotY = 0;
    let lastScroll = window.scrollY;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const invQuat = new Quaternion();
    const cursorLocal = new Vector3();

    const onMouse = (event) => {
      mouse.tx = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (event.clientY / window.innerHeight) * 2 - 1;
    };
    if (!isSmall && !reduce) window.addEventListener("mousemove", onMouse, { passive: true });

    function layout() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    function morphState(p) {
      // Returns { from, to, t } for the particle blend at scroll p
      for (const [a, b, from, to] of SEGMENTS) {
        if (p < a) return null;
        if (p <= b) return { from, to, t: from === to ? 0 : smoothstep(a, b, p) };
      }
      return null;
    }

    function updateParticles(p, glyphW) {
      const st = morphState(p);
      const dissolve = smoothstep(0.14, 0.22, p) * (1 - smoothstep(0.88, 0.97, p));
      pmat.opacity = dissolve * 0.85;
      particles.visible = dissolve > 0.01;
      mat.opacity = 1 - dissolve;
      edgeMat.opacity = (1 - dissolve) * 0.28;
      crystal.visible = mat.opacity > 0.02;
      if (!particles.visible || !st) return;

      const A = targets[st.from];
      const B = targets[st.to];
      const arr = pgeo.attributes.position.array;

      // Cursor in group-local space (for repulsion)
      invQuat.copy(group.quaternion).invert();
      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const halfW = halfH * camera.aspect;
      cursorLocal
        .set(mouse.x * halfW - group.position.x, -mouse.y * halfH - group.position.y, 0)
        .applyQuaternion(invQuat)
        .divideScalar(Math.max(0.001, group.scale.x));

      const K = 0.45; // stagger spread
      for (let i = 0; i < N; i++) {
        let tt = st.t;
        if (st.from !== st.to) {
          tt = Math.min(1, Math.max(0, (st.t * (1 + K) - stagger[i] * K) / 1));
          tt = tt * tt * (3 - 2 * tt);
        }
        const trans = Math.sin(tt * Math.PI); // peak mid-flight
        const j = i * 3;
        let x = A[j] + (B[j] - A[j]) * tt + swirlDir[j] * trans * 0.5;
        let y = A[j + 1] + (B[j + 1] - A[j + 1]) * tt + swirlDir[j + 1] * trans * 0.5;
        let z = A[j + 2] + (B[j + 2] - A[j + 2]) * tt + swirlDir[j + 2] * trans * 0.5;

        // Gentle idle shimmer + cursor repulsion
        y += Math.sin(t * 1.3 + i) * 0.012;
        if (!isSmall) {
          const dx = x - cursorLocal.x;
          const dy = y - cursorLocal.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 0.5 && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const push = ((0.7 - d) / 0.7) * 0.32 * (0.4 + glyphW * 0.6);
            x += (dx / d) * push;
            y += (dy / d) * push;
          }
        }
        arr[j] = x;
        arr[j + 1] = y;
        arr[j + 2] = z;
      }
      pgeo.attributes.position.needsUpdate = true;

      // Particle color: cyan → bright ice on glyph → teal on knot
      const knotW = smoothstep(0.64, 0.8, p) * (1 - smoothstep(0.8, 0.96, p));
      pmat.color.setRGB(
        0.4 + glyphW * 0.5 - knotW * 0.15,
        0.91,
        0.98 - knotW * 0.25
      );
    }

    function frame() {
      t += 0.016;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const scroll = window.scrollY;
      const p = Math.min(1, Math.max(0, scroll / max));

      const vel = scroll - lastScroll;
      lastScroll = scroll;
      spin += vel * 0.00035;
      spin = Math.max(-0.22, Math.min(0.22, spin));
      spin *= 0.93;
      baseRotY += 0.0035 + spin;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const wp = samplePath(p);
      cur.x += (wp.x - cur.x) * 0.055;
      cur.y += (wp.y - cur.y) * 0.055;
      cur.s += (wp.s - cur.s) * 0.05;

      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const halfW = halfH * camera.aspect;
      const mobileScale = isSmall ? 0.62 : 1;
      group.position.x = cur.x * halfW * (isSmall ? 0.55 : 0.72) + mouse.x * 0.14;
      group.position.y = cur.y * halfH + Math.sin(t * 0.7) * 0.09 - mouse.y * 0.1;

      const swell = 1 + Math.min(Math.abs(spin) * 1.6, 0.12);
      const s = cur.s * mobileScale * swell * (1 + Math.sin(t * 0.5) * 0.015);
      group.scale.set(s, s, s);

      // While the "AI" glyph is formed, damp rotation so it reads
      const glyphW =
        smoothstep(0.46, 0.56, p) * (1 - smoothstep(0.64, 0.74, p));
      const rw = 1 - glyphW;
      group.rotation.y = (baseRotY + p * Math.PI * 3) * rw + mouse.x * 0.3 * glyphW;
      group.rotation.x =
        (0.35 + Math.sin(t * 0.23) * 0.08 + p * Math.PI * 1.6 + spin * 1.4) * rw +
        mouse.y * 0.25 * glyphW;
      group.rotation.z = (Math.sin(t * 0.11) * 0.06 + spin * 0.8) * rw;

      edgeMat.opacity = Math.min(edgeMat.opacity, 0.24 + Math.min(Math.abs(spin) * 2.2, 0.3));

      updateParticles(p, glyphW);
      renderer.render(scene, camera);
    }

    function loop() {
      frame();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onResize = () => {
      layout();
      if (reduce) frame();
    };

    layout();
    if (reduce) {
      frame();
    } else {
      start();
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      pmrem.dispose();
      geo.dispose();
      mat.dispose();
      edges.geometry.dispose();
      edgeMat.dispose();
      pgeo.dispose();
      pmat.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} className="companion-crystal" aria-hidden="true" />;
}
