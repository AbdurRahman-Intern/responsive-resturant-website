// Navigation links, shared by the navbar, mobile menu and footer.
// `key` is used for the label: t("nav.<key>").
// "/#story" means: go to the home page and scroll to the element with id="story"
// (the scrolling itself is done by src/app/ScrollManager.jsx).
// To add a link, add a line here and a matching label in translations.js.
export const navLinks = [
  { key: "home", to: "/" },
  { key: "menu", to: "/menu" },
  { key: "story", to: "/#story" },
  { key: "gallery", to: "/#gallery" },
  { key: "contact", to: "/#contact" },
];
