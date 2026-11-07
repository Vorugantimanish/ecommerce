import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-7xl font-semibold">404</p>
      <h1 className="mt-4 text-2xl">We couldn&apos;t find that page</h1>
      <p className="mt-2 text-neutral-500">It may have moved, or the product is no longer available.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">
          Go Home
        </Link>
        <Link href="/products" className="rounded-full border border-black px-6 py-3 text-sm font-semibold">
          Shop All
        </Link>
      </div>
    </div>
  );
}
