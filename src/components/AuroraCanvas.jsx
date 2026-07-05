import { useEffect, useRef } from "react";

/**
 * Flowing gradient nebula — the visibly animated background layer.
 * Large color blobs orbit on slow sine paths, breathe, and shift with
 * scroll. Rendered into a tiny offscreen-resolution canvas (~1/8 size)
 * and stretched by CSS, so each frame costs almost nothing while the
 * upscaled gradients stay perfectly smooth (the Stripe-gradient trick).
 */
const BLOBS = [
  // x/y as fractions of the viewport, radius as fraction of max side
  { x: 0.16, y: 0.22, r: 0.52, rgb: "34,211,238", ax: 0.1, ay: 0.08, sx: 0.7, sy: 0.9, ph: 0.0, scroll: 0.12 },
  { x: 0.82, y: 0.16, r: 0.46, rgb: "59,130,246", ax: 0.09, ay: 0.1, sx: 0.55, sy: 0.75, ph: 1.7, scroll: -0.08 },
  { x: 0.55, y: 0.75, r: 0.5, rgb: "129,140,248", ax: 0.12, ay: 0.07, sx: 0.85, sy: 0.6, ph: 3.1, scroll: 0.16 },
  { x: 0.28, y: 0.9, r: 0.42, rgb: "45,212,191", ax: 0.08, ay: 0.09, sx: 0.62, sy: 0.8, ph: 4.4, scroll: -0.1 },
  { x: 0.95, y: 0.62, r: 0.4, rgb: "14,165,233", ax: 0.1, ay: 0.11, sx: 0.75, sy: 0.5, ph: 5.6, scroll: 0.09 },
];

export default function AuroraCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let t = Math.random() * 100;
    let raf = 0;
    let running = false;

    function resize() {
      // Deliberately tiny buffer: gradients upscale losslessly smooth
      W = Math.max(120, Math.round(window.innerWidth / 8));
      H = Math.max(90, Math.round(window.innerHeight / 8));
      canvas.width = W;
      canvas.height = H;
    }

    function draw() {
      const scroll = window.scrollY;
      const vh = window.innerHeight || 1;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (const b of BLOBS) {
        const bx = (b.x + Math.sin(t * b.sx + b.ph) * b.ax) * W;
        // Blob drifts on its sine path plus a wrapped scroll offset,
        // so scrolling visibly slides the nebula in layered depths.
        let byFrac = b.y + Math.cos(t * b.sy + b.ph) * b.ay - (scroll / vh) * b.scroll;
        byFrac = ((byFrac % 1.6) + 1.6) % 1.6 - 0.3; // wrap within [-0.3, 1.3]
        const by = byFrac * H;
        const radius = b.r * Math.max(W, H) * (1 + Math.sin(t * 0.5 + b.ph) * 0.08);

        const g = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
        g.addColorStop(0, `rgba(${b.rgb},0.5)`);
        g.addColorStop(0.55, `rgba(${b.rgb},0.16)`);
        g.addColorStop(1, `rgba(${b.rgb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      ctx.globalCompositeOperation = "source-over";
    }

    function loop() {
      t += 0.0045;
      draw();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onResize = () => {
      resize();
      if (reduce) draw();
    };

    resize();
    if (reduce) {
      draw(); // static nebula
    } else {
      start();
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="aurora-canvas" aria-hidden="true" />;
}
