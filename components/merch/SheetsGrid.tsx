/* ==========================================================
   SheetsGrid — grid for Music Sheet items
   ========================================================== */

import SheetCard from "./SheetCard";
import EmptyState from "./EmptyState";
import type { GumroadItem } from "@/lib/gumroad/catalog";

interface SheetsGridProps {
    items: GumroadItem[];
}

export default function SheetsGrid({ items }: SheetsGridProps) {
    if (items.length === 0) {
        return <EmptyState label="No sheet music available yet" />;
    }

    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5 p-0 m-0 list-none">
            {items.map((item) => (
                <li key={item.slug}>
                    <SheetCard item={item} />
                </li>
            ))}
        </ul>
    );
}
