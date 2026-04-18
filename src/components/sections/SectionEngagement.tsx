import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { STATS } from "@/data";
import { ChapterStamp } from "@/components/primitives/ChapterStamp";
import { RollingNumber } from "@/components/primitives/RollingNumber";

// 得到站内
const stationAvgDuration = STATS.stationAvgDuration;
const stationViews = STATS.stationViews;
const stationInteractions = STATS.stationInteractions;
const stationShares = STATS.stationShares;
const stationShowRate = STATS.stationShowRate;
const stationPeak = STATS.stationPeak;
const stationReservation = STATS.stationReservation;
const stationSharers = STATS.stationSharers;
const stationInteractors = STATS.stationInteractors;

// 抖音
const douyinExposureTimes = STATS.douyinExposureTimes;
const douyinExposureUsers = STATS.douyinExposureUsers;
const douyinEntry = STATS.douyinEntry;
const douyinConversion = STATS.douyinConversion;
const douyinPeak = STATS.douyinPeak;

const SHOW_RATE = stationShowRate.value; // 60.39
const CIRCUMFERENCE = 2 * Math.PI * 54;

// 站内次要指标列表
const stationSecondary = [
  { label: stationReservation.label, value: "25.9万", sub: "人预约到场" },
  { label: stationPeak.label, value: "12.07万", sub: "在线峰值人数" },
  { label: stationSharers.label, value: "7.5万", sub: "人主动分享" },
  { label: stationShares.label, value: "24.4万", sub: "次累计分享" },
  { label: stationInteractors.label, value: "8.8万", sub: "人互动留言" },
];

