import { Children, Fragment, isValidElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./ease";

const container = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const word = {
  hidden: { y: "105%", rotate: 4 },
  shown: { y: 0, rotate: 0, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Word-mask rise for section headings (Shopify Editions-style staged type).
 * Splits plain-text children into words; element children (e.g. the
 * outlined/italic accent spans) move as single units so their styling
 * survives. Text stays in the DOM in order, so it reads normally.
 */
export default function SplitWords({ as = "h2", className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.h2;
  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }

  const units = [];
  Children.forEach(children, (child, i) => {
    if (typeof child === "string") {
      child.split(/(\s+)/).forEach((part, j) => {
        if (!part) return;
        if (/^\s+$/.test(part)) units.push(<Fragment key={`${i}-${j}`}> </Fragment>);
        else units.push({ key: `${i}-${j}`, node: part });
      });
    } else if (isValidElement(child) && child.type === "br") {
      units.push(<br key={`br-${i}`} />);
    } else if (child !== null && child !== undefined && child !== false) {
      units.push({ key: `el-${i}`, node: child });
    }
  });

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      {...rest}
    >
      {units.map((unit) =>
        isValidElement(unit) ? (
          unit
        ) : (
          <span className="word-mask" key={unit.key}>
            <motion.span className="word" variants={word}>
              {unit.node}
            </motion.span>
          </span>
        ),
      )}
    </Tag>
  );
}
