import { motion } from "motion/react";
import { EASE } from "@/lib/easings";
import { REPORT_META, STATS } from "@/data";
import { RollingNumber } from "@/components/primitives/RollingNumber";
import { DeltaBadge } from "@/components/primitives/DeltaBadge";
import { SpotlightGradient } from "@/components/primitives/SpotlightGradient";
import { GrowthCurve } from "@/components/charts/GrowthCurve";
import { OwlSilhouette } from "@/components/primitives/OwlSilhouette";

const stat = STATS.totalViewers;

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Backgrounds */}
      <SpotlightGradient position="top-center" hue="orange" intensity={1} animate />
      <SpotlightGradient position="top-left" hue="cool" intensity={0.6} />

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px 256px" }}
      />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center gap-6">
        {/* Owl + eyebrow */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE.out }}
        >
          <OwlSilhouette size={52} className="text-primary opacity-80" />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-foreground-3">
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
            className="font-semibold leading-[1.1] tracking-[-1px] text-foreground"
            style={{
              fontFamily: "var(--font-chinese-serif)",
              fontSize: "clamp(36px, 7vw, 64px)",
            }}
          >
            {REPORT_META.title}
          </h1>
          <p
            className="font-medium leading-[1.1] text-foreground-2"
            style={{
              fontFamily: "var(--font-chinese-serif)",
              fontSize: "clamp(24px, 4.5vw, 48px)",
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
            className="font-semibold leading-[0.9] tracking-[-0.04em] text-primary-hl"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(88px, 18vw, 200px)",
              color: "oklch(0.73 0.185 48)",
              fontFeatureSettings: '"cv01", "ss03", "tnum"',
            }}
          >
            <RollingNumber
              value={stat.value}
              precision={1}
              suffix={stat.unit}
              duration={2.4}
              delay={0.9}
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
                delay={2.4}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
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

      {/* Decorative growth curve — bottom right */}
      <motion.div
        className="absolute bottom-12 right-4 sm:right-12 w-48 sm:w-72 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 2.6 }}
      >
        <GrowthCurve />
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
