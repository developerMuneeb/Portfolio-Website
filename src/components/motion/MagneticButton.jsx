import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Magnetic hover effect for CTAs: the element is gently pulled toward the
 * cursor while hovered. Desktop-only; no-op on touch / reduced motion.
 */
export default function MagneticButton({
  as = "a",
  strength = 0.3,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const disabled =
    reduce ||
    (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  const onPointerMove = (event) => {
    const el = ref.current;
    if (!el || disabled) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = motion[as] ?? motion.a;

  return (
    <Tag
      ref={ref}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={disabled ? undefined : { x: sx, y: sy }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
