import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { YOY_CURVE } from "@/data";
import { EASE } from "@/lib/easings";

export function YoYChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE.out }}
      className="w-full h-56"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={YOY_CURVE} margin={{ top: 16, right: 24, bottom: 8, left: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(1 0 0 / 0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="year"
            tick={{ fill: "oklch(0.52 0.012 80)", fontSize: 12, fontFamily: "'Geist Variable', monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "oklch(0.52 0.012 80)", fontSize: 11, fontFamily: "'Geist Variable', monospace" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}万`}
            width={52}
          />
          <Tooltip
            contentStyle={{
              background: "oklch(0.14 0.012 260)",
              border: "1px solid oklch(1 0 0 / 0.12)",
              borderRadius: "10px",
              color: "oklch(0.96 0.012 80)",
              fontSize: 13,
              fontFamily: "'Geist Variable', monospace",
            }}
            formatter={(v) => [`${v ?? ""}万人`, "观看人数"]}
            cursor={{ stroke: "oklch(1 0 0 / 0.1)" }}
          />
          <Line
            dataKey="viewers"
            stroke="oklch(0.73 0.185 48)"
            strokeWidth={2.5}
            dot={{ fill: "oklch(0.73 0.185 48)", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "oklch(0.73 0.185 48)", strokeWidth: 0 }}
            isAnimationActive={false}
          />
          {/* Static annotation on final data point */}
          <ReferenceDot
            x="2026"
            y={4765.7}
            r={0}
            label={{
              value: "4765.7万",
              position: "top",
              fill: "oklch(0.73 0.185 48)",
              fontSize: 12,
              fontFamily: "'Geist Variable', monospace",
              fontWeight: 600,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
