import { useEffect } from "react";

export function usePortfolioEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${active}`);
      });
      document.documentElement.dataset.section = active ?? "top";
    };
    const onScroll = () => {
      if (!scrollRaf) scrollRaf = window.requestAnimationFrame(updateScrollState);
    };
    updateScrollState();
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
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
      document.removeEventListener("click", onDocClick);
    };
  }, []);
}
