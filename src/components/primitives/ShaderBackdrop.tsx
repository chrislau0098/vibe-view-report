import { useReducedMotion } from "motion/react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * WebGL shader backdrop for Hero section.
 * Uses MeshGradient (breathing warm mesh) with built-in grainOverlay.
 * Automatically pauses animation when prefers-reduced-motion is set.
 */
export function HeroShaderBackdrop() {
  const reduce = useReducedMotion();

  return (
    <MeshGradient
      className="absolute inset-0 w-full h-full pointer-events-none"
      colors={["#0A0B0D", "#1A0E08", "#D75F28", "#3D1A0A", "#0A0B0D"]}
      speed={reduce ? 0 : 0.15}
      distortion={0.8}
      swirl={0.3}
      grainOverlay={0.12}
      style={{ opacity: 0.45 }}
    />
  );
}
