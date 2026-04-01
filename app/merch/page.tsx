
/* ==========================================================
   app/merch/page.tsx — Merch index
   Shows one CategoryTile per category. Sheet Music navigates
   to /sheet-music; other categories navigate to their first
   live collection page.
   ========================================================== */

import type { Metadata } from "next";
import Link from "next/link";
import { getCollections, parseCollectionSlug } from "@/lib/fourthwall";
import type { FWCollection } from "@/lib/fourthwall";
import { MERCH_CATALOG, resolveMerchEntries } from "@/lib/merch-catalog";
import type { MerchEntry } from "@/lib/merch-catalog";
import MerchIntro from "@/components/merch/MerchIntro";
import CategoryTile from "@/components/merch/CategoryTile";
import { collectionCovers } from "@/lib/collectionCovers";
import FadeIn from "@/components/FadeIn";
import MerchParallax from "@/components/merch/MerchParallax";

export const metadata: Metadata = {
    title: "Hydromedon Merch — Wearables, Drinkware, Computerware & Tidebound Objects",
    description:
        "Explore Hydromedon's cinematic merch collection — wearables, drinkware, computerware, and Tidebound Objects shaped by tide, time, and devotion. Designed with spiritual symbolism and intentional artistry.",
    alternates: {
        canonical: "https://www.hydromedon.com/merch",
    },
    openGraph: {
        title: "Hydromedon Merch — Wearables, Drinkware, Computerware & Tidebound Objects",
        description:
            "Explore Hydromedon's cinematic merch collection — wearables, drinkware, computerware, and Tidebound Objects shaped by tide, time, and devotion. Designed with spiritual symbolism and intentional artistry.",
        url: "https://www.hydromedon.com/merch",
        type: "website",
        images: [{ url: "/og/merch.jpg" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hydromedon Merch — Wearables, Drinkware, Computerware & Tidebound Objects",
        description:
            "Explore Hydromedon's cinematic merch collection — wearables, drinkware, computerware, and Tidebound Objects shaped by tide, time, and devotion. Designed with spiritual symbolism and intentional artistry.",
        images: ["/og/merch.jpg"],
    },
};

// ── JSON-LD Structured Data ───────────────────────────────────────────────────

const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Hydromedon Merch",
    "description": "Explore Hydromedon's cinematic merch collection — wearables, drinkware, computerware, and Tidebound Objects shaped by tide, time, and devotion. Designed with spiritual symbolism and intentional artistry.",
    "url": "https://www.hydromedon.com/merch",
} as const;

const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",  "item": "https://www.hydromedon.com" },
        { "@type": "ListItem", "position": 2, "name": "Merch", "item": "https://www.hydromedon.com/merch" },
    ],
} as const;

const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hydromedon Merch Collections",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Sheet Music",    "url": "https://www.hydromedon.com/sheet-music" },
        { "@type": "ListItem", "position": 2, "name": "Wearables",      "url": "https://www.hydromedon.com/merch/wearables" },
        { "@type": "ListItem", "position": 3, "name": "Kitchen & Cups", "url": "https://www.hydromedon.com/merch/kitchen" },
        { "@type": "ListItem", "position": 4, "name": "Computerware",   "url": "https://www.hydromedon.com/merch/computerware" },
    ],
} as const;

const jsonLdTideboundProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Tidebound Objects",
    "description": "Objects shaped by erosion, reclaimed by grace. Each Tidebound Object carries a story of what remained after the tide drew back.",
    "brand": { "@type": "Brand", "name": "Hydromedon" },
    "url": "https://www.hydromedon.com/merch/tidebound",
} as const;

const jsonLdCollectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Hydromedon Merch",
    "description": "Explore Hydromedon's cinematic merch collection — wearables, drinkware, computerware, and Tidebound Objects shaped by tide, time, and devotion. Designed with spiritual symbolism and intentional artistry.",
    "url": "https://www.hydromedon.com/merch",
    "publisher": { "@type": "Organization", "name": "Hydromedon" },
} as const;

const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hydromedon",
    "url": "https://www.hydromedon.com",
    "logo": "https://www.hydromedon.com/og/merch.jpg",
    "sameAs": [],
} as const;

