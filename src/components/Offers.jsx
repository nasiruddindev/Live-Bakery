"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tag, Sparkles, Copy, Check, ArrowRight } from "lucide-react";
import { specialOffers } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Offers() {
  const { addToCart, setIsCartOpen } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleClaimOffer = (offer) => {
    if (offer.id === "offer-1") {
      addToCart({
        id: "prod-1",
        name: "Classic Pepperoni Pizza (BOGO Deal)",
        categoryName: "Artisan Pizza",
        price: 1250,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
      });
    } else if (offer.id === "offer-2") {
      addToCart({
        id: "prod-3",
        name: "Chocolate Fudge Cake (Weekend 20% Off)",
        categoryName: "Celebration Cakes",
        price: 1480,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
      });
    } else {
      addToCart({
        id: "prod-5",
        name: "Morning Combo (Croissant + Flat White)",
        categoryName: "Handmade Pastries",
        price: 390,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
      });
    }
    setIsCartOpen(true);
  };

  return (
    <section id="offers" className="py-20 md:py-28 bg-[#FFF8EA] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18 space-y-3">
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#F26535] uppercase flex items-center justify-center gap-1.5">
            <Sparkles size={16} /> Seasonal Celebrations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1B14] tracking-tight">
            Something Special Is Baking
          </h2>
          <p className="text-[#75665B] text-base md:text-lg">
            Exclusive treats, baker’s specials, and pairing combinations to brighten your table.
          </p>
        </div>

        {/* 3 Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {specialOffers.map((offer) => (
            <motion.div
              key={offer.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-[#E7D9C5] shadow-xs hover:shadow-xl hover:border-[#F26535]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Top Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F7EFDF]">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#F26535] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {offer.badge}
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold tracking-widest text-[#75665B] uppercase block">
                    {offer.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2D1B14]">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#75665B] leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Promo Code Copy Bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF8EA] border border-[#E7D9C5] text-xs">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-[#F26535]" />
                      <span className="font-mono font-bold text-[#2D1B14] tracking-wider">
                        {offer.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="text-[#75665B] hover:text-[#F26535] flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check size={13} className="text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => handleClaimOffer(offer)}
                    className="w-full mt-3 py-3 rounded-full bg-[#2D1B14] text-white font-semibold text-xs hover:bg-[#F26535] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    {offer.cta} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
