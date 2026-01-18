"use client";

import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { GenderSection } from "@/components/home/GenderSection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main 
      className="w-full flex-1 bg-[var(--bg-main)]"
      style={{
        paddingTop: "clamp(1.5rem, 3vh, 2.5rem)",
        paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)",
        paddingLeft: "clamp(2rem, 5vw, 6rem)",
        paddingRight: "clamp(2rem, 5vw, 6rem)",
      }}
    >
      <Hero />
      <TrustBar />
      <GenderSection />
      <ComparisonSection />
      <Newsletter />
    </main>
  );
}
