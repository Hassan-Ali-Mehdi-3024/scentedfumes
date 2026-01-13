"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

export const GenderSection = () => {
  const cards = [
    {
      id: 1,
      label: "SHOP ECO",
      image: "/ECO.png",
      href: "/category/eco",
    },
    {
      id: 2,
      label: "SHOP PRO",
      image: "/PRO.png",
      href: "/category/pro",
    },
    {
      id: 3,
      label: "TESTERS OF YOUR CHOICE",
      image: "/Testers.png",
      href: "/category/tester",
    },
    {
      id: 4,
      label: "FOR HER",
      image: "/For-Her.png",
      href: "/category/women",
    },
    {
      id: 5,
      label: "FOR HIM",
      image: "/For-Him.png",
      href: "/category/men",
    },
    {
      id: 6,
      label: "UNISEX",
      image: "/UniSex.png",
      href: "/category/unisex",
    },
  ];

  return (
    <section 
      className="w-full bg-[var(--bg-main)]"
      style={{
        paddingTop: "clamp(4rem, 6vh, 6rem)",
        paddingBottom: "clamp(4rem, 6vh, 6rem)",
        paddingLeft: "clamp(2rem, 5vw, 6rem)",
        paddingRight: "clamp(2rem, 5vw, 6rem)",
      }}
    >
      <motion.div 
        className="w-full grid grid-cols-1 md:grid-cols-3"
        style={{
          gap: "clamp(2.1rem, 4.2vw, 4.2rem)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="relative group"
            style={{
              aspectRatio: "1",
            }}
            variants={fadeUp}
          >
            <Link href={card.href} className="block w-full h-full overflow-hidden rounded-lg">
              {/* Background Image - Cropped uniformly */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              {/* Centered Label at Top - Half on, Half off image */}
              <div 
                className="absolute left-1/2 z-20"
                style={{
                  top: "0",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                <div 
                  className="px-6 py-3 rounded-full border-2 border-[var(--accent-gold)] bg-[var(--bg-surface)]"
                  style={{
                    borderRadius: "999px",
                    padding: "clamp(0.5rem, 1vw, 0.75rem) clamp(1.5rem, 3vw, 2.5rem)",
                  }}
                >
                  <span 
                    className="text-[var(--text-secondary)] font-light uppercase tracking-widest whitespace-nowrap"
                    style={{
                      fontSize: "clamp(1rem, 1.2vw, 1.5rem)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {card.label}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
