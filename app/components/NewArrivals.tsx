"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ColorDots, SectionHeader } from "./ui";

const products = [
  { name: "iPhone 17", color: "Mist Black", price: 799.99, old: 899.99, img: "na-iphone17", colors: ["#2b2b2b", "#a9c4e4", "#b9e0cf"], href: "/product/iphone-17?option=2" },
  { name: "OnePlus 12 Pro", color: "Grey", price: 249.99, old: 299.99, img: "na-oneplus12", colors: ["#e8e8e8", "#a9c4e4", "#b9e0cf"], href: "/product/oneplus-12-pro?option=0" },
  { name: "iPhone 16 Plus", color: "Teal", price: 699.99, old: 799.99, img: "na-iphone16plus", colors: ["#b9e0cf", "#a9c4e4", "#111111"], href: "/product/iphone-16-plus" },
  { name: "Galaxy S25 Ultra", color: "Mist Black", price: 999.99, old: 1099.99, img: "na-galaxy", colors: ["#111111", "#a9c4e4", "#b9e0cf"], href: "/product/galaxy-s25-ultra?option=1" },
  { name: "Galaxy Z Fold 7", color: "Slate Blue", price: 1799.99, old: 1999.99, img: "banner-fold", colors: ["#5b7f9e", "#111111", "#d9d9d9"], href: "/product/galaxy-z-fold-7" },
];

export default function NewArrivals() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <SectionHeader title="New Arrivals" href="/products?sort=newest" />
      <div ref={track} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
        {products.map((p) => (
          <Link href={p.href} key={p.name + p.color} className="w-[260px] shrink-0 snap-start rounded-2xl bg-card p-4 transition hover:shadow-md sm:w-[290px]">
            <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-white">
              <Image src={`/images/${p.img}.jpg`} alt={p.name} fill sizes="290px" className="object-cover transition duration-500 hover:scale-105" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-xs text-neutral-500">{p.color}</p>
                <p className="mt-2 text-lg font-bold">
                  ${p.price.toFixed(2)}{" "}
                  <span className="text-xs font-normal text-neutral-400 line-through">${p.old.toFixed(2)}</span>
                </p>
              </div>
              <ColorDots colors={p.colors} />
            </div>
          </Link>
        ))}
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
