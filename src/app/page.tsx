import Image from "next/image";
import Link from "next/link";
import { fetchProductsWithCategories } from "@/lib/graphql/products";
import { formatPrice } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const { products, categories } = await fetchProductsWithCategories();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-3 text-center sm:text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            scentedfumes
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Artisanal perfumes crafted for bold stories.
          </h1>
          <p className="text-lg text-slate-300">
            Every bottle is inspired by modern legends and composed to stay with you through the
            day.
          </p>
        </header>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Collections</h2>
              <p className="text-sm text-slate-400">Curated by our perfumers.</p>
            </div>
            <Link href="/" className="text-sm font-medium text-amber-300">
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <article
                key={category.slug}
                className="rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:border-amber-400"
              >
                <p className="text-sm text-slate-300">{category.slug}</p>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Featured perfumes</h2>
              <p className="text-sm text-slate-400">Fresh, woody, and daring.</p>
            </div>
            <Link href="/" className="text-sm font-medium text-amber-300">
              Browse shop
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/5 transition hover:border-amber-400"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  {product.image?.sourceUrl ? (
                    <Image
                      src={product.image.sourceUrl}
                      alt={product.image.altText ?? product.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-white/10">
                      <span className="text-xs uppercase tracking-widest text-slate-400">
                        No image
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    {product.stockStatus === "IN_STOCK" ? "In stock" : "Out of stock"}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-semibold text-white">
                      {formatPrice(product.price)}
                    </span>
                    {product.regularPrice && product.regularPrice !== product.price && (
                      <span className="text-sm text-slate-500 line-through">
                        {formatPrice(product.regularPrice)}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-widest text-slate-400">
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
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
