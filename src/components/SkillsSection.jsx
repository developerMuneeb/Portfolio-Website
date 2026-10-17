import Reveal from "./motion/Reveal";
import ChapterHead from "./chapter/ChapterHead";
import { skillGroups } from "../data/skills";

const ICON_FILES = { "c++": "cpp" };
const iconPath = (icon) => `/tech-icons/${ICON_FILES[icon] ?? icon}.svg`;

const logos = skillGroups
  .flatMap((group) => group.items)
  .filter((item, index, items) => item.icon && items.findIndex((candidate) => candidate.label === item.label) === index);

/**
 * Station "skills". Capability groups as editorial rows; the stage hosts
 * the 3D logo sphere (or a static logo grid without the 3D world).
 */
export default function SkillsSection() {
  return (
    <section id="skills" className="ch" data-station="skills">
      <div className="ch-copy">
        <ChapterHead
          index="04"
          label="Toolkit"
          lede="A focused stack for client-ready workflow automation, AI agents, analytics and full-stack AI applications."
        >
          Tools for <em>reliable AI systems</em>
        </ChapterHead>

        <ol className="sk-groups">
          {skillGroups.map((group, index) => (
            <Reveal as="li" className="sk-group" key={group.title} y={18} delay={Math.min(index * 0.05, 0.15)}>
              <div className="sk-head">
                <span className="ch-row-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="ch-mini">{group.kicker}</span>
              </div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="ch-tags">
                {group.items.map((item) => (
                  <span key={item.label}>{item.label}</span>
                ))}
              </div>
              <p className="sk-outcome">
                <span>Outcome</span> {group.outcome}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="ch-stage" data-anchor aria-hidden="true">
        <div className="ch-fallback sk-logos">
          {logos.map((item) => (
            <img key={item.label} src={iconPath(item.icon)} alt="" title={item.label} width="40" height="40" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
