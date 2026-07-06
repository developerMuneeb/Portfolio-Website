import GhostTitle from "./motion/GhostTitle";
import Reveal from "./motion/Reveal";
import SectionDivider from "./motion/SectionDivider";
import TiltCard from "./motion/TiltCard";

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

const viewport = { once: true, margin: "0px 0px -8% 0px" };
const EASE = [0.2, 0.8, 0.2, 1];

/* Bento layout: card 01 is the wide featured tile, card 06 spans the
   bottom row as a consulting banner. */
const BENTO_CLASS = { 0: " featured", 5: " wide" };

function ServiceCard({ service, index }) {
  return (
    <TiltCard
      as="article"
      className={`service-card${BENTO_CLASS[index] ?? ""}`}
      maxTilt={4}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.24), ease: EASE }}
    >
      <div className="service-index">{String(index + 1).padStart(2, "0")}</div>
      <h3>{service.title}</h3>
      <p>{service.outcome}</p>
      <div className="service-fit">{service.bestFor}</div>
      <div className="service-tools">
        {service.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <div className="service-deliverable">{service.deliverable}</div>
    </TiltCard>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="services">
      <SectionDivider />
      <GhostTitle text="Services" direction={-1} />
      <Reveal className="section-head">
        <div>
          <div className="section-num">/ 05 &mdash; services</div>
          <h2 className="section-title">
            What I can <span className="outline">build for you</span>
          </h2>
        </div>
        <p className="section-desc">
          Clear, business-first AI automation services for teams that need systems that work,
          not experiments that stop at a demo.
        </p>
      </Reveal>

      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
