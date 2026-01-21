"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";

export default function OrderReceivedPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear cart on page load
    clearCart();
  }, [clearCart]);

  const containerPadding = {
    paddingTop: "clamp(2.5rem, 6vh, 4rem)",
    paddingBottom: "clamp(2.5rem, 6vh, 4rem)",
    paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
    paddingRight: "clamp(1.5rem, 4vw, 3rem)",
  } as const;

  return (
    <main
      className="flex-1 w-full bg-[var(--bg-main)] text-[var(--text-secondary)]"
      style={{ paddingTop: "var(--header-offset, 5rem)" }}
    >
      <div className="w-full flex justify-center" style={containerPadding}>
        <div className="w-full max-w-3xl">
          {/* Success Icon */}
          <div className="flex justify-center" style={{ marginBottom: "clamp(1.5rem, 4vh, 2.5rem)" }}>
            <div
              className="rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 backdrop-blur-sm flex items-center justify-center"
              style={{
                width: "clamp(5rem, 12vw, 7rem)",
                height: "clamp(5rem, 12vw, 7rem)",
                padding: "clamp(1rem, 2.5vw, 1.5rem)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="var(--accent-gold)"
                style={{ width: "100%", height: "100%" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <header
            className="text-center"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.5rem, 1.2vh, 0.8rem)",
              marginBottom: "clamp(2rem, 5vh, 3rem)",
            }}
          >
            <h1
              className="text-[var(--text-primary)]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                lineHeight: 1.2,
              }}
            >
              Thank You for Your Order!
            </h1>
            <p
              className="text-[var(--text-secondary)]"
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.15rem)",
                opacity: 0.85,
                lineHeight: 1.6,
              }}
            >
              Your order has been successfully placed.
            </p>
          </header>

          {/* What's Next Card */}
          <section
            className="rounded-3xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
            style={{
              paddingTop: "clamp(1.5rem, 4vh, 2.25rem)",
              paddingBottom: "clamp(1.5rem, 4vh, 2.25rem)",
              paddingLeft: "clamp(1.5rem, 4vw, 2.25rem)",
              paddingRight: "clamp(1.5rem, 4vw, 2.25rem)",
              marginBottom: "clamp(1.5rem, 4vh, 2.5rem)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.2rem, 3vh, 1.8rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 600,
                  fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)",
                }}
              >
                What's Next?
              </h2>
              <ul style={{ display: "flex", flexDirection: "column", gap: "clamp(0.9rem, 2.2vh, 1.3rem)" }}>
                <li
                  className="flex items-start"
                  style={{ gap: "clamp(0.75rem, 2vw, 1rem)" }}
                >
                  <span
                    className="text-[var(--accent-gold)]"
                    style={{
                      fontSize: "clamp(1.1rem, 1.3vw, 1.25rem)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(0.98rem, 1.05vw, 1.06rem)",
                      lineHeight: 1.6,
                      opacity: 0.9,
                    }}
                  >
                    You will receive a confirmation call from our team shortly.
                  </span>
                </li>
                <li
                  className="flex items-start"
                  style={{ gap: "clamp(0.75rem, 2vw, 1rem)" }}
                >
                  <span
                    className="text-[var(--accent-gold)]"
                    style={{
                      fontSize: "clamp(1.1rem, 1.3vw, 1.25rem)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(0.98rem, 1.05vw, 1.06rem)",
                      lineHeight: 1.6,
                      opacity: 0.9,
                    }}
                  >
                    Your order will be processed and shipped within 1-2 business days.
                  </span>
                </li>
                <li
                  className="flex items-start"
                  style={{ gap: "clamp(0.75rem, 2vw, 1rem)" }}
                >
                  <span
                    className="text-[var(--accent-gold)]"
                    style={{
                      fontSize: "clamp(1.1rem, 1.3vw, 1.25rem)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(0.98rem, 1.05vw, 1.06rem)",
                      lineHeight: 1.6,
                      opacity: 0.9,
                    }}
                  >
                    Payment will be collected via Cash on Delivery (COD).
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Help Section */}
          <div
            className="text-center"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(1rem, 2.5vh, 1.5rem)",
            }}
          >
            <p
              className="text-[var(--text-secondary)]"
              style={{
                fontSize: "clamp(0.92rem, 1vw, 1rem)",
                opacity: 0.75,
              }}
            >
              Need help? Contact us via WhatsApp or call us directly.
            </p>
            <div
              className="flex flex-col sm:flex-row sm:justify-center"
              style={{ gap: "clamp(0.75rem, 2vw, 1rem)" }}
            >
              <Link
                href="/"
                className="rounded-full bg-[var(--accent-gold)] text-[var(--bg-main)] transition-all duration-200 hover:shadow-[0_0_25px_rgba(253,221,173,0.4)]"
                style={{
                  paddingTop: "clamp(0.85rem, 2vh, 1rem)",
                  paddingBottom: "clamp(0.85rem, 2vh, 1rem)",
                  paddingLeft: "clamp(1.75rem, 3.5vw, 2.25rem)",
                  paddingRight: "clamp(1.75rem, 3.5vw, 2.25rem)",
                  fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Continue Shopping
              </Link>
              <a
                href="https://wa.me/923321300655"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-surface)]/60 text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent-gold)]/50 hover:bg-[var(--bg-surface)]/80"
                style={{
                  paddingTop: "clamp(0.85rem, 2vh, 1rem)",
                  paddingBottom: "clamp(0.85rem, 2vh, 1rem)",
                  paddingLeft: "clamp(1.75rem, 3.5vw, 2.25rem)",
                  paddingRight: "clamp(1.75rem, 3.5vw, 2.25rem)",
                  fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
