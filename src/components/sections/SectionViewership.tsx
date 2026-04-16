import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { RollingNumber } from "@/components/primitives/RollingNumber";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { SpotlightGradient } from "@/components/primitives/SpotlightGradient";

const total = STATS.totalViewers;
const video = STATS.videoViewers;
const RATIO = 68.2;
const CIRCUMFERENCE = 2 * Math.PI * 54;

export function SectionViewership() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-40 px-6 md:px-16">
      <SpotlightGradient position="top-left" hue="cool" intensity={0.4} />

      <div className="max-w-5xl mx-auto">
        {/* Chapter stamp */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="mb-12"
        >
          <ChapterStamp number={1} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.1 }}
          className="text-foreground-2 text-sm tracking-[0.2em] uppercase mb-3"
        >
          观看规模
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: main stat */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.15 }}
            className="space-y-4"
          >
            <p className="text-foreground-3 text-sm">{video.label}</p>
            <div
              className="font-semibold leading-[0.9] tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(72px, 14vw, 140px)",
                color: "oklch(0.73 0.185 48)",
                fontFeatureSettings: '"cv01", "ss03", "tnum"',
              }}
            >
              <RollingNumber
                value={video.value}
                precision={1}
                suffix={video.unit}
                duration={2.0}
                delay={0.4}
                suffixClassName="text-[0.3em] font-normal ml-[0.08em] text-foreground-2"
              />
            </div>

            <div className="space-y-1">
              <p className="text-foreground-2 text-base">
                占全网 <span className="text-primary font-semibold">68.2%</span>
              </p>
              <p className="text-foreground-3 text-sm">
                全网总观看 {total.value} {total.unit}，视频号成为主阵地
              </p>
            </div>

            {/* Mini comparison */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex-1 space-y-1">
                <div className="text-xs text-foreground-3">视频号</div>
                <div className="h-1.5 rounded-full overflow-hidden bg-surface-l3">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "oklch(0.73 0.185 48)" }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 0.682 } : {}}
                    transition={{ duration: 1.2, delay: 0.6, ease: EASE.out }}
                  />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-xs text-foreground-3">其他平台</div>
                <div className="h-1.5 rounded-full overflow-hidden bg-surface-l3">
                  <motion.div
                    className="h-full rounded-full bg-surface-l3"
                    style={{ background: "oklch(0.35 0.04 260)" }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 0.318 } : {}}
                    transition={{ duration: 1.2, delay: 0.8, ease: EASE.out }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: radial progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <svg width="180" height="180" viewBox="0 0 130 130" className="overflow-visible">
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.175 42)" />
                  <stop offset="100%" stopColor="oklch(0.73 0.185 48)" />
                </linearGradient>
              </defs>
              {/* Track */}
              <circle
                cx="65" cy="65" r="54"
                fill="none"
                stroke="oklch(1 0 0 / 0.06)"
                strokeWidth="8"
              />
              {/* Progress */}
              <motion.circle
                cx="65" cy="65" r="54"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE}
                animate={inView ? { strokeDashoffset: CIRCUMFERENCE * (1 - RATIO / 100) } : {}}
                transition={{ duration: 1.8, delay: 0.5, ease: EASE.out }}
                style={{ rotate: -90, transformOrigin: "65px 65px" }}
              />
              {/* Center text */}
              <text x="65" y="58" textAnchor="middle" fontSize="24" fontWeight="700"
                fill="oklch(0.73 0.185 48)"
                fontFamily="'Geist Variable', monospace"
                style={{ fontFeatureSettings: '"tnum"' }}>
                68.2%
              </text>
              <text x="65" y="76" textAnchor="middle" fontSize="10"
                fill="oklch(0.52 0.012 80)"
                fontFamily="var(--font-chinese-sans)">
                视频号占比
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
