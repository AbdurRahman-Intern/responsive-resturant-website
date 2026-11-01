// Home page section that shows the dishes marked `featured: true` in menu.js.
// It reuses MenuCard, so a dish looks identical here and on the menu page.
import { menuItems } from "../../data/menu";
import { useLanguage } from "../../hooks/useLanguage";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import MenuCard from "../menu/MenuCard";

export default function FeaturedDishes() {
  const { t } = useLanguage();
  const featured = menuItems.filter((item) => item.featured).slice(0, 6);

  if (featured.length === 0) return null; // nothing to show: hide the section

  return (
    <section aria-labelledby="featured-title" className="bg-sand/50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="featured-title"
          eyebrow={t("featured.eyebrow")}
          title={t("featured.title")}
          subtitle={t("featured.subtitle")}
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <li key={item.id} className="flex">
              <div className="flex w-full">
                <MenuCard item={item} />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Button to="/menu" variant="secondary">
            {t("featured.viewAll")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
