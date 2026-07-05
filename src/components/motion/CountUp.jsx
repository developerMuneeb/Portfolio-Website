import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a stat up from 0 when it scrolls into view.
 * Accepts values like "12+", "22h", "3.4k", "4".
 */
export default function CountUp({ value, duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const match = String(value).match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : "";
  const decimals = match && match[2].includes(".") ? 1 : 0;
  const [display, setDisplay] = useState(reduce || !match ? String(value) : `${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView || reduce || !match) {
      if (inView) setDisplay(String(value));
      return undefined;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (latest) => setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`),
      onComplete: () => setDisplay(String(value)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return <span ref={ref}>{display}</span>;
}
