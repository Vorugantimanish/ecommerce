import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { getProduct } from "@/lib/catalog";
import NewArrivals from "./components/NewArrivals";
import { ArrowBadge, SectionHeader, ShopButton } from "./components/ui";

const img = (name: string) => `/images/${name}.jpg`;

export default function Home() {
  return (
    <>
      <Hero />
      <BestPicks />
      <NewArrivals />
      <FoldBanner />
      <ShopByCategory />
      <Promos />
      <TopTrending />
      <IphoneBanner />
      <GreatDeals />
      <TvBanner />
      <LatestLineup />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-12 sm:px-8 md:grid-cols-2">
      <div>
        <h1 className="text-5xl leading-[1.05] font-normal tracking-tight sm:text-6xl lg:text-7xl">
          Redefining
          <br />
          Everyday Tech
        </h1>
        <p className="mt-6 max-w-md text-sm text-neutral-500">
          Experience next-level comfort, design, and innovation with Manora&apos;s modern
          electronics—made to elevate your lifestyle.
        </p>
        <div className="mt-8 flex flex-col items-start gap-6">
          <ShopButton className="px-7 py-3 text-sm" />
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                  <Image src={img(`avatar-${n}`)} alt="" fill sizes="40px" className="object-cover" />
                </span>
              ))}
            </div>
            <div className="text-sm leading-tight">
              <p className="font-bold text-red-500">19K+</p>
              <p className="text-neutral-600">Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* The whole group (circle + photo) fades out over its bottom fifth, so the cropped
          shoulders dissolve into the page instead of ending on a hard line. */}
      <div className="relative mx-auto w-full max-w-[660px] [mask-image:linear-gradient(to_bottom,black_78%,transparent)]">
        {/* Muted semicircle behind the model, arc running shoulder → ears → shoulder. */}
        <span
          aria-hidden
          className="absolute bottom-0 left-1/2 aspect-[2/1] w-[84%] -translate-x-1/2 rounded-t-full bg-[#f2f0ec]"
        />
        <Image
          src="/images/hero-model.png"
          alt="Woman wearing cream over-ear headphones"
          width={600}
          height={400}
          sizes="(min-width: 768px) 660px, 100vw"
          className="relative h-auto w-full"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

/* ---------------- Best Picks ---------------- */

function Tile({
  src,
  alt,
  className = "",
  children,
  badge = "arrow",
  href,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  badge?: "arrow" | "cube" | "none";
  href?: string;
}) {
  const cls = `group relative block overflow-hidden rounded-2xl bg-card ${className}`;
  const content = (
    <>
      <Image src={img(src)} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
      {badge === "arrow" && <ArrowBadge className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      {badge === "cube" && (
        <span className="absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-black">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v18M4 7.5l8 4.5 8-4.5" />
          </svg>
        </span>
      )}
      {children}
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {content}
    </Link>
  ) : (
    <div className={cls}>{content}</div>
  );
}

function BestPicks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <SectionHeader title="Best Picks For You" href="/products?sort=rating" />
      <div className="grid gap-3 md:grid-cols-2">
        <Tile src="pick-earbuds-hand" alt="Hand holding wireless earbuds" className="h-[320px]" href="/product/airbeats-pro-buds" />
        <Tile src="pick-controller" alt="Hands holding a game controller" className="h-[320px]" href="/product/shadowplay-gamepad" />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        <Tile src="pick-airbeats" alt="AirBeats Pro Buds" badge="none" className="h-[240px] lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl">AirBeats Pro Buds</h3>
            <p className="mt-1 text-xs text-white/70">Pocket-sized sound perfection</p>
            <ShopButton light className="mt-4" href="/product/airbeats-pro-buds" />
          </div>
        </Tile>
        <Tile src="pick-vr" alt="VR headset" badge="cube" className="h-[240px] lg:row-span-2 lg:h-auto" href="/product/vision-vr-headset" />
        <Tile src="pick-tablet" alt="Tablet" badge="cube" className="h-[240px]" href="/product/manora-tab-pro" />
        <Tile src="pick-speaker" alt="Smart cylinder speaker" className="h-[240px] lg:col-span-2" href="/product/cylinder-audio-core" />
        <Tile src="pick-watch" alt="Smart watches" badge="cube" className="h-[240px]" href="/product/pulse-smartwatch" />
      </div>
    </section>
  );
}

