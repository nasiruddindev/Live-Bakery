"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    totalItems,
    subtotal,
    deliveryFee,
    grandTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const applyPromo = (e) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === "BOGOPIZZA" || clean === "SWEETWEEKEND") {
      const disc = Math.round(subtotal * 0.2);
      setDiscount(disc);
      setPromoMessage("Promo code applied: 20% Discount!");
    } else if (clean === "MORNINGGRAIN") {
      setDiscount(100);
      setPromoMessage("Promo code applied: ৳100 Off!");
    } else {
      setDiscount(0);
      setPromoMessage("Invalid promo code. Try BOGOPIZZA");
    }
  };

  const finalTotal = Math.max(0, grandTotal - discount);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setTimeout(() => {
        setCheckoutComplete(false);
        setIsCartOpen(false);
      }, 2500);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#2D1B14]/40 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FFF8EA] shadow-2xl z-50 flex flex-col border-l border-[#E7D9C5]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E7D9C5] flex items-center justify-between bg-[#F7EFDF]/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F26535]/10 flex items-center justify-center text-[#F26535]">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2D1B14]">Your Artisan Basket</h3>
                  <p className="text-xs text-[#75665B] font-medium">{totalItems} handcrafted items</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-[#E7D9C5]/50 flex items-center justify-center text-[#75665B] hover:text-[#2D1B14] transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#F7EFDF] border border-[#E7D9C5] flex items-center justify-center text-[#75665B]">
                    <ShoppingBag size={36} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#2D1B14]">Your basket is empty</h4>
                    <p className="text-sm text-[#75665B] mt-1 max-w-xs">
                      Explore our stone-baked sourdough pizzas, warm butter croissants, and handmade treats.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-6 py-2.5 rounded-full bg-[#F26535] text-white text-sm font-medium hover:bg-[#D84E20] transition-colors"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#E7D9C5] shadow-xs"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover border border-[#E7D9C5]/50 shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#2D1B14] truncate">
                            {item.name}
                          </h4>
                          <span className="text-[11px] font-medium text-[#75665B]">
                            {item.categoryName}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#75665B]/60 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-sm text-[#F26535]">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#E7D9C5] rounded-full bg-[#FFF8EA] px-2 py-0.5 gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-[#75665B] hover:text-[#2D1B14] p-0.5"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-xs font-semibold text-[#2D1B14] w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-[#75665B] hover:text-[#2D1B14] p-0.5"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#E7D9C5] bg-[#F7EFDF]/70 space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={applyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. BOGOPIZZA)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-[#E7D9C5] text-[#2D1B14] placeholder:text-[#75665B]/60 focus:outline-none focus:border-[#F26535]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2D1B14] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p
                    className={`text-[11px] font-medium ${
                      discount > 0 ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-[#75665B]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#2D1B14]">৳{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount</span>
                      <span className="font-semibold">-৳{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Artisan Delivery</span>
                    <span className="font-semibold text-[#2D1B14]">৳{deliveryFee}</span>
                  </div>
                  <div className="pt-2 border-t border-[#E7D9C5] flex justify-between text-base font-serif font-bold text-[#2D1B14]">
                    <span>Total Amount</span>
                    <span className="text-[#F26535]">৳{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || checkoutComplete}
                  className="w-full py-3.5 px-6 rounded-full bg-[#F26535] text-white font-semibold text-sm hover:bg-[#D84E20] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F26535]/25 disabled:opacity-80 cursor-pointer"
                >
                  {checkoutComplete ? (
                    <>
                      <Check size={18} /> Order Placed! Baked with Love
                    </>
                  ) : isCheckingOut ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Preparing your order...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
