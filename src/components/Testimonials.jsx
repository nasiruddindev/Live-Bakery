"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../data/products";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFF8EA] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18 space-y-3">
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#F26535] uppercase">
            Community Love
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1B14] tracking-tight">
            Loved by Food Lovers
          </h2>
          <p className="text-[#75665B] text-base">
            Read what our food enthusiasts, pastry obsessives, and loyal guests have to say.
          </p>
        </div>

        {/* Testimonials Carousel & Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                idx === activeIndex
                  ? "bg-white border-[#F26535]/40 shadow-xl"
                  : "bg-[#F7EFDF]/50 border-[#E7D9C5] shadow-xs"
              }`}
            >
              <div className="space-y-4">
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <Quote size={24} className="text-[#E7D9C5]" />
                </div>

                {/* Review Text */}
                <p className="font-serif text-base text-[#2D1B14] italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-[#E7D9C5]/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#E7D9C5]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#2D1B14]">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#75665B]">{item.role}</p>
                  </div>
                </div>

                <div className="text-[10px] font-semibold text-[#F26535] bg-[#FFF8EA] px-2.5 py-1 rounded-full border border-[#E7D9C5]">
                  {item.favorite}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
