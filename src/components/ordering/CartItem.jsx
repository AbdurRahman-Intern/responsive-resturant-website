// One row inside the cart: thumbnail, name, price, quantity buttons, remove.
// It only displays data and calls the cart store actions (no business logic).
import { Minus, Plus, Trash2 } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { useCartStore } from "../../store/cartStore";
import SmartImage from "../common/SmartImage";

export default function CartItem({ line }) {
  const { t, pick, price } = useLanguage();
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const { item, quantity, lineTotal } = line;
  const name = pick(item.name);

  const roundButton = "flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/20 hover:bg-charcoal/10";

  return (
    <li className="flex gap-4 border-b border-charcoal/10 py-4">
      <SmartImage src={item.image} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-lg object-cover" />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium leading-snug">{name}</p>
          <p dir="ltr" className="shrink-0 font-semibold">
            {price(lineTotal)}
          </p>
        </div>
        <p className="text-xs text-muted">
          <span dir="ltr">{price(item.price)}</span> {t("cart.each")}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3" role="group" aria-label={`${t("cart.quantity")}: ${name}`}>
            <button type="button" onClick={() => decreaseItem(item.id)} aria-label={t("cart.decrease", { name })} className={roundButton}>
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="min-w-6 text-center font-semibold" aria-live="polite">
              {quantity}
            </span>
            <button type="button" onClick={() => addItem(item.id)} aria-label={t("cart.increase", { name })} className={roundButton}>
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={t("cart.remove", { name })}
            className="rounded-full p-2 text-muted hover:bg-charcoal/10 hover:text-accent-dark"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
}
