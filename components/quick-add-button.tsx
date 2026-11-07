"use client";

import { useCart } from "@/app/cart/cart-context";

/** Adds the default variant (first colour, first option) — the same choice the product page starts on. */
export default function QuickAddButton({ slug, hasOptions }: { slug: string; hasOptions: boolean }) {
  const cart = useCart();
  return (
    <button
      onClick={() => cart.add({ slug, color: 0, option: hasOptions ? 0 : null })}
      className="w-full rounded-full border border-black py-2 text-xs font-semibold transition hover:bg-black hover:text-white"
    >
      Quick Add
    </button>
  );
}
