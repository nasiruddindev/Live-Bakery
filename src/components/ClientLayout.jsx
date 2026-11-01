"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "../context/CartContext";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";
import SignInModal from "./SignInModal";
import Toast from "./Toast";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Admin pages have their own layout — skip main site wrapper
  if (isAdmin) return <>{children}</>;

  return (
    <CartProvider>
      <Navbar />
      {children}
      <CartDrawer />
      <SearchModal />
      <SignInModal />
      <Toast />
    </CartProvider>
  );
}
