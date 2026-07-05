import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import AuroraCanvas from "./AuroraCanvas";
import StarfieldCanvas from "./StarfieldCanvas";

/**
 * Background stack (bottom → top): gradient nebula, grid, section
 * ambience washes, parallax starfield + comets, edge beams, noise,
 * custom cursor. Everything is low-contrast or margin-bound so the
 * content column always stays comfortably readable.
 */
export default function BackgroundLayers() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <AuroraCanvas />
      </div>
      <motion.div className="grid-bg" aria-hidden="true" style={reduce ? undefined : { y: yGrid }} />
      {/* Section-driven ambient washes (activated via html[data-section]) */}
      <div className="ambience ambience-cyan" aria-hidden="true"></div>
      <div className="ambience ambience-violet" aria-hidden="true"></div>
      <div className="ambience ambience-teal" aria-hidden="true"></div>
      <div className="ambience ambience-blue" aria-hidden="true"></div>
      <div className="ambience ambience-green" aria-hidden="true"></div>
      <StarfieldCanvas />
      {/* Light beams framing the content margins (wide screens only) */}
      <div className="edge-beam edge-beam-left" aria-hidden="true"></div>
      <div className="edge-beam edge-beam-right" aria-hidden="true"></div>
      <div className="noise" aria-hidden="true"></div>
      <div className="cursor-ring" id="cursorRing" aria-hidden="true"></div>
      <div className="cursor-dot" id="cursorDot" aria-hidden="true"></div>
    </>
  );
}
