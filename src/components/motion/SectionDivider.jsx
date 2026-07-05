import { motion } from "framer-motion";

/** Gradient hairline that draws itself in when the section reveals. */
export default function SectionDivider() {
  return (
    <motion.div
      className="section-divider"
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
    />
  );
}
