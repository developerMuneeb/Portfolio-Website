import { useState } from "react";
import GhostTitle from "./motion/GhostTitle";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";

const proofStrip = [
  { label: "LinkedIn", value: "2k+ followers" },
  { label: "Network", value: "500+ connections" },
  { label: "Education", value: "BSCS Computer Science" },
  { label: "Credentials", value: "Microsoft + Google AI/data foundations" },
];

const principles = [
  {
    num: "01",
    title: "Automation Strategy",
    note: "Map the real workflow before choosing tools.",
  },
  {
    num: "02",
    title: "AI Engineering",
    note: "Build agents, models and integrations that survive production use.",
  },
  {
    num: "03",
    title: "Business Workflow Thinking",
    note: "Explain technical systems in terms clients can act on.",
  },
];

export default function AboutSection() {
  // Real photo (public/portrait.jpg) with themed treatment; falls back
  // to the monogram card until the photo file exists.
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <section id="about">
      <SectionDivider />
      <GhostTitle text="Profile" />
      <Reveal className="section-head">
        <div>
          <div className="section-num">/ 01 &mdash; profile</div>
          <h2 className="section-title">
            Business-first <span className="outline">AI engineering</span>
          </h2>
        </div>
        <p className="section-desc">
          I help teams turn repetitive work, messy data flows and slow follow-up processes into
          reliable AI systems clients can actually understand, trust and use.
        </p>
      </Reveal>

      <div className="about-grid">
        <Reveal className="about-portrait" delay={0.08}>
          <span className="corner tl"></span>
          <span className="corner br"></span>
          {hasPhoto ? (
            <>
              <div className="portrait-photo-wrap">
                <span className="photo-ring" aria-hidden="true"></span>
                <span className="photo-ring photo-ring-dash" aria-hidden="true"></span>
                <img
                  className="portrait-photo"
                  src="/portrait.jpg"
                  alt="Muhammad Muneeb — AI engineer"
                  loading="lazy"
                  decoding="async"
                  onError={() => setHasPhoto(false)}
                />
              </div>
              <div className="identity-sub portrait-role">AI ENGINEER</div>
            </>
          ) : (
            <>
              <div className="identity-orbit orbit-a"></div>
              <div className="identity-orbit orbit-b"></div>
              <div className="face">
                <div className="monogram">MM</div>
                <div className="identity-sub">AI ENGINEER</div>
              </div>
            </>
          )}
          <div className="identity-chip chip-ai">AI</div>
          <div className="identity-chip chip-ml">ML</div>
          <div className="identity-chip chip-ops">OPS</div>
          <div className="strips"></div>
          <div className="tag">ID &middot; MUHAMMAD MUNEEB &middot; KHI-01</div>
        </Reveal>

        <Reveal className="about-body" delay={0.14}>
          <p>
            I&apos;m a <b>results-oriented AI engineer</b> focused on practical business
            automation: AI agents, AI chatbots, voice AI workflows, CRM automation and predictive
            analytics dashboards that make operational teams measurably faster.
          </p>
          <p>
            My background spans <b>enterprise AI engineering</b>, <b>AI research and consulting</b>,{" "}
            <b>pharma analytics</b>, <b>data engineering</b> and <b>applied AI training</b>. That
            mix shaped how I work: understand the business workflow first, then build the smallest
            reliable system that produces measurable value.
          </p>
          <p>
            My sweet spot is <b>turning manual processes into production-ready AI workflows</b> and
            full-stack AI applications &mdash; with clean handoffs, clear monitoring and
            client-friendly documentation.
          </p>

          <div className="about-proof-strip">
            {proofStrip.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <b>{item.value}</b>
              </div>
            ))}
          </div>

          <div className="about-principles">
            {principles.map((principle) => (
              <div key={principle.num}>
                <span>{principle.num}</span>
                <b>{principle.title}</b>
                <small>{principle.note}</small>
              </div>
            ))}
          </div>

          <div className="about-meta">
            <div className="cell">
              <div className="lbl">Location</div>
              <div className="val">Karachi, Pakistan</div>
            </div>
            <div className="cell">
              <div className="lbl">Status</div>
              <div className="val" style={{ color: "var(--amber)" }}>
                Employed &middot; open to select collaborations
              </div>
            </div>
            <div className="cell">
              <div className="lbl">Email</div>
              <div className="val">
                <a href="mailto:muneebgulfam5@gmail.com">muneebgulfam5@gmail.com</a>
              </div>
            </div>
            <div className="cell">
              <div className="lbl">GitHub</div>
              <div className="val">
                <a href="https://github.com/developerMuneeb" target="_blank" rel="noopener noreferrer">
                  @developerMuneeb
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
