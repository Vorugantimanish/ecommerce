"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useCart } from "@/app/cart/cart-context";
import { imageUrl, lowestPrice, searchProducts } from "@/lib/catalog";
import { formatMoney } from "@/lib/money";
import { Logo } from "./ui";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Shop", href: "/products" },
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Contact Us", href: "/contact" },
];

function NavLinks({ pathname }: { pathname: string | null }) {
  return (
    <nav className="hidden items-center gap-8 text-sm lg:flex">
      {links.map((l) => {
        const active =
          pathname != null &&
          (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href.split("?")[0]) && l.label !== "New Arrivals");
        return (
          <Link key={l.label} href={l.href} className={active ? "font-semibold" : "text-neutral-600 hover:text-black"}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Reads the URL, so it sits in <Suspense>: the rest of the header stays in the static shell. */
function ActiveNavLinks() {
  return <NavLinks pathname={usePathname()} />;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const cart = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-8">
        <Logo />

        <Suspense fallback={<NavLinks pathname={null} />}>
          <ActiveNavLinks />
        </Suspense>

        <div className="flex items-center gap-3">
          <SearchBox className="hidden md:block" />
          <IconLink label="Wishlist" href="/products?sort=rating">
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
          </IconLink>
          <button
            aria-label={`Cart, ${cart.count} items`}
            onClick={cart.open}
            className="relative grid h-9 w-9 place-items-center rounded-full border border-neutral-200 hover:bg-neutral-100"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M6 7h12l-1 12H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            {cart.count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {cart.count}
              </span>
            )}
          </button>
          <span className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image src="/images/avatar-3.jpg" alt="Profile" fill sizes="36px" className="object-cover" />
          </span>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-3 border-t border-neutral-100 px-4 py-4 text-sm lg:hidden">
          <SearchBox className="md:hidden" onNavigate={() => setOpen(false)} />
          {links.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function SearchBox({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  const wrap = useRef<HTMLDivElement>(null);
  const results = q.trim().length >= 2 ? searchProducts(q).slice(0, 5) : [];
  const show = focused && q.trim().length >= 2;

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const go = (href: string) => {
    setFocused(false);
    setQ("");
    onNavigate?.();
    router.push(href);
  };

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (active >= 0 && results[active]) return go(`/product/${results[active].slug}`);
          if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`);
        }}
        className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(-1);
            setFocused(true);
          }}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, -1));
            } else if (e.key === "Escape") setFocused(false);
          }}
          placeholder="Search"
          aria-label="Search products"
          className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500 md:w-36"
        />
      </form>
      {show && (
        <div className="absolute top-full right-0 z-50 mt-2 w-full min-w-72 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-neutral-500">No products match “{q}”.</p>
          ) : (
            <ul>
              {results.map((p, i) => (
                <li key={p.slug}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(`/product/${p.slug}`)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${i === active ? "bg-neutral-100" : ""}`}
                  >
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <Image src={imageUrl(p.images[0])} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{p.name}</span>
                      <span className="block text-xs text-neutral-500">{formatMoney(lowestPrice(p))}</span>
                    </span>
                  </button>
                </li>
              ))}
              <li className="border-t border-neutral-100">
                <button onClick={() => go(`/search?q=${encodeURIComponent(q.trim())}`)} className="w-full px-4 py-3 text-left text-xs font-semibold">
                  See all results for “{q}” →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function IconLink({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} aria-label={label} className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 hover:bg-neutral-100">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        {children}
      </svg>
    </Link>
  );
}
