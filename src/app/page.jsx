"use client";

import React, { useState } from "react";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import FoodExperience from "../components/FoodExperience";
import Offers from "../components/Offers";
import OurStory from "../components/OurStory";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import SearchModal from "../components/SearchModal";
import SignInModal from "../components/SignInModal";
import Toast from "../components/Toast";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#FFF8EA] text-[#2D1B14] overflow-x-hidden selection:bg-[#F26535] selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section — Matching Reference Photo with Massive Pepperoni Pizza & Parallax */}
        <main>
          <Hero />

          {/* Categories Grid */}
          <div id="menu">
            <CategorySection onSelectCategory={setSelectedCategory} />
          </div>

          {/* Featured Customer Favorites with Filter Tabs & Wishlist */}
          <FeaturedProducts
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Signature Food Experience */}
          <FoodExperience />

          {/* Promotional Special Offers */}
          <Offers />

          {/* Brand Philosophy & Story */}
          <OurStory />

          {/* Customer Reviews & Testimonials */}
          <Testimonials />

          {/* Newsletter Subscription */}
          <Newsletter />
        </main>

        {/* Dark Chocolate Footer */}
        <Footer />

        {/* Global Interactive Overlays */}
        <CartDrawer />
        <SearchModal />
        <SignInModal />
        <Toast />
      </div>
    </CartProvider>
  );
}
