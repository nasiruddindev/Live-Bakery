"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Star, Heart, Plus, Minus, ShoppingBag,
  Clock, Flame, Check, ChevronRight, Sparkles, Shield,
  Truck, Award
} from "lucide-react";
import { products } from "../../../data/products";
import { useCart } from "../../../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist, setIsCartOpen } = useCart();

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter((p) => p.id !== id && p.category === product?.category).slice(0, 3);
  const otherProducts = products.filter((p) => p.id !== id).slice(0, 4);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [imgLoaded, setImgLoaded] = useState(false);

  const isWishlisted = wishlist.includes(product?.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8EA]">
        <div className="text-center space-y-4">
          <p className="text-2xl font-serif text-[#2D1B14]">Product not found</p>
          <button
            onClick={() => router.push("/#featured-products")}
            className="px-6 py-3 bg-[#F26535] text-white rounded-full font-medium"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setIsCartOpen(true);
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "details", label: "Details & Nutrition" },
    { id: "reviews", label: `Reviews (${product.reviews})` },
  ];

  const trustBadges = [
    { icon: Shield, label: "Fresh Guarantee", sub: "100% fresh or refund" },
    { icon: Truck, label: "Fast Delivery", sub: "30–45 min to your door" },
    { icon: Award, label: "Artisan Made", sub: "Handcrafted daily" },
    { icon: Sparkles, label: "Premium Ingredients", sub: "Locally sourced" },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8EA]">
      {/* ── Top Nav Bar ── */}
      <div className="sticky top-0 z-40 bg-[#FFF8EA]/90 backdrop-blur-md border-b border-[#E7D9C5]">
        <div className="max-w-7xl mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#2D1B14] font-medium hover:text-[#F26535] transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back</span>
          </button>

          <div className="flex items-center gap-1 text-xs text-[#75665B]">
            <span
              onClick={() => router.push("/")}
              className="hover:text-[#F26535] cursor-pointer transition-colors"
            >
              Home
            </span>
            <ChevronRight size={12} />
            <span
              onClick={() => router.push("/#featured-products")}
              className="hover:text-[#F26535] cursor-pointer transition-colors"
            >
              Menu
            </span>
            <ChevronRight size={12} />
            <span className="text-[#2D1B14] font-medium truncate max-w-[160px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 md:py-16">

        {/* ── Main Product Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-[32px] overflow-hidden bg-[#F7EFDF] shadow-xl">
              {!imgLoaded && (
                <div className="absolute inset-0 bg-[#F7EFDF] animate-pulse rounded-[32px]" />
              )}
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
              />

              {/* Badge */}
              <div className={`absolute top-5 left-5 text-xs font-bold px-4 py-1.5 rounded-full shadow-md ${product.badgeColor}`}>
                {product.badge}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-5 right-5 w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-md ${
                  isWishlisted
                    ? "bg-rose-50 text-rose-500"
                    : "bg-white/90 text-[#75665B] hover:text-rose-500 hover:bg-white"
                }`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
              </button>

              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

              {/* Prep time pill */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md text-[#2D1B14] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                <Clock size={13} className="text-[#F26535]" />
                {product.prepTime}
              </div>
            </div>

            {/* Thumbnail strip — same image 3x to look premium */}
            <div className="flex gap-3 mt-4">
              {[product.image, product.image, product.image].map((img, i) => (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                    i === 0 ? "border-[#F26535] shadow-md" : "border-[#E7D9C5] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Category & Rating */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold tracking-[0.18em] text-[#F26535] uppercase">
                  {product.categoryName}
                </span>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-[#E7D9C5] fill-[#E7D9C5]"}
                    />
                  ))}
                  <span className="text-sm font-bold text-[#2D1B14] ml-1">{product.rating}</span>
                  <span className="text-xs text-[#75665B]">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Name */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-[#2D1B14] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Short description */}
              <p className="text-[#75665B] text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-white border border-[#E7D9C5] text-[#2D1B14] text-xs font-semibold px-4 py-2 rounded-full shadow-xs">
                <Clock size={14} className="text-[#F26535]" />
                {product.prepTime}
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-[#E7D9C5] text-[#2D1B14] text-xs font-semibold px-4 py-2 rounded-full shadow-xs">
                <Flame size={14} className="text-[#F26535]" />
                {product.calories}
              </div>
              <div className="flex items-center gap-1.5 bg-[#F26535]/10 border border-[#F26535]/20 text-[#F26535] text-xs font-semibold px-4 py-2 rounded-full">
                <Sparkles size={14} />
                Artisan Crafted
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E7D9C5]" />

            {/* Price */}
            <div>
              <span className="text-xs text-[#75665B] font-medium block mb-1">Price</span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl font-bold text-[#2D1B14]">
                  ৳{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-[#75665B] line-through">
                  ৳{Math.round(product.price * 1.15).toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  15% OFF
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-5">
              <span className="text-sm font-semibold text-[#2D1B14]">Quantity</span>
              <div className="flex items-center border border-[#E7D9C5] rounded-full overflow-hidden bg-white shadow-xs">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#F7EFDF] transition-colors text-[#2D1B14] cursor-pointer"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#2D1B14] select-none">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#F7EFDF] transition-colors text-[#2D1B14] cursor-pointer"
                >
                  <Plus size={15} />
                </button>
              </div>
              <span className="text-sm text-[#75665B]">
                Total: <span className="font-bold text-[#2D1B14]">৳{(product.price * qty).toLocaleString()}</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  added
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                    : "bg-[#F26535] text-white hover:bg-[#D84E20] shadow-lg shadow-[#F26535]/30"
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={17} /> Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <Plus size={17} /> Add {qty > 1 ? `${qty}x` : ""} to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={handleBuyNow}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 bg-[#2D1B14] text-white hover:bg-[#3D2B24] shadow-lg shadow-[#2D1B14]/20 transition-all cursor-pointer"
              >
                <ShoppingBag size={17} /> Order Now
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {trustBadges.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2.5 bg-white border border-[#E7D9C5] rounded-2xl p-3 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-[#F26535]/10 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-[#F26535]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#2D1B14]">{label}</p>
                    <p className="text-[10px] text-[#75665B]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Tabs Section ── */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-[#E7D9C5] mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-semibold transition-all relative cursor-pointer ${
                  activeTab === tab.id
                    ? "text-[#F26535]"
                    : "text-[#75665B] hover:text-[#2D1B14]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F26535] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="desc"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="prose prose-sm max-w-none"
              >
                <p className="text-[#75665B] text-base leading-relaxed mb-4">
                  {product.description} Our bakers spend hours perfecting each recipe — from sourcing the finest ingredients to mastering the precise baking temperature. Every item that leaves our kitchen meets our strict quality standard.
                </p>
                <p className="text-[#75665B] text-base leading-relaxed">
                  We believe great food starts with great ingredients. That's why we partner with local farms and premium international suppliers to bring you the best of both worlds — authentic flavors with a local touch.
                </p>
              </motion.div>
            )}

            {activeTab === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Preparation Time", value: product.prepTime },
                    { label: "Calories", value: product.calories },
                    { label: "Category", value: product.categoryName },
                    { label: "Freshness", value: "Made fresh daily" },
                    { label: "Allergens", value: "Contains gluten, dairy" },
                    { label: "Storage", value: "Best within 24 hours" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center bg-white rounded-2xl px-5 py-3.5 border border-[#E7D9C5]">
                      <span className="text-sm text-[#75665B] font-medium">{label}</span>
                      <span className="text-sm font-bold text-[#2D1B14]">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {[
                  { name: "Ayesha R.", text: "Absolutely delicious! The quality is top-notch and delivery was super fast. Will definitely order again.", rating: 5, date: "2 days ago" },
                  { name: "Tanvir A.", text: "Best I've had in Dhaka, no contest. Fresh, flavorful and beautifully presented.", rating: 5, date: "1 week ago" },
                  { name: "Nusrat J.", text: "Ordered for our office party — everyone loved it! Premium quality worth every taka.", rating: 5, date: "2 weeks ago" },
                ].map((review, i) => (
                  <div key={i} className="bg-white border border-[#E7D9C5] rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-[#F26535]/10 flex items-center justify-center text-[#F26535] font-bold text-sm">
                          {review.name[0]}
                        </div>
                        <span className="font-semibold text-[#2D1B14] text-sm">{review.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                        ))}
                        <span className="text-xs text-[#75665B] ml-2">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#75665B] leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Related Products ── */}
        {otherProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold tracking-[0.18em] text-[#F26535] uppercase block mb-1">You Might Also Love</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2D1B14]">Related Items</h2>
              </div>
              <button
                onClick={() => router.push("/#featured-products")}
                className="text-sm font-semibold text-[#F26535] hover:underline flex items-center gap-1"
              >
                View All <ChevronRight size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {otherProducts.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -4 }}
                  onClick={() => router.push(`/products/${p.id}`)}
                  className="bg-white rounded-2xl border border-[#E7D9C5] overflow-hidden cursor-pointer hover:shadow-xl hover:border-[#F26535]/30 transition-all duration-300 group"
                >
                  <div className="aspect-square overflow-hidden bg-[#F7EFDF]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-[#75665B] font-medium mb-0.5">{p.categoryName}</p>
                    <h4 className="font-serif text-sm font-bold text-[#2D1B14] leading-tight group-hover:text-[#F26535] transition-colors line-clamp-1">
                      {p.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-serif text-base font-bold text-[#2D1B14]">৳{p.price.toLocaleString()}</span>
                      <div className="flex items-center gap-0.5">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-[#2D1B14]">{p.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
