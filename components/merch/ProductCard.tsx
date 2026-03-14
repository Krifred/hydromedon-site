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
                       hover:-translate-y-0.5
                       hover:border-yellow-500/30
                       hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.22)]"
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
                <div>
                    <p className="text-sm font-medium tracking-[0.05em] text-white/80 leading-snug">
                        {item.title}
                    </p>
                    <p className="mt-1.5 text-xs text-white/30 leading-relaxed">
                        A piece shaped by tide and time.
                    </p>
                </div>
                {item.priceText && (
                    <span className="text-xs text-white/40 font-light tracking-[0.05em]">
                        {item.priceText}
                    </span>
                )}
                <a
                    href={item.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-6 py-2 border border-yellow-500/40 text-yellow-400/60
                               rounded hover:border-yellow-500/70 hover:text-yellow-400/90
                               transition-colors duration-300 font-medium
                               inline-flex items-center justify-center text-sm"
                >
                    View the Object
                </a>
            </div>
        </div>
    );
}
