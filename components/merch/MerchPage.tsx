import MerchIntro from "./MerchIntro";
import MerchSection from "./MerchSection";
import MerchDivider from "./MerchDivider";
import ObjectsGrid from "./ObjectsGrid";
import ArtworkGrid from "./ArtworkGrid";
import type { GumroadItem } from "@/lib/gumroad/catalog";

interface MerchPageProps {
    objects: GumroadItem[];
    artworks: GumroadItem[];
}

export default function MerchPage({ objects, artworks }: MerchPageProps) {
    return (
        <main className="min-h-screen">
            <MerchIntro />
            <MerchSection title="Objects" subtitle="A small collection of items that carry the identity of the project.">
                <ObjectsGrid items={objects} />
            </MerchSection>

            <MerchDivider />

            <MerchSection title="Artwork" subtitle="Visual works created for singles and albums.">
                <ArtworkGrid items={artworks} />
            </MerchSection>
        </main>
    );
}
