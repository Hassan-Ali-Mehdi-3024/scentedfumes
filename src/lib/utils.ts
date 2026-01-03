import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Cleans WooCommerce price strings (e.g., `₨&nbsp;2,700`).
 */
export function formatPrice(price: string) {
  if (!price) {
    return "";
  }

  return price.replace(/&nbsp;/g, " ");
}
