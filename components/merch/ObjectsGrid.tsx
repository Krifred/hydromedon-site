/* ==========================================================
   ObjectsGrid — grid for Object items
   ========================================================== */

import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import type { GumroadItem } from "@/lib/gumroad/catalog";

interface ObjectsGridProps {
    items: GumroadItem[];
}

export default function ObjectsGrid({ items }: ObjectsGridProps) {
    if (items.length === 0) {
        return <EmptyState label="No objects available yet" />;
    }

    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5 p-0 m-0 list-none">
            {items.map((item) => (
                <li key={item.slug}>
                    <ProductCard item={item} />
                </li>
            ))}
        </ul>
    );
}
