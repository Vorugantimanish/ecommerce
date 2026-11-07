"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/app/cart/cart-context";
import { Stars } from "@/app/components/ui";
import { MAX_QUANTITY } from "@/lib/cart-math";
import { imageUrl, type Product, variantPrice } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

export default function ProductDetail({ product }: { product: Product }) {
  const cart = useCart();
  const [image, setImage] = useState(0);
  const [color, setColor] = useState(0);
  const [option, setOption] = useState<number | null>(product.options?.length ? 0 : null);
  const [quantity, setQuantity] = useState(1);

  // Homepage cards link to a specific tier (?option=1). Read it after mount so the page stays static.
  useEffect(() => {
    const requested = Number(new URLSearchParams(window.location.search).get("option"));
    if (product.options?.[requested]) setOption(requested);
  }, [product.options]);

  const { price, compareAt } = variantPrice(product, option);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-card">
          <Image
            src={imageUrl(product.images[image])}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            loading="eager"
            fetchPriority="high"
          />
          {!product.inStock && (
            <span className="absolute top-4 left-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold">Sold out</span>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setImage(i)}
                aria-label={`Show image ${i + 1}`}
                className={`relative h-20 w-20 overflow-hidden rounded-xl bg-card ring-2 transition ${i === image ? "ring-black" : "ring-transparent hover:ring-neutral-300"}`}
              >
                <Image src={imageUrl(src)} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Buy box */}
      <div className="lg:pt-4">
        <h1 className="text-4xl tracking-tight sm:text-5xl">{product.name}</h1>
        <p className="mt-2 text-neutral-500">{product.tagline}</p>
        <a href="#reviews" className="mt-3 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black">
          <Stars rating={product.rating} /> {product.rating} · {product.reviewCount.toLocaleString("en-US")} reviews
        </a>

        <p className="mt-6 flex items-baseline gap-3">
          <span className="text-3xl font-bold">{formatMoney(price)}</span>
          {compareAt && (
            <>
              <span className="text-lg text-neutral-400 line-through">{formatMoney(compareAt)}</span>
              <span className="rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold text-white">
                Save {formatMoney(compareAt - price)}
              </span>
            </>
          )}
        </p>

        <p className="mt-6 text-sm leading-relaxed text-neutral-600">{product.description}</p>

        <fieldset className="mt-8">
          <legend className="mb-3 text-sm">
            Colour: <span className="font-semibold">{product.colors[color].name}</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColor(i)}
                aria-label={c.name}
                aria-pressed={i === color}
                className={`h-9 w-9 rounded-full border-2 p-0.5 transition ${i === color ? "border-black" : "border-transparent hover:border-neutral-300"}`}
              >
                <span className="block h-full w-full rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
              </button>
            ))}
          </div>
        </fieldset>

        {product.options && (
          <fieldset className="mt-6">
            <legend className="mb-3 text-sm">
              {product.optionName}: <span className="font-semibold">{option != null && product.options[option].label}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.options.map((o, i) => (
                <button
                  key={o.label}
                  onClick={() => setOption(i)}
                  aria-pressed={i === option}
                  className={`rounded-full border px-5 py-2.5 text-sm transition ${
                    i === option ? "border-black bg-black text-white" : "border-neutral-200 hover:border-black"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-neutral-200">
            <button aria-label="Decrease quantity" className="grid h-12 w-12 place-items-center" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span className="w-8 text-center tabular-nums">{quantity}</span>
            <button
              aria-label="Increase quantity"
              className="grid h-12 w-12 place-items-center disabled:opacity-30"
              disabled={quantity >= MAX_QUANTITY}
              onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
            >
              +
            </button>
          </div>
          <button
            disabled={!product.inStock}
            onClick={() => {
              cart.add({ slug: product.slug, color, option }, quantity);
              setQuantity(1);
            }}
            className="h-12 flex-1 rounded-full bg-black px-8 text-sm font-semibold text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {product.inStock ? `Add to Cart · ${formatMoney(price * quantity)}` : "Out of Stock"}
          </button>
        </div>

        <ul className="mt-8 grid gap-3 text-xs text-neutral-600 sm:grid-cols-3">
          {[
            ["Free shipping", "On orders over $99"],
            ["30-day returns", "No questions asked"],
            ["2-year warranty", "On every device"],
          ].map(([t, d]) => (
            <li key={t} className="rounded-2xl bg-card p-4">
              <p className="font-semibold text-black">{t}</p>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
