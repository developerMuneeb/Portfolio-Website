import { useCallback, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_-+*#";

/**
 * Igloo Inc-style decode: characters resolve left-to-right out of random
 * glyphs. Writes textContent directly (no React re-render per frame) into
 * an aria-hidden span; the real text sits beside it for screen readers.
 * Meant for monospace labels, so the width never shifts.
 */
export function useScramble(ref, text, { duration = 650 } = {}) {
  const raf = useRef(0);
  const reduce = useReducedMotion();

  const run = useCallback(() => {
    const el = ref.current;
    if (!el || reduce) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const chars = [...text];
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const resolved = Math.floor(p * chars.length);
      let out = "";
      for (let i = 0; i < chars.length; i += 1) {
        const c = chars[i];
        if (i < resolved || c === " " || c === " ") out += c;
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) raf.current = requestAnimationFrame(step);
      else el.textContent = text;
    };
    raf.current = requestAnimationFrame(step);
  }, [ref, text, duration, reduce]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return run;
}

/**
 * <ScrambleText text="/ 01 — profile" /> decodes once when scrolled into
 * view, and again on hover when `hover` is set.
 */
export default function ScrambleText({ text, as: Tag = "span", className, hover = false, ...rest }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const inView = useInView(outer, { once: true, margin: "0px 0px -10% 0px" });
  const run = useScramble(inner, text);

  useEffect(() => {
    if (inView) run();
  }, [inView, run]);

  return (
    <Tag ref={outer} className={className} onMouseEnter={hover ? run : undefined} {...rest}>
      <span aria-hidden="true" ref={inner}>
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
