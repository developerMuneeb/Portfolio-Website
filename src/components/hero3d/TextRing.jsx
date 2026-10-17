import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../theme";

const W = 4096;
const SEP = "  •  ";

/**
 * Text that wraps the core like a band. Drawn once into a canvas that tiles
 * seamlessly around an open cylinder: the front face reads normally, the
 * back face (seen through the glass) is a dim mirror, which sells the wrap.
 */
function drawBand(canvas, { words, font, color, fill }) {
  const ctx = canvas.getContext("2d");
  const h = canvas.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, W, h);
  ctx.font = font;
  const unit = words.join(SEP) + SEP;
  const unitW = ctx.measureText(unit).width;
  const repeats = Math.max(1, Math.round(W / unitW));
  // stretch slightly so a whole number of repeats meets itself at the seam
  ctx.setTransform(W / (repeats * unitW), 0, 0, 1, 0, 0);
  ctx.textBaseline = "middle";
  if (fill) {
    const grad = ctx.createLinearGradient(0, 0, repeats * unitW, 0);
    fill.forEach((stop, i) => grad.addColorStop(i / (fill.length - 1), stop));
    ctx.fillStyle = grad;
  } else ctx.fillStyle = color;
  for (let i = 0; i < repeats; i += 1) ctx.fillText(unit, i * unitW, h / 2 + 2);
}

export default function TextRing({ radius, height, words, font, canvasHeight = 112, palette, frontOpacity = 1, backOpacity = 0.22, motion }) {
  const theme = useTheme() === "light" ? "light" : "dark";
  const group = useRef(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = canvasHeight;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.wrapS = THREE.RepeatWrapping;
    return tex;
  }, [canvasHeight]);
  const geometry = useMemo(() => new THREE.CylinderGeometry(radius, radius, height, 160, 1, true), [radius, height]);

  useEffect(() => {
    // Webfonts may arrive after first paint — redraw once they're ready
    let cancelled = false;
    const paint = () => {
      if (cancelled) return;
      drawBand(texture.image, { words, font, ...palette[theme] });
      texture.needsUpdate = true;
    };
    paint();
    document.fonts?.ready.then(paint);
    return () => {
      cancelled = true;
    };
  }, [texture, words, font, palette, theme]);

  useEffect(
    () => () => {
      texture.dispose();
      geometry.dispose();
    },
    [texture, geometry],
  );

  useFrame((state, delta) => {
    if (group.current) motion(group.current, state, delta);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} renderOrder={1}>
        <meshBasicMaterial map={texture} transparent opacity={backOpacity} side={THREE.BackSide} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh geometry={geometry} renderOrder={3}>
        <meshBasicMaterial map={texture} transparent opacity={frontOpacity} side={THREE.FrontSide} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}
