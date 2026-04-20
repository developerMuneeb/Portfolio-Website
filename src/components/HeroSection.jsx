import RawHtml from "./RawHtml";

const waveDots = Array.from({ length: 92 }, (_, index) => {
  const x = 16 + index * 8.2;
  const y = 210 + Math.sin(index * 0.22) * 38 + Math.sin(index * 0.061) * 18;
  const size = 1.2 + (index % 7) * 0.18;
  const delay = (index % 18) * -0.16;
  const color = index < 30 ? "amber" : index < 62 ? "cyan" : "violet";
  return `<circle class="wave-dot ${color}" cx="${x.toFixed(1)}" cy="${y.toFixed(
    1
  )}" r="${size.toFixed(2)}" style="--d:${delay}s"></circle>`;
}).join("");

const farDots = Array.from({ length: 70 }, (_, index) => {
  const x = 20 + index * 10.6;
  const y = 96 + Math.sin(index * 0.34) * 28 + Math.cos(index * 0.13) * 16;
  const size = 0.8 + (index % 5) * 0.17;
  const delay = (index % 16) * -0.19;
  const color = index % 3 === 0 ? "violet" : index % 3 === 1 ? "cyan" : "amber";
  return `<circle class="far-dot ${color}" cx="${x.toFixed(1)}" cy="${y.toFixed(
    1
  )}" r="${size.toFixed(2)}" style="--d:${delay}s"></circle>`;
}).join("");

const html = `<!-- HERO -->
<section class="hero" id="top">
  <div>
    <span class="eyebrow"><span class="live"></span>AI &amp; AUTOMATION ENGINEER &middot; KARACHI, PK</span>
    <h1 class="hero-title">
      Building <span class="outline">intelligent</span><br>
      <span class="grad">agentic systems</span><br>
      that ship.
    </h1>
    <p class="hero-sub">
      I'm <b>Muhammad Muneeb</b> &mdash; an AI/ML engineer designing autonomous agents,
      predictive models and end-to-end automation pipelines. Currently
      <b>Associate AI Engineer at JBS Americas &amp; Europe</b>, helping agribusiness
      teams ship AI that actually moves metrics.
    </p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="#work">
        View selected work
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
      </a>
      <a class="btn btn-ghost" href="#contact">
        Get in touch
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16v12H4z"></path><path d="m4 7 8 6 8-6"></path></svg>
      </a>
    </div>
    <div class="hero-stats">
      <div><div class="s-val"><span class="grad">5+</span></div><div class="s-lbl">Roles shipped</div></div>
      <div><div class="s-val"><span class="grad">12+</span></div><div class="s-lbl">Production agents</div></div>
      <div><div class="s-val"><span class="grad">4</span></div><div class="s-lbl">Certifications</div></div>
    </div>
  </div>

  <div class="scene-wrap">
    <div class="hero-orb-scene" aria-hidden="true">
      <svg class="hero-orb-svg" viewBox="0 0 760 520" role="img">
        <defs>
          <linearGradient id="ringStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff5f6d" />
            <stop offset="22%" stop-color="#ffd166" />
            <stop offset="46%" stop-color="#62ffbd" />
            <stop offset="68%" stop-color="#55dcff" />
            <stop offset="100%" stop-color="#a77cff" />
          </linearGradient>
          <radialGradient id="glassBubble" cx="35%" cy="28%" r="70%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity=".92" />
            <stop offset="28%" stop-color="#55dcff" stop-opacity=".42" />
            <stop offset="64%" stop-color="#9f7bff" stop-opacity=".18" />
            <stop offset="100%" stop-color="#05060a" stop-opacity=".08" />
          </radialGradient>
          <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.35 0 0 0 0 0.86 0 0 0 0 1 0 0 0 .85 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g class="particle-field far">${farDots}</g>
        <g class="particle-field near">${waveDots}</g>

        <path class="wave-line line-a" d="M-18 238 C 88 164, 190 306, 292 224 S 498 126, 608 210 S 812 274, 826 172" />
        <path class="wave-line line-b" d="M-20 278 C 98 226, 194 326, 328 246 S 514 158, 644 244 S 778 292, 842 228" />

        <g class="orbital-core">
          <ellipse class="ring ring-one" cx="380" cy="235" rx="142" ry="76" />
          <ellipse class="ring ring-two" cx="380" cy="235" rx="122" ry="59" />
          <ellipse class="ring ring-three" cx="380" cy="235" rx="96" ry="43" />
          <ellipse class="ring ring-four" cx="380" cy="235" rx="154" ry="86" />
          <circle class="core-glow" cx="380" cy="235" r="72" />
          <circle class="core-hole" cx="380" cy="235" r="48" />
        </g>

        <g class="bubbles">
          <circle class="glass-bubble b1" cx="405" cy="117" r="28" />
          <circle class="glass-bubble b2" cx="440" cy="205" r="32" />
          <circle class="glass-bubble b3" cx="354" cy="312" r="23" />
          <circle class="glass-bubble b4" cx="478" cy="324" r="16" />
          <circle class="glass-bubble b5" cx="278" cy="330" r="13" />
        </g>
      </svg>
    </div>
    <div class="scene-frame"></div>
    <div class="scene-hud tl"><span class="live"></span>NEURAL_WAVE // LIVE</div>
    <div class="scene-hud tr">MUNEEB.AI</div>
    <div class="scene-hud bl">SIGNAL: 128K &middot; LATENT: FLOW</div>
    <div class="scene-hud br">&#8635; MOTION</div>
  </div>
</section>`;

export default function HeroSection() {
  return <RawHtml html={html} />;
}
