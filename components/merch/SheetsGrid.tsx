/* ==========================================================
   SheetsGrid — grid for Music Sheet items
   ========================================================== */

import SheetCard from "./SheetCard";
import EmptyState from "./EmptyState";
import FadeIn from "@/components/FadeIn";
import type { SheetMusicItem } from "@/lib/fourthwall";

interface SheetsGridProps {
    items: SheetMusicItem[];
}

export default function SheetsGrid({ items }: SheetsGridProps) {
    if (items.length === 0) {
        return <EmptyState label="No sheet music available yet" />;
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-0 m-0 list-none">
            {items.map((item, index) => (
                <li key={item.slug}>
                    <FadeIn delayMs={80 + index * 70}>
                        <SheetCard item={item} />
                    </FadeIn>
                </li>
            ))}
        </ul>
    );
}
