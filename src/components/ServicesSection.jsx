import Reveal from "./motion/Reveal";
import ChapterHead from "./chapter/ChapterHead";

const services = [
  {
    title: "AI Agent Development",
    outcome:
      "Autonomous AI agents that handle multi-step workflows, decisions, and handoffs — built with LangGraph, LangChain, and OpenAI.",
    tools: ["LangGraph", "LangChain", "OpenAI", "Python"],
    deliverable: "Agent workflow, prompts, integrations, evals, and deployment notes.",
    bestFor: "Best for teams that need repeatable decisions, intake handling, or internal copilots.",
  },
  {
    title: "Workflow & Business Automation",
    outcome:
      "Reliable n8n and API-driven automations that remove repetitive manual work from daily operations.",
    tools: ["n8n", "Webhooks", "APIs"],
    deliverable: "Production-ready flows with retry logic, logging, and documentation.",
    bestFor: "Best for CRM automation, handoffs, alerts, reporting, and multi-tool operations.",
  },
  {
    title: "Voice AI Agents",
    outcome:
      "Voice AI agents for lead qualification, follow-up, callbacks, and clean client handoffs.",
    tools: ["Synthflow", "CRM", "Email"],
    deliverable: "Call flow, CRM sync, result routing, and audit trail.",
    bestFor: "Best for lead qualification, follow-up calls, appointment routing, and status updates.",
  },
  {
    title: "AI Chatbots & Assistants",
    outcome:
      "AI chatbots that answer from your business knowledge, qualify leads, and route conversations to the right person.",
    tools: ["OpenAI", "RAG", "APIs"],
    deliverable: "Chatbot flow, knowledge base setup, integrations, and guardrails.",
    bestFor: "Best for support intake, lead capture, internal Q&A, and website assistants.",
  },
  {
    title: "Dashboards & Predictive Analytics",
    outcome:
      "Decision dashboards and predictive models that surface patterns leaders can act on.",
    tools: ["Power BI", "Python", "SQL"],
    deliverable: "KPIs, reporting views, model outputs, and business summaries.",
    bestFor: "Best for teams that need clearer visibility into activity, performance, and risk.",
  },
  {
    title: "AI Integration Consulting",
    outcome:
      "A practical roadmap for adding AI automation to existing tools without adding chaos.",
    tools: ["Discovery", "Architecture", "Rollout"],
    deliverable: "Workflow audit, system blueprint, risk notes, and implementation plan.",
    bestFor: "Best before a build when the workflow, tools, or risks are still unclear.",
  },
];

/**
 * Station "services". Six services as numbered editorial rows; the 3D
 * turntable beside them turns so the service being read comes forward.
 */
export default function ServicesSection() {
  return (
    <section id="services" className="ch ch-flip" data-station="services">
      <div className="ch-stage" data-anchor aria-hidden="true" />

      <div className="ch-copy">
        <ChapterHead
          index="05"
          label="Services"
          lede="Business-first AI automation for teams that need systems that work, not experiments that stop at a demo."
        >
          What I can <em>build for you</em>
        </ChapterHead>

        <ol className="sv-list">
          {services.map((service, index) => (
            <Reveal as="li" className="sv-item" key={service.title} y={18} delay={Math.min(index * 0.04, 0.16)}>
              <span className="sv-num">{String(index + 1).padStart(2, "0")}</span>
              <div className="sv-body">
                <h3>{service.title}</h3>
                <p>{service.outcome}</p>
                <p className="sv-fit">{service.bestFor}</p>
                <div className="ch-tags">
                  {service.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
