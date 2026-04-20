import { useEffect } from "react";

export function usePortfolioEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal, .stagger").forEach((el) => observer.observe(el));

    const nav = document.getElementById("nav");
    const sections = ["about", "experience", "skills", "work", "contact"].map((id) =>
      document.getElementById(id)
    );
    const links = [...document.querySelectorAll(".nav-links a")];
    const onScroll = () => {
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
    onScroll();
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
        window.scrollTo({ top: section.offsetTop - 60, behavior: "smooth" });
      };
      anchor.addEventListener("click", handler);
      return [anchor, handler];
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (moveHandler) window.removeEventListener("mousemove", moveHandler);
      if (rafId) cancelAnimationFrame(rafId);
      anchorHandlers.forEach(([anchor, handler]) => anchor.removeEventListener("click", handler));
    };
  }, []);
}
