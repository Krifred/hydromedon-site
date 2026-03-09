/* ==========================================================
   app/merch/page.tsx — Merch index (Objects + Artwork)
   Static Server Component — uses local Gumroad catalog
   ========================================================== */

import type { Metadata } from "next";
import { objects, artworks, sheets } from "@/lib/gumroad/catalog";
import MerchIntro from "@/components/merch/MerchIntro";
import MerchSection from "@/components/merch/MerchSection";
import MerchDivider from "@/components/merch/MerchDivider";
import ObjectsGrid from "@/components/merch/ObjectsGrid";
import ArtworkGrid from "@/components/merch/ArtworkGrid";
import SheetsGrid from "@/components/merch/SheetsGrid";

export const metadata: Metadata = {
    title: "Merch — Hydromedon",
    description: "Objects and artwork from Hydromedon.",
};

export default function MerchPage() {
    return (
        <main className="min-h-screen">
            <MerchIntro />

            <MerchSection
                title="Artifacts"
                subtitle="A small collection of items that carry the identity of the project."
            >
                <ObjectsGrid items={objects} />
            </MerchSection>

            <MerchDivider />

            <MerchSection
                title="Artwork"
                subtitle="Visual works created for singles and albums, available as prints."
            >
                <ArtworkGrid items={artworks} />
            </MerchSection>

            <MerchDivider />

            <MerchSection
                title="Music Sheets"
                subtitle="Lead sheets and transcriptions for individual tracks."
            >
                <SheetsGrid items={sheets} />
            </MerchSection>
        </main>
    );
}
