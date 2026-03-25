/* ==========================================================
   SheetCard — card for a sheet music item
   Shows image, title, description, and a Gumroad purchase
   button. The entire card is clickable.
   ========================================================== */

import Image from "next/image";
import type { GumroadItem } from "@/lib/gumroad/catalog";

interface SheetCardProps {
    item: GumroadItem;
}

export default function SheetCard({ item }: SheetCardProps) {
    return (
        <a
            href={item.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-sm overflow-hidden border border-white/8
                       bg-white/[0.03] transition-all duration-300 ease-out
                       hover:-translate-y-0.5 active:opacity-90
                       hover:border-yellow-500/30
                       hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.22)]"
        >
            <Image
                src={item.imageSrc}
                alt={item.title}
                width={800}
                height={800}
                className="w-full h-auto rounded-lg"
            />

            {/* Meta + purchase */}
            <div className="px-4 py-6 flex flex-col gap-3">
                <div>
                    <p className="text-sm font-medium tracking-[0.05em] text-white/80 leading-snug">
                        {item.title}
                    </p>
                    {item.description && (
                        <p className="mt-1.5 text-xs text-white/30 leading-relaxed">
                            {item.description}
                        </p>
                    )}
                </div>

                {item.priceText && (
                    <span className="text-xs text-white/40 font-light tracking-[0.05em]">
                        {item.priceText}
                    </span>
                )}

                <div
                    className="h-12 px-6 py-2 border border-yellow-500/40 text-yellow-400/60
                               rounded group-hover:border-yellow-500/70 group-hover:text-yellow-400/90
                               transition-colors duration-300 font-medium
                               inline-flex items-center justify-center text-sm"
                >
                    Open the Bundle
                </div>
            </div>
        </a>
    );
}
