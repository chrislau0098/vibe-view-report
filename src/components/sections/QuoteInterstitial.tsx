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

      <div className="relative z-10 max-w-3xl text-center space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE.out }}
          className="text-foreground leading-[1.3] tracking-[-0.01em]"
          style={{
            fontFamily: "var(--font-chinese-sans)",
            fontSize: "clamp(26px, 5vw, 52px)",
            fontWeight: 300,
            textWrap: "balance" as const,
            overflowWrap: "break-word",
          }}
        >
          &#8220;{quote}&#8221;
        </motion.p>

        {attribution && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-foreground-3 text-sm tracking-[0.15em] uppercase"
            style={{ fontWeight: 300 }}
          >
            — {attribution}
          </motion.p>
        )}
      </div>
    </section>
  );
}
