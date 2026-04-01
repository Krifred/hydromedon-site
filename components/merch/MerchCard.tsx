/* ==========================================================
   MerchCard — card for a Fourthwall collection
   ========================================================== */

import Link from "next/link";
import Image from "next/image";
import type { FWCollection } from "@/lib/fourthwall";
import { collectionCovers } from "@/lib/collectionCovers";

type CardVariant = "artifact" | "wearable" | "sheet-music";

const CTA_LABELS: Record<CardVariant, string> = {
    artifact: "View the Object",
    wearable: "Enter Collection",
    "sheet-music": "Get the Score",
};

interface MerchCardProps {
    collection: FWCollection;
    variant?: CardVariant;
}

export default function MerchCard({ collection, variant = "artifact" }: MerchCardProps) {
    // Priority: local cover from /public/covers → Fourthwall API image → gradient placeholder
    const coverSrc =
        collectionCovers[collection.slug] ??
        collection.primaryImage?.url ??
        null;

    const isComingSoon = collection.name.toLowerCase().includes("coming soon");

    // Sheet music slugs follow: sheet-music-{N}-{name}-resources
    // Map to the internal /sheet-music/[slug]/resources route
    const internalSlug = collection.slug
        .replace(/^sheet-music-\d+-/, "")
        .replace(/-resources$/, "");
    const href =
        variant === "sheet-music"
            ? `/sheet-music/${internalSlug}/resources`
            : `/merch/${collection.slug}`;

    return (
        <Link
            href={href}
            className="group block rounded-sm overflow-hidden border border-white/8 bg-white/[0.03] transition-all duration-300 ease-out hover:-translate-y-0.5 active:opacity-90 hover:border-yellow-500/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_0_32px_rgba(212,175,55,0.22)]"
        >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
                {coverSrc ? (
                    <Image
                        src={coverSrc}
                        alt={collection.name}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                )}
                {isComingSoon && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 text-xs font-semibold tracking-wide rounded backdrop-blur-sm border border-white/20 pointer-events-none">
                        COMING SOON
                    </div>
                )}
            </div>

            {/* Meta + button */}
            <div className="px-4 py-6 flex flex-col gap-3">
                <div>
                    <p className="text-sm font-medium tracking-[0.05em] text-white/80 leading-snug">
                        {collection.name}
                    </p>
                    {collection.description && (
                        <p className="mt-1.5 text-xs text-white/30 leading-relaxed">
                            {collection.description}
                        </p>
                    )}
                </div>

                <div
                    className="h-12 px-6 py-2 border border-yellow-500/40 text-yellow-400/60
                               rounded group-hover:border-yellow-500/70 group-hover:text-yellow-400/90
                               transition-colors duration-300 font-medium
                               inline-flex items-center justify-center text-sm"
                >
                    {CTA_LABELS[variant]}
                </div>
            </div>
        </Link>
    );
}
