/* ==========================================================
   ObjectsGrid — grid for Object items
   ========================================================== */

import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import type { FourthwallItem } from "@/lib/gumroad/catalog";

interface ObjectsGridProps {
    items: FourthwallItem[];
}

export default function ObjectsGrid({ items }: ObjectsGridProps) {
    if (items.length === 0) {
        return <EmptyState label="No objects available yet" />;
    }

    return (
        <div className="flex flex-wrap gap-5">
            {items.map((item) => (
                <div key={item.slug} className="w-56">
                    <ProductCard item={item} />
                </div>
            ))}
        </div>
    );
}
