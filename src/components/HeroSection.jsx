import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./motion/MagneticButton";
import RotatingText from "./motion/RotatingText";
import CountUp from "./motion/CountUp";
import ContainedAgentVisual from "./ContainedAgentVisual";
import { useIntro } from "./motion/IntroProvider";
import { EASE } from "./motion/ease";
import { socialProof } from "../data/profile";

const ROTATING = ["business workflows.", "voice AI calls.", "CRM pipelines.", "daily operations."];

const stats = [
  { value: "12+", label: "Production AI agents shipped" },
  { value: "22h", label: "Saved weekly for client teams" },
  { value: "5", label: "Featured case studies" },
];

/**
 * Station "top". Full-screen editorial hero: copy on the left, the 3D
 * world's glass Agent Core fills the stage column on the right. Without
 * the 3D world (narrow screens, reduced motion, no WebGL) the stage shows
 * the DOM agent card instead.
 */
export default function HeroSection() {
  const reduce = useReducedMotion();
  const { introDone } = useIntro();
  const sectionRef = useRef(null);
  const { scrollYProgress: exitP } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const exitY = useTransform(exitP, [0, 1], [0, -90]);
  const exitOpacity = useTransform(exitP, [0, 0.8], [1, 0]);
  const exitStyle = reduce ? undefined : { y: exitY, opacity: exitOpacity };

  const rise = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 26 },
    animate: introDone ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease: EASE },
  });

  const lineReveal = (delay) => ({
    initial: reduce ? { opacity: 0 } : { y: "110%", rotate: 3 },
    animate: introDone ? (reduce ? { opacity: 1 } : { y: 0, rotate: 0 }) : undefined,
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section className="hx" id="top" ref={sectionRef} data-station="top">
      <motion.div className="hx-copy" style={exitStyle}>
        <motion.span className="hx-eyebrow" {...rise(0.05)}>
          <span className="live"></span>
          AI Engineer &middot; Agents &amp; Automation &middot; Karachi
        </motion.span>

        <h1 className="hx-title">
          <span className="line-mask">
            <motion.span className="line-inner" {...lineReveal(0.1)}>
              AI agents
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span className="line-inner" {...lineReveal(0.2)}>
              that run your
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span className="line-inner" {...lineReveal(0.3)}>
              <em>
                <RotatingText className="grad" phrases={ROTATING} />
              </em>
            </motion.span>
          </span>
        </h1>

        <motion.p className="hx-sub" {...rise(0.32)}>
          I design and ship <b>AI agents, voice AI and workflow automation</b> that remove hours of
          manual work &mdash; LangGraph agents, n8n pipelines, CRM automation and predictive
          analytics built for production, not demos.
        </motion.p>

        <motion.div className="hx-cta" {...rise(0.42)}>
          <MagneticButton className="btn btn-primary" href="#work" data-cursor="Explore">
            View projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </MagneticButton>
          <MagneticButton className="btn btn-ghost" href="#contact" strength={0.22}>
            Hire me
          </MagneticButton>
          <a className="hx-resume" href="/resume/Muhammad-Muneeb-Resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
        </motion.div>

        <motion.dl className="hx-stats" {...rise(0.52)}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd className="grad">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.ul className="hx-proof" aria-label="Credibility signals" {...rise(0.6)}>
          {socialProof.map((proof) => (
            <li key={proof.label}>
              <strong>{proof.value}</strong> {proof.label}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <div className="hx-stage" data-anchor aria-hidden="true">
        <div className="hx-fallback">
          <ContainedAgentVisual />
        </div>
      </div>

      <motion.a className="hx-scroll" href="#about" {...rise(0.8)} aria-label="Scroll to profile">
        <span>Scroll</span>
        <i />
      </motion.a>
    </section>
  );
}
