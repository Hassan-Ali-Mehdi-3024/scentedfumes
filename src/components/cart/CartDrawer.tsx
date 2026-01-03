"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice, cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-[#0a0a0a] border-l border-white/10 p-6 shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
            <button
              onClick={toggleCart}
              className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                <p className="text-slate-400">Your cart is empty</p>
                <button
                  onClick={toggleCart}
                  className="text-sm font-medium text-white underline underline-offset-4"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                      {item.image?.sourceUrl ? (
                        <Image
                          src={item.image.sourceUrl}
                          alt={item.image.altText || item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-slate-500">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-white">{item.name}</h3>
                        <p className="text-sm text-slate-400">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="text-sm text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-white/10 pt-6">
              <div className="mb-4 flex items-center justify-between text-white">
                <span className="font-medium">Subtotal</span>
                <span className="text-xl font-semibold">
                  {/* Note: This is a rough estimate. Real calculation should happen on server or be more robust */}
                  Rs {subtotal.toLocaleString()}
                </span>
              </div>
              <p className="mb-4 text-xs text-slate-400">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={() => {
                  toggleCart();
                  router.push("/checkout");
                }}
                className="w-full rounded-full bg-white py-4 text-sm font-medium uppercase tracking-widest text-black transition-colors hover:bg-slate-200"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
