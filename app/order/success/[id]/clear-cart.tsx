"use client";

import { useEffect } from "react";
import { useCart } from "@/app/cart/cart-context";

/** The order is placed: empty the cart once the stored cart has loaded. */
export default function ClearCart() {
  const { ready, clear } = useCart();
  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);
  return null;
}
