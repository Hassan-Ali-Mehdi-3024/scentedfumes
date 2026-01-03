import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchProductSlugs } from "@/lib/graphql/products";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/product/AddToCartButton";

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

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <section className="mx-auto max-w-6xl space-y-10">
        <Link href="/" className="text-sm font-medium text-amber-300">
          ← Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <article className="space-y-8">
            <div className="relative h-[420px] w-full overflow-hidden rounded-[48px] border border-white/10 bg-white/5">
              {product.image?.sourceUrl ? (
                <Image
                  src={product.image.sourceUrl}
                  alt={product.image.altText ?? product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.4em] text-slate-400">
                  No image
                </div>
              )}
            </div>

            <div className="space-y-6 rounded-[32px] border border-white/5 bg-white/5 p-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  {product.stockStatus === "IN_STOCK" ? "In stock" : "Out of stock"}
                </p>
                <h1 className="text-3xl font-semibold text-white">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-semibold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.regularPrice && product.regularPrice !== product.price && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(product.regularPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="prose max-w-none text-slate-200" dangerouslySetInnerHTML={{ __html: description }} />

              <div className="pt-4">
                <AddToCartButton product={product} />
              </div>

              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-slate-400">
                {product.productCategories?.nodes.map((category) => (
                  <span
                    key={category.slug}
                    className="rounded-full border border-white/20 px-3 py-1"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6 rounded-[32px] border border-white/5 bg-gradient-to-b from-amber-400/20 to-black/20 p-6">
            <h2 className="text-xl font-semibold text-white">Quick details</h2>
            <p className="text-sm text-slate-300">
              Crafted to deliver a balanced projection with notes that unfold over hours. We
              recommend sampling at least two sprays before committing to the full bottle.
            </p>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Variant</p>
              <p className="text-lg font-medium text-white">Single concentrate</p>
            </div>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Sillage</p>
              <p className="text-lg font-medium text-white">Moderate to strong</p>
            </div>
          </aside>
        </div>

        {related.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Related scents</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((relatedItem) => (
                <Link
                  key={relatedItem.id}
                  href={`/product/${relatedItem.slug}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:border-amber-400"
                >
                  <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                    {relatedItem.image?.sourceUrl ? (
                      <Image
                        src={relatedItem.image.sourceUrl}
                        alt={relatedItem.image.altText ?? relatedItem.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{relatedItem.slug}</p>
                    <h3 className="text-lg font-semibold text-white">{relatedItem.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
