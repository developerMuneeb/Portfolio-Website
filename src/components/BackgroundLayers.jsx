import ShaderBackdrop from "./ShaderBackdrop";

export default function BackgroundLayers() {
  return (
    <>
      <div className="backdrop" aria-hidden="true"></div>
      <ShaderBackdrop />
      <div className="ambient-field" aria-hidden="true"></div>
      <div className="grid-bg" aria-hidden="true"></div>
      <div className="edge-beam edge-beam-left" aria-hidden="true"></div>
      <div className="edge-beam edge-beam-right" aria-hidden="true"></div>
      <div className="noise" aria-hidden="true"></div>
    </>
  );
}
