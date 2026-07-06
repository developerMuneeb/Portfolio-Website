import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import HeroVisualization from "./HeroVisualization";
import MagneticButton from "./motion/MagneticButton";
import RotatingText from "./motion/RotatingText";
import CountUp from "./motion/CountUp";
import { socialProof } from "../data/profile";

const EASE = [0.2, 0.8, 0.2, 1];

const ROTATING = ["business workflows.", "voice AI calls.", "CRM pipelines.", "daily operations."];

const stats = [
  { value: "12+", label: "Production AI agents shipped" },
  { value: "22h", label: "Saved weekly for client teams" },
  { value: "4", label: "Featured case studies" },
];

export default function HeroSection() {
  const reduce = useReducedMotion();

  // Cinematic exit: the hero scales down and fades as you scroll away
  const sectionRef = useRef(null);
  const { scrollYProgress: exitP } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const exitScale = useTransform(exitP, [0, 1], [1, 0.93]);
  const exitOpacity = useTransform(exitP, [0, 0.85], [1, 0.2]);
  const exitY = useTransform(exitP, [0, 1], [0, 64]);
  const exitStyle = reduce ? undefined : { scale: exitScale, opacity: exitOpacity, y: exitY };

  // Mouse parallax: chips and dashboard drift at different depths
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const vizX = useTransform(sx, (v) => v * -9);
  const vizY = useTransform(sy, (v) => v * -7);
  const chipAX = useTransform(sx, (v) => v * 20);
  const chipAY = useTransform(sy, (v) => v * 14);
  const chipBX = useTransform(sx, (v) => v * -26);
  const chipBY = useTransform(sy, (v) => v * -18);
  const chipCX = useTransform(sx, (v) => v * 14);
  const chipCY = useTransform(sy, (v) => v * -22);

  const onPointerMove = (event) => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const rise = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  // Headline lines slide up out of an overflow mask — cinematic reveal
  const lineReveal = (delay) => ({
    initial: reduce ? { opacity: 0 } : { y: "108%" },
    animate: reduce ? { opacity: 1 } : { y: 0 },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  return (
    <section className="hero" id="top" ref={sectionRef} onPointerMove={onPointerMove}>
      <div className="hero-dots" aria-hidden="true"></div>
      <motion.div style={exitStyle}>
        <motion.span className="eyebrow" {...rise(0.05)}>
          <span className="live"></span>
          AI ENGINEER &middot; AUTOMATION &amp; AGENTS &middot; KARACHI, PK
        </motion.span>

        <h1 className="hero-title">
          <span className="line-mask">
            <motion.span className="line-inner" {...lineReveal(0.12)}>
              <span className="outline">AI agents</span>
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span className="line-inner" {...lineReveal(0.22)}>
              that run your
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span className="line-inner" {...lineReveal(0.32)}>
              <RotatingText className="grad" phrases={ROTATING} />
            </motion.span>
          </span>
        </h1>

        <motion.p className="hero-sub" {...rise(0.26)}>
          I design and ship <b>AI agents, voice AI and workflow automation</b> that remove hours of
          manual work &mdash; LangGraph and LangChain agents, n8n pipelines, CRM automation, AI
          chatbots and predictive analytics built for production, not demos.
        </motion.p>

        <motion.div className="hero-cta" {...rise(0.36)}>
          <MagneticButton className="btn btn-primary" href="#work">
            View Projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </MagneticButton>
          <MagneticButton className="btn btn-ghost" href="#contact" strength={0.22}>
            Hire Me
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6h16v12H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </MagneticButton>
          <a
            className="btn hero-resume"
            href="/resume/Muhammad-Muneeb-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
              <path d="M14 2v5h5" />
              <path d="M12 11v6" />
              <path d="m9 14 3 3 3-3" />
            </svg>
          </a>
        </motion.div>

        <motion.div className="cred-line" {...rise(0.44)}>
          AI engineer with data science, automation, analytics, and certified AI/data foundations.
        </motion.div>

        <motion.div className="hero-proof-strip" aria-label="LinkedIn credibility signals" {...rise(0.5)}>
          {socialProof.map((proof) => (
            <span className="hero-proof" key={proof.label}>
              <strong>{proof.value}</strong>
              <small>{proof.label}</small>
            </span>
          ))}
        </motion.div>

        <motion.div className="hero-stats" {...rise(0.58)}>
          {stats.map((stat) => (
            <div className="hstat" key={stat.label}>
              <div className="s-val">
                <span className="grad">
                  <CountUp value={stat.value} />
                </span>
              </div>
              <div className="s-lbl">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Outer wrapper carries the scroll-exit; inner keeps the entrance animation */}
      <motion.div style={{ minWidth: 0, display: "grid", ...exitStyle }}>
      <motion.div
        className="hero-viz-wrap"
        style={{ minWidth: 0, display: "grid" }}
        initial={{ opacity: 0, y: reduce ? 0 : 30, scale: reduce ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      >
        <motion.div style={{ display: "grid", x: vizX, y: vizY }}>
          <HeroVisualization />
        </motion.div>

        {/* Floating glass chips — parallax depth layer */}
        <motion.div className="hero-chip hero-chip-a" style={{ x: chipAX, y: chipAY }} aria-hidden="true">
          <span className="hero-chip-inner">
            <i className="chip-dot chip-dot-green"></i>Agent deployed ✓
          </span>
        </motion.div>
        <motion.div className="hero-chip hero-chip-b" style={{ x: chipBX, y: chipBY }} aria-hidden="true">
          <span className="hero-chip-inner">
            <i className="chip-dot chip-dot-cyan"></i>22h saved / week
          </span>
        </motion.div>
        <motion.div className="hero-chip hero-chip-c" style={{ x: chipCX, y: chipCY }} aria-hidden="true">
          <span className="hero-chip-inner">
            <i className="chip-dot chip-dot-blue"></i>n8n flow · live
          </span>
        </motion.div>
      </motion.div>
      </motion.div>
    </section>
  );
}
