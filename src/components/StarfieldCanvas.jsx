import { useEffect, useRef } from "react";

/**
 * Text-safe ambient background: a three-depth parallax starfield with
 * occasional comet streaks.
 *
 * Design rules (readability first):
 * - stars are 0.6–1.8px dots at ≤ 0.5 alpha — no lines, no clusters,
 *   nothing that competes with body text
 * - comets are thin, fast, rare (every ~7–12s), and biased toward the
 *   upper third and edges of the viewport
 * - slow drift + scroll parallax give depth without distraction
 */
export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 720;

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = false;
    let t = 0;
    let stars = [];
    let comet = null;
    let nextComet = performance.now() + 4000 + Math.random() * 4000;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      seed();
    }

    function seed() {
      const count = isSmall ? 70 : 150;
      stars = Array.from({ length: count }, () => {
        const layer = Math.random(); // 0 = far, 1 = near
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.6 + layer * 1.2,
          baseA: 0.1 + layer * 0.34,
          depth: 0.03 + layer * 0.14, // scroll parallax factor
          drift: 0.02 + layer * 0.05,
          tw: Math.random() * Math.PI * 2, // twinkle phase
          twSpeed: 0.4 + Math.random() * 0.9,
          hue: Math.random() < 0.85 ? "180,220,255" : "165,180,255",
        };
      });
    }

    function spawnComet() {
      // Bias: start in upper third, travel down-right or down-left
      const fromLeft = Math.random() < 0.5;
      const y0 = Math.random() * H * 0.35;
      comet = {
        x: fromLeft ? -60 : W + 60,
        y: y0,
        vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 4),
        vy: 2.2 + Math.random() * 1.8,
        life: 1,
      };
    }

    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      const scroll = window.scrollY;

      // Stars
      for (const s of stars) {
        let sy = (s.y - scroll * s.depth) % (H + 8);
        if (sy < -4) sy += H + 8;
        const sx = (s.x + t * s.drift * 12) % (W + 8);
        const twinkle = reduce ? 1 : 0.75 + Math.sin(t * s.twSpeed + s.tw) * 0.25;
        ctx.fillStyle = `rgba(${s.hue},${(s.baseA * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Comet
      if (!reduce) {
        if (!comet && now > nextComet) {
          spawnComet();
          nextComet = now + 7000 + Math.random() * 5000;
        }
        if (comet) {
          comet.x += comet.vx;
          comet.y += comet.vy;
          comet.life -= 0.008;
          const tailX = comet.x - comet.vx * 16;
          const tailY = comet.y - comet.vy * 16;
          const grad = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y);
          const a = Math.max(0, comet.life) * 0.5;
          grad.addColorStop(0, "rgba(34,211,238,0)");
          grad.addColorStop(1, `rgba(186,240,255,${a.toFixed(3)})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(comet.x, comet.y);
          ctx.stroke();
          ctx.fillStyle = `rgba(220,248,255,${(a * 1.4).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(comet.x, comet.y, 1.4, 0, Math.PI * 2);
          ctx.fill();
          if (
            comet.life <= 0 ||
            comet.x < -100 ||
            comet.x > W + 100 ||
            comet.y > H + 100
          ) {
            comet = null;
          }
        }
      }
    }

    function loop(now) {
      t += 0.016;
      draw(now);
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
      if (reduce) draw(performance.now());
    };

    resize();
    if (reduce) {
      draw(performance.now()); // static starfield, no comets
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

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
