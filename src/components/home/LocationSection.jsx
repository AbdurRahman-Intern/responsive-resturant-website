// Address, opening hours (today is highlighted), directions and map buttons.
// Map links are plain Google Maps URLs built from restaurant.mapQuery,
// so no API key is needed.
// TODO: embed a real map (e.g. Google Maps iframe) once the customer's real address is known.
import { MapPin, Navigation, Phone, Info } from "lucide-react";
import { restaurant } from "../../data/restaurant";
import { useLanguage } from "../../hooks/useLanguage";
import { buildDirectionsLink, buildMapLink } from "../../utils/whatsapp";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";

// getDay() gives 0 for Sunday ... 6 for Saturday. These keys match restaurant.hours.
const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function LocationSection() {
  const { t, pick } = useLanguage();
  const todayKey = DAY_KEYS[new Date().getDay()];

  return (
    <section id="visit" aria-labelledby="visit-title" className="py-16 sm:py-24">
      <Container>
        <SectionHeading id="visit-title" eyebrow={t("location.eyebrow")} title={t("location.title")} />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Address card */}
          <div className="rounded-card border border-charcoal/10 bg-white p-7 shadow-soft">
            <h3 className="flex items-center gap-2 text-card-title">
              <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
              {t("location.addressLabel")}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{pick(restaurant.address)}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={buildDirectionsLink(restaurant.mapQuery)} external>
                <Navigation className="h-4 w-4" aria-hidden="true" />
                {t("location.directions")}
              </Button>
              <Button href={buildMapLink(restaurant.mapQuery)} external variant="secondary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t("location.viewMap")}
              </Button>
            </div>

            <a
              href={`tel:${restaurant.phoneLink}`}
              className="mt-6 inline-flex items-center gap-2 font-medium text-accent-dark hover:underline"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t("contact.call")}: <span dir="ltr">{restaurant.phone}</span>
            </a>

            <p className="mt-6 flex items-start gap-2 text-xs text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {t("location.demoNotice")}
            </p>
          </div>

          {/* Opening hours */}
          <div className="rounded-card border border-charcoal/10 bg-white p-7 shadow-soft">
            <h3 className="text-card-title">{t("location.hoursLabel")}</h3>
            <ul className="mt-4 divide-y divide-charcoal/10">
              {restaurant.hours.map((row) => {
                const isToday = row.day === todayKey;
                return (
                  <li
                    key={row.day}
                    className={`flex items-center justify-between py-3 text-sm ${isToday ? "font-semibold text-accent-dark" : ""}`}
                  >
                    <span>
                      {t(`days.${row.day}`)}
                      {isToday && <span className="ms-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs">{t("location.today")}</span>}
                    </span>
                    <span dir="ltr">{row.hours || t("location.closed")}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
