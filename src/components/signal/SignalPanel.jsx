import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useScramble } from "../motion/ScrambleText";
import { SHAPE_LABELS } from "./particleShapes";

const SignalParticles = lazy(() => import("./SignalParticles"));

/**
 * Dark "screen" hosting the particle signal. If WebGL is unavailable,
 * SignalParticles bails out and the static glow fallback stays. The WebGL chunk (raw three,
 * shared with the hero's vendor chunk) is only requested once the panel is
 * within 400px of the viewport.
 */
export default function SignalPanel() {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const [near, setNear] = useState(false);
  const [label, setLabel] = useState(SHAPE_LABELS.orb);
  const scramble = useScramble(labelRef, label, { duration: 420 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    scramble();
  }, [label, scramble]);

  const onShape = useCallback((shape) => setLabel(SHAPE_LABELS[shape] ?? shape), []);

  return (
    <div className="signal-panel theme-dark-island" ref={ref}>
      <div className="signal-head" aria-hidden="true">
        <span><i />SIGNAL</span>
        <span ref={labelRef}>{label}</span>
      </div>
      <div className="signal-stage">
        {near ? (
          <Suspense fallback={<div className="signal-fallback" />}>
            <SignalParticles onShape={onShape} />
          </Suspense>
        ) : (
          <div className="signal-fallback" />
        )}
      </div>
    </div>
  );
}
