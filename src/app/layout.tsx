import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import CartDrawer from "@/components/cart/CartDrawer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
        className={`${poppins.variable} antialiased min-h-screen relative flex flex-col items-stretch`}
      >
        {/* Shared full-bleed background for navbar, hero and stat cards*/}
        {/*
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 lg:hidden">
            <Image src="/hero-bg-mobile.png" alt="Background" fill className="object-cover object-center opacity-70" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a0a0a]/80" />
          </div>
          <div className="absolute inset-0 hidden lg:block">
            <Image src="/hero-bg-desktop.png" alt="Background" fill className="object-cover object-center opacity-85" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          </div>
        </div> */}

        <Header />
        <div className="relative z-10 w-full flex-1 pt-20">{children}</div>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
