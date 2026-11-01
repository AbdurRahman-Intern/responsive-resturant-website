// The application shell: wraps every page with the navbar, footer and cart drawer.
//
// TWO IMPORTANT SIDE EFFECTS HAPPEN HERE:
//   1. LANGUAGE + DIRECTION: whenever the language changes we set
//      <html lang="fa" dir="rtl">. The browser then flips the whole layout, and
//      Tailwind's logical classes (ps-, pe-, start-, end-, ms-, me-) follow it.
//      Photos are never flipped, because <img> does not mirror with dir.
//   2. BRAND COLORS: we copy the colors from restaurant.js into CSS variables,
//      so changing `colors.accent` there re-themes the whole site.
import { useEffect } from "react";
import { restaurant, validateRestaurantConfig } from "../data/restaurant";
import { useLanguage } from "../hooks/useLanguage";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/ordering/CartDrawer";
import AppRoutes from "./router";
import ScrollManager from "./ScrollManager";

function applyBrandColors() {
  const root = document.documentElement.style;
  root.setProperty("--color-accent", restaurant.colors.accent);
  root.setProperty("--color-accent-dark", restaurant.colors.accentDark);
  root.setProperty("--color-cream", restaurant.colors.cream);
}

export default function App() {
  const { language, dir, t, pick } = useLanguage();

  // Check the configuration once. Problems are shown on screen (see below).
  const configProblems = validateRestaurantConfig();

  useEffect(() => {
    applyBrandColors();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.title = pick(restaurant.name);
  }, [language, dir, pick]);

  // Basic error handling: a clear message instead of a blank page
  if (configProblems.length > 0) {
    return (
      <div className="mx-auto max-w-xl p-8">
        <h1 className="text-section">{t("errors.configTitle")}</h1>
        <p className="mt-3">{t("errors.configText")}</p>
        <ul className="mt-3 list-disc ps-6">
          {configProblems.map((problem) => (
            <li key={problem}>{problem}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div id="top" className="flex min-h-screen flex-col">
      {/* Keyboard users can jump past the navbar */}
      <a
        href="#main"
        className="sr-only z-50 rounded bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t("skipToContent")}
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
