import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../theme";
import { CAMERA_DISTANCE, FOV, STATION_STEP, fitScale, subFloat, subIndex, world } from "../worldState";
import { COUNT, CREDS, FLOW, HELIX, HELIX_FLOW, PROJECT_COUNT, ROLES, SERVICE_COUNT, STACK_LAYERS, getShape, prewarmShapes } from "./shapes";
import { CredCaption, LogoOrbit, ProjectCaption, StackLabels } from "./accents";

const { damp, clamp, lerp } = THREE.MathUtils;
const halfHeight = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_DISTANCE;
const STAGGER = 0.35;
const RETARGET_SECONDS = 1.0;
const TAU = Math.PI * 2;

// Stations where the swarm stays out of sight: the hero shows the glass core
// it is born from; the deck and contact have no empty column to live in.
const HIDDEN = { top: true, deck: true, contact: true };

/**
 * Chapter colours: the swarm keeps the brand mint as its thread but takes on
 * one soft hue pair per section ([a, b, active]), blended as it re-forms
 * between stations. Pale 200-300 tones on ink, deep 600-700 tones on paper,
 * all of similar lightness, so it reads as one family, never a rainbow.
 */
const BRAND = { dark: ["#5eead4", "#a78bfa", "#b8fff2"], light: ["#0f766e", "#6d28d9", "#134e4a"] };
const CHAPTERS = {
  dark: {
    experience: ["#fcd34d", "#5eead4", "#fde68a"], // amber (now) down to mint (the start), like the timeline's Now tag
    credentials: ["#fbbf24", "#f59e0b", "#fde68a"], // gold, the certificates' seals
    skills: ["#7dd3fc", "#a5b4fc", "#e0f2fe"], // sky blue
    services: ["#ff9a7a", "#fdba74", "#ffe4d6"], // coral, from the brand gradient
    work: ["#c4b5fd", "#f0abfc", "#fae8ff"], // lavender into soft pink
  },
  light: {
    experience: ["#b45309", "#0f766e", "#78350f"],
    credentials: ["#a16207", "#ca8a04", "#713f12"],
    skills: ["#0369a1", "#4f46e5", "#0c4a6e"],
    services: ["#c2410c", "#ea580c", "#7c2d12"],
    work: ["#6d28d9", "#c026d3", "#4c1d95"],
  },
};

const PALETTES = {
  dark: { a: "#5eead4", b: "#a78bfa", hot: "#ff9a6b", active: "#b8fff2", layers: ["#5eead4", "#a78bfa", "#ff7a59", "#fbbf24"], blending: THREE.AdditiveBlending, alpha: 1 },
  light: { a: "#0f766e", b: "#6d28d9", hot: "#c2410c", active: "#134e4a", layers: ["#0f766e", "#6d28d9", "#c2410c", "#ca8a04"], blending: THREE.NormalBlending, alpha: 1.25 },
};

/**
 * Rows the swarm answers to on hover: pointing at a service, job,
 * certificate or project makes the 3D show it at once, before scrolling.
 */
const HOVER_ROWS = [
  ["services", ".sv-item"],
  ["experience", ".xp-item"],
  ["credentials", ".cr-edu, .cr-certs > li"],
  ["work", ".wk-index li"],
];

/** The hovered row's index if it belongs to this station, else -1. */
function hoverFor(id) {
  return world.hover && world.hover.id === id ? world.hover.index : -1;
}

/** Which formation a station shows, given the reading progress inside it. */
function keyFor(id, local = 0) {
  const h = hoverFor(id);
  switch (id) {
    case "about":
      return "stack";
    case "experience":
      return "helix";
    case "credentials":
      return "creds";
    case "skills":
      return "globe";
    case "services":
      return `svc${clamp(h >= 0 ? h : subIndex("services", Math.floor(local * SERVICE_COUNT)), 0, SERVICE_COUNT - 1)}`;
    case "work":
      return `prj${clamp(h >= 0 ? h : Math.round(local * (PROJECT_COUNT - 1)), 0, PROJECT_COUNT - 1)}`;
    case "deck":
    case "contact":
      return "mark";
    default:
      return "core";
  }
}

/** The group a station highlights (stack layer / job), or -10 for none. */
function activeFor(id, local = 0) {
  if (id === "about") return clamp(Math.floor(local * STACK_LAYERS), 0, STACK_LAYERS - 1);
  if (id === "experience") {
    const h = hoverFor(id);
    return clamp(h >= 0 ? h : subIndex("experience", Math.floor(local * ROLES)), 0, ROLES - 1);
  }
  if (id === "credentials") return clamp(Math.round(credPos(local)), 0, CREDS.count - 1);
  return -10;
}

