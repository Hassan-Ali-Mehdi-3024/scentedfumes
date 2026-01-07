"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { GenderCard } from "@/components/ui/GenderCard";

export const GenderSection = () => {
  return (
    <section className="py-20 px-6">
      <motion.div 
        className="w-full mx-auto grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <GenderCard 
          image="/placeholder.svg"
          title="FOR HER"
          href="/category/women"
          bgColor="bg-gradient-to-br from-pink-200/20 to-pink-400/20"
        />
        <GenderCard 
          image="/placeholder.svg"
          title="FOR HIM"
          href="/category/men"
          bgColor="bg-gradient-to-br from-blue-900/30 to-blue-600/30"
        />
        <GenderCard 
          image="/placeholder.svg"
          title="UNISEX"
          href="/category/unisex"
          bgColor="bg-gradient-to-br from-amber-700/30 to-amber-400/30"
        />
      </motion.div>
    </section>
  );
};
