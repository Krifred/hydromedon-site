/* ==========================================================
   MerchCardSoon — placeholder card for a Fourthwall collection
   that has not yet been published on the storefront.
   Matches MerchCard visual structure exactly (same dimensions,
   same spacing, same button shape — just muted and non-interactive).
   ========================================================== */

import Image from "next/image";
import { collectionCovers } from "@/lib/collectionCovers";

interface MerchCardSoonProps {
    title: string;
    slug?: string;
}

export default function MerchCardSoon({ title, slug }: MerchCardSoonProps) {
    const coverSrc = slug ? (collectionCovers[slug] ?? null) : null;

    return (
        <div className="block rounded-sm overflow-hidden border border-white/[0.06] bg-white/[0.02]">
            {/* Image area — cover if available, gradient otherwise */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
                {coverSrc ? (
                    <Image
                        src={coverSrc}
                        alt={title}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
                )}
                <div
                    className="absolute top-2 left-2
                               bg-black/70 text-yellow-400/80
                               px-3 py-1 text-xs font-semibold
                               tracking-wide rounded backdrop-blur-sm
                               border border-yellow-500/20 pointer-events-none"
                >
                    Available Soon
                </div>
            </div>

            {/* Meta — mirrors MerchCard meta block */}
            <div className="px-4 py-6 flex flex-col gap-3">
                <p className="text-sm font-medium tracking-[0.05em] text-white/25 leading-snug">
                    {title}
                </p>

                <div
                    className="h-12 px-6 py-2 border border-white/[0.08] text-white/20
                               rounded font-medium inline-flex items-center justify-center
                               text-sm cursor-not-allowed select-none"
                >
                    Available Soon
                </div>
            </div>
        </div>
    );
}

