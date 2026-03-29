/* ==========================================================
   MerchGrid — grid of Fourthwall collection cards
   Renders live MerchCards and "Available soon" MerchCardSoon
   placeholders from a unified MerchEntry array.
   ========================================================== */

import MerchCard from "./MerchCard";
import MerchCardSoon from "./MerchCardSoon";
import EmptyState from "./EmptyState";
import FadeIn from "@/components/FadeIn";
import type { MerchEntry } from "@/lib/merch-catalog";

interface MerchGridProps {
    entries: MerchEntry[];
    emptyLabel?: string;
    variant?: "artifact" | "wearable";
}

export default function MerchGrid({
    entries,
    emptyLabel = "No items available yet.",
    variant = "artifact",
}: MerchGridProps) {
    if (entries.length === 0) {
        return <EmptyState label={emptyLabel} />;
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-0 m-0 list-none">
            {entries.map((entry, index) => (
                <li key={entry.status === "live" ? entry.collection.id : entry.slug}>
                    <FadeIn delayMs={80 + index * 70}>
                        {entry.status === "live" ? (
                            <MerchCard collection={entry.collection} variant={variant} />
                        ) : (
                            <MerchCardSoon title={entry.title} />
                        )}
                    </FadeIn>
                </li>
            ))}
        </ul>
    );
}

