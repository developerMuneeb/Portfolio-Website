import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import GhostTitle from "./motion/GhostTitle";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import { experience } from "../data/profile";

function ExperienceItem({ item, index }) {
  return (
    <Reveal
      as="article"
      className={`tl-item${item.current ? " current" : ""}`}
      delay={Math.min(index * 0.05, 0.2)}
      y={20}
    >
      <div className="tl-when">
        {item.dates}
        {item.current ? <span className="cur">CURRENT</span> : null}
      </div>
      <div className="tl-role">
        {item.role} <span className="at">&middot; {item.organization}</span>
      </div>
      <div className="tl-meta-line">
        <span>{item.type}</span>
        <span>{item.location}</span>
        <span>{item.duration}</span>
      </div>
      <p className="tl-desc">{item.summary}</p>
      <ul className="tl-highlights">
        {item.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="tl-tags">
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </Reveal>
  );
}

export default function ExperienceSection() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.82", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <section id="experience">
      <SectionDivider />
      <GhostTitle text="Experience" direction={-1} />
      <Reveal className="section-head">
        <div>
          <div className="section-num">/ 02 &mdash; trajectory</div>
          <h2 className="section-title">
            Experience <span className="outline">log</span>
          </h2>
        </div>
        <p className="section-desc">
          Public LinkedIn roles rewritten into portfolio language: what I worked on,
          where the credibility comes from, and how each role supports AI automation delivery.
        </p>
      </Reveal>

      <Reveal className="experience-proof" delay={0.08}>
        <div><span>Current role</span><strong>Associate AI Engineer</strong></div>
        <div><span>Public employers</span><strong>JBS, LA Consulting, TABROS</strong></div>
        <div><span>Delivery base</span><strong>AI, analytics, data engineering</strong></div>
      </Reveal>

      <div className="timeline" ref={timelineRef}>
        {/* Gradient line that draws itself in as you scroll the timeline */}
        <motion.span
          className="timeline-progress"
          aria-hidden="true"
          style={{ scaleY: lineScale }}
        />
        {experience.map((item, index) => (
          <ExperienceItem key={`${item.organization}-${item.role}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
