import { useScroll, useSpring, useVelocity } from "framer-motion";

/**
 * Smoothed page scroll velocity (px/s) as a motion value — drives the
 * Mat Voyce-style kinetic type (ghost-title stretch, velocity marquee).
 * Springs back to 0 with a little inertia when scrolling stops.
 */
export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  return useSpring(velocity, { damping: 50, stiffness: 400 });
}
