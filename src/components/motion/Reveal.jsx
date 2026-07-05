import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0.8, 0.2, 1];

/**
 * Scroll-reveal wrapper. Fades + rises the element into view once.
 * Respects prefers-reduced-motion (opacity-only fade).
 */
export default function Reveal({
  as = "div",
  delay = 0,
  duration = 0.7,
  y = 26,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduce ? 0.35 : duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
