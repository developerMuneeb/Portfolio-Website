import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#credentials", label: "Creds" },
  { href: "#skills", label: "Stack" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const EASE = [0.2, 0.8, 0.2, 1];

function BrandLogo() {
  return (
    <a href="#top" className="brand" aria-label="Muneeb AI portfolio home">
      <span className="brand-mark">
        <span className="brand-orbit"></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2 L4 7 L12 12 L20 7 Z" />
          <path d="M4 17 L12 22 L20 17" />
          <path d="M4 12 L12 17 L20 12" />
        </svg>
      </span>
      <span className="brand-word">
        <span className="brand-name">MUNEEB</span>
        <span className="brand-dot"></span>
        <span className="brand-ai">AI</span>
      </span>
    </a>
  );
}

function MobileMenu({ onClose }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="mobile-menu"
      id="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.28, ease: "easeOut" }}
    >
      <nav className="mobile-menu-links" aria-label="Mobile navigation">
        {NAV_LINKS.map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={onClose}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 + index * 0.05, ease: EASE }}
          >
            <span className="idx">/ {String(index + 1).padStart(2, "0")}</span>
            {link.label}
          </motion.a>
        ))}
      </nav>

      <motion.div
        className="mobile-menu-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 + NAV_LINKS.length * 0.05, ease: EASE }}
      >
        <a className="btn btn-primary" href="#contact" onClick={onClose}>
          Hire Me
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
        <a
          className="btn btn-ghost"
          href="/resume/Muhammad-Muneeb-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          View Resume
        </a>
        <div className="mobile-menu-meta">
          <span>Karachi &middot; GMT+5</span>
          <span>Available for hire</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  // useLayoutEffect so the lock is released synchronously on close —
  // anchor smooth-scroll (deferred to the next frame) must find the
  // page scrollable again.
  useLayoutEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  // Close the menu automatically if the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 981px)");
    const onChange = (event) => {
      if (event.matches) closeMenu();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [closeMenu]);

  return (
    <>
      <nav className="top" id="nav">
        <BrandLogo />

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a
            className="nav-resume"
            href="/resume/Muhammad-Muneeb-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Muhammad Muneeb resume"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
              <path d="M14 2v5h5" />
              <path d="M9 13h6" />
              <path d="M9 17h4" />
            </svg>
            <span>Resume</span>
          </a>
          <a className="nav-cta" href="#contact">
            <span className="dot"></span>
            <span>Available for hire</span>
          </a>
          <button
            type="button"
            className="nav-burger"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <AnimatePresence>{menuOpen ? <MobileMenu onClose={closeMenu} /> : null}</AnimatePresence>
    </>
  );
}
