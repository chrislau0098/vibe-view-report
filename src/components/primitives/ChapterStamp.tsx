import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";

interface ChapterStampProps {
  number: number;
  className?: string;
}

export function ChapterStamp({ number, className }: ChapterStampProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const numStr = String(number).padStart(2, "0");
  const R = 44;
  const CX = 52;
  const CY = 52;
  const circumference = 2 * Math.PI * R;

  return (
    <motion.svg
      ref={ref}
      width="104"
      height="104"
      viewBox="0 0 104 104"
      className={`text-primary ${className ?? ""}`}
      initial={{ rotate: -15, scale: 0.85, opacity: 0 }}
      animate={inView ? { rotate: -8, scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE.bounce }}
    >
      {/* Outer ring */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.8"
      />
      {/* Inner ring */}
      <circle
        cx={CX}
        cy={CY}
        r={R - 6}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.4"
        strokeDasharray="3 4"
      />
      {/* Animated ring drawing */}
      <motion.circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={inView ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE.out }}
        style={{ rotate: -90, transformOrigin: `${CX}px ${CY}px` }}
      />
      {/* Chapter number */}
      <text
        x={CX}
        y={CY + 8}
        textAnchor="middle"
        fontSize="20"
        fontWeight="600"
        fontFamily="'Geist Variable', monospace"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        {numStr}
      </text>
      {/* Arc text path */}
      <defs>
        <path
          id={`arc-${number}`}
          d={`M ${CX - R + 6},${CY} A ${R - 6},${R - 6} 0 1,1 ${CX + R - 6},${CY}`}
        />
      </defs>
      <text fontSize="7" fontFamily="'Geist Variable', sans-serif" fill="currentColor" opacity="0.6" letterSpacing="1.5">
        <textPath href={`#arc-${number}`} startOffset="15%">
          TIME'S FRIEND · 2026
        </textPath>
      </text>
    </motion.svg>
  );
}
