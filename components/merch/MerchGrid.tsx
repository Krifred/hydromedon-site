/* ==========================================================
   MerchGrid — grid of Fourthwall collection cards
   ========================================================== */

import MerchCard from "./MerchCard";
import EmptyState from "./EmptyState";
import type { FourthwallCollection } from "@/lib/fourthwall/types";

interface MerchGridProps {
    collections: FourthwallCollection[];
    /** Optional slug→imageSrc map for local image overrides. */
    images?: Record<string, string>;
    emptyLabel?: string;
}

export default function MerchGrid({
    collections,
    images = {},
    emptyLabel = "No items available yet.",
}: MerchGridProps) {
    if (collections.length === 0) {
        return <EmptyState label={emptyLabel} />;
    }

    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5 p-0 m-0 list-none">
            {collections.map((collection) => (
                <li key={collection.id}>
                    <MerchCard collection={collection} imageSrc={images[collection.slug]} />
                </li>
            ))}
        </ul>
    );
}
