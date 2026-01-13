import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import Image from "next/image";
import CartDrawer from "@/components/cart/CartDrawer";
import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scented Fumes - Premium Perfume Renditions",
  description: "Discover the Art of Fragrance with our collection of premium perfumes renditions. Immerse yourself in the aroma of luxury and elevate your style with Scented Fumes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased min-h-screen relative flex flex-col items-stretch`}
      >
        <Header />
        <div
          className="relative z-10 w-full flex-1"
          style={{ paddingTop: "var(--header-offset, 5rem)" }}
        >
          {children}
        </div>
        {/* <Footer /> */}
        <CartDrawer />
      </body>
    </html>
  );
}