/* ---------------- Galaxy Z Fold banner ---------------- */

function FoldBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      {/* The photo's own navy backdrop (#16213f) fills the banner; on desktop the text sits over
          its empty left side, on phones the text stacks above the photo. */}
      <div className="relative flex flex-col-reverse overflow-hidden rounded-3xl bg-[#16213f] text-white md:block md:min-h-[460px]">
        <div className="relative aspect-[996/600] md:absolute md:inset-0 md:aspect-auto">
          <Image
            src={img("banner-fold-7")}
            alt="Galaxy Z Fold 7 standing half-open, playing a video"
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-right"
          />
          {/* phones: blend the photo's lighter top edge into the text block above it */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#16213f] to-transparent md:hidden" />
        </div>
        <span className="pointer-events-none absolute -bottom-10 -left-4 hidden text-[13rem] leading-none font-black text-white/[0.06] select-none md:block">
          Galaxy
        </span>
        <div className="relative z-10 flex flex-col justify-center p-8 sm:p-12 md:min-h-[460px] md:w-1/2">
          <h2 className="text-4xl tracking-tight sm:text-5xl">Galaxy Z Fold 7</h2>
          <p className="mt-4 max-w-sm text-sm text-white/75">
            Experience futuristic multitasking, ultra-smooth foldable display, and cutting-edge
            performance with the new Galaxy Z Fold 7 — innovation in your hands.
          </p>
          <ShopButton light className="mt-8 self-start" href="/product/galaxy-z-fold-7" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Shop By Category ---------------- */

const categories = [
  { name: "Cylinder Audio Core", price: 299.99, img: "cat-speaker", href: "/category/audio" },
  { name: "AirBeats Pro Buds", price: 149.99, img: "cat-buds", href: "/product/airbeats-pro-buds" },
  { name: "ShadowPlay GamePad", price: 99.99, img: "cat-gamepad", href: "/category/gaming" },
  { name: "NeoZoom 4k Lens", price: 149.99, img: "cat-lens", href: "/category/cameras" },
];

function ShopByCategory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <SectionHeader title="Shop By Category" href="/products" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.name} href={c.href} className="group relative h-[300px] overflow-hidden rounded-2xl bg-neutral-900">
            <Image src={img(c.img)} alt={c.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-xs text-white/70">
                From <span className="text-sm font-bold text-white">${c.price.toFixed(2)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Promo banners ---------------- */

function Promos() {
  const promos = [
    { title: ["Sound Of", "Pure", "Celebration"], img: "promo-celebration", bg: "bg-[#ebe7dc]", href: "/category/audio" },
    { title: ["Next-Gen", "Noise", "Cancellation"], img: "promo-anc", bg: "bg-[#f3f3f3]", href: "/product/manora-studio-anc" },
  ];
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-8 md:grid-cols-2">
      {promos.map((p) => (
        <div key={p.img} className={`grid grid-cols-2 overflow-hidden rounded-3xl ${p.bg}`}>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <h3 className="text-2xl leading-tight sm:text-3xl">
              {p.title.map((t) => (
                <span key={t} className="block">
                  {t}
                </span>
              ))}
            </h3>
            <p className="mt-3 text-xs text-neutral-500">Save up to 30% on Headphones &amp; Earbuds.</p>
            <ShopButton className="mt-5 self-start" href={p.href} />
          </div>
          <div className="relative min-h-[260px]">
            <Image src={img(p.img)} alt={p.title.join(" ")} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </div>
        </div>
      ))}
    </section>
  );
}

/* ---------------- Top Trending ---------------- */

/** [slug, featured storage tier] */
const trending: [string, number?][] = [
  ["iphone-17", 1],
  ["oneplus-12-pro", 1],
  ["galaxy-s25-ultra", 0],
  ["iphone-15-pro-max"],
  ["galaxy-s24-fe"],
  ["hyperview-smartphone"],
];

function CardGrid({ items, className }: { items: [string, number?][]; className: string }) {
  return (
    <div className={`grid gap-4 ${className}`}>
      {items.map(([slug, option]) => {
        const product = getProduct(slug);
        return product ? <ProductCard key={slug} product={product} option={option} /> : null;
      })}
    </div>
  );
}

function TopTrending() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <SectionHeader title="Top Trending" href="/category/smartphones" />
      <CardGrid items={trending} className="sm:grid-cols-2 lg:grid-cols-3" />
    </section>
  );
}

