"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, toggleCart, updateQuantity, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const shippingThreshold = 5000;
  const remainingForFreeShip = Math.max(0, shippingThreshold - subtotal);
  const progressToFreeShip = Math.min(1, subtotal / shippingThreshold);

  return (
    <>
      {/* Enhanced Backdrop with blur */}
      <div
        className={cn(
          "fixed inset-0 z-50 backdrop-blur-sm bg-black/60 transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
        aria-hidden="true"
      />

      {/* Enhanced Drawer with Modern Luxury styling */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-lg transform transition-all duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          background: "linear-gradient(to bottom, #1a0f08 0%, #0a0504 100%)",
          boxShadow: isOpen ? "-10px 0 50px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        <div className="flex h-full flex-col border-l border-[var(--accent-gold)]/20">
          
          {/* Enhanced Header with item count badge */}
          <div 
            className="relative border-b border-[var(--accent-gold)]/30 bg-gradient-to-r from-[var(--bg-surface)]/40 to-transparent"
            style={{
              paddingTop: "clamp(1.25rem, 3vh, 1.75rem)",
              paddingBottom: "clamp(1.25rem, 3vh, 1.75rem)",
              paddingLeft: "clamp(1.25rem, 3vh, 1.75rem)",
              paddingRight: "clamp(1.25rem, 3vh, 1.75rem)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: "0.75rem" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30">
                  <ShoppingBag className="h-5 w-5 text-[var(--accent-gold)]" />
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <h2 
                    className="text-[var(--text-primary)] font-medium"
                    style={{
                      fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
                      fontFamily: "var(--font-playfair), serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Your Cart
                  </h2>
                  {items.length > 0 && (
                    <p className="text-xs text-[var(--text-secondary)]/60">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </p>
                  )}
                </div>
              </div>
              
              <button
                onClick={toggleCart}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent-gold)]/20 bg-[var(--accent-gold)]/5 transition-all hover:border-[var(--accent-gold)]/40 hover:bg-[var(--accent-gold)]/10"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-[var(--text-secondary)]/70 transition-colors group-hover:text-[var(--accent-gold)]" />
              </button>
            </div>
          </div>

          {/* Scrollable Items Area with custom scrollbar */}
          <div 
            className="flex-1 overflow-y-auto"
            style={{
              paddingTop: "clamp(0.5rem, 2vw, 0.75rem)",
              paddingBottom: "clamp(1rem, 4vw, 1.5rem)",
              paddingLeft: "clamp(1rem, 4vw, 1.5rem)",
              paddingRight: "clamp(1rem, 4vw, 1.5rem)",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(253, 221, 173, 0.3) transparent",
            }}
          >
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-6 text-center px-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--accent-gold)]/5 border-2 border-dashed border-[var(--accent-gold)]/20">
                  <ShoppingBag className="h-10 w-10 text-[var(--accent-gold)]/40" />
                </div>
                <div>
                  <p className="text-[var(--text-secondary)]/80 mb-2" style={{ fontSize: "1.05rem" }}>
                    Your cart is empty
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]/50">
                    Add some luxury fragrances to get started
                  </p>
                </div>
                <button
                  onClick={toggleCart}
                  className="mt-4 rounded-full border border-[var(--accent-gold)]/50 bg-[var(--accent-gold)]/10 px-6 py-2.5 text-sm font-medium text-[var(--accent-gold)] transition-all hover:bg-[var(--accent-gold)]/20 hover:border-[var(--accent-gold)]"
                  style={{ letterSpacing: "0.08em" }}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <ul style={{ padding: "0", margin: 0 }}>
                {items.map((item, index) => {
                  const itemTotal = parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity;
                  
                  return (
                    <li 
                      key={item.id} 
                      className="group relative rounded-xl border border-[var(--accent-gold)]/15 bg-[var(--bg-surface)]/22 transition-all hover:border-[var(--accent-gold)]/30 hover:bg-[var(--bg-surface)]/32 shadow-[0_14px_50px_rgba(0,0,0,0.28)]"
                      style={{
                        animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : "none",
                        gap: "1rem",
                        marginTop: "clamp(0.5rem, 1.4vh, 0.8rem)",
                        marginBottom: "clamp(0.5rem, 1.4vh, 0.8rem)",
                        paddingTop: "clamp(1rem, 2.2vh, 1.25rem)",
                        paddingBottom: "clamp(1rem, 2.2vh, 1.25rem)",
                        paddingLeft: "clamp(1rem, 3vw, 1.25rem)",
                        paddingRight: "clamp(1rem, 3vw, 1.25rem)",
                      }}
                    >
                      <div className="flex items-center" style={{ gap: "1rem" }}>
                        {/* Enhanced Image with overlay on hover */}
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-[var(--accent-gold)]/25 bg-black/25 flex items-center justify-center">
                          {item.image?.sourceUrl ? (
                            <>
                              <Image
                                src={item.image.sourceUrl}
                                alt={item.image.altText || item.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="flex justify-center inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </>
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-[var(--text-secondary)]/30">
                              No image
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col" style={{ gap: "clamp(0.6rem, 1.6vh, 0.9rem)" }}>
                          {/* Top row: title + remove */}
                          <div className="flex items-start justify-between" style={{ gap: "0.75rem" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                              <h3 
                                className="font-medium text-[var(--text-primary)] leading-tight line-clamp-2"
                                style={{ fontSize: "1rem" }}
                              >
                                {item.name}
                              </h3>
                              <p className="text-sm font-semibold text-[var(--accent-gold)]">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="group/remove flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-red-400/80 transition-all hover:bg-red-500/10 hover:text-red-400"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5 transition-transform group-hover/remove:scale-110" />
                              <span>Remove</span>
                            </button>
                          </div>

                          {/* Bottom row: quantity controls */}
                          <div className="flex items-center justify-start" style={{ marginTop: "clamp(0.25rem, 0.8vh, 0.5rem)" }}>
                            <div className="flex items-center rounded-full border border-[var(--accent-gold)]/30 bg-black/25 px-2.5 py-1.75" style={{ gap: "0.65rem" }}>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)]/70 transition-all hover:bg-[var(--accent-gold)]/20 hover:text-[var(--accent-gold)] disabled:opacity-30 disabled:cursor-not-allowed"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span 
                                className="flex h-8 w-9 items-center justify-center text-sm font-medium text-[var(--text-primary)]"
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)]/70 transition-all hover:bg-[var(--accent-gold)]/20 hover:text-[var(--accent-gold)]"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Item Total (subtle) */}
                      {item.quantity > 1 && (
                        <div className="mt-2 pt-2 border-t border-[var(--accent-gold)]/10">
                          <div className="flex justify-between text-xs">
                            <span className="text-[var(--text-secondary)]/50">Item Total</span>
                            <span className="font-semibold text-[var(--accent-gold)]">
                              Rs {itemTotal.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Enhanced Footer with summary and CTA */}
          {items.length > 0 && (
            <div 
              className="border-t border-[var(--accent-gold)]/30 bg-gradient-to-b from-[var(--bg-surface)]/30 to-[var(--bg-surface)]/50"
              style={{
                padding: "clamp(1.5rem, 3vh, 2rem) clamp(1.5rem, 4vw, 2rem)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(1rem, 2.5vh, 1.25rem)",
              }}
            >
              {/* Subtotal Breakdown */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(0.6rem, 1.8vh, 1rem)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)]/70">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                  <span 
                    className="font-semibold text-[var(--text-primary)]"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Rs {subtotal.toLocaleString()}
                  </span>
                </div>
                
                <div 
                  className="flex items-center rounded-lg bg-[var(--accent-gold)]/5 border border-[var(--accent-gold)]/20"
                  style={{
                    gap: "clamp(0.5rem, 1.5vh, 0.8rem)",
                    padding: "clamp(0.3rem, 0.9vh, 0.45rem)",
                  }}
                >
                  <svg 
                    className="h-4 w-4 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-[var(--text-secondary)]/70 leading-relaxed">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  toggleCart();
                  router.push("/checkout");
                }}
                className="group relative w-full overflow-hidden rounded-full bg-[var(--accent-gold)] font-medium uppercase tracking-widest text-[var(--bg-main)] transition-all hover:bg-[var(--text-secondary)] hover:shadow-[0_0_30px_rgba(253,221,173,0.3)]"
                style={{
                  fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
                  letterSpacing: "0.12em",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  marginTop: "0.35rem",
                }}
              >
                <span className="relative z-10">Proceed to Checkout</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </button>

              {/* Continue Shopping Link */}
              <button
                onClick={toggleCart}
                className="mt-3 w-full text-center text-sm text-[var(--text-secondary)]/60 transition-colors hover:text-[var(--accent-gold)] underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
