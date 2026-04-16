import { motion } from "motion/react";

type Position = "top-center" | "top-left" | "top-right" | "bottom-center";
type Hue = "orange" | "cool";

interface SpotlightGradientProps {
  position?: Position;
  hue?: Hue;
  intensity?: number; // 0-1
  animate?: boolean;
  className?: string;
}

const positionStyles: Record<Position, string> = {
  "top-center":  "top-0 left-0 right-0",
  "top-left":    "top-0 left-0",
  "top-right":   "top-0 right-0",
  "bottom-center": "bottom-0 left-0 right-0",
};

export function SpotlightGradient({
  position = "top-center",
  hue = "orange",
  intensity = 1,
  animate: shouldAnimate = false,
  className,
}: SpotlightGradientProps) {
  const isOrange = hue === "orange";
  const gradient = isOrange
    ? `radial-gradient(ellipse 1200px 600px at 50% 0%, oklch(0.65 0.175 42 / ${0.18 * intensity}), transparent 70%)`
    : `radial-gradient(ellipse 1000px 500px at 20% 0%, oklch(0.45 0.10 240 / ${0.15 * intensity}), transparent 65%)`;

  const Comp = shouldAnimate ? motion.div : "div";
  const animateProps = shouldAnimate
    ? {
        animate: { backgroundPositionX: ["0%", "100%", "0%"] },
        transition: { duration: 12, repeat: Infinity, ease: "linear" as const },
      }
    : {};

  return (
    <Comp
      className={`pointer-events-none absolute ${positionStyles[position]} h-[600px] ${className ?? ""}`}
      style={{ background: gradient }}
      {...animateProps}
    />
  );
}
