// Language selector. Shows one button per language (from restaurant.js).
// Clicking calls setLanguage() -> the whole site re-renders in that language,
// and App.jsx flips the page direction (LTR/RTL).
// `aria-pressed` tells screen readers which language is active.
import { Globe } from "lucide-react";
import { restaurant } from "../../data/restaurant";
import { useLanguage } from "../../hooks/useLanguage";

export default function LanguageSwitcher({ className = "" }) {
  const { language, setLanguage, t } = useLanguage();

  // Nothing to switch if the restaurant only offers one language
  if (restaurant.languages.length < 2) return null;

  return (
    <div role="group" aria-label={t("nav.language")} className={`flex items-center gap-1 ${className}`}>
      <Globe className="me-1 h-4 w-4 text-muted" aria-hidden="true" />
      {restaurant.languages.map((lang) => {
        const active = lang.code === language;
        return (
          <button
            key={lang.code}
            type="button"
            lang={lang.code}
            aria-pressed={active}
            onClick={() => setLanguage(lang.code)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              active ? "bg-charcoal text-cream" : "text-charcoal hover:bg-charcoal/10"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
