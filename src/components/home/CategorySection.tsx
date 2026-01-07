"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { CategoryCard } from "@/components/ui/CategoryCard";

export const CategorySection = () => {
  return (
    <section className="py-20 px-6 lg:px-12">
      <motion.div 
        className="w-full mx-auto grid lg:grid-cols-3 gap-12 lg:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <CategoryCard 
          image="/placeholder.svg"
          title="SHOP ECO"
          href="/category/eco"
        />
        <CategoryCard 
          image="/placeholder.svg"
          title="SHOP PRO"
          href="/category/pro"
        />
        <CategoryCard 
          image="/placeholder.svg"
          title="TESTERS OF YOUR CHOICE"
          href="/category/tester"
        />
      </motion.div>
    </section>
  );
};
