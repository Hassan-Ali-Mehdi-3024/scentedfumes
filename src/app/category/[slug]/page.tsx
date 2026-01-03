import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCategoryBySlug, fetchCategorySlugs } from "@/lib/graphql/categories";
import { formatPrice } from "@/lib/utils";

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

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-white">{category.name}</h1>
          {category.description && (
            <p className="mt-2 text-slate-400">{category.description}</p>
          )}
          <p className="mt-2 text-sm text-slate-500">
            Showing {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:border-amber-400"
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-white/5">
                {product.image?.sourceUrl ? (
                  <Image
                    src={product.image.sourceUrl}
                    alt={product.image.altText || product.name}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.4em] text-slate-400">
                    No image
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="line-clamp-2 font-medium text-white">{product.name}</h3>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.regularPrice && product.regularPrice !== product.price && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(product.regularPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {product.stockStatus === "IN_STOCK" ? "In stock" : "Out of stock"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400">No products found in this category.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm font-medium text-amber-300 underline underline-offset-4"
            >
              Return to Homepage
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
