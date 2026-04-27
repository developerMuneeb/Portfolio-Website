import RawHtml from './RawHtml';

const html = "<footer>\r\n  <div class=\"l\">\r\n    <span>&copy; 2026 Muhammad Muneeb</span>\r\n    <span>KHI &middot; PK</span>\r\n  </div>\r\n  <div>Built with React, SVG systems and motion design.</div>\r\n</footer>";

export default function SiteFooter() {
  return <RawHtml html={html} />;
}
