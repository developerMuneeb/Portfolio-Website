import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0.8, 0.2, 1];

const parentVariants = {
  hidden: {},
  show: (stagger) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.08 },
  }),
};

/**
 * Parent container that staggers its <StaggerItem> children into view.
 */
export function Stagger({ as = "div", stagger = 0.08, className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      variants={parentVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", y = 20, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  const variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <Tag className={className} variants={variants} {...rest}>
      {children}
    </Tag>
  );
}
