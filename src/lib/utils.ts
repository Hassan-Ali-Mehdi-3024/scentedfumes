import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Cleans WooCommerce price strings (e.g., `₨&nbsp;2,700`).
 * Removes HTML entities and returns cleaned string.
 */
export function formatPrice(price: string) {
  if (!price) {
    return "";
  }

  return price
    .replace(/&nbsp;/g, " ")
    .replace(/&#8377;/g, "₹") // Indian Rupee
    .replace(/&#8360;/g, "₨") // Pakistani Rupee
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Extracts numeric value from price string for calculations.
 * Example: "₨ 2,700" -> 2700
 */
export function extractNumericPrice(priceString: string): number {
  if (!priceString) return 0;
  
  // First clean HTML entities
  const cleaned = formatPrice(priceString)
    // Remove all non-numeric characters except dots and commas
    .replace(/[^0-9.,]/g, '')
    // Remove thousand separators (commas)
    .replace(/,/g, '')
    // Handle decimal point
    .trim();
  
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
