// lib/gumroad/catalog.ts

// ── Fourthwall (physical objects) ────────────────────────────────────────────
export type FourthwallItem = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  /** Full URL to the product on store.hydromedon.com */
  storeUrl: string;
  priceText?: string;
  kind: "object";
};

export const objects: FourthwallItem[] = [
  {
    kind: "object",
    slug: "tees",
    title: "Tees",
    description: "A quiet garment bearing the mark of the Hydromedon project.",
    imageSrc: "/brand/merch/tee-front-full.png",
    storeUrl: "https://store.hydromedon.com/collections/tees",
    priceText: "",
  },
  {
    kind: "object",
    slug: "hoodies",
    title: "Hoodies",
    description: "A weightier piece, created for colder days and quieter seasons.",
    imageSrc: "/brand/merch/hoodie-front-full.png",
    storeUrl: "https://store.hydromedon.com/collections/hoodies",
    priceText: "",
  },
];

// ── Gumroad (digital items) ───────────────────────────────────────────────────
export type GumroadItem = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  gumroadUrl: string;
  priceText?: string;
  kind: "sheetmusic";
};

export function getObjectBySlug(slug: string) {
  return objects.find(o => o.slug === slug) ?? null;
}

// ── Music Sheets ─────────────────────────────────────────────────────────────
// Downloadable sheet music / lead sheets for individual tracks.

export const sheets: GumroadItem[] = [
  // 1) Biblical Graffiti (Album)
  {
    kind: "sheetmusic",
    slug: "biblical-graffiti-resources",
    title: "Biblical Graffiti — Worship\u2011Ready Sheet Music Bundle",
    description: "All songs + all parts in consistent formatting — built for rehearsal and service.",
    imageSrc: "/covers/biblical-graffiti.jpg",
    gumroadUrl: "https://store.hydromedon.com/collections/collection-biblical-graffiti-resources",
    priceText: "",
  },

  // 2) Your Peace Surpasses All Understanding
  {
    kind: "sheetmusic",
    slug: "your-peace-resources",
    title: "Your Peace Surpasses All Understanding",
    description: "Lead sheet, song bundle, and all related resources.",
    imageSrc: "/covers/your-peace-surpasses-all-understanding.jpg",
    gumroadUrl: "https://store.hydromedon.com/collections/your-peace-surpasses-all-understanding-resources",
    priceText: "",
  },

  // 3) Under Your Wings
  {
    kind: "sheetmusic",
    slug: "under-your-wings-resources",
    title: "Under Your Wings",
    description: "Lead sheet, song bundle, and all related resources.",
    imageSrc: "/covers/under-your-wings.jpg",
    gumroadUrl: "https://store.hydromedon.com/collections/under-your-wings-resources",
    priceText: "",
  },

  // 4) The Lord Bless You and Keep You
  {
    kind: "sheetmusic",
    slug: "the-lord-bless-you-and-keep-you-resources",
    title: "The Lord Bless You and Keep You",
    description: "Lead sheet, song bundle, and all related resources.",
    imageSrc: "/covers/the-lord-bless-you.jpg",
    gumroadUrl: "https://store.hydromedon.com/collections/the-lord-bless-you-and-keep-you-resources",
    priceText: "",
  },

  // 5) Make a Way
  {
    kind: "sheetmusic",
    slug: "make-a-way-resources",
    title: "Make a Way",
    description: "Lead sheet, song bundle, and all related resources.",
    imageSrc: "/covers/make-a-way.jpg",
    gumroadUrl: "https://store.hydromedon.com/collections/make-a-way-resources",
    priceText: "",
  },

  // 6) Change Me, Mold Me, Make Me New
  {
    kind: "sheetmusic",
    slug: "change-me-mold-me-make-me-new-resources",
    title: "Change Me, Mold Me, Make Me New",
    description: "Lead sheet, song bundle, and all related resources.",
    imageSrc: "/covers/change-me-mold-me.jpg",
    gumroadUrl: "https://store.hydromedon.com/collections/change-me-mold-me-make-me-new-resources",
    priceText: "",
  },

  // 7) Armor of Light
  {
    kind: "sheetmusic",
    slug: "armor-of-light-resources",
    title: "Armor of Light",
    description: "Lead sheet, song bundle, and all related resources.",
    imageSrc: "/covers/armor-of-light.jpg",
    gumroadUrl: "https://store.hydromedon.com/collections/armor-of-light-resources",
    priceText: "",
  },

  // 8) Beauty for Ashes
  {
    kind: "sheetmusic",
    slug: "beauty-for-ashes-resources",
    title: "Beauty for Ashes",
    description: "Lead sheet, song bundle, and all related resources.",
    imageSrc: "/covers/beauty-for-ashes.jpg",
    gumroadUrl: "https://store.hydromedon.com/collections/beauty-for-ashes-resources",
    priceText: "",
  },

  // 9) Arise, O Lord
  {
    kind: "sheetmusic",
    slug: "arise-o-lord-resources",
    title: "Arise, O Lord",
    description: "Lead sheet, song bundle, and all related resources.",
    imageSrc: "/covers/arise-o-lord.jpg",
    gumroadUrl: "https://store.hydromedon.com/collections/arise-o-lord-resources",
    priceText: "",
  },
];

export function getSheetBySlug(slug: string) {
  return sheets.find(s => s.slug === slug) ?? null;
}