import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useIntro } from "./IntroProvider";
import { EASE, EASE_CURTAIN } from "./ease";
import { canRender3D, loadWorld } from "../hero3d/support";

const NAME = "MUHAMMAD MUNEEB";
const COUNT_MS = 1150;

/**
 * Branded intro: name rises letter by letter while a counter runs to 100,
 * then a curtain wipes up into the hero. Plays once per session, never
 * under reduced motion. The page renders underneath the whole time, and
 * the 3D world chunk is fetched while this plays so it's warm on reveal.
 */
export default function Preloader() {
  const { needsIntro, finishIntro } = useIntro();
  const [visible, setVisible] = useState(needsIntro);
  const [leaving, setLeaving] = useState(false);
  const count = useMotionValue(0);
  const label = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));
  const fill = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    if (!needsIntro) return undefined;
    if (canRender3D()) loadWorld().catch(() => {});

    const root = document.documentElement;
    root.classList.add("is-intro");
    // Lenis is created in a parent effect that runs after this one
    const lockRaf = requestAnimationFrame(() => window.__lenis?.stop());

    let locked = true;
    const unlock = () => {
      if (!locked) return;
      locked = false;
      cancelAnimationFrame(lockRaf);
      root.classList.remove("is-intro");
      window.__lenis?.start();
    };

    const counter = animate(count, 100, { duration: COUNT_MS / 1000, ease: [0.65, 0, 0.35, 1] });
    const timer = setTimeout(() => {
      unlock();
      setLeaving(true);
      finishIntro();
    }, COUNT_MS + 120);

    return () => {
      counter.stop();
      clearTimeout(timer);
      unlock();
    };
  }, [needsIntro, finishIntro, count]);

  if (!visible) return null;

  return (
    <motion.div
      className="preloader"
      aria-hidden="true"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={leaving ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
      transition={{ duration: 0.95, ease: EASE_CURTAIN }}
      onAnimationComplete={() => {
        if (leaving) setVisible(false);
      }}
    >
      <motion.div
        className="preloader-inner"
        animate={leaving ? { y: -60, opacity: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE_CURTAIN }}
      >
        <div className="preloader-name display">
          {NAME.split(" ").map((word, w, words) => {
            const offset = words.slice(0, w).join("").length;
            return (
              <span className="preloader-word" key={word}>
                {word.split("").map((char, c) => (
                  <span className="preloader-mask" key={c}>
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.08 + (offset + c) * 0.035, ease: EASE }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </span>
            );
          })}
        </div>
        <div className="preloader-meta mono">
          <span>AI ENGINEER &middot; AGENTS &amp; AUTOMATION</span>
          <motion.span className="preloader-count">{label}</motion.span>
        </div>
        <div className="preloader-bar">
          <motion.span style={{ scaleX: fill }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
