import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";

interface GrowthCurveProps {
  className?: string;
  /**
   * Decorative mode: hides year labels and data annotations.
   * Use when rendering as a full-width background horizon.
   * Also removes preserveAspectRatio distortion on text.
   */
  decorative?: boolean;
}

export function GrowthCurve({ className, decorative = false }: GrowthCurveProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  // Decorative: undulating path (起伏效果) — starts/ends 3 units from SVG edge
  // so the curve doesn't visually hug the screen boundary.
  // Two states for breathing animation; pathA is the initial/rest shape.
  const pathA = "M 3,196 C 55,194 100,174 150,152 C 195,132 215,148 260,122 C 300,98 355,20 397,4";
  const pathB = "M 3,192 C 55,190 100,169 150,147 C 195,127 215,143 260,117 C 300,93 355,17 397,8";

  // Default: multi-segment path that matches year-over-year data shape
  const curvePath = decorative ? pathA
    : "M 10,180 C 60,175 90,160 130,140 C 170,120 180,100 220,75 C 260,50 290,30 310,15 C 325,5 340,4 390,2";

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 200"
      className={`w-full ${className ?? ""}`}
      aria-hidden="true"
      overflow="visible"
      // Decorative: stretch to fill container (text hidden so no distortion)
      // Default: preserve aspect ratio for accurate data display
      preserveAspectRatio={decorative ? "none" : "xMidYMid meet"}
    >
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.45 0.12 42 / 0)" />
          <stop offset="30%" stopColor="oklch(0.55 0.14 42)" />
          <stop offset="100%" stopColor="oklch(0.73 0.185 48)" />
        </linearGradient>
        <filter id="endGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Year tick lines — hidden in decorative mode */}
      {!decorative && [70, 170, 260, 390].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="185" x2={x} y2="195" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <text x={x} y="200" textAnchor="middle" fontSize="9" fill="white" opacity="0.4"
            fontFamily="'Geist Variable', monospace">
            {2023 + i}
          </text>
        </g>
      ))}

      {/* Main curve */}
      <motion.path
        d={curvePath}
        fill="none"
        stroke="url(#curveGrad)"
        strokeWidth={decorative ? "0.8" : "2.5"}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? {
          pathLength: 1,
          opacity: 1,
          ...(decorative ? { d: pathB } : {}),
        } : {}}
        transition={decorative ? {
          pathLength: { duration: 3.2, ease: EASE.out },
          opacity: { duration: 0.6 },
          d: {
            delay: 3.6,         // starts after draw completes
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: [0.45, 0, 0.55, 1], // EASE.spring — gentle breathe
          },
        } : {
          duration: 2.4,
          ease: EASE.out,
        }}
      />

      {/* Decorative mode: no SVG dots (circles distort with preserveAspectRatio="none").
          Endpoint glow is rendered as an HTML element in the parent (Hero.tsx). */}

      {/* End data point + label — hidden in decorative mode */}
      {!decorative && (
        <>
          <motion.circle
            cx="390" cy="2" r="5"
            fill="oklch(0.73 0.185 48)"
            filter="url(#endGlow)"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 2.2, ease: EASE.bounce }}
            style={{ transformOrigin: "390px 2px" }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 2.4 }}
          >
            <text x="382" y="-6" textAnchor="end" fontSize="10" fill="oklch(0.73 0.185 48)"
              fontFamily="'Geist Variable', monospace" fontWeight="600">
              4765.7万
            </text>
          </motion.g>
        </>
      )}
    </svg>
  );
}
