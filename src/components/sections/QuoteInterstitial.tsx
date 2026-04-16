import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/lib/easings";

interface QuoteInterstitialProps {
  quote: string;
  attribution?: string;
}

export function QuoteInterstitial({ quote, attribution }: QuoteInterstitialProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 px-6 flex items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.09 0.008 260)" }}
    >
      {/* Subtle center glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 600px 300px at 50% 50%, oklch(0.65 0.175 42 / 0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-5">
        {/* Decorative quotation mark */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE.out }}
          aria-hidden="true"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(64px, 10vw, 96px)",
            lineHeight: 1,
            color: "var(--primary)",
            opacity: 0.5,
            fontWeight: 700,
            userSelect: "none",
          }}
        >
          "
        </motion.div>

        {/* Quote text — max 2 lines */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE.out, delay: 0.15 }}
          className="text-foreground text-center leading-[1.4]"
          style={{
            fontFamily: "var(--font-chinese-sans)",
            fontSize: "clamp(22px, 4vw, 40px)",
            fontWeight: 300,
            textWrap: "balance" as const,
            letterSpacing: "-0.01em",
          }}
        >
          {quote}
        </motion.p>

        {attribution && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-foreground-3 text-sm tracking-[0.15em] uppercase text-center"
            style={{ fontWeight: 300 }}
          >
            — {attribution}
          </motion.p>
        )}
      </div>
    </section>
  );
}
