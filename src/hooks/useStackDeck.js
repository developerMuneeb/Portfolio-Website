import { useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const DECK_QUERY = "(min-width: 981px) and (hover: hover) and (pointer: fine)";

/** The stacked Work deck runs on fine-pointer desktops only, never under reduced motion. */
export function useDeckEnabled() {
  const reduce = useReducedMotion();
  const [matches, setMatches] = useState(() => window.matchMedia(DECK_QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(DECK_QUERY);
    const update = () => setMatches(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return matches && !reduce;
}

/**
 * Sticky offset for a deck card: pin below the chapter bar when the card
 * fits the viewport, otherwise pin at its own bottom edge so the whole card
 * scrolls into view before the next one slides over it. Re-measures on
 * resize and when content grows (e.g. "View case notes" expanding).
 */
export function useStickyTop(ref, enabled, headroom, gap = 24) {
  const [top, setTop] = useState(headroom);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return undefined;
    const measure = () => setTop(Math.min(headroom, window.innerHeight - el.offsetHeight - gap));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, enabled, headroom, gap]);

  return top;
}
