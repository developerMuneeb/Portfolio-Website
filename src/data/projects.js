export const confidentialityNote =
  "These are real client and company systems. Sensitive implementation and business details are omitted where confidentiality requires it.";

export const projects = [
  {
    diagramId: "shopmesh-ai",
    featured: true,
    category: "Agentic Commerce + RAG",
    title: "ShopMesh AI Shopping Assistant",
    badge: "Production WooCommerce system",
    summary:
      "A production conversational-commerce assistant for WooCommerce that combines live product discovery, retrieval-augmented business knowledge, and natural-language cart control. A LangGraph agent selects the right tool, validates products and variations, and returns ordered operations. The embedded browser widget executes those operations inside the shopper's authenticated WooCommerce session and continuously reconciles the interface against the store's authoritative cart state.",
    tools: ["LangGraph", "FastAPI", "WooCommerce", "Chroma", "OpenAI"],
    outcome: "Customers can ask, discover, and manage their cart without leaving the conversation.",
    highlights: ["38 automated tests", "Live product catalog", "Multi-action cart plans", "Authoritative cart sync"],
    story: {
      label: "Anonymized product demo",
      result: "One assistant handles product discovery, business questions, and reliable cart execution.",
    },
    demo: {
      brandName: "ShopMesh AI",
      brandTagline: "Conversational Commerce Agent",
      logo: "/demo/shopmesh-ai/shopmesh-logo.svg",
      poster: "/demo/shopmesh-ai/poster-full-cart-v3.webp",
      webm: "/demo/shopmesh-ai/shopmesh-demo-full-cart-v3.webm",
      mp4: "/demo/shopmesh-ai/shopmesh-demo-full-cart-v3.mp4",
      duration: "01:00",
      durationLabel: "one-minute",
      summary:
        "A focused walkthrough of the real assistant handling product discovery and two cart changes. The conversation and authoritative WooCommerce cart stay visible together, while client branding, website details, and unrelated screen content remain hidden.",
      steps: [
        { title: "Ask", note: "The shopper describes what they need in everyday language." },
        { title: "Agent routes", note: "LangGraph selects catalog, knowledge, or cart tools." },
        { title: "Store responds", note: "WooCommerce and Chroma return verified information." },
        { title: "Cart synchronizes", note: "Validated actions run in the browser and the authoritative cart returns." },
      ],
      technicalFlow: [
        "Shopper",
        "Embedded widget",
        "FastAPI / LangGraph",
        "WooCommerce + Chroma",
        "Synced response",
      ],
      callouts: [
        "The backend plans and validates every operation.",
        "The shopper's browser executes cart changes inside the active session.",
        "WooCommerce remains the source of truth for the final cart.",
      ],
      transcript: [
        "The shopper submits a multi-product request in natural language.",
        "The assistant validates products and WooCommerce confirms the first live cart state.",
        "The shopper requests an item change without leaving the conversation.",
        "The cart adds and removes the requested items, then returns the synchronized result.",
      ],
    },
    resultStats: [
      { value: "38", label: "automated tests" },
      { value: "3", label: "agent tool routes" },
    ],
    details: {
      problem:
        "Customers needed help finding the right products, understanding the business, and managing complex WooCommerce carts without navigating multiple pages or losing session state.",
      solution:
        "I built an embedded assistant with a FastAPI WebSocket backend, a LangGraph ReAct agent, live Store API catalog access, Chroma retrieval, and a browser-side operation executor secured by the shopper's WooCommerce session and nonce.",
      role:
        "Agent architecture, RAG pipeline, WooCommerce Store API integration, structured cart operations, widget messaging, deployment, reliability testing, and production preflight.",
      value:
        "The system turns conversation into validated commerce actions while preserving WooCommerce as the source of truth for products, variations, prices, availability, and cart state.",
    },
  },
  {
    diagramId: "freight-voice",
    category: "Voice AI Agent",
    title: "Freight AI Voice Agent",
    badge: "Confidential client project",
    summary:
      "A freight brokerage was losing deals because new leads sat uncalled for hours. I built an AI voice agent that phones every new lead within seconds, holds a natural conversation to capture the shipment - route, weight, cargo type, and pickup date - and updates the CRM on its own. The sales team receives a short email summary for every qualified lead and simply calls back to close.",
    tools: ["Synthflow AI", "CRM Automation", "Webhooks", "Email Routing"],
    outcome: "Qualified freight details delivered without manual chasing.",
    story: {
      label: "How it works",
      steps: [
        { icon: "user", title: "New lead arrives", note: "A shipper lands in the CRM" },
        { icon: "phone", title: "AI calls in seconds", note: "No waiting, no missed leads" },
        { icon: "chat", title: "Asks the right questions", note: "Route, weight, and cargo" },
        { icon: "doc", title: "Writes it all down", note: "Every detail saved automatically" },
        { icon: "mail", title: "Team closes the deal", note: "A ready-to-go summary in their inbox" },
      ],
      result: "Sales only talks to qualified, ready-to-move leads - with zero manual follow-up.",
    },
    resultStats: [
      { value: "0", label: "manual follow-ups" },
      { value: "5 steps", label: "lead to handoff" },
    ],
    details: {
      problem: "The client team was losing time to manual lead follow-up, repeated qualification questions, and inconsistent CRM handoffs.",
      solution: "I designed an automated voice qualification flow that calls leads, captures shipment intent, updates CRM status, and sends the team a concise qualified summary.",
      role: "Workflow architecture, voice-agent logic, CRM mapping, webhook routing, testing, and handoff documentation.",
      value: "The team can focus on high-intent freight opportunities instead of repetitive qualification and status updates.",
    },
  },
  {
    diagramId: "lead-scraper",
    category: "Lead Automation",
    title: "Automated Job & Lead Scraper",
    badge: "Confidential client project",
    summary:
      "Prospecting used to cost the team a full day of copying names and emails from job boards every week. This pipeline watches those boards around the clock, identifies companies that are hiring, enriches them with verified contact details, and filters weak matches automatically. A personalized outreach email is prepared for every qualified lead that remains.",
    tools: ["n8n", "Apify", "Clay", "Instantly", "Postgres"],
    outcome: "A repeatable lead engine with cleaner targeting and less manual research.",
    story: {
      label: "How it works",
      steps: [
        { icon: "search", title: "Finds companies that need you", note: "Scans job boards day and night" },
        { icon: "id", title: "Fills in the details", note: "Names, emails, and company facts" },
        { icon: "filter", title: "Keeps only the best fits", note: "Matched to the ideal customer" },
        { icon: "pen", title: "Writes personal outreach", note: "Tailored email for every lead" },
        { icon: "chart", title: "Pipeline fills itself", note: "3,400+ fresh leads a week" },
      ],
      result: "22 hours of manual research returned to the team every week.",
    },
    resultStats: [
      { value: "3.4k", label: "leads per week" },
      { value: "22h", label: "weekly time saved" },
    ],
    details: {
      problem: "Prospecting required too much manual searching, copying, enrichment, and outreach preparation.",
      solution: "I built a pipeline that scrapes job intent, enriches records, filters poor-fit accounts, and sends qualified leads into an outreach workflow.",
      role: "Automation design, data-flow mapping, enrichment logic, quality checks, and outreach handoff.",
      value: "Lead generation became faster, more consistent, and easier to scale without adding repetitive manual work.",
    },
  },
  {
    diagramId: "business-analyzer",
    category: "AI Analyzer",
    title: "AI Business Analyzer & Content Generator",
    badge: "Confidential company project",
    summary:
      "Business owners rarely know what is actually holding their website back. Paste in a URL and this system reads the site, compares it against competitors, and scores the biggest opportunities for improvement. It then writes a plain-English report ranked by impact, plus ready-to-use marketing assets such as ad copy and a video script.",
    tools: ["Python", "OpenAI API", "LangChain", "Playwright", "GCP"],
    outcome: "Business owners get a clear improvement path instead of raw technical findings.",
    story: {
      label: "How it works",
      steps: [
        { icon: "link", title: "Paste a website link", note: "That is all you provide" },
        { icon: "eye", title: "AI reads the whole site", note: "Pages, offers, and competitors" },
        { icon: "gauge", title: "Scores what matters", note: "Fix-first list ranked by impact" },
        { icon: "doc", title: "Builds a clear report", note: "Plain-English recommendations" },
        { icon: "spark", title: "Marketing kit included", note: "Ad copy and video script" },
      ],
      result: "A week of consulting-grade analysis delivered in about five minutes.",
    },
    resultStats: [
      { value: "82", label: "AI opportunity score" },
      { value: "+18%", label: "estimated impact" },
    ],
    details: {
      problem: "Stakeholders needed an easy way to understand website, SEO, and positioning gaps without reading technical audit output.",
      solution: "I connected crawl data, competitive analysis, and LLM-generated recommendations into a structured report and branded content workflow.",
      role: "System architecture, prompt design, crawler workflow, report structure, and output automation.",
      value: "The final output turns analysis into a client-ready action plan and marketing asset package.",
    },
  },
  {
    diagramId: "voice-suite",
    category: "Workflow Automation",
    title: "n8n + Synthflow Automation Suite",
    badge: "Confidential client project",
    summary:
      "The client's call operation lived in a Google Sheet and depended on someone remembering to dial, log, and follow up. Now adding a row is all it takes: the system places the AI call, handles every outcome automatically, retries busy numbers, schedules callbacks, logs completed calls, and writes the result and next step back to the sheet.",
    tools: ["n8n", "Synthflow AI", "Google Sheets", "JavaScript", "REST API"],
    outcome: "A fragile manual workflow became a monitored automation with clear outcomes.",
    story: {
      label: "How it works",
      steps: [
        { icon: "sheet", title: "Add a row to a sheet", note: "The team keeps using Google Sheets" },
        { icon: "phone", title: "AI makes the call", note: "The right person and number" },
        { icon: "branch", title: "Every outcome handled", note: "Busy, retry, and callback paths" },
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
      problem: "The workflow depended on scattered manual updates and had no clean post-call routing or audit trail.",
      solution: "I split the system into pre-call and post-call flows with number matching, status routing, retry branches, and sheet writeback.",
      role: "n8n architecture, Synthflow integration, webhook handling, JavaScript transforms, and production testing.",
      value: "The system now tracks what happened, which number was used, and what the next action should be.",
    },
  },
];
