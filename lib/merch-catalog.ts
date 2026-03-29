// lib/merch-catalog.ts
// Static catalog of expected Fourthwall collection slugs.
//
// Purpose:
//   The Fourthwall Storefront API only returns *published* collections.
//   Collections listed here that are NOT yet in the API response render as
//   "Available soon" placeholder cards.  The moment Fourthwall publishes a
//   collection whose slug matches an entry here, the card automatically
//   switches to a live MerchCard on the next ISR revalidation (≤ 1 h).
//
//   Collections returned by the API but NOT listed here still appear as live
//   cards — the catalog is additive only, never restrictive.
//
// Slug convention: <category>-0-<name>
//   e.g. "wearables-0-hoodies", "artifacts-0-cups"

import type { FWCollection } from "@/lib/fourthwall";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CatalogEntry = {
    /** Must match the Fourthwall collection slug exactly. */
    slug: string;
    /** Fallback display title shown on the "Available soon" card. */
    title: string;
};

/**
 * A resolved merch item — either a live Fourthwall collection or a
 * not-yet-published placeholder declared in the catalog.
 */
export type MerchEntry =
    | { status: "live";         collection: FWCollection }
    | { status: "coming_soon";  slug: string; title: string };

// ── Resolution ────────────────────────────────────────────────────────────────

/**
 * Merges the static catalog with live Fourthwall collections.
 *
 * - Catalog entry whose slug IS in the live response  → { status: "live" }
 * - Catalog entry whose slug is NOT in live response  → { status: "coming_soon" }
 * - Live collections not listed in the catalog        → { status: "live" } (appended)
 *
 * Catalog order is preserved; unlisted live collections are appended last.
 */
export function resolveMerchEntries(
    live: FWCollection[],
    catalog: CatalogEntry[],
): MerchEntry[] {
    const liveBySlug = new Map(live.map((c) => [c.slug, c]));
    const catalogSlugs = new Set(catalog.map((e) => e.slug));

    const entries: MerchEntry[] = catalog.map((entry) => {
        const collection = liveBySlug.get(entry.slug);
        return collection
            ? { status: "live", collection }
            : { status: "coming_soon", slug: entry.slug, title: entry.title };
    });

    // Append live collections not declared in the catalog
    for (const c of live) {
        if (!catalogSlugs.has(c.slug)) {
            entries.push({ status: "live", collection: c });
        }
    }

    return entries;
}

// ── Catalog ───────────────────────────────────────────────────────────────────
// Add an entry here for every collection you want to appear on the merch page,
// whether or not it is published yet on Fourthwall.
//
// Unpublished entries show an "Available soon" card until Fourthwall publishes
// the matching collection.  Remove an entry to hide it entirely.

export const MERCH_CATALOG: CatalogEntry[] = [
    // Examples — uncomment and set the exact Fourthwall slug:
    // { slug: "wearables-0-hoodies", title: "Hoodies" },
    // { slug: "wearables-0-tees",    title: "Tees"    },
    // { slug: "artifacts-0-cups",    title: "Cups"    },
    // { slug: "artifacts-0-gaming",  title: "Gaming"  },
];
