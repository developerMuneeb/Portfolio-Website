const services = [
  {
    title: "AI Agent Development",
    outcome: "Autonomous agents that handle multi-step workflows, decisions, and handoffs.",
    tools: ["OpenAI", "LangChain", "Python"],
    deliverable: "Agent workflow, prompts, integrations, evals, and deployment notes.",
    bestFor: "Best for teams that need repeatable decisions, intake handling, or internal copilots.",
  },
  {
    title: "Workflow Automation",
    outcome: "Reliable automations that remove repetitive manual work from operations.",
    tools: ["n8n", "Webhooks", "APIs"],
    deliverable: "Production-ready flows with retry logic, logging, and documentation.",
    bestFor: "Best for CRM updates, handoffs, alerts, reporting, and multi-tool operations.",
  },
  {
    title: "Voice AI Systems",
    outcome: "Voice agents for qualification, follow-up, callbacks, and client handoffs.",
    tools: ["Synthflow", "CRM", "Email"],
    deliverable: "Call flow, CRM sync, result routing, and audit trail.",
    bestFor: "Best for lead qualification, follow-up calls, appointment routing, and status updates.",
  },
  {
    title: "Dashboards & Predictive Analytics",
    outcome: "Decision dashboards and models that surface patterns leaders can act on.",
    tools: ["Power BI", "Python", "SQL"],
    deliverable: "KPIs, reporting views, model outputs, and business summaries.",
    bestFor: "Best for teams that need clearer visibility into activity, performance, and risk.",
  },
  {
    title: "Lead Generation Automation",
    outcome: "Systems that collect, enrich, score, and prepare outreach-ready leads.",
    tools: ["Apify", "Clay", "Instantly"],
    deliverable: "Lead pipeline, enrichment map, quality checks, and launch logic.",
    bestFor: "Best for sales teams that need cleaner research and faster outbound preparation.",
  },
  {
    title: "AI Integration Consulting",
    outcome: "A practical roadmap for adding AI to existing tools without adding chaos.",
    tools: ["Discovery", "Architecture", "Rollout"],
    deliverable: "Workflow audit, system blueprint, risk notes, and implementation plan.",
    bestFor: "Best before a build when the workflow, tools, or risks are still unclear.",
  },
];

function ServiceCard({ service, index }) {
  return (
    <article className="service-card reveal" style={{ "--delay": `${index * 60}ms` }}>
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
    </article>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="services">
      <div className="section-head reveal">
        <div>
          <div className="section-num">/ 04 - services</div>
          <h2 className="section-title">
            What I can <span className="outline">build for you</span>
          </h2>
        </div>
        <p className="section-desc">
          Clear, business-first AI and automation services for teams that need systems that work,
          not experiments that stop at a demo.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
