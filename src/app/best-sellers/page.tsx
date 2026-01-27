import { Metadata } from "next";
import ProductCard from "@/components/ui/ProductCard";
import { graphqlClient } from "@/lib/graphql/client";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Best Sellers | Scented Fumes",
  description: "Discover our most popular fragrances. Handpicked customer favorites from Studio Pro, Suave ECO, Pink Bling Pro, Floral Fume ECO, and our exclusive Tester Pack.",
};

export const revalidate = 3600; // Revalidate every hour

const BEST_SELLERS_QUERY = `
  query GetBestSellers {
    testerPack: product(id: "5ml-testers-of-your-choice", idType: SLUG) {
      id
      databaseId
      slug
      name
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
      }
    }
    suave: product(id: "suave", idType: SLUG) {
      id
      databaseId
      slug
      name
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
      }
    }
    floralFume: product(id: "floral-fume", idType: SLUG) {
      id
      databaseId
      slug
      name
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
      }
    }
    pinkBling: product(id: "pink-bling-pro", idType: SLUG) {
      id
      databaseId
      slug
      name
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
      }
    }
    studioPro: product(id: "studio-our-rendition-of-office-for-men-2", idType: SLUG) {
      id
      databaseId
      slug
      name
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
      }
    }
  }
`;

async function getBestSellers() {
  const response = await graphqlClient.query(BEST_SELLERS_QUERY, {}).toPromise();
  
  if (response.error) {
    console.error("Failed to fetch best sellers:", response.error);
    return [];
  }

  const data = response.data;
  
  // Collect all products from individual queries
  const allProducts = [
    data?.testerPack,
    data?.suave,
    data?.floralFume,
    data?.pinkBling,
    data?.studioPro,
  ].filter((product) => product !== null && product !== undefined);

  // Filter out "My Product" sample (if any)
  const filteredProducts = allProducts.filter(
    (product) => product.slug !== 'my-product' && product.name !== 'My Product'
  );

  return filteredProducts;
}

export default async function BestSellersPage() {
  const products = await getBestSellers();

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
      <div className="w-full" style={containerPadding}>
        {/* Header */}
        <header
          className="text-center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(0.65rem, 1.8vh, 1rem)",
            marginBottom: "clamp(2rem, 5vh, 3rem)",
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
            Customer favorites
          </div>
          <h1
            className="text-[var(--text-primary)]"
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 600,
              fontSize: "clamp(2.2rem, 4vw, 3rem)",
              lineHeight: 1.2,
            }}
          >
            Best Sellers
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              opacity: 0.8,
              fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
              lineHeight: 1.6,
              maxWidth: "600px",
            }}
          >
            Discover our most-loved fragrances. Each scent has captured hearts and become a staple in perfume collections.
          </p>
        </header>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
              justifyItems: "center",
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                price={formatPrice(product.price || product.regularPrice) || "N/A"}
                imageSrc={product.image?.sourceUrl || "/placeholder.jpg"}
                href={`/product/${product.slug}`}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center rounded-2xl border border-[var(--accent-gold)]/15 bg-[var(--bg-surface)]/60"
            style={{
              paddingTop: "clamp(2rem, 5vh, 3rem)",
              paddingBottom: "clamp(2rem, 5vh, 3rem)",
              paddingLeft: "clamp(1.5rem, 4vw, 2rem)",
              paddingRight: "clamp(1.5rem, 4vw, 2rem)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.15rem)",
                opacity: 0.7,
              }}
            >
              Best sellers coming soon...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
