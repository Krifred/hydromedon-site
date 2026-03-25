/* ==========================================================
   SheetCard — card for a sheet music item
   Shows image, title, one-line description, and a Gumroad
   purchase button inline (no separate detail page).
   ========================================================== */

import type { GumroadItem } from "@/lib/gumroad/catalog";
import MerchCardBase from "./MerchCardBase";

interface SheetCardProps {
    item: GumroadItem;
}

export default function SheetCard({ item }: SheetCardProps) {
    return (
        <MerchCardBase
            href={item.gumroadUrl}
            image={item.imageSrc}
            alt={item.title}
            title={item.title}
            subtitle="Built for worship and service."
            ctaLabel="Open the Bundle"
            price={item.priceText || undefined}
            variant="sheet"
        />
    );
}