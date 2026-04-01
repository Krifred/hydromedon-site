
/* ==========================================================
   app/merch/page.tsx — Merch index
   Shows one CategoryTile per category. Sheet Music navigates
   to /sheet-music; other categories navigate to their first
   live collection page.
   ========================================================== */

import type { Metadata } from "next";
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
    title: "Merch — Hydromedon",
    description: "Merch from Hydromedon.",
};

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

function getCategoryImageSrc(entries: MerchEntry[]): string | null {
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
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-[#E8E4DF]/[0.06] to-transparent" />
            <MerchParallax />
            <MerchIntro />

            <section className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-28 pb-24 sm:pb-32">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(900px 500px at 20% 10%, rgba(212,175,55,0.06), transparent 60%)" }} />
                    <div className="bg-noise absolute inset-0" />
                </div>
                <ul className="grid grid-cols-2 lg:grid-cols-4 gap-5 p-0 m-0 list-none">
                    {CATEGORY_ORDER.map((category, i) => (
                        <li key={category}>
                            <FadeIn delayMs={100 + i * 80}>
                                <CategoryTile
                                    name={formatCategory(category)}
                                    href={getCategoryHref(category)}
                                    imageSrc={getCategoryImageSrc(entriesByCategory.get(category) ?? [])}
                                    ctaLabel={CATEGORY_CTA[category] ?? "View Collection"}
                                />
                            </FadeIn>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}



