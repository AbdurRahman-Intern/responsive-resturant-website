// Formats a "YYYY-MM-DD" date as DD/MM/YYYY (e.g. 31/12/2027).
// A numeric Gregorian format is used for every language on purpose:
// Dari/Pashto locales would otherwise default to the Solar Hijri calendar
// and mix scripts, which could confuse customers reading offer dates.
// Components wrap the result in dir="ltr".
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getUTCFullYear()}`;
}
