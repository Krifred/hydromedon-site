/* ==========================================================
   app/merch/page.tsx — Merch index
   Artifacts section fetches live collections from Fourthwall API.
   Music Sheets section uses local catalog (each item links to
   a Fourthwall collection via gumroadUrl).
   ========================================================== */

import type { Metadata } from "next";
import { getCollections } from "@/lib/fourthwall/client";
import type { FourthwallCollection } from "@/lib/fourthwall/types";
import { sheets } from "@/lib/gumroad/catalog";
import MerchIntro from "@/components/merch/MerchIntro";
import MerchSection from "@/components/merch/MerchSection";
import MerchDivider from "@/components/merch/MerchDivider";
import MerchGrid from "@/components/merch/MerchGrid";
import SheetsGrid from "@/components/merch/SheetsGrid";

export const metadata: Metadata = {
    title: "Merch — Hydromedon",
    description: "Merch from Hydromedon.",
};

// Local image overrides for Fourthwall collections (collections have no images in the API)
const COLLECTION_IMAGES: Record<string, string> = {
    tees: "/brand/merch/tee-front-full.png",
    hoodies: "/brand/merch/hoodie-front-full.png",
};

// Slugs shown in the primary Artifacts section
const PRIMARY_ARTIFACT_SLUGS = new Set(["tees", "hoodies"]);
// Slugs never shown in any section
const EXCLUDED_SLUGS = new Set(["all"]);

export default async function MerchPage() {
    let allCollections: FourthwallCollection[] = [];
    try {
        allCollections = await getCollections();
    } catch (err) {
        console.error("[MerchPage] Fourthwall API error:", err);
    }

    const primaryArtifacts = allCollections.filter((c) => PRIMARY_ARTIFACT_SLUGS.has(c.slug));
    const additionalArtifacts = allCollections.filter(
        (c) => !PRIMARY_ARTIFACT_SLUGS.has(c.slug) && !EXCLUDED_SLUGS.has(c.slug)
    );

    return (
        <main className="min-h-screen">
            <MerchIntro />

            <MerchSection
                title="Artifacts"
                subtitle="A small collection of items that carry the identity of the project."
            >
                <MerchGrid
                    collections={primaryArtifacts}
                    images={COLLECTION_IMAGES}
                    emptyLabel="No artifacts available yet."
                />
            </MerchSection>

            {additionalArtifacts.length > 0 && (
                <>
                    <MerchDivider />
                    <MerchSection
                        title="Additional Artifacts"
                        subtitle="More physical items from the Hydromedon collection."
                    >
                        <MerchGrid
                            collections={additionalArtifacts}
                            emptyLabel="No additional artifacts available yet."
                        />
                    </MerchSection>
                </>
            )}

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


