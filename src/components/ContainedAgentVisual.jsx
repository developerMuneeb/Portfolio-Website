import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const nodes = [
  { id: "intent", label: "User intent", meta: "Natural language", x: 14, y: 17, tone: "cyan" },
  { id: "knowledge", label: "RAG context", meta: "Verified knowledge", x: 72, y: 15, tone: "green" },
  { id: "commerce", label: "Live commerce", meta: "Catalog + cart", x: 76, y: 69, tone: "coral" },
  { id: "automation", label: "Automation", meta: "n8n + CRM", x: 12, y: 70, tone: "amber" },
];

const signals = [
  { points: { cx: [18, 33, 50], cy: [22, 34, 50] }, delay: 0.2, duration: 4.4 },
  { points: { cx: [77, 64, 50], cy: [21, 34, 50] }, delay: 1.4, duration: 4.8 },
  { points: { cx: [50, 65, 80], cy: [50, 62, 74] }, delay: 2.2, duration: 4.6 },
  { points: { cx: [50, 33, 16], cy: [50, 62, 74] }, delay: 3.1, duration: 5 },
];

export default function ContainedAgentVisual() {
  const reduce = useReducedMotion();
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, { stiffness: 130, damping: 22 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 130, damping: 22 });

  const onPointerMove = (event) => {
    if (reduce || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateXTarget.set(y * -4);
    rotateYTarget.set(x * 5);
  };

  const resetTilt = () => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
  };

  return (
    <motion.div
      className="hero-signal-visual"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="hero-signal-head">
        <span><i />AGENT ORCHESTRATION</span>
        <span>LIVE / 01</span>
      </div>

      <div className="hero-signal-stage">
        <svg className="hero-signal-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M18 22 C30 25 38 40 50 50" />
          <path d="M77 21 C66 26 61 39 50 50" />
          <path d="M50 50 C64 58 71 69 80 74" />
          <path d="M50 50 C38 58 27 69 16 74" />
          <path className="route-secondary" d="M18 22 C43 12 57 12 77 21" />
          <path className="route-secondary" d="M16 74 C40 86 61 86 80 74" />
          {!reduce && signals.map((signal, index) => (
            <motion.circle
              key={index}
              className="hero-route-signal"
              r="0.9"
              initial={{ cx: signal.points.cx[0], cy: signal.points.cy[0], opacity: 0 }}
              animate={{ ...signal.points, opacity: [0, 1, 1, 0] }}
              transition={{
                duration: signal.duration,
                delay: signal.delay,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.8,
              }}
            />
          ))}
        </svg>

        <div className="hero-signal-plane" aria-hidden="true" />

        {nodes.map((node) => (
          <motion.div
            className={`hero-agent-node hero-agent-node-${node.tone}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            animate={reduce ? undefined : { y: [0, -3, 0], opacity: [0.84, 1, 0.84] }}
            transition={{ duration: 4.8, delay: node.x / 50, repeat: Infinity, ease: "easeInOut" }}
            key={node.id}
          >
            <i aria-hidden="true" />
            <strong>{node.label}</strong>
            <small>{node.meta}</small>
          </motion.div>
        ))}

        <motion.div
          className="hero-agent-core"
          animate={reduce ? undefined : { scale: [1, 1.025, 1], opacity: [0.92, 1, 0.92] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="hero-core-layer hero-core-layer-one" aria-hidden="true" />
          <span className="hero-core-layer hero-core-layer-two" aria-hidden="true" />
          <span className="hero-core-mark" aria-hidden="true">M</span>
          <strong>LANGGRAPH</strong>
          <small>ROUTE / PLAN / ACT</small>
        </motion.div>
      </div>

      <div className="hero-signal-foot">
        <span><b>06</b> CONNECTED SYSTEMS</span>
        <span><b>24/7</b> EVENT ROUTING</span>
        <span><b>LIVE</b> STATE SYNC</span>
      </div>
    </motion.div>
  );
}
