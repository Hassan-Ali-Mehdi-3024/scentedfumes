"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

export const Hero = () => {
  return (
    <section className="relative min-h-[95vh] w-full flex flex-col justify-center overflow-hidden bg-[#1A1512]">
      
      {/* Background is now provided globally in layout.tsx; Hero content sits above it. */}

      {/* --- MAIN CONTENT --- */}
      <motion.div
        className="relative z-10 w-full mx-auto px-6 lg:px-12 pt-28 lg:pt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >

        {/* LEFT COLUMN: Typography & CTA */}
        <motion.div className="text-center lg:text-left flex flex-col justify-center" variants={fadeUp}>

          <motion.h2 className="text-sm md:text-base text-white/60 tracking-[0.2em] uppercase font-medium mb-4" variants={fadeUp}>
            Scented Fumes
          </motion.h2>

          <motion.div variants={fadeUp} className="mb-6">
            <h1 className="font-[family-name:var(--font-playfair)] leading-[0.9]">
              <span className="block text-3xl md:text-4xl lg:text-5xl tracking-wide font-medium mb-1 text-white">GET THE</span>
              <span className="block text-3xl md:text-4xl lg:text-5xl tracking-wide font-medium mb-3 text-white">SCENTED FUMES</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#b98f2a] to-[#8a6e1c]">
                EXPERIENCE
              </span>
            </h1>
          </motion.div>

          <motion.p className="text-white/80 font-light leading-relaxed mb-8" variants={fadeUp}>
            Experience the scent of luxury with Scented Fumes. We craft high-quality perfume renditions capturing the essence of your favourite classic fragrances. Indulge in sophistication that's accessible and unforgettable.
          </motion.p>

          {/* Buttons */}
          <motion.div className="flex gap-6 justify-center lg:justify-start items-center mb-8" variants={fadeUp}>
            <Link href="/category/pro" className="inline-flex">
              <span className="inline-flex items-center justify-center rounded-full border border-[#D4AF37] px-8 py-3 text-[#D4AF37] uppercase tracking-widest text-sm font-semibold hover:bg-[#D4AF37] hover:text-black transition-all">
                Shop Pro
              </span>
            </Link>
            <Link href="/category/eco" className="inline-flex">
              <span className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-white uppercase tracking-wider text-sm font-medium hover:bg-white/6 transition-all">
                Shop Eco
              </span>
            </Link>
          </motion.div>

          {/* Mobile stats are handled by TrustBar to avoid duplication; hide here. */}
          <div className="lg:hidden mt-6" />

        </motion.div>

        {/* RIGHT COLUMN: Podium + Bottles */}
        <motion.div className="relative flex items-center justify-center lg:justify-end" variants={scaleIn}>
          <div className="relative w-full h-[400px] lg:h-[500px]">

            {/* Podium background / radial glow */}
            <div className="absolute inset-0 rounded-full pointer-events-none">
              <div className="absolute -right-16 -top-12 w-[460px] h-[460px] rounded-full bg-gradient-radial from-[#D4AF37]/30 to-transparent blur-3xl opacity-90" />
            </div>

            {/* Back bottle (Eco) */}
            <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-20 w-32 md:w-36 lg:w-40 transform-gpu lg:-translate-x-8 z-10" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <Image
                src="/placeholder.svg"
                alt="Eco Bottle"
                width={300}
                height={380}
                className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                priority
              />
            </motion.div>

            {/* Front bottle (Pro) */}
            <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 w-40 md:w-44 lg:w-52 transform-gpu z-20" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <Image
                src="/placeholder.svg"
                alt="Pro Bottle"
                width={380}
                height={450}
                className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

      </motion.div>

      {/* Desktop stats are provided by the TrustBar component (avoids double rendering). */}

    </section>
  );
};

// --- Sub-components for cleaner code ---

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center">
    <div className="text-3xl font-[family-name:var(--font-playfair)] text-[#D4AF37] mb-2">{value}</div>
    <div className="text-[10px] uppercase tracking-widest text-white/70">{label}</div>
  </div>
);

const StatItemLarge = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center w-full">
    <div className="text-5xl font-[family-name:var(--font-playfair)] text-[#D4AF37] mb-3">{value}</div>
    <div className="text-xs uppercase tracking-[0.2em] text-white/60">{label}</div>
  </div>
);