"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

export const TrustBar = () => {
  return (
    <section className="py-20 px-6 border-y border-white/10">
      <motion.div 
          className="w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {[
          { value: "12+", label: "LONG LASTING" },
          { value: "90%", label: "SIMMILAR FRAGRANCE" },
          { value: "$", label: "AFFORDABLE &\nWORTH THE PRICE" },
          { value: "200+", label: "HAPPY CUSTOMERS\nNATION-WIDE" },
        ].map((stat, index) => (
          <motion.div 
            key={index} 
            className="text-center"
            variants={fadeUp}
          >
            <div className="text-4xl lg:text-5xl text-[#D4AF37] mb-3 font-[family-name:var(--font-playfair)]">
              {stat.value}
            </div>
            <div className="text-white/90 text-xs lg:text-sm uppercase tracking-wider whitespace-pre-line font-light">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
