// Category filter buttons: "All" + one per category in src/data/menu.js.
// The selected category id lives in the parent (useMenu). Clicking a button
// calls onChange(id), which updates the grid. On phones the row scrolls sideways.
import { categoryIds } from "../../data/menu";
import { useLanguage } from "../../hooks/useLanguage";

export default function MenuFilters({ selected, onChange }) {
  const { t } = useLanguage();
  const options = ["all", ...categoryIds];

  return (
    <div role="group" aria-label={t("menu.categoriesLabel")} className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
      <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {options.map((id) => {
          const active = id === selected;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(id)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-charcoal bg-charcoal text-cream"
                  : "border-charcoal/20 bg-white text-charcoal hover:border-charcoal"
              }`}
            >
              {id === "all" ? t("menu.all") : t(`categories.${id}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
