import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/app/components/ui";
import { GridSkeleton, SortedListing } from "@/components/listing";
import { categories, getCategory, imageUrl, productsInCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const category = getCategory((await params).slug);
  return category ? { title: category.name, description: category.description } : { title: "Category not found" };
}

/** Reading `params` happens inside <Suspense> so navigations show the placeholder instantly. */
export default function CategoryPage({ params, searchParams }: PageProps<"/category/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8" aria-busy="true">
          <div className="mb-6 h-3 w-48 animate-pulse rounded bg-card" />
          <div className="mb-10 h-48 animate-pulse rounded-3xl bg-card" />
          <GridSkeleton count={4} />
        </div>
      }
    >
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CategoryContent({ params, searchParams }: Pick<PageProps<"/category/[slug]">, "params" | "searchParams">) {
  const category = getCategory((await params).slug);
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/products" }, { label: category.name }]} />
      <div className="relative mb-10 overflow-hidden rounded-3xl bg-neutral-900 text-white">
        <Image src={imageUrl(category.image)} alt="" fill sizes="100vw" className="object-cover opacity-50" />
        <div className="relative px-8 py-16 sm:px-12 sm:py-20">
          <h1 className="text-4xl tracking-tight sm:text-5xl">{category.name}</h1>
          <p className="mt-3 max-w-md text-white/80">{category.description}</p>
        </div>
      </div>
      <Suspense fallback={<GridSkeleton count={4} />}>
        <SortedListing searchParams={searchParams} products={productsInCategory(category.slug)} basePath={`/category/${category.slug}`} />
      </Suspense>
    </div>
  );
}
