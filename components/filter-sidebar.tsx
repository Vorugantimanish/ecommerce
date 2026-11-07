"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type CategoryOption = { slug: string; name: string; count: number; checked: boolean; href: string };

/** Classic left-hand filter column: each checkbox navigates to the URL with that filter toggled. */
export default function FilterSidebar({
  categories,
  stock,
  clearHref,
}: {
  categories: CategoryOption[];
  stock: { checked: boolean; href: string };
  clearHref: string | null;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const go = (href: string) => start(() => router.push(href, { scroll: false }));

  const body = (
    <div className={`space-y-8 transition-opacity ${pending ? "opacity-60" : ""}`}>
      <fieldset>
        <legend className="mb-3 flex w-full items-center justify-between text-sm font-semibold">
          Categories
          {clearHref && (
            <button type="button" onClick={() => go(clearHref)} className="text-xs font-normal text-neutral-500 underline hover:text-black">
              Clear all
            </button>
          )}
        </legend>
        <ul className="space-y-1">
          {categories.map((c) => (
            <li key={c.slug}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 text-sm hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={c.checked}
                  onChange={() => go(c.href)}
                  className="h-4 w-4 cursor-pointer rounded accent-black"
                />
                <span className="flex-1">{c.name}</span>
                <span className="text-xs text-neutral-400">{c.count}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Availability</legend>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 text-sm hover:bg-neutral-50">
          <input type="checkbox" checked={stock.checked} onChange={() => go(stock.href)} className="h-4 w-4 cursor-pointer rounded accent-black" />
          In stock only
        </label>
      </fieldset>
    </div>
  );

  return (
    <aside aria-label="Filters" className="lg:sticky lg:top-28 lg:self-start">
      {/* Phones/tablets: collapsible; desktop: always open */}
      <details className="rounded-2xl border border-neutral-100 p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold">Filters</summary>
        <div className="mt-4">{body}</div>
      </details>
      <div className="hidden rounded-2xl border border-neutral-100 p-5 lg:block">{body}</div>
    </aside>
  );
}
