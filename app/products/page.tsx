import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/app/components/ui";
import { GridSkeleton, SortedListing } from "@/components/listing";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse every Nexora product: smartphones, audio, gaming, TVs, laptops and more.",
};

export default function ProductsPage({ searchParams }: PageProps<"/products">) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <h1 className="text-4xl tracking-tight sm:text-5xl">Shop All</h1>
      <p className="mt-3 mb-8 max-w-xl text-neutral-500">Everything in the Nexora line-up, in one place.</p>
      <Suspense fallback={<GridSkeleton />}>
        <SortedListing searchParams={searchParams} products={products} basePath="/products" withCategoryFilter />
      </Suspense>
    </div>
  );
}
