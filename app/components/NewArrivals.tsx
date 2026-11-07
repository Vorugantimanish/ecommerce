"use client";

import { useRef } from "react";
import ProductCard from "@/components/product-card";
import { getProduct } from "@/lib/catalog";
import { SectionHeader } from "./ui";

/** [slug, featured storage tier] */
const arrivals: [string, number?][] = [
  ["iphone-17", 2],
  ["oneplus-12-pro", 0],
  ["iphone-16-plus"],
  ["galaxy-s25-ultra", 1],
  ["galaxy-z-fold-7", 0],
];

export default function NewArrivals() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <SectionHeader title="New Arrivals" href="/products?sort=newest" />
      <div ref={track} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
        {arrivals.map(([slug, option]) => {
          const product = getProduct(slug);
          return product ? (
            <div key={slug} className="w-[270px] shrink-0 snap-start sm:w-[300px]">
              <ProductCard product={product} option={option} />
            </div>
          ) : null;
        })}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        <button onClick={() => scroll(-1)} aria-label="Previous" className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 hover:bg-neutral-100">
          ←
        </button>
        <button onClick={() => scroll(1)} aria-label="Next" className="grid h-9 w-9 place-items-center rounded-full bg-black text-white hover:opacity-80">
          →
        </button>
      </div>
    </section>
  );
}
