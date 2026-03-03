/* ==========================================================
   PriceTag — formats a Shopify Money object
   ========================================================== */

import type { Money } from "@/lib/shopify/types";

export default function PriceTag({ price }: { price: Money }) {
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(parseFloat(price.amount));

    return (
        <span className="text-sm text-yellow-400/80 font-light tracking-wide">
            {formatted}
        </span>
    );
}
