import { useRef, useState, useEffect } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";

interface RollingNumberProps {
  value: number;
  precision?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  suffixClassName?: string;
}

export function RollingNumber({
  value,
  precision = 1,
  suffix,
  prefix,
  duration = 1.0,
  delay = 0,
  className,
  suffixClassName,
}: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  // Start at 0, animate to value once in view
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const delayMs = prefersReducedMotion ? 0 : delay * 1000;
    const timer = setTimeout(() => {
      setDisplayed(value);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [inView, value, delay, prefersReducedMotion, setDisplayed]);

  return (
    <span ref={ref} className={className}>
      {prefix && <span>{prefix}</span>}
      <AnimateNumber
        style={{ fontFeatureSettings: '"cv01", "ss03", "tnum"' }}
        transition={{
          layout: { duration: duration * 0.4 },
          y: {
            type: "spring",
            visualDuration: duration,
            bounce: 0.1,
          },
          opacity: { duration: 0.18, ease: "linear" },
        }}
      >
        {parseFloat(displayed.toFixed(precision))}
      </AnimateNumber>
      {suffix && (
        <span className={suffixClassName ?? "text-[0.4em] font-normal tracking-normal ml-[0.1em]"}>
          {suffix}
        </span>
      )}
    </span>
  );
}
