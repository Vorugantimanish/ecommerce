import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, Stars } from "@/app/components/ui";
import ProductCard from "@/components/product-card";
import { getCategory, getProduct, imageUrl, products, relatedProducts, seededReviews } from "@/lib/catalog";
import ProductDetail from "./product-detail";
import ProductReviews from "./product-reviews";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.tagline, images: [imageUrl(product.images[0])] },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <ProductDetail product={product} />

      <section className="mt-16 grid gap-10 border-t border-neutral-100 pt-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl tracking-tight">Highlights</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-2xl bg-card p-4 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-black text-[10px] text-white">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl tracking-tight">Specifications</h2>
          <dl className="mt-5 divide-y divide-neutral-100 rounded-2xl border border-neutral-100">
            {product.specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-4 px-5 py-3.5 text-sm">
                <dt className="text-neutral-500">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="reviews" className="mt-16 border-t border-neutral-100 pt-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl tracking-tight">Customer Reviews</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
              <Stars rating={product.rating} /> {product.rating} out of 5 · {product.reviewCount.toLocaleString("en-US")} reviews
            </p>
          </div>
        </div>
        <ProductReviews slug={product.slug} seeded={seededReviews(product)} />
      </section>

      <section className="mt-16 border-t border-neutral-100 pt-12">
        <h2 className="mb-6 text-3xl tracking-tight">You may also like</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts(product).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        // biome-ignore lint: structured data for search engines
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: imageUrl(product.images[0]),
            aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: (product.price / 100).toFixed(2),
              availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
