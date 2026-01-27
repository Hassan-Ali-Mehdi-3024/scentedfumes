import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchProductSlugs } from "@/lib/graphql/products";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/product/AddToCartButton";
import TesterSelectionForm from "@/components/product/TesterSelectionForm";
import ProductCard from "@/components/ui/ProductCard";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await fetchProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const description = product.shortDescription ?? product.description ?? "";
  const related = product.related?.nodes ?? [];
  const isTesterChoice = product.slug === "5ml-testers-of-your-choice";
  const testerAttributes = product.attributes?.nodes ?? [];

  return (
    <main 
      className="w-full flex-1 bg-[var(--bg-main)] text-[var(--text-secondary)]"
      style={{
        paddingTop: "calc(var(--header-offset, 5rem) + clamp(1.5rem, 3vh, 2.5rem))",
        paddingBottom: "clamp(2rem, 4vh, 3rem)",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        overflowX: "hidden",
        backgroundColor: "var(--bg-main)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        <section 
          className="w-full"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(2rem, 4vh, 3rem)",
          }}
        >
        <Link 
          href="/" 
          className="text-[var(--accent-gold)] font-medium transition-colors hover:text-[var(--text-secondary)]"
          style={{
            fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
            letterSpacing: "0.05em",
          }}
        >
          ← Back to shop
        </Link>

        <div 
          className="grid lg:grid-cols-[1.4fr_1fr]"
          style={{ gap: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          <article 
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(2rem, 4vh, 2.5rem)",
            }}
          >
            <div 
              className="relative w-full overflow-hidden rounded-3xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/30"
              style={{
                height: "clamp(280px, 45vh, 500px)",
              }}
            >
              {product.image?.sourceUrl ? (
                <Image
                  src={product.image.sourceUrl}
                  alt={product.image.altText ?? product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                <div 
                  className="flex h-full items-center justify-center text-[var(--text-muted)] uppercase tracking-widest"
                  style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)" }}
                >
                  No image
                </div>
              )}
            </div>

            <div 
              className="rounded-2xl border border-[var(--accent-gold)]/15 bg-[var(--bg-surface)]/25"
              style={{
                paddingTop: "clamp(1.5rem, 3vh, 2rem)",
                paddingBottom: "clamp(1.5rem, 3vh, 2rem)",
                paddingLeft: "clamp(1.5rem, 3vw, 2rem)",
                paddingRight: "clamp(1.5rem, 3vw, 2rem)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(1.25rem, 2.5vh, 1.75rem)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1vh, 0.75rem)" }}>
                <p 
                  className="uppercase tracking-widest text-[var(--text-muted)]"
                  style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
                >
                  {product.stockStatus === "IN_STOCK" ? "In stock" : "Out of stock"}
                </p>
                <h1 
                  className="font-semibold text-[var(--text-primary)]"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontFamily: "var(--font-playfair), serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {product.name}
                </h1>
                <div 
                  className="flex items-center"
                  style={{ gap: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
                >
                  <span 
                    className="font-semibold text-[var(--accent-gold)]"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  {product.regularPrice && product.regularPrice !== product.price && (
                    <span 
                      className="text-[var(--text-muted)] line-through"
                      style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}
                    >
                      {formatPrice(product.regularPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div 
                className="prose max-w-none text-[var(--text-secondary)]/85"
                style={{
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  lineHeight: 1.7,
                }}
                dangerouslySetInnerHTML={{ __html: description }} 
              />

              <div style={{ paddingTop: "clamp(0.5rem, 1vh, 0.75rem)" }}>
                {isTesterChoice ? (
                  <TesterSelectionForm product={product} attributes={testerAttributes} />
                ) : (
                  <AddToCartButton product={product} />
                )}
              </div>

              <div 
                className="flex flex-wrap"
                style={{ gap: "clamp(0.5rem, 1vw, 0.75rem)" }}
              >
                {product.productCategories?.nodes.map((category) => (
                  <span
                    key={category.slug}
                    className="rounded-full border border-[var(--accent-gold)]/25 bg-[var(--accent-gold)]/5 text-[var(--accent-gold)] uppercase tracking-widest"
                    style={{
                      paddingTop: "clamp(0.35rem, 0.7vh, 0.5rem)",
                      paddingBottom: "clamp(0.35rem, 0.7vh, 0.5rem)",
                      paddingLeft: "clamp(0.75rem, 1.5vw, 1rem)",
                      paddingRight: "clamp(0.75rem, 1.5vw, 1rem)",
                      fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)",
                      fontWeight: 600,
                    }}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <aside 
            className="rounded-2xl border border-[var(--accent-gold)]/20 bg-gradient-to-b from-[var(--bg-surface)]/40 to-[var(--bg-main)]/20"
            style={{
              paddingTop: "clamp(1.5rem, 3vh, 2rem)",
              paddingBottom: "clamp(1.5rem, 3vh, 2rem)",
              paddingLeft: "clamp(1.5rem, 3vw, 2rem)",
              paddingRight: "clamp(1.5rem, 3vw, 2rem)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(1.25rem, 2.5vh, 1.75rem)",
            }}
          >
            <h2 
              className="font-semibold text-[var(--text-primary)]"
              style={{
                fontSize: "clamp(1.15rem, 1.5vw, 1.5rem)",
                fontFamily: "var(--font-playfair), serif",
              }}
            >
              Quick details
            </h2>
            <p 
              className="text-[var(--text-secondary)]/80"
              style={{
                fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                lineHeight: 1.7,
              }}
            >
              Crafted to deliver a balanced projection with notes that unfold over hours. We
              recommend sampling at least two sprays before committing to the full bottle.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.75rem, 1.5vh, 1rem)" }}>
              <p 
                className="uppercase tracking-widest text-[var(--text-muted)]"
                style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
              >
                Variant
              </p>
              <p 
                className="font-medium text-[var(--text-primary)]"
                style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
              >
                Single concentrate
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.75rem, 1.5vh, 1rem)" }}>
              <p 
                className="uppercase tracking-widest text-[var(--text-muted)]"
                style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
              >
                Sillage
              </p>
              <p 
                className="font-medium text-[var(--text-primary)]"
                style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
              >
                Moderate to strong
              </p>
            </div>
          </aside>
        </div>

        {related.length ? (
          <section style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vh, 2rem)" }}>
            <h2 
              className="font-semibold text-[var(--text-primary)]"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontFamily: "var(--font-playfair), serif",
              }}
            >
              Related scents
            </h2>
            <div 
              className="flex flex-wrap justify-center"
              style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              {related.map((relatedItem) => (
                <ProductCard
                  key={relatedItem.id}
                  title={relatedItem.name}
                  price="View Product"
                  imageSrc={relatedItem.image?.sourceUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                  href={`/product/${relatedItem.slug}`}
                />
              ))}
            </div>
          </section>
        ) : null}
        </section>
      </div>
    </main>
  );
}
