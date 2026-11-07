import type { Totals } from "./discounts";

export const ORDER_COOKIE = "manora_last_order";

export type Order = {
  id: string;
  email: string;
  name: string;
  shipTo: string;
  discountCode: string | null;
  items: { slug: string; name: string; image: string; variant: string; quantity: number; lineTotal: number }[];
  itemCount: number;
  totals: Totals;
};
