/**
 * Gatekeeping for the 3D world — deliberately free of three.js imports so
 * the main bundle can ask "should I load it?" without paying for it.
 *
 * No throwaway WebGL probe: probing creates and destroys a context during
 * page start-up (and can fail spuriously while other contexts spin up).
 * If WebGL is really unavailable, the world's error boundary catches the
 * failed renderer and the site falls back to its 2D layout.
 */

/** Desktop-width and motion-OK. Phones get the lighter 2D layout. */
export function canRender3D() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return window.matchMedia("(min-width: 981px)").matches;
}

let pending = null;

/** Single shared dynamic import — the preloader warms it, WorldLoader consumes it. */
export function loadWorld() {
  pending ??= import("../../world/World");
  return pending;
}
