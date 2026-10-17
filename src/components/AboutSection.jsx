import Reveal from "./motion/Reveal";
import ChapterHead from "./chapter/ChapterHead";

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

/**
 * Station "about". The stage column hosts the 3D "system stack" (workflow ->
 * data -> AI -> outcomes); without the 3D world the copy centres instead.
 */
export default function AboutSection() {
  return (
    <section id="about" className="ch ch-flip" data-station="about">
      <div className="ch-stage" data-anchor aria-hidden="true" />

      <div className="ch-copy">
        <ChapterHead
          index="01"
          label="Profile"
          lede="I help teams turn repetitive work, messy data flows and slow follow-up processes into reliable AI systems clients can actually understand, trust and use."
        >
          Business-first <em>AI engineering</em>
        </ChapterHead>

        <Reveal className="ch-prose" delay={0.1}>
          <p>
            I&apos;m an <b>AI engineer</b> focused on practical business
            automation: AI agents, AI chatbots, voice AI workflows, CRM automation and predictive
            analytics dashboards that make operational teams measurably faster.
          </p>
          <p>
            My background spans <b>enterprise AI engineering</b>, <b>AI research and consulting</b>,{" "}
            <b>pharma analytics</b>, <b>data engineering</b> and <b>applied AI training</b>. I
            understand the business workflow first, then build the smallest reliable system that
            produces measurable value.
          </p>
        </Reveal>

        <Reveal as="dl" className="ch-facts" delay={0.12}>
          {proofStrip.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </Reveal>

        <Reveal as="ol" className="ch-rows" delay={0.14}>
          {principles.map((principle) => (
            <li key={principle.num}>
              <span className="ch-row-num">{principle.num}</span>
              <div>
                <strong>{principle.title}</strong>
                <p>{principle.note}</p>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="ch-contactline" delay={0.16}>
          <span>Karachi, Pakistan</span>
          <span className="ch-status">Employed &middot; open to select collaborations</span>
          <a href="mailto:muneebgulfam5@gmail.com">muneebgulfam5@gmail.com</a>
          <a href="https://github.com/developerMuneeb" target="_blank" rel="noopener noreferrer">
            @developerMuneeb
          </a>
        </Reveal>
      </div>
    </section>
  );
}
