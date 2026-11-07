import Image from "next/image";
import Link from "next/link";
import { getCategory, imageUrl, lowestPrice, type Product, variantPrice } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { ColorDots, Stars } from "@/app/components/ui";
import QuickAddButton from "./quick-add-button";

export default function ProductCard({ product }: { product: Product }) {
  const from = lowestPrice(product);
  const { compareAt } = variantPrice(product, product.options?.length ? 0 : null);
  const hasOptions = !!product.options?.length;

  return (
    <article className="group relative flex flex-col rounded-2xl bg-card p-4">
      <Link href={`/product/${product.slug}`} className="relative mb-4 block aspect-square overflow-hidden rounded-xl bg-white">
        <Image
          src={imageUrl(product.images[0])}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[11px] font-semibold">Sold out</span>
        )}
        {product.inStock && compareAt && (
          <span className="absolute top-3 left-3 rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">
            Save {Math.round(((compareAt - from) / compareAt) * 100)}%
          </span>
        )}
      </Link>
      <div className="flex flex-1 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] tracking-wide text-neutral-500 uppercase">{getCategory(product.category)?.name}</p>
          <h3 className="mt-0.5 font-semibold">
            <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0">
              {product.name}
            </Link>
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
            <Stars rating={product.rating} /> {product.rating} ({product.reviewCount.toLocaleString("en-US")})
          </div>
          <p className="mt-2 text-lg font-bold">
            {hasOptions && <span className="text-xs font-normal text-neutral-500">From </span>}
            {formatMoney(from)}{" "}
            {compareAt && <span className="text-xs font-normal text-neutral-400 line-through">{formatMoney(compareAt)}</span>}
          </p>
        </div>
        <ColorDots colors={product.colors.map((c) => c.hex)} />
      </div>
      {product.inStock && (
        <div className="relative z-10 mt-3">
          <QuickAddButton slug={product.slug} hasOptions={hasOptions} />
        </div>
      )}
    </article>
  );
}
