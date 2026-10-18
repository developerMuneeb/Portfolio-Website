import { useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useScrollVelocity } from "../hooks/useScrollVelocity";

const ROW_A = [
  "Agentic AI",
  "Workflow Automation",
  "AI Chatbots",
  "LangGraph Agents",
  "Voice AI Agents",
  "CRM Automation",
];

const ROW_B = ["n8n", "OpenAI", "LangChain", "Synthflow", "Power BI", "Python", "Docker", "PostgreSQL"];

function MarqueeItem({ label, index, isClone = false }) {
  return (
    <span className="marquee-item" aria-hidden={isClone ? "true" : undefined}>
      <span className="mono">/ {String(index + 1).padStart(2, "0")}</span>
      <span className="marquee-label">{label}</span>
      <span className="dot"></span>
    </span>
  );
}

function GhostItem({ label, isClone = false }) {
  return (
    <span className="marquee-item ghost" aria-hidden={isClone ? "true" : undefined}>
      <span className="marquee-label">{label}</span>
      <span className="dot"></span>
    </span>
  );
}

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Velocity marquee (Mat Voyce-style kinetic type): drifts at a base speed,
 * accelerates with scroll speed, and flips direction with scroll direction.
 * Transform-only via a motion value — no React re-renders per frame. Pauses
 * on hover; reduced motion keeps the static CSS layout.
 */
function VelocityTrack({ baseSpeed, reverse = false, children }) {
  const reduce = useReducedMotion();
  const velocity = useScrollVelocity();
  const boost = useTransform(velocity, [-3000, 0, 3000], [6, 0, 6], { clamp: true });
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(reverse ? 1 : -1);
  const paused = useRef(false);
  const onScreen = useRef(true);
  const track = useRef(null);

  // the track only moves while it can be seen
  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current || !onScreen.current) return;
    const v = velocity.get();
    if (v < -5) direction.current = reverse ? -1 : 1;
    else if (v > 5) direction.current = reverse ? 1 : -1;
    const move = direction.current * baseSpeed * (delta / 1000) * (1 + boost.get());
    baseX.set(baseX.get() + move);
  });

  return (
    <motion.div
      ref={track}
      className={`marquee-track is-js${reverse ? " is-reverse" : ""}`}
      style={reduce ? undefined : { x }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {children}
    </motion.div>
  );
}

/** Dual-direction marquee: focus areas one way, tool names (outlined) the other. */
export default function MarqueeSection() {
  return (
    <div className="marquee" aria-label="Focus areas and tools">
      <VelocityTrack baseSpeed={1.25}>
        {ROW_A.map((label, index) => (
          <MarqueeItem key={label} label={label} index={index} />
        ))}
        {ROW_A.map((label, index) => (
          <MarqueeItem key={`${label}-clone`} label={label} index={index} isClone />
        ))}
      </VelocityTrack>
      <VelocityTrack baseSpeed={0.96} reverse>
        {ROW_B.map((label) => (
          <GhostItem key={label} label={label} />
        ))}
        {ROW_B.map((label) => (
          <GhostItem key={`${label}-clone`} label={label} isClone />
        ))}
      </VelocityTrack>
    </div>
  );
}
