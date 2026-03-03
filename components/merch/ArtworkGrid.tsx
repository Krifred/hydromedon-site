/* ==========================================================
   ArtworkGrid — server-side grid for Artwork products
   ========================================================== */

import ArtworkCard from "./ArtworkCard";
import EmptyState from "./EmptyState";
import type { Product } from "@/lib/shopify/types";

interface ArtworkGridProps {
    products: Product[];
}

export default function ArtworkGrid({ products }: ArtworkGridProps) {
    if (products.length === 0) {
        return <EmptyState label="No artwork available yet" />;
    }

    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-0 m-0 list-none">
            {products.map((product) => (
                <li key={product.id}>
                    <ArtworkCard product={product} />
                </li>
            ))}
        </ul>
    );
}
