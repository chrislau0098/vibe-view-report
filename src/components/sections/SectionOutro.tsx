import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";
import { REPORT_META } from "@/data";

export function SectionOutro() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-56 px-6"
      style={{ background: "var(--background)" }}
    >
      {/* Multi-layer background atmosphere — percentage widths fill wide viewports */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[700px]"
        style={{
          background: "radial-gradient(ellipse 140% 700px at 50% 100%, oklch(0.65 0.175 42 / 0.30), transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[400px]"
        style={{
          background: "radial-gradient(ellipse 100% 400px at 50% 100%, oklch(0.73 0.185 48 / 0.18), transparent 70%)",
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
