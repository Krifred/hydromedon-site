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
    slug: "sigil-tee",
    title: "Hydromedon Sigil Tee",
    description: "A quiet garment bearing the mark of the Hydromedon project.",
    imageSrc: "/merch/sigil-tee.jpg",
    storeUrl: "https://store.hydromedon.com/sigil-tee",
    priceText: "",
  },
  {
    kind: "object",
    slug: "lament-hoodie",
    title: "Lament Hoodie",
    description: "A weightier piece, created for colder days and quieter seasons.",
    imageSrc: "/merch/lament-hoodie.jpg",
    storeUrl: "https://store.hydromedon.com/lament-hoodie",
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
  kind: "artwork" | "sheetmusic";
};

export const artworks: GumroadItem[] = [
  {
    kind: "artwork",
    slug: "biblical-graffiti",
    title: "Biblical Graffiti — Artwork Print",
    description: "Original artwork created for Biblical Graffiti. A visual companion to the music.",
    imageSrc: "/artwork/biblical-graffiti.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME",
    priceText: "",
  },
  // Add future singles/albums here; archive grows permanently.
];

export function getArtworkBySlug(slug: string) {
  return artworks.find(a => a.slug === slug) ?? null;
}

export function getObjectBySlug(slug: string) {
  return objects.find(o => o.slug === slug) ?? null;
}

// ── Music Sheets ─────────────────────────────────────────────────────────────
// Downloadable sheet music / lead sheets for individual tracks.

