import { skillGroups } from "../data/skills";

const skills = skillGroups
  .flatMap((group) => group.items)
  .filter((item, index, items) => item.icon && items.findIndex((candidate) => candidate.label === item.label) === index);
const proofPoints = [
  { value: "AI", label: "Agents" },
  { value: "n8n", label: "Workflow automation" },
  { value: "BI", label: "Analytics" },
  { value: "API", label: "Deployment" },
];
const iconFiles = {
  "c++": "cpp",
};

function iconPath(icon) {
  return `/tech-icons/${iconFiles[icon] ?? icon}.svg`;
}

function SkillIcon({ label, icon, isClone = false }) {
  return (
    <div className="stack-icon-item" title={label} aria-hidden={isClone ? "true" : undefined}>
      <img
        className="stack-icon"
        src={iconPath(icon)}
        alt=""
        width="34"
        height="34"
        loading="lazy"
        decoding="async"
      />
      <span>{label}</span>
    </div>
  );
}

function TechRail({ items }) {
  return (
    <div className="stack-icon-rail" aria-label="Technology stack logo rail">
      <div className="stack-icon-track">
        {items.map((item, index) => (
          <SkillIcon key={`${item.label}-${index}`} label={item.label} icon={item.icon} />
        ))}
        {items.map((item, index) => (
          <SkillIcon key={`${item.label}-clone-${index}`} label={item.label} icon={item.icon} isClone />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-head reveal">
        <div>
          <div className="section-num">/ 03 &mdash; toolkit</div>
          <h2 className="section-title">
            Tools I use to build <span className="outline">reliable AI systems</span>
          </h2>
        </div>
        <p className="section-desc">
          A focused stack for building client-ready automation, AI agents, analytics, and deployment workflows.
        </p>
      </div>

      <div className="skills-proof-strip reveal">
        {proofPoints.map((point) => (
          <div className="skills-proof" key={point.label}>
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </div>
        ))}
      </div>

      <div className="skill-category-grid">
        {skillGroups.map((group, index) => (
          <article className="skill-category reveal" key={group.title} style={{ "--card-index": index + 1 }}>
            <div className="skill-category-kicker">{group.kicker}</div>
            <div className="skill-card-index">{String(index + 1).padStart(2, "0")}</div>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <div className="skill-outcome">
              <span>Outcome</span>
              <strong>{group.outcome}</strong>
            </div>
            <div className="skill-category-tools">
              {group.items.map((item) => (
                <span key={item.label}>{item.label}</span>
              ))}
            </div>
            <div className="skill-proof">{group.proof}</div>
          </article>
        ))}
      </div>

      <div className="skills-stage reveal">
        <div className="skills-stage-label">Core technology stack</div>
        <TechRail items={skills} />
      </div>
    </section>
  );
}
