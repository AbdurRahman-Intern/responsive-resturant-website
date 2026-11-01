// =====================================================================
// RESTAURANT CONFIGURATION  (the ONE file to edit for a new customer)
// =====================================================================
// To create a website for a new restaurant:
//   1. Change the values below (name, contact, colors, hours, ...).
//   2. Edit src/data/menu.js     -> dishes and categories
//   3. Edit src/data/offers.js   -> promotions
//   4. Edit src/data/gallery.js  -> gallery photos
//   5. Edit src/data/translations.js -> the story text and any wording
// No component needs to be touched.
//
// ALL DATA HERE IS FICTIONAL DEMO DATA (phone numbers, address, links).
// =====================================================================

// Helper to build Unsplash photo URLs from a photo id.
// You can replace any image with your own file: put it in /public/images/
// and use the path "/images/my-photo.jpg" instead.
export const photo = (id, width = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;

export const restaurant = {
  // ---- Identity -----------------------------------------------------
  // names are per language so the brand can be translated or transliterated
  name: { en: "Saffron House", fa: "خانهٔ زعفران", ps: "د زعفرانو کور" },
  // Logo: shown as a small round mark. Set `logoImage` to a path (e.g. "/logo.png")
  // to use a real logo file instead of the letter.
  logoLetter: "S",
  logoImage: null,

  // ---- Brand colors (R G B numbers, see src/styles/index.css) -------
  // Example: a green restaurant -> accent: "34 110 70", accentDark: "24 80 50"
  colors: {
    accent: "154 59 31",
    accentDark: "120 42 20",
    cream: "247 241 229",
  },

  // ---- Contact ------------------------------------------------------
  // WhatsApp number: digits ONLY, with country code, no "+" or spaces.
  // Example: +93 70 000 0000  ->  "93700000000"
  // This is a FICTIONAL number. Replace it with the real one.
  whatsappNumber: "93770919175",
  phone: "+93770919175", // shown on screen
  phoneLink: "+93770919175", // used in tel: links (no spaces)
  email: "hello@saffronhouse.example",

  // ---- Address & map ------------------------------------------------
  address: {
    en: "12 Demo Street, Sample District, Kabul (fictional address)",
    fa: "خیابان نمونه ۱۲، ناحیهٔ نمونه، کابل (آدرس فرضی)",
    ps: "د نمونې کوڅه ۱۲، د نمونې ولسوالۍ، کابل (فرضي پته)",
  },
  // Used to build the Google Maps links. Use the real address for a real customer.
  mapQuery: "Kabul, Afghanistan",

  // ---- Opening hours ------------------------------------------------
  // `day` is a key into translations.js (days.mon ...). `hours` null = closed.
  hours: [
    { day: "sat", hours: "11:00 - 22:00" },
    { day: "sun", hours: "11:00 - 22:00" },
    { day: "mon", hours: "11:00 - 22:00" },
    { day: "tue", hours: "11:00 - 22:00" },
    { day: "wed", hours: "11:00 - 22:00" },
    { day: "thu", hours: "11:00 - 23:00" },
    { day: "fri", hours: "13:00 - 23:00" },
  ],

  // ---- Social links (set to null to hide one) -----------------------
  // These are example links, replace them with real pages.
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  // ---- Money --------------------------------------------------------
  // `code` is any ISO currency code (USD, AFN, EUR, ...).
  // Prices in menu.js are plain numbers in THIS currency.
  currency: { code: "USD", decimals: 2 },

  // ---- Languages ----------------------------------------------------
  // Remove a language from this list to hide it from the switcher.
  // `dir` controls layout direction, `label` is shown in the switcher.
  languages: [
    { code: "en", label: "English", dir: "ltr" },
    { code: "fa", label: "دری", dir: "rtl" }, // Dari
    { code: "ps", label: "پښتو", dir: "rtl" }, // Pashto
  ],
  defaultLanguage: "en",

  // ---- Hero & story images ------------------------------------------
  images: {
    hero: photo("1565557623262-b51c2513a641", 1400),
    story: photo("1556910103-1c02745aae4d", 900),
    storySecondary: photo("1559339352-11d035aa65de", 700),
  },
};

// Quick safety net: warns in the console if something important is missing,
// so a typo for a new customer is easy to find instead of failing silently.
export function validateRestaurantConfig(config = restaurant) {
  const problems = [];
  if (!config.name?.en) problems.push("name.en is missing");
  if (!/^\d{8,15}$/.test(config.whatsappNumber || ""))
    problems.push(
      "whatsappNumber must be digits only with country code (e.g. 93700000000)",
    );
  if (!config.languages?.length) problems.push("languages list is empty");
  if (!config.currency?.code) problems.push("currency.code is missing");
  if (!config.hours?.length) problems.push("hours list is empty");
  return problems;
}
