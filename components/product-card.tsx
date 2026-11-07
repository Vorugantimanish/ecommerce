"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/cart/cart-context";
import { getCategory, imageUrl, type Product, variantPrice } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

/**
 * The one product card used everywhere (homepage, shop, categories, search, related).
 * `option` picks a storage/size tier to feature; by default the cheapest (first) tier.
 */
export default function ProductCard({ product, option }: { product: Product; option?: number }) {
  const cart = useCart();
  const tier = product.options?.length ? (option != null && product.options[option] ? option : 0) : null;
  const [color, setColor] = useState(0);
  const { price, compareAt } = variantPrice(product, tier);
  const href = `/product/${product.slug}?${new URLSearchParams({
    ...(tier != null ? { option: String(tier) } : {}),
    ...(color ? { color: String(color) } : {}),
  })}`.replace(/\?$/, "");
  const variantLabel = [product.colors[color]?.name, tier != null ? product.options?.[tier].label : null].filter(Boolean).join(" · ");

  return (
    <article className="group flex h-full flex-col rounded-2xl bg-card p-4">
      <Link href={href} className="relative block aspect-square overflow-hidden rounded-xl bg-white">
        <Image
          src={imageUrl(product.images[0])}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-6 transition duration-500 group-hover:scale-105"
        />
        {!product.inStock ? (
          <span className="absolute top-3 left-3 rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold text-white">Sold out</span>
        ) : (
          compareAt && (
            <span className="absolute top-3 left-3 rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">
              Save {Math.round(((compareAt - price) / compareAt) * 100)}%
            </span>
          )
        )}
      </Link>

      <div className="mt-4 flex flex-1 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] tracking-wide text-neutral-500 uppercase">{getCategory(product.category)?.name}</p>
          <h3 className="mt-0.5 font-semibold leading-snug">
            <Link href={href} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 truncate text-xs text-neutral-500">{variantLabel}</p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2.5">
          <div className="flex gap-1.5" role="radiogroup" aria-label={`${product.name} colour`}>
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                type="button"
                role="radio"
                aria-checked={i === color}
                aria-label={c.name}
                title={c.name}
                onClick={() => setColor(i)}
                className={`h-5 w-5 rounded-full border-2 p-0.5 transition ${i === color ? "border-black" : "border-transparent hover:border-neutral-300"}`}
              >
                <span className="block h-full w-full rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
              </button>
            ))}
          </div>
          <div className="text-right leading-tight">
            <p className="text-lg font-bold">{formatMoney(price)}</p>
            {compareAt && <p className="text-xs text-neutral-400 line-through">{formatMoney(compareAt)}</p>}
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={!product.inStock}
        onClick={() => cart.add({ slug: product.slug, color, option: tier })}
        className="mt-4 w-full rounded-full border border-black py-2.5 text-xs font-semibold transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400 disabled:hover:bg-transparent"
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </article>
  );
}
