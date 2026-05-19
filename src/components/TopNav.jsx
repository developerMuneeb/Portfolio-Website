import RawHtml from './RawHtml';

const html = `<nav class="top" id="nav">
  <a href="#top" class="brand" aria-label="Muneeb AI portfolio home">
    <span class="brand-mark">
      <span class="brand-orbit"></span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 L4 7 L12 12 L20 7 Z"></path><path d="M4 17 L12 22 L20 17"></path><path d="M4 12 L12 17 L20 12"></path></svg>
    </span>
    <span class="brand-word">
      <span class="brand-name">MUNEEB</span>
      <span class="brand-dot"></span>
      <span class="brand-ai">AI</span>
    </span>
  </a>
  <div class="nav-links">
    <a href="#about" class="active">About</a>
    <a href="#experience" class="">Experience</a>
    <a href="#skills" class="">Stack</a>
    <a href="#services" class="">Services</a>
    <a href="#work" class="">Work</a>
    <a href="#contact" class="">Contact</a>
  </div>
  <div class="nav-actions">
    <a class="nav-resume" href="/resume/Muhammad-Muneeb-Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open Muhammad Muneeb resume">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"></path><path d="M14 2v5h5"></path><path d="M9 13h6"></path><path d="M9 17h4"></path></svg>
      <span>Resume</span>
    </a>
    <a class="nav-cta" href="#contact"><span class="dot"></span><span>Available for hire</span></a>
  </div>
</nav>`;

export default function TopNav() {
  return <RawHtml html={html} />;
}
