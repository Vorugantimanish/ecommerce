import Link from "next/link";
import { categories, type Product, sortOptions, sortProducts } from "@/lib/catalog";
import ProductCard from "./product-card";
import SortSelect from "./sort-select";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        <div key={i} className="h-[420px] animate-pulse rounded-2xl bg-card" />
      ))}
    </div>
  );
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** Reads ?sort= (and ?category= when `withCategoryFilter`) — lives inside <Suspense>. */
export async function SortedListing({
  searchParams,
  products,
  basePath,
  withCategoryFilter = false,
}: {
  searchParams: SearchParams;
  products: Product[];
  basePath: string;
  withCategoryFilter?: boolean;
}) {
  const params = await searchParams;
  const sort = one(params.sort) ?? "featured";
  const category = withCategoryFilter ? one(params.category) : undefined;
  const filtered = category ? products.filter((p) => p.category === category) : products;
  const sorted = sortProducts(filtered, sort);
  const sortLabel = sortOptions.find((o) => o.value === sort)?.label ?? "Featured";

  const href = (next: { sort?: string; category?: string }) => {
    const q = new URLSearchParams();
    const s = next.sort ?? sort;
    const c = "category" in next ? next.category : category;
    if (s && s !== "featured") q.set("sort", s);
    if (c) q.set("category", c);
    const str = q.toString();
    return str ? `${basePath}?${str}` : basePath;
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {withCategoryFilter ? (
          <div className="flex flex-wrap gap-2">
            <Chip href={href({ category: undefined })} active={!category}>
              All
            </Chip>
            {categories.map((c) => (
              <Chip key={c.slug} href={href({ category: c.slug })} active={category === c.slug}>
                {c.name}
              </Chip>
            ))}
          </div>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3 text-sm">
          <span className="text-neutral-500">
            {sorted.length} {sorted.length === 1 ? "product" : "products"}
          </span>
          <SortSelect value={sort} label={sortLabel} options={sortOptions.map((o) => ({ ...o, href: href({ sort: o.value }) }))} />
        </div>
      </div>
      {sorted.length ? <ProductGrid products={sorted} /> : <p className="py-20 text-center text-neutral-500">No products here yet.</p>}
    </>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
        active ? "border-black bg-black text-white" : "border-neutral-200 hover:border-black"
      }`}
    >
      {children}
    </Link>
  );
}
