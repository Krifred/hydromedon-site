import MerchIntro from "./MerchIntro";
import MerchSection from "./MerchSection";
import MerchDivider from "./MerchDivider";
import ObjectsGrid from "./ObjectsGrid";
import ArtworkGrid from "./ArtworkGrid";
import type { MerchData } from "@/lib/shopify/types";

export default function MerchPage({ data }: { data: MerchData }) {
    return (
        <main className="min-h-screen">
            <MerchIntro />
            <MerchSection title="Objects" subtitle="A small collection of items that carry the identity of the project.">
                <ObjectsGrid products={data.objects} />
            </MerchSection>

            <MerchDivider />

            <MerchSection title="Artwork" subtitle="Visual works created for singles and albums.">
                <ArtworkGrid products={data.artworks} />
            </MerchSection>
        </main>
    );
}