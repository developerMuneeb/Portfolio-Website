import { useEffect } from "react";

/**
 * Global page effects: nav scrolled state + scroll-spy, cursor glow,
 * smooth-scroll anchor handling. Scroll reveals live in the Framer
 * Motion primitives (src/components/motion), not here.
 */
export function usePortfolioEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Nav scrolled state + scroll spy
    const nav = document.getElementById("nav");
    const sectionIds = ["about", "experience", "credentials", "skills", "services", "work", "contact"];
    const sections = sectionIds.map((id) => document.getElementById(id));
    const links = [...document.querySelectorAll(".nav-links a")];
    let scrollRaf = 0;
    const updateScrollState = () => {
      scrollRaf = 0;
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
      let active = null;
      const y = window.scrollY + 140;
      sections.forEach((section) => {
        if (section && section.offsetTop <= y) active = section.id;
      });
      links.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === `#${active}`)
      );
      // Drives the ambient background color story (see .ambience in base.css)
      document.documentElement.dataset.section = active ?? "top";
    };
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(updateScrollState);
    };
    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Custom cursor: dot follows instantly, ring trails with a lerp and
    // grows over interactive elements. Fine pointers only; transform-only.
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    const canCursor =
      dot && ring && window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion;
    let rafId = 0;
    let moveHandler = null;
    let overHandler = null;
    let outHandler = null;

    if (canCursor) {
      let mx = -100;
      let my = -100;
      let rx = -100;
      let ry = -100;
      let idle = true;
      moveHandler = (event) => {
        mx = event.clientX;
        my = event.clientY;
        if (idle) {
          idle = false;
          rx = mx;
          ry = my;
        }
      };
      const INTERACTIVE = "a, button, summary, .btn, [role='button']";
      overHandler = (event) => {
        if (event.target.closest?.(INTERACTIVE)) ring.classList.add("is-active");
      };
      outHandler = (event) => {
        if (event.target.closest?.(INTERACTIVE)) ring.classList.remove("is-active");
      };
      window.addEventListener("mousemove", moveHandler, { passive: true });
      document.addEventListener("pointerover", overHandler, { passive: true });
      document.addEventListener("pointerout", outHandler, { passive: true });
      const animate = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        rafId = requestAnimationFrame(animate);
      };
      animate();
    } else {
      if (dot) dot.style.display = "none";
      if (ring) ring.style.display = "none";
    }

    // Smooth-scroll for in-page anchors (delegated so it also covers
    // links mounted later, e.g. the mobile menu).
    const onDocClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const section = document.querySelector(id);
      if (!section) return;
      event.preventDefault();
      // Deferred a frame so any body scroll-lock (mobile menu) is
      // released before scrolling.
      requestAnimationFrame(() => {
        window.scrollTo({
          top: section.offsetTop - 60,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      });
    };
    document.addEventListener("click", onDocClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (moveHandler) window.removeEventListener("mousemove", moveHandler);
      if (overHandler) document.removeEventListener("pointerover", overHandler);
      if (outHandler) document.removeEventListener("pointerout", outHandler);
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("click", onDocClick);
    };
  }, []);
}
