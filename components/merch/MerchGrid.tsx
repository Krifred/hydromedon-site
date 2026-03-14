/* ==========================================================
   MerchGrid — grid of Fourthwall collection cards
   ========================================================== */

import MerchCard from "./MerchCard";
import EmptyState from "./EmptyState";
import FadeIn from "@/components/FadeIn";
import type { FWCollection } from "@/lib/fourthwall";

interface MerchGridProps {
    collections: FWCollection[];
    emptyLabel?: string;
    variant?: "artifact" | "wearable";
}

export default function MerchGrid({
    collections,
    emptyLabel = "No items available yet.",
    variant = "artifact",
}: MerchGridProps) {
    if (collections.length === 0) {
        return <EmptyState label={emptyLabel} />;
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-0 m-0 list-none">
            {collections.map((collection, index) => (
                <li key={collection.id}>
                    <FadeIn delayMs={80 + index * 70}>
                        <MerchCard collection={collection} variant={variant} />
                    </FadeIn>
                </li>
            ))}
        </ul>
    );
}
