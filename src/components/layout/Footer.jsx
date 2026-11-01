// Site footer. Everything shown here comes from restaurant.js, navigation.js
// and translations.js, so there is nothing to edit in this file for a new customer.
import { Link } from "react-router-dom";
import { Phone, Mail, ArrowUp } from "lucide-react";
import { restaurant } from "../../data/restaurant";
import { navLinks } from "../../data/navigation";
import { useLanguage } from "../../hooks/useLanguage";
import Container from "../common/Container";
import Logo from "../common/Logo";
import SocialIcon from "../common/SocialIcon";

export default function Footer() {
  const { t, pick } = useLanguage();
  const year = new Date().getFullYear();

  // Only show social networks that have a link in restaurant.js
  const socials = Object.entries(restaurant.social).filter(([, url]) => Boolean(url));

  return (
    <footer className="bg-charcoal text-cream/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{t("footer.tagline")}</p>
        </div>

        <nav aria-label={t("footer.explore")}>
          <h2 className="mb-4 text-sm font-semibold text-cream">{t("footer.explore")}</h2>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link to={link.to} className="hover:text-white">
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-cream">{t("footer.contact")}</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${restaurant.phoneLink}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {/* dir="ltr" keeps phone numbers readable inside RTL text */}
                <span dir="ltr">{restaurant.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${restaurant.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span dir="ltr">{restaurant.email}</span>
              </a>
            </li>
            <li className="leading-relaxed">{pick(restaurant.address)}</li>
          </ul>

          {socials.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-cream">{t("footer.follow")}</p>
              <ul className="flex gap-3">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(`footer.${name}`)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 hover:bg-cream hover:text-charcoal"
                    >
                      <SocialIcon name={name} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-cream">{t("footer.hours")}</h2>
          <ul className="space-y-1.5 text-sm">
            {restaurant.hours.map((row) => (
              <li key={row.day} className="flex justify-between gap-4">
                <span>{t(`days.${row.day}`)}</span>
                <span dir="ltr">{row.hours || t("location.closed")}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/15">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-xs sm:flex-row sm:items-center">
          <p>
            © {year} {pick(restaurant.name)}. {t("footer.rights")}
          </p>
          <p className="text-cream/60">{t("footer.demo")}</p>
          <a href="#top" className="flex items-center gap-1 hover:text-white">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            {t("footer.backToTop")}
          </a>
        </Container>
      </div>
    </footer>
  );
}
