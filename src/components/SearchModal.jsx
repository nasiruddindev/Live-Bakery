"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight, Flame } from "lucide-react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return products.slice(0, 4);
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-[#2D1B14]/50 backdrop-blur-md z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-20 inset-x-4 max-w-2xl mx-auto bg-[#FFF8EA] border border-[#E7D9C5] rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Search input header */}
            <div className="p-5 border-b border-[#E7D9C5] flex items-center gap-3 bg-white">
              <Search className="text-[#F26535]" size={22} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pizzas, croissants, chocolate fudge cake, burgers..."
                autoFocus
                className="flex-1 bg-transparent text-[#2D1B14] placeholder:text-[#75665B]/60 text-base md:text-lg focus:outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs px-2 py-1 rounded-md bg-[#F7EFDF] text-[#75665B] hover:text-[#2D1B14]"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#F7EFDF] flex items-center justify-center text-[#75665B]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick tags */}
            <div className="px-5 py-3 bg-[#F7EFDF]/70 border-b border-[#E7D9C5] flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[#75665B] flex items-center gap-1 font-semibold shrink-0">
                <Flame size={13} className="text-[#F26535]" /> Popular:
              </span>
              {["Pepperoni Pizza", "Butter Croissant", "Fudge Cake", "Cheeseburger", "Donuts"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-white border border-[#E7D9C5] text-[#2D1B14] hover:border-[#F26535] hover:text-[#F26535] transition-colors shrink-0"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>

            {/* Results list */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2.5">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-[#75665B]">
                  <p className="font-serif text-lg text-[#2D1B14]">No artisan treats found</p>
                  <p className="text-sm mt-1">Try searching for "pizza", "croissant", or "cake"</p>
                </div>
              ) : (
                filtered.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-white border border-transparent hover:border-[#E7D9C5] transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-[#E7D9C5]/40 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-[#2D1B14] text-sm group-hover:text-[#F26535] transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#75665B] truncate max-w-xs md:max-w-md">
                          {product.description}
                        </p>
                        <span className="text-xs font-semibold text-[#F26535] mt-0.5 inline-block">
                          ৳{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product);
                        setIsSearchOpen(false);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#FFF8EA] border border-[#E7D9C5] text-[#2D1B14] group-hover:bg-[#F26535] group-hover:text-white group-hover:border-[#F26535] transition-all text-xs font-semibold flex items-center gap-1 shrink-0 ml-3"
                    >
                      Add <ArrowUpRight size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
