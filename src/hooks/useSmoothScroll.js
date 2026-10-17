import { useEffect } from "react";
import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";

/**
 * Inertial smooth scrolling (Lenis). Desktop fine-pointer only — touch
 * devices keep fast native scrolling — and disabled entirely under
 * prefers-reduced-motion. The instance is exposed on window.__lenis so
 * the anchor-navigation handler can route through it.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    // Drive Lenis from framer-motion's frame loop so scroll-linked motion
    // (hero 3D morph, stacked Work deck) reads the same frame's scroll.
    const update = ({ timestamp }) => lenis.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}
