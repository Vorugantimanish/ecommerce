/** All amounts are integer cents to avoid floating-point drift. */
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatMoney(cents: number): string {
  return usd.format(cents / 100);
}
