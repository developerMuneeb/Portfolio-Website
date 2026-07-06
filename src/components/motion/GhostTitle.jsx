import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Kinetic ghost typography: a huge outlined section name behind the
 * header that slides horizontally as the section scrolls through the
 * viewport. Content-anchored, transform-only, purely decorative.
 */
export default function GhostTitle({ text, direction = 1 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [`${6 * direction}%`, `${-14 * direction}%`]);

  return (
    <div className="ghost-title" ref={ref} aria-hidden="true">
      <motion.span style={reduce ? undefined : { x }}>{text}</motion.span>
    </div>
  );
}
