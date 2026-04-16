import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";

interface DeltaBadgeProps {
  value: number;
  label?: string;
  direction?: "up" | "down";
  delay?: number;
  note?: string;
  className?: string;
}

export function DeltaBadge({
  value,
  label = "同比",
  direction = "up",
  delay = 0.8,
  note,
  className,
}: DeltaBadgeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE.out }}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
        border border-primary/40 text-primary bg-primary/5 ${className ?? ""}`}
    >
      <span className="text-base leading-none">
        {direction === "up" ? "↑" : "↓"}
      </span>
      <span>+{value}%</span>
      <span className="text-foreground-2 text-xs">{label}</span>
      {note && <span className="text-foreground-3 text-xs ml-1">{note}</span>}
    </motion.span>
  );
}
