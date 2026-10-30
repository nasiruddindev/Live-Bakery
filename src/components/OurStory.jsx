"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wheat, HeartHandshake, ShieldCheck, Flame, CheckCircle2 } from "lucide-react";

export default function OurStory() {
  const pillars = [
    {
      icon: <Wheat className="text-[#F26535]" size={24} />,
      title: "Fresh Ingredients",
      desc: "Stone-milled heritage grains, certified organic dairy, and heirloom tomatoes hand-picked daily.",
    },
    {
      icon: <HeartHandshake className="text-[#F26535]" size={24} />,
      title: "Expert Craftsmanship",
      desc: "Trained under European master bakers, our team respects the patient rhythm of wild yeast fermentation.",
    },
    {
      icon: <ShieldCheck className="text-[#F26535]" size={24} />,
      title: "Uncompromising Quality",
      desc: "Zero artificial improvers, zero stabilizers. Every crumb is honest, wholesome, and unforgettable.",
    },
    {
      icon: <Flame className="text-[#F26535]" size={24} />,
      title: "Freshly Baked Daily",
      desc: "Multiple baking rounds throughout morning, noon, and evening so your food is always oven-warm.",
    },
  ];

  return (
    <section id="our-story" className="py-24 md:py-32 bg-[#F7EFDF]/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Asymmetric Image Collage (Left Column) */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-4"
              >
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-lg border border-[#E7D9C5]">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80"
                    alt="Artisan baker dusting sourdough bread with flour"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 rounded-3xl bg-white border border-[#E7D9C5] shadow-xs">
                  <span className="font-serif text-3xl font-extrabold text-[#F26535]">12+</span>
                  <p className="text-xs font-semibold text-[#2D1B14] mt-1">Years of Artisan Tradition</p>
                  <p className="text-[11px] text-[#75665B] mt-0.5">Baking daily since 2014</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-4 pt-8"
              >
                <div className="p-5 rounded-3xl bg-[#2D1B14] text-white shadow-lg">
                  <span className="font-serif text-3xl font-extrabold text-[#FFF8EA]">100%</span>
                  <p className="text-xs font-semibold text-[#FFF8EA] mt-1">Natural Wild Sourdough</p>
                  <p className="text-[11px] text-[#FFF8EA]/70 mt-0.5">Fed with pure spring water</p>
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-lg border border-[#E7D9C5]">
                  <img
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"
                    alt="Fresh golden croissants on bakery cooling rack"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Editorial Story Content (Right Column) */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-3">
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#F26535] uppercase">
                The Grain & Oven Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D1B14] leading-[1.12]">
                Crafted With Passion.
                <br />
                <span className="italic font-normal text-[#F26535]">Baked With Love.</span>
              </h2>
              <p className="text-[#75665B] text-base md:text-lg leading-relaxed pt-2">
                At Grain & Oven, baking is not merely cooking—it is an art of patience, alchemy,
                and respect for natural ingredients. We believe good food starts in the soil,
                thrives in the hands of dedicated artisans, and brings people closer around the table.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#E7D9C5] shadow-xs space-y-2 hover:border-[#F26535]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8EA] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#2D1B14]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#75665B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
