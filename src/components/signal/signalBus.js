import { useMemo } from "react";

/**
 * Tiny pub/sub for the particle "signal" panel. Any link on the page can
 * declare which shape the particles should form while it's hovered or
 * focused; leaving returns them to the idle orb.
 */

export const IDLE_SHAPE = "orb";

let current = IDLE_SHAPE;
const listeners = new Set();

export function getSignalShape() {
  return current;
}

export function setSignalShape(shape) {
  if (shape === current) return;
  current = shape;
  listeners.forEach((listener) => listener(shape));
}

export function subscribeSignal(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Spread onto a link: `<a {...useSignalHover("github")}>`. */
export function useSignalHover(shape) {
  return useMemo(() => {
    const enter = () => setSignalShape(shape);
    const leave = () => {
      if (current === shape) setSignalShape(IDLE_SHAPE);
    };
    return { onMouseEnter: enter, onFocus: enter, onMouseLeave: leave, onBlur: leave };
  }, [shape]);
}
