import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { CartProvider } from "./cart/cart-context";
import CartSidebar from "./cart/cart-sidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nexora — Redefining Everyday Tech",
    template: "%s | Nexora",
  },
  description:
    "Nexora is your destination for modern electronics: smartphones, audio, gaming, TVs and smart devices.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
