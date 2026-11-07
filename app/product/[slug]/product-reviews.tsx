"use client";

import { useActionState, useEffect, useState } from "react";
import { Stars } from "@/app/components/ui";
import type { Review } from "@/lib/catalog";
import { submitReview } from "./review-action";

const key = (slug: string) => `manora_reviews_${slug}`;

export default function ProductReviews({ slug, seeded }: { slug: string; seeded: Review[] }) {
  const [mine, setMine] = useState<Review[]>([]);
  const [writing, setWriting] = useState(false);
  const [state, action, pending] = useActionState(submitReview, {});
  const [rating, setRating] = useState(0);

  useEffect(() => {
    try {
      setMine(JSON.parse(localStorage.getItem(key(slug)) ?? "[]"));
    } catch {}
  }, [slug]);

  useEffect(() => {
    if (!state.review) return;
    const review = state.review;
    setMine((prev) => {
      const next = [review, ...prev];
      try {
        localStorage.setItem(key(slug), JSON.stringify(next));
      } catch {}
      return next;
    });
    setWriting(false);
    setRating(0);
  }, [state.review, slug]);

  const all = [...mine, ...seeded];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
      <div>
        {writing ? (
          <form action={action} className="space-y-4 rounded-2xl border border-neutral-100 p-6">
            <h3 className="font-semibold">Write a review</h3>
            <div>
              <p className="mb-2 text-sm">Rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setRating(n)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className={`text-2xl ${n <= rating ? "text-amber-500" : "text-neutral-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <input type="hidden" name="rating" value={rating} />
              <FieldError msg={state.fieldErrors?.rating} />
            </div>
            <Field name="author" label="Name" error={state.fieldErrors?.author} />
            <Field name="title" label="Title" error={state.fieldErrors?.title} />
            <div>
              <label htmlFor="body" className="mb-1.5 block text-sm">
                Review
              </label>
              <textarea id="body" name="body" rows={4} className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black" />
              <FieldError msg={state.fieldErrors?.body} />
            </div>
            <div className="flex gap-2">
              <button disabled={pending} className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
                {pending ? "Submitting…" : "Submit review"}
              </button>
              <button type="button" onClick={() => setWriting(false)} className="rounded-full px-4 py-2.5 text-sm text-neutral-500">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-2xl bg-card p-6">
            <h3 className="font-semibold">Share your thoughts</h3>
            <p className="mt-1 text-sm text-neutral-500">Own this product? Help other shoppers decide.</p>
            <button onClick={() => setWriting(true)} className="mt-4 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white">
              Write a review
            </button>
            {state.review && <p className="mt-3 text-sm text-green-700">Thanks! Your review has been posted.</p>}
          </div>
        )}
      </div>

      <ul className="divide-y divide-neutral-100">
        {all.map((r, i) => (
          <li key={`${r.author}-${r.date}-${i}`} className="py-6 first:pt-0">
            <div className="flex items-center justify-between gap-4">
              <Stars rating={r.rating} />
              <time className="text-xs text-neutral-400">{r.date}</time>
            </div>
            <h4 className="mt-2 font-semibold">{r.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">{r.body}</p>
            <p className="mt-2 text-xs text-neutral-500">
              {r.author} · <span className="text-green-700">Verified buyer</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Field({ name, label, error }: { name: string; label: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm">
        {label}
      </label>
      <input id={name} name={name} className="w-full rounded-full border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-black" />
      <FieldError msg={error} />
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-xs text-red-600">{msg}</p> : null;
}
