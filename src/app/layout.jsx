import "./globals.css";
import ClientLayout from "../components/ClientLayout";


export const metadata = {
  title: "GRAIN & OVEN | Artisan Bakery & Kitchen",
  description: "Experience the ultimate artisan food experience, handcrafted with premium, locally sourced ingredients and baked to bubbling perfection.",
  keywords: ["artisan bakery", "pizza", "pastries", "coffee", "grain and oven", "gourmet food"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFF8EA] text-[#2D1B14] selection:bg-[#F26535] selection:text-white">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
