import { motion } from "motion/react";
import { EASE } from "@/lib/easings";
import { REPORT_META, STATS } from "@/data";
import { RollingNumber } from "@/components/primitives/RollingNumber";
import { DeltaBadge } from "@/components/primitives/DeltaBadge";
import { SpotlightGradient } from "@/components/primitives/SpotlightGradient";
import { GrowthCurve } from "@/components/charts/GrowthCurve";
import { HeroShaderBackdrop } from "@/components/primitives/ShaderBackdrop";

const stat = STATS.totalViewers;
const NUMBER_DELAY = 0.9;
const NUMBER_DURATION = 2.4;
const BADGE_DELAY = NUMBER_DELAY + NUMBER_DURATION + 0.2;

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* WebGL shader backdrop */}
      <HeroShaderBackdrop />
      {/* CSS spotlights layered on top of shader */}
      <SpotlightGradient position="top-center" hue="orange" intensity={0.8} animate />
      <SpotlightGradient position="top-left" hue="cool" intensity={0.5} />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center gap-6">
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE.out }}
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-foreground-3">
            The 2026 Annual Report
          </span>
        </motion.div>

        {/* Chinese titles */}
        <motion.div
          className="flex flex-col items-center gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE.out }}
        >
          <h1
            className="leading-[1.1] tracking-[-1px] text-foreground"
            style={{
              fontFamily: "var(--font-chinese-sans)",
              fontSize: "clamp(20px, 3.2vw, 38px)",
              fontWeight: 300,
              letterSpacing: "0em",
            }}
          >
            {REPORT_META.title}
          </h1>
          <p
            className="leading-[1.1] text-foreground-3"
            style={{
              fontFamily: "var(--font-chinese-sans)",
              fontSize: "clamp(14px, 2.2vw, 24px)",
              fontWeight: 300,
            }}
          >
            {REPORT_META.subtitle}
          </p>
        </motion.div>

        {/* Hero number */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: EASE.out }}
        >
          <div
            className="leading-[0.88] tracking-[-0.045em]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(88px, 18vw, 200px)",
              color: "var(--primary-hl)",
              fontWeight: 500,
              fontVariationSettings: "'opsz' 72",
              fontFeatureSettings: '"cv01", "ss03", "tnum"',
            }}
          >
            <RollingNumber
              value={stat.value}
              precision={1}
              suffix={stat.unit}
              duration={NUMBER_DURATION}
              delay={NUMBER_DELAY}
              suffixClassName="text-[0.28em] font-normal ml-[0.08em] text-foreground-2"
            />
          </div>

          {/* Subtitle row */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 text-sm text-foreground-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            <span>{stat.label}</span>
            <span className="w-px h-3 bg-border-strong inline-block" />
            {stat.delta && (
              <DeltaBadge
                value={stat.delta.value}
                label={stat.delta.label}
                direction={stat.delta.direction}
                delay={BADGE_DELAY}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          aria-hidden="true"
          className="flex flex-col items-center gap-1.5 text-foreground-3 text-xs tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6, 1] }}
          transition={{ duration: 1, delay: 4.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <span>向下滚动</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-base"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>

      {/* Full-width horizon growth curve */}
      <motion.div
        className="absolute inset-x-0 bottom-0 w-full h-[40%] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.2, delay: 2.6, ease: EASE.out }}
      >
        <GrowthCurve className="w-full h-full" decorative />
      </motion.div>

      {/* Data deadline */}
      <motion.p
        className="absolute bottom-5 left-0 right-0 text-center text-xs text-foreground-3 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.0 }}
      >
        数据截止 · {REPORT_META.year} 年 1 月 9 日
      </motion.p>
    </section>
  );
}
