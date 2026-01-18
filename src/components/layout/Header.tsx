"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const { items, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure header height and expose as CSS variable so pages can offset fixed header
  useEffect(() => {
    function setHeaderOffset() {
      const el = headerRef.current;
      if (!el) return;
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-offset", `${h}px`);
    }

    setHeaderOffset();
    window.addEventListener("resize", setHeaderOffset);
    const ro = new ResizeObserver(setHeaderOffset);
    if (headerRef.current) ro.observe(headerRef.current);

    return () => {
      window.removeEventListener("resize", setHeaderOffset);
      ro.disconnect();
    };
  }, []);

  const cartCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/40 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
      ref={headerRef}
      style={{
        paddingTop: "clamp(1.5rem, 3vh, 3rem)",
        paddingBottom: "clamp(1.5rem, 3vh, 3rem)",
        paddingLeft: "clamp(2rem, 5vw, 6rem)",
        paddingRight: "clamp(2rem, 5vw, 6rem)",
      }}
    >
      <nav className="mx-auto flex items-center justify-between w-full" style={{ gap: "clamp(2rem, 4vw, 4rem)" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" style={{ width: "clamp(180px, 15vw, 280px)" }}>
          <Image
            src="/Logo.svg"
            alt="Scented Fumes"
            width={280}
            height={70}
            className="object-contain h-auto w-full"
            priority
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden" style={{ gap: "0.75rem" }}>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="relative rounded-full border-2 border-[var(--accent-gold)]/50 bg-[var(--bg-surface)]/70 text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--accent-gold)] hover:text-[var(--bg-surface)] hover:border-[var(--accent-gold)] backdrop-blur-sm hover:scale-105 active:scale-95"
            style={{
              padding: "clamp(0.65rem, 0.9vw, 0.95rem)"
            }}
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "clamp(1.25rem, 1.5vw, 1.5rem)", height: "clamp(1.25rem, 1.5vw, 1.5rem)" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          </button>

          {/* Mobile Cart Button (next to menu) */}
          <button
            onClick={toggleCart}
            className="relative rounded-full border-2 border-[var(--accent-gold)]/40 bg-[var(--bg-surface)]/60 text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--accent-gold)] hover:text-[var(--bg-surface)] hover:border-[var(--accent-gold)] backdrop-blur-sm"
            style={{ padding: "clamp(0.65rem, 0.9vw, 0.95rem)" }}
            aria-label="Open cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "clamp(1.25rem, 1.5vw, 1.5rem)", height: "clamp(1.25rem, 1.5vw, 1.5rem)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute flex items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--bg-surface)] text-xs font-bold"
                style={{
                  right: "-0.5rem",
                  top: "-0.5rem",
                  width: "clamp(1.25rem, 1.5vw, 1.5rem)",
                  height: "clamp(1.25rem, 1.5vw, 1.5rem)",
                  border: "2px solid var(--bg-main)"
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop Right Section - Navigation + Cart */}
        <div className="hidden lg:flex items-center ml-auto" style={{ gap: "clamp(2rem, 3vw, 4rem)" }}>
          {/* Navigation Links */}
          <ul className="flex items-center" style={{ gap: "clamp(1.5rem, 2.5vw, 3rem)" }}>
            <li>
              <Link
                href="/best-sellers"
                className="text-base font-medium uppercase tracking-widest text-[var(--text-secondary)] transition hover:text-[var(--accent-gold)]"
                style={{ 
                  fontSize: "clamp(0.75rem, 0.9vw, 1rem)",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem"
                }}
              >
                Best Sellers
              </Link>
            </li>
            <li>
              <Link
                href="/gift-sets"
                className="text-base font-medium uppercase tracking-widest text-[var(--text-secondary)] transition hover:text-[var(--accent-gold)]"
                style={{ 
                  fontSize: "clamp(0.75rem, 0.9vw, 1rem)",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem"
                }}
              >
                Gift Sets
              </Link>
            </li>
            
            {/* SHOP Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button 
                className="flex items-center gap-2 font-medium uppercase tracking-widest text-[var(--text-secondary)] transition hover:text-[var(--accent-gold)]"
                style={{ 
                  fontSize: "clamp(0.75rem, 0.9vw, 1rem)",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem"
                }}
              >
                Shop
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`transition-transform ${shopOpen ? "rotate-180" : ""}`}
                  style={{ width: "clamp(1rem, 1.2vw, 1.5rem)", height: "clamp(1rem, 1.2vw, 1.5rem)" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {shopOpen && (
                <div 
                  className="absolute top-full right-0 rounded-2xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                  style={{ 
                    marginTop: "clamp(1rem, 2vh, 1.5rem)",
                    width: "clamp(240px, 18vw, 320px)"
                  }}
                >
                  <div style={{ padding: "clamp(1.5rem, 2vw, 2.5rem)" }} className="space-y-6">
                    {/* Gender Categories */}
                    <div>
                      <h3 
                        className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold"
                        style={{ 
                          marginBottom: "clamp(0.75rem, 1vh, 1rem)",
                          paddingLeft: "0.5rem"
                        }}
                      >
                        By Gender
                      </h3>
                      <ul className="space-y-3">
                        <li>
                          <Link
                            href="/category/men"
                            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition rounded-lg hover:bg-white/5"
                            style={{ padding: "0.5rem" }}
                          >
                            Men
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/category/women"
                            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition rounded-lg hover:bg-white/5"
                            style={{ padding: "0.5rem" }}
                          >
                            Women
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/category/unisex"
                            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition rounded-lg hover:bg-white/5"
                            style={{ padding: "0.5rem" }}
                          >
                            Unisex
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />

                    {/* Collection Types */}
                    <div>
                      <h3 
                        className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold"
                        style={{ 
                          marginBottom: "clamp(0.75rem, 1vh, 1rem)",
                          paddingLeft: "0.5rem"
                        }}
                      >
                        Collections
                      </h3>
                      <ul className="space-y-3">
                        <li>
                          <Link
                            href="/category/pro"
                            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition rounded-lg hover:bg-white/5"
                            style={{ padding: "0.5rem" }}
                          >
                            Pro Series
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/category/eco"
                            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition rounded-lg hover:bg-white/5"
                            style={{ padding: "0.5rem" }}
                          >
                            Eco Series
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/category/tester"
                            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition rounded-lg hover:bg-white/5"
                            style={{ padding: "0.5rem" }}
                          >
                            Testers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative rounded-full border-2 border-[var(--accent-gold)]/50 bg-[var(--bg-surface)]/70 text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--accent-gold)] hover:text-[var(--bg-surface)] hover:border-[var(--accent-gold)] backdrop-blur-sm hover:scale-105 active:scale-95"
            style={{ 
              padding: "clamp(0.75rem, 1vw, 1.25rem)"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "clamp(1.25rem, 1.5vw, 1.75rem)", height: "clamp(1.25rem, 1.5vw, 1.75rem)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span 
                className="absolute flex items-center justify-center rounded-full bg-[var(--accent-gold)] text-xs font-bold text-[var(--bg-surface)] border-2 border-[var(--bg-main)]"
                style={{
                  right: "-0.5rem",
                  top: "-0.5rem",
                  width: "clamp(1.25rem, 1.5vw, 1.75rem)",
                  height: "clamp(1.25rem, 1.5vw, 1.75rem)"
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className="absolute right-0 top-0 h-full border-l border-[var(--accent-gold)]/30"
            style={{
              width: "clamp(280px, 75vw, 400px)",
              paddingTop: "clamp(5.5rem, 14vh, 7.5rem)",
              paddingLeft: "clamp(1.75rem, 4vw, 2.5rem)",
              paddingRight: "clamp(1.75rem, 4vw, 2.5rem)",
              paddingBottom: "clamp(2rem, 5vw, 3rem)",
              background: "var(--gradient-drawer)",
              boxShadow: "-10px 0 50px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute rounded-full border-2 border-[var(--accent-gold)]/40 bg-[var(--bg-surface)]/60 text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--accent-gold)] hover:text-[var(--bg-surface)] hover:border-[var(--accent-gold)] backdrop-blur-sm hover:scale-105 active:scale-95"
              style={{
                padding: "clamp(0.65rem, 0.9vw, 0.95rem)",
                top: "clamp(1.25rem, 3vh, 1.75rem)",
                right: "clamp(1.25rem, 3vw, 1.75rem)"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ width: "clamp(1rem, 1.5vw, 1.5rem)", height: "clamp(1rem, 1.5vw, 1.5rem)" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Mobile Navigation Links */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "clamp(1.75rem, 4vh, 2.25rem)" }}>
              {/* Main Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2.5vh, 1.5rem)" }}>
                <Link
                  href="/best-sellers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-medium uppercase tracking-widest text-[var(--text-secondary)] transition hover:text-[var(--accent-gold)]"
                  style={{
                    fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                    padding: "clamp(0.5rem, 1.4vh, 0.75rem) 0",
                    letterSpacing: "0.08em"
                  }}
                >
                  Best Sellers
                </Link>
                <Link
                  href="/gift-sets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-medium uppercase tracking-widest text-[var(--text-secondary)] transition hover:text-[var(--accent-gold)]"
                  style={{
                    fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                    padding: "clamp(0.5rem, 1.4vh, 0.75rem) 0",
                    letterSpacing: "0.08em"
                  }}
                >
                  Gift Sets
                </Link>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid var(--accent-gold)/20" }} />

              {/* Shop Categories */}
              <div>
                <h3
                  className="uppercase tracking-widest text-[var(--text-muted)] font-semibold"
                  style={{
                    fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)",
                    marginBottom: "clamp(0.75rem, 2vh, 1rem)",
                    letterSpacing: "0.1em"
                  }}
                >
                  Shop by Gender
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1.4vh, 0.8rem)" }}>
                  <li>
                    <Link
                      href="/category/men"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition"
                      style={{
                        fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                        padding: "clamp(0.35rem, 0.8vh, 0.5rem) 0"
                      }}
                    >
                      Men
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/women"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition"
                      style={{
                        fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                        padding: "clamp(0.35rem, 0.8vh, 0.5rem) 0"
                      }}
                    >
                      Women
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/unisex"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition"
                      style={{
                        fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                        padding: "clamp(0.35rem, 0.8vh, 0.5rem) 0"
                      }}
                    >
                      Unisex
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid var(--accent-gold)/20" }} />

              {/* Collections */}
              <div>
                <h3
                  className="uppercase tracking-widest text-[var(--text-muted)] font-semibold"
                  style={{
                    fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)",
                    marginBottom: "clamp(0.75rem, 2vh, 1rem)",
                    letterSpacing: "0.1em"
                  }}
                >
                  Collections
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1.4vh, 0.8rem)" }}>
                  <li>
                    <Link
                      href="/category/pro"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition"
                      style={{
                        fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                        padding: "clamp(0.35rem, 0.8vh, 0.5rem) 0"
                      }}
                    >
                      Pro Series
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/eco"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition"
                      style={{
                        fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                        padding: "clamp(0.35rem, 0.8vh, 0.5rem) 0"
                      }}
                    >
                      Eco Series
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/tester"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition"
                      style={{
                        fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                        padding: "clamp(0.35rem, 0.8vh, 0.5rem) 0"
                      }}
                    >
                      Testers
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
