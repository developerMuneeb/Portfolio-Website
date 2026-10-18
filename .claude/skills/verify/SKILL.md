---
name: verify
description: Build, run, and visually verify this React+Vite portfolio site end-to-end.
---

# Verifying the portfolio site

## Build + serve

Run from the repo root. The repo uses pnpm (`pnpm-lock.yaml`), which isn't on
PATH — go through npx so no `package-lock.json` gets created.

```bash
npx --yes pnpm@9 install
npx --yes pnpm@9 run build
npx --yes pnpm@9 exec vite preview --port 4173 --strictPort   # run in background
curl -s -o /dev/null -w "%{http_code}" http://localhost:4173/  # expect 200
```

## Drive it (no Playwright installed — use Edge headless)

Edge lives at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.

**Timers don't run in plain headless captures.** With `--timeout`, timers
never fire; with `--virtual-time-budget`, timers fire but rAF barely ticks.
Either way the intro preloader (timer + framer animation) never lifts, so
plain `--screenshot` only ever shows the preloader. Drive Edge over the
DevTools protocol in real time instead: launch with
`--headless=new --remote-debugging-port=<port> --user-data-dir=<tmp>`, connect
to the page's `webSocketDebuggerUrl` (Node 24 has a global `WebSocket`), then
`Page.navigate`, wait, `Runtime.evaluate` (scroll via
`window.__lenis.scrollTo(y, {immediate: true, force: true})`),
`Input.dispatchMouseEvent`, and `Page.captureScreenshot`.

Gotchas learned the hard way:
- **WebGL**: add `--use-angle=swiftshader --enable-unsafe-swiftshader` or the
  3D hero and shader backdrop can't create contexts. `--disable-3d-apis`
  exercises the no-WebGL fallback.
- **Headless fps is ~2–12** (software compositing), so framer animations crawl.
  After a big scroll jump, wait several seconds before judging reveals. Don't
  treat headless frame rates as a perf benchmark.
- **The 3D world renders at ~1–10fps in SwiftShader** and its first frames
  stall for seconds on shader compile. Wait 10–15s after load and after each
  scroll jump before judging a station; a half-arrived camera looks like a
  misplaced set piece. (Same page with `--force-prefers-reduced-motion`, i.e.
  no world, runs ~50fps — that's the comparison point.)
- **Inline `node -e '...'` scripts break on apostrophes** in comments/strings,
  and heredocs here halve double backslashes — write scratch scripts with the
  Write tool instead.
- **Min window width ~500px**: use 500 wide for "mobile"; the ≤480px CSS
  tweaks aren't exercised.
- **Reduced-motion probe**: `--force-prefers-reduced-motion`.

## What to check

- Intro: "MUHAMMAD MUNEEB" letter rise + 000→100 counter, curtain wipes up
  into the hero line-mask reveal. Once per session (sessionStorage
  `mm-intro-seen`); never under reduced motion.
- 3D world (≥981px, motion OK — `html.world-on`, set pre-paint in
  `index.html`): one fixed canvas (`src/world/World.jsx`) behind the page.
  Each `[data-station]` section gets a set piece aligned to its empty
  `[data-anchor]` stage column — never behind text:
  top = glass Agent Core + orbiting labelled systems + two text bands wrapped
  around it (scroll-scrubbed: bands spin and stand up, core turns half a
  revolution, then collapses as the camera leaves). Every other section is
  one particle **swarm** (`src/world/swarm/`) that re-forms per station:
  about = 4-layer system stack (labels; active layer follows reading; points
  stream upward), experience = helix with one cluster per job (active job
  turns to the front), credentials = certificate-card carousel turned by the scroll (rests on the row being read, turns
  briskly between rows; each card has its own topic glyph — cap, agent hub, cloud, bars, braces, bot —
  and a crisp caption under the front card matches the list's label/number), skills = globe
  with real logos, services = the active service's icon (re-forms on each
  row), work = particle laptop with the active project's icon + caption
  (synced with `.wk-index`); deck/contact = swarm hidden. Between sections
  the morph is scrubbed by scroll (reverses on scroll-up) and the swarm dims
  while it slides across the text column. Each section has its own chapter colour
  (`CHAPTERS` in Swarm.jsx: experience amber→mint along the helix, credentials
  gold, skills sky blue, services coral, work lavender→pink; brand mint/violet
  elsewhere), blended as the swarm re-forms. Interactions: hovering a
  service / job / certificate / project row makes the swarm show it at once
  (ignored mid-scroll); clicking the shape (not a link) fires a shockwave that
  re-forms; a ring of light sweeps out when a shape finishes forming; at rest
  a slow band of light travels through it; data particles stream along the
  Experience helix. Camera holds per section and
  swoops between them. Phones / reduced motion: no world, `World-*.js` not requested. No WebGL
  (`--disable-3d-apis`): the chunk loads, the canvas fails, WorldLoader's error
  boundary drops `world-on` (the logged context errors are expected). Either way stages show 2D fallbacks
  (agent card, logo grid) or collapse so copy centres.
- Backdrop: soft aurora canvas (`html.has-shader`), dim behind the content
  column, palette shifting per section/project.
- Cursor (fine pointer): dot + ring (difference blend, visible on both
  themes); pill labels "Explore" (project cards / hero CTA), "Open" (sample
  buttons), "Play" (ShopMesh).
- Contact: signal panel particles morph into the hovered link's icon
  (LinkedIn/GitHub/Email/Call; footer links too).
- Work (≥981px, fine pointer, motion OK): sticky "P/0x" chapter bar; cards pin
  and stack, the covered card scales back and dims; diagrams still alternate
  sides. Plain list otherwise. No horizontal scroll at 500px.
- Nav: pill links on desktop; hamburger < 980px opens full-screen glass menu.
- Themes: `html[data-theme]` is stamped by the inline script in `index.html`
  (saved `mm-theme` in localStorage, else OS preference). **Headless Edge
  reports a light OS preference**, so a fresh profile opens in light. The sun/
  moon toggle (nav + mobile menu) flips it with a circular view-transition
  reveal (instant under reduced motion), persists the choice, and updates
  `meta[name=theme-color]`. In light, project visual panes and the signal
  panel (`.theme-dark-island`) stay dark; everything else is warm paper.
  Colors come from theme triplets in `tokens.css` (`--tint-rgb`,
  `--surface-rgb`, `--fill-rgb`/`--fill-k`, `--shadow-rgb`/`--shadow-k`, ...) —
  new CSS should use those, not raw hex/rgba.
- No horizontal scroll at 390 and 500px (Work gallery bleeds by `--gutter`).
- Build output: separate `World-*.js`, `SignalParticles-*.js` and
  `ProjectWorkflowDiagram-*.js` chunks in `dist/assets`; `dist/` must contain
  no `uploads/` folder.
