/**
 * Cart pricing shared by the browser (to display) and the server (to charge). The server
 * always recomputes from the catalog, so these functions are the single definition of a total.
 */
import { getProduct, variantPrice, type Product } from "./catalog";

export type CartLine = {
  slug: string;
  color: number;
  option: number | null;
  quantity: number;
};

export const MAX_QUANTITY = 10;
export const FREE_SHIPPING_THRESHOLD = 9900; // $99
export const SHIPPING_FEE = 999; // $9.99

export function lineKey(line: Pick<CartLine, "slug" | "color" | "option">): string {
  return `${line.slug}|${line.color}|${line.option ?? "-"}`;
}

export type PricedLine = CartLine & {
  key: string;
  product: Product;
  colorName: string;
  optionLabel: string | null;
  unitPrice: number;
  compareAt?: number;
  lineTotal: number;
};

/** Drop lines that no longer match the catalog (removed product, bad index, out of stock). */
export function priceLines(lines: CartLine[]): PricedLine[] {
  const out: PricedLine[] = [];
  for (const line of lines) {
    const product = getProduct(line.slug);
    if (!product || !product.inStock) continue;
    const color = product.colors[line.color];
    if (!color) continue;
    const option = line.option != null ? product.options?.[line.option] : null;
    if (line.option != null && !option) continue;
    if (line.option == null && product.options?.length) continue;
    const quantity = Math.min(Math.max(Math.floor(line.quantity), 1), MAX_QUANTITY);
    const { price, compareAt } = variantPrice(product, line.option);
    out.push({
      ...line,
      quantity,
      key: lineKey(line),
      product,
      colorName: color.name,
      optionLabel: option?.label ?? null,
      unitPrice: price,
      compareAt,
      lineTotal: price * quantity,
    });
  }
  return out;
}

export function itemCount(lines: { quantity: number }[]): number {
  return lines.reduce((n, l) => n + l.quantity, 0);
}
