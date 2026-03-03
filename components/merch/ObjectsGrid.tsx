/* ==========================================================
   ObjectsGrid — server-side grid for Object products
   ========================================================== */

import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import type { Product } from "@/lib/shopify/types";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN ?? "";

interface ObjectsGridProps {
    products: Product[];
}

export default function ObjectsGrid({ products }: ObjectsGridProps) {
    if (products.length === 0) {
        return <EmptyState label="No objects available yet" />;
    }

    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5 p-0 m-0 list-none">
            {products.map((product) => (
                <li key={product.id}>
                    <ProductCard
                        product={product}
                        href={`https://${STORE_DOMAIN}/products/${product.handle}`}
                    />
                </li>
            ))}
        </ul>
    );
}
