"use client";

import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      disabled={product.stockStatus !== "IN_STOCK"}
      className="w-full rounded-full bg-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-black transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {product.stockStatus === "IN_STOCK" ? "Add to cart" : "Out of stock"}
    </button>
  );
}
