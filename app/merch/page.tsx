
/* ==========================================================
   app/merch/page.tsx — Merch index
   Three sections: Tidebound Objects (artifacts), Cloth & Signal
   (wearables), Songs for Service (music sheets).
   Fourthwall API calls and data fetching are unchanged.
   ========================================================== */

import type { Metadata } from "next";
import { getCollections } from "@/lib/fourthwall";
import type { FWCollection } from "@/lib/fourthwall";
import { sheets } from "@/lib/gumroad/catalog";
import MerchIntro from "@/components/merch/MerchIntro";
import MerchCard from "@/components/merch/MerchCard";
import MerchGrid from "@/components/merch/MerchGrid";
import EmptyState from "@/components/merch/EmptyState";
import SheetsGrid from "@/components/merch/SheetsGrid";
import FadeIn from "@/components/FadeIn";
import MerchParallax from "@/components/merch/MerchParallax";

export const metadata: Metadata = {
    title: "Merch — Hydromedon",
    description: "Merch from Hydromedon.",
};

// Slugs treated as wearables for the Cloth & Signal section.
// All other non-excluded collections fall into Tidebound Objects.
const WEARABLE_SLUGS = new Set(["hoodies", "tees"]);

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
    let artifacts: FWCollection[] = [];
    try {
        const collections = await getCollections();
        artifacts = collections.filter((c) => c.tags.includes("artifacts"));
    } catch (err) {
        console.error("[MerchPage] Fourthwall API error:", err);
    }

    const objects = artifacts.filter((c) => !WEARABLE_SLUGS.has(c.slug));
    const wearables = artifacts.filter((c) => WEARABLE_SLUGS.has(c.slug));

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

            {/* ?? Section 1 — Tidebound Objects ??????????????????????? */}
            <section className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-28 pb-16 sm:pb-24">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(900px 500px at 20% 10%, rgba(212,175,55,0.06), transparent 60%)" }} />
                    <div className="bg-noise absolute inset-0" />
                </div>
                <FadeIn delayMs={200} className="mb-8 sm:mb-12 relative js-merch-intro">
                    <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">
                        Artifacts
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 leading-none tracking-tight">
                        Tidebound Objects
                    </h2>
                    <p className="mt-4 text-xs sm:text-sm text-white/40 leading-relaxed max-w-sm">
                        Objects shaped by tide and time.
                    </p>
                </FadeIn>

                {objects.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-0 m-0 list-none relative">
                        {objects.map((c, idx) => (
                            <li key={c.id} className={idx === 0 ? "sm:col-span-2" : ""}>
                                <FadeIn delayMs={80 + idx * 70}>
                                    <MerchCard collection={c} />
                                </FadeIn>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <EmptyState label="No artifacts available yet." />
                )}
            </section>

            <SectionDivider />

            {/* ?? Section 2 — Cloth & Signal ?????????????????????????? */}
            <section className="relative max-w-6xl mx-auto px-6 pt-12 sm:pt-20 pb-10 sm:pb-16">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(900px 500px at 20% 50%, rgba(210,195,170,0.07), transparent 60%)" }} />
                    <div className="absolute inset-0" style={{ backgroundImage: "url('/textures/noise.svg')", backgroundRepeat: "repeat", opacity: 0.045 }} />
                </div>
                <FadeIn delayMs={80} durationMs={420} className="mb-6 sm:mb-10 relative js-merch-intro">
                    <div className="flex items-start gap-4">
                        <div className="w-px self-stretch bg-white/[0.12] shrink-0 mt-1" />
                        <div>
                            <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">
                                Wearables
                            </p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 leading-tight tracking-[-0.01em]">
                                Cloth &amp; Signal
                            </h2>
                            <p className="mt-3 text-xs sm:text-sm leading-relaxed" style={{ color: "#6A6864" }}>
                                Pieces meant to be lived in.
                            </p>
                        </div>
                    </div>
                </FadeIn>
                <div className="relative">
                    <MerchGrid collections={wearables} emptyLabel="No wearables available yet." variant="wearable" />
                </div>
            </section>

            <SectionDivider />

            {/* ?? Section 3 — Songs for Service ??????????????????????? */}
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



