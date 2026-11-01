"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function SignInModal() {
  const { isSignInOpen, setIsSignInOpen, showToast } = useCart();
  const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setLoading(false);
    setGoogleLoading(false);
  };

  const handleClose = () => {
    resetForm();
    setIsSignInOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        showToast("Welcome back! Signed in successfully.", "success");
      } else {
        await registerWithEmail(name, email, password);
        showToast("Account created successfully! Welcome to Grain & Oven.", "success");
      }
      handleClose();
    } catch (err) {
      console.error("Auth error:", err);
      let msg = "Authentication failed. Please try again.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "This email is already registered. Please sign in.";
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        msg = "Please enter a valid email address.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      showToast("Signed in with Google successfully!", "success");
      handleClose();
    } catch (err) {
      console.error("Google Auth error:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.message || "Failed to sign in with Google.");
      }
    } finally {
      setGoogleLoading(false);
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
            onClick={handleClose}
            className="fixed inset-0 bg-[#2D1B14]/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#FFF8EA] border border-[#E7D9C5] rounded-3xl shadow-2xl z-50 p-7 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-[#F26535] uppercase flex items-center gap-1">
                  <Sparkles size={12} /> GRAIN & OVEN CLUB
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2D1B14] mt-1">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#75665B] hover:text-[#2D1B14] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full py-3 px-4 bg-white border border-[#E7D9C5] hover:border-[#2D1B14]/30 rounded-2xl font-semibold text-xs sm:text-sm text-[#2D1B14] flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-60"
            >
              {googleLoading ? (
                <Loader2 size={16} className="animate-spin text-[#F26535]" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center my-5">
              <div className="flex-1 border-t border-[#E7D9C5]" />
              <span className="px-3 text-[11px] font-semibold text-[#75665B] uppercase tracking-wider">
                or with email
              </span>
              <div className="flex-1 border-t border-[#E7D9C5]" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === "register" && (
                <div>
                  <label className="text-xs font-semibold text-[#75665B] block mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75665B]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nasir Uddin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7D9C5] rounded-2xl text-sm focus:outline-none focus:border-[#F26535] transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-[#75665B] block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75665B]" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7D9C5] rounded-2xl text-sm focus:outline-none focus:border-[#F26535] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#75665B] block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75665B]" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7D9C5] rounded-2xl text-sm focus:outline-none focus:border-[#F26535] transition-colors"
                  />
                </div>
                {mode === "register" && (
                  <span className="text-[10px] text-[#75665B] mt-1 block">At least 6 characters</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full mt-2 py-3.5 rounded-2xl bg-[#F26535] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#D84E20] shadow-md shadow-[#F26535]/25 transition-all cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center mt-5 pt-4 border-t border-[#E7D9C5]">
              {mode === "login" ? (
                <p className="text-xs text-[#75665B]">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setError("");
                    }}
                    className="font-bold text-[#F26535] hover:underline cursor-pointer"
                  >
                    Join Club (Sign Up)
                  </button>
                </p>
              ) : (
                <p className="text-xs text-[#75665B]">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                    className="font-bold text-[#F26535] hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
