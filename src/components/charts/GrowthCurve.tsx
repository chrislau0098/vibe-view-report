import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";

interface GrowthCurveProps {
  className?: string;
}

export function GrowthCurve({ className }: GrowthCurveProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  // Decorative S-curve: starts low-left, rises steeply to top-right
  const curvePath =
    "M 10,180 C 60,175 90,160 130,140 C 170,120 180,100 220,75 C 260,50 290,30 310,15 C 325,5 340,4 390,2";

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 200"
      className={`w-full ${className ?? ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.45 0.12 42)" />
          <stop offset="50%" stopColor="oklch(0.65 0.175 42)" />
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

      {/* Year tick lines */}
      {[70, 170, 260, 390].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="185" x2={x} y2="195" stroke="white" strokeWidth="0.5" opacity="0.15" />
          <text x={x} y="200" textAnchor="middle" fontSize="9" fill="white" opacity="0.25"
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
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 2.4, ease: EASE.out }}
      />

      {/* End data point */}
      <motion.circle
        cx="390"
        cy="2"
        r="5"
        fill="oklch(0.73 0.185 48)"
        filter="url(#endGlow)"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 2.2, ease: EASE.bounce }}
        style={{ transformOrigin: "390px 2px" }}
      />

      {/* End label */}
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
    </svg>
  );
}
