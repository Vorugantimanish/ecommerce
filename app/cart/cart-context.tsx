"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useTransition } from "react";
import { type CartLine, MAX_QUANTITY, type PricedLine, itemCount, lineKey, priceLines } from "@/lib/cart-math";
import { type Totals, computeTotals, evaluateDiscount } from "@/lib/discounts";
import { applyDiscountCode } from "./actions";

const STORAGE_KEY = "nexora_cart_v1";

type AppliedDiscount = { code: string; label: string; amount: number };

type CartContextValue = {
  lines: PricedLine[];
  rawLines: CartLine[];
  count: number;
  totals: Totals;
  discount: AppliedDiscount | null;
  discountError: string | null;
  discountPending: boolean;
  isOpen: boolean;
  ready: boolean;
  open: () => void;
  close: () => void;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  applyCode: (code: string) => void;
  removeCode: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type Stored = { lines: CartLine[]; code: string | null };

function load(): Stored {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (parsed && Array.isArray(parsed.lines)) return { lines: parsed.lines, code: parsed.code ?? null };
  } catch {}
  return { lines: [], code: null };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>([]);
  const [code, setCode] = useState<string | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [discountPending, startDiscount] = useTransition();

  // Restore after mount so server and first client render agree (an empty cart).
  useEffect(() => {
    const stored = load();
    setRawLines(stored.lines);
    setCode(stored.code);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines: rawLines, code }));
    } catch {}
  }, [rawLines, code, ready]);

  // Keep tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const stored = load();
      setRawLines(stored.lines);
      setCode(stored.code);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const lines = useMemo(() => priceLines(rawLines), [rawLines]);

  // The code was validated by the server when applied; re-check it locally as the cart changes
  // so the drawer never shows a discount the server would refuse at checkout.
  const discountResult = useMemo(() => (code ? evaluateDiscount(code, lines) : null), [code, lines]);
  const discount = discountResult?.ok ? { code: discountResult.code, label: discountResult.label, amount: discountResult.amount } : null;
  const totals = useMemo(() => computeTotals(lines, discount?.amount ?? 0), [lines, discount?.amount]);

  const add = useCallback((line: Omit<CartLine, "quantity">, quantity = 1) => {
    setRawLines((prev) => {
      const key = lineKey(line);
      const existing = prev.find((l) => lineKey(l) === key);
      if (existing) {
        return prev.map((l) => (lineKey(l) === key ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_QUANTITY) } : l));
      }
      return [...prev, { ...line, quantity: Math.min(quantity, MAX_QUANTITY) }];
    });
    setOpen(true);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setRawLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => lineKey(l) !== key)
        : prev.map((l) => (lineKey(l) === key ? { ...l, quantity: Math.min(quantity, MAX_QUANTITY) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => setRawLines((prev) => prev.filter((l) => lineKey(l) !== key)), []);

  const clear = useCallback(() => {
    setRawLines([]);
    setCode(null);
  }, []);

  const applyCode = useCallback(
    (input: string) => {
      setDiscountError(null);
      startDiscount(async () => {
        const result = await applyDiscountCode(input, rawLines);
        if (result.ok) setCode(result.code);
        else setDiscountError(result.error);
      });
    },
    [rawLines],
  );

  const removeCode = useCallback(() => {
    setCode(null);
    setDiscountError(null);
  }, []);

  const value: CartContextValue = {
    lines,
    rawLines,
    count: itemCount(lines),
    totals,
    discount,
    discountError: discountError ?? (code && discountResult && !discountResult.ok ? discountResult.error : null),
    discountPending,
    isOpen,
    ready,
    open: () => setOpen(true),
    close: () => setOpen(false),
    add,
    setQuantity,
    remove,
    clear,
    applyCode,
    removeCode,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
