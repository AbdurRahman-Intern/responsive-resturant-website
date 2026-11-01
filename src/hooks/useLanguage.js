// =====================================================================
// LANGUAGE SYSTEM
// =====================================================================
// This file does three things:
//   1. Stores the selected language (in a tiny Zustand store, shared by all
//      components) and remembers it in LocalStorage.
//   2. Gives components a t("some.key") function to read translations.
//   3. Gives components `dir` ("ltr" or "rtl") and `pick()` for text that
//      lives inside data files ({ en: "...", fa: "...", ps: "..." }).
//
// DATA FLOW:
//   user clicks LanguageSwitcher -> setLanguage("fa") -> store changes ->
//   every component using useLanguage() re-renders with the new text ->
//   App.jsx sees the new language and sets <html lang dir> (RTL layout).
//
// USING IT IN A COMPONENT:
//   const { t, pick, dir, language } = useLanguage();
//   <h1>{t("hero.title")}</h1>
//   <p>{pick(item.description)}</p>
import { useCallback } from "react";
import { create } from "zustand";
import { restaurant } from "../data/restaurant";
import { translations } from "../data/translations";
import { formatPrice } from "../utils/currency";

const STORAGE_KEY = "rgp-language";

// Reads the saved language, but only if it is still one of the allowed languages
function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (restaurant.languages.some((lang) => lang.code === saved)) return saved;
  } catch (error) {
    // LocalStorage can be blocked (private mode). Ignore and use the default.
  }
  return restaurant.defaultLanguage;
}

const useLanguageStore = create((set) => ({
  language: getInitialLanguage(),
  setLanguage: (code) => {
    if (!restaurant.languages.some((lang) => lang.code === code)) return;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (error) {
      // ignore
    }
    set({ language: code });
  },
}));

// Walks "nav.home" through the translations object. Returns undefined if missing.
function lookup(dictionary, key) {
  return key.split(".").reduce((node, part) => (node ? node[part] : undefined), dictionary);
}

// Pure translate function (also easy to test). Falls back to English, then to the key.
export function translate(language, key, values = {}) {
  let text = lookup(translations[language], key) ?? lookup(translations.en, key) ?? key;
  if (typeof text !== "string") return key;
  // Replace {placeholders}: "{count} dishes" + { count: 3 } -> "3 dishes"
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in values ? values[name] : match));
}

export function useLanguage() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const config = restaurant.languages.find((lang) => lang.code === language) || restaurant.languages[0];

  // useCallback keeps the same function until the language changes
  const t = useCallback((key, values) => translate(language, key, values), [language]);

  // For text stored in data files: pick({ en: "Hi", fa: "سلام" }) -> text in current language
  const pick = useCallback((textByLanguage) => textByLanguage?.[language] ?? textByLanguage?.en ?? "", [language]);

  const price = useCallback((amount) => formatPrice(amount, language, restaurant.currency), [language]);

  return { language, setLanguage, dir: config.dir, isRtl: config.dir === "rtl", t, pick, price };
}
