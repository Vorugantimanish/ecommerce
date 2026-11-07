/**
 * Discount codes. Validated on the server both when a shopper applies one in the cart
 * and again when the order is placed.
 */
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, itemCount, type PricedLine } from "./cart-math";
import { formatMoney } from "./money";

type Coupon = {
  code: string;
  type: "percentage" | "fixed";
  /** Percent (10 = 10%) or cents. */
  value: number;
  minSubtotal?: number;
  minItems?: number;
  description: string;
};

const coupons: Coupon[] = [
  { code: "MANORA10", type: "percentage", value: 10, description: "10% off your order" },
  { code: "WELCOME20", type: "percentage", value: 20, minItems: 2, description: "20% off orders of 2+ items" },
  { code: "SAVE50", type: "fixed", value: 5000, minSubtotal: 50000, description: "$50 off orders over $500" },
];

export type DiscountResult =
  | { ok: true; code: string; label: string; amount: number }
  | { ok: false; error: string };

export function evaluateDiscount(rawCode: string, lines: PricedLine[]): DiscountResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, error: "Enter a discount code" };
  const coupon = coupons.find((c) => c.code === code);
  if (!coupon) return { ok: false, error: "This code doesn't exist" };

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  if (subtotal === 0) return { ok: false, error: "Add something to your cart first" };
  if (coupon.minItems && itemCount(lines) < coupon.minItems) {
    return { ok: false, error: `This code needs at least ${coupon.minItems} items in the cart` };
  }
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return { ok: false, error: `This code needs a subtotal of ${formatMoney(coupon.minSubtotal)} or more` };
  }

  const amount =
    coupon.type === "percentage" ? Math.round((subtotal * coupon.value) / 100) : Math.min(coupon.value, subtotal);
  const label = coupon.type === "percentage" ? `${coupon.value}% off` : `${formatMoney(coupon.value)} off`;
  return { ok: true, code, label, amount };
}

export type Totals = {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

export const TAX_RATE = 0.08;

export function computeTotals(lines: PricedLine[], discount: number): Totals {
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const afterDiscount = Math.max(subtotal - discount, 0);
  const shipping = subtotal === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = Math.round(afterDiscount * TAX_RATE);
  return { subtotal, discount, shipping, tax, total: afterDiscount + shipping + tax };
}
