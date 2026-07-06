import { BuildLine, CountLabel, GaugeFill, TypeLine, useStatusPhase } from "./motion/SceneReveal";

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
 * Small ambient loops (waveform, scan ring, live/pulse dots) run always —
 * they're cheap "this system is alive" cues. The bigger reveal moments
 * (chat bubbles typing, rows filling in, the gauge sweeping, findings
 * appearing) are saved for hover/tap via the `building` flag, so the
 * card reads calm and complete at rest and "assembles itself" as a
 * reward for engaging with it. Everything settles instantly under
 * prefers-reduced-motion.
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
function FreightScene({ building }) {
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
          <BuildLine as="span" className="bubble ai" building={building} delay={0.05}>
            <TypeLine text="What are you shipping, and where is it headed?" active={building} delay={0.2} />
          </BuildLine>
          <BuildLine as="span" className="bubble lead" building={building} delay={1.6}>
            <TypeLine text="45,000 lbs, dry van — Chicago to Los Angeles." active={building} delay={1.75} />
          </BuildLine>
          <BuildLine as="span" className="bubble ai" building={building} delay={3.15}>
            <TypeLine text="Got it. When do you need pickup?" active={building} delay={3.3} />
          </BuildLine>
        </div>
        <div className="scene-row">
          <BuildLine as="span" className="mini-tag done-tag" building={building} delay={4.3}>
            {Icon.check} CRM → Qualified
          </BuildLine>
          <BuildLine as="span" className="mini-tag done-tag" building={building} delay={4.6}>
            {Icon.mail} Summary emailed to sales
          </BuildLine>
        </div>
      </div>
    </div>
  );
}

/* ---------- P2 · Lead Scraper: lead list filling itself ---------- */
const LEAD_ROWS = [
  ["TechCorp Inc.", "Sarah M. · Head of Ops"],
  ["Nova Logistics", "James R. · Founder"],
  ["BrightHire Co.", "Alina K. · VP Sales"],
  ["Vertex Retail", "Omar S. · COO"],
];

function ScraperScene({ building }) {
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
        {LEAD_ROWS.map(([company, contact], i) => (
          <BuildLine as="div" className="lead-row" building={building} delay={0.15 + i * 0.3} key={company}>
            <span>{company}</span>
            <span>{contact}</span>
            <span className="lead-status">{Icon.check} Ready</span>
          </BuildLine>
        ))}
      </div>
      <div className="scene-row">
        <BuildLine as="span" className="mini-tag stat-tag" building={building} delay={1.6}>
          <b>
            <CountLabel target={3412} active={building} delay={1.7} duration={1.1} />
          </b>{" "}
          leads this week
        </BuildLine>
        <BuildLine as="span" className="mini-tag done-tag" building={building} delay={2.0}>
          {Icon.mail} Personalized email queued → Sarah, TechCorp
        </BuildLine>
      </div>
    </div>
  );
}

/* ---------- P3 · Business Analyzer: audit generating ---------- */
function AnalyzerScene({ building }) {
  return (
    <div className="scene scene-analyzer">
      <div className="url-bar">
        {Icon.link}
        <span className="url-text">
          <TypeLine text="https://acme-robotics.com" active={building} delay={0.1} charsPerSecond={24} />
        </span>
        <BuildLine as="span" className="mini-tag analyze-tag" building={building} delay={1.15}>
          Analyze
        </BuildLine>
      </div>
      <div className="scene-row analyzer-body">
        <div className="gauge-wrap">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle className="gauge-track" cx="60" cy="60" r="50" />
            <GaugeFill target={82} active={building} delay={1.5} duration={1.2} />
          </svg>
          <div className="gauge-num">
            <b>
              <CountLabel target={82} active={building} delay={1.5} duration={1.2} />
            </b>
            <small>opportunity score</small>
          </div>
        </div>
        <div className="findings">
          <BuildLine as="span" className="finding" building={building} delay={2.8}>
            {Icon.check} 7 quick SEO wins found
          </BuildLine>
          <BuildLine as="span" className="finding" building={building} delay={3.1}>
            {Icon.check} Fix first: homepage speed
          </BuildLine>
          <BuildLine as="span" className="finding" building={building} delay={3.4}>
            {Icon.check} Competitor gap: pricing page
          </BuildLine>
        </div>
      </div>
      <div className="scene-row">
        <BuildLine as="span" className="mini-tag done-tag" building={building} delay={4.1}>
          {Icon.doc} Plain-English report ready
        </BuildLine>
        <BuildLine as="span" className="mini-tag done-tag" building={building} delay={4.4}>
          {Icon.spark} Ad copy + video script included
        </BuildLine>
      </div>
    </div>
  );
}

/* ---------- P4 · n8n + Synthflow Suite: sheet drives calls ---------- */
function SuiteScene({ building }) {
  const phase = useStatusPhase(building, { toCalling: 900, toDone: 1900 });

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
          <span className={`sheet-status${phase === "done" ? " is-done" : ""}`}>
            {phase === "pending" ? "Pending" : null}
            {phase === "calling" ? "Calling…" : null}
            {phase === "done" ? <>{Icon.check} Done</> : null}
          </span>
        </div>
        <div className="sheet-row">
          <span>K. Osei</span>
          <span>+1 646 ···</span>
          <span className="sheet-status">Queued</span>
        </div>
      </div>

      <div className="scene-col route-col">
        <BuildLine as="span" className="mini-tag call-tag" building={building} delay={0.2}>
          {Icon.phone} AI places the call
        </BuildLine>
        <div className="route-branches">
          <BuildLine as="span" className="mini-tag done-tag" building={building} delay={1.6}>
            {Icon.check} Answered → result logged
          </BuildLine>
          <BuildLine as="span" className="mini-tag retry-tag" building={building} delay={1.95}>
            Busy → retry in 2h
          </BuildLine>
          <BuildLine as="span" className="mini-tag retry-tag" building={building} delay={2.3}>
            Callback → scheduled
          </BuildLine>
        </div>
        <BuildLine as="span" className="mini-tag stat-tag" building={building} delay={2.9}>
          Sheet updates itself · full call history kept
        </BuildLine>
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

export default function ProjectWorkflowDiagram({ project, building = false }) {
  const Scene = SCENES[project.diagramId] ?? FreightScene;
  const story = project.story;

  return (
    <div className={`pvis${building ? " is-building" : ""}`} role="img" aria-label={`${project.title} — how it works`}>
      <div className="story-flow">
        <div className="story-head">
          <span className="story-label">{story?.label ?? "How it works"}</span>
          <span className="story-live">
            <span className="story-live-dot" aria-hidden="true"></span>
            Live system
          </span>
        </div>

        <Scene building={building} />

        {story?.result ? (
          <BuildLine as="div" className="story-result" building={building} delay={4.9}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 3 3 5-6" />
            </svg>
            <TypeLine text={story.result} active={building} delay={5.1} charsPerSecond={44} />
          </BuildLine>
        ) : null}
      </div>
    </div>
  );
}
