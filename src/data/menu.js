// =====================================================================
// MENU DATA  - presentation components never contain dish text.
// =====================================================================
// HOW TO ADD A DISH: copy one object in `menuItems`, give it a NEW unique `id`,
// then fill in the fields:
//   id          unique number
//   category    one of the category ids below ("starters", "mains", ...)
//   price       a plain number in the restaurant currency (see restaurant.js)
//   image       a photo() id or "/images/file.jpg"
//   badge       null | "bestseller" | "chefsChoice" | "new" (labels are in translations.js)
//   dietary     any of: "vegetarian", "vegan", "glutenFree", "spicy", "halal"
//   available   false shows "Sold out" and disables ordering
//   featured    true shows the dish in the "Featured dishes" section on the home page
//   name / description: text for each language (en, fa, ps)
//
// HOW TO ADD A CATEGORY: add an id to `categoryIds`, then add its label to
// translations.js under `categories`.
// TODO: later this file will be replaced by a fetch() call to the Laravel API.
// =====================================================================
import { photo } from "./restaurant";

export const categoryIds = ["starters", "mains", "grilled", "vegetarian", "desserts", "beverages"];

export const menuItems = [
  {
    id: 1,
    category: "starters",
    price: 5.5,
    image: photo("1601050690597-df0568f70950", 800),
    badge: null,
    dietary: ["vegetarian", "spicy"],
    available: true,
    featured: false,
    name: { en: "Crispy Bolani", fa: "بولانی کراچی", ps: "کرکړی بولاني" },
    description: {
      en: "Thin pastry stuffed with potato and leek, pan-fried until golden. Served with mint yogurt.",
      fa: "نان نازک پر از کچالو و گندنه، تفت‌شده تا طلایی شود. با ماست و نعناع.",
      ps: "نری ډوډۍ چې په کچالو او ګندنه ډکه ده، تر زرغونه پورې تړل شوې. د پودینې له ماستو سره.",
    },
  },
  {
    id: 2,
    category: "starters",
    price: 6.0,
    image: photo("1583394838336-acd977736f90", 800),
    badge: "bestseller",
    dietary: ["halal"],
    available: true,
    featured: true,
    name: { en: "Mantu Dumplings", fa: "منتو", ps: "منتو" },
    description: {
      en: "Steamed dumplings filled with spiced beef and onion, topped with yogurt and lentil sauce.",
      fa: "منتوی بخارپز با گوشت گاو و پیاز، همراه ماست و ماش.",
      ps: "د غوا غوښې او پیازو سره ډک بخار پخ منتو، د ماستو او مشو سره.",
    },
  },
  {
    id: 3,
    category: "starters",
    price: 4.5,
    image: photo("1547592166-23ac45744acd", 800),
    badge: null,
    dietary: ["vegan", "glutenFree"],
    available: true,
    featured: false,
    name: { en: "Lentil Soup", fa: "شوروای ماش", ps: "د مشو شوروا" },
    description: {
      en: "Slow-cooked lentils with cumin, garlic and a squeeze of lemon.",
      fa: "ماش پخته‌شده با زیره، سیر و کمی لیمو.",
      ps: "ورو ورو پخ شوي مشان د زیرې، سیرو او لیمو سره.",
    },
  },
  {
    id: 4,
    category: "mains",
    price: 14.0,
    image: photo("1631452180519-c014fe946bc7", 800),
    badge: "chefsChoice",
    dietary: ["halal", "spicy"],
    available: true,
    featured: true,
    name: { en: "Saffron Chicken Karahi", fa: "کرایی مرغ زعفرانی", ps: "د زعفرانو چرګ کړایی" },
    description: {
      en: "Tender chicken simmered with tomato, ginger and saffron in a hot iron pan. Served with naan.",
      fa: "مرغ نرم پخته‌شده با رومی، زنجبیل و زعفران در تابهٔ آهنی. با نان.",
      ps: "نرم چرګ د ټماټرو، زنجبیل او زعفرانو سره په اوسپنیزه کړایۍ کې پخ شوی. له ډوډۍ سره.",
    },
  },
  {
    id: 5,
    category: "mains",
    price: 12.5,
    image: photo("1596797038530-2c107229654b", 800),
    badge: "bestseller",
    dietary: ["halal", "glutenFree"],
    available: true,
    featured: true,
    name: { en: "Kabuli Pulao", fa: "کابلی پلو", ps: "کابلي پلاو" },
    description: {
      en: "Fragrant basmati rice with lamb, caramelised carrots and raisins. A national classic.",
      fa: "برنج باسمتی خوشبو با گوشت بره، زردک و کشمش. یک غذای اصیل ملی.",
      ps: "خوشبويه باسمتي وريژې د وزې غوښې، ګاجرو او مېوږو سره. یو اصيل ملي خواړه.",
    },
  },
  {
    id: 6,
    category: "mains",
    price: 11.0,
    image: photo("1585937421612-70a008356fbe", 800),
    badge: null,
    dietary: ["halal"],
    available: false,
    featured: false,
    name: { en: "Lamb Qorma", fa: "قورمهٔ گوسفند", ps: "د وزې غوښې قورمه" },
    description: {
      en: "Slow-braised lamb in an onion and yogurt gravy with warm spices.",
      fa: "گوشت گوسفند آهسته پخته‌شده در ماست و پیاز با ادویهٔ گرم.",
      ps: "د وزې غوښه په پیازو او ماستو کې په ارامۍ پخه شوې، له تودو مصالحو سره.",
    },
  },
  {
    id: 7,
    category: "grilled",
    price: 13.0,
    image: photo("1555939594-58d7cb561ad1", 800),
    badge: "chefsChoice",
    dietary: ["halal", "glutenFree"],
    available: true,
    featured: true,
    name: { en: "Lamb Chopan Kebab", fa: "کباب چوپان", ps: "د چوپان کباب" },
    description: {
      en: "Marinated lamb ribs grilled over charcoal with salt, pepper and fresh bread.",
      fa: "پاچهٔ گوسفند مزه‌دار شده، روی زغال کباب می‌شود، با نان تازه.",
      ps: "د وزې پښتۍ چې په سکروټو کې پخې شوي، له تازه ډوډۍ سره.",
    },
  },
  {
    id: 8,
    category: "grilled",
    price: 9.5,
    image: photo("1529042410759-befb1204b468", 800),
    badge: null,
    dietary: ["halal", "spicy"],
    available: true,
    featured: false,
    name: { en: "Chicken Tikka Skewers", fa: "سیخ تکه مرغ", ps: "د چرګ تکه سیخونه" },
    description: {
      en: "Chicken marinated in yogurt and chilli, grilled on skewers. Served with salad and chutney.",
      fa: "مرغ مزه‌دار شده با ماست و مرچ، روی سیخ کباب می‌شود. با سلاد و چټنی.",
      ps: "چرګ د ماستو او مرچو سره مزه شوی، په سیخ پخ شوی. له سلاد او چټنۍ سره.",
    },
  },
  {
    id: 9,
    category: "vegetarian",
    price: 8.5,
    image: photo("1512621776951-a57141f2eefd", 800),
    badge: "new",
    dietary: ["vegetarian", "glutenFree"],
    available: true,
    featured: false,
    name: { en: "Spiced Eggplant Borani", fa: "بورانی بادنجان", ps: "د بادنجان بورانۍ" },
    description: {
      en: "Fried eggplant over garlic yogurt, finished with dried mint and tomato.",
      fa: "بادنجان تفت‌شده روی ماست و سیر، با نعناع خشک و رومی.",
      ps: "تفت شوی بادنجان د سیرو ماستو پر سر، د وچې پودینې او ټماټرو سره.",
    },
  },
  {
    id: 10,
    category: "vegetarian",
    price: 9.0,
    image: photo("1540189549336-e6e99c3679fe", 800),
    badge: null,
    dietary: ["vegan", "glutenFree"],
    available: true,
    featured: false,
    name: { en: "Chickpea & Spinach Curry", fa: "کاری نخود و پالک", ps: "د نخودو او پالک کاری" },
    description: {
      en: "Chickpeas and spinach simmered in a tomato and coconut sauce. Served with rice.",
      fa: "نخود و پالک پخته‌شده در سس رومی و ناریل. با برنج.",
      ps: "نخود او پالک د ټماټرو او ناریل په ساس کې پخ شوي. له وریژو سره.",
    },
  },
  {
    id: 11,
    category: "desserts",
    price: 5.0,
    image: photo("1488477181946-6428a0291777", 800),
    badge: "chefsChoice",
    dietary: ["vegetarian", "glutenFree"],
    available: true,
    featured: true,
    name: { en: "Saffron Firni", fa: "فرنی زعفرانی", ps: "د زعفرانو فرني" },
    description: {
      en: "Silky milk pudding scented with cardamom and saffron, topped with pistachio.",
      fa: "فرنی نرم با هیل و زعفران، با پسته.",
      ps: "نرم د شیدو پوډنګ د هیل او زعفرانو بوی سره، د پسته سره.",
    },
  },
  {
    id: 12,
    category: "desserts",
    price: 4.5,
    image: photo("1551024601-bec78aea704b", 800),
    badge: null,
    dietary: ["vegetarian"],
    available: true,
    featured: true,
    name: { en: "Rose Baklava", fa: "باقلوای گلاب", ps: "د ګلاب باقلوا" },
    description: {
      en: "Flaky pastry layered with walnuts and honey, finished with rose syrup.",
      fa: "خمیر ورقه‌ای با مغز و عسل، با شربت گلاب.",
      ps: "ورقه ورقه خمیر د مغزو او شاتو سره، د ګلاب شربت سره.",
    },
  },
  {
    id: 13,
    category: "beverages",
    price: 2.5,
    image: photo("1544145945-f90425340c7e", 800),
    badge: null,
    dietary: ["vegan", "glutenFree"],
    available: true,
    featured: false,
    name: { en: "Cardamom Green Tea", fa: "چای سبز هیل‌دار", ps: "د هیل شنه چای" },
    description: {
      en: "Pot of green tea brewed with cardamom, served with sugar cubes.",
      fa: "قوری چای سبز با هیل، با قند.",
      ps: "د هیل شنه چای کوټه، له قند سره.",
    },
  },
  {
    id: 14,
    category: "beverages",
    price: 3.5,
    image: photo("1553530666-ba11a7da3888", 800),
    badge: null,
    dietary: ["vegetarian", "glutenFree"],
    available: true,
    featured: false,
    name: { en: "Mint Doogh", fa: "دوغ نعناع", ps: "د پودینې دوغ" },
    description: {
      en: "Chilled yogurt drink with mint and a pinch of salt. Refreshing with grilled food.",
      fa: "نوشیدنی سرد ماست با نعناع و کمی نمک. همراه کباب عالی است.",
      ps: "یخ د ماستو څښاک د پودینې او لږ مالګې سره. له کبابو سره ډېر ښه دی.",
    },
  },
];
