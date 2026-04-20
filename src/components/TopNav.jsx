import RawHtml from './RawHtml';

const html = "<nav class=\"top\" id=\"nav\">\r\n  <a href=\"#top\" class=\"brand\" aria-label=\"Muneeb AI portfolio home\">\r\n    <span class=\"brand-mark\">\r\n      <span class=\"brand-orbit\"></span>\r\n      <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2 L4 7 L12 12 L20 7 Z\"></path><path d=\"M4 17 L12 22 L20 17\"></path><path d=\"M4 12 L12 17 L20 12\"></path></svg>\r\n    </span>\r\n    <span class=\"brand-word\">\r\n      <span class=\"brand-name\">MUNEEB</span>\r\n      <span class=\"brand-dot\"></span>\r\n      <span class=\"brand-ai\">AI</span>\r\n    </span>\r\n  </a>\r\n  <div class=\"nav-links\">\r\n    <a href=\"#about\" class=\"active\">About</a>\r\n    <a href=\"#experience\" class=\"\">Experience</a>\r\n    <a href=\"#skills\" class=\"\">Stack</a>\r\n    <a href=\"#work\" class=\"\">Work</a>\r\n    <a href=\"#contact\" class=\"\">Contact</a>\r\n  </div>\r\n  <a class=\"nav-cta\" href=\"#contact\"><span class=\"dot\"></span><span>Available for hire</span></a>\r\n</nav>";

export default function TopNav() {
  return <RawHtml html={html} />;
}
