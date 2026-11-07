"use client";

import Link from "next/link";
import { useActionState } from "react";
import { subscribe } from "@/app/newsletter/action";
import { Logo } from "./ui";

const columns = [
  {
    title: "Shop",
    links: [
      ["Smartphones", "/category/smartphones"],
      ["Audio", "/category/audio"],
      ["Gaming", "/category/gaming"],
      ["New Arrivals", "/products?sort=newest"],
      ["TV & Home", "/category/tv-home-theater"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact Us", "/contact"],
      ["All Products", "/products"],
      ["Search", "/search"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Payments", "/legal/payments"],
      ["Shipping", "/legal/shipping"],
      ["Cancellations & Returns", "/legal/returns"],
      ["FAQ", "/faq"],
    ],
  },
  {
    title: "Policy",
    links: [
      ["Terms of Use", "/legal/terms"],
      ["Security", "/legal/security"],
      ["Privacy", "/legal/privacy"],
      ["Sitemap", "/sitemap.xml"],
    ],
  },
];

const socials = [
  { label: "Instagram", d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01" },
  { label: "LinkedIn", d: "M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4 5h4v1.6c.6-1 1.9-1.9 3.6-1.9 3 0 3.4 2 3.4 4.6V20h-4v-5.5c0-1.3 0-2.8-1.8-2.8S12 13 12 14.4V20h-2z" },
  { label: "YouTube", d: "M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Zm7 1v6l5-3Z" },
  { label: "Facebook", d: "M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8Z" },
];

export default function Footer() {
  const [state, action, pending] = useActionState(subscribe, {});

  return (
    <footer className="mt-12 border-t border-neutral-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-neutral-500">
            Manora is your go-to destination for modern electronics. We bring together cutting-edge
            design and premium quality to power your everyday life.
          </p>
          <h4 className="mt-8 font-semibold">Subscribe to Newsletter</h4>
          {state.ok ? (
            <p className="mt-3 text-sm text-green-700">Thanks for subscribing!</p>
          ) : (
            <form action={action} className="mt-3 max-w-sm">
              <div className="flex items-center rounded-full border border-neutral-200 p-1 pl-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
                <button disabled={pending} className="rounded-full bg-black px-5 py-2 text-xs font-semibold text-white disabled:opacity-50">
                  {pending ? "…" : "Submit"}
                </button>
              </div>
              {state.error && <p className="mt-2 text-xs text-red-600">{state.error}</p>}
            </form>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((c) => (
            <div key={c.title}>
              <h4 className="mb-4 font-semibold">{c.title}</h4>
              <ul className="space-y-3 text-sm text-neutral-500">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-black">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-neutral-100 px-4 py-6 sm:flex-row sm:px-8">
        <p className="text-xs text-neutral-500">Copyright © 2026 Manora. All Rights Reserved.</p>
        <div className="flex gap-2">
          {socials.map((s) => (
            <a key={s.label} href="#" aria-label={s.label} className="grid h-8 w-8 place-items-center rounded-full bg-black text-white hover:opacity-80">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d={s.d} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
