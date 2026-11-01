// Contact actions (id="contact"): WhatsApp chat, phone call, browse the menu, email.
// All links are built from restaurant.js, so they work as soon as you enter the
// real WhatsApp number there. The WhatsApp button pre-fills a greeting message.
import { MessageCircle, Phone, UtensilsCrossed, Mail } from "lucide-react";
import { restaurant } from "../../data/restaurant";
import { useLanguage } from "../../hooks/useLanguage";
import { buildWhatsAppLink } from "../../utils/whatsapp";
import Container from "../common/Container";
import Button from "../common/Button";

export default function ContactSection() {
  const { t, pick } = useLanguage();
  const whatsappLink = buildWhatsAppLink(
    restaurant.whatsappNumber,
    t("contact.whatsappGreeting", { name: pick(restaurant.name) })
  );

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-charcoal py-16 text-cream sm:py-24">
      <Container className="text-center">
        <p className="text-eyebrow mb-3 !text-cream/70">{t("contact.eyebrow")}</p>
        <h2 id="contact-title" className="text-section mx-auto max-w-2xl">
          {t("contact.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/75">{t("contact.subtitle")}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={whatsappLink} external variant="light">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t("contact.whatsapp")}
          </Button>
          <Button href={`tel:${restaurant.phoneLink}`} variant="primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {t("contact.call")}
          </Button>
          <Button to="/menu" className="!border-cream/40 !text-cream hover:!bg-cream/10" variant="secondary">
            <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
            {t("contact.browse")}
          </Button>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-cream/75">
          <Mail className="h-4 w-4" aria-hidden="true" />
          <a href={`mailto:${restaurant.email}`} dir="ltr" className="underline hover:text-white">
            {restaurant.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
