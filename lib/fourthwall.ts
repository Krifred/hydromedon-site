// lib/fourthwall.ts
// Fourthwall Storefront API v1 — collection fetching with image enrichment.
//
// Required env var:
//   FOURTHWALL_STOREFRONT_TOKEN — public storefront token from
//   Fourthwall Dashboard → Developer → Storefront API
//
// API reality (verified against live store):
//   - GET /collections returns: id, name, slug, description only.
//   - No `tags`, `primaryImage`, or `url` fields are returned by the API.
//   - `primaryImage` is resolved by fetching the first product in each
//     collection and taking its images[0].url.
//   - `url` is constructed from the collection slug.
//   - `tags` is not yet exposed by the Storefront API. Every non-excluded
//     collection is tagged ["artifacts"] here so the filter in page.tsx
//     already works. When Fourthwall adds tag support to the API, replace
//     the hardcoded tags assignment below with: tags: c.tags ?? [].

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
    /**
     * Collection tags used to filter which collections appear in each section.
     * NOTE: The Storefront API v1 does not return tags on collections.
     * All non-excluded collections are assigned ["artifacts"] until the API
     * exposes real tags — at that point, replace with the API value.
     */
    tags: string[];
};

function buildUrl(path: string, params: Record<string, string> = {}): string {
    const token = process.env.FOURTHWALL_STOREFRONT_TOKEN;
    if (!token)
        throw new Error("FOURTHWALL_STOREFRONT_TOKEN is not set in environment variables.");
    const qs = new URLSearchParams({ storefront_token: token, ...params });
    return `${STOREFRONT_BASE}${path}?${qs.toString()}`;
}

/** Fetch the primary image URL from the first product in a collection.
 * Tries top-level product images first, then variant images (needed for
 * wearables like hoodies/tees where images live on variants). */
async function fetchPrimaryImage(slug: string): Promise<{ url: string } | null> {
    try {
        const res = await fetch(
            buildUrl(`/collections/${encodeURIComponent(slug)}/products`, { pageSize: "3" }),
            fetchOptions()
        );
        if (!res.ok) return null;
        const data: {
            results: Array<{
                images?: Array<{ url: string }>;
                variants?: Array<{ images?: Array<{ url: string }> }>;
            }>;
        } = await res.json();
        for (const product of data.results ?? []) {
            const url =
                product.images?.[0]?.url ??
                product.variants?.[0]?.images?.[0]?.url ??
                null;
            if (url) return { url };
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Fetch all Fourthwall collections and enrich each with a constructed `url`,
 * a `primaryImage` resolved from the first product, and normalised `tags`.
 *
 * Collections with slugs in EXCLUDED_SLUGS (e.g. "all") are omitted.
 * Any collection added to Fourthwall that is not excluded will appear
 * automatically on the next ISR revalidation (1 h).
 */
export async function getCollections(): Promise<FWCollection[]> {
    const allResults: Array<{ id: string; name: string; slug: string; description: string }> = [];
    let pageNumber = 0;

    // The Storefront API caps page size at 10 regardless of the requested value.
    // Paginate until hasNextPage is false to collect every collection.
    while (true) {
        const res = await fetch(
            buildUrl("/collections", { pageSize: "10", pageNumber: String(pageNumber) }),
            fetchOptions()
        );
        if (!res.ok) {
            throw new Error(`Fourthwall getCollections failed: ${res.status} ${res.statusText}`);
        }

        const data: {
            results: Array<{ id: string; name: string; slug: string; description: string }>;
            paging: { hasNextPage: boolean };
        } = await res.json();

        allResults.push(...(data.results ?? []));
        if (!data.paging?.hasNextPage) break;
        pageNumber++;
    }

    const filtered = allResults.filter((c) => !EXCLUDED_SLUGS.has(c.slug));

    return Promise.all(
        filtered.map(async (c): Promise<FWCollection> => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            description: c.description || null,
            url: `${STORE_BASE}/collections/${c.slug}`,
            primaryImage: await fetchPrimaryImage(c.slug),
            // Hardcoded until Fourthwall API exposes collection tags.
            // Replace with: tags: c.tags ?? []
            tags: ["artifacts"],
        }))
    );
}
