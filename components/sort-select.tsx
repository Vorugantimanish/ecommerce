"use client";

import { useRouter } from "next/navigation";

export default function SortSelect({ value, options }: { value: string; options: { value: string; label: string; href: string }[] }) {
  const router = useRouter();
  return (
    <label className="flex items-center gap-2">
      <span className="text-neutral-500">Sort by</span>
      <select
        value={value}
        onChange={(e) => {
          const next = options.find((o) => o.value === e.target.value);
          if (next) router.push(next.href, { scroll: false });
        }}
        className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm outline-none focus:border-black"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
