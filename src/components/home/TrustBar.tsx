"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

export const TrustBar = () => {
  return (
    <section 
      className="w-full bg-[var(--bg-main)]"
      style={{
        paddingTop: "clamp(4rem, 6vh, 5rem)",
        paddingBottom: "clamp(4rem, 6vh, 5rem)",
        paddingLeft: "clamp(2rem, 5vw, 6rem)",
        paddingRight: "clamp(2rem, 5vw, 6rem)",
      }}
    >
      <motion.div 
        className="w-full flex justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-2 gap-8 lg:gap-16 w-full max-w-6xl">
          {[
            { value: "12+", label: "LONG LASTING" },
            { value: "90%", label: "SIMMILAR FRAGRANCE" },
            { value: "$", label: "AFFORDABLE &\nWORTH THE PRICE" },
            { value: "200+", label: "HAPPY CUSTOMERS\nNATION-WIDE" },
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center flex flex-col items-center justify-center"
              variants={fadeUp}
            >
              <div
                className="text-[var(--accent-gold)] mb-3 font-poppins"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 3rem)",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-[var(--accent-gold)] uppercase whitespace-pre-line font-light"
                style={{
                  fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
                  letterSpacing: "0.08em",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
