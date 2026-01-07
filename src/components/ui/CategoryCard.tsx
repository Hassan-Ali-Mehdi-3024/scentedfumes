"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CategoryButton } from "./CategoryButton";
import { fadeUp } from "@/lib/animations";

export const CategoryCard = ({ 
  image, 
  title, 
  href 
}: { 
  image: string; 
  title: string; 
  href: string;
}) => (
  <motion.div 
    className="flex flex-col items-center gap-6 group cursor-pointer"
    variants={fadeUp}
  >
    <CategoryButton label={title} href={href} />
    
    <div className="relative w-full aspect-[4/5] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-3xl" />
      <div className="relative z-10 w-3/4 h-auto transition-transform duration-500 group-hover:-translate-y-4">
        <Image 
          src={image} 
          alt={title} 
          width={300}
          height={375}
          className="w-full h-auto object-contain" 
        />
      </div>
    </div>
  </motion.div>
);
