# Restaurant Growth Platform: Saffron House demo

A complete, customizable restaurant website (React + Vite + Tailwind) with a digital menu, WhatsApp ordering inquiries, gallery, offers, and **English / Dari / Pashto** support with correct RTL layouts. There is no backend: everything is driven by data files, so you can rebrand it for a new restaurant in about an hour.

All names, phone numbers, addresses and links are **fictional demo data**.

## Run it

```bash
npm install
npm run dev        # development server (http://localhost:5173)
npm run build      # production build into /dist
npm run preview    # preview the production build locally
```

Requires Node 18 or newer.

## Folder structure

```
src/
  app/            App.jsx (shell, language direction, brand colors), router.jsx, ScrollManager.jsx
  components/
    common/       Button, Badge, Container, SectionHeading, EmptyState, SmartImage,
                  LanguageSwitcher, Logo, SocialIcon
    layout/       Navbar, MobileMenu, Footer
    home/         Hero, FeaturedDishes, StorySection, GallerySection,
                  OffersSection, LocationSection, ContactSection
    menu/         MenuCard, MenuGrid, MenuFilters, MenuSearch
    gallery/      GalleryGrid, Lightbox
    ordering/     CartDrawer, CartItem, OrderSummary, OrderInquiryForm
  pages/          HomePage, MenuPage, NotFoundPage
  data/           restaurant.js  menu.js  gallery.js  offers.js  translations.js  navigation.js
  hooks/          useLanguage.js  useMenu.js  useModal.js
  store/          cartStore.js
  utils/          currency.js  whatsapp.js  date.js
  styles/         index.css (design tokens + typography classes)
```

Two files were added to your suggested structure for good reasons: `useModal.js` (one shared place for Escape key, focus trap and focus return, used by the cart, mobile menu and lightbox) and `navigation.js` (nav links shared by navbar, mobile menu and footer).

## How the app works (data flow)

1. **Data files** (`src/data/*`) hold all content. Components contain no restaurant text.
2. **Language**: `useLanguage()` gives every component `t("key")` for interface text and `pick({en, fa, ps})` for text inside data files. Choosing a language updates a small Zustand store and LocalStorage; `App.jsx` then sets `<html lang dir>`, which flips the layout to RTL. Layout uses logical Tailwind classes (`ps-`, `pe-`, `start-`, `end-`, `ms-`, `me-`), so it mirrors automatically. Photos are never mirrored.
3. **Menu**: `useMenu()` keeps `query` and `category`; the visible dishes are *calculated* from them (not stored), so filters and results can never get out of sync. Search matches dish names in all three languages.
4. **Cart**: the cart store keeps only `[{ id, quantity }]` (saved in LocalStorage). Names and prices are looked up from `menu.js` at display time, so price changes apply instantly and sold-out dishes are skipped.
5. **WhatsApp inquiry**: form is validated, then `buildOrderMessage()` + `buildWhatsAppLink()` produce a `wa.me` link that opens WhatsApp with the message ready. The site never says an order was placed or paid; it says the restaurant must confirm.

## Customize for a new restaurant

| To change | Edit |
|---|---|
| Name, logo, colors, phone, WhatsApp, address, hours, social links, currency, languages, hero images | `src/data/restaurant.js` |
| Dishes, prices, categories, badges, dietary labels, sold-out status | `src/data/menu.js` |
| Promotions (and expiry dates) | `src/data/offers.js` |
| Gallery photos | `src/data/gallery.js` |
| Any wording, story text, translations | `src/data/translations.js` |

**WhatsApp number:** in `restaurant.js` set `whatsappNumber` to digits only, with country code, no `+` or spaces (e.g. `+93 70 123 4567` becomes `"93701234567"`). If it is malformed, the site shows a clear configuration error instead of a broken button.

**Add a dish:** copy an object in `menu.js`, give it a new unique `id`, set `category`, `price` (a number), `image`, and the `name`/`description` in `en`, `fa`, `ps`. Set `featured: true` to show it on the home page, `available: false` to mark it sold out.

**Add a category:** add its id to `categoryIds` in `menu.js` and its label under `categories` in `translations.js`.

**Brand colors:** `restaurant.colors` uses `"R G B"` numbers. Example for green: `accent: "34 110 70"`, `accentDark: "24 80 50"`.

**Your own images:** put files in `public/images/` and use `"/images/dish.jpg"` as the image value. For a real customer, use their own photos (see TODO below).

**Currency:** change `currency.code` (any ISO code: `USD`, `AFN`, `EUR`, `PKR`) and `decimals`.

**Add a language:** add an object in `translations.js` and an entry in `restaurant.languages` (`dir: "ltr"` or `"rtl"`). Remove a language from that list to hide it.

## Deploy

The build output is static files in `dist/`. Any static host works. SPA routing (`/menu` on refresh) is already handled by `public/_redirects` (Netlify, Cloudflare Pages) and `vercel.json` (Vercel).

- **Netlify:** push to GitHub, "Add new site", import the repo, build command `npm run build`, publish directory `dist`.
- **Vercel:** import the repo, framework preset "Vite".
- **Cloudflare Pages:** build command `npm run build`, output directory `dist`.
- **Custom domain:** add it in the host's dashboard and follow its DNS instructions (HTTPS is automatic).
- **Sub-path hosting:** if the site lives at `example.com/saffron/`, set `base: "/saffron/"` in `vite.config.js`.

## Demo checklist (before showing a restaurant owner)

- [ ] Replace the demo WhatsApp number with **your own phone**, so the owner can see the real message arrive.
- [ ] Open the site on your phone, not only the laptop.
- [ ] Show the menu search and category filters.
- [ ] Switch language to Dari, then Pashto, and point out the right-to-left layout.
- [ ] Add dishes, open the order panel, send an inquiry, and show the WhatsApp message.
- [ ] Show the gallery and Escape-to-close photo viewer.
- [ ] Have the owner's own logo and 5 to 10 real dish photos ready to show a "preview" with their branding.
- [ ] Be clear that it sends WhatsApp inquiries; payments are not included in this version.

## Known limitations and TODO

- **Photos are loaded from Unsplash URLs and could not be verified** in the environment this was built in. If any fails to load, the site shows a neutral placeholder. Before any real demo, check every image, and replace them with licensed or the customer's own photos in `public/images/`.
- **Dari and Pashto text should be reviewed by a native speaker** before you show it to customers (dish descriptions especially).
- Dish, brand and restaurant text is fictional; the "Since 2016" claim in `hero.eyebrow` is placeholder copy.
- TODO: replace the Google Maps links with an embedded map for the customer's real address.
- TODO: real photography and a real logo per customer.
- TODO: connect to a Laravel REST API (replace the imports in `src/data/*` with `fetch` calls, keeping the same object shapes).
- TODO: multi-tenant SaaS: restaurant login, dashboard, menu management, order management, analytics, subscriptions, staff roles. All authorization must be enforced server-side, with each restaurant's data isolated. Never put secrets or API keys in frontend code.
- TODO: SEO (per-restaurant meta tags, Open Graph image), analytics, and a contact/booking form if requested.
- TODO: automated tests (Vitest + React Testing Library).
