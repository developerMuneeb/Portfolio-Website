import Reveal from "../motion/Reveal";
import ScrambleText from "../motion/ScrambleText";
import SplitWords from "../motion/SplitWords";

/**
 * Editorial chapter header: mono index kicker that decodes in, a huge
 * display title whose words rise in (accent words in serif italic via
 * <em>), and an optional lede.
 */
export default function ChapterHead({ index, label, children, lede }) {
  return (
    <header className="ch-head">
      <ScrambleText as="div" className="ch-kicker" text={`(${index}) — ${label}`} />
      <SplitWords className="ch-title">{children}</SplitWords>
      {lede ? (
        <Reveal as="p" className="ch-lede" delay={0.15} y={16}>
          {lede}
        </Reveal>
      ) : null}
    </header>
  );
}
