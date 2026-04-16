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

const TOTAL_SECONDS = avgDuration.value;
const MINS = Math.floor(TOTAL_SECONDS / 60);
const SECS = Math.round(TOTAL_SECONDS % 60);

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
          className="mb-14"
        >
          <ChapterStamp number={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
          className="mb-14 space-y-3"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-foreground-3">
            观看深度
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
            观看时长同比翻倍，时间的朋友名副其实
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left: duration — massive two-tier */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 }}
            className="space-y-3"
          >
            <p className="text-foreground-3 text-xs tracking-wider uppercase" style={{ fontWeight: 300 }}>
              {avgDuration.label}
            </p>

            {/* MINUTES — dominant */}
            <div
              className="leading-[0.82] tracking-[-0.05em]"
              style={{
                fontFamily: "var(--font-sans)",
                fontFeatureSettings: '"tnum"',
                color: "var(--primary-hl)",
                fontSize: "clamp(80px, 16vw, 160px)",
                fontWeight: 500,
                fontVariationSettings: "'opsz' 72",
              }}
            >
              <RollingNumber
                value={MINS}
                precision={0}
                duration={1.8}
                delay={0.5}
                suffix="分"
                suffixClassName="text-[0.26em] font-normal ml-[0.06em] text-foreground-2"
              />
            </div>

            {/* SECONDS — secondary */}
            <div
              className="leading-[0.85] tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-sans)",
                fontFeatureSettings: '"tnum"',
                color: "var(--primary)",
                fontSize: "clamp(48px, 9vw, 96px)",
                fontWeight: 400,
              }}
            >
              <RollingNumber
                value={SECS}
                precision={0}
                duration={1.4}
                delay={0.7}
                suffix="秒"
                suffixClassName="text-[0.3em] font-normal ml-[0.06em] text-foreground-2"
              />
            </div>

            {avgDuration.delta && (
              <div className="pt-2">
                <DeltaBadge
                  value={avgDuration.delta.value}
                  label={avgDuration.delta.label}
                  direction={avgDuration.delta.direction}
                  delay={1.8}
                />
              </div>
            )}

            <p className="text-foreground-3 text-sm pt-2" style={{ maxWidth: "36ch", fontWeight: 300, textWrap: "balance" as const }}>
              人均每场观看超 20 分钟，深度投入程度远超行业均值
            </p>
          </motion.div>

          {/* Right: avg online — double-bezel panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.4 }}
            className="space-y-5"
          >
            <div className="p-1.5 ring-1 ring-white/5 rounded-[2rem]">
              <div
                className="rounded-[calc(2rem-0.375rem)] p-8 space-y-5"
                style={{ background: "var(--surface-l2)" }}
              >
                <p className="text-foreground-3 text-xs tracking-wider uppercase" style={{ fontWeight: 300 }}>
                  {avgOnline.label}
                </p>
                <div
                  className="leading-[0.9] tracking-[-0.04em]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(44px, 8vw, 88px)",
                    color: "var(--primary-hl)",
                    fontWeight: 400,
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  <RollingNumber
                    value={avgOnline.value}
                    precision={1}
                    suffix={avgOnline.unit}
                    duration={1.6}
                    delay={0.6}
                    suffixClassName="text-[0.3em] font-normal ml-[0.08em] text-foreground-2"
                  />
                </div>
                <p className="text-foreground-2 text-sm" style={{ fontWeight: 300 }}>
                  同时在线，共同经历每个时刻
                </p>

                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-xs text-foreground-3" style={{ fontWeight: 300 }}>
                    <span>直播全程</span>
                    <span>约 8 小时</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-surface-l3">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(to right, var(--primary), var(--primary-hl))" }}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 1.5, delay: 0.9, ease: EASE.out }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-foreground-3 text-xs leading-relaxed italic"
              style={{ maxWidth: "28ch", fontWeight: 300, textWrap: "balance" as const }}
            >
              "时间" 不只是演讲主题——它是用户与内容最真实的承诺
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
