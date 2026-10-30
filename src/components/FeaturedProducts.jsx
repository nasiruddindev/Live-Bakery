"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Heart, Plus, Check, Clock, Eye,
  X, ShoppingBag, Flame, Minus, ChevronRight,
} from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

/* ─── Quick View Modal ─────────────────────────────────────────── */
function QuickViewModal({ product, onClose }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto bg-white rounded-3xl shadow-2xl w-full max-w-[820px] max-h-[92vh] overflow-hidden flex flex-col sm:flex-row"
        >
          {/* Left — Image */}
          <div className="relative sm:w-[44%] shrink-0 bg-[#F7EFDF] aspect-square sm:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Badge */}
            <div className={`absolute top-4 left-4 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm ${product.badgeColor}`}>
              {product.badge}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow ${
                isWishlisted
                  ? "bg-rose-50 text-rose-500"
                  : "bg-white/90 text-[#75665B] hover:text-rose-500"
              }`}
            >
              <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
            </button>
          </div>

          {/* Right — Details */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#F7EFDF] hover:bg-[#E7D9C5] flex items-center justify-center transition-colors z-10"
            >
              <X size={16} className="text-[#2D1B14]" />
            </button>

            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold tracking-widest text-[#F26535] uppercase">
                  {product.categoryName}
                </span>
                <div className="flex items-center gap-1 text-sm font-bold text-[#2D1B14]">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  {product.rating}
                  <span className="text-[#75665B] font-normal text-xs">({product.reviews})</span>
                </div>
              </div>

              {/* Name */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1B14] leading-tight mb-3">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-[#75665B] text-sm leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center gap-1.5 bg-[#F7EFDF] text-[#2D1B14] text-xs font-medium px-3 py-1.5 rounded-full">
                  <Clock size={13} className="text-[#F26535]" />
                  {product.prepTime}
                </div>
                <div className="flex items-center gap-1.5 bg-[#F7EFDF] text-[#2D1B14] text-xs font-medium px-3 py-1.5 rounded-full">
                  <Flame size={13} className="text-[#F26535]" />
                  {product.calories}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E7D9C5] mb-5" />

              {/* Price */}
              <div className="mb-5">
                <span className="text-[11px] text-[#75665B] font-medium block mb-0.5">Price</span>
                <span className="font-serif text-3xl font-bold text-[#2D1B14]">
                  ৳{product.price.toLocaleString()}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold text-[#2D1B14]">Qty:</span>
                <div className="flex items-center gap-0 rounded-full border border-[#E7D9C5] overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-[#F7EFDF] transition-colors text-[#2D1B14]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-[#2D1B14] select-none">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-[#F7EFDF] transition-colors text-[#2D1B14]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-sm text-[#75665B]">
                  = ৳{(product.price * qty).toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-[#F26535] text-white hover:bg-[#D84E20] shadow-lg shadow-[#F26535]/25"
                }`}
              >
                {added ? (
                  <><Check size={16} /> Added to Cart!</>
                ) : (
                  <><ShoppingBag size={16} /> Add {qty > 1 ? `${qty}x` : ""} to Cart</>
                )}
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3.5 rounded-full border border-[#E7D9C5] text-[#2D1B14] font-semibold text-sm hover:bg-[#F7EFDF] transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                Continue Shopping <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Section ─────────────────────────────────────────────── */
export default function FeaturedProducts({ selectedCategory, onCategoryChange }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [filter, setFilter] = useState("all");
  const [addedItemMap, setAddedItemMap] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const activeFilter = selectedCategory || filter;

  const filterTabs = [
    { id: "all", label: "All Items" },
    { id: "pizza", label: "Artisan Pizza" },
    { id: "burgers", label: "Burgers" },
    { id: "cakes", label: "Cakes & Desserts" },
    { id: "pastries", label: "Pastries & Croissants" },
    { id: "cookies", label: "Cookies & Donuts" },
  ];

  const handleFilterClick = (id) => {
    setFilter(id);
    if (onCategoryChange) onCategoryChange(id === "all" ? null : id);
  };

  const displayedProducts = products.filter((p) => {
    if (activeFilter === "all" || !activeFilter) return true;
    if (activeFilter === "cookies") return p.category === "cookies" || p.category === "donuts";
    if (activeFilter === "cakes") return p.category === "cakes";
    if (activeFilter === "pastries") return p.category === "pastries" || p.category === "sandwiches";
    return p.category === activeFilter;
  });

  const handleAddToCartClick = (product) => {
    addToCart(product);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <>
      <section id="featured-products" className="py-20 md:py-28 bg-[#F7EFDF]/50 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#F26535] uppercase">
                Handcrafted With Passion
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1B14] tracking-tight">
                Our Customer Favorites
              </h2>
              <p className="text-[#75665B] text-base">
                Each recipe is slow-proofed, hand-shaped, and baked in small batches throughout the day.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleFilterClick(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? "bg-[#2D1B14] text-white shadow-md"
                      : "bg-white text-[#75665B] hover:text-[#2D1B14] border border-[#E7D9C5]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            <AnimatePresence>
              {displayedProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                const isJustAdded = addedItemMap[product.id];

                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-white rounded-3xl p-4 border border-[#E7D9C5] shadow-xs hover:shadow-xl hover:border-[#F26535]/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F7EFDF]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Badge */}
                      <div className={`absolute top-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs ${product.badgeColor}`}>
                        {product.badge}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                          isWishlisted
                            ? "bg-rose-50 text-rose-500 shadow-md"
                            : "bg-white/80 text-[#75665B] hover:text-rose-500 hover:bg-white"
                        }`}
                        aria-label="Save to wishlist"
                      >
                        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
                      </button>

                      {/* ── Quick View Button — shows on hover ── */}
                      <motion.button
                        onClick={() => setQuickViewProduct(product)}
                        initial={{ opacity: 0, y: 8 }}
                        whileHover={{ scale: 1.04 }}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 backdrop-blur-md text-[#2D1B14] text-[11px] font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:bg-[#F26535] hover:text-white border border-white/60"
                      >
                        <Eye size={13} />
                        Quick View
                      </motion.button>

                      {/* Prep Time Pill */}
                      <div className="absolute bottom-3 left-3 bg-[#2D1B14]/80 group-hover:opacity-0 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-opacity duration-200">
                        <Clock size={11} /> {product.prepTime}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="pt-4 px-1 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating & Category */}
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[#75665B] font-medium text-[11px]">
                            {product.categoryName}
                          </span>
                          <div className="flex items-center gap-1 text-[#2D1B14] font-bold text-xs">
                            <Star size={13} className="text-amber-500 fill-amber-500" />
                            <span>{product.rating}</span>
                            <span className="text-[#75665B] text-[11px] font-normal">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          onClick={() => setQuickViewProduct(product)}
                          className="font-serif text-lg font-bold text-[#2D1B14] group-hover:text-[#F26535] transition-colors leading-snug cursor-pointer"
                        >
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-[#75665B] mt-1.5 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Price & Add to Cart Footer */}
                      <div className="pt-4 mt-3 border-t border-[#E7D9C5]/50 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#75665B] block font-medium">Price</span>
                          <span className="font-serif text-xl font-bold text-[#2D1B14]">
                            ৳{product.price.toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCartClick(product)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
                            isJustAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-[#F26535] text-white hover:bg-[#D84E20] shadow-md shadow-[#F26535]/20"
                          }`}
                        >
                          {isJustAdded ? (
                            <><Check size={14} /> Added</>
                          ) : (
                            <><Plus size={15} /> Add to Cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Quick View Modal Portal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
