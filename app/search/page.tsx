import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/app/components/ui";
import { GridSkeleton, ProductGrid } from "@/components/listing";
import { categories, searchProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <Suspense fallback={<GridSkeleton />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Results({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 100) ?? "";
  const results = q ? searchProducts(q) : [];

  return (
    <>
      <form action="/search" className="mb-8 flex max-w-xl gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search phones, headphones, TVs…"
          aria-label="Search products"
          className="min-w-0 flex-1 rounded-full border border-neutral-200 px-5 py-3 text-sm outline-none focus:border-black"
        />
        <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">Search</button>
      </form>

      {q ? (
        <h1 className="mb-6 text-3xl tracking-tight">
          {results.length} {results.length === 1 ? "result" : "results"} for “{q}”
        </h1>
      ) : (
        <h1 className="mb-6 text-3xl tracking-tight">Search the store</h1>
      )}

      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <div className="rounded-3xl bg-card px-6 py-14 text-center">
          <p className="text-neutral-600">{q ? "No products matched your search." : "Type something above to get started."}</p>
          <p className="mt-6 text-sm text-neutral-500">Browse a category instead:</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs hover:border-black">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
