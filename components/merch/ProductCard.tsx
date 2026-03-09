/* ==========================================================
   ProductCard — minimal card for an Object item
   Links externally to store.hydromedon.com (Fourthwall).
   ========================================================== */

import Image from "next/image";
import type { FourthwallItem } from "@/lib/gumroad/catalog";

interface ProductCardProps {
    item: FourthwallItem;
}

export default function ProductCard({ item }: ProductCardProps) {
    return (
        <a
            href={item.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded border border-yellow-500
                       text-yellow-500 transition hover:bg-yellow-500 hover:text-black
                       font-semibold"
        >
            {/* Image */}
            <div className="relative aspect-square bg-black/20 overflow-hidden">
                <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-contain transition-transform duration-500
                               group-hover:scale-[1.03]"
                />
            </div>

            {/* Label */}
            <div className="flex items-center justify-center px-7 py-3 text-sm">
                {item.title}
            </div>
        </a>
    );
}
