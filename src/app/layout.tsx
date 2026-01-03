import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CartDrawer from "@/components/cart/CartDrawer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
