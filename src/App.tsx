import { Hero } from "@/components/sections/Hero";
import { SectionViewership } from "@/components/sections/SectionViewership";
import { SectionExposure } from "@/components/sections/SectionExposure";
import { SectionDepth } from "@/components/sections/SectionDepth";
import { SectionScale } from "@/components/sections/SectionScale";
import { SectionGrowth } from "@/components/sections/SectionGrowth";
import { SectionOutro } from "@/components/sections/SectionOutro";

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <main className="max-w-[1200px] mx-auto">
        <Hero />
        <SectionViewership />
        <SectionExposure />
        <SectionDepth />
        <SectionScale />
        <SectionGrowth />
        <SectionOutro />
      </main>
    </div>
  );
}
