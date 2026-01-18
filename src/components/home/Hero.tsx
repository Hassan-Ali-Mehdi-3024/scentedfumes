"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export const Hero = () => {
  return (
    <>
      {/* MOBILE HERO */}
      <section
        className="relative w-full flex items-start overflow-hidden block lg:hidden"
        style={{
          minHeight: "100vh"
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/SBG.png"
            alt="Hero Background Mobile"
            fill
            className="object-cover object-center"
            priority
            quality={75}
          />
        </div>

        <div className="absolute inset-0 z-5 pointer-events-none" style={{
          background: "var(--gradient-hero-overlay)",
        }} />

        <motion.div
          className="relative z-10 w-full"
          style={{
            paddingTop: "clamp(6rem, 15vh, 10rem)",
            paddingBottom: "clamp(2rem, 5vh, 4rem)",
            paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
            paddingRight: "clamp(1.5rem, 4vw, 3rem)",
          }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="flex flex-col items-center text-center"
            variants={fadeUp}
          >
            <motion.div className="mb-4" variants={fadeUp}>
              <h1>
                <span 
                  className="block text-[var(--accent-gold)] mb-1"
                  style={{
                    fontSize: "clamp(1.5rem, 4.5vw, 1.9rem)",
                    letterSpacing: "0.05em",
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 100,
                  }}
                >
                  GET THE
                </span>
                <span 
                  className="block text-[var(--accent-gold)] mb-1"
                  style={{
                    fontSize: "clamp(1.5rem, 4.5vw, 1.9rem)",
                    letterSpacing: "0.05em",
                    lineHeight: 0.4,
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 100,
                  }}
                >
                  SCENTED FUMES
                </span>
                <span 
                  className="block text-[var(--accent-gold)]"
                  style={{
                    fontSize: "clamp(2.2rem, 6.5vw, 2.8rem)",
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 800,
                  }}
                >
                  EXPERIENCE
                </span>
              </h1>
            </motion.div>

            <motion.p 
              className="text-[var(--text-primary)] font-light"
              style={{
                fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
                maxWidth: "90%",
                lineHeight: "1.4",
              }}
              variants={fadeUp}
            >
              Experience the scent of luxury with Scented Fumes. We craft high-quality perfume renditions capturing the essence of your favourite classic fragrances. Indulge in sophistication that's accessible and unforgettable.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* DESKTOP HERO */}
      <section
        className="relative w-full flex items-start overflow-hidden hidden lg:flex"
        style={{
          minHeight: "100vh"
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/LBG.jpg"
            alt="Hero Background Desktop"
            fill
            className="object-cover object-center"
            priority
            quality={75}
          />
        </div>

        <div className="absolute inset-0 z-5 pointer-events-none" style={{
          background: "var(--gradient-hero-overlay)",
        }} />

        <motion.div
          className="relative z-10 w-full"
          style={{
            paddingTop: "clamp(6rem, 12vh, 10rem)",
            paddingBottom: "clamp(6rem, 12vh, 10rem)",
            paddingLeft: "clamp(3rem, 8vw, 8rem)",
            paddingRight: "clamp(3rem, 8vw, 8rem)",
          }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
            <motion.div 
              className="flex flex-col justify-start text-left"
              variants={fadeUp}
            >
              <motion.div className="mb-6" variants={fadeUp}>
                <h1>
                  <span 
                    className="block text-[var(--accent-gold)] mb-1"
                    style={{
                      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                      letterSpacing: "0.05em",
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 100,
                    }}
                  >
                    GET THE
                  </span>
                  <span 
                    className="block text-[var(--accent-gold)] mb-1"
                    style={{
                      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                      letterSpacing: "0.05em",
                      lineHeight: 0.4,
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 100,
                    }}
                  >
                    SCENTED FUMES
                  </span>
                  <span 
                    className="block text-[var(--accent-gold)]"
                    style={{
                      fontSize: "clamp(4rem, 6.5vw, 5.5rem)",
                      letterSpacing: "0.08em",
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 800,
                    }}
                  >
                    EXPERIENCE
                  </span>
                </h1>
              </motion.div>

              <motion.p 
                className="text-[var(--text-primary)] font-light"
                style={{
                  fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                  maxWidth: "90%",
                  lineHeight: "1.6",
                }}
                variants={fadeUp}
              >
                Experience the scent of luxury with Scented Fumes. We craft high-quality perfume renditions capturing the essence of your favourite classic fragrances. Indulge in sophistication that's accessible and unforgettable.
              </motion.p>
            </motion.div>

            <div />
          </div>
        </motion.div>
      </section>
    </>
  );
};