/** Where the credentials carousel stands: 0 = education card, 5 = last certificate (fractional between rows). */
function credPos(local) {
  const h = hoverFor("credentials");
  if (h >= 0) return clamp(h, 0, CREDS.count - 1);
  // rest on the row being read, then turn briskly as the next row arrives,
  // so one card is clearly in front (and named by the caption) most of the time
  const p = clamp(subFloat("credentials", local * (CREDS.count - 1)), 0, CREDS.count - 1);
  const i = Math.floor(p);
  const s = clamp((p - i - 0.68) / 0.3, 0, 1);
  return i + s * s * (3 - 2 * s);
}

/** Resting rotation per station (x, y), before pointer sway. */
function poseFor(id, local, time, out) {
  out[0] = 0;
  out[1] = 0;
  if (id === "experience") {
    // turn the active job's cluster to face the camera
    const k = activeFor(id, local);
    out[1] = (k / Math.max(1, ROLES - 1)) * Math.PI * 2 * HELIX.turns - Math.PI / 2;
    out[0] = 0.12;
  } else if (id === "credentials") {
    // the carousel turns with the scroll: the card being read comes to the front
    out[1] = -credPos(local) * ((Math.PI * 2) / CREDS.count);
    out[0] = 0.16;
  } else if (id === "skills") {
    out[0] = 0.18; // the globe's spin lives on its own group (see GLOBE_SPIN)
  } else if (id === "services" || id === "work") {
    out[1] = Math.sin(time * 0.5) * 0.14;
  }
  return out;
}

