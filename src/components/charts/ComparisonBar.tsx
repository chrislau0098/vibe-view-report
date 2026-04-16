import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";

interface BarItem {
  label: string;
  value: number;
  unit?: string;
  accent?: boolean;
}

interface ComparisonBarProps {
  items: BarItem[];
  maxValue?: number;
  className?: string;
}

export function ComparisonBar({ items, maxValue, className }: ComparisonBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const max = maxValue ?? Math.max(...items.map((i) => i.value));

  return (
    <div ref={ref} className={`space-y-5 ${className ?? ""}`}>
      {items.map((item, idx) => {
        const pct = (item.value / max) * 100;
        return (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-foreground-2 font-medium">{item.label}</span>
              <span
                className="font-medium tabular-nums"
                style={{ fontFamily: "'Geist Variable', monospace", color: item.accent ? "var(--primary-hl)" : undefined }}
              >
                {item.value}
                {item.unit && (
                  <span className="text-xs font-normal ml-0.5 text-foreground-3">{item.unit}</span>
                )}
              </span>
            </div>
            <div className="h-2 rounded-full bg-surface-l3 overflow-hidden">
              <motion.div
                className="h-full rounded-full origin-left"
                style={{
                  background: item.accent
                    ? "linear-gradient(to right, var(--primary), var(--primary-hl))"
                    : "var(--chart-5)",
                }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: pct / 100 } : {}}
                transition={{
                  duration: 1.2,
                  delay: idx * 0.2,
                  ease: EASE.out,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
