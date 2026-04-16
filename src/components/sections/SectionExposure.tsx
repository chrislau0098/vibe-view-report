import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { RollingNumber } from "@/components/primitives/RollingNumber";

const online = STATS.onlineExposure;
const total = STATS.totalExposure;

export function SectionExposure() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 px-6 md:px-16 overflow-hidden"
      style={{ background: "var(--surface-l1)" }}
    >
      {/* Horizon glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, oklch(0.65 0.175 42 / 0.3), transparent)" }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="mb-14"
        >
          <ChapterStamp number={2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
          className="mb-10"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-foreground-3">
            曝光影响力
          </span>
        </motion.div>

        {/* Full-width typographic equation */}
        <div className="space-y-2">
          {/* Labels row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-4 items-end"
            style={{ gridTemplateColumns: "1fr auto auto auto 1fr" }}
          >
            <p className="text-foreground-3 text-xs tracking-wider uppercase">{online.label}</p>
            <p className="invisible text-xs">×</p>
            <p className="invisible text-xs">2.78</p>
            <p className="invisible text-xs">=</p>
            <p className="text-foreground-3 text-xs tracking-wider uppercase">{total.label}</p>
          </motion.div>

          {/* Equation row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE.out, delay: 0.25 }}
            className="grid gap-3 md:gap-5 items-baseline"
            style={{ gridTemplateColumns: "1fr auto auto auto 1fr" }}
          >
            {/* Online */}
            <div
              className="leading-[0.88] tracking-[-0.04em] text-foreground-2"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(44px, 8vw, 96px)",
                fontWeight: 400,
                fontFeatureSettings: '"tnum"',
              }}
            >
              <RollingNumber
                value={online.value}
                precision={2}
                suffix={online.unit}
                duration={1.6}
                delay={0.4}
                suffixClassName="text-[0.35em] font-normal ml-[0.06em] text-foreground-3"
              />
            </div>

            {/* × operator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.85, ease: EASE.bounce }}
              className="text-center flex flex-col items-center gap-1"
            >
              <span
                className="text-primary"
                style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 600 }}
              >
                ×
              </span>
              <p
                className="text-primary tabular-nums"
                style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 2vw, 20px)", fontWeight: 600 }}
              >
                2.78
              </p>
            </motion.div>

            {/* Spacer (invisible placeholder to align "=" to the right) */}
            <div />

            {/* = operator */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="text-foreground-3"
              style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 300 }}
            >
              =
            </motion.span>

            {/* Total */}
            <div
              className="leading-[0.88] tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(52px, 10vw, 120px)",
                color: "var(--primary-hl)",
                fontWeight: 500,
                fontVariationSettings: "'opsz' 72",
                fontFeatureSettings: '"tnum"',
              }}
            >
              <RollingNumber
                value={total.value}
                precision={2}
                suffix={total.unit}
                duration={1.8}
                delay={0.6}
                suffixClassName="text-[0.3em] font-normal ml-[0.06em] text-foreground-2"
              />
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.5, ease: EASE.out }}
            className="h-px origin-left mt-6"
            style={{ background: "oklch(1 0 0 / 0.08)" }}
          />

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-foreground-3 text-sm pt-4"
            style={{ maxWidth: "55ch", fontWeight: 300 }}
          >
            线上内容曝光经由电视、户外、媒体等渠道放大 2.78 倍，整体社会影响力达 14.22 亿次。
          </motion.p>
        </div>
      </div>
    </section>
  );
}
