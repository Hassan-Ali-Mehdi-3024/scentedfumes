"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

export const Newsletter = () => {
  return (
    <section className="py-20 px-6 lg:px-12 border-t border-white/10">
      <motion.div 
        className="w-full mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div className="mb-6" variants={fadeUp}>
          <svg 
            className="w-12 h-12 mx-auto text-[#D4AF37]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" 
            />
          </svg>
        </motion.div>

        <motion.h2 
          className="text-3xl lg:text-4xl text-white mb-8 font-[family-name:var(--font-playfair)]"
          variants={fadeUp}
        >
          CONNECT WITH SCENTED FUMES
        </motion.h2>

        <motion.p 
          className="text-white/80 mb-8 font-light"
          variants={fadeUp}
        >
          Discover the art of fragrance with our collection of premium renditions. Immerse yourself in the aroma of luxury and elevate your style with Scented Fumes.
        </motion.p>

        <motion.form 
          className="flex flex-col sm:flex-row gap-4 w-full mx-auto mb-8"
          variants={fadeUp}
        >
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="
              flex-1 px-6 py-3 
              bg-transparent 
              border-b border-white/50 
              text-white placeholder-white/50
              focus:outline-none focus:border-[#D4AF37]
              transition-colors
            "
          />
          <button 
            type="submit" 
            className="
              px-8 py-3 
              bg-[#D4AF37] 
              text-black 
              uppercase tracking-widest text-sm font-semibold
              hover:bg-[#D4AF37]/90
              transition-colors
              font-[family-name:var(--font-montserrat)]
            "
          >
            SIGN UP
          </button>
        </motion.form>

        <motion.div 
          className="flex justify-center gap-6"
          variants={fadeUp}
        >
          {[
            { icon: "F", href: "https://www.facebook.com/profile.php?id=61558871727344" },
            { icon: "I", href: "https://www.instagram.com/scentedfumes.official" },
            { icon: "T", href: "https://www.tiktok.com/@scented.fumes" },
            { icon: "W", href: "https://wa.me/923321300655" },
          ].map((social) => (
            <a 
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-10 h-10 
                rounded-full 
                border border-white/30 
                flex items-center justify-center
                text-white/70 text-sm font-bold
                hover:border-[#D4AF37] hover:text-[#D4AF37]
                transition-colors
              "
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
