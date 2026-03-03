/* ==========================================================
   app/merch/page.tsx — Merch index (Objects + Artwork)
   Server Component — data fetched at request time / ISR
   ========================================================== */

import type { Metadata } from "next";
import { getMerchData } from "@/lib/shopify/cache";
import MerchIntro from "@/components/merch/MerchIntro";
import MerchSection from "@/components/merch/MerchSection";
import MerchDivider from "@/components/merch/MerchDivider";
import ObjectsGrid from "@/components/merch/ObjectsGrid";
import ArtworkGrid from "@/components/merch/ArtworkGrid";

export const metadata: Metadata = {
    title: "Merch — Hydromedon",
    description: "Objects and artwork from Hydromedon.",
};

export default async function MerchPage() {
    const { objects, artworks } = await getMerchData();

    return (
        <main className="min-h-screen">
            <MerchIntro />

            <MerchSection
                title="Objects"
                subtitle="A small collection of items that carry the identity of the project."
            >
                <ObjectsGrid products={objects} />
            </MerchSection>

            <MerchDivider />

            <MerchSection
                title="Artwork"
                subtitle="Visual works created for singles and albums, available as prints."
            >
                <ArtworkGrid products={artworks} />
            </MerchSection>
        </main>
    );
}
