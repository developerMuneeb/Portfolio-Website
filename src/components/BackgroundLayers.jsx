import RawHtml from './RawHtml';

const html = "<div class=\"backdrop\"></div>\r\n<div class=\"grid-bg\"></div>\r\n<div class=\"noise\"></div>\r\n<div class=\"cursor-glow\" id=\"cursorGlow\"></div>";

export default function BackgroundLayers() {
  return <RawHtml html={html} />;
}