/* ---------------- iPhone 17 banner ---------------- */

function IphoneBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <div className="grid overflow-hidden rounded-3xl bg-[#f3f3f5] md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <h2 className="text-4xl leading-tight tracking-tight sm:text-5xl">
            Celebrate the
            <br />
            Season with
            <br />
            iPhone 17
          </h2>
          <p className="mt-5 max-w-sm text-sm text-neutral-500">
            Experience cutting-edge performance, stunning design, and powerful new features — making
            every moment of this festive season unforgettable with iPhone 17.
          </p>
          <ShopButton className="mt-8 self-start" href="/product/iphone-17" />
        </div>
        <div className="relative min-h-[320px] md:min-h-[460px]">
          <Image src={img("banner-iphone17")} alt="Hand holding a blue smartphone" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Great Deals ---------------- */

const deals = [
  { name: "HyperView Smartphone", price: 799.99, img: "deal-phone", href: "/product/hyperview-smartphone" },
  { name: "FusionCore Laptop", price: 799.99, img: "deal-laptop", href: "/product/fusioncore-laptop" },
  { name: "SonicWave Headphones", price: 799.99, img: "deal-headphones", href: "/product/sonicwave-headphones" },
];

function GreatDeals() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <SectionHeader title="Great Deals" href="/products?sort=price-asc" />
      <div className="grid gap-4 md:grid-cols-3">
        {deals.map((d) => (
          <Link key={d.name} href={d.href} className="group relative h-[340px] overflow-hidden rounded-2xl bg-neutral-900">
            <Image src={img(d.img)} alt={d.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="font-semibold">{d.name}</h3>
              <p className="text-xs text-white/70">
                From <span className="text-sm font-bold text-white">${d.price.toFixed(2)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------------- TV banner ---------------- */

function TvBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <div className="grid overflow-hidden rounded-3xl bg-[#ecebe3] md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <h2 className="text-4xl leading-tight tracking-tight sm:text-5xl">
            Unmatched
            <br />
            Visual Clarity
          </h2>
          <p className="mt-5 max-w-sm text-sm text-neutral-500">
            Enhance your workspace with crisp, vibrant visuals and fast refresh rates for ultimate
            performance.
          </p>
          <ShopButton className="mt-8 self-start" href="/product/smart-tv" />
        </div>
        <div className="relative min-h-[300px] md:min-h-[440px]">
          <Image src={img("banner-tv")} alt="Smart TV in a living room" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Latest Line-up ---------------- */

const lineup: [string, number?][] = [["neo-qled-8k"], ["smart-tv"], ["q-series-soundbar"], ["smart-monitor-m7"]];

function LatestLineup() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <SectionHeader title="Latest Line-up" href="/category/tv-home-theater" />
      <CardGrid items={lineup} className="sm:grid-cols-2 lg:grid-cols-4" />
    </section>
  );
}
