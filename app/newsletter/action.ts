"use server";

export type NewsletterState = { ok?: boolean; error?: string };

export async function subscribe(_prev: NewsletterState, form: FormData): Promise<NewsletterState> {
  const email = String(form.get("email") ?? "").trim().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address" };
  // Hook an email provider (Resend, Mailchimp, …) in here. For now the signup is logged.
  console.log("[newsletter] subscribe", email);
  return { ok: true };
}
