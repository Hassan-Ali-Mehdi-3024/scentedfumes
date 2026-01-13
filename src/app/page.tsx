"use client";

import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { GenderSection } from "@/components/home/GenderSection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main className="bg-[#1A1512] w-full flex-1 px-5 lg:px-16 py-6 sm:py-10">
      <Hero />
      <TrustBar />
      <GenderSection />
      <ComparisonSection />
      <Newsletter />
    </main>
  );
}
