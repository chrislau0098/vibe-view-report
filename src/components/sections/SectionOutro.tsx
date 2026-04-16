import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { REPORT_META } from "@/data";
import { SpotlightGradient } from "@/components/primitives/SpotlightGradient";

export function SectionOutro() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-56 px-6"
      style={{ background: "oklch(0.09 0.008 260)" }}
    >
      {/* Multi-layer background atmosphere */}
      <SpotlightGradient position="bottom-center" hue="orange" intensity={0.6} />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[400px]"
        style={{
          background: "radial-gradient(ellipse 900px 350px at 50% 100%, oklch(0.65 0.175 42 / 0.12), transparent 70%)",
        }}
      />
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          mixBlendMode: "overlay",
        }}
      />
      {/* Horizontal gradient vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, oklch(0.07 0.006 260 / 0.6) 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Decorative horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.1, ease: EASE.out }}
          className="w-12 h-px origin-center"
          style={{ background: "oklch(0.65 0.175 42 / 0.4)" }}
        />

        {/* Main title — refined, not oversized */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE.out, delay: 0.25 }}
        >
          <h2
            className="leading-[1.1] text-foreground"
            style={{
              fontFamily: "var(--font-chinese-sans)",
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 300,
              letterSpacing: "0.1em",
            }}
          >
            做时间的朋友
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.5 }}
          className="text-foreground-3 text-sm leading-relaxed tracking-[0.05em]"
          style={{ fontFamily: "var(--font-chinese-sans)", fontWeight: 300 }}
        >
          感谢每一位长期主义者
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE.out }}
          className="w-20 h-px origin-center"
          style={{ background: "oklch(0.65 0.175 42 / 0.3)" }}
        />

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col items-center gap-1.5"
        >
          <p className="text-foreground-3 text-xs tracking-widest">
            {REPORT_META.brand} · {REPORT_META.dataDeadline}
          </p>
          <p className="text-foreground-3 text-[10px] tracking-wider opacity-40">
            Powered by 飞书多维表格
          </p>
        </motion.div>
      </div>
    </section>
  );
}
