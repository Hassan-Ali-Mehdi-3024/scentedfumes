"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { CategoryButton } from "@/components/ui/CategoryButton";

export const ComparisonSection = () => {
  return (
      <section className="py-20 px-6 lg:px-12">
        <div className="w-full mx-auto bg-[#F5F0EB] rounded-2xl overflow-hidden">
        <motion.div
          className="grid lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* PRO */}
          <motion.div 
            className="p-12 lg:p-16 flex flex-col items-center text-center bg-gradient-to-br from-amber-900/10 to-transparent"
            variants={fadeUp}
          >
            <h3 className="text-5xl lg:text-6xl text-gray-900 mb-8 font-[family-name:var(--font-playfair)]">
              PRO
            </h3>
            <div className="relative w-64 h-80 mb-8">
              <Image 
                src="/placeholder.svg"
                alt="Pro Series"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-3 text-gray-800">
              <p className="text-lg"> 10+ Hours Lasting</p>
              <p className="text-lg"> Premium Packaging</p>
              <p className="text-lg"> More Concentrated Perfume</p>
            </div>
            <div className="mt-8">
              <CategoryButton label="AVAILABLE NOW" href="/category/pro" />
            </div>
          </motion.div>

          {/* ECO */}
          <motion.div 
            className="p-12 lg:p-16 flex flex-col items-center text-center bg-gradient-to-br from-green-900/10 to-transparent"
            variants={fadeUp}
          >
            <h3 className="text-5xl lg:text-6xl text-gray-900 mb-8 font-[family-name:var(--font-playfair)]">
              ECO
            </h3>
            <div className="relative w-64 h-80 mb-8">
              <Image 
                src="/placeholder.svg"
                alt="Eco Series"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-3 text-gray-800">
              <p className="text-lg"> 5+ Hours Lasting</p>
              <p className="text-lg"> Eco-Friendly Packaging</p>
              <p className="text-lg"> Less Concentrated Perfume</p>
              <p className="text-lg"> Neither Too In, 25%</p>
            </div>
            <div className="mt-8">
              <CategoryButton label="AVAILABLE NOW" href="/category/eco" />
            </div>
          </motion.div>
        </motion.div>

        {/* Centered tagline */}
        <div className="py-12 text-center border-t border-gray-300">
          <h2 className="text-3xl lg:text-4xl text-gray-900 font-[family-name:var(--font-playfair)] mb-2">
            &ldquo;TWO AMAZING CONCENTRATIONS<br />
            <span className="text-[#D4AF37]">OF SAME SCENT</span>&rdquo;
          </h2>
        </div>
      </div>
    </section>
  );
};
