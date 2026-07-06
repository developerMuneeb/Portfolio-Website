import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollLock } from "../hooks/useScrollLock";

/**
 * Glass modal that previews a sample deliverable for a project — the
 * concrete "here's what actually comes out the other end" artifact.
 * Locks body scroll (+ pauses Lenis) and closes on Escape/backdrop click,
 * same pattern as the mobile nav overlay.
 */
export default function ReportModal({ open, onClose, kicker, title, downloadHref, downloadLabel, children }) {
  const closeRef = useRef(null);

  useScrollLock(open, onClose);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="report-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="report-modal"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="report-head">
              <div>
                <span className="report-kicker">{kicker}</span>
                <h3>{title}</h3>
              </div>
              <button type="button" className="report-close" onClick={onClose} ref={closeRef} aria-label="Close sample report">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="report-body" data-lenis-prevent>
              {children}
            </div>

            <div className="report-foot">
              <span className="report-disclaimer">
                Sample deliverable — company names and figures are illustrative to demonstrate output
                structure, not real client data.
              </span>
              {downloadHref ? (
                <a className="report-download" href={downloadHref} download>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v12m0 0-4-4m4 4 4-4" />
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  </svg>
                  {downloadLabel}
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
