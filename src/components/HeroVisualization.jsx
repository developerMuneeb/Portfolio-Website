import { useEffect, useRef } from "react";

export default function HeroVisualization() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0;
    let H = 0;
    let f = 0;
    let raf = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      // Cap DPR harder on small screens to keep mobile fast.
      const dprCap = window.innerWidth < 720 ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const r = canvas.parentElement.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    /* ── Palette — Electric dark theme ───────────────────────────── */
    const OG = "#22d3ee"; // primary accent (electric cyan)
    const OGr = "34,211,238";
    const GD = "#3b82f6"; // secondary accent (blue)
    const GDr = "59,130,246";
    const GN = "#34d399"; // status green
    const GNr = "52,211,153";
    const INK = "#e9edf5";
    const DIM = "#9aa3b8";
    const SOFT = "#6b7590";

    function ca(hex, a) {
      return `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`;
    }

    /* ── Layout helpers ──────────────────────────────────────────── */
    const PX = 18;
    function S(yFrac, hFrac) {
      return { x: PX, y: H * yFrac, w: W - 2 * PX, h: H * hFrac };
    }
    function clip(sec, fn) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(sec.x - 2, sec.y - 2, sec.w + 4, sec.h + 4);
      ctx.clip();
      fn();
      ctx.restore();
    }
    function fitText(str, maxW) {
      if (ctx.measureText(str).width <= maxW) return str;
      while (str.length > 0 && ctx.measureText(str + "…").width > maxW) str = str.slice(0, -1);
      return str + "…";
    }

    /* ── State ───────────────────────────────────────────────────── */
    const ST = {
      phase: 0,
      calls: 12,
      leads: 3417,
      score: 82,
      lastTick: 0,
      pkts: [
        { row: 0, p: 0.15 },
        { row: 1, p: 0.52 },
        { row: 2, p: 0.78 },
      ],
      logLines: ["", ""],
      logNext: "▸  agent.mesh.init() → READY ✓",
      logTyped: "▸  agent.mesh.init() → READY ✓",
      logTyping: 999,
      logTimer: 0,
      logIdx: 0,
    };

    const LOGS = [
      "voice_agent.dial(4821) → QUALIFIED",
      'scrape.run("linkedin") → 847 rows',
      "email_seq.launch(12) → SENT ✓",
      'crm.update("Won") → SYNCED',
      "enrich.waterfall() → done ✓",
      'n8n.trigger("pre_call") → OK',
      "clay.firmographics() → complete",
      "webhook.recv(result) → routing",
    ];

    /* ── Card helper ─────────────────────────────────────────────── */
    function card(x, y, w, h, r = 10, accentColor, accentAlpha = 0.22) {
      ctx.shadowColor = "rgba(0,0,0,.32)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = "#101625";
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.strokeStyle = accentColor ? ca(accentColor, accentAlpha) : "rgba(255,255,255,.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.stroke();
    }

    /* ── Background ──────────────────────────────────────────────── */
    function drawBg() {
      ctx.fillStyle = "#090b12";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255,255,255,.055)";
      const g = 24;
      for (let x = g / 2; x < W; x += g)
        for (let y = g / 2; y < H; y += g) {
          ctx.beginPath();
          ctx.arc(x, y, 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      const gl = ctx.createLinearGradient(0, 0, 0, H * 0.25);
      gl.addColorStop(0, `rgba(${OGr},.05)`);
      gl.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gl;
      ctx.fillRect(0, 0, W, H);
    }

    /* ── HUD ─────────────────────────────────────────────────────── */
    function drawHUD() {
      const sec = S(0.026, 0.056);
      const mid = sec.y + sec.h * 0.58;
      const fs = Math.min(10, sec.h * 0.42);

      ctx.fillStyle = OG;
      ctx.fillRect(sec.x, mid - 1, 16, 2);

      ctx.font = `500 ${fs}px 'JetBrains Mono',monospace`;
      ctx.fillStyle = ca(INK, 0.42);
      ctx.textAlign = "left";
      ctx.fillText("AGENT OPERATIONS", sec.x + 22, mid + fs * 0.38);

      const kh = new Date(Date.now() + new Date().getTimezoneOffset() * 60000 + 5 * 3600000);
      const ts = `${String(kh.getHours()).padStart(2, "0")}:${String(kh.getMinutes()).padStart(2, "0")} PKT`;
      const pulseA = 0.65 + Math.sin(f * 0.06) * 0.25;
      ctx.fillStyle = ca(GN, pulseA);
      ctx.beginPath();
      ctx.arc(sec.x + sec.w - ctx.measureText("LIVE · " + ts).width * 0.5 - 28, mid, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = `400 ${fs * 0.9}px 'JetBrains Mono',monospace`;
      ctx.fillStyle = ca(INK, 0.28);
      ctx.textAlign = "right";
      ctx.fillText("LIVE  ·  " + ts, sec.x + sec.w, mid + fs * 0.38);
      ctx.textAlign = "left";

      ctx.strokeStyle = "rgba(255,255,255,.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sec.x, sec.y + sec.h);
      ctx.lineTo(sec.x + sec.w, sec.y + sec.h);
      ctx.stroke();
    }

    /* ── Stat cards ──────────────────────────────────────────────── */
    function drawSmallIcon(type, x, y, r, color) {
      ctx.strokeStyle = ca(color, 0.7);
      ctx.fillStyle = ca(color, 0.7);
      ctx.lineWidth = r * 0.3;
      ctx.lineCap = "round";
      if (type === "wave") {
        const bars = [-1.3, -0.52, 0, 0.52, 1.3];
        const hs = [0.45, 0.85, 1, 0.85, 0.45];
        bars.forEach((bx, i) => {
          ctx.beginPath();
          ctx.moveTo(x + bx * r * 0.55, y + hs[i] * r * 0.65);
          ctx.lineTo(x + bx * r * 0.55, y - hs[i] * r * 0.65);
          ctx.stroke();
        });
      } else if (type === "zap") {
        ctx.beginPath();
        ctx.moveTo(x + r * 0.18, y - r * 0.78);
        ctx.lineTo(x - r * 0.18, y - 0.05 * r);
        ctx.lineTo(x + r * 0.14, y - 0.05 * r);
        ctx.lineTo(x - r * 0.18, y + r * 0.78);
        ctx.stroke();
      } else {
        ctx.lineWidth = r * 0.28;
        ctx.strokeStyle = ca(color, 0.15);
        ctx.beginPath();
        ctx.arc(x, y, r * 0.72, Math.PI * 0.65, Math.PI * 2.35);
        ctx.stroke();
        ctx.strokeStyle = ca(color, 0.7);
        ctx.beginPath();
        ctx.arc(x, y, r * 0.72, Math.PI * 0.65, Math.PI * 0.65 + (ST.score / 100) * Math.PI * 1.7);
        ctx.stroke();
      }
      ctx.lineWidth = 1;
      ctx.lineCap = "butt";
    }

    function drawStats() {
      const sec = S(0.093, 0.16);
      const g = W * 0.02;
      const cw = (sec.w - 2 * g) / 3;
      const CARDS = [
        { val: String(ST.calls), lbl: "ACTIVE CALLS", icon: "wave", color: OG, rgb: OGr },
        { val: (ST.leads / 1000).toFixed(1) + "k", lbl: "LEADS / WK", icon: "zap", color: GD, rgb: GDr },
        { val: String(ST.score), lbl: "AI SCORE", icon: "ring", color: GN, rgb: GNr },
      ];

      CARDS.forEach((c, i) => {
        const cx = sec.x + i * (cw + g);
        const cy = sec.y;
        clip({ x: cx - 2, y: cy - 2, w: cw + 4, h: sec.h + 4 }, () => {
          card(cx, cy, cw, sec.h, 10, c.color, 0.15);
          ctx.fillStyle = c.color;
          ctx.beginPath();
          ctx.roundRect(cx, cy, cw, 3, [10, 10, 0, 0]);
          ctx.fill();

          const iconX = cx + cw * 0.22;
          const iconY = cy + sec.h * 0.5;
          const ir = sec.h * 0.18;
          ctx.fillStyle = ca(c.color, 0.1);
          ctx.beginPath();
          ctx.arc(iconX, iconY, ir, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = ca(c.color, 0.35);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(iconX, iconY, ir, 0, Math.PI * 2);
          ctx.stroke();
          drawSmallIcon(c.icon, iconX, iconY, ir * 0.55, c.color);

          const valFs = Math.min(22, sec.h * 0.28);
          ctx.font = `600 ${valFs}px 'Space Grotesk',sans-serif`;
          ctx.fillStyle = ca(INK, 0.85);
          ctx.textAlign = "left";
          ctx.fillText(c.val, cx + cw * 0.43, cy + sec.h * 0.52);

          const lblFs = Math.min(8.5, sec.h * 0.13);
          ctx.font = `400 ${lblFs}px 'JetBrains Mono',monospace`;
          ctx.fillStyle = ca(DIM, 0.62);
          const lbl = fitText(c.lbl, cw * 0.56);
          ctx.fillText(lbl, cx + cw * 0.43, cy + sec.h * 0.75);
        });
      });
    }

    /* ── Waveform ────────────────────────────────────────────────── */
    function drawWave() {
      const sec = S(0.267, 0.225);
      clip(sec, () => {
        card(sec.x, sec.y, sec.w, sec.h, 10, OG, 0.18);

        const hdrH = sec.h * 0.16;
        const hdrMid = sec.y + hdrH * 0.6;
        const hdrFs = Math.min(10, hdrH * 0.5);

        ctx.font = `500 ${hdrFs}px 'JetBrains Mono',monospace`;
        ctx.fillStyle = ca(OG, 0.75);
        ctx.textAlign = "left";
        ctx.fillText("VOICE AGENT", sec.x + 12, hdrMid + hdrFs * 0.4);

        const bw = 38;
        const bh = hdrH * 0.55;
        const bx = sec.x + 12 + ctx.measureText("VOICE AGENT").width + 8;
        const by = hdrMid - bh * 0.5;
        ctx.fillStyle = ca(GN, 0.09);
        ctx.strokeStyle = ca(GN, 0.3);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, bh / 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = ca(GN, 0.7 + Math.sin(f * 0.07) * 0.2);
        ctx.beginPath();
        ctx.arc(bx + 9, hdrMid, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `400 ${hdrFs * 0.85}px 'JetBrains Mono',monospace`;
        ctx.fillStyle = ca(GN, 0.65);
        ctx.fillText("LIVE", bx + 16, hdrMid + hdrFs * 0.35);

        const callStr = String(ST.calls) + " calls";
        ctx.font = `500 ${hdrFs}px 'JetBrains Mono',monospace`;
        ctx.fillStyle = ca(DIM, 0.5);
        ctx.textAlign = "right";
        ctx.fillText(callStr, sec.x + sec.w - 12, hdrMid + hdrFs * 0.4);

        const wx = sec.x + 12;
        const wy = sec.y + hdrH + 6;
        const ww = sec.w - 24;
        const wh = sec.h - hdrH - 26;

        ctx.strokeStyle = "rgba(255,255,255,.06)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 4]);
        [0.25, 0.5, 0.75].forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(wx, wy + p * wh);
          ctx.lineTo(wx + ww, wy + p * wh);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        const t = ST.phase;
        function wave(amp1, amp2, amp3, phOff) {
          const pts = [];
          for (let i = 0; i <= ww; i++) {
            const nx = i / ww;
            const ny =
              0.5 +
              Math.sin(nx * 11 + t + phOff) * amp1 +
              Math.sin(nx * 6.8 + t * 1.25 + phOff * 0.7) * amp2 +
              Math.sin(nx * 18 + t * 0.6 + phOff * 0.4) * amp3;
            pts.push([wx + i, wy + ny * wh]);
          }
          return pts;
        }

        const pts = wave(0.17, 0.09, 0.04, 0);
        const fill = ctx.createLinearGradient(0, wy, 0, wy + wh);
        fill.addColorStop(0, `rgba(${OGr},.16)`);
        fill.addColorStop(0.55, `rgba(${OGr},.04)`);
        fill.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        pts.forEach(([px, py]) => ctx.lineTo(px, py));
        ctx.lineTo(wx + ww, wy + wh);
        ctx.lineTo(wx, wy + wh);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();

        const pts2 = wave(0.12, 0.07, 0.03, 0.9);
        ctx.beginPath();
        pts2.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
        ctx.strokeStyle = `rgba(${OGr},.12)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
        ctx.strokeStyle = OG;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.strokeStyle = ca(OG, 0.25);
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(wx + ww, wy);
        ctx.lineTo(wx + ww, wy + wh);
        ctx.stroke();
        ctx.setLineDash([]);

        const axFs = Math.min(8, wh * 0.1);
        ctx.font = `400 ${axFs}px 'JetBrains Mono',monospace`;
        ctx.fillStyle = ca(SOFT, 0.55);
        ctx.textAlign = "center";
        ["–60s", "–45s", "–30s", "–15s", "NOW"].forEach((lbl, i) => {
          ctx.fillText(lbl, wx + (i / 4) * ww, wy + wh + axFs * 1.6);
        });
      });
    }

    /* ── Pipeline ────────────────────────────────────────────────── */
    function drawPipeline() {
      const sec = S(0.506, 0.218);
      clip(sec, () => {
        card(sec.x, sec.y, sec.w, sec.h, 10);

        const PIPES = [
          { lbl: "Voice Agent", color: OG, stages: ["Dial", "Qualify", "Capture", "Email"] },
          { lbl: "Lead Scraper", color: GD, stages: ["Scrape", "Enrich", "Send"] },
          { lbl: "Biz Analyzer", color: GN, stages: ["Audit", "Report", "Generate"] },
        ];

        const rowH = sec.h / PIPES.length;
        const lw = sec.w * 0.22;
        const stx = sec.x + lw + 4;
        const stw = sec.w - lw - 16;

        PIPES.forEach((pipe, row) => {
          const ry = sec.y + row * rowH;
          const rPad = rowH * 0.18;
          const rInH = rowH - 2 * rPad;
          const rMid = ry + rPad + rInH * 0.5;

          if (row > 0) {
            ctx.strokeStyle = "rgba(255,255,255,.065)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(sec.x + 10, ry);
            ctx.lineTo(sec.x + sec.w - 10, ry);
            ctx.stroke();
          }

          const lFs = Math.min(8.5, rInH * 0.26);
          ctx.font = `500 ${lFs}px 'JetBrains Mono',monospace`;
          ctx.fillStyle = ca(pipe.color, 0.75);
          ctx.textAlign = "left";
          ctx.fillText(fitText(pipe.lbl.toUpperCase(), lw - 8), sec.x + 10, rMid + lFs * 0.38);

          const ns = pipe.stages.length;
          const connW = 10;
          const sw = (stw - (ns - 1) * connW) / ns;
          const sh = rInH;

          pipe.stages.forEach((stage, s) => {
            const sx = stx + s * (sw + connW);
            const sy = ry + rPad;
            ctx.fillStyle = ca(pipe.color, 0.07);
            ctx.strokeStyle = ca(pipe.color, 0.25);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(sx, sy, sw, sh, 5);
            ctx.fill();
            ctx.stroke();

            const sFs = Math.min(8, sh * 0.3);
            ctx.font = `400 ${sFs}px 'JetBrains Mono',monospace`;
            ctx.fillStyle = ca(INK, 0.6);
            ctx.textAlign = "center";
            ctx.fillText(fitText(stage, sw - 6), sx + sw * 0.5, sy + sh * 0.6);

            if (s < ns - 1) {
              const cx2 = sx + sw;
              const cy2 = sy + sh * 0.5;
              ctx.strokeStyle = ca(pipe.color, 0.22);
              ctx.lineWidth = 1;
              ctx.setLineDash([2, 3]);
              ctx.beginPath();
              ctx.moveTo(cx2, cy2);
              ctx.lineTo(cx2 + connW, cy2);
              ctx.stroke();
              ctx.setLineDash([]);
              ctx.fillStyle = ca(pipe.color, 0.35);
              ctx.beginPath();
              ctx.moveTo(cx2 + connW - 3, cy2 - 2);
              ctx.lineTo(cx2 + connW, cy2);
              ctx.lineTo(cx2 + connW - 3, cy2 + 2);
              ctx.fill();
            }
          });

          const pkt = ST.pkts[row];
          const px2 = stx + pkt.p * stw;
          const py2 = rMid;
          const glR = 7;
          const gl = ctx.createRadialGradient(px2, py2, 0, px2, py2, glR);
          gl.addColorStop(0, ca(pipe.color, 0.22));
          gl.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gl;
          ctx.beginPath();
          ctx.arc(px2, py2, glR, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = pipe.color;
          ctx.beginPath();
          ctx.arc(px2, py2, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    /* ── Log strip ───────────────────────────────────────────────── */
    function drawLog() {
      const sec = S(0.737, 0.178);
      clip(sec, () => {
        card(sec.x, sec.y, sec.w, sec.h, 10);

        ctx.fillStyle = OG;
        ctx.beginPath();
        ctx.roundRect(sec.x, sec.y, 3, sec.h, [10, 0, 0, 10]);
        ctx.fill();

        const hdrFs = Math.min(9, sec.h * 0.12);
        ctx.font = `500 ${hdrFs}px 'JetBrains Mono',monospace`;
        ctx.fillStyle = ca(OG, 0.65);
        ctx.textAlign = "left";
        ctx.fillText("AGENT LOG", sec.x + 12, sec.y + sec.h * 0.2);

        ctx.strokeStyle = "rgba(255,255,255,.065)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sec.x + 12, sec.y + sec.h * 0.28);
        ctx.lineTo(sec.x + sec.w - 12, sec.y + sec.h * 0.28);
        ctx.stroke();

        const lineFs = Math.min(9.5, sec.h * 0.14);
        const lineH = (sec.h * 0.68) / 3;
        ctx.font = `400 ${lineFs}px 'JetBrains Mono',monospace`;

        const lns = [ST.logLines[0], ST.logLines[1], ST.logTyped];
        const alphas = [0.2, 0.38, 0.75];
        const colors = [DIM, DIM, OG];
        lns.forEach((ln, i) => {
          if (!ln) return;
          ctx.fillStyle = ca(colors[i], alphas[i]);
          const maxW = sec.w - 26;
          ctx.fillText(fitText(ln, maxW), sec.x + 12, sec.y + sec.h * 0.36 + i * lineH);
        });

        if (
          ST.logTyped.length >= ST.logNext.length &&
          ST.logNext &&
          Math.sin(performance.now() * 0.007) > 0
        ) {
          const tw = ctx.measureText(ST.logTyped).width;
          ctx.fillStyle = ca(OG, 0.6);
          ctx.fillRect(sec.x + 12 + Math.min(tw, sec.w - 30), sec.y + sec.h * 0.27 + 2 * lineH, 4, lineFs * 0.9);
        }
      });
    }

    /* ── Update ──────────────────────────────────────────────────── */
    function update() {
      if (!prefersReducedMotion) ST.phase += 0.026;
      const now = performance.now();
      ST.pkts.forEach((p, i) => {
        if (!prefersReducedMotion) p.p += 0.002 + i * 0.0007;
        if (p.p > 1.04) p.p = 0;
      });
      if (now - ST.lastTick > 3800) {
        ST.lastTick = now;
        ST.calls = Math.max(8, Math.min(18, ST.calls + Math.round((Math.random() - 0.35) * 2)));
        ST.leads += Math.round(Math.random() * 7 + 2);
      }
      if (ST.logTyping < ST.logNext.length) {
        ST.logTyping += 0.55;
        ST.logTyped = ST.logNext.slice(0, Math.floor(ST.logTyping));
      }
      if (now - ST.logTimer > 2600) {
        ST.logTimer = now;
        ST.logLines[0] = ST.logLines[1];
        ST.logLines[1] = ST.logTyped;
        ST.logNext = "▸  " + LOGS[ST.logIdx++ % LOGS.length];
        ST.logTyped = "";
        ST.logTyping = 0;
      }
    }

    function frame() {
      f++;
      update();
      ctx.clearRect(0, 0, W, H);
      drawBg();
      drawHUD();
      drawStats();
      drawWave();
      drawPipeline();
      drawLog();
    }

    function loop() {
      frame();
      raf = requestAnimationFrame(loop);
    }

    /* Run the rAF loop only while the canvas is on screen. */
    let ready = false;
    let running = false;
    let visible = true;

    function start() {
      if (!ready || running) return;
      if (prefersReducedMotion) {
        frame(); // single static render
        return;
      }
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              if (visible) start();
              else stop();
            },
            { threshold: 0.05 }
          )
        : null;
    if (io) io.observe(canvas.parentElement);

    const onResize = () => {
      stop();
      resize();
      if (visible) start();
      else if (ready) frame();
    };
    window.addEventListener("resize", onResize);

    ST.logLines[1] = "▸  agent.mesh.init() → READY ✓";

    const boot = () => {
      ready = true;
      resize();
      if (visible) start();
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(boot);
    } else {
      setTimeout(boot, 300);
    }

    return () => {
      stop();
      if (io) io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="hero-viz" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-viz-canvas" />
    </div>
  );
}
