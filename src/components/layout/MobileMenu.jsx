// Mobile navigation drawer. Slides in from the "end" side of the screen
// (right in English, left in Dari/Pashto). Uses useModal for Escape key,
// focus trap and scroll lock.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { navLinks } from "../../data/navigation";
import { useLanguage } from "../../hooks/useLanguage";
import { useModal } from "../../hooks/useModal";
import LanguageSwitcher from "../common/LanguageSwitcher";
import Button from "../common/Button";

export default function MobileMenu({ isOpen, onClose, onOrder, isActive }) {
  const panelRef = useRef(null);
  const { t } = useLanguage();
  useModal(isOpen, onClose, panelRef);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dark backdrop: clicking it closes the menu */}
      <div className="absolute inset-0 bg-charcoal/50" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.main")}
        className="animate-drawer absolute inset-y-0 end-0 flex w-[85%] max-w-sm flex-col bg-cream p-6 shadow-soft"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("nav.closeMenu")}
          className="mb-6 self-end rounded-full p-2 hover:bg-charcoal/10"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>

        <nav aria-label={t("nav.main")}>
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  aria-current={isActive(link) ? "page" : undefined}
                  className={`block border-b border-charcoal/10 py-4 font-display text-2xl ${
                    isActive(link) ? "text-accent" : "text-charcoal"
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-5 pt-8">
          <LanguageSwitcher className="flex-wrap" />
          <Button
            className="w-full"
            onClick={() => {
              onClose();
              onOrder();
            }}
          >
            {t("nav.orderNow")}
          </Button>
        </div>
      </div>
    </div>
  );
}
