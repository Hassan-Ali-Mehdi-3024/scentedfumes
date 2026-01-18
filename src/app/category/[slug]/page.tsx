import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCategoryBySlug, fetchCategorySlugs } from "@/lib/graphql/categories";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";

export const revalidate = 3600;

export async function generateStaticParams() {
  // Only pre-generate main category pages to avoid timeouts
  return [
    { slug: "men" },
    { slug: "women" },
    { slug: "unisex" },
    { slug: "pro" },
    { slug: "eco" },
    { slug: "tester" },
  ];
}

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { category, products } = await fetchCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const productCountLabel = `${products.length} ${products.length === 1 ? "product" : "products"}`;

  return (
    <main className="w-full bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* Hero Section - Category Header - Full Width */}
      <section
        className="w-full border-b border-[var(--accent-gold)]/15"
        style={{
          paddingTop: "clamp(2.5rem, 6vh, 4.5rem)",
          paddingBottom: "clamp(2.5rem, 5vh, 4rem)",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          background: "var(--gradient-category-header)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vh, 2.25rem)" }}>
          {/* Category Badge */}
          <div
            className="inline-flex items-center rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/8 text-[var(--accent-gold)]"
            style={{
              width: "fit-content",
              gap: "0.5rem",
              padding: "clamp(0.45rem, 0.9vh, 0.6rem) clamp(0.9rem, 1.8vw, 1.2rem)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "1rem", height: "1rem" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-12H6" />
            </svg>
            <span style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.85rem)", fontWeight: 600, letterSpacing: "0.1em" }}>
              {category.name.toUpperCase()}
            </span>
          </div>

          {/* Heading - Mobile vs Desktop */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vh, 1.5rem)" }}>
            <h1
              className="leading-tight text-[var(--text-primary)]"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
                fontWeight: 600,
                fontFamily: "var(--font-playfair), serif",
                letterSpacing: "-0.02em",
              }}
            >
              Curated {category.name} Selections
            </h1>

            {/* Description */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vh, 1.5rem)", maxWidth: "65ch" }}>
              {category.description ? (
                <div
                  className="text-[var(--text-secondary)]/85"
                  style={{
                    fontSize: "clamp(0.9rem, 1vw, 1.1rem)",
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                  dangerouslySetInnerHTML={{ __html: category.description }}
                />
              ) : (
                <p
                  className="text-[var(--text-secondary)]/85"
                  style={{
                    fontSize: "clamp(0.9rem, 1vw, 1.1rem)",
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  Explore our handpicked scents crafted to match this collection. Each bottle reflects the Modern Luxury DNA with bold character and enduring presence.
                </p>
              )}

              {/* Meta Info - Responsive Layout */}
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.75rem, 2vw, 1.25rem)", flexWrap: "wrap", marginTop: "clamp(0.5rem, 1vh, 0.75rem)" }}>
                <span
                  className="rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/8 text-[var(--accent-gold)]"
                  style={{
                    padding: "clamp(0.35rem, 0.7vh, 0.5rem) clamp(0.7rem, 1.4vw, 0.9rem)",
                    fontSize: "clamp(0.7rem, 0.9vw, 0.85rem)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  {productCountLabel}
                </span>
                <div style={{ width: "1px", height: "1rem", backgroundColor: "var(--accent-gold)/25" }} />
                <Link
                  href="/"
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-gold)]"
                  style={{
                    fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
                    textDecoration: "underline",
                    textDecorationColor: "var(--accent-gold)/30",
                    textUnderlineOffset: "0.3rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  ← Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section - Full Width */}
      <section
        style={{
          paddingTop: "clamp(2.5rem, 5vh, 4rem)",
          paddingBottom: "clamp(2.5rem, 5vh, 4rem)",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        {products.length > 0 ? (
          <div
            className="grid justify-items-center"
            style={{
              gap: "clamp(1.5rem, 3vh, 2.5rem)",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            }}
          >
            {products.map((product) => {
              const key = product.databaseId ? `db-${product.databaseId}` : product.slug ? `slug-${product.slug}` : `id-${product.id}`;
              return (
                <div key={key} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <ProductCard
                    title={product.name}
                    price={formatPrice(product.price)}
                    imageSrc={
                      product.image?.sourceUrl ||
                      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    }
                    href={`/product/${product.slug}`}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="rounded-2xl border border-[var(--accent-gold)]/25 bg-[var(--bg-surface)]/30 backdrop-blur-sm"
            style={{
              padding: "clamp(2.5rem, 6vh, 4rem) clamp(1.5rem, 4vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(1.25rem, 2.5vh, 1.75rem)",
              minHeight: "320px",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full border-2 border-dashed border-[var(--accent-gold)]/25 bg-[var(--accent-gold)]/5"
              style={{
                width: "clamp(70px, 11vw, 110px)",
                height: "clamp(70px, 11vw, 110px)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="text-[var(--accent-gold)]/40"
                style={{ width: "50%", height: "50%" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.6rem, 1.2vh, 0.9rem)", textAlign: "center" }}>
              <p
                className="text-[var(--text-secondary)]/75"
                style={{
                  fontSize: "clamp(1rem, 1.1vw, 1.2rem)",
                  fontWeight: 500,
                  fontFamily: "var(--font-playfair), serif",
                }}
              >
                No products yet
              </p>
              <p
                className="text-[var(--text-secondary)]/60"
                style={{
                  fontSize: "clamp(0.85rem, 0.95vw, 1rem)",
                  lineHeight: 1.6,
                  maxWidth: "50ch",
                }}
              >
                Check back soon or explore other collections crafted for the Modern Luxury experience.
              </p>
            </div>

            <Link
              href="/"
              className="rounded-full border border-[var(--accent-gold)]/50 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] transition-all hover:bg-[var(--accent-gold)] hover:text-[var(--bg-main)]"
              style={{
                padding: "clamp(0.55rem, 1.1vh, 0.75rem) clamp(1.25rem, 2.5vw, 1.75rem)",
                fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                marginTop: "clamp(0.4rem, 0.8vh, 0.6rem)",
              }}
            >
              Return Home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
