import { useLayoutEffect } from "react";

/**
 * Locks background scroll while `active` (modal/overlay open).
 *
 * `body{overflow:hidden}` alone isn't enough on this site: Lenis
 * (useSmoothScroll) intercepts wheel input at the window level and
 * animates the real scroll position itself, independent of CSS overflow.
 * Without pausing it explicitly, the page keeps smooth-scrolling *behind*
 * a fixed-position overlay while the overlay's own inner scroll area
 * never receives the wheel input. Stopping Lenis hands wheel events back
 * to normal browser scroll routing, so the overlay's own
 * `overflow-y: auto` content scrolls correctly, and body's overflow:hidden
 * stops the (now un-intercepted) background from moving at all.
 */
export function useScrollLock(active, onEscape) {
  useLayoutEffect(() => {
    if (!active) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onEscape?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, onEscape]);
}