const jsonLdSearchAction = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://www.hydromedon.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.hydromedon.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
    },
} as const;

const jsonLdOfferCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Hydromedon Merch Catalog",
    "itemListElement": [
        { "@type": "OfferCatalog", "name": "Sheet Music",    "url": "https://www.hydromedon.com/sheet-music" },
        { "@type": "OfferCatalog", "name": "Wearables",      "url": "https://www.hydromedon.com/merch/wearables" },
        { "@type": "OfferCatalog", "name": "Kitchen & Cups", "url": "https://www.hydromedon.com/merch/kitchen" },
        { "@type": "OfferCatalog", "name": "Computerware",   "url": "https://www.hydromedon.com/merch/computerware" },
    ],
} as const;

// ── Category slug overrides ───────────────────────────────────────────────────

/**
 * Exact slug → homepage category.
 * Needed for artifacts/* collections split across multiple homepage categories.
 */
const SLUG_CATEGORY_OVERRIDES: Record<string, string> = {
    "artifacts-0-kitchen":     "kitchen",
    "artifacts-0-drinkware":   "kitchen",
    "artifacts-0-gaming":      "computerware",
};

function getCollectionCategory(slug: string): string {
    if (SLUG_CATEGORY_OVERRIDES[slug]) return SLUG_CATEGORY_OVERRIDES[slug];
    if (slug.startsWith("sheet-music-0-") || slug.endsWith("-resources")) return "sheet-music";
    return parseCollectionSlug(slug).category;
}

// ── Category display order ────────────────────────────────────────────────────

const CATEGORY_ORDER = ["sheet-music", "wearables", "kitchen", "computerware"];

/**
 * Allowlist of Fourthwall Collection Names for each non–sheet-music category.
 * When set, only collections whose API name is in the set are included.
 * Sheet Music is absent — all sheet-music-0-* collections are always included.
 * Names come from the Fourthwall API and should be matched exactly.
 */
const CATEGORY_ALLOWED_NAMES: Partial<Record<string, ReadonlySet<string>>> = {
    "wearables":    new Set(["Wellness", "Hoodies", "Tees"]),
    "kitchen":      new Set(["Kitchen", "Drinkware"]),
    "computerware": new Set(["Gaming"]),
};

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
    "kitchen": "Kitchen & Cups",
};

