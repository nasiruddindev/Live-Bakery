"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Flame, Award, ArrowUpRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FoodExperience() {
  const containerRef = useRef(null);
  const { addToCart, setIsCartOpen } = useCart();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const burgerY = useTransform(scrollYProgress, [0, 1], [-40, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotateVal = useTransform(scrollYProgress, [0, 1], [-3, 4]);

  const handleTasteExperience = () => {
    addToCart({
      id: "prod-2",
      name: "Double Cheese Burger",
      categoryName: "Gourmet Burgers",
      price: 680,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    });
    setIsCartOpen(true);
  };

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 bg-[#2D1B14] text-[#FFF8EA] relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute -left-32 top-1/3 w-96 h-96 bg-[#F26535]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-1/4 w-96 h-96 bg-[#E5A823]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Visual: Large Food Photography with Floating Ingredients */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-2 lg:order-1">
            <motion.div
              style={{ y: burgerY, rotate: rotateVal }}
              className="relative w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
            >
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85"
                alt="Artisan Gourmet Smashed Cheeseburger"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating ingredient detail badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#F26535] uppercase tracking-wider block">
                    Signature Burger
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Double Smashed Wagyu Brioche
                  </h4>
                </div>
                <button
                  onClick={handleTasteExperience}
                  className="px-3.5 py-1.5 rounded-full bg-[#F26535] text-white text-xs font-semibold hover:bg-[#D84E20] transition-colors flex items-center gap-1 shrink-0"
                >
                  Order ৳680 <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* Small floating ingredient pill */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 md:right-8 bg-[#FFF8EA] text-[#2D1B14] px-4 py-2 rounded-2xl shadow-xl border border-[#E7D9C5] text-xs font-bold flex items-center gap-2"
            >
              <Flame size={15} className="text-[#F26535]" />
              <span>Smoked Oak Brioche</span>
            </motion.div>
          </div>

          {/* Right Text Story Content */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-6 space-y-7 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#F26535] text-xs font-bold tracking-widest uppercase">
              <Sparkles size={14} /> The Grain & Oven Standard
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] text-white">
              Made Fresh.
              <br />
              <span className="text-[#F26535] italic font-normal">Loved Every Day.</span>
            </h2>

            <p className="text-[#FFF8EA]/75 text-base md:text-lg leading-relaxed">
              We reject frozen dough, artificial preservatives, and rushed baking. Every morning
              at 4:00 AM, our bakers hand-knead heritage flours, ignite our 500°C volcanic stone
              hearths, and layer pure butter pastries to create food that comforts the soul.
            </p>

            {/* 3 Storytelling Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
              <div className="space-y-1">
                <span className="font-serif text-3xl font-extrabold text-[#F26535]">48h</span>
                <h5 className="text-sm font-bold text-white">Cold Proofing</h5>
                <p className="text-xs text-[#FFF8EA]/60">Slow fermentation for rich flavor & light digestion.</p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-3xl font-extrabold text-[#F26535]">100%</span>
                <h5 className="text-sm font-bold text-white">Normandy Butter</h5>
                <p className="text-xs text-[#FFF8EA]/60">Pure grass-fed French butter for 72 golden layers.</p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-3xl font-extrabold text-[#F26535]">500°C</span>
                <h5 className="text-sm font-bold text-white">Stone Hearth</h5>
                <p className="text-xs text-[#FFF8EA]/60">Blistered leoparding and bubbly crisp artisan crust.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleTasteExperience}
                className="px-8 py-3.5 rounded-full bg-[#F26535] text-white font-semibold text-sm hover:bg-[#D84E20] transition-colors shadow-lg shadow-[#F26535]/30 cursor-pointer"
              >
                Experience the Craft
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
