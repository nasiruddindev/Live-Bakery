"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../data/categories";

export default function CategorySection({ onSelectCategory }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="categories" className="py-20 md:py-28 bg-[#FFF8EA] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18 space-y-3">
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#F26535] uppercase">
            Curated Artisan Selections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1B14] tracking-tight">
            Something Delicious for Everyone
          </h2>
          <p className="text-[#75665B] text-base md:text-lg">
            Explore our freshly prepared collection crafted with ancient grains and master techniques.
          </p>
        </div>

        {/* 8 Category Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              onClick={() => {
                if (onSelectCategory) onSelectCategory(category.id);
                const el = document.getElementById("featured-products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative bg-white rounded-3xl p-4 border border-[#E7D9C5] shadow-xs hover:shadow-xl hover:border-[#F26535]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Category Image Box */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7EFDF]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                
                {/* Pill Tag */}
                <div className="absolute top-3 left-3 bg-[#2D1B14]/75 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  {category.tag}
                </div>

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B14]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Meta Content */}
              <div className="pt-4 pb-1 px-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#2D1B14] group-hover:text-[#F26535] transition-colors">
                    {category.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-[#FFF8EA] border border-[#E7D9C5] group-hover:bg-[#F26535] group-hover:text-white group-hover:border-[#F26535] flex items-center justify-center text-[#2D1B14] transition-all">
                    <ArrowUpRight size={15} />
                  </div>
                </div>
                <p className="text-xs text-[#75665B] mt-1.5 line-clamp-2">
                  {category.description}
                </p>
                <div className="mt-3 pt-3 border-t border-[#E7D9C5]/50 flex items-center justify-between text-[11px] font-semibold text-[#75665B]">
                  <span>{category.itemCount}</span>
                  <span className="text-[#F26535] group-hover:underline">Explore Collection</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
