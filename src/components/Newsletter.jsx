"use client";

import React, { useState } from "react";
import { Mail, Check, Sparkles, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#F7EFDF]/60 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 border border-[#E7D9C5] shadow-xl text-center space-y-6 relative overflow-hidden">
          
          {/* Subtle Decorative element */}
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF8EA] border border-[#E7D9C5] flex items-center justify-center text-[#F26535]">
            <Sparkles size={22} />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D1B14] tracking-tight">
              A Little Freshness in Your Inbox
            </h2>
            <p className="text-[#75665B] text-sm sm:text-base leading-relaxed">
              Subscribe to receive delicious updates, secret seasonal menu drops, exclusive offers, and bakery news.
            </p>
          </div>

          {subscribed ? (
            <div className="py-4 px-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
              <Check size={18} className="text-emerald-600" />
              Thank you for subscribing! Check your inbox for a 10% welcome voucher.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#75665B]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-11 pr-4 py-3.5 bg-[#FFF8EA] border border-[#E7D9C5] rounded-full text-xs sm:text-sm text-[#2D1B14] placeholder:text-[#75665B]/60 focus:outline-none focus:border-[#F26535]"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#F26535] text-white font-semibold text-xs sm:text-sm hover:bg-[#D84E20] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#F26535]/25 shrink-0 cursor-pointer"
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#75665B] pt-2">
            No spam, ever. Only warm oven aroma and weekly discounts. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
