// lib/fourthwall.ts
// Fourthwall Storefront API v1 — collection fetching with image enrichment.
//
// Required env var:
//   FOURTHWALL_STOREFRONT_TOKEN — public storefront token from
//   Fourthwall Dashboard → Developer → Storefront API
//
// API reality (verified against live store):
//   - GET /collections returns: id, name, slug, description only.
//   - No `primaryImage` or `url` fields are returned by the API.
//   - `primaryImage` is resolved by fetching the first product in each
//     collection and taking its images[0].url.
//   - `url` is constructed from the collection slug.
//
// Grouping convention:
//   Collection slugs follow the pattern <category>-0-<name>.
//   e.g. wearables-0-hoodies, artifacts-0-drinkware, music-0-arise-o-lord
//   Use parseCollectionSlug() to split a slug into { category, name }.
//   Collections whose slugs do not contain "-0-" land in "uncategorized".

const STOREFRONT_BASE = "https://storefront-api.fourthwall.com/v1";
const STORE_BASE = "https://store.hydromedon.com";
const REVALIDATE = 3600; // 1 hour

// Slugs that should never appear in the storefront grid.
const EXCLUDED_SLUGS = new Set(["all"]);

// In development, skip the Data Cache so newly-added collections appear on
// the very next page load. In production, revalidate every hour via ISR.
function fetchOptions(): RequestInit {
    return process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : { next: { revalidate: REVALIDATE } };
}

export type FWCollection = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    /** Constructed URL to the collection page on the storefront. */
    url: string;
    /** Primary image sourced from the first product in the collection. */
    primaryImage: { url: string } | null;
};

/**
 * Splits a Fourthwall collection slug into its category and collection name.
 *
 * Slugs are expected to follow the pattern: <category>-0-<name>
 * e.g. "wearables-0-hoodies"   → { category: "wearables", name: "hoodies" }
 *      "artifacts-0-drinkware" → { category: "artifacts", name: "drinkware" }
 *
 * If "-0-" is absent the whole slug is treated as the name and placed in
 * the "uncategorized" catch-all category.
 */
export function parseCollectionSlug(slug: string): { category: string; name: string } {
    const sep = slug.indexOf("-0-");
    if (sep === -1) return { category: "uncategorized", name: slug };
    return { category: slug.slice(0, sep), name: slug.slice(sep + 3) };
}

function buildUrl(path: string, params: Record<string, string> = {}): string {
    const token = process.env.FOURTHWALL_STOREFRONT_TOKEN;
    if (!token)
        throw new Error("FOURTHWALL_STOREFRONT_TOKEN is not set in environment variables.");
    const qs = new URLSearchParams({ storefront_token: token, ...params });
    return `${STOREFRONT_BASE}${path}?${qs.toString()}`;
}

/** Fetch the primary image URL from the first product in a collection. */
async function fetchPrimaryImage(slug: string): Promise<{ url: string } | null> {
    try {
        const res = await fetch(
            buildUrl(`/collections/${encodeURIComponent(slug)}/products`, { pageSize: "1" }),
            fetchOptions()
        );
        if (!res.ok) return null;
        const data: {
            results: Array<{ images: Array<{ url: string }> }>;
        } = await res.json();
        const imageUrl = data.results?.[0]?.images?.[0]?.url ?? null;
        return imageUrl ? { url: imageUrl } : null;
    } catch {
        return null;
    }
}

/**
 * Fetch all Fourthwall collections and enrich each with a constructed `url`
 * and a `primaryImage` resolved from the first product in the collection.
 *
 * Collections with slugs in EXCLUDED_SLUGS (e.g. "all") are omitted.
 * Any collection added to Fourthwall that is not excluded will appear
 * automatically on the next ISR revalidation (1 h).
 *
 * Callers can use parseCollectionSlug(c.slug) to determine which display
 * category a collection belongs to.
 */
export async function getCollections(): Promise<FWCollection[]> {
    const res = await fetch(
        buildUrl("/collections", { pageSize: "50" }),
        fetchOptions()
    );
    if (!res.ok) {
        throw new Error(`Fourthwall getCollections failed: ${res.status} ${res.statusText}`);
    }

    const data: {
        results: Array<{ id: string; name: string; slug: string; description: string }>;
    } = await res.json();

    const filtered = (data.results ?? []).filter((c) => !EXCLUDED_SLUGS.has(c.slug));

    return Promise.all(
        filtered.map(async (c): Promise<FWCollection> => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            description: c.description || null,
            url: `${STORE_BASE}/collections/${c.slug}`,
            primaryImage: await fetchPrimaryImage(c.slug),
        }))
    );
}
