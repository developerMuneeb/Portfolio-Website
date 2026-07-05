export const confidentialityNote =
  "These are real client and company projects. Client names, company names, and sensitive business details are hidden for confidentiality and security reasons.";

export const projects = [
  {
    diagramId: "freight-voice",
    category: "Voice AI Agent",
    title: "Freight AI Voice Agent",
    badge: "Confidential client project",
    summary:
      "A confidential freight and logistics workflow that qualifies CRM leads through an AI voice agent, captures shipment details, and sends a clean handoff to the internal team.",
    tools: ["Synthflow AI", "CRM Automation", "Webhooks", "Email Routing"],
    outcome: "Qualified freight details delivered without manual chasing.",
    resultStats: [
      { value: "0", label: "manual follow-ups" },
      { value: "5 steps", label: "lead to handoff" },
    ],
    details: {
      problem:
        "The client team was losing time to manual lead follow-up, repeated qualification questions, and inconsistent CRM handoffs.",
      solution:
        "I designed an automated voice qualification flow that calls leads, captures shipment intent, updates CRM status, and sends the team a concise qualified summary.",
      role: "Workflow architecture, voice-agent logic, CRM mapping, webhook routing, testing, and handoff documentation.",
      value:
        "The team can focus on high-intent freight opportunities instead of repetitive qualification and status updates.",
    },
  },
  {
    diagramId: "lead-scraper",
    category: "Lead Automation",
    title: "Automated Job & Lead Scraper",
    badge: "Confidential client project",
    summary:
      "An end-to-end lead pipeline that finds relevant job signals, enriches company records, scores opportunities, and prepares outreach-ready lists.",
    tools: ["n8n", "Apify", "Clay", "Instantly", "Postgres"],
    outcome: "A repeatable lead engine with cleaner targeting and less manual research.",
    resultStats: [
      { value: "3.4k", label: "leads per week" },
      { value: "22h", label: "weekly time saved" },
    ],
    details: {
      problem:
        "Prospecting required too much manual searching, copying, enrichment, and outreach preparation.",
      solution:
        "I built a pipeline that scrapes job intent, enriches records, filters poor-fit accounts, and sends qualified leads into an outreach workflow.",
      role: "Automation design, data-flow mapping, enrichment logic, quality checks, and outreach handoff.",
      value:
        "Lead generation became faster, more consistent, and easier to scale without adding repetitive manual work.",
    },
  },
  {
    diagramId: "business-analyzer",
    category: "AI Analyzer",
    title: "AI Business Analyzer & Content Generator",
    badge: "Confidential company project",
    summary:
      "A confidential AI system that audits a business URL, scores opportunities, produces a recommendation report, and generates branded marketing assets.",
    tools: ["Python", "OpenAI API", "LangChain", "Playwright", "GCP"],
    outcome: "Business owners get a clear improvement path instead of raw technical findings.",
    resultStats: [
      { value: "82", label: "AI opportunity score" },
      { value: "+18%", label: "estimated impact" },
    ],
    details: {
      problem:
        "Stakeholders needed an easy way to understand website, SEO, and positioning gaps without reading technical audit output.",
      solution:
        "I connected crawl data, competitive analysis, and LLM-generated recommendations into a structured report and branded content workflow.",
      role: "System architecture, prompt design, crawler workflow, report structure, and output automation.",
      value:
        "The final output turns analysis into a client-ready action plan and marketing asset package.",
    },
  },
  {
    diagramId: "voice-suite",
    category: "Workflow Automation",
    title: "n8n + Synthflow Automation Suite",
    badge: "Confidential client project",
    summary:
      "A production automation suite that connects sheet intake, AI calls, post-call webhooks, retries, callbacks, and audit writeback.",
    tools: ["n8n", "Synthflow AI", "Google Sheets", "JavaScript", "REST API"],
    outcome: "A fragile manual workflow became a monitored automation with clear outcomes.",
    resultStats: [
      { value: "2", label: "n8n flows" },
      { value: "8 steps", label: "fully automated" },
    ],
    details: {
      problem:
        "The workflow depended on scattered manual updates and had no clean post-call routing or audit trail.",
      solution:
        "I split the system into pre-call and post-call flows with number matching, status routing, retry branches, and sheet writeback.",
      role: "n8n architecture, Synthflow integration, webhook handling, JavaScript transforms, and production testing.",
      value:
        "The system now tracks what happened, which number was used, and what the next action should be.",
    },
  },
];
