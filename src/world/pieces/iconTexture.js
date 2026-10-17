import * as THREE from "three";

/** Logo on a soft light disc so dark logos (GitHub, etc.) read on ink too. */
export function iconTexture(src) {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d");
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const paint = (img) => {
    ctx.clearRect(0, 0, 128, 128);
    ctx.fillStyle = "rgba(247, 245, 255, 0.94)";
    ctx.beginPath();
    ctx.arc(64, 64, 60, 0, Math.PI * 2);
    ctx.fill();
    if (img) ctx.drawImage(img, 30, 30, 68, 68);
    tex.needsUpdate = true;
  };
  paint(null);
  const img = new Image();
  img.onload = () => paint(img);
  img.src = src;
  return tex;
}
