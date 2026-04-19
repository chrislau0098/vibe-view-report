import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { YoYChart } from "@/components/charts/YoYChart";
import { SpotlightGradient } from "@/components/primitives/SpotlightGradient";

const growthItems = [
  {
    label: "全网直播观看",
    value: `+${STATS.totalViewers.delta?.value}%`,
    caption: "观看人次年度同比",
  },
  {
    label: "人均观看时长",
    value: `+${STATS.avgDuration.delta?.value}%`,
    caption: "深度参与指数倍增",
  },
  {
    label: "跨年演讲分会场",
    value: `+${STATS.venues.delta?.value}%`,
    caption: "线下场馆覆盖扩张",
  },
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
          className="mb-14"
        >
          <ChapterStamp number={6} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
          className="mb-4 space-y-3"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-foreground-3">
            年度增长
          </span>
          <h2
            className="text-foreground leading-[1.1]"
            style={{
              fontFamily: "var(--font-chinese-sans)",
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: 450,
              letterSpacing: "-0.02em",
            }}
          >
            数据见证，持续向上的时间曲线
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out, delay: 0.2 }}
          className="text-foreground-2 text-base mb-6 leading-relaxed"
          style={{ maxWidth: "44ch", fontWeight: 300 }}
        >
          从 2251 万到 4765.7 万，近四届跨年观看人数持续攀升，每届都在刷新记录。
        </motion.p>

        {/* Chart label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-foreground-3 text-xs tracking-wider uppercase mb-4"
          style={{ fontWeight: 300 }}
        >
          全网直播观看 · 22-23 至 25-26（万人）
        </motion.p>

        {/* Chart — bleed to section edges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.25 }}
          className="relative mb-12 -mx-6 md:-mx-16"
        >
          <div className="h-[420px] md:h-[560px] relative">
            <YoYChart />
            {/* Hero-scale endpoint annotation */}
            <div
              className="absolute top-8 right-6 md:top-12 md:right-16 pointer-events-none leading-[0.88] tracking-[-0.04em]"
              style={{
                fontSize: "clamp(48px, 6vw, 80px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--primary-hl)",
                fontFeatureSettings: '"tnum"',
                fontVariationSettings: "'opsz' 72",
              }}
            >
              +{STATS.totalViewers.delta?.value}%
            </div>
          </div>
        </motion.div>

        {/* Growth metric grid — double-bezel */}
        <div className="p-1.5 ring-1 ring-white/5 rounded-[2rem] overflow-hidden">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-[calc(2rem-0.375rem)] overflow-hidden"
            style={{ background: "var(--border-strong)" }}
          >
            {growthItems.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE.out, delay: 0.45 + idx * 0.1 }}
                className="flex flex-col gap-3 p-8"
                style={{ background: "var(--surface-l2)" }}
              >
                <p className="text-foreground-3 text-xs tracking-wider uppercase" style={{ fontWeight: 300 }}>
                  {item.label}
                </p>
                <div
                  className="leading-[0.9] tracking-[-0.04em] text-primary"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(40px, 6vw, 72px)",
                    fontWeight: 600,
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {item.value}
                </div>
                <p className="text-foreground-3 text-xs" style={{ fontWeight: 300 }}>{item.caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
