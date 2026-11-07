"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { imageUrl } from "@/lib/catalog";
import { FREE_SHIPPING_THRESHOLD, MAX_QUANTITY } from "@/lib/cart-math";
import { formatMoney } from "@/lib/money";
import { useCart } from "./cart-context";

export default function CartSidebar() {
  const cart = useCart();
  const { isOpen, close } = cart;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const remaining = FREE_SHIPPING_THRESHOLD - (cart.totals.subtotal - cart.totals.discount);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
          <h2 className="text-xl font-semibold">
            Your Cart {cart.count > 0 && <span className="text-neutral-400">({cart.count})</span>}
          </h2>
          <button onClick={close} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full hover:bg-neutral-100">
            ✕
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm text-neutral-500">Find something you love in our latest line-up.</p>
            <Link href="/products" onClick={close} className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="px-6 pt-4">
              {remaining > 0 ? (
                <p className="text-xs text-neutral-600">
                  Add <span className="font-semibold">{formatMoney(remaining)}</span> more for free shipping
                </p>
              ) : (
                <p className="text-xs font-medium text-green-700">You&apos;ve unlocked free shipping</p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-black transition-all"
                  style={{ width: `${Math.min(100, ((cart.totals.subtotal - cart.totals.discount) / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-neutral-100 overflow-y-auto px-6">
              {cart.lines.map((line) => (
                <li key={line.key} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${line.slug}`}
                    onClick={close}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100"
                  >
                    <Image src={imageUrl(line.product.images[0])} alt={line.product.name} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/product/${line.slug}`} onClick={close} className="font-semibold hover:underline">
                        {line.product.name}
                      </Link>
                      <p className="shrink-0 font-semibold">{formatMoney(line.lineTotal)}</p>
                    </div>
                    <p className="text-xs text-neutral-500">{[line.colorName, line.optionLabel].filter(Boolean).join(" · ")}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-neutral-200">
                        <button
                          aria-label="Decrease quantity"
                          className="grid h-8 w-8 place-items-center"
                          onClick={() => cart.setQuantity(line.key, line.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{line.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          className="grid h-8 w-8 place-items-center disabled:opacity-30"
                          disabled={line.quantity >= MAX_QUANTITY}
                          onClick={() => cart.setQuantity(line.key, line.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button onClick={() => cart.remove(line.key)} className="text-xs text-neutral-500 underline hover:text-black">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-neutral-100 px-6 py-5">
              <DiscountField />
              <dl className="mt-4 space-y-1.5 text-sm">
                <Row label="Subtotal" value={formatMoney(cart.totals.subtotal)} />
                {cart.discount && <Row label={`Discount (${cart.discount.code})`} value={`−${formatMoney(cart.discount.amount)}`} accent />}
                <Row label="Shipping" value={cart.totals.shipping === 0 ? "Free" : formatMoney(cart.totals.shipping)} />
                <Row label="Estimated tax" value={formatMoney(cart.totals.tax)} />
                <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-semibold">
                  <dt>Total</dt>
                  <dd>{formatMoney(cart.totals.total)}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                onClick={close}
                className="mt-4 block rounded-full bg-black py-3.5 text-center text-sm font-semibold text-white hover:opacity-85"
              >
                Checkout
              </Link>
              <button onClick={close} className="mt-2 w-full py-2 text-center text-xs text-neutral-500 hover:text-black">
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`flex justify-between ${accent ? "text-green-700" : "text-neutral-600"}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function DiscountField() {
  const cart = useCart();
  const [value, setValue] = useState("");

  if (cart.discount) {
    return (
      <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 text-sm">
        <span>
          <span className="font-semibold">{cart.discount.code}</span> · {cart.discount.label}
        </span>
        <button onClick={cart.removeCode} className="text-xs underline">
          Remove
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) cart.applyCode(value);
      }}
    >
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Discount code"
          aria-label="Discount code"
          className="min-w-0 flex-1 rounded-full border border-neutral-200 px-4 py-2 text-sm uppercase outline-none placeholder:normal-case focus:border-black"
        />
        <button
          disabled={cart.discountPending || !value.trim()}
          className="rounded-full border border-black px-4 py-2 text-xs font-semibold disabled:opacity-40"
        >
          {cart.discountPending ? "Checking…" : "Apply"}
        </button>
      </div>
      {cart.discountError && <p className="mt-2 text-xs text-red-600">{cart.discountError}</p>}
    </form>
  );
}
