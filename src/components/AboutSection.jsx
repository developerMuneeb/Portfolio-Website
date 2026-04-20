import RawHtml from "./RawHtml";

const html = `<!-- ABOUT -->
<section id="about">
  <div class="section-head reveal">
    <div>
      <div class="section-num">/ 01 &mdash; profile</div>
      <h2 class="section-title">About <span class="outline">me</span></h2>
    </div>
    <p class="section-desc">Engineer by training, builder by instinct. I turn fuzzy business problems into deployable ML systems and automations that run themselves.</p>
  </div>

  <div class="about-grid">
    <div class="about-portrait reveal">
      <span class="corner tl"></span>
      <span class="corner br"></span>
      <div class="identity-orbit orbit-a"></div>
      <div class="identity-orbit orbit-b"></div>
      <div class="identity-chip chip-ai">AI</div>
      <div class="identity-chip chip-ml">ML</div>
      <div class="identity-chip chip-ops">OPS</div>
      <div class="face">
        <div class="monogram">MM</div>
        <div class="identity-sub">AI ENGINEER</div>
      </div>
      <div class="strips"></div>
      <div class="tag">ID &middot; MUHAMMAD MUNEEB &middot; KHI-01</div>
    </div>
    <div class="about-body reveal">
      <p>I'm a <b>results-oriented AI/ML engineer</b> with a solid base in machine learning, deep learning, computer vision and agentic workflows &mdash; currently shipping AI into agribusiness and food-processing operations at <b>JBS Americas &amp; Europe</b>.</p>
      <p>Before JBS I built autonomous AI agents at <b>LA Consulting</b>, analyzed HR &amp; operational data at <b>Tabros Pharmaceuticals</b>, and trained at <b>Samsung Innovation Campus</b> on Vertex AI, OpenAI APIs and deep learning pipelines. I care about systems that ship, not demos that look good in screenshots.</p>
      <p>My sweet spot: <b>LLM-powered agents &middot; workflow automation &middot; predictive analytics &middot; cloud deployment</b>. If there's a manual process eating your team's time, I probably have an n8n graph for it.</p>
      <div class="about-meta">
        <div class="cell"><div class="lbl">Location</div><div class="val">Nazimabad, Karachi, PK</div></div>
        <div class="cell"><div class="lbl">Status</div><div class="val" style="color:var(--green)"> Employed &middot; open to collabs</div></div>
        <div class="cell"><div class="lbl">Email</div><div class="val"><a href="mailto:muneebgulfam5@gmail.com">muneebgulfam5@gmail.com</a></div></div>
        <div class="cell"><div class="lbl">GitHub</div><div class="val"><a href="https://github.com/developerMuneeb" target="_blank">@developerMuneeb</a></div></div>
      </div>
    </div>
  </div>
</section>`;

export default function AboutSection() {
  return <RawHtml html={html} />;
}
