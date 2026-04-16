import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { DeltaBadge } from "@/components/primitives/DeltaBadge";
import { RollingNumber } from "@/components/primitives/RollingNumber";

const venues = STATS.venues;
const offline = STATS.offline;

export function SectionScale() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 px-6 md:px-16 overflow-hidden"
      style={{ background: "var(--surface-l1)" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, oklch(1 0 0 / 0.08), transparent)" }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="mb-14"
        >
          <ChapterStamp number={4} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
          className="mb-16 space-y-3"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-foreground-3">
            规模扩张
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
            分会场与线下的蔓延
          </h2>
        </motion.div>

        {/* Asymmetric two-column: venues (5fr) | offline (7fr) */}
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-0 divide-y md:divide-y-0 md:divide-x divide-border-strong">

          {/* Venues — primary (500 weight) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE.out, delay: 0.2 }}
            className="space-y-4 pb-12 md:pb-0 md:pr-12"
          >
            <p className="text-foreground-3 text-xs tracking-wider uppercase" style={{ fontWeight: 300 }}>
              {venues.label}
            </p>

            <div
              className="leading-[0.82] tracking-[-0.05em]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(80px, 15vw, 160px)",
                color: "var(--primary-hl)",
                fontWeight: 500,
                fontVariationSettings: "'opsz' 72",
                fontFeatureSettings: '"tnum"',
              }}
            >
              <RollingNumber
                value={venues.value}
                precision={0}
                suffix={venues.unit}
                duration={1.8}
                delay={0.4}
                suffixClassName="text-[0.24em] font-normal ml-[0.06em] text-foreground-2"
              />
            </div>

            <div className="space-y-2 pt-2">
              {venues.delta && (
                <DeltaBadge
                  value={venues.delta.value}
                  label={venues.delta.label}
                  direction={venues.delta.direction}
                  delay={1.5}
                />
              )}
              <p className="text-foreground-3 text-sm" style={{ maxWidth: "30ch", fontWeight: 300 }}>
                新增 149 个分会场，覆盖全国各大城市
              </p>
            </div>
          </motion.div>

          {/* Offline — secondary (400 weight), double-bezel panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE.out, delay: 0.35 }}
            className="pt-12 md:pt-0 md:pl-20"
          >
            <div className="p-1.5 ring-1 ring-white/5 rounded-[2rem]">
              <div
                className="rounded-[calc(2rem-0.375rem)] p-8 space-y-4"
                style={{ background: "var(--surface-l2)" }}
              >
                <p className="text-foreground-3 text-xs tracking-wider uppercase" style={{ fontWeight: 300 }}>
                  {offline.label}
                </p>

                <div
                  className="leading-[0.82] tracking-[-0.05em]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(64px, 12vw, 130px)",
                    color: "var(--primary)",
                    fontWeight: 400,
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  <RollingNumber
                    value={offline.value}
                    precision={1}
                    suffix={offline.unit}
                    duration={1.8}
                    delay={0.55}
                    suffixClassName="text-[0.24em] font-normal ml-[0.06em] text-foreground-2"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  {offline.delta && (
                    <DeltaBadge
                      value={offline.delta.value}
                      label={offline.delta.label}
                      direction={offline.delta.direction}
                      delay={1.65}
                    />
                  )}
                  <p className="text-foreground-3 text-sm" style={{ maxWidth: "30ch", fontWeight: 300 }}>
                    线下同行者同比增长，共赴每一个跨年时刻
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
