import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { ComparisonBar } from "@/components/charts/ComparisonBar";
import { RollingNumber } from "@/components/primitives/RollingNumber";

const online = STATS.onlineExposure;
const total = STATS.totalExposure;

export function SectionExposure() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 px-6 md:px-16"
      style={{ background: "oklch(0.14 0.012 260)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="mb-12"
        >
          <ChapterStamp number={2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.1 }}
          className="mb-12 space-y-2"
        >
          <p className="text-foreground-3 text-sm tracking-[0.2em] uppercase">曝光影响力</p>
          <h2
            className="text-foreground leading-tight"
            style={{
              fontFamily: "var(--font-chinese-serif)",
              fontSize: "clamp(28px, 5vw, 48px)",
              letterSpacing: "-0.5px",
            }}
          >
            线上内容 × 2.78 = 整体曝光
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: numbers */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Online */}
            <div className="space-y-1">
              <p className="text-foreground-3 text-sm">{online.label}</p>
              <div
                className="font-semibold leading-[0.9] tracking-[-0.04em] text-foreground-2"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(52px, 9vw, 96px)",
                  fontFeatureSettings: '"tnum"',
                }}
              >
                <RollingNumber
                  value={online.value}
                  precision={2}
                  suffix={online.unit}
                  duration={1.6}
                  delay={0.4}
                  suffixClassName="text-[0.35em] font-normal ml-[0.08em] text-foreground-3"
                />
              </div>
            </div>

            {/* Multiplier decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8, ease: EASE.bounce }}
              className="flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-border-strong" />
              <span
                className="font-semibold text-primary text-2xl"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                × 2.78
              </span>
              <div className="h-px flex-1 bg-border-strong" />
            </motion.div>

            {/* Total */}
            <div className="space-y-1">
              <p className="text-foreground-3 text-sm">{total.label}</p>
              <div
                className="font-semibold leading-[0.9] tracking-[-0.04em]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(60px, 11vw, 120px)",
                  color: "oklch(0.73 0.185 48)",
                  fontFeatureSettings: '"tnum"',
                }}
              >
                <RollingNumber
                  value={total.value}
                  precision={2}
                  suffix={total.unit}
                  duration={1.8}
                  delay={0.6}
                  suffixClassName="text-[0.3em] font-normal ml-[0.08em] text-foreground-2"
                />
              </div>
              {total.caption && (
                <p className="text-foreground-3 text-sm">{total.caption}</p>
              )}
            </div>
          </motion.div>

          {/* Right: comparison bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.35 }}
            className="rounded-2xl border border-border-strong p-8"
            style={{ background: "oklch(0.18 0.012 260)" }}
          >
            <p className="text-foreground-3 text-xs tracking-wider uppercase mb-6">曝光量对比</p>
            <ComparisonBar
              items={[
                { label: online.label, value: online.value, unit: "亿", accent: false },
                { label: total.label, value: total.value, unit: "亿", accent: true },
              ]}
              maxValue={total.value}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
