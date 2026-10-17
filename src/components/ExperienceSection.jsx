import Reveal from "./motion/Reveal";
import ChapterHead from "./chapter/ChapterHead";
import { experience } from "../data/profile";

/**
 * Station "experience". Roles read as an editorial log; beside them the
 * 3D helix ribbon fills and turns so the role being read swings to the
 * front.
 */
export default function ExperienceSection() {
  return (
    <section id="experience" className="ch" data-station="experience">
      <div className="ch-copy">
        <ChapterHead
          index="02"
          label="Trajectory"
          lede="Roles across enterprise AI, consulting and analytics — what I worked on and how each one feeds AI automation delivery."
        >
          Experience <em>log</em>
        </ChapterHead>

        <ol className="xp-list">
          {experience.map((item) => (
            <Reveal as="li" className={`xp-item${item.current ? " is-current" : ""}`} key={`${item.organization}-${item.role}`} y={20}>
              <div className="xp-when">
                <span>{item.dates}</span>
                {item.current ? <span className="xp-now">Now</span> : null}
              </div>
              <h3 className="xp-role">{item.role}</h3>
              <div className="xp-org">
                {item.organization} <span>&middot; {item.type} &middot; {item.location}</span>
              </div>
              <p className="xp-desc">{item.summary}</p>
              <ul className="xp-points">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="ch-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="ch-stage" data-anchor aria-hidden="true" />
    </section>
  );
}
