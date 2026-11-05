"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const initialCartItems = [
  {
    id: "prod-1",
    name: "Classic Pepperoni Pizza",
    categoryName: "Artisan Pizza",
    price: 1250,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "prod-5",
    name: "Butter Croissant",
    categoryName: "Handmade Pastries",
    price: 280,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80",
  },
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Load saved cart and wishlist from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("grain_oven_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
      const savedWishlist = localStorage.getItem("grain_oven_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("grain_oven_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart to localStorage:", e);
    }
  }, [cart, isLoaded]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("grain_oven_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Could not save wishlist to localStorage:", e);
    }
  }, [wishlist, isLoaded]);

  // Count unique items in cart (not sum of quantities)
  const totalItems = cart.length;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 120 : 0;
  const grandTotal = subtotal + deliveryFee;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          categoryName: product.categoryName || "Artisan Kitchen",
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast("Removed from wishlist");
        return prev.filter((item) => item !== id);
      } else {
        showToast("Saved to wishlist ❤️");
        return [...prev, id];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        subtotal,
        deliveryFee,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSignInOpen,
        setIsSignInOpen,
        wishlist,
        toggleWishlist,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        showToast,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
