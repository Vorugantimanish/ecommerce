"use client";

import { useActionState } from "react";
import { sendContact } from "./action";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, {});

  if (state.ok) {
    return (
      <div className="rounded-3xl bg-green-50 p-8">
        <h2 className="text-xl font-semibold">Message sent</h2>
        <p className="mt-2 text-sm text-neutral-600">Thanks for reaching out. We&apos;ll reply within one business day.</p>
      </div>
    );
  }

  const fe = state.fieldErrors ?? {};
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Name" error={fe.name} />
        <Field name="email" label="Email" type="email" error={fe.email} />
      </div>
      <Field name="subject" label="Subject (optional)" />
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black ${fe.message ? "border-red-400" : "border-neutral-200"}`}
        />
        {fe.message && <p className="mt-1 text-xs text-red-600">{fe.message}</p>}
      </div>
      <button disabled={pending} className="rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-50">
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({ name, label, type = "text", error }: { name: string; label: string; type?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black ${error ? "border-red-400" : "border-neutral-200"}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
