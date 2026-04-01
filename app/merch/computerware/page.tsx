/* ==========================================================
   app/merch/computerware/page.tsx — Computerware collection grid
   Shows all Computerware collections: Gaming.
   ========================================================== */

import type { Metadata } from "next";
import Link from "next/link";
import { getCollections } from "@/lib/fourthwall";
import { resolveMerchEntries } from "@/lib/merch-catalog";
import type { MerchEntry } from "@/lib/merch-catalog";
import MerchGrid from "@/components/merch/MerchGrid";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
    title: "Computerware — Hydromedon",
    description: "Computerware from Hydromedon.",
};

// Exact Fourthwall collection slugs that belong to this category.
const COMPUTERWARE_SLUGS = new Set(["artifacts-0-gaming"]);

export default async function ComputerwarePage() {
    let entries: MerchEntry[] = [];
    try {
        const live = await getCollections();
        entries = resolveMerchEntries(
            live.filter((c) => COMPUTERWARE_SLUGS.has(c.slug)),
            [],
        );
    } catch (err) {
        console.error("[ComputerwarePage] Fourthwall API error:", err);
    }

    return (
        <main
            data-page-enter
            className="relative min-h-screen"
            style={{ animation: "merch-page-enter 700ms 100ms ease-out both" }}
        >
            <style>{`@keyframes merch-page-enter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@media(prefers-reduced-motion:reduce){[data-page-enter]{animation:none!important}}`}</style>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-[#E8E4DF]/[0.06] to-transparent" />

            <section className="relative max-w-6xl mx-auto px-6 pt-28 sm:pt-36 pb-16 sm:pb-24">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(900px 500px at 20% 10%, rgba(212,175,55,0.06), transparent 60%)" }} />
                    <div className="bg-noise absolute inset-0" />
                </div>

                <FadeIn delayMs={100} className="mb-8 sm:mb-12 relative">
                    <Link
                        href="/merch"
                        className="inline-flex items-center gap-2 text-xs tracking-[0.15em] text-white/30 uppercase hover:text-white/60 transition-colors mb-6"
                    >
                        ← Merch
                    </Link>
                    <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-3">
                        Computerware
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 leading-none tracking-tight">
                        Computerware
                    </h1>
                </FadeIn>

                <MerchGrid
                    entries={entries}
                    variant="artifact"
                    emptyLabel="No Computerware available yet."
                />
            </section>
        </main>
    );
}
