import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/components/ui";
import ContactForm from "./contact-form";

export const metadata: Metadata = { title: "Contact Us", description: "Get in touch with the Manora team." };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h1 className="text-5xl tracking-tight">Contact Us</h1>
          <p className="mt-4 text-neutral-600">Questions about an order, a product or a return? We&apos;re here to help.</p>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="font-semibold">Email</dt>
              <dd className="text-neutral-600">support@manora.store</dd>
            </div>
            <div>
              <dt className="font-semibold">Phone</dt>
              <dd className="text-neutral-600">+1 (555) 014-2290 · Mon–Fri, 9am–6pm</dd>
            </div>
            <div>
              <dt className="font-semibold">Response time</dt>
              <dd className="text-neutral-600">Within one business day</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
