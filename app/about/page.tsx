import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs, ShopButton } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description: "Manora brings cutting-edge electronics and honest service together.",
};

const stats = [
  ["19K+", "Happy reviews"],
  ["120+", "Products"],
  ["48 h", "Average delivery"],
  ["2 yr", "Warranty on everything"],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-5xl leading-tight tracking-tight">
            Tech that fits
            <br />
            your everyday
          </h1>
          <p className="mt-6 max-w-md text-neutral-600">
            Manora started with a simple idea: buying great electronics should feel as good as using them. We hand-pick
            every product, test it ourselves, and back it with fast delivery, easy returns and real people on support.
          </p>
          <ShopButton className="mt-8 px-7 py-3 text-sm" />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-card">
          <Image src="/images/banner-tv.jpg" alt="A living room with a Manora TV" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(([n, l]) => (
          <div key={l} className="rounded-3xl bg-card p-8">
            <p className="text-4xl font-semibold">{n}</p>
            <p className="mt-1 text-sm text-neutral-500">{l}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          ["Curated, not cluttered", "We stock fewer products and test every one, so you never have to wade through hundreds of near-identical options."],
          ["Honest pricing", "Clear prices, real discounts and no surprise fees at checkout. Free shipping on orders over $99."],
          ["Support that answers", "Questions before or after you buy? Our team replies within one business day."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-3xl border border-neutral-100 p-8">
            <h2 className="text-xl font-semibold">{t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
