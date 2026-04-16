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
      style={{ background: "oklch(0.11 0.012 260)" }}
    >
      <SpotlightGradient position="bottom-center" hue="orange" intensity={0.8} />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[400px]"
        style={{
          background: "radial-gradient(ellipse 1000px 400px at 50% 100%, oklch(0.65 0.175 42 / 0.15), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Decorative horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.1, ease: EASE.out }}
          className="w-16 h-px origin-center"
          style={{ background: "oklch(0.65 0.175 42 / 0.5)" }}
        />

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE.out, delay: 0.25 }}
        >
          <h2
            className="leading-[1.05] tracking-[-1px] text-foreground"
            style={{
              fontFamily: "var(--font-chinese-sans)",
              fontSize: "clamp(52px, 10vw, 100px)",
              fontWeight: 450,
              letterSpacing: "-0.02em",
            }}
          >
            做时间的朋友
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE.out, delay: 0.5 }}
          className="text-foreground-2 text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-chinese-sans)" }}
        >
          感谢每一位长期主义者
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE.out }}
          className="w-24 h-px origin-center"
          style={{ background: "oklch(0.65 0.175 42 / 0.4)" }}
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
          <p className="text-foreground-3 text-[10px] tracking-wider opacity-50">
            Generated with care · Claude Code × Nova Design Supervisor
          </p>
        </motion.div>
      </div>
    </section>
  );
}
