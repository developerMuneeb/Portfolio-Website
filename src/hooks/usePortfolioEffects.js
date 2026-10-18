import { useEffect } from "react";

export function usePortfolioEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = document.getElementById("nav");
    const sectionIds = ["about", "experience", "credentials", "skills", "services", "work", "contact"];
    const sections = sectionIds.map((id) => document.getElementById(id));
    const links = [...document.querySelectorAll(".nav-links a")];
    let scrollRaf = 0;
    // Section tops are measured on resize, never during scroll: reading
    // offsetTop each frame forced a layout mid-scroll (jank).
    let tops = [];
    const measure = () => {
      tops = sections.map((section) => (section ? section.offsetTop : Infinity));
    };
    let scrolled = null;
    let current;
    const updateScrollState = () => {
      scrollRaf = 0;
      const isScrolled = window.scrollY > 20;
      if (nav && isScrolled !== scrolled) {
        nav.classList.toggle("scrolled", isScrolled);
        scrolled = isScrolled;
      }
      let active = null;
      const y = window.scrollY + 140;
      tops.forEach((top, i) => {
        if (top <= y) active = sectionIds[i];
      });
      // Only touch the DOM when the section changes: rewriting the root's
      // data-section every frame invalidated style for the whole page.
      if (active === current) return;
      current = active;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${active}`);
      });
      document.documentElement.dataset.section = active ?? "top";
    };
    const onScroll = () => {
      if (!scrollRaf) scrollRaf = window.requestAnimationFrame(updateScrollState);
    };
    measure();
    updateScrollState();
    const ro = new ResizeObserver(() => {
      measure();
      updateScrollState();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    const onDocClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const section = document.querySelector(id);
      if (!section) return;
      event.preventDefault();
      window.requestAnimationFrame(() => {
        if (window.__lenis) {
          window.__lenis.scrollTo(section, { offset: -60 });
        } else {
          window.scrollTo({
            top: section.offsetTop - 60,
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
      });
    };
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
      document.removeEventListener("click", onDocClick);
    };
  }, []);
}
