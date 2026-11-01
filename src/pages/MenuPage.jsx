// The full digital menu page.
//
// DATA FLOW:
//   useMenu() owns `query` and `category` state and returns the filtered list.
//   MenuSearch + MenuFilters CHANGE that state (they receive setQuery / setCategory).
//   MenuGrid DISPLAYS the filtered list.
//   So: user types -> setQuery -> useMenu recalculates -> MenuGrid re-renders.
import { useLanguage } from "../hooks/useLanguage";
import { useMenu } from "../hooks/useMenu";
import Container from "../components/common/Container";
import SectionHeading from "../components/common/SectionHeading";
import MenuSearch from "../components/menu/MenuSearch";
import MenuFilters from "../components/menu/MenuFilters";
import MenuGrid from "../components/menu/MenuGrid";

export default function MenuPage() {
  const { t } = useLanguage();
  const { query, setQuery, category, setCategory, results, reset } = useMenu();

  return (
    <section aria-labelledby="menu-title" className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          id="menu-title"
          eyebrow={t("menu.eyebrow")}
          title={t("menu.title")}
          subtitle={t("menu.subtitle")}
        />

        <div className="mb-8 space-y-4">
          <div className="max-w-xl">
            <MenuSearch value={query} onChange={setQuery} />
          </div>
          <MenuFilters selected={category} onChange={setCategory} />
          <p className="text-sm text-muted" aria-live="polite">
            {results.length === 1 ? t("menu.resultsOne") : t("menu.results", { count: results.length })}
          </p>
        </div>

        <MenuGrid items={results} onReset={reset} />
      </Container>
    </section>
  );
}
