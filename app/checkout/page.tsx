import type { Metadata } from "next";
import CheckoutForm from "./checkout-form";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <h1 className="mb-8 text-4xl tracking-tight">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
