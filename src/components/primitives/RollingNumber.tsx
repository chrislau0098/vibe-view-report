import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  motion,
  useInView,
} from "motion/react";


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
  duration = 2.0,
  delay = 0,
  className,
  suffixClassName,
}: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(precision));

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, {
      duration,
      delay,
      // [0.25, 1, 0.5, 1]: gentler start than EASE.out so digits don't race
      // past too quickly; decelerates smoothly into the final value
      ease: [0.25, 1, 0.5, 1],
    });
    return () => controls.stop();
  }, [inView, value, duration, delay, mv, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix && <span>{prefix}</span>}
      <motion.span style={{ fontFeatureSettings: '"cv01", "ss03", "tnum"' }}>
        {rounded}
      </motion.span>
      {suffix && (
        <span className={suffixClassName ?? "text-[0.4em] font-normal tracking-normal ml-[0.1em]"}>
          {suffix}
        </span>
      )}
    </span>
  );
}
