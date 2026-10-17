import { createContext, useCallback, useContext, useMemo, useState } from "react";

const SEEN_KEY = "mm-intro-seen";

const IntroContext = createContext({ needsIntro: false, introDone: true, finishIntro: () => {} });

function shouldPlayIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !window.sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
}

/**
 * Coordinates the once-per-session preloader with the hero entrance: the
 * hero holds its line-mask reveal until `introDone`, so the headline rises
 * exactly as the curtain lifts.
 */
export function IntroProvider({ children }) {
  const [needsIntro] = useState(shouldPlayIntro);
  const [introDone, setIntroDone] = useState(!needsIntro);

  const finishIntro = useCallback(() => {
    setIntroDone(true);
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage blocked — the intro just plays again next load */
    }
  }, []);

  const value = useMemo(() => ({ needsIntro, introDone, finishIntro }), [needsIntro, introDone, finishIntro]);
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
