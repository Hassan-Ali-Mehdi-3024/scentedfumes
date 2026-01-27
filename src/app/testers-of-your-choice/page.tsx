import type { Metadata } from "next";
import TestersChoiceClient from "@/components/testers/TestersChoiceClient";
import { fetchProductByDatabaseId, fetchProductBySlug, fetchProductsForTestersSelection } from "@/lib/graphql/products";

export const metadata: Metadata = {
  title: "Testers of Your Choice | Scented Fumes",
  description: "Pick your testers and add them to your order.",
};

export const revalidate = 3600;

type PageProps = {
  searchParams?: Promise<{
    offer?: string;
    proId?: string;
    prodId?: string;
    returnTo?: string;
  }>;
};

export default async function TestersOfYourChoicePage({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const offer = resolvedSearchParams.offer ?? "";
  const proIdRaw = resolvedSearchParams.proId ?? resolvedSearchParams.prodId ?? "";
  const proId = Number(proIdRaw);
  const validProId = Number.isFinite(proId) && proId > 0 ? proId : null;
  const returnTo = resolvedSearchParams.returnTo ?? "/gift-sets";

  const [products, testersPackProduct, proProduct] = await Promise.all([
    fetchProductsForTestersSelection(200),
    fetchProductBySlug("5ml-testers-of-your-choice"),
    validProId ? fetchProductByDatabaseId(validProId) : Promise.resolve(null),
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
              marginBottom: "clamp(1.75rem, 4vh, 2.5rem)",
            }}
          >
            <h1
              className="text-[var(--text-primary)]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 600,
                fontSize: "clamp(2rem, 3.6vw, 2.6rem)",
                lineHeight: 1.15,
              }}
            >
              Testers of Your Choice
            </h1>
            <p
              style={{
                opacity: 0.85,
                fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "70ch",
              }}
            >
              Select your testers. We’ll attach your choices to the order note.
            </p>
          </header>

          <TestersChoiceClient
            products={products}
            testersPackProduct={testersPackProduct}
            proProduct={proProduct}
            offer={offer}
            proId={validProId}
            returnTo={returnTo}
          />
        </div>
      </div>
    </main>
  );
}