export function SectionEngagement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 px-6 md:px-16 overflow-hidden"
    >
      {/* Top horizon rule */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, oklch(1 0 0 / 0.07), transparent)" }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="mb-14"
        >
          <ChapterStamp number={5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
          className="mb-16 space-y-3"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-foreground-3">
            互动与参与
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
            每一条留言，都是时间给出的回应
          </h2>
        </motion.div>

        {/* Two-column: 站内 (dominant) | 抖音 (secondary) */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16">

          {/* ── 得到站内直播 ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-foreground-3">
                得到站内直播
              </span>
            </div>

            {/* Three hero metrics */}
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl" style={{ background: "var(--border-strong)" }}>
              {/* 平均观看时长 — hero */}
              <div className="col-span-1 flex flex-col gap-2 p-6" style={{ background: "var(--surface-l1)" }}>
                <p className="text-foreground-3 text-[10px] uppercase tracking-wider" style={{ fontWeight: 300 }}>
                  {stationAvgDuration.label}
                </p>
                <div
                  className="leading-[0.85] tracking-[-0.04em]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(44px, 8vw, 80px)",
                    color: "var(--primary-hl)",
                    fontWeight: 500,
                    fontFeatureSettings: '"tnum"',
                    fontVariationSettings: "'opsz' 72",
                  }}
                >
                  <RollingNumber
                    value={stationAvgDuration.value}
                    precision={0}
                    suffix={stationAvgDuration.unit}
                    duration={1.6}
                    delay={0.5}
                    suffixClassName="text-[0.32em] font-normal ml-[0.06em] text-foreground-2"
                  />
                </div>
                <p className="text-foreground-3 text-xs leading-snug" style={{ fontWeight: 300 }}>
                  全网人均20.57分钟的<br />近 3 倍
                </p>
              </div>

              {/* 累积观看人次 */}
              <div className="flex flex-col gap-2 p-6" style={{ background: "var(--surface-l1)" }}>
                <p className="text-foreground-3 text-[10px] uppercase tracking-wider" style={{ fontWeight: 300 }}>
                  {stationViews.label}
                </p>
                <div
                  className="leading-[0.85] tracking-[-0.04em]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(32px, 5vw, 52px)",
                    color: "var(--foreground)",
                    fontWeight: 400,
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  <RollingNumber
                    value={+(stationViews.value / 10000).toFixed(1)}
                    precision={1}
                    suffix="万次"
                    duration={1.6}
                    delay={0.6}
                    suffixClassName="text-[0.4em] font-normal ml-[0.05em] text-foreground-3"
                  />
                </div>
              </div>

              {/* 累积互动留言 */}
              <div className="flex flex-col gap-2 p-6" style={{ background: "var(--surface-l1)" }}>
                <p className="text-foreground-3 text-[10px] uppercase tracking-wider" style={{ fontWeight: 300 }}>
                  {stationInteractions.label}
                </p>
                <div
                  className="leading-[0.85] tracking-[-0.04em]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(32px, 5vw, 52px)",
                    color: "var(--foreground)",
                    fontWeight: 400,
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  <RollingNumber
                    value={+(stationInteractions.value / 10000).toFixed(1)}
                    precision={1}
                    suffix="万条"
                    duration={1.6}
                    delay={0.7}
                    suffixClassName="text-[0.4em] font-normal ml-[0.05em] text-foreground-3"
                  />
                </div>
              </div>
            </div>

            {/* 预约到场率 ring — 站内数据 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE.out, delay: 0.8 }}
              className="flex items-center gap-6 py-4 border-t border-border-strong"
            >
              <svg width="88" height="88" viewBox="0 0 120 120" className="shrink-0 overflow-visible">
                <defs>
                  <linearGradient id="showRateGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.175 42)" />
                    <stop offset="100%" stopColor="oklch(0.73 0.185 48)" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="6" />
                <motion.circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke="url(#showRateGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE}
                  animate={inView ? { strokeDashoffset: CIRCUMFERENCE * (1 - SHOW_RATE / 100) } : {}}
                  transition={{ duration: 1.8, delay: 0.9, ease: EASE.out }}
                  style={{ rotate: -90, transformOrigin: "60px 60px" }}
                />
                <text x="60" y="56" textAnchor="middle" fontSize="18"
                  dominantBaseline="central"
                  fill="var(--primary-hl)"
                  fontFamily="'Geist Variable', monospace"
                  fontWeight="500"
                  style={{ fontFeatureSettings: '"tnum"' }}>
                  {SHOW_RATE}%
                </text>
                <text x="60" y="74" textAnchor="middle" fontSize="8"
                  dominantBaseline="central"
                  fill="var(--foreground-3)"
                  fontFamily="var(--font-chinese-sans)">
                  预约到场率
                </text>
              </svg>
              <div className="space-y-1">
                <p className="text-foreground-3 text-xs" style={{ fontWeight: 300 }}>
                  {stationReservation.value.toLocaleString()} 人预约
                </p>
                <p className="text-foreground-3 text-xs" style={{ fontWeight: 300 }}>
                  其中 60.39% 实际到场观看
                </p>
              </div>
            </motion.div>

            {/* Secondary metrics row */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {stationSecondary.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: EASE.out, delay: 0.9 + idx * 0.07 }}
                  className="space-y-1"
                >
                  <p
                    className="text-foreground-3 text-[10px] tracking-wider leading-tight"
                    style={{ fontWeight: 300 }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="tabular-nums"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(16px, 2.5vw, 22px)",
                      color: "var(--foreground-2)",
                      fontWeight: 400,
                      fontFeatureSettings: '"tnum"',
                    }}
                  >
                    {item.value}
                  </p>
                  <p className="text-foreground-3 text-[10px]" style={{ fontWeight: 300 }}>{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 抖音直播间 ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.35 }}
            className="space-y-6"
          >
            <div className="p-1.5 ring-1 ring-white/5 rounded-[2rem]">
              <div
                className="rounded-[calc(2rem-0.375rem)] p-7 space-y-7"
                style={{ background: "var(--surface-l2)" }}
              >
                <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-foreground-3">
                  抖音直播间
                </span>

                {/* 抖音漏斗指标 */}
                <div className="space-y-3">
                  {[
                    { label: douyinExposureTimes.label, value: douyinExposureTimes.value, unit: douyinExposureTimes.unit, delay: 0.6 },
                    { label: douyinExposureUsers.label, value: douyinExposureUsers.value, unit: douyinExposureUsers.unit, delay: 0.7 },
                    { label: douyinEntry.label, value: douyinEntry.value, unit: douyinEntry.unit, delay: 0.8 },
                    { label: douyinConversion.label, value: douyinConversion.value, unit: douyinConversion.unit, delay: 0.9 },
                    { label: douyinPeak.label, value: douyinPeak.value, unit: douyinPeak.unit, delay: 1.0 },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, ease: EASE.out, delay: item.delay }}
                      className="flex items-baseline justify-between gap-4 py-2 border-b border-border-strong last:border-0"
                    >
                      <p className="text-foreground-3 text-xs shrink-0" style={{ fontWeight: 300 }}>
                        {item.label}
                      </p>
                      <p
                        className="tabular-nums"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: idx === 0 ? "clamp(18px, 2.5vw, 22px)" : "clamp(16px, 2vw, 20px)",
                          color: idx === 0 ? "var(--foreground)" : "var(--foreground-2)",
                          fontWeight: idx === 0 ? 400 : 300,
                          fontFeatureSettings: '"tnum"',
                        }}
                      >
                        {item.value}{item.unit}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
