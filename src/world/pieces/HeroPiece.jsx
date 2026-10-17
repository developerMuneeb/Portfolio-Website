import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Core from "../../components/hero3d/Core";
import OrbitSystem from "../../components/hero3d/OrbitSystem";
import TextRing from "../../components/hero3d/TextRing";
import { world } from "../worldState";

const { damp, clamp } = THREE.MathUtils;

const SERVICE_WORDS = ["AI AGENTS", "VOICE AI", "RAG SYSTEMS", "AUTOMATION", "CRM WORKFLOWS", "PREDICTIVE ANALYTICS"];
const IDENTITY_WORDS = ["MUHAMMAD MUNEEB", "AI ENGINEER", "KARACHI · PK", "OPEN TO SELECT COLLABORATIONS"];

// Gradients start and end on the same colour so the band's seam is invisible
const SERVICE_PALETTE = {
  dark: { fill: ["#5eead4", "#a78bfa", "#ff7a59", "#a78bfa", "#5eead4"] },
  light: { fill: ["#0f766e", "#6d28d9", "#c2410c", "#6d28d9", "#0f766e"] },
};
const IDENTITY_PALETTE = {
  dark: { color: "rgba(238, 237, 247, 0.62)" },
  light: { color: "rgba(20, 19, 31, 0.55)" },
};

const smooth = (x) => x * x * (3 - 2 * x);
/** 0 at the top of the page -> 1 once the hero has mostly scrolled away. */
const exitProgress = (state) => smooth(clamp(window.scrollY / (state.size.height * 0.55), 0, 1));

// Bands are scrubbed by scroll position (not just velocity), so they turn
// exactly with the page and reverse when the visitor scrolls back up.
function serviceRing(group, state) {
  const e = exitProgress(state);
  group.rotation.order = "ZXY";
  group.rotation.y = state.clock.elapsedTime * 0.12 + window.scrollY * 0.0032;
  group.rotation.x = 0.3 + e * 0.75;
  group.rotation.z = -0.16 + e * 0.1;
  group.scale.setScalar(1 + e * 0.16);
}

function identityRing(group, state) {
  const e = exitProgress(state);
  group.rotation.order = "ZXY";
  group.rotation.y = -state.clock.elapsedTime * 0.08 - window.scrollY * 0.0022;
  group.rotation.x = -0.42 - e * 0.6;
  group.rotation.z = 0.22 - e * 0.12;
  group.scale.setScalar(1 + e * 0.3);
}

/**
 * Station "top": the glass Agent Core with its orbiting systems and two
 * bands of text wrapped around it. Leans toward the pointer; on scroll the
 * core turns with the page, the bands spin and stand up like gyroscope
 * rings, and the whole piece draws back as the camera leaves.
 */
export default function HeroPiece({ quality }) {
  const lean = useRef(null);
  const scrub = useRef(null);
  const spin = useRef(null);
  const input = useRef({ x: 0, y: 0, inside: true, prox: 0, dragging: false, spinImpulse: 0, spinVel: 0 });
  // OrbitSystem reads a motion-value-like `progress` (orbit spread on exit)
  const progress = useMemo(() => ({ get: () => 1 - (world.presence.top ?? 0) }), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const inp = input.current;
    inp.x = world.pointer.x;
    inp.y = world.pointer.y;
    inp.inside = Math.abs(world.pointer.x) < 0.9;
    inp.active = (world.presence.top ?? 0) > 0.01; // glass skips its refraction pass off stage
    const e = exitProgress(state);

    if (lean.current) {
      lean.current.rotation.x = damp(lean.current.rotation.x, -world.pointer.y * 0.22, 3.5, dt);
      lean.current.rotation.y = damp(lean.current.rotation.y, world.pointer.x * 0.35, 3.5, dt);
      lean.current.scale.setScalar(0.76 * (1 - e * 0.12));
    }
    if (scrub.current) {
      // the core itself turns with the page: half a revolution over the exit
      scrub.current.rotation.y = e * Math.PI;
      scrub.current.rotation.x = e * 0.45;
    }
    if (spin.current) {
      inp.spinVel = clamp(inp.spinVel + world.scrollVelocity * 0.00002, -4, 4);
      inp.spinVel *= Math.exp(-1.6 * dt);
      spin.current.rotation.y += (0.16 + inp.spinVel) * dt;
    }
  });

  return (
    <group ref={lean} scale={0.76}>
      <group ref={scrub}>
        <group ref={spin}>
          <Core input={input} quality={quality} />
          <OrbitSystem progress={progress} />
        </group>
      </group>
      <TextRing
        radius={1.4}
        height={0.31}
        canvasHeight={144}
        words={SERVICE_WORDS}
        font="700 80px Syne, 'Space Grotesk', sans-serif"
        palette={SERVICE_PALETTE}
        backOpacity={0.2}
        motion={serviceRing}
      />
      <TextRing
        radius={1.66}
        height={0.16}
        canvasHeight={64}
        words={IDENTITY_WORDS}
        font="500 30px 'JetBrains Mono', monospace"
        palette={IDENTITY_PALETTE}
        frontOpacity={0.9}
        backOpacity={0.16}
        motion={identityRing}
      />
    </group>
  );
}
