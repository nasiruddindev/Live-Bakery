"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Star, Sparkles, Flame } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Hero() {
  const { addToCart, setIsCartOpen } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleOrderHeroPizza = () => {
    addToCart({
      id: "prod-1",
      name: "Classic Pepperoni Pizza",
      categoryName: "Artisan Pizza",
      price: 1250,
      image: "/hero.png",
    });
    setIsCartOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      className="relative w-full min-h-[720px] lg:min-h-[88vh] pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden flex items-center select-none"
      style={{ background: "radial-gradient(ellipse at 78% 48%, #FCF1DB 0%, #FFF8EA 70%)" }}
    >
      {/* Ambient background glow */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-[#F7EFDF]/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-[15%] bottom-[15%] w-[400px] h-[400px] bg-[#F26535]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[560px]">

          {/* ===================== LEFT COLUMN ===================== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 pr-0 lg:pr-6 space-y-6 md:space-y-7 z-20"
          >
            {/* Eyebrow */}
            <motion.div variants={lineVariants} className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E7D9C5] text-[#2D1B14] text-xs font-semibold tracking-wider uppercase shadow-xs">
                <Sparkles size={14} className="text-[#F26535]" />
                Natural & Artisan
              </div>
              <span className="text-[11px] font-medium text-[#75665B] flex items-center gap-1">
                <Flame size={13} className="text-[#F26535]" /> 500°C Stone Deck
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={lineVariants}
              className="font-serif text-[48px] sm:text-[64px] md:text-[74px] lg:text-[80px] xl:text-[86px] font-extrabold text-[#2D1B14] leading-[1.02] tracking-[-0.02em]"
            >
              Freshly Baked.
              <br />
              <span className="italic font-normal">Perfectly Made.</span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              variants={lineVariants}
              className="text-[#75665B] text-base md:text-lg leading-relaxed max-w-lg"
            >
              Experience the ultimate artisan food experience, handcrafted with premium,
              locally sourced ingredients and baked to bubbling perfection.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={lineVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleOrderHeroPizza}
                className="group px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-[#F26535] text-white font-medium text-sm md:text-base flex items-center gap-2 hover:bg-[#D84E20] shadow-lg shadow-[#F26535]/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                Order Now
                <ArrowUpRight size={19} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a
                href="#menu"
                className="px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-white/60 backdrop-blur-md border border-[#E7D9C5] text-[#2D1B14] font-medium text-sm md:text-base hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                View Menu
              </a>
            </motion.div>
          </motion.div>

          {/* ===================== RIGHT COLUMN — CLEAN PIZZA SHOWCASE ===================== */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[460px] sm:min-h-[520px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative w-full max-w-[500px] lg:max-w-[550px] flex items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Floating smooth container */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-square flex items-center justify-center cursor-pointer"
                onClick={handleOrderHeroPizza}
              >
                {/* Soft Radial Ambient Shadow */}
                <div className="absolute inset-10 rounded-full bg-[#2D1B14]/12 blur-2xl -z-10" />

                {/* Clean Transparent Pizza Image */}
                <motion.img
                  src="/hero.png"
                  alt="Delicious Cheesy Artisan Pizza"
                  animate={
                    isHovered
                      ? { scale: 1.07, rotate: 3 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-[90%] h-[90%] max-h-[500px] object-contain filter drop-shadow-[0_20px_35px_rgba(45,27,20,0.22)] select-none pointer-events-auto"
                />

                {/* ── PREMIUM HOVER DISCOUNT OVERLAY ── */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                    >
                      <div className="bg-[#2D1B14]/85 backdrop-blur-md px-7 py-5 rounded-3xl border border-white/20 shadow-2xl text-center transform -rotate-1 flex flex-col items-center gap-1.5">
                        <div className="inline-flex items-center gap-1 bg-[#F26535] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          <Sparkles size={11} /> Special Offer
                        </div>

                        <div className="font-serif text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] via-[#F26535] to-[#FFE3A8] leading-tight">
                          25% DISCOUNT
                        </div>

                        <p className="text-white/95 text-xs sm:text-sm font-medium tracking-wide">
                          Delicious Cheesy Artisan Pizza
                        </p>

                        <span className="text-[10px] text-white/60 font-sans mt-0.5">
                          Click to Order Now
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Clean Floating Badge — Artisan Pepperoni */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-4 left-6 bg-white/92 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-lg flex items-center gap-2 z-20"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F26535] animate-ping" />
                  <span className="text-xs sm:text-sm font-serif font-bold text-[#2D1B14]">
                    Artisan Cheesy — <span className="font-sans text-[#F26535]">৳1,250</span>
                  </span>
                </motion.div>

                {/* Clean Rating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute bottom-4 right-6 bg-white/92 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/60 shadow-lg flex items-center gap-1.5 z-20"
                >
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-[#2D1B14]">
                    4.9 <span className="text-[#75665B] font-normal">(1.2k)</span>
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
