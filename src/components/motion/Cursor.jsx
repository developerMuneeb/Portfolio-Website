import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, summary, [role='button'], label, select";
const TEXT_ENTRY = "input, textarea, [contenteditable='true']";

/**
 * Custom cursor: an instant dot plus a spring-lagged ring. The ring swells
 * over links/buttons and morphs into a labelled pill for any element with
 * `data-cursor="Label"` (project cards, the 3D hero, video). Fine-pointer
 * desktops only and never under reduced motion; text fields keep the
 * native caret, and keyboard focus styles are untouched.
 */
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState({ kind: "default", label: "" });
  const [hidden, setHidden] = useState(true);
  const [pressed, setPressed] = useState(false);
  const modeRef = useRef(mode);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.55 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const setModeIfChanged = (next) => {
      const prev = modeRef.current;
      if (prev.kind === next.kind && prev.label === next.label) return;
      modeRef.current = next;
      setMode(next);
    };

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setHidden(false);
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      // Keep the previous label text while the pill fades out
      const keep = modeRef.current.label;
      if (target.closest(TEXT_ENTRY)) {
        setModeIfChanged({ kind: "text", label: keep });
        return;
      }
      const labelled = target.closest("[data-cursor]");
      const interactive = target.closest(INTERACTIVE);
      // A real control inside a labelled region (e.g. a button on a card) wins
      if (labelled && (!interactive || interactive === labelled || interactive.contains(labelled))) {
        setModeIfChanged({ kind: "label", label: labelled.dataset.cursor || "" });
      } else if (interactive) {
        setModeIfChanged({ kind: "link", label: keep });
      } else {
        setModeIfChanged({ kind: "default", label: keep });
      }
    };
    const onLeave = () => setHidden(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onLeave);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isLabel = mode.kind === "label" && Boolean(mode.label);
  const ringSize = isLabel ? 84 : mode.kind === "link" ? 54 : 34;
  const visible = !hidden && mode.kind !== "text";

  return (
    // No wrapper: a fixed wrapper would form its own stacking context, and
    // mix-blend-mode would then blend with that empty layer instead of the
    // page — the cursor would render plain white (invisible on light pages).
    <>
      <motion.div className="cursor-dot" aria-hidden="true" style={{ x, y }} animate={{ opacity: visible && !isLabel ? 1 : 0, scale: pressed ? 0.6 : 1 }} transition={{ duration: 0.18 }} />
      <motion.div
        className={`cursor-ring${isLabel ? " is-label" : ""}${mode.kind === "link" ? " is-link" : ""}`}
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{ width: ringSize, height: ringSize, opacity: visible ? 1 : 0, scale: pressed ? 0.88 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        <motion.span animate={{ opacity: isLabel ? 1 : 0, scale: isLabel ? 1 : 0.6 }} transition={{ duration: 0.2 }}>
          {mode.label}
        </motion.span>
      </motion.div>
    </>
  );
}
