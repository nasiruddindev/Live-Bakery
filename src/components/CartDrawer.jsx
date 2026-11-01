"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  FileText,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrderInFirestore } from "../lib/firestoreService";

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
    clearCart,
    showToast
  } = useCart();
  const { user } = useAuth();

  // Step state: 'cart' | 'checkout' | 'success'
  const [step, setStep] = useState("cart");

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  // Checkout Form Details (Required)
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cityArea, setCityArea] = useState("Dhanmondi, Dhaka");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' | 'bkash'
  const [bkashNumber, setBkashNumber] = useState("");
  const [bkashTrxId, setBkashTrxId] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [confirmedBill, setConfirmedBill] = useState(0);

  // Pre-fill user info if logged in
  useEffect(() => {
    if (user) {
      if (user.displayName && !fullName) setFullName(user.displayName);
    }
  }, [user]);

  // Reset step when cart opens/closes
  useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => {
        setStep("cart");
        setOrderError("");
      }, 300);
    }
  }, [isCartOpen]);

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

  // Validate & Place Order to Firebase Firestore
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setOrderError("");

    if (!fullName.trim()) {
      setOrderError("Please enter your full name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 11) {
      setOrderError("Please enter a valid 11-digit phone number.");
      return;
    }
    if (!address.trim()) {
      setOrderError("Please enter your full delivery address.");
      return;
    }

    if (paymentMethod === "bkash") {
      if (!bkashNumber.trim() || bkashNumber.trim().length < 11) {
        setOrderError("Please enter the bKash number used to send the payment.");
        return;
      }
      if (!bkashTrxId.trim() || bkashTrxId.trim().length < 6) {
        setOrderError("Please enter a valid bKash Transaction ID (TrxID).");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: fullName.trim(),
        email: user?.email || "guest@grainoven.com",
        phone: phone.trim(),
        address: `${address.trim()}, ${cityArea}`,
        note: note.trim() || "N/A",
        items: cart.map((item) => `${item.quantity}x ${item.name}`),
        cartItems: cart.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          image: i.image
        })),
        subtotal,
        discount,
        deliveryFee,
        total: finalTotal,
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "bKash Online",
        bkashDetails: paymentMethod === "bkash" ? {
          senderNumber: bkashNumber.trim(),
          trxId: bkashTrxId.trim().toUpperCase()
        } : null,
        userId: user?.uid || null
      };

      const docId = await createOrderInFirestore(orderPayload);
      setPlacedOrderId(docId.slice(-6).toUpperCase());
      setConfirmedBill(finalTotal);
      clearCart();
      setStep("success");
      showToast("Order placed successfully! Freshly baking now.", "success");
    } catch (err) {
      console.error("Order submit failed:", err);
      setOrderError("Failed to submit order to database. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#FFF8EA] shadow-2xl z-50 flex flex-col border-l border-[#E7D9C5]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#E7D9C5] flex items-center justify-between bg-[#F7EFDF]/70">
              <div className="flex items-center gap-3">
                {step === "checkout" ? (
                  <button
                    onClick={() => setStep("cart")}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#E7D9C5] flex items-center justify-center transition-colors cursor-pointer text-[#2D1B14]"
                    title="Back to cart"
                  >
                    <ArrowLeft size={16} />
                  </button>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#F26535]/15 text-[#F26535] flex items-center justify-center">
                    <ShoppingBag size={18} />
                  </div>
                )}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D1B14]">
                    {step === "cart" && "Artisan Basket"}
                    {step === "checkout" && "Delivery & Checkout"}
                    {step === "success" && "Order Confirmed!"}
                  </h3>
                  <p className="text-[11px] text-[#75665B]">
                    {step === "cart" && `${totalItems} ${totalItems === 1 ? "item" : "items"} selected`}
                    {step === "checkout" && "Please provide delivery address details"}
                    {step === "success" && "Thank you for supporting artisan baking"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#75665B] hover:text-[#2D1B14] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            {/* ══════════ STEP 1: CART ITEMS ══════════ */}
            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
                      <div className="w-16 h-16 rounded-full bg-[#F7EFDF] flex items-center justify-center text-[#75665B]">
                        <ShoppingBag size={28} strokeWidth={1.5} />
                      </div>
                      <p className="font-serif text-lg text-[#2D1B14] font-semibold">Your basket is empty</p>
                      <p className="text-xs text-[#75665B] max-w-xs">
                        Treat yourself to our wood-fired sourdough pizzas or slow-laminated flaky pastries.
                      </p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#E7D9C5] shadow-xs"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#F7EFDF] shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] text-[#75665B] font-semibold uppercase tracking-wider block truncate">
                              {item.categoryName}
                            </span>
                            <h4 className="font-serif text-sm font-bold text-[#2D1B14] leading-tight truncate">
                              {item.name}
                            </h4>
                            <p className="font-serif text-sm font-bold text-[#F26535] mt-0.5">
                              ৳{item.price.toLocaleString()}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            {/* Qty controller */}
                            <div className="flex items-center gap-2 border border-[#E7D9C5] rounded-full px-2 py-0.5 bg-[#FFF8EA]">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="text-[#2D1B14] hover:text-[#F26535] transition-colors"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="text-xs font-bold text-[#2D1B14] w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="text-[#2D1B14] hover:text-[#F26535] transition-colors"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-rose-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Footer of Cart Step */}
                {cart.length > 0 && (
                  <div className="p-5 sm:p-6 border-t border-[#E7D9C5] bg-[#F7EFDF]/50 space-y-4">
                    {/* Promo Input */}
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
                        className="px-4 py-2 bg-[#2D1B14] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                    {promoMessage && (
                      <p className={`text-[11px] font-medium ${discount > 0 ? "text-emerald-700" : "text-amber-700"}`}>
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

                    {/* Next Button */}
                    <button
                      onClick={() => setStep("checkout")}
                      className="w-full py-3.5 px-6 rounded-full bg-[#F26535] text-white font-semibold text-sm hover:bg-[#D84E20] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F26535]/25 cursor-pointer"
                    >
                      Add Delivery Details & Checkout <ArrowRight size={17} />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ══════════ STEP 2: CHECKOUT DETAILS FORM ══════════ */}
            {step === "checkout" && (
              <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col justify-between overflow-y-auto">
                <div className="p-5 sm:p-6 space-y-4">
                  {orderError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{orderError}</span>
                    </div>
                  )}

                  {/* Customer Name */}
                  <div>
                    <label className="text-xs font-semibold text-[#75665B] block mb-1">
                      Recipient Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75665B]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanvir Ahmed"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7D9C5] rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#F26535]"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-xs font-semibold text-[#75665B] block mb-1">
                      Contact Phone (Mobile) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75665B]" />
                      <input
                        type="tel"
                        required
                        placeholder="017XX-XXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7D9C5] rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#F26535]"
                      />
                    </div>
                  </div>

                  {/* City Area */}
                  <div>
                    <label className="text-xs font-semibold text-[#75665B] block mb-1">
                      Delivery Zone / Area <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={cityArea}
                      onChange={(e) => setCityArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E7D9C5] rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#F26535]"
                    >
                      <option value="Gulshan-1 & 2, Dhaka">Gulshan-1 & 2, Dhaka</option>
                      <option value="Banani & Baridhara, Dhaka">Banani & Baridhara, Dhaka</option>
                      <option value="Dhanmondi, Dhaka">Dhanmondi, Dhaka</option>
                      <option value="Uttara, Dhaka">Uttara, Dhaka</option>
                      <option value="Mirpur, Dhaka">Mirpur, Dhaka</option>
                      <option value="Mohammadpur, Dhaka">Mohammadpur, Dhaka</option>
                      <option value="Bashundhara R/A, Dhaka">Bashundhara R/A, Dhaka</option>
                      <option value="Other Area (Dhaka)">Other Area (Dhaka)</option>
                    </select>
                  </div>

                  {/* Street & House Address */}
                  <div>
                    <label className="text-xs font-semibold text-[#75665B] block mb-1">
                      Full Address (House, Road, Apartment) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-3 text-[#75665B]" />
                      <textarea
                        rows={2}
                        required
                        placeholder="House #12, Road #5, Flat 4B..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7D9C5] rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#F26535]"
                      />
                    </div>
                  </div>

                  {/* Baking / Delivery Note */}
                  <div>
                    <label className="text-xs font-semibold text-[#75665B] block mb-1">
                      Special Kitchen Instructions (Optional)
                    </label>
                    <div className="relative">
                      <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75665B]" />
                      <input
                        type="text"
                        placeholder="e.g. Extra chili flakes, call before delivery"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-[#E7D9C5] rounded-2xl text-xs focus:outline-none focus:border-[#F26535]"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="text-xs font-semibold text-[#75665B] block mb-2">
                      Payment Option
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                          paymentMethod === "cod"
                            ? "border-[#F26535] bg-[#F26535]/10 text-[#2D1B14] font-bold"
                            : "border-[#E7D9C5] bg-white text-[#75665B]"
                        }`}
                      >
                        <Banknote size={18} className={paymentMethod === "cod" ? "text-[#F26535]" : ""} />
                        <span className="text-xs">Cash On Delivery</span>
                      </label>

                      <label
                        onClick={() => setPaymentMethod("bkash")}
                        className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                          paymentMethod === "bkash"
                            ? "border-[#E2136E] bg-[#E2136E]/10 text-[#2D1B14] font-bold"
                            : "border-[#E7D9C5] bg-white text-[#75665B]"
                        }`}
                      >
                        <CreditCard size={18} className={paymentMethod === "bkash" ? "text-[#E2136E]" : ""} />
                        <span className="text-xs">bKash (Send Money)</span>
                      </label>
                    </div>

                    {/* bKash Instructions & Inputs Box */}
                    {paymentMethod === "bkash" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 p-4 rounded-2xl bg-[#E2136E]/5 border border-[#E2136E]/20 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#E2136E] uppercase tracking-wider">
                            bKash Personal Number
                          </span>
                          <span className="text-xs font-bold font-mono bg-white px-2 py-0.5 rounded-md border border-[#E2136E]/30 text-[#E2136E]">
                            01700-000000
                          </span>
                        </div>
                        <p className="text-[11px] text-[#75665B] leading-relaxed">
                          Please <strong>Send Money</strong> of <span className="font-bold text-[#2D1B14]">৳{finalTotal.toLocaleString()}</span> to the above number, then enter your bKash Number & TrxID below:
                        </p>

                        <div className="space-y-2 pt-1">
                          <div>
                            <input
                              type="tel"
                              placeholder="Your bKash Number (e.g. 018XXXXXXXX)"
                              value={bkashNumber}
                              onChange={(e) => setBkashNumber(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-white border border-[#E7D9C5] rounded-xl focus:outline-none focus:border-[#E2136E]"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="bKash Transaction ID (e.g. BL9A8X7K)"
                              value={bkashTrxId}
                              onChange={(e) => setBkashTrxId(e.target.value)}
                              className="w-full px-3 py-2 text-xs uppercase font-mono bg-white border border-[#E7D9C5] rounded-xl focus:outline-none focus:border-[#E2136E]"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Confirm & Place Order Footer */}
                <div className="p-5 sm:p-6 border-t border-[#E7D9C5] bg-[#F7EFDF]/70 space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-[#75665B]">Payable Amount:</span>
                    <span className="font-serif text-xl font-bold text-[#F26535]">
                      ৳{finalTotal.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#F26535] text-white font-semibold text-sm hover:bg-[#D84E20] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F26535]/25 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Submitting Order to Oven...
                      </>
                    ) : (
                      <>
                        <Check size={18} /> Confirm & Place Order
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ══════════ STEP 3: SUCCESS ORDER CONFIRMATION ══════════ */}
            {step === "success" && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Check size={36} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-bold text-[#F26535] tracking-widest uppercase">
                  Order #{placedOrderId} Received
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2D1B14]">
                  Oven Fired Up!
                </h3>
                <p className="text-xs text-[#75665B] max-w-sm leading-relaxed">
                  We have received your order details and delivery address. Our kitchen has started proofing and baking your order. You will receive an SMS and delivery updates shortly!
                </p>

                <div className="w-full max-w-xs bg-white rounded-2xl p-4 border border-[#E7D9C5] text-left text-xs space-y-1.5 mt-2">
                  <div className="flex justify-between">
                    <span className="text-[#75665B]">Customer:</span>
                    <span className="font-bold text-[#2D1B14]">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#75665B]">Phone:</span>
                    <span className="font-bold text-[#2D1B14]">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#75665B]">Delivery to:</span>
                    <span className="font-bold text-[#2D1B14] truncate max-w-[150px]">{cityArea}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#E7D9C5]">
                    <span className="text-[#75665B]">Total Bill:</span>
                    <span className="font-bold text-[#F26535]">৳{confirmedBill.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-8 py-3 bg-[#2D1B14] text-white rounded-full text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  Back to Bakery
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
