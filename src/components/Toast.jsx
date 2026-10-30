"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 bg-[#2D1B14] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#E7D9C5]/20 max-w-sm"
        >
          <div className="w-7 h-7 rounded-full bg-[#F26535] flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="text-white" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
