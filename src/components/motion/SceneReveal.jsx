import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

/**
 * Character-by-character text reveal, gated by `active`. At rest (active
 * false, or reduced motion) the full text shows immediately — the "typing"
 * only plays as a hover payoff, never blocking readability.
 */
function useTypewriter(text, active, { delay = 0, charsPerSecond = 32 } = {}) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(active && !reduce ? "" : text);

  useEffect(() => {
    if (!active || reduce) {
      setOut(text);
      return undefined;
    }
    setOut("");
    const controls = animate(0, text.length, {
      duration: Math.max(text.length / charsPerSecond, 0.2),
      delay,
      ease: "linear",
      onUpdate: (latest) => setOut(text.slice(0, Math.round(latest))),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, text, reduce, delay, charsPerSecond]);

  return out;
}

/** Numeric count-up (0 → target), gated by `active`; settles instantly at rest. */
function useCountValue(target, active, { delay = 0, duration = 1.1 } = {}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(active && !reduce ? 0 : target);

  useEffect(() => {
    if (!active || reduce) {
      setValue(target);
      return undefined;
    }
    setValue(0);
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, target, reduce, delay, duration]);

  return value;
}

/**
 * Delayed reveal gate, driven by a real `setTimeout` rather than a CSS
 * `animation-delay` — keeps every "when does this appear" decision on one
 * JS clock (same as the typewriter/count-up above) instead of splitting
 * timing across CSS and JS. At rest (building false) it's shown instantly.
 */
function useRevealed(building, delay = 0) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(!building || reduce);

  useEffect(() => {
    if (!building || reduce) {
      setShown(true);
      return undefined;
    }
    setShown(false);
    const t = setTimeout(() => setShown(true), delay * 1000);
    return () => clearTimeout(t);
  }, [building, delay, reduce]);

  return shown;
}

/** Typed text with a real full-text fallback for assistive tech. */
export function TypeLine({ text, active, delay = 0, charsPerSecond, className }) {
  const out = useTypewriter(text, active, { delay, charsPerSecond });
  const typing = active && out.length < text.length;
  return (
    <span className={className}>
      <span aria-hidden="true">
        {out}
        <i className="type-caret" data-show={typing || undefined}></i>
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/** Formatted count-up label (e.g. "3,412"). */
export function CountLabel({ target, active, delay, duration }) {
  const value = useCountValue(target, active, { delay, duration });
  return <>{Math.round(value).toLocaleString()}</>;
}

/** Animated gauge ring fill — replaces the old CSS keyframe with a real value. */
export function GaugeFill({ target, active, delay, duration, circumference = 314.16 }) {
  const value = useCountValue(target, active, { delay, duration });
  const offset = circumference * (1 - value / 100);
  return <circle className="gauge-fill" cx="60" cy="60" r="50" style={{ strokeDashoffset: offset }} />;
}

/**
 * Generic staggered build-in wrapper. `building` gates a real setTimeout
 * (not CSS animation-delay), then a short, fixed-duration CSS transition
 * handles the actual fade/rise so it restarts cleanly every time hover
 * re-enters.
 */
export function BuildLine({ as: Tag = "span", className = "", delay = 0, building = false, children, ...rest }) {
  const shown = useRevealed(building, delay);
  const cls = `build-line${shown ? " is-shown" : ""}${className ? ` ${className}` : ""}`;
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}

/** Three-phase call status ("Pending" → "Calling…" → "Done"), JS-timed. */
export function useStatusPhase(building, { toCalling = 900, toDone = 1900 } = {}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(building && !reduce ? "pending" : "done");

  useEffect(() => {
    if (!building || reduce) {
      setPhase("done");
      return undefined;
    }
    setPhase("pending");
    const t1 = setTimeout(() => setPhase("calling"), toCalling);
    const t2 = setTimeout(() => setPhase("done"), toDone);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building, toCalling, toDone]);

  return phase;
}
