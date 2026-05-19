export const confidentialityNote =
  "These are real client and company projects. Client names, company names, and sensitive business details are hidden for confidentiality and security reasons.";

export const projects = [
  {
    diagramId: "freight-voice",
    category: "Voice AI",
    title: "Freight AI Voice Agent",
    badge: "Confidential client project",
    summary:
      "A confidential freight and logistics workflow that qualifies CRM leads through an AI voice agent, captures shipment details, and sends a clean handoff to the internal team.",
    metrics: ["0 manual follow-ups", "100% auto-qualified", "CRM to email handoff"],
    tools: ["Synthflow AI", "CRM Automation", "Webhooks", "Email Routing"],
    outcome: "Qualified freight details delivered without manual chasing.",
    visualLabel: "VOICE QUALIFICATION FLOW",
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
    diagram: {
      label: "Confidential freight voice workflow",
      caption: "Lead qualification from CRM intake to email handoff.",
      stages: [
        { id: "lead", label: "Lead Queue", type: "input", note: "new inquiry" },
        { id: "call", label: "Outbound AI Call", type: "automation", note: "voice agent" },
        { id: "qualify", label: "Qualification Check", type: "decision", note: "lane + intent" },
        { id: "crm", label: "CRM Update", type: "system", note: "status sync" },
        { id: "handoff", label: "Email Handoff", type: "output", note: "team summary" },
      ],
      connectors: ["Lead captured", "Call transcript", "Qualified", "Summary sent"],
      fallback: { from: "qualify", to: "call", label: "Missing info -> retry call" },
      value: "Less chasing, cleaner sales handoff",
    },
    workflowSteps: [
      { title: "Input", text: "A CRM lead enters the queue without exposing private client data." },
      { title: "Automation", text: "The voice agent calls the lead and captures shipment intent." },
      { title: "Decision", text: "Qualification logic checks if the lead has enough useful detail." },
      { title: "Output", text: "CRM status and an email summary are sent to the internal team." },
      { title: "Business result", text: "Manual follow-up is reduced and the team receives cleaner opportunities." },
    ],
  },
  {
    diagramId: "lead-scraper",
    category: "Lead Automation",
    title: "Automated Job & Lead Scraper",
    badge: "Confidential client project",
    summary:
      "An end-to-end lead pipeline that finds relevant job signals, enriches company records, scores opportunities, and prepares outreach-ready lists.",
    metrics: ["3.4k leads/week", "22 hrs saved", "Enriched outreach lists"],
    tools: ["n8n", "Apify", "Clay", "Instantly", "Postgres"],
    outcome: "A repeatable lead engine with cleaner targeting and less manual research.",
    visualLabel: "LEAD ENGINE BLUEPRINT",
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
    diagram: {
      label: "Confidential lead generation workflow",
      caption: "From public job signals to outreach-ready records.",
      stages: [
        { id: "sources", label: "Source Sites", type: "input", note: "job signals" },
        { id: "scrape", label: "Scrape", type: "automation", note: "Apify runs" },
        { id: "enrich", label: "Enrich", type: "system", note: "company data" },
        { id: "score", label: "Score / Filter", type: "decision", note: "fit rules" },
        { id: "list", label: "Outreach List", type: "output", note: "launch-ready" },
      ],
      connectors: ["Signals", "Raw leads", "Enriched data", "Approved"],
      fallback: { from: "score", to: "enrich", label: "Low-fit records -> reject / fix data" },
      value: "More qualified leads, less manual research",
    },
    workflowSteps: [
      { title: "Input", text: "Public job and company signals are collected from selected sources." },
      { title: "Automation", text: "Scrapers and n8n flows move records into an enrichment pipeline." },
      { title: "Decision", text: "Fit rules remove weak accounts before outreach begins." },
      { title: "Output", text: "Clean, enriched leads are prepared for the outreach stack." },
      { title: "Business result", text: "Prospecting becomes repeatable without manual copy-paste work." },
    ],
  },
  {
    diagramId: "business-analyzer",
    category: "AI Analyzer",
    title: "AI Business Analyzer & Content Generator",
    badge: "Confidential company project",
    summary:
      "A confidential AI system that audits a business URL, scores opportunities, produces a recommendation report, and generates branded marketing assets.",
    metrics: ["82 AI score", "+18% estimated impact", "Report and video kit"],
    tools: ["Python", "OpenAI API", "LangChain", "Playwright", "GCP"],
    outcome: "Business owners get a clear improvement path instead of raw technical findings.",
    visualLabel: "AI AUDIT + CONTENT SYSTEM",
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
    diagram: {
      label: "Confidential business analyzer workflow",
      caption: "A URL becomes a ranked action plan and content kit.",
      stages: [
        { id: "url", label: "URL Input", type: "input", note: "business site" },
        { id: "crawl", label: "Crawl", type: "system", note: "pages + SEO" },
        { id: "analysis", label: "AI Analysis", type: "automation", note: "LLM review" },
        { id: "score", label: "Score", type: "decision", note: "priority rank" },
        { id: "report", label: "Report Kit", type: "output", note: "assets + plan" },
      ],
      connectors: ["Site data", "Findings", "Recommendations", "Action plan"],
      fallback: { from: "score", to: "analysis", label: "Weak confidence -> re-check findings" },
      value: "Technical audit becomes a client-ready action plan",
    },
    workflowSteps: [
      { title: "Input", text: "A business URL starts the audit without exposing private brand context." },
      { title: "Automation", text: "Crawler and AI analysis convert website signals into findings." },
      { title: "Decision", text: "Scores prioritize which opportunities matter most." },
      { title: "Output", text: "A report kit and marketing assets are generated for presentation." },
      { title: "Business result", text: "Raw technical findings become a practical improvement roadmap." },
    ],
  },
  {
    diagramId: "voice-suite",
    category: "n8n Workflow",
    title: "n8n + Synthflow Automation Suite",
    badge: "Confidential client project",
    summary:
      "A production automation suite that connects sheet intake, AI calls, post-call webhooks, retries, callbacks, and audit writeback.",
    metrics: ["2 n8n flows", "8 automated steps", "Audit-ready results"],
    tools: ["n8n", "Synthflow AI", "Google Sheets", "JavaScript", "REST API"],
    outcome: "A fragile manual workflow became a monitored automation with clear outcomes.",
    visualLabel: "VOICE OPS SUITE",
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
    diagram: {
      label: "Confidential voice ops workflow",
      caption: "Pre-call and post-call logic with retry and audit paths.",
      stages: [
        { id: "sheet", label: "Sheet Intake", type: "input", note: "new row" },
        { id: "precall", label: "Pre-call Flow", type: "system", note: "n8n routing" },
        { id: "call", label: "AI Call", type: "automation", note: "Synthflow" },
        { id: "webhook", label: "Webhook Router", type: "decision", note: "status split" },
        { id: "audit", label: "Audit Writeback", type: "output", note: "row updated" },
      ],
      connectors: ["Row intake", "Call trigger", "Call result", "Status log"],
      fallback: { from: "webhook", to: "precall", label: "Retry / callback -> next number" },
      value: "Clear status, next action, and audit trail",
    },
    workflowSteps: [
      { title: "Input", text: "A spreadsheet row starts the automation with contact and status fields." },
      { title: "Automation", text: "n8n triggers the call and routes data into Synthflow." },
      { title: "Decision", text: "Webhook logic separates success, retry, callback, and failed outcomes." },
      { title: "Output", text: "The sheet receives a clean audit trail with the latest result." },
      { title: "Business result", text: "The workflow becomes monitorable instead of scattered across manual updates." },
    ],
  },
];
