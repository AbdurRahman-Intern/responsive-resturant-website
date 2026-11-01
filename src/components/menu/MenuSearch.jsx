// Search box for the menu. It is a "controlled input": the text lives in the
// parent (MenuPage via useMenu) and is passed in as `value`. Every keystroke
// calls onChange, the parent updates `query`, and the grid filters instantly.
import { Search, X } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

export default function MenuSearch({ value, onChange }) {
  const { t } = useLanguage();
  return (
    <div className="relative">
      {/* The label is visually hidden but read by screen readers */}
      <label htmlFor="menu-search" className="sr-only">
        {t("menu.searchLabel")}
      </label>
      {/* ps-/pe- are "padding-start/end": they flip automatically in RTL */}
      <Search
        className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        id="menu-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("menu.searchPlaceholder")}
        autoComplete="off"
        className="w-full rounded-full border border-charcoal/20 bg-white py-3 pe-12 ps-12 text-base placeholder:text-muted/70"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={t("menu.clearSearch")}
          className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-charcoal/10"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
