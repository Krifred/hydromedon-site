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
import Link from "next/link";
import type { Metadata } from "next";
import { getCollections, getFourthwallProducts, type FWCollection, type FWProduct } from "@/lib/fourthwall";
import { MERCH_CATALOG } from "@/lib/merch-catalog";
import FadeIn from "@/components/FadeIn";

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

    // ── Step 2: Check individual products (handles product-level slugs) ────
    // Draft or hidden products are never returned by the Storefront API, so
    // absence here is the same as "not published / not visible".
    let products: FWProduct[] = [];
    try {
        products = await getFourthwallProducts();
    } catch {
        // API error — fall through gracefully to "coming soon"
    }

    const product = products.find(
        (p) =>
            p.slug === slug ||
            p.name.toLowerCase().replace(/\s+/g, "-") === slug
    );
    if (product) redirect(product.url);

    // ── Coming soon (draft, hidden, or nonexistent) ───────────────────────
    const entry = MERCH_CATALOG.find((e) => e.slug === slug);
    const title = entry?.title ?? formatSlug(slug);

    return (
        <main
            data-page-enter
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
            style={{ animation: "merch-page-enter 700ms 100ms ease-out both" }}
        >
            <style>{`
                @keyframes merch-page-enter {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }
                @media (prefers-reduced-motion: reduce) {
                    [data-page-enter] { animation: none !important; }
                }
            `}</style>

            {/* Subtle radial glow — matches the merch page section background */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(800px 600px at 50% 40%, rgba(212,175,55,0.05), transparent 65%)" }}
            />

            <FadeIn delayMs={80} durationMs={700} y={16} className="relative flex flex-col items-center">
                <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-4">
                    Coming soon
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 leading-none tracking-tight mb-6">
                    {title}
                </h1>

                <p className="text-xs sm:text-sm text-white/40 max-w-xs leading-relaxed">
                    This item is not yet available on the store.
                    <br />
                    Check back after the official release.
                </p>

                <div className="mt-10">
                    <Link
                        href="/merch"
                        className="text-xs tracking-[0.18em] text-white/30 uppercase
                                   hover:text-white/60 transition-colors duration-200"
                    >
                        ← Back to Merch
                    </Link>
                </div>
            </FadeIn>
        </main>
    );
}
