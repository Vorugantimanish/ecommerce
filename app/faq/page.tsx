import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/app/components/ui";

export const metadata: Metadata = { title: "FAQ", description: "Answers to common questions about shopping at Nexora." };

const faqs: { section: string; items: [string, string][] }[] = [
  {
    section: "Orders & Payment",
    items: [
      ["Which payment methods do you accept?", "We accept all major credit and debit cards, Apple Pay and Google Pay."],
      ["How do I use a discount code?", "Open your cart and enter the code in the “Discount code” field, then select Apply. Try NEXORA10 for 10% off your order."],
      ["Can I change or cancel my order?", "Orders can be changed or cancelled within one hour of purchase. Contact us as soon as possible and we'll do our best to help."],
    ],
  },
  {
    section: "Shipping",
    items: [
      ["How much is shipping?", "Shipping is free on orders over $99. Otherwise a flat $9.99 rate applies."],
      ["How long does delivery take?", "Most orders arrive within 2–4 business days. You'll receive tracking details by email once your order ships."],
    ],
  },
  {
    section: "Returns & Warranty",
    items: [
      ["What is your return policy?", "You can return any item within 30 days of delivery for a full refund, as long as it's in its original condition."],
      ["Do products come with a warranty?", "Every device we sell includes a 2-year Nexora warranty covering manufacturing defects."],
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <h1 className="text-5xl tracking-tight">Frequently Asked Questions</h1>
      <div className="mt-10 space-y-10">
        {faqs.map((group) => (
          <section key={group.section}>
            <h2 className="mb-3 text-xl font-semibold">{group.section}</h2>
            <div className="divide-y divide-neutral-100 rounded-2xl border border-neutral-100">
              {group.items.map(([q, a]) => (
                <details key={q} className="group px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {q}
                    <span className="text-xl text-neutral-400 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-12 text-sm text-neutral-600">
        Still have questions?{" "}
        <Link href="/contact" className="font-semibold underline">
          Contact us
        </Link>
        .
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.flatMap((g) =>
              g.items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
            ),
          }),
        }}
      />
    </div>
  );
}
