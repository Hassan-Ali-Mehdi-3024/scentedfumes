import type { Metadata } from "next";
import GiftSetsClient from "@/components/gift-sets/GiftSetsClient";
import { fetchCategoryBySlug } from "@/lib/graphql/categories";
import { fetchProductBySlug, fetchProductsForTestersSelection } from "@/lib/graphql/products";

export const metadata: Metadata = {
  title: "Gift Sets | Scented Fumes",
  description: "Discover curated gift sets and limited offers.",
};

export const revalidate = 3600;

export default async function GiftSetsPage() {
  const giftSet3EcoSlug = process.env.NEXT_PUBLIC_GIFTSET_PRODUCT_SLUG_3ECO || "gift-set-3-eco";
  const giftSet3ProSlug = process.env.NEXT_PUBLIC_GIFTSET_PRODUCT_SLUG_3PRO || "gift-set-3-pro";

  const [
    { products: ecoProducts }, 
    { products: proProducts }, 
    testersPackProduct, 
    testerChoiceProducts,
    giftSet3EcoProduct,
    giftSet3ProProduct,
  ] =
    await Promise.all([
      fetchCategoryBySlug("eco"),
      fetchCategoryBySlug("pro"),
      fetchProductBySlug("5ml-testers-of-your-choice"),
      fetchProductsForTestersSelection(300),
      fetchProductBySlug(giftSet3EcoSlug),
      fetchProductBySlug(giftSet3ProSlug),
    ]);

  const containerPadding = {
    paddingTop: "clamp(2.5rem, 6vh, 4rem)",
    paddingBottom: "clamp(2.5rem, 6vh, 4rem)",
    paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
    paddingRight: "clamp(1.5rem, 4vw, 3rem)",
  } as const;

  return (
    <main
      className="flex-1 w-full bg-[var(--bg-main)] text-[var(--text-secondary)]"
      style={{ paddingTop: "var(--header-offset, 5rem)" }}
    >
      <div className="w-full flex justify-center" style={containerPadding}>
        <div style={{ width: "100%", maxWidth: "1100px" }}>
          <header
            className="text-center flex flex-col items-center"
            style={{
              gap: "clamp(0.65rem, 1.8vh, 1rem)",
              marginBottom: "clamp(1.75rem, 4vh, 2.75rem)",
            }}
          >
            <div
              className="inline-flex items-center rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-surface)]/60 text-[var(--text-primary)]"
              style={{
                paddingTop: "clamp(0.5rem, 1.2vh, 0.65rem)",
                paddingBottom: "clamp(0.5rem, 1.2vh, 0.65rem)",
                paddingLeft: "clamp(0.9rem, 2.5vw, 1.1rem)",
                paddingRight: "clamp(0.9rem, 2.5vw, 1.1rem)",
                gap: "clamp(0.35rem, 0.9vh, 0.6rem)",
                fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
              }}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)]" />
              Curated bundles
            </div>
            <h1
              className="text-[var(--text-primary)]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 600,
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.15,
              }}
            >
              Gift Sets
            </h1>
            <p
              style={{
                opacity: 0.85,
                fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "65ch",
              }}
            >
              Choose a bundle, pick your scents, and checkout with the offer applied.
            </p>
          </header>

          <GiftSetsClient
            ecoProducts={ecoProducts}
            proProducts={proProducts}
            testersPackProduct={testersPackProduct}
            testerChoiceProducts={testerChoiceProducts}
            giftSet3EcoProduct={giftSet3EcoProduct}
            giftSet3ProProduct={giftSet3ProProduct}
          />
        </div>
      </div>
    </main>
  );
}
