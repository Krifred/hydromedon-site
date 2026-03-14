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
        <div
            className="group rounded-sm overflow-hidden border border-white/8
                       bg-white/[0.03] transition-all duration-300 ease-out
                       hover:border-yellow-500/30
                       hover:shadow-[0_0_32px_rgba(212,175,55,0.22)]"
        >
            {/* Image */}
            <div className="relative aspect-square bg-black/20 overflow-hidden">
                <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500
                               group-hover:scale-[1.03]"
                />
            </div>

            {/* Meta + button */}
            <div className="px-4 py-5 flex flex-col gap-3">
                <p className="text-sm text-white/75 leading-snug tracking-wide">
                    {item.title}
                </p>
                {item.priceText && (
                    <span className="text-sm text-yellow-400/80 font-light tracking-wide">
                        {item.priceText}
                    </span>
                )}
                <a
                    href={item.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-7 py-2 border border-yellow-500 text-yellow-500
                               rounded hover:bg-yellow-500 hover:text-black
                               transition font-semibold inline-flex items-center justify-center text-sm"
                >
                    Shop
                </a>
            </div>
        </div>
    );
}
