"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, Sparkles, Flame } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Hero() {
  const { addToCart, setIsCartOpen } = useCart();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted (required for autoplay in all browsers)
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const tryPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          // If autoplay fails, try again on first user interaction
          const resume = () => {
            video.play().catch(() => {});
            document.removeEventListener("click", resume);
            document.removeEventListener("touchstart", resume);
            document.removeEventListener("scroll", resume);
          };
          document.addEventListener("click", resume, { once: true });
          document.addEventListener("touchstart", resume, { once: true });
          document.addEventListener("scroll", resume, { once: true });
        });
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
      video.load(); // force reload
    }

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  const handleOrderHeroPizza = () => {
    addToCart({
      id: "prod-1",
      name: "Classic Pepperoni Pizza",
      categoryName: "Artisan Pizza",
      price: 1250,
      image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80",
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
      {/* Ambient glow blobs */}
      <div className="absolute right-0 top-1/4 w-[650px] h-[650px] bg-[#F7EFDF]/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-[20%] bottom-[15%] w-[450px] h-[450px] bg-[#F26535]/6 rounded-full blur-3xl pointer-events-none" />

      {/* Golden olive oil droplets */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[26%] top-[20%] w-2.5 h-2.5 rounded-full bg-[#E5A823]/80 blur-[0.5px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[12%] bottom-[24%] w-3 h-3 rounded-full bg-[#E5A823]/80 blur-[0.5px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[580px]">

          {/* ===================== LEFT COLUMN ===================== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 pr-0 lg:pr-6 space-y-6 md:space-y-7 z-20"
          >
            {/* Eyebrow */}
            <motion.div variants={lineVariants} className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E7D9C5] text-[#2D1B14] text-xs font-semibold tracking-wider uppercase">
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

          {/* ===================== RIGHT COLUMN — VIDEO ===================== */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end min-h-[460px] sm:min-h-[540px] lg:min-h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative w-full max-w-[540px] lg:max-w-[580px]"
            >
              {/* Gentle floating animation */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Floating tomato - top right */}
                <motion.img
                  src="/cutout-tomato-top.png"
                  alt=""
                  animate={{ rotate: [0, 14, -6, 0], y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-4 w-16 sm:w-20 pointer-events-none z-30 drop-shadow-[0_10px_20px_rgba(45,27,20,0.18)]"
                />

                {/* Floating tomato - middle left */}
                <motion.img
                  src="/cutout-tomato-left.png"
                  alt=""
                  animate={{ rotate: [0, -12, 8, 0], y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-[40%] -left-6 w-14 sm:w-16 pointer-events-none z-30 drop-shadow-[0_8px_16px_rgba(45,27,20,0.15)]"
                />

                {/* Floating tomato - bottom */}
                <motion.img
                  src="/cutout-tomato-bottom.png"
                  alt=""
                  animate={{ rotate: [0, 16, -10, 0], y: [0, 8, 0] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 left-[15%] w-14 sm:w-16 pointer-events-none z-30 drop-shadow-[0_8px_16px_rgba(45,27,20,0.18)]"
                />

                {/* Floating basil - top left */}
                <motion.img
                  src="/cutout-basil-top.png"
                  alt=""
                  animate={{ rotate: [-4, 6, -4], y: [0, -6, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-2 left-2 w-12 sm:w-16 pointer-events-none z-30 drop-shadow-[0_6px_12px_rgba(45,27,20,0.12)]"
                />

                {/* Floating basil - right side */}
                <motion.img
                  src="/cutout-basil-right.png"
                  alt=""
                  animate={{ rotate: [3, -5, 3], y: [0, -7, 0] }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute top-[18%] -right-4 w-12 sm:w-14 pointer-events-none z-30 drop-shadow-[0_6px_12px_rgba(45,27,20,0.12)]"
                />

                {/* Video frame — clean glass look */}
                <div className="relative w-full aspect-square rounded-[36px] sm:rounded-[44px] overflow-hidden bg-[#2D1B14]/5 backdrop-blur-sm">
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/hero-pizza-raw.jpg"
                    className="w-full h-full object-cover"
                    style={{ pointerEvents: "none" }}
                    x-webkit-airplay="allow"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false"
                  >
                    <source src="/herobanner.mp4#t=0.001" type="video/mp4" />
                    <source src="/hero-pizza-video.mp4" type="video/mp4" />
                  </video>

                  {/* Subtle gradient at the bottom for badge contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                  {/* Live status badge */}
                  <div className="absolute top-4 left-4 bg-white/85 backdrop-blur-md text-[#2D1B14] text-[11px] font-semibold px-3 py-1 rounded-full border border-white/50 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Artisan Oven Live
                  </div>
                </div>

                {/* Badge 1 — Artisan Pepperoni */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.85 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleOrderHeroPizza}
                  className="absolute bottom-6 left-4 sm:left-6 bg-white/92 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-lg flex items-center gap-2 cursor-pointer z-30 hover:border-[#F26535]/40 group transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F26535] animate-ping" />
                  <span className="text-xs sm:text-sm font-serif font-bold text-[#2D1B14] group-hover:text-[#F26535] transition-colors">
                    Artisan Pepperoni — <span className="font-sans">৳1,250</span>
                  </span>
                </motion.div>

                {/* Badge 2 — Rating */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-6 right-4 sm:right-6 bg-white/92 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-lg flex items-center gap-2 z-30 transition-all"
                >
                  <Star size={15} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs sm:text-sm font-bold text-[#2D1B14]">
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
