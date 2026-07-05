/**
 * Bespoke "real product" scenes — one per project, each designed to
 * look like the actual application in use so a non-technical client
 * immediately recognises what was built:
 *
 *  freight-voice     → a live AI phone call with transcript + CRM update
 *  lead-scraper      → a lead list filling itself + outreach queue
 *  business-analyzer → a website audit generating a score + report
 *  voice-suite       → a spreadsheet row driving a call + writeback
 *
 * All motion is looped CSS (staggered fade-ins, waveform, gauge) —
 * final keyframes are always the "complete" state so reduced-motion
 * users see the finished scene.
 */

const Icon = {
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5 9-10" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
};

/* ---------- P1 · Freight AI Voice Agent: live call scene ---------- */
function FreightScene() {
  return (
    <div className="scene scene-freight">
      <div className="mini-card call-card">
        <div className="mini-card-head">
          <span className="mini-avatar">{Icon.phone}</span>
          <span>
            <b>AI agent — outbound call</b>
            <small>New freight lead · Chicago</small>
          </span>
          <span className="mini-tag live-tag">
            <i></i>00:42
          </span>
        </div>
        <div className="waveform" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} style={{ animationDelay: `${(i % 7) * -0.14}s` }}></span>
          ))}
        </div>
        <div className="call-foot">Natural conversation · handles objections</div>
      </div>

      <div className="scene-col">
        <div className="mini-card transcript">
          <span className="bubble ai anim-1">What are you shipping, and where is it headed?</span>
          <span className="bubble lead anim-2">45,000 lbs, dry van — Chicago to Los Angeles.</span>
          <span className="bubble ai anim-3">Got it. When do you need pickup?</span>
        </div>
        <div className="scene-row">
          <span className="mini-tag done-tag anim-4">{Icon.check} CRM → Qualified</span>
          <span className="mini-tag done-tag anim-5">{Icon.mail} Summary emailed to sales</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- P2 · Lead Scraper: lead list filling itself ---------- */
const LEAD_ROWS = [
  ["TechCorp Inc.", "Sarah M. · Head of Ops", "anim-1"],
  ["Nova Logistics", "James R. · Founder", "anim-2"],
  ["BrightHire Co.", "Alina K. · VP Sales", "anim-3"],
  ["Vertex Retail", "Omar S. · COO", "anim-4"],
];

function ScraperScene() {
  return (
    <div className="scene scene-scraper">
      <div className="scan-bar">
        <span className="scan-ring" aria-hidden="true"></span>
        Scanning job boards — day &amp; night
        <span className="mini-tag live-tag">
          <i></i>live
        </span>
      </div>
      <div className="mini-card lead-table">
        <div className="lead-row lead-head">
          <span>Company</span>
          <span>Contact found</span>
          <span>Status</span>
        </div>
        {LEAD_ROWS.map(([company, contact, anim]) => (
          <div className={`lead-row ${anim}`} key={company}>
            <span>{company}</span>
            <span>{contact}</span>
            <span className="lead-status">{Icon.check} Ready</span>
          </div>
        ))}
      </div>
      <div className="scene-row">
        <span className="mini-tag stat-tag anim-4">
          <b>3,412</b> leads this week
        </span>
        <span className="mini-tag done-tag anim-5">{Icon.mail} Personalized email queued → Sarah, TechCorp</span>
      </div>
    </div>
  );
}

/* ---------- P3 · Business Analyzer: audit generating ---------- */
function AnalyzerScene() {
  return (
    <div className="scene scene-analyzer">
      <div className="url-bar">
        {Icon.link}
        <span className="url-text">https://acme-robotics.com</span>
        <span className="mini-tag analyze-tag">Analyze</span>
      </div>
      <div className="scene-row analyzer-body">
        <div className="gauge-wrap">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle className="gauge-track" cx="60" cy="60" r="50" />
            <circle className="gauge-fill" cx="60" cy="60" r="50" />
          </svg>
          <div className="gauge-num">
            <b>82</b>
            <small>opportunity score</small>
          </div>
        </div>
        <div className="findings">
          <span className="finding anim-1">{Icon.check} 7 quick SEO wins found</span>
          <span className="finding anim-2">{Icon.check} Fix first: homepage speed</span>
          <span className="finding anim-3">{Icon.check} Competitor gap: pricing page</span>
        </div>
      </div>
      <div className="scene-row">
        <span className="mini-tag done-tag anim-4">{Icon.doc} Plain-English report ready</span>
        <span className="mini-tag done-tag anim-5">{Icon.spark} Ad copy + video script included</span>
      </div>
    </div>
  );
}

/* ---------- P4 · n8n + Synthflow Suite: sheet drives calls ---------- */
function SuiteScene() {
  return (
    <div className="scene scene-suite">
      <div className="mini-card sheet-card">
        <div className="sheet-row sheet-head">
          <span>Lead</span>
          <span>Number</span>
          <span>Status</span>
        </div>
        <div className="sheet-row">
          <span>D. Carter</span>
          <span>+1 415 ···</span>
          <span className="sheet-status is-done">{Icon.check} Done</span>
        </div>
        <div className="sheet-row is-active">
          <span>M. Alvarez</span>
          <span>+1 312 ···</span>
          <span className="sheet-status status-cycle">
            <em className="st-1">Pending</em>
            <em className="st-2">Calling…</em>
            <em className="st-3">{Icon.check} Done</em>
          </span>
        </div>
        <div className="sheet-row">
          <span>K. Osei</span>
          <span>+1 646 ···</span>
          <span className="sheet-status">Queued</span>
        </div>
      </div>

      <div className="scene-col route-col">
        <span className="mini-tag call-tag anim-1">{Icon.phone} AI places the call</span>
        <div className="route-branches">
          <span className="mini-tag done-tag anim-2">{Icon.check} Answered → result logged</span>
          <span className="mini-tag retry-tag anim-3">Busy → retry in 2h</span>
          <span className="mini-tag retry-tag anim-4">Callback → scheduled</span>
        </div>
        <span className="mini-tag stat-tag anim-5">Sheet updates itself · full call history kept</span>
      </div>
    </div>
  );
}

const SCENES = {
  "freight-voice": FreightScene,
  "lead-scraper": ScraperScene,
  "business-analyzer": AnalyzerScene,
  "voice-suite": SuiteScene,
};

export default function ProjectWorkflowDiagram({ project }) {
  const Scene = SCENES[project.diagramId] ?? FreightScene;
  const story = project.story;

  return (
    <div className="pvis" role="img" aria-label={`${project.title} — how it works`}>
      <div className="story-flow">
        <div className="story-head">
          <span className="story-label">{story?.label ?? "How it works"}</span>
          <span className="story-live">
            <span className="story-live-dot" aria-hidden="true"></span>
            Live system
          </span>
        </div>

        <Scene />

        {story?.result ? (
          <div className="story-result">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 3 3 5-6" />
            </svg>
            <span>{story.result}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
