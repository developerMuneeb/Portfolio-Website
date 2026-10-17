import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { setTheme, useTheme } from "../theme";
import { EASE } from "./motion/ease";

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Sun/moon toggle. One SVG morphs between states: the disc's mask slides a
 * second circle in to carve a crescent, while the rays spin and shrink away.
 */
export default function ThemeToggle({ className = "" }) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const maskId = `theme-moon-${useId().replace(/:/g, "")}`;
  const isLight = theme === "light";
  const next = isLight ? "dark" : "light";
  const spring = reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 20 };

  const onClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTheme(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={onClick}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <motion.svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        animate={{ rotate: isLight ? 0 : -90 }}
        transition={spring}
      >
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="#fff" />
          <motion.circle
            r="9"
            fill="#000"
            initial={false}
            animate={isLight ? { cx: 30, cy: -6 } : { cx: 18.5, cy: 5.5 }}
            transition={spring}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: isLight ? 4.6 : 8.4 }}
          transition={spring}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: isLight ? 1 : 0, scale: isLight ? 1 : 0.4, rotate: isLight ? 0 : -45 }}
          transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
          style={{ transformOrigin: "12px 12px" }}
        >
          {RAYS.map((angle) => (
            <line key={angle} x1="12" y1="2.2" x2="12" y2="4.4" transform={`rotate(${angle} 12 12)`} />
          ))}
        </motion.g>
      </motion.svg>
    </button>
  );
}
