import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <ellipse
            key={i}
            cx="16"
            cy="8.5"
            rx="3.2"
            ry="7.5"
            fill="currentColor"
            transform={`rotate(${i * 36} 16 16)`}
          />
        ))}
        <circle cx="16" cy="16" r="3" fill="white" />
      </svg>
      <span className="text-xl font-semibold tracking-tight">Manora</span>
    </Link>
  );
}

export function ShopButton({
  light = false,
  className = "",
  href = "/products",
  children = "Shop Now",
}: {
  light?: boolean;
  className?: string;
  href?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold transition hover:opacity-80 ${
        light ? "bg-white text-black" : "bg-black text-white"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

export function SectionHeader({ title, href = "/products", as: Tag = "h2" }: { title: string; href?: string; as?: "h1" | "h2" }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <Tag className="text-3xl font-normal tracking-tight sm:text-4xl">{title}</Tag>
      <Link
        href={href}
        className="shrink-0 rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-medium transition hover:bg-black hover:text-white"
      >
        View All
      </Link>
    </div>
  );
}

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-amber-500 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill={i <= Math.round(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2">
          <path d="m10 1.8 2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-neutral-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-black">
                {item.label}
              </Link>
            ) : (
              <span className="text-black">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ArrowBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-9 w-9 place-items-center rounded-full bg-white text-black shadow-sm ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 7 7 17M7 7v10h10" transform="rotate(180 12 12)" />
      </svg>
    </span>
  );
}

export function ColorDots({ colors }: { colors: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {colors.map((c, i) => (
        <span
          key={c + i}
          className={`h-3 w-3 rounded-full border ${i === 0 ? "border-black" : "border-transparent"}`}
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}
