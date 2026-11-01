/** @type {import('tailwindcss').Config} */
// DESIGN SYSTEM
// Colors are CSS variables (defined in src/styles/index.css) so that
// restaurant.js can override the brand colors at runtime for each customer.
// Using them in classes: bg-cream, text-charcoal, bg-accent, text-accent-dark ...
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        sand: "rgb(var(--color-sand) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-dark": "rgb(var(--color-accent-dark) / <alpha-value>)",
        olive: "rgb(var(--color-olive) / <alpha-value>)",
      },
      fontFamily: {
        // Display = headings. Body = everything else. The "Arabic" fonts are
        // used automatically for Dari/Pashto via the [dir="rtl"] rule in index.css.
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -8px rgb(0 0 0 / 0.12)",
      },
    },
  },
  plugins: [],
};
