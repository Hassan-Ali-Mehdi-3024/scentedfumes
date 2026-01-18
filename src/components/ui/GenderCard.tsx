"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { scaleIn } from "@/lib/animations";

export const GenderCard = ({ 
  image, 
  title, 
  href,
  bgColor 
}: { 
  image: string; 
  title: string; 
  href: string;
  bgColor: string;
}) => (
  <motion.div 
    className="relative overflow-hidden rounded-lg group cursor-pointer"
    variants={scaleIn}
  >
    <Link href={href}>
      <div className={`relative w-full aspect-square ${bgColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center">
          <Image 
            src={image} 
            alt={title} 
            width={250}
            height={250}
            className="w-2/3 h-auto object-contain" 
            style={{ marginBottom: "clamp(0.75rem, 1.5vh, 1.25rem)" }}
          />
          <span 
            className="rounded-full border border-[var(--accent-gold)] text-[var(--accent-gold)] uppercase tracking-widest text-sm font-semibold transition-all duration-300 group-hover:bg-[var(--accent-gold)] group-hover:text-[var(--bg-main)]"
            style={{
              paddingTop: "clamp(0.45rem, 0.9vh, 0.6rem)",
              paddingBottom: "clamp(0.45rem, 0.9vh, 0.6rem)",
              paddingLeft: "clamp(1.25rem, 2.5vw, 1.75rem)",
              paddingRight: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontFamily: "var(--font-poppins), sans-serif",
            }}
          >
            {title}
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);
