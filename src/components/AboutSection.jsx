import RawHtml from "./RawHtml";

const html = `<!-- ABOUT -->
<section id="about">
  <div class="section-head reveal">
    <div>
      <div class="section-num">/ 01 &mdash; profile</div>
      <h2 class="section-title">Business-first <span class="outline">AI engineering</span></h2>
    </div>
    <p class="section-desc">I help teams turn repetitive work, messy data flows and slow follow-up processes into reliable AI systems clients can actually understand and use.</p>
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
      <p>I'm a <b>results-oriented AI/ML engineer</b> focused on practical automation: AI agents, voice workflows, predictive analytics, CRM automations and dashboards that make operational teams faster.</p>
      <p>My background spans <b>enterprise operations</b>, <b>AI consulting</b>, <b>pharma analytics</b> and <b>applied AI training</b>. That mix shaped how I work: understand the business workflow first, then build the smallest reliable system that produces measurable value.</p>
      <p>My sweet spot is <b>turning manual processes into production-ready AI workflows</b> with clean handoffs, clear monitoring and client-friendly documentation.</p>
      <div class="about-principles">
        <div><span>01</span><b>Automation Strategy</b><small>Map the real workflow before choosing tools.</small></div>
        <div><span>02</span><b>AI Engineering</b><small>Build agents, models and integrations that survive production use.</small></div>
        <div><span>03</span><b>Business Workflow Thinking</b><small>Explain technical systems in terms clients can act on.</small></div>
      </div>
      <div class="about-meta">
        <div class="cell"><div class="lbl">Location</div><div class="val">Karachi, Pakistan</div></div>
        <div class="cell"><div class="lbl">Status</div><div class="val" style="color:var(--green)">Employed &middot; open to select collaborations</div></div>
        <div class="cell"><div class="lbl">Email</div><div class="val"><a href="mailto:muneebgulfam5@gmail.com">muneebgulfam5@gmail.com</a></div></div>
        <div class="cell"><div class="lbl">GitHub</div><div class="val"><a href="https://github.com/developerMuneeb" target="_blank" rel="noopener noreferrer">@developerMuneeb</a></div></div>
      </div>
    </div>
  </div>
</section>`;

export default function AboutSection() {
  return <RawHtml html={html} />;
}
