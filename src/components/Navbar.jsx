"use client";

import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu as MenuIcon, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { totalItems, setIsCartOpen, setIsSearchOpen, setIsSignInOpen, showToast } = useCart();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "/#menu" },
    { name: "Our Story", href: "/#our-story" },
    { name: "Catering", href: "/#offers" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFF8EA]/90 backdrop-blur-md shadow-xs border-b border-[#E7D9C5]/60 py-3.5"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-14">
        {/* Brand Logo */}
        <a
          href="#"
          className="font-serif text-2xl md:text-[28px] font-extrabold tracking-tight text-[#2D1B14] hover:opacity-90 transition-opacity"
        >
          GRAIN & OVEN
        </a>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#2D1B14] text-sm lg:text-[15px] font-medium tracking-normal hover:text-[#F26535] transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F26535] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#2D1B14] hover:text-[#F26535] hover:bg-[#F7EFDF] transition-colors"
            aria-label="Search items"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          {/* Cart with Orange Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#2D1B14] hover:text-[#F26535] hover:bg-[#F7EFDF] transition-colors"
            aria-label="Open shopping cart"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F26535] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Profile or Sign In Button */}
          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#F7EFDF] border border-[#E7D9C5] text-xs font-semibold text-[#2D1B14] hover:border-[#F26535] transition-all cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#F26535] text-white flex items-center justify-center font-bold text-[10px]">
                    {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
                  </div>
                )}
                <span className="max-w-[100px] truncate">{user.displayName || user.email.split("@")[0]}</span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-[#E7D9C5] rounded-2xl shadow-xl p-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-[#E7D9C5]/50 mb-1">
                      <p className="text-xs font-bold text-[#2D1B14] truncate">{user.displayName || "Customer"}</p>
                      <p className="text-[10px] text-[#75665B] truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await logout();
                        showToast("Signed out successfully.", "info");
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => setIsSignInOpen(true)}
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-full border border-[#2D1B14]/30 text-[#2D1B14] text-sm font-medium hover:border-[#2D1B14] hover:bg-[#2D1B14] hover:text-white transition-all duration-200 cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#2D1B14] hover:bg-[#F7EFDF]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFF8EA] border-b border-[#E7D9C5] px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg font-bold text-[#2D1B14] hover:text-[#F26535] transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-[#E7D9C5]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSignInOpen(true);
                  }}
                  className="w-full py-2.5 rounded-full border border-[#2D1B14] text-[#2D1B14] font-semibold text-sm hover:bg-[#2D1B14] hover:text-white transition-all text-center"
                >
                  Sign In to Account
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
