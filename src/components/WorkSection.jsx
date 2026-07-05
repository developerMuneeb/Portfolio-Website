import { lazy, Suspense } from "react";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import { confidentialityNote, projects } from "../data/projects";

const ProjectWorkflowDiagram = lazy(() => import("./ProjectWorkflowDiagram"));

function DiagramFallback() {
  return <div className="pvis" aria-hidden="true"></div>;
}

function ProjectCaseCard({ project, index }) {
  return (
    <Reveal as="article" className="pcard" y={32}>
      <Suspense fallback={<DiagramFallback />}>
        <ProjectWorkflowDiagram project={project} />
      </Suspense>

      <div className="pb">
        <div className="pnum">
          <span className="pnb">P/{String(index + 1).padStart(2, "0")}</span>
          <span className="pnum-meta">
            {project.badge} <span className="pnum-sep" aria-hidden="true">·</span> {project.category}
          </span>
        </div>

        <h3 className="pt">
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
            {project.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>

        <details className="pdetail">
          <summary>View case notes</summary>
          <dl className="pdetail-grid">
            <div>
              <dt>Problem</dt>
              <dd>{project.details.problem}</dd>
            </div>
            <div>
              <dt>Solution</dt>
              <dd>{project.details.solution}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{project.details.role}</dd>
            </div>
            <div>
              <dt>Business value</dt>
              <dd>{project.details.value}</dd>
            </div>
          </dl>
        </details>

        <div className="pnote">
          <span className="pnote-dot" aria-hidden="true"></span>
          <span>
            <b>Production · Live</b> &middot; {project.outcome}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="work-section reference-work">
      <SectionDivider />
      <Reveal className="ref-work-head">
        <div className="sn">06</div>
        <div className="sk">Selected Projects</div>
        <h2 className="st">
          Confidential <span className="it">workflow</span> case studies
        </h2>
        <p className="sd">
          Real client and company work shown as clean system stories: what entered the workflow,
          what the automation decided, and what business value came out.
        </p>
      </Reveal>

      <Reveal className="confidentiality-note" delay={0.06}>
        <span>Confidentiality notice</span>
        <p>{confidentialityNote}</p>
      </Reveal>

      <Reveal className="work-proof" delay={0.1}>
        <span><b>4</b> detailed systems</span>
        <span><b>5-step</b> workflow stories</span>
        <span><b>100%</b> confidential-safe visuals</span>
      </Reveal>

      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCaseCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
