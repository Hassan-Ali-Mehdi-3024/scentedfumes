"use client";

import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";

type AddToCartButtonProps = {
  product: Product;
  testerSelections?: string[];
  disabled?: boolean;
  buttonLabel?: string;
};

export default function AddToCartButton({
  product,
  testerSelections,
  disabled,
  buttonLabel,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const isInStock = product.stockStatus === "IN_STOCK";
  const hasPrice = !!product.price || !!product.regularPrice;
  const isDisabled = !!disabled || !isInStock || !hasPrice;

  let label = "Add to cart";
  if (!isInStock) label = "Out of stock";
  if (!hasPrice) label = "Unavailable";
  if (buttonLabel) label = buttonLabel;

  return (
    <button
      onClick={() => addItem(product, testerSelections)}
      disabled={isDisabled}
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
      {label}
    </button>
  );
}
