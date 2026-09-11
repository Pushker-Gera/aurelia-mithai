export type Product = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  price: number;
  ingredient: string;
  description: string;
  notes: string[];
  allergens: string;
  color: string;
  image: string;
  type: "katli" | "peda" | "ladoo" | "chocolate" | "pista" | "box";
};
export const products: Product[] = [
  {
    id: "noor",
    number: "01",
    name: "Noor",
    subtitle: "Saffron Kaju Katli",
    price: 1450,
    ingredient: "SAFFRON",
    type: "katli",
    color: "#d8ba86",
    image: "/images/noor.webp",
    description:
      "A quiet radiance. Finely milled cashew, a whisper of saffron, and delicate silver leaf. An icon, considered anew.",
    notes: ["Kashmiri saffron", "Whole cashews", "Edible silver"],
    allergens: "Contains cashews and milk.",
  },
  {
    id: "gul",
    number: "02",
    name: "Gul",
    subtitle: "Rose Pistachio Peda",
    price: 1250,
    ingredient: "ROSE",
    type: "peda",
    color: "#c78e87",
    image: "/images/gul.webp",
    description:
      "The memory of a rose garden. Slow-reduced milk meets delicate rose and the gentle crunch of pistachio.",
    notes: ["Damask rose", "Pistachio", "Slow-reduced milk"],
    allergens: "Contains pistachios and milk.",
  },
  {
    id: "ziya",
    number: "03",
    name: "Ziya",
    subtitle: "Motichoor Ladoo",
    price: 1100,
    ingredient: "SAFFRON",
    type: "ladoo",
    color: "#cd8142",
    image: "/images/ziya.webp",
    description:
      "A thousand tiny pearls, one extraordinary bite. Golden boondi, fragrant cardamom, and the warmth of pure ghee.",
    notes: ["Fine boondi", "Green cardamom", "Cultured ghee"],
    allergens: "Contains milk. Prepared in a kitchen handling nuts.",
  },
  {
    id: "mehr",
    number: "04",
    name: "Mehr",
    subtitle: "Dark Chocolate Barfi",
    price: 1550,
    ingredient: "CACAO",
    type: "chocolate",
    color: "#846252",
    image: "/images/mehr.webp",
    description:
      "A beautiful meeting of worlds. Deep cacao and traditional milk barfi, finished with an almost imperceptible flake of gold.",
    notes: ["Single-origin cacao", "Reduced milk", "Edible gold"],
    allergens: "Contains milk and almonds.",
  },
  {
    id: "sona",
    number: "05",
    name: "Sona",
    subtitle: "Pista & Silver Barfi",
    price: 1350,
    ingredient: "PISTACHIO",
    type: "pista",
    color: "#96976a",
    image: "/images/sona.webp",
    description:
      "Emerald at heart. Generous pistachio, a tender bite, and a hand-laid veil of silver. Nothing more than it needs.",
    notes: ["Pistachio kernels", "Cardamom", "Edible silver"],
    allergens: "Contains pistachios and milk.",
  },
  {
    id: "aurelia-box",
    number: "06",
    name: "The Aurelia Box",
    subtitle: "Signature Luxury Assortment",
    price: 3850,
    ingredient: "ALMOND",
    type: "box",
    color: "#bda271",
    image: "/images/box.webp",
    description:
      "Six expressions of our philosophy, brought together in a keepsake box. A considered introduction to the house of Aurelia.",
    notes: ["Six signature flavours", "Hand-finished assortment", "Keepsake packaging"],
    allergens: "Contains milk, cashews, pistachios, and almonds.",
  },
];
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
export const navLinks = [
  { label: "Collections", href: "/#collection" },
  { label: "Craft", href: "/#craft" },
  { label: "Story", href: "/#story" },
  { label: "Gifting", href: "/#gifting" },
  { label: "Journal", href: "/#journal" },
];
export const articles = [
  {
    slug: "the-ritual-of-saffron",
    category: "INGREDIENT STORIES",
    title: "The ritual of saffron.",
    image: "/images/hero.webp",
    alt: "Saffron threads and silver-leaf mithai in a sculptural still life",
    date: "September 2026",
    readTime: "3 MIN READ",
    intro: "Some ingredients ask you to slow down. Saffron is one of them.",
    paragraphs: [
      "Before colour, there is fragrance. Before fragrance, there is patience. A few crimson threads rest in warm milk, slowly releasing a warmth that cannot be hurried. In the Aurelia kitchen, this small ritual is where Noor begins.",
      "Saffron is never the loudest voice in a creation. We think of it as light: something that gives everything around it a little more depth. The cashew becomes warmer. The finish becomes longer. A familiar sweet becomes something you want to linger over.",
      "This is our imagined approach to an ingredient with an extraordinary place in Indian food culture. We begin with respect, work with restraint, and leave enough space for the ingredient to be itself.",
      "A silver finish. A golden heart. Sometimes, the smallest detail tells the whole story.",
    ],
  },
  {
    slug: "a-new-language-for-indian-gifting",
    category: "THE ART OF GIVING",
    title: "A new language for Indian gifting.",
    image: "/images/gifting.webp",
    alt: "An open espresso Aurelia gift box filled with assorted mithai",
    date: "September 2026",
    readTime: "4 MIN READ",
    intro: "The gift begins before the first bite.",
    paragraphs: [
      "There is a particular kind of anticipation in opening a beautiful box. The weight of the lid. The texture beneath your fingertips. The first glimpse of what someone has chosen for you. We believe that moment deserves as much care as the creation inside.",
      "In India, mithai has always marked the moments that matter. An arrival, a beginning, a celebration, a small expression of gratitude. Our imagined gifting collection carries that generous spirit into a contemporary visual language.",
      "Espresso-toned paper, a slender gold edge, and a composition of colour within. Every decision serves the same idea: to make the recipient feel considered. Packaging is part of the ritual, and the best kind finds a second life long after the sweets are gone.",
      "A wedding collection might echo a favourite flower. A private celebration might begin with a handwritten note. The most memorable luxury is personal.",
    ],
  },
  {
    slug: "why-craft-still-matters",
    category: "FROM THE ATELIER",
    title: "Why craft still matters.",
    image: "/images/craft.webp",
    alt: "An artisan carefully finishing kaju katli with delicate edible silver",
    date: "September 2026",
    readTime: "3 MIN READ",
    intro: "You can taste the difference between made and considered.",
    paragraphs: [
      "A hand-finished sweet is never entirely identical to the one beside it. A fold of silver catches light differently. A pistachio rests at a slightly different angle. These are not inconsistencies to erase. They are the quiet signatures of a maker.",
      "Aurelia is a fictional confectionery house, but the value it celebrates is real: the knowledge carried in hands. The judgement of texture, the familiarity with ingredients, the instinct for the precise moment to stop.",
      "Our approach to design follows the same principle. Form should make something feel more itself. The diamond of a kaju katli, the gentle sphere of a ladoo, the exact proportions of a gift box: each has a reason to be.",
      "Craft matters because attention matters. And something made with attention has a way of making us more attentive, too.",
    ],
  },
];
