/**
 * Shared, mutable state for the 3D world — written by the station solver
 * every frame, read by the set pieces inside useFrame. Plain objects (no
 * React state) so nothing re-renders while scrolling.
 *
 * A "station" is a page section marked with [data-station]. While the
 * visitor reads a section the camera *holds* on its station; crossing a
 * section boundary triggers a short cinematic camera move to the next one.
 */

export const STATION_STEP = 16; // world units between stations (camera travels down)
export const CAMERA_DISTANCE = 8;
export const FOV = 35;

export const world = {
  stations: [], // { id, holdStart, holdEnd, ndcX }
  current: 0, // index of the station being held / departed
  next: 0, // index being approached during a transition
  t: 0, // 0..1 transition progress current -> next (0 while holding)
  presence: {}, // id -> 0..1 how "on stage" each station is
  local: {}, // id -> 0..1 reading progress inside a station's section
  ndcX: {}, // id -> horizontal NDC of the section's stage column
  subs: {}, // id -> page-space tops of the rows inside a station (services, jobs)
  pointer: { x: 0, y: 0 }, // -1..1 page pointer (for parallax)
  scrollVelocity: 0,
};

/**
 * Set pieces are sized for a 16:10 desktop (1440×900). On narrower screens
 * the stage column is narrower in world units too, so pieces shrink with
 * the aspect ratio to stay inside it, never over the copy.
 */
export function fitScale(aspect) {
  return Math.min(1, Math.max(0.5, aspect / 1.6));
}

// Rows whose on-screen position decides which part a station highlights
const SUB_ITEMS = { services: ".sv-item", experience: ".xp-item", credentials: ".cr-edu, .cr-certs > li" };

/**
 * Continuous version of subIndex: 2.4 means 40% of the way from row 2 to
 * row 3, so a set piece can turn smoothly with the scroll instead of
 * stepping row by row.
 */
export function subFloat(id, fallback) {
  const tops = world.subs[id];
  if (!tops?.length) return fallback;
  const line = window.scrollY + window.innerHeight * 0.5;
  if (line <= tops[0]) return 0;
  for (let i = 0; i < tops.length - 1; i += 1) {
    if (line < tops[i + 1]) return i + (line - tops[i]) / Math.max(1, tops[i + 1] - tops[i]);
  }
  return tops.length - 1;
}

/**
 * Index of the row being read in a station (the last row whose top has
 * passed the middle of the viewport), or `fallback` if it has no rows.
 * Uses positions cached by measureStations — no layout reads per frame.
 */
export function subIndex(id, fallback) {
  const tops = world.subs[id];
  if (!tops?.length) return fallback;
  const line = window.scrollY + window.innerHeight * 0.5;
  let index = 0;
  for (let i = 0; i < tops.length; i += 1) if (tops[i] <= line) index = i;
  return index;
}

/** Read every [data-station] section's scroll range and stage column. */
export function measureStations() {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const sy = window.scrollY;
  world.stations = [...document.querySelectorAll("[data-station]")].map((el) => {
    const rect = el.getBoundingClientRect();
    const top = rect.top + sy;
    const anchor = el.querySelector("[data-anchor]");
    let ndcX = 0;
    if (anchor) {
      const a = anchor.getBoundingClientRect();
      if (a.width > 0) ndcX = ((a.left + a.width / 2) / vw) * 2 - 1;
    }
    const holdStart = top - vh * 0.3;
    const holdEnd = Math.max(holdStart + 1, top + rect.height - vh * 0.7);
    world.ndcX[el.dataset.station] = ndcX;
    const sub = SUB_ITEMS[el.dataset.station];
    if (sub) world.subs[el.dataset.station] = [...el.querySelectorAll(sub)].map((item) => item.getBoundingClientRect().top + sy);
    return { id: el.dataset.station, holdStart, holdEnd, ndcX };
  });
}

const smooth = (x) => x * x * (3 - 2 * x);

/** Resolve which station the camera is on for a given scroll position. */
export function solveStations(scrollY) {
  const s = world.stations;
  if (!s.length) return;
  let current = 0;
  let next = 0;
  let t = 0;
  if (scrollY <= s[0].holdEnd) {
    current = 0;
    next = 0;
  } else if (scrollY >= s[s.length - 1].holdStart) {
    current = s.length - 1;
    next = current;
  } else {
    for (let i = 0; i < s.length; i += 1) {
      if (scrollY >= s[i].holdStart && scrollY <= s[i].holdEnd) {
        current = i;
        next = i;
        break;
      }
      if (i < s.length - 1 && scrollY > s[i].holdEnd && scrollY < s[i + 1].holdStart) {
        current = i;
        next = i + 1;
        t = smooth((scrollY - s[i].holdEnd) / (s[i + 1].holdStart - s[i].holdEnd));
        break;
      }
    }
  }
  world.current = current;
  world.next = next;
  world.t = t;
  for (let i = 0; i < s.length; i += 1) {
    const { id, holdStart, holdEnd } = s[i];
    let p = 0;
    if (i === current) p = 1 - t;
    if (i === next && next !== current) p = t;
    world.presence[id] = p;
    world.local[id] = Math.min(1, Math.max(0, (scrollY - holdStart) / (holdEnd - holdStart)));
  }
}

/** Station index of a section id (or -1). */
export function stationIndex(id) {
  return world.stations.findIndex((station) => station.id === id);
}
