/* ==========================================================
   ArtworkCard — minimal card for an Artwork item
   Links to the internal artwork detail page.
   ========================================================== */

import Image from "next/image";
import Link from "next/link";
import type { GumroadItem } from "@/lib/gumroad/catalog";

interface ArtworkCardProps {
    item: GumroadItem;
}

export default function ArtworkCard({ item }: ArtworkCardProps) {
    return (
        <Link
            href={`/merch/artwork/${item.slug}`}
            className="group block rounded-sm overflow-hidden border border-white/8
                       bg-white/[0.03] transition-all duration-300 ease-out
                       hover:border-yellow-500/30
                       hover:shadow-[0_0_32px_rgba(212,175,55,0.22)]"
        >
            {/* Image — square crop */}
            <div className="relative aspect-square bg-black/20 overflow-hidden">
                <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500
                               group-hover:scale-[1.03]"
                />
            </div>

            {/* Meta */}
            <div className="px-4 py-4">
                <p className="text-sm text-white/75 leading-snug tracking-wide mb-1">
                    {item.title}
                </p>
                {item.priceText && (
                    <span className="text-sm text-yellow-400/80 font-light tracking-wide">
                        {item.priceText}
                    </span>
                )}
            </div>
        </Link>
    );
}
