// =====================================================================
// SPECIAL OFFERS
// =====================================================================
// The Offers section simply loops over this list. To add an offer, copy an
// object. To hide the whole section, make the array empty: export const offers = [];
//
// validFrom / validUntil: "YYYY-MM-DD" or null. Offers whose validUntil date
// has passed are hidden automatically (see isOfferActive below).
// cta.type: "menu" (goes to the menu page) | "whatsapp" (opens WhatsApp with a
// message) | "phone" (starts a call).
// =====================================================================

export const offers = [
  {
    id: "o1",
    validFrom: null,
    validUntil: "2027-12-31",
    cta: { type: "menu" },
    title: { en: "Family Feast", fa: "ضیافت خانوادگی", ps: "کورنۍ ضیافت" },
    description: {
      en: "Kabuli Pulao and Chopan Kebab for four, with two drinks. A demo offer for sharing.",
      fa: "کابلی پلو و کباب چوپان برای چهار نفر، همراه دو نوشیدنی. یک پیشنهاد نمونه.",
      ps: "د څلورو کسانو لپاره کابلي پلاو او چوپان کباب، له دوو څښاکونو سره. یوه نمونه وړاندیز.",
    },
  },
  {
    id: "o2",
    validFrom: null,
    validUntil: "2027-12-31",
    cta: { type: "whatsapp" },
    whatsappMessage: {
      en: "Hello! I would like to book a table for the weekend lunch offer.",
      fa: "سلام! می‌خواهم برای پیشنهاد ناهار آخر هفته میز رزرو کنم.",
      ps: "سلام! غواړم د اونۍ پای د غرمې وړاندیز لپاره میز وسپارم.",
    },
    title: { en: "Weekend Lunch", fa: "ناهار آخر هفته", ps: "د اونۍ پای غرمه" },
    description: {
      en: "Every Friday, a starter and main course at a set price. Message us to reserve a table.",
      fa: "هر جمعه یک پیش‌غذا و غذای اصلی با قیمت ثابت. برای رزرو میز پیام بدهید.",
      ps: "هره جمعه یو پیل خواړه او اصلي خواړه په ټاکلي بیه. د میز لپاره موږ ته پیغام ولیږئ.",
    },
  },
  {
    id: "o3",
    validFrom: null,
    validUntil: "2020-01-01", // already expired -> hidden. Shows how expiry works.
    cta: { type: "menu" },
    title: { en: "Old Offer", fa: "پیشنهاد قدیمی", ps: "زوړ وړاندیز" },
    description: { en: "Expired.", fa: "منقضی شده.", ps: "پای ته رسېدلی." },
  },
];

// Returns true if today's date is inside the offer's validity window.
export function isOfferActive(offer, today = new Date()) {
  const start = offer.validFrom ? new Date(offer.validFrom) : null;
  // Add one day so the "until" date itself is still valid
  const end = offer.validUntil ? new Date(new Date(offer.validUntil).getTime() + 86400000) : null;
  if (start && today < start) return false;
  if (end && today >= end) return false;
  return true;
}
