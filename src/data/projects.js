export const confidentialityNote =
  "These are real client and company projects. Client names, company names, and sensitive business details are hidden for confidentiality and security reasons.";

export const projects = [
  {
    diagramId: "freight-voice",
    category: "Voice AI Agent",
    title: "Freight AI Voice Agent",
    badge: "Confidential client project",
    summary:
      "A freight brokerage was losing deals because new leads sat uncalled for hours. I built an AI voice agent that phones every new lead within seconds, holds a natural conversation to capture the shipment — route, weight, cargo type and pickup date — and updates the CRM on its own. The sales team receives a short email summary for every qualified lead and simply calls back to close. No lead waits, and nobody types call notes again.",
    tools: ["Synthflow AI", "CRM Automation", "Webhooks", "Email Routing"],
    outcome: "Qualified freight details delivered without manual chasing.",
    story: {
      label: "How it works",
      steps: [
        { icon: "user", title: "New lead arrives", note: "A shipper lands in the CRM" },
        { icon: "phone", title: "AI calls in seconds", note: "No waiting, no missed leads" },
        { icon: "chat", title: "Asks the right questions", note: "Route, weight, cargo — like your best rep" },
        { icon: "doc", title: "Writes it all down", note: "Every detail saved automatically" },
        { icon: "mail", title: "Team closes the deal", note: "A ready-to-go summary in their inbox" },
      ],
      result: "Sales only talks to qualified, ready-to-move leads — zero manual follow-ups.",
    },
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
      "Prospecting used to cost the team a full day of copying names and emails from job boards every week. This pipeline watches those boards around the clock, spots companies that are hiring — a strong signal they need help — and fills in verified contact details for each one. Weak fits are filtered out automatically, and a personalized outreach email is prepared for every lead that remains. The result: 3,400+ ready-to-contact leads flowing in every week, hands-free.",
    tools: ["n8n", "Apify", "Clay", "Instantly", "Postgres"],
    outcome: "A repeatable lead engine with cleaner targeting and less manual research.",
    story: {
      label: "How it works",
      steps: [
        { icon: "search", title: "Finds companies that need you", note: "Scans job boards day and night" },
        { icon: "id", title: "Fills in the details", note: "Names, emails, company facts" },
        { icon: "filter", title: "Keeps only the best fits", note: "Matched to your ideal customer" },
        { icon: "pen", title: "Writes personal outreach", note: "Tailored email for every lead" },
        { icon: "chart", title: "Pipeline fills itself", note: "3,400+ fresh leads a week" },
      ],
      result: "22 hours of manual research handed back to the team, every single week.",
    },
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
      "Business owners rarely know what is actually holding their website back. Paste in a URL and this system reads the whole site, compares it against competitors, and scores the biggest opportunities for improvement. It then writes a plain-English report ranked by impact — plus ready-to-use marketing assets like ad copy and a video script. What a consultant would deliver in a week arrives in about five minutes.",
    tools: ["Python", "OpenAI API", "LangChain", "Playwright", "GCP"],
    outcome: "Business owners get a clear improvement path instead of raw technical findings.",
    story: {
      label: "How it works",
      steps: [
        { icon: "link", title: "Paste a website link", note: "That's all you provide" },
        { icon: "eye", title: "AI reads the whole site", note: "Pages, offers, competitors" },
        { icon: "gauge", title: "Scores what matters", note: "Fix-first list, ranked by impact" },
        { icon: "doc", title: "Builds a clear report", note: "Plain-English recommendations" },
        { icon: "spark", title: "Marketing kit included", note: "Ad copy and video script, ready" },
      ],
      result: "A week of consulting-grade analysis, delivered in about five minutes.",
    },
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
      "The client's call operation lived in a Google Sheet and depended on someone remembering to dial, log and follow up. Now adding a row is all it takes: the system places the AI call, and every outcome is handled automatically — busy numbers retry later, callbacks get scheduled, completed calls are logged. The sheet updates itself with the result and the next step, so nothing falls through and every call leaves a full audit trail.",
    tools: ["n8n", "Synthflow AI", "Google Sheets", "JavaScript", "REST API"],
    outcome: "A fragile manual workflow became a monitored automation with clear outcomes.",
    story: {
      label: "How it works",
      steps: [
        { icon: "sheet", title: "Add a row to a sheet", note: "Your team keeps using Google Sheets" },
        { icon: "phone", title: "AI makes the call", note: "Right person, right number" },
        { icon: "branch", title: "Every outcome handled", note: "Busy? Retries. Callback? Scheduled." },
        { icon: "check", title: "Sheet updates itself", note: "Status and next step written back" },
        { icon: "shield", title: "Nothing falls through", note: "Full history of every call" },
      ],
      result: "A fragile manual process became a system that runs and audits itself.",
    },
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
