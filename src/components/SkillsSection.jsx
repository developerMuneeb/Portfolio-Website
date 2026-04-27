import { skillGroups } from "../data/skills";

const skills = skillGroups.flatMap((group) => group.items);
const firstRow = skills.filter((_, index) => index % 2 === 0);
const secondRow = skills.filter((_, index) => index % 2 === 1);
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
    </div>
  );
}

function IconTrack({ items, reverse = false, speed = 30 }) {
  return (
    <div className={`stack-icon-rail ${reverse ? "is-reverse" : ""}`} style={{ "--speed": `${speed}s` }}>
      <div className="stack-icon-track">
        {items.map((item) => (
          <SkillIcon key={item.label} label={item.label} icon={item.icon} />
        ))}
        {items.map((item) => (
          <SkillIcon key={`${item.label}-clone-a`} label={item.label} icon={item.icon} isClone />
        ))}
        {items.map((item) => (
          <SkillIcon key={`${item.label}-clone-b`} label={item.label} icon={item.icon} isClone />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills">
      <div className="section-head reveal">
        <div>
          <div className="section-num">/ 03 &mdash; toolkit</div>
          <h2 className="section-title">
            Stack and <span className="outline">capabilities</span>
          </h2>
        </div>
        <p className="section-desc">
          A focused toolkit for AI engineering, automation, and production delivery.
        </p>
      </div>

      <div className="skills-stage reveal">
        <div className="skills-depth" aria-hidden="true">
          <span className="depth-scan"></span>
        </div>
        <div className="skills-marquee">
          <IconTrack items={firstRow} speed={28} />
          <IconTrack items={secondRow} reverse speed={34} />
        </div>
      </div>
    </section>
  );
}
