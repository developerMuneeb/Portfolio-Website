import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

// Emissive panels around the core, baked once into a PMREM environment map.
const PANELS = [
  { color: "#22d3ee", intensity: 3, position: [2.6, 2, -3], scale: 3, ring: true },
  { color: "#818cf8", intensity: 2.4, position: [-3.2, 0.4, -2], scale: [4, 1.2] },
  { color: "#2dd4bf", intensity: 2, position: [0, -2.6, -1], scale: [6, 0.6] },
  { color: "#ffffff", intensity: 4, position: [0.4, 3, 2.2], scale: 1.1, ring: true },
  { color: "#f59e7a", intensity: 1.2, position: [3, -1.4, 1.5], scale: 2 },
];

/**
 * Local studio lighting for the glass core's reflections. A hand-rolled
 * alternative to drei's <Environment>/<Lightformer>, which drag HDR/EXR/
 * gain-map loaders into the bundle that this scene never uses.
 */
export default function StudioEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const envScene = new THREE.Scene();
    const plane = new THREE.PlaneGeometry(1, 1);
    const ring = new THREE.RingGeometry(0.32, 0.5, 48);
    const materials = [];

    PANELS.forEach((panel) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(panel.color).multiplyScalar(panel.intensity),
        side: THREE.DoubleSide,
      });
      materials.push(material);
      const mesh = new THREE.Mesh(panel.ring ? ring : plane, material);
      mesh.position.set(...panel.position);
      const [sx, sy] = Array.isArray(panel.scale) ? panel.scale : [panel.scale, panel.scale];
      mesh.scale.set(sx, sy, 1);
      mesh.lookAt(0, 0, 0);
      envScene.add(mesh);
    });

    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromScene(envScene, 0.04);
    scene.environment = target.texture;

    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
      plane.dispose();
      ring.dispose();
      materials.forEach((material) => material.dispose());
    };
  }, [gl, scene]);

  return null;
}
