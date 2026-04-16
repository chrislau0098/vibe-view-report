import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { YoYChart } from "@/components/charts/YoYChart";
import { SpotlightGradient } from "@/components/primitives/SpotlightGradient";

const growthItems = [
  { label: "全网直播观看", value: `+${STATS.totalViewers.delta?.value}%` },
  { label: "人均观看时长", value: `+${STATS.avgDuration.delta?.value}%` },
  { label: "跨年演讲分会场", value: `+${STATS.venues.delta?.value}%` },
];

export function SectionGrowth() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-40 px-6 md:px-16">
      <SpotlightGradient position="top-center" hue="cool" intensity={0.35} />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="mb-12"
        >
          <ChapterStamp number={5} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
          className="text-foreground-3 text-sm tracking-[0.2em] uppercase mb-4"
        >
          年度增长
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.15 }}
          className="text-foreground mb-4 leading-[1.1]"
          style={{
            fontFamily: "var(--font-chinese-serif)",
            fontSize: "clamp(24px, 4.5vw, 40px)",
            letterSpacing: "-0.5px",
          }}
        >
          做时间的朋友的第四年
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.2 }}
          className="text-foreground-2 text-base mb-12 leading-relaxed"
        >
          从 2850 万到 4765.7 万，四年持续上扬的时间曲线。
        </motion.p>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.25 }}
          className="rounded-2xl border border-border-strong p-6 md:p-8 mb-10"
          style={{ background: "oklch(0.14 0.012 260)" }}
        >
          <p className="text-foreground-3 text-xs tracking-wider uppercase mb-4">全网直播观看 · 2023–2026（万人）</p>
          <YoYChart />
        </motion.div>

        {/* Growth summary rows */}
        <div className="space-y-4">
          {growthItems.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE.out, delay: 0.4 + idx * 0.1 }}
              className="flex items-center justify-between py-4 border-b border-border"
            >
              <span className="text-foreground-2 text-sm md:text-base">{item.label}</span>
              <span
                className="font-semibold text-primary text-lg md:text-2xl tabular-nums"
                style={{ fontFamily: "var(--font-sans)", fontFeatureSettings: '"tnum"' }}
              >
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
