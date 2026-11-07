import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/app/components/ui";
import { legalSlugs } from "@/lib/legal-slugs";

const pages: Record<(typeof legalSlugs)[number], { title: string; sections: [string, string][] }> = {
  terms: {
    title: "Terms of Use",
    sections: [
      ["Using this site", "By using the Nexora website you agree to these terms. Please read them carefully before placing an order."],
      ["Orders", "All orders are subject to availability and confirmation of the order price. We may refuse or cancel an order at our discretion, in which case any payment is refunded in full."],
      ["Pricing", "Prices are shown in US dollars and include applicable discounts. Tax is calculated at checkout."],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      ["What we collect", "We collect the details you give us when you place an order, contact us or subscribe to our newsletter: your name, email and shipping address."],
      ["How we use it", "We use your information only to process orders, answer your questions and, if you opted in, send our newsletter. We never sell your data."],
      ["Your choices", "You can unsubscribe from emails at any time and ask us to delete your data by contacting support."],
    ],
  },
  security: {
    title: "Security",
    sections: [
      ["Secure connections", "Every page on Nexora is served over HTTPS so your information is encrypted in transit."],
      ["Payments", "Card details are handled by our payment provider and are never stored on our servers."],
    ],
  },
  shipping: {
    title: "Shipping",
    sections: [
      ["Rates", "Free standard shipping on orders over $99. Orders under $99 ship for a flat $9.99."],
      ["Delivery times", "Most orders are delivered within 2–4 business days. Tracking is emailed when your order ships."],
    ],
  },
  returns: {
    title: "Cancellations & Returns",
    sections: [
      ["Cancellations", "You can cancel an order within one hour of placing it by contacting support."],
      ["Returns", "Return any item within 30 days of delivery in its original condition for a full refund to your original payment method."],
      ["Damaged items", "If something arrives damaged, contact us within 7 days and we'll send a replacement at no cost."],
    ],
  },
  payments: {
    title: "Payments",
    sections: [
      ["Accepted methods", "Visa, Mastercard, American Express, Apple Pay and Google Pay."],
      ["When you're charged", "Your payment is taken when you place your order."],
    ],
  },
};

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

const pageFor = (slug: string) => (legalSlugs as readonly string[]).includes(slug) ? pages[slug as (typeof legalSlugs)[number]] : undefined;

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const page = pageFor((await params).slug);
  return { title: page?.title ?? "Not found" };
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const page = pageFor((await params).slug);
  if (!page) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />
      <h1 className="text-5xl tracking-tight">{page.title}</h1>
      <p className="mt-3 text-sm text-neutral-500">Last updated: November 2026</p>
      <div className="mt-10 space-y-8">
        {page.sections.map(([h, p]) => (
          <section key={h}>
            <h2 className="text-xl font-semibold">{h}</h2>
            <p className="mt-2 leading-relaxed text-neutral-600">{p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
