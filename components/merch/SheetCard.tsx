/* ==========================================================
   SheetCard — card for a sheet music item
   Shows image, title, one-line description, and a Gumroad
   purchase button inline (no separate detail page).
   ========================================================== */

import Image from "next/image";
import type { GumroadItem } from "@/lib/gumroad/catalog";

interface SheetCardProps {
    item: GumroadItem;
}

export default function SheetCard({ item }: SheetCardProps) {
    return (
        <div
            className="group rounded-sm overflow-hidden border border-white/8
                       bg-white/[0.03] transition-all duration-300 ease-out
                       hover:border-yellow-500/30
                       hover:shadow-[0_0_32px_rgba(212,175,55,0.22)]"
        >
            {/* Cover image */}
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

            {/* Meta + purchase */}
            <div className="px-4 py-5 flex flex-col gap-3">
                <div>
                    <p className="text-sm text-white/75 leading-snug tracking-wide">
                        {item.title}
                    </p>
                    <p className="mt-1 text-xs text-white/40 leading-snug line-clamp-1">
                        {item.description}
                    </p>
                </div>

                {item.priceText && (
                    <span className="text-sm text-yellow-400/80 font-light tracking-wide">
                        {item.priceText}
                    </span>
                )}

                <a
                    href={item.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-7 py-2 border border-yellow-500 text-yellow-500
                               rounded hover:bg-yellow-500 hover:text-black
                               transition font-semibold inline-flex items-center justify-center text-sm"
                >
                    Purchase
                </a>
            </div>
        </div>
    );
}
