"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export const ComparisonSection = () => {
  return (
    <section className="w-full bg-[var(--bg-main)]">
      <motion.div
        className="relative w-full"
        style={{
          paddingTop: "clamp(4rem, 6vh, 6rem)",
          paddingBottom: "clamp(4rem, 6vh, 6rem)",
          paddingLeft: "clamp(2rem, 5vw, 6rem)",
          paddingRight: "clamp(2rem, 5vw, 6rem)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <div className="relative w-full overflow-hidden rounded-lg border-2 border-[var(--accent-gold)]">
          <div className="block lg:hidden">
            <Image
              src="/ECOvsPRO-sm.jpg"
              alt="PRO vs ECO Comparison (mobile)"
              width={800}
              height={1200}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="hidden lg:block">
            <Image
              src="/PROvsECO.png"
              alt="PRO vs ECO Comparison"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
             