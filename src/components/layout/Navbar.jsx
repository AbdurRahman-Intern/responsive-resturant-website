// Top navigation bar (sticky). Contains: logo, page links, language switcher,
// cart button with item count, "Order Now" button and the mobile menu toggle.
//
// "Order Now" opens the cart drawer. If the cart is empty, the drawer offers
// a button to browse the menu.
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingBag } from "lucide-react";
import { navLinks } from "../../data/navigation";
import { useLanguage } from "../../hooks/useLanguage";
import { useCartStore, useCartDetails } from "../../store/cartStore";
import Container from "../common/Container";
import Logo from "../common/Logo";
import LanguageSwitcher from "../common/LanguageSwitcher";
import Button from "../common/Button";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const openCart = useCartStore((state) => state.openCart);
  const { count } = useCartDetails();

  // Which link is the current page? (for highlighting)
  function isActive(link) {
    const [path, hash] = link.to.split("#");
    if (location.pathname !== (path || "/")) return false;
    return (location.hash || "") === (hash ? `#${hash}` : "");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-cream/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop links: hidden below the "lg" breakpoint */}
        <nav aria-label={t("nav.main")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.to}
                  aria-current={isActive(link) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-charcoal/5 ${
                    isActive(link) ? "text-accent" : "text-charcoal"
                  }`}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden lg:flex" />

          {/* Cart button with item count badge */}
          <button
            type="button"
            onClick={openCart}
            aria-label={t("cart.open", { count })}
            className="relative rounded-full p-2.5 hover:bg-charcoal/10"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -end-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </button>

          <Button onClick={openCart} className="hidden sm:inline-flex">
            {t("nav.orderNow")}
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={t("nav.openMenu")}
            aria-expanded={mobileOpen}
            className="rounded-full p-2.5 hover:bg-charcoal/10 lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} onOrder={openCart} isActive={isActive} />
    </header>
  );
}
