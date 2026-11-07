"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { placeOrder } from "@/app/cart/actions";
import { useCart } from "@/app/cart/cart-context";
import { DiscountField } from "@/app/cart/cart-sidebar";
import { imageUrl } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";

export default function CheckoutForm() {
  const cart = useCart();
  const [state, action, pending] = useActionState(placeOrder, {});

  if (!cart.ready) {
    return <div className="h-96 animate-pulse rounded-3xl bg-card" />;
  }

  if (cart.lines.length === 0) {
    return (
      <div className="rounded-3xl bg-card px-6 py-16 text-center">
        <p className="text-lg font-medium">Your cart is empty</p>
        <Link href="/products" className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const fe = state.fieldErrors ?? {};

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <form action={action} className="space-y-8">
        <input type="hidden" name="lines" value={JSON.stringify(cart.rawLines)} />
        <input type="hidden" name="discountCode" value={cart.discount?.code ?? ""} />

        <fieldset className="space-y-4">
          <legend className="mb-2 text-xl font-semibold">Contact</legend>
          <Field name="email" label="Email" type="email" autoComplete="email" error={fe.email} />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-2 text-xl font-semibold">Shipping address</legend>
          <Field name="name" label="Full name" autoComplete="name" error={fe.name} />
          <Field name="address" label="Address" autoComplete="street-address" error={fe.address} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field name="city" label="City" autoComplete="address-level2" error={fe.city} />
            <Field name="postal" label="Postal code" autoComplete="postal-code" error={fe.postal} />
            <Field name="country" label="Country" autoComplete="country-name" error={fe.country} defaultValue="United States" />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xl font-semibold">Payment</legend>
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-card p-5 text-sm text-neutral-600">
            Demo store: no card is charged. Placing the order shows a confirmation page.
          </div>
        </fieldset>

        {state.error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>}

        <button
          disabled={pending}
          className="w-full rounded-full bg-black py-4 text-sm font-semibold text-white transition hover:opacity-85 disabled:opacity-50"
        >
          {pending ? "Placing order…" : `Place Order · ${formatMoney(cart.totals.total)}`}
        </button>
      </form>

      <aside className="h-fit rounded-3xl bg-card p-6 lg:sticky lg:top-28">
        <h2 className="mb-4 text-xl font-semibold">Order summary</h2>
        <ul className="divide-y divide-neutral-200">
          {cart.lines.map((l) => (
            <li key={l.key} className="flex items-center gap-4 py-3">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                <Image src={imageUrl(l.product.images[0])} alt={l.product.name} fill sizes="64px" className="object-contain p-1.5" />
                <span className="absolute -top-0 -right-0 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                  {l.quantity}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{l.product.name}</span>
                <span className="block text-xs text-neutral-500">{[l.colorName, l.optionLabel].filter(Boolean).join(" · ")}</span>
              </span>
              <span className="text-sm font-semibold">{formatMoney(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <DiscountField />
        </div>
        <dl className="mt-4 space-y-1.5 text-sm text-neutral-600">
          <Row label="Subtotal" value={formatMoney(cart.totals.subtotal)} />
          {cart.discount && <Row label={`Discount (${cart.discount.code})`} value={`−${formatMoney(cart.discount.amount)}`} />}
          <Row label="Shipping" value={cart.totals.shipping === 0 ? "Free" : formatMoney(cart.totals.shipping)} />
          <Row label="Tax (8%)" value={formatMoney(cart.totals.tax)} />
          <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-semibold text-black">
            <dt>Total</dt>
            <dd>{formatMoney(cart.totals.total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Field({
  name,
  label,
  error,
  type = "text",
  autoComplete,
  defaultValue,
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black ${error ? "border-red-400" : "border-neutral-200"}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
