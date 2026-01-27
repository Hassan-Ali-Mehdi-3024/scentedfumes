import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Cleans WooCommerce price strings (e.g., `₨&nbsp;2,700`).
 * Removes HTML entities and returns cleaned string.
 */
export function formatPrice(price: string | undefined): string {
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
export function extractNumericPrice(priceString: string | undefined): number {
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

type PromotionLike = {
  code: string;
  selections: number[];
  label?: string;
} | null;

type TotalsItemLike = {
  databaseId?: number;
  price?: string;
  quantity?: number;
  slug?: string;
  productCategories?: { nodes: Array<{ slug: string }> };
};

function hasCategorySlug(item: TotalsItemLike, slug: string) {
  return Boolean(item.productCategories?.nodes?.some((c) => c.slug === slug));
}

export function calculateDisplayTotals(items: TotalsItemLike[], promotion: PromotionLike) {
  const subtotal = items.reduce((acc, it) => acc + extractNumericPrice(it.price) * (it.quantity || 0), 0);
  if (!promotion) return { subtotal, discount: 0, total: subtotal };

  const selectionIds = promotion.selections ?? [];
  if (selectionIds.length === 0) return { subtotal, discount: 0, total: subtotal };

  const selectedItems = selectionIds
    .map((id) => items.find((it) => it.databaseId === id))
    .filter(Boolean) as TotalsItemLike[];

  if (selectedItems.length !== selectionIds.length) return { subtotal, discount: 0, total: subtotal };
  if (selectedItems.some((it) => (it.quantity || 0) < 1)) return { subtotal, discount: 0, total: subtotal };

  const selectionSubtotal = selectedItems.reduce((acc, it) => acc + extractNumericPrice(it.price), 0);

  let discount = 0;

  if (promotion.code === "gift_3_eco") {
    discount = Math.max(0, selectionSubtotal - 4500);
  } else if (promotion.code === "gift_3_pro") {
    discount = Math.max(0, selectionSubtotal - 6500);
  } else if (promotion.code === "pro_half_eco") {
    const ecoItem =
      selectedItems.find((it) => hasCategorySlug(it, "eco")) ??
      selectedItems.find((it) => it.slug === "eco") ??
      null;
    const ecoPrice = ecoItem ? extractNumericPrice(ecoItem.price) : 0;
    discount = ecoPrice * 0.5;
  } else if (promotion.code === "pro_half_testers") {
    const testersItem =
      selectedItems.find((it) => hasCategorySlug(it, "tester") || hasCategorySlug(it, "testers")) ??
      selectedItems.find((it) => (it.slug || "").includes("tester")) ??
      null;
    const testersPrice = testersItem ? extractNumericPrice(testersItem.price) : 0;
    discount = testersPrice * 0.5;
  }

  const total = Math.max(0, subtotal - discount);
  return { subtotal, discount, total };
}
