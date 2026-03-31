/* ==========================================================
   app/merch/[slug]/page.tsx — Dynamic merch collection route

   Behaviour:
   - If the slug matches a live Fourthwall collection → redirect to
     the Fourthwall store page (collection.url).
   - Otherwise → render a branded "Coming soon" page.

   The Fourthwall Storefront API only returns *published* collections,
   so a missing slug unambiguously means "not yet available".

   ISR at 60 s: once Fourthwall publishes a collection whose slug
   matches, the next visitor within that window is redirected
   automatically — no code change or redeploy required.
   ========================================================== */

import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCollections, type FWCollection } from "@/lib/fourthwall";
import { getProduct } from "@/lib/fourthwall/client";
import type { FourthwallVariant } from "@/lib/fourthwall/types";
import { MERCH_CATALOG } from "@/lib/merch-catalog";
import ComingSoon from "@/components/merch/ComingSoon";

// ── ISR ───────────────────────────────────────────────────────────────────────
// Revalidate every 60 s so a newly-published Fourthwall collection flips to
// a redirect on the next page load after it goes live.
export const revalidate = 60;

// ── Types ─────────────────────────────────────────────────────────────────────
type Props = {
    params: Promise<{ slug: string }>;
};

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const entry = MERCH_CATALOG.find((e) => e.slug === slug);
    const title = entry?.title ?? formatSlug(slug);
    return {
        title: `${title} — Hydromedon`,
        description: `${title} — available soon on the Hydromedon store.`,
    };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Turns a raw slug into a human-readable fallback title. */
function formatSlug(slug: string): string {
    // Strip category prefix if present (e.g. "wearables-0-hoodies" → "hoodies")
    const withoutPrefix = slug.includes("-0-") ? slug.split("-0-").slice(1).join("-0-") : slug;
    return withoutPrefix
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * A variant is purchasable when the API does not explicitly mark it as
 * out-of-stock. If stock is absent the variant is print-on-demand / unlimited.
 */
function isVariantPurchasable(v: FourthwallVariant): boolean {
    return v.stock?.type !== "OUT_OF_STOCK";
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function MerchItemPage({ params }: Props) {
    const { slug } = await params;

    // ── Step 1: Check published collections (handles MERCH_CATALOG slugs) ─
    // The Storefront API only returns published + visible collections, so a
    // missing slug unambiguously means "not yet available".
    let live: FWCollection[] = [];
    try {
        live = await getCollections();
    } catch {
        // API error — fall through gracefully to "coming soon"
    }

    const collection = live.find((c) => c.slug === slug);
    if (collection) redirect(collection.url);

    // ── Step 2: Fetch product directly by slug ───────────────────────────────
    //
    // getProduct() throws for any non-2xx response. The Storefront API only
    // returns products that are published AND publicly visible, so:
    //   - 404 → does not exist
    //   - any throw → not published, not visible, or API error
    // All of the above fall through to the Coming Soon page.
    //
    // On success we also verify at least one variant is still purchasable;
    // a variant is out of stock when stock.type === "OUT_OF_STOCK".
    try {
        const product = await getProduct(slug);

        // Fourthwall uses "COMING SOON" in the product name as a soft
        // placeholder — treat these as not yet available regardless of their
        // published/visible status, so they never redirect to the store.
        const isComingSoon = product.name.toLowerCase().includes("coming soon");

        // Redirect only when: title is not flagged AND at least one variant
        // is still purchasable (stock.type !== "OUT_OF_STOCK").
        if (!isComingSoon && product.variants.some(isVariantPurchasable)) {
            redirect(`https://store.hydromedon.com/products/${product.slug}`);
        }
        // isComingSoon title OR all variants out of stock → fall through.
    } catch {
        // Not found, not published, not visible, or network error.
        // Fall through to Coming Soon.
    }

    // ── Coming soon ──────────────────────────────────────────────────────────
    const entry = MERCH_CATALOG.find((e) => e.slug === slug);
    const title = entry?.title ?? formatSlug(slug);
    return <ComingSoon title={title} />;
}
