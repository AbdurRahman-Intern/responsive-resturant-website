// =====================================================================
// PRICE FORMATTING
// =====================================================================
// Menu prices are plain numbers (e.g. 12.5). This function turns them into
// text like "$12.50" using the restaurant currency from restaurant.js.
// It uses the browser's built-in Intl.NumberFormat, so a restaurant that
// sells in AFN, EUR, PKR... only needs to change `currency.code`.
//
// We always format with the en-US pattern and normal digits (0-9), in every
// language. Reason: Dari and Pashto locales use different decimal/thousand
// separators ("12,50", "1.250") that confuse customers on a menu. One format
// everywhere keeps prices unambiguous.
// Components wrap prices in dir="ltr" so they read correctly inside RTL text.
// (languageCode is kept as a parameter in case a customer wants local formats.)
export function formatPrice(amount, languageCode, currency) {
  const decimals = currency.decimals ?? 2;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch (error) {
    // Unknown currency code: fall back to a simple format
    return `${Number(amount).toFixed(decimals)} ${currency.code}`;
  }
}