const VERT = /* glsl */ `
  attribute vec4 aFrom;
  attribute vec4 aTo;
  attribute vec4 aRand; // x stagger, y size, z phase, w hue
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uDpr;
  uniform float uAlpha;
  uniform float uActive;
  uniform vec3 uPointer;
  uniform float uPointerForce;
  uniform vec2 uFlow;
  uniform vec3 uColorA;
  uniform float uGradY;
  uniform vec3 uColorB;
  uniform vec3 uColorHot;
  uniform vec3 uColorActive;
  uniform vec3 uLayer0;
  uniform vec3 uLayer1;
  uniform vec3 uLayer2;
  uniform vec3 uLayer3;
  uniform float uLayerMix;
  uniform float uDepthFade;
  uniform float uCenterZ;
  uniform float uDepthRange;
  uniform float uIdle;    // 0..1: settled and the visitor has stopped scrolling
  uniform float uArriveT; // time the current shape finished forming
  uniform float uBurstT;  // time of the last click shockwave
  varying vec3 vColor;
  varying float vAlpha;

  vec3 helixAt(float u) {
    float a = u * 6.28318 * ${HELIX.turns.toFixed(3)};
    return vec3(cos(a) * ${HELIX.radius.toFixed(3)}, ${(HELIX.height / 2).toFixed(3)} - u * ${HELIX.height.toFixed(3)}, sin(a) * ${HELIX.radius.toFixed(3)});
  }

  vec3 flowed(vec4 p, float seed) {
    vec3 q = p.xyz;
    if (p.w > ${(HELIX_FLOW - 0.5).toFixed(1)}) {
      // data streaming along the career helix, from the first job up to now
      float u = fract(p.w - ${HELIX_FLOW.toFixed(1)} - uTime * 0.05);
      q = helixAt(u) + (vec3(fract(seed * 13.17), fract(seed * 7.71), fract(seed * 3.33)) - 0.5) * 0.08;
    } else if (p.w > ${(FLOW - 0.5).toFixed(1)}) {
      float span = uFlow.y - uFlow.x;
      q.y = uFlow.x + mod(q.y - uFlow.x + uTime * 0.28, span);
    }
    return q;
  }

  void main() {
    float t = clamp((uProgress - aRand.x * ${STAGGER.toFixed(2)}) / ${(1 - STAGGER).toFixed(2)}, 0.0, 1.0);
    float e = t * t * (3.0 - 2.0 * t);
    vec3 pos = mix(flowed(aFrom, aRand.z), flowed(aTo, aRand.z), e);

    // swirl peaks mid-flight; a faint breath keeps settled shapes alive
    float flight = sin(3.14159 * t);
    float ph = aRand.z * 6.2831;
    vec3 swirl = vec3(
      sin(pos.y * 2.1 + uTime * 1.3 + ph),
      cos(pos.x * 1.9 - uTime * 1.1 + ph),
      sin((pos.x + pos.y) * 1.7 + uTime * 0.9)
    );
    pos += swirl * 0.55 * flight;
    pos += normalize(pos + 0.0001) * sin(uTime * 1.2 + ph) * 0.012;

    vec3 d = pos - uPointer;
    float falloff = exp(-dot(d.xy, d.xy) * 5.0) * uPointerForce;
    pos.xy += normalize(d.xy + 0.0001) * falloff * 0.18;

    // click shockwave: points fly outward, then settle back
    float bt = uTime - uBurstT;
    float burst = (bt > 0.0 && bt < 1.6) ? sin(3.14159 * bt / 1.6) * exp(-bt * 1.4) : 0.0;
    pos += normalize(pos + 0.0001) * burst * (0.45 + aRand.x * 1.2);

    float group = e < 0.5 ? aFrom.w : aTo.w;
    float on = 1.0 - step(0.5, abs(group - uActive));

    // a ring of light sweeps out as a shape finishes forming; at rest a slow
    // band of light travels through it so it never looks frozen
    float rr = length(pos);
    float at = uTime - uArriveT;
    float ring = (at > 0.0 && at < 1.4) ? exp(-pow((rr - at * 2.2) * 5.0, 2.0)) * (1.0 - at / 1.4) : 0.0;
    float wave = uIdle * pow(max(0.0, sin(pos.y * 2.6 + pos.x * 1.1 - uTime * 2.0)), 14.0);
    float glow = clamp(ring + wave * 0.85 + burst * 0.7, 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aRand.y * uDpr * (1.0 + flight * 0.8 + on * 0.22 + glow * 0.55) * (8.0 / -mv.z);

    float gy = clamp(0.5 - pos.y / ${HELIX.height.toFixed(2)}, 0.0, 1.0);
    vec3 base = mix(uColorA, uColorB, mix(aRand.w, gy, uGradY));
    // the About stack: each layer in its own colour, matching its label
    if (uLayerMix > 0.001 && group > -0.5 && group < 3.5) {
      vec3 lc = group < 0.5 ? uLayer0 : group < 1.5 ? uLayer1 : group < 2.5 ? uLayer2 : uLayer3;
      base = mix(base, lc, uLayerMix * 0.92);
    }
    base = mix(base, uColorActive, on * mix(0.55, 0.22, uLayerMix));
    vColor = mix(base, uColorHot, clamp(flight * 0.75 + falloff * 0.35, 0.0, 1.0));
    vColor = mix(vColor, uColorActive, glow * 0.65);
    vAlpha = uAlpha * (0.4 + 0.3 * flight + 0.2 * aRand.y + on * 0.16 + glow * 0.4);
    float front = clamp((mv.z - uCenterZ) / uDepthRange * 0.5 + 0.5, 0.0, 1.0);
    vAlpha *= mix(1.0, 0.12 + 0.88 * front * front, uDepthFade);
    if (group > ${(FLOW - 0.5).toFixed(1)} && group < ${(FLOW + 0.5).toFixed(1)}) {
      float f = (pos.y - uFlow.x) / (uFlow.y - uFlow.x);
      vAlpha *= smoothstep(0.0, 0.18, f) * smoothstep(1.0, 0.8, f);
    }
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
    #include <colorspace_fragment>
  }
`;

function makeSwarm() {
  const geometry = new THREE.BufferGeometry();
  const core = getShape("core");
  const rand = new Float32Array(COUNT * 4);
  let seed = 1234567;
  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < COUNT; i += 1) rand.set([next(), 0.6 + next() * 0.8, next(), next()], i * 4);
  // position is unused by the shader but three needs it for bounds/draw count
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
  geometry.setAttribute("aFrom", new THREE.BufferAttribute(core.slice(), 4).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("aTo", new THREE.BufferAttribute(core.slice(), 4).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 4));
  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uProgress: { value: 1 },
      uTime: { value: 0 },
      uSize: { value: 2.7 },
      uDpr: { value: 1 },
      uAlpha: { value: 0 },
      uActive: { value: -10 },
      uPointer: { value: new THREE.Vector3(99, 99, 0) },
      uPointerForce: { value: 0 },
      uFlow: { value: new THREE.Vector2(-1.55, 1.55) },
      uColorA: { value: new THREE.Color() },
      uGradY: { value: 0 },
      uColorB: { value: new THREE.Color() },
      uColorHot: { value: new THREE.Color() },
      uColorActive: { value: new THREE.Color() },
      uLayer0: { value: new THREE.Color() },
      uLayer1: { value: new THREE.Color() },
      uLayer2: { value: new THREE.Color() },
      uLayer3: { value: new THREE.Color() },
      uLayerMix: { value: 0 },
      uDepthFade: { value: 0 },
      uCenterZ: { value: -8 },
      uDepthRange: { value: 1.5 },
      uIdle: { value: 0 },
      uArriveT: { value: -10 },
      uBurstT: { value: -10 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  return points;
}

