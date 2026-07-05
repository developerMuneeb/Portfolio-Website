import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0.8, 0.2, 1];

/**
 * Cycles through a list of phrases with a vertical roll animation.
 * Static (first phrase) under reduced motion.
 */
export default function RotatingText({ phrases, interval = 2800, className }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), interval);
    return () => clearInterval(id);
  }, [reduce, interval, phrases.length]);

  if (reduce) return <span className={className}>{phrases[0]}</span>;

  return (
    <span className={`rotating-text ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          className="rotating-text-word"
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
