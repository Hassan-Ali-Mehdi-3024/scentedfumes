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
            className="w-2/3 h-auto object-contain mb-4" 
          />
          <span className="
            px-6 py-2 
            rounded-full 
            border border-[#D4AF37] 
            text-[#D4AF37] 
            uppercase tracking-widest text-sm font-semibold
            transition-all duration-300
            group-hover:bg-[#D4AF37] group-hover:text-black
            font-[family-name:var(--font-montserrat)]
          ">
            {title}
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);
