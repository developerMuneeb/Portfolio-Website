import { useEffect } from "react";

export function usePortfolioEffects() {
  useEffect(() => {
    const revealNodes = [...document.querySelectorAll(".reveal, .stagger")];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canObserve = "IntersectionObserver" in window && !prefersReducedMotion;
    const observer = canObserve
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        )
      : null;
    if (observer) {
      revealNodes.forEach((el) => observer.observe(el));
    } else {
      revealNodes.forEach((el) => el.classList.add("in"));
    }

    const nav = document.getElementById("nav");
    const sections = ["about", "experience", "skills", "services", "work", "contact"].map((id) =>
      document.getElementById(id)
    );
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
    };
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(updateScrollState);
    };
    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    const glow = document.getElementById("cursorGlow");
    const canGlow =
      glow &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let moveHandler = null;

    if (canGlow) {
      let mx = window.innerWidth / 2;
      let my = window.innerHeight / 2;
      let gx = mx;
      let gy = my;
      moveHandler = (event) => {
        mx = event.clientX;
        my = event.clientY;
      };
      window.addEventListener("mousemove", moveHandler, { passive: true });
      const animate = () => {
        gx += (mx - gx) * 0.08;
        gy += (my - gy) * 0.08;
        glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
        rafId = requestAnimationFrame(animate);
      };
      animate();
    } else if (glow) {
      glow.style.display = "none";
    }

    const anchors = [...document.querySelectorAll('a[href^="#"]')];
    const anchorHandlers = anchors.map((anchor) => {
      const handler = (event) => {
        const id = anchor.getAttribute("href");
        if (!id || id.length < 2) return;
        const section = document.querySelector(id);
        if (!section) return;
        event.preventDefault();
        window.scrollTo({
          top: section.offsetTop - 60,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      };
      anchor.addEventListener("click", handler);
      return [anchor, handler];
    });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (moveHandler) window.removeEventListener("mousemove", moveHandler);
      if (rafId) cancelAnimationFrame(rafId);
      anchorHandlers.forEach(([anchor, handler]) => anchor.removeEventListener("click", handler));
    };
  }, []);
}
