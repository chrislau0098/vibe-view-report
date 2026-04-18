import { useRef } from "react";
import { useReducedMotion, useInView } from "motion/react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * WebGL shader backdrop for Hero section.
 * Pauses the animation loop when the Hero is scrolled out of view
 * to avoid continuous 60fps GPU work while off-screen.
 */
export function HeroShaderBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // No `once` — re-evaluates on every intersection change
  const visible = useInView(ref, { margin: "200px 0px" });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      <MeshGradient
        className="w-full h-full"
        colors={["#0A0B0D", "#1A0E08", "#D75F28", "#3D1A0A", "#0A0B0D"]}
        speed={reduce || !visible ? 0 : 0.5}
        distortion={0.8}
        swirl={0.3}
        grainOverlay={0.12}
        style={{ opacity: 0.45 }}
      />
    </div>
  );
}