/**
 * The swarm: one GPU point cloud that is the site's protagonist. Born from
 * the hero's glass core, it re-forms into each section's subject as the page
 * scrolls — the stack (About), the timeline helix (Experience), a medal
 * (Credentials), a globe (Skills), one icon per service and per project —
 * scrubbed by scroll between sections (so it reverses when scrolling back)
 * and timed within a section when the active service/project changes.
 */
export default function Swarm({ quality }) {
  const themeName = useTheme() === "light" ? "light" : "dark";
  const group = useRef(null);
  const spin = useRef(null);
  const points = useMemo(makeSwarm, []);
  // two snapshot buffers, so a re-form can start from the previous snapshot
  const scratch = useMemo(() => [new Float32Array(COUNT * 4), new Float32Array(COUNT * 4)], []);
  const state = useRef({ mode: "hold", from: "core", to: "core", fromData: null, p: 1, flip: 0 });
  // read by the accents: which formation has settled, and how visible it is
  const shared = useRef({ settled: null, alpha: 0, active: -10 });
  const pose = useMemo(() => ({ a: [0, 0], b: [0, 0] }), []);
  // per-station colours, resolved once per theme; blended per frame
  const chapter = useMemo(() => {
    const make = (list) => list.map((c) => new THREE.Color(c));
    const brand = { dark: make(BRAND.dark), light: make(BRAND.light) };
    const pick = (theme, id) => (CHAPTERS[theme][id] ? make(CHAPTERS[theme][id]) : brand[theme]);
    const ids = ['top', 'about', 'experience', 'credentials', 'skills', 'services', 'work', 'deck', 'contact'];
    return { dark: Object.fromEntries(ids.map((id) => [id, pick('dark', id)])), light: Object.fromEntries(ids.map((id) => [id, pick('light', id)])), brand };
  }, []);
  const ray = useMemo(() => ({ v: new THREE.Vector3(), dir: new THREE.Vector3(), hit: new THREE.Vector3(), c: new THREE.Vector3(), e: new THREE.Vector3() }), []);

  useEffect(() => prewarmShapes(), []);

  // Hover: pointing at a row makes the swarm answer at once (keyFor/hoverFor).
  // Click: a click on the shape itself (not on a link or button) fires a
  // shockwave through it.
  const burstPending = useRef(false);
  useEffect(() => {
    const onOver = (event) => {
      // rows sliding under a still pointer mid-scroll aren't a choice: ignore them
      if (document.documentElement.classList.contains("lenis-scrolling")) return;
      for (const [id, selector] of HOVER_ROWS) {
        const item = event.target.closest?.(selector);
        if (item) {
          world.hover = { id, index: [...document.querySelectorAll(selector)].indexOf(item) };
          return;
        }
      }
    };
    const onOut = (event) => {
      if (!world.hover) return;
      const selector = HOVER_ROWS.find(([id]) => id === world.hover.id)?.[1];
      if (!selector || !event.relatedTarget?.closest?.(selector)) world.hover = null;
    };
    const onDown = (event) => {
      const area = world.swarmScreen;
      if (!area?.on || event.target.closest?.("a, button, input, textarea, select, summary, label, [role=button]")) return;
      if (Math.hypot(event.clientX - area.x, event.clientY - area.y) <= area.r) burstPending.current = true;
    };
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerdown", onDown);
      world.hover = null;
    };
  }, []);

  useEffect(() => {
    const palette = PALETTES[themeName];
    const u = points.material.uniforms;
    u.uColorHot.value.set(palette.hot);
    palette.layers.forEach((c, i) => u['uLayer' + i].value.set(c));
    points.material.blending = palette.blending;
    points.material.needsUpdate = true;
  }, [points, themeName]);

  useEffect(() => {
    // weaker devices draw the first half of the (randomly ordered) points, a bit larger
    points.geometry.setDrawRange(0, quality === "low" ? COUNT / 2 : COUNT);
    points.material.uniforms.uSize.value = quality === "low" ? 3.2 : 2.7;
  }, [points, quality]);

  useEffect(
    () => () => {
      points.geometry.dispose();
      points.material.dispose();
    },
    [points],
  );

  const upload = (name, data) => {
    const attr = points.geometry.attributes[name];
    attr.array.set(data);
    attr.needsUpdate = true;
  };

  useFrame((frame, delta) => {
    const dt = Math.min(delta, 0.05);
    const g = group.current;
    const stations = world.stations;
    if (!g || !stations.length) return;
    const time = frame.clock.elapsedTime;
    const u = points.material.uniforms;
    const st = state.current;
    const cur = stations[world.current];
    const nxt = stations[world.next];
    const t = world.t;
    const moving = world.next !== world.current && t > 0;
    const localCur = world.local[cur.id] ?? 0;
    if (world.hover && (moving || world.hover.id !== cur.id)) world.hover = null;
    const before = st.p;

    // ---- formation (scroll-scrubbed between stations, timed within one)
    if (moving) {
      const a = keyFor(cur.id, localCur);
      const b = keyFor(nxt.id, world.local[nxt.id] ?? 0);
      if (st.mode !== "scrub" || st.from !== a || st.to !== b) {
        upload("aFrom", getShape(a));
        upload("aTo", getShape(b));
        Object.assign(st, { mode: "scrub", from: a, to: b, fromData: getShape(a) });
      }
      st.p = t;
    } else {
      const k = keyFor(cur.id, localCur);
      if (st.mode === "scrub") {
        // arrived (or turned back): rest on whichever end we're nearest
        const shown = st.p > 0.5 ? st.to : st.from;
        const data = getShape(shown);
        upload("aFrom", data);
        upload("aTo", data);
        Object.assign(st, { mode: "hold", from: shown, to: shown, fromData: data, p: 1 });
        u.uArriveT.value = time; // the shape just finished forming: ring of light
      }
      if (st.to !== k) {
        // re-form mid-section: snapshot where points are now, fly to the new shape
        const from = st.fromData ?? getShape(st.from);
        const to = getShape(st.to);
        const e = st.p * st.p * (3 - 2 * st.p);
        st.flip = 1 - st.flip;
        const snap = scratch[st.flip];
        for (let i = 0; i < COUNT * 4; i += 4) {
          snap[i] = from[i] + (to[i] - from[i]) * e;
          snap[i + 1] = from[i + 1] + (to[i + 1] - from[i + 1]) * e;
          snap[i + 2] = from[i + 2] + (to[i + 2] - from[i + 2]) * e;
          snap[i + 3] = e < 0.5 ? from[i + 3] : to[i + 3];
        }
        upload("aFrom", snap);
        upload("aTo", getShape(k));
        Object.assign(st, { from: st.to, fromData: snap, to: k, p: 0 });
      }
      // real elapsed time (not the per-frame clamp) so slow devices don't lag behind
      st.p = Math.min(1, st.p + Math.min(delta, 0.25) / RETARGET_SECONDS);
      if (before < 1 && st.p >= 1) u.uArriveT.value = time;
    }
    // idle wave once settled and the visitor has stopped scrolling
    u.uIdle.value = damp(u.uIdle.value, !moving && st.p >= 1 && Math.abs(world.scrollVelocity) < 40 ? 1 : 0, 1.6, dt);
    if (burstPending.current) {
      u.uBurstT.value = time;
      burstPending.current = false;
    }
    u.uProgress.value = st.p;
    u.uTime.value = time;
    u.uDpr.value = frame.viewport.dpr;

    // ---- visibility: hidden stations fade the swarm; crossings dim it
    const visA = HIDDEN[cur.id] ? 0 : 1;
    const visB = HIDDEN[nxt.id] ? 0 : 1;
    const crossing = 1 - 0.75 * Math.sin(Math.PI * t) * Math.min(visA, visB);
    const alpha = lerp(visA, visB, t) * crossing * PALETTES[themeName].alpha;
    u.uAlpha.value = alpha;
    points.visible = alpha > 0.003;
    u.uActive.value = moving ? -10 : activeFor(cur.id, localCur);
    u.uLayerMix.value = (cur.id === "about" ? 1 - t : 0) + (moving && nxt.id === "about" ? t : 0);
    // chapter colour: blend the two stations' hues by the transition
    const ca = chapter[themeName][cur.id] ?? chapter.brand[themeName];
    const cb = chapter[themeName][nxt.id] ?? chapter.brand[themeName];
    u.uColorA.value.lerpColors(ca[0], cb[0], t);
    u.uColorB.value.lerpColors(ca[1], cb[1], t);
    u.uColorActive.value.lerpColors(ca[2], cb[2], t);
    u.uGradY.value = (cur.id === "experience" ? 1 - t : 0) + (moving && nxt.id === "experience" ? t : 0);
    u.uDepthFade.value = (cur.id === "credentials" ? 1 - t : 0) + (moving && nxt.id === "credentials" ? t : 0);

    // ---- placement: ride the camera path, slide between stage columns
    const aspect = frame.size.width / frame.size.height;
    g.scale.setScalar(fitScale(aspect));
    // view-space depth of the swarm's centre, for the carousel's depth fade
    g.updateMatrixWorld();
    ray.v.setFromMatrixPosition(g.matrixWorld).applyMatrix4(frame.camera.matrixWorldInverse);
    u.uCenterZ.value = ray.v.z;
    u.uDepthRange.value = CREDS.radius * g.scale.x;
    const x = (id) => (world.ndcX[id] ?? 0) * halfHeight * aspect;
    g.position.set(lerp(x(cur.id), x(nxt.id), t), -(world.current + (world.next - world.current) * t) * STATION_STEP, 0);
    poseFor(cur.id, localCur, time, pose.a);
    poseFor(nxt.id, world.local[nxt.id] ?? 0, time, pose.b);
    g.rotation.x = damp(g.rotation.x, lerp(pose.a[0], pose.b[0], t) - world.pointer.y * 0.12, 4, dt);
    g.rotation.y = damp(g.rotation.y, lerp(pose.a[1], pose.b[1], t) + world.pointer.x * 0.28, 4, dt);
    // GLOBE_SPIN: the Skills globe turns continuously (and with the scroll);
    // weighted by how present Skills is, so other shapes stay upright
    if (spin.current) {
      const w = (cur.id === "skills" ? 1 - t : 0) + (moving && nxt.id === "skills" ? t : 0);
      spin.current.rotation.y = ((time * 0.22 + window.scrollY * 0.0015) % TAU) * w;
    }

    // ---- pointer in the swarm's own space (points part around the cursor)
    ray.v.set(world.pointer.x, world.pointer.y, 0.5).unproject(frame.camera);
    ray.dir.copy(ray.v).sub(frame.camera.position).normalize();
    const dist = (g.position.z - frame.camera.position.z) / ray.dir.z;
    ray.hit.copy(frame.camera.position).addScaledVector(ray.dir, dist);
    g.worldToLocal(u.uPointer.value.copy(ray.hit));
    u.uPointerForce.value = damp(u.uPointerForce.value, moving ? 0 : 1, 4, dt);

    // where the shape sits on screen, so a click on it can fire the shockwave
    g.updateMatrixWorld();
    ray.c.setFromMatrixPosition(g.matrixWorld).project(frame.camera);
    ray.e.set(1.7, 0, 0).applyMatrix4(g.matrixWorld).project(frame.camera);
    const W = frame.size.width, H = frame.size.height;
    const cxp = (ray.c.x * 0.5 + 0.5) * W, cyp = (0.5 - ray.c.y * 0.5) * H;
    world.swarmScreen = {
      x: cxp,
      y: cyp,
      r: Math.max(120, Math.hypot((ray.e.x * 0.5 + 0.5) * W - cxp, (0.5 - ray.e.y * 0.5) * H - cyp)),
      on: !moving && alpha > 0.5,
    };

    const sh = shared.current;
    sh.settled = !moving && st.p >= 1 ? st.to : null;
    sh.target = st.to;
    sh.alpha = alpha;
    sh.active = u.uActive.value;
  });

  return (
    <group ref={group} userData={{ station: true }}>
      <group ref={spin}>
        <primitive object={points} />
        <StackLabels shared={shared} theme={themeName} />
        <LogoOrbit shared={shared} />
        <ProjectCaption shared={shared} theme={themeName} />
        <CredCaption shared={shared} theme={themeName} />
      </group>
    </group>
  );
}
