import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import { credentials } from "../data/profile";

/**
 * Compact credentials band: education + featured certifications in one
 * slim strip. Deliberately minimal — with real production experience
 * above, certificates are supporting proof, not a headline act.
 */
export default function CredentialsSection() {
  return (
    <section id="credentials" className="credentials-section">
      <SectionDivider />
      <Reveal className="section-head">
        <div>
          <div className="section-num">/ 03 &mdash; credentials</div>
          <h2 className="section-title">
            Certified <span className="outline">foundations</span>
          </h2>
        </div>
        <p className="section-desc">
          LinkedIn-backed education and certifications that support the AI automation work shown
          here.
        </p>
      </Reveal>

      <Reveal className="credentials-band" delay={0.06}>
        <div className="cred-education">
          <span className="cred-band-kicker">Education</span>
          <strong>{credentials.education.title}</strong>
          <small>
            {credentials.education.institution} &middot; {credentials.education.dates}
          </small>
        </div>

        <div className="cred-band-divider" aria-hidden="true"></div>

        <div className="cred-certs">
          <span className="cred-band-kicker">Certifications</span>
          <ul className="cred-chip-list">
            {credentials.featured.map((credential) => (
              <li className="cred-chip" key={credential.title} title={credential.focus}>
                <b>{credential.title}</b>
                <span>
                  {credential.issuer} &middot; {credential.date.replace("Issued ", "")}
                </span>
              </li>
            ))}
          </ul>
          <div className="cred-band-foot">
            <a href="https://linkedin.com/in/muneeb-gulfam" target="_blank" rel="noopener noreferrer">
              Verified on LinkedIn — view profile
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
            <details className="cred-secondary">
              <summary>+{credentials.secondary.length} more credentials</summary>
              <div>
                {credentials.secondary.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </details>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
