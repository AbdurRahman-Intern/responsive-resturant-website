// One dish card. Used on the home page (Featured Dishes) AND on the menu page,
// so the dish design lives in exactly one place.
//
// Props:
//   item      one object from src/data/menu.js
//   showAdd   set to false to hide the "Add to order" button
//
// "Add to order" calls the cart store. If the dish is sold out
// (item.available === false) the button is disabled and a label is shown.
import { memo, useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { useCartStore } from "../../store/cartStore";
import Badge from "../common/Badge";
import SmartImage from "../common/SmartImage";

function MenuCard({ item, showAdd = true }) {
  const { t, pick, price } = useLanguage();
  const addItem = useCartStore((state) => state.addItem);

  // Short "Added" feedback after clicking the button
  const [justAdded, setJustAdded] = useState(false);
  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = setTimeout(() => setJustAdded(false), 1200);
    return () => clearTimeout(timer); // cleanup if the card disappears early
  }, [justAdded]);

  function handleAdd() {
    addItem(item.id);
    setJustAdded(true);
  }

  const name = pick(item.name);

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-charcoal/10 bg-white shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <SmartImage
          src={item.image}
          alt={name}
          width={800}
          height={600}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            item.available ? "" : "grayscale"
          }`}
        />
        {/* Badge sits at the "start" corner: left in English, right in RTL */}
        {item.badge && (
          <Badge tone="accent" className="absolute start-3 top-3">
            {t(`badges.${item.badge}`)}
          </Badge>
        )}
        {!item.available && (
          <span className="absolute inset-x-0 bottom-0 bg-charcoal/80 py-1.5 text-center text-xs font-medium text-cream">
            {t("menu.soldOut")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-card-title">{name}</h3>
          {/* dir="ltr" keeps "$12.50" in the right order inside RTL layouts */}
          <p dir="ltr" className="text-price shrink-0">
            {price(item.price)}
          </p>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted">{pick(item.description)}</p>

        {item.dietary.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {item.dietary.map((tag) => (
              <li key={tag}>
                <Badge tone="green">{t(`dietary.${tag}`)}</Badge>
              </li>
            ))}
          </ul>
        )}

        {showAdd && (
          <div className="mt-auto pt-5">
            <button
              type="button"
              onClick={handleAdd}
              disabled={!item.available}
              aria-label={t("menu.addAria", { name })}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-accent px-4 py-2.5 text-sm font-semibold text-accent-dark transition-colors hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:border-charcoal/20 disabled:text-muted disabled:hover:bg-transparent disabled:hover:text-muted"
            >
              {!item.available ? (
                t("menu.soldOut")
              ) : justAdded ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  {t("menu.added")}
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  {t("menu.add")}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default memo(MenuCard);
