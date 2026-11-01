"use client";

import React, { useState } from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import FoodExperience from "../components/FoodExperience";
import Offers from "../components/Offers";
import OurStory from "../components/OurStory";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="relative min-h-screen bg-[#FFF8EA] text-[#2D1B14] overflow-x-hidden">
      <main>
        <Hero />
        <div id="menu">
          <CategorySection onSelectCategory={setSelectedCategory} />
        </div>
        <FeaturedProducts
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <FoodExperience />
        <Offers />
        <OurStory />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
