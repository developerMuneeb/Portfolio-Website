const mailtoDraft =
  "mailto:muneebgulfam5@gmail.com?subject=Portfolio%20Project%20Inquiry&body=Hi%20Muneeb,%0D%0A%0D%0AI%20want%20to%20discuss%20an%20automation%20or%20AI%20workflow.%0D%0A%0D%0AWorkflow:%20%0D%0ATools:%20%0D%0AIssue:%20%0D%0AExpected%20result:%20%0D%0A%0D%0AThanks.";

export default function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="contact-shell reveal">
        <div className="contact-main">
          <div className="contact-kicker">/ 06 - contact</div>
          <h2>
            Tell me what workflow
            <br />
            <span className="outline">you want to automate.</span>
          </h2>
          <p className="contact-copy">
            Send the process, tools, bottleneck and outcome you care about. I
            can turn it into an AI agent, automation pipeline, dashboard or
            integration plan.
          </p>

          <div className="contact-status" role="status">
            <span className="contact-status-item">
              <span className="live" aria-hidden="true"></span>
              Available for hire
            </span>
            <span className="contact-status-sep" aria-hidden="true">/</span>
            <span className="contact-status-item">Replies within 24h</span>
            <span className="contact-status-sep" aria-hidden="true">/</span>
            <span className="contact-status-item">Karachi &middot; GMT+5</span>
          </div>

          <a
            href="mailto:muneebgulfam5@gmail.com"
            className="contact-email"
            aria-label="Send an email to muneebgulfam5@gmail.com"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 6h16v12H4z"></path>
              <path d="m4 7 8 6 8-6"></path>
            </svg>
            muneebgulfam5@gmail.com
          </a>
        </div>

        <aside className="contact-card" aria-label="Project inquiry">
          <span className="contact-card-kicker">Quick query box</span>
          <h3>Send your idea &mdash; get a clear next step</h3>
          <p>
            One sharp paragraph: workflow, tools, problem, expected result.
            I&apos;ll reply with the best path forward.
          </p>
          <a className="message-box" href={mailtoDraft}>
            <span>Open email draft</span>
            <small>muneebgulfam5@gmail.com</small>
          </a>

          <div className="contact-socials">
            <a
              className="csoc"
              href="https://linkedin.com/in/muneeb-gulfam"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              className="csoc"
              href="https://github.com/developerMuneeb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              className="csoc"
              href="tel:+923209287215"
              aria-label="Call or message on phone"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
