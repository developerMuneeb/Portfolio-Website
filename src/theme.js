import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

/**
 * Theme store. The initial theme is stamped on <html data-theme> by an
 * inline script in index.html *before* first paint (no flash): an explicit
 * choice from localStorage wins, otherwise the OS preference. Until the
 * visitor picks one, the site keeps following OS changes live.
 */

const KEY = "mm-theme";
const META_COLOR = { dark: "#0b0b15", light: "#f3f0e8" };
const listeners = new Set();

const root = () => document.documentElement;

export function getTheme() {
  return root().dataset.theme === "light" ? "light" : "dark";
}

function storedTheme() {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function apply(theme) {
  root().dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLOR[theme]);
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Follow OS changes until the visitor makes an explicit choice
if (typeof window !== "undefined") {
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
    if (!storedTheme()) apply(event.matches ? "light" : "dark");
  });
}

/**
 * Switch theme. With View Transitions support (Chromium) the new theme is
 * revealed as a circle growing from `origin` (the toggle button); otherwise,
 * or under reduced motion, it switches instantly.
 */
export function setTheme(theme, origin) {
  try {
    window.localStorage.setItem(KEY, theme);
  } catch {
    /* storage blocked — the choice just won't persist */
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce || !origin) {
    apply(theme);
    return;
  }

  const { x, y } = origin;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  root().classList.add("theme-switching");
  const transition = document.startViewTransition(() => {
    flushSync(() => apply(theme));
  });
  transition.ready
    .then(() => {
      root().animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 720, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
  transition.finished.finally(() => root().classList.remove("theme-switching"));
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => "dark");
}
