import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { DeltaBadge } from "@/components/primitives/DeltaBadge";
import { RollingNumber } from "@/components/primitives/RollingNumber";
import { SpotlightGradient } from "@/components/primitives/SpotlightGradient";

const avgDuration = STATS.avgDuration;
const avgOnline = STATS.avgOnline;

// Duration display: value is total seconds (20*60+34 = 1234)
const TOTAL_SECONDS = avgDuration.value;
const MINS = Math.floor(TOTAL_SECONDS / 60);  // 20
const SECS = Math.round(TOTAL_SECONDS % 60);  // 34

export function SectionDepth() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-40 px-6 md:px-16">
      <SpotlightGradient position="top-right" hue="orange" intensity={0.5} />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="mb-12"
        >
          <ChapterStamp number={3} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
          className="text-foreground-3 text-sm tracking-[0.2em] uppercase mb-4"
        >
          观看深度
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.15 }}
          className="text-foreground mb-12 leading-[1.1]"
          style={{
            fontFamily: "var(--font-chinese-serif)",
            fontSize: "clamp(24px, 4.5vw, 40px)",
            letterSpacing: "-0.5px",
          }}
        >
          观看时长同比翻倍，时间的朋友名副其实
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: duration main stat */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-foreground-3 text-sm">{avgDuration.label}</p>
            <div
              className="font-semibold leading-[0.85] tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-sans)",
                fontFeatureSettings: '"tnum"',
                color: "oklch(0.73 0.185 48)",
              }}
            >
              {/* Minutes */}
              <div style={{ fontSize: "clamp(72px, 14vw, 140px)" }}>
                <RollingNumber
                  value={MINS}
                  precision={0}
                  duration={1.8}
                  delay={0.5}
                  suffix="分"
                  suffixClassName="text-[0.28em] font-normal ml-[0.06em] text-foreground-2"
                />
              </div>
              {/* Seconds */}
              <div style={{ fontSize: "clamp(40px, 8vw, 80px)", color: "oklch(0.65 0.175 42)" }}>
                <RollingNumber
                  value={SECS}
                  precision={0}
                  duration={1.4}
                  delay={0.7}
                  suffix="秒"
                  suffixClassName="text-[0.3em] font-normal ml-[0.06em] text-foreground-2"
                />
              </div>
            </div>

            {avgDuration.delta && (
              <DeltaBadge
                value={avgDuration.delta.value}
                label={avgDuration.delta.label}
                direction={avgDuration.delta.direction}
                delay={1.8}
              />
            )}

            <p className="text-foreground-3 text-sm pt-2">
              人均每场观看超 20 分钟，深度投入
            </p>
          </motion.div>

          {/* Right: avg online */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.35 }}
            className="rounded-2xl border border-border-strong p-8 space-y-4"
            style={{ background: "oklch(0.18 0.012 260)" }}
          >
            <p className="text-foreground-3 text-sm">{avgOnline.label}</p>
            <div
              className="font-semibold leading-[0.9] tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(52px, 9vw, 96px)",
                color: "oklch(0.73 0.185 48)",
                fontFeatureSettings: '"tnum"',
              }}
            >
              <RollingNumber
                value={avgOnline.value}
                precision={1}
                suffix={avgOnline.unit}
                duration={1.6}
                delay={0.5}
                suffixClassName="text-[0.3em] font-normal ml-[0.08em] text-foreground-2"
              />
            </div>
            <p className="text-foreground-2 text-sm">同时在线，共同经历每个时刻</p>

            {/* Progress bar illustration */}
            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-xs text-foreground-3">
                <span>直播全程</span>
                <span>约 8 小时</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-surface-l3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, oklch(0.65 0.175 42), oklch(0.73 0.185 48))" }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.8, ease: EASE.out }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
