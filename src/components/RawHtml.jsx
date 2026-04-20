export default function RawHtml({ html }) {
  return <div className="raw-html" dangerouslySetInnerHTML={{ __html: html }} />;
}
