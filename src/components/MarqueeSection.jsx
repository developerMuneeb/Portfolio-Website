const ROW_A = [
  "Agentic AI",
  "Workflow Automation",
  "AI Chatbots",
  "LangGraph Agents",
  "Voice AI Agents",
  "CRM Automation",
];

const ROW_B = ["n8n", "OpenAI", "LangChain", "Synthflow", "Power BI", "Python", "Docker", "PostgreSQL"];

function MarqueeItem({ label, index, isClone = false }) {
  return (
    <span className="marquee-item" aria-hidden={isClone ? "true" : undefined}>
      <span className="mono">/ {String(index + 1).padStart(2, "0")}</span>
      <span className="marquee-label">{label}</span>
      <span className="dot"></span>
    </span>
  );
}

function GhostItem({ label, isClone = false }) {
  return (
    <span className="marquee-item ghost" aria-hidden={isClone ? "true" : undefined}>
      <span className="marquee-label">{label}</span>
      <span className="dot"></span>
    </span>
  );
}

/** Dual-direction marquee: focus areas one way, tool names (outlined) the other. */
export default function MarqueeSection() {
  return (
    <div className="marquee" aria-label="Focus areas and tools">
      <div className="marquee-track">
        {ROW_A.map((label, index) => (
          <MarqueeItem key={label} label={label} index={index} />
        ))}
        {ROW_A.map((label, index) => (
          <MarqueeItem key={`${label}-clone`} label={label} index={index} isClone />
        ))}
      </div>
      <div className="marquee-track is-reverse">
        {ROW_B.map((label) => (
          <GhostItem key={label} label={label} />
        ))}
        {ROW_B.map((label) => (
          <GhostItem key={`${label}-clone`} label={label} isClone />
        ))}
      </div>
    </div>
  );
}
