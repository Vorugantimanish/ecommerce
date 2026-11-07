import { categories, type Product, sortOptions, sortProducts } from "@/lib/catalog";
import FilterSidebar from "./filter-sidebar";
import ProductCard from "./product-card";
import SortSelect from "./sort-select";

export function ProductGrid({ products, columns = "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" }: { products: Product[]; columns?: string }) {
  return (
    <div className={`grid gap-4 ${columns}`}>
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-[440px] animate-pulse rounded-2xl bg-card" />
      ))}
    </div>
  );
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** Reads ?sort=, and with `withFilters` also ?category=a,b and ?stock=1 — lives inside <Suspense>. */
export async function SortedListing({
  searchParams,
  products,
  basePath,
  withFilters = false,
}: {
  searchParams: SearchParams;
  products: Product[];
  basePath: string;
  withFilters?: boolean;
}) {
  const params = await searchParams;
  const sort = one(params.sort) ?? "featured";
  const known = new Set(categories.map((c) => c.slug));
  const selected = withFilters ? (one(params.category) ?? "").split(",").filter((c) => known.has(c)) : [];
  const inStockOnly = withFilters && one(params.stock) === "1";

  const filtered = products.filter(
    (p) => (selected.length === 0 || selected.includes(p.category)) && (!inStockOnly || p.inStock),
  );
  const sorted = sortProducts(filtered, sort);

  const query = (next: { sort?: string; category?: string[]; stock?: boolean }) => {
    const q = new URLSearchParams();
    const s = next.sort ?? sort;
    const c = next.category ?? selected;
    const st = next.stock ?? inStockOnly;
    if (s !== "featured") q.set("sort", s);
    if (c.length) q.set("category", c.join(","));
    if (st) q.set("stock", "1");
    const str = q.toString();
    return str ? `${basePath}?${str}` : basePath;
  };

  const toolbar = (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm">
      <span className="text-neutral-500">
        {sorted.length} {sorted.length === 1 ? "product" : "products"}
      </span>
      <SortSelect value={sort} options={sortOptions.map((o) => ({ ...o, href: query({ sort: o.value }) }))} />
    </div>
  );

  const results = sorted.length ? (
    <ProductGrid products={sorted} columns={withFilters ? "sm:grid-cols-2 xl:grid-cols-3" : undefined} />
  ) : (
    <p className="rounded-2xl bg-card py-20 text-center text-neutral-500">No products match these filters.</p>
  );

  if (!withFilters) {
    return (
      <>
        {toolbar}
        {results}
      </>
    );
  }

  const counts = Object.fromEntries(categories.map((c) => [c.slug, products.filter((p) => p.category === c.slug).length]));

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <FilterSidebar
        categories={categories.map((c) => ({
          slug: c.slug,
          name: c.name,
          count: counts[c.slug],
          checked: selected.includes(c.slug),
          href: query({ category: selected.includes(c.slug) ? selected.filter((s) => s !== c.slug) : [...selected, c.slug] }),
        }))}
        stock={{ checked: inStockOnly, href: query({ stock: !inStockOnly }) }}
        clearHref={selected.length || inStockOnly ? query({ category: [], stock: false }) : null}
      />
      <div>
        {toolbar}
        {results}
      </div>
    </div>
  );
}
