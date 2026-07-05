import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/**
 * Pointer-tracking 3D tilt card. Disabled for touch devices and reduced motion.
 * Renders a motion element so it can also carry Stagger variants from a parent.
 */
export default function TiltCard({
  as = "div",
  maxTilt = 5,
  className,
  children,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 220,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 220,
    damping: 24,
  });

  const disabled =
    reduce ||
    (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  const onPointerMove = (event) => {
    const el = ref.current;
    if (!el || disabled) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    // Expose pointer position for CSS spotlight effects
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };

  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={
        disabled
          ? style
          : { ...style, rotateX, rotateY, transformPerspective: 900, willChange: "transform" }
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