export const sheets: GumroadItem[] = [
  // ====== Album Bundle (worship-ready) ======
  {
    kind: "sheetmusic",
    slug: "biblical-graffiti-album-bundle",
    title: "Biblical Graffiti — Worship‑Ready Sheet Music Bundle",
    description: "All songs + all parts in consistent formatting — built for rehearsal and service.",
    imageSrc: "/covers/biblical-graffiti.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME_ALBUM_BUNDLE",
    priceText: "",
  },

  // ====== Per-song offerings ======

  // 1) Your Peace Surpasses All Understanding
  {
    kind: "sheetmusic",
    slug: "your-peace-lead-sheet",
    title: "Your Peace Surpasses All Understanding",
    description: "Melody, lyrics, and chords — a simple entry point for teams.",
    imageSrc: "/covers/your-peace-surpasses-all-understanding.jpg",
    gumroadUrl: "https://hydromedon.gumroad.com/l/zbljst",
    priceText: "",
  },
  {
    kind: "sheetmusic",
    slug: "your-peace-song-bundle",
    title: "Your Peace Surpasses All Understanding",
    description: "Full score + individual parts + key & tempo reference.",
    imageSrc: "/covers/your-peace-surpasses-all-understanding.jpg",
    gumroadUrl: "https://hydromedon.gumroad.com/l/weqzl",
    priceText: "",
  },

  // 2) Under Your Wings
  {
    kind: "sheetmusic",
    slug: "under-your-wings-lead-sheet",
    title: "Under Your Wings",
    description: "Melody, lyrics, and chords — a simple entry point for teams.",
    imageSrc: "/covers/under-your-wings.jpg",
    gumroadUrl: "https://hydromedon.gumroad.com/l/gwoxeu",
    priceText: "",
  },
  {
    kind: "sheetmusic",
    slug: "under-your-wings-song-bundle",
    title: "Under Your Wings",
    description: "Full score + individual parts + key & tempo reference.",
    imageSrc: "/covers/under-your-wings.jpg",
    gumroadUrl: "https://hydromedon.gumroad.com/l/rhitbt",
    priceText: "",
  },

  // 3) The Lord Bless You and Keep You
  {
    kind: "sheetmusic",
    slug: "the-lord-bless-you-and-keep-you-lead-sheet",
    title: "The Lord Bless You and Keep You",
    description: "Melody, lyrics, and chords — a simple entry point for teams.",
    imageSrc: "/covers/the-lord-bless-you.jpg",
    gumroadUrl: "https://hydromedon.gumroad.com/l/ginpat",
    priceText: "",
  },
  {
    kind: "sheetmusic",
    slug: "the-lord-bless-you-and-keep-you-song-bundle",
    title: "The Lord Bless You and Keep You",
    description: "Full score + individual parts + key & tempo reference.",
    imageSrc: "/covers/the-lord-bless-you.jpg",
    gumroadUrl: "https://hydromedon.gumroad.com/l/rdcscy",
    priceText: "",
  },

  // 4) Make a Way
  {
    kind: "sheetmusic",
    slug: "make-a-way-lead-sheet",
    title: "Make a Way",
    description: "Melody, lyrics, and chords — a simple entry point for teams.",
    imageSrc: "/covers/make-a-way.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME_MAKE_A_WAY_LEAD",
    priceText: "",
  },
  {
    kind: "sheetmusic",
    slug: "make-a-way-song-bundle",
    title: "Make a Way",
    description: "Full score + individual parts + key & tempo reference.",
    imageSrc: "/covers/make-a-way.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME_MAKE_A_WAY_BUNDLE",
    priceText: "",
  },

  // 5) Change Me, Mold Me, Make Me New
  {
    kind: "sheetmusic",
    slug: "change-me-mold-me-make-me-new-lead-sheet",
    title: "Change Me, Mold Me, Make Me New",
    description: "Melody, lyrics, and chords — a simple entry point for teams.",
    imageSrc: "/covers/change-me-mold-me.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME_CHANGE_ME_LEAD",
    priceText: "",
  },
  {
    kind: "sheetmusic",
    slug: "change-me-mold-me-make-me-new-song-bundle",
    title: "Change Me, Mold Me, Make Me New",
    description: "Full score + individual parts + key & tempo reference.",
    imageSrc: "/covers/change-me-mold-me.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME_CHANGE_ME_BUNDLE",
    priceText: "",
  },

  // 6) Armor of Light
  {
    kind: "sheetmusic",
    slug: "armor-of-light-lead-sheet",
    title: "Armor of Light",
    description: "Melody, lyrics, and chords — a simple entry point for teams.",
    imageSrc: "/covers/armor-of-light.jpg",
    gumroadUrl: "https://hydromedon.gumroad.com/l/thuiy",
    priceText: "",
  },
  {
    kind: "sheetmusic",
    slug: "armor-of-light-song-bundle",
    title: "Armor of Light",
    description: "Full score + individual parts + key & tempo reference.",
    imageSrc: "/covers/armor-of-light.jpg",
    gumroadUrl: "https://hydromedon.gumroad.com/l/dnejt",
    priceText: "",
  },

  // 7) Beauty for Ashes
  {
    kind: "sheetmusic",
    slug: "beauty-for-ashes-lead-sheet",
    title: "Beauty for Ashes",
    description: "Melody, lyrics, and chords — a simple entry point for teams.",
    imageSrc: "/covers/beauty-for-ashes.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME_BEAUTY_LEAD",
    priceText: "",
  },
  {
    kind: "sheetmusic",
    slug: "beauty-for-ashes-song-bundle",
    title: "Beauty for Ashes",
    description: "Full score + individual parts + key & tempo reference.",
    imageSrc: "/covers/beauty-for-ashes.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME_BEAUTY_BUNDLE",
    priceText: "",
  },

  // 8) Arise, O Lord
  {
    kind: "sheetmusic",
    slug: "arise-o-lord-lead-sheet",
    title: "Arise, O Lord",
    description: "Melody, lyrics, and chords — a simple entry point for teams.",
    imageSrc: "/covers/arise-o-lord.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME_ARISE_LEAD",
    priceText: "",
  },
  {
    kind: "sheetmusic",
    slug: "arise-o-lord-song-bundle",
    title: "Arise, O Lord",
    description: "Full score + individual parts + key & tempo reference.",
    imageSrc: "/covers/arise-o-lord.jpg",
    gumroadUrl: "https://gum.co/REPLACE_ME_ARISE_BUNDLE",
    priceText: "",
  },
];

export function getSheetBySlug(slug: string) {
  return sheets.find(s => s.slug === slug) ?? null;
}