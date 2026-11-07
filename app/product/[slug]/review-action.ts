"use server";

import type { Review } from "@/lib/catalog";

export type ReviewState = { review?: Review; error?: string; fieldErrors?: Record<string, string> };

export async function submitReview(_prev: ReviewState, form: FormData): Promise<ReviewState> {
  const author = String(form.get("author") ?? "").trim().slice(0, 60);
  const title = String(form.get("title") ?? "").trim().slice(0, 100);
  const body = String(form.get("body") ?? "").trim().slice(0, 2000);
  const rating = Number(form.get("rating"));

  const fieldErrors: Record<string, string> = {};
  if (!author) fieldErrors.author = "Enter your name";
  if (!title) fieldErrors.title = "Add a short title";
  if (body.length < 10) fieldErrors.body = "Tell us a little more (10+ characters)";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) fieldErrors.rating = "Choose a rating";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  // No database here: the validated review goes back to the browser, which keeps it.
  return { review: { author, title, body, rating, date: new Date().toISOString().slice(0, 10) } };
}
