// Shows the estimated total. It is "estimated" on purpose: the restaurant
// confirms the final price. (No taxes, delivery fees or payment here.)
// TODO: add delivery fee / service charge lines when the restaurant needs them.
import { useLanguage } from "../../hooks/useLanguage";

export default function OrderSummary({ total }) {
  const { t, price } = useLanguage();
  return (
    <div className="flex items-center justify-between rounded-card bg-sand px-4 py-3">
      <span className="font-medium">{t("cart.total")}</span>
      <span dir="ltr" className="text-price">
        {price(total)}
      </span>
    </div>
  );
}
