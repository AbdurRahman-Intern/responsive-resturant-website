// Special offers. This component contains NO offer text: it loops over
// src/data/offers.js. Expired offers are hidden automatically; if nothing is
// active, the whole section disappears.
//
// Each offer has a call-to-action (cta.type): "menu", "whatsapp" or "phone".
import { restaurant } from "../../data/restaurant";
import { offers, isOfferActive } from "../../data/offers";
import { useLanguage } from "../../hooks/useLanguage";
import { formatDate } from "../../utils/date";
import { buildWhatsAppLink } from "../../utils/whatsapp";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";

function OfferButton({ offer }) {
  const { t, pick } = useLanguage();
  const type = offer.cta?.type;

  if (type === "whatsapp") {
    const link = buildWhatsAppLink(restaurant.whatsappNumber, pick(offer.whatsappMessage));
    return (
      <Button href={link} external variant="light">
        {t("offers.ctaWhatsapp")}
      </Button>
    );
  }
  if (type === "phone") {
    return (
      <Button href={`tel:${restaurant.phoneLink}`} variant="light">
        {t("offers.ctaPhone")}
      </Button>
    );
  }
  return (
    <Button to="/menu" variant="light">
      {t("offers.ctaMenu")}
    </Button>
  );
}

export default function OffersSection() {
  const { t, pick } = useLanguage();
  const activeOffers = offers.filter((offer) => isOfferActive(offer));

  if (activeOffers.length === 0) return null;

  return (
    <section aria-labelledby="offers-title" className="py-16 sm:py-24">
      <Container>
        <SectionHeading id="offers-title" eyebrow={t("offers.eyebrow")} title={t("offers.title")} />
        <ul className="grid gap-6 md:grid-cols-2">
          {activeOffers.map((offer) => (
            <li key={offer.id} className="flex flex-col rounded-card bg-accent-dark p-8 text-cream">
              <h3 className="font-display text-2xl font-semibold">{pick(offer.title)}</h3>
              <p className="mt-3 leading-relaxed text-cream/85">{pick(offer.description)}</p>
              {offer.validUntil && (
                <p className="mt-4 text-sm text-cream/70">
                  {/* ⁦ ... ⁩ isolates the date so it keeps its left-to-right
                      order inside a right-to-left sentence */}
                  {t("offers.validUntil", { date: `⁦${formatDate(offer.validUntil)}⁩` })}
                </p>
              )}
              <div className="mt-auto pt-6">
                <OfferButton offer={offer} />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
