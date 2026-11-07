"use server";

export type ContactState = { ok?: boolean; fieldErrors?: Record<string, string> };

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const name = String(form.get("name") ?? "").trim().slice(0, 100);
  const email = String(form.get("email") ?? "").trim().slice(0, 200);
  const subject = String(form.get("subject") ?? "").trim().slice(0, 150);
  const message = String(form.get("message") ?? "").trim().slice(0, 5000);

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Enter a valid email";
  if (message.length < 10) fieldErrors.message = "Message must be at least 10 characters";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  // Connect an email provider (e.g. Resend) here to deliver the message. For now it is logged.
  console.log("[contact]", { name, email, subject, length: message.length });
  return { ok: true };
}
