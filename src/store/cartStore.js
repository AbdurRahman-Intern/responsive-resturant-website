// =====================================================================
// CART STORE (Zustand)
// =====================================================================
// Why global state? The cart is used by menu cards (Add button), the navbar
// (item count badge) and the cart drawer, so they all need the same data.
//
// WHAT IS STORED: only [{ id, quantity }]. Names and prices are looked up
// from menu.js when displayed, so if you change a price in menu.js the cart
// updates automatically, and nobody can keep an old price in LocalStorage.
//
// PERSISTENCE: `persist` saves `items` to LocalStorage so the cart survives
// a refresh. The drawer open/closed state is NOT saved (see `partialize`).
import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { menuItems } from "../data/menu";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [], // [{ id: 4, quantity: 2 }]
      isOpen: false, // is the cart drawer visible?

      // Add one more of a dish (creates the line if it is not in the cart yet)
      addItem: (id) =>
        set((state) => {
          const existing = state.items.find((line) => line.id === id);
          if (existing) {
            return { items: state.items.map((line) => (line.id === id ? { ...line, quantity: line.quantity + 1 } : line)) };
          }
          return { items: [...state.items, { id, quantity: 1 }] };
        }),

      // Remove one. When quantity reaches 0 the line disappears.
      decreaseItem: (id) =>
        set((state) => ({
          items: state.items
            .map((line) => (line.id === id ? { ...line, quantity: line.quantity - 1 } : line))
            .filter((line) => line.quantity > 0),
        })),

      removeItem: (id) => set((state) => ({ items: state.items.filter((line) => line.id !== id) })),
      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "rgp-cart",
      partialize: (state) => ({ items: state.items }), // save only the items
    }
  )
);

// Turns [{id, quantity}] into full lines with the dish, and calculates totals.
// Dishes that no longer exist or are sold out are skipped, so a stale cart
// can never produce a broken order.
export function getCartDetails(items) {
  const lines = items
    .map((line) => {
      const item = menuItems.find((dish) => dish.id === line.id);
      if (!item || !item.available) return null;
      return { item, quantity: line.quantity, lineTotal: item.price * line.quantity };
    })
    .filter(Boolean);

  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  return { lines, total, count };
}

// React hook: components call useCartDetails() to get { lines, total, count }.
// useMemo means we only recalculate when the cart items change.
export function useCartDetails() {
  const items = useCartStore((state) => state.items);
  return useMemo(() => getCartDetails(items), [items]);
}
