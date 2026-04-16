import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Agentation } from "agentation";
import { Hero } from "@/components/sections/Hero";
import { SectionViewership } from "@/components/sections/SectionViewership";
import { SectionExposure } from "@/components/sections/SectionExposure";
import { SectionDepth } from "@/components/sections/SectionDepth";
import { SectionScale } from "@/components/sections/SectionScale";
import { SectionGrowth } from "@/components/sections/SectionGrowth";
import { SectionOutro } from "@/components/sections/SectionOutro";
import { QuoteInterstitial } from "@/components/sections/QuoteInterstitial";

// Section IDs for scroll rail (numbered sections + outro, skipping quote interstitials)
const SECTION_IDS = [
  "section-hero",
  "section-viewership",
  "section-exposure",
  "section-depth",
  "section-scale",
  "section-growth",
  "section-outro",
];

function ScrollRail() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      Math.floor(v * SECTION_IDS.length),
      SECTION_IDS.length - 1,
    );
    setActive(idx);
  });

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      {SECTION_IDS.map((id, i) => (
        <button
          key={id}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          className="rounded-full transition-all duration-300 cursor-pointer"
          style={{
            width: "2px",
            height: i === active ? "24px" : "6px",
            background:
              i === active ? "var(--primary-hl)" : "oklch(1 0 0 / 0.15)",
          }}
          aria-label={`跳转到第 ${i + 1} 章`}
        />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen w-full">
      {import.meta.env.DEV && <Agentation />}
      <ScrollRail />
      <main>
        <div id="section-hero"><Hero /></div>
        <div id="section-viewership"><SectionViewership /></div>
        <div id="section-exposure"><SectionExposure /></div>
        <QuoteInterstitial
          quote="时间是最公平的资源，你怎么用它，它就给你什么回报"
          attribution="罗振宇 · 时间的朋友 2026"
        />
        <div id="section-depth"><SectionDepth /></div>
        <div id="section-scale"><SectionScale /></div>
        <div id="section-growth"><SectionGrowth /></div>
        <QuoteInterstitial
          quote="四年，四千七百万人，和时间做朋友，是这个时代最好的选择"
          attribution="得到 App · 2026"
        />
        <div id="section-outro"><SectionOutro /></div>
      </main>
    </div>
  );
}
