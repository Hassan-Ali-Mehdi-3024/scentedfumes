"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { useEffect, useState } from "react";

export default function Header() {
  const { items, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-transparent px-5 lg:px-16 py-6">
      <nav className="mx-auto flex items-center justify-between w-full">
        <Link href="/" className="flex items-center">
          <Image src="/Logo.svg" alt="Scented Fumes" width={160} height={40} className="object-contain" />
        </Link>

        <ul className="hidden gap-8 md:flex">
          <li>
            <Link href="/" className="text-sm uppercase tracking-wider text-slate-300 transition hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/category/men" className="text-sm uppercase tracking-wider text-slate-300 transition hover:text-white">
              Men
            </Link>
          </li>
          <li>
            <Link href="/category/women" className="text-sm uppercase tracking-wider text-slate-300 transition hover:text-white">
              Women
            </Link>
          </li>
          <li>
            <Link href="/category/unisex" className="text-sm uppercase tracking-wider text-slate-300 transition hover:text-white">
              Unisex
            </Link>
          </li>
          <li>
            <Link href="/category/pro" className="text-sm uppercase tracking-wider text-slate-300 transition hover:text-white">
              Pro Series
            </Link>
          </li>
          <li>
            <Link href="/category/eco" className="text-sm uppercase tracking-wider text-slate-300 transition hover:text-white">
              Eco Series
            </Link>
          </li>
          <li>
            <Link href="/category/tester" className="text-sm uppercase tracking-wider text-slate-300 transition hover:text-white">
              Testers
            </Link>
          </li>
        </ul>

        <button
          onClick={toggleCart}
          className="relative rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10"
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
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-black">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
