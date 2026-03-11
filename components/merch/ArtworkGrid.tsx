/* ==========================================================
   ArtworkGrid — grid for Artwork items
   ========================================================== */

import ArtworkCard from "./ArtworkCard";
import EmptyState from "./EmptyState";
import type { GumroadItem } from "@/lib/gumroad/catalog";

interface ArtworkGridProps {
    items: GumroadItem[];
}

export default function ArtworkGrid({ items }: ArtworkGridProps) {
    if (items.length === 0) {
        return <EmptyState label="No artwork available yet" />;
    }

    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5 p-0 m-0 list-none">
            {items.map((item) => (
                <li key={item.slug}>
                    <ArtworkCard item={item} />
                </li>
            ))}
        </ul>
    );
}
