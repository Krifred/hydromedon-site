
/* ==========================================================
   app/merch/page.tsx — Merch index
   Fourthwall collections are grouped dynamically by the
   category prefix in their slug (<category>-0-<name>).
   One section is rendered per category, ordered alphabetically.
   The final section (Songs for Service) is always Gumroad sheets.
   ========================================================== */

import type { Metadata } from "next";
import { getCollections, parseCollectionSlug } from "@/lib/fourthwall";
import { MERCH_CATALOG, resolveMerchEntries } from "@/lib/merch-catalog";
import type { MerchEntry } from "@/lib/merch-catalog";
import { sheets } from "@/lib/gumroad/catalog";
import MerchIntro from "@/components/merch/MerchIntro";
import MerchGrid from "@/components/merch/MerchGrid";
import SheetsGrid from "@/components/merch/SheetsGrid";
import FadeIn from "@/components/FadeIn";
import MerchParallax from "@/components/merch/MerchParallax";

export const metadata: Metadata = {
    title: "Merch — Hydromedon",
    description: "Merch from Hydromedon.",
};

// ── Types ────────────────────────────────────────────────────────────────────

type CategoryGroup = {
    category: string;
    entries: MerchEntry[];
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Group MerchEntries by the category prefix of their slug. */
function groupEntriesByCategory(entries: MerchEntry[]): CategoryGroup[] {
    const map = new Map<string, MerchEntry[]>();
    for (const entry of entries) {
        const slug = entry.status === "live" ? entry.collection.slug : entry.slug;
        const { category } = parseCollectionSlug(slug);
        if (!map.has(category)) map.set(category, []);
        map.get(category)!.push(entry);
    }
    return Array.from(map.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([category, entries]) => ({ category, entries }));
}

/** Map a category slug to the MerchCard variant that controls CTA text. */
function categoryVariant(category: string): "artifact" | "wearable" {
    return category === "wearables" ? "wearable" : "artifact";
}

function SectionDivider() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-5 sm:py-8">
            <div
                className="h-px w-full"
                style={{ backgroundColor: "rgba(232, 228, 223, 0.20)" }}
            />
        </div>
    );
}

export default async function MerchPage() {
    let groups: CategoryGroup[] = [];
    try {
        const live = await getCollections();
        const entries = resolveMerchEntries(live, MERCH_CATALOG);
        groups = groupEntriesByCategory(entries);
    } catch (err) {
        console.error("[MerchPage] Fourthwall API error:", err);
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
            <SectionDivider />

            {/* Dynamic Fourthwall sections — one per slug category */}
            {groups.map(({ category, entries }, groupIdx) => (
                <div key={category}>
                    <section className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-28 pb-16 sm:pb-24">
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute inset-0" style={{ background: "radial-gradient(900px 500px at 20% 10%, rgba(212,175,55,0.06), transparent 60%)" }} />
                            <div className="bg-noise absolute inset-0" />
                        </div>
                        <FadeIn delayMs={200} className="mb-8 sm:mb-12 relative js-merch-intro">
                            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">
                                {category}
                            </p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 leading-none tracking-tight capitalize">
                                {category}
                            </h2>
                        </FadeIn>
                        <MerchGrid
                            entries={entries}
                            emptyLabel={`No ${category} available yet.`}
                            variant={categoryVariant(category)}
                        />
                    </section>
                    {groupIdx < groups.length - 1 && <SectionDivider />}
                </div>
            ))}

            {groups.length > 0 && <SectionDivider />}

            {/* Songs for Service — Gumroad sheet music (always last) */}
            <section className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-32 pb-16 sm:pb-28">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(800px 400px at 50% 0%, rgba(255,252,245,0.04), transparent 55%)" }} />
                    <div className="absolute inset-0" style={{ backgroundImage: "url('/textures/noise.svg')", backgroundRepeat: "repeat", opacity: 0.03 }} />
                </div>
                <div className="mb-6 sm:mb-10 h-px w-full relative" style={{ backgroundColor: "rgba(232, 228, 223, 0.12)" }} />
                <FadeIn delayMs={150} durationMs={680} className="mb-8 sm:mb-14 relative js-merch-intro">
                    <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">
                        Music Sheets
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-[0.03em]" style={{ color: "rgba(232,228,223,0.85)" }}>
                        Songs for Service
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(180,176,172,0.65)" }}>
                        Lead sheets and transcriptions built for worship and devotion.
                    </p>
                </FadeIn>
                <div className="relative">
                    <SheetsGrid items={sheets} />
                </div>
            </section>
        </main>
    );
}



