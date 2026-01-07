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

  return (
    <main className="w-full flex-1 bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto w-full space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-white">{category.name}</h1>
          {category.description && (
            <p className="mt-2 text-slate-400">{category.description}</p>
          )}
          <p className="mt-2 text-sm text-slate-500">
            Showing {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              price={formatPrice(product.price)}
              imageSrc={product.image?.sourceUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
              href={`/product/${product.slug}`}
            />
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
