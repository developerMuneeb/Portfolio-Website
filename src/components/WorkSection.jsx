import { lazy, Suspense, useCallback, useRef, useState } from "react";
import GhostTitle from "./motion/GhostTitle";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import ReportModal from "./ReportModal";
import { AnalyzerSampleReport, FreightSampleReport, ScraperSampleReport, SuiteSampleReport } from "./SampleReports";
import { confidentialityNote, projects } from "../data/projects";

const ProjectWorkflowDiagram = lazy(() => import("./ProjectWorkflowDiagram"));

const SAMPLE_OUTPUT = {
  "freight-voice": {
    kicker: "Sample deliverable",
    title: "Call transcript and CRM summary",
    label: "call transcript",
    downloadHref: "/demo/freight-call-summary-sample.txt",
    downloadLabel: "Download summary (.txt)",
    Content: FreightSampleReport,
  },
  "lead-scraper": {
    kicker: "Sample deliverable",
    title: "Lead export and outreach sample",
    label: "lead export",
    downloadHref: "/demo/lead-scraper-sample-export.csv",
    downloadLabel: "Download leads (.csv)",
    Content: ScraperSampleReport,
  },
  "business-analyzer": {
    kicker: "Sample deliverable",
    title: "Acme Robotics - competitor and SEO report",
    label: "full report",
    downloadHref: "/demo/acme-robotics-seo-competitor-analysis.docx",
    downloadLabel: "Download full report (.docx)",
    Content: AnalyzerSampleReport,
  },
  "voice-suite": {
    kicker: "Sample deliverable",
    title: "Call log and routing sheet",
    label: "call log",
    downloadHref: "/demo/call-log-sample-export.csv",
    downloadLabel: "Download call log (.csv)",
    Content: SuiteSampleReport,
  },
};

function DiagramFallback() {
  return <div className="pvis" aria-hidden="true"></div>;
}

function ProjectCaseCard({ project, index, onOpenSample }) {
  const [building, setBuilding] = useState(false);
  const touchTimeout = useRef(null);

  const start = useCallback(() => {
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
      touchTimeout.current = null;
    }
    setBuilding(true);
  }, []);
  const stop = useCallback(() => setBuilding(false), []);
  const tap = useCallback(() => {
    start();
    touchTimeout.current = setTimeout(stop, 6000);
  }, [start, stop]);

  const sample = SAMPLE_OUTPUT[project.diagramId];
  const className = `pcard${project.featured ? " pcard-featured" : ""}`;

  return (
    <Reveal
      as="article"
      className={className}
      id={`project-${project.diagramId}`}
      aria-labelledby={`project-title-${project.diagramId}`}
      y={32}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      onTouchStart={tap}
    >
      <Suspense fallback={<DiagramFallback />}>
        <ProjectWorkflowDiagram project={project} building={building} />
      </Suspense>

      <div className="pb">
        <div className="pnum">
          <span className="pnb">P/{String(index + 1).padStart(2, "0")}</span>
          <span className="pnum-meta">
            {project.badge} <span className="pnum-sep" aria-hidden="true">&middot;</span> {project.category}
          </span>
        </div>

        <h3 className="pt" id={`project-title-${project.diagramId}`}>
          <span className="ac">{project.title.split(" ")[0]}</span>{" "}
          {project.title.split(" ").slice(1).join(" ")}
        </h3>

        <p className="pd">{project.summary}</p>

        <div className="pmeta">
          <div className="presult">
            {project.resultStats.map((stat, statIndex) => (
              <div className="presult-item" key={stat.label}>
                <div>
                  <div className="prv">{stat.value}</div>
                  <div className="prl">{stat.label}</div>
                </div>
                {statIndex < project.resultStats.length - 1 ? <span className="presult-divider" /> : null}
              </div>
            ))}
          </div>

          <div className="pstack">
            {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
        </div>

        {project.highlights ? (
          <div className="project-highlights" aria-label="Project highlights">
            {project.highlights.map((highlight) => (
              <span key={highlight}><i aria-hidden="true"></i>{highlight}</span>
            ))}
          </div>
        ) : null}

        <details className="pdetail">
          <summary>View case notes</summary>
          <dl className="pdetail-grid">
            <div><dt>Problem</dt><dd>{project.details.problem}</dd></div>
            <div><dt>Solution</dt><dd>{project.details.solution}</dd></div>
            <div><dt>My role</dt><dd>{project.details.role}</dd></div>
            <div><dt>Business value</dt><dd>{project.details.value}</dd></div>
          </dl>
        </details>

        <div className="pnote">
          <span className="pnote-dot" aria-hidden="true"></span>
          <span><b>Production / Live</b> &middot; {project.outcome}</span>
        </div>

        {sample ? (
          <button type="button" className="psample" onClick={() => onOpenSample(project.diagramId)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
              <path d="M14 2v5h5" />
              <path d="M9 13h6" />
              <path d="M9 17h4" />
            </svg>
            View sample {sample.label}
            <span className="psample-arrow" aria-hidden="true">&rarr;</span>
          </button>
        ) : null}
      </div>
    </Reveal>
  );
}

export default function WorkSection() {
  const [openId, setOpenId] = useState(null);
  const active = openId ? SAMPLE_OUTPUT[openId] : null;

  return (
    <section id="work" className="work-section reference-work">
      <SectionDivider />
      <GhostTitle text="Projects" />
      <Reveal className="ref-work-head">
        <div className="sn">06</div>
        <div className="sk">Selected Systems</div>
        <h2 className="st">AI systems built for <span className="it">real operations</span></h2>
        <p className="sd">
          Five production case studies showing the architecture, decisions, execution flow, and measurable business value behind each system.
        </p>
      </Reveal>

      <Reveal className="confidentiality-note" delay={0.06}>
        <span>Confidentiality notice</span>
        <p>{confidentialityNote}</p>
      </Reveal>

      <Reveal className="work-proof" delay={0.1}>
        <span><b>5</b> production systems</span>
        <span><b>3</b> agent tool routes</span>
        <span><b>38</b> automated tests on featured commerce AI</span>
      </Reveal>

      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCaseCard key={project.title} project={project} index={index} onOpenSample={setOpenId} />
        ))}
      </div>

      <ReportModal
        open={Boolean(active)}
        onClose={() => setOpenId(null)}
        kicker={active?.kicker}
        title={active?.title}
        downloadHref={active?.downloadHref}
        downloadLabel={active?.downloadLabel}
      >
        {active ? <active.Content /> : null}
      </ReportModal>
    </section>
  );
}
