import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import AuroraCanvas from "./AuroraCanvas";

// The 3D companion (three.js) loads in its own chunk AFTER first paint,
// so it never delays the initial page load.
const CompanionCrystal = lazy(() => import("./CompanionCrystal"));

/**
 * Background stack (bottom → top): gradient nebula (ambient light),
 * grid, section ambience washes, 3D companion crystal, noise, cursor.
 */
export default function BackgroundLayers() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const [showCrystal, setShowCrystal] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 350));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(() => setShowCrystal(true));
    return () => cancel(id);
  }, []);

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
      {showCrystal ? (
        <Suspense fallback={null}>
          <CompanionCrystal />
        </Suspense>
      ) : null}
      <div className="noise" aria-hidden="true"></div>
      <div className="cursor-ring" id="cursorRing" aria-hidden="true"></div>
      <div className="cursor-dot" id="cursorDot" aria-hidden="true"></div>
    </>
  );
}
