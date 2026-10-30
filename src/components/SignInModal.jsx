"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Mail, Lock, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function SignInModal() {
  const { isSignInOpen, setIsSignInOpen } = useCart();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsSignInOpen(false);
      }, 1600);
    }
  };

  return (
    <AnimatePresence>
      {isSignInOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSignInOpen(false)}
            className="fixed inset-0 bg-[#2D1B14]/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#FFF8EA] border border-[#E7D9C5] rounded-3xl shadow-2xl z-50 p-7 overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-[#F26535] uppercase">
                  GRAIN & OVEN CLUB
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2D1B14] mt-1">
                  Welcome Back
                </h3>
                <p className="text-xs text-[#75665B] mt-1">
                  Sign in for artisan rewards, priority baking & secret recipes.
                </p>
              </div>
              <button
                onClick={() => setIsSignInOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#F7EFDF] flex items-center justify-center text-[#75665B]"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-3"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Check size={28} />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#2D1B14]">
                  Welcome to the Club!
                </h4>
                <p className="text-xs text-[#75665B]">Signed in successfully.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2D1B14] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75665B]"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="artisan@grainandoven.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7D9C5] rounded-xl text-xs text-[#2D1B14] placeholder:text-[#75665B]/60 focus:outline-none focus:border-[#F26535]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-[#2D1B14]">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      className="text-[11px] text-[#F26535] hover:underline"
                    >
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75665B]"
                    />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7D9C5] rounded-xl text-xs text-[#2D1B14] placeholder:text-[#75665B]/60 focus:outline-none focus:border-[#F26535]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-full bg-[#F26535] text-white font-semibold text-xs hover:bg-[#D84E20] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#F26535]/20 cursor-pointer"
                >
                  Sign In <ArrowRight size={15} />
                </button>

                <p className="text-center text-[11px] text-[#75665B] pt-2">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="text-[#F26535] font-semibold hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
