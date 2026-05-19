import RawHtml from "./RawHtml";

const html = `<!-- EXPERIENCE -->
<section id="experience">
  <div class="section-head reveal">
    <div>
      <div class="section-num">/ 02 &mdash; trajectory</div>
      <h2 class="section-title">Experience <span class="outline">log</span></h2>
    </div>
    <p class="section-desc">A chronological walk through the teams I've built with and the problems I've solved along the way, with organization names hidden for confidentiality.</p>
  </div>

  <div class="experience-proof reveal">
    <div><span>Current focus</span><strong>Production AI systems</strong></div>
    <div><span>Delivery style</span><strong>Workflow first, tools second</strong></div>
    <div><span>Public detail</span><strong>Company names hidden</strong></div>
  </div>

  <div class="timeline">
    <div class="tl-item current reveal">
      <div class="tl-when">Oct 2025 &mdash; Present <span class="cur">CURRENT</span></div>
      <div class="tl-role">Associate AI Engineer <span class="at">&middot; Confidential enterprise operations team</span></div>
      <p class="tl-desc">Developing and integrating AI solutions that lift operational efficiency across agribusiness and food-processing sectors. Co-designing ML models for predictive analytics and process optimization, and helping roll out AI agents + automated workflows to international teams.</p>
      <div class="tl-tags"><span>Agentic Workflows</span><span>Predictive Analytics</span><span>MLOps</span><span>Cross-Team Delivery</span></div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-when">May 2025 &mdash; Oct 2025</div>
      <div class="tl-role">Agentic AI Engineer <span class="at">&middot; Confidential AI consulting team</span></div>
      <p class="tl-desc">Contributed to building autonomous AI agents capable of complex decision-making and multi-step problem solving. Integrated reasoning, planning and interaction layers; designed robust agent workflows; owned the testing + behavior-reliability loop.</p>
      <div class="tl-tags"><span>LLM Agents</span><span>Planning &amp; Reasoning</span><span>Eval Harness</span><span>OpenAI API</span></div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-when">Dec 2024 &mdash; May 2025</div>
      <div class="tl-role">Officer, HR Analytics <span class="at">&middot; Confidential pharma analytics team</span></div>
      <p class="tl-desc">Analyzed operational and HR datasets in Excel, Power BI and Tableau; built dynamic KPIs and leadership dashboards; presented statistical findings that shifted workforce metrics.</p>
      <div class="tl-tags"><span>Power BI</span><span>Tableau</span><span>KPI Dashboards</span><span>Statistical Analysis</span></div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-when">Oct 2024 &mdash; Dec 2024</div>
      <div class="tl-role">AI &amp; ML Trainee <span class="at">&middot; Applied AI training program</span></div>
      <p class="tl-desc">Hands-on training across Scikit-learn, TensorFlow and PyTorch. Exposure to Vertex AI, OpenAI APIs and model-deployment strategies on GCP.</p>
      <div class="tl-tags"><span>TensorFlow</span><span>PyTorch</span><span>Vertex AI</span><span>Deployment</span></div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-when">Apr 2024 &mdash; Jul 2024</div>
      <div class="tl-role">Data Analyst Intern <span class="at">&middot; Confidential analytics internship</span></div>
      <p class="tl-desc">Analyzed structured business data with Python + SQL; built Tableau visualizations that made reporting cycles faster for the ops team.</p>
      <div class="tl-tags"><span>Python</span><span>SQL</span><span>Tableau</span></div>
    </div>
  </div>
</section>`;

export default function ExperienceSection() {
  return <RawHtml html={html} />;
}
