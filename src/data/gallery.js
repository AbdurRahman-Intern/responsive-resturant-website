// =====================================================================
// GALLERY DATA
// =====================================================================
// Each item: id, group (for the label), image, and a short `alt` per language.
// Alt text matters: screen readers read it, and it is shown in the lightbox.
// `span` controls the editorial layout: "tall" | "wide" | "normal".
// =====================================================================
import { photo } from "./restaurant";

export const galleryItems = [
  {
    id: "g1",
    group: "dishes",
    span: "tall",
    image: photo("1565557623262-b51c2513a641", 900),
    alt: {
      en: "A bowl of saffron chicken curry with fresh herbs",
      fa: "یک کاسه کاری مرغ زعفرانی با سبزی تازه",
      ps: "د زعفرانو چرګ کاري یو پیاله له تازه سبزیجاتو سره",
    },
  },
  {
    id: "g2",
    group: "interior",
    span: "wide",
    image: photo("1517248135467-4c7edcad34c4", 1000),
    alt: {
      en: "Warmly lit dining room with wooden tables",
      fa: "تالار غذاخوری با روشنایی گرم و میزهای چوبی",
      ps: "د خواړو تالار د تودې رڼا او لرګينو میزونو سره",
    },
  },
  {
    id: "g3",
    group: "preparation",
    span: "normal",
    image: photo("1556910103-1c02745aae4d", 800),
    alt: {
      en: "Chef preparing a dish in the kitchen",
      fa: "آشپز در حال آماده کردن غذا در آشپزخانه",
      ps: "پخلی کوونکی په پخلنځي کې خواړه چمتو کوي",
    },
  },
  {
    id: "g4",
    group: "dishes",
    span: "normal",
    image: photo("1555939594-58d7cb561ad1", 800),
    alt: {
      en: "Grilled lamb kebabs on a platter",
      fa: "کباب گوشت بره روی بشقاب",
      ps: "د وزې غوښې کباب په پلیټ کې",
    },
  },
  {
    id: "g5",
    group: "dining",
    span: "normal",
    image: photo("1414235077428-338989a2e8c0", 800),
    alt: {
      en: "Guests sharing a meal at a table",
      fa: "مهمانان در حال خوردن غذا دور یک میز",
      ps: "میلمانه په یو میز کې خواړه خوري",
    },
  },
  {
    id: "g6",
    group: "interior",
    span: "tall",
    image: photo("1559339352-11d035aa65de", 800),
    alt: {
      en: "Restaurant interior with soft evening light",
      fa: "فضای داخلی رستورانت با نور ملایم شبانه",
      ps: "د رستورانت دننه د ماښام نرمې رڼا سره",
    },
  },
  {
    id: "g7",
    group: "dishes",
    span: "wide",
    image: photo("1512621776951-a57141f2eefd", 1000),
    alt: {
      en: "Colorful vegetarian plate with grains and vegetables",
      fa: "بشقاب رنگارنگ سبزیجات و غلات",
      ps: "رنګینه د سبزیجاتو او غلو پلیټ",
    },
  },
  {
    id: "g8",
    group: "preparation",
    span: "normal",
    image: photo("1577219491135-ce391730fb2c", 800),
    alt: {
      en: "Fresh ingredients being prepared by hand",
      fa: "مواد تازه که با دست آماده می‌شوند",
      ps: "تازه توکي چې په لاس چمتو کېږي",
    },
  },
];
