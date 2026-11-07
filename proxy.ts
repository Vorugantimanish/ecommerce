import { type NextRequest, NextResponse } from "next/server";
import { categories, products } from "./lib/catalog";
import { legalSlugs } from "./lib/legal-slugs";

/**
 * With Cache Components a page streams after its shell is sent, so `notFound()` inside a page
 * shows the 404 UI but can no longer change the HTTP status from 200. Unknown slugs are
 * caught here instead and rewritten to a path no route matches, which answers a real 404.
 */
const known: Record<string, Set<string>> = {
  product: new Set(products.map((p) => p.slug)),
  category: new Set(categories.map((c) => c.slug)),
  legal: new Set<string>(legalSlugs),
};

export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  const valid = known[section];
  if (valid && (!slug || rest.length > 0 || !valid.has(decodeURIComponent(slug)))) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/category/:path*", "/legal/:path*"],
};
