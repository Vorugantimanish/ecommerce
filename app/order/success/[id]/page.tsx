import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { imageUrl } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { ORDER_COOKIE, type Order } from "@/lib/order";
import ClearCart from "./clear-cart";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default function OrderSuccessPage({ params }: PageProps<"/order/success/[id]">) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-card" />}>
        <OrderDetails params={params} />
      </Suspense>
    </div>
  );
}

async function OrderDetails({ params }: { params: PageProps<"/order/success/[id]">["params"] }) {
  const { id } = await params;
  let order: Order | null = null;
  try {
    const parsed = JSON.parse((await cookies()).get(ORDER_COOKIE)?.value ?? "null") as Order | null;
    if (parsed?.id === id) order = parsed;
  } catch {}

  return (
    <>
      <ClearCart />
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-black text-2xl text-white">✓</span>
        <h1 className="mt-6 text-4xl tracking-tight">Thank you for your order!</h1>
        <p className="mt-3 text-neutral-500">
          Order <span className="font-semibold text-black">{id}</span>
          {order && (
            <>
              {" "}
              · a confirmation will be sent to <span className="text-black">{order.email}</span>
            </>
          )}
        </p>
      </div>

      {order ? (
        <div className="mt-10 rounded-3xl bg-card p-6 sm:p-8">
          <ul className="divide-y divide-neutral-200">
            {order.items.map((item) => (
              <li key={`${item.slug}-${item.variant}`} className="flex items-center gap-4 py-3">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image src={imageUrl(item.image)} alt={item.name} fill sizes="64px" className="object-contain p-1.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <Link href={`/product/${item.slug}`} className="block truncate text-sm font-medium hover:underline">
                    {item.name}
                  </Link>
                  <span className="block text-xs text-neutral-500">
                    {item.variant} · Qty {item.quantity}
                  </span>
                </span>
                <span className="text-sm font-semibold">{formatMoney(item.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1.5 border-t border-neutral-200 pt-4 text-sm text-neutral-600">
            <Row label="Subtotal" value={formatMoney(order.totals.subtotal)} />
            {order.totals.discount > 0 && <Row label={`Discount (${order.discountCode})`} value={`−${formatMoney(order.totals.discount)}`} />}
            <Row label="Shipping" value={order.totals.shipping === 0 ? "Free" : formatMoney(order.totals.shipping)} />
            <Row label="Tax" value={formatMoney(order.totals.tax)} />
            <div className="flex justify-between pt-2 text-base font-semibold text-black">
              <dt>Total paid</dt>
              <dd>{formatMoney(order.totals.total)}</dd>
            </div>
          </dl>
          <div className="mt-6 rounded-2xl bg-white p-4 text-sm">
            <p className="font-semibold">Shipping to</p>
            <p className="text-neutral-600">
              {order.name}, {order.shipTo}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-10 rounded-3xl bg-card p-6 text-center text-sm text-neutral-600">
          Your order has been placed. The order details are no longer available on this device.
        </p>
      )}

      <div className="mt-10 text-center">
        <Link href="/products" className="rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white">
          Continue Shopping
        </Link>
      </div>
    </>
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
