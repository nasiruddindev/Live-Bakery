"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialIcons = [
    {
      name: "Instagram",
      href: "#instagram",
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "#facebook",
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#twitter",
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
    },
    {
      name: "Youtube",
      href: "#youtube",
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer id="footer" className="bg-[#2D1B14] text-[#FFF8EA] pt-20 pb-12 border-t border-[#E7D9C5]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <span className="font-serif text-3xl font-extrabold tracking-tight text-[#FFF8EA] block">
              GRAIN & OVEN
            </span>
            <p className="text-[#FFF8EA]/70 text-sm leading-relaxed max-w-sm">
              Artisan bakery, wood-fired hearth, and specialty kitchen. Handcrafted daily with
              heritage stone-ground flours, pure butter, and 48-hour slow cold fermentation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFF8EA]/80 hover:text-[#F26535] hover:border-[#F26535] hover:bg-white/10 transition-colors"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-bold text-base text-[#FFF8EA]">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-[#FFF8EA]/70">
              {["Artisan Menu", "Our Story", "Baking Schedule", "Catering & Events", "Gift Cards"].map(
                (item) => (
                  <li key={item}>
                    <a href="#menu" className="hover:text-[#F26535] transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-base text-[#FFF8EA]">Artisan Collections</h4>
            <ul className="space-y-2.5 text-xs text-[#FFF8EA]/70">
              {[
                "Wood-Fired Pepperoni Pizza",
                "French Butter Croissants",
                "Belgian Chocolate Fudge Cake",
                "Smashed Wagyu Burgers",
                "New York Strawberry Cheesecake",
                "Single-Origin Pour Over",
              ].map((item) => (
                <li key={item}>
                  <a href="#featured-products" className="hover:text-[#F26535] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations & Opening Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-base text-[#FFF8EA]">Locations & Hours</h4>
            <div className="space-y-3 text-xs text-[#FFF8EA]/70">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#F26535] shrink-0 mt-0.5" />
                <span>Road 11, Block D, Banani, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#F26535] shrink-0" />
                <span>+880 1700-GRAIN (47246)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#F26535] shrink-0" />
                <span>hello@grainandoven.com</span>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                <Clock size={16} className="text-[#F26535] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Daily Fresh Oven Hours:</p>
                  <p>Mon - Thu: 7:00 AM – 11:00 PM</p>
                  <p>Fri - Sun: 7:00 AM – 12:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF8EA]/60 gap-4">
          <p>© {new Date().getFullYear()} GRAIN & OVEN Artisan Kitchen. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F26535] text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
