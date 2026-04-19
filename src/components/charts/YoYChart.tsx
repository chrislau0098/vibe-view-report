import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
      className="relative w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={YOY_CURVE} margin={{ top: 16, right: 80, bottom: 8, left: 0 }}>
          <defs>
            {/* Stroke gradient: cool blue → warm orange */}
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--chart-4)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="1" />
            </linearGradient>
            {/* Area fill: orange fading to transparent */}
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="year"
            tick={{ fill: "var(--foreground-3)", fontSize: 13, fontFamily: "'Geist Variable', monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--foreground-3)", fontSize: 11, fontFamily: "'Geist Variable', monospace" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}万`}
            width={48}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface-l1)",
              border: "1px solid var(--border-strong)",
              borderRadius: "10px",
              color: "var(--foreground)",
              fontSize: 13,
              fontFamily: "'Geist Variable', monospace",
            }}
            formatter={(v) => [`${v ?? ""}万人`, "观看人数"]}
            cursor={{ stroke: "oklch(1 0 0 / 0.1)" }}
          />

          <Area
            dataKey="viewers"
            stroke="url(#lineGrad)"
            strokeWidth={1.5}
            fill="url(#areaFill)"
            isAnimationActive={false}
            dot={(props) => {
              const { cx, cy, index } = props as { cx: number; cy: number; index: number };
              if (index !== YOY_CURVE.length - 1) return <g key={`dot-${index}`} />;
              // No SVG filter — filter's glow gets clipped asymmetrically by Recharts'
              // chart clipPath when the point is near the top margin, making the dot
              // appear lower than the line endpoint. Concentric circles give equal visual
              // weight in all directions without any filter clipping.
              return (
                <g key={`dot-${index}`}>
                  <circle cx={cx} cy={cy} r={11} fill="var(--primary-hl)" opacity={0.08} />
                  <circle cx={cx} cy={cy} r={6} fill="var(--primary-hl)" opacity={0.22} />
                  <circle cx={cx} cy={cy} r={3.5} fill="var(--primary-hl)" />
                </g>
              );
            }}
            activeDot={{ r: 5, fill: "var(--primary-hl)", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Left-to-right reveal curtain */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--background)", transformOrigin: "right center" }}
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.5, ease: EASE.out }}
      />
    </motion.div>
  );
}
