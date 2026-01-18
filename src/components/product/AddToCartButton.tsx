"use client";

import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      disabled={product.stockStatus !== "IN_STOCK"}
      className="w-full rounded-full bg-[var(--accent-gold)] text-[var(--bg-surface)] font-medium uppercase tracking-widest transition-all hover:bg-[var(--accent-gold)]/90 hover:shadow-[0_0_20px_rgba(253,221,173,0.4)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        paddingTop: "clamp(0.85rem, 1.8vh, 1.15rem)",
        paddingBottom: "clamp(0.85rem, 1.8vh, 1.15rem)",
        paddingLeft: "clamp(1.75rem, 3.5vw, 2.25rem)",
        paddingRight: "clamp(1.75rem, 3.5vw, 2.25rem)",
        fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
        letterSpacing: "0.12em",
      }}
    >
      {product.stockStatus === "IN_STOCK" ? "Add to cart" : "Out of stock"}
    </button>
  );
}
