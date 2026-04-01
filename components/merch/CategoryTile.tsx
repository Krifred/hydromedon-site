/* ==========================================================
   CategoryTile — homepage tile linking to a category page.
   Matches MerchCard visual structure (dimensions, spacing,
   button shape) but navigates to a category route instead
   of an individual collection.
   ========================================================== */

import Image from "next/image";
import Link from "next/link";

interface CategoryTileProps {
    name: string;
    href: string;
    imageSrc: string | null;
    ctaLabel?: string;
}

export default function CategoryTile({
    name,
    href,
    imageSrc,
    ctaLabel = "View Collection",
}: CategoryTileProps) {
    return (
        <Link
            href={href}
            className="group block rounded-sm overflow-hidden border border-white/8 bg-white/[0.03] transition-all duration-300 ease-out hover:-translate-y-0.5 active:opacity-90 hover:border-yellow-500/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.22)]"
        >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={name}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                )}
            </div>

            <div className="px-4 py-6 flex flex-col gap-3">
                <p className="text-sm font-medium tracking-[0.05em] text-white/80 leading-snug">
                    {name}
                </p>

                <div
                    className="h-12 px-6 py-2 border border-yellow-500/40 text-yellow-400/60
                               rounded group-hover:border-yellow-500/70 group-hover:text-yellow-400/90
                               transition-colors duration-300 font-medium
                               inline-flex items-center justify-center text-sm"
                >
                    {ctaLabel}
                </div>
            </div>
        </Link>
    );
}
