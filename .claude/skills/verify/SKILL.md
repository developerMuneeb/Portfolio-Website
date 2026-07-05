---
name: verify
description: Build, run, and visually verify this React+Vite portfolio site end-to-end.
---

# Verifying the portfolio site

## Build + serve

```bash
cd portfolio-website/project
../../tools/pnpm.exe run build          # pnpm is vendored at repo root (not on PATH)
../../tools/pnpm.exe exec vite preview --port 4173 --strictPort   # run in background
curl -s -o /dev/null -w "%{http_code}" http://localhost:4173/     # expect 200
```

## Drive it (no Playwright installed — use Edge headless)

Edge lives at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.

```bash
"$EDGE" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,900 --timeout=12000 \
  --screenshot="C:\path\out.png" http://localhost:4173/
```

Gotchas learned the hard way:
- **Min window width ~500px**: `--window-size=390,...` renders a ~500px layout
  clipped to 390 — mobile checks below 500px are unreliable. Use 500 wide for
  "mobile" and remember the ≤480px CSS tweaks aren't exercised.
- **URL fragments don't scroll** in headless screenshot mode; captures are
  always at scroll 0. To see lower sections, capture the full page tall.
- **Tall captures (1440×15000) stop rasterizing around y≈12000** — the bottom
  shows black except compositor-layer animated elements (pulsing dots). That's
  a tool artifact, not a page bug. Workaround: add
  `--force-device-scale-factor=0.5` so the raster area halves and the whole
  page paints (output PNG is half-res).
- **Slice tall PNGs** for review with PowerShell System.Drawing
  (`[System.Drawing.Bitmap]::new(...)`; `New-Object` with Rectangle args
  breaks on PS 5.1).
- **Reduced-motion probe**: add `--force-prefers-reduced-motion` — expect all
  content visible immediately, marquee unrolled/static, canvas frozen at one
  frame, no SMIL loops in project diagrams.
- **Lazy diagrams race**: with `--timeout`, screenshots/dump-dom fire before
  the ProjectWorkflowDiagram lazy chunk resolves → `.pvis` frames look empty.
  Use `--virtual-time-budget=8000` (works fine at 0.5 scale) to let the
  dynamic import settle; grep dump-dom for `FREIGHT VOICE AGENT` to confirm.

## What to check

- Hero: cyan gradient headline + live "AGENT OPERATIONS" canvas (dark Electric
  palette, clock ticking PKT).
- Nav: pill links on desktop; hamburger < 980px opens full-screen glass menu.
- All 11 sections render; Work diagrams are lazy-chunked
  (`ProjectWorkflowDiagram-*.js` separate in `dist/assets`).
- `dist/` must contain no `uploads/` folder.