function formatCategory(category: string): string {
    if (CATEGORY_DISPLAY_NAMES[category]) return CATEGORY_DISPLAY_NAMES[category];
    return category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

const CATEGORY_CTA: Record<string, string> = {
    "sheet-music": "Browse Sheet Music",
    "wearables": "Enter Collection",
    "kitchen": "Explore Kitchen & Cups",
    "computerware": "Explore Computerware",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
    "sheet-music":   "Handcrafted lead sheets for the songs that surface from silence. For those who play by faith.",
    "wearables":     "Garments shaped by tide and devotion — built for the daily weight, the ordinary sacred.",
    "kitchen":       "Objects of daily ritual. Cups held through grief, warmth passed across the table.",
    "computerware":  "Equipment for those who create in the dark, before the light arrives.",
};

/** Stable category page routes — independent of live collection availability. */
const CATEGORY_PAGES: Record<string, string> = {
    "sheet-music":  "/sheet-music",
    "wearables":    "/merch/wearables",
    "kitchen":      "/merch/kitchen",
    "computerware": "/merch/computerware",
};

function getCategoryHref(category: string): string {
    return CATEGORY_PAGES[category] ?? "#";
}

/** Per-category image override — takes priority over the first-entry cover lookup. */
const CATEGORY_IMAGE_OVERRIDES: Record<string, string> = {
    "sheet-music": "/covers/biblical-graffiti.jpg",
};

function getCategoryImageSrc(category: string, entries: MerchEntry[]): string | null {
    if (CATEGORY_IMAGE_OVERRIDES[category]) return CATEGORY_IMAGE_OVERRIDES[category];
    const first = entries[0];
    if (!first) return null;
    if (first.status === "live") {
        return collectionCovers[first.collection.slug] ?? first.collection.primaryImage?.url ?? null;
    }
    return collectionCovers[first.slug] ?? null;
}

export default async function MerchPage() {
    let allEntries: MerchEntry[] = [];
    let liveCollections: FWCollection[] = [];
    try {
        liveCollections = await getCollections();
        allEntries = resolveMerchEntries(liveCollections, MERCH_CATALOG);
    } catch (err) {
        console.error("[MerchPage] Fourthwall API error:", err);
    }

    const entriesByCategory = new Map<string, MerchEntry[]>();
    for (const entry of allEntries) {
        const slug = entry.status === "live" ? entry.collection.slug : entry.slug;
        const category = getCollectionCategory(slug);
        const allowed = CATEGORY_ALLOWED_NAMES[category];
        if (allowed) {
            const name = entry.status === "live" ? entry.collection.name : entry.title;
            if (!allowed.has(name)) continue;
        }
        if (!entriesByCategory.has(category)) entriesByCategory.set(category, []);
        entriesByCategory.get(category)!.push(entry);
    }

    return (
        <main
            data-page-enter
            className="relative min-h-screen"
            style={{ animation: "merch-page-enter 700ms 100ms ease-out both" }}
        >
            <style>{`@keyframes merch-page-enter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@media(prefers-reduced-motion:reduce){[data-page-enter]{animation:none!important}}`}</style>

            {/* ── JSON-LD Structured Data ──────────────────────────────────── */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTideboundProduct) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollectionPage) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSearchAction) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOfferCatalog) }} />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-[#E8E4DF]/[0.06] to-transparent" />
            <MerchParallax />
            <MerchIntro />

            {/* ── Collections ──────────────────────────────────────────────── */}
            <section
                aria-labelledby="collections-heading"
                className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-28 pb-16 sm:pb-20"
            >
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(900px 500px at 20% 10%, rgba(212,175,55,0.06), transparent 60%)" }} />
                    <div className="bg-noise absolute inset-0" />
                </div>

                <FadeIn delayMs={80} className="mb-10 sm:mb-12">
                    <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">Browse</p>
                    <h2
                        id="collections-heading"
                        className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-tight tracking-tight"
                    >
                        Collections
                    </h2>
                </FadeIn>

                <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5 p-0 m-0 list-none">
                    {CATEGORY_ORDER.map((category, i) => (
                        <li key={category}>
                            <FadeIn delayMs={100 + i * 80}>
                                <CategoryTile
                                    name={formatCategory(category)}
                                    href={getCategoryHref(category)}
                                    imageSrc={getCategoryImageSrc(category, entriesByCategory.get(category) ?? [])}
                                    ctaLabel={CATEGORY_CTA[category] ?? "View Collection"}
                                    description={CATEGORY_DESCRIPTIONS[category]}
                                />
                            </FadeIn>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ── Tidebound Objects ─────────────────────────────────────────── */}
            <section
                aria-labelledby="tidebound-heading"
                className="relative max-w-4xl mx-auto px-6 py-16 sm:py-24"
            >
                <div className="pointer-events-none absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{ background: "radial-gradient(700px 400px at 80% 50%, rgba(212,175,55,0.04), transparent 65%)" }}
                    />
                </div>

                <FadeIn delayMs={100}>
                    <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">
                        Coming
                    </p>
                    <h2
                        id="tidebound-heading"
                        className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-tight tracking-tight mb-6"
                    >
                        Tidebound Objects
                    </h2>
                </FadeIn>

                <FadeIn delayMs={200}>
                    <div className="rounded-lg border border-white/8 bg-white/[0.02] p-6 sm:p-8">
                        <p className="text-sm text-white/55 leading-relaxed mb-4">
                            Some things only take shape through erosion — through salt water and
                            long waiting and the particular grief of having held something too
                            tightly. The Tidebound Objects collection is built on this truth.
                        </p>
                        <p className="text-sm text-white/55 leading-relaxed mb-4">
                            These are not decorative pieces. They are objects that carry meaning
                            the way a tide carries weight — steadily, inevitably. Shaped by the
                            same forces that shape this music: loss and return, darkness and the
                            slow arrival of light. Each Tidebound Object is a small monument to
                            what endures after the storm passes and the water draws back.
                        </p>
                        <p className="text-sm text-white/55 leading-relaxed mb-8">
                            The collection is being shaped. When it surfaces, it will be here.
                        </p>

                        <Link
                            href="/merch/tidebound"
                            className="inline-flex items-center gap-2 h-11 px-7
                                       border border-yellow-500/40 text-yellow-400/70 text-sm
                                       rounded hover:border-yellow-500/70 hover:text-yellow-400
                                       transition-colors duration-300"
                            aria-label="Explore Tidebound Objects collection"
                        >
                            Explore Tidebound Objects
                        </Link>
                    </div>
                </FadeIn>
            </section>

            {/* ── Explore More from Hydromedon ─────────────────────────────── */}
            <section
                aria-labelledby="explore-heading"
                className="relative max-w-6xl mx-auto px-6 py-16 sm:py-20 border-t border-white/5"
            >
                <FadeIn delayMs={100} className="mb-10">
                    <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">
                        Discover
                    </p>
                    <h2
                        id="explore-heading"
                        className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-tight tracking-tight"
                    >
                        Explore More from Hydromedon
                    </h2>
                </FadeIn>

                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-0 m-0 list-none">
                    {[
                        { label: "Music",         href: "/music",         desc: "Albums, singles, and everything in between." },
                        { label: "Sheet Music",   href: "/sheet-music",   desc: "Lead sheets and scores for the songs." },
                        { label: "About",         href: "/about",         desc: "The world behind the name Hydromedon." },
                        { label: "Stay in the Light", href: "/light",     desc: "A quiet space for the long night." },
                    ].map(({ label, href, desc }, i) => (
                        <li key={href}>
                            <FadeIn delayMs={80 + i * 60}>
                                <Link
                                    href={href}
                                    className="group block rounded-sm border border-white/8 bg-white/[0.02]
                                               p-5 h-full transition-all duration-300
                                               hover:border-yellow-500/25 hover:bg-white/[0.04]"
                                >
                                    <h3 className="text-sm font-medium tracking-[0.05em] text-white/70
                                                  group-hover:text-yellow-400/80 transition-colors mb-2">
                                        {label}
                                    </h3>
                                    <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
                                </Link>
                            </FadeIn>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ── Footer sitemap ────────────────────────────────────────────── */}
            <footer
                aria-labelledby="sitemap-heading"
                className="relative max-w-6xl mx-auto px-6 py-12 border-t border-white/5"
            >
                <FadeIn delayMs={60} className="mb-8">
                    <h2
                        id="sitemap-heading"
                        className="text-xs tracking-[0.25em] text-white/30 uppercase"
                    >
                        Sitemap
                    </h2>
                </FadeIn>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    <nav aria-label="Merch categories">
                        <h3 className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">
                            Merch
                        </h3>
                        <ul className="flex flex-col gap-2 list-none p-0 m-0">
                            {[
                                { label: "Sheet Music",   href: "/sheet-music" },
                                { label: "Wearables",     href: "/merch/wearables" },
                                { label: "Kitchen & Cups", href: "/merch/kitchen" },
                                { label: "Computerware",  href: "/merch/computerware" },
                            ].map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-xs text-white/35 hover:text-white/65 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Site sections">
                        <h3 className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">
                            Hydromedon
                        </h3>
                        <ul className="flex flex-col gap-2 list-none p-0 m-0">
                            {[
                                { label: "Music",              href: "/music" },
                                { label: "About Hydromedon",   href: "/about" },
                                { label: "Statement of Faith", href: "/about#statement-of-faith" },
                                { label: "Recommended Sites",  href: "/about/recommended-sites" },
                                { label: "Stay in the Light",  href: "/light" },
                            ].map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-xs text-white/35 hover:text-white/65 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="col-span-2 sm:col-span-1">
                        <p className="text-[10px] tracking-[0.25em] text-white/20 uppercase mb-4">
                            Hydromedon
                        </p>
                        <p className="text-xs text-white/25 leading-relaxed">
                            Objects, garments, and songs shaped by tide, time, and devotion.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}



