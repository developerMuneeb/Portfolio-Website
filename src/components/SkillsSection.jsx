import GhostTitle from "./motion/GhostTitle";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import TiltCard from "./motion/TiltCard";
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

const viewport = { once: true, margin: "0px 0px -8% 0px" };
const EASE = [0.2, 0.8, 0.2, 1];

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
      <SectionDivider />
      <GhostTitle text="Stack" />
      <Reveal className="section-head">
        <div>
          <div className="section-num">/ 04 &mdash; toolkit</div>
          <h2 className="section-title">
            Tools I use to build <span className="outline">reliable AI systems</span>
          </h2>
        </div>
        <p className="section-desc">
          A focused stack for building client-ready workflow automation, AI agents, analytics, and
          full-stack AI applications.
        </p>
      </Reveal>

      <Reveal className="skills-proof-strip" delay={0.06}>
        {proofPoints.map((point) => (
          <div className="skills-proof" key={point.label}>
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </div>
        ))}
      </Reveal>

      <div className="skill-category-grid">
        {skillGroups.map((group, index) => (
          <TiltCard
            as="article"
            className="skill-category"
            key={group.title}
            maxTilt={4}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.28), ease: EASE }}
          >
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
          </TiltCard>
        ))}
      </div>

      <Reveal className="skills-stage" delay={0.1}>
        <div className="skills-stage-label">Core technology stack</div>
        <TechRail items={skills} />
      </Reveal>
    </section>
  );
}
