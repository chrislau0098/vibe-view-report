import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { RollingNumber } from "@/components/primitives/RollingNumber";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { SpotlightGradient } from "@/components/primitives/SpotlightGradient";

const total = STATS.totalViewers;
const video = STATS.videoViewers;
const peak = STATS.videoViewersPeak;
const reservation = STATS.videoViewersReservation;
const globalReservation = STATS.reservations;
const RATIO = 68.2;
const CIRCUMFERENCE = 2 * Math.PI * 80;

// Geo-annotation: 68.2% of 360° = 245.5°, starting from -90° (top)
// Endpoint angle: -90 + 245.5 = 155.5° = 2.714 rad from positive-x
const GEO_X = +(100 + 80 * Math.cos(2.714)).toFixed(1);
const GEO_Y = +(100 + 80 * Math.sin(2.714)).toFixed(1);

export function SectionViewership() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-40 px-6 md:px-16">
      <SpotlightGradient position="top-left" hue="cool" intensity={0.4} />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="mb-14"
        >
          <ChapterStamp number={1} />
        </motion.div>

        {/* Two-column: ring (left/dominant) + breakdown text (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">

          {/* Left: ring hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.0, ease: EASE.out, delay: 0.1 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Eyebrow pill */}
            <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-foreground-3">
              观看规模
            </span>

            {/* Double-bezel ring wrapper */}
            <div className="p-1.5 ring-1 ring-white/5 rounded-[2rem]">
              <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden flex items-center justify-center p-4">
                <svg width="380" height="380" viewBox="0 0 200 200" className="overflow-visible">
                  <defs>
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="oklch(0.65 0.175 42)" />
                      <stop offset="100%" stopColor="oklch(0.73 0.185 48)" />
                    </linearGradient>
                  </defs>
                  {/* Outer faint decorative track */}
                  <circle cx="100" cy="100" r="90" fill="none" stroke="oklch(1 0 0 / 0.03)" strokeWidth="0.5" />
                  {/* Main track */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="var(--border)" strokeWidth="7" />
                  {/* Progress arc */}
                  <motion.circle
                    cx="100" cy="100" r="80"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE}
                    animate={inView ? { strokeDashoffset: CIRCUMFERENCE * (1 - RATIO / 100) } : {}}
                    transition={{ duration: 2.0, delay: 0.4, ease: EASE.out }}
                    style={{ rotate: -90, transformOrigin: "100px 100px" }}
                  />
                  {/* Center: percentage — dominantBaseline="central" anchors
                      the em-box middle at y, so y=91/y=109 centers the two-
                      line group at the ring's geometric center (100,100). */}
                  <text x="100" y="91" textAnchor="middle" fontSize="26"
                    dominantBaseline="central"
                    fill="var(--primary-hl)"
                    fontFamily="'Geist Variable', monospace"
                    fontWeight="400"
                    style={{ fontFeatureSettings: '"tnum"' }}>
                    68.2%
                  </text>
                  <text x="100" y="109" textAnchor="middle" fontSize="9.5"
                    dominantBaseline="central"
                    fill="var(--foreground-3)"
                    fontFamily="var(--font-chinese-sans)">
                    视频号占全网比
                  </text>
                  {/* Geo annotation at arc endpoint */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 2.5 }}
                  >
                    <circle cx={GEO_X} cy={GEO_Y} r="3" fill="var(--primary-hl)" />
                    <line
                      x1={GEO_X} y1={GEO_Y}
                      x2={GEO_X - 14} y2={GEO_Y + 16}
                      stroke="var(--primary-hl)" strokeWidth="0.5" opacity="0.6"
                    />
                    <text
                      x={GEO_X - 16} y={GEO_Y + 26}
                      fontSize="7" fill="var(--foreground-3)"
                      fontFamily="var(--font-sans)" textAnchor="middle"
                    >
                      视频号
                    </text>
                  </motion.g>
                </svg>
              </div>
            </div>

            {/* Total viewers callout */}
            <div className="text-center space-y-1">
              <p className="text-foreground-3 text-xs tracking-wider">{total.label}</p>
              <div
                className="leading-[0.9] tracking-[-0.04em] text-foreground-2"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(40px, 7vw, 72px)",
                  fontWeight: 400,
                  fontFeatureSettings: '"tnum"',
                }}
              >
                <RollingNumber
                  value={total.value}
                  precision={1}
                  suffix={total.unit}
                  duration={1.8}
                  delay={0.6}
                  suffixClassName="text-[0.35em] font-normal ml-[0.06em] text-foreground-3"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.35 }}
            className="space-y-6 lg:min-w-[260px]"
          >
            {/* Video viewers */}
            <div className="space-y-1 pb-6 border-b border-border-strong">
              <p className="text-foreground-3 text-xs tracking-wider uppercase">{video.label}</p>
              <div
                className="leading-[0.9] tracking-[-0.04em]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(52px, 9vw, 96px)",
                  color: "var(--primary-hl)",
                  fontWeight: 500,
                  fontVariationSettings: "'opsz' 72",
                  fontFeatureSettings: '"tnum"',
                }}
              >
                <RollingNumber
                  value={video.value}
                  precision={1}
                  suffix={video.unit}
                  duration={1.8}
                  delay={0.5}
                  suffixClassName="text-[0.3em] font-normal ml-[0.08em] text-foreground-2"
                />
              </div>
            </div>

            {/* Other platforms */}
            <div className="space-y-1">
              <p className="text-foreground-3 text-xs tracking-wider uppercase">其他平台观看</p>
              <div
                className="leading-[0.9] tracking-[-0.04em] text-foreground-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(36px, 6vw, 64px)",
                  fontWeight: 400,
                  fontFeatureSettings: '"tnum"',
                }}
              >
                <RollingNumber
                  value={+(total.value - video.value).toFixed(1)}
                  precision={1}
                  suffix={total.unit}
                  duration={1.6}
                  delay={0.7}
                  suffixClassName="text-[0.35em] font-normal ml-[0.06em]"
                />
              </div>
              <p className="text-foreground-3 text-xs pt-1">占全网 31.8%</p>
            </div>

            {/* Insight */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-foreground-2 text-sm leading-relaxed pt-2"
            >
              视频号成为本届主阵地，占据超三分之二观看份额
            </motion.p>

            {/* 视频号扩展指标 */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE.out, delay: 1.5 }}
              className="border-t border-border-strong pt-5 mt-2 space-y-3"
            >
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: peak.label, value: peak.value, unit: peak.unit, badge: `+${peak.delta?.value}%` },
                  { label: reservation.label, value: reservation.value, unit: reservation.unit, badge: `+${reservation.delta?.value}%` },
                  { label: globalReservation.label, value: globalReservation.value, unit: globalReservation.unit, badge: null },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-foreground-3 text-[10px] tracking-wider leading-tight" style={{ fontWeight: 300 }}>
                      {item.label}
                    </p>
                    <p
                      className="tabular-nums leading-none"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(18px, 2.5vw, 26px)",
                        color: "var(--primary-hl)",
                        fontWeight: 500,
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {item.value}<span className="text-[0.5em] font-normal ml-[0.05em] text-foreground-2">{item.unit}</span>
                    </p>
                    {item.badge && (
                      <p className="text-[10px] text-foreground-3" style={{ fontWeight: 300 }}>{item.badge} 同比</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
