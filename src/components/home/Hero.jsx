// Opening section of the home page: headline, short description, two buttons
// and a large arch-shaped food photo. The hero image comes from restaurant.js.
// All text comes from translations.js (hero.*).
import { Clock, BadgeCheck } from "lucide-react";
import { restaurant } from "../../data/restaurant";
import { useLanguage } from "../../hooks/useLanguage";
import { useCartStore } from "../../store/cartStore";
import Container from "../common/Container";
import Button from "../common/Button";
import SmartImage from "../common/SmartImage";

export default function Hero() {
  const { t, pick } = useLanguage();
  const openCart = useCartStore((state) => state.openCart);

  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
        {/* Text column */}
        <div className="lg:col-span-6">
          <p className="text-eyebrow mb-5">{t("hero.eyebrow")}</p>
          <h1 id="hero-title" className="text-hero">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{t("hero.subtitle")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/menu">{t("hero.viewMenu")}</Button>
            <Button variant="secondary" onClick={openCart}>
              {t("hero.orderNow")}
            </Button>
          </div>

          {/* Small supporting details */}
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-charcoal">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              {t("hero.hoursNote")}
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              {t("hero.halal")}
            </li>
          </ul>
        </div>

        {/* Image column: arch shape for a more editorial look */}
        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-sand shadow-soft sm:aspect-[5/6]">
              <SmartImage
                src={restaurant.images.hero}
                alt={`${pick(restaurant.name)}: ${t("hero.eyebrow")}`}
                priority
                width={1400}
                height={1680}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Decorative offset frame. Purely visual, so hidden from screen readers. */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -end-4 -z-10 hidden h-2/3 w-2/3 rounded-3xl bg-accent/15 sm:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
