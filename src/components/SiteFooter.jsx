function scrollToTop() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

const sitemap = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#credentials", label: "Credentials" },
  { href: "#skills", label: "Stack" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  {
    href: "https://linkedin.com/in/muneeb-gulfam",
    label: "LinkedIn",
    handle: "in/muneeb-gulfam",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "https://github.com/developerMuneeb",
    label: "GitHub",
    handle: "@developerMuneeb",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    href: "mailto:muneebgulfam5@gmail.com",
    label: "Email",
    handle: "muneebgulfam5@gmail.com",
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    href: "/resume/Muhammad-Muneeb-Resume.pdf",
    label: "Resume",
    handle: "PDF - 1 page",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
        <path d="M14 2v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h4" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Site footer</h2>

      <div className="footer-top">
        <div className="footer-brand">
          <a className="brand footer-brand-link" href="#top" aria-label="Back to top of Muneeb AI portfolio">
            <span className="brand-mark">
              <span className="brand-orbit"></span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2 L4 7 L12 12 L20 7 Z"></path>
                <path d="M4 17 L12 22 L20 17"></path>
                <path d="M4 12 L12 17 L20 12"></path>
              </svg>
            </span>
            <span className="brand-word">
              <span className="brand-name">MUNEEB</span>
              <span className="brand-dot"></span>
              <span className="brand-ai">AI</span>
            </span>
          </a>
          <p className="footer-brand-tagline">
            AI, automation and data analytics engineer building production systems that turn
            manual workflows into measurable business outcomes.
          </p>
          <p className="footer-brand-meta">Karachi, Pakistan &middot; GMT+5</p>
        </div>

        <a className="footer-cta" href="#contact">
          <span className="footer-cta-kicker">Have a workflow in mind?</span>
          <strong>
            Let&apos;s build something
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </strong>
          <span className="footer-cta-sub">Start a conversation &mdash; reply within 24h</span>
        </a>
      </div>

      <div className="footer-divider" aria-hidden="true"></div>

      <div className="footer-grid">
        <div className="footer-col">
          <h3>Sitemap</h3>
          <ul>
            {sitemap.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col-connect">
          <h3>Connect</h3>
          <ul>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  {...(social.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={`${social.label} - ${social.handle}`}
                >
                  <span className="footer-social-icon">{social.icon}</span>
                  <span className="footer-social-text">
                    <strong>{social.label}</strong>
                    <small>{social.handle}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col-status">
          <h3>Currently</h3>
          <ul>
            <li className="footer-status-row">
              <span className="footer-status-dot" aria-hidden="true"></span>
              <span>
                <strong>Available for hire</strong>
                <small>Select AI &amp; automation engagements</small>
              </span>
            </li>
            <li>
              <span>
                <strong>Replies within 24h</strong>
                <small>Mon&ndash;Fri, GMT+5</small>
              </span>
            </li>
            <li>
              <span>
                <strong>Production focus</strong>
                <small>Agents, voice AI, n8n, dashboards</small>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-divider" aria-hidden="true"></div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <span>&copy; 2026 Muhammad Muneeb</span>
          <span className="footer-dot" aria-hidden="true">&middot;</span>
          <span>All rights reserved</span>
        </div>
        <div className="footer-credits">
          <span>Designed &amp; built with React + Vite</span>
        </div>
        <button
          type="button"
          className="footer-back-top"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
          <span>Back to top</span>
        </button>
      </div>
    </footer>
  );
}
