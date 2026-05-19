import HeroVisualization from "./HeroVisualization";

export default function HeroSection() {
  return (
    <section className="hero" id="top">
      <div>
        <span className="eyebrow">
          <span className="live"></span>
          AI SYSTEMS CONSULTANT &middot; KARACHI, PK
        </span>
        <h1 className="hero-title">
          <span className="outline">AI systems</span>
          <br />
          that automate your
          <br />
          <span className="grad">business workflows.</span>
        </h1>
        <p className="hero-sub">
          I design and deploy AI agents, voice automations, predictive models and workflow
          systems that save teams hours of manual work. Currently building practical AI for
          operational teams in a confidential enterprise environment.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#work">
            View Projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a className="btn btn-ghost" href="#contact">
            Hire Me
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16v12H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </a>
          <a
            className="btn btn-resume hero-resume"
            href="/resume/Muhammad-Muneeb-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
              <path d="M14 2v5h5" />
              <path d="M12 11v6" />
              <path d="m9 14 3 3 3-3" />
            </svg>
          </a>
        </div>
        <div className="cred-line">
          Production AI agents &middot; Workflow automation &middot; Analytics dashboards &middot; Voice AI
        </div>
        <div className="hero-stats">
          <div className="hstat">
            <div className="s-val">
              <span className="grad">12+</span>
            </div>
            <div className="s-lbl">Production AI agents shipped</div>
          </div>
          <div className="hstat">
            <div className="s-val">
              <span className="grad">22h</span>
            </div>
            <div className="s-lbl">Saved weekly for client teams</div>
          </div>
          <div className="hstat">
            <div className="s-val">
              <span className="grad">4</span>
            </div>
            <div className="s-lbl">Featured case studies</div>
          </div>
        </div>
      </div>

      <HeroVisualization />
    </section>
  );
}
