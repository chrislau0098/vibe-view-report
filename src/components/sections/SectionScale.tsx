import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { RollingNumber } from "@/components/primitives/RollingNumber";

const venues = STATS.venues;
const offline = STATS.offline;

export function SectionScale() {
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
          <ChapterStamp number={4} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
          className="text-foreground-3 text-sm tracking-[0.2em] uppercase mb-4"
        >
          规模扩张
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
          分会场与线下的蔓延
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Venues */}
          <ScaleCard
            stat={venues}
            inView={inView}
            delay={0.2}
            newCount={149}
            newLabel="同比新增分会场"
            growRatio={venues.delta?.value ? venues.delta.value / 100 : 0.85}
          />

          {/* Card 2: Offline */}
          <ScaleCard
            stat={offline}
            inView={inView}
            delay={0.35}
            newCount={2.7}
            newLabel="万人 同比新增线下用户"
            growRatio={offline.delta?.value ? Math.min(offline.delta.value / 200, 1) : 0.8}
            newIsDecimal
          />
        </div>
      </div>
    </section>
  );
}

function ScaleCard({
  stat,
  inView,
  delay,
  newCount,
  newLabel,
  growRatio,
  newIsDecimal = false,
}: {
  stat: (typeof STATS)[string];
  inView: boolean;
  delay: number;
  newCount: number;
  newLabel: string;
  growRatio: number;
  newIsDecimal?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE.out, delay }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border-strong p-8 space-y-5 cursor-default"
      style={{
        background: "oklch(0.18 0.012 260)",
        boxShadow: "var(--shadow-card)",
        transition: "box-shadow 0.3s",
      }}
    >
      <p className="text-foreground-3 text-sm">{stat.label}</p>

      <div
        className="font-semibold leading-[0.9] tracking-[-0.04em]"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(56px, 10vw, 104px)",
          color: "oklch(0.73 0.185 48)",
          fontFeatureSettings: '"tnum"',
        }}
      >
        <RollingNumber
          value={stat.value}
          precision={stat.value % 1 !== 0 ? 1 : 0}
          suffix={stat.unit}
          duration={1.8}
          delay={delay + 0.2}
          suffixClassName="text-[0.28em] font-normal ml-[0.08em] text-foreground-2"
        />
      </div>

      {/* New count highlight */}
      <div className="flex items-center gap-2 text-sm">
        <span
          className="text-primary font-semibold"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          +{newIsDecimal ? newCount : newCount}
          {newIsDecimal ? "" : " 个"}
        </span>
        <span className="text-foreground-3">{newLabel}</span>
      </div>

      {/* Mini growth bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-foreground-3">
          <span>新增比例</span>
          <span>{Math.round(growRatio * 100)}%</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden bg-surface-l3">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(to right, oklch(0.65 0.175 42), oklch(0.73 0.185 48))" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: growRatio } : {}}
            transition={{ duration: 1.4, delay: delay + 0.4, ease: EASE.out }}
          />
        </div>
      </div>
    </motion.div>
  );
}
