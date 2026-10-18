import { createRef, lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "./motion/Reveal";
import ScrambleText from "./motion/ScrambleText";
import SplitWords from "./motion/SplitWords";
import ReportModal from "./ReportModal";
import { AnalyzerSampleReport, FreightSampleReport, ScraperSampleReport, SuiteSampleReport } from "./SampleReports";
import { confidentialityNote, projects } from "../data/projects";
import { useDeckEnabled, useStickyTop } from "../hooks/useStackDeck";
import { EASE } from "./motion/ease";

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

// Cards pin below the sticky chapter bar (nav + bar + breathing room)
const DECK_HEADROOM = 150;

const pad = (n) => String(n).padStart(2, "0");

/**
 * Station "work": a pinned intro where the 3D carousel of project screens
 * turns as you scroll; the index on the left tracks the project in front.
 * Without the 3D world it collapses to a normal header + index.
 */
function WorkGallery() {
  const ref = useRef(null);
  // Same window as the 3D station hold (start at 30% / end at 70% of viewport)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.3", "end 0.7"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.round(p * (projects.length - 1));
    setActive((prev) => (prev === next ? prev : next));
  });

  const jump = (index) => {
    document.getElementById(`project-${projects[index].diagramId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="wk-gallery" ref={ref} data-station="work">
      <div className="wk-sticky">
        <header className="wk-head">
          <ScrambleText as="div" className="ch-kicker" text="(06) — Selected systems" />
          <SplitWords className="ch-title">
            AI systems for <em>real operations</em>
          </SplitWords>
          <p className="ch-lede">
            Five production case studies, with the architecture, decisions and measurable value behind each system.
          </p>
        </header>

        <div className="wk-stage" data-anchor aria-hidden="true" />

        <ol className="wk-index" aria-label="Case studies">
          {projects.map((project, index) => (
            <li key={project.diagramId} className={index === active ? "is-active" : undefined}>
              <button type="button" onClick={() => jump(index)}>
                <span className="wk-index-num">P/{pad(index + 1)}</span>
                <span className="wk-index-title">{project.title}</span>
                <span className="wk-index-cat">{project.category}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="wk-meta">
          <p>
            <span>Confidentiality</span> {confidentialityNote}
          </p>
          <ul>
            <li><b>5</b> production systems</li>
            <li><b>3</b> agent tool routes</li>
            <li><b>38</b> automated tests</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DiagramFallback() {
  return <div className="pvis" aria-hidden="true"></div>;
}

/**
 * Covered-card effect: as the next card slides up over this one, this one
 * recedes — scales back, tips away, and dims under a shade.
 */
function RecedeLayer({ nextRef, children }) {
  const { scrollYProgress } = useScroll({ target: nextRef, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const shade = useTransform(scrollYProgress, [0.15, 1], [0, 0.62]);

  return (
    <motion.div className="pcard-recede" style={{ scale, rotateX, transformPerspective: 1600, transformOrigin: "50% 0%" }}>
      {children}
      <motion.div className="pcard-shade" style={{ opacity: shade }} aria-hidden="true" />
    </motion.div>
  );
}

/**
 * Which project is "on top" — from natural (un-stuck) layout positions, so
 * it stays correct while cards are pinned. Also stamps html[data-project]
 * so the shader backdrop shifts mood per project.
 */
function useActiveProject(listRef, pinRefs) {
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();

  // Card tops in page space, measured on mount and resize only: measuring
  // inside the scroll handler forced a layout on every scrolled frame.
  const starts = useRef([]);

  const compute = useCallback(() => {
    const line = window.scrollY + window.innerHeight * 0.55;
    let next = 0;
    starts.current.forEach((top, i) => {
      if (top <= line) next = i;
    });
    setActive((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const measure = () => {
      const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
      let top = list.getBoundingClientRect().top + window.scrollY;
      starts.current = pinRefs.map((ref) => {
        const start = ref.current ? top : Infinity;
        top += (ref.current?.offsetHeight ?? 0) + gap;
        return start;
      });
      compute();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [listRef, pinRefs, compute]);

  useMotionValueEvent(scrollY, "change", compute);

  useEffect(() => {
    document.documentElement.dataset.project = projects[active]?.diagramId ?? "";
  }, [active]);
  useEffect(() => () => delete document.documentElement.dataset.project, []);

  return active;
}

/** Sticky progress bar for the deck: rolling P/0x, project name, progress. */
function WorkChapter({ deckRef, active }) {
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ["start 40%", "end end"] });
  const fill = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });
  const project = projects[active];

  return (
    <div className="work-chapter" aria-hidden="true">
      <div className="work-chapter-inner">
        <span className="work-chapter-num">
          P/
          <span className="work-chapter-roll">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {pad(active + 1)}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
        <span className="work-chapter-title">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {project?.title}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="work-chapter-track">
          <motion.span style={{ scaleX: fill }} />
        </span>
        <span className="work-chapter-total">{pad(projects.length)}</span>
      </div>
    </div>
  );
}

function ProjectCaseCard({ project, index, onOpenSample, stacked, pinRef, nextRef }) {
  const [building, setBuilding] = useState(false);
  const top = useStickyTop(pinRef, stacked, DECK_HEADROOM);
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

  const card = (
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
      data-cursor="Explore"
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
          <button type="button" className="psample" data-cursor="Open" onClick={() => onOpenSample(project.diagramId)}>
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

  return (
    <div className="pcard-pin" ref={pinRef} style={stacked ? { top } : undefined}>
      {stacked && nextRef ? <RecedeLayer nextRef={nextRef}>{card}</RecedeLayer> : card}
    </div>
  );
}

export default function WorkSection() {
  const [openId, setOpenId] = useState(null);
  const active = openId ? SAMPLE_OUTPUT[openId] : null;
  const stacked = useDeckEnabled();
  const deckRef = useRef(null);
  const listRef = useRef(null);
  const pinRefs = useMemo(() => projects.map(() => createRef()), []);
  const activeProject = useActiveProject(listRef, pinRefs);

  return (
    <section id="work" className="work-section reference-work">
      <WorkGallery />

      <div className={`work-deck${stacked ? " is-stacked" : ""}`} ref={deckRef} data-station="deck">
        {stacked ? <WorkChapter deckRef={deckRef} active={activeProject} /> : null}
        <div className="projects" ref={listRef}>
          {projects.map((project, index) => (
            <ProjectCaseCard
              key={project.title}
              project={project}
              index={index}
              onOpenSample={setOpenId}
              stacked={stacked}
              pinRef={pinRefs[index]}
              nextRef={pinRefs[index + 1]}
            />
          ))}
        </div>
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
