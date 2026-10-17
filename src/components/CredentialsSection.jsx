import Reveal from "./motion/Reveal";
import ChapterHead from "./chapter/ChapterHead";
import { credentials } from "../data/profile";

/** Station "credentials": education + certifications beside floating crystals. */
export default function CredentialsSection() {
  return (
    <section id="credentials" className="ch ch-flip ch-compact" data-station="credentials">
      <div className="ch-stage" data-anchor aria-hidden="true" />

      <div className="ch-copy">
        <ChapterHead index="03" label="Credentials" lede="Education and certifications behind the AI automation work shown here.">
          Certified <em>foundations</em>
        </ChapterHead>

        <Reveal className="cr-edu" delay={0.08}>
          <span className="ch-mini">Education</span>
          <strong>{credentials.education.title}</strong>
          <small>
            {credentials.education.institution} &middot; {credentials.education.dates}
          </small>
        </Reveal>

        <Reveal as="ol" className="ch-rows cr-certs" delay={0.12}>
          {credentials.featured.map((credential, index) => (
            <li key={credential.title} title={credential.focus}>
              <span className="ch-row-num">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{credential.title}</strong>
                <p>
                  {credential.issuer} &middot; {credential.date.replace("Issued ", "")}
                </p>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="cr-foot" delay={0.14}>
          <a href="https://linkedin.com/in/muneeb-gulfam" target="_blank" rel="noopener noreferrer">
            Verified on LinkedIn ↗
          </a>
          <details className="cr-more">
            <summary>+{credentials.secondary.length} more credentials</summary>
            <div className="ch-tags">
              {credentials.secondary.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
