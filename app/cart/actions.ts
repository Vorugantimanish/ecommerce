"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type CartLine, itemCount, priceLines } from "@/lib/cart-math";
import { computeTotals, evaluateDiscount } from "@/lib/discounts";
import { ORDER_COOKIE, type Order } from "@/lib/order";

/** Lines arrive from the browser, so treat them as untrusted input. */
function parseLines(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((l): l is Record<string, unknown> => typeof l === "object" && l !== null)
    .map((l) => ({
      slug: String(l.slug ?? ""),
      color: Number(l.color),
      option: l.option == null ? null : Number(l.option),
      quantity: Number(l.quantity),
    }))
    .filter((l) => l.slug && Number.isInteger(l.color) && (l.option === null || Number.isInteger(l.option)) && l.quantity > 0)
    .slice(0, 50);
}

export async function applyDiscountCode(code: string, lines: CartLine[]) {
  return evaluateDiscount(String(code ?? "").slice(0, 40), priceLines(parseLines(lines)));
}

export type CheckoutState = { error?: string; fieldErrors?: Record<string, string> };

const required = ["email", "name", "address", "city", "postal", "country"] as const;

export async function placeOrder(_prev: CheckoutState, form: FormData): Promise<CheckoutState> {
  let rawLines: unknown;
  try {
    rawLines = JSON.parse(String(form.get("lines") ?? "[]"));
  } catch {
    return { error: "Your cart could not be read. Please refresh and try again." };
  }
  const lines = priceLines(parseLines(rawLines));
  if (!lines.length) return { error: "Your cart is empty or its items are no longer available." };

  const fields = Object.fromEntries(required.map((k) => [k, String(form.get(k) ?? "").trim().slice(0, 200)])) as Record<
    (typeof required)[number],
    string
  >;
  const fieldErrors: Record<string, string> = {};
  for (const k of required) if (!fields[k]) fieldErrors[k] = "Required";
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) fieldErrors.email = "Enter a valid email";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const code = String(form.get("discountCode") ?? "");
  const discount = code ? evaluateDiscount(code, lines) : null;
  if (discount && !discount.ok) return { error: `Discount code: ${discount.error}` };

  const totals = computeTotals(lines, discount?.ok ? discount.amount : 0);
  const id = `NX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const order: Order = {
    id,
    email: fields.email,
    name: fields.name,
    shipTo: `${fields.address}, ${fields.city} ${fields.postal}, ${fields.country}`,
    discountCode: discount?.ok ? discount.code : null,
    items: lines.map((l) => ({
      slug: l.slug,
      name: l.product.name,
      image: l.product.images[0],
      variant: [l.colorName, l.optionLabel].filter(Boolean).join(" · "),
      quantity: l.quantity,
      lineTotal: l.lineTotal,
    })),
    itemCount: itemCount(lines),
    totals,
  };

  (await cookies()).set(ORDER_COOKIE, JSON.stringify(order), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect(`/order/success/${id}`);
}
