// The slide-in order panel. It is rendered ONCE in App.jsx and opened from
// anywhere through the cart store (isOpen / openCart / closeCart).
//
// Layout: header (title + close) -> scrollable area with the dishes, total and
// the inquiry form. When the cart is empty we show an empty state instead.
import { useRef } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { useModal } from "../../hooks/useModal";
import { useCartStore, useCartDetails } from "../../store/cartStore";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import OrderInquiryForm from "./OrderInquiryForm";

export default function CartDrawer() {
  const { t } = useLanguage();
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { lines, total, count } = useCartDetails();
  const panelRef = useRef(null);

  useModal(isOpen, closeCart, panelRef);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-charcoal/50" onClick={closeCart} aria-hidden="true" />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("cart.title")}
        className="animate-drawer absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-cream shadow-soft"
      >
        <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
          <h2 className="font-display text-2xl font-semibold">
            {t("cart.title")}
            {count > 0 && <span className="ms-2 text-base font-normal text-muted">({count})</span>}
          </h2>
          <button
            type="button"
            data-autofocus
            onClick={closeCart}
            aria-label={t("cart.close")}
            className="rounded-full p-2 hover:bg-charcoal/10"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title={t("cart.empty")}
              text={t("cart.emptyText")}
              action={
                <Button to="/menu" onClick={closeCart}>
                  {t("cart.browse")}
                </Button>
              }
            />
          ) : (
            <div className="space-y-6">
              <ul>
                {lines.map((line) => (
                  <CartItem key={line.item.id} line={line} />
                ))}
              </ul>
              <button type="button" onClick={clearCart} className="text-sm text-muted underline hover:text-accent-dark">
                {t("cart.clear")}
              </button>
              <OrderSummary total={total} />
              <OrderInquiryForm lines={lines} total={total} />
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
