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

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        <div className="rounded-full bg-green-500/10 p-4 mx-auto w-20 h-20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-10 w-10 text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <header>
          <h1 className="text-3xl font-semibold text-white">Thank You for Your Order!</h1>
          <p className="mt-2 text-slate-400">
            Your order has been successfully placed.
          </p>
        </header>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-8 text-left">
          <h2 className="mb-4 text-xl font-semibold text-white">What's Next?</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-amber-400">✓</span>
              <span>You will receive a confirmation call from our team shortly.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400">✓</span>
              <span>Your order will be processed and shipped within 1-2 business days.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-400">✓</span>
              <span>Payment will be collected via Cash on Delivery (COD).</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Need help? Contact us via WhatsApp or call us directly.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-white px-8 py-3 text-sm font-medium uppercase tracking-widest text-black transition-colors hover:bg-slate-200"
            >
              Continue Shopping
            </Link>
            <a
              href="https://wa.me/923321300655"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white/10"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
