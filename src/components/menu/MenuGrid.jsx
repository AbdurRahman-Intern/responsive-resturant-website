// Shows a responsive grid of MenuCards, or an empty state if the list is empty.
// It receives the already-filtered `items` (filtering is done in useMenu.js).
// `aria-live="polite"` lets screen readers announce when results change.
import { SearchX } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";
import MenuCard from "./MenuCard";

export default function MenuGrid({ items, onReset }) {
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div aria-live="polite">
        <EmptyState
          icon={SearchX}
          title={t("menu.emptyTitle")}
          text={t("menu.emptyText")}
          action={onReset && <Button onClick={onReset}>{t("menu.resetFilters")}</Button>}
        />
      </div>
    );
  }

  return (
    <ul aria-live="polite" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="flex">
          <div className="flex w-full">
            <MenuCard item={item} />
          </div>
        </li>
      ))}
    </ul>
  );
}